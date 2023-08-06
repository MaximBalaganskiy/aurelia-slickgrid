import Aurelia/*, { StyleConfiguration }*/ from 'aurelia';
import { MyApp } from './my-app';
// Css files imported in this main file are NOT processed by style-loader
// They are for sharedStyles in shadowDOM.
// However, css files imported in other js/ts files are processed by style-loader.
// import shared from './shared.css';
import * as Plugin from "../src/index";
import { I18nConfiguration } from '@aurelia/i18n';
import '@slickgrid-universal/common/dist/styles/css/slickgrid-theme-bootstrap.css';

Aurelia
  /*
  .register(StyleConfiguration.shadowDOM({
    // optionally add the shared styles for all components
    sharedStyles: [shared]
  }))
  */
  // Register all exports of the plugin
  .register(I18nConfiguration, Plugin)
  .app(MyApp)
  .start();
