
$(document).ready(function() {

    var bordliste = [];

    //funksjon for at velge hvilke bordlister man vi ha frem i live oppsett, velge mellom dagens, tidligere og fremtidige.

    $('#chooseLiveOppsettButton').click(function() {
        console.log("kom inn i velg dato knapp");

        if (document.getElementById('chooseLiveOppsettDates').value ==="iDag"){
            $(".row").empty();
            setInterval(getTodays(),10000);

        }
        if (document.getElementById('chooseLiveOppsettDates').value ==="Tidligere"){
            $(".row").empty();
            setInterval(getPrevious(),10000);
        }
        if (document.getElementById('chooseLiveOppsettDates').value ==="Kommende"){
            $(".row").empty();
            setInterval(getFuture(),10000);
        }
        if (document.getElementById('chooseLiveOppsettDates').value ==="all"){
            $(".row").empty();
            setInterval(findAll(),10000);
        }
    });
    //finner samtlige bordReservasjoner
    function findAll() {
        console.log('findAll i liveOpsett');
        $.ajax({
            type: 'GET',
            url: '/rest-template/rest-template/bestilling',
            dataType: "json",
            success: renderList,

        });
    }
    //finner dagens bordReservasjoner
    function getTodays() {
        $.ajax({
            type: 'GET',
            url: '/rest-template/rest-template/bestilling/today',
            dataType: "json",
            success: renderList
        });
    }
    //finner tidligere bordReservasjoner
    function getPrevious() {
        $.ajax({
            type: 'GET',
            url: '/rest-template/rest-template/bestilling/previous',
            dataType: "json",
            success: renderList
        });
    }
    //finner fremtidige bordReservasjoner
    function getFuture() {
        $.ajax({
            type: 'GET',
            url: '/rest-template/rest-template/bestilling/future',
            dataType: "json",
            success: renderList
        });
    }
    //Slette alle reservasjoner, dette er en løsning slik at man ikke trenger å kjøre mvn på nytt for å slette gamle resverasjoner
    $('#deleteAllBtn').click(function() {
        $.ajax({
            type: 'DELETE',
            url: '/rest-template/rest-template/bestilling',
            success: location.reload()
        });
    });

    //funksjonen som får listene ut på skjermen.
    function renderList(data) {
        var list = data == null ? [] : (data instanceof Array ? data : [data]);
        bordliste = [];
        $.each(list, function(index, bestilling) {
            bordliste.push({
               "bordNr": bestilling.bordNr,
               "navn": bestilling.navn,
                "dato": new Date(bestilling.dato),
               "forrett": bestilling.forrett,
               "hovedrett": bestilling.hovedrett,
               "dessert": bestilling.dessert,
               "drikke": bestilling.drikke
            });
        });
        console.log(bordliste);
        $.each(bordliste, function (index, bestilling) {
            var hours = ("0" + bestilling.dato.getHours()).slice(-2);
            var minutes = ("0" + bestilling.dato.getMinutes()).slice(-2);
            $('.row').append('<div>' +
                '<div class="menu-category-name list-group-item active">Bord: ' + bestilling.bordNr + '</div>' +
                '<a class="menu-item list-group-item">  Navn: ' + bestilling.navn +
                '<a class="menu-item list-group-item">  Tidspunkt: ' + hours + ':' + minutes +
                '<a class="menu-item list-group-item">  Dato: ' + bestilling.dato.getDate() +'.' + bestilling.dato.getMonth() +
                '<a class="menu-item list-group-item">  Forrett:' + bestilling.forrett +
                '<a class="menu-item list-group-item">  Hovedrett:' + bestilling.hovedrett +
                '<a class="menu-item list-group-item">  Dessert:' + bestilling.dessert +
                '<a class="menu-item list-group-item">  Drikke:' + bestilling.drikke + '</div>');

                console.log("koden kom til bunnen av RenderList");
        });
    }
});