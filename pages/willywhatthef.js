import { useEffect, useState } from "react";
import Link from 'next/link'

import Head from "next/head"

import soundList from "../data/sounds";
import _initSecSore from '../data/ews'
import { GameFinished } from "../components/finished";

let locSecStore;

export default function Shrmith() {

  const [finish, setFinish] = useState(false)

  function init_store(){
    //console.log(process)
    locSecStore = _initSecSore(localStorage, process.env.NEXT_PUBLIC_EWS_KEY)

    if (!locSecStore.getItem("jsknfeiqn")){
      locSecStore.setItem("jsknfeiqn", {})
    }
  }

  function loadStart(){
    let dat = locSecStore.getItem("jsknfeiqn")
    if (dat.eukabsmwotwil == true){
      setFinish(true)
    }
  }

  function setVisit(){
    let dat = locSecStore.getItem("jsknfeiqn")
    if(!(dat.eukabsmwotwil)){
      setFinish(true)
      soundList.l_success.play()
      locSecStore.setItem("jsknfeiqn", {...dat, eukabsmwotwil: true})
    }
  }

  useEffect(() => {

    init_store()
    loadStart()

    setVisit()

  }, [])

  return (
    <>
      <Head>
          <title>404 Not Found</title>
          <meta name="description" content="404 Not Found" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center w-screen h-screen">

        {finish && <GameFinished />}
        <div className="h-screen flex flex-col justify-center items-center">

          {finish && <p>Well Done!</p>}
        
          <p className="text-sm text-center">Thank you for visiting will_the_what_the_f website.</p>
          <p className="text-sm text-center">Nice one decrypting that stupid cryptic message.</p>

          <Link className="mt-20" href="/">Go back to console</Link>

        </div>
      
      </div>
    </>
    
  );
}
