const handleGetProfile = (req, res, database) => {
  database
    .select('*')
    .from('users')
    .where({ id: req.params.id })
    .then(user => {
      if(user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch(err => res.status(400).json('There is an error.'));
}

export default handleGetProfile;
