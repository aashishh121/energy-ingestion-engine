import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { VehicleTelemetryHistory } from '../../database/entities/vehicle-history.entity';
import { MeterTelemetryHistory } from '../../database/entities/meter-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeterTelemetryHistory, VehicleTelemetryHistory]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule { }
