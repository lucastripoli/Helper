$( document ).ready(function() {

    var calc = [];

    name = "calc";

    calc = function (val){    
        title  = {template : "text", out : "insira algum valor para iniciar a calculadora"};
        if(val != ""){
            scrp = {template : "copylink", out : eval(val)};
            return [scrp];
        }else{
            return [title];
        }
    }
    
    addToActualObject(name, calc);
    system.load();
    
});
