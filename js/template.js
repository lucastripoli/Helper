var template = [];

template["text"] = function (text) { return "<li class=\"list-group-item\">"+text+"</li>";}

template["copylink"] = function (text) { return "<li class=\"list-group-item\"> <span class=\"passIt clickable\" tabindex=\"0\" >"+text+"</span> </li> ";}
 
template["alert"] = function (text) { alert(text); return "";}

template["disabletextarea"] = function (text) {
    return "<textarea style=\"width: 100%;height: 100%; \"  disabled>" +
    text + 
    "</textarea>";
}

template["webview"] = function(url){
    return "<webview src=\" "+url+" \" style=\"width:300px; height:300px\"></webview>"
}


//adicionados relativos ao framework Bootstrap

template["program"] = function(text){
    return system.bootstrap.icon("play")+" - "+text;
}

template["library"] = function(text){
    return system.bootstrap.icon("book")+" - "+text;
}
