package controllers;

import api.ReceiptResponse;
import api.ReceiptWithTags;
import dao.ReceiptDao;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Path("/tags/{tag}")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TagController {
    final ReceiptDao receipts;

    public TagController(ReceiptDao receipts) {
        this.receipts = receipts;
    }

    @PUT
    public Response toggleTag(@PathParam("tag") String tagName, Integer receiptId) {
        if (receipts.getReceiptTags(tagName, receiptId).size() > 0) {
            receipts.removeTagFromReceipt(receipts.getTagId(tagName), receiptId);
        } else {
            if (!receipts.checkTagExists(tagName)) {
                receipts.addTag(tagName);
            }
            receipts.addTagToReceipt(receipts.getTagId(tagName), receiptId);
        }
        return Response.status(200).build();
    }

    @GET
    public List<ReceiptWithTags> getTaggedReceipts(@PathParam("tag") String tagName) {
        List<ReceiptResponse> receiptResponses = receipts.getTaggedReceipts(tagName).stream().map(ReceiptResponse::new)
                .collect(toList());
        return receiptResponses
            .stream()
            .map(receipt -> new ReceiptWithTags(
                receipt,
                receipts.getAllTagsForReceipt(receipt.getId())))
            .collect(toList());
    }
}
