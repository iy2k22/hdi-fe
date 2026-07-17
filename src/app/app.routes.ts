import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { CountryAdd } from './components/country-add/country-add';
import { ScoreAdd } from './components/score-add/score-add';
import { ScoreTypeAdd } from './components/score-type-add/score-type-add';
import { Login } from './components/login/login';

export const routes: Routes = [
    {
        path: 'home-page',
        component: HomePage
    },
    {
        path: 'country-add',
        component: CountryAdd
    },
    {
        path: 'score-add',
        component: ScoreAdd
    },
    {
        path: 'score-type-add',
        component: ScoreTypeAdd
    },
    {
        path: 'login',
        component: Login
    }
];
