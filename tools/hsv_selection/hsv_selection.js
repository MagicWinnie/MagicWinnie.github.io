// image reading
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');

// buttons
let add_btn = document.getElementById('add_btn');
let download_btn = document.getElementById('download_btn');

// var values = new Array();
// values.push([]);


var values = new Array();

add_btn.addEventListener('click', handleAddClick, false);
function handleAddClick(event) {
    var obj = new Object();
    var obj1 = new Object();
    name = document.getElementById('add_inp').value;
    obj[name] = obj1;
    obj[name].h_low = parseInt(document.getElementById('h_low').value);
    obj[name].s_low = parseInt(document.getElementById('s_low').value);
    obj[name].v_low = parseInt(document.getElementById('v_low').value);

    obj[name].h_high = parseInt(document.getElementById('h_high').value);
    obj[name].s_high = parseInt(document.getElementById('s_high').value);
    obj[name].v_high = parseInt(document.getElementById('v_high').value);
    var jsonString = JSON.stringify(obj);
    jsonString = jsonString.slice(1, jsonString.length - 1);
    values.push(jsonString);

    document.getElementById('add_inp').value = '';
};

function handleDownloadClick(el) {
    var final = "{" + values.join() + "}";
    var data = "text/json;charset=utf-8," + encodeURIComponent(final);
    el.setAttribute("href", "data:" + data);
    el.setAttribute("download", "data.json");    
};

inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
    values = new Array();
}, false);

// trackbars
let h_low = document.getElementById('h_low');
let s_low = document.getElementById('s_low');
let v_low = document.getElementById('v_low');

let h_high = document.getElementById('h_high');
let s_high = document.getElementById('s_high');
let v_high = document.getElementById('v_high');

h_low.oninput = function () {
    document.getElementById("out_h_low").value = this.value;
}
s_low.oninput = function () {
    document.getElementById("out_s_low").value = this.value;
}
v_low.oninput = function () {
    document.getElementById("out_v_low").value = this.value;
}
h_high.oninput = function () {
    document.getElementById("out_h_high").value = this.value;
}
s_high.oninput = function () {
    document.getElementById("out_s_high").value = this.value;
}
v_high.oninput = function () {
    document.getElementById("out_v_high").value = this.value;
}

document.getElementById("out_h_low").oninput = function () {
    if (parseInt(this.value) > 180) {
        this.value = "180"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    h_low.value = this.value;
}
document.getElementById("out_s_low").oninput = function () {
    if (parseInt(this.value) > 255) {
        this.value = "255"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    s_low.value = this.value;
}
document.getElementById("out_v_low").oninput = function () {
    if (parseInt(this.value) > 255) {
        this.value = "255"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    v_low.value = this.value;
}
document.getElementById("out_h_high").oninput = function () {
    if (parseInt(this.value) > 180) {
        this.value = "180"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    h_high.value = this.value;
}
document.getElementById("out_s_high").oninput = function () {
    if (parseInt(this.value) > 255) {
        this.value = "255"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    s_high.value = this.value;
}
document.getElementById("out_v_high").oninput = function () {
    if (parseInt(this.value) > 255) {
        this.value = "255"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    v_high.value = this.value;
}


function runner() {
    try {
        let mat = cv.imread(imgElement);

        let hsv = new cv.Mat();
        cv.cvtColor(mat, hsv, cv.COLOR_RGB2HSV);

        let mask = new cv.Mat();
        let low = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [parseInt(h_low.value), parseInt(s_low.value), parseInt(v_low.value), 0]);
        let high = new cv.Mat(hsv.rows, hsv.cols, hsv.type(), [parseInt(h_high.value), parseInt(s_high.value), parseInt(v_high.value), 255]);
        cv.inRange(hsv, low, high, mask);

        let out = new cv.Mat();
        cv.bitwise_and(mat, mat, out, mask);

        cv.imshow('hsvOutput', hsv);
        cv.imshow('maskOutput', mask);
        cv.imshow('bitwiseandOutput', out);

        mat.delete(); hsv.delete(); mask.delete();
        low.delete(); high.delete(); out.delete();
    } catch (err) {
        console.log(err);
    }
}

// main function
imgElement.onload = function () {
    setInterval(function () {
        runner();
    }, 100);
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

    document.getElementById("out_h_high").innerHTML = 180;
    document.getElementById("out_s_high").innerHTML = 255;
    document.getElementById("out_v_high").innerHTML = 255;

    document.getElementById('status').innerHTML = '[STATUS] OpenCV.js is ready.';
}
