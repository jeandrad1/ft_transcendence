import { FastifyInstance } from "fastify";
import proxy from "@fastify/http-proxy";

export default async function pongRoutes(fastify: FastifyInstance) {
  fastify.log.info("antes de pongRoutes");

  // Proxy para WebSockets
  fastify.register(proxy, {
    upstream: "http://pong-service:3000",
    prefix: "/ws/pong",
    ws: true,
    rewritePrefix: "/",
    async preHandler(req, reply) {
      if (req.user) {
        const playerId = String(req.user.id);
        req.headers["x-player-id"] = playerId;
        fastify.log.info(`[Gateway upgrade] preHandler set x-player-id: ${playerId}`);
      }
    },
    onProxyReqWs: (proxyReq, req, socket, options, head) => {
      if (!options.headers) options.headers = {};
      const playerId = req.headers["x-player-id"];
      if (playerId) {
        options.headers["x-player-id"] = playerId as string;
        fastify.log.info(`[Gateway upgrade] injected x-player-id=${playerId}`);
      } else {
        fastify.log.warn("[Gateway upgrade] no x-player-id found, injecting guest mode");
      }
    },
  });

  // Proxy para rutas REST (/game/init, /game/resume, etc.)
  fastify.register(proxy, {
    upstream: "http://pong-service:3000",
    prefix: "/game",
    rewritePrefix: "/game",
    async preHandler(req, reply) {
      if (req.user) {
        const playerId = String(req.user.id);
        req.headers["x-player-id"] = playerId;
        fastify.log.info(`[Gateway REST] set x-player-id=${playerId}`);
      }
    },
  });

  fastify.log.info("despues de pongRoutes");
}
