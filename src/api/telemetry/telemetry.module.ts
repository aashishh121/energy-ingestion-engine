import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { VehicleTelemetryHistory } from 'src/database/entities/vehicle-history.entity';
import { MeterTelemetryHistory } from 'src/database/entities/meter-history.entity';
import { VehicleLiveState } from 'src/database/entities/vehicle-live.entity';
import { MeterLiveState } from 'src/database/entities/meter-live.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([VehicleTelemetryHistory, MeterTelemetryHistory, VehicleLiveState, MeterLiveState]),
    ],
    controllers: [TelemetryController],
    providers: [TelemetryService],
})
export class TelemetryModule { }
