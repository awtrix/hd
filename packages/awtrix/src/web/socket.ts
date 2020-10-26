import io from 'socket.io'
import Container from '../app/Container'

export default class Socket {
  io: io.Server

  constructor (protected container: Container) {
    this.io = io()
  }

  async start (): Promise<void> {
    io.listen(3001)
  }
}
