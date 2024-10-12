import "./style.css";


//important variables
let counter: number = 0;
let autoClickRateMS: number = 0; //1000 means 1 click per sec
let autoClickStrength : number = 0.1;
let upgradeOneCount : number = 0;
let upgradeTwoCount : number = 0;
let upgradeThreeCount : number = 0;


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
upgradeButtonOne.innerHTML = "Buy Controller 🕹️: 10 mashes";
upgradeButtonOne.id = "Buy Controller";
upgradeButtonOne.style.color = "white";
upgradeButtonOne.style.backgroundColor = "black";
upgradeButtonOne.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButtonOne);

const upgradeButtonTwo: HTMLButtonElement = document.createElement("button");
upgradeButtonTwo.innerHTML = "Buy Button-Mashing-Grandma 👵: 100 mashes";
upgradeButtonTwo.id = "Buy Grandma";
upgradeButtonTwo.style.color = "white";
upgradeButtonTwo.style.backgroundColor = "black";
upgradeButtonTwo.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButtonTwo);

const upgradeButtonThree: HTMLButtonElement = document.createElement("button");
upgradeButtonThree.innerHTML = "Buy Turbo Controller ⏩: 1000 mashes";
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
upgradeButtonRefOne.disabled = true;
const upgradeButtonRefThree = document.getElementById(
  "Buy Turbo",
) as HTMLButtonElement;
upgradeButtonRefOne.disabled = true;


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

  if (counter >= 10) {
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

  if (counter >= 100) {
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

  if (counter >= 1000) {
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
  counter -= 10;
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
  if (autoClickRateMS == 0) autoClickRateMS = 1000;
  else autoClickStrength += 0.1;
growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`;
upgradeOneCount++;
upgradeOneCountScreen.innerHTML = `${upgradeOneCount} controllers owned`;
}

function increaseButtonsTimeRateTwo() {
  counter -= 100;
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
  if (autoClickRateMS == 0) autoClickRateMS = 1000;
  else autoClickStrength += 2;
growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`;
upgradeTwoCount++;
upgradeTwoCountScreen.innerHTML = `${upgradeTwoCount} grandmas owned`;
}

function increaseButtonsTimeRateThree() {
  counter -= 1000;
  resourceValueCounter.innerHTML = `${Math.floor(counter)} buttons mashed`;
  if (autoClickRateMS == 0) autoClickRateMS = 1000;
  else autoClickStrength += 50;
growthRate.innerHTML = `${autoClickStrength * (autoClickRateMS / 1000)} buttons being mashed per second`;
upgradeThreeCount++;
upgradeThreeCountScreen.innerHTML = `${upgradeThreeCount} turbo controllers owned`;
}

document.body.append(resourceValue);

//setup click
const b = document.getElementById("Button Masher");
if (b) b.addEventListener("click", incrementButtonsClicks, false);

//begin loop
requestAnimationFrame(incrementButtonsTime);
