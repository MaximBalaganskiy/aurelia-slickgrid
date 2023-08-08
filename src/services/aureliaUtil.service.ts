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
import { Constructable, CustomElement, IAurelia, singleton } from 'aurelia';

@singleton()
export class AureliaUtilService {
  constructor(
    @IAurelia private readonly au: IAurelia
  ) { }

  async createAureliaViewModelAddToSlot(viewModel: Constructable, bindableData: any, targetElement?: HTMLElement | Element, clearTargetContent = false): Promise<AureliaViewOutput | null> {
    if (targetElement) {
      // TODO: MB - is this needed?
      if (clearTargetContent && targetElement.innerHTML) {
        targetElement.innerHTML = '';
      }

      const def = CustomElement.getDefinition(viewModel);
      targetElement.innerHTML = `<${def.name}></${def.name}>`;
      return { controller: await this.au.enhance({ host: targetElement, component: { ...bindableData, viewModelRef: {} } }) };
    }
    return null;
  }
}
