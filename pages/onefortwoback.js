import { useEffect, useState } from "react";
import Head from "next/head"

import soundList from "../data/sounds";
import _initSecSore from "../data/ews";
import { GameFinished } from "../components/finished";
import IntroCard from "../components/introcard";

let orbs = 11;

let locSecStore;

export default function Orbs() {
  const [cList, setCList] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [finish, setFinish] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const SIXTH = Math.PI / (orbs / 2);

  const getLampCoords = (i) => {
    let p = SIXTH * i;
    return {
      x: Math.cos(p) * 110,
      y: Math.sin(p) * 110,
    };
  };

  const lamps = [
    getLampCoords(0),
    getLampCoords(1),
    getLampCoords(2),
    getLampCoords(3),
    getLampCoords(4),
    getLampCoords(5),
    getLampCoords(6),
    getLampCoords(7),
    getLampCoords(8),
    getLampCoords(9),
    getLampCoords(10),
  ];

  function toggleOrbs(i) {
    let _cl = [...cList];

    let ir = (i + 1) % orbs;

    let il = i - 1;
    if (il < 0) il = orbs - 1;

    _cl[i] ^= true;
    _cl[ir] ^= true;
    _cl[il] ^= true;

    //console.log(i)
    //console.log(_cl[i])
    //console.log(ir)
    //console.log(_cl[ir])
    //console.log(il)
    //console.log(_cl[il])
    //console.log("+----")
    soundList.beep2.play();

    setCList(_cl);
  }

  function init_store() {
    //console.log(process)
    locSecStore = _initSecSore(localStorage, process.env.NEXT_PUBLIC_EWS_KEY);

    if (!locSecStore.getItem("e2_player")) {
      locSecStore.setItem("e2_player", {});
    }
  }

  function loadStart() {
    let dat = locSecStore.getItem("e2_player");
    if (!dat.e2_s_orli) {
      locSecStore.setItem("e2_player", { ...dat, e2_s_orli: true });
    }
    if (dat.e2_orli == true) {
      setFinish(true);
    }
  }

  useEffect(() => {}, []);

  useEffect(() => {
    let done = true;
    for (let c in cList) {
      done &= cList[c];
    }
    if (done) {
      let dat = locSecStore.getItem("e2_player");

      if (done && !(dat.e2_orli || false)) {
        setFinish(true);
        soundList.l_success.play();
        locSecStore.setItem("e2_player", { ...dat, e2_orli: true });
      }
    }
  }, [cList]);

  function continueSplash() {
    init_store();
    loadStart();
    setShowSplash(false);
  }

  return (
    <>
      <Head>
          <title>Enigma 2 - Orbitals</title>
          <meta name="description" content="Enigma 2 - Orbitals" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      {showSplash ? (
        <IntroCard
          title="<span class='text-blue-400'>Orb</span>itals"
          comment="Convincing the whole population to switch side"
          proceedFunction={continueSplash}
        />
      ) : (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
          {finish && <GameFinished />}
          <div className="h-screen flex flex-col justify-center items-center">
            <div id="lamps" className="orbsCont mb-16">
              {lamps.map((e, i) => (
                <label
                  key={i}
                  style={{ transform: `translate(${e.x}px, ${e.y}px)` }}
                >
                  <input
                    type="checkbox"
                    checked={cList[i]}
                    onChange={toggleOrbs.bind(this, i)}
                  ></input>
                  <span className="lamp"></span>
                </label>
              ))}
            </div>
            <p className="text-sm text-center">
              There are {orbs} lamps placed in a circle. You may toggle any
              three of them that go in a row.
            </p>
            <p className="text-sm text-center">
              One lamp is switched on at the start. Can you turn on all of them?
            </p>
          </div>
        </div>
      )}
    </>
  );
}
