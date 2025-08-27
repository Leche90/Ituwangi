"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: process.env.JWT_SECRET || '0d3c45528b9f634eae8386699bb9f3ac42836e617df7b605b9c060e3af2bf5d6',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
//# sourceMappingURL=jwt.constants.js.map