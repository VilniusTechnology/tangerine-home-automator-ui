import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedEmulatorRoutingModule } from './led-emulator-routing.module';
import { LedChipComponent } from 'src/app/components/light-outlet/led-chip/led-chip.component';
import { LightOutletComponent } from 'src/app/components/light-outlet/light-outlet.component';

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
