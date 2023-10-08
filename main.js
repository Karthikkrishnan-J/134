object = [];
Status = "";
function preload() {
    alarm = loadSound("alarm.wav");
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    camera = createCapture(VIDEO);
    camera.hide();
    modal = ml5.objectDetector("cocossd", loadmodal);
}
function loadmodal() {
    console.log("modal loaded");
    document.getElementById("status").innerHTML = "Status : Dectecting Object";
    Status = true;
}
function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        object = result;
    }
}
function draw() {
    image(camera, 0, 0, 640, 420);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        modal.detect(camera, gotResult);
        for (var i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Object Detected";
            x = object[i].x;
            y = object[i].y;
            width = object[i].width;
            height = object[i].height;
            label = object[i].label;
            confidence = floor(object[i].confidence*100) + "%";
            stroke(r,b,g);
            noFill();
            rect(x, y, width-50, height-50);
            text(label + " " + confidence, x, y);
            if(object[i].label == "person"){
                document.getElementById("detect").innerHTML = "Baby Is Found";
                alarm.stop();
            }
            else{
                document.getElementById("detect").innerHTML = "Baby Is Not Found";
                alarm.play();
            }
            if(object.length < 0){
                document.getElementById("detect").innerHTML = "Baby Is Not Found";
                alarm.play();
            }
        }
    }
}