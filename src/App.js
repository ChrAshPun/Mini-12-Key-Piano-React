import React, { useEffect } from "react";
import "./App.css";
// pngs
import BlackKeysImg from "./png/Piano-black-keys.png";
import WhiteKeysImg from "./png/Piano-white-keys.png";
// wav
import C3 from "./wav/C3.wav";
import C3Sharp from "./wav/C3Sharp.wav";
import D3 from "./wav/D3.wav";
import D3Sharp from "./wav/D3Sharp.wav";
import E3 from "./wav/E3.wav";
import F3 from "./wav/F3.wav";
import F3Sharp from "./wav/F3Sharp.wav";
import G3 from "./wav/G3.wav";
import G3Sharp from "./wav/G3Sharp.wav";
import A3 from "./wav/A3.wav";
import A3Sharp from "./wav/A3Sharp.wav";
import B3 from "./wav/B3.wav";

const App = () => {
  // corresponding piano keys
  const keyDict = {
    a: "C3",
    w: "C3Sharp",
    s: "D3",
    e: "D3Sharp",
    d: "E3",
    f: "F3",
    t: "F3Sharp",
    g: "G3",
    y: "G3Sharp",
    h: "A3",
    u: "A3Sharp",
    j: "B3"
  };

  // store audio elements
  const liveAudioElements = {
    C3: {},
    C3Sharp: {},
    D3: {},
    D3Sharp: {},
    E3: {},
    F3: {},
    F3Sharp: {},
    G3: {},
    G3Sharp: {},
    A3: {},
    A3Sharp: {},
    B3: {}
  };

  const playAudio = key => {
    let note = new Audio(document.getElementById(key).currentSrc); // create a new audio element
    note.volume = 1; // set volume to max
    note.load(); 
    note.play(); 
    return note;
  };

  // toggle the highlight class
  const highlightHandler = key => {
    const pianoKey = document.getElementById(keyDict[key] + "-key");
    // if it's a white key
    if ("asdfghj".includes(key)) {
      if (pianoKey.classList.contains("white-key")) {
        // add highlight class
        pianoKey.classList.remove("white-key");
        pianoKey.classList.add("highlighted-key");
      } else {
        // remove highlight class
        pianoKey.classList.remove("highlighted-key");
        pianoKey.classList.add("white-key");
      }
    }
    // if it's a black key
    else if ("wetyu".includes(key)) {
      if (pianoKey.classList.contains("black-key")) {
        // add highlight class
        pianoKey.classList.remove("black-key");
        pianoKey.classList.add("highlighted-key");
      } else {
        // remove highlight class
        pianoKey.classList.remove("highlighted-key");
        pianoKey.classList.add("black-key");
      }
    }
  };

  const onDragStart = () => {
    return false
  }

  useEffect(() => {

    // eventlistener when user presses down on key
    document.addEventListener("keydown", e => {
      // disable repeats when holding keydown
      if (e.repeat) {
        return;
      }

      if (
        "awsedftgyhuj".includes(e.key) &&
        document.getElementById(keyDict[e.key]).dataset.status === "0"
      ) {
        liveAudioElements[keyDict[e.key]] = playAudio(keyDict[e.key]);
        document.getElementById(keyDict[e.key]).dataset.status = "1";
        highlightHandler(e.key);
      }
    });

    // eventlistener when user releases key
    document.addEventListener("keyup", e => {
      // disable repeats when holding keydown
      if (e.repeat) {
        return;
      }

      if (
        "awsedftgyhuj".includes(e.key) &&
        document.getElementById(keyDict[e.key]).dataset.status === "1"
      ) {
        highlightHandler(e.key);
        document.getElementById(keyDict[e.key]).dataset.status = "2";
        // gradually lower volume to zero
        setTimeout(() => {
          liveAudioElements[keyDict[e.key]].volume = 0.8;
        }, 0);
        setTimeout(() => {
          liveAudioElements[keyDict[e.key]].volume = 0.6;
        }, 50);
        setTimeout(() => {
          liveAudioElements[keyDict[e.key]].volume = 0.4;
        }, 100);
        setTimeout(() => {
          liveAudioElements[keyDict[e.key]].volume = 0.1;
        }, 150);
        setTimeout(() => {
          liveAudioElements[keyDict[e.key]].volume = 0.05;
        }, 250);
        setTimeout(() => {
          liveAudioElements[keyDict[e.key]].volume = 0;
          liveAudioElements[keyDict[e.key]] = {};
          document.getElementById(keyDict[e.key]).dataset.status = "0";
        }, 300);
      }
    });
  }, [keyDict]);

  return (
    <div>
      {/* <!-- All piano sounds --> */}
      <audio id="C3" data-status={0}>
        <source src={C3} type="audio/wav" />
      </audio>
      <audio id="C3Sharp" data-status={0}>
        <source src={C3Sharp} type="audio/wav" />
      </audio>
      <audio id="D3" data-status={0}>
        <source src={D3} type="audio/wav" />
      </audio>
      <audio id="D3Sharp" data-status={0}>
        <source src={D3Sharp} type="audio/wav" />
      </audio>
      <audio id="E3" data-status={0}>
        <source src={E3} type="audio/wav" />
      </audio>
      <audio id="F3" data-status={0}>
        <source src={F3} />
      </audio>
      <audio id="F3Sharp" data-status={0}>
        <source src={F3Sharp} type="audio/wav" />
      </audio>
      <audio id="G3" data-status={0}>
        <source src={G3} type="audio/wav" />
      </audio>
      <audio id="G3Sharp" data-status={0}>
        <source src={G3Sharp} type="audio/wav" />
      </audio>
      <audio id="A3" data-status={0}>
        <source src={A3} type="audio/wav" />
        {/* <source src="./wav/A3.ogg" type="audio/ogg" /> */}
      </audio>
      <audio id="A3Sharp" data-status={0}>
        <source src={A3Sharp} type="audio/wav" />
      </audio>
      <audio id="B3" data-status={0}>
        <source src={B3} type="audio/wav" />
      </audio>
      <div className="background">
        <div className="white-keys-container">
          <div id="C3-key" className="white-key piano-key" data-key="C3"></div>
          <div id="D3-key" className="white-key piano-key" data-key="D3"></div>
          <div id="E3-key" className="white-key piano-key" data-key="E3"></div>
          <div id="F3-key" className="white-key piano-key" data-key="F3"></div>
          <div id="G3-key" className="white-key piano-key" data-key="G3"></div>
          <div id="A3-key" className="white-key piano-key" data-key="A3"></div>
          <div id="B3-key" className="white-key piano-key" data-key="B3"></div>
        </div>
        <div className="black-keys-container">
          <div
            id="C3Sharp-key"
            className="black-key piano-key"
            data-key="C3Sharp"
            data-keystate="down"
            data-releasenote="wait"
          ></div>
          <div
            id="D3Sharp-key"
            className="black-key piano-key"
            data-key="D3Sharp"
            data-keystate="down"
            data-releasenote="wait"
          ></div>
          <div
            id="F3Sharp-key"
            className="black-key piano-key"
            data-key="F3Sharp"
            data-keystate="down"
            data-releasenote="wait"
          ></div>
          <div
            id="G3Sharp-key"
            className="black-key piano-key"
            data-key="G3Sharp"
            data-keystate="down"
            data-releasenote="wait"
          ></div>
          <div
            id="A3Sharp-key"
            className="black-key piano-key"
            data-key="A3Sharp"
            data-keystate="down"
            data-releasenote="wait"
          ></div>
        </div>
        <img
          id="black-keys-img"
          src={BlackKeysImg}
          alt="Piano-black-keys"
          onDragStart={onDragStart}
        />
        <img
          id="white-keys-img"
          src={WhiteKeysImg}
          alt="Piano-white-keys"
          onDragStart={onDragStart}
        />
        {/* Mini Map */}
        <div className="piano-app-map">
          <div className="piano-app-map-black-keys">
            <div id="piano-app-w-key">
              <p>W</p>
            </div>
            <div id="piano-app-e-key">
              <p className="piano-app-letter-padding">E</p>
            </div>
            <div id="piano-app-t-key">
              <p className="piano-app-letter-padding">T</p>
            </div>
            <div id="piano-app-y-key">
              <p className="piano-app-letter-padding">Y</p>
            </div>
            <div id="piano-app-u-key">
              <p className="piano-app-letter-padding">U</p>
            </div>
          </div>
          <div className="piano-app-map-white-keys">
            <div>
              <p className="piano-app-letter-padding">A</p>
            </div>
            <div>
              <p className="piano-app-letter-padding">S</p>
            </div>
            <div>
              <p className="piano-app-letter-padding">D</p>
            </div>
            <div>
              <p className="piano-app-letter-padding">F</p>
            </div>
            <div>
              <p className="piano-app-letter-padding">G</p>
            </div>
            <div>
              <p className="piano-app-letter-padding">H</p>
            </div>
            <div>
              <p
                className="piano-app-letter-padding"
                style={{ padding: "0 5px" }}
              >
                J
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
