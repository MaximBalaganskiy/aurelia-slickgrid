import { IContainer } from 'aurelia';
import { AureliaSlickgridCustomElement } from './custom-elements/aurelia-slickgrid';

export const AureliaSlickGridConfiguration = {
    register(container: IContainer): IContainer {
        return container.register(AureliaSlickgridCustomElement);
    }
};

export { HelloWorld } from './hello-world';
export { AureliaSlickgridCustomElement } from './custom-elements/aurelia-slickgrid';
