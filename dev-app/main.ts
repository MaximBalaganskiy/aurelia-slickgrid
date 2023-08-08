import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import Aurelia/*, { StyleConfiguration }*/ from 'aurelia';
import { MyApp } from './my-app';
// Css files imported in this main file are NOT processed by style-loader
// They are for sharedStyles in shadowDOM.
// However, css files imported in other js/ts files are processed by style-loader.
// import shared from './shared.css';
import * as Plugin from "../src/index";
import { I18nConfiguration } from '@aurelia/i18n';
import '@slickgrid-universal/common/dist/styles/css/slickgrid-theme-material.css';
import { RouterConfiguration } from '@aurelia/router';
import { Example19DetailView } from './example19-detail-view';
import { Example19Preload } from './example19-preload';
import { DecimalValueConverter } from './value-converters/decimal';
import { StringifyValueConverter } from './value-converters/stringify';
import { DateFormatValueConverter } from './value-converters/date-format';
import { Example19 } from './example19';

Aurelia
  /*
  .register(StyleConfiguration.shadowDOM({
    // optionally add the shared styles for all components
    sharedStyles: [shared]
  }))
  */
  // Register all exports of the plugin
  .register(I18nConfiguration, Plugin, RouterConfiguration.customize({ useHref: false }), Example19DetailView, Example19Preload)
  .register(DecimalValueConverter, StringifyValueConverter, DateFormatValueConverter)
  .app(MyApp)
  .start();
