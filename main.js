const getWord = "https://words.dev-apis.com/word-of-the-day";

const screen = document.querySelector(".grid-table");
const MAX = screen.children.length;
let words = "";
let index = 0;

async function getWOTD(){
    const promise = await fetch(getWord);
    let processedResponse = await promise.json();
    //processedResponse = JSON.stringify(processedResponse);
    //processedResponse = JSON.parse(processedResponse);

    if(processedResponse.word === words) {
        console.log("matched word! Winner!");
        return true;
    }
    else {
        console.log("Not the correct word")
        return false;
    }
}
//let objective = await getWOTD();
//console.log(objective + " is the wotd");
//async function addNewDoggo() {
//  const promise = await fetch(DOG_URL);
//  const processedResponse = await promise.json();
//  const img = document.createElement("img");
//  img.src = processedResponse.message;
//  img.alt = "Cute doggo";
//  doggos.appendChild(img);
//}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function addToScreen(char) {
    if (index >= MAX || words.length === 5) {
        return
    }
    else {
        words += char;
        screen.children[index].innerText = char;
        index++;
    }
    console.log(index);

}
function deleteChar() {
    if (index > 0 && index <= 30){
        index--;
        screen.children[index].innerText = "";
        words = words.substring(0, words.length - 1);
    }
    console.log(index);
}

async function submitWord() {
    let gameOver = getWOTD();
    console.log(gameOver);
}

function init() {
    addEventListener("keydown", (event) =>{
        console.log(event.key)
        if(event.key === "Backspace"){
            deleteChar();
        }
        else if(event.key === "Enter") {
            console.log("enter key");
            if(words.length === 5){
                submitWord();
            }
        }
        if (!isLetter(event.key)) {
            event.preventDefault();
        }
        else {
            addToScreen(event.key);
        }
        console.log(words);
    })
}
init();


//const objString = JSON.stringify(dog);
// adds slashes for JSON object from a JS object

//const response = JSON.parse(response from server);

//const doggos = document.getElementById("dog-target3");
//async function addNewDoggo() {
//  const promise = await fetch(DOG_URL);
//  const processedResponse = await promise.json();
//  const img = document.createElement("img");
//  img.src = processedResponse.message;
//  img.alt = "Cute doggo";
//  doggos.appendChild(img);
//}
//
//document.getElementById("dog-btn3").addEventListener("click", addNewDoggo);