song_1 = "";
song_2 = "";
song1_status = "";
song2_status = "";
left_wristX = 0;
left_wristY = 0;
right_wristX = 0;
right_wristY = 0;
score_left_wrist = 0;
score_right_wrist = 0;

function preload(){
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('posenet is initialized');
}
function draw(){
    image(video, 0, 0, 600, 500);
    song1_status = song_1.isPlaying();
    song2_status = song_2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");

    if(score_right_wrist > 0.2){
        circle(right_wristX, right_wristY, 20);
        song_1.stop();
        if(song2_status == false){
            song_2.play();
            document.getElementById("song_name").innerHTML = "Song name = " +"Pirate pop";
        }
    }
    if(score_left_wrist > 0.2){
        circle(left_wristX, left_wristY, 20);
        song_2.stop();
        if(song1_status == false){
            song_1.play();
            document.getElementById("song_name").innerHTML = "Song name = " +"Harry potter theme song";
        }
    }
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        score_right_wrist = results[0].pose.keypoints[10].score;
        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log("score_right_wrist = "+score_right_wrist+"score_left_wrist = "+score_left_wrist);
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        console.log("left_wristX = " +left_wristX+ "left_wristY = " +left_wristY);

        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        console.log("right_wristX = " +right_wristX+ "right_wristY = " +right_wristY);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}