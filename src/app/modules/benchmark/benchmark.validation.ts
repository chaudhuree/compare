import { z } from "zod";

const createGpuBenchmark = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

const updateGpuBenchmark = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

const createGpuSubBenchmark = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    gpuBenchmarkId: z.string({
      required_error: "GPU Benchmark ID is required",
    }),
  }),
});

const updateGpuSubBenchmark = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    gpuBenchmarkId: z.string().optional(),
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
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

const updateBenchmark = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

const createBenchmarkScore = z.object({
  body: z.object({
    benchmarkId: z.string(),
    cpuId: z.string().optional(),
    score: z.number(),
  }),
});

const updateGpuBenchmarkScore = z.object({
  body: z.object({
    gpuId: z.string({
      required_error: "GPU ID is required",
    }),
    gpuSubBenchmarkId: z.string({
      required_error: "GPU Sub-Benchmark ID is required",
    }),
    score: z.number({
      required_error: "Score is required",
    }),
  }),
});

const updateBenchmarkScore = z.object({
  body: z.object({
    cpuId: z.string({
      required_error: "CPU ID is required",
    }),
    benchmarkId: z.string({
      required_error: "Benchmark ID is required",
    }),
    score: z.number({
      required_error: "Score is required",
    }),
  }),
});

export const BenchmarkValidation = {
  createGpuBenchmark,
  updateGpuBenchmark,
  createGpuSubBenchmark,
  updateGpuSubBenchmark,
  createGpuBenchmarkScore,
  createBenchmark,
  updateBenchmark,
  createBenchmarkScore,
  updateGpuBenchmarkScore,
  updateBenchmarkScore,
};
