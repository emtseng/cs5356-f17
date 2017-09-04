package api;


import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.*;

import org.junit.Assert;
import org.junit.Test;

import controllers.HelloWorldController;
import javax.ws.rs.core.Application;

// public class NetidTest extends JerseyTest {

//   @Override
//   protected Application configure() {
//       return new ResourceConfig(HelloWorldController.class);
//   }

//   @Test
//   public void netidPathTest() {
//     String response = target("/netid").request().get(String.class);
//     System.out.print(response);
//     // Assert.assertTrue(response.equals("et397"));
//   }
// }
