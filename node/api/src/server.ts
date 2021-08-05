import { app } from './app'
import { env } from './config/env'

const apiPort = env.port

app.listen(apiPort, () => console.log(`Server is running on port ${apiPort}`))
