package services;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.Date;

@XmlRootElement
public class Bestilling {

    private String bordNr;
    private String navn;
    private int antallGjester;
    private String dato;
    private String tidFra;
    private ArrayList<String> forrett;
    private ArrayList<String> hovedrett;
    private ArrayList<String> dessert;
    private ArrayList<String> drikke;
    private String kredittkortNr;
    private String utlopsdato;
    private String cvn;

    public Bestilling(){

    }

    public Bestilling(String bordNr, String navn, int antallGjester,String dato, String tidFra, ArrayList<String> forrett, ArrayList<String> hovedrett, ArrayList<String> dessert,ArrayList<String> drikke, String kredittkortNr, String utlopsdato, String cvn) {
        this.bordNr = bordNr;
        this.navn = navn;
        this.antallGjester = antallGjester;
        this.dato = dato;
        this.tidFra = tidFra;
        this.forrett = forrett;
        this.hovedrett = hovedrett;
        this.dessert = dessert;
        this.drikke = drikke;
        this.kredittkortNr = kredittkortNr;
        this.utlopsdato = utlopsdato;
        this.cvn = cvn;
    }

    public String getBordNr() {
        return bordNr;
    }

    public void setBordNr(String bordNr) {
        this.bordNr = bordNr;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }


    public int getAntallGjester() {
        return antallGjester;
    }

    public void setAntallGjester(int antallGjester) {
        this.antallGjester = antallGjester;
    }

    public String getTidFra() {
        return tidFra;
    }

    public void setTidFra(String tidFra) {
        this.tidFra = tidFra;
    }

    public ArrayList<String> getForrett() {
        return forrett;
    }

    public void setForrett(ArrayList<String> forrett) {
        this.forrett = forrett;
    }

    public ArrayList<String> getHovedrett() {
        return hovedrett;
    }

    public void setHovedrett(ArrayList<String> hovedrett) {
        this.hovedrett = hovedrett;
    }

    public ArrayList<String> getDessert() {
        return dessert;
    }

    public void setDessert(ArrayList<String> dessert) {
        this.dessert = dessert;
    }

    public ArrayList<String> getDrikke() {
        return drikke;
    }

    public void setDrikke(ArrayList<String> drikke) {
        this.drikke = drikke;
    }

    public String getKredittkortNr() {
        return kredittkortNr;
    }

    public void setKredittkortNr(String kredittkortNr) {
        this.kredittkortNr = kredittkortNr;
    }

    public String getUtlopsdato() {
        return utlopsdato;
    }

    public void setUtlopsdato(String utlopsdato) {
        this.utlopsdato = utlopsdato;
    }

    public String getCvn() {
        return cvn;
    }


    public void setCvn(String cvn) {
        this.cvn = cvn;
    }

    public String getDato() {
        return dato;
    }

    public void setDato(String dato) {
        this.dato = dato;
    }
}


