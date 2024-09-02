import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgbModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatToolbar, RouterOutlet, NgToastModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService,
    private translateService: TranslateService,
    private authService: AuthService
    // @Inject (MAT_DIALOG_DATA) public data: any
  ) {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });
    }

    changeLanguage(event: Event) {
      let locale = (event.target as HTMLInputElement).value;
      this.translateService.use(locale);
    }

   
    onSubmit() {

      if(this.loginForm.valid) {
        this.authService.login(this.loginForm.value)
        .subscribe((data: any) => {
          if(this.authService.isLoggedIn()) {
            this.openSuccess();
            setTimeout(() => {
              this.goToHome();
            }, 1000);
          }
        })
      }
      else {
        this.openError();
      }

    }

    // Navigate to home
    goToHome() {
      this.router.navigate(['/home'], {relativeTo: this.route});
    }
  
    getErrorMessage(con: number) {

      switch(con) {
        case 1:
          return this.loginForm.controls['username'].hasError('required') ? this.translateService.instant('empty field')
          : this.loginForm.controls['username'].hasError('pattern') || this.loginForm.controls['username'].hasError('email') ? this.translateService.instant('invalid username')
          : '';

        case 2:
          return this.loginForm.controls['password'].hasError('required') ? this.translateService.instant('empty field')
          : this.loginForm.controls['password'].hasError('minlength') ? this.translateService.instant('invalid length password')
          : '';
      }

      return;
    }

    openSuccess() {
      this.toast.success('Logged in successfully', 'Login Success', 2000);
    }

    openError() {
      this.toast.danger('Something went wrong', 'Error', 4000);
    }
}
