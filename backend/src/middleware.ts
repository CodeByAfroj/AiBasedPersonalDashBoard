import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "123123";
 // replace with process.env.JWT_SECRET

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}


export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Malformed token" });
    return;
  }

  try {
    // Cast to unknown first to satisfy TypeScript
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as { id: string ,username:string,role:string};
     req.user = {
       id: decoded.id,
       username: decoded.username,
       role: decoded.role,
};

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Access denied: Admins only" });
    return;
  }
  next();
};

