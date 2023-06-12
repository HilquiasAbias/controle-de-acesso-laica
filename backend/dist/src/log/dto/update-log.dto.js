"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLogDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_log_dto_1 = require("./create-log.dto");
class UpdateLogDto extends (0, swagger_1.PartialType)(create_log_dto_1.CreateLogDto) {
}
exports.UpdateLogDto = UpdateLogDto;
//# sourceMappingURL=update-log.dto.js.map