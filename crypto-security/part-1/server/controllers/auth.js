const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(`user is sending ${req.body} to us `)

      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        
        let matched = bcrypt.compareSync(password, users[i].password)
        if (users[i].username === username && matched) {
          let sendBack = users[i]
          delete sendBack.password
          
          res.status(200).send(sendBack)
          console.log(sendBack)
          return
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        let { password } = req.body
        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password, salt)
        console.log(passHash)
        req.body.password = passHash
        console.log(req.bodyPassword)

        users.push(req.body)
        res.status(200).send(req.body)
        console.log(req.body)
    }
}