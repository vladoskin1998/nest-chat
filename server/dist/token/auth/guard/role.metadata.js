"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMetadata = void 0;
const common_1 = require("@nestjs/common");
const RoleMetadata = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.RoleMetadata = RoleMetadata;
//# sourceMappingURL=role.metadata.js.map