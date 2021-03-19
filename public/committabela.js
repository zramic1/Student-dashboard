var CommitTabela = (function() {

    var tabela = document.createElement('table');
    var pamtiMax = [];
    var postoji = 0;

    var konstruktor = function (divElement, brojZadataka) {

        if(postoji === 1){
            tabela.innerHTML="";
            postoji = 0;
        }
        if(postoji === 0){   
        for(var i=0; i<brojZadataka + 1; i++) {
            pamtiMax[i] = 0;
            var tr = document.createElement('tr');
            tabela.appendChild(tr); 
            
            for(var j=0; j<2; j++){
                var td = document.createElement('td');
                tr.appendChild(td);
                if(i==0){
                    if(j==0){
                        td.innerHTML = "Naziv zadatka";
                    }
                    else {
                        td.innerHTML = "Commiti";
                    }
                }
                else {
                    if(j==0){
                        td.innerHTML = "Zadatak " + i;
                    }
                }
            }  
            tabela.appendChild(tr);
            postoji = 1; 
        }
            divElement.appendChild(tabela);
        }
        return {
            dodajCommit:function (rbZadatka, url) {

                if(postoji==0 || tabela.rbZadatka<0 || rbZadatka>=tabela.rows.length){
                    return -1;
                }

                var red = tabela.rows[rbZadatka+1];
                var vrijednost = red.cells[red.cells.length-1].innerHTML;
                
                if(vrijednost.length!=0)
                    red.insertCell(red.cells.length);
                    pamtiMax[rbZadatka+1]++;
                    var a = document.createElement('a');
                    var linkText = document.createTextNode(pamtiMax[rbZadatka+1]);
                    a.appendChild(linkText);
                    a.href = url;
                    red.cells[red.cells.length-1].appendChild(a);
                    red.cells[red.cells.length-1].colSpan = 1;
                    
                    var propNajduzegReda = najduziRed();
                    
                    if(red.rowIndex !== propNajduzegReda.index && red.cells.length !== propNajduzegReda.length) {
                        var td = document.createElement('td');
                        red.appendChild(td).colSpan = tabela.rows[propNajduzegReda.index].cells.length - (red.cells.length - 1);
                    }

                    
                    for(var i = 0; i < tabela.rows.length; i++) {
                        if( i !== red.rowIndex && i !== propNajduzegReda.index){
                            tabela.rows[i].cells[tabela.rows[i].cells.length - 1].colSpan = tabela.rows[propNajduzegReda.index].cells.length - (tabela.rows[i].cells.length - 1);
                        }
                    }

                    for(var j=0; j<tabela.rows.length; j++){
                        if(tabela.rows[j].cells[tabela.rows[j].cells.length - 1].innerText.length!==0 && tabela.rows[j].cells[tabela.rows[j].cells.length - 1].colSpan !== 1 && j!==0){
                            tabela.rows[j].cells[tabela.rows[j].cells.length-1].colSpan = 1;
                            var td = document.createElement('td');
                            tabela.rows[j].appendChild(td).colSpan = tabela.rows[propNajduzegReda.index].cells.length - (tabela.rows[j].cells.length - 1);
                        }
                    }

                    
            },
            editujCommit:function (rbZadatka, rbCommita, url) {
                if(postoji==0 || rbZadatka<0 || rbZadatka>=tabela.rows.length || rbCommita<0 || rbCommita>pamtiMax[rbZadatka+1]){
                    return -1;
                }
                else{

                    tabela.rows[rbZadatka+1].getElementsByTagName("a")[rbCommita].setAttribute("href", url);
                }
            },
            obrisiCommit:function (rbZadatka, rbCommita) {

                if(postoji==0 || rbZadatka<0 || rbZadatka>=tabela.rows.length || rbCommita<0 || rbCommita>pamtiMax[rbZadatka+1]){
                    return -1;  
                }
                else{
                    
                    var celijeKojeTrebajuOstati = [];
                    var linkovi = [];
                    for(var i=1; i<tabela.rows[rbZadatka+1].cells.length; i++){
                        var vrijednostUCeliji = tabela.rows[rbZadatka+1].cells[i].innerText; 
                        if(vrijednostUCeliji.length!=0 && i!=(rbCommita+1)){
                            celijeKojeTrebajuOstati.push(vrijednostUCeliji);
                            linkovi.push(tabela.rows[rbZadatka+1].getElementsByTagName("a")[i-1].getAttribute("href"));
                        }
                    }

                    
                    
                    tabela.deleteRow(rbZadatka+1);
                    tabela.insertRow(rbZadatka+1);
                    var kolona = tabela.rows[rbZadatka+1].insertCell(0);
                    kolona.innerHTML = "Zadatak " + (rbZadatka+1);
               
                    var red = tabela.rows[rbZadatka+1]; 
                
                    for(var j=0; j<celijeKojeTrebajuOstati.length; j++){
                        red.insertCell(red.cells.length);
                        var a = document.createElement('a');
                        var linkText = document.createTextNode(celijeKojeTrebajuOstati[j]);
                        a.appendChild(linkText);
                        a.href = linkovi[j];
                        red.cells[red.cells.length-1].appendChild(a);
                        red.cells[red.cells.length-1].colSpan = 1;
                    }

                    
                    var propNajduzegReda = najduziRed();

                    if(red.rowIndex !== propNajduzegReda.index && red.cells.length !== propNajduzegReda.length) {
                        var td = document.createElement('td');
                        red.appendChild(td).colSpan = tabela.rows[propNajduzegReda.index].cells.length - (red.cells.length - 1);
                    }

                    for(var i = 0; i < tabela.rows.length; i++) {
                            if(propNajduzegReda.index !== i || tabela.rows[i].cells.length !== duzinaBezPraznihPolja(tabela.rows[i].cells.length)) {
                            var colSpan = propNajduzegReda.length - duzinaBezPraznihPolja(tabela.rows[i].cells);

                            if(colSpan === 0 && tabela.rows[i].cells[tabela.rows[i].cells.length - 1].childElementCount === 0) {
                                tabela.rows[i].deleteCell(tabela.rows[i].cells.length - 1);
                            } else {
                                if(colSpan !== 0)
                                    tabela.rows[i].cells[tabela.rows[i].cells.length - 1].colSpan = colSpan;
                            }
                        }
                    }   

                }   
            }
        
        }

        function najduziRed() {
            var max = 0;
            var index = 0;
            for(var i=1; i<tabela.rows.length; i++){
                var duzina = duzinaBezPraznihPolja(tabela.rows[i].cells);
                if(duzina > max) {
                    max = duzina;
                    index = i;
                }
            }
            return {
                'index': index,
                'length': max
            };
        }

        function duzinaBezPraznihPolja(celije) {
            var duzina = 0;

            for(var i = 0; i <celije.length; i++) {
                if(celije[i].childElementCount !== 0) {
                    duzina++;
                }
            }
            duzina++;
            return duzina;
        }
    }

    return konstruktor;
}());