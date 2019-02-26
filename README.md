# Launch emulator server

``cd server/ && node index.js``

1. Create user and prepare [server](server-setup.md).

2. ``git clone git@github.com:VilniusTechnology/orange-home-automator-ui.git``

3. ``cd orange-home-automator-ui``

4. ``npm install``

5. ``npm install -g @angular/cli``

6. Prepare params: ``mv environment.params.ts.dist environment.params.ts``

7. Update config, with correct values: ``nano src/environments/environment.ts``.

8. ``ng serve --ssl --port 4043``

NG ON HTTPS:
https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a

https://medium.com/@richardr39/using-angular-cli-to-serve-over-https-locally-70dab07417c8


