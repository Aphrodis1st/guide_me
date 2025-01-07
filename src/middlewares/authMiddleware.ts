import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../database/models/User";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

// const authenticateUser = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	const authHeader = req.headers.authorization;
// 	if (!authHeader || !authHeader.startsWith("Bearer ")) {
// 		return res.status(401).json({ message: "Unauthorized" });
// 	}

// 	const token = authHeader.split(" ")[1];

// 	try {
// 		const decoded = jwt.decode(token) as JwtPayload;
// 		if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
// 			return res
// 				.status(401)
// 				.json({ message: "Token has expired, please login again!" });
// 		}

// 		if (!ACCESS_TOKEN_SECRET) {
// 			throw new Error("ACCESS_TOKEN_SECRET is not defined");
// 		}

// 		const verifiedToken = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

// 		const user = await User.findByPk(verifiedToken.userId);

// 		if (!user) {
// 			console.log("User not found with ID:", verifiedToken.userId);
// 			return res.status(401).json({ message: "User not found" });
// 		}

// 		// Attach user to req object instead of req.body
// 		(req as any).user = user;

// 		next();
// 	} catch (error) {
// 		console.error("Error authenticating user:", error);
// 		if (error instanceof jwt.TokenExpiredError) {
// 			return res
// 				.status(401)
// 				.json({ message: "Token has expired, please login again!" });
// 		} else if (error instanceof jwt.JsonWebTokenError) {
// 			return res
// 				.status(401)
// 				.json({ message: "Invalid token", error: error.message });
// 		} else {
// 			return res.status(500).json({ message: "Internal server error" });
// 		}
// 	}
// };

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided!" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    console.log("Decoded Token:", decoded);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);

    return res.status(403).json({ message: "Invalid token!" });
  }
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Please login again" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

    if (!decoded.userId) {
      return res
        .status(401)
        .json({ message: "Invalid token, user ID missing" });
    }

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const user_role = decoded.role;

    if (user_role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    if (decoded.isPasswordExpired) {
      return res.status(403).json({
        message: "Password has expired, please update your password!",
      });
    }

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Invalid token, try login again" });
    } else {
      console.error("Error in isAdmin middleware:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
};
const isProducer = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Please login again" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

    if (!decoded.userId) {
      return res
        .status(401)
        .json({ message: "Invalid token, user ID missing" });
    }

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const user_role = decoded.role;

    if (user_role !== "PRODUCER") {
      return res
        .status(403)
        .json({ message: "Access denied. Producers only." });
    }

    if (decoded.isPasswordExpired) {
      return res.status(403).json({
        message: "Password has expired, please update your password!",
      });
    }

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Invalid token, try login again" });
    } else {
      console.error("Error in isAdmin middleware:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
};

export default { authenticateUser, isAdmin, isProducer };
