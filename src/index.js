const app = require('./app')
const connection = require('./db/connection')

connection
  .sync()
  .then(() => {
    app.listen(8123, () => console.log('Servidor rodando na porta 8123'))
  })
  .catch((err) => console.log(err))
