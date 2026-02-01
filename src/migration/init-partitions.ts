import { MigrationInterface, QueryRunner } from "typeorm";

export class InitPartitions001 implements MigrationInterface {
    async up(q: QueryRunner) {
        await q.query(`
      CREATE TABLE vehicle_telemetry_history (
        id BIGSERIAL,
        vehicle_id TEXT,
        kwh_delivered_dc NUMERIC,
        soc NUMERIC,
        battery_temp NUMERIC,
        timestamp TIMESTAMPTZ NOT NULL,
        PRIMARY KEY (id, timestamp)
      ) PARTITION BY RANGE (timestamp);
    `);
    }

    async down(q: QueryRunner) {
        await q.query(`DROP TABLE vehicle_telemetry_history`);
    }
}
