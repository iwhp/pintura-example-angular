# Pintura Angular example project

Run `npm install` to install project dependencies, then run `npm start` to start the development server.

Navigate to http://localhost:4200 to view the project.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/pqina/pintura-example-angular)

We need to set the `compilerOptions` property `esModuleInterop` to `true` in our `tsconfig.json` to import the FilePond modules.

Additionally the product build has specific settings for `optimization` to [prevent CSS warning messages](https://github.com/angular/angular-cli/issues/20906).

### License

This projects uses a test version of Pintura. This version of Pintura will show a watermark in the editor and on generated images.

Purchase a license at https://pqina.nl/pintura to use Pintura in production.
