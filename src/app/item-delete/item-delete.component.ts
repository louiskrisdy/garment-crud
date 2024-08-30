import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import { ItemService } from '../item.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-item-delete',
  standalone: true,
  imports: [NgbModule, MatDialogModule, MatButtonModule, NgToastModule],
  templateUrl: './item-delete.component.html',
  styleUrl: './item-delete.component.css'
})
export class ItemDeleteComponent {

  constructor(
    private itemService: ItemService,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private dialgoRef: MatDialogRef<ItemDeleteComponent>
  ){}

  confirmDelete(id: any) {
    this.itemService.deleteItem(id).subscribe({
      next: (res) => {
        this.dialgoRef.close(true);
        this.openSuccess();
        console.log('success');
      },
      error: (err) => {
        this.openError();
        console.log(err);
      }
    });
  }

  openSuccess() {
    this.toast.success(`${this.id} has been deleted successfully`, 'Delete Success', 4000);
  }

  openError() {
    this.toast.danger('Something went wrong','Error!' , 4000);
  }


}
