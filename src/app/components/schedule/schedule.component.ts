import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatchesService } from 'src/app/services/matches.service';
import { MATCHES } from 'src/assets/Data/mock-matches';
import { Match } from 'src/assets/models/Match';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent implements OnInit {
  matches!: Match[];

  //tab21Nov: string = '2022-11-21';
  days: string[] = [];

  constructor(
    private datePipe: DatePipe,
    private matchesService: MatchesService
  ) {}

  ngOnInit(): void {
    this.matches = this.matchesService.getMatches();
    this.days = this.getTotalDays();
  }

  getBorderColor(teamAColor: string, teamBColor: string) {
    let style: string =
      'linear-gradient(white, white) padding-box , linear-gradient(to right,' +
      teamAColor +
      ', #FFF,' +
      teamBColor +
      ') border-box';

    return style;
  }

  checkDate(matchDate: string, tabDay: string) {
    //console.log('match date: ' + matchDate + 'tab day : ' + tabDay);
    if (
      matchDate.substring(0, 4) == tabDay.substring(0, 4) &&
      matchDate.substring(5, 7) == tabDay.substring(5, 7) &&
      matchDate.substring(8, 10) == tabDay.substring(8, 10)
    ) {
      return true;
    } else {
      return false;
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

  getTotalDays() {
    let allDays = [''];
    this.matches.forEach((match) => {
      allDays.push(match.matchDate.substring(0, 10));
    });
    allDays.shift();
    let days = [...new Set(allDays)];

    return days;
  }

  getTabTitle(date: string): string {
    let tabTitle = this.datePipe.transform(date)!;
    // debugger;
    return tabTitle;
  }
}
