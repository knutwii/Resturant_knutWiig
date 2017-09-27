package services;

import javax.xml.bind.DatatypeConverter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class Resturant {
    private List<Bestilling> bestillingTab = new ArrayList<Bestilling>();

    public Resturant(){
    }

    public Bestilling create(Bestilling bestilling){
        //sjekker om bordet er ledig, dette ved både bordnr og dato. Merk at den kun sjekker startDato, dette er ikke optimal.
        int teller=0;

        for (int i=0;i<bestillingTab.size();i++){
            if ( (bestilling.getBordNr().equals(bestillingTab.get(i).getBordNr())) && (bestilling.getDato().equals(bestillingTab.get(i).getDato())) ){
                teller++;
            }
        }
        if (teller <= 0) {
            bestillingTab.add(bestilling);
            return bestilling;
        }
        return null;
    }
    //slett reservasjonene.
    public void delete() {
        bestillingTab.clear();
    }
    //returner alle reservasjonene
    public List<Bestilling> findAll(){
        return bestillingTab;
    }
    //returner dagens resvervasjoner
    public List<Bestilling> getTodays() {
        List<Bestilling> todays = new ArrayList<Bestilling>();
        System.out.println("Kom til getTodays()");
        for(int i=0; i < bestillingTab.size(); i++){
            Calendar bestillingDate = DatatypeConverter.parseDateTime(bestillingTab.get(i).getDato() + ":00+02:00");
            System.out.println(bestillingDate.getTime().toString());
            if (compareDates(bestillingDate, Calendar.getInstance()) == 0){
                todays.add(bestillingTab.get(i));
            }
        }
        return todays;
    }
    //returnerer tidligere reservasjoner, dette går ut ifra datoen når denne blir kjørt
    public List<Bestilling> getPrevious() {
        List<Bestilling> previous = new ArrayList<Bestilling>();
        for(int i=0; i < bestillingTab.size(); i++){
            Calendar bestillingDate = DatatypeConverter.parseDateTime(bestillingTab.get(i).getDato() + ":00+02:00");
            if (compareDates(bestillingDate, Calendar.getInstance()) == -1){
                previous.add(bestillingTab.get(i));
            }
        }
        return previous;
    }
    //returnerer fremtidige reservasjoner, dette går ut ifra datoen når denne blir kjørt
    public List<Bestilling> getFuture() {
        List<Bestilling> future = new ArrayList<Bestilling>();
        for(int i=0; i < bestillingTab.size(); i++){
            Calendar bestillingDate = DatatypeConverter.parseDateTime(bestillingTab.get(i).getDato() + ":00+02:00");
            if (compareDates(bestillingDate, Calendar.getInstance()) == 1){
                future.add(bestillingTab.get(i));
            }
        }
        return future;
    }

    //hjelpemetode som sammenligner datoer.
    private int compareDates(Calendar date1, Calendar date2) {
        int date1Year = date1.get(Calendar.YEAR);
        int date2Year = date2.get(Calendar.YEAR);
        int date1Month = date1.get(Calendar.MONTH);
        int date2Month = date2.get(Calendar.MONTH);
        int date1Day = date1.get(Calendar.DAY_OF_MONTH);
        int date2Day = date2.get(Calendar.DAY_OF_MONTH);

        System.out.println("date1Year: " + date1Year + " date2Year: " + date2Year);
        System.out.println("date1Month: " + date1Month + " date2Month: " + date2Month);
        System.out.println("date1Day: " + date1Day + " date2Day: " + date2Day);

        if(date1Year < date2Year) {
            return -1;
        }
        if(date1Year == date2Year && date1Month < date2Month) {
            return -1;
        }
        if(date1Year == date2Year && date1Month == date2Month && date1Day < date2Day) {
            return -1;
        }
        if(date1Year > date2Year) {
            return 1;
        }
        if(date1Month > date2Month) {
            return 1;
        }
        if(date1Day > date2Day) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
