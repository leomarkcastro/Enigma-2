import cryptoJs from "crypto-js";

let answers = [
    { answer: "abc",
      key: [ // Level 1
        "KeyA",
        "KeyB",
        "KeyC",
      ]
    },
    { answer: "ceg",
      key: [ // Level 2
        "KeyC",
        "KeyE",
        "KeyG",
      ]
    },
    { answer: "zyx",
      key: [ // Level 3
        "KeyZ",
        "KeyY",
        "KeyX",
      ]
    },
    { answer: "xvt",
      key: [ // Level 4
        "KeyX",
        "KeyV",
        "KeyT",
      ]
    },
    { answer: "cpe",
      key: [ // Level 4
        "KeyC",
        "KeyP",
        "KeyE",
      ]
    },
    { answer: "test",
      key: [ // Level 4
        "KeyT",
        "KeyE",
        "KeyS",
        "KeyT",
      ]
    },
    { answer: "enigma",
      key: [ // Level 4
        "KeyE",
        "KeyN",
        "KeyI",
        "KeyG",
        "KeyM",
        "KeyA",
      ]
    },
    { answer: "iloveyou",
      key: [ // Level 4
        "KeyI",
        "KeyL",
        "KeyO",
        "KeyV",
        "KeyE",
        "KeyY",
        "KeyO",
        "KeyU",
      ]
    },
    { answer: "loveyoutoo",
      key: [ // Level 4
        "KeyL",
        "KeyO",
        "KeyV",
        "KeyE",
        "KeyY",
        "KeyO",
        "KeyU",
        "KeyT",
        "KeyO",
        "KeyO",
      ]
    },
  ]

export default async function handler(req, res) {

    let body = cryptoJs.AES.encrypt(JSON.stringify(answers), process.env.NEXT_PUBLIC_PACKET);
    body = body.toString();
    
    res.status(200).json({data: body})

}