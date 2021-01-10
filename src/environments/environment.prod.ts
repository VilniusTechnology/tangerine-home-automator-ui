// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    envTitle: 'PROD',
    endpoints: {
        healthCheckPeriod: 30000,
        useEmulator: false,
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
            host: "https://shady.local",
            contours: {
              main: {}
            },
          },
        },
      },
        sensors : {
        servers: {
          "shady":{
            url: "https://shady.local",
            uri: "sensors-all",
            title: "Miegamasis",
            zones: [
              {
                id: '0',
                title: 'Visi',
                path: '/sensors-atmo',
                metrics: [
                  'pressure',
                  'humidity',
                  'temperature',
                  'light',
                  'pir',
                ],
              }
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
