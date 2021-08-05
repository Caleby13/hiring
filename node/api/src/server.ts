import express from 'express'

const app = express()

const port = process.env.PORT || 3335

app.listen(port,()=> `Server is running on port ${port}`)