var Validacija = (function() {

    

    var konstruktor = function(divElementPoruke) {

        vrsteValidacije = ["ime", "godina", "naziv", "index", "naziv", "password", "url"];
        validnaPolja = [1,1,1,1,1,1,1];

        return {
            ime:function (inputElement) {

                var regex = /^('?[A-Z]'?([a-z]'?)+){1}((\s|\-)'?[A-Z]'?([a-z]'?)+){0,3}$/;
                if(regex.test(inputElement.value)){
                        inputElement.style.backgroundColor = "white";
                        validnaPolja[0] = 1;   
                }
                else {
                    inputElement.style.backgroundColor = "orangered";
                    validnaPolja[0] = 0;
                }

                var brojNeValidnih = 0;
                for(var i=0; i<validnaPolja.length; i++){
                    if(validnaPolja[i]===0) brojNeValidnih++;
                }

                if(brojNeValidnih > 0){
                    divElementPoruke.innerHTML = "Sljedeća polja nisu validna: ";
                }

                if(brojNeValidnih===0){
                    divElementPoruke.innerHTML = "";
                }
                else {
                    var br=0;
                    for(var j=0; j<validnaPolja.length; j++){
                        if(validnaPolja[j] === 0){
                            divElementPoruke.innerHTML += vrsteValidacije[j];
                            br++;
                            if(br<brojNeValidnih){
                                divElementPoruke.innerHTML += ", "
                                
                            }
                            else{
                                divElementPoruke.innerHTML += "!"
                            }
                        }
                    }
                    
                }
                
        
            
            },
            
            godina:function(inputElement) {

                var regex1 = /^\d{4}\/\d{4}$/;

                if(regex1.test(inputElement.value)) {
                
                   var  prvaGodina = parseInt(inputElement.value.substring(2,4));
                   var drugaGodina = parseInt(inputElement.value.substring(7,9))

                    if(drugaGodina === prvaGodina + 1){
                        inputElement.style.backgroundColor = "white";
                        validnaPolja[1] = 1;
                    }
                    else {
                        inputElement.style.backgroundColor = "orangered";
                        validnaPolja[1] = 0;
                    }
                }
                else {
                    inputElement.style.backgroundColor = "orangered";
                    validnaPolja[1] = 0;
                }

                
                var brojNeValidnih = 0;
                for(var i=0; i<validnaPolja.length; i++){
                    if(validnaPolja[i]===0) brojNeValidnih++;
                }

                if(brojNeValidnih > 0){
                    divElementPoruke.innerHTML = "Sljedeća polja nisu validna: ";
                }

                if(brojNeValidnih===0){
                    divElementPoruke.innerHTML = "";
                }
                else {
                    var br=0;
                    for(var j=0; j<validnaPolja.length; j++){
                        if(validnaPolja[j] === 0){
                            divElementPoruke.innerHTML += vrsteValidacije[j];
                            br++;
                            if(br<brojNeValidnih){
                                divElementPoruke.innerHTML += ", "
                            }
                            else{
                                divElementPoruke.innerHTML += "!"
                            }
                        }
                    }
                    
                }

            },
            repozitorij:function (inputElement, regex) {
                if(regex.test(inputElement.value)){
                    inputElement.style.backgroundColor = "white";
                    validnaPolja[2] = 1;
                }
                else {
                    inputElement.style.backgroundColor = "orangered";
                    validnaPolja[2] = 0;
                }

                
                var brojNeValidnih = 0;
                for(var i=0; i<validnaPolja.length; i++){
                    if(validnaPolja[i]===0) brojNeValidnih++;
                }
                if(brojNeValidnih > 0){
                    divElementPoruke.innerHTML = "Sljedeća polja nisu validna: ";
                }

                if(brojNeValidnih===0){
                    divElementPoruke.innerHTML = "";
                }
                else {
                    var br=0;
                    for(var j=0; j<validnaPolja.length; j++){
                        if(validnaPolja[j] === 0){
                            divElementPoruke.innerHTML += vrsteValidacije[j];
                            br++;
                            if(br<brojNeValidnih){
                                divElementPoruke.innerHTML += ", "
                            }
                            else{
                                divElementPoruke.innerHTML += "!"
                            }
                        }
                    }
                    
                }
            },
            index:function (inputElement) {

                var reg = /([1][4-9]|[2][0])\d{3}/;
                if(inputElement.value.length==5){
                    if(reg.test(inputElement.value)){
                        inputElement.style.backgroundColor = "white";
                        validnaPolja[3] = 1;
                    }
                    else {
                       inputElement.style.backgroundColor = "orangered";
                       validnaPolja[3] = 0;
                    }
                }
                else{
                    inputElement.style.backgroundColor = "orangered";
                    validnaPolja[3] = 0;
                }

                
                var brojNeValidnih = 0;
                for(var i=0; i<validnaPolja.length; i++){
                    if(validnaPolja[i]===0) brojNeValidnih++;
                }
                if(brojNeValidnih > 0){
                    divElementPoruke.innerHTML = "Sljedeća polja nisu validna: ";
                }

                if(brojNeValidnih===0){
                    divElementPoruke.innerHTML = "";
                }
                else {
                    var br=0;
                    for(var j=0; j<validnaPolja.length; j++){
                        if(validnaPolja[j] === 0){
                            divElementPoruke.innerHTML += vrsteValidacije[j];
                            br++;
                            if(br<brojNeValidnih){
                                divElementPoruke.innerHTML += ", "
                                
                            }
                            else{
                                divElementPoruke.innerHTML += "!"
                            }
                        }
                    }
                    
                }
            },
            naziv:function (inputElement) {

                var regeks = /(^([A-Z]|[a-z])(\w|[:;?!",-\\\/]){1,}(\d|[a-z])$)/;
                if(regeks.test(inputElement.value)){
                    inputElement.style.backgroundColor = "white";
                    validnaPolja[4] = 1;
                }
                else {
                    inputElement.style.backgroundColor = "orangered";
                    console.log("usao", 1);
                    validnaPolja[4] = 0;
                }
                
                
                var brojNeValidnih = 0;
                for(var i=0; i<validnaPolja.length; i++){
                    if(validnaPolja[i]===0) brojNeValidnih++;
                }

                if(brojNeValidnih > 0){
                    divElementPoruke.innerHTML = "Sljedeća polja nisu validna: ";
                }

                if(brojNeValidnih===0){
                    divElementPoruke.innerHTML = "";
                }
                else {
                    var br=0;
                    for(var j=0; j<validnaPolja.length; j++){
                        if(validnaPolja[j] === 0){
                            divElementPoruke.innerHTML += vrsteValidacije[j];
                            br++;
                            if(br<brojNeValidnih){
                                divElementPoruke.innerHTML += ", "
                                
                            }
                            else{
                                divElementPoruke.innerHTML += "!"
                            }
                        }
                    }
                    
                }
            },
            password:function (inputElement) {
                var regex1 = /(^(\d+[a-z]+|[a-z]+\d+)([a-z]|\d)*)/;
                var regex2 = /(^(\d+[A-Z]+|[A-Z]+\d+)([A-Z]|\d)*)/;
                var regex3 = /(^([a-z]+[A-Z]+|[A-Z]+[a-z]+)([A-Z]|[a-z])*)/;
                var regex4 = /(^(\d+[A-Z]+[a-z]+|[A-Z]+\d+[a-z]+)([A-Z]|\d|[a-z])*)/;

                if((regex1.test(inputElement.value) || regex2.test(inputElement.value) || regex3.test(inputElement.value) || regex4.test(inputElement.value)) && inputElement.value.length>=8){
                    inputElement.style.backgroundColor = "white";
                    validnaPolja[5] = 1;
                }
                else{
                    inputElement.style.backgroundColor = "orangered";
                    validnaPolja[5] = 0;
                    
                }

                var brojNeValidnih = 0;
                for(var i=0; i<validnaPolja.length; i++){
                    if(validnaPolja[i]===0) brojNeValidnih++;
                }

                if(brojNeValidnih > 0){
                    divElementPoruke.innerHTML = "Sljedeća polja nisu validna: ";
                }

                if(brojNeValidnih===0){
                    divElementPoruke.innerHTML = "";
                }
                else {
                    var br=0;
                    for(var j=0; j<validnaPolja.length; j++){
                        if(validnaPolja[j] === 0){
                            divElementPoruke.innerHTML += vrsteValidacije[j];
                            br++;
                            if(br<brojNeValidnih){
                                divElementPoruke.innerHTML += ", "
                                
                            }
                            else{
                                divElementPoruke.innerHTML += "!"
                            }
                        }
                    }
                    
                }
                
            },
            url:function (inputElement) {
                var regex2 = /^((ftp|http|https|ssh):\/\/)[a-zA-Z0-9]+\b[a-zA-Z0-9\-]*\b[a-zA-Z0-9]*(\.[a-zA-Z]+\b[a-zA-Z0-9\-]*\b[a-zA-Z0-9]*)*((\/)[a-zA-Z0-9]+\b[a-zA-Z0-9\-]*\b[a-zA-Z0-9]*(\/?))*(\?[a-zA-Z0-9]+\b[a-zA-Z0-9\-]*\b[a-zA-Z0-9]*=[a-zA-Z0-9]+\b[a-zA-Z0-9\-]*\b[a-zA-Z0-9]*(&[a-zA-Z0-9]+\b[a-zA-Z0-9\-]*\b[a-zA-Z0-9]*=[a-zA-Z0-9]+\b[a-zA-Z0-9\-]*\b[a-zA-Z0-9]*)+)?$/;
                if(regex2.test(inputElement.value)){
                    inputElement.style.backgroundColor = "white";
                    validnaPolja[6] = 1;
                }
                else {
                    inputElement.style.backgroundColor = "orangered";
                    validnaPolja[6] = 0;
                }

                
                var brojNeValidnih = 0;
                for(var i=0; i<validnaPolja.length; i++){
                    if(validnaPolja[i]===0) brojNeValidnih++;
                }

                if(brojNeValidnih > 0){
                    divElementPoruke.innerHTML = "Sljedeća polja nisu validna: ";
                }

                if(brojNeValidnih===0){
                    divElementPoruke.innerHTML = "";
                }
                else {
                    var br=0;
                    for(var j=0; j<validnaPolja.length; j++){
                        if(validnaPolja[j] === 0){
                            divElementPoruke.innerHTML += vrsteValidacije[j];
                            br++;
                            if(br<brojNeValidnih){
                                divElementPoruke.innerHTML += ", "
                               
                            }
                            else{
                                divElementPoruke.innerHTML += "!"
                            }
                        }
                    }
                    
                }
            }
            

        }

        
        
    }
    return konstruktor;

    
}());