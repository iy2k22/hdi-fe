import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { CountryAdd } from './components/country-add/country-add';
import { ScoreAdd } from './components/score-add/score-add';
import { ScoreTypeAdd } from './components/score-type-add/score-type-add';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: 'home-page',
        component: HomePage
    },
    {
        path: 'country-add',
        component: CountryAdd,
        canActivate: [authGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'score-add',
        component: ScoreAdd,
        canActivate: [authGuard],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'score-type-add',
        canActivate: [authGuard],
        component: ScoreTypeAdd,
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        redirectTo: '/home-page',
        pathMatch: 'full'
    }
];
