import {Server} from 'socket.io'

class SocketService{

    private io: Server | null = null;

    initialize(io: Server){
        this.io = io;
    }

    // Send to everyone
    broadcast(event: string, data: any){
        this.io?.emit(event, data);
    }

    // Send to a particular user (all their devices)
    sendToUser(userId: string, event: string, data:any){
        this.io?.to(`user:${userId}`).emit(event, data)
    }

    // Send to a conversation
    sendToConversation(conversationId: string, event: string, data: any){
        this.io?.to(`conversation:${conversationId}`).emit(event, data);
    }

    // Send to everyone in a conversation except sender
    sendToConversationExceptSender(socketId: string, conversationId: string,
        event: string, data: any
    ){
        this.io?.to(`conversation:${conversationId}`)
            .except(socketId)
            .emit(event, data);
    }

    // Send to a particular socket connection
    sendToSocket(socketId: string, event: string, data: any){
        this.io?.to(socketId).emit(event, data);
    }
}

export default new SocketService();