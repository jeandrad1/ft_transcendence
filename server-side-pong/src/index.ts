/**
 * @file index.ts
 * @brief Pong server entrypoint
 */

import fastify from "fastify";
import websocket, { SocketStream } from "@fastify/websocket";
import dotenv from "dotenv";
import { gameController, isPaused } from "./controllers/gameControllers";
import {
  getGameState,
  moveUp,
  moveDown,
  updateGame,
} from "./services/gameServices";

dotenv.config();

const app = fastify({ logger: true });

/**
 * Mapa de conexiones activas
 * Guardamos directamente el socket WebSocket real
 */
export const playerConnections = new Map<string, WebSocket>();

// Registrar plugin WS
app.register(websocket);

// Registrar rutas REST
gameController(app);

/**
 * Endpoint principal de WS
 */
app.get("/", { websocket: true }, (connection: SocketStream, req) => {
  // Log de headers completos del handshake
  console.log("Pong WS handshake headers:", req.headers);

  const playerId = req.headers["x-player-id"] as string;
  let clientId: string;

  if (!playerId) {
    // Si llega sin header → guest
    console.warn(
      "Warning: Connection received without x-player-id header → guest mode"
    );
    clientId = `guest_${Math.random().toString(36).substring(2, 9)}`;
  } else {
    clientId = playerId;
    console.log(`Player connected with x-player-id: ${clientId}`);
  }

  playerConnections.set(clientId, connection.socket);
  console.log(`Pong Service: Player ${clientId} connected.`);

  /**
   * Manejar mensajes entrantes desde el cliente
   */
  connection.socket.on("message", (message: Buffer) => {
    try {
      const msg = JSON.parse(message.toString());
      console.log(`Message received from player ${clientId}:`, msg);

      if (isPaused) return; // ignorar movimientos si el juego está pausado

      if (msg.event === "moveUp") moveUp(clientId);
      if (msg.event === "moveDown") moveDown(clientId);
    } catch (e) {
      console.error("Invalid client message:", message.toString());
    }
  });

  /**
   * Manejar desconexión
   */
  connection.socket.on("close", () => {
    console.log(`Pong Service: Player ${clientId} disconnected.`);
    playerConnections.delete(clientId);
  });
});

/**
 * Game Loop → envia el estado del juego a todos los jugadores
 */
setInterval(() => {
  if (!isPaused && playerConnections.size > 0) {
    const state = updateGame();
    const message = JSON.stringify({ event: "gameState", data: state });

    for (const ws of playerConnections.values()) {
      if (ws.readyState === ws.OPEN) {
        ws.send(message);
      }
    }
  }
}, 1000 / 60); // 60 FPS

const PORT = process.env.PORT || 3000;
app.listen({ port: Number(PORT), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Pong server (Fastify WS) running at ${address}`);
});
