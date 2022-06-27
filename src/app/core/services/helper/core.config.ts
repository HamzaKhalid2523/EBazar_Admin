import { environment } from "src/environments/environment";

export class CoreConfig {

  public static getApiPath(): string {
    return environment.apiPath;
  }
  public static getReporterApiPath(): string {
    return environment.reporterApiPath;
  }
  public static getBigDataPath(): string {
    return environment.bigdataPath;
  }
  public static getFileServerPath(): string {
    return environment.file_server_path;
  }
  public static getSocketPath(): string {
    return environment.socketPath;
  }
  public static getVersion2Path(): string {
    return environment.version2Path;
  }
}
