import {Howl, Howler} from 'howler';

// Setup the new Howl.

const soundList = {
    "scream": new Howl({
        src: ['./sounds/scare.mp3']
    }),
    "anomaly": new Howl({
        src: ['./sounds/anomaly.mp3']
    }),
    "success": new Howl({
        src: ['./sounds/success.mp3']
    }),
    "s_success":  new Howl({
        src: ['./sounds/short_success.wav'],
        volume: 0.15
    }),
    "l_success":  new Howl({
        src: ['./sounds/long_success.wav'],
        volume: 0.15
    }),
    "beep1":  new Howl({
        src: ['./sounds/beep1.wav'],
        volume: 0.15
    }),
    "beep2":  new Howl({
        src: ['./sounds/beep2.wav'],
        volume: 0.15
    }),
    "beep3":  new Howl({
        src: ['./sounds/beep3.wav'],
        volume: 0.15
    }),
    "stab":  new Howl({
        src: ['./sounds/stab.wav'],
        volume: 0.15
    }),
    "wrong":  new Howl({
        src: ['./sounds/wrong.wav'],
        volume: 0.15
    }),
}

export default soundList