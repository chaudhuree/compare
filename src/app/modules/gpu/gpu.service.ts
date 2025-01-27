import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../../utils/prisma";
import { IGpu, IGpuResponse } from "./gpu.interface";

const createGpu = async (payload: IGpu): Promise<any> => {
  const result = await prisma.gpu.create({
    data: payload,
  });
  return result;
};

const getAllGpus = async (): Promise<IGpuResponse[]> => {
  const gpus = await prisma.gpu.findMany({
    include: {
      benchmarkScores: {
        include: {
          gpuSubBenchmark: {
            include: {
              gpuBenchmark: true,
            },
          },
        },
      },
    },
  });

  return gpus.map((gpu: any) => {
    const benchmarkMap = new Map();

    gpu.benchmarkScores.forEach((score: any) => {
      const benchmarkName = score.gpuSubBenchmark.gpuBenchmark.name;
      const benchmarkDescription = score.gpuSubBenchmark.gpuBenchmark.description;
      
      if (!benchmarkMap.has(benchmarkName)) {
        benchmarkMap.set(benchmarkName, {
          benchmarkName,
          benchmarkDescription,
          subBenchmarks: [],
        });
      }

      benchmarkMap.get(benchmarkName).subBenchmarks.push({
        subBenchmarkName: score.gpuSubBenchmark.name,
        score: score.score,
      });
    });

    return {
      name: gpu.name,
      image: gpu.image,
      benchmarkAndSpecsDescription: gpu.benchmarkAndSpecsDescription,
      additionalData: gpu.additionalData as Record<string, any>,
      gpu: gpu.gpu as Record<string, any>,
      memory: gpu.memory as Record<string, any>,
      clockSpeeds: gpu.clockSpeeds as Record<string, any>,
      thermalDesign: gpu.thermalDesign as Record<string, any>,
      coolerAndFans: gpu.coolerAndFans as Record<string, any> | undefined,
      connectivity: gpu.connectivity as Record<string, any> | undefined,
      featureSet: gpu.featureSet as Record<string, any> | undefined,
      videoCodecs: gpu.videoCodecs as Record<string, any> | undefined,
      dimensions: gpu.dimensions as Record<string, any> | undefined,
      rating: gpu.rating || undefined,
      buyingLink: gpu.buyingLink || undefined,
      benchmarks: Array.from(benchmarkMap.values()),
    };
  });
};

const getGpuById = async (id: string): Promise<IGpuResponse | null> => {
  const gpu = await prisma.gpu.findUnique({
    where: {
      id,
    },
    include: {
      benchmarkScores: {
        include: {
          gpuSubBenchmark: {
            include: {
              gpuBenchmark: true,
            },
          },
        },
      },
    },
  });

  if (!gpu) return null;

  const benchmarkMap = new Map();

  gpu.benchmarkScores.forEach((score: any) => {
    const benchmarkName = score.gpuSubBenchmark.gpuBenchmark.name;
    const benchmarkDescription = score.gpuSubBenchmark.gpuBenchmark.description;
    
    if (!benchmarkMap.has(benchmarkName)) {
      benchmarkMap.set(benchmarkName, {
        benchmarkName,
        benchmarkDescription,
        subBenchmarks: [],
      });
    }

    benchmarkMap.get(benchmarkName).subBenchmarks.push({
      subBenchmarkName: score.gpuSubBenchmark.name,
      score: score.score,
    });
  });

  return {
    name: gpu.name,
    image: gpu.image,
    benchmarkAndSpecsDescription: gpu.benchmarkAndSpecsDescription,
    additionalData: gpu.additionalData as Record<string, any>,
    gpu: gpu.gpu as Record<string, any>,
    memory: gpu.memory as Record<string, any>,
    clockSpeeds: gpu.clockSpeeds as Record<string, any>,
    thermalDesign: gpu.thermalDesign as Record<string, any>,
    coolerAndFans: gpu.coolerAndFans as Record<string, any> | undefined,
    connectivity: gpu.connectivity as Record<string, any> | undefined,
    featureSet: gpu.featureSet as Record<string, any> | undefined,
    videoCodecs: gpu.videoCodecs as Record<string, any> | undefined,
    dimensions: gpu.dimensions as Record<string, any> | undefined,
    rating: gpu.rating || undefined,
    buyingLink: gpu.buyingLink || undefined,
    benchmarks: Array.from(benchmarkMap.values()),
  };
};

const updateGpu = async (
  id: string,
  payload: Partial<IGpu>
): Promise<any> => {
  const result = await prisma.gpu.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteGpu = async (id: string): Promise<any> => {
  const result = await prisma.gpu.delete({
    where: {
      id,
    },
  });
  return result;
};

const setBenchmarkScores = async (gpuId: string, scores: { gpuSubBenchmarkId: string; score: number }[]): Promise<any> => {
  // First, validate if GPU exists
  const gpu = await prisma.gpu.findUnique({
    where: { id: gpuId },
  });

  if (!gpu) {
    throw new Error("GPU not found");
  }

  // First, get existing scores
  const existingScores = await prisma.gpuBenchmarkScore.findMany({
    where: {
      gpuId,
      gpuSubBenchmarkId: {
        in: scores.map(s => s.gpuSubBenchmarkId)
      }
    }
  });

  // Separate scores into updates and creates
  const scoresToUpdate = scores.filter(score => 
    existingScores.some(existing => 
      existing.gpuId === gpuId && existing.gpuSubBenchmarkId === score.gpuSubBenchmarkId
    )
  );

  const scoresToCreate = scores.filter(score => 
    !existingScores.some(existing => 
      existing.gpuId === gpuId && existing.gpuSubBenchmarkId === score.gpuSubBenchmarkId
    )
  );

  // Use transaction to ensure all operations succeed or none do
  const result = await prisma.$transaction([
    // Update existing scores
    ...scoresToUpdate.map(score => 
      prisma.gpuBenchmarkScore.updateMany({
        where: {
          gpuId,
          gpuSubBenchmarkId: score.gpuSubBenchmarkId
        },
        data: {
          score: score.score
        }
      })
    ),
    // Create new scores
    ...scoresToCreate.map(score => 
      prisma.gpuBenchmarkScore.create({
        data: {
          gpu: { connect: { id: gpuId } },
          gpuSubBenchmark: { connect: { id: score.gpuSubBenchmarkId } },
          score: score.score
        }
      })
    )
  ]);

  // Fetch and return the updated GPU with its benchmark scores
  const updatedGpu = await prisma.gpu.findUnique({
    where: { id: gpuId },
    include: {
      benchmarkScores: {
        include: {
          gpuSubBenchmark: {
            include: {
              gpuBenchmark: true,
            },
          },
        },
      },
    },
  });

  return updatedGpu;
};

export const GpuService = {
  createGpu,
  getAllGpus,
  getGpuById,
  updateGpu,
  deleteGpu,
  setBenchmarkScores,
};
