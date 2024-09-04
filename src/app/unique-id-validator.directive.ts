import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ItemService } from './item.service';
import { map } from 'rxjs';

export function UniqueIdValidatorDirective(itemService: ItemService): AsyncValidatorFn {

  return (control: AbstractControl): {[key: string]: boolean} | any => {

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
