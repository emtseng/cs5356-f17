package controllers;

import api.ReceiptResponse;
import dao.ReceiptDao;
import generated.tables.records.*;

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
            Integer tagId = receipts.getTagId(tagName);
            receipts.removeTagFromReceipt(tagId, receiptId);
        } else {
            if (!receipts.checkTagExists(tagName)) {
                receipts.addTag(tagName);
            }
            Integer tagId = receipts.getTagId(tagName);
            receipts.addTagToReceipt(tagId, receiptId);
        }
        return Response.status(200).build();
    }

    @GET
    public List<ReceiptResponse> getTaggedReceipts(@PathParam("tag") String tagName) {
        return receipts.getTaggedReceipts(tagName).stream().map(ReceiptResponse::new).collect(toList());
    }

}
