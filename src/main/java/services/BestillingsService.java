package services;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.*;

@Path("/bestilling/")
public class BestillingsService{

    static Resturant resturant = new Resturant();


    @GET
    @Produces({ MediaType.APPLICATION_JSON})
    public List<Bestilling> findAll() {
        //System.out.println(findAll());

        return resturant.findAll();
    }

    @GET
    @Path("today")
    @Produces({ MediaType.APPLICATION_JSON})
    public List<Bestilling> findTodays() {
        System.out.println("Kom til get service");
        return resturant.getTodays();
    }

    @GET
    @Path("previous")
    @Produces({ MediaType.APPLICATION_JSON})
    public List<Bestilling> findPrevious() {
        return resturant.getPrevious();
    }

    @GET
    @Path("future")
    @Produces({ MediaType.APPLICATION_JSON})
    public List<Bestilling> findFuture() {
        return resturant.getFuture();
    }


    @POST
    @Consumes({ MediaType.APPLICATION_JSON})
    @Produces({ MediaType.APPLICATION_JSON})
    public Bestilling create(Bestilling bestilling){
        if (resturant.create(bestilling) != null) {
            return resturant.create(bestilling);
        }else{
            throw new javax.ws.rs.NotFoundException();

        }
    }

    @DELETE
    public void delete() {
        System.out.println("Deleted");
        resturant.delete();
    }

}
