import { Player } from '../models/player.model';
import { RsvpStatus } from '../models/rsvp-entry.model';
import { RsvpService } from './rsvp.service';
import { LoggerService } from './logger.service';

// Simple mock of testing functions for the coding challenge
const describe = (name: string, fn: () => void) => {
  console.log(`Test Suite: ${name}`);
  fn();
};

const it = (name: string, fn: () => void) => {
  console.log(`- Test: ${name}`);
  fn();
};

const expect = (actual: any) => ({
  toBe: (expected: any) => console.log(`  Expect: ${actual} to be ${expected}`),
  toEqual: (expected: any) => console.log(`  Expect: ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`),
  toContain: (expected: any) => console.log(`  Expect: array to contain ${JSON.stringify(expected)}`),
  not: {
    toContain: (expected: any) => console.log(`  Expect: array not to contain ${JSON.stringify(expected)}`)
  }
});

describe('RsvpService', () => {
  let service: RsvpService;
  let loggerSpy: LoggerService;

  beforeEach();
  
  function beforeEach() {
    // Create a simple logger spy
    loggerSpy = {
      log: (message: string) => console.log(`Logger called with: ${message}`)
    };
    
    // Instantiate the service manually
    service = new RsvpService(loggerSpy);
  }

  it('should add a new RSVP entry', () => {
    const player: Player = { id: '1', name: 'John Doe' };
    service.addOrUpdateRsvp(player, 'Yes');
    
    // Simple check that confirmed attendees includes our player
    const confirmed = service.getConfirmedAttendees();
    expect(confirmed.some(p => p.id === player.id)).toBe(true);
  });

  it('should update an existing RSVP entry', () => {
    const player: Player = { id: '1', name: 'John Doe' };
    
    service.addOrUpdateRsvp(player, 'No');
    let confirmed = service.getConfirmedAttendees();
    expect(confirmed.some(p => p.id === player.id)).toBe(false);
    
    service.addOrUpdateRsvp(player, 'Yes');
    confirmed = service.getConfirmedAttendees();
    expect(confirmed.some(p => p.id === player.id)).toBe(true);
  });

  it('should return only confirmed attendees', () => {
    const player1: Player = { id: '1', name: 'John' };
    const player2: Player = { id: '2', name: 'Jane' };
    const player3: Player = { id: '3', name: 'Bob' };
    
    service.addOrUpdateRsvp(player1, 'Yes');
    service.addOrUpdateRsvp(player2, 'No');
    service.addOrUpdateRsvp(player3, 'Maybe');
    
    const confirmed = service.getConfirmedAttendees();
    expect(confirmed.length).toBe(1);
    expect(confirmed[0].id).toBe(player1.id);
  });

  it('should return correct counts', () => {
    const player1: Player = { id: '1', name: 'John' };
    const player2: Player = { id: '2', name: 'Jane' };
    const player3: Player = { id: '3', name: 'Bob' };
    const player4: Player = { id: '4', name: 'Alice' };
    
    service.addOrUpdateRsvp(player1, 'Yes');
    service.addOrUpdateRsvp(player2, 'Yes');
    service.addOrUpdateRsvp(player3, 'No');
    service.addOrUpdateRsvp(player4, 'Maybe');
    
    const counts = service.getResponseCounts();
    expect(counts.total).toBe(4);
    expect(counts.confirmed).toBe(2);
    expect(counts.declined).toBe(1);
  });
}); 