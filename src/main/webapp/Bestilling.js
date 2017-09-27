$(document).ready(function() {
    //variabler brukt i javascript
    var antallGjester = 0;
    var delbestillinger = [];
    var bordNrValue;
    var antallTimerKunde=0;
    var startTid;
    var slutttid;

    //funksjon for å finne ut hvor lenge en bestilling skal reservere bordet.
    function findSluttTidBestilling() {
        startTid = $('#dateInput').val();
        var startTidDate = new Date(startTid);

        if ($('#preMeal').val() != "None" ||$('#drink').val() != "None" ) {
            antallTimerKunde++;
        }
        if ($('#mainMeal').val() != "None") {
            antallTimerKunde++;
        }
        if ($('#Dessert').val() != "None") {
            antallTimerKunde++;
        }
        if (antallTimerKunde === 1) {
            slutttid = "Dere har bordet i 30 minutter.";


        }
        if (antallTimerKunde === 2) {
            slutttid = "Dere har bordet i 1 time.";

        }
        if (antallTimerKunde === 3) {
            slutttid = "Dere har bordet i 1,5 time.";

        }
    }

    //knappen for å sende inn den endelige bestillingen
    $('#SendButton').click(function () {
        antallGjester = $('#guestField').val();

        findSluttTidBestilling();

        if (delbestillinger.length == antallGjester) {
            addBestilling();

            console.log("knapp registrert");
            return false;
        }else{
            alert("Ugyldig antall delbestillinger. \n" + (antallGjester-delbestillinger.length) +" gjest(er) mangler sin bestilling.")

        }
    });
//lag en ny bestilling
    function addBestilling() {
        console.log('addBestilling');
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/rest-template/rest-template/bestilling',
            data: datafromToJSON()
        }).done(function (data) {


            alert('Bestillingen var vellykket.\nBordet er resvert fra: ' +startTid + '.\n' + slutttid);
            location.reload();

            /* PRØVE Å SKJULE / TØMME FELTENE ETTER GODKJENT BESTILLING
            $('#nameField').val(data.navn);
            $('#guestField').val(data.antallGjester);
            $('#mealFirstTime').val(data.tidFra);
            $('#preMeal').val(data.forrett);
            $('#mainMeal').val(data.hovedrett);
            $('#Dessert').val(data.dessert);
            $('#drink').val(data.drikke);
            $('#creditField').val(data.kredittkortNr);
            $('#expiredField').val(data.utlopsdato);
            $('#cvnField').val(data.cvn);
            */
        }).fail(function (data) {
            console.log("Den kom inn i error funksjon")
            //alert("Bord er opptatt");
            alert('Valgt bord er opptatt på dette klokkeslettet:' +startTid +'\nVennligst velg ett annet bord\nLegg til Delbestilling på nytt')    // Show the Alert

            //TØM DELBESTILLINGSTABELL OM BORD ER OPPTATT, KUNDEN MÅ LEGGE INN PÅ NYTT.
            $("#delBestillinger").empty();
        });
        // resetter listen for delbestillinger
        delbestillinger = [];
    }

    //LISTER UT TABELLENE TIL HVER BESTILLING PÅ LIVE OPPSETT SIDEN
    function datafromToJSON() {
        var forrettListe = [];
        var hovedrettListe = [];
        var dessertListe = [];
        var drikkeListe = [];
        for(var i = 0; i < delbestillinger.length; i++) {
            var gjest = delbestillinger[i];
            forrettListe.push(gjest.forrett);
            hovedrettListe.push(gjest.hovedrett);
            dessertListe.push(gjest.dessert);
            drikkeListe.push(gjest.drikke);
        }
        json = JSON.stringify({

            "bordNr": $('#tableNr').val(),
            "navn": $('#nameField').val(),
            "antallGjester": $('#guestField').val(),
            "dato": $('#dateInput').val(),
            "tidFra": $('#mealFirstTime').val(),
            "forrett": forrettListe, //$('#preMeal').val(),
            "hovedrett": hovedrettListe, //$('#mainMeal').val(),
            "dessert": dessertListe, //$('#Dessert').val(),
            "drikke": drikkeListe, // $('#drink').val(),
            "kredittkortNr": $('#creditField').val(),
            "utlopsdato": $('#expiredField').val(),
            "cvn": $('#cvnField').val(),
        });
        console.log(json);
        return json;
    }

    //knappen for å legge til en delbestilling til den endelige bestillingen for en kunde
    $('#LeggTilBestilling').click(function () {
        addDelbestilling()
        return false;
    });

    //legg til en delbestilling til den endelige bestillingen for en kunde
    function addDelbestilling() {
        //Sjekker at antall gjester er satt.
        antallGjester = $('#guestField').val();
        bordNrValue = $('#tableNr').val();

        if(antallGjester < 1) {
            alert('Ugyldig antall gjester. Velg minst en gjest.');
        }if(bordNrValue =="0") {
            alert('Vennligst velg et bord.')
        }
        else {
            var forrett = $('#preMeal').val();
            var hovedrett = $('#mainMeal').val();
            var dessert = $('#Dessert').val();
            var drikke = $('#drink').val();
            var gjest = {
                "forrett": forrett,
                "hovedrett": hovedrett,
                "dessert": dessert,
                "drikke": drikke,
            };
            if(delbestillinger.length < antallGjester) {
                delbestillinger.push(gjest);
                renderDelbestillinger();
            }else{
                alert("Kan ikke Legge til flere måltider enn antall gjester.");
            }
        }
    }

    //slett siste delbestilling, dette om en kunde la inn feil delbestilling for en gjest
    $('#removeLastOrder').click(function () {
        delbestillinger.pop();
        renderDelbestillinger();
    });

    //få opp tabellen med oversikten over delbestillingene
    function renderDelbestillinger() {
        var radNr;

        $("#delBestillinger").empty();
        for (var i=0;i<delbestillinger.length;i++) {
            var bestilling = delbestillinger[i];
            radNr=i+1;
            $('#delBestillinger').append(
                '<tr>' +
                '<td scope="row">' + radNr + '</td>' +
                '<td>' + bestilling.forrett + '</td>' +
                '<td>' + bestilling.hovedrett + '</td>' +
                '<td>' + bestilling.dessert + '</td>' +
                '<td>' + bestilling.drikke + '</td>' +
                '</tr>');
        }
    }

    //denne funksjonen sjekker at alle feltene er fylt ut, og viser hvilke felter som evt må fylles ut
    $('#VelgRetter').click(function () {

        if ($('#nameField').val() == ""
            || $('#creditField').val() == "" || $('#expiredField').val() == ""
            || $('#cvnField').val() == "" || $('#dateInput').val() == "") {
            if ($('#nameField').val() == "") {
                $('#nameField').css({
                    "background-color": "yellow",
                });
            }

            if ($('#creditField').val() == "") {
                $('#creditField').css({
                    "background-color": "yellow",
                });
            }
            if ($('#expiredField').val() == "") {
                $('#expiredField').css({
                    "background-color": "yellow",
                });
            }
            if ($('#cvnField').val() == "") {
                $('#cvnField').css({
                    "background-color": "yellow",
                });
            }
            if ($('#dateInput').val() === "") {
                $('#dateInput').css({
                    "background-color": "yellow",
                });
            }
            alert("Alle feltene må fylles ut, vennligst prøv igjen.");
        }
        else {
            // show og hide av tabeller og knapper når "gå til retter" knappen er trykket
            var customerInfo = document.getElementById('customerInfo');
            var mealInfo = document.getElementById('mealInfo');
            var removeLastOrder = document.getElementById('removeLastOrder');
            var SendButton = document.getElementById('SendButton');
            var addDelbestilling = document.getElementById('LeggTilBestilling')

            customerInfo.style.display = 'none';
            mealInfo.style.display ="block";
            removeLastOrder.style.display="block";
            SendButton.style.display = "block";
            addDelbestilling.style.display ="block";
        }
    });
});
