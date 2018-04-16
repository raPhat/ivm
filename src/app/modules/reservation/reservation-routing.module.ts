import { BuildingPageComponent } from './pages/building-page/building-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// components
import { OverviewPageComponent } from './pages/overview/overview-page.component';

const routes: Routes = [
    {
        path: 'overview',
        component: OverviewPageComponent
    },
    {
        path: 'building/:no',
        component: BuildingPageComponent
    },
    {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class ReservationRoutingModule { }
