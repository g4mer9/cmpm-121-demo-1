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
  {name: "Button Mashing Grandma 👵", description: "Poached from the cookie farm layoffs, worse than you at mashing.", cost: 100, rate: 2, count: 0},
  {name: "Turbo Controller ⏩", description: "Makes your grandmas more efficient by replacing mashing buttons with holding them.", cost: 1000, rate: 50, count: 0},
  {name: "Button Mashing Machine 🤖", description: "Much faster than you or your grandmas at mashing those buttons.", cost: 2000, rate: 100, count: 0},
  {name: "Ludwig 👨", description: "Self-proclaimed best button masher in the world.", cost: 10000, rate: 1000, count: 0},
];


//important variables
let counter: number = 0;
let autoClickRateMS: number = 0; //1000 means 1 click per sec
let autoClickStrength : number = 0;

//HELPER FUNCTIONS====================================================================================================================================================

function incrementButtonsClicks() {
  counter++;
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function upgradeRate(i: number, _event : Event) {
  const index: number = i;
  counter -= availableItems[index].cost;
  
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
  if (autoClickRateMS == 0) autoClickRateMS = 1000;
  autoClickStrength += availableItems[index].rate;
  //im not sure if my prettier broke, or if the indentations below are acceptable
growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`;
availableItems[index].count++;
availableItems[index].cost = availableItems[index].cost * 1.15;

const upgradeButton = document.getElementById(`Buy ${availableItems[index].name}`) as HTMLButtonElement;
const upgradeButtonScreen = document.getElementById(`${availableItems[index].name}`);
if(upgradeButtonScreen) upgradeButtonScreen.innerHTML = `${availableItems[index].count} ${availableItems[index].name} owned - ${availableItems[index].description}`;
upgradeButton.innerHTML = `Buy ${availableItems[index].name}: ${availableItems[index].cost} mashes`;

}


//INNER HTML SETUP==================================================================================================================================================
const app: HTMLDivElement = document.querySelector("#app")!;
const resourceValue: HTMLDivElement = document.querySelector("#app")!;
const resourceValueCounter = document.createElement("p");
const growthRate = document.createElement("p");

availableItems.forEach((item, index) => {
  const upgradeCountScreen = document.createElement("p");
  upgradeCountScreen.id = `${item.name}`;
  const upgradeButton = document.createElement("button");
  const buttonId = `Buy ${item.name}`;

  upgradeCountScreen.innerHTML = `${item.count} ${item.name} owned - ${item.description}`;
  upgradeButton.innerHTML = `Buy ${item.name}: ${item.cost} mashes`;
  upgradeButton.id = buttonId;
  upgradeButton.style.cssText = "color: white; background-color: black; text-decoration: line-through;";
  upgradeButton.disabled = true;
  app.append(upgradeCountScreen, upgradeButton);

  upgradeButton.addEventListener("click", (event) => upgradeRate(index, event), false);
});
resourceValue.append(resourceValueCounter, growthRate);


document.title = "My button mashing game";
const header = document.createElement("h1");
header.innerHTML = "My button mashing game";
app.append(header);
//used brace for this https://chat.brace.tools/s/aa2a1e9a-e4f8-44fb-9dd7-385748f720b5
const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "Mash Button 🎮";
button.id = "Button Masher";
button.style.cssText = "color: black; background-color: white";
app.append(button);



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

 availableItems.forEach((item) => {
  //end part 'as HTMLButtonElement' cleared an error, got it from brace https://chat.brace.tools/s/7d0d16ca-d3cf-464f-b35f-44e49a6098e1
    const upgradeButton = document.getElementById(`Buy ${item.name}`) as HTMLButtonElement;
    if(counter >= item.cost) {
      upgradeButton.style.textDecoration = 'none';
      upgradeButton.disabled = false;
    }
    else {
      upgradeButton.style.textDecoration = 'line-through';
      upgradeButton.disabled = true;
    }
 });

  requestAnimationFrame(incrementButtonsTime);
}


document.body.append(resourceValue);

//setup click
const b = document.getElementById("Button Masher");
if (b) b.addEventListener("click", incrementButtonsClicks, false);

//begin loop
requestAnimationFrame(incrementButtonsTime);
