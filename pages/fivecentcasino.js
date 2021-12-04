import { useEffect, useRef, useState } from "react";
import styles from "../styles/runner.module.css";
import uuid from "uuid/v4";
import Head from "next/head"

import soundList from "../data/sounds";

import _initSecSore from "../data/ews";
import { GameFinished } from "../components/finished";
import IntroCard from "../components/introcard";
let locSecStore;

let boxW = 5;
let boxH = 5;

let shuffleSpeed = 1000;

let boxWC = 2;
let boxHC = 2;
let currentCard = 0;
let boxMargin = 0.5;
let x0 = -(boxW * (boxWC / 2) + boxMargin * (boxWC / 2 - 1) + boxMargin / 2);
let y0 = -(boxH * (boxHC / 2) + boxMargin * (boxHC / 2 - 1) + boxMargin / 2);
let uuid_list = [];
let init_index = [];

let targetPoints = 12;

let click_start = false;

function uuid_gen() {
  let randomColor;
  for (let i = 0; i < boxWC * boxHC; i++) {
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
    uuid_list.push({
      id: uuid(),
      color: randomColor,
      ix: i,
      flipped: true,
      backText: "",
    });
  }
}

function process_deck(xCount, yCount) {
  boxWC = xCount || 2;
  boxHC = yCount || 2;
  currentCard = Math.floor(Math.random() * boxWC * boxHC);

  boxMargin = 0.5;

  x0 = -(boxW * (boxWC / 2) + boxMargin * (boxWC / 2 - 1) + boxMargin / 2);
  y0 = -(boxH * (boxHC / 2) + boxMargin * (boxHC / 2 - 1) + boxMargin / 2);
  uuid_list = [];
  init_index = [];

  uuid_gen();
}

let levelInc = 0;

