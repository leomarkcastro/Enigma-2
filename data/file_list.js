
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
        ...directory("enigma", true, {
            ...directory('pick_plock', true, {
                ...file("url_to_game.txt", true, [
                    "Pick Lock <br/><br/>",
                    "The link to the game is <a class='text-green-500' href='/toothpickman'>this</a>. This will redirect you to the game<br/><br/>"
                ]),
                ...file("how_to_play.txt", true, [
                    "Like, just play the game. Some cursor rotates and you need to make it hit certain points in the lock to win.<br/><br/>",
                    "Progress bar fills as you succesfully breach a lock. Fill it completely till an alert shows that you had succesfully finished the game.<br/><br/>"
                ]),
            }),
            ...directory('do_the_shuffle', true, {
                ...file("url_to_game.txt", true, [
                    "Cards Shuffle<br/><br/>",
                    "The link to the game is <a class='text-green-500' href='/fivecentcasino'>this</a>. This will redirect you to the game<br/><br/>"
                ]),
                ...file("how_to_play.txt", true, [
                    "A deck of cards. One of them has a star. Then it will be shuffled, after shuffling, pick the right card<br/><br/>",
                    "Progress bar fills as you succesfully breach a lock. Fill it completely till an alert shows that you had succesfully finished the game.<br/><br/>"
                ]),
            }),
            ...directory('hack_hear', true, {
                ...file("url_to_game.txt", true, [
                    "Note Password <br/><br/>",
                    "The link to the game is <a class='text-green-500' href='/earsastheeye'>this</a>. This will redirect you to the game<br/><br/>"
                ]),
                ...file("how_to_play.txt", true, [
                    "Each letter in the keyboard were represented by a note in the piano. If you check the clue, it will play a series of notes directly representing the password itself. Try to guess it<br/><br/>",
                    "A good ear memory will help you greatly in this challenge. Also take notes if you can.<br/><br/>"
                ]),
            }),
            ...directory('revolut', true, {
                ...file("url_to_game.txt", true, [
                    "Orbitals<br/><br/>",
                    "The link to the game is <a class='text-green-500' href='/onefortwoback'>this</a>. This will redirect you to the game<br/><br/>"
                ]),
                ...file("how_to_play.txt", true, [
                    "Try to light all of the light in the orbs orbit.<br/><br/>",
                    "It only activates 3 adjacent orbs per click. Good luck!.<br/><br/>"
                ]),
            }),
            ...directory('advent_dux', true, {
                ...file("url_to_game.txt", true, [
                    "Atlas Venture <br/><br/>",
                    "The link to the game is <a class='text-green-500' href='/bizarreadvents'>this</a>. This will redirect you to the game<br/><br/>"
                ]),
                ...file("how_to_play.txt", true, [
                    "Try to light all of the light in the orbs orbit.<br/><br/>",
                    "It only activates 3 adjacent orbs per click. Good luck!.<br/><br/>"
                ]),
            }),
            ...directory('8e6s23as5f', true, {
                ...file("url_to_game.txt", true, [
                    "Crypted <br/><br/>",
                    "The link to the game is... nothing. The puzzle itself is a crypted text you will need to decrypt or something. Please refer to resources.txt for the puzzle itself"
                ]),
                ...file("how_to_play.txt", true, [
                    "Hmmmm... My pal said that the file is encrypted by AES128, encoded into Base64, encoded into Base94. The sequence of encryption is... I'm not sure, maybe Base64 then AES128 then Base94? or AES128 first then Base64 then Base96? Not really sure.<br/><br/>",
                    "P.s. No encryption or encoding was repeated<br/><br/>",
                    "P.s. The final product is an image<br/><br/>"
                ]),
                ...file("resources.txt", true, [
                    "File.dat<br/><br/>",
                    "<span class='text-blue-500'>Starting File: </span> Download it <a class='text-green-500' href='/file.dat'>here</a><br/><br/>",
                    "<span class='text-blue-500'>AES128 Key (Base64): </span> Download it <a class='text-green-500' href='/key.dat'>here</a><br/><br/>",
                    "<span class='text-blue-500'>AES128 Specifications:</span> ECB || 128 || x_format =&gt; base64 || (the convesion here to base64 is not included in the main procedures<br/><br/>",
                ]),
                ...file("some_tips.txt", true, [
                    "Some Tips<br/><br/>",
                    "<span class='text-blue-500'>#1</span> Base94 Enc/Dec <span class='text-green-500'>https://wtools.io/base91-encode-decode-online</span><br/><br/>",
                    "<span class='text-blue-500'>#1</span> Base64 Encode <span class='text-green-500'>https://base64.guru/converter/encode/image</span><br/><br/>",
                    "<span class='text-blue-500'>#1</span> Base64 Decode <span class='text-green-500'>https://codebeautify.org/base64-to-image-converter</span><br/><br/>",
                    "<span class='text-blue-500'>#1</span> AES128 Enc/Dec <span class='text-green-500'>https://www.devglan.com/online-tools/aes-encryption-decryption</span><br/><br/>",
                ]),
            }),
        }),
        ...directory("about", true, {
            ...directory("dev_notes", true, {
                ...file("why.txt", true, [
                    "Why the fudge you make this game series?<br/><br/>",
                    "Between you and me, I don't know too. Am I having fun doing these shizzles? NO. I mean, Yes, 60% of the time especially if the program works. But there are times that I question my life choices.<br/><br/>",
                    "Plus, I'm entirely writing this game on our midterm week. So yep, I have what you call that good sense of what to prioritize first.<br/><br/>",
                    "If you encounter some bugs in the code, well you can go fuck that bug in the ass. JK, please don't contact me. I consider all of the bugs here as 'features' and you know, you can just always restart the website.<br/><br/>",
                ]),
                ...file("tech_used.txt", true, [
                    "What did I use to build this webpage?<br/><br/>",
                    "DUH, HTML, CSS, JS.<br/><br/>",
                    "React? Like, its a framework, not really a programming language.<br/><br/>",
                    "I also used some libraries, BUT NO GAME ENGINE. YES THIS IS ALL DOM manipulation involving boxes, texts, images, sounds, links and so on.<br/><br/>",
                    "I have more ambitions for this game but men, I don't wanna touch game dev, too hassle.<br/><br/>",
                ]),
                ...file("beep.txt", true, [
                    "Beep boop bop<br/><br/>",
                    "Bop boop beeper beepy booi<br/><br/>",
                ]),
                ...file("authors_part2.txt", true, [
                    "Who wrote all of this?<br/><br/>",
                    "IT'S ALL ME. LEO MARK CASTRO. YAP. THAT'S RIGHT. ITS ALL ME BABY. I HAVE NO CLEAR DIRECTION FOR THIS GAME SO IT WAS HARD FOR ME TO RECRUIT ANYONE BECAUSE IF I INVOLVE ANYONE IN THE GAME DEV OF THIS, THEN THINGS WONT BE AS FLEXIBLE AND FAST.<br/><br/>",
                    "AND WE'RE ALL UNMOTIVATED AT THIS POINT SO I DON'T REALLY THINK I CAN CONVINCE ANYONE TO JOIN ME IN THE DEV OF THIS.<br/><br/>",
                    "P.S if you're intersted in the development of such website/or games like this in the future. Feel free to contact me so that I have reasons to contact you in the future<br/><br/>",
                    "(What to do when I'm interested?) Just PM me this screenshot and *wink* at me.<br/><br/>",
                ]),
            }),
            ...file("how_to_play.txt", true, [
                "How to play this game?<br/><br/>",
                "Explore the whole file system. Initiate commands. Play games, unlock progress. Solve puzzles. Decrypt encrypted message.<br/><br/>",
            ]),
            ...file("authors.txt", true, [
                "Who wrote all of this?<br/><br/>",
                "Leo Mark Castro. Currently BS-CpE 4A of 2021<br/><br/>",
                "And also the ICPEP.SE BulSU org for giving me an opportunity to do this. Woohoo.<br/><br/>",
            ]),
            
        }),
        ...dummyDirectories(
            ["node_mods", "answers_to_all_questions","this_folder_has_nothing", "windows_f_you"]
        ),
        ...file("icpep.txt", true, [
            "ICPEP."
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
    let total_path = ""
    let al

    if (!address) return {request: address, parsed_req: address_list, success:false, message:"Provide a path of file to read", data: false, path:total_path}

    if ((address[0] == "/")) address = address.substring(1)
    address_list = address.split("/")
    
    
    

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