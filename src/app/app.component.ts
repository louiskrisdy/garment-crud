import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgToastModule } from 'ng-angular-popup';
import { ToasterPosition } from 'ng-toasty';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgToastModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  ToasterPosition = ToasterPosition;

}
