import { z } from "zod";

const documentSchema = z.object({
  title: z.string(),
  link: z.string(),
});

const turboFrequencySchema = z.array(
  z.object({
    core: z.string(),
    value: z.string(),
  })
);

const memoryTypeSchema = z.array(
  z.object({
    type: z.string(),
    speed: z.string(),
  })
);

const createCpu = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
    description: z.string(),
    family: z.string(),
    cpuGroup: z.string(),
    architecture: z.string(),
    technology: z.string(),
    segment: z.string(),
    generation: z.string(),
    predecessor: z.string().optional(),
    successor: z.string().optional(),
    cpuCoresAndBaseFrequency: z.object({
      description: z.string(),
      cpuCores: z.number(),
      cpuThreads: z.number(),
      coreArchitecture: z.string(),
      cores: z.string(),
      aCore: z.string(),
      bCore: z.string(),
      cCore: z.string(),
      hyperthreading: z.boolean(),
      overclocking: z.boolean(),
      aCoreFrequency: z.string(),
      bCoreFrequency: z.string(),
      cCoreFrequency: z.string(),
      turboFrequency: turboFrequencySchema,
    }).optional(),
    integratedGraphics: z.object({
      description: z.string(),
      gpuName: z.string(),
      gpuFrequency: z.string(),
      gpuTurbo: z.string(),
      computeUnits: z.number(),
      shader: z.number(),
      hardwareRaytracing: z.boolean(),
      releaseDate: z.string(),
      maxDisplays: z.number(),
      generation: z.number(),
      directX: z.string(),
      technology: z.string(),
      maxGpuMemory: z.string(),
      frameGeneration: z.string(),
    }).optional(),
    hardwareCodecSupport: z.object({
      description: z.string(),
      h265HEVC8bit: z.string(),
      h265HEVC10bit: z.string(),
      h264: z.string(),
      vp8: z.string(),
      vp9: z.string(),
      av1: z.string(),
      avc: z.string(),
      vc1: z.string(),
      jpeg: z.string(),
    }).optional(),
    memory: z.object({
      description: z.string(),
      memoryType: memoryTypeSchema,
      memoryBandwidth: z.string(),
      maxMemory: z.string(),
      memoryChannels: z.number(),
      ecc: z.boolean(),
      pciExpress: z.string(),
      pciExpressBandwidth: z.string(),
    }).optional(),
    thermalManagement: z.object({
      description: z.string(),
      tdpPL1: z.string(),
      tdpPL2: z.string().optional(),
      tdpUp: z.string(),
      tdpDown: z.string(),
      tjunctionMax: z.string(),
    }).optional(),
    technicalDetails: z.object({
      description: z.string(),
      technology: z.string(),
      chipDesign: z.string(),
      socket: z.string(),
      l2Cache: z.string(),
      l3Cache: z.string(),
      aesNi: z.boolean(),
      operatingSystems: z.array(z.string()),
      virtualization: z.string(),
      instructionset: z.string(),
      isaExtension: z.string(),
      releaseDate: z.string(),
      releasePrice: z.string(),
      partNumber: z.string(),
      documentation: documentSchema,
    }).optional(),
    releaseDate: z.string(),
    socket: z.string(),
    maxDisplayResolution: z.string().optional(),
    npuAIPerformance: z.object({
      description: z.string(),
      aiHardware: z.string(),
      aiSpecification: z.string(),
      npu: z.string(),
      cpu: z.string(),
      igpu: z.string(),
    }).optional(),
    rating: z.number().optional(),
    buyingLink: z.string().optional(),
  }),
});

const updateCpu = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: createCpu.shape.body.partial(),
});

const compareCpus = z.object({
  body: z.object({
    firstCpuId: z.string(),
    secondCpuId: z.string(),
  }),
});

export const CpuValidation = {
  createCpu,
  updateCpu,
  compareCpus,
};
