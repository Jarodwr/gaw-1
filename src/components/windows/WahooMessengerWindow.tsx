import { Button, Frame } from "react95";

export const WahooMessengerWindow = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
      <Frame variant='field' style={{ flexGrow: 1 }}>
      </Frame>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ flexGrow: 1 }}>
          <Button style={{
            width: '100%',
            height: '5em',
            fontWeight: 'bold',
            backgroundColor: 'green',
            color: 'white'
          }}>
            Yes
          </Button>
        </div>
        <div style={{ flexGrow: 1 }}>
          <Button style={{
            width: '100%',
            height: '5em',
            fontWeight: 'bold',
            backgroundColor: 'red',
            color: 'white'
          }}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
}