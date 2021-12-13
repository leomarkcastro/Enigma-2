import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import GlitchedWriter, {
	wait,
	presets,
} from 'glitched-writer'
import soundList from '../data/sounds'
import _initSecSore from '../data/ews'
import cryptoJs from 'crypto-js'
import { useRouter } from 'next/router'
import {check_start_date, start_date} from '../data/gamestart'
import herring from "../data/herring";

let introText = [
  "<span class='yellow'>ICPEP.SE BulSU Chapter</span>",
  "Enigma 2 Console",
  `The first <span class="green">3</span> Winners has a prize of P250`,
  "Loading Database..."
]

let logs_static = []
let current_path = ""
let locSecStore;

const strap_pA = cryptoJs.AES.encrypt
const policy_push = cryptoJs.AES.decrypt
const pol = cryptoJs.enc.Utf8


export default function Home() {

  const router = useRouter()

  let param_session_id = process.env.NEXT_PUBLIC_PACKET

  async function fetchCommand(command){
    command = command.replaceAll("/", '~')
    let preload = locSecStore.getItem(`eukabsmcom_${command}`)
    let status = locSecStore.getItem(`eukabsmstatus`) || "000"
    let player = locSecStore.getItem(`jsknfeiqn`) || {}
    if (preload){
      return preload
    }
    let pak = JSON.stringify({current_path, status, player})
    let jsondata = herring.gyps(strap_pA, pak, param_session_id);
    jsondata = jsondata.toString();
    let data = await fetch(`/api/command/${command}`, {
      method: "POST",
      body: jsondata
    })
    let daja = await data.json()
    daja.permanent && locSecStore.setItem(`eukabsmcom_${command}`, daja)
    return daja
  }

  const [ inp, setInp ] = useState("")
  const [ logs, setLogs ] = useState([]);
  const [ inpActive, setInpActive] = useState(false)

  const [ jumpscare, setJumpscare ] = useState(false)
  const [ watching, setWatching ] = useState(false)
  const [ isFirstStart, setFirstStart ] = useState(false)

  const [ name, setName ] = useState("")

  function logString(string) {
    logs_static.push(string)
    setLogs([...logs_static])
    //Writer && Writer.write("")
  }
  
  function glitcheryIntro(){

    let Writer = new GlitchedWriter("#output", {
      ...presets.terminal,
      
      letterize: true,
      interval: [10,10],
      changeChance:0.8,
      ghostChance:0.7,
      maxGhosts:7,

      html: true
    }, logString);

    

    (async function () {
      let loaded = locSecStore.getItem("eukabsmfirstLoad")

      let gameStart = check_start_date()

      if (!loaded){
        for(let l in introText){
          await wait(10);
          await Writer.write(introText[l]);
          await Writer.write("");
        }
        await wait(1000);
        await Writer.write("<br/>");
        await wait(1000);
        if (gameStart) {
          await Writer.write("Successfully Connected To the Database");
          await Writer.write("");
          await Writer.write("<br/>");
          locSecStore.setItem("eukabsmstatus", "000")
          locSecStore.setItem("eukabsmfirstLoad", true)
        }
        else{
          await Writer.write("Database connection <span class='text-red-600'>ERROR</span>");
          await Writer.write(`Connection will open <span class='text-yellow-600'>${start_date}</span>`);
          await Writer.write("");
          await Writer.write("<br/>");

        }
        
      }
      else{
        for(let l in introText){
          logString(introText[l])
        }
        logString("<br/>")
        logString("Successfully Connected To the Database");
        logString("");
        logString("<br/>");
      }
      
      if (gameStart){
        let player = locSecStore.getItem("jsknfeiqn")

        await Writer.write(`Welcome! ${player.eukabsmname || "null"}`);
        await Writer.write("Ang terminal ay bukas na. Sabihin ang iyong utos");
        await Writer.write(`Kung di alam ang gagawin, itipa ang "tulong"`);
        await Writer.write(``);
        await Writer.write(`<br/>`);
        await Writer.write(``);
        setInpActive(true)
      }
      
    })();
  }

  function glitcheryType(textList){

    let Writer = new GlitchedWriter("#output", {
      ...presets.terminal,

      letterize: true,
      interval: [10,10],
      //changeChance:0.8,
      //ghostChance:0.7,
      //maxGhosts:7,

      html: true
    }, logString);


    (async function () {
      //await Writer.addCallback("step", () => {
      //  soundList.beep2.play()
      //})
      for(let l in textList){
          await wait(10);
          await Writer.write(textList[l]);
          await Writer.write("");
      }
      setInpActive(true);
    })();
  }
  
  const date = new Date();

  useEffect(() => {
    //console.log(process)
    locSecStore = _initSecSore(localStorage, process.env.NEXT_PUBLIC_EWS_KEY)

    let first_start = false
    let player = locSecStore.getItem("jsknfeiqn")

    if (!player){
      locSecStore.setItem("jsknfeiqn", {})
      first_start = true
    }
    else if (!player["eukabsmname"]){
      first_start = true
    }

    if (first_start){
      setFirstStart(true)

    }
    else{
      glitcheryIntro()
    }
    
  }, [])

  const saveName = () => {
    if (name){
      let player = locSecStore.getItem("jsknfeiqn")
      locSecStore.setItem("jsknfeiqn", {...player, eukabsmname: name})
      setFirstStart(false)
      glitcheryIntro()
    }
  }

  const _handleKeyDownName = (e) => {
    if (e.key === 'Enter') {
      soundList.beep3.play()
      saveName()
      
    }
  }

  const processCom = async (comm) => {
    try{
      let result = await fetchCommand(comm)
      //console.log(result)
      //console.log(result)
      switch(result.type.split("_")[0]){
        case process.env.NEXT_PUBLIC_T_TEXTSET:
          glitcheryType(result.data)

          break;

        case process.env.NEXT_PUBLIC_T_COMMAND:

          switch(result.data){
            case process.env.NEXT_PUBLIC_T_C_CLEAR:
              logs_static = []
              setLogs([])
              setInpActive(true);
              break;
            case process.env.NEXT_PUBLIC_T_C_MOVE:
              if (result.data2.success){
                glitcheryType([`=============<br/>Changing directory to ${result.data2.path}<br/><br/>`, ...Object.keys(result.data2.data.content).map(e => e), '<br/>------------<br/><br/>'])
                current_path = result.data2.path
              }
              else{
                glitcheryType([`<span class="red">${result.data2.message}</span>`, "<br/>"])
                soundList.wrong.play()
              }
              
              break;
            case process.env.NEXT_PUBLIC_T_C_DIR:
              if (result.data2.success){
                glitcheryType([`=============<br/>Viewing directory of ${result.data2.path}<br/><br/>`, ...Object.keys(result.data2.data.content).map(e => e), '<br/>------------<br/><br/>'])
                //current_path = result.data2.path
              }
              else{
                glitcheryType([`<span class="red">${result.data2.message}</span>`, "<br/>"])
                soundList.wrong.play()
              }
              
              break;
            case process.env.NEXT_PUBLIC_T_C_PATH:
              //console.log(current_path)
              glitcheryType([`<br/><br/>Current Directory: ${current_path}<br/><br/>`])
              break;

            case process.env.NEXT_PUBLIC_T_C_READ:
              //console.log(result)
              if (result.data2.success){
                glitcheryType([`=============<br/>Reading file of ${result.data2.path}<br/><br/>`, ...result.data2.data.content, '<br/>------------<br/><br/>'])
                //current_path = result.data2.path
              }
              else{
                glitcheryType([`<span class="red">${result.data2.message}</span>`, "<br/>"])
                soundList.wrong.play()
              }
              
              break;

            case process.env.NEXT_PUBLIC_T_C_REDIRECT:
              //console.log(result)
              router.push(result.data2)
              break;
          }

          break;
        
        case process.env.NEXT_PUBLIC_T_C_JUMPSCARE:
          soundList.scream.play()
          setJumpscare(result.data)
          setInpActive(true);
          break;

        case process.env.NEXT_PUBLIC_T_C_WATCHING:
          setWatching(result.data)
          setInpActive(true);
          break;

      }

      if (result.type.indexOf(process.env.NEXT_PUBLIC_PX_STATUS) > -1){
        result.new_stat && locSecStore.setItem("eukabsmstatus", result.new_stat)
      }

      if (result.type.indexOf(process.env.NEXT_PUBLIC_PX_PROGRESS) > -1){
        if(result.player){
          let dd = herring.gyps(policy_push, result.player, param_session_id)
          if (dd){
            dd = JSON.parse(dd.toString(pol));
            result.player && locSecStore.setItem("jsknfeiqn", dd)
          }
        }
        
      }

      if (result.type.indexOf(process.env.NEXT_PUBLIC_PX_ANOMALY) > -1){
        soundList.wrong.play()
      } else{
        soundList.l_success.play()
      }

    }
    catch(e){
      //console.error(e)
    }
    
    setInp("")
    
  }

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      soundList.beep3.play()
      setInpActive(false)
      processCom(inp)
      
    }
  }

  return (
    <>
      <Head>
          <title>Enigma 2</title>
          <meta name="description" content="ICPEP.SE BULSU MAIN PRESENTS ENIGMA 2" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        isFirstStart ?
        <div className="flex flex-col justify-center items-center w-screen h-screen">
          <input className='w-96 bg-gray-800 text-center p-2' autoFocus type="text" onKeyDown={_handleKeyDownName} value={name} placeholder='Enter Player Name Here' onChange={e => {setName(e.target.value);soundList.beep1.play()}}/>
        </div>
        :
        <div className={styles.container}>
        
          <main className={styles.main}>
            { watching && <div className="overlay absolute" dangerouslySetInnerHTML={{__html:watching}} />}
            <div className="wrapper">
              <div className="log" id="logs">
                  {
                      logs.map((e,i) => <p className="logList" key={`logs_${i}`} dangerouslySetInnerHTML={{__html:e}}></p>)
                  }
              </div>
              <pre>
                
                
                <output className={inpActive ? `hidden` : ""} id="output"></output>

                {
                  inpActive ?
                  <div className="user-input">
                    <span className="incentive">&gt;&gt;</span>
                    <input autoFocus type="text" onKeyDown={_handleKeyDown} value={inp} onChange={e => {setInp(e.target.value);soundList.beep1.play()}}/>
                  </div>
                  :
                  <></>
                }
                
                
                
              </pre>
            </div>
            
            { jumpscare && <div className="overlay absolute" dangerouslySetInnerHTML={{__html:jumpscare}} />}
          </main>

        </div>
      }
      
    </>
  )
}
