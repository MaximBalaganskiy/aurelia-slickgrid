import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { HttpClient } from 'aurelia-http-client';
import { FieldType, FilterType, Formatters, GraphqlService } from 'aurelia-slickgrid';

const defaultPageSize = 20;
const GRAPHQL_QUERY_DATASET_NAME = 'users';

@inject(GraphqlService, HttpClient, I18N)
export class Example6 {
  title = 'Example 6: Grid with Backend GraphQL Service';
  subTitle = `
    Use it when you need to support Pagination with a GraphQL endpoint (for simple JSON, use a regular grid)
    <br/>
    <ul class="small">
      <li><span class="red">(*) NO DATA SHOWING</span> - just change filters &amp; page and look at the "GraphQL Query" changing</li>
      <li>Only "Name" field is sortable for the demo (because we use JSON files), however "multiColumnSort: true" is also supported</li>
      <li>String column also support operator (>, >=, <, <=, <>, !=, =, ==, *)
      <ul>
        <li>The (*) can be used as startsWith (ex.: "abc*" => startsWith "abc") / endsWith (ex.: "*xyz" => endsWith "xyz")</li>
        <li>The other operators can be used on column type number for example: ">=100" (greater or equal than 100)</li>
      </ul>
    </ul>
  `;
  columnDefinitions;
  gridOptions;
  dataset = [];
  graphqlService;
  http;
  i18n;

  isWithCursor = false;
  graphqlQuery = '';
  processing = false;
  selectedLanguage;
  status = { text: '', class: '' };

  constructor(graphqlService, http, i18n) {
    this.graphqlService = graphqlService;
    this.http = http;
    this.i18n = i18n;
    // define the grid options & columns and then create the grid itself
    this.defineGrid();
    this.selectedLanguage = this.i18n.getLocale();
  }

  defineGrid() {
    this.columnDefinitions = [
      { id: 'name', name: 'Name', field: 'name', headerKey: 'NAME', filterable: true, sortable: true, type: FieldType.string },
      {
        id: 'gender', name: 'Gender', field: 'gender', headerKey: 'GENDER', filterable: true, sortable: true,
        filter: {
          type: FilterType.singleSelect,
          collection: [{ value: '', label: '' }, { value: 'male', label: 'male', labelKey: 'MALE' }, { value: 'female', label: 'female', labelKey: 'FEMALE' }]
        }
      },
      {
        id: 'company', name: 'Company', field: 'company', headerKey: 'COMPANY',
        filterable: true,
        filter: {
          type: FilterType.multipleSelect,
          collection: [{ value: 'ABC', label: 'Company ABC' }, { value: 'XYZ', label: 'Company XYZ' }]
        }
      },
      { id: 'billing.address.street', name: 'Billing Address Street', field: 'billing.address.street', headerKey: 'BILLING.ADDRESS.STREET', filterable: true, sortable: true },
      {
        id: 'billing.address.zip', field: 'billing.address.zip', headerKey: 'BILLING.ADDRESS.ZIP',
        type: FieldType.number,
        filterable: true, sortable: true,
        filter: {
          type: FilterType.compoundInput
        },
        formatter: Formatters.multiple, params: { formatters: [Formatters.complexObject, Formatters.translate] }
      }
    ];

    this.gridOptions = {
      enableAutoResize: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enableFiltering: true,
      enableCellNavigation: true,
      enableTranslate: true,
      pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: defaultPageSize,
        totalItems: 0
      },
      backendServiceApi: {
        service: this.graphqlService,
        options: this.getBackendOptions(this.isWithCursor),
        // you can define the onInit callback OR enable the "executeProcessCommandOnInit" flag in the service init
        // onInit: (query) => this.getCustomerApiCall(query)
        preProcess: () => this.displaySpinner(true),
        process: (query) => this.getCustomerApiCall(query),
        postProcess: (result) => this.displaySpinner(false)
      }
    };
  }

  displaySpinner(isProcessing) {
    this.processing = isProcessing;
    this.status = (isProcessing)
      ? { text: 'processing...', class: 'alert alert-danger' }
      : { text: 'done', class: 'alert alert-success' };
  }

  getBackendOptions(withCursor) {
    // with cursor, paginationOptions can be: { first, last, after, before }
    // without cursor, paginationOptions can be: { first, last, offset }
    return {
      columnDefinitions: this.columnDefinitions,
      datasetName: GRAPHQL_QUERY_DATASET_NAME,
      isWithCursor: withCursor,
      addLocaleIntoQuery: true,
      extraQueryArguments: [{
        field: 'userId',
        value: 123
      }],

      // when dealing with complex objects, we want to keep our field name with double quotes
      // example with gender: query { users (orderBy:[{field:"gender",direction:ASC}]) {}
      keepArgumentFieldDoubleQuotes: true
    };
  }

  /**
   * Calling your GraphQL backend server should always return a Promise of type GraphqlResult
   *
   * @param query
   * @return Promise<GraphqlResult>
   */
  getCustomerApiCall(query) {
    // in your case, you will call your WebAPI function (wich needs to return a Promise)
    // for the demo purpose, we will call a mock WebAPI function
    const mockedResult = {
      // the dataset name is the only unknown property
      // will be the same defined in your GraphQL Service init, in our case GRAPHQL_QUERY_DATASET_NAME
      data: {
        [GRAPHQL_QUERY_DATASET_NAME]: {
          nodes: [],
          pageInfo: {
            hasNextPage: true
          },
          totalCount: 100
        }
      }
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.graphqlQuery = this.graphqlService.buildQuery();
        resolve(mockedResult);
      }, 500);
    });
  }

  switchLanguage() {
    this.selectedLanguage = (this.selectedLanguage === 'en') ? 'fr' : 'en';
    this.i18n.setLocale(this.selectedLanguage);
  }
}
