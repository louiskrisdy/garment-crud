import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../login.service';
import { PasswordResetFormComponent } from '../password-reset-form/password-reset-form.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [NgbModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatIconModule, TranslateModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent {

  passwResetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private loginService: LoginService,
    private translateService: TranslateService
  ){
    this.passwResetForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.email]]
    })
  }

  getErrorMessage() {



        return this.passwResetForm.controls['username'].hasError('required') ? this.translateService.instant('empty field')
        : this.passwResetForm.controls['username'].hasError('pattern') || this.passwResetForm.controls['username'].hasError('email') ? this.translateService.instant('invalid username')
        : '';

  }


  onSubmit() {

    if(this.passwResetForm.valid) {
      
      this.loginService.getUserList().subscribe(
        res => {
          for(let i = 0; i < res.length; i++) {
            if(this.passwResetForm.controls['username'].value === res[i]['username']) {
              this.passwResetForm.addControl('id', this.formBuilder.control(res[i]['id'], Validators.required));
              console.log(this.passwResetForm);
              this.dialog.open(PasswordResetFormComponent, {data: this.passwResetForm});

              break;

            }
          }
        }
      )
      // console.log(id);

      // dialogRef.afterClosed().subscribe({
      //   next: (res) => {
      //     if(res) {

      //     }
      //   }

      // })

    }
  }

}
