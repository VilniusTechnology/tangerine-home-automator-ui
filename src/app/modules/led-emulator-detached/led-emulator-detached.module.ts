import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LedEmulatorRoutingModule } from './led-emulator-routing.module';
import { LedChipComponent } from 'src/app/components/led-chip/led-chip.component';
import { LightOutletComponent } from 'src/app/screens/led-emulator/light-outlet/light-outlet.component';

@NgModule({
    imports: [
        CommonModule,
        LedEmulatorRoutingModule,
    ],
    declarations: [
        LedChipComponent,
        LightOutletComponent
    ],
    exports: [
        LedChipComponent,
    ],
})
export class LedEmulatorDetachedModule { }
