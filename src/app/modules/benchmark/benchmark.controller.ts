import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BenchmarkService } from "./benchmark.service";
import { ProductType } from "@prisma/client";
import { ISimplifiedBenchmarkScore } from "./benchmark.interface";

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
  const { productType } = req.params;
  const result = await BenchmarkService.createBenchmark(req.body, productType as ProductType);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Benchmark created successfully",
    data: result,
  });
});

const getAllBenchmarks = catchAsync(async (req: Request, res: Response) => {
  const { productType } = req.params;
  const result = await BenchmarkService.getAllBenchmarks(productType as ProductType);
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

const getBenchmarksByProductType = catchAsync(async (req: Request, res: Response) => {
  const { productType } = req.params;
  const result = await BenchmarkService.getBenchmarksByProductType(productType);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmarks retrieved successfully",
    data: result,
  });
});

// Benchmark Score Controllers
const createBenchmarkScore = catchAsync(async (req: Request, res: Response) => {
  const result = await BenchmarkService.createBenchmarkScore(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark score created successfully",
    data: result,
  });
});

const getBenchmarkScores = catchAsync(async (req: Request, res: Response) => {
  const { benchmarkId } = req.params;
  const result = await BenchmarkService.getBenchmarkScores(benchmarkId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark scores retrieved successfully",
    data: result,
  });
});

const updateBenchmarkScore = catchAsync(async (req: Request, res: Response) => {
  const { productId, productType, benchmarkId, score } = req.body;
  const result = await BenchmarkService.updateBenchmarkScore(
    productId,
    productType,
    benchmarkId,
    score
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark score updated successfully",
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

const createOrUpdateBenchmarkScore = catchAsync(async (req: Request, res: Response) => {
  const { productId, productType } = req.params;
  const result = await BenchmarkService.createOrUpdateBenchmarkScore(productId, {
    ...req.body,
    productId,
    productType,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark score created/updated successfully",
    data: result,
  });
});

const createOrUpdateBulkBenchmarkScores = catchAsync(async (req: Request, res: Response) => {
  const { productId, productType } = req.params;
  const result = await BenchmarkService.createOrUpdateBulkBenchmarkScores(
    productId, 
    productType as ProductType, 
    req.body
  );
  
  sendResponse<ISimplifiedBenchmarkScore[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Benchmark scores created/updated successfully",
    data: result,
  });
});

export const BenchmarkController = {
  // GPU Benchmark
  createGpuBenchmark,
  getAllGpuBenchmarks,
  getGpuBenchmarkById,
  updateGpuBenchmark,
  deleteGpuBenchmark,
  // GPU Sub-Benchmark
  createGpuSubBenchmark,
  getAllGpuSubBenchmarks,
  getGpuSubBenchmarkById,
  updateGpuSubBenchmark,
  deleteGpuSubBenchmark,
  // GPU Benchmark Score
  createGpuBenchmarkScore,
  getGpuBenchmarkScores,
  updateGpuBenchmarkScore,
  // General Benchmark
  createBenchmark,
  getAllBenchmarks,
  getBenchmarkById,
  updateBenchmark,
  deleteBenchmark,
  getBenchmarksByProductType,
  // General Benchmark Score
  createBenchmarkScore,
  getBenchmarkScores,
  updateBenchmarkScore,
  createOrUpdateBenchmarkScore,
  createOrUpdateBulkBenchmarkScores,
};
