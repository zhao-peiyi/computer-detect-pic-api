const handlePostSigin = (req, res, database, bcrypt) =>{

  if(!req.body.email || !req.body.password ) {
    return res.status(400).json('incorrect form submit');
  }

  database
    .select('hash')
    .from('login')
    .where({ email: req.body.email })
    .then( data => {
      if( bcrypt.compareSync(req.body.password, data[0].hash) ) {
        database
          .select('*')
          .from('users')
          .where({ email: req.body.email })
          .then( user => res.json(user[0]))
      } else {
        res.status(400).json("wrong password");
      }
    })
    .catch(err => res.status(400).json("fail"));
};

export default handlePostSigin;
