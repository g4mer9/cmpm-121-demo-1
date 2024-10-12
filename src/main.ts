import "./style.css";


//important variables
let counter: number = 0;
let autoClickRateMS: number = 0; //1000 means 1 click per sec
let autoClickStrength : number = 0.1;
let upgradeOneCount : number = 0;
let upgradeTwoCount : number = 0;
let upgradeThreeCount : number = 0;
let upgradeOnePrice : number = 10;
let upgradeTwoPrice : number = 100;
let upgradeThreePrice : number = 1000;



//i was going to refactor some stuff, but i guess i should wait for step 9 lol


//INNER HTML SETUP==================================================================================================================================================
const app: HTMLDivElement = document.querySelector("#app")!;
const resourceValue: HTMLDivElement = document.querySelector("#app")!;
const resourceValueCounter = document.createElement("p");
const growthRate = document.createElement("p");
const upgradeOneCountScreen = document.createElement("p");
const upgradeTwoCountScreen = document.createElement("p");
const upgradeThreeCountScreen = document.createElement("p");
upgradeOneCountScreen.innerHTML = `${upgradeOneCount} controllers owned`;
upgradeTwoCountScreen.innerHTML = `${upgradeTwoCount} grandmas owned`;
upgradeThreeCountScreen.innerHTML = `${upgradeThreeCount} turbo controllers owned`;

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
upgradeButtonOne.innerHTML = `Buy Controller 🕹️: ${upgradeOnePrice} mashes`;
upgradeButtonOne.id = "Buy Controller";
upgradeButtonOne.style.color = "white";
upgradeButtonOne.style.backgroundColor = "black";
upgradeButtonOne.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButtonOne);

const upgradeButtonTwo: HTMLButtonElement = document.createElement("button");
upgradeButtonTwo.innerHTML = `Buy Button-Mashing-Grandma 👵: ${upgradeTwoPrice} mashes`;
upgradeButtonTwo.id = "Buy Grandma";
upgradeButtonTwo.style.color = "white";
upgradeButtonTwo.style.backgroundColor = "black";
upgradeButtonTwo.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButtonTwo);

const upgradeButtonThree: HTMLButtonElement = document.createElement("button");
upgradeButtonThree.innerHTML = `Buy Turbo Controller ⏩: ${upgradeThreePrice} mashes`;
upgradeButtonThree.id = "Buy Turbo";
upgradeButtonThree.style.color = "white";
upgradeButtonThree.style.backgroundColor = "black";
upgradeButtonThree.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButtonThree);

//end part 'as HTMLButtonElement' cleared an error, got it from brace https://chat.brace.tools/s/7d0d16ca-d3cf-464f-b35f-44e49a6098e1
//reference to button 1
const upgradeButtonRefOne = document.getElementById(
  "Buy Controller",
) as HTMLButtonElement;
upgradeButtonRefOne.disabled = true;
const upgradeButtonRefTwo = document.getElementById(
  "Buy Grandma",
) as HTMLButtonElement;
upgradeButtonRefTwo.disabled = true;
const upgradeButtonRefThree = document.getElementById(
  "Buy Turbo",
) as HTMLButtonElement;
upgradeButtonRefThree.disabled = true;


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

  if (counter >= upgradeOnePrice) {
    upgradeButtonRefOne.style.textDecoration = "none";
    upgradeButtonRefOne.disabled = false;
    upgradeButtonRefOne.addEventListener("click", increaseButtonsTimeRateOne, false);
  } else {
    upgradeButtonRefOne.style.textDecoration = "line-through";
    upgradeButtonRefOne.disabled = true;

    upgradeButtonRefOne.removeEventListener(
      "click",
      increaseButtonsTimeRateOne,
      false,
    ); //used GPT to find removeEventListener https://chatgpt.com/share/6708650f-066c-8007-b393-0f359ee8bb76
  }

  if (counter >= upgradeTwoPrice) {
    upgradeButtonRefTwo.style.textDecoration = "none";
    upgradeButtonRefTwo.disabled = false;
    upgradeButtonRefTwo.addEventListener("click", increaseButtonsTimeRateTwo, false);
  } else {
    upgradeButtonRefTwo.style.textDecoration = "line-through";
    upgradeButtonRefTwo.disabled = true;

    upgradeButtonRefTwo.removeEventListener(
      "click",
      increaseButtonsTimeRateTwo,
      false,
    ); //used GPT to find removeEventListener https://chatgpt.com/share/6708650f-066c-8007-b393-0f359ee8bb76
  }

  if (counter >= upgradeThreePrice) {
    upgradeButtonRefThree.style.textDecoration = "none";
    upgradeButtonRefThree.disabled = false;
    upgradeButtonRefThree.addEventListener("click", increaseButtonsTimeRateThree, false);
  } else {
    upgradeButtonRefThree.style.textDecoration = "line-through";
    upgradeButtonRefThree.disabled = true;

    upgradeButtonRefThree.removeEventListener(
      "click",
      increaseButtonsTimeRateThree,
      false,
    ); //used GPT to find removeEventListener https://chatgpt.com/share/6708650f-066c-8007-b393-0f359ee8bb76
  }
  requestAnimationFrame(incrementButtonsTime);
}

//HELPER FUNCTIONS====================================================================================================================================================

function incrementButtonsClicks() {
  counter++;
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
}

function increaseButtonsTimeRateOne() {
  counter -= upgradeOnePrice;
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
  if (autoClickRateMS == 0) autoClickRateMS = 1000;
  else autoClickStrength += 0.1;
growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`;
upgradeOneCount++;
upgradeOneCountScreen.innerHTML = `${upgradeOneCount} controllers owned`;
upgradeOnePrice = upgradeOnePrice * 1.15;
upgradeButtonOne.innerHTML = `Buy Controller 🕹️: ${upgradeOnePrice} mashes`;

}

function increaseButtonsTimeRateTwo() {
  counter -= upgradeTwoPrice;
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
  if (autoClickRateMS == 0) autoClickRateMS = 1000;
  else autoClickStrength += 2;
growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`;
upgradeTwoCount++;
upgradeTwoCountScreen.innerHTML = `${upgradeTwoCount} grandmas owned`;
upgradeTwoPrice = upgradeTwoPrice * 1.15;
upgradeButtonTwo.innerHTML = `Buy Button-Mashing-Grandma 👵: ${upgradeTwoPrice} mashes`;

}

function increaseButtonsTimeRateThree() {
  counter -= upgradeThreePrice;
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
  if (autoClickRateMS == 0) autoClickRateMS = 1000;
  else autoClickStrength += 50;
growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`;
upgradeThreeCount++;
upgradeThreeCountScreen.innerHTML = `${upgradeThreeCount} turbo controllers owned`;
upgradeThreePrice = upgradeThreePrice * 1.15;
upgradeButtonThree.innerHTML = `Buy Turbo Controller ⏩: ${upgradeThreePrice} mashes`;

}

document.body.append(resourceValue);

//setup click
const b = document.getElementById("Button Masher");
if (b) b.addEventListener("click", incrementButtonsClicks, false);

//begin loop
requestAnimationFrame(incrementButtonsTime);
