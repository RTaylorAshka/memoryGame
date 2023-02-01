const gameContainer = document.getElementById("game");
//let firstCard = "empty";
//let secondCard = "empty";
let matchMe = "";
let open = () => (document.getElementsByClassName('open').length)
let timeOut = 1000;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
// let newID = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
// let idCounter = 0;
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // newDiv.setAttribute("id", newID[idCounter])
    // idCounter++;
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);

  //console.log(open());
  if(open() == 2){
    return;
  }

  //assign card
  let card = event.target;

  //show the card
  showCard(card);
  console.log(open());
  
  
  if(open() == 2){
    if(matchCheck()){
      return;
    } else {
      setTimeout(function () {
        hideCards()
      }, timeOut);
    }
    
  }

  



}



function matchCheck() {

  if( open() != 2){
    return false;
  }

  let matchMe = Array.from(document.getElementsByClassName('open'));

  console.log("matchMe: " + matchMe[0].className);
  console.log("card: " + matchMe[1].className);
  

  if (matchMe[0].className == matchMe[1].className) {
    console.log("MATCH!");
    matchMe[0].removeEventListener("click", handleCardClick);
    matchMe[1].removeEventListener("click", handleCardClick);
    

    matchMe[0].classList.toggle("matched");
    matchMe[1].classList.toggle("matched");

    matchMe[0].classList.toggle("open");
    matchMe[1].classList.toggle("open");

    
    // open = 0;
    console.log(open());
    return true;

  }
  // setTimeout(function () {
  
  // }, timeOut)
 
  return false;

}


function showCard(card) {
  
  card.style.backgroundColor = card.className;
  card.classList.toggle("open");
  console.log("Show");
  
  
  console.log(open());
  

}

function hideCards() {

  console.log("hiding..");
  let hideMe = Array.from(document.getElementsByClassName('open'));

  for(card of hideMe){
    if(!card.classList.contains('matched')){
      card.style.backgroundColor = "white"
      card.classList.toggle("open");  
    }
  }
  
  
  
}



const startButton = document.getElementById("button")
startButton.addEventListener("click", startGame)


function startGame(){
  gameContainer.innerHTML = "";
  createDivsForColors(shuffledColors);
}



