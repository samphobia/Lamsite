"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateToken = exports.generateJWTToken = exports.authenticateUser = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       res.status(401).json({ message: 'Unauthorized: Token not provided' });
//       return;
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; userRole: string };
//     // Attach userId and role to the request object for further use in controllers
//     req.user = { userId: decoded.userId, userRole: decoded.userRole } as AuthenticatedUserData; 
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(403).json({ message: 'Forbidden: Invalid token' });
//   }
// };
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized - Missing token' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token' });
        }
        req.user = decoded;
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
const authenticateUser = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Extract userId and role from the authentication headers
            const userId = req.headers['user-id'];
            const userRole = req.headers['user-role'];
            // Validate that userId and role are present
            if (!userId || !userRole) {
                res.status(401).json({ message: 'Unauthorized: User ID or Role not provided in headers' });
                return;
            }
            // Check if the user has an allowed role
            if (!allowedRoles.includes(userRole)) {
                res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
                return;
            }
            // Attach userId and role to the request object for further use in controllers
            req.user = { userId, userRole };
            next();
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
};
exports.authenticateUser = authenticateUser;
const generateJWTToken = (userId, userRole) => {
    if (!userId || !userRole) {
        throw new Error('userId and userRole are required for generating JWT token');
    }
    // Set the expiration time for the token
    const expiresIn = '1h';
    // Generate the JWT token
    const token = jsonwebtoken_1.default.sign({ userId, userRole }, process.env.JWT_SECRET, { expiresIn });
    return token;
};
exports.generateJWTToken = generateJWTToken;
const invalidatedTokens = new Set();
// Function to invalidate a user's token
const invalidateToken = (token) => {
    // Add the token to the set of invalidated tokens
    invalidatedTokens.add(token);
};
exports.invalidateToken = invalidateToken;
//# sourceMappingURL=auth.js.map