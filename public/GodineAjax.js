var GodineAjax = (function () {
    var konstruktor = function (divSadrzaj) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var odgovor = JSON.parse(ajax.responseText);
                if (odgovor.length !== 0) {
                    for (var j = 0; j < odgovor.length; j++) {
                        var div = document.createElement('div');
                        div.classList.add("godina");
                        var p = document.createElement("p");
                        var tekst = document.createTextNode(odgovor[j].nazivGod);
                        p.appendChild(tekst);
                        var p1 = document.createElement("p");
                        var tekst1 = document.createTextNode(odgovor[j].nazivRepVje);
                        p1.appendChild(tekst1);
                        var p2 = document.createElement("p");
                        var tekst2 = document.createTextNode(odgovor[j].nazivRepSpi);
                        p2.appendChild(tekst2);
                        div.appendChild(p);
                        div.appendChild(p1);
                        div.appendChild(p2);
                        divSadrzaj.appendChild(div);
                    }
                }
            }
        }
        ajax.open("GET", "http://localhost:8080/godine", true);
        ajax.send();
        return {
            osvjezi: function () {
                var ajax = new XMLHttpRequest();
                divSadrzaj.innerHTML = "";
                ajax.onreadystatechange = function () {
                    if (ajax.readyState == 4 && ajax.status == 200) {
                        var odgovor = JSON.parse(ajax.responseText);
                        if (odgovor.length !== 0) {
                            for (var j = 0; j < odgovor.length; j++) {
                                var div = document.createElement('div');
                                div.classList.add("godina");
                                var p = document.createElement("p");
                                var tekst = document.createTextNode(odgovor[j].nazivGod);
                                p.appendChild(tekst);
                                var p1 = document.createElement("p");
                                var tekst1 = document.createTextNode(odgovor[j].nazivRepVje);
                                p1.appendChild(tekst1);
                                var p2 = document.createElement("p");
                                var tekst2 = document.createTextNode(odgovor[j].nazivRepSpi);
                                p2.appendChild(tekst2);
                                div.appendChild(p);
                                div.appendChild(p1);
                                div.appendChild(p2);
                                divSadrzaj.appendChild(div);
                            }
                        }
                    }
                }
                ajax.open("GET", "http://localhost:8080/godine", true);
                ajax.send();
            }
        }
    }
    return konstruktor;
}()); 