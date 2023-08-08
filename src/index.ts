import { IContainer } from 'aurelia';
import { AureliaSlickgridCustomElement } from './custom-elements/aurelia-slickgrid';

export const AureliaSlickGridConfiguration = {
    register(container: IContainer): IContainer {
        return container.register(AureliaSlickgridCustomElement);
    }
};

export { HelloWorld } from './hello-world';
export { AureliaSlickgridCustomElement } from './custom-elements/aurelia-slickgrid';
import type {
    AureliaGridInstance,
    AureliaViewOutput,
    GridOption,
    RowDetailView,
    SlickGrid,
    ViewModelBindableData,
    ViewModelBindableInputData
} from './models/index';

// re-export only the Aurelia interfaces (models), some of which were overriden from Slickgrid-Universal
export {
    AureliaGridInstance,
    AureliaViewOutput,
    GridOption,
    RowDetailView,
    SlickGrid,
    ViewModelBindableData,
    ViewModelBindableInputData
};

// expose all public classes
export {
    AureliaUtilService,
    TranslaterService,
    disposeAllSubscriptions
} from './services/index';
