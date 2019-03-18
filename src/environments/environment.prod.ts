// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { environmentParams } from 'src/environments/environment.params';

export const environment = {
    production: true,
    firebase: environmentParams.firebase, 
    endpoints: {
        healthCheckPeriod: 30000,
        useEmulator: false,
        emulatorEndpoints: {
            nest: 'http://localhost:8081',
            ledController: 'http://localhost:7777',
            ledEmulator: 'http://localhost:7777',
        },
        hardwareEndpoints: {
            nest: 'http://192.168.1.40:8081',
            ledController: 'http://192.168.1.40:8080',
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
