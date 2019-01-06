import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LightOutletComponent } from './light-outlet/light-outlet.component';

const routes: Routes = [
    {
      path:  '',
      component: LightOutletComponent,
    }
  ];

@NgModule({
    declarations: [],
    imports: [ 
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [ RouterModule ]
})
export class LedEmulatorRoutingModule { }
