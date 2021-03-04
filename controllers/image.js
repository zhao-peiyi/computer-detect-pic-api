import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '0b49f43c7bb345c7b14b69292e9a7352'
});

const handlePostImageUrl = (req, res) => {
  app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input )
    .then( response => res.json(response) )
    .catch( response => res.status(400).json("There is an error.") );
};

const handlePutImage = (req, res, database) => {
  database('users')
    .where({ id: req.body.id })
    .increment( 'entries', 1)
    .returning('entries')
    .then( entries => res.json( entries[0]) )
    .catch( err => res.status(400).json('There is an error.') )
}

export { handlePostImageUrl, handlePutImage };
