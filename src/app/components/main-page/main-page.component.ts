import { Component, OnInit } from '@angular/core';

import { MatchesService } from 'src/app/services/matches.service';
import { Match } from 'src/assets/models/Match';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  matches!: Match[];

  days: number = 3;
  hours: number = 14;
  mins: number = 43;
  secs: number = 32;

  upcomingMatch!: Match;

  constructor(private matchesService: MatchesService) {}

  ngOnInit(): void {
    this.matches = this.matchesService.getMatches();
    this.getUpcomingMatch();
  }

  getUpcomingMatch() {
    for (const matchIndex in this.matches) {
      if (this.matches[matchIndex].status == 'new') {
        this.upcomingMatch = this.matches[matchIndex];
        return;
      }
    }
  }

  getMatchInfoState(matchDate: string): string {
    //console.log(matchDate);
    var matchTime = Date.parse(matchDate);
    var currentTime = new Date().getTime();

    if (currentTime < matchTime) {
      return '1';
    } else {
      return '2';
    }
  }

  countdown = setInterval(() => {
    var futureDate = new Date('Dec 18, 2022 15:00').getTime(); //Sun Nov 20 2022 19:30:00 GMT+0330
    var currentTime = new Date().getTime();

    var timeDuration = (futureDate - currentTime) / 1000;

    this.days = Math.floor(timeDuration / (60 * 60 * 24));
    this.hours = Math.floor((timeDuration % (60 * 60 * 24)) / (60 * 60));
    this.mins = Math.floor((timeDuration % (60 * 60)) / 60);
    this.secs = Math.floor(timeDuration % 60);

    if (timeDuration < 0) {
      clearInterval(this.countdown);
    }
  }, 1000);
}