export default function Shuffler() {
  const [pos, setPos] = useState(init_index);
  const [totalScore, setTotalScore] = useState(0);
  const [totalLives, setTotalLives] = useState([
    "♥ ",
    "♥ ",
    "♥ ",
    "♥ ",
    "♥ ",
    "♥ ",
    "♥ ",
    "♥ ",
    "♥ ",
  ]);
  const [finish, setFinish] = useState(false);

  const [showSplash, setShowSplash] = useState(true);

  let shuffleC = 3;

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function grid_gen(flipped, backText, showStar) {
    let f_grid = [];

    let x = 0;
    let y = 0;

    let xpos = 0;
    let ypos = 0;

    let id_list = [...uuid_list];
    shuffle(id_list);

    for (let i = 0; i < id_list.length; i++) {
      x = id_list[i].ix % boxWC;
      y = Math.floor(id_list[i].ix / boxWC);

      xpos = x0 + x * (boxW + boxMargin);
      ypos = y0 + y * (boxH + boxMargin);

      f_grid.push({
        ...uuid_list[i],
        flipped: flipped || false,
        backText: showStar && i == currentCard ? "🌟" : backText,
        x: `${xpos}rem`,
        y: `${ypos}rem`,
      });
    }

    setPos(f_grid);
  }

  function flipCard(index) {
    if (!click_start) return false;
    let _p = [...pos];
    _p[index].flipped = !_p[index].flipped;
    if (index == currentCard) _p[index].backText = "🌟";
    setPos(_p);

    let right = false;

    if (index == currentCard) {
      setTotalScore(totalScore + 1);
      right = true;
      soundList.s_success.play();
    } else {
      if (totalLives.length) {
        totalLives.pop();
        setTotalLives(totalLives);
      } else {
        setTotalScore(Math.max(0, totalScore - 1));
      }
      soundList.wrong.play();
    }

    setTimeout(() => {
      levelInc += 1;
      levelInc %= 4;
      if (levelInc == 0 && boxHC >= 6) {
        levelInc = 1;
      }
      if (right) {
        switch (levelInc) {
          case 0:
            gameStart(boxWC, boxHC + 2, shuffleC);
            break;
          case 1:
            gameStart(boxWC + 2, boxHC, shuffleC);
            break;
          case 2:
            gameStart(boxWC, boxHC, shuffleC + 2);
            break;
          case 3:
            gameStart(boxWC + 2, boxHC, shuffleC + 2);
            break;
        }
      } else {
        gameStart(boxWC, boxHC, shuffleC);
      }
    }, 1000);
  }

  function shuffleCard(timer) {
    setTimeout(() => {
      grid_gen(false, "");
      shuffleC -= 1;
      soundList.beep1.play();
      if (shuffleC > 0) shuffleCard();
      else click_start = true;
    }, timer || shuffleSpeed);
  }

  function gameStart(x, y, shuffleCount) {
    click_start = false;
    shuffleC = shuffleCount || 3;
    process_deck(x, y);
    grid_gen(true, "", true);

    shuffleCard(3000);
  }

  function init_store() {
    //console.log(process)
    locSecStore = _initSecSore(localStorage, process.env.NEXT_PUBLIC_EWS_KEY);

    if (!locSecStore.getItem("jsknfeiqn")) {
      locSecStore.setItem("jsknfeiqn", {});
    }
  }

  function loadStart() {
    let dat = locSecStore.getItem("jsknfeiqn");

    if (!dat.eukabsms_sfcd) {
      locSecStore.setItem("jsknfeiqn", { ...dat, eukabsms_sfcd: true });
    }

    if (dat.eukabsmsfcd == true) {
      setFinish(true);
    }
  }

  useEffect(() => {
    if (totalScore == targetPoints) {
      soundList.l_success.play();
      setFinish(true);
      let dat = locSecStore.getItem("jsknfeiqn");
      locSecStore.setItem("jsknfeiqn", { ...dat, eukabsmsfcd: true });
    }
  }, [totalScore]);

  useEffect(() => {}, []);

  function continueSplash() {
    init_store();
    loadStart();
    gameStart();
    setShowSplash(false);
  }

  return (
    <>
      <Head>
          <title>Enigma 2 - Card Shuffling</title>
          <meta name="description" content="Enigma 2 - Card Shuffling" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      {showSplash ? (
        <IntroCard title="Do The <span class='text-yellow-400'>Shuffle</span>" comment="You lost focus, you lose that round." proceedFunction={continueSplash}/>
      ) : (
        <div className="flex justify-center items-center w-screen h-screen">
          {finish && <GameFinished />}
          <div className="relative">
            {pos.map((e, i) => {
              return (
                <div
                  key={e.id}
                  id={e.id}
                  className="absolute text-black flip"
                  style={{
                    transform: `translate(${e.x}, ${e.y})`,
                    transition: "transform 1s",
                    width: `${boxW}rem`,
                    height: `${boxH}rem`,
                  }}
                  onClick={flipCard.bind(this, i)}
                >
                  <div
                    className={`h-full bg-white cursor-pointer flip-card ${
                      e.flipped ? "flip-now" : ""
                    }`}
                  >
                    <div className="flip-card-inner">
                      <div className="flip-card-front bg-white">
                        <p>{e.id.substring(0, 0)}</p>
                      </div>
                      <div
                        className="flip-card-back border border-white"
                        style={{ backgroundColor: `#${e.color}` }}
                      >
                        <h1 className="text-4xl flex justify-center items-center w-full h-full">
                          {" "}
                          {e.backText}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute top-0 left-0 mt-16 w-full text-center">
            {totalLives}
          </div>
          <div className="absolute top-0 left-0 mt-12 w-full text-center">
            <div className="border h-2 w-1/3 mx-auto">
              <div
                className="bg-blue-500 h-2"
                style={{
                  width: `${
                    (Math.min(totalScore, targetPoints) / targetPoints) * 100
                  }%`,
                }}
              >
                &nbsp;
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
