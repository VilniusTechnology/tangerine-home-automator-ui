// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {IMqttServiceOptions} from "ngx-mqtt";

export const environment = {
    production: false,
    envTitle: 'DEV',
    endpoints: {
      healthCheckPeriod: 5000,
      sensorCheckPeriod: 5000,
      useEmulator: false,
      mqtt: {
        server: 'hub.local',
        protocol: 'wss' as IMqttServiceOptions['protocol'],
        port: 8884
      },
      emulatorEndpoints: {
            nest: 'http://localhost:8081',
            healthCheck: 'http://localhost:8081',
            ledController: 'http://localhost:7777',
            ledEmulator: 'http://localhost:7777',
        },
      led: {
          servers: {
            "shady":{
              title: "Miegamasis",
              host: "https://shady.local",
              contours: {
                main: {}
              },
            },
            "sunny":{
              title: "Svetaine",
              host: "https://sunny.local",
              contours: {
                main: {}
              },
            },
            "wurk":{
              title: "Darbo kambarys",
              host: "https://wurk.local",
              contours: {
                main: {}
              },
            },
          },
      },
      sensors: {
          servers: {
            "shady":{
              url: "https://shady.local",
              uri: "",
              title: "Miegamasis",
              zones: [
                {
                  id: '0',
                  type: 'http',
                  title: 'Visi',
                  path: '/sensors-all',
                  metrics: [
                    'pressure',
                    'humidity',
                    'temperature',
                    'light',
                    'pir',
                  ],
                  interval: 500,
                },
              ],
            },
            "sunny":{
              url: "wss://hub.local",
              uri: "sensors-all",
              title: "Svetainė",
              zones: [
                // {
                //   id: '0',
                //   type: 'mqtt',
                //   title: 'Atmosferinis',
                //   base: 'zigbee2mqtt',
                //   room: 'sunny',
                //   path: 'sensors/atmo',
                //   metrics: [
                //     'atmo',
                //     'humidity',
                //     'temperature',
                //     'light',
                //     'pir',
                //   ],
                // },
                {
                  id: '1',
                  type: 'mqtt',
                  title: 'Šviesos',
                  base: 'zigbee2mqtt',
                  room: 'sunny',
                  path: 'sensors/light',
                  metrics: [
                    'illuminance_lux',
                  ],
                }
              ],
            },
          },
      },
      hardwareEndpoints: {
          nest: { url: 'https://shady.local'},
          healthCheck: { url: 'https://shady.local', healthcheck: true },
          ledController: { url: 'https://shady.local/led', healthcheck: true },
      },
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
