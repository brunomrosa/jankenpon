import express from 'express'
import cors from 'cors'
import {Server} from 'socket.io'
const app = express()
const port = 3333

app.use(cors());
app.options('*', cors());

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})


const io = new Server(server, {cors: {
  origin: '*',
}})

app.get('/', (req, res) => {
  res.send('Hello World!')
})




io.on('connection', (socket) => {
  console.log('a user connected');
});