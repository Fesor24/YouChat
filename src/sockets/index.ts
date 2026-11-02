import { Server } from "socket.io"
import {Server as HttpServer} from 'http'
import { registerChatEvents } from "./chat.socket"
import socketService from "../services/socket.service"
import jwt from 'jsonwebtoken'


export const initializeSockets = (httpServer: HttpServer) =>{
    const io = new Server(httpServer, {
        cors:{
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    // Make socket.IO available throughout the application
    socketService.initialize(io);

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        console.log('Socket data', socket.data);

        registerChatEvents(io, socket);

        socket.on('disconnect', () => {
            console.log('Client disconnected: ', socket.id);
        })
    })

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;

        if(!token)
            return next(new Error("Authentication required"));

        try{
            const decoded = jwt.verify(token, process.env['JWT_SECRET']!) as {userId: string};

            console.log("This is decoded data", decoded);

            socket.data.userId = decoded.userId;

            next();
        }
        catch(err){
            next(new Error("Invalid token"));
        }
    });

    return io;
}