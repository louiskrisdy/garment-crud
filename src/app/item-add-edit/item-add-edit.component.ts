import { ItemService } from './../item.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { RouterOutlet } from '@angular/router';
import { UniqueIdValidatorDirective } from '../unique-id-validator.directive';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-item-add-edit',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatDialogModule, MatInputModule, ReactiveFormsModule, MatButtonModule, NgbModule, FormsModule, NgToastModule, RouterOutlet, TranslateModule],
  templateUrl: './item-add-edit.component.html',
  styleUrl: './item-add-edit.component.css'
})

export class ItemAddEditComponent implements OnInit{

  itemForm: FormGroup;

  categories: string[] = [
    'Clothes',
    'Long Pants',
    'Short Pants',
    'Jackets',
    'Other'
  ];
 
  minStock = 0;
  maxStock = 500;

  constructor(
    private itemService: ItemService,
    private dialogRef: MatDialogRef<ItemAddEditComponent>,
    private formBuilder: FormBuilder,
    private toast: NgToastService,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

      if(!data) {

        this.itemForm = this.formBuilder.group({
        id: ['', [Validators.required],[UniqueIdValidatorDirective(itemService)]],
        itemName: ['', [Validators.required, Validators.minLength(5)]],
        category: ['', Validators.required],
        stockNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]]
      });
      }
      else {
        this.itemForm = this.formBuilder.group({
          id: ['', [Validators.required]],
          itemName: ['', [Validators.required, Validators.minLength(5)]],
          category: ['', Validators.required],
          stockNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]]
        });
      }

  }


  getErrorMessage(con: number) {

    switch(con){
    case 1: 
      return this.itemForm.controls['itemName'].hasError('required') ? this.translateService.instant('empty field') : this.itemForm.controls['itemName'].hasError('minlength') ? this.translateService.instant('invalid length itemName') 
      : '';
      
    case 2:
      return this.itemForm.controls['category'].hasError('required') ? this.translateService.instant('empty field') 
      : '';
    
    case 3: 
      return this.itemForm.controls['stockNumber'].hasError('required') ? this.translateService.instant('empty field') : this.itemForm.controls['stockNumber'].hasError('pattern') ? this.translateService.instant('invalid input stock') 
      : '';
    }
    return;
  }

  ngOnInit(): void {
    
    this.itemForm.patchValue(this.data);

  }

  onSubmit() {

    if(this.itemForm.valid) {
      if(this.data) {
        this.itemService.updateItem(this.data.id, this.itemForm.value).subscribe({
          next: (val: any) => {
            this.openSuccess('Updated');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            this.openError();
          }
        });
      } else {
          this.itemService.addItem(this.itemForm.value).subscribe({
            next: (val: any) => {
              this.openSuccess('Added')
              this.itemForm.reset();
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              this.openError();
            }
          });
        }
    }

  }

openSuccess(con: string) {
  this.toast.success(this.itemForm.controls['itemName'].value+` ${con} successfully`, `${con} Successfully`, 3000);
}

openError() {
  this.toast.danger('Something went wrong','Error!' , 3000);
}

}
