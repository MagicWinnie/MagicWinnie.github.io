// buttons

var bits = new Array();

function handleDownloadClick(el) {
    // console.log(bits);

    width = document.getElementById('size_aruco').value.toString();
    
    let data = '<svg viewBox="0 0 ' + bits[0] + ' ' + bits[0] + '" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges" width="' + width + 'mm" height="' + width + 'mm">';
    data += '<rect x="0" y="0" width="' + width +'" height="' + width + '" fill="black"></rect>';
    i = 0; // y
    j = 0; // x
    for (k = 1; k < bits[0] * bits[0]; k++)
    {
        color = "black";
        if (bits[k])
        {
            color = "white";
        }
        // console.log(j, i, color)
        data += '<rect width="1" height="1" x="' + j.toString() +'" y="' + i.toString() + '" fill="' + color + '"></rect>';
        
        if (j >= bits[0] - 1)
        {
            j = 0; 
            i++;
        } else {
            j++;
        }
    }
    data += '</svg>';
    el.setAttribute("href", 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(data));
    el.setAttribute("download", "aruco.svg");
};

document.getElementById("dictionary").oninput = function () {
    bits = new Array();
    runner();
}

document.getElementById("id_aruco").oninput = function () {
    bits = new Array();
    if (parseInt(this.value) > 999) {
        this.value = 999;
    } else if (parseInt(this.value) < 0) {
        this.value = 0;
    }
    runner();
}
document.getElementById("size_aruco").oninput = function () {
    bits = new Array();
    if (parseInt(this.value) > 1000000) {
        this.value = 1000000;
    } else if (parseInt(this.value) < 0) {
        this.value = 0;
    }
    runner();
}

function chooseDict(d, s) {
    if (d == "4x4") {
        if (s < 50) return cv.DICT_4X4_50;
        else if (s < 100) return cv.DICT_4X4_100;
        else if (s < 250) return cv.DICT_4X4_250;
        else return cv.DICT_4X4_1000;
    } else if (d == "5x5") {
        if (s < 50) return cv.DICT_5X5_50;
        else if (s < 100) return cv.DICT_5X5_100;
        else if (s < 250) return cv.DICT_5X5_250;
        else return cv.DICT_5X5_1000;
    } else if (d == "6x6") {
        if (s < 50) return cv.DICT_6X6_50;
        else if (s < 100) return cv.DICT_6X6_100;
        else if (s < 250) return cv.DICT_6X6_250;
        else return cv.DICT_6X6_1000;
    } else if (d == "7x7") {
        if (s < 50) return cv.DICT_7X7_50;
        else if (s < 100) return cv.DICT_7X7_100;
        else if (s < 250) return cv.DICT_7X7_250;
        else return cv.DICT_7X7_1000;
    } else {
        return cv.DICT_ARUCO_ORIGINAL;
    }
}

function runner() {
    bits = new Array();

    id = parseInt(document.getElementById('id_aruco').value);
    dict = document.getElementById('dictionary').value;
    size = parseInt(document.getElementById('size_aruco').value);
    widthIMG = 200;

    markerImage = new cv.Mat();
    dictionary = new cv.Dictionary(chooseDict(dict, id));
    cv.drawMarker(dictionary, id, widthIMG, markerImage, 1);

    let s = new cv.Scalar(255, 255, 255, 255);
    cv.copyMakeBorder(markerImage, markerImage, 15, 15, 15, 15, cv.BORDER_CONSTANT, s);
    cv.imshow("aruco", markerImage);


    // getting bits
    width = 4 + 2;

    if (dict == "orig" || dict == "5x5") {
        width = 5 + 2;
    } else if (dict == "6x6") {
        width = 6 + 2;
    } else if (dict == "7x7") {
        width = 7 + 2;
    }

    delta = Math.round(widthIMG/width);
    let temp1 = new cv.Mat();
    //let temp1 = new cv.Mat(width, width, cv.CV_8U);
    //cv.resize(markerImage, temp1, new cv.Size(width, width), 0, 0, cv.INTER_AREA);
    cv.drawMarker(dictionary, id, width, temp1, 1);
    // cv.resize(temp1, markerImage, new cv.Size(200, 200), 0, 0, cv.INTER_AREA);
    bits.push(width);

    for (i = 0; i < width; i += 1) {
        for (j = 0; j < width; j += 1) {
            bits.push(Math.round(temp1.ucharPtr(i, j)[0]/255));
            /*if (temp1.ucharPtr(i, j)[0] < 255/2) {
                bits.push(0);
            } else {
                bits.push(255);
            }*/
        }
    }

    //cv.imshow('aruco', markerImage);
    temp1.delete(); markerImage.delete(); dictionary.delete();
}

// on opencv ready
function onOpenCvReady() {
    document.getElementById("id_aruco").value = 0;
    document.getElementById("size_aruco").value = 200;
    runner();
}
