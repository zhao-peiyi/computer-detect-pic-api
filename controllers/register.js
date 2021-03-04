const handlePostRegister = (req, res, database, bcrypt) => {
  const hash = bcrypt.hashSync(req.body.password);

  if(!req.body.name || !req.body.email || !req.body.password ) {
    return res.status(400).json('incorrect form submit');
  }

  database
    .transaction( trx => {

      return trx('login')
        .insert({
          email: req.body.email,
          hash: hash
        })
        .returning('email')
        .then(loginEmail => {

          return trx('users')
            .insert({
              email: req.body.email,
              name: req.body.name,
              joined: new Date()
            })
            .returning('*')
            .then( user => res.json(user[0]))

        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('There is an error.') );
}

export default handlePostRegister;
