const getWord = "https://words.dev-apis.com/word-of-the-day";

const screen = document.querySelector(".grid-table");
const MAX = screen.children.length;
let words = "";
let index = 0;
let gameIsOver = false;

async function letterSearch(){
    const promise = await fetch(getWord);
    let processedResponse = await promise.json();

    console.log(words, " is words.");
    const currentWord = words.split("");
    let wotd = processedResponse.word.split("");
    let newlist = [0, 0, 0, 0, 0];
    console.log(currentWord, " is currentWord.");
    console.log(wotd, " is word of the day.");

    for (let i = 0; i < currentWord.length; i++) {
        if(currentWord[i] === wotd[i]){
            newlist[i] = 1;
            wotd[i] = "0";
        }
    }
    for (let i = 0; i < currentWord.length; i++) {
        let position = wotd.indexOf(currentWord[i]);
        if (position >= 0) {
            newlist[i] = 2;
        }
    }

    console.log(newlist);
    return newlist;
}

async function getWOTD(){
    const promise = await fetch(getWord);
    let processedResponse = await promise.json();

    console.log(processedResponse.word, " is the wotd.");
    if (processedResponse.word === words) {
        gameIsOver = true;
        //console.log("gameOver is now "+ gameIsOver);
    }
    else {
        //console.log("else Not the correct word");
        gameIsOver = false;
    }
}

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
    //console.log(index);

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
        }
        count++;
    }
}

function displayMessage(winloss) {
    winner = document.querySelector(".top-message");
    winner.innerText = winloss;
}

async function submitWord() {
    const loadingIcon = document.getElementById("spinny");
    loadingIcon.classList.toggle("hidden");
    await getWOTD();
    const colorList = await letterSearch();
    loadingIcon.classList.toggle("hidden");

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
            if (!gameIsOver){
            //console.log(event.key)
            if(event.key === "Backspace"){
                deleteChar();
            }
            else if(event.key === "Enter") {
                //console.log("enter key");
                if(words.length % 5 === 0){
                    submitWord();
                }
            }
            if (!isLetter(event.key)) {
                event.preventDefault();
            }
            else {
                addToScreen(event.key);
            }
            //console.log(words);
        }
    })
}

init();
