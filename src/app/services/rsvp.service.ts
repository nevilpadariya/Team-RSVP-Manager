import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { RsvpEntry, RsvpStatus } from '../models/rsvp-entry.model';
import { LoggerService } from './logger.service';

@Injectable({ providedIn: 'root' })
export class RsvpService {
  private entries: Map<string, RsvpEntry> = new Map();

  constructor(private logger: LoggerService) {}

  addOrUpdateRsvp(player: Player, status: RsvpStatus): void {
    const entry: RsvpEntry = { player, status };
    this.entries.set(player.id, entry);
    this.logger.log(`RSVP updated: ${player.name} - ${status}`);
  }

  getConfirmedAttendees(): Player[] {
    return Array.from(this.entries.values())
      .filter(entry => entry.status === 'Yes')
      .map(entry => entry.player);
  }

  getResponseCounts(): { total: number; confirmed: number; declined: number } {
    let confirmed = 0;
    let declined = 0;

    for (const entry of this.entries.values()) {
      if (entry.status === 'Yes') confirmed++;
      if (entry.status === 'No') declined++;
    }

    return {
      total: this.entries.size,
      confirmed,
      declined,
    };
  }
}