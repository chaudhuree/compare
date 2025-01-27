export interface IGpuBenchmark {
  name: string;
  description: string;
}

export interface IGpuSubBenchmark {
  name: string;
  description?: string;
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
  benchmarkId: string;
  cpuId: string;
  score: number;
}
