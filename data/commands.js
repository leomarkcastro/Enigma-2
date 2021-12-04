import cryptoJs from "crypto-js"
import cases from "./cases"
import { getDirectory, getFile } from "./file_list"
import fetch_quote from "./quotes"

const easter = {
    "beep": async (status) => {
        return {
            data : [
                `<img src="https://i.ytimg.com/vi/EaR_Q65eVK8/maxresdefault.jpg" width="500"/>`,
                "<br/>"
            ],

            permanent: false,
            new_stat : "00F",
            type: `${process.env.NEXT_PUBLIC_T_TEXTSET}_${process.env.NEXT_PUBLIC_PX_STATUS}_${process.env.NEXT_PUBLIC_PX_ANOMALY}`
        }
    },
    "boop": async (status) => {
        return {
            data : `<img src="https://c.tenor.com/u9XnPveDa9AAAAAM/rick-rickroll.gif" width="500" class="jumpScare"/>`,
            permanent: false,
            new_stat : "00F",
            type: `${process.env.NEXT_PUBLIC_T_C_JUMPSCARE}_${process.env.NEXT_PUBLIC_PX_STATUS}`
        }
    },
    "badaboop": async (status) => {
        return {
            data : `<img src="https://i.imgflip.com/589eui.jpg" width="500" class="jumpScare"/>`,
            permanent: false,
            new_stat : "00F",
            type: `${process.env.NEXT_PUBLIC_T_C_WATCHING}_${process.env.NEXT_PUBLIC_PX_STATUS}`
        }
    }
}

const commands = {
    
    ...easter,
    
    "tulong" : async (commands, props) => {
        props = await JSON.parse(props)
        let player = props.player
        switch(props.status){
            default:
                return {
                    data: [
                        "tulong - Ilista lahat ng mga utos na pwedeng gawin",
                        "<br/>",
                        player.eukabsms_ttpkmn ? "<code class='text-purple-400'>laro lock</code> - Itatalon ka sa page na mapaglalaruan mo ang pick locking game</code>" : '',
                        player.eukabsms_sfcd ? "<code class='text-purple-400'>laro cards</code> - Itatalon ka sa page na mapaglalaruan mo ang card shuffling game</code>" : '',
                        player.eukabsms_magellan ? "<code class='text-purple-400'>laro atlas</code> - Itatalon ka sa page na mapaglalaruan mo ang atlas adventurer game</code>" : '',
                        player.eukabsms_ntpass ? "<code class='text-purple-400'>laro notes</code> - Itatalon ka sa page na mapaglalaruan mo ang note picking game</code>" : '',
                        player.eukabsms_orli ? "<code class='text-purple-400'>laro orbits</code> - Itatalon ka sa page na mapaglalaruan mo ang orbital puzzle game</code>" : '',
                        player.eukabsms_orli ? "<code class='text-purple-400'>laro 30min</code> - Itatalon ka sa page na mapaglalaruan mo ang 30 min misery game</code>" : '',
                        "<br/>",
                        "<code class='text-blue-400'>panalo</code> - Shows the receipt of your progress in the game</code>",
                        "<br/>",
                        "<code class='text-yellow-400'>lns</code> - Linising ang lugar",
                        "<code class='text-yellow-400'>lugar</code> - Sabihin kung nasaang folder ka na",
                        "<code class='text-yellow-400'>lam</code> - Ilista ang laman ng folder",
                        "<code class='text-yellow-400'>lam &lt;lokasyon&gt;</code> - Ilista ang laman ng folder base sa binigay na lokasyon",
                        "<code class='text-yellow-400'>gal &lt;lokasyon&gt;</code> - Lumipat ng lugar patungo sa binigay na lokasyon",
                        "<code class='text-yellow-400'>gal ..</code> - Humakbang pabalik mula sa iyong lokasyon",
                        "<code class='text-yellow-400'>gal /</code> - Bumalik sa pinagmulang lokasyon",
                        "<code class='text-yellow-400'>basa &lt;lokasyon&gt;</code> - Basahin ang isang file base sa binigay na lokasyon",
                        "<code class='text-green-400'>mabuhay</code> - Magpakita ng nakakatulong na salita <code class='text-green-500'>kung sakaling di mo na alam ang gagawin</code>",
                        "<br/>",
                    ],
                    permanent: false,
                    type: `${process.env.NEXT_PUBLIC_T_TEXTSET}`
                }
        }
        
    },
    "laro": async (commands, props) => {
        props = await JSON.parse(props)

        let linklist = {
            "lock": "/toothpickman",
            "cards": "/fivecentcasino",
            "atlas": "/bizarreadvents",
            "notes": "/earsastheeye",
            "orbits": "/onefortwoback",
            "30min": "/tricklegamble",
        }
        
        if (commands[1] in linklist){
            return {
                data :  `${process.env.NEXT_PUBLIC_T_C_REDIRECT}`,
                data2: linklist[commands[1]],
                permanent: false,
                type:  `${process.env.NEXT_PUBLIC_T_COMMAND}`
            }
        }
        else{
            return {
                data: [
                    "Game Code Error",
                ],
                permanent: false,
                type: `${process.env.NEXT_PUBLIC_T_TEXTSET}`
            }
        }
        
    },
    "lns": async (commands, props) => {
        return {
            data : `${process.env.NEXT_PUBLIC_T_C_CLEAR}`,
            permanent: true,
            type: `${process.env.NEXT_PUBLIC_T_COMMAND}`
        }
    },
    "gal": async (commands, props) => {
        props = await JSON.parse(props)
        let player = props.player

        switch(commands[1]){
            case "..":
                props.current_path = props.current_path.split("/")
                props.current_path.pop()
                props.current_path = props.current_path.toString().replaceAll(",", "/")
                return {
                    data : `${process.env.NEXT_PUBLIC_T_C_MOVE}`,
                    props,
                    data2: getDirectory(props.current_path, player),
                    permanent: false,
                    type: `${process.env.NEXT_PUBLIC_T_COMMAND}`
                }
            case "/":
                return {
                    data :  `${process.env.NEXT_PUBLIC_T_C_MOVE}`,
                    props,
                    data2: getDirectory("/", player),
                    permanent: false,
                    type: `${process.env.NEXT_PUBLIC_T_COMMAND}`
                }
        }
        let p_loc = `${props.current_path}${commands[1] ? `/${commands[1]}` : ''}`
        //console.log(p_loc)
        let dir = getDirectory(p_loc, player)
        return {
            data :  `${process.env.NEXT_PUBLIC_T_C_MOVE}`,
            data2: dir,
            permanent: false,
            type:  `${process.env.NEXT_PUBLIC_T_COMMAND}`
        }
    },
    "lam": async (commands, props) => {
        props = await JSON.parse(props)
        let p_loc = `${props.current_path}${commands[1] ? `/${commands[1]}` : ''}`
        //console.log(p_loc)
        let dir = getDirectory(p_loc)
        return {
            data :  `${process.env.NEXT_PUBLIC_T_C_DIR}`,
            data2: dir,
            permanent: false,
            type:  `${process.env.NEXT_PUBLIC_T_COMMAND}`
        }
    },
    "lugar": async (commands, props) => {
        props = await JSON.parse(props)
        //let p_loc = `${props.current_path}${commands[1] ? `/${commands[1]}` : ''}`
        //console.log(p_loc)
        //let dir = getDirectory(p_loc)
        return {
            data :  `${process.env.NEXT_PUBLIC_T_C_PATH}`,
            //data2: props.current_path,
            permanent: true,
            type:  `${process.env.NEXT_PUBLIC_T_COMMAND}`
        }
    },
    "basa": async (commands, props) => {
        props = await JSON.parse(props)      
        let up_player = false;  
        let p_loc = `${props.current_path}${commands[1] ? `/${commands[1]}` : ''}`
        //console.log(p_loc)
        let dir = getFile(p_loc)

        if (dir.success){
            switch(dir.data.name){
                case 'system_guide.txt':
                    if(!(props["player"].dev_switch)) props.player.dev_switch = true

                    //console.log(props)
                    //console.log()
                    up_player = cryptoJs.AES.encrypt(JSON.stringify(props.player), process.env.NEXT_PUBLIC_PACKET).toString();
                    break;

            }
        }
        
        return {
            data :  `${process.env.NEXT_PUBLIC_T_C_READ}`,
            data2: dir,
            player: up_player,
            permanent: false,
            type:  `${process.env.NEXT_PUBLIC_T_COMMAND}_${process.env.NEXT_PUBLIC_PX_PROGRESS}`
        }
    },
    "ping" : async (commands, props) => {
        props = await JSON.parse(props)
        if(!(props["player"].count)) props.player.count = 0
        props.player.count += 1

        //console.log()
        let ed = cryptoJs.AES.encrypt(JSON.stringify(props.player), process.env.NEXT_PUBLIC_PACKET);
        ed = ed.toString();

        return {
            data: [
                "ping",
                `count: ${props.player.count}`,
                "<br/>"
            ],
            player: ed,
            permanent: false,
            type: `${process.env.NEXT_PUBLIC_T_TEXTSET}_${process.env.NEXT_PUBLIC_PX_PROGRESS}`
        }
    },
    "mabuhay" : async (commands, props) => {
        //props = await JSON.parse(props)
      
        return {
            data: [
                "---<br/><br/>Inspirational Quotes",
                fetch_quote(),
                "<br/>---<br/>"
            ],
            permanent: false,
            type: `${process.env.NEXT_PUBLIC_T_TEXTSET}`
        }
        
    },

    "panalo" : async (commands, props) => {
        props = await JSON.parse(props)
        let player = props.player
        
        if (!player){
            return {
                data: [
                    "Error Parsing",
                ],
                permanent: false,
                type: `${process.env.NEXT_PUBLIC_T_TEXTSET}`
            }
        }

        let totalP = 0
        totalP += player.eukabsmttpkmn ? 1 : 0
        totalP += player.eukabsmsfcd ? 1 : 0
        totalP += player.eukabsmmagellan ? 1 : 0
        totalP += player.eukabsmntpass ? 1 : 0
        totalP += player.eukabsmorli ? 1 : 0
        totalP += player.eukabsmwotwil ? 1 : 0
        totalP += player.eukabsmtlgb ? 1 : 0

        let hash = cryptoJs.SHA256(JSON.stringify({
            plar : player.eukabsmname,
            ttpk : player.eukabsmttpkmn,
            sfcd : player.eukabsmsfcd,
            mgln : player.eukabsmmagellan,
            ntps : player.eukabsmntpass,
            orll : player.eukabsmorli,
            wtwl : player.eukabsmwotwil,
            tlgm : player.eukabsmtlgb,
        }))

        switch(props.status){
            default:
                return {
                    data: [
                        "<br/>===============================<br/>",
                        "<br/>",
                        "Game Progress",
                        "<br/>",
                        `<code style="${player.eukabsmttpkmn ?  'color: #a64d79">Done' : 'color: white">....'}</code> - Pick Lock `,
                        `<code style="${player.eukabsmsfcd ?    'color: #d2afff">Done' : 'color: white">....'}</code> - Cards Shuffle`,
                        `<code style="${player.eukabsmmagellan ?'color: #dfa98f">Done' : 'color: white">....'}</code> - Atlas Venture`,
                        `<code style="${player.eukabsmntpass ?  'color: #353839">Done' : 'color: white">....'}</code> - Note Password`,
                        `<code style="${player.eukabsmorli ?    'color: #ff7373">Done' : 'color: white">....'}</code> - Orbitals`,
                        `<code style="${player.eukabsmwotwil ?'color: #16537e">Done' : 'color: white">....'}</code> - Crypted`,
                        `<code style="${player.eukabsmtlgb ?'color: #8f0536">Done' : 'color: white">....'}</code> - 30 Min Misery`,
                        "<br/><br/>",
                        `<code>Progress Hash</code> - ${hash}`,
                        "<br/><br/>",
                        (totalP >= 6) ? "Instruction to Winner: Screenshot this receipt, message Leo Mark Castro with this picture, send a wink and wait patiently." : "Instruction to Winner: &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;",
                        "<br/>===============================<br/><br/>",
                    ],
                    permanent: false,
                    type: `${process.env.NEXT_PUBLIC_T_TEXTSET}`
                }
        }
        
    },

}

export default commands