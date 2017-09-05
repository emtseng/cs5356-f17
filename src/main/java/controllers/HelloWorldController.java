package controllers;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

// For a Java class to be eligible to receive ANY requests
// it must be annotated with at least @Path
@Path("")
@Produces(MediaType.TEXT_PLAIN)
public class HelloWorldController {

	@GET
	@Path("/netid")
	public String helloGrader() {
		return "et397";
	}

}
