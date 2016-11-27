import express from 'express'
import path from 'path'
import mustacheExpress from 'mustache-express'
import renderer from './renderer'

const app = express()

app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, '../../public')))

app.get('*', renderer)

export default app
