import { z } from "zod";

const documentSchema = z.object({
  title: z.string(),
  link: z.string(),
});

const gpuDetailsSchema = z.object({
  description: z.string(),
  basedOn: z.string(),
  gpuChip: z.string(),
  streamingMultiprocessors: z.number(),
  shader: z.number(),
  renderOutputUnits: z.number(),
  textureUnits: z.number(),
  raytracingCores: z.number(),
}).optional();

const memorySchema = z.object({
  description: z.string(),
  memorySize: z.string(),
  memoryType: z.string(),
  memoryClock: z.string(),
  memorySpeed: z.string(),
  memoryBandwidth: z.string(),
  memoryInterface: z.string(),
}).optional();

const createGpu = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
    benchmarkAndSpecsDescription: z.string(),
    additionalData: z.object({
      description: z.string(),
      gpuInterface: z.string(),
      releaseDate: z.string(),
      launchPrice: z.string(),
      structureSize: z.string(),
      partNo: z.string(),
      documents: documentSchema,
    }).optional(),
    gpu: gpuDetailsSchema,
    memory: memorySchema,
    clockSpeeds: z.object({
      description: z.string(),
      baseClock: z.string(),
      boostClock: z.string(),
      avgGameClock: z.string().optional(),
      overclocking: z.boolean(),
    }).optional(),
    thermalDesign: z.object({
      description: z.string(),
      tdp: z.string(),
      tdpUp: z.string().optional(),
      tjunctionMax: z.string(),
      pciPower: z.string(),
    }).optional(),
    coolerAndFans: z.object({
      description: z.string(),
      fanType: z.string(),
      fan1: z.string(),
      fan2: z.string().optional(),
      coolerType: z.string(),
      noiseIdle: z.string(),
      noiseLoad: z.string().optional(),
    }).optional(),
    connectivity: z.object({
      description: z.string(),
      maxDisplays: z.number(),
      hdcpVersion: z.string(),
      hdmiPorts: z.string(),
      dpPorts: z.string(),
      dviPorts: z.string(),
      vgaPorts: z.string().optional(),
      usbCPorts: z.string().optional(),
    }).optional(),
    featureSet: z.object({
      description: z.string(),
      maxResolution: z.string(),
      directX: z.string(),
      raytracing: z.boolean(),
      dlssFsr: z.boolean(),
      led: z.boolean(),
    }).optional(),
    videoCodecs: z.object({
      description: z.string(),
      h264: z.string(),
      h265Hevc: z.string(),
      vp8: z.string(),
      vp9: z.string(),
      av1: z.string(),
    }).optional(),
    dimensions: z.object({
      description: z.string(),
      length: z.string(),
      height: z.string(),
      width: z.string().optional(),
      widthSlots: z.string(),
      weight: z.string().optional(),
      sffReady: z.boolean(),
    }).optional(),
    rating: z.number().optional(),
    buyingLink: z.string().optional(),
  }),
});

const updateGpu = z.object({
  body: createGpu.shape.body.partial(),
});

const setBenchmarkScores = z.object({
  body: z.object({
    scores: z.array(
      z.object({
        gpuSubBenchmarkId: z.string({
          required_error: "GPU Sub Benchmark ID is required",
        }),
        score: z.number({
          required_error: "Score is required",
        }),
      })
    ),
  }),
});

export const GpuValidation = {
  createGpu,
  updateGpu,
  setBenchmarkScores,
};
