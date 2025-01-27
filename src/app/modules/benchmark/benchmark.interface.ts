import { Benchmark, BenchmarkScore, Cpu, Gpu, GpuBenchmark, GpuBenchmarkScore, GpuSubBenchmark } from "@prisma/client";

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
}

export interface IBenchmarkScore {
  cpuId: string;
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
  cpuId: string;
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

export interface IBenchmarkScoreResponse extends IBenchmarkScore {
  benchmark: Benchmark;
  cpu: Cpu;
}
