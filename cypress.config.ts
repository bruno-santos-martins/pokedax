import { defineConfig } from "cypress";

export default defineConfig({
  "chromeWebSecurity": false,
  //"experimentalModuleVariables": true,
  e2e: {
    setupNodeEvents(on, config) {

    },
    //baseUrl: 'https://pokedax-five.vercel.app',
    baseUrl: process.env['CYPRESS_BASE_URL'] || 'http://localhost:4200',
    testIsolation: false,
  },
});
