# ASL Reader

This is a web app to read the [ASL](https://en.wikipedia.org/wiki/American_Sign_Language) alphabet built wth React, with the back end calling on an object detection model (YOLOv8) converted into tensorflowjs format and deployed on IBM Cloud.

## Folder structure

1.  data: contains the dataset of ASL hand sign images, annotated in the format requested by YOLOv8. The file containing the training script ('asl.ipynb') is also included.
2.  runs: folder generated by model during training, contains runs summaries and validation data, as well as the final tensorflowjs converted model. The model was trained for many runs to achieve high accuracy, and only the last run is kept in this repo.
3.  app: contains all files for building the React app. The integration of the model with the app and the code to make detection and draw bounding boxes are mainly located within src/App.js and src/utilities.js

## To run the app
Clone the repo, cd into the app folder and run 'npm start' in your terminal
