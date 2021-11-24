// <span class='text-green-500'>6</span>

const green = (x) => `<span class='text-green-500'>${x}</span>`
const red = (x) => `<span class='text-green-500'>${x}</span>`

let quotes_list = [
    "You will not be in a place you're not suppose to.",
    `Every man suffers ${green(6)} problems to attain success. You too`,
    `The ${green("first step")} in everything is ${green("exploration")}. Nothing will bite you`,
    `My mind will not change about your ${red("authorization")}. Don't expect it to change anytime soon`,
    `There's ${green("no important secret")} command here honestly. So don't worry about that`,
    `Watch out for ${green("changes")} in the home console. Announcements may be made through that.`,
    `There are indeed small ${green("easter eggs")} in this game through secret commands.`,
    `The games are all located in the ${green("/enigma")} folder`,
    `You can also read the ${green("/dev")} folder for some insights about the developer of this game`,
    `This is the second version of this game.`,
    `There are plans of making a horror sequel for enigma. The dev just doesn't have the energy.`,
    `This was built in React + Next.JS`,
    `Unlike the first game, the dev tried to minimize the ways you can do the game 'the other way'.`,
    `For the note password game, the notes ${green("ascend from A being the lowest note to Z being the highest note")}.`,
    `For the note password game, all the passwords are ${green("exclusively letters")}`,
    `For the note Crypted game, the first thing you need to do is decode the stream of text from ${green("Base94.")}`,
    `For the note Crypted game, the second thing you need to do is to decrypt the text from ${green("AES128.")}`,
    `For the note Crypted game, the third thing is to view the string of text as an image using some method`,
    `Have you tried the '${green("progress")}' command?`,
]

let ql_len = quotes_list.length

const idx = () => Math.floor(Math.random() * ql_len)

const fetch_quote = () => {
    return quotes_list[idx()]
}

export default fetch_quote