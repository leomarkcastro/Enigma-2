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
    
    "help" : async (commands, props) => {
        props = await JSON.parse(props)
        switch(props.status){
            default:
                return {
                    data: [
                        "help - Commands",,
                        "<br/>",
                        "<code class='text-yellow-400'>cls</code> - Clears Screen",
                        "<code class='text-yellow-400'>path</code> - Shows your current directory path",
                        "<code class='text-yellow-400'>dir</code> - Shows Files and Directory in the current directory",
                        "<code class='text-yellow-400'>dir &lt;location&gt;</code> - Shows Files and Directory in the given directory address",
                        "<code class='text-yellow-400'>move &lt;location&gt;</code> -   Moves to a child subdirectory",
                        "<code class='text-yellow-400'>move ..</code> - Moves up to from the directory parent",
                        "<code class='text-yellow-400'>move /</code> - Moves you back to the root directory",
                        "<code class='text-yellow-400'>read &lt;file&gt;</code> - Reads the specified file in the current directory",
                        "<code class='text-green-400'>glory_me</code> - Shows motivational message <code class='text-green-500'>in case you dont know what to do</code>",
                        "<code class='text-blue-400'>progress</code> - Shows the receipt of your progress in the game</code>",
                        "<br/>"
                    ],
                    permanent: false,
                    type: `${process.env.NEXT_PUBLIC_T_TEXTSET}`
                }
        }
        
    },
    "cls": async (commands, props) => {
        return {
            data : `${process.env.NEXT_PUBLIC_T_C_CLEAR}`,
            permanent: true,
            type: `${process.env.NEXT_PUBLIC_T_COMMAND}`
        }
    },
    "move": async (commands, props) => {
        props = await JSON.parse(props)
        switch(commands[1]){
            case "..":
                props.current_path = props.current_path.split("/")
                props.current_path.pop()
                props.current_path = props.current_path.toString().replaceAll(",", "/")
                return {
                    data : `${process.env.NEXT_PUBLIC_T_C_MOVE}`,
                    props,
                    data2: getDirectory(props.current_path),
                    permanent: false,
                    type: `${process.env.NEXT_PUBLIC_T_COMMAND}`
                }
            case "/":
                return {
                    data :  `${process.env.NEXT_PUBLIC_T_C_MOVE}`,
                    props,
                    data2: getDirectory("/"),
                    permanent: false,
                    type: `${process.env.NEXT_PUBLIC_T_COMMAND}`
                }
        }
        let p_loc = `${props.current_path}${commands[1] ? `/${commands[1]}` : ''}`
        //console.log(p_loc)
        let dir = getDirectory(p_loc)
        return {
            data :  `${process.env.NEXT_PUBLIC_T_C_MOVE}`,
            data2: dir,
            permanent: false,
            type:  `${process.env.NEXT_PUBLIC_T_COMMAND}`
        }
    },
    "dir": async (commands, props) => {
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
    "path": async (commands, props) => {
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
    "read": async (commands, props) => {
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
    "glory_me" : async (commands, props) => {
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

    "progress" : async (commands, props) => {
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
        totalP += player.e2_ttpkmn ? 1 : 0
        totalP += player.e2_sfcd ? 1 : 0
        totalP += player.e2_magellan ? 1 : 0
        totalP += player.e2_ntpass ? 1 : 0
        totalP += player.e2_orli ? 1 : 0
        totalP += player.e2_wotwil ? 1 : 0

        switch(props.status){
            default:
                return {
                    data: [
                        "<br/>===============================<br/>",
                        "<br/>",
                        "Game Progress",
                        "<br/>",
                        `<code style="${player.e2_ttpkmn ?  'color: #a64d79">Done' : 'color: white">....'}</code> - Pick Lock `,
                        `<code style="${player.e2_sfcd ?    'color: #d2afff">Done' : 'color: white">....'}</code> - Cards Shuffle`,
                        `<code style="${player.e2_magellan ?'color: #dfa98f">Done' : 'color: white">....'}</code> - Atlas Venture`,
                        `<code style="${player.e2_ntpass ?  'color: #353839">Done' : 'color: white">....'}</code> - Note Password`,
                        `<code style="${player.e2_orli ?    'color: #ff7373">Done' : 'color: white">....'}</code> - Orbitals`,
                        `<code style="${player.e2_wotwil ?'color: #16537e">Done' : 'color: white">....'}</code> - Crypted`,
                        "<br/><br/>",
                        (totalP == 6) ? "Instruction to Winner: Screenshot this receipt, message Leo Mark Castro with this picture, send a wink and wait patiently." : "Instruction to Winner: &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;",
                        "<br/>===============================<br/><br/>",
                    ],
                    permanent: false,
                    type: `${process.env.NEXT_PUBLIC_T_TEXTSET}`
                }
        }
        
    },

}

export default commands