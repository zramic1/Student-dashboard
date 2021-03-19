var express = require("express");
var fs = require("fs");
const bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var pug = require("pug");
const Sequelize = require('sequelize');
const db = require('./db.js')
var porukaOGresci1 = "";
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();


//Zadatak 4
app.post('/addGodina', function (req, res) {
    let tijelo = req.body;
    if (tijelo.nazivGod === "" || tijelo.nazivRepVje === "" || tijelo.nazivRepSpi === "") {
        porukaOGresci = "Greška: Morate popuniti sva polja!";
        res.render('greska.pug', { greskaIspis: porukaOGresci });
    }
    else {
        db.godina.findOne({ where: { nazivGod: tijelo.nazivGod } }).then(function (god) {
            if (!god) {
                db.godina.create({ nazivGod: tijelo.nazivGod, nazivRepSpi: tijelo.nazivRepSpi, nazivRepVje: tijelo.nazivRepVje });
                res.redirect("addGodina.html");
            }
            else {
                porukaOGresci = "Greška: Godina već postoji!";
                res.render('greska.pug', { greskaIspis: porukaOGresci });
            }
        });
    }
});

//Zadatak 5
app.get('/godine', function (req, res) {
    var niz = [];
    db.godina.findAll().then(function (god) {
        for (var i = 0; i < god.length; i++) {
            var objekat = { nazivGod: god[i].dataValues.nazivGod, nazivRepVje: god[i].dataValues.nazivRepVje, nazivRepSpi: god[i].dataValues.nazivRepSpi };
            niz.push(objekat);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(niz));
    });

});

//Vrati godine za addVjezba
app.get('/godine/addVjezba', function (req, res) {
    var niz = [];
    db.godina.findAll().then(function (god) {
        for (var i = 0; i < god.length; i++) {
            var objekat = { id: god[i].dataValues.id, nazivGod: god[i].dataValues.nazivGod, nazivRepVje: god[i].dataValues.nazivRepVje, nazivRepSpi: god[i].dataValues.nazivRepSpi };
            niz.push(objekat);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(niz));
    });

});
//Vrati vjezbe
app.get('/vjezbe', function (req, res) {
    var niz = [];
    db.vjezba.findAll().then(function (vje) {
        for (var i = 0; i < vje.length; i++) {
            var objekat = { id: vje[i].dataValues.id, naziv: vje[i].dataValues.naziv, spirala: vje[i].dataValues.spirala };
            niz.push(objekat);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(niz));

    });

});

//Vrati zadatke prve vježbe
app.get('/zadaciVjezbe', function (req, res) {
    var niz = [];
    var postoji = 0;
    db.vjezba.findOne({ where: { id: 1 } }).then(function (vje) {
        if (vje) {
            vje.getZadaci().then(function (zad) {
                db.zadatak.findAll().then(function (vraceniZad) {
                    for (var i = 0; i < vraceniZad.length; i++) {
                        for (var j = 0; j < zad.length; j++) {
                            if (vraceniZad[i].dataValues.naziv === zad[j].dataValues.naziv) {
                                postoji = 1;
                                break;
                            }
                        }
                        if (postoji === 0) {
                            var objekat = { id: vraceniZad[i].dataValues.id, naziv: vraceniZad[i].dataValues.naziv, postavka: vraceniZad[i].dataValues.postavka };
                            niz.push(objekat);
                        }
                        postoji = 0;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(niz));
                });
            });
        }
    });
});

//Vrati zadatke vježbi
app.get('/zadaci/:zadatak', function (req, res) {
    var zadatak = req.url;
    var vjezba = zadatak.substring(8, zadatak.length);
    var niz = [];
    var postoji = 0;
    db.vjezba.findOne({ where: { id: vjezba } }).then(function (vje) {
        if (vje) {
            vje.getZadaci().then(function (zad) {
                db.zadatak.findAll().then(function (vraceniZad) {
                    for (var i = 0; i < vraceniZad.length; i++) {
                        for (var j = 0; j < zad.length; j++) {
                            if (vraceniZad[i].dataValues.naziv === zad[j].dataValues.naziv) {
                                postoji = 1;
                                break;
                            }
                        }
                        if (postoji === 0) {
                            var objekat = { id: vraceniZad[i].dataValues.id, naziv: vraceniZad[i].dataValues.naziv, postavka: vraceniZad[i].dataValues.postavka };
                            niz.push(objekat);
                        }
                        postoji = 0;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(niz));
                });
            });
        }
    });
});

app.get('/god/:indeks', function (req, res) {
    var indeks = req.params.indeks;
    if (indeks !== 0) {
        db.godina.findOne({ where: { id: indeks } }).then(function (godina) {
            if (godina) {
                var objekat = { nazivRepSpi: godina.dataValues.nazivRepSpi, nazivRepVje: godina.dataValues.nazivRepVje };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(objekat));
            }

        });

    }


});

//Zadatak 2
app.post('/addZadatak', upload.single('postavka'), function (req, res) {
    let tijelo = req.body;
    if (tijelo.naziv === "") {
        porukaOGresci = "Greška: Morate unijeti naziv zadatka!";
        res.render('greska.pug', { greskaIspis: porukaOGresci });

    }
    else if (req.file === undefined) {
        porukaOGresci = "Greška: Morate odabrati željeni fajl!";
        res.render('greska.pug', { greskaIspis: porukaOGresci });
    }
    else {
        var objekat = { naziv: tijelo.naziv, postavka: 'http://localhost:8080/' + tijelo.naziv + '.pdf' };
        var linija = JSON.stringify(objekat);
        var tip = req.file.mimetype.substring(12, 15);

        db.zadatak.findOne({ where: { naziv: tijelo.naziv } }).then(function (zad) {
            if (!zad) {
                if (tip !== "pdf") {
                    porukaOGresci = "Greška: File mora imati ekstenziju .pdf!";
                    res.render('greska.pug', { greskaIspis: porukaOGresci });
                }
                else {
                    fs.readFile('./uploads/' + req.file.filename, function (err, data) {
                        fs.writeFile('./public/Fajlovi/' + tijelo.naziv + '.pdf', data, function (err) {
                            if (err) throw err;
                            else {
                                db.zadatak.create({ naziv: objekat.naziv, postavka: objekat.postavka });
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(linija);
                            }
                        });
                    });
                }
            }
            else {
                porukaOGresci = "Greška: Zadatak već postoji!";
                res.render('greska.pug', { greskaIspis: porukaOGresci });
            }
        });
    }
});



//Zadatak 3
app.get('/zadatak', function (req, res) {
    let tijelo = req.query;
    naziv = tijelo.naziv;
    db.zadatak.findOne({ where: { naziv: tijelo.naziv } }).then(function (zad) {
        if (!zad) {
            porukaOGresci = "Greška: Zadatak ne postoji!";
            res.render('greska.pug', { greskaIspis: porukaOGresci });
        }
        else {
            res.redirect(zad.postavka);
        }

    });
});

app.get("/:zadatak.pdf", function (req, res) {
    res.sendFile(__dirname + '/public/Fajlovi/' + req.params.zadatak + '.pdf');
});



//Zadatak 7
app.get('/zadaci', function (req, res) {
    var niz = [];
    var acceptHeader = req.headers.accept;
    var imaJSON = false;
    var imaXML = false;
    var imaCSV = false;
    if (acceptHeader.indexOf("json") !== -1) {
        imaJSON = true;
    }
    if (acceptHeader.indexOf("xml") !== -1) {
        imaXML = true;
    }
    if (acceptHeader.indexOf("csv") !== -1) {
        imaCSV = true;
    }
    if (imaJSON !== true && imaXML !== true && imaCSV !== true) {
        imaJSON = true;
    }

    db.zadatak.findAll().then(function (zad) {
        for (var i = 0; i < zad.length; i++) {
            var objekat = { naziv: zad[i].dataValues.naziv, postavka: zad[i].dataValues.postavka };
            niz.push(objekat);
        }

        if (niz.length === 0) {
            if (imaJSON) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(niz));
                res.end();
            }
            else if (imaXML) {
                res.writeHead(200, { 'Content-Type': 'application/xml' });
                var ispisXML = `<?xml version="1.0" encoding="UTF-8"?>
<zadaci>`;
                ispisXML += `\n
</zadaci>`;
                res.end(ispisXML);
            }
            else if (imaCSV) {
                res.writeHead(200, { 'Content-Type': 'text/csv' });
                var ispisCSV = "";
                res.end(ispisCSV);
            }

        }
        else {
            if (imaJSON) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(niz));
                res.end();
            }
            else if (imaXML) {
                res.writeHead(200, { 'Content-Type': 'application/xml' });
                var ispisXML = `<?xml version="1.0" encoding="UTF-8"?>
<zadaci>`;
                for (var i = 0; i < niz.length; i++) {
                    ispisXML += `
<zadatak>
<naziv>` + niz[i].naziv + `</naziv>
<postavka>` + niz[i].postavka + `</postavka>
</zadatak>`;
                }
                ispisXML += `
</zadaci>`;
                res.end(ispisXML);
            }
            else if (imaCSV) {
                res.writeHead(200, { 'Content-Type': 'text/csv' });
                var ispisCSV = "";
                for (var k = 0; k < niz.length; k++) {
                    if (k === niz.length - 1) {
                        ispisCSV += niz[k].naziv + "," + niz[k].postavka;
                    }
                    else {
                        ispisCSV += niz[k].naziv + "," + niz[k].postavka + "\n";
                    }
                }
                res.end(ispisCSV);
            }
        }
    });
});

