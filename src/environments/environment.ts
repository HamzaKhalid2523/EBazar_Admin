import { version } from '../../package.json';
export const environment = {
  production: true,
  envName: 'office-deployed',
  envHost: 'http://localhost',
  tableName: 'production_event_distributed',
  radiusTableName: 'rad_distributed',
  // version: version,

  apiPath: 'http://localhost:2000/api',
  reporterApiPath: 'http://localhost:3200/api',
  bigdataPath: 'http://localhost:3100/api/bigdata',
  version2Path: 'http://localhost:3100/api/v2/',
  socketPath: 'http://localhost:5200',
  file_server_path: 'http://localhost:3535',

  firebaseConfig: {
    apiKey: "AIzaSyB_LZ-MpJcXdoeFFMI39-kiPkm1SqDkYFw",
    authDomain: "ebazar-90d3b.firebaseapp.com",
    projectId: "ebazar-90d3b",
    storageBucket: "ebazar-90d3b.appspot.com",
    messagingSenderId: "264160234618",
    appId: "1:264160234618:web:89fae26d35c2f11d25ffc3",
    measurementId: "G-ZTRYH6VSY2"
  }
};
// export const environment = {
//   production: false,
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

// export const environment = {
//   production: true,
//   envName: "office-deployed",
//   envHost: "http://100.110.1.214",
//   tableName: "production_event_distributed",
//   radiusTableName: "radius_events_distributed",
//   version: version,

//   apiPath: "http://100.110.1.214:3100/api",
//   reporterApiPath: "http://100.110.1.214:3200/api",
//   bigdataPath: "http://100.110.1.214:3100/api/bigdata",
//   version2Path: "http://100.110.1.214:3100/api/v2/",
//   socketPath: "http://100.110.1.214:5200",
//   file_server_path: "http://100.110.1.214:3535",
// };
// export const environment = {
//   production: true,
//   envName: "sco-deployed",
//   envHost: "http://10.120.1.195",
//   tableName: "production_event_distributed",
//   radiusTableName: "rad_distributed",
//   // version: version,

//   apiPath: "http://10.120.1.195:3100/api",
//   reporterApiPath: "http://10.120.1.195:3200/api",
//   bigdataPath: "http://10.120.1.195:3100/api/bigdata",
//   version2Path: "http://10.120.1.195:3100/api/v2/",
//   socketPath: "http://10.120.1.195:5200",
//   file_server_path: "http://10.120.1.195:3535",
// };
