export type ObolType = 'DEVICE_MAC' | 'TAG_RFID' | 'USER_CREDENTIALS';
export type LogTypes = 'INFO' | 'WARN' | 'DEBUG';
export type DebugTypes = 'debug1' | 'debug2' | 'debug3';
export type WarnTypes = 'warn1' | 'warn2' | 'warn3';
export type InfoTypes = 'info1' | 'info2' | 'info3';
export declare class CreateLogDto {
    deviceMac: string;
    topic: string;
    type: string;
    message: string;
}
