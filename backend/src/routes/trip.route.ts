import { Router } from "express";
import tripController from "../controllers/trip.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const tripRouter = Router();

tripRouter.get("/", authMiddleware, tripController.getAllTrip);
tripRouter.get("/:id", authMiddleware, tripController.getUniqueTrip);
tripRouter.post("/", authMiddleware, tripController.addTrip);
tripRouter.patch("/:id", authMiddleware, tripController.updateTrip);
tripRouter.delete("/:id", authMiddleware, tripController.deleteTrip);

export default tripRouter;
