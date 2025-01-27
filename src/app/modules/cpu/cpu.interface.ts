import { Cpu } from "@prisma/client";

export interface ICpu {
  name: string;
  image: string;
  description: string;
  family: string;
  cpuGroup: string;
  architecture: string;
  technology: string;
  segment: string;
  generation: string;
  cpuCoresAndBaseFrequency: Record<string, any>;
  memory: Record<string, any>;
  thermalManagement: Record<string, any>;
  rating?: number;
  buyingLink?: string;
}

export interface ICpuResponse {
  name: string;
  image: string;
  description: string;
  family: string;
  cpuGroup: string;
  architecture: string;
  technology: string;
  segment: string;
  generation: string;
  cpuCoresAndBaseFrequency: Record<string, any>;
  memory: Record<string, any>;
  thermalManagement: Record<string, any>;
  rating?: number;
  buyingLink?: string;
  benchmarks: Array<{
    benchmarkName: string;
    benchmarkDescription: string;
    score: number;
  }>;
}

export type ICpuType = Omit<Cpu, "createdAt" | "updatedAt">;
