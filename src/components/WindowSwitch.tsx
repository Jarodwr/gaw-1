import { Window, WindowContent, WindowHeader } from "react95";
import { WindowEnum } from "../enum/WindowEnum";
import { BankViewerWindow } from "./windows/BankViewerWindow";
import { FloorplanWindow } from "./windows/FloorplanWindow";
import { OkFlatmateWindow } from "./windows/OkFlatmateWindow";
import { RentalHistorianWindow } from "./windows/RentalHistorianWindow";
import { WahooMessengerWindow } from "./windows/WahooMessengerWindow";
import { windowDefinitions } from "../window-defs";

export const WindowSwitch = (props: { type: WindowEnum }) => {
  const def = windowDefinitions[props.type];
  return (
    <Window style={{
      position: 'absolute',
      left: def.left,
      top: def.top,
      width: def.width,
      height: def.height,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <WindowHeader style={{ display: 'flex', alignItems: 'center' }}>
        {def.icon}
        {def.title}
      </WindowHeader>
      <WindowContent style={{ flexGrow: 1}}>
        {(() => {
          switch (props.type) {
            case WindowEnum.BankViewer:
              return <BankViewerWindow />
            case WindowEnum.Floorplan:
              return <FloorplanWindow />
            case WindowEnum.OkFlatmate:
              return <OkFlatmateWindow />
            case WindowEnum.RentalHistorian:
              return <RentalHistorianWindow />
            case WindowEnum.WahooMessenger:
              return <WahooMessengerWindow />
          }
        })()}
      </WindowContent>
    </Window>
  )

}