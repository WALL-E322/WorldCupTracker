import { Match } from './Match';

export interface Team {
  _id: string;
  enName: string;
  faName: string;
  flag: string;
  group: string;
  color: string;
  matches?: Match[];
}
