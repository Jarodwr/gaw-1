import { useState } from "react";
import floorplanImage from '../../assets/4br.png'
import { Button, Frame, Window, WindowContent, WindowHeader } from "react95";
import { useStore } from '../../store'
import { RoomMate } from "../../types/RoomMate";
import { getRandomInt } from "../../helper/getRandomInt";

const RoomMateIcon = (props: { roomMate: RoomMate }) =>
  <div style={{}}>
    <div style={{ fontWeight: 'bold' }}>{props.roomMate.fullName}</div>
    <img src={props.roomMate.avatarUrl} style={{ width: '3em', height: '3em' }} />
    <div style={{ fontWeight: 'bold' }}>${props.roomMate.askingRent}</div>
  </div>

const moods = ["happy", "sad", "mad", "annoyed", "somber", "scared"]

export const FloorplanWindow = () => {
  const roomMates = useStore(state => state.roomMates);
  const set = useStore(state => state.set);

  const onRoomMateClick = (index: number) => setViewingRoommate(index);

  const [viewingRoommate, setViewingRoommate] = useState<number | undefined>(undefined);

  const evictHouseMate = () => set(state => {
    if (viewingRoommate !== undefined) {
      const [mate] = state.roomMates.splice(viewingRoommate, 1);
      state.rentalHistory.push({
        roomMate: mate,
        duration: getRandomInt(0, 10),
        mood: moods[getRandomInt(0, moods.length)]
      })
      setViewingRoommate(undefined);
    }
  });
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', maxHeight: '100%', maxWidth: '100%' }}>
      <img src={floorplanImage}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%'
        }} />
      {/* ROOM 1 Button */}
      <Button style={{
        position: 'absolute',
        display: 'block',
        left: '19%',
        top: '10%',
        height: '22%',
        width: '17%'
      }} disabled={!Boolean(roomMates[0])}
        onClick={() => onRoomMateClick(0)}>
        {roomMates[0] && <RoomMateIcon roomMate={roomMates[0]} />}
      </Button>

      {/* ROOM 2 Button */}
      <Button
        style={{
          position: 'absolute',
          display: 'block',
          left: '40%',
          top: '17%',
          height: '22%',
          width: '17%'
        }}
        disabled={!Boolean(roomMates[1])}
        onClick={() => onRoomMateClick(1)}>
        {roomMates[1] && <RoomMateIcon roomMate={roomMates[1]} />}
      </Button>

      {/* ROOM 3 Button */}
      <Button
        style={{
          position: 'absolute',
          display: 'block',
          left: '80%',
          top: '30%',
          height: '22%',
          width: '17%'
        }}
        disabled={!Boolean(roomMates[2])}
        onClick={() => onRoomMateClick(2)}>
        {roomMates[2] && <RoomMateIcon roomMate={roomMates[2]} />}
      </Button>

      {/* ROOM 4 Button */}
      <Button
        style={{
          position: 'absolute',
          display: 'block',
          left: '70%',
          top: '65%',
          height: '22%',
          width: '17%'
        }}
        disabled={!Boolean(roomMates[3])}
        onClick={() => onRoomMateClick(3)}>
        {roomMates[3] && <RoomMateIcon roomMate={roomMates[3]} />}
      </Button>

      {/* ROOM 5 Button */}
      <Button
        style={{
          position: 'absolute',
          display: 'block',
          left: '35%',
          top: '65%',
          height: '22%',
          width: '17%'
        }}
        disabled={!Boolean(roomMates[4])}
        onClick={() => onRoomMateClick(4)}>
        {roomMates[4] && <RoomMateIcon roomMate={roomMates[4]} />}
      </Button>

      {/* ROOM 6 (YOUR ROOM) Button */}
      <Frame style={{
        position: 'absolute',
        left: '20%',
        top: '65%',
        height: '20%',
        width: '13%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      }} variant="field">
        (YOU)
      </Frame>
      {viewingRoommate !== undefined &&
        <Window
          style={{
            position: 'absolute',
            left: '10%',
            right: '5%',
            top: '10%',
            bottom: '10%',
            display: 'flex',
            flexDirection: 'column'
          }}>
          <WindowHeader>Details</WindowHeader>
          <WindowContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flexGrow: 1 }}></div>
            <div style={{ display: 'flex', flexDirection: 'row', fontWeight: 'bold', gap: '0.5em' }}>
              <Button onClick={evictHouseMate}>EVICT</Button>
              <Button onClick={() => setViewingRoommate(undefined)}>CANCEL</Button>
            </div>
          </WindowContent>
        </Window>}
    </div>
  );
}