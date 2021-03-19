function pozovi(){
    var p = new ZadaciAjax(function(s) { console.log(s) });
    p.dajJSON();
    //p.dajCSV();
    //p.dajXML();
    return false;
}