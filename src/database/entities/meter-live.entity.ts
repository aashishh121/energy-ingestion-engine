import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('meter_live_state')
export class MeterLiveState {
    @PrimaryColumn()
    meterId: string;

    @Column('decimal', { precision: 10, scale: 3 })
    lastKwhConsumedAc: number;

    @Column('decimal', { precision: 6, scale: 2 })
    voltage: number;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}

