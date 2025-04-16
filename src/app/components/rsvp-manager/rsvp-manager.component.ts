import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';
import { RsvpService } from '../../services/rsvp.service';
import { RsvpStatus } from '../../models/rsvp-entry.model';

@Component({
  selector: 'app-rsvp-manager',
  templateUrl: './rsvp-manager.component.html',
  styleUrls: ['./rsvp-manager.component.css']
})
export class RsvpManagerComponent implements OnInit {
  players: Player[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Bob Johnson' },
    { id: '4', name: 'Alice Williams' },
    { id: '5', name: 'Michael Brown' },
    { id: '6', name: 'Sarah Davis' },
    { id: '7', name: 'James Wilson' },
    { id: '8', name: 'Emily Taylor' }
  ];

  rsvpStatusOptions: RsvpStatus[] = ['Yes', 'No', 'Maybe'];
  selectedStatuses: { [key: string]: RsvpStatus } = {};
  
  confirmedAttendees: Player[] = [];
  responseCounts = { total: 0, confirmed: 0, declined: 0 };
  
  showAddPlayerForm = false;
  newPlayerName = '';

  constructor(private rsvpService: RsvpService) {}

  ngOnInit(): void {
    // Initialize with some sample data - distribute statuses randomly
    const statuses: RsvpStatus[] = ['Yes', 'No', 'Maybe'];
    
    this.players.forEach((player, index) => {
      // Distribute statuses to show different statistics
      const randomStatus = statuses[index % 3];
      this.selectedStatuses[player.id] = randomStatus;
      this.updateRsvp(player, randomStatus);
    });
    
    this.updateStats();
  }

  updateRsvp(player: Player, status: RsvpStatus): void {
    this.selectedStatuses[player.id] = status;
    this.rsvpService.addOrUpdateRsvp(player, status);
    this.updateStats();
  }

  private updateStats(): void {
    this.confirmedAttendees = this.rsvpService.getConfirmedAttendees();
    this.responseCounts = this.rsvpService.getResponseCounts();
  }
  
  addPlayer(): void {
    if (this.newPlayerName.trim()) {
      const newId = (this.players.length + 1).toString();
      const newPlayer: Player = {
        id: newId,
        name: this.newPlayerName.trim()
      };
      
      this.players.push(newPlayer);
      this.selectedStatuses[newId] = 'Maybe';
      this.updateRsvp(newPlayer, 'Maybe');
      
      this.newPlayerName = '';
      this.showAddPlayerForm = false;
    }
  }
  
  toggleAddPlayerForm(): void {
    this.showAddPlayerForm = !this.showAddPlayerForm;
    if (this.showAddPlayerForm) {
      setTimeout(() => {
        const input = document.getElementById('newPlayerInput');
        if (input) {
          input.focus();
        }
      }, 0);
    }
  }
  
  getMaybeCount(): number {
    return this.responseCounts.total - this.responseCounts.confirmed - this.responseCounts.declined;
  }
} 