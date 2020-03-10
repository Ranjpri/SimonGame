
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
        await buttonPress(arr[i]);
        await pauseAfterRemoveClass();
    } 
    
    numberOfResp = level;
    var len = 0;
    var levelPass = true;

    // console.log("******"+level+"********");4
    // console.log(arr);
    
     
    $("button").on("click", function (event) {
       
        if (restartLevel) {           
            restartLevel = false;
            responseArr.splice(0, responseArr.length);            
        }
       
        responseArr.push(event.target.id);
        var n1 = arr.length;
        var n2 = responseArr.length;        

        if (n1 === n2) {
            console.log("In here");
            if (matchArrays(responseArr, arr)) {
                console.log("win")
                createLevels();
                restartLevel = true;
                $("button").off('click');
            }
            else {
                console.log("fail")
                $("h1").text("Failed");
                $("button").off('click');
            }

        }
       
    })
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

function buttonPress(arr) {
    return new Promise((resolve) => {
        setTimeout(function () {
            $("." + arr).removeClass("pressed");
            resolve("Done");
        }, 500);
    }
    )
}
function pauseAfterRemoveClass() {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve("Done");
        }, 500);
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

