package controllers;

import api.CreateReceiptRequest;
import api.ReceiptResponse;
import api.ReceiptWithTags;
import dao.ReceiptDao;
import generated.tables.records.ReceiptRecord;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import java.util.List;
import static java.util.stream.Collectors.toList;

@Path("/receipts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ReceiptController {
    final ReceiptDao receipts;

    public ReceiptController(ReceiptDao receipts) {
        this.receipts = receipts;
    }

    @POST
    public int createReceipt(@Valid @NotNull CreateReceiptRequest receipt) {
        return receipts.insert(receipt.merchant, receipt.amount);
    }

    @GET
    public List<ReceiptWithTags> getReceipts() {
        List<ReceiptRecord> receiptRecords = receipts.getAllReceipts();
        List<ReceiptResponse> receiptResponses = receiptRecords.stream().map(ReceiptResponse::new).collect(toList());
        return receiptResponses
            .stream()
            .map(receipt -> new ReceiptWithTags(
                receipt,
                receipts.getAllTagsForReceipt(receipt.getId())))
            .collect(toList());
    }
}
