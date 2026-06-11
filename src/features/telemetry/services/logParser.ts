import type { DeduplicatedLog, TelemetryPacket } from "../types/telemetry.types";

export class LogStreamOptimizer {
    public static generateSignature(packet: TelemetryPacket): string {
        const { serverNodeId, severity, metrics: { geo: { datacenter } } } = packet;
        return `${datacenter}-${serverNodeId}-${severity}`;
    }

    public static processStreamBatch(
        incomingPackets: TelemetryPacket[],
        existingCache: Map<string, DeduplicatedLog>
    ): Map<string, DeduplicatedLog> {

        const updatedCache = new Map(existingCache);

        incomingPackets.forEach(packet => {
            const signature = this.generateSignature(packet);

            if (updatedCache.has(signature)) {
                const existingLog = updatedCache.get(signature);
                if (existingLog) {
                    updatedCache.set(signature, {
                        ...existingLog,
                        occurrenceCount: existingLog.occurrenceCount + 1,
                        lastSeenTimestamp: packet.timestamp
                    });
                }
            } else {
                updatedCache.set(signature, {
                    ...packet,
                    occurrenceCount: 1,
                    lastSeenTimestamp: packet.timestamp
                });
            }
        });
        
        return updatedCache;
    }
}