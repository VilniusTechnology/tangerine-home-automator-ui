# Setup for development

1. Clone localy: ``git clone git@github.com:VilniusTechnology/tangerine-home-automator-ui.git``

2. ``cd tangerine-home-automator-ui``

3. ``npm install``

4. ``npm install -g @angular/cli``

5. Prepare params: ``mv environment.params.ts.dist environment.params.ts``

6. Update config, with correct values: ``nano src/environments/environment.ts``.

7. Test it: ``ng serve --ssl``

In some cases, using emulator instead of real hardware might be needed. In this case You should launch tangerine-nest in [emulated mode](https://github.com/VilniusTechnology/tangerine-nest).
