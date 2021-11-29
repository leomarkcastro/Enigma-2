import cryptoJs from "crypto-js";
import {check_start_date} from "../../data/gamestart";

let locs = {
  maltco: [
    "Located near a blue car",
    "Steff ____ Polser",
    "https://www.google.com/maps/embed?pb=!4v1637667479990!6m8!1m7!1sG-TdF7yBN8rUFP5laZyEgg!2m2!1d55.63921303773563!2d12.49766279479356!3f217.9040711956228!4f-3.6982645132051886!5f0.7820865974627469",
  ],

  houlberg: [
    "A beautiful park",
    "What was it's name?(no space)",
    "https://www.google.com/maps/embed?pb=!4v1637667813090!6m8!1m7!1sCAoSLEFGMVFpcFBjNDBSUmlWQy1YZDBTUVFnVzVvN2RBVWJTOGkzRzhBbHNfNThC!2m2!1d44.1349362427341!2d15.65372362081422!3f68.3598305200581!4f-21.982265799127475!5f0.7820865974627469",
  ],

  izvorrijekebijele: [
    "I wanna book Warren Taylor",
    "What was their number? (no space)",
    "https://www.google.com/maps/embed?pb=!4v1637668075693!6m8!1m7!1s2e9NLVezWFkGZ3k7PxIXOw!2m2!1d-28.76183819228612!2d114.6154900943162!3f250.6082742280071!4f-0.7460412698086287!5f0.7820865974627469",
  ],

  99359444: [
    "I wanna buy some rayban",
    "On what store can i get this?",
    "https://www.google.com/maps/embed?pb=!4v1637668295363!6m8!1m7!1sBaBE-H-4rpQU_fos-YVc8A!2m2!1d50.63553937244919!2d4.783638111816203!3f50.41108381801479!4f-9.800131451744448!5f0.7820865974627469",
  ],

  alainafflelou: [
    "Another beautiful waterfall",
    "What was the name of the stream? (no space)",
    "https://www.google.com/maps/embed?pb=!4v1637668482083!6m8!1m7!1sCAoSLEFGMVFpcFBrekRpWC05cXZkdWhYbndwSlotSy1XMTZJYnd6U25vMmxVZHFE!2m2!1d-36.33693828075211!2d-71.40690531581635!3f44.5181730193726!4f1.130065220320148!5f0.7820865974627469",
  ],

  esteromollin: [
    "What's the name of the bar located in the same place? (no space)",
    "Go to their website, gallery, and find it",
    "https://www.google.com/maps/embed?pb=!4v1637668647583!6m8!1m7!1sCAoSLEFGMVFpcFBZMmJzT2ZLYW5hS0pkVVlwQjUxVzFMeTBTSUJxUEljczdCVXdy!2m2!1d-35.2495827!2d-59.2236518!3f301.0891445918056!4f5.6564054755147595!5f0.7820865974627469",
  ],

  lacaballeriza: [
    "Nice Job!",
    "Upon Reaching Here. Your Finish!",
    "https://www.youtube.com/embed/dQw4w9WgXcQ?&autoplay=1&mute=1&enablejsapi=1",
  ],
};

export default async function handler(req, res) {
  if (!check_start_date())
    return res
      .status(200)
      .json({
        data: [
          `<span class="red">Server Database Error</span>`,
          `<span class="red">Database not Open</span>`,
          "<br/>",
        ],
      });

  let body = cryptoJs.AES.encrypt(
    JSON.stringify(locs),
    process.env.NEXT_PUBLIC_PACKET
  );
  body = body.toString();

  res.status(200).json({ data: body });
}
