// image reading
let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');


var values = new Array();

// buttons
let resetBtn = document.getElementById("reset_btn");
let startBtn = document.getElementById("start_btn");
// button event listeners
resetBtn.addEventListener('click', resetAll, false);

function handleAddClick(event) {
    var obj = new Object();
    var obj1 = new Object();
    var name = document.getElementById('add_inp').value;
    if (name == "")
    {
        alert("Name the values!")
    } else 
    {
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
    }
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
    resetTrackbars();
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
    runner();
}
s_low.oninput = function () {
    document.getElementById("out_s_low").value = this.value;
    runner();
}
v_low.oninput = function () {
    document.getElementById("out_v_low").value = this.value;
    runner();
}
h_high.oninput = function () {
    document.getElementById("out_h_high").value = this.value;
    runner();
}
s_high.oninput = function () {
    document.getElementById("out_s_high").value = this.value;
    runner();
}
v_high.oninput = function () {
    document.getElementById("out_v_high").value = this.value;
    runner();
}

document.getElementById("out_h_low").oninput = function () {
    if (parseInt(this.value) > 180) {
        this.value = "180"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    h_low.value = this.value;
    runner();
}
document.getElementById("out_s_low").oninput = function () {
    if (parseInt(this.value) > 255) {
        this.value = "255"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    s_low.value = this.value;
    runner();
}
document.getElementById("out_v_low").oninput = function () {
    if (parseInt(this.value) > 255) {
        this.value = "255"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    v_low.value = this.value;
    runner();
}
document.getElementById("out_h_high").oninput = function () {
    if (parseInt(this.value) > 180) {
        this.value = "180"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    h_high.value = this.value;
    runner();
}
document.getElementById("out_s_high").oninput = function () {
    if (parseInt(this.value) > 255) {
        this.value = "255"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    s_high.value = this.value;
    runner();
}
document.getElementById("out_v_high").oninput = function () {
    if (parseInt(this.value) > 255) {
        this.value = "255"; 
    } else if (parseInt(this.value) < 0) {
        this.value = "0"; 
    }
    v_high.value = this.value;
    runner();
}

function runner() {
    try {
        var fileName = document.getElementById("fileInput").value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        console.log(extFile);
        if (extFile == "")
        {
            alert("Upload an image!");
        } else if (extFile == "jpg" || extFile == "jpeg" || extFile == "png")
        {
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
        } else
        {
            alert("Only jpg/jpeg/png are allowed!");
        }   
    } catch (err) {
        console.log(err);
    }
}

// main function
imgElement.onload = function () {
    runner();
};

function resetAll() {
    document.getElementById("delta").value = 10;
    document.getElementById("duration").value = 0.15;
    document.getElementById("output_gif_scale").value = 1;
    document.getElementById("output_gif_res").textContent = "None";
    document.getElementById("loop").value = 1;
}

// on opencv ready
function onOpenCvReady() {
    document.getElementById("delta").removeAttribute('disabled');
    document.getElementById("duration").removeAttribute('disabled');
    document.getElementById("output_gif_scale").removeAttribute('disabled');
    document.getElementById("loop").removeAttribute('disabled')

    document.getElementById("add_corner_btn").removeAttribute('disabled');
    document.getElementById("face_rec_btn").removeAttribute('disabled');
    document.getElementById("start_btn").removeAttribute('disabled');
    document.getElementById("save_btn").removeAttribute('disabled');
    resetBtn.removeAttribute('disabled');
    
    document.getElementById("select_corner").removeAttribute('disabled');
    document.getElementById("select_face").removeAttribute('disabled');
    document.getElementById("select_user").removeAttribute('disabled');

    resetAll();
}
