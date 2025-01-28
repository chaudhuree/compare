import express from "express";
import { BenchmarkController } from "./benchmark.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BenchmarkValidation } from "./benchmark.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

// GPU Benchmark Routes
router.post(
  "/gpu-benchmarks/create",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createGpuBenchmarkZodSchema),
  BenchmarkController.createGpuBenchmark
);

router.get("/gpu-benchmarks", BenchmarkController.getAllGpuBenchmarks);

router.get("/gpu-benchmarks/:id", BenchmarkController.getGpuBenchmarkById);

router.patch(
  "/gpu-benchmarks/:id",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.updateGpuBenchmarkZodSchema),
  BenchmarkController.updateGpuBenchmark
);

router.delete(
  "/gpu-benchmarks/:id",
  auth("ADMIN"),
  BenchmarkController.deleteGpuBenchmark
);

// GPU Sub-Benchmark Routes
router.post(
  "/gpu-sub-benchmarks/create",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createGpuSubBenchmarkZodSchema),
  BenchmarkController.createGpuSubBenchmark
);

router.get("/gpu-sub-benchmarks", BenchmarkController.getAllGpuSubBenchmarks);

router.get(
  "/gpu-sub-benchmarks/:id",
  BenchmarkController.getGpuSubBenchmarkById
);

router.patch(
  "/gpu-sub-benchmarks/:id",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.updateGpuSubBenchmarkZodSchema),
  BenchmarkController.updateGpuSubBenchmark
);

router.delete(
  "/gpu-sub-benchmarks/:id",
  auth("ADMIN"),
  BenchmarkController.deleteGpuSubBenchmark
);

// GPU Benchmark Score Routes
router.post(
  "/gpu-benchmark-scores/create",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createGpuBenchmarkScoreZodSchema),
  BenchmarkController.createGpuBenchmarkScore
);

router.get("/gpu-benchmark-scores/:gpuId", BenchmarkController.getGpuBenchmarkScores);

// General Benchmark Routes - Order matters! More specific routes first
router.get(
  "/:productType/list",
  validateRequest(BenchmarkValidation.getBenchmarksByProductTypeZodSchema),
  BenchmarkController.getBenchmarksByProductType
);
// add a product benchmark score
router.post(
  "/:productType/scores/:productId",
  validateRequest(BenchmarkValidation.createBenchmarkScoreZodSchema),
  BenchmarkController.createOrUpdateBenchmarkScore
);

// Bulk add or update product benchmark scores
router.post(
  "/:productType/bulk-scores/:productId",
  validateRequest(BenchmarkValidation.createBulkBenchmarkScoreZodSchema),
  BenchmarkController.createOrUpdateBulkBenchmarkScores
);

router.get("/:productType/scores/:benchmarkId", BenchmarkController.getBenchmarkScores);

router.post(
  "/:productType/create",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createBenchmarkZodSchema),
  BenchmarkController.createBenchmark
);

router.get("/:productType", BenchmarkController.getAllBenchmarks);

router.get("/:productType/:id", BenchmarkController.getBenchmarkById);

router.patch(
  "/:productType/:id",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.updateBenchmarkZodSchema),
  BenchmarkController.updateBenchmark
);

router.delete(
  "/:productType/:id",
  auth("ADMIN"),
  BenchmarkController.deleteBenchmark
);

export const BenchmarkRoutes = router;
