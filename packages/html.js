$( document ).ready(function() {
    //name
    //description

    var obj = [];

    name = "html";
    obj.description = "basics about html 5";

    obj.basicstructure = function(var0){
        ret = system.newLine("<html>");
        ret += system.newLine("    <head>");
        ret += system.newLine("    </head>");
        ret += system.newLine("    <body>");
        ret += system.newLine("    </body>");
        ret += system.newLine("</html>");
        
        if(var0 == "cp"){
            system.copyAndClose(ret);
        }

        return [{template:"text",out: "Digite 'cp' para copiar" }, {template : "disabletextarea", out : ret}];
    }

    obj.css = [];

    obj.css.description = "is a meta language to style the html";

    obj.css.importExemple = function(var0){
        ret = system.newLine("<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">");
        if(var0 == "cp"){
            system.copyAndClose(ret);
        }

        return [{template:"text",out: "Digite 'cp' para copiar" }, {template : "disabletextarea", out : ret}];
        
    }

    addToActualObject(name, obj);
    system.load();
    
});
