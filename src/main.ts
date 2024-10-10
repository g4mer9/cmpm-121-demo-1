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

function incrementButtons() {
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
if (b) b.addEventListener("click", incrementButtons, false);
