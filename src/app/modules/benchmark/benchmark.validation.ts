import { z } from "zod";
import { ProductType } from "@prisma/client";

const createGpuBenchmarkZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

const updateGpuBenchmarkZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

const createGpuSubBenchmarkZodSchema = z.object({
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

const updateGpuSubBenchmarkZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    gpuBenchmarkId: z.string().optional(),
  }),
});

const createGpuBenchmarkScoreZodSchema = z.object({
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

const createBenchmarkZodSchema = z.object({
  params: z.object({
    productType: z.nativeEnum(ProductType),
  }),
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

const updateBenchmarkZodSchema = z.object({
  params: z.object({
    productType: z.nativeEnum(ProductType),
    id: z.string(),
  }),
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

const getBenchmarksByProductTypeZodSchema = z.object({
  params: z.object({
    productType: z.nativeEnum(ProductType),
  }),
});

const createBenchmarkScoreZodSchema = z.object({
  params: z.object({
    productType: z.nativeEnum(ProductType),
    productId: z.string(),
  }),
  body: z.object({
    benchmarkId: z.string(),
    score: z.number(),
  }),
});

const createBulkBenchmarkScoreZodSchema = z.object({
  params: z.object({
    productType: z.nativeEnum(ProductType),
    productId: z.string(),
  }),
  body: z.array(z.object({
    benchmarkId: z.string(),
    score: z.number(),
  })).min(1, { message: "At least one benchmark score is required" }),
});

export const BenchmarkValidation = {
  createGpuBenchmarkZodSchema,
  updateGpuBenchmarkZodSchema,
  createGpuSubBenchmarkZodSchema,
  updateGpuSubBenchmarkZodSchema,
  createGpuBenchmarkScoreZodSchema,
  createBenchmarkZodSchema,
  updateBenchmarkZodSchema,
  getBenchmarksByProductTypeZodSchema,
  createBenchmarkScoreZodSchema,
  createBulkBenchmarkScoreZodSchema,
};
