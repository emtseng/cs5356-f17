package controllers;

import api.ReceiptResponse;
import dao.ReceiptDao;
import generated.tables.records.*;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
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
    public void toggleTag(@PathParam("tag") String tagName, Integer receiptId) {
        List<ReceiptTagRecord> receiptTags = receipts.getReceiptTags(tagName, receiptId);
        if (receiptTags.size() > 0) {
            receipts.removeTagFromReceipt(tagName, receiptId);
        } else {
            receipts.addTagToReceipt(tagName, receiptId);
        }
    }

    @GET
    public List<ReceiptResponse> getTaggedReceipts(@PathParam("tag") String tagName) {
        return receipts.getTaggedReceipts(tagName).stream().map(ReceiptResponse::new).collect(toList());
    }

}
