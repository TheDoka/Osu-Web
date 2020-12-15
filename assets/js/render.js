var canvas;
var ctx; 
var beatmap;

window.onload = function init()
{
    canvas = document.getElementById("game");
    ctx    = canvas.getContext("2d");
    canvas.width  = 1024;
    canvas.height = 768; 
    

    beatmap = new BeatMap('beatmap.osu');
    loop();
}

function loop()
{

    // Time loop
    //console.log(this.beatmap.getHitObjects());
    this.beatmap.getHitObjects().forEach(element => {
        element.render(ctx);
    });
    //this.beatmap.getHitObjects()[1].render(ctx);

}
