import { Cpu, Prisma } from "@prisma/client";

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
  cpuCoresAndBaseFrequency: Prisma.JsonValue;
  memory: Prisma.JsonValue;
  thermalManagement: Prisma.JsonValue;
  rating?: number;
  buyingLink?: string;
}

export interface ICpuResponse extends Omit<Cpu, 'cpuBenchmarkScores'> {
  benchmarks: Array<{
    id: string;
    name: string;
    description: string;
    score: number;
  }>;
}

export type ICpuType = Omit<Cpu, "createdAt" | "updatedAt">;
