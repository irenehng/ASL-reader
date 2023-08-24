import * as tf from "@tensorflow/tfjs";
//define labelmap

const labelMap = {
  0: {name:'A', color:'green'},
  1: {name:'B', color:'green'},
  2: {name:'C', color:'green'},
  3: {name:'D', color:'green'},
  4: {name:'E', color:'green'},
  5: {name:'F', color:'green'},
  6: {name:'G', color:'green'},
  7: {name:'H', color:'green'},
  8: {name:'I', color:'green'},
  9: {name:'J', color:'green'},
  10: {name:'K', color:'green'},
  11: {name:'L', color:'green'},
  12: {name:'M', color:'green'},
  13: {name:'N', color:'green'},
  14: {name:'O', color:'green'},
  15: {name:'P', color:'green'},
  16: {name:'Q', color:'green'},
  17: {name:'R', color:'green'},
  18: {name:'S', color:'green'},
  19: {name:'T', color:'green'},
  20: {name:'U', color:'green'},
  21: {name:'V', color:'green'},
  22: {name:'W', color:'green'},
  23: {name:'X', color:'green'},
  24: {name:'Y', color:'green'},
  25: {name:'Z', color:'green'},
}

//drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<=boxes.length; i++){
        if(boxes[i] && classes[i] && scores[i]>threshold){
            // Extract variables
            const [y,x,height,width] = boxes[i]
            const text = classes[i]
            
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight-10)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
            ctx.stroke()
        }
    }
}

