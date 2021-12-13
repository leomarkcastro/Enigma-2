import { useEffect, useState } from "react";

import Head from "next/head"
import soundList from "../data/sounds";
import _initSecSore from "../data/ews";
import { GameFinished } from "../components/finished";
import IntroCard from "../components/introcard";

let locSecStore;
let nextOffer = 30
let time = 60*60
let offer = false

export default function Orbs() {
  
  
  let legit = true

  const [finish, setFinish] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const [tim, setTim] = useState(time);
  const [isLegit, setLegit] = useState(true);

  const [isOffer, setOffer] = useState(offer);
  const [chance, setChance] = useState(50);
  const [posD, setPosD] = useState(50);
  const [negD, setNegD] = useState(50);

  function startOffer(){
    offer = true
    setOffer(true)
    setChance(Math.floor(30 + Math.random() * 40));
    setPosD(Math.floor(30 + Math.random() * 40));
    setNegD(Math.floor(30 + Math.random() * 40));
  }

  function timerFx(){
    if (legit){
      time -= 1
      nextOffer -= 1
      setTim(time)
      if ((!offer) && (nextOffer <= 0)){
        startOffer()
      }
      if (time > 0) { // some arbitrary time period
          window.setTimeout(timerFx, 1000);
      }
      else{
        win_counter()
      }
    }
  }

  function deal(isD){
    if (isD){
      let ch = (Math.random() * 100)
      if (ch < chance){
        soundList.success.play();
        time = Math.floor(time*((100 - posD) / 100))
      }
      else{
        soundList.wrong.play();
        time = Math.floor(time*((100 + negD) / 100))
      }
    }
    setOffer(false)
    offer = false
    nextOffer = 30
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
    if (!dat.eukabsms_tlgb) {
      locSecStore.setItem("geasfasdgasdfas", { ...dat, eukabsms_tlgb: true });
    }
    if (dat.eukabsmtlgb == true) {
      setFinish(true);
    }
  }

  useEffect(() => {continueSplash()}, []);

  const win_counter = () => {
    let dat = locSecStore.getItem("geasfasdgasdfas");

    if (!(dat.eukabsmtlgb || false)) {
      setFinish(true);
      soundList.l_success.play();
      locSecStore.setItem("geasfasdgasdfas", { ...dat, eukabsmtlgb: true });
    }
  }

  function onWinChange(){
    legit = false;
    setLegit(legit)
  }

  function continueSplash() {
    init_store();
    loadStart();

    document.addEventListener("visibilitychange", onWinChange);

    timerFx();
    setShowSplash(false);
  }

  return (
    <>
      <Head>
          <title>Enigma 2 - 60 Min Misery</title>
          <meta name="description" content="Enigma 2 - 60 Min Misery" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      {showSplash ? (
        <IntroCard
          title="<span class='text-blue-400'>60</span> minute misery"
          comment="A suffering from nothingness, and a chance to make it better, <span class='text-red-600'>or worse</span>"
          proceedFunction={continueSplash}
        />
      ) : (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
          {finish && <GameFinished />}
          <div className="h-screen flex flex-col justify-center items-center">
            <p className={`text-9xl mb-10 ${isLegit ? "text-blue-400" : "text-red-400"}`}>
              {Math.floor(tim/3600)}<span className="text-xl">hrs</span> {Math.floor(tim/60)%60}<span className="text-xl">mins</span> {tim%60}<span className="text-xl">secs</span>
            </p>
            <p>It is simple, you just have to keep this tab open for 60 minute!</p>
            <p>Every 30 seconds, an offer will come to you to ease your situation</p>
            { !isLegit && <p className="mt-5 text-red-400">Counter broken because you lost focus on page</p> }
            {
              isOffer && 
              <div className="m-2 mt-6 p-4 border text-center">
                <p className="mb-4">An Offer is Here!</p>
                <p className="mb-4 text-3xl">{chance}% chance of Winning!</p>
                <p className="text-sm"><span className="text-green-400">If you Win</span>: Bibilis yung laro ng {posD}%</p>
                <p className="text-sm"><span className="text-red-400">If you Lose</span>: Tatagal pa yung laro ng {negD}%</p>
                <div className="p-2">
                  <button className="p-1 m-2 border" onClick={deal.bind(this, true)}>Deal</button>
                  <button className="p-1 m-2 border" onClick={deal.bind(this, false)}>No Deal</button>
                </div>
              </div>
            }
          </div>
        </div>
      )}
    </>
  );
}
