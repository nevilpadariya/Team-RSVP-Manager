// Simple test runner for the RSVP service

// Mock Player interface
class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

// Mock LoggerService
class LoggerService {
  log(message) {
    console.log(`[LOG]: ${message}`);
  }
}

// Mock RsvpService
class RsvpService {
  constructor(logger) {
    this.logger = logger;
    this.entries = new Map();
  }

  addOrUpdateRsvp(player, status) {
    const entry = { player, status };
    this.entries.set(player.id, entry);
    this.logger.log(`RSVP updated: ${player.name} - ${status}`);
  }

  getConfirmedAttendees() {
    return Array.from(this.entries.values())
      .filter(entry => entry.status === 'Yes')
      .map(entry => entry.player);
  }

  getResponseCounts() {
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

// Test functions
function runTests() {
  console.log('=== Running RSVP Service Tests ===');
  
  // Setup
  const logger = new LoggerService();
  const service = new RsvpService(logger);
  
  // Test: Add new RSVP
  console.log('\nTest: Add new RSVP');
  const player1 = new Player('1', 'John Doe');
  service.addOrUpdateRsvp(player1, 'Yes');
  const confirmed1 = service.getConfirmedAttendees();
  console.log(`Confirmed attendees after adding 'Yes' RSVP: ${confirmed1.length}`);
  console.log(`Player in confirmed list: ${confirmed1.some(p => p.id === player1.id)}`);
  
  // Test: Update RSVP
  console.log('\nTest: Update RSVP');
  service.addOrUpdateRsvp(player1, 'No');
  const confirmed2 = service.getConfirmedAttendees();
  console.log(`Confirmed attendees after updating to 'No': ${confirmed2.length}`);
  
  service.addOrUpdateRsvp(player1, 'Yes');
  const confirmed3 = service.getConfirmedAttendees();
  console.log(`Confirmed attendees after updating back to 'Yes': ${confirmed3.length}`);
  
  // Test: Multiple RSVPs
  console.log('\nTest: Multiple RSVPs');
  const player2 = new Player('2', 'Jane Smith');
  const player3 = new Player('3', 'Bob Johnson');
  const player4 = new Player('4', 'Alice Williams');
  
  service.addOrUpdateRsvp(player2, 'Yes');
  service.addOrUpdateRsvp(player3, 'No');
  service.addOrUpdateRsvp(player4, 'Maybe');
  
  const counts = service.getResponseCounts();
  console.log('Response counts:');
  console.log(`- Total: ${counts.total}`);
  console.log(`- Confirmed: ${counts.confirmed}`);
  console.log(`- Declined: ${counts.declined}`);
  
  console.log('\n=== Tests Completed ===');
}

// Run the tests
runTests(); 