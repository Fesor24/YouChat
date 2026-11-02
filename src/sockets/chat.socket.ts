import { Socket, Server } from "socket.io"
import socketService from "../services/socket.service";


export const registerChatEvents = (io: Server, socket: Socket) => {
    socket.on('send_message', (data, callback) => {
        console.log('Received message:', data);

        // Broadcast to all connected clients
        //io.emit('new_message', data);

        socketService.broadcast('new_message', data);

        // Acknowledge sender
        callback?.({
            success: true,
            message: 'Message sent'
        })
    })
}