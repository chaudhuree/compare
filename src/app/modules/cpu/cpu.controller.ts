import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CpuService } from "./cpu.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createCpu = catchAsync(async (req: Request, res: Response) => {
  const result = await CpuService.createCpu(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CPU created successfully",
    data: result,
  });
});

const getAllCpus = catchAsync(async (req: Request, res: Response) => {
  const result = await CpuService.getAllCpus();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CPUs retrieved successfully",
    data: result,
  });
});

const getCpuById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CpuService.getCpuById(id);
  
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "CPU not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CPU retrieved successfully",
    data: result,
  });
});

const updateCpu = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CpuService.updateCpu(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CPU updated successfully",
    data: result,
  });
});

const deleteCpu = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CpuService.deleteCpu(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "CPU deleted successfully",
    data: result,
  });
});

export const CpuController = {
  createCpu,
  getAllCpus,
  getCpuById,
  updateCpu,
  deleteCpu,
};
