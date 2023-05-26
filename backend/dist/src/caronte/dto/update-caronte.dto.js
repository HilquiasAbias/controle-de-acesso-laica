"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCaronteDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_caronte_dto_1 = require("./create-caronte.dto");
class UpdateCaronteDto extends (0, mapped_types_1.PartialType)(create_caronte_dto_1.CreateCaronteDto) {
}
exports.UpdateCaronteDto = UpdateCaronteDto;
//# sourceMappingURL=update-caronte.dto.js.map