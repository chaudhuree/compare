import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { GpuService } from "./gpu.service";
import { IApiResponse, IGpuResponse } from "./gpu.interface";
import httpStatus from "http-status";

const createGpu = catchAsync(async (req: Request, res: Response) => {
  const result = await GpuService.createGpu(req.body);

  const response: IApiResponse<any> = {
    success: true,
    statusCode: httpStatus.OK,
    message: "GPU created successfully",
    data: result,
  };

  res.status(httpStatus.OK).json(response);
});

const getAllGpus = catchAsync(async (req: Request, res: Response) => {
  const result = await GpuService.getAllGpus();

  const response: IApiResponse<IGpuResponse[]> = {
    success: true,
    statusCode: httpStatus.OK,
    message: "GPUs retrieved successfully",
    data: result,
  };

  res.status(httpStatus.OK).json(response);
});

const getGpuById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GpuService.getGpuById(id);
  
  if (!result) {
    const response: IApiResponse<null> = {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "GPU not found",
      data: null,
    };
    return res.status(httpStatus.NOT_FOUND).json(response);
  }

  const response: IApiResponse<IGpuResponse> = {
    success: true,
    statusCode: httpStatus.OK,
    message: "GPU retrieved successfully",
    data: result,
  };

  res.status(httpStatus.OK).json(response);
});

const updateGpu = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GpuService.updateGpu(id, req.body);
  const response: IApiResponse<any> = {
    success: true,
    statusCode: httpStatus.OK,
    message: "GPU updated successfully",
    data: result,
  };

  res.status(httpStatus.OK).json(response);
});

const deleteGpu = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await GpuService.deleteGpu(id);
  const response: IApiResponse<any> = {
    success: true,
    statusCode: httpStatus.OK,
    message: "GPU deleted successfully",
    data: result,
  };

  res.status(httpStatus.OK).json(response);
});

const setBenchmarkScores = catchAsync(async (req: Request, res: Response) => {
  const { scores } = req.body;
  const gpuId = req.params.id;

  const result = await GpuService.setBenchmarkScores(gpuId, scores);

  const response: IApiResponse<any> = {
    success: true,
    statusCode: httpStatus.OK,
    message: "GPU benchmark scores set successfully",
    data: result,
  };

  res.status(httpStatus.OK).json(response);
});

export const GpuController = {
  createGpu,
  getAllGpus,
  getGpuById,
  updateGpu,
  deleteGpu,
  setBenchmarkScores,
};
