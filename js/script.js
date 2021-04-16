console.log("------------ myScript ------------");
// Check whether index.html and script.js are BOTH in the console -> NO!

const clockSize = window.getComputedStyle(document.documentElement).getPropertyValue(`--clockSize_`); // vmin
const secondHandLength = window.getComputedStyle(document.documentElement).getPropertyValue(`--secondHandLength_`); // %
const axesOvershoot = window.getComputedStyle(document.documentElement).getPropertyValue(`--axesOvershoot_`); // %
console.log(clockSize);
console.log(secondHandLength);
console.log(axesOvershoot);
// Matched with css vars


const boodschap = document.getElementById("boodschap");
const groet = document.getElementById("groet");
const kleuren = document.getElementById("kleuren");

const clock = document.getElementById("clock");
const backFace = document.getElementById("backFace");
const minuteDial = document.getElementsByClassName("minuteMark");
const hourDial = document.getElementsByClassName("hourMark");

const hourArm = document.getElementById("hourHand");
const minuteArm = document.getElementById("minuteHand");
const secondArm = document.getElementById("secondHand");

const hourBall = document.getElementById("hourBall");



// Use some variables and objects
const grt = 'Hello ';
let msg;

let property = "age";
let person = {
    firstName: "Erwin",
    lastName: "van Tongeren",
    age: 30
}

function greet(name) {
    return grt + name;
}
console.log(greet("World"));
console.log("By:  " + person.firstName);
console.log("     " + person["lastName"]);
console.log(property + ": " + person[property]);



// Use some arrays
let selectedColors = ["red", "white", "blue"]
selectedColors[6] = "orange";
let colorArray = [];

for (let item = 0; item <= selectedColors.length - 1; item++) {
    if (selectedColors[item] != undefined) {
        if (selectedColors[item] == "orange") {
            colorArray.unshift("&nbsp");
            colorArray.unshift(selectedColors[item]);
        } else {
            colorArray.push(selectedColors[item]);
        }
    }
}

// Same code can be way shorter using filters!
//let colorArray2 = selectedColors.filter(function(c) { return c!=undefined;});
// ... or even shortr with short notation
let colorArray2 = selectedColors.filter(c => c != undefined);
colorArray2.unshift(colorArray2.pop());

// interact with html and css
groet.innerHTML = greet(`${person.firstName} ${person.lastName}`);
groet.style.color = "lightBlue";

kleuren.innerHTML = "<ul>" + colorArray.map(c => '<li>' + c + '</li>').join("") + "</ul>";
document.querySelectorAll('ul li').forEach(function(a) {
    a.style.backgroundColor = a.innerHTML;
});



// =============================================================================
// Clock
// =============================================================================
console.log("=== Clock ======================");
clock.style.width = clockSize + "vmin";
clock.style.height = clockSize + "vmin";

let secondArmReach = clockSize * (secondHandLength / 100 * (1 - axesOvershoot / 100)); // height-15% axes overshoot
let markShift = secondArmReach + 0;
let hourTransform = "translate(-50%, " + axesOvershoot + "%) rotate(0deg)";
let minuteTransform = "translate(-50%, " + axesOvershoot + "%) rotate(0deg)";
let secondTransform = "translate(-50%, " + axesOvershoot + "%) rotate(0deg)";
let hourBallTransform = "translate(-50%, -50%) rotate(0deg)";

// Create marks
let minuteMarks = new Array(60).fill('<div class="minuteMark"></div>');
let hourMarks = new Array(12).fill('<div class="hourMark"></div>');
// Joins array elements without comma; join("")
backFace.innerHTML = minuteMarks.join("") + hourMarks.join("");


// Position marks
for (i = 0; i < minuteDial.length; i++) {
    minuteDial[i].style.transform = "translate(-50%, " + -markShift + "vmin) rotate(" + i * 6 + "deg)";
    minuteDial[i].style.transformOrigin = "50% " + markShift + "vmin";
}

for (i = 0; i < hourDial.length; i++) {
    hourDial[i].style.transform = "translate(-50%, " + -markShift + "vmin) rotate(" + i * 30 + "deg)";
    hourDial[i].style.transformOrigin = "50% " + markShift + "vmin";
}


// Use functions
console.log("=== Function ===================");

function timeChange() {
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();

    let hourAngle = hours * 30; // deg
    let minuteAngle = minutes * 6; // deg
    let secondAngle = (seconds+1) * 6; // deg, add 1 for transition

    if (hours < 5) {
        msg = "Good Night"
    } else if (hours < 12) {
        msg = "Good Morning"
    } else if (hours < 15) {
        msg = "Good Day"
    } else if (hours < 18) {
        msg = "Good Afternoon"
    } else if (hours < 23) {
        msg = "Good Evening"
    } else {
        msg = "Good Night"
    };

    // Change message; to get leading zero, add zeros and with slice take 2 from the end till the end
    boodschap.innerHTML = msg + ", it's " + ("00" + hours).slice(-2) + ":" + ("00" + minutes).slice(-2) + ":" + ("00" + seconds).slice(-2) + ".";

    // Change hands
    // remove previous rotation
    hourTransform = hourTransform.slice(0, hourTransform.indexOf("rotate"));
    minuteTransform = minuteTransform.slice(0, minuteTransform.indexOf("rotate"));
    secondTransform = secondTransform.slice(0, secondTransform.indexOf("rotate"));
    hourBallTransform = hourBallTransform.slice(0, hourBallTransform.indexOf("rotate"));
    // add new rotation
    hourTransform = hourTransform + "rotate(" + hourAngle + "deg)";
    minuteTransform = minuteTransform + "rotate(" + minuteAngle + "deg)";
    secondTransform = secondTransform + "rotate(" + secondAngle + "deg)";
    hourBallTransform = hourBallTransform + "rotate(" + -hourAngle + "deg)";

    hourArm.style.transform = hourTransform;
    minuteArm.style.transform = minuteTransform;
    secondArm.style.transform = secondTransform;

    // Glowing Mark trail
    // Use modulo (%) to compensate for negative (past) seconds
    minuteDial[(seconds + 60) % 60].style.transition = "";
    minuteDial[(seconds + 60) % 60].style.opacity = "1";
    minuteDial[(seconds + 60 - 1) % 60].style.transition = "opacity 30s ease-out";
    minuteDial[(seconds + 60 - 1) % 60].style.opacity = "0.1";

    if (((seconds + 60) % 5) == 0) {
        hourDial[((seconds + 60) % 60) / 5].style.transition = "";
        hourDial[((seconds + 60) % 60) / 5].style.opacity = "1";
    }
    if (((seconds + 60 - 1) % 5) == 0) {
        hourDial[((seconds + 60 - 1) % 60) / 5].style.transition = "opacity 30s ease-out";
        hourDial[((seconds + 60 - 1) % 60) / 5].style.opacity = "0.1";
    }

    // Roling ball on hourHand
    hourBall.style.transform = hourBallTransform;
    if (hourAngle <= 90 || hourAngle > 270) {
        hourBall.style.top = "100%";
    } else {
        hourBall.style.top = "0%";
    }



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
