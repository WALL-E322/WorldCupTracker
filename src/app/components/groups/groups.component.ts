import { Component, OnInit } from '@angular/core';
import { MatchesService } from 'src/app/services/matches.service';
import { TeamsService } from 'src/app/services/teams.service';

import { Match } from 'src/assets/models/Match';
import { Team } from 'src/assets/models/Team';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  teams!: Team[];
  groupedTeams: Array<Array<Team>> = [];
  matches!: Match[];

  constructor(
    private teamsService: TeamsService,
    private matchesService: MatchesService
  ) {}

  ngOnInit(): void {
    this.teams = this.teamsService.getTeams();
    this.matches = this.matchesService.getMatches();

    this.prepareDate();
  }

  prepareDate() {
    this.groupedTeams = this.groupBy(this.teams, 'group');
    for (const groupIndex in this.groupedTeams) {
      this.groupedTeams[groupIndex].forEach((element) => {
        element.matches = [];
        for (const matchIndex in this.matches) {
          if (
            this.matches[matchIndex].teamA != null &&
            this.matches[matchIndex].teamB != null
          ) {
            if (
              this.matches[matchIndex].teamA!.enName == element.enName ||
              this.matches[matchIndex].teamB!.enName == element.enName
            ) {
              element.matches.push(this.matches[matchIndex]);
            }
          }
        }
      });
    }
  }
  // for (let i = 0; i < this.groupedTeams.length; i++) {
  //   this.groupedTeams[i]
  // }

  getPlayedGames(team: Team) {
    var result = 0;
    team.matches?.forEach((match) => {
      if (match.status == 'finished') {
        result++;
      }
    });
    return result;
  }

  getGoalDifference(team: Team) {
    let scoredA = 0;
    let scoredB = 0;
    let concededA = 0;
    let concededB = 0;
    //debugger;

    team.matches?.forEach((match) => {
      if (match.teamA != null && match.teamB != null) {
        if (match.teamA.enName == team.enName) {
          scoredA += match.teamAScore;
          concededA += match.teamBScore;
        } else if (match.teamB.enName == team.enName) {
          scoredB += match.teamBScore;
          concededB += match.teamAScore;
        }
      }
    });
    return scoredA + scoredB - (concededA + concededB);
  }

  getPoints(team: Team) {
    let score = 0;

    team.matches?.forEach((match) => {
      if (match.teamA != null && match.teamB != null) {
        if (match.status == 'finished') {
          if (match.teamA.enName == team.enName) {
            if (match.teamAScore == match.teamBScore) {
              score++;
            } else if (match.teamAScore > match.teamBScore) {
              score += 3;
            }
          }

          if (match.teamB.enName == team.enName) {
            if (match.teamAScore == match.teamBScore) {
              score++;
            } else if (match.teamBScore > match.teamAScore) {
              score += 3;
            }
          }
        }
      }
    });
    return score;
  }

  groupBy(collection: Team[], property: string) {
    let i = 0,
      val: any,
      index,
      values: Array<string> = [],
      result: Array<Array<Team>> = [];
    for (; i < collection.length; i++) {
      val = collection[i][property as keyof Team];
      index = values.indexOf(val);
      if (index > -1) result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }
}
