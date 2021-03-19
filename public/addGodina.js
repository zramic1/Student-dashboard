function izvrsi() {

    var mojDiv = document.getElementById("ispis");
    var naziv=document.getElementById("naziv");
    var rvjezbe = document.getElementById("rvjezbe");
    var rspiral = document.getElementById("rspiral");
    var validacija = new Validacija(mojDiv);
    validacija.godina(naziv);
    validacija.repozitorij(rvjezbe, /(^([A-Z]|[a-z])(\w|[:;?!",-\\\/]){1,}(\d|[a-z])$)/);
    validacija.naziv(rspiral);

    if(validnaPolja[1] == 1 && validnaPolja[2] == 1 && validnaPolja[4] == 1){
        return true;
    }
    else{
        return false;
    }
    
}