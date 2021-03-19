var BitBucket = (function () {
    var konstruktor = function (key, secret) {
        vratio = 0;
        var pomocna = new Promise(function (resolve, reject) {
            var ajax = new XMLHttpRequest();

            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4 && ajax.status === 200) {
                    token = JSON.parse(ajax.responseText).access_token;
                    resolve(token);
                }
                else if (ajax.readyState === 4) {
                    reject("Token je pogrešan!");
                }
            }
            ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key + ":" + secret));
            ajax.send("grant_type=" + encodeURIComponent("client_credentials"));
        });

        return {
            ucitaj: function (nazivRepSpi, nazivRepVje, callback) {
                pomocna.then(function (token) {

                    var ajax = new XMLHttpRequest();

                    ajax.onreadystatechange = function () {
                        if (ajax.readyState === 4 && ajax.status === 200) {
                            var odgovor = JSON.parse(ajax.responseText).values;
                            var niz = [];
                            var postoji = 0;
                            for(var i=0; i<odgovor.length; i++){
                                var ime = odgovor[i].owner.display_name;
                                var pom = odgovor[i].name;
                                var indeks = pom.substring(pom.length-5, pom.length);
                                
                                var objekat = {imePrezime: ime, index: indeks};

                                for(var j=0; j<niz.length; j++){
                                    if(objekat.index === niz[j].index){
                                        postoji = 1;
                                        break;
                                    }
                                }

                                if(postoji === 0){
                                    niz.push(objekat);
                                }
                                
                                postoji = 0;
                                
                            }

                            callback(null, niz);
                        }
                        else if (ajax.readyState === 4) {
                            poruka = "Nije moguće dohvatiti listu repozitorija!";
                            callback(poruka, null);
                        }
                    }
                    ajax.open("GET", "https://api.bitbucket.org/2.0/repositories?role=member&q=name=%22" + nazivRepSpi + "%22" + "+OR+name+%3D+%22" + nazivRepVje + "%22");
                    ajax.setRequestHeader("Authorization", 'Bearer ' + token);
                    ajax.send();
                }).catch(function(err){
                    console.log(err);
                    callback(err, null);
                });
            }
        }
    }
    return konstruktor;
}()); 