const app = require('./app')
const connection = require('./db/connection')

connection
  .sync()
  .then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
  })
  .catch((err) => console.log(err))
