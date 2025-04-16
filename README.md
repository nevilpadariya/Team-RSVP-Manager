# Team RSVP Manager

This is a solution for the Gametime Hero Coding Challenge: Team RSVP Manager. It's an Angular module that helps manage RSVP responses for an event.

## Features

- Accepts a list of players and their RSVP statuses
- Adds or updates a player's RSVP status
- Gets a list of all confirmed attendees
- Counts the number of total, confirmed, and declined responses

## Implementation

The implementation follows modern best-practice development patterns:

- **Pure functions** - The `getConfirmedAttendees` method returns a new array without modifying the original data
- **TypeScript interfaces** - Clear, reusable interfaces for `Player` and `RsvpEntry`
- **Dependency injection** - The `RsvpService` injects a `LoggerService`
- **Single Responsibility Principle** - Each method has a focused purpose
- **Style guide compliance**:
  - Consistent naming
  - Early returns
  - Separation of logic from presentation
  - Clean and readable file structure

## Project Structure

```
src/
├── app/
│   ├── models/
│   │   ├── player.model.ts      # Player interface
│   │   └── rsvp-entry.model.ts  # RsvpEntry interface and RsvpStatus type
│   ├── services/
│   │   ├── logger.service.ts    # Logger service for dependency injection example
│   │   └── rsvp.service.ts      # Main RSVP service implementation
│   └── components/
│       └── rsvp-manager/        # Component demonstrating the service usage
```

## Usage

The main service is `RsvpService` which provides the following methods:

```typescript
// Add or update a player's RSVP status
rsvpService.addOrUpdateRsvp(player, 'Yes');

// Get list of confirmed attendees
const confirmedPlayers = rsvpService.getConfirmedAttendees();

// Get counts of responses
const counts = rsvpService.getResponseCounts();
// counts = { total: 10, confirmed: 5, declined: 3 }
```

## Component Example

The `RsvpManagerComponent` demonstrates how to use the service in a real application, including:

- Displaying a list of all players with dropdown selectors for RSVP status
- Showing statistics about response counts
- Displaying a filtered list of confirmed attendees # Team-RSVP-Manager
