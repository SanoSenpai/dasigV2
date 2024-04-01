import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavModalComponent } from './components/nav-modal/nav-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, NavModalComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [SpinnerComponent, NavModalComponent, CommonModule],
})
export class SharedModule {}
