import cryptoJs from "crypto-js";
import { useEffect, useRef, useState } from "react";
import uuid from "uuid/v4";
import notesList from "../data/notes";
import Head from "next/head"

import herring from "../data/herring";
import _initSecSore from "../data/ews";
import { GameFinished } from "../components/finished";
import soundList from "../data/sounds";
import IntroCard from "../components/introcard";
let locSecStore;

let letterList = {
  KeyA: {
    note: notesList.C3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyB: {
    note: notesList.Db3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyC: {
    note: notesList.D3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyD: {
    note: notesList.Eb3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyE: {
    note: notesList.E3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyF: {
    note: notesList.F3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyG: {
    note: notesList.Gb3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyH: {
    note: notesList.G3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyI: {
    note: notesList.Ab3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyJ: {
    note: notesList.A3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyK: {
    note: notesList.Bb3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyL: {
    note: notesList.B3,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyM: {
    note: notesList.C4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyN: {
    note: notesList.Db4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyO: {
    note: notesList.D4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyP: {
    note: notesList.Eb4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyQ: {
    note: notesList.E4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyR: {
    note: notesList.F4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyS: {
    note: notesList.Gb4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyT: {
    note: notesList.G4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyU: {
    note: notesList.Ab4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyV: {
    note: notesList.A4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyW: {
    note: notesList.Bb4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyX: {
    note: notesList.B4,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyY: {
    note: notesList.C5,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
  KeyZ: {
    note: notesList.Db5,
    color: Math.floor(Math.random() * 16777215).toString(16),
  },
};

let node_setup;
let targetPoints = 100;

export default function NotePass() {
  let node_identifier = process.env.NEXT_PUBLIC_PACKET;
  const [val, setVal] = useState("");
  const [gameLoaded, setGameLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [totalScore, setProgress] = useState(0);
  const [notes, setNotes] = useState([]);
  const [curNote, setCurNote] = useState(-1);
  let prep_work = cryptoJs.AES.decrypt;
  const [finish, setFinish] = useState(false);

  let adr_512 = "/api/np_a";

  function startKeyBoard() {
    let _nl = Object.keys(notesList);

    window.addEventListener("keydown", (e) => {
      let _toPlay = letterList[e.code];
      _toPlay && _toPlay.note.play();
    });
  }

  function playMusic_play(toPlay, i, delay) {
    setTimeout(() => {
      letterList[toPlay[i]].note.play();
      setCurNote(i+1)

      if (i + 1 < toPlay.length) {
        playMusic_play(toPlay, i + 1, delay);
      }
      else{
        setCurNote(-1)
      }
    }, delay);
  }

  function playMusic_once(i) {
    letterList[i].note.play();
  }

  function playMusic() {
    let toPlay = node_setup[totalScore].key;
    setCurNote(0)
    playMusic_play(toPlay, 0, 1000);
  }

  function checkAnswer() {
    let tval = val.toLowerCase();
    if (tval == node_setup[totalScore].answer) {
      node_setup[totalScore+1] && setNotes(node_setup[totalScore+1].key)
      setProgress(totalScore + 1);
      setVal("");
    }
  }

  async function fetchAnswers() {
    let _dat = await fetch(adr_512);
    _dat = await _dat.json();

    let dd = herring.gyps(prep_work, _dat.data, node_identifier);
    dd = dd.toString(cryptoJs.enc.Utf8);
    dd = JSON.parse(dd);

    node_setup = dd;
    targetPoints = node_setup.length;
    setNotes(node_setup[totalScore].key)
    setGameLoaded(true);
  }

  function init_store() {
    //console.log(process)
    locSecStore = _initSecSore(localStorage, process.env.NEXT_PUBLIC_EWS_KEY);

    if (!locSecStore.getItem("geasfasdgasdfas")) {
      locSecStore.setItem("geasfasdgasdfas", {});
    }
  }

  function loadStart() {
    let dat = locSecStore.getItem("geasfasdgasdfas");
    if (!dat.eukabsms_ntpass) {
      locSecStore.setItem("geasfasdgasdfas", { ...dat, eukabsms_ntpass: true });
    }
    if (dat.eukabsmntpass == true) {
      setFinish(true);
    }
  }

  useEffect(() => {
    if (totalScore == targetPoints) {
      soundList.l_success.play();
      setFinish(true);
      let dat = locSecStore.getItem("geasfasdgasdfas");
      locSecStore.setItem("geasfasdgasdfas", { ...dat, eukabsmntpass: true });
    }
  }, [totalScore]);

  useEffect(() => {}, []);
  
  function continueSplash() {
    init_store();
    loadStart();

    fetchAnswers();
    startKeyBoard();
    setShowSplash(false);
  }

  return (
    <>
      <Head>
          <title>Enigma 2 - Note Password</title>
          <meta name="description" content="Enigma 2 - Note Password" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      {showSplash ? (
        <IntroCard
          title="Your <span class='text-green-400'>Note</span> Shall Pass"
          comment="Training the ear to see the truth."
          proceedFunction={continueSplash}
        />
      ) : (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
          {finish && <GameFinished />}
          {gameLoaded ? (
            <>
              <div className="flex justify-center items-center h-20 w-1/2">
                <p>&gt;&gt;</p>
                <input
                  className="text-center"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                />
              </div>
              <button
                className="border border-white p-2.5 m-2.5 hover:bg-gray-400 hover:text-black"
                onClick={checkAnswer}
              >
                Submit Password
              </button>
              <button
                className="border border-white p-2.5 m-2.5 hover:bg-gray-400 hover:text-black"
                onClick={playMusic}
              >
                Play Clue As A Whole[use Audio Device]
              </button>
              <div className="flex mb-4">
                {
                  notes.map((e, bi) => <button className={`border border-white p-2 m-1 hover:bg-white transition-colors ${curNote == bi ? 'bg-white' : ''}`} key={uuid()} onClick={playMusic_once.bind(this, e)} >&nbsp;</button>)
                }
              </div>
              
              <p>ABC means &lsquo;Do-Re-Mi&rsquo;</p>
              <div className="w-1/3 mx-auto mt-8">
                <div className="w-full border h-2">
                  <div
                    className="bg-blue-500 h-2"
                    style={{
                      width: `${(totalScore / node_setup.length) * 100}%`,
                    }}
                  >
                    &nbsp;
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Loading Game Data</p>
          )}
        </div>
      )}
    </>
  );
}
