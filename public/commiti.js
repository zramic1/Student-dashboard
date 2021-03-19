function kreiraj() {
    var mojDiv=document.getElementById("glavni");
    var brReda = document.getElementById("kbrRedova");
    tabela= new CommitTabela(mojDiv,parseInt(brReda.value));
    return false;
}

function dodaj() {

    var brReda = document.getElementById("dbrReda");
    var mojDiv = document.getElementById("ispis");
    var validacija = new Validacija(mojDiv);
    var url = document.getElementById("durl");
    validacija.url(url);
    
    if(validnaPolja[6]  === 1 && parseInt(brReda.value) >= 0){
        tabela.dodajCommit(parseInt(brReda.value), url.value);
    }

    return false;
}

function edituj() {

    var brReda = document.getElementById("ebrReda");
    var commit = document.getElementById("ebrCommita");
    var url = document.getElementById("eurl");
    var mojDiv = document.getElementById("ispis");
    var validacija = new Validacija(mojDiv);
    validacija.url(url);

    if(validnaPolja[6]  === 1 && parseInt(brReda.value)>=0 && parseInt(commit.value)>=0){
        tabela.editujCommit(parseInt(brReda.value), parseInt(commit.value), url.value);
    }
    return false;
}

function obrisi() {

    var brReda = document.getElementById("obrReda");
    var commit = document.getElementById("obrCommita");
    if(parseInt(brReda.value)>=0 && parseInt(commit.value)>=0){
        tabela.obrisiCommit(parseInt(brReda.value), parseInt(commit.value));
    }

    return false;
}