
const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    // console.log(email,password)
    if (!email || !password) {
      return res.status(400).json('incorrect form submission');
    }
    db.select('email','hash').from('login')
      .where('email', '=', email)
      .then(data=>{
        const isValid = bcrypt.compareSync(password, data[0].hash);
        // console.log(isValid)
        if(isValid){
          return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('Something Went Wrong'))
        } else {
          res.status(400).json('Wrong Email/Password')
        }
      })
      .catch(err => res.status(400).json('Wrong Email/Password'))
    }

  
  module.exports = {
    handleSignIn: handleSignIn
  }