// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environmentParams } from 'src/environments/environment.params';

export const environment = {
    production: false,
    firebase: environmentParams.firebase, 
    endpoints: {
        healthCheckPeriod: 3000,
        useEmulator: true,
        emulatorEndpoints: {
            mainNestUrl: 'http://localhost:8081',
            ledControllerAddress: 'http://localhost:7777',
            nestTimedSettingsUrl: 'http://localhost:8082',
        },
        hardwareEndpoints: {
            mainNestUrl: 'http://192.168.1.47:8081/',
            ledControllerAddress: 'http://192.168.1.47:8080/',
            nestTimedSettingsUrl: 'http://192.168.1.47:3002',
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
