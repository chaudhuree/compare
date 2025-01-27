import { Gpu } from "@prisma/client";

export interface IGpu {
  name: string;
  image: string;
  benchmarkAndSpecsDescription: string;
  additionalData: Record<string, any>;
  gpu: Record<string, any>;
  memory: Record<string, any>;
  clockSpeeds: Record<string, any>;
  thermalDesign: Record<string, any>;
  coolerAndFans?: Record<string, any>;
  connectivity?: Record<string, any>;
  featureSet?: Record<string, any>;
  videoCodecs?: Record<string, any>;
  dimensions?: Record<string, any>;
  rating?: number;
  buyingLink?: string;
}

export interface IGpuResponse {
  name: string;
  image: string;
  benchmarkAndSpecsDescription: string;
  additionalData: Record<string, any>;
  gpu: Record<string, any>;
  memory: Record<string, any>;
  clockSpeeds: Record<string, any>;
  thermalDesign: Record<string, any>;
  coolerAndFans?: Record<string, any>;
  connectivity?: Record<string, any>;
  featureSet?: Record<string, any>;
  videoCodecs?: Record<string, any>;
  dimensions?: Record<string, any>;
  rating?: number;
  buyingLink?: string;
  benchmarks: Array<{
    benchmarkName: string;
    benchmarkDescription: string;
    subBenchmarks: Array<{
      subBenchmarkName: string;
      score: number;
    }>;
  }>;
}

export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type IGpuType = Omit<Gpu, "createdAt" | "updatedAt">;

export interface IGpuBenchmarkScore {
  gpuSubBenchmarkId: string;
  score: number;
}

export interface ISetGpuBenchmarkScores {
  gpuId: string;
  scores: IGpuBenchmarkScore[];
}

import { IGpuBenchmarkScoreResponse } from "../benchmark/benchmark.interface";

export interface IGpuWithBenchmarks extends Gpu {
  benchmarkScores: IGpuBenchmarkScoreResponse[];
}

export interface ISimplifiedSubBenchmark {
  name: string;
  score: number;
}

export interface ISimplifiedBenchmark {
  benchmarkName: string;
  subBenchmarks: ISimplifiedSubBenchmark[];
}

export interface IGpuWithSimplifiedBenchmarks extends Omit<Gpu, 'createdAt' | 'updatedAt'> {
  benchmarkScores: ISimplifiedBenchmark[];
}

export interface IGpuComparison {
  firstGpu: IGpuWithSimplifiedBenchmarks;
  secondGpu: IGpuWithSimplifiedBenchmarks;
}

export interface IGpuCompareRequest {
  firstGpuId: string;
  secondGpuId: string;
}
