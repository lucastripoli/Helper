$( document ).ready(function() {
    //name
    //description

    var php = [];

    name = "php";
    php.description = "this is a basic module for php";

    php["console"] = [];
    php.console.cli = "teste de qualidade basica relativa a utilização de sistema simples";
    

    php.home = function(var0){

        return [{template: "disabletextarea", out:"google.com.br"}]
    }

    php.if = function(var0) {
        vars = var0.split(";");
        ret = "if ("+vars[0]+") <br> { "+vars[1]+" }";
        return [{template : "copylink", out : ret}];
    }

    addToActualObject(name, php);
    system.load();
});

