import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'DASIG';
  showSpinner = true;

  ngOnInit(): void {
    this.showSpinner = false;
  }
}
