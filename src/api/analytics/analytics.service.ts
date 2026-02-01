import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleTelemetryHistory } from 'src/database/entities/vehicle-history.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(VehicleTelemetryHistory)
    private repo: Repository<VehicleTelemetryHistory>,
  ) { }

  async performance(vehicleId: string) {
    const [row] = await this.repo.query(`
      SELECT
        SUM(v."kwhDeliveredDc") AS dc_total,
        SUM(m."kwhConsumedAc") AS ac_total,
        AVG(v."batteryTemp") AS avg_temp,
        SUM(v."kwhDeliveredDc") / NULLIF(SUM(m."kwhConsumedAc"), 0) AS efficiency
      FROM vehicle_telemetry_history v
      JOIN vehicle_meter_map vmm ON vmm.vehicle_id = v."vehicleId"
      JOIN meter_telemetry_history m ON m."meterId" = vmm.meter_id
      WHERE v."vehicleId" = $1
        AND v.timestamp >= now() - interval '24 hours'
        AND m.timestamp >= now() - interval '24 hours'
    `, [vehicleId]);

    if (!row || !row.dc_total) {
      throw new NotFoundException(`No data found for vehicle ${vehicleId} in the last 24 hours`);
    }

    return {
      vehicleId,
      totalEnergyConsumedAc: parseFloat(row.ac_total || 0),
      totalEnergyDeliveredDc: parseFloat(row.dc_total || 0),
      efficiencyRatio: parseFloat(row.efficiency || 0),
      averageBatteryTemp: parseFloat(row.avg_temp || 0),
    };
  }
}




