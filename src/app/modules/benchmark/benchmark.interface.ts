import { Benchmark, BenchmarkScore, Cpu, Gpu, GpuBenchmark, GpuBenchmarkScore, GpuSubBenchmark, ProductType } from "@prisma/client";

// GPU Benchmark Interfaces
export interface IGpuBenchmark {
  name: string;
  description: string;
}

export interface IGpuBenchmarkResponse extends IGpuBenchmark {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  gpuSubBenchmarks: Array<{
    id: string;
    name: string;
    description: string;
    gpuBenchmarkId: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

// GPU Sub-Benchmark Interfaces
export interface IGpuSubBenchmark {
  name: string;
  description: string;
  gpuBenchmarkId: string;
}

export interface IGpuSubBenchmarkResponse extends IGpuSubBenchmark {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  gpuBenchmark: {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

// GPU Benchmark Score Interfaces
export interface IGpuBenchmarkScore {
  gpuId: string;
  gpuSubBenchmarkId: string;
  score: number;
}

export interface IGpuBenchmarkScoreResponse extends IGpuBenchmarkScore {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  gpuSubBenchmark: {
    id: string;
    name: string;
    description: string;
    gpuBenchmarkId: string;
    createdAt: Date;
    updatedAt: Date;
    gpuBenchmark: {
      id: string;
      name: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
    };
  };
  gpu: {
    id: string;
    name: string;
    image: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

// General Benchmark Interfaces
export interface IBenchmark {
  name: string;
  description: string;
}

export interface IBenchmarkResponse extends Omit<Benchmark, 'benchmarkScores'> {
  benchmarkScores: BenchmarkScore[];
}

// Benchmark Score Interfaces
export interface IBenchmarkScore {
  productId: string;
  productType: ProductType;
  benchmarkId: string;
  score: number;
}

export interface IBenchmarkScoreResponse extends Omit<BenchmarkScore, 'benchmark'> {
  benchmark: Benchmark;
  cpu?: Cpu;
}

// Simplified Benchmark Score Response
export interface ISimplifiedBenchmarkScore {
  benchmarkName: string;
  score: number;
}

// API Response Interfaces
export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface IUpdateGpuBenchmarkScore {
  gpuId: string;
  gpuSubBenchmarkId: string;
  score: number;
}

export interface IUpdateBenchmarkScore {
  productId: string;
  productType: ProductType;
  benchmarkId: string;
  score: number;
}
