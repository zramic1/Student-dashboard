

function izvrsi1() {
    var mojDiv = document.getElementById("ispis1");
    var inputGodina = document.getElementById("godina1");
    var ime = document.getElementById("ime");
    var index = document.getElementById("index");
    var validacija = new Validacija(mojDiv);
    validacija.godina(inputGodina);
    validacija.ime(ime);
    validacija.index(index);

    return false;
}

function izvrsi2() {
    var mojDiv = document.getElementById("ispis2");
    var inputGodina1 = document.getElementById("godina2");
    var validacija = new Validacija(mojDiv);
    validacija.godina(inputGodina1);

    return false;
}

function napuni() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var odgovor = JSON.parse(ajax.responseText);
            if (odgovor.length !== 0) {
                var polje = document.getElementById("godina1");
                for (var i = 0; i < odgovor.length; i++) {
                    var opcija = document.createElement('option');
                    opcija.text = odgovor[i].nazivGod;
                    opcija.value = odgovor[i].id;
                    polje.appendChild(opcija);
                }
            }
        }
    }
    ajax.open("GET", "http://localhost:8080/godine/addVjezba", true);
    ajax.send();
}


broji = 0;

function kreiraj() {
    var key = document.getElementById("key");
    var secret = document.getElementById("secret");
    var dugme = document.getElementById("dodaj");
    var polje = document.getElementById("godina1");
    var okej = 0;
    var promjenaIndeksa = 0;

    if (broji === 0 && key.value !== "" && secret.value !== "") {
        globalniKey = document.getElementById("key").value;
        globalniSecret = document.getElementById("secret").value;
        kon = new BitBucket(key.value, secret.value);
        if(polje[polje.selectedIndex] === undefined){
            globalniIndeks = 0;
        }
        else{
            globalniIndeks = polje[polje.selectedIndex].value;
        }
        okej = 1;
        broji = 1;
    }

    if (key.value !== "" && secret.value !== "" && globalniKey !== key.value && globalniSecret !== secret.value) {
        kon = new BitBucket(key.value, secret.value);
        globalniKey = document.getElementById("key").value;
        globalniSecret = document.getElementById("secret").value;
        okej = 1;
    }

    if(polje[polje.selectedIndex] !== undefined && polje[polje.selectedIndex].value !== globalniIndeks){
        globalniIndeks = polje[polje.selectedIndex].value;
        promjenaIndeksa = 1;
    }

    if (okej === 1 || promjenaIndeksa === 1) {
        console.log("okej", okej);
        console.log("indeks", promjenaIndeksa);
        var indeks = "";
        if (polje[polje.selectedIndex] === undefined) {
            indeks = 0;
        }
        else {
            indeks = polje[polje.selectedIndex].value;
        }
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var odgovor = JSON.parse(ajax.responseText);
                kon.ucitaj(odgovor.nazivRepSpi, odgovor.nazivRepVje, function (greska, x) { if (greska === null) { pomocniNiz = x; console.log("Lista studenata:\n" + JSON.stringify(x)); dugme.disabled = false; } });
            }
        }
        ajax.open('GET', 'http://localhost:8080/god/' + indeks, true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();

        
    }



    return false;
}


function posalji() {
    var polje = document.getElementById("godina1");
    var indeks = "";
    if (polje[polje.selectedIndex] === undefined) {
        indeks = 0;
    }
    else {
        indeks = polje[polje.selectedIndex].value;
    }
    var objekat = { godina: indeks, studenti: JSON.stringify(pomocniNiz) };
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == XMLHttpRequest.DONE) {
            alert(JSON.parse(ajax.responseText).message);
        }
    }
    ajax.open('POST', 'http://localhost:8080/student', true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify(objekat));
    return false;
}
