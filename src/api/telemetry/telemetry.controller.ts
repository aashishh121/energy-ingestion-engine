import { Controller, Post, Body } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { MeterTelemetryDto } from './dto/meter.dto';
import { VehicleTelemetryDto } from './dto/vehicle.dto';

@Controller('v1/ingestion')
export class TelemetryController {
    constructor(private readonly service: TelemetryService) { }

    @Post('meter')
    ingestMeter(@Body() dto: MeterTelemetryDto) {
        return this.service.ingestMeter(dto);
    }

    @Post('vehicle')
    ingestVehicle(@Body() dto: VehicleTelemetryDto) {
        return this.service.ingestVehicle(dto);
    }
}

