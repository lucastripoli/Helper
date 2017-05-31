$( document ).ready(function() {
    //name
    //description

    var docker = [];

    name = "docker";
    docker.description = "A module do explain and help Programers and DevOps";

    docker.stop = "docker stop [the id of process]";

    docker["stop all images"] = "docker stop $(docker ps -a -q)";

    

    addToActualObject(name, docker);
    system.load();
});
