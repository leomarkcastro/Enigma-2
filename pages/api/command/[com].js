import cryptoJs from "crypto-js";
import commands from "../../../data/commands"

export default async function handler(req, res) {
    let { com } = req.query
    com = com.replace(/~/g, '/')
    if (req.method === 'POST') {
        let com_parse = com.split(" ")
        if (com_parse[0] in commands){
            //console.log(req.body)
            let dd = cryptoJs.AES.decrypt(req.body, process.env.NEXT_PUBLIC_PACKET);
            dd = dd.toString(cryptoJs.enc.Utf8);

            let result = await commands[com_parse[0]](com_parse, dd)
            res.status(200).json({...result, command:com, success: true})
        }
        else{
            res.status(200).json({data: [
                `<span class="red">Invalid Command</span>`,
                "<br/>"
            ], permanent: true, command:com, success:false, type:process.env.NEXT_PUBLIC_T_TEXTSET})
            
        }
    } else {
        res.status(200).send("Nothing to see here")
    }
}