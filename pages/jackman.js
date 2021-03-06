import { useEffect, useRef, useState } from "react";

import Head from "next/head"
import soundList from "../data/sounds";
import _initSecSore from "../data/ews";
import { GameFinished } from "../components/finished";
import IntroCard from "../components/introcard";

const padInit = 1.5;
const padMax = 4;
const clickPad = 0.25;
const fps = 1000 / 60;
const speed = 0.05;

const targetPoints = 100;

let direction = 0;
let r1 = 0;
let r2 = r1 + (1 + 3.14 * Math.random()) * 1;

let locSecStore;

export default function LockPick() {
  const knob = useRef();
  const knob2 = useRef();

  const [points, setPoints] = useState(0);
  const [start, setStart] = useState(false);
  const [click, setClick] = useState(false);
  const [finish, setFinish] = useState(false);

  const [showSplash, setShowSplash] = useState(true);

  function between(x, min, max) {
    return x >= min && x <= max;
  }

  function clickLock() {
    setClick(true);
    if (between(r1, r2 - clickPad, r2 + clickPad)) {
      setPoints((points += 1));
      soundList.beep3.play();
    } else if (direction != 0) {
      setStart(false);
      soundList.wrong.play();
    }

    if (direction) {
      direction *= -1;
      r2 = r1 + (padInit + padMax * Math.random()) * direction;
    } else direction = 1;
  }

  function knobRot() {
    setInterval(() => {
      requestAnimationFrame(() => {
        if (knob.current) knob.current.style.transform = `rotate(${r1}rad)`;
        if (knob2.current) knob2.current.style.transform = `rotate(${r2}rad)`;
      });

      r1 += speed * direction;

      if (direction == 1 && r1 > r2 + clickPad) {
        direction = 0;
        setStart(false);
        soundList.wrong.play();
      }
      if (direction == -1 && r1 + clickPad < r2) {
        direction = 0;
        setStart(false);
        soundList.wrong.play();
      }
    }, fps);
  }

  function startGame() {
    setStart(true);
    soundList.s_success.play();
  }

  function init_store() {
    //console.log(process)
    locSecStore = _initSecSore(localStorage, process.env.NEXT_PUBLIC_EWS_KEY);

    if (!locSecStore.getItem("564fsjsknfeiqn")) {
      locSecStore.setItem("564fsjsknfeiqn", {});
    }
  }

  function loadStart() {
    let dat = locSecStore.getItem("564fsjsknfeiqn");
    if (!dat.eukabsms_ttpkmn) {
      locSecStore.setItem("564fsjsknfeiqn", { ...dat, eukabsms_ttpkmn: true });
    }
    if (dat.eukabsmttpkmn == true) {
      setFinish(true);
    }
  }

  useEffect(() => {
  }, []);

  function continueSplash(){
    init_store();
    loadStart();
    knobRot();
    setShowSplash(false);
  }

  useEffect(() => {
    if (points == targetPoints) {
      soundList.l_success.play();
      setFinish(true);
      let dat = locSecStore.getItem("564fsjsknfeiqn");
      locSecStore.setItem("564fsjsknfeiqn", { ...dat, eukabsmttpkmn: true });
    }
  }, [points]);

  useEffect(() => {
    setPoints(0);
    r1 = 0;
    r2 = r1 + (1 + 3.14 * Math.random()) * 1;
  }, [start]);

  return (
    <>
      <Head>
          <title>Enigma 2 - Luck Pick</title>
          <meta name="description" content="Enigma 2 - Luck Pick" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      {
      showSplash ?
        <IntroCard title="PICK <span class='text-red-700'>LUCK</span>" comment="It keeps going on and on, until the pressure bursts out when it was critical" proceedFunction={continueSplash} />
        :
        <div className="flex w-screen h-screen justify-center items-center flex-col">
          <div
            className="flex justify-center items-center flex-col"
            onClick={clickLock}
          >
            {finish && <GameFinished />}
            <div
              className={`relative w-80 h-80 rounded-full border-8 transition-all ${
                start ? "border-blue-500 scale-100" : "border-blue-50 scale-75"
              } transform-gpu`}
            >
              {start ? (
                <>
                  <div className="absolute w-full h-full" ref={knob}>
                    <div className="w-2 h-8 mx-auto bg-red-500"></div>
                  </div>
                  <div className="absolute w-full h-full" ref={knob2}>
                    <div className="w-5 h-8 mx-auto bg-green-500"></div>
                  </div>
                  <p className="absolute w-full h-full flex justify-center items-center">
                    {points}
                  </p>
                </>
              ) : (
                <p
                  className="absolute w-full h-full flex justify-center items-center"
                  onClick={startGame}
                >
                  Start
                </p>
              )}
            </div>
          </div>
          <div className="w-1/3 mx-auto mt-8">
            <div className="w-full border h-2">
              <div
                className="bg-blue-500 h-2"
                style={{
                  width: `${
                    (Math.min(points, targetPoints) / targetPoints) * 100
                  }%`,
                }}
              >
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
