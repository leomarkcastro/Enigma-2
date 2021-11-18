// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  
  if (req.method === 'POST') {
    res.status(200).json({data: "Split Boi"})
  } else {
    res.status(200).send("Nothing to see here")
  }
}
