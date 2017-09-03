package controllers;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Context;

// For a Java class to be eligible to receive ANY requests
// it must be annotated with at least @Path
@Path("")
@Produces(MediaType.APPLICATION_JSON)
public class HelloWorldController {

	@GET
	@Path("/netid")
	public String helloGrader() {
		return "et397".toString();
	}
}
