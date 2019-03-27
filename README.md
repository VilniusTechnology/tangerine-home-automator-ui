# Tangerine Nest smartHome automator (IOT) UI

This is user interface (browser based) for [Tangerine Nest smartHome automator project](https://github.com/VilniusTechnology/tangerine-nest) it is used for controlling Your home automation nest.

It should be deployed on server or alternatively on Rasbbery running your nest and can be accesed oved http[s].

Using it You should be able to get Your sensor readings or controll LED's or other connected modules.

## Setup and launch

### Production Launch

0. Launch `tangerine-nest`.

1. Setup [config](/docs/config.md) params.

2. Build for PRODUCTION: ``ng build --prod``

3. Run `build-deploy.sh` to upload.

4. Prepare [server](/docs/server-setup.md) and launch APP.


### Running [DEV] with||without emulator

0. Launch `tangerine-nest` || `tangerine-nest in emulated mode` .

1. Install for [development](/docs/development.md).

2. Setup [config](/docs/config.md) params.

3. Launch ``ng serve --watch``
