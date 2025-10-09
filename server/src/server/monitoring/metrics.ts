import type { NextFunction, Request, Response } from "express";
import {
  Counter,
  Gauge,
  Histogram,
  Registry,
  collectDefaultMetrics,
} from "prom-client";

const register = new Registry();
register.setDefaultLabels({ service: "std-chat-server" });

collectDefaultMetrics({
  register,
  prefix: "std_",
});

const httpRequestDuration = new Histogram({
  name: "std_http_request_duration_seconds",
  help: "Distribution des durées des requêtes HTTP en secondes.",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  registers: [register],
});

const httpRequestCounter = new Counter({
  name: "std_http_requests_total",
  help: "Nombre total de requêtes HTTP traitées.",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const socketConnectionsGauge = new Gauge({
  name: "std_socket_connections",
  help: "Nombre de connexions Socket.IO actives.",
  registers: [register],
});

let activeSocketConnections = 0;

const chatMessagesCounter = new Counter({
  name: "std_chat_messages_total",
  help: "Nombre total de messages de chat reçus.",
  registers: [register],
});

const redisConnectionGauge = new Gauge({
  name: "std_redis_connection_status",
  help: "Statut de la connexion Redis (1 = connecté, 0 = déconnecté).",
  registers: [register],
});

const normalizeRoute = (req: Request): string => {
  if (req.route?.path) {
    return req.baseUrl ? `${req.baseUrl}${req.route.path}` : req.route.path;
  }
  return req.originalUrl.split("?")[0] ?? req.path ?? "unknown_route";
};

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.path === "/metrics") {
    return next();
  }

  const timer = httpRequestDuration.startTimer();

  const recordMetrics = () => {
    const route = normalizeRoute(req);
    const labels = {
      method: req.method,
      route,
      status_code: res.statusCode.toString(),
    };

    timer(labels);
    httpRequestCounter.inc(labels);
  };

  res.on("finish", recordMetrics);
  res.on("close", () => {
    if (!res.writableEnded) {
      recordMetrics();
    }
  });

  next();
};

export const metricsHandler = async (_req: Request, res: Response) => {
  res.setHeader("Content-Type", register.contentType);
  res.setHeader("Cache-Control", "no-store");
  res.end(await register.metrics());
};

export const setRedisConnectionState = (connected: boolean) => {
  redisConnectionGauge.set(connected ? 1 : 0);
};

export const incrementActiveSockets = () => {
  activeSocketConnections += 1;
  socketConnectionsGauge.set(activeSocketConnections);
};

export const decrementActiveSockets = () => {
  activeSocketConnections = Math.max(0, activeSocketConnections - 1);
  socketConnectionsGauge.set(activeSocketConnections);
};

export const incrementChatMessageCount = () => {
  chatMessagesCounter.inc();
};

export { register };
