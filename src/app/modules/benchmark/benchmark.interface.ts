import { Benchmark, BenchmarkScore, Cpu, Gpu, GpuBenchmark, GpuBenchmarkScore, GpuSubBenchmark, ProductType } from "@prisma/client";

export interface IGpuBenchmark {
  name: string;
  description: string;
}

export interface IGpuSubBenchmark {
  name: string;
  description: string;
  gpuBenchmarkId: string;
}

export interface IGpuBenchmarkScore {
  gpuId: string;
  gpuSubBenchmarkId: string;
  score: number;
}

export interface IBenchmark {
  name: string;
  description: string;
  productType: ProductType;
}

export interface IBenchmarkScore {
  productId: string;
  productType: ProductType;
  benchmarkId: string;
  score: number;
}

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

// Response Types
export interface IGpuBenchmarkResponse extends GpuBenchmark {
  gpuSubBenchmarks: IGpuSubBenchmarkResponse[];
}

export interface IGpuSubBenchmarkResponse extends GpuSubBenchmark {
  gpuBenchmark: GpuBenchmark;
}

export interface IGpuBenchmarkScoreResponse extends IGpuBenchmarkScore {
  gpuSubBenchmark: IGpuSubBenchmarkResponse;
  gpu: Gpu;
}

export interface IBenchmarkResponse extends Benchmark {
  benchmarkScores: BenchmarkScore[];
}

export interface IBenchmarkScoreResponse extends BenchmarkScore {
  benchmark: Benchmark;
  cpu?: Cpu;
}
