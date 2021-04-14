console.log("------------ myScript ------------");
// Check whether index.html and script.js are BOTH in the console -> NO!


const grt = 'Hello ';
let msg;

let property = "age";
let person = {
    firstName: "Erwin",
    lastName: "van Tongeren",
    age: 30
}

// Use some variables and objects
function greet(name) {
    return grt + name;
}
console.log(greet("World"));
console.log("By:  " + person.firstName);
console.log("     " + person["lastName"]);
console.log(property + ": " + person[property]);

// use some arrays
let selectedColors = ["red", "white", "blue"]
selectedColors[6] = "orange";
let colorArray = [];

for (let item = 0; item <= 8; item++) {
    console.log(item + ": " + selectedColors[item]);
    if (selectedColors[item] != undefined) {
        if (selectedColors[item] == "orange") {
            colorArray.unshift("-");
            colorArray.unshift(selectedColors[item]);
        } else {
            colorArray.push(selectedColors[item]);
        }
    }
}
// console.log("Length: " + selectedColors.length);
// console.log(colorArray);
// console.log(typeof(colorArray));

// Same code can be way shorter using filters!
//let colorArray2 = selectedColors.filter(function(c) { return c!=undefined;});
// ... or even shortr with short notation
let colorArray2 = selectedColors.filter(c => c != undefined);
colorArray2.unshift(colorArray2.pop());
// console.log(colorArray2);
// console.log(typeof(colorArray2));

// interact with html and css
document.getElementById("groet").innerHTML = greet(`${person.firstName} ${person.lastName}`);
document.getElementById("groet").style.color = "lightBlue";

document.getElementById("kleuren").innerHTML = "<ul>" + colorArray.map(c => '<li>' + c + '</li>').join("") + "</ul>";
document.querySelectorAll('ul li').forEach(function(a){
     a.style.backgroundColor = a.innerHTML;
     console.log(a);
     console.log(typeof(a));
});




// use functions
function timeChange() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    if (hours < 6) {
        msg = "Good Night"
    } else if (hours < 12) {
        msg = "Good Morning"
    } else if (hours < 18) {
        msg = "Good Afternoon"
    } else if (hours < 24) {
        msg = "Good Evening"
    } else {
        msg = "WTF!?"
    };

    // change message; to get leading zero, add zeros and with slice take 2 from the end till the end
    document.getElementById("boodschap").innerHTML = msg + ", it's " + ("00" + hours).slice (-2) + ":" + ("00" + minutes).slice (-2) + ":" + ("00" + seconds).slice (-2) + ".";

    // change hands
    // class used for test; ID is more logic since ther's only 1
    document.getElementsByClassName("hourArm")[0].style.transform = "translate(-50%, 15%) rotate(" + hours * 30 + "deg)";
    document.getElementsByClassName("minuteArm")[0].style.transform = "translate(-50%, 15%) rotate(" + minutes * 6 + "deg)";
    document.getElementsByClassName("secondArm")[0].style.transform = "translate(-50%, 15%) rotate(" + seconds * 6 + "deg)";

    // Change BG
    document.body.style.backgroundImage = "linear-gradient(" + -seconds * 6 + "deg, " +
        "rgba(0,0,0,0.75)" + " , " +
        "rgba(0,0,64," + hours / 23 + ")" + " 25%, " +
        "rgba(" + 255 * Math.random() + "," + 255 * Math.random() + "," + 255 * Math.random() + ", 0.25)," +
        "rgba(64,0,0," + minutes / 59 + ")" + " 75%, " +
        "rgba(0,0,0,0.8)" + ")";
}

// Call function every second
setInterval(timeChange, 1000);
