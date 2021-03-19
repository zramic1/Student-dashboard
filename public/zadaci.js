function izvrsi(){
    var mojDiv = document.getElementById("ispis");
    var inputIme=document.getElementById("ime");
    var validacija = new Validacija(mojDiv);
    validacija.ime(inputIme);

    return false;
}