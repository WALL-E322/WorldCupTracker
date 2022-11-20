export interface Match {
  teamAScore: number;
  teamBScore: number;
  teamA: {
    enName: string;
    faName: string;
    color: string;
    flag: string;
  } | null;
  teamB: {
    enName: string;
    faName: string;
    color: string;
    flag: string;
  } | null;
  matchDate: string;
  location: string;
  level: string;
  stage: string;
  status: string;
}
