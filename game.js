
var level = 0;
var arr = [];
var restartLevel = true;
var responseArr = [];

$(document).on("keypress", function () {
    if (level === 0) {
        createLevels();
    }
})

async function createLevels() {
    level++;

    $("h1").text("Level " + level);


    //Creating a Pattern
    creatingPattern();


    for (var i = 0; i < arr.length; i++) {
        $("." + arr[i]).addClass("pressed");
        makeSound(arr[i]);      
        await buttonPress(arr[i], 500);
        await pauseAfterRemoveClass(500);
    }

    numberOfResp = level;
    var len = 0;
    var levelPass = true;

    // console.log("******"+level+"********");4
    // console.log(arr);


    $("button").on("click", async function (event) {
              
        if (restartLevel) {
            len = 0;
            restartLevel = false;
        }
        var key = event.target.id; 
        
        $("." + key).addClass("pressed");
        makeSound(key);      
        await buttonPress(key, 100);
        await pauseAfterRemoveClass(100);

        if (arr[len] != key) {
            levelPass = false;                     
        }
        
        len++;
        if ((!levelPass) || (len == arr.length)) {
            console.log("All input received");
            if (levelPass) {
                console.log("win")
                createLevels();
                restartLevel = true;
                levelPass = true;
                $("button").off('click');
            }
            else {
                console.log("fail")
                $("h1").text("Failed");
                $("button").off('click');
                makeSound(wrong);   
            }

        }

    })
}

function makeSound(color) {
    var sound = color + ".mp3";
    var audio = new Audio("sounds/" + sound);
    audio.play();
}


function creatingPattern() {

    var randomNumber = Math.random();
    randomNumber = Math.ceil(randomNumber * 4);
    var color = "";
    switch (randomNumber) {
        case 1:
            color = "green";
            break;
        case 2:
            color = "red";
            break;
        case 3:
            color = "yellow";
            break;
        case 4:
            color = "blue";
            break;

        default:
            break;
    }
    arr.push(color);
}

function buttonPress(arr, time) {
    return new Promise((resolve) => {
        setTimeout(function () {
            $("." + arr).removeClass("pressed");
            resolve("Done");
        }, time);
    }
    )
}
function pauseAfterRemoveClass(time) {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve("Done");
        }, time);
    }
    )
}



function matchArrays(arr1, arr2) {
    if (arr1.length === arr2.length) {
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false;
            }
        }
        return true;
    }
}

