package controllers;

import dao.ReceiptDao;
import generated.tables.records.ReceiptsRecord;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Path("/tags/{tag}")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TagsController {
    // final ReceiptDao receipts;
    // public ReceiptController(ReceiptDao receipts) {
    //     this.receipts = receipts;
    // }

    @PUT
    public void toggleTag(@PathParam("tag") String tagName) {
        // <your code here
    }

    // @GET
    // public List<ReceiptsRecord> getTaggedReceipts() {
    //     List<ReceiptsRecord> receiptRecords = receipts.getAllReceipts();
    //     return receiptRecords.stream().map(ReceiptsRecord::new).collect(toList());
    // }

}
