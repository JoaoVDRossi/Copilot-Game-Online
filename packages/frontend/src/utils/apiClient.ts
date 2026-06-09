// API Client for Azure Functions backend
// Provides seamless switching between localStorage (dev) and Azure APIs (prod)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://copilot-combate-api.azurewebsites.net';
const USE_API = API_BASE_URL !== '';

// Generic fetch wrapper with error handling
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Append timestamp cache-buster to GET requests so Edge never returns a stale cached response
  const isGet = !options.method || options.method.toUpperCase() === 'GET'
  const sep = endpoint.includes('?') ? '&' : '?'
  const url = isGet ? `${API_BASE_URL}${endpoint}${sep}_t=${Date.now()}` : `${API_BASE_URL}${endpoint}`
  try {
    const response = await fetch(url, {
      ...options,
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Sessions API
export const sessionsApi = {
  getAll: async () => {
    if (!USE_API) return JSON.parse(localStorage.getItem('copilot-combate-sessions') || '[]');
    return apiFetch('/api/sessions-get', { method: 'GET' });
  },

  create: async (session: any) => {
    if (!USE_API) {
      const sessions = JSON.parse(localStorage.getItem('copilot-combate-sessions') || '[]');
      sessions.push(session);
      localStorage.setItem('copilot-combate-sessions', JSON.stringify(sessions));
      return session;
    }
    return apiFetch('/api/sessions-create', {
      method: 'POST',
      body: JSON.stringify(session),
    });
  },

  update: async (session: any) => {
    if (!USE_API) {
      const sessions = JSON.parse(localStorage.getItem('copilot-combate-sessions') || '[]');
      const index = sessions.findIndex((s: any) => s.id === session.id);
      if (index !== -1) {
        sessions[index] = session;
        localStorage.setItem('copilot-combate-sessions', JSON.stringify(sessions));
      }
      return session;
    }
    return apiFetch(`/api/sessions-update/${session.id}`, {
      method: 'PUT',
      body: JSON.stringify(session),
    });
  },
};

// Teams API
export const teamsApi = {
  getAll: async () => {
    if (!USE_API) return JSON.parse(localStorage.getItem('copilot-combate-teams') || '[]');
    return apiFetch('/api/teams-get', { method: 'GET' });
  },

  getById: async (id: string) => {
    if (!USE_API) {
      const teams = JSON.parse(localStorage.getItem('copilot-combate-teams') || '[]');
      return teams.find((t: any) => t.id === id) || null;
    }
    return apiFetch(`/api/teams/${id}`, { method: 'GET' });
  },

  createOrUpdate: async (team: any) => {
    if (!USE_API) {
      const teams = JSON.parse(localStorage.getItem('copilot-combate-teams') || '[]');
      const index = teams.findIndex((t: any) => t.id === team.id);
      if (index !== -1) {
        teams[index] = team;
      } else {
        teams.push(team);
      }
      localStorage.setItem('copilot-combate-teams', JSON.stringify(teams));
      return team;
    }
    return apiFetch('/api/teams-create', {
      method: 'POST',
      body: JSON.stringify(team),
    });
  },
};

// Match History API
export const matchesApi = {
  getAll: async (teamId?: string) => {
    if (!USE_API) {
      const matches = JSON.parse(localStorage.getItem('copilot-combate-match-history') || '[]');
      return teamId ? matches.filter((m: any) => m.teamId === teamId) : matches;
    }
    const query = teamId ? `?teamId=${teamId}` : '';
    return apiFetch(`/api/matches-get${query}`, { method: 'GET' });
  },

  create: async (match: any) => {
    if (!USE_API) {
      const matches = JSON.parse(localStorage.getItem('copilot-combate-match-history') || '[]');
      matches.push(match);
      localStorage.setItem('copilot-combate-match-history', JSON.stringify(matches));
      return match;
    }
    return apiFetch('/api/matches-create', {
      method: 'POST',
      body: JSON.stringify(match),
    });
  },

  update: async (match: any) => {
    if (!USE_API) {
      const matches = JSON.parse(localStorage.getItem('copilot-combate-match-history') || '[]');
      const index = matches.findIndex((m: any) => m.id === match.id);
      if (index !== -1) {
        matches[index] = match;
        localStorage.setItem('copilot-combate-match-history', JSON.stringify(matches));
      }
      return match;
    }
    return apiFetch('/api/matches', {
      method: 'PUT',
      body: JSON.stringify(match),
    });
  },
};

// Test Validations API
export const validationsApi = {
  getAll: async () => {
    if (!USE_API) return JSON.parse(localStorage.getItem('copilot-combate-test-validations') || '[]');
    return apiFetch('/api/validations-get', { method: 'GET' });
  },

  create: async (validation: any) => {
    if (!USE_API) {
      const validations = JSON.parse(localStorage.getItem('copilot-combate-test-validations') || '[]');
      validations.push(validation);
      localStorage.setItem('copilot-combate-test-validations', JSON.stringify(validations));
      return validation;
    }
    // Use update endpoint which creates if not exists
    return apiFetch(`/api/validations-update/${validation.id}`, {
      method: 'PUT',
      body: JSON.stringify(validation),
    });
  },

  update: async (validation: any) => {
    if (!USE_API) {
      const validations = JSON.parse(localStorage.getItem('copilot-combate-test-validations') || '[]');
      const index = validations.findIndex((v: any) => v.id === validation.id);
      if (index !== -1) {
        validations[index] = validation;
        localStorage.setItem('copilot-combate-test-validations', JSON.stringify(validations));
      }
      return validation;
    }
    return apiFetch(`/api/validations-update/${validation.id}`, {
      method: 'PUT',
      body: JSON.stringify(validation),
    });
  },

  delete: async (id: string) => {
    if (!USE_API) {
      const validations = JSON.parse(localStorage.getItem('copilot-combate-test-validations') || '[]');
      const filtered = validations.filter((v: any) => v.id !== id);
      localStorage.setItem('copilot-combate-test-validations', JSON.stringify(filtered));
      return;
    }
    return apiFetch(`/api/validations/${id}`, { method: 'DELETE' });
  },
};

// Game State API
export const gameStateApi = {
  get: async () => {
    if (!USE_API) return JSON.parse(localStorage.getItem('copilot-combate-game-state') || '{"isFinished":false}');
    return apiFetch('/api/gamestate', { method: 'GET' });
  },

  update: async (state: any) => {
    if (!USE_API) {
      localStorage.setItem('copilot-combate-game-state', JSON.stringify(state));
      return state;
    }
    return apiFetch('/api/gamestate-update', {
      method: 'PUT',
      body: JSON.stringify(state),
    });
  },
};

// Rooms API
export const roomsApi = {
  getAll: async () => {
    if (!USE_API) return JSON.parse(localStorage.getItem('copilot-combate-rooms') || '[]');
    return apiFetch('/api/rooms-get', { method: 'GET' });
  },

  getByCode: async (code: string) => {
    if (!USE_API) {
      const rooms = JSON.parse(localStorage.getItem('copilot-combate-rooms') || '[]');
      return rooms.find((r: any) => r.code === code) || null;
    }
    return apiFetch(`/api/rooms-get?code=${code}`, { method: 'GET' });
  },

  create: async (room: any) => {
    if (!USE_API) {
      const rooms = JSON.parse(localStorage.getItem('copilot-combate-rooms') || '[]');
      rooms.push(room);
      localStorage.setItem('copilot-combate-rooms', JSON.stringify(rooms));
      return room;
    }
    return apiFetch('/api/rooms-create', {
      method: 'POST',
      body: JSON.stringify(room),
    });
  },

  update: async (room: any) => {
    if (!USE_API) {
      const rooms = JSON.parse(localStorage.getItem('copilot-combate-rooms') || '[]');
      const index = rooms.findIndex((r: any) => r.id === room.id);
      if (index !== -1) {
        rooms[index] = room;
        localStorage.setItem('copilot-combate-rooms', JSON.stringify(rooms));
      }
      return room;
    }
    return apiFetch(`/api/rooms-update/${room.id}`, {
      method: 'PUT',
      body: JSON.stringify(room),
    });
  },

  delete: async (id: string) => {
    if (!USE_API) {
      const rooms = JSON.parse(localStorage.getItem('copilot-combate-rooms') || '[]');
      const filtered = rooms.filter((r: any) => r.id !== id);
      localStorage.setItem('copilot-combate-rooms', JSON.stringify(filtered));
      return;
    }
    return apiFetch(`/api/rooms-delete/${id}`, { method: 'DELETE' });
  },

  join: async (data: { roomCode: string; playerName: string; teamName: string }) => {
    if (!USE_API) {
      // Handled by roomManager locally
      return null;
    }
    return apiFetch('/api/rooms-join', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
