function izvrsi(){
    var mojDiv = document.getElementById("ispis");
    var inputNaziv=document.getElementById("naziv");
    var validacija = new Validacija(mojDiv);
    validacija.naziv(inputNaziv);

    if(validnaPolja[4] == 1){
        return true;
    }
    else{
        return false;
    }
    
}