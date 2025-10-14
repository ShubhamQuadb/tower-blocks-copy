define(["controller/action", "model/canvas"], function (Action, Canvas) {
    Canvas.canvas.addEventListener("mousemove", Action.getMousePos, false);
    Canvas.canvas.addEventListener("mousedown", function () {
        Action.mouseClicked(true);
    }, false);
    Canvas.canvas.addEventListener("mouseup", function () {
        Action.mouseClicked(false);
    }, false);
    
    // Disable resize for KaiOS - fixed 240x320
    // if (window.requestAnimationFrame !== undefined) {
    //     window.addEventListener("resize", Action.resize, false);
    // }
    
    console.log("KaiOS: Listeners initialized (resize disabled)");
});