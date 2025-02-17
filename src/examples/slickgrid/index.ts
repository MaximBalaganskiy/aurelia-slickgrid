import { autoinject, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

@autoinject()
export class Index {
  router!: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    const mapping: any = [
      { route: 'example1', moduleId: PLATFORM.moduleName('./example1'), name: 'example1', nav: true, title: '1- Basic Grid / 2 Grids' },
      { route: 'example2', moduleId: PLATFORM.moduleName('./example2'), name: 'example2', nav: true, title: '2- Formatters' },
      { route: 'example3', moduleId: PLATFORM.moduleName('./example3'), name: 'example3', nav: true, title: '3- Editors / Delete' },
      { route: 'example4', moduleId: PLATFORM.moduleName('./example4'), name: 'example4', nav: true, title: '4- Client Side Sort/Filter' },
      { route: 'example5', moduleId: PLATFORM.moduleName('./example5'), name: 'example5', nav: true, title: '5- Backend OData Service' },
      { route: 'example6', moduleId: PLATFORM.moduleName('./example6'), name: 'example6', nav: true, title: '6- Backend GraphQL Service' },
      { route: 'example7', moduleId: PLATFORM.moduleName('./example7'), name: 'example7', nav: true, title: '7- Header Button Plugin' },
      { route: 'example8', moduleId: PLATFORM.moduleName('./example8'), name: 'example8', nav: true, title: '8- Header Menu Plugin' },
      { route: 'example9', moduleId: PLATFORM.moduleName('./example9'), name: 'example9', nav: true, title: '9- Grid Menu Control' },
      { route: 'example10', moduleId: PLATFORM.moduleName('./example10'), name: 'example10', nav: true, title: '10- Row Selection / 2 Grids' },
      { route: 'example11', moduleId: PLATFORM.moduleName('./example11'), name: 'example11', nav: true, title: '11- Add/Update Grid Item' },
      { route: 'example12', moduleId: PLATFORM.moduleName('./example12'), name: 'example12', nav: true, title: '12- Localization (i18n)' },
      { route: 'example13', moduleId: PLATFORM.moduleName('./example13'), name: 'example13', nav: true, title: '13- Grouping & Aggregators' },
      { route: 'example14', moduleId: PLATFORM.moduleName('./example14'), name: 'example14', nav: true, title: '14- Column Span & Header Grouping' },
      { route: 'example15', moduleId: PLATFORM.moduleName('./example15'), name: 'example15', nav: true, title: '15- Grid State & Local Storage' },
      { route: 'example16', moduleId: PLATFORM.moduleName('./example16'), name: 'example16', nav: true, title: '16- Row Move Plugin' },
      { route: 'example17', moduleId: PLATFORM.moduleName('./example17'), name: 'example17', nav: true, title: '17- Remote Model' },
      { route: 'example18', moduleId: PLATFORM.moduleName('./example18'), name: 'example18', nav: true, title: '18- Draggable Grouping' },
      { route: 'example19', moduleId: PLATFORM.moduleName('./example19'), name: 'example19', nav: true, title: '19- Row Detail View' },
      { route: 'example20', moduleId: PLATFORM.moduleName('./example20'), name: 'example20', nav: true, title: '20- Pinned Columns/Rows' },
      { route: 'example21', moduleId: PLATFORM.moduleName('./example21'), name: 'example21', nav: true, title: '21- Grid AutoHeight (full height)' },
      { route: 'example22', moduleId: PLATFORM.moduleName('./example22'), name: 'example22', nav: true, title: '22- with Bootstrap Tabs' },
      { route: 'example23', moduleId: PLATFORM.moduleName('./example23'), name: 'example23', nav: true, title: '23- Filter by Range of Values' },
      { route: 'example24', moduleId: PLATFORM.moduleName('./example24'), name: 'example24', nav: true, title: '24- Cell & Context Menu' },
      { route: 'example25', moduleId: PLATFORM.moduleName('./example25'), name: 'example25', nav: true, title: '25- GraphQL without Pagination' },
      { route: 'example26', moduleId: PLATFORM.moduleName('./example26'), name: 'example26', nav: true, title: '26- Use of Aurelia Components' },
      { route: 'example27', moduleId: PLATFORM.moduleName('./example27'), name: 'example27', nav: true, title: '27- Tree Data (Parent/Child)' },
      { route: 'example28', moduleId: PLATFORM.moduleName('./example28'), name: 'example28', nav: true, title: '28- Tree Data (Hierarchical set)' },
      { route: 'example29', moduleId: PLATFORM.moduleName('./example29'), name: 'example29', nav: true, title: '29- Grid with header and footer slots' },
      { route: 'example30', moduleId: PLATFORM.moduleName('./example30'), name: 'example30', nav: true, title: '30- Composite Editor Modal' },
      { route: 'example31', moduleId: PLATFORM.moduleName('./example31'), name: 'example31', nav: true, title: '31- Backend OData with RxJS' },
      { route: 'example32', moduleId: PLATFORM.moduleName('./example32'), name: 'example32', nav: true, title: '32- Columns Resize by Content' },
      { route: 'example33', moduleId: PLATFORM.moduleName('./example33'), name: 'example33', nav: true, title: '33- Regular & Custom Tooltip' },
      { route: ['', 'example34'], moduleId: PLATFORM.moduleName('./example34'), name: 'example34', nav: true, title: '34- Real-Time Trading Platform' },
    ];

    config.map(mapping);
    config.mapUnknownRoutes(PLATFORM.moduleName('./example34'));

    this.router = router;
  }
}
