import { defineConfig } from "cypress";

export default defineConfig({
  "chromeWebSecurity": false,
  //"experimentalModuleVariables": true,
  e2e: {
    setupNodeEvents(on, config) {

    },
    baseUrl: 'https://pokedax-five.vercel.app',
    testIsolation: false,
  },
});
