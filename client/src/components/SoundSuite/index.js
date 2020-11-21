import React, { useState, useContext, createContext } from 'react';
import useSound from 'use-sound';
import soundEnums from '../../SpriteEnums.js';
import SfxOptions from '../SfxOptions/index';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function SoundSuite({ children }) {
  const sfx = useProvideSfx();
  
  const toggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if(event.target.id==='play'){
      sfx.mute(true);
    }else if(event.target.id==='mute'){
      sfx.mute(false);
    }
  };
    
  return (
    <>
      <sfxContext.Provider value={sfx}>

        <div>
          {
            !sfx.soundEnabled 
          ?
            (
              <button id='play' onClick={toggle}>
                🔊
              </button>
            )
          : 
            (
              <ButtonGroup className="mr-2" aria-label="First group">  
                <button id='mute' onClick={toggle}> 
                  🔈
                </button>
                <SfxOptions />
              </ButtonGroup>
            )
          }
        </div>

        {children}

      </sfxContext.Provider>
    </>
  )
};

// access context provider state and methods
export function useSfx() {
  return useContext(sfxContext);
}

export default SoundSuite;

// create new context instance of sfxContext to keep track of sound effect states accross the site
const sfxContext = createContext();

// context provider state and methods
function useProvideSfx() {

  const [soundEnabled, setSoundEnabled] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [masterVol, setMasterVol] = useState(0.5);
  const [nextFile, setNextFile] = useState('');
  const [ambientFile, setAmbientFile] = useState('background-0');
  const [sfxFile, setSfxFile] = useState('background-0');
  const [ambientVol, setAmbientVol] = useState(0.5);
  const [sfxVol, setSfxVol] = useState(0.5);
  const [auto, setAuto] = useState(false);
  const [sfxAuto, setSFXAuto] = useState(false);

  const [play, { stop, pause, isPlaying } ] = useSound(
    soundEnums[ambientFile].src,
    { 
      autoplay: auto,
      preload: true,
      volume: masterVol*ambientVol,
      loop: true,
      playbackRate,
      id: ambientFile
    }, 
  );

  const [playSfx] = useSound(
    soundEnums[sfxFile].src,
    { 
      autoplay: sfxAuto,
      loop: false,
      volume: masterVol*sfxVol,
      id: sfxFile,
      soundEnabled
    }, 
  );

  const mute = (enable) => {
    if(enable) {
      setAuto(false);
      setSoundEnabled(true);
      play();
    }else{
      setAuto(true);
      setSoundEnabled(false);
      pause();
    };
  };

  // rate may be adjusted from 0.5x -> 4x the original speed
  const playbackSpeed = (rate) => {
    setPlaybackRate(rate);
  };

  // ambient sound volume may be adjusted from 0 (muted) -> 1 (max)
  const masterVolume = (vol) => {
    setMasterVol(vol);
  };

  // play next after song ends - requires a void/while loop or event listener to execute the if statement logic with isPlaying. 
  // could also attempt to set up an event listenr with ambient sound and playNext values to begin testing for isPlaying in order to render next mp3 file.
  const playnext = (file) => {
    if(isPlaying) {
      setNextFile(file);
    }
  };

  // force ambient sound to play new file
  const ambientSound = (file) => {
    setAuto(false);
    setAmbientFile(file);
    stop();
    // setAuto(false);
  };

  // force sfx to paly new sound
  const sfxSound = (file) => {
    setAuto(false);
    setSFXAuto(true);
    setSfxFile(file);
    playSfx(file);
  };

  // ambient sound volume may be adjusted from 0 (muted) -> 1 (max)
  const ambientVolume = (vol) => {
    setAmbientVol(vol);
  };

  // volume of sound effects may be adjusted from 0 (muted) -> 1 (max)
  const sfxVolume = (vol) => {
    setSfxVol(vol);
  };

  return { mute, playbackSpeed, masterVolume, playnext, ambientSound, sfxSound, ambientVolume, sfxVolume, soundEnabled, playbackRate, masterVol, nextFile, ambientFile, sfxFile, ambientVol, sfxVol };
};


// const [soundEnabled, setSoundEnabled] = useState(false);
// const [playbackRate, setPlaybackRate] = useState(1);
// const [masterVol, setMasterVol] = useState(0.5);
// const [sfxVol, setSfxVol] = useState(0.5);

// const [play, { pause } ] = useSound(
//   soundEnums['background'].src,
//   { 
//     autoplay: false,
//     volume: masterVol,
//     loop: true,
//     playbackRate
//   }, 
// );

// const [pop] = useSound(
//   soundEnums['pop'].src,
//   { 
//     volume: sfxVol,
//     soundEnabled,
//     playbackRate
//   }, 
// );

// const toggle = (event) => {
//   event.preventDefault();
//   event.stopPropagation();
//   if(event.target.id==='play'){
//     setSoundEnabled(true);
//     play();
//   }else if(event.target.id==='mute'){
//     pause();
//     setSoundEnabled(false);
//   }
// };