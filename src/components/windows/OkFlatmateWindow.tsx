import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import {
  Button,
  Frame,
  Tab,
  TabBody,
  Tabs,
  Window,
  WindowContent,
  WindowHeader
} from "react95";

import { RoomMate } from "../../types/RoomMate";
import { useStore } from "../../store";
import { getRandomInt } from "../../helper/getRandomInt";

enum ActiveTabEnum {
  PROFILE = "profile",
  // EMPLOYMENT = "employment",
}

function generateNewCharacter() {
  return ({
    avatarUrl: `/src/assets/characters/row-${getRandomInt(1, 20)}-column-${getRandomInt(1, 16)}.png`,
    bio: faker.person.bio(),
    fullName: faker.person.fullName(),
    sex: faker.person.sex(),
    zodiac: faker.person.zodiacSign(),
    jobTitle: faker.person.jobTitle(),
    askingRent: getRandomInt(100, 200)
  });
}

export const OkFlatmateWindow = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabEnum>(ActiveTabEnum.PROFILE);
  const [currentCharacter, setCurrentCharacter] = useState<RoomMate>(generateNewCharacter());
  const set = useStore(state => state.set);
  const noVacantRooms = useStore(state => state.roomMates.length >= 5);

  const [warningDialogOpen, setWarningDialogOpen] = useState(false)

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, gap: '0.5em' }}>
        <Frame style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '1.5em', fontWeight: 'bold', paddingTop: '1em' }}>
            {currentCharacter.fullName}
          </div>
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={currentCharacter.avatarUrl} width='300' height='300' />
          </div>
          <div style={{ padding: '0.5em', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '0.5em' }}>
            <Button onClick={() => {
              if (noVacantRooms) {
                setWarningDialogOpen(true)
              } else {
                set(state => {
                  state.roomMates.push(currentCharacter);
                  setCurrentCharacter(generateNewCharacter());
                })
              }
            }}>
              YES
            </Button>
            <Button onClick={() => setCurrentCharacter(generateNewCharacter())}>
              NO
            </Button>
          </div>
        </Frame>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Tabs style={{ width: '100%' }} value={activeTab} onChange={value => setActiveTab(value)} >
            {Object.values(ActiveTabEnum).map(item => <Tab value={item}>{item}</Tab>)}
          </Tabs>
          <TabBody style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', fontWeight: 'bold' }}>
            <div style={{}}>
              Job: {currentCharacter.jobTitle}
            </div>
            <div style={{}}>
              Bio: {currentCharacter.bio}
            </div>
            <div style={{}}>
              Sex: {currentCharacter.sex}
            </div>
            <div style={{}}>
              Zodiac: {currentCharacter.zodiac}
            </div>
            <div style={{}}>
              Asking: ${currentCharacter.askingRent}
            </div>
          </TabBody>
        </div>
      </div>
      {warningDialogOpen &&
        <Window style={{ position: 'absolute', left: '30%', right: '30%', top: '30%', bottom: '30%', display: 'flex', flexDirection: 'column' }}>
          <WindowHeader>
            Error
          </WindowHeader>
          <WindowContent style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <div style={{ flexGrow: 1 }}>
              No vacant room to add new guest
            </div>
            <Button onClick={() => setWarningDialogOpen(false)}>Ok</Button>
          </WindowContent>
        </Window>}
    </div>
  );
}