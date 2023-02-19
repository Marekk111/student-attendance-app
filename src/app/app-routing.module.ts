import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionComponent } from './questions';

import { HomeComponent } from './home';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'questions', component: QuestionComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);

