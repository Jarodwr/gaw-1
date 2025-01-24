import { WindowEnum } from "./enum/WindowEnum";

import okcImg from './assets/okc logo.webp';
import floorplanImg from './assets/floorplan icon.png';
import wahooIcon from './assets/sam.png';

import { msrating104Data, Shdocvw256 } from '@react95/icons';
const KeyIcon = msrating104Data['32x32_4'];

export const windowDefinitions = {
  [WindowEnum.BankViewer]: {
    title: "Bank Viewer 93",
    icon: <KeyIcon style={{ paddingRight: '0.5em', width: '1.5em', height: '1.5em' }} />,
    top: "calc(50% + 2em)",
    left: '1em',
    width: "50%",
    height: "calc(50% - 3em)"
  },
  [WindowEnum.Floorplan]: {
    title: "Floorplan",
    icon: <img src={floorplanImg} style={{ height: '1.5em', width: '1.5em', marginRight: '0.5em' }} />,
    left: "calc(50% + 1em + 2px)",
    top: "calc(50% + 1em)",
    width: "calc(50% - 2em)",
    height: "calc(50% - 2em)"
  },
  [WindowEnum.OkFlatmate]: {
    title: "OKFlatmate",
    icon: <img src={okcImg} style={{ height: '1.5em', width: '1.5em', marginRight: '0.5em' }} />,
    left: "50%",
    top: '0',
    width: '50%',
    height: '50%',
  },
  [WindowEnum.RentalHistorian]: {
    title: "Rental Historian",
    icon: <Shdocvw256 variant="32x32_4" style={{ paddingRight: '0.5em', width: '1.5em', height: '1.5em' }} />,
    left: "1em",
    top: '1em',
    width: '20%',
    height: '50%'
  },
  [WindowEnum.WahooMessenger]: {
    title: "Wahoo! Messenger",
    icon: <img src={wahooIcon} style={{ height: '1.5em', width: '1.5em', marginRight: '0.5em' }} />,
    left: "calc(20% + 2em)",
    top: '1em',
    width: '25%',
    height: 'calc(50% - 1em)'
  }
}