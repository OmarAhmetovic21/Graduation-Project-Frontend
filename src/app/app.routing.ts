import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { OffersComponent } from './components/offers/offers.component';
import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'offers',                component: OffersComponent },
    { path: 'contact',                component: ContactComponent },
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
