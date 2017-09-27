$(document).ready(function() {

    //funksjon for å vise og skjule elementer når knappen blir trykket
    $('#buttonShowMenu').click(function () {
        var buttonShowMenu = document.getElementById('buttonShowMenu');
        var tabForrett = document.getElementById('MenuTableForrett');
        var tabHovedrett = document.getElementById('MenuTableHovedrett');
        var tabDessert = document.getElementById('MenuTableDessert');
        var tabDrink = document.getElementById('MenuTableDrink');
        var menuHeader = document.getElementById("MenuHeader");
        var buttonBack = document.getElementById("tilbakeButton");

        buttonShowMenu.style.display = 'none';
        menuHeader.style.display ="block";
        tabForrett.style.display = "block";
        tabHovedrett.style.display ="block";
        tabDessert.style.display = "block";
        tabDrink.style.display = "block";
        buttonBack.style.display ="block";
    });
    //funksjon for å vise og skjule elementer når knappen blir trykket
    $('#tilbakeButton').click(function () {
        var buttonShowMenu = document.getElementById('buttonShowMenu');
        var tabForrett = document.getElementById('MenuTableForrett');
        var tabHovedrett = document.getElementById('MenuTableHovedrett');
        var tabDessert = document.getElementById('MenuTableDessert');
        var tabDrink = document.getElementById('MenuTableDrink');
        var menuHeader = document.getElementById("MenuHeader");
        var buttonBack = document.getElementById("tilbakeButton");

        buttonShowMenu.style.display = 'block';
        menuHeader.style.display ="none";
        tabForrett.style.display = "none";
        tabHovedrett.style.display ="none";
        tabDessert.style.display = "none";
        tabDrink.style.display = "none";
        buttonBack.style.display ="none";
    });

    //for bildene
    $(".preview").hover(function(){
        $(this).find('img').fadeIn();
    }, function(){
        $(this).find('img').fadeOut();
    });

});
