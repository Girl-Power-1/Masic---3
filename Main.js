songleft = "";
songright = "";

songleft_status = "";
songright_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

leftWristX = 0;
LeftWristaY = 0;

rightWristX = 0;
rightWristaY = 0;

function preload()
{
    songleft = loadSound("Independence music.mp3");
    songright = loadSound("Motion - AShamaluevMusic.mp3");
}

function setup() {    
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[10].score;
        console.log("scorLeftWrist = " + scoreLeftWristX +" scoreRightWrist = "+ scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristX = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristX = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    songleft_status = songleft.isPlaying();
    songright_status = songright.isPlaying();

    fill("#008080");
    stroke("#008080");

    if(scoreLeftWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song2_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Independence music"
        }
    }
}

function play()
{
    songleft.play();
    songright.play();
}