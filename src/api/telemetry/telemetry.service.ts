import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MeterTelemetryHistory } from "src/database/entities/meter-history.entity";
import { MeterLiveState } from "src/database/entities/meter-live.entity";
import { VehicleTelemetryHistory } from "src/database/entities/vehicle-history.entity";
import { VehicleLiveState } from "src/database/entities/vehicle-live.entity";
import { Repository } from "typeorm";
import { VehicleTelemetryDto } from "./dto/vehicle.dto";
import { MeterTelemetryDto } from "./dto/meter.dto";

@Injectable()
export class TelemetryService {
    constructor(
        @InjectRepository(VehicleTelemetryHistory)
        private vh: Repository<VehicleTelemetryHistory>,
        @InjectRepository(MeterTelemetryHistory)
        private mh: Repository<MeterTelemetryHistory>,
        @InjectRepository(VehicleLiveState)
        private vl: Repository<VehicleLiveState>,
        @InjectRepository(MeterLiveState)
        private ml: Repository<MeterLiveState>,
    ) { }

    async ingestVehicle(dto: VehicleTelemetryDto) {
        await this.vh.insert(dto);

        await this.vl.upsert(
            {
                vehicleId: dto.vehicleId,
                soc: dto.soc,
                batteryTemp: dto.batteryTemp,
                lastKwhDeliveredDc: dto.kwhDeliveredDc,
            },
            ['vehicleId'],
        );
    }

    async ingestMeter(dto: MeterTelemetryDto) {
        await this.mh.insert(dto);

        await this.ml.upsert(
            {
                meterId: dto.meterId,
                lastKwhConsumedAc: dto.kwhConsumedAc,
                voltage: dto.voltage,
            },
            ['meterId'],
        );
    }
}
