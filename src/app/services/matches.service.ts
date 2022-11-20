import { Injectable } from '@angular/core';

import { MATCHES } from 'src/assets/Data/mock-matches';
import { Match } from 'src/assets/models/Match';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  constructor() {}

  getMatches(): Match[] {
    return MATCHES;
  }
}
