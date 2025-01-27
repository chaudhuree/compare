import { z } from "zod";

const createGpuBenchmark = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

const createGpuSubBenchmark = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    gpuBenchmarkId: z.string(),
  }),
});

const createGpuBenchmarkScore = z.object({
  body: z.object({
    gpuId: z.string(),
    gpuSubBenchmarkId: z.string(),
    score: z.number(),
  }),
});

const createBenchmark = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

const createBenchmarkScore = z.object({
  body: z.object({
    benchmarkId: z.string(),
    cpuId: z.string().optional(),
    score: z.number(),
  }),
});

export const BenchmarkValidation = {
  createGpuBenchmark,
  createGpuSubBenchmark,
  createGpuBenchmarkScore,
  createBenchmark,
  createBenchmarkScore,
};
