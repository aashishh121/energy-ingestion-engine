import { Module } from '@nestjs/common';
import { envConfig } from './config/env.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalyticsModule } from './api/analytics/analytics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryModule } from './api/telemetry/telemetry.module';
import { MeterTelemetryHistory } from './database/entities/meter-history.entity';
import { MeterLiveState } from './database/entities/meter-live.entity';
import { VehicleTelemetryHistory } from './database/entities/vehicle-history.entity';
import { VehicleLiveState } from './database/entities/vehicle-live.entity';
import { VehicleMeterMap } from './database/entities/vehicle-meter-map.entity';
import { EnvType } from './enums/env-type.enum';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envConfig.database.host,
      port: envConfig.database.port,
      username: envConfig.database.username,
      password: envConfig.database.password,
      database: envConfig.database.database,
      entities: [
        MeterTelemetryHistory,
        MeterLiveState,
        VehicleTelemetryHistory,
        VehicleLiveState,
        VehicleMeterMap,
      ],
      synchronize: envConfig.env === EnvType.DEVELOPMENT, // Auto-create tables (dev only)
      extra: {
        max: 50,
        connectionTimeoutMillis: 5000,
      },
      maxQueryExecutionTime: 1000,
    }),
    TelemetryModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
