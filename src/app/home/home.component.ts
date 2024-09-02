import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ItemService } from '../item.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemAddEditComponent } from '../item-add-edit/item-add-edit.component';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { ItemDeleteComponent } from '../item-delete/item-delete.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatTableModule, MatSortModule, MatButtonModule, MatIconModule, NgbModule, MatPaginator, MatFormField, MatLabel, MatFormFieldModule, MatInputModule, NgToastModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'itemName',
    'category',
    'stockNumber',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // @ViewChild(MatSort) set matSort(sort: MatSort) {
  //   this.dataSource.sort = sort;
  // }

//   @ViewChild(MatSort) set matSort(sort: MatSort) {
//     if (!this.dataSource.sort) {
//         this.dataSource.sort = sort;
//     }
// }
  
  constructor(private dialog: MatDialog, private itemService: ItemService, private router: Router, private toast: NgToastService, private translateService: TranslateService){}
  
  authService = inject(AuthService);

  ngAfterViewInit(): void {

    return this.getItemList();

  }

  // For searching functionality
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  // For adding item(s), Executed when the specific button is clicked
  openAddEditItemDialog() {

    const dialogRef = this.dialog.open(ItemAddEditComponent); //  item-add-edit.component.html will be displayed
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getItemList();
        }
      }
    });

  }

  // Read the data
  getItemList() {

    this.itemService.getItemList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  // Form for edit item details. Function below will be executed when the dedicated button is clicked
  openEditForm(data: any) {

    const dialogRef = this.dialog.open(ItemAddEditComponent, {data});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getItemList();
        }
      }
    });

  }

  // For deleting an item. Will be executed when a specific button is clicked.
  deleteItem(id: number) {

    const dialogRef = this.dialog.open(ItemDeleteComponent, {data: id});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getItemList();
        }
      }
    });
    
  }

  public logout() {
    this.authService.logout();
    this.translateService.use('en-US');
    this.router.navigate(['login']);
  }

}
