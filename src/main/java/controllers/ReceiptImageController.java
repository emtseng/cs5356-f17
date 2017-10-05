package controllers;

import api.ReceiptSuggestionResponse;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import java.math.BigDecimal;
import org.apache.commons.lang3.math.*;
import java.util.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import org.hibernate.validator.constraints.NotEmpty;

import static java.lang.System.out;

@Path("/images")
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

      String merchantName = null;
      BigDecimal amount = null;

      // Your Algo Here!!
      // Sort text annotations by bounding polygon.  Top-most non-decimal text is the merchant
      // bottom-most decimal text is the total amount

      Integer bottomY = 1000;
      Integer topY = 0;

      for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
        String text = annotation.getDescription();
        Integer tempBottomY = annotation.getBoundingPoly().getVertices(0).getY();
        Integer tempTopY = annotation.getBoundingPoly().getVertices(2).getY();

        if (bottomY > tempBottomY && NumberUtils.isCreatable(text)) {
          bottomY = tempBottomY;
          out.printf("new amt: ", annotation.getDescription());
          amount = new BigDecimal(annotation.getDescription());
        }

        if (topY < tempTopY) {
          topY = tempTopY;
          out.printf("new merchant: ", annotation.getDescription());
          merchantName = annotation.getDescription();
        }

        out.printf("Position : %s\n", annotation.getBoundingPoly());
        out.printf("Text: %s\n", annotation.getDescription());
      }

      //TextAnnotation fullTextAnnotation = res.getFullTextAnnotation();
      return new ReceiptSuggestionResponse(merchantName, amount);
    }
  }
}
