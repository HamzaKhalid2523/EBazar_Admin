import { version } from '../../package.json';
export const environment = {
  production: true,
  envName: "sco-deployed",
  envHost: "http://10.120.1.195",
  tableName: "production_event_distributed",
  radiusTableName: "rad_distributed",

  apiPath: "http://10.120.1.195:3100/api",
  reporterApiPath: "http://10.120.1.195:3200/api",
  bigdataPath: "http://10.120.1.195:3100/api/bigdata",
  version2Path: 'http://10.120.1.195:3100/api/v2/',
  socketPath: "http://10.120.1.195:5200",
  file_server_path: "http://10.120.1.195:3535",
};
// export const environment = {
//   production: true,
//   envName: 'sco-deployed',
//   envHost: 'http://k3s-two.snskies.local',
//   tableName: 'production_event_distributed',
//   radiusTableName: 'radius_events_distributed',
//   version: version,

//   apiPath: 'http://k3s-two.snskies.local/api',
//   reporterApiPath: 'http://k3s-two.snskies.local/reporter-api',
//   bigdataPath: 'http://k3s-two.snskies.local/api/bigdata',
//   version2Path: 'http://k3s-two.snskies.local/api/v2/',
//     socketPath: 'http://100.110.1.214:5200',
//   file_server_path: 'http://100.110.1.214:3535',
// };
// export const environment = {
//   production: true,
//   envName: 'sco-deployed',
//   envHost: 'http://100.110.1.214',
//   tableName: 'production_event_distributed',
//   radiusTableName: 'radius_events_distributed',
//   // version: version,

//   apiPath: 'http://100.110.1.214:3100/api',
//   reporterApiPath: 'http://100.110.1.214:3200/api',
//   bigdataPath: 'http://100.110.1.214:3100/api/bigdata',
//   version2Path: 'http://100.110.1.214:3100/api/v2/',
//   socketPath: 'http://100.110.1.214:5200',
//   file_server_path: 'http://100.110.1.214:3535',
// };

// export const environment = {
//   production: true,
//   envName: "sco-deployed",
//   envHost: "http://10.120.1.144",
//   tableName: "production_event_distributed",
//   radiusTableName: "rad_distributed",
  
//   apiPath: "http://10.120.1.144:3100/api",
//   reporterApiPath: "http://10.120.1.144:3200/api",
//   bigdataPath: "http://10.120.1.144:3100/api/bigdata",
//   version2Path: 'http://10.120.1.144:3100/api/v2/',
//   socketPath: "http://10.120.1.144:5200",
//   file_server_path: "http://10.120.1.144:3535",
// };