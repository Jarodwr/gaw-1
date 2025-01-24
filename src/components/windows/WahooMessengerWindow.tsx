import { Button, Frame } from "react95";
import { useStore } from "../../store";
import { getRandomInt } from "../../helper/getRandomInt";

export const WahooMessengerWindow = () => {
  const messengerEvent = useStore(state => state.currentMessengerEvent);
  const concerningMate = useStore(state => state.currentMessengerEvent?.concerningMateIndex !== undefined ? state.roomMates[state.currentMessengerEvent.concerningMateIndex] : undefined);
  const fromMate = useStore(state => state.currentMessengerEvent !== undefined ? state.roomMates[state.currentMessengerEvent.fromMateIndex] : undefined);
  const set = useStore(state => state.set);
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
      <Frame variant='field' style={{ flexGrow: 1 }}>
        {concerningMate && fromMate && messengerEvent &&
          <div style={{
            display: 'flex',
            padding: '1em',
            flexDirection: 'row',
            gap: '1em'
          }}>
            <img width={48} height={48} src={fromMate.avatarUrl} />
            <div>{concerningMate.fullName} {messengerEvent.message}</div>
          </div>}
        {messengerEvent && !concerningMate && fromMate &&
          <div style={{
            display: 'flex',
            padding: '1em',
            flexDirection: 'row',
            gap: '1em'
          }}>
            <img width={48} height={48} src={fromMate.avatarUrl} />
            <div>{messengerEvent.message}</div>
          </div>}
      </Frame>
      {messengerEvent?.concerningMateIndex !== undefined &&
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <div style={{ flexGrow: 1 }}>
            <Button
              style={{
                width: '100%',
                height: '5em',
                fontWeight: 'bold',
                backgroundColor: 'green',
                color: 'white'
              }}
              onClick={() => set(state => {
                const concerningMate = messengerEvent.concerningMateIndex;
                if (concerningMate !== undefined) {
                  state.rentalHistory.push({
                    roomMate: state.roomMates[concerningMate],
                    duration: getRandomInt(1, 10),
                    mood: "sad"
                  })
                  state.roomMates.splice(concerningMate, 1);
                  state.currentMessengerEvent = undefined;
                }
              })}>
              Yes
            </Button>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Button
              style={{
                width: '100%',
                height: '5em',
                fontWeight: 'bold',
                backgroundColor: 'red',
                color: 'white'
              }}
              onClick={() => set(state => {
                state.rentalHistory.push({
                  roomMate: state.roomMates[messengerEvent.fromMateIndex],
                  duration: getRandomInt(1, 10),
                  mood: "sad"
                })
                state.roomMates.splice(messengerEvent.fromMateIndex, 1);
                state.currentMessengerEvent = undefined;
              })}>
              No
            </Button>
          </div>
        </div>}
    </div>
  );
}