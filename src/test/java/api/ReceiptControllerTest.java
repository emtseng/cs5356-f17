package api;

import controllers.ReceiptController;
import dao.ReceiptDao;
import generated.tables.records.ReceiptRecord;

import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import static org.hamcrest.CoreMatchers.*;

import javax.ws.rs.core.Application;

public class ReceiptControllerTest extends JerseyTest {

  private ReceiptController service;
  private ReceiptDao dao;

  @Override
  protected Application configure() {
    return new ResourceConfig(ReceiptController.class);
  }

  @Before
  public void setupTest() {
    dao = mock(ReceiptDao.class);
    service = new ReceiptController(dao);
  }

  @Test
  public void checkGETReceipts() {
    //Create fake data
    List<ReceiptRecord> fakeReceipts = new ArrayList<ReceiptRecord>();
    ReceiptRecord fakeRecord = new ReceiptRecord();
    fakeReceipts.add(fakeRecord);

    //Set when...thenReturn for mock dao
    when(dao.getAllReceipts()).thenReturn(fakeReceipts);

    //Call the method we want to test
    List<ReceiptWithTags> getReceiptsResponse = service.getReceipts();

    //Check behavior with verify and assertions
    verify(dao).getAllReceipts();
    Assert.assertThat(getReceiptsResponse.get(0), instanceOf(ReceiptWithTags.class));
  }

  @Test
  public void checkPOSTReceipts() {
    CreateReceiptRequest receipt = new CreateReceiptRequest();
    receipt.merchant = "Duane Reade";
    receipt.amount = new BigDecimal(20);

    Integer createReceiptResponse = service.createReceipt(receipt);

    verify(dao).insert(receipt.merchant, receipt.amount);
    Assert.assertThat(createReceiptResponse, instanceOf(Integer.class));
  }

}
