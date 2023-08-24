// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import {drawRect} from "./utilities"
import Webcam from "react-webcam";
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    //TODO - Load network 
    const net = await tf.loadGraphModel('https://tensorflowjs-asl-model.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json')
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640,640]);
      const casted = resized.cast('float32');
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);
      console.log(obj);
      
      // const boxes = await obj[0].arraySync();
      // const classes = await obj[2].arraySync();
      // const scores = await obj[1].arraySync();

        const boxes = obj.slice([0, 0, 0], [1, 30, 4]).dataSync(); // Extract bounding box information
        const scores = obj.slice([0, 0, 4], [1, 30, 1]).dataSync(); // Extract confidence scores
        const classes = obj.slice([0, 0, 5], [1, 30, 1]).dataSync(); // Extract class indices
        const classesIntegers = Array.from(classes).map(value => Math.round(value));
        console.log(boxes, scores, classes)




      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility 
      requestAnimationFrame(()=>{drawRect(boxes[0],classes[0],scores[0],0.5,videoWidth, videoHeight, ctx)})

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj)
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
