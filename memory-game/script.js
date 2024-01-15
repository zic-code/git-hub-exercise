const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped=0;
let noClicking = false;
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

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

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
  console.log("you just clicked", event.target);
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList;
 // !CARDn = NULL 
 //카드 1또는 카드2가 null이라면  
 if(!card1 || !card2){
// 현재 클릭한 카드에 클래스리스트에 flipped 클라스를 추가한다. 
currentCard.classList.add("flipped");
// 첫번째 카드(card1)를 선택한 경우 card1은 currentCard가 된다. 
card1 = card1 || currentCard;
// 두번째 카드(card2)를 선택한 경우 currentCard와 card1이 여전히 같다면 card2는 null값을 반환하고 만약 서로다를 경우 card2 = currentcard가 된다. 
card2 = currentCard === card1 ? null : currentCard;
 }
// 두개의 카드가 모두 선택되었을때의 상황

// 두개의 카드값이 null이 아닐경우(두개의 카드가 flipped된 경우)
if ( card1 && card2){
  //클릭이 안되게 지정한다. 
  noClicking = true;
  //선택된 두카드의 className을 변수 gif 1과 2로 지정한다. 
  let gif1 = card1.className;
  let gif2 = card2.className;

 // 만약 같을경우와 같지 않을 경우를 어떻게 실행할지 결정한다. 
 if (gif1 === gif2) {
  // 같을 경우
  cardsFlipped+=2;
  card1.removeEventListener("click", handleCardClick);
  card2.removeEventListener("click", handleCardClick);
  card1 = null;
  card2 = null;
  noClicking = false;
 }
 //만약 다르다면
  else{ 
    setTimeout(function(){
      card1.style.backgroundColor="";
      card2.style.backgroundColor="";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1 = null;
      card2 = null;
      noClicking = false;
      


    },500)

 }



}

 
if (cardsFlipped === COLORS.length) alert("game over!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
