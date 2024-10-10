import "./style.css";

//very messy code! i will clean it with steps 6->10!

let counter: number = 0;
const app: HTMLDivElement = document.querySelector("#app")!;
const resourceValue: HTMLDivElement = document.querySelector("#app")!;
const resourceValueCounter = document.createElement("p");
resourceValueCounter.innerHTML = `${counter} buttons mashed`;
resourceValue.append(resourceValueCounter);

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

const upgradeButton: HTMLButtonElement = document.createElement("button");
upgradeButton.innerHTML = "Buy Controller 🕹️: 10 mashes";
upgradeButton.id = "Buy Controller";
upgradeButton.style.color = "white";
upgradeButton.style.backgroundColor = "black";
upgradeButton.style.textDecoration = "line-through"; //used brace for line-through/none https://chat.brace.tools/s/811df2dc-d79a-49c4-9792-ea05329197d5
app.append(upgradeButton);

//end part 'as HTMLButtonElement' cleared an error, got it from brace https://chat.brace.tools/s/7d0d16ca-d3cf-464f-b35f-44e49a6098e1
const upgradeButtonRef = document.getElementById(
  "Buy Controller",
) as HTMLButtonElement;
upgradeButtonRef.disabled = true;

//used mdn docs example for this part https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#examples
let start: DOMHighResTimeStamp;
let lastElapsed: DOMHighResTimeStamp = 0;
let autoClickRateMS = 0; //1000 means 1 click per sec
let autoClickStrength = 1;

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
    resourceValueCounter.innerHTML = `${counter} buttons mashed`;
    lastElapsed = elapsed;
  }

  if (counter >= 10) {
    upgradeButtonRef.style.textDecoration = "none";
    upgradeButtonRef.disabled = false;
    upgradeButtonRef.addEventListener("click", increaseButtonsTimeRate, false);
  } else {
    upgradeButtonRef.style.textDecoration = "line-through";
    upgradeButtonRef.disabled = true;

    upgradeButtonRef.removeEventListener(
      "click",
      increaseButtonsTimeRate,
      false,
    ); //used GPT to find removeEventListener https://chatgpt.com/share/6708650f-066c-8007-b393-0f359ee8bb76
  }
  requestAnimationFrame(incrementButtonsTime);
}

function incrementButtonsClicks() {
  counter++;
  resourceValueCounter.innerHTML = `${counter} buttons mashed`;
}

function increaseButtonsTimeRate() {
  counter -= 10;
  resourceValueCounter.innerHTML = `${counter} buttons mashed`;
  if (autoClickRateMS == 0) autoClickRateMS = 1000;
  else autoClickStrength++;
}

document.body.append(resourceValue);

const b = document.getElementById("Button Masher");
if (b) b.addEventListener("click", incrementButtonsClicks, false);

//setInterval(incrementButtons, 1000);

requestAnimationFrame(incrementButtonsTime);
