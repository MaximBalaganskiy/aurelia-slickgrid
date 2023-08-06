// import {
//   inject,
//   Container,
//   createOverrideContext,
//   singleton,
//   ViewCompiler,
//   ViewResources,
//   ViewSlot,
// } from 'aurelia-framework';
import { AureliaViewOutput } from '../models/index';
import { IAurelia, singleton } from 'aurelia';

@singleton()
export class AureliaUtilService {
  constructor(
    @IAurelia private readonly au: IAurelia
  ) { }

  async createAureliaViewModelAddToSlot(templateUrl: string, bindableData: any, targetElement?: HTMLElement | Element, clearTargetContent = false): Promise<AureliaViewOutput | null> {
    if (targetElement) {
      // TODO: MB - is this needed?
      if (clearTargetContent && targetElement.innerHTML) {
        targetElement.innerHTML = '';
      }

      targetElement.innerHTML = '<au-compose component.bind="template" component.ref="viewModelRef"></au-compose>';

      // create some bindings including the template & other bindable data
      const bindings: any = { template: (templateUrl || ''), ...bindableData, viewModelRef: {} };
      return { controller: await this.au.enhance({ host: targetElement, component: bindings }) };
    }
    return null;
  }

  async createAureliaViewAddToSlot(templateUrl: string, targetElement?: HTMLElement | Element, clearTargetContent = false): Promise<AureliaViewOutput | null> {
    if (targetElement) {
      // TODO: MB - is this needed?
      if (clearTargetContent && targetElement.innerHTML) {
        targetElement.innerHTML = '';
      }

      targetElement.innerHTML = '<au-compose template.bind="template" component.ref="viewModelRef"></au-compose>';

      // create some bindings including the template & other bindable data
      const bindings = { template: (templateUrl || ''), viewModelRef: {} };
      return { controller: await this.au.enhance({ host: targetElement, component: bindings }) };
    }
    return null;
  }
}
