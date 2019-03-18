# Configure

```java-script

export const environment = {
    production: true, // set true if on server
    firebase: environmentParams.firebase, 
    endpoints: {
        healthCheckPeriod: 30000,
        useEmulator: false, // set true if running on emulator
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

```
