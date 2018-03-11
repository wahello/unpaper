import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule } from '@angular/material';

const MODULES = [MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule {}
