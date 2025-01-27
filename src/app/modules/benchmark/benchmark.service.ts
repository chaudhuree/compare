import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../../utils/prisma";
import { IBenchmark, IBenchmarkScore, IGpuBenchmark, IGpuBenchmarkScore, IGpuSubBenchmark } from "./benchmark.interface";

// GPU Benchmark Services
const createGpuBenchmark = async (payload: IGpuBenchmark): Promise<any> => {
  const result = await prisma.gpuBenchmark.create({
    data: payload,
  });
  return result;
};

const getAllGpuBenchmarks = async (): Promise<any[]> => {
  const result = await prisma.gpuBenchmark.findMany({
    include: {
      gpuSubBenchmarks: true,
    },
  });
  return result;
};

const getGpuBenchmarkById = async (id: string): Promise<any | null> => {
  const result = await prisma.gpuBenchmark.findUnique({
    where: {
      id,
    },
    include: {
      gpuSubBenchmarks: true,
    },
  });
  return result;
};

// GPU Sub-Benchmark Services
const createGpuSubBenchmark = async (payload: IGpuSubBenchmark): Promise<any> => {
  const result = await prisma.gpuSubBenchmark.create({
    data: payload,
  });
  return result;
};

const getAllGpuSubBenchmarks = async (): Promise<any[]> => {
  const result = await prisma.gpuSubBenchmark.findMany({
    include: {
      gpuBenchmark: true,
    },
  });
  return result;
};

const getGpuSubBenchmarkById = async (id: string): Promise<any | null> => {
  const result = await prisma.gpuSubBenchmark.findUnique({
    where: {
      id,
    },
    include: {
      gpuBenchmark: true,
    },
  });
  return result;
};

// GPU Benchmark Score Services
const createGpuBenchmarkScore = async (payload: IGpuBenchmarkScore): Promise<any> => {
  const result = await prisma.gpuBenchmarkScore.create({
    data: payload,
  });
  return result;
};

const getGpuBenchmarkScores = async (gpuId: string): Promise<any[]> => {
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
    },
  });
  return result;
};

// General Benchmark Services
const createBenchmark = async (payload: IBenchmark): Promise<any> => {
  const result = await prisma.benchmark.create({
    data: payload,
  });
  return result;
};

const getAllBenchmarks = async (): Promise<any[]> => {
  const result = await prisma.benchmark.findMany({
    include: {
      benchmarkScores: true,
    },
  });
  return result;
};

const getBenchmarkById = async (id: string): Promise<any | null> => {
  const result = await prisma.benchmark.findUnique({
    where: {
      id,
    },
    include: {
      benchmarkScores: true,
    },
  });
  return result;
};

// Benchmark Score Services
const createBenchmarkScore = async (payload: IBenchmarkScore): Promise<any> => {
  const result = await prisma.benchmarkScore.create({
    data: payload,
  });
  return result;
};

const getBenchmarkScores = async (benchmarkId: string): Promise<any[]> => {
  const result = await prisma.benchmarkScore.findMany({
    where: {
      benchmarkId,
    },
    include: {
      benchmark: true,
    },
  });
  return result;
};

export const BenchmarkService = {
  createGpuBenchmark,
  getAllGpuBenchmarks,
  getGpuBenchmarkById,
  createGpuSubBenchmark,
  getAllGpuSubBenchmarks,
  getGpuSubBenchmarkById,
  createGpuBenchmarkScore,
  getGpuBenchmarkScores,
  createBenchmark,
  getAllBenchmarks,
  getBenchmarkById,
  createBenchmarkScore,
  getBenchmarkScores,
};
