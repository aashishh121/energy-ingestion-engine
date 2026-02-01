import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDateString, Min, Max } from 'class-validator';

export class VehicleTelemetryDto {
    @IsString()
    @IsNotEmpty()
    vehicleId: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    soc: number;

    @IsNumber()
    @IsPositive()
    kwhDeliveredDc: number;

    @IsNumber()
    @IsPositive()
    batteryTemp: number;

    @IsDateString()
    timestamp: string;
}
