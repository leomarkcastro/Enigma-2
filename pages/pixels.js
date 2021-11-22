import { useEffect } from "react";
import { fabric } from "fabric";

export default function Pixels() {
  let components = {};
  let canvas;

  useEffect(() => {
    declare();
    firstRender();
    start();
    //loop()
  }, []);

  function declare() {
    // create a wrapper around native canvas element (with id="c")
    canvas = new fabric.Canvas("c");
    canvas.selection = false;
    canvas.backgroundColor = "#fff";

    // create a rectangle object
    components["blue"] = new fabric.Rect({
        left: 400,
        top: 400,
        fill: "blue",
        width: 40,
        height: 40,
        selectable: false
      });
      
    // create a rectangle object
    components["red"] = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20,
      selectable: false
    });
    


  }

  function firstRender() {
    for (let i in components) {
      canvas.add(components[i]);
    }
  }

  function start() {
    canvas.on("mouse:down", function (options) {

      //console.log(options);

      for (let i in components) {
        components[i].animate("left", options.pointer.x - components[i].width/2, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
        });

        components[i].animate("top", options.pointer.y - components[i].height/2, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce,
        });
      }

      

    });
  }

  function loop() {
    setTimeout(() => {}, 1000 / 30);
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <canvas id="c" width="500" height="500"></canvas>
    </div>
  );
}
