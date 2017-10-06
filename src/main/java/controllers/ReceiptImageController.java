package controllers;

import api.ReceiptSuggestionResponse;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import java.math.BigDecimal;
import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import org.hibernate.validator.constraints.NotEmpty;

import static java.lang.System.out;

@Path("/api/images")
@Consumes(MediaType.TEXT_PLAIN)
@Produces(MediaType.APPLICATION_JSON)
public class ReceiptImageController {
  private final AnnotateImageRequest.Builder requestBuilder;

  public ReceiptImageController() {
    // DOCUMENT_TEXT_DETECTION is not the best or only OCR method available
    Feature ocrFeature = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
    this.requestBuilder = AnnotateImageRequest.newBuilder().addFeatures(ocrFeature);
  }

  /**
   * This borrows heavily from the Google Vision API Docs.  See:
   * https://cloud.google.com/vision/docs/detecting-fulltext
   *
   * YOU SHOULD MODIFY THIS METHOD TO RETURN A ReceiptSuggestionResponse:
   *
   * public class ReceiptSuggestionResponse {
   *     String merchantName;
   *     String amount;
   * }
   */
  @POST
  public ReceiptSuggestionResponse parseReceipt(@NotEmpty String base64EncodedImage) throws Exception {
    Image img = Image.newBuilder().setContent(ByteString.copyFrom(Base64.getDecoder().decode(base64EncodedImage)))
        .build();
    AnnotateImageRequest request = this.requestBuilder.setImage(img).build();

    try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
      BatchAnnotateImagesResponse responses = client.batchAnnotateImages(Collections.singletonList(request));
      AnnotateImageResponse res = responses.getResponses(0);

      // Sort text annotations by bounding polygon.  Top-most non-decimal text is the merchant
      // bottom-most decimal text is the total amount

      String completeText = res.getTextAnnotationsList().get(0).getDescription();
      out.printf("completeText: %s\n", completeText);

      List<String> textArr = Arrays.asList(completeText.split("\n"));
      String merchantName = textArr.get(0);

      List<String> numArr = textArr.stream().filter(x -> x.matches(".*\\d+.*")).collect(Collectors.toList());
      out.printf("numArr: %s\n", numArr);
      out.printf("last item in numArr: %s\n", numArr.get(numArr.size() - 1));

      Pattern pattern = Pattern.compile("\\d+\\.\\d+");
      Matcher matcher = pattern.matcher(numArr.get(numArr.size() - 1));

      BigDecimal amount = null;
      while (matcher.find()) {
        amount = new BigDecimal(matcher.group(0));
      }

      return new ReceiptSuggestionResponse(merchantName, amount);
    }
  }
}
