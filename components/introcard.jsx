
import GlitchedWriter, {
	wait,
	presets,
} from 'glitched-writer'
import { useEffect, useState } from 'react'

export default function IntroCard({title, comment, proceedFunction}){

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        glitchIntro();
    }, [])

    async function glitchIntro(){
        let Writer = new GlitchedWriter("#card_intro1", {
            html: true
        });
        let Writer2 = new GlitchedWriter("#card_intro2", {
            html: true
        });

        Writer.write(title)
        Writer2.write(comment)
        await wait(3000);
        setShowButton(true)
    }

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">
            <h1 className='text-9xl mb-10 text-center' id="card_intro1"></h1>
            <p className='mb-10' id="card_intro2"></p>
            {showButton && <button className='px-10 py-5 rounded-lg border hover:bg-gray-400 hover:text-black' onClick={proceedFunction}>Play Game</button>}
        </div>
    )
}