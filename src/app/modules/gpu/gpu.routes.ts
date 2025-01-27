import express from "express";
import { GpuController } from "./gpu.controller";
import validateRequest from "../../middlewares/validateRequest";
import { GpuValidation } from "./gpu.validation";
import auth from "../../middlewares/auth";


const router = express.Router();

router.post(
  "/create-gpu",
  auth("ADMIN"),
  validateRequest(GpuValidation.createGpu),
  GpuController.createGpu
);

router.get("/", GpuController.getAllGpus);
router.get("/:id", GpuController.getGpuById);

router.patch(
  "/:id",
  auth("ADMIN"),
  validateRequest(GpuValidation.updateGpu),
  GpuController.updateGpu
);

router.delete(
  "/:id",
  auth("ADMIN"),
  GpuController.deleteGpu
);

router.post(
  "/:id/benchmark-scores",
  auth(),
  validateRequest(GpuValidation.setBenchmarkScores),
  GpuController.setBenchmarkScores
);

export const GpuRoutes = router;
