import { useEffect, useState } from "react";
import Link from 'next/link'


import soundList from "../data/sounds";
import _initSecSore from '../data/ews'
import { GameFinished } from "../components/finished";

let locSecStore;

export default function Shrmith() {

  const [finish, setFinish] = useState(false)

  function init_store(){
    //console.log(process)
    locSecStore = _initSecSore(localStorage, process.env.NEXT_PUBLIC_EWS_KEY)

    if (!locSecStore.getItem("e2_player")){
      locSecStore.setItem("e2_player", {})
    }
  }

  function loadStart(){
    let dat = locSecStore.getItem("e2_player")
    if (dat.e2_wotwil == true){
      setFinish(true)
    }
  }

  function setVisit(){
    let dat = locSecStore.getItem("e2_player")
    if(!(dat.e2_wotwil)){
      setFinish(true)
      soundList.l_success.play()
      locSecStore.setItem("e2_player", {...dat, e2_wotwil: true})
    }
  }

  useEffect(() => {

    init_store()
    loadStart()

    setVisit()

  }, [])

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">

      {finish && <GameFinished />}
      <div className="h-screen flex flex-col justify-center items-center">

        {finish && <p>Well Done!</p>}
      
        <p className="text-sm text-center">Thank you for visiting will_the_what_the_f website.</p>
        <p className="text-sm text-center">Nice one decrypting that stupid cryptic message.</p>

        <Link className="mt-20" href="/">Go back to console</Link>

      </div>
     
    </div>
  );
}
