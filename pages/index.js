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

let introText = [
  "Maroros City C.D.OS",
  "Establish 2001",
  "Property of Maroros City Development Council",
  `<span class="yellow">MPD Institute 2008</span>`,
  `"We are here to <span class="green">serve people</span>"`,
  "",
  "Loading Database..."
]

let logs_static = []
let current_path = ""
let locSecStore;

export default function Home() {

  const router = useRouter()

  async function fetchCommand(command){
    command = command.replaceAll("/", '~')
    let preload = locSecStore.getItem(`e2_com_${command}`)
    let status = locSecStore.getItem(`e2_status`) || "000"
    let player = locSecStore.getItem(`e2_player`) || {}
    if (preload){
      return preload
    }
    let jsondata = cryptoJs.AES.encrypt(JSON.stringify({current_path, status, player}), process.env.NEXT_PUBLIC_PACKET);
    jsondata = jsondata.toString();
    let data = await fetch(`/api/command/${command}`, {
      method: "POST",
      body: jsondata
    })
    let daja = await data.json()
    daja.permanent && locSecStore.setItem(`e2_com_${command}`, daja)
    return daja
  }

  const [ inp, setInp ] = useState("")
  const [ logs, setLogs ] = useState([]);
  const [ inpActive, setInpActive] = useState(false)

  const [ jumpscare, setJumpscare ] = useState(false)
  const [ watching, setWatching ] = useState(false)

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
      let loaded = locSecStore.getItem("e2_firstLoad")

      if (!loaded){
        for(let l in introText){
          await wait(10);
          await Writer.write(introText[l]);
          await Writer.write("");
        }
        await wait(1000);
        await Writer.write("<br/>");
        await wait(1000);
        await Writer.write("Successfully Connected To the Database");
        await Writer.write("");
        await Writer.write("<br/>");
        locSecStore.setItem("e2_status", "000")
        locSecStore.setItem("e2_firstLoad", true)
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
      
      await Writer.write("Terminal Now Open. Please Enter Your Command");
      await Writer.write(`Else type "help" to see list of commands`);
      await Writer.write(``);
      await Writer.write(`<br/>`);
      await Writer.write(``);
      setInpActive(true)
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

    if (!locSecStore.getItem("e2_player")){
      locSecStore.setItem("e2_player", {})
    }
    glitcheryIntro()
  }, [])

  const processCom = async (comm) => {
    try{
      let result = await fetchCommand(comm)
      console.log(result)
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
              console.log(result)
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
        result.new_stat && locSecStore.setItem("e2_status", result.new_stat)
      }

      if (result.type.indexOf(process.env.NEXT_PUBLIC_PX_PROGRESS) > -1){
        if(result.player){
          let dd = cryptoJs.AES.decrypt(result.player, process.env.NEXT_PUBLIC_PACKET);
          if (dd){
            dd = JSON.parse(dd.toString(cryptoJs.enc.Utf8));
            result.player && locSecStore.setItem("e2_player", dd)
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
      console.error(e)
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
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        { watching && <div className="overlay absolute" dangerouslySetInnerHTML={{__html:watching}} />}
        <div className="wrapper">
          <div className="log" id="logs">
              {
                  logs.map((e,i) => <p className="logList" key={`logs_${i}`} dangerouslySetInnerHTML={{__html:e}}></p>)
              }
          </div>
          <pre>
            
            
            <output className={inpActive && `hidden`} id="output"></output>

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
  )
}
