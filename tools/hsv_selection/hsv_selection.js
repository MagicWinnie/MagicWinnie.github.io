// image reading
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');

inputElement.addEventListener('change', (e) => {
    console.log("im here");
    imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

// trackbars
let h_low = document.getElementById('h_low');
let s_low = document.getElementById('s_low');
let v_low = document.getElementById('v_low');

let h_high = document.getElementById('h_high');
let s_high = document.getElementById('s_high');
let v_high = document.getElementById('v_high');

h_low.oninput = function () {
    document.getElementById("out_h_low").innerHTML = this.value;
}
s_low.oninput = function () {
    document.getElementById("out_s_low").innerHTML = this.value;
}
v_low.oninput = function () {
    document.getElementById("out_v_low").innerHTML = this.value;
}
h_high.oninput = function () {
    document.getElementById("out_h_high").innerHTML = this.value;
}
s_high.oninput = function () {
    document.getElementById("out_s_high").innerHTML = this.value;
}
v_high.oninput = function () {
    document.getElementById("out_v_high").innerHTML = this.value;
}

// main function
imgElement.onload = function () {
    setInterval(function () {
        let mat = cv.imread(imgElement);
        
        let hsv = new cv.Mat();
        cv.cvtColor(mat, hsv, cv.COLOR_BGR2HSV);
        
        let mask = new cv.Mat();
        let low = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [parseInt(h_low.value), parseInt(s_low.value), parseInt(v_low.value), 0]);
        let high = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [parseInt(h_high.value), parseInt(s_high.value), parseInt(v_high.value), 255]);
        cv.inRange(hsv, low, high, mask);

        cv.imshow('hsvOutput', hsv);
        cv.imshow('maskOutput', mask);
    }, 100);
};

imgElement.onclose = function () {
    mat.delete();
    hsv.delete();
};

// on opencv ready
function onOpenCvReady() {
    h_low.removeAttribute('disabled');
    s_low.removeAttribute('disabled');
    v_low.removeAttribute('disabled');

    h_high.removeAttribute('disabled');
    s_high.removeAttribute('disabled');
    v_high.removeAttribute('disabled');

    document.getElementById("out_h_low").innerHTML = 0;
    document.getElementById("out_s_low").innerHTML = 0;
    document.getElementById("out_v_low").innerHTML = 0;
    
    document.getElementById("out_h_high").innerHTML = 0;
    document.getElementById("out_s_high").innerHTML = 0;
    document.getElementById("out_v_high").innerHTML = 0;

    document.getElementById('status').innerHTML = '[STATUS] OpenCV.js is ready.';
}