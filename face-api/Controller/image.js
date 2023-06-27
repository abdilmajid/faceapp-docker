const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: process.env.API_CLARIFAI
});



const handleApiCall = (req, res) => {
  // console.log(process.env.API_CLARIFAI)
  console.log("CallingAPI")
  app.models
    // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .predict(
    {
      id: 'face-detection',
      name: 'face-detection',
      version: '6dc7e46bc9124c5c8824be4822abe105',
      type: 'visual-detector',
    }, req.body.input)
    .then(data => {
      console.log(data)
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Something went Really wrong'))
}



module.exports = {
  handleImage,
  handleApiCall
}