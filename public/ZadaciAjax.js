var ZadaciAjax = (function () {
    var konstruktor = function (callbackFn) {
        var zahtjev = false;
        return {
            dajXML: function () {
                if (zahtjev === false) {
                    var ajax = new XMLHttpRequest();
                    zahtjev = true;
                    ajax.onreadystatechange = function () {
                        if (ajax.readyState == 4 && ajax.status == 200) {
                            zahtjev = false;
                            callbackFn(ajax.responseText);
                        }
                    }
                    ajax.open("GET", "http://localhost:8080/zadaci", true);
                    ajax.setRequestHeader('Accept', 'application/xml');
                    ajax.timeout = 2000;
                    ajax.send();
                }
                else {
                    var objekat = JSON.stringify({greska:"Već ste uputili zahtjev"});
                    callbackFn(objekat);
                }
            },
            dajCSV: function () {
                if (zahtjev === false) {
                    var ajax = new XMLHttpRequest();
                    zahtjev = true;
                    ajax.onreadystatechange = function () {
                        if (ajax.readyState == 4 && ajax.status == 200) {
                            zahtjev = false;
                            callbackFn(ajax.responseText);
                        }
                    }
                    ajax.open("GET", "http://localhost:8080/zadaci", true);
                    ajax.setRequestHeader('Accept', 'text/csv');
                    ajax.timeout = 2000;
                    ajax.send();
                }
                else {
                    var objekat = JSON.stringify({greska:"Već ste uputili zahtjev"});
                    callbackFn(objekat);
                }
            },
            dajJSON: function () {
                if (zahtjev === false) {
                    var ajax = new XMLHttpRequest();
                    zahtjev = true;
                    ajax.onreadystatechange = function () {
                        if (ajax.readyState == 4 && ajax.status == 200) {
                            zahtjev = false;
                            callbackFn(ajax.responseText);
                        }
                    }
                    ajax.open("GET", "http://localhost:8080/zadaci", true);
                    ajax.setRequestHeader('Accept', 'application/json');
                    ajax.timeout = 2000;
                    ajax.send();
                }
                else {
                    var objekat = JSON.stringify({greska:"Već ste uputili zahtjev"});
                    callbackFn(objekat);
                }
            }
        }
    }
    return konstruktor;
}()); 