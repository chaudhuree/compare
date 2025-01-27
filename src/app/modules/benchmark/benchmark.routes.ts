import express from "express";
import { BenchmarkController } from "./benchmark.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BenchmarkValidation } from "./benchmark.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

// GPU Benchmark Routes
router.post(
  "/gpu-benchmarks",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createGpuBenchmark),
  BenchmarkController.createGpuBenchmark
);

router.get("/gpu-benchmarks", BenchmarkController.getAllGpuBenchmarks);
router.get("/gpu-benchmarks/:id", BenchmarkController.getGpuBenchmarkById);

// GPU Sub-Benchmark Routes
router.post(
  "/gpu-sub-benchmarks",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createGpuSubBenchmark),
  BenchmarkController.createGpuSubBenchmark
);

router.get("/gpu-sub-benchmarks", BenchmarkController.getAllGpuSubBenchmarks);
router.get("/gpu-sub-benchmarks/:id", BenchmarkController.getGpuSubBenchmarkById);

// GPU Benchmark Score Routes
router.post(
  "/gpu-benchmark-scores",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createGpuBenchmarkScore),
  BenchmarkController.createGpuBenchmarkScore
);

router.get("/gpu-benchmark-scores/:gpuId", BenchmarkController.getGpuBenchmarkScores);

// General Benchmark Routes
router.post(
  "/benchmarks",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createBenchmark),
  BenchmarkController.createBenchmark
);

router.get("/benchmarks", BenchmarkController.getAllBenchmarks);
router.get("/benchmarks/:id", BenchmarkController.getBenchmarkById);

// Benchmark Score Routes
router.post(
  "/benchmark-scores",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createBenchmarkScore),
  BenchmarkController.createBenchmarkScore
);

router.get("/benchmark-scores/:benchmarkId", BenchmarkController.getBenchmarkScores);

export const BenchmarkRoutes = router;
