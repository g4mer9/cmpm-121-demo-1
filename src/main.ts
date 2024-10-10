import "./style.css";

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

//used mdn docs example for this part https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#examples
let start: DOMHighResTimeStamp;
let lastElapsed: DOMHighResTimeStamp = 0;
function incrementButtonsTime(timestamp: DOMHighResTimeStamp) {
  if (start === undefined) start = timestamp;
  const elapsed: DOMHighResTimeStamp = timestamp - start;
  if (elapsed - lastElapsed > 1000 && elapsed != 0) {
    counter++;
    resourceValueCounter.innerHTML = `${counter} buttons mashed`;
    lastElapsed = elapsed;
  }

  requestAnimationFrame(incrementButtonsTime);
}

function incrementButtonsClicks() {
  counter++;
  resourceValueCounter.innerHTML = `${counter} buttons mashed`;
}

//used brace for this https://chat.brace.tools/s/aa2a1e9a-e4f8-44fb-9dd7-385748f720b5
const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "Mash Button 🕹️";
button.id = "Button Masher";
button.style.color = "black";
button.style.backgroundColor = "white";
app.append(button);

document.body.append(resourceValue);

const b = document.getElementById("Button Masher");
if (b) b.addEventListener("click", incrementButtonsClicks, false);
//setInterval(incrementButtons, 1000);

requestAnimationFrame(incrementButtonsTime);
