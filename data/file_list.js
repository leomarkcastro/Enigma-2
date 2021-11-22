
function directory(
    name,
    access,
    content
){
    return { [name] : {
        type: "dir",
        access,
        name,
        content
    }}
}

function file(
    name,
    access,
    content
){
    return { [name] : {
        type: "file",
        access,
        name,
        content
    }}
}

function dummyDirectories(names){
    let _ret = {}

    for(let _n in names){
        let n = names[_n]
        _ret[n] = directory(n, false, [])[n]
    }

    return _ret
}

const root = directory(
    "root",
    true,
    {
        ...directory("sys", true, {
            ...directory('level0', true, {
                ...directory('dev', true, {
                    ...dummyDirectories(["vi", "notes", "lmdc", "pcag", "blstuv", "krst", "rhqh", "rjm"]),
                    ...file("gypsy.txt", true, ["Gypsy Hoodlum Build 0.4.12beta. October 20, 1998"]),
                    ...file("system_guide.txt", true, [
                        "System Guide<br/>",
                        "This is a note I written in case some mess up happens in this server. Again, this server SHOULD be working fine and I can't imagine it breaking again after those hardships I had done just to reach this point",
                        "For that, I still made an emergency switch feature in this system that you could run to fix it ONLY if you can prove that the system is really do broken.",
                        `The command to call the instance of this is through calling a secret command called <span class="text-yellow-400">gl_sys_check</span> (which stands for Global System Check)`,
                        `<br/> Best regards, the dev`,
                    ]),
                }),
                ...directory('framework', true, {
                    ...dummyDirectories(["infra", "demen", "strap", "apals", "lbrto", "enz", "lch", "mgz"]),
                    ...file("logs.txt", true, ["&lt;&gt;"]),
                }),
                ...dummyDirectories(["kernel", "intrip", "rpc", "security", "foisk", "libcrash", "swapon", "obj"]),
                ...file("note.txt", true, ["The server SHOULD be working properly and is free of bugs. Else , feel free to visit dev/system_guide.txt to read documentation."]),
            }),
            ...dummyDirectories(
                [1,2,'x','u'].map(e => `level${e}`)
            )
        }),
        ...dummyDirectories(
            ["bin", "boot", "usr", "var", "sbin", "tmp", "lib", "home", "mnt", "opt"]
        ),
        ...file("institute.txt", true, [
            "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
            "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.",
            "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line."
        ]),
    }
).root

function getDirectory(address){

    let address_list

    if (address){
        if ((address[0] == "/")) address = address.substring(1)
        address_list = address.split("/")
    }
    
    let total_path = ""
    let al

    let current_dir = root

    if ((!address) || (address && address.trim() == "")){
        return {request: address, parsed_req: address_list, success:true, message:"Succesful Navigation", data: current_dir, path:total_path}
    }
    

    
    for (let _al in address_list){
        if (_al) {

            al = address_list[_al]

            if (!(al in current_dir.content)) return {request: address, parsed_req: address_list, success:false, message:"Directory Does Not Exist", data: false, path:total_path}

            if ((current_dir.content[al].type !== "dir")) return {request: address, parsed_req: address_list, success:false, message:"Directory Does Not Exist [target location is a file]", data: false, path:total_path}

            if (!current_dir.content[al].access) return {request: address, parsed_req: address_list, success:false, message:"Access to folder not within authorization", data: false, path:total_path}

            current_dir = current_dir.content[al]
            total_path += `/${al}`
                
        }
        
    }

    return {request: address, parsed_req: address_list, success:true, message:"Succesful Navigation", data: current_dir, path:total_path}
}

function getFile(address){

    let address_list

    if (address){
        if ((address[0] == "/")) address = address.substring(1)
        address_list = address.split("/")
    }
    
    let total_path = ""
    let al

    let current_dir = root

    if ((!address) || (address && address.trim() == "")){
        return {request: address, parsed_req: address_list, success:true, message:"Succesful Navigation", data: current_dir, path:total_path}
    }
    
    let fileName = address_list.pop()
    
    for (let _al in address_list){
        if (_al) {

            al = address_list[_al]

            if (!(al in current_dir.content)) return {request: address, parsed_req: address_list, success:false, message:"Directory Does Not Exist", data: false, path:total_path}

            if ((current_dir.content[al].type !== "dir")) return {request: address, parsed_req: address_list, success:false, message:"Directory Does Not Exist [target location is a file]", data: false, path:total_path}

            if (!current_dir.content[al].access) return {request: address, parsed_req: address_list, success:false, message:"Access to folder not within authorization", data: false, path:total_path}

            current_dir = current_dir.content[al]
            total_path += `/${al}`
                
        }
        
    }


    if (fileName) {

        if (!(fileName in current_dir.content)) return {request: address, parsed_req: address_list, success:false, message:"File Does Not Exist", data: false, path:total_path}

        if ((current_dir.content[fileName].type !== "file")) return {request: address, parsed_req: address_list, success:false, message:"Provided path is not a file!", data: false, path:total_path}

        if (!current_dir.content[fileName].access) return {request: address, parsed_req: address_list, success:false, message:"Access to file not within authorization", data: false, path:total_path}

        current_dir = current_dir.content[fileName]
        total_path += `/${fileName}`
            
    }

    return {request: address, parsed_req: address_list, success:true, message:"Succesful Navigation", data: current_dir, path:total_path}
}

export { root, getDirectory, getFile }