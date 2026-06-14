import { Router } from "express";
import eventController from "../controllers/event.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const eventRouter = Router();

eventRouter.get("/trips/:tripId/events", authMiddleware, eventController.getAllEvent);
eventRouter.get(
  "/trips/:tripId/events/exchange-rate-preview",
  authMiddleware,
  eventController.getExchangeRatePreview,
);
eventRouter.post("/trips/:tripId/events", authMiddleware, eventController.addEvent);
eventRouter.patch("/events/:id", authMiddleware, eventController.updateEvent);
eventRouter.delete("/events/:id", authMiddleware, eventController.deleteEvent);

export default eventRouter;
