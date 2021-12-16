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

export default function NotePass() {
  const [showSplash, setShowSplash] = useState(true);
  
  function continueSplash() {
    setShowSplash(false);
  }

  return (
    <>
      <Head>
          <title>Enigma 2</title>
          <meta name="description" content="Enigma 2" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      {showSplash ? (
        <IntroCard
          title="Enigma <span class='text-red-400'>2</span>"
          comment="Changing Perspectives in the New Normal."
          proceedFunction={continueSplash}
        />
      ) : (
        <div className="flex flex-col justify-center items-center w-screen h-screen">
          <p>Get Ready</p>
        </div>
      )}
    </>
  );
}
