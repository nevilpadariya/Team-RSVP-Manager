import { Player } from './player.model';

export type RsvpStatus = 'Yes' | 'No' | 'Maybe';

export interface RsvpEntry {
  player: Player;
  status: RsvpStatus;
}