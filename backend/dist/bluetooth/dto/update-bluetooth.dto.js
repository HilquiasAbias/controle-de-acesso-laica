"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBluetoothDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_bluetooth_dto_1 = require("./create-bluetooth.dto");
class UpdateBluetoothDto extends (0, swagger_1.PartialType)(create_bluetooth_dto_1.CreateBluetoothDto) {
}
exports.UpdateBluetoothDto = UpdateBluetoothDto;
//# sourceMappingURL=update-bluetooth.dto.js.map