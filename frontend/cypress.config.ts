const cucumber = require('cypress-cucumber-preprocessor').default;

import { defineConfig } from 'cypress';

require('dotenv').config();

module.exports = defineConfig({
  env: {
    username: process.env.MW_ADMIN_USERNAME,
    password: process.env.MW_ADMIN_PASSWORD.split('\\').join(''),
    gitUrl: 'https://github.com/OP-TED/eForms-SDK',
    branchVersion: '1.9.1',
    projectName: 'TEST_PROJECT',
    appURLPrefix: process.env.MW_BACKEND_SERVER_HOST + '/api/',
    homeURL: process.env.MW_FRONTEND_ADDRESS,
    tripleMapFragment: 'test_triple_map.ttl',
    rmlFile: 'test.rml.ttl',
    mappingPacakgeName: 'Package EF10-EF24, SDK v1.3',
    packageFile: 'package_cn_v1.3_minimal.zip',
    homePageLabel: 'Projects List | Mapping Workbench 2',
  },
  e2e: {
    baseUrl: process.env.MW_FRONTEND_ADDRESS,
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    specPattern: [
      'cypress/e2e/login.feature',
      'cypress/e2e/projects.feature',
      'cypress/e2e/projectCreate.feature',
      'cypress/e2e/vocabularyMapping.feature',
      'cypress/e2e/testDataFiles.feature',
      'cypress/e2e/cleanUp.feature',
    ],
    video: false,
    // reporter: 'junit',
    reporterOptions: {
      // mochaFile: 'cypress/results/test-results-[hash].xml',
      // toConsole: true,
      // outputs: true,
      // charts: true,
      // reportPageTitle: 'Cypress Inline Reporter',
      // embeddedScreenshots: true,
      // inlineAssets: true, //Adds the asserts inline
    },
    retries: 1,
    defaultCommandTimeout: 60000,
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
    },
  },
});
