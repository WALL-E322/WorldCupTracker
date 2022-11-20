import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './components/groups/groups.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'groups', component: GroupsComponent },
  { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
