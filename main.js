Webcam.set({
width: 350,
height: 300,
image_format: 'png',
png_quality: 90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
})
}

console.log('ml5 version:', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/L5g1rsR4t/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model loaded");
}
function predict(){
img=document.getElementById("captured_image");
classifier.classify(img, gotResult);
}
function speak(){
var synth=window.speechSynthesis;
var speak_name=prediction;
var utterThis=new SpeechSynthesisUtterance(speak_name);
synth.speak(utterThis);
}

function gotResult(error, results){
if(error){
console.error(error);
}
else{
console.log(results);
document.getElementById("gest_name").innerHTML=results[0].label;
prediction=results[0].label;
speak();

if(results[0]=="victory"){
document.getElementById("gest_name").innerHTML="Victory";
document.getElementById("gest_icon").innerHTML="&#9996";
}
if(results[0]=="best"){
    document.getElementById("gest_name").innerHTML="Best";
    document.getElementById("gest_icon").innerHTML="&#128077";
}
if(results[0]=="amazing"){
    document.getElementById("gest_name").innerHTML="Amazing";
    document.getElementById("gest_icon").innerHTML="&#128076";
}
}
}