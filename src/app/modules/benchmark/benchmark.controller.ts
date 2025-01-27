import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BenchmarkService } from "./benchmark.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// GPU Benchmark Controllers
const createGpuBenchmark = catchAsync(async (req: Request, res: Response) => {
  const result = await BenchmarkService.createGpuBenchmark(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Benchmark created successfully",
    data: result,
  });
});

const getAllGpuBenchmarks = catchAsync(async (req: Request, res: Response) => {
  const result = await BenchmarkService.getAllGpuBenchmarks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Benchmarks retrieved successfully",
    data: result,
  });
});

const getGpuBenchmarkById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BenchmarkService.getGpuBenchmarkById(id);
  
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "GPU Benchmark not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Benchmark retrieved successfully",
    data: result,
  });
});

const updateGpuBenchmark = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BenchmarkService.updateGpuBenchmark(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Benchmark updated successfully",
    data: result,
  });
});

const deleteGpuBenchmark = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BenchmarkService.deleteGpuBenchmark(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Benchmark deleted successfully",
    data: result,
  });
});

// GPU Sub-Benchmark Controllers
const createGpuSubBenchmark = catchAsync(async (req: Request, res: Response) => {
  const result = await BenchmarkService.createGpuSubBenchmark(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Sub-Benchmark created successfully",
    data: result,
  });
});

const getAllGpuSubBenchmarks = catchAsync(async (req: Request, res: Response) => {
  const result = await BenchmarkService.getAllGpuSubBenchmarks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Sub-Benchmarks retrieved successfully",
    data: result,
  });
});

const getGpuSubBenchmarkById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BenchmarkService.getGpuSubBenchmarkById(id);
  
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "GPU Sub-Benchmark not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Sub-Benchmark retrieved successfully",
    data: result,
  });
});

const updateGpuSubBenchmark = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BenchmarkService.updateGpuSubBenchmark(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Sub-Benchmark updated successfully",
    data: result,
  });
});

const deleteGpuSubBenchmark = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BenchmarkService.deleteGpuSubBenchmark(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Sub-Benchmark deleted successfully",
    data: result,
  });
});

// GPU Benchmark Score Controllers
const createGpuBenchmarkScore = catchAsync(async (req: Request, res: Response) => {
  const result = await BenchmarkService.createGpuBenchmarkScore(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Benchmark Score created successfully",
    data: result,
  });
});

const getGpuBenchmarkScores = catchAsync(async (req: Request, res: Response) => {
  const { gpuId } = req.params;
  const result = await BenchmarkService.getGpuBenchmarkScores(gpuId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Benchmark Scores retrieved successfully",
    data: result,
  });
});

// General Benchmark Controllers
const createBenchmark = catchAsync(async (req: Request, res: Response) => {
  const result = await BenchmarkService.createBenchmark(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark created successfully",
    data: result,
  });
});

const getAllBenchmarks = catchAsync(async (req: Request, res: Response) => {
  const result = await BenchmarkService.getAllBenchmarks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmarks retrieved successfully",
    data: result,
  });
});

const getBenchmarkById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BenchmarkService.getBenchmarkById(id);
  
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "Benchmark not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark retrieved successfully",
    data: result,
  });
});

const updateBenchmark = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BenchmarkService.updateBenchmark(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark updated successfully",
    data: result,
  });
});

const deleteBenchmark = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BenchmarkService.deleteBenchmark(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark deleted successfully",
    data: result,
  });
});

// Benchmark Score Controllers
const createBenchmarkScore = catchAsync(async (req: Request, res: Response) => {
  const result = await BenchmarkService.createBenchmarkScore(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark Score created successfully",
    data: result,
  });
});

const getBenchmarkScores = catchAsync(async (req: Request, res: Response) => {
  const { benchmarkId } = req.params;
  const result = await BenchmarkService.getBenchmarkScores(benchmarkId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark Scores retrieved successfully",
    data: result,
  });
});

const updateGpuBenchmarkScore = catchAsync(async (req: Request, res: Response) => {
  const { gpuId, gpuSubBenchmarkId, score } = req.body;
  const result = await BenchmarkService.updateGpuBenchmarkScore(gpuId, gpuSubBenchmarkId, score);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "GPU Benchmark Score updated successfully",
    data: result,
  });
});

const updateBenchmarkScore = catchAsync(async (req: Request, res: Response) => {
  const { cpuId, benchmarkId, score } = req.body;
  const result = await BenchmarkService.updateBenchmarkScore(cpuId, benchmarkId, score);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CPU Benchmark Score updated successfully",
    data: result,
  });
});

export const BenchmarkController = {
  createGpuBenchmark,
  getAllGpuBenchmarks,
  getGpuBenchmarkById,
  updateGpuBenchmark,
  deleteGpuBenchmark,
  createGpuSubBenchmark,
  getAllGpuSubBenchmarks,
  getGpuSubBenchmarkById,
  updateGpuSubBenchmark,
  deleteGpuSubBenchmark,
  createGpuBenchmarkScore,
  getGpuBenchmarkScores,
  createBenchmark,
  getAllBenchmarks,
  getBenchmarkById,
  updateBenchmark,
  deleteBenchmark,
  createBenchmarkScore,
  getBenchmarkScores,
  updateGpuBenchmarkScore,
  updateBenchmarkScore,
};
