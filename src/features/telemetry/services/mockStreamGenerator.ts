import type { TelemetryPacket, LogSeverity } from "../types/telemetry.types";

export function generateTelemetryBatch(): TelemetryPacket[] {

    const numberOfPackets = Math.floor(Math.random() * 10) + 1;

    return Array.from({ length: numberOfPackets }, (_, index) => {

        const severitySelector = Math.floor(Math.random() * 3);
        let finalSeverity: LogSeverity = 'INFO';

        if (severitySelector === 1) finalSeverity = 'WARNING';
        if (severitySelector === 2) finalSeverity = 'CRITICAL';

        return {
            id: `packet-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 5)}`,
            timestamp: Date.now(),
            serverNodeId: `node-edge-${Math.floor(Math.random() * 3) + 1}`,
            severity: finalSeverity,
            message: "Edge system operational pulse metric logged",
            metrics: {
                cpuUsagePercent: Math.floor(Math.random() * 40) + 40,
                geo: {
                    datacenter: `dc-region-${Math.floor(Math.random() * 3) + 1}`
                }
            }
        };
    });
}
