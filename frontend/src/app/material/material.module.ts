import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
];

@NgModule({
  imports: material,
  exports: material,
})
export class MaterialModule {}
