import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../../utils/prisma";
import { ICpu, ICpuResponse, ICpuComparison, ICpuWithSimplifiedBenchmarks, ISimplifiedCpuBenchmark } from "./cpu.interface";
import httpStatus from "http-status";

const createCpu = async (payload: ICpu): Promise<ICpuResponse> => {
  const result = await prisma.cpu.create({
    data: {
      name: payload.name,
      image: payload.image,
      description: payload.description,
      family: payload.family,
      cpuGroup: payload.cpuGroup,
      architecture: payload.architecture,
      technology: payload.technology,
      segment: payload.segment,
      generation: payload.generation,
      cpuCoresAndBaseFrequency: payload.cpuCoresAndBaseFrequency as Prisma.InputJsonValue,
      memory: payload.memory as Prisma.InputJsonValue,
      thermalManagement: payload.thermalManagement as Prisma.InputJsonValue,
      rating: payload.rating,
      buyingLink: payload.buyingLink,
    },
    include: {
      cpuBenchmarkScores: {
        include: {
          benchmark: true,
        },
      },
    },
  });

  const formattedCpu: ICpuResponse = {
    ...result,
    benchmarks: result.cpuBenchmarkScores.map((score: { benchmark: { id: string; name: string; description: string; }; score: number; }) => ({
      id: score.benchmark.id,
      name: score.benchmark.name,
      description: score.benchmark.description,
      score: score.score,
    })),
  };

  return formattedCpu;
};

const getAllCpus = async (): Promise<ICpuResponse[]> => {
  const cpus = await prisma.cpu.findMany({
    include: {
      cpuBenchmarkScores: {
        include: {
          benchmark: true,
        },
      },
    },
  });

  const formattedCpus: ICpuResponse[] = cpus.map((cpu) => ({
    ...cpu,
    benchmarks: cpu.cpuBenchmarkScores.map((score: { benchmark: { id: string; name: string; description: string; }; score: number; }) => ({
      id: score.benchmark.id,
      name: score.benchmark.name,
      description: score.benchmark.description,
      score: score.score,
    })),
  }));

  return formattedCpus;
};

const getCpuById = async (id: string): Promise<ICpuResponse | null> => {
  const cpu = await prisma.cpu.findUnique({
    where: {
      id,
    },
    include: {
      cpuBenchmarkScores: {
        include: {
          benchmark: true,
        },
      },
    },
  });

  if (!cpu) return null;

  const formattedCpu: ICpuResponse = {
    ...cpu,
    benchmarks: cpu.cpuBenchmarkScores.map((score: { benchmark: { id: string; name: string; description: string; }; score: number; }) => ({
      id: score.benchmark.id,
      name: score.benchmark.name,
      description: score.benchmark.description,
      score: score.score,
    })),
  };

  return formattedCpu;
};

const updateCpu = async (
  id: string,
  payload: Partial<ICpu>
): Promise<ICpuResponse> => {
  const updateData: Prisma.CpuUpdateInput = {};

  if (payload.name) updateData.name = payload.name;
  if (payload.image) updateData.image = payload.image;
  if (payload.description) updateData.description = payload.description;
  if (payload.family) updateData.family = payload.family;
  if (payload.cpuGroup) updateData.cpuGroup = payload.cpuGroup;
  if (payload.architecture) updateData.architecture = payload.architecture;
  if (payload.technology) updateData.technology = payload.technology;
  if (payload.segment) updateData.segment = payload.segment;
  if (payload.generation) updateData.generation = payload.generation;
  if (payload.cpuCoresAndBaseFrequency) updateData.cpuCoresAndBaseFrequency = payload.cpuCoresAndBaseFrequency as Prisma.InputJsonValue;
  if (payload.memory) updateData.memory = payload.memory as Prisma.InputJsonValue;
  if (payload.thermalManagement) updateData.thermalManagement = payload.thermalManagement as Prisma.InputJsonValue;
  if (payload.rating) updateData.rating = payload.rating;
  if (payload.buyingLink) updateData.buyingLink = payload.buyingLink;

  const result = await prisma.cpu.update({
    where: {
      id,
    },
    data: updateData,
    include: {
      cpuBenchmarkScores: {
        include: {
          benchmark: true,
        },
      },
    },
  });

  const formattedCpu: ICpuResponse = {
    ...result,
    benchmarks: result.cpuBenchmarkScores.map((score: { benchmark: { id: string; name: string; description: string; }; score: number; }) => ({
      id: score.benchmark.id,
      name: score.benchmark.name,
      description: score.benchmark.description,
      score: score.score,
    })),
  };

  return formattedCpu;
};

const deleteCpu = async (id: string): Promise<ICpuResponse> => {
  // First delete all benchmark scores
  await prisma.benchmarkScore.deleteMany({
    where: {
      productId: id,
      productType: "CPU",
    },
  });

  const result = await prisma.cpu.delete({
    where: {
      id,
    },
    include: {
      cpuBenchmarkScores: {
        include: {
          benchmark: true,
        },
      },
    },
  });

  const formattedCpu: ICpuResponse = {
    ...result,
    benchmarks: result.cpuBenchmarkScores.map((score: { benchmark: { id: string; name: string; description: string; }; score: number; }) => ({
      id: score.benchmark.id,
      name: score.benchmark.name,
      description: score.benchmark.description,
      score: score.score,
    })),
  };

  return formattedCpu;
};

const compareCpus = async (
  firstCpuId: string, 
  secondCpuId: string
): Promise<ICpuComparison> => {
  // Fetch both CPUs with their benchmark scores
  const [firstCpu, secondCpu] = await Promise.all([
    prisma.cpu.findUnique({
      where: { id: firstCpuId },
      include: {
        cpuBenchmarkScores: {
          include: {
            benchmark: true,
          },
        },
      },
    }),
    prisma.cpu.findUnique({
      where: { id: secondCpuId },
      include: {
        cpuBenchmarkScores: {
          include: {
            benchmark: true,
          },
        },
      },
    }),
  ]);

  if (!firstCpu || !secondCpu) {
    throw new Error("One or both CPUs not found");
  }

  const transformCpuData = (cpu: typeof firstCpu): ICpuWithSimplifiedBenchmarks => {
    // Transform benchmark scores to simplified format
    const simplifiedBenchmarkScores = cpu.cpuBenchmarkScores.map(scoreItem => ({
      benchmarkName: scoreItem.benchmark.name,
      score: scoreItem.score
    }));

    // Remove createdAt and updatedAt from CPU data
    const { createdAt, updatedAt, ...cpuData } = cpu;

    return {
      ...cpuData,
      benchmarkScores: simplifiedBenchmarkScores,
    };
  };

  return {
    firstCpu: transformCpuData(firstCpu),
    secondCpu: transformCpuData(secondCpu),
  };
};

export const CpuService = {
  createCpu,
  getAllCpus,
  getCpuById,
  updateCpu,
  deleteCpu,
  compareCpus,
};
