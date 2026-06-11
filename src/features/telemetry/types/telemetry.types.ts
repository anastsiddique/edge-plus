export type LogSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface TelemetryPacket {
  id: string;
  timestamp: number;
  serverNodeId: string;
  severity: LogSeverity;
  message: string;
  metrics: {
    cpuUsagePercent: number;
    geo: {
      datacenter: string;
    }
  }
}

export interface DeduplicatedLog extends TelemetryPacket {
  occurrenceCount: number;
  lastSeenTimestamp: number;
}
