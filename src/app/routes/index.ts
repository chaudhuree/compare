import express, { Router, Request, Response } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRouters } from '../modules/user/user.routes';
import { GpuRoutes } from '../modules/gpu/gpu.routes';
import { CpuRoutes } from '../modules/cpu/cpu.routes';
import { BenchmarkRoutes } from '../modules/benchmark/benchmark.routes';
// need to import below two to upload image -> upload is the middleware
// uploadImage is the function
import { uploadFile } from '../utils/uploadFile';
import { upload } from '../middlewares/upload';

const router: Router = express.Router();

interface ModuleRoute {
  path: string;
  route: Router;
}

const moduleRoutes: ModuleRoute[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/gpus',
    route: GpuRoutes,
  },
  {
    path: '/cpus',
    route: CpuRoutes,
  },
  {
    path: '/benchmarks',
    route: BenchmarkRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// ROUTER TO UPLOAD IMAGE
/**
 * @method POST
 * @route {baseUrl}/upload
 * @select form-data in postman
 * @set key "image" and select image from your device
 */
router.post("/upload", upload.single("image"), (req: Request, res: Response) => {
  if (req.file) {
    const result = uploadFile(req.file);
    result.then((response) => {
      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(400).json(response);
      }
    });
  } else {
    return res.status(400).json({ success: false, error: "No file provided" });
  }
});

export default router;
