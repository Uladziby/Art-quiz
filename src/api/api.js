import { randomNumber } from "../components/views/pictures/commonFunc";
export async function getImage(numberOfImage) {
  let resp;
  try {
    resp = await fetch(`../inputDate/img/${numberOfImage}.jpg`);
  } catch (e) {
    return console.log("image not found");
  }
    return resp.url;
  
}

export async function getRandomAuthor() {
  let randomNum = randomNumber();
  let resp;
  try {
    resp = await (await fetch("../../../inputDate/imgs.json")).json();
  } catch (e) {
    return console.log("file not found");
  } 
    return resp[randomNum].author;
  
}
