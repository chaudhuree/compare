import { Prisma, ProductType } from "@prisma/client";
import prisma from "../../utils/prisma";
import {
  IBenchmark,
  IBenchmarkResponse,
  IBenchmarkScore,
  IBenchmarkScoreResponse,
  IGpuBenchmark,
  IGpuBenchmarkResponse,
  IGpuBenchmarkScore,
  IGpuBenchmarkScoreResponse,
  IGpuSubBenchmark,
  IGpuSubBenchmarkResponse,
} from "./benchmark.interface";

// GPU Benchmark Services
const createGpuBenchmark = async (payload: IGpuBenchmark): Promise<IGpuBenchmarkResponse> => {
  const result = await prisma.gpuBenchmark.create({
    data: payload,
    include: {
      gpuSubBenchmarks: {
        include: {
          gpuBenchmark: true,
        },
      },
    },
  });
  return result as IGpuBenchmarkResponse;
};

const getAllGpuBenchmarks = async (): Promise<IGpuBenchmarkResponse[]> => {
  const result = await prisma.gpuBenchmark.findMany({
    include: {
      gpuSubBenchmarks: {
        include: {
          gpuBenchmark: true,
        },
      },
    },
  });
  return result as IGpuBenchmarkResponse[];
};

const getGpuBenchmarkById = async (id: string): Promise<IGpuBenchmarkResponse | null> => {
  const result = await prisma.gpuBenchmark.findUnique({
    where: {
      id,
    },
    include: {
      gpuSubBenchmarks: {
        include: {
          gpuBenchmark: true,
        },
      },
    },
  });
  return result as IGpuBenchmarkResponse | null;
};

const updateGpuBenchmark = async (
  id: string,
  payload: Partial<IGpuBenchmark>
): Promise<IGpuBenchmarkResponse> => {
  const result = await prisma.gpuBenchmark.update({
    where: {
      id,
    },
    data: payload,
    include: {
      gpuSubBenchmarks: {
        include: {
          gpuBenchmark: true,
        },
      },
    },
  });
  return result as IGpuBenchmarkResponse;
};

const deleteGpuBenchmark = async (id: string): Promise<IGpuBenchmarkResponse> => {
  // Delete all sub-benchmarks first
  await prisma.gpuSubBenchmark.deleteMany({
    where: {
      gpuBenchmarkId: id,
    },
  });

  // Then delete the benchmark
  const result = await prisma.gpuBenchmark.delete({
    where: {
      id,
    },
    include: {
      gpuSubBenchmarks: {
        include: {
          gpuBenchmark: true,
        },
      },
    },
  });
  return result as IGpuBenchmarkResponse;
};

// GPU Sub-Benchmark Services
const createGpuSubBenchmark = async (payload: IGpuSubBenchmark): Promise<IGpuSubBenchmarkResponse> => {
  const result = await prisma.gpuSubBenchmark.create({
    data: payload,
    include: {
      gpuBenchmark: true,
    },
  });
  return result as IGpuSubBenchmarkResponse;
};

const getAllGpuSubBenchmarks = async (): Promise<IGpuSubBenchmarkResponse[]> => {
  const result = await prisma.gpuSubBenchmark.findMany({
    include: {
      gpuBenchmark: true,
    },
  });
  return result as IGpuSubBenchmarkResponse[];
};

const getGpuSubBenchmarkById = async (id: string): Promise<IGpuSubBenchmarkResponse | null> => {
  const result = await prisma.gpuSubBenchmark.findUnique({
    where: {
      id,
    },
    include: {
      gpuBenchmark: true,
    },
  });
  return result as IGpuSubBenchmarkResponse | null;
};

const updateGpuSubBenchmark = async (
  id: string,
  payload: Partial<IGpuSubBenchmark>
): Promise<IGpuSubBenchmarkResponse> => {
  const result = await prisma.gpuSubBenchmark.update({
    where: {
      id,
    },
    data: payload,
    include: {
      gpuBenchmark: true,
    },
  });
  return result as IGpuSubBenchmarkResponse;
};

const deleteGpuSubBenchmark = async (id: string): Promise<IGpuSubBenchmarkResponse> => {
  // Delete all benchmark scores first
  await prisma.gpuBenchmarkScore.deleteMany({
    where: {
      gpuSubBenchmarkId: id,
    },
  });

  // Then delete the sub-benchmark
  const result = await prisma.gpuSubBenchmark.delete({
    where: {
      id,
    },
    include: {
      gpuBenchmark: true,
    },
  });
  return result as IGpuSubBenchmarkResponse;
};

// GPU Benchmark Score Services
const createGpuBenchmarkScore = async (
  payload: IGpuBenchmarkScore
): Promise<IGpuBenchmarkScoreResponse> => {
  const result = await prisma.gpuBenchmarkScore.create({
    data: payload,
    include: {
      gpuSubBenchmark: {
        include: {
          gpuBenchmark: true,
        },
      },
      gpu: true,
    },
  });

  return {
    ...result,
    gpu: {
      id: result.gpu.id,
      name: result.gpu.name,
      image: result.gpu.image,
      description: result.gpu.benchmarkAndSpecsDescription,
      createdAt: result.gpu.createdAt,
      updatedAt: result.gpu.updatedAt,
    },
  } as IGpuBenchmarkScoreResponse;
};

const getGpuBenchmarkScores = async (
  gpuId: string
): Promise<IGpuBenchmarkScoreResponse[]> => {
  const result = await prisma.gpuBenchmarkScore.findMany({
    where: {
      gpuId,
    },
    include: {
      gpuSubBenchmark: {
        include: {
          gpuBenchmark: true,
        },
      },
      gpu: true,
    },
  });

  return result.map((score) => ({
    ...score,
    gpu: {
      id: score.gpu.id,
      name: score.gpu.name,
      image: score.gpu.image,
      description: score.gpu.benchmarkAndSpecsDescription,
      createdAt: score.gpu.createdAt,
      updatedAt: score.gpu.updatedAt,
    },
  })) as IGpuBenchmarkScoreResponse[];
};

const updateGpuBenchmarkScore = async (
  gpuId: string,
  gpuSubBenchmarkId: string,
  score: number
): Promise<IGpuBenchmarkScoreResponse> => {
  const result = await prisma.gpuBenchmarkScore.update({
    where: {
      gpuId_gpuSubBenchmarkId: {
        gpuId,
        gpuSubBenchmarkId,
      },
    },
    data: {
      score,
    },
    include: {
      gpuSubBenchmark: {
        include: {
          gpuBenchmark: true,
        },
      },
      gpu: true,
    },
  });

  return {
    ...result,
    gpu: {
      id: result.gpu.id,
      name: result.gpu.name,
      image: result.gpu.image,
      description: result.gpu.benchmarkAndSpecsDescription,
      createdAt: result.gpu.createdAt,
      updatedAt: result.gpu.updatedAt,
    },
  } as IGpuBenchmarkScoreResponse;
};

// General Benchmark Services
const createBenchmark = async (
  payload: Omit<IBenchmark, 'productType'>, 
  productType: ProductType
): Promise<IBenchmarkResponse> => {
  const result = await prisma.benchmark.create({
    data: {
      ...payload,
      productType,
    },
    include: {
      benchmarkScores: true
    }
  });

  return result as IBenchmarkResponse;
};

const getAllBenchmarks = async (productType: ProductType): Promise<IBenchmarkResponse[]> => {
  const result = await prisma.benchmark.findMany({
    where: {
      productType,
    },
    include: {
      benchmarkScores: true,
    },
  });

  return result as IBenchmarkResponse[];
};

const getBenchmarkById = async (id: string): Promise<IBenchmarkResponse | null> => {
  const result = await prisma.benchmark.findUnique({
    where: {
      id,
    },
    include: {
      benchmarkScores: true,
    },
  });
  return result as IBenchmarkResponse | null;
};

const updateBenchmark = async (
  id: string,
  payload: Partial<IBenchmark>
): Promise<IBenchmarkResponse> => {
  const result = await prisma.benchmark.update({
    where: {
      id,
    },
    data: payload,
    include: {
      benchmarkScores: true,
    },
  });
  return result as IBenchmarkResponse;
};

const deleteBenchmark = async (id: string): Promise<IBenchmarkResponse> => {
  // First delete all benchmark scores
  await prisma.benchmarkScore.deleteMany({
    where: {
      benchmarkId: id,
    },
  });

  // Then delete the benchmark
  const result = await prisma.benchmark.delete({
    where: {
      id,
    },
    include: {
      benchmarkScores: true,
    },
  });
  return result as IBenchmarkResponse;
};

const getBenchmarksByProductType = async (productType: string): Promise<{ benchmarkName: string; benchmarkDescription: string; _id: string; }[]> => {
  const benchmarks = await prisma.benchmark.findMany({
    where: {
      productType: productType as ProductType,
    },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  return benchmarks.map((benchmark) => ({
    benchmarkName: benchmark.name,
    benchmarkDescription: benchmark.description,
    _id: benchmark.id,
  }));
};

// Benchmark Score Services
const createBenchmarkScore = async (
  payload: IBenchmarkScore
): Promise<IBenchmarkScoreResponse> => {
  const result = await prisma.benchmarkScore.create({
    data: payload,
    include: {
      benchmark: true,
      cpu: payload.productType === "CPU" ? true : false,
    },
  });
  return result as IBenchmarkScoreResponse;
};

const getBenchmarkScores = async (
  benchmarkId: string
): Promise<IBenchmarkScoreResponse[]> => {
  const result = await prisma.benchmarkScore.findMany({
    where: {
      benchmarkId,
    },
    include: {
      benchmark: true,
      cpu: true,
    },
  });
  return result as IBenchmarkScoreResponse[];
};

const updateBenchmarkScore = async (
  productId: string,
  productType: ProductType,
  benchmarkId: string,
  score: number
): Promise<IBenchmarkScoreResponse> => {
  const result = await prisma.benchmarkScore.update({
    where: {
      productId_benchmarkId: {
        productId,
        benchmarkId,
      },
    },
    data: {
      score,
    },
    include: {
      benchmark: true,
      cpu: productType === "CPU" ? true : false,
    },
  });
  return result as IBenchmarkScoreResponse;
};

const createOrUpdateBenchmarkScore = async (
  productId: string,
  payload: IBenchmarkScore
): Promise<IBenchmarkScoreResponse> => {
  const existingScore = await prisma.benchmarkScore.findFirst({
    where: {
      productId,
      benchmarkId: payload.benchmarkId,
    },
  });

  if (existingScore) {
    // Update existing score
    const result = await prisma.benchmarkScore.update({
      where: {
        id: existingScore.id,
      },
      data: {
        score: payload.score,
      },
      include: {
        benchmark: true,
      },
    });
    return result as IBenchmarkScoreResponse;
  } else {
    // Create new score
    const result = await prisma.benchmarkScore.create({
      data: {
        benchmarkId: payload.benchmarkId,
        productId,
        productType: payload.productType,
        score: payload.score,
      },
      include: {
        benchmark: true,
      },
    });
    return result as IBenchmarkScoreResponse;
  }
};

const createOrUpdateBulkBenchmarkScores = async (
  productId: string, 
  productType: ProductType, 
  scores: { benchmarkId: string; score: number }[]
): Promise<{
  benchmarkName: string;
  score: number;
}[]> => {
  // Use transaction to ensure all operations are atomic
  const result = await prisma.$transaction(
    scores.map((scoreData) => 
      prisma.benchmarkScore.upsert({
        where: {
          productId_benchmarkId: {
            productId,
            benchmarkId: scoreData.benchmarkId,
          },
        },
        update: {
          score: scoreData.score,
        },
        create: {
          productId,
          productType,
          benchmarkId: scoreData.benchmarkId,
          score: scoreData.score,
        },
        include: {
          benchmark: true,
        },
      })
    )
  );

  // Transform the result to the desired format
  return result.map((scoreItem) => ({
    benchmarkName: scoreItem.benchmark.name,
    score: scoreItem.score,
  }));
};

export const BenchmarkService = {
  // GPU Benchmark
  createGpuBenchmark,
  getAllGpuBenchmarks,
  getGpuBenchmarkById,
  updateGpuBenchmark,
  deleteGpuBenchmark,
  // GPU Sub-Benchmark
  createGpuSubBenchmark,
  getAllGpuSubBenchmarks,
  getGpuSubBenchmarkById,
  updateGpuSubBenchmark,
  deleteGpuSubBenchmark,
  // GPU Benchmark Score
  createGpuBenchmarkScore,
  getGpuBenchmarkScores,
  updateGpuBenchmarkScore,
  // General Benchmark
  createBenchmark,
  getAllBenchmarks,
  getBenchmarkById,
  updateBenchmark,
  deleteBenchmark,
  getBenchmarksByProductType,
  // General Benchmark Score
  createBenchmarkScore,
  getBenchmarkScores,
  updateBenchmarkScore,
  createOrUpdateBenchmarkScore,
  createOrUpdateBulkBenchmarkScores,
};
