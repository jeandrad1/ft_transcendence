import { getUserIdByUsername, getUserById, getUserStatsById } from '../services/api';

/**
 * Search for a user by username, then fetch and return their profile data by ID.
 * @param username The username to search for
 * @returns The user profile data or an error message
 */
export async function fetchUserProfileByUsername(username: string) {
  try {
    const id = await getUserIdByUsername(username);
    if (!id) {
      return { error: 'User not found' };
    }
    const user = await getUserById(id);
    if (!user) {
      return { error: 'User data not found' };
    }
    const stats = await getUserStatsById(id);
    return { user, stats };
  } catch (err: any) {
    return { error: err.message || 'Unknown error' };
  }
}

export function Profile(): string {
  return `
    <div class="profile-search-container">
      <h1>Profile Search</h1>
      <div class="profile-search-bar">
        <input id="profile-search-input" type="text" placeholder="Enter username" />
        <button id="profile-search-btn">Search</button>
      </div>
      <div id="profile-result"></div>
    </div>
  `;
}

export function profileHandlers() {
  const btn = document.getElementById('profile-search-btn');
  if (!btn) return;
  btn.onclick = async function() {
    const input = document.getElementById('profile-search-input') as HTMLInputElement;
    const resultDiv = document.getElementById('profile-result');
    if (!input || !resultDiv) return;
    resultDiv.innerHTML = 'Loading...';
    const username = input.value.trim();
    if (!username) {
      resultDiv.innerHTML = '<span style="color: #ff6b6b">Please enter a username.</span>';
      return;
    }
    const res = await fetchUserProfileByUsername(username);
    if (res.error) {
      resultDiv.innerHTML = `<span style='color:red'>${res.error}</span>`;
      return;
    }
    const user = res.user;
    const stats = res.stats ?? {};

    // Derived stats
    const victories = Number(stats.victories ?? 0);
    const defeats = Number(stats.defeats ?? 0);
    const games = victories + defeats;
    const winRate = games > 0 ? Math.round((victories / games) * 100) : 0;
    const streak = stats.current_streak ?? stats.streak ?? 0;
    const elo = stats.elo ?? stats.rating ?? 'N/A';
    const lastActive = user.last_active ? new Date(user.last_active).toLocaleString() : 'N/A';

    // Recent matches if provided by stats API (optional)
    const recentMatches = Array.isArray(stats.recentMatches) ? stats.recentMatches.slice(0,5) : [];

    resultDiv.innerHTML = `
      <div class="profile-card enhanced">
        <div class="profile-top">
          <div class="profile-avatar">${user.username?.charAt(0)?.toUpperCase() ?? '?'}</div>
          <div class="profile-meta">
            <h2 class="profile-username">${user.username}</h2>
            <p class="profile-email">${user.email ?? 'No email'}</p>
            <p class="profile-last-active">Última conexión: <span>${lastActive}</span></p>
          </div>
        </div>

        <div class="profile-stats-grid">
          <div class="stat-item">
            <div class="stat-label">Games</div>
            <div class="stat-value">${games}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Wins</div>
            <div class="stat-value">${victories}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Losses</div>
            <div class="stat-value">${defeats}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Win Rate</div>
            <div class="stat-value">${winRate}%</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Streak</div>
            <div class="stat-value">${streak}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">ELO</div>
            <div class="stat-value">${elo}</div>
          </div>
        </div>

        <div class="stat-bar-wrap">
          <div class="stat-bar-label">Win rate</div>
          <div class="stat-bar">
            <div class="stat-bar-fill" style="width:${winRate}%;"></div>
          </div>
        </div>

        ${recentMatches.length > 0 ? `
          <div class="recent-matches">
            <h3>Partidas recientes</h3>
            <ul>
              ${recentMatches.map((m: any) => `<li>${m.summary ?? `${m.left ?? 'L'} ${m.score_left ?? ''} - ${m.score_right ?? ''} ${m.right ?? 'R'}`}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
  };
}