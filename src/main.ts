import "./style.css";

interface Item {
  name: string,
  description: string,
  cost: number,
  rate: number,
  count: number
}

const availableItems: Item[] = [
  {name: "Controller 🕹️", description: "Standard controller for mashing purposes. The buttons are already worn down.", cost: 10, rate: 0.1, count: 0},
  {name: "Button Mashing Grandma 👵", description: "Poached from the cookie farm layoffs, worse than you at mashing.", cost: 10, rate: 2, count: 0},
  {name: "Turbo Controller ⏩", description: "Makes your grandmas more efficient by replacing mashing buttons with holding them.", cost: 10, rate: 50, count: 0},
  {name: "Button Mashing Machine 🤖", description: "Much faster than you or your grandmas at mashing those buttons.", cost: 20, rate: 100, count: 0},
  {name: "Ludwig 👨", description: "Self-proclaimed best button masher in the world.", cost: 10, rate: 1000, count: 0},
];


//important variables
let counter: number = 0;
let autoClickRateMS: number = 0; //1000 means 1 click per sec
let autoClickStrength : number = 0;


//INNER HTML SETUP==================================================================================================================================================
const app: HTMLDivElement = document.querySelector("#app")!;
const resourceValue: HTMLDivElement = document.querySelector("#app")!;
const resourceValueCounter = document.createElement("p");
const growthRate = document.createElement("p");
const upgradeOneCountScreen = document.createElement("p");
const upgradeTwoCountScreen = document.createElement("p");
const upgradeThreeCountScreen = document.createElement("p");
const upgradeFourCountScreen = document.createElement("p");
const upgradeFiveCountScreen = document.createElement("p");
upgradeOneCountScreen.innerHTML = `${availableItems[0].count} ${availableItems[0].name} owned - ${availableItems[0].description}`;
upgradeTwoCountScreen.innerHTML = `${availableItems[1].count} ${availableItems[1].name} owned - ${availableItems[1].description}`;
upgradeThreeCountScreen.innerHTML = `${availableItems[2].count} ${availableItems[2].name} owned - ${availableItems[2].description}`;
upgradeFourCountScreen.innerHTML = `${availableItems[3].count} ${availableItems[3].name} owned - ${availableItems[3].description}`;
upgradeFiveCountScreen.innerHTML = `${availableItems[4].count} ${availableItems[4].name} owned - ${availableItems[4].description}`;


growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`
resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
resourceValue.append(resourceValueCounter);
resourceValue.append(growthRate);
resourceValue.append(upgradeOneCountScreen);
resourceValue.append(upgradeTwoCountScreen);
resourceValue.append(upgradeThreeCountScreen);
resourceValue.append(upgradeFourCountScreen);
resourceValue.append(upgradeFiveCountScreen);




const gameName = "My button mashing game";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
//used brace for this https://chat.brace.tools/s/aa2a1e9a-e4f8-44fb-9dd7-385748f720b5
const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "Mash Button 🎮";
button.id = "Button Masher";
button.style.color = "black";
button.style.backgroundColor = "white";
app.append(button);
const upgradeButtonOne: HTMLButtonElement = document.createElement("button");
upgradeButtonOne.innerHTML = `Buy ${availableItems[0].name}: ${availableItems[0].cost} mashes`;
upgradeButtonOne.id = `Buy ${availableItems[0].name}`;
upgradeButtonOne.style.color = "white";
upgradeButtonOne.style.backgroundColor = "black";
upgradeButtonOne.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButtonOne);

const upgradeButtonTwo: HTMLButtonElement = document.createElement("button");
upgradeButtonTwo.innerHTML = `Buy ${availableItems[1].name}: ${availableItems[1].cost} mashes`;
upgradeButtonTwo.id = `Buy ${availableItems[1].name}`;
upgradeButtonTwo.style.color = "white";
upgradeButtonTwo.style.backgroundColor = "black";
upgradeButtonTwo.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButtonTwo);

const upgradeButtonThree: HTMLButtonElement = document.createElement("button");
upgradeButtonThree.innerHTML = `Buy ${availableItems[2].name}: ${availableItems[2].cost} mashes`;
upgradeButtonThree.id = `Buy ${availableItems[2].name}`;
upgradeButtonThree.style.color = "white";
upgradeButtonThree.style.backgroundColor = "black";
upgradeButtonThree.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButtonThree);

const upgradeButtonFour: HTMLButtonElement = document.createElement("button");
upgradeButtonFour.innerHTML = `Buy ${availableItems[3].name}: ${availableItems[3].cost} mashes`;
upgradeButtonFour.id = `Buy ${availableItems[3].name}`;
upgradeButtonFour.style.color = "white";
upgradeButtonFour.style.backgroundColor = "black";
upgradeButtonFour.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButtonFour);

const upgradeButtonFive: HTMLButtonElement = document.createElement("button");
upgradeButtonFive.innerHTML = `Buy ${availableItems[4].name}: ${availableItems[4].cost} mashes`;
upgradeButtonFive.id = `Buy ${availableItems[4].name}`;
upgradeButtonFive.style.color = "white";
upgradeButtonFive.style.backgroundColor = "black";
upgradeButtonFive.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButtonFive);



//end part 'as HTMLButtonElement' cleared an error, got it from brace https://chat.brace.tools/s/7d0d16ca-d3cf-464f-b35f-44e49a6098e1
//reference to button 1
const upgradeButtonRefOne = document.getElementById(
  `Buy ${availableItems[0].name}`,
) as HTMLButtonElement;
upgradeButtonRefOne.disabled = true;
const upgradeButtonRefTwo = document.getElementById(
  `Buy ${availableItems[1].name}`,
) as HTMLButtonElement;
upgradeButtonRefTwo.disabled = true;
const upgradeButtonRefThree = document.getElementById(
  `Buy ${availableItems[2].name}`,
) as HTMLButtonElement;
upgradeButtonRefThree.disabled = true;
const upgradeButtonRefFour = document.getElementById(
  `Buy ${availableItems[3].name}`,
) as HTMLButtonElement;
upgradeButtonRefThree.disabled = true;
const upgradeButtonRefFive = document.getElementById(
  `Buy ${availableItems[4].name}`,
) as HTMLButtonElement;
upgradeButtonRefThree.disabled = true;

const buttonArr: HTMLButtonElement[] = [
  upgradeButtonRefOne,
  upgradeButtonRefTwo,
  upgradeButtonRefThree,
  upgradeButtonRefFour,
  upgradeButtonRefFive
];


upgradeButtonRefOne.addEventListener("click", (event) => increaseButtonsTimeRate("0", event), false);
upgradeButtonRefTwo.addEventListener("click", (event) => increaseButtonsTimeRate("1", event), false);
upgradeButtonRefThree.addEventListener("click", (event) => increaseButtonsTimeRate("2", event), false);
upgradeButtonRefFour.addEventListener("click", (event) => increaseButtonsTimeRate("3", event), false);
upgradeButtonRefFive.addEventListener("click", (event) => increaseButtonsTimeRate("4", event), false);





//MAIN LOOP========================================================================================================================================================


//used mdn docs example for this part https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#examples
let start: DOMHighResTimeStamp;
let lastElapsed: DOMHighResTimeStamp = 0;
//basically using this as a step/update function now lol
function incrementButtonsTime(timestamp: DOMHighResTimeStamp) {
  if (start === undefined) start = timestamp;
  const elapsed: DOMHighResTimeStamp = timestamp - start;
  if (
    autoClickRateMS > 0 &&
    elapsed - lastElapsed > autoClickRateMS &&
    elapsed != 0
  ) {
    counter += autoClickStrength;
    resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
    lastElapsed = elapsed;
  }


  // eslint-disable-next-line prefer-const
  for(let index in availableItems) {
    if (counter >= availableItems[index].cost) {
      buttonArr[index].style.textDecoration = "none";
      buttonArr[index].disabled = false;

    } else {
      buttonArr[index].style.textDecoration = "line-through";
      buttonArr[index].disabled = true;
    }

  }

  requestAnimationFrame(incrementButtonsTime);
}

//HELPER FUNCTIONS====================================================================================================================================================

function incrementButtonsClicks() {
  counter++;
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function increaseButtonsTimeRate(i: string, _event : Event) {
  const index: number = Number(i);
  counter -= availableItems[index].cost;
  
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
  if (autoClickRateMS == 0) autoClickRateMS = 1000;
  autoClickStrength += availableItems[index].rate;
  //im not sure if my prettier broke, or if the indentations below are acceptable
growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`;
availableItems[index].count++;
availableItems[index].cost = availableItems[index].cost * 1.15;

switch(index) {
  case 0:
    upgradeOneCountScreen.innerHTML = `${availableItems[0].count} ${availableItems[0].name} owned - ${availableItems[0].description}`;
    upgradeButtonOne.innerHTML = `Buy ${availableItems[0].name}: ${availableItems[0].cost} mashes`;
    break;
  case 1:
    upgradeTwoCountScreen.innerHTML = `${availableItems[1].count} ${availableItems[1].name} owned - ${availableItems[1].description}`;
    upgradeButtonTwo.innerHTML = `Buy ${availableItems[1].name}: ${availableItems[1].cost} mashes`;
    break;
  case 2:
    upgradeThreeCountScreen.innerHTML = `${availableItems[2].count} ${availableItems[2].name} owned - ${availableItems[2].description}`;
    upgradeButtonThree.innerHTML = `Buy ${availableItems[2].name}: ${availableItems[2].cost} mashes`;
    break;
  case 3:
    upgradeFourCountScreen.innerHTML = `${availableItems[3].count} ${availableItems[3].name} owned - ${availableItems[3].description}`;
    upgradeButtonFour.innerHTML = `Buy ${availableItems[3].name}: ${availableItems[3].cost} mashes`;
    break;
  case 4:
    upgradeFiveCountScreen.innerHTML = `${availableItems[4].count} ${availableItems[4].name} owned - ${availableItems[4].description}`;
    upgradeButtonFive.innerHTML = `Buy ${availableItems[4].name}: ${availableItems[4].cost} mashes`;
    break;
}


}
document.body.append(resourceValue);

//setup click
const b = document.getElementById("Button Masher");
if (b) b.addEventListener("click", incrementButtonsClicks, false);

//begin loop
requestAnimationFrame(incrementButtonsTime);
