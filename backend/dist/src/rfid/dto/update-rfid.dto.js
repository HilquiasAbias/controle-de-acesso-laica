"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRfidDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_rfid_dto_1 = require("./create-rfid.dto");
class UpdateRfidDto extends (0, swagger_1.PartialType)(create_rfid_dto_1.CreateRfidDto) {
}
exports.UpdateRfidDto = UpdateRfidDto;
//# sourceMappingURL=update-rfid.dto.js.map