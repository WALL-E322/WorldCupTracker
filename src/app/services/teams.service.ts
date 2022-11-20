import { Injectable } from '@angular/core';
import { TEAMS } from 'src/assets/Data/mock-teams';
import { Team } from 'src/assets/models/Team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor() {}

  getTeams(): Team[] {
    return TEAMS;
  }
}
