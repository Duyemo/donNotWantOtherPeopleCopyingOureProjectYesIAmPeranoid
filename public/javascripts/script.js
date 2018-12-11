function fire(elem) {
    var shipStat = 1;
    // if there is a ship it will be a hit, otherwise it will be a miss
    if (shipStat == 1 && elem.style.backgroundColor != "#00FF00" ) {
        hit();
        elem.style.backgroundColor = "#00FF00";
        console.log(elem.style.backgroundColor);

    } else {
        mis();
        elem.style.backgroundColor = "tomato";

    }

}

function hit() {
    // change image
    document.images["hit"].src = "images/hit.gif";

    //document.images["hit"].src = "images/stillhit.png";


}

function mis() {
    // change image
    document.images["mis"].src = "images/mis.gif";

}



