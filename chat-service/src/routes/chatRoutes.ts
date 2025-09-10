import { FastifyInstance } from "fastify";
import * as chatController from "../controllers/chatController";

export async function chatRoutes(fastify: FastifyInstance) {
    // POST /conversations/:userId/messages - Enviar mensaje
    fastify.post('/conversations/:userId/messages', chatController.sendMessageController);
    
    // GET /conversations - Obtener todas las conversaciones del usuario
    fastify.get('/conversations', chatController.getConversationsController);
    
    // GET /conversations/:userId/messages - Obtener mensajes de una conversación
    fastify.get('/conversations/:userId/messages', chatController.getMessagesController);
    
    // POST /users/:userId/block - Bloquear usuario
    fastify.post('/users/:userId/block', chatController.blockUserController);
    
    // DELETE /users/:userId/block - Desbloquear usuario
    fastify.delete('/users/:userId/block', chatController.unblockUserController);
}
