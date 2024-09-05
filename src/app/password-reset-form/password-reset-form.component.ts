import { Component, Inject } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../login.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-password-reset-form',
  standalone: true,
  imports: [NgbModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, FormsModule, NgToastModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './password-reset-form.component.html',
  styleUrl: './password-reset-form.component.css'
})
export class PasswordResetFormComponent {

  hide = true;
  hide1 = true;
  passwForm: FormGroup;
  // confPasswForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<PasswordResetFormComponent>,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toast: NgToastService,
    private router: Router,
    private translateService: TranslateService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.passwForm = this.formBuilder.group({
      id: [data.controls['id'].value, Validators.required],
      username: [data.controls['username'].value, Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if(this.passwForm.valid) {
      // this.validate();
      this.loginService.updatePassword(this.data.controls['id'].value, this.passwForm.value).subscribe({
        next: (res: any) => {
          this.openSuccess();
          setTimeout(() => {
            this.authService.removeToken();
            this.router.navigate(['/']);
          },1200)
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          this.openError();
        }
      })
    }
  }

  getErrorMessage() {
    return this.passwForm.controls['password'].errors?.['required'] ? this.translateService.instant('empty field')
    : this.passwForm.controls['password'].errors?.['minlength'] ? this.translateService.instant('invalid length password')
    : '';
  }

  openSuccess() {
    this.toast.success('Password has been reset successfully', 'Password Reset Success', 3000);
  }

  openError() {
    this.toast.danger('Something went wrong', 'Error', 2000);
  }

}
