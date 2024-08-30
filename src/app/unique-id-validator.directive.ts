// import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ItemService } from './item.service';
import { map } from 'rxjs';

// @Directive({
//   selector: '[appUniqueIdValidator]',
//   standalone: true
// })
export function UniqueIdValidatorDirective(itemService: ItemService): AsyncValidatorFn {

  return (control: AbstractControl): {[key: string]: boolean} | any => {
    // console.log(control.value);
    var currentId = control.value;
    return itemService.getItemList().pipe(
      map(id => {
        for(let i = 0; i < id.length; i++) {
          if(currentId === id[i]['id']) {
            return {'uniqueId': true}
          }
        }
        return null;
      })
    )
  }

}
