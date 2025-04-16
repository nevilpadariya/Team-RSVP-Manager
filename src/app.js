// Simple RSVP functionality demo
document.addEventListener('DOMContentLoaded', function() {
  // Get all RSVP buttons
  const buttons = document.querySelectorAll('.btn');
  
  // Count the actual players in the table
  const playerRows = document.querySelectorAll('tbody tr');
  
  // Track stats
  let stats = {
    total: playerRows.length, // Set to actual number of players shown in the table
    confirmed: 0,
    declined: 0,
    maybe: 0
  };
  
  // Count initial stats based on current statuses
  playerRows.forEach(row => {
    const statusCell = row.querySelector('.status-badge');
    if (statusCell.classList.contains('yes')) stats.confirmed++;
    else if (statusCell.classList.contains('no')) stats.declined++;
    else stats.maybe++;
  });
  
  // Update stats display
  document.querySelector('.total .stat-value').textContent = stats.total;
  document.querySelector('.confirmed .stat-value').textContent = stats.confirmed;
  document.querySelector('.declined .stat-value').textContent = stats.declined;
  document.querySelector('.maybe .stat-value').textContent = stats.maybe;
  
  // Add click handlers to all buttons
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the parent row and button container
      const row = this.closest('tr');
      const actionContainer = this.closest('.rsvp-buttons');
      const statusCell = row.querySelector('.status-badge');
      
      // Get the type of this button (yes, no, maybe)
      const status = this.classList.contains('yes') ? 'yes' : 
                      this.classList.contains('no') ? 'no' : 'maybe';
      
      // Get the previous status
      const prevStatus = statusCell.classList.contains('yes') ? 'yes' : 
                        statusCell.classList.contains('no') ? 'no' : 'maybe';
      
      // Only proceed if status is changing
      if (status !== prevStatus) {
        // Update stats
        if (prevStatus === 'yes') stats.confirmed--;
        else if (prevStatus === 'no') stats.declined--;
        else stats.maybe--;
        
        if (status === 'yes') stats.confirmed++;
        else if (status === 'no') stats.declined++;
        else stats.maybe++;
        
        // Update all stat displays
        document.querySelector('.confirmed .stat-value').textContent = stats.confirmed;
        document.querySelector('.declined .stat-value').textContent = stats.declined;
        document.querySelector('.maybe .stat-value').textContent = stats.maybe;
        
        // Update status badge
        statusCell.className = 'status-badge ' + status;
        statusCell.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        
        // Update button states
        actionContainer.querySelectorAll('.btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        this.classList.add('active');
        
        // Update confirmed attendees section
        updateConfirmedAttendees();
      }
    });
  });
  
  // Add player button
  const addPlayerBtn = document.querySelector('.add-player-btn');
  let showAddPlayerForm = false;
  
  addPlayerBtn.addEventListener('click', function() {
    if (!showAddPlayerForm) {
      // Create and show the form
      showAddPlayerForm = true;
      
      const form = document.createElement('div');
      form.className = 'add-player-form';
      form.innerHTML = `
        <input type="text" id="newPlayerInput" placeholder="Enter player name">
        <div class="form-actions">
          <button class="btn-save"><i class="fas fa-save"></i> Save</button>
          <button class="btn-cancel"><i class="fas fa-times"></i> Cancel</button>
        </div>
      `;
      
      addPlayerBtn.style.display = 'none';
      addPlayerBtn.parentNode.appendChild(form);
      
      // Focus the input
      setTimeout(() => {
        document.getElementById('newPlayerInput').focus();
      }, 0);
      
      // Add save handler
      form.querySelector('.btn-save').addEventListener('click', addNewPlayer);
      
      // Add cancel handler
      form.querySelector('.btn-cancel').addEventListener('click', () => {
        form.remove();
        addPlayerBtn.style.display = 'flex';
        showAddPlayerForm = false;
      });
      
      // Add enter key handler
      form.querySelector('input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') addNewPlayer();
      });
    }
  });
  
  function addNewPlayer() {
    const input = document.getElementById('newPlayerInput');
    const name = input.value.trim();
    
    if (name) {
      // Create table row
      const tbody = document.querySelector('tbody');
      const tr = document.createElement('tr');
      
      const initial = name.charAt(0);
      
      tr.innerHTML = `
        <td>
          <div class="player-name">
            <span class="avatar">${initial}</span>
            ${name}
          </div>
        </td>
        <td>
          <span class="status-badge maybe">
            Maybe
          </span>
        </td>
        <td class="actions">
          <div class="rsvp-buttons">
            <button class="btn yes">
              <i class="fas fa-check"></i>
            </button>
            <button class="btn no">
              <i class="fas fa-times"></i>
            </button>
            <button class="btn maybe active">
              <i class="fas fa-question"></i>
            </button>
          </div>
        </td>
      `;
      
      tbody.appendChild(tr);
      
      // Add event handlers to new buttons
      tr.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
          const row = this.closest('tr');
          const actionContainer = this.closest('.rsvp-buttons');
          const statusCell = row.querySelector('.status-badge');
          
          const status = this.classList.contains('yes') ? 'yes' : 
                        this.classList.contains('no') ? 'no' : 'maybe';
          
          const prevStatus = statusCell.classList.contains('yes') ? 'yes' : 
                            statusCell.classList.contains('no') ? 'no' : 'maybe';
          
          if (status !== prevStatus) {
            if (prevStatus === 'yes') stats.confirmed--;
            else if (prevStatus === 'no') stats.declined--;
            else stats.maybe--;
            
            if (status === 'yes') stats.confirmed++;
            else if (status === 'no') stats.declined++;
            else stats.maybe++;
            
            document.querySelector('.confirmed .stat-value').textContent = stats.confirmed;
            document.querySelector('.declined .stat-value').textContent = stats.declined;
            document.querySelector('.maybe .stat-value').textContent = stats.maybe;
            
            statusCell.className = 'status-badge ' + status;
            statusCell.textContent = status.charAt(0).toUpperCase() + status.slice(1);
            
            actionContainer.querySelectorAll('.btn').forEach(btn => {
              btn.classList.remove('active');
            });
            
            this.classList.add('active');
            
            updateConfirmedAttendees();
          }
        });
      });
      
      // Update stats
      stats.total++;
      stats.maybe++;
      document.querySelector('.total .stat-value').textContent = stats.total;
      document.querySelector('.maybe .stat-value').textContent = stats.maybe;
      
      // Hide form
      document.querySelector('.add-player-form').remove();
      addPlayerBtn.style.display = 'flex';
      showAddPlayerForm = false;
    }
  }
  
  function updateConfirmedAttendees() {
    const confirmedSection = document.querySelector('.confirmed-section');
    const confirmedList = document.querySelector('.confirmed-list');
    
    // Clear the current list
    confirmedList.innerHTML = '';
    
    // Get all players with "yes" status
    const confirmedPlayers = [];
    document.querySelectorAll('tbody tr').forEach(row => {
      const statusCell = row.querySelector('.status-badge');
      if (statusCell.classList.contains('yes')) {
        const nameElement = row.querySelector('.player-name');
        const name = nameElement.textContent.trim();
        const initial = name.charAt(0);
        
        confirmedPlayers.push({ name, initial });
      }
    });
    
    // Show or hide confirmed section based on whether there are confirmed attendees
    if (confirmedPlayers.length === 0) {
      confirmedSection.style.display = 'none';
    } else {
      confirmedSection.style.display = 'block';
      
      // Add each confirmed player to the list
      confirmedPlayers.forEach(player => {
        const card = document.createElement('div');
        card.className = 'attendee-card';
        card.innerHTML = `
          <div class="attendee-avatar">${player.initial}</div>
          <div class="attendee-name">${player.name}</div>
        `;
        
        confirmedList.appendChild(card);
      });
    }
  }
  
  // Call once at the beginning to set up initial state
  updateConfirmedAttendees();
}); 