"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBluetoothDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_bluetooth_dto_1 = require("./create-bluetooth.dto");
class UpdateBluetoothDto extends (0, mapped_types_1.PartialType)(create_bluetooth_dto_1.CreateBluetoothDto) {
}
exports.UpdateBluetoothDto = UpdateBluetoothDto;
//# sourceMappingURL=update-bluetooth.dto.js.map