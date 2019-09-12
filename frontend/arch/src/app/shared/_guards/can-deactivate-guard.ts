import { CanDeactivate } from '@angular/router';
import { ComponentCanDeactivate } from './component-can-deactivate';
import { Injectable } from '@angular/core';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean {

    if (!component.canDeactivate()) {
      const conf = confirm('You have unsaved changes! If you leave, your changes will be lost.');
      if (conf) {
            return true;
        } else {
            return false;
        }
    }
    return true;
  }
}
