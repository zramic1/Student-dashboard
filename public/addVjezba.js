function izvrsi1() {
    /* var mojDiv = document.getElementById("ispis1");
     var inputGodina=document.getElementById("godina1");
     var validacija = new Validacija(mojDiv);
     validacija.godina(inputGodina);*/

    return true;
}

function izvrsi2() {
    var mojDiv = document.getElementById("ispis2");
    var nazivVjezbe = document.getElementById("vjezba");
    var validacija = new Validacija(mojDiv);
    validacija.naziv(nazivVjezbe);

    if (validnaPolja[4] == 1) {
        return true;
    }
    else {
        return false;
    }

}

function napuni() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var odgovor = JSON.parse(ajax.responseText);
            if (odgovor.length !== 0) {
                var polje = document.getElementById("godina1");
                var polje1 = document.getElementById("godina2");
                for (var i = 0; i < odgovor.length; i++) {
                    var opcija = document.createElement('option');
                    opcija.text = odgovor[i].nazivGod;
                    opcija.value = odgovor[i].id;
                    polje.appendChild(opcija);
                }
                for (var j = 0; j < odgovor.length; j++) {
                    var opcija1 = document.createElement('option');
                    opcija1.text = odgovor[j].nazivGod;
                    opcija1.value = odgovor[j].id;
                    polje1.appendChild(opcija1);
                }
            }
        }
    }
    ajax.open("GET", "http://localhost:8080/godine/addVjezba", true);
    ajax.send();
}

function napuni1() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var odgovor = JSON.parse(ajax.responseText);
            if (odgovor.length !== 0) {
                var polje = document.getElementById("postojecaVjezba");
                var polje1 = document.getElementById("vjezbaZadatak");
                for (var i = 0; i < odgovor.length; i++) {
                    var opcija = document.createElement('option');
                    opcija.text = odgovor[i].naziv;
                    opcija.value = odgovor[i].id;
                    polje.appendChild(opcija);
                }
                for (var i = 0; i < odgovor.length; i++) {
                    var opcija1 = document.createElement('option');
                    opcija1.text = odgovor[i].naziv;
                    opcija1.value = odgovor[i].id;
                    polje1.appendChild(opcija1);
                }
            }

        }
    }
    ajax.open("GET", "http://localhost:8080/vjezbe", true);
    ajax.send();
}

function dodajZadatke(oznaceno) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var odgovor = JSON.parse(ajax.responseText);
            if (odgovor.length !== 0) {
                var polje = document.getElementById("zadatak");
                while (polje.firstChild) {
                    polje.removeChild(polje.firstChild);
                }
                if (polje.options.length === 0) {
                    for (var i = 0; i < odgovor.length; i++) {
                        var opcija = document.createElement('option');
                        opcija.text = odgovor[i].naziv;
                        opcija.value = odgovor[i].id;
                        polje.appendChild(opcija);
                    }
                }
            }
            else {
                var polje = document.getElementById("zadatak");
                while (polje.firstChild) {
                    polje.removeChild(polje.firstChild);
                }
            }
        }
    }
    ajax.open("GET", "http://localhost:8080/zadaci/" + oznaceno, true);
    ajax.send();
}

function napuni2() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var odgovor = JSON.parse(ajax.responseText);
            if (odgovor.length !== 0) {
                var polje = document.getElementById("zadatak");
                for (var i = 0; i < odgovor.length; i++) {
                    var opcija = document.createElement('option');
                    opcija.text = odgovor[i].naziv;
                    opcija.value = odgovor[i].id;
                    polje.appendChild(opcija);
                }
            }
        }
    }
    ajax.open("GET", "http://localhost:8080/zadaciVjezbe", true);
    ajax.send();
}

function posaljiZahtjev() {
    var polje = document.getElementById("vjezbaZadatak");
    var polje1 = document.getElementById("zadatak");
    var vjezba = "";
    var indeks = "";
    var zadatak = "";
    if(polje[polje.selectedIndex] === undefined){
        vjezba = undefined;
        indeks = 0;
    }
    else{
        vjezba = polje[polje.selectedIndex].value;
        indeks = polje[polje.selectedIndex].value;
    }
    if(polje1[polje1.selectedIndex] === undefined){
        zadatak = undefined;
    }
    else{
        zadatak = polje1[polje1.selectedIndex].value;
    }
    var objekat = { sVjezbe: vjezba, idVjezbe: indeks, sZadatak: zadatak };
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {

        }
    };
    ajax.open('POST', 'http://localhost:8080/vjezba/' + indeks + '/zadatak', true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify(objekat));

    return false;
}