import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class MeterTelemetryDto {
    @IsString()
    @IsNotEmpty()
    meterId: string;

    @IsNumber()
    @IsPositive()
    kwhConsumedAc: number;

    @IsNumber()
    @IsPositive()
    voltage: number;

    @IsDateString()
    timestamp: string;
}
