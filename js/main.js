var sekai = [];

var packages = [];

function addToActualObject(key, content){
    sekai[key] = content;
}

var actualObj = sekai;

function saveData(){
    localStorage.setItem("packages", JSON.stringify(packages));
}

function initData(){
    packages = JSON.parse(localStorage.getItem("packages"));
}


function loadData(){
    for (var package in packages) {
        $.getScript("./packages/"+packages[package]+".js", function(){
            console.log("Package "+packages[package]+" was imported sucessfully");
        });
    }
}

var system = [];

packages.push("clipboard");
packages.push("php");
packages.push("calc");
packages.push("docker");
packages.push("html");


$(document).ready(function() {
                
		const remote = require('electron').remote;
		var win = remote.getCurrentWindow();

        system.load = function refocus(){
                $( "#typer2" ).val("");
                $( "#typer2" ).focus();
                $("#typer2").keyup();
                $( "#typer2" ).focus();
            }
        system.copyAndClose = function(var0){
                var $temp = $("<textarea>");
                $("body").append($temp);
                $temp.val(var0).select();
                document.execCommand("copy");
                $temp.remove();
                changeState();
        }

        var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
        };

        function replaceTag(tag) {
        return tagsToReplace[tag] || tag;
        }

        system.tagReplace = function safe_tags_replace(str) {
            return str.replace(/[&<>]/g, replaceTag);
        }

        system.newLine = function newLine(var0){
            return var0+"\r\n";
        }

        system.bootstrap = [];
        system.bootstrap.icon = function (value){
            return "<span class=\"glyphicon glyphicon-"+value+"\" aria-hidden=\"true\"></span>"
        }



        win.on('hide', () => {
            statusWin = false;
        })

        win.on('show', () => {
            statusWin = true;
            $( "#typer2" ).val("");
            $( "#typer2" ).focus();
            $("#typer2").keyup();
        } )

        var statusWin = true;
        function changeState(){
            if(statusWin){
                statusWin = false;
                win.hide();
            }
        }

            function searchThis(searchOBJ){
                var arr = [];
                for (var key in actualObj) {
                    var res = key.indexOf(searchOBJ);
                    if(res != -1){
                        arr.push(key);
                    }
                }
                return arr;
            }

            function mountThis(keys){
                var retorno = "";
                for (var key in keys) {

                    if(typeof actualObj[keys[key]] == "object"){
                        if(typeof actualObj[keys[key]].description == "string"){
                            retorno += template["text"](template["library"]("<span class=\"passIt Reachable\" tabindex=\"0\" >"+ keys[key]+"</span> - "+actualObj[keys[key]].description));
                        }else{
                            retorno += template["text"](template["library"]("<span class=\"passIt Reachable\" tabindex=\"0\" >"+ keys[key]+"</span>"));
                        }
                        
                    }else{
                        if(typeof actualObj[keys[key]] == "function"){
                            retorno += template["text"](template["program"]("<span class=\"passIt Reachable\" tabindex=\"0\" >"+ keys[key] +"</span>"));
                        }/*else if(isArray(actualObj)){
                            retorno += "<p><span class=\"clickable\" tabindex=\"0\" >"+ actualObj[keys[key]] +"</span></p>"
                        }*/else{
                            retorno += template["text"]("<span class=\" Reachable\" tabindex=\"0\">"+ keys[key] +"</span> - <span class=\"clickable \" tabindex=\"0\" >"+ actualObj[keys[key]] +"</span>");
                        }
                        
                    }

                }
                return retorno;
            }

            $( "#typer2" ).keyup(function() {
                var valor =  $(this).val();
                var res = valor.split(".");
                objSolver(valor);
            });

            function mountFunction(values){
                var outer = "";

                for (var value in values) {
                    outer += template[values[value].template](values[value].out);
                }
                
                return outer;
                //return "<p><span class=\"clickable\" tabindex=\"0\" >"+ value +"</span></p>"
            }

            function objSolver(valor){
                var res = valor.indexOf(".");
                var cont  = true;
                var lvl = sekai;
                var aggr = false;
                if(res != -1){
                    var scale = valor.split(".");
                    var itemError = "";

                    for(nivel in scale){
                        if(aggr){
                            if(valor == ""){
                                valor = scale[nivel];
                            }else{
                                valor = valor + "." + scale[nivel];
                            }
                        }else{
                            if (scale[nivel] != "" && scale[scale.length - 1] != scale[nivel]){
                                lvl = lvl[scale[nivel]];
                                if(typeof lvl == "function" && scale[scale.length - 2] != scale[nivel]){
                                    aggr = true;
                                    valor = "";data
                                }
                                if(typeof lvl == "undefined"){
                                    cont = false;
                                    itemError = nivel;
                                    break; 
                                }
                            }else{
                                valor = scale[scale.length - 1]
                            }
                        }
                    }
                }
                actualObj = lvl;

                if(cont){

                    if(typeof actualObj == "function"){
                        var itens = mountFunction(actualObj(valor));
                    }else{
                        var itens =  mountThis(searchThis(valor));
                    }
                    

                    if(itens == ""){
                        $("#options2").html(template["text"]("No items found"));
                    }else{
                        $("#options2").html(itens);
                    }

                }else{
                     $("#options2").html(template["text"]("This item does not exists"));
                }
            }
            
            
            function mountSelect(keys){
                var retorno = ""
                for (var key in keys) {
                    retorno += "<div id=\""+keys[key]+"\"> {<span class=\"clickable\">"+keys[key]+"</span>}{<span class=\"clickable\"> "+chaveamento[keys[key]].value+"</span>}{<span class=\"clickable\">"+chaveamento[keys[key]].description+"</span>} </div>" ;                    
                }
                return retorno;
            }
            
            $(document).on('click', '#copyTyper2', function(){
                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val($("#typer2").val()).select();
                document.execCommand("copy");
                $temp.remove();
                changeState();
            });

            $(document).on('click', '#clearTyper2', function(){
                $("#typer2").val("");
                $("#typer2").keyup();
            });

            $(document).on('keypress', '.passIt', function(){
                $(this).click();
                $(this).next();
            });

            document.querySelector('body').addEventListener('keyup', function(event) {
                
                var tecla = event.keyCode;

                if (tecla == 38){
                    $("#typer2").focus();
                    $("#typer2").get(0).setSelectionRange(1024,512);
                }

                if(tecla == 40){
                         $("ul").first().has(".Reachable") ? $(".Reachable").first().focus() : $("ul").first().has("span").first().focus();
                }

                if(tecla == 114){
                    $("#clearTyper2").click();
                }

                if(tecla == 115){
                    $("#addClip").click();
                }

            });
            
        function stringToFunc(str){ 
                return new Function("val", str);
        }

        $("#typer2").focus(function(){
            $(this).get(0).setSelectionRange(1024,512);
        });            	
            	
        function addClickToPassIt(){
            $(document).off( "click", ".passIt" );
            $(document).on('click', '.passIt', function () {
                if($("#typer2").val().slice(-1) == "."){
                    $("#typer2").val($("#typer2").val()+$(this).text()+ ".");
                }else{
                    var parts = $("#typer2").val().split(".");
                    parts.pop();
                    parts.push($(this).text());
                    parts = parts.join(".");
                    $("#typer2").val(parts+ ".");
                }
                $("#typer2").keyup();
                $("#typer2").focus();
            });
        }	
        addClickToPassIt();

    $(document).on('keypress', '.clickable', function(){
        $(this).click();
    });

    $(document).on('click', '.clickable', function () {
        
		var $temp = $("<input>");
                $("body").append($temp);
                $temp.val($(this).text()).select();
                document.execCommand("copy");
                $temp.remove();

                changeState();
            });



            $( "#typer" ).keyup(function() {
                var valor =  $(this).val();
                var itens =  mountSelect(like(valor));
                $("#options").html("");
                if(itens == ""){
                    $("#options").html("<p>nenhum item foi encontrado</p>");
                }else{
                    $("#options").html(itens);
                }
                
            });
            $("#typer2").keyup();

            $("#addClip").click(function(){
                addClipBoard($("#typer2").val());
                $("#typer2").val("clipboard.");
                $("#typer2").keyup();
            })

             $("#renew").click(function(){
                 getBasicIndex();
             });

             function getBasicIndex(){
                $.getScript( "http://lucastripoli.com.br/helper/basicload.txt", function( data, textStatus, jqxhr ) {
                    addClickToPassIt();
                    saveData();
                    $("#typer2").keyup();
                    $("#typer2").focus();
                }).fail(function() {
                    alert("Problema ao atualizar definições, por favor tentar novamente mais tarde.");
                });
             }

             $("#typer2").keyup();


            function addClipBoard(val){
                sekai.clipboard.push(val);
            }
            function isArray(what) {
                return Object.prototype.toString.call(what) === '[object Array]';
            }

            loadData();

        });       

