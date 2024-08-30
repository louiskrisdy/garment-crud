import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
NgbModule

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink, NgbModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

  constructor(private router: Router){}

  redirectToLogin() {
    setTimeout(() => {
      this.router.navigate(['login']);
    },4000);
  }

}