//2.a i 2.b
app.post('/addVjezba', function (req, res) {
    var tijelo = req.body;
    var naziv = tijelo.naziv;
    var spirala = tijelo.spirala;
    var unesi = false;
    if (spirala === "on") {
        unesi = true;
    }
    else {
        unesi = false;
    }
    if (tijelo.sVjezbe !== undefined) {
        if (tijelo.sGodine !== undefined) {
            db.vjezba.findOne({ where: { id: tijelo.sVjezbe } }).then(function (vje) {
                if (vje) {
                    db.godina.findOne({ where: { id: tijelo.sGodine } }).then(function (rez1) {
                        if (rez1) {
                            vje.addGodine([rez1]);
                            res.redirect("addVjezba.html");
                        }
                        else {
                            porukaOGresci = "Greška: Godina ne postoji!";
                            res.render('greska.pug', { greskaIspis: porukaOGresci });
                        }
                    });
                }
                else {
                    porukaOGresci = "Greška: Vježba ne postoji!";
                    res.render('greska.pug', { greskaIspis: porukaOGresci });
                }

            });
        }
        else {
            porukaOGresci = "Greška: Nisu svi podaci uneseni!";
            res.render('greska.pug', { greskaIspis: porukaOGresci });
        }

    }
    else {

        if (naziv !== undefined && tijelo.sGodine !== undefined && naziv !== "") {
            db.vjezba.findOne({ where: { naziv: naziv } }).then(function (vje) {
                if (!vje) {
                    db.godina.findOne({ where: { id: tijelo.sGodine } }).then(function (rez1) {
                        if (rez1) {
                            db.vjezba.create({ naziv: naziv, spirala: unesi }).then(function (rez) {
                                rez.addGodine([rez1]);
                                res.redirect("addVjezba.html");
                            });
                        }
                        else {
                            porukaOGresci = "Greška: Godina ne postoji!";
                            res.render('greska.pug', { greskaIspis: porukaOGresci });
                        }

                    });
                }
                else {
                    porukaOGresci = "Greška: Vježba već postoji!";
                    res.render('greska.pug', { greskaIspis: porukaOGresci });
                }
            });
        }
        else {
            porukaOGresci = "Greška: Nisu svi podaci uneseni!";
            res.render('greska.pug', { greskaIspis: porukaOGresci });
        }

    }

});

//2.c

app.post('/vjezba/:idVjezbe/zadatak', function (req, res) {
    var id = req.params.idVjezbe;
    var zadatak = req.body.sZadatak;

    if (zadatak !== undefined && req.body.sVjezbe !== undefined) {
        db.vjezba.findOne({ where: { id: id } }).then(function (vje) {
            if (vje) {
                db.zadatak.findOne({ where: { id: zadatak } }).then(function (zad) {
                    if (zad) {
                        vje.addZadaci([zad]);
                        res.redirect("addVjezba.html");
                    }
                    else {
                        porukaOGresci1 = "Greška: Zadatak ne postoji!";
                        console.log(porukaOGresci1);
                    }

                });
            }
            else {
                porukaOGresci1 = "Greška: Vježba ne postoji!";
                console.log(porukaOGresci1);
            }
        });
    }
    else {
        porukaOGresci1 = "Greška: Nisu svi podaci uneseni!";
        console.log(porukaOGresci1);
    }

});

//3.a
app.post('/student', function (req, res) {
    var tijelo = req.body;
    var idGodine = tijelo.godina;
    var nizStudenata = JSON.parse(tijelo.studenti);
    var n = 0;
    var m = 0;
    var postoji = 0;

    if (idGodine !== 0) {
        db.student.findAll().then(function (stu) {
            if (stu.length === 0 && nizStudenata.length !== 0) {
                for (var i = 0; i < nizStudenata.length; i++) {
                    db.student.create({ imePrezime: nizStudenata[i].imePrezime, index: nizStudenata[i].index, studentGod: idGodine });
                    n++;
                    m++;
                }
            }
            else {
                var pozicija = [];
                for (var j = 0; j < nizStudenata.length; j++) {
                    for (var k = 0; k < stu.length; k++) {
                        if (nizStudenata[j].index === stu[k].index) {
                            postoji = 1;
                            db.student.update({ studentGod: idGodine }, { where: { index: nizStudenata[j].index } });
                            m++;
                            pozicija.push(k);
                        }
                    }
                    if (postoji === 0) {
                        db.student.create({ imePrezime: nizStudenata[j].imePrezime, index: nizStudenata[j].index, studentGod: idGodine });
                        n++;
                        m++;
                    }
                    postoji = 0;
                }

                var pozBrojac = 0;
                for (var i = 0; i < stu.length; i++) {
                    if (i != pozicija[pozBrojac]) {
                        if (stu[i].studentGod == idGodine) {
                            m++;
                        }
                    }
                    else {
                        pozBrojac++;
                    }
                }
            }
            db.godina.findOne({ where: { id: idGodine } }).then(function (god) {
                var porukaAlert = { message: "Dodano je " + n + " novih studenata i upisano " + m + " na godinu " + god.nazivGod };
                res.send(porukaAlert);
            });

        });
    }

});



app.get('/vrati', function (req, res) {
    if (porukaOGresci1 !== "") {
        res.render('greska.pug', { greskaIspis: porukaOGresci1 });
    }
    else {
        res.redirect("addVjezba.html");
    }
});


app.listen(8080);