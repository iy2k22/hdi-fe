import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { CountryAdd } from './components/country-add/country-add';
import { ScoreAdd } from './components/score-add/score-add';

export const routes: Routes = [
    {
        path: '',
        component: HomePage
    },
    {
        path: 'country-add',
        component: CountryAdd
    },
    {
        path: 'score-add',
        component: ScoreAdd
    }
];
