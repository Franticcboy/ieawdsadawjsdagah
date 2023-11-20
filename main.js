song="";
leftWristx=0;
rightWristx=0;
leftWristy=0;
rightWristy=0;
scoreleftwrist=0;
function preload(){
song= loadSound("music.mp3");
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPosses);
}
function gotPosses(results){
if(results.length >0){

    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("score left wrist=" +scoreleftwrist);

    console.log(results);
    leftWristx=results[0].pose.leftWrist.x;
    leftWristy=results[0].pose.leftWrist.y;
    console.log("leftWristx="+leftWristx+"leftWristy"+leftWristy);
    
    rightWristx=results[0].pose.rightWrist.x;
    rightWristy=results[0].pose.rightWrist.y;
    console.log("rightWristx="+rightWristx+"rightWristy"+rightWristy);
}
}
function modelLoaded(){
    console.log("Posenet is initialized");
}
function draw(){
    image(video,0,0,600,500);
    fill(255,0,0);
    stroke(255,0,0);
    if (scoreleftwrist>0.2){
        circle(leftWristx,leftWristy,20);
        Numberleftwristy=Number(leftWristy);
        removedecimals=floor(Numberleftwristy);
        volume=removedecimals/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume);
    }
}
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function Stop(){
    song.stop();
}