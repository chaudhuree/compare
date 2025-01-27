import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../../utils/prisma";
import { ICpu, ICpuResponse } from "./cpu.interface";

const createCpu = async (payload: ICpu): Promise<any> => {
  const result = await prisma.cpu.create({
    data: payload,
  });
  return result;
};

const getAllCpus = async (): Promise<ICpuResponse[]> => {
  const cpus = await prisma.cpu.findMany({
    include: {
      benchmarkScores: {
        include: {
          benchmark: true,
        },
      },
    },
  });

  return cpus.map((cpu: any) => {
    return {
      name: cpu.name,
      image: cpu.image,
      description: cpu.description,
      family: cpu.family,
      cpuGroup: cpu.cpuGroup,
      architecture: cpu.architecture,
      technology: cpu.technology,
      segment: cpu.segment,
      generation: cpu.generation,
      cpuCoresAndBaseFrequency: cpu.cpuCoresAndBaseFrequency as Record<string, any>,
      memory: cpu.memory as Record<string, any>,
      thermalManagement: cpu.thermalManagement as Record<string, any>,
      rating: cpu.rating || undefined,
      buyingLink: cpu.buyingLink || undefined,
      benchmarks: cpu.benchmarkScores.map((score: any) => ({
        benchmarkName: score.benchmark.name,
        benchmarkDescription: score.benchmark.description,
        score: score.score,
      })),
    };
  });
};

const getCpuById = async (id: string): Promise<ICpuResponse | null> => {
  const cpu = await prisma.cpu.findUnique({
    where: {
      id,
    },
    include: {
      benchmarkScores: {
        include: {
          benchmark: true,
        },
      },
    },
  });

  if (!cpu) return null;

  return {
    name: cpu.name,
    image: cpu.image,
    description: cpu.description,
    family: cpu.family,
    cpuGroup: cpu.cpuGroup,
    architecture: cpu.architecture,
    technology: cpu.technology,
    segment: cpu.segment,
    generation: cpu.generation,
    cpuCoresAndBaseFrequency: cpu.cpuCoresAndBaseFrequency as Record<string, any>,
    memory: cpu.memory as Record<string, any>,
    thermalManagement: cpu.thermalManagement as Record<string, any>,
    rating: cpu.rating || undefined,
    buyingLink: cpu.buyingLink || undefined,
    benchmarks: cpu.benchmarkScores.map((score: any) => ({
      benchmarkName: score.benchmark.name,
      benchmarkDescription: score.benchmark.description,
      score: score.score,
    })),
  };
};

const updateCpu = async (
  id: string,
  payload: Partial<ICpu>
): Promise<any> => {
  const result = await prisma.cpu.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCpu = async (id: string): Promise<any> => {
  const result = await prisma.cpu.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CpuService = {
  createCpu,
  getAllCpus,
  getCpuById,
  updateCpu,
  deleteCpu,
};
