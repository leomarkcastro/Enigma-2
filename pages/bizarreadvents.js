import { useEffect, useRef, useState } from "react";
import uuid from 'uuid/v4'

import GlitchedWriter, { wait } from 'glitched-writer'

import herring from "../data/herring";
import _initSecSore from '../data/ews'
import { GameFinished } from "../components/finished";
import soundList from "../data/sounds";
import cryptoJs from "crypto-js";
let locSecStore;

let locs;
let targetPoints = 100

let Coordinate;
let Clue;

function GiveMe({setMapVal}){

  const [inp, setInp] = useState("")
  
  useEffect(() => {
    Coordinate = new GlitchedWriter('#glitch_coord', { letterize: true, html:true });
    Clue = new GlitchedWriter('#glitch_clue', { letterize: true, html:true });
  }, [])

  function submit(){
    let ans = String(inp).toLowerCase().trim()
    if (Object.keys(locs).includes(ans)){
      Coordinate.write(locs[ans][0])
      Clue.write(locs[ans][1])
      setInp("")
      setMapVal(locs[ans][2])
    }
    
  }

  function submitStill(e){
    if(e.key === "Enter"){
      submit()
    }
  }

  return (
    <div>
      <div className="flex mt-5 border border-white p-1">
        <input className="w-full" value={inp} onChange={e => setInp(e.target.value)} onKeyPress={submitStill} />
        <button className="bg-gray-800" onClick={submit}>Submit</button>
      </div>
      
      <div className="text-center" id="glitch_coord">Located beside a pharmacy</div>
      <div className="text-center" id="glitch_clue">A lottery</div>
    </div>
  )

}

export default function Explorer() {

  let interrupt_id = process.env.NEXT_PUBLIC_PACKET
  const [mapVal, setMapVal] = useState("https://www.google.com/maps/embed?pb=!4v1637665725902!6m8!1m7!1sMxyrE8hrOxx7QcF0UYRtOQ!2m2!1d35.90951380009945!2d14.42602479259856!3f91.97630884731788!4f-5.022382564031389!5f0.7820865974627469")
  const [totalScore, setTotalScore] = useState(0)
  const [gameLoaded, setGameLoaded] = useState(false)
  
  let sys_push = cryptoJs.AES.decrypt
  const [finish, setFinish] = useState(false);

  
  let bus874 = "/api/ex_a"

  async function fetchAnswers(){
    let _dat = await fetch(bus874)
    _dat = await _dat.json()

    let dd = herring.gyps(sys_push, _dat.data, interrupt_id)
    dd = dd.toString(cryptoJs.enc.Utf8);
      dd = JSON.parse(dd)

    locs = dd
    targetPoints = Object.keys(locs).length
    setGameLoaded(true)
  }

  function init_store(){
    //console.log(process)
    locSecStore = _initSecSore(localStorage, process.env.NEXT_PUBLIC_EWS_KEY)

    if (!locSecStore.getItem("e2_player")){
      locSecStore.setItem("e2_player", {})
    }
  }

  function loadStart(){
    let dat = locSecStore.getItem("e2_player")
    if (dat.e2_magellan == true){
      setFinish(true)
    }
  }

  useEffect(() => {
    if (totalScore == (targetPoints)){
      soundList.l_success.play()
      setFinish(true)
      let dat = locSecStore.getItem("e2_player")
      locSecStore.setItem("e2_player", {...dat, e2_magellan: true})
    }
  }, [totalScore]);

  function setMap(ur){
    setTotalScore(totalScore + 1)
    setMapVal(ur)
  }

  useEffect(() => {
    fetchAnswers()

    init_store()
    loadStart()

  }, [])

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      {finish && <GameFinished />}
      {
        gameLoaded ?
        <>
          <iframe src={mapVal} width="800" height="500" style={{border:0}} allowFullScreen="" loading="lazy"></iframe>
          <GiveMe setMapVal={setMap} />
        </>
        :
        <p>Game Loading</p>
      }
      
    </div>
  );
}
