import express from "express";
import { BenchmarkController } from "./benchmark.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BenchmarkValidation } from "./benchmark.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

// GPU Benchmark Routes - create benchmark,get all benchmarks, get benchmark by id, update benchmark, delete benchmark
router.post(
  "/gpu-benchmarks",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createGpuBenchmark),
  BenchmarkController.createGpuBenchmark
);

router.get("/gpu-benchmarks", BenchmarkController.getAllGpuBenchmarks);
router.get("/gpu-benchmarks/:id", BenchmarkController.getGpuBenchmarkById);
router.patch(
  "/gpu-benchmarks/:id",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.updateGpuBenchmark),
  BenchmarkController.updateGpuBenchmark
);
router.delete(
  "/gpu-benchmarks/:id",
  auth("ADMIN"),
  BenchmarkController.deleteGpuBenchmark
);

// GPU Sub-Benchmark Routes - create sub-benchmark,get all sub-benchmarks, get sub-benchmark by id, update sub-benchmark, delete sub-benchmark
router.post(
  "/gpu-sub-benchmarks",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createGpuSubBenchmark),
  BenchmarkController.createGpuSubBenchmark
);

router.get("/gpu-sub-benchmarks", BenchmarkController.getAllGpuSubBenchmarks);
router.get("/gpu-sub-benchmarks/:id", BenchmarkController.getGpuSubBenchmarkById);
router.patch(
  "/gpu-sub-benchmarks/:id",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.updateGpuSubBenchmark),
  BenchmarkController.updateGpuSubBenchmark
);
router.delete(
  "/gpu-sub-benchmarks/:id",
  auth("ADMIN"),
  BenchmarkController.deleteGpuSubBenchmark
);

// GPU Benchmark Score Routes
router.post(
  "/gpu-benchmark-scores",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createGpuBenchmarkScore),
  BenchmarkController.createGpuBenchmarkScore
);

router.get("/gpu-benchmark-scores/:gpuId", BenchmarkController.getGpuBenchmarkScores);
router.patch(
  "/gpu-benchmark-scores",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.updateGpuBenchmarkScore),
  BenchmarkController.updateGpuBenchmarkScore
);

// General Benchmark Routes
router.post(
  "/add-benchmark",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createBenchmark),
  BenchmarkController.createBenchmark
);

router.get("/allbenchmarks", BenchmarkController.getAllBenchmarks);
router.get("/benchmark/:id", BenchmarkController.getBenchmarkById);
router.patch(
  "/benchmark/:id",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.updateBenchmark),
  BenchmarkController.updateBenchmark
);
router.delete(
  "/benchmark/:id",
  auth("ADMIN"),
  BenchmarkController.deleteBenchmark
);

// Benchmark Score Routes
router.post(
  "/benchmark-scores",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.createBenchmarkScore),
  BenchmarkController.createBenchmarkScore
);

router.get("/benchmark-scores/:benchmarkId", BenchmarkController.getBenchmarkScores);
router.patch(
  "/benchmark-scores",
  auth("ADMIN"),
  validateRequest(BenchmarkValidation.updateBenchmarkScore),
  BenchmarkController.updateBenchmarkScore
);

export const BenchmarkRoutes = router;
