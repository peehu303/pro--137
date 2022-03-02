
objects = [];
ans = "";


function setup() {
  canvas = createCanvas(280, 280);
  canvas.position(570,120);
  video = createCapture(VIDEO);
  video.size(260,260);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  ans = true;
}

function play()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("ans").innerHTML = "Status : Detecting Objects";
  object_name = document.getElementById("object_name").value;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }else{
  console.log(results);
  objects = results;
}
}

function draw() {
  image(video, 0, 0, 280, 280);
      if(ans != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i <objects.length; i++) {
          document.getElementById("ans").innerHTML = "Status : Object Detected";
          
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

         
          if(objects[i].label == object_name)
          {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_ans").innerHTML = object_name + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_name + "Found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("object_ans").innerHTML = object_name + " Not Found";
          }          
         }
      }
}