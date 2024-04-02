import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavModalComponent } from './components/nav-modal/nav-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DonateModalComponent } from './components/donate-modal/donate-modal.component';

@NgModule({
  declarations: [SpinnerComponent, NavModalComponent, DonateModalComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [
    SpinnerComponent,
    NavModalComponent,
    DonateModalComponent,
    CommonModule,
  ],
})
export class SharedModule {}
