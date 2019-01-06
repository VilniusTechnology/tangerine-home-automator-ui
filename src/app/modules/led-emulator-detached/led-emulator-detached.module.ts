import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedChipComponent } from './light-outlet/led-chip/led-chip.component';
import { LightOutletComponent } from './light-outlet/light-outlet.component';
import { LedEmulatorRoutingModule } from './led-emulator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LedEmulatorRoutingModule,
  ],
  declarations: [
      LedChipComponent, 
      LightOutletComponent
    ]
})
export class LedEmulatorDetachedModule { }
