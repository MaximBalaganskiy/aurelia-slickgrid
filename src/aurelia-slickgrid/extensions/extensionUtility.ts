import { inject, Optional, singleton } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';

import { Constants } from '../constants';
import { SharedService } from '../services/shared.service';
import { Column, ExtensionName } from '../models/index';
import { getTranslationPrefix } from '../services/utilities';

declare function require(name: string): any;

@singleton(true)
@inject(Optional.of(I18N), SharedService)
export class ExtensionUtility {
  constructor(private i18n: I18N, private sharedService: SharedService) { }

  /**
   * Load SlickGrid Extension (Control/Plugin) dynamically (on demand)
   * This will basically only load the extension when user enables the feature
   * @param extensionName
   */
  loadExtensionDynamically(extensionName: ExtensionName): any {
    try {
      switch (extensionName) {
        case ExtensionName.autoTooltip:
          require('slickgrid/plugins/slick.autotooltips');
          break;
        case ExtensionName.cellExternalCopyManager:
          require('slickgrid/plugins/slick.cellexternalcopymanager');
          break;
        case ExtensionName.cellMenu:
          require('slickgrid/plugins/slick.cellmenu');
          break;
        case ExtensionName.checkboxSelector:
          require('slickgrid/plugins/slick.checkboxselectcolumn');
          break;
        case ExtensionName.columnPicker:
          require('slickgrid/controls/slick.columnpicker');
          break;
        case ExtensionName.contextMenu:
          require('slickgrid/plugins/slick.contextmenu');
          break;
        case ExtensionName.draggableGrouping:
          require('slickgrid/plugins/slick.draggablegrouping');
          break;
        case ExtensionName.gridMenu:
          require('slickgrid/controls/slick.gridmenu');
          break;
        case ExtensionName.groupItemMetaProvider:
          require('slickgrid/slick.groupitemmetadataprovider');
          break;
        case ExtensionName.headerButton:
          require('slickgrid/plugins/slick.headerbuttons');
          break;
        case ExtensionName.headerMenu:
          require('slickgrid/plugins/slick.headermenu');
          break;
        case ExtensionName.rowSelection:
          require('slickgrid/plugins/slick.rowselectionmodel');
          break;
        case ExtensionName.rowDetailView:
          require('slickgrid/plugins/slick.rowdetailview');
          break;
        case ExtensionName.rowMoveManager:
          require('slickgrid/plugins/slick.rowmovemanager');
          break;
      }
    } catch (e) {
      // do nothing, we fall here when using Aurelia-CLI and RequireJS
      // if you do use RequireJS then you need to make sure to include all necessary extensions in your `aurelia.json`
    }
  }

  /**
   * From a Grid Menu object property name, we will return the correct title output string following this order
   * 1- if user provided a title, use it as the output title
   * 2- else if user provided a title key, use it to translate the output title
   * 3- else if nothing is provided use text defined as constants
   */
  getPickerTitleOutputString(propName: string, pickerName: 'gridMenu' | 'columnPicker') {
    if (this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate && (!this.i18n || !this.i18n.tr)) {
      throw new Error('[Aurelia-Slickgrid] requires "I18N" to be installed and configured when the grid option "enableTranslate" is enabled.');
    }

    let output = '';
    const picker = this.sharedService.gridOptions && this.sharedService.gridOptions[pickerName] || {};
    const enableTranslate = this.sharedService.gridOptions && this.sharedService.gridOptions.enableTranslate || false;

    // get locales provided by user in main file or else use default English locales via the Constants
    const locales = this.sharedService && this.sharedService.gridOptions && this.sharedService.gridOptions.locales || Constants.locales;

    const title = picker && picker[propName];
    const titleKey = picker && picker[`${propName}Key`];
    const gridOptions = this.sharedService.gridOptions;
    const translationPrefix = getTranslationPrefix(gridOptions);

    if (titleKey && this.i18n && this.i18n.tr && this.i18n.getLocale && this.i18n.getLocale()) {
      output = this.i18n.tr(titleKey || ' ');
    } else {
      switch (propName) {
        case 'customTitle':
          output = title || enableTranslate && this.i18n && this.i18n.tr && this.i18n.getLocale && this.i18n.getLocale() && this.i18n.tr(`${translationPrefix}COMMANDS`) || locales && locales.TEXT_COMMANDS;
          break;
        case 'columnTitle':
          output = title || enableTranslate && this.i18n && this.i18n.tr && this.i18n.getLocale && this.i18n.getLocale() && this.i18n.tr(`${translationPrefix}COLUMNS`) || locales && locales.TEXT_COLUMNS;
          break;
        case 'forceFitTitle':
          output = title || enableTranslate && this.i18n && this.i18n.tr && this.i18n.getLocale && this.i18n.getLocale() && this.i18n.tr(`${translationPrefix}FORCE_FIT_COLUMNS`) || locales && locales.TEXT_FORCE_FIT_COLUMNS;
          break;
        case 'syncResizeTitle':
          output = title || enableTranslate && this.i18n && this.i18n.tr && this.i18n.getLocale && this.i18n.getLocale() && this.i18n.tr(`${translationPrefix}SYNCHRONOUS_RESIZE`) || locales && locales.TEXT_SYNCHRONOUS_RESIZE;
          break;
        default:
          output = title;
          break;
      }
    }
    return output;
  }

  /**
   * Loop through object provided and set to null any property found starting with "onX"
   * @param {Object}: obj
   */
  nullifyFunctionNameStartingWithOn(obj?: any) {
    if (obj) {
      for (const prop of Object.keys(obj)) {
        if (prop.startsWith('on')) {
          obj[prop] = null;
        }
      }
    }
  }

  /**
   * When using ColumnPicker/GridMenu to show/hide a column, we potentially need to readjust the grid option "frozenColumn" index.
   * That is because SlickGrid freezes by column index and it has no knowledge of the columns themselves and won't change the index, we need to do that ourselves whenever necessary.
   * Note: we call this method right after the visibleColumns array got updated, it won't work properly if we call it before the setting the visibleColumns.
   * @param {String} pickerColumnId - what is the column id triggered by the picker
   * @param {Number} frozenColumnIndex - current frozenColumn index
   * @param {Boolean} showingColumn - is the column being shown or hidden?
   * @param {Array<Object>} allColumns - all columns (including hidden ones)
   * @param {Array<Object>} visibleColumns - only visible columns (excluding hidden ones)
   */
  readjustFrozenColumnIndexWhenNeeded(pickerColumnId: string | number, frozenColumnIndex: number, showingColumn: boolean, allColumns: Column[], visibleColumns: Column[]) {
    if (frozenColumnIndex >= 0 && pickerColumnId) {
      // calculate a possible frozenColumn index variance
      let frozenColIndexVariance = 0;
      if (showingColumn) {
        const definedFrozenColumnIndex = visibleColumns.findIndex(col => col.id === this.sharedService.frozenVisibleColumnId);
        const columnIndex = visibleColumns.findIndex(col => col.id === pickerColumnId);
        frozenColIndexVariance = (columnIndex >= 0 && (frozenColumnIndex >= columnIndex || definedFrozenColumnIndex === columnIndex)) ? 1 : 0;
      } else {
        const columnIndex = allColumns.findIndex(col => col.id === pickerColumnId);
        frozenColIndexVariance = (columnIndex >= 0 && frozenColumnIndex >= columnIndex) ? -1 : 0;
      }
      // if we have a variance different than 0 then apply it
      const newFrozenColIndex = frozenColumnIndex + frozenColIndexVariance;
      if (frozenColIndexVariance !== 0) {
        this.sharedService.grid.setOptions({ frozenColumn: newFrozenColIndex });
      }

      // to freeze columns, we need to take only the visible columns and we also need to use setColumns() when some of them are hidden
      // to make sure that we only use the visible columns, not doing this would show back some of the hidden columns
      if (Array.isArray(visibleColumns) && Array.isArray(allColumns) && visibleColumns.length !== allColumns.length) {
        this.sharedService.grid.setColumns(visibleColumns);
      }
    }
  }

  /**
   * Sort items (by reference) in an array by a property name
   * @params items array
   * @param property name to sort with
   */
  sortItems(items: any[], propertyName: string) {
    // sort the custom items by their position in the list
    if (Array.isArray(items)) {
      items.sort((itemA: any, itemB: any) => {
        if (itemA && itemB && itemA.hasOwnProperty(propertyName) && itemB.hasOwnProperty(propertyName)) {
          return itemA[propertyName] - itemB[propertyName];
        }
        return 0;
      });
    }
  }

  /** Translate the an array of items from an input key and assign to the output key */
  translateItems<T = any>(items: T[], inputKey: string, outputKey: string) {
    if (Array.isArray(items)) {
      for (const item of items) {
        if (item[inputKey]) {
          item[outputKey] = this.i18n && this.i18n.tr && this.i18n.getLocale && this.i18n.getLocale() && this.i18n.tr(item[inputKey]);
        }
      }
    }
  }

  /**
   * When "enabledTranslate" is set to True, we will try to translate if the Translate Service exist or use the Locales when not
   * @param translationKey
   * @param localeKey
   */
  translateWhenEnabledAndServiceExist(translationKey: string, localeKey: string): string {
    let text = '';
    const gridOptions = this.sharedService && this.sharedService.gridOptions;

    // get locales provided by user in main file or else use default English locales via the Constants
    const locales = gridOptions && gridOptions.locales || Constants.locales;

    if (gridOptions.enableTranslate && this.i18n && this.i18n.tr && this.i18n.getLocale && this.i18n.getLocale()) {
      text = this.i18n.tr(translationKey || ' ');
    } else if (locales && locales.hasOwnProperty(localeKey)) {
      text = locales[localeKey];
    } else {
      text = localeKey;
    }
    return text;
  }
}
