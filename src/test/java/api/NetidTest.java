package api;

import controllers.HelloWorldController;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.junit.Assert;
import org.junit.Test;

import javax.ws.rs.core.Application;

public class NetidTest extends JerseyTest {

  @Override
  protected Application configure() {
    return new ResourceConfig(HelloWorldController.class);
  }

  @Test
  public void test() {
    final String netId = target("/netid").request().get(String.class);
    Assert.assertEquals("et397", netId);
  }
}
