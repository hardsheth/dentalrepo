import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
const serviceName = process.env.OTEL_SERVICE_NAME ?? 'dental-clinic-api';

const sdk = new NodeSDK({
  serviceName,
  traceExporter: endpoint ? new OTLPTraceExporter({ url: endpoint }) : undefined,
  instrumentations: [getNodeAutoInstrumentations()],
});

void sdk.start();

process.on('SIGTERM', () => {
  void sdk.shutdown();
});
