define([""], function () {

    var canvas = document.getElementById("gameCanvas");
    var context = canvas.getContext("2d");
    
    // Fixed size for KaiOS/JioPhone (240x320)
    var targetWidth = 240;
    var targetHeight = 320;
    
    context.canvas.width = targetWidth;
    context.canvas.height = targetHeight;
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    
    console.log("Canvas initialized for KaiOS: " + canvasWidth + "x" + canvasHeight);

    var Canvas = {
        //functions
        canvas: canvas,
        context: context,
        contextCanvasWidth: context.canvas.width,
        contextCanvasHeight: context.canvas.height,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight
    };

    return Canvas;
});