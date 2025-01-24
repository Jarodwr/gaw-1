import React, { useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Button,
  Frame,
  MenuList,
  MenuListItem,
  Separator,
  Toolbar
} from 'react95';
import logoIMG from '../assets/react.svg';
import { WindowEnum } from '../enum/WindowEnum';
import { windowDefinitions } from '../window-defs';
import { useStore } from '../store';

export function StartBar(props: {
  windowButtonClick?: (type: WindowEnum) => void;
}) {
  const [open, setOpen] = useState(false);
  const date = useStore(state => {
    return `${state.date.getDate()}/${state.date.getMonth() + 1}/${state.date.getFullYear()}`
  });
  return (
    <AppBar style={{ position: 'relative' }}>
      <Toolbar style={{ justifyContent: 'space-between', position: 'relative' }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5em'
        }}>
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: 'bold' }}>
            <img src={logoIMG} alt='react95 logo' style={{ height: '20px', marginRight: 4 }} />
            Start
          </Button>
          {Object.entries(windowDefinitions).map(([key, value]) =>
            <Button key={key} style={{ fontWeight: 'bold' }}
              onClick={props.windowButtonClick?.bind(null, Number(key) as WindowEnum)}>
              {value.icon}
              {value.title}
            </Button>)}
          {open && (
            <MenuList
              style={{ position: 'absolute', left: '0', bottom: '100%' }}
              onClick={() => setOpen(false)}>
              <MenuListItem>
                <span role='img' aria-label='👨‍💻'>
                  👨‍💻
                </span>
                Profile
              </MenuListItem>
              <MenuListItem>
                <span role='img' aria-label='📁'>
                  📁
                </span>
                My account
              </MenuListItem>
              <Separator />
              <MenuListItem disabled>
                <span role='img' aria-label='🔙'>
                  🔙
                </span>
                Logout
              </MenuListItem>
            </MenuList>
          )}
        </div>
        <Frame>
          <div style={{ padding: '0.25em', fontWeight: 'bold', fontSize: '1em' }}>
            {date}
          </div>
        </Frame>
      </Toolbar>
    </AppBar>
  );
}