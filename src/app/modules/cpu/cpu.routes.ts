import express from "express";
import { CpuController } from "./cpu.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CpuValidation } from "./cpu.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-cpu",
  auth("ADMIN"),
  validateRequest(CpuValidation.createCpu),
  CpuController.createCpu
);

router.get("/", CpuController.getAllCpus);
router.get("/:id", CpuController.getCpuById);

router.patch(
  "/:id",
  auth("ADMIN"),
  validateRequest(CpuValidation.updateCpu),
  CpuController.updateCpu
);

router.delete("/:id", auth("ADMIN"), CpuController.deleteCpu);

export const CpuRoutes = router;
