import { ProdEnviorment } from "./prod.env";
import { DevEnvironment } from "./dev.env";

export function getEnvironmentVariables() {
  if (process.env.NODE_ENV === "production") {
    return ProdEnviorment;
  }
  return DevEnvironment;
}
