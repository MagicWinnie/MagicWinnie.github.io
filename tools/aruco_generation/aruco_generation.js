// buttons
let download_btn = document.getElementById('download_btn');

var values = new Array();

function handleDownloadClick(el) {
    var final = "{" + values.join() + "}";
    var data = "text/json;charset=utf-8," + encodeURIComponent(final);
    el.setAttribute("href", "data:" + data);
    el.setAttribute("download", "data.json");    
};

document.getElementById("id_aruco").oninput = function () {
    if (parseInt(this.value) > 1000) {
        this.value = 1000; 
    } else if (parseInt(this.value) < 0) {
        this.value = 0; 
    }
}
document.getElementById("size_aruco").oninput = function () {
    if (parseInt(this.value) > 1000000) {
        this.value = 1000000; 
    } else if (parseInt(this.value) < 0) {
        this.value = 0; 
    }
}

function runner() {
    id = parseInt(document.getElementById('id_aruco').value);
    dict = document.getElementById('dictionary').value;
    
}

// on opencv ready
function onOpenCvReady() {
    document.getElementById("id_aruco").value = 0;
    document.getElementById("size_aruco").value = 200;
    runner();
}
