import { API_URL, } from 'config'
import io from 'socket.io-client'
import { User, } from 'js/container'

const containers = {
  user: User,
}

const connection = io(API_URL)

connection.on('connect', () => {
  User.setState({
    socketId: connection.id,
  })
})
connection.on('authenticated', () => {
  User.closePopup()
  User.redirect()
})
connection.on('update', ({ container, path, value, }) => {
  const cntnr = containers[container]
  cntnr.set(path, value)
})

export default connection
