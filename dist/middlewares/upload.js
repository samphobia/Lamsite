"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// middleware/upload.ts
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage(); // Store files in memory as buffers
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
//# sourceMappingURL=upload.js.map