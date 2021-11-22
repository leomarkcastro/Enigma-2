import cryptoJs from "crypto-js"
import cases from "./cases"
import { getDirectory, getFile } from "./file_list"

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
                        "<code class='text-yellow-400'>path</code> - Shows your current directory",
                        "<code class='text-yellow-400'>dir &lt;location&gt;</code> - Shows All Files and Directory in the Server",
                        "<code class='text-yellow-400'>move &lt;location&gt;</code> -   Moves to a child subdirectory",
                        "<code class='text-yellow-400'>move ..</code> - Moves up to from the directory parent",
                        "<code class='text-yellow-400'>move /</code> - Moves you back to the root directory",
                        "<code class='text-yellow-400'>read &lt;file&gt;</code> - Reads the specified file in the current directory",
                        props.player.dev_switch ? "<code class='text-blue-400'>gl_sys_check</code> - [Dev] Calls the program that executes the system check" : "",
                        //"<code class='text-yellow-400'>net test</code> - Sends a test net packet to central server",
                        //"<code class='text-yellow-400'>net fetch &lt;id&gt;</code> - Requests a file from central server based on specified id",
                        //"<code class='text-yellow-400'>net index</code> - Gets all available id files in the central database",
                        //"<code class='text-yellow-400'>net post &lt;file&gt;</code> - Uploads specified file at current directory to central server",
                        //"<code class='text-yellow-400'>db test</code> - Checks database connection with local database",
                        //"<code class='text-yellow-400'>db post &lt;id&gt; &lt;string_data&gt;</code> - Upload a data in database with provided unique id and string data",
                        //"<code class='text-yellow-400'>db read &lt;id&gt;</code> - Requests data from database based on provided id",
                        //"<code class='text-yellow-400'>db del &lt;id&gt;</code> - Deletes data from database based on provided id",
                        //"<code class='text-yellow-400'>db admin backup</code> - Back ups the current instance of database",
                        //"<code class='text-yellow-400'>db admin recover</code> - Restores a db backup point",
                        "<code class='text-yellow-400'>restart soft</code> - Restarts the server to fix small errors",
                        "<code class='text-yellow-400'>restart hard</code> - Restarts the server back to the very beginning",
                        "<code class='text-green-400'>glory_me</code> - Shows motivational message <code class='text-green-500'>in case you dont know what to do</code>",
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

    "gl_sys_check" : async (commands, props) => {
        //console.log(props)
        props = await JSON.parse(props)
        if(!(props["player"].dev_switch)) return {data: [
            `<span class="red">Invalid Command</span>`,
            "<br/>"
        ], permanent: false, command:commands[0], success:false, type:process.env.NEXT_PUBLIC_T_TEXTSET}

        if (commands[1]){
            switch(commands[1]){
                case 'conn':
                    return {
                        data :  `${process.env.NEXT_PUBLIC_T_C_REDIRECT}`,
                        data2: "/pixels",
                        permanent: false,
                        type:  `${process.env.NEXT_PUBLIC_T_COMMAND}`
                    };
            }
        }

        return {
            data: [
                "<br/>==========================================",
                "<span class='text-blue-600'>GLOBAL SYSTEM CHECK</span> <br/><br/>",
                "This program was to be used to inititate self maintenance of this Linulitis Server v0.1.1",
                "Again, this program should not see the light of the day because the program I had made for this institute SHOULD not fail anymore unless some ruthless maggot throws a wrench in this code.",
                "But I had written this code either way, in case the tragic day had finally come.",
                "This sub program should help you guide on what tests you should do for the 'general system recovery' routine to be called<br/><br/>",
                "Else, please call this self test functions below and make sure all of them fail before this program activates the 'recovery mode'",
                "<br/><br/>",
                ` &#9634; - Connection Self Check Up [not tested yet] &gt; Call Using <span class="text-yellow-400">gl_sys_check conn</span>`,
                ` &#9634; - Database Self Check Up   [not tested yet] &gt; Call Using <span class="text-yellow-400">gl_sys_check db</span> `,
                ` &#9634; - Hardware Integrity Check [not tested yet] &gt; Call Using <span class="text-yellow-400">gl_sys_check hdInCh</span> `,
                "<br/>==========================================",
            ],
            permanent: false,
            type: `${process.env.NEXT_PUBLIC_T_TEXTSET}`
        }
        
    },
}

export default commands