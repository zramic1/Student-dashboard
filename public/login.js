
function izvrsi(){
    var mojDiv = document.getElementById("ispis");
    var inputPassword = document.getElementById("password");
    var validacija = new Validacija(mojDiv);
    validacija.password(inputPassword);
}