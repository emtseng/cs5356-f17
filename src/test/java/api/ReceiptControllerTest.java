package api;

import controllers.ReceiptController;
import dao.ReceiptDao;
import generated.tables.records.ReceiptRecord;

import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import static org.hamcrest.CoreMatchers.*;

import javax.ws.rs.core.Application;
import javax.ws.rs.core.Response;

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
    List<ReceiptRecord> mockReceipts = new ArrayList<ReceiptRecord>();
    ReceiptRecord fakeRecord = new ReceiptRecord();
    mockReceipts.add(fakeRecord);

    //Set when...thenReturn for mock dao
    when(dao.getAllReceipts()).thenReturn(mockReceipts);

    //Call the method we want to test
    List<ReceiptResponse> getReceiptsResponse = service.getReceipts();

    //Check behavior with verify and assertions
    verify(dao).getAllReceipts();
    Assert.assertThat(getReceiptsResponse.get(0), instanceOf(ReceiptResponse.class));
  }
}
