import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
  exports: [SpinnerComponent, CommonModule],
})
export class SharedModule {}
