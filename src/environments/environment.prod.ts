// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {IMqttServiceOptions} from "ngx-mqtt";

export const environment = {
    production: true,
    envTitle: 'PROD',
    endpoints: {
        healthCheckPeriod: 30000,
        sensorCheckPeriod: 60000,
        useEmulator: false,
        mqtt: {
          server: 'hub.local',
          protocol: 'wss' as IMqttServiceOptions['protocol'],
          port: 8884,
        },
        emulatorEndpoints: {
            nest: 'http://localhost:8081',
            ledController: 'http://localhost:7777',
            ledEmulator: 'http://localhost:7777',
        },
        hardwareEndpoints: {
          nest: { url: 'https://shady.local'},
          healthCheck: { url: 'https://shady.local', healthcheck: true },
          ledController: { url: 'https://shady.local/led', healthcheck: true },
        },
        led : {
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
                  'light_lvl',
                ],
                interval: 500,
              },
            ],
          },
          "sunny":{
            url: "https://sunny.local",
            uri: "",
            title: "Svetaine",
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
                  'light_lvl',
                ],
                interval: 500,
              },
            ],
          },
          "wurk":{
            url: "wss://hub.local",
            uri: "sensors-all",
            title: "Darbo Luko",
            zones: [
              {
                id: '0',
                type: 'mqtt',
                title: 'Atmosferinis',
                base: 'zigbee2mqtt',
                room: 'wurk',
                path: 'sensors/atmo',
                metrics: [
                  'humidity',
                  'temperature',
                  'pressure',
                ],
              },
              {
                id: '1',
                type: 'mqtt',
                title: 'Šviesos',
                base: 'zigbee2mqtt',
                room: 'wurk',
                path: 'sensors/light',
                metrics: [
                  'illuminance_lux',
                ],
              }
            ],
          },
          "medium":{
            url: "wss://hub.local",
            uri: "sensors-all",
            title: "Darbo Neringos",
            zones: [
              {
                id: '0',
                type: 'mqtt',
                title: 'Atmosferinis',
                base: 'zigbee2mqtt',
                room: 'medium',
                path: 'sensors/atmo',
                metrics: [
                  'humidity',
                  'temperature',
                  'pressure',
                ],
              },
            ],
          },
        },
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
