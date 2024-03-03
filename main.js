const getWord = "https://words.dev-apis.com/word-of-the-day";
const postWord = "https://words.dev-apis.com/validate-word";

const screen = document.querySelector(".grid-table");
const loadingIcon = document.getElementById("spinny");
const MAX = screen.children.length;
const MAX_LENGTH = 5;
let words = "";
let index = 0;
let gameIsOver = false;
//async function testFetch() {
//    const promise = await fetch(getWord);
//    let processedResponse = await promise.json();
//    console.log(processedResponse.word);
//}
//testFetch();

async function validateWordPost() {

    let postData = { "word": words }
    const promise = await fetch(postWord,{
        method: "POST",
        body: JSON.stringify(postData)
    });
    let processedResponse = await promise.json();
    console.log(processedResponse.validWord, " is the post promise");
    if(processedResponse.validWord) {
        return true;
    }
    else {
        return false;
    }
}
//validateWordPost();

async function verifyWordFetch() {
    const promise = await fetch(getWord);
    let processedResponse = await promise.json();
    console.log(processedResponse.word);
    if (processedResponse.word === words) {
        gameIsOver = true;
        //console.log("gameOver is now "+ gameIsOver);
    } else { 
        gameIsOver = false; 
    }

        //console.log("else Not the correct word");

    const userWord = words.split("");
    let wotd = processedResponse.word.split("");
    let newlist = [0, 0, 0, 0, 0];

    for (let i = 0; i < userWord.length; i++) {
        if(userWord[i] === wotd[i]){
            newlist[i] = 1;
            wotd[i] = "0";
        }
    }
    console.log("green", wotd);
    for (let i = 0; i < userWord.length; i++) {
        let position = wotd.indexOf(userWord[i]);
        if (position >= 0) {
            newlist[i] = 2;
            wotd[position] = "0";
        }
    }
    console.log(newlist);
    return newlist;
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function addToScreen(char) {
    console.log(words, words.length);
    if (words.length === MAX_LENGTH) {
        words = words.substring(0, words.length - 1) + char;  
        screen.children[index - 1].innerText = char.toUpperCase();
    }
    else {
        words += char;
        screen.children[index].innerText = char.toUpperCase();
        index++;
    }
    console.log(index)
}

function deleteChar() {
    if (index > 0 && index <= MAX){
        index--;
        screen.children[index].innerText = "";
        words = words.substring(0, words.length - 1);
    }
    //console.log(index);
}

function changeColor(colorList) {
    const temp = index;
    let count = 0;
    for(let i = temp - 5; i < temp; i++){
        switch(colorList[count]) {
            case 0:
                screen.children[i].style.background = "#50575e";
                break;
            case 1:
                screen.children[i].style.background = "#005c12";
                break;
            case 2:
                screen.children[i].style.background = "#bd8600";
                break;
            case 3:
                screen.children[i].style.background = "#CC0000";

        }
        count++;
    }
}

function displayMessage(winloss) {
    winner = document.querySelector(".top-message");
    winner.innerText = winloss;
}

function toggle() {
    loadingIcon.classList.toggle("hidden");
}

//async function invalidWordDelay() {
//    changeColor([3,3,3,3,3]);
//    await new Promise(r => setTimeout(r, 50));
//    changeColor([0, 0, 0, 0, 0]);
//}

async function submitWord() {
    if(words.length !== MAX_LENGTH){
        return;
    }
    toggle();
    const valid = await validateWordPost();
    if(!valid) { 
        //invalidWordDelay();
        toggle();
        return;
    }
    const colorList = await verifyWordFetch();
    // fetching the word of the day and verifying it
    toggle();

    //console.log("word is being validated is: " + words);
    if (!gameIsOver) {
        words = "";
        //console.log("before checking loss index is " + index);
        if (index === MAX){
            displayMessage("You lost!");
        }
    }
    else {
        displayMessage("You won!");
        //console.log("You won!");
    }
    changeColor(colorList);
    //console.log(gameIsOver + " is the game over state");
}

function init() {
    addEventListener("keydown", (event) =>{
            if (!gameIsOver) {
                //console.log(event.key)
                if(event.key === "Backspace" && words.length > 0){
                    deleteChar();
                }
                else if(event.key === "Enter") {
                    submitWord();
                }
                else if (!isLetter(event.key)) {
                    event.preventDefault();
                    //TODO not necesarry
                }
                else {
                    addToScreen(event.key);
                }
                //console.log(words);
        }
    });
}
init();
