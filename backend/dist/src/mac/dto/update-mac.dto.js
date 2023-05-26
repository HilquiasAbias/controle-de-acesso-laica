"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMacDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_mac_dto_1 = require("./create-mac.dto");
class UpdateMacDto extends (0, mapped_types_1.PartialType)(create_mac_dto_1.CreateMacDto) {
}
exports.UpdateMacDto = UpdateMacDto;
//# sourceMappingURL=update-mac.dto.js.map