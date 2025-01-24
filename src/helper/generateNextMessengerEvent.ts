import { MessengerEvent } from "../types/MessengerEvent";
import { RoomMate } from "../types/RoomMate";
import { getRandomInt } from "./getRandomInt";

const costOnlyEventMessages = [
  "We need to pay a plumber to unblock the toilet",
  "We need to pay an electrician to fix our stuff",
  "My door is broken",
  "There's a gas leak! We need this fixed",
  "You ate a bunch of my designer cheese, time to pay up"
];

const squabbleEventMessages = [
  "never cleans up, it's me or them",
  "makes it way too loud here, either they go or I do",
  "absolutely sucks, if you don't get rid of them I'm gone",
  "keeps hitting on my friends, kick them out",
]

export const generateNextMessengerEvent = (mates: RoomMate[]): MessengerEvent => {
  const fromMateIndex = getRandomInt(0, mates.length - 1);

  switch (getRandomInt(0, 1)) {
    case 0:
      // Cost only event
      return ({
        fromMateIndex,
        cost: getRandomInt(30, 70),
        message: costOnlyEventMessages[getRandomInt(0, costOnlyEventMessages.length - 1)]
      })
    case 1:
      //Squabble between housemates
      let concerningMateIndex = getRandomInt(0, mates.length - 2);
      if (concerningMateIndex === fromMateIndex) concerningMateIndex++;
      return ({
        fromMateIndex,
        concerningMateIndex,
        message: squabbleEventMessages[getRandomInt(0, squabbleEventMessages.length - 1)]
      })
    default:
      throw new Error("SOMETHING WENT WRONG")
  }
}