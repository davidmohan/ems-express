const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

const { EmsRouter } = require('./router/router.ems')

/* Setup */
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
dotenv.config()

/* Listening */
app.listen(process.env.PORT, () => {
	console.log(`http://localhost${process.env.PORT}`)
})

app.use('/ems', EmsRouter)