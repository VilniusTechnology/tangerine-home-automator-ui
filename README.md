# Build AND Launch

1. Localy: ``git clone git@github.com:VilniusTechnology/orange-home-automator-ui.git``

2. ``cd orange-home-automator-ui``

3. ``npm install``

4. ``npm install -g @angular/cli``

5. Prepare params: ``mv environment.params.ts.dist environment.params.ts``

6. Update config, with correct values: ``nano src/environments/environment.ts``.

7. Test it: ``ng serve --ssl``

8. Build for PRODUCTION: ``ng build --prod``

9. Tarball it

10. Create user and prepare [server](server-setup.md).

11. Check it out.


NG ON HTTPS:
https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a

https://medium.com/@richardr39/using-angular-cli-to-serve-over-https-locally-70dab07417c8


## Running with emulator



