import "./style.css";

interface Item {
  name: string,
  cost: number,
  rate: number,
  count: number
}

const availableItems: Item[] = [
  {name: "Controller 🕹️", cost: 10, rate: 0.1, count: 0},
  {name: "Button Mashing Grandma 👵", cost: 100, rate: 2, count: 0},
  {name: "Turbo Controller ⏩", cost: 1000, rate: 50, count: 0}
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
upgradeOneCountScreen.innerHTML = `${availableItems[0].count} ${availableItems[0].name} owned`;
upgradeTwoCountScreen.innerHTML = `${availableItems[1].count} ${availableItems[1].name} owned`;
upgradeThreeCountScreen.innerHTML = `${availableItems[2].count} ${availableItems[2].name} owned`;

growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`
resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
resourceValue.append(resourceValueCounter);
resourceValue.append(growthRate);
resourceValue.append(upgradeOneCountScreen);
resourceValue.append(upgradeTwoCountScreen);
resourceValue.append(upgradeThreeCountScreen);



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

const buttonArr: HTMLButtonElement[] = [
  upgradeButtonRefOne,
  upgradeButtonRefTwo,
  upgradeButtonRefThree
];


upgradeButtonRefOne.addEventListener("click", (event) => increaseButtonsTimeRate("0", event), false);
upgradeButtonRefTwo.addEventListener("click", (event) => increaseButtonsTimeRate("1", event), false);
upgradeButtonRefThree.addEventListener("click", (event) => increaseButtonsTimeRate("2", event), false);




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
growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`;
availableItems[index].count++;
availableItems[index].cost = availableItems[index].cost * 1.15;

switch(index) {
  case 0:
    upgradeOneCountScreen.innerHTML = `${availableItems[0].count} ${availableItems[0].name} owned`;
    upgradeButtonOne.innerHTML = `Buy ${availableItems[0].name}: ${availableItems[0].cost} mashes`;
    break;
  case 1:
    upgradeTwoCountScreen.innerHTML = `${availableItems[1].count} ${availableItems[1].name} owned`;
    upgradeButtonTwo.innerHTML = `Buy ${availableItems[1].name}: ${availableItems[1].cost} mashes`;
    break;
  case 2:
    upgradeThreeCountScreen.innerHTML = `${availableItems[2].count} ${availableItems[2].name} owned`;
    upgradeButtonThree.innerHTML = `Buy ${availableItems[2].name}: ${availableItems[2].cost} mashes`;
    break;
}


}
document.body.append(resourceValue);

//setup click
const b = document.getElementById("Button Masher");
if (b) b.addEventListener("click", incrementButtonsClicks, false);

//begin loop
requestAnimationFrame(incrementButtonsTime);
