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
    `This console is haunted. Type '${green("boop")}'`,
    `This console is haunted. Type '${green("beep")}'`,
    `This console is haunted. Type '${green("badaboop")}'`,
    `Go on, you can check the source code of this game.`,
    `Go on, you can try to directly communicate with the server.`,
    `Please don't rain the server with request. If you will, fuck you.`,
    `I still hate how I designed this game.`,
    `Enigma 2 should had been about some detective doing some detective stuffs on computer, but I lack energy and resources.`,
    `This game lack lore, I don't have the writing skill to do one.`,
    `The dev(s) are interested to recruit people interested in developing such games like this.`,
    `The dev(s) are interested to recruit people interested in developing such websites like this.`,
    `This game took a week to finish.`,
    `This game is paranoid about cheating counter-measures. But you can try to beat it.`,
    `When you put something, you can pull something.`,
    `Don't joke with people who just awoken.`,
    `Stones on the sky, those who've been hit don't cry.`,
    `Are you smarter than a grade 5?`,
    `Ara~ Ara~`,
    `Yameteeee~`,
    `Ore wa ochinchin ga daisuki nandayo`,
    `BBM for president`,
    `Bong Go for president`,
    `Leni for president`,
    `Rastaman for president`,
    `Pacquiao for president`,
    `Isko for president`,
    `Kaleody for president`,
    `Tanginang pagmumuka yan`,
    `Million rouns around the wooold!`,
    `GUSTO KO SABAAAAW`,
    `C-c-creePAH.... AWW MAAAN`,
    `Tangina magsisali kasi kayo sa contest`,
    `Sigeeee, grind pa ng axie`,
    `Us2 k n mmty`,
]

let ql_len = quotes_list.length

const idx = () => Math.floor(Math.random() * ql_len)

const fetch_quote = () => {
    return quotes_list[idx()]
}

export default fetch_quote