import { useState } from 'react'
import { styleReset } from 'react95'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import original from 'react95/dist/themes/original';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { StartBar } from './components/StartBar'
import { WindowEnum } from './enum/WindowEnum';
import { WindowSwitch } from './components/WindowSwitch';

import loop from './assets/90 - Kindling.mp3'
import { SubscriberComponent } from './components/SubscriberComponent';
import { RentalEventWindow } from './components/windows/RentalEventWindow';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;



function App() {
  const [openWindows, setOpenWindows] = useState<WindowEnum[]>([]);
  return (
    <ThemeProvider theme={original}>
      <audio autoPlay loop src={loop} />
      <SubscriberComponent />
      <GlobalStyles />
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#008080',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Main workspace area */}
        <div style={{ position: 'relative', flexGrow: 1 }}>
          {openWindows.map(item => <WindowSwitch key={item} type={item} />)}
        </div>
        {/* Bottom bar area */}
        <div style={{ flexShrink: 1, backgroundColor: 'blue' }}>
          <StartBar windowButtonClick={item => {
            if (openWindows.findIndex(entry => entry === item) >= 0) {
              setOpenWindows(openWindows.filter(entry => entry !== item));
            } else {
              setOpenWindows([item, ...openWindows]);
            }
          }} />
        </div>
      </div>
      <RentalEventWindow />
    </ThemeProvider>
  )
}

export default App
