// Azure Table Storage utility for persistent data storage
// Replace global.sessions, global.teams, etc. with real database

const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

// Configuration from environment variables
const STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT || "";
const STORAGE_KEY = process.env.AZURE_STORAGE_KEY || "";
const STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || "";

// Table names
const TABLES = {
  sessions: "sessions",
  teams: "teams",
  matches: "matches",
  validations: "validations",
  gameState: "gameState",
  rooms: "rooms"
};

// Initialize Table Clients
function getTableClient(tableName) {
  if (STORAGE_CONNECTION_STRING) {
    return TableClient.fromConnectionString(STORAGE_CONNECTION_STRING, tableName);
  } else if (STORAGE_ACCOUNT && STORAGE_KEY) {
    const credential = new AzureNamedKeyCredential(STORAGE_ACCOUNT, STORAGE_KEY);
    return new TableClient(
      `https://${STORAGE_ACCOUNT}.table.core.windows.net`,
      tableName,
      credential
    );
  } else {
    throw new Error("Azure Storage credentials not configured");
  }
}

// Ensure table exists before using it
async function ensureTableExists(tableName) {
  try {
    const client = getTableClient(tableName);
    await client.createTable();
  } catch (error) {
    // Ignore if table already exists (409 conflict)
    if (error.statusCode !== 409) {
      console.error(`Error creating table ${tableName}:`, error.message);
    }
  }
}

// ========================
// SESSIONS STORAGE
// ========================

async function createSession(session) {
  const client = getTableClient(TABLES.sessions);
  await ensureTableExists(TABLES.sessions);
  
  const entity = {
    partitionKey: "session",
    rowKey: session.id,
    id: session.id,
    roundId: session.roundId,
    gmId: session.gmId || "",
    active: session.active,
    startedAt: session.startedAt,
    endsAt: session.endsAt,
    duration: session.duration,
    timerVisible: session.timerVisible !== undefined ? session.timerVisible : true,
    createdAt: new Date().toISOString()
  };
  
  await client.createEntity(entity);
  return session;
}

async function getAllSessions() {
  const client = getTableClient(TABLES.sessions);
  await ensureTableExists(TABLES.sessions);
  
  const sessions = [];
  const entities = client.listEntities({
    queryOptions: { filter: "PartitionKey eq 'session'" }
  });
  
  for await (const entity of entities) {
    sessions.push({
      id: entity.id,
      roundId: entity.roundId,
      gmId: entity.gmId || null,
      active: entity.active,
      startedAt: entity.startedAt,
      endsAt: entity.endsAt,
      duration: entity.duration,
      timerVisible: entity.timerVisible !== undefined ? entity.timerVisible : true,
      createdAt: entity.createdAt
    });
  }
  
  return sessions;
}

async function updateSession(session) {
  const client = getTableClient(TABLES.sessions);
  await ensureTableExists(TABLES.sessions);
  
  const entity = {
    partitionKey: "session",
    rowKey: session.id,
    id: session.id,
    roundId: session.roundId,
    gmId: session.gmId || "",
    active: session.active,
    startedAt: session.startedAt,
    endsAt: session.endsAt,
    duration: session.duration,
    timerVisible: session.timerVisible !== undefined ? session.timerVisible : true,
    updatedAt: new Date().toISOString()
  };
  
  await client.upsertEntity(entity, "Replace");
  return session;
}

async function deleteSession(sessionId) {
  const client = getTableClient(TABLES.sessions);
  await ensureTableExists(TABLES.sessions);
  
  await client.deleteEntity("session", sessionId);
}

// ========================
// TEAMS STORAGE
// ========================

async function createTeam(team) {
  const client = getTableClient(TABLES.teams);
  await ensureTableExists(TABLES.teams);
  
  const entity = {
    partitionKey: "team",
    rowKey: team.id,
    id: team.id,
    name: team.name,
    members: JSON.stringify(team.members || []),
    points: team.points || 0,
    area: team.area || "",
    createdAt: new Date().toISOString()
  };
  
  await client.createEntity(entity);
  return team;
}

async function getAllTeams() {
  const client = getTableClient(TABLES.teams);
  await ensureTableExists(TABLES.teams);
  
  const teams = [];
  const entities = client.listEntities({
    queryOptions: { filter: "PartitionKey eq 'team'" }
  });
  
  for await (const entity of entities) {
    teams.push({
      id: entity.id,
      name: entity.name,
      members: JSON.parse(entity.members || "[]"),
      points: entity.points || 0,
      area: entity.area || "",
      createdAt: entity.createdAt
    });
  }
  
  return teams;
}

async function updateTeam(team) {
  const client = getTableClient(TABLES.teams);
  await ensureTableExists(TABLES.teams);
  
  const entity = {
    partitionKey: "team",
    rowKey: team.id,
    id: team.id,
    name: team.name,
    members: JSON.stringify(team.members || []),
    points: team.points || 0,
    area: team.area || "",
    updatedAt: new Date().toISOString()
  };
  
  await client.upsertEntity(entity, "Replace");
  return team;
}

// ========================
// MATCHES STORAGE
// ========================

async function createMatch(match) {
  const client = getTableClient(TABLES.matches);
  await ensureTableExists(TABLES.matches);
  
  const entity = {
    partitionKey: "match",
    rowKey: match.id,
    id: match.id,
    teamId: match.teamId,
    teamName: match.teamName || "",
    roundId: match.roundId,
    promptCardId: match.promptCardId || "",
    useCaseCardId: match.useCaseCardId || "",
    toolCardId: match.toolCardId || "",
    timestamp: match.timestamp || new Date().toISOString(),
    tested: match.tested || false
  };
  
  await client.createEntity(entity);
  return match;
}

async function getAllMatches(teamId) {
  const client = getTableClient(TABLES.matches);
  await ensureTableExists(TABLES.matches);
  
  const matches = [];
  const filter = teamId 
    ? `PartitionKey eq 'match' and teamId eq '${teamId}'`
    : "PartitionKey eq 'match'";
    
  const entities = client.listEntities({
    queryOptions: { filter }
  });
  
  for await (const entity of entities) {
    matches.push({
      id: entity.id,
      teamId: entity.teamId,
      teamName: entity.teamName || "",
      roundId: entity.roundId,
      promptCardId: entity.promptCardId || "",
      useCaseCardId: entity.useCaseCardId || "",
      toolCardId: entity.toolCardId || "",
      timestamp: entity.timestamp,
      tested: entity.tested || false
    });
  }
  
  return matches;
}

async function updateMatch(match) {
  const client = getTableClient(TABLES.matches);
  await ensureTableExists(TABLES.matches);
  
  const entity = {
    partitionKey: "match",
    rowKey: match.id,
    id: match.id,
    teamId: match.teamId,
    teamName: match.teamName || "",
    roundId: match.roundId,
    promptCardId: match.promptCardId || "",
    useCaseCardId: match.useCaseCardId || "",
    toolCardId: match.toolCardId || "",
    timestamp: match.timestamp || new Date().toISOString(),
    tested: match.tested || false,
    updatedAt: new Date().toISOString()
  };
  
  await client.upsertEntity(entity, "Replace");
  return match;
}

// ========================
// VALIDATIONS STORAGE
// ========================

async function createValidation(validation) {
  const client = getTableClient(TABLES.validations);
  await ensureTableExists(TABLES.validations);
  
  const entity = {
    partitionKey: "validation",
    rowKey: validation.id,
    id: validation.id,
    matchId: validation.matchId || "",
    teamId: validation.teamId,
    teamName: validation.teamName || "",
    roundId: validation.roundId || "",
    useCaseCardId: validation.useCaseCardId || "",
    useCaseTitle: validation.useCaseTitle || "",
    imageUrl: validation.imageUrl || "",
    submittedAt: validation.submittedAt || new Date().toISOString(),
    validated: validation.validated || false,
    validatedAt: validation.validatedAt || "",
    validatedBy: validation.validatedBy || "",
    rejected: validation.rejected || false,
    rejectedAt: validation.rejectedAt || "",
    rejectionReason: validation.rejectionReason || ""
  };
  
  await client.createEntity(entity);
  return validation;
}

async function getAllValidations() {
  const client = getTableClient(TABLES.validations);
  await ensureTableExists(TABLES.validations);
  
  const validations = [];
  const entities = client.listEntities({
    queryOptions: { filter: "PartitionKey eq 'validation'" }
  });
  
  for await (const entity of entities) {
    validations.push({
      id: entity.id,
      matchId: entity.matchId || "",
      teamId: entity.teamId,
      teamName: entity.teamName || "",
      roundId: entity.roundId || "",
      useCaseCardId: entity.useCaseCardId || "",
      useCaseTitle: entity.useCaseTitle || "",
      imageUrl: entity.imageUrl || "",
      submittedAt: entity.submittedAt,
      validated: entity.validated || false,
      validatedAt: entity.validatedAt || "",
      validatedBy: entity.validatedBy || "",
      rejected: entity.rejected || false,
      rejectedAt: entity.rejectedAt || "",
      rejectionReason: entity.rejectionReason || ""
    });
  }
  
  return validations;
}

async function updateValidation(validation) {
  const client = getTableClient(TABLES.validations);
  await ensureTableExists(TABLES.validations);
  
  const entity = {
    partitionKey: "validation",
    rowKey: validation.id,
    id: validation.id,
    matchId: validation.matchId || "",
    teamId: validation.teamId,
    teamName: validation.teamName || "",
    roundId: validation.roundId || "",
    useCaseCardId: validation.useCaseCardId || "",
    useCaseTitle: validation.useCaseTitle || "",
    imageUrl: validation.imageUrl || "",
    submittedAt: validation.submittedAt,
    validated: validation.validated || false,
    validatedAt: validation.validatedAt || "",
    validatedBy: validation.validatedBy || "",
    rejected: validation.rejected || false,
    rejectedAt: validation.rejectedAt || "",
    rejectionReason: validation.rejectionReason || "",
    updatedAt: new Date().toISOString()
  };
  
  await client.upsertEntity(entity, "Replace");
  return validation;
}

async function deleteValidation(validationId) {
  const client = getTableClient(TABLES.validations);
  await ensureTableExists(TABLES.validations);
  
  await client.deleteEntity("validation", validationId);
}

// ========================
// GAME STATE STORAGE
// ========================

async function getGameState() {
  const client = getTableClient(TABLES.gameState);
  await ensureTableExists(TABLES.gameState);
  
  try {
    const entity = await client.getEntity("state", "current");
    return {
      isFinished: entity.isFinished || false
    };
  } catch (error) {
    // If entity doesn't exist, create default
    if (error.statusCode === 404) {
      const defaultState = { isFinished: false };
      await updateGameState(defaultState);
      return defaultState;
    }
    throw error;
  }
}

async function updateGameState(state) {
  const client = getTableClient(TABLES.gameState);
  await ensureTableExists(TABLES.gameState);
  
  const entity = {
    partitionKey: "state",
    rowKey: "current",
    isFinished: state.isFinished || false,
    updatedAt: new Date().toISOString()
  };
  
  await client.upsertEntity(entity, "Replace");
  return state;
}

// ========================
// ROOMS STORAGE
// ========================

async function createRoom(room) {
  const client = getTableClient(TABLES.rooms);
  await ensureTableExists(TABLES.rooms);
  
  const entity = {
    partitionKey: "room",
    rowKey: room.id,
    id: room.id,
    code: room.code,
    name: room.name,
    status: room.status || "waiting",
    createdBy: room.createdBy || "admin",
    teams: typeof room.teams === "string" ? room.teams : JSON.stringify(room.teams || []),
    createdAt: room.createdAt || new Date().toISOString(),
    startedAt: room.startedAt || "",
    finishedAt: room.finishedAt || "",
    matchesPerRound: typeof room.matchesPerRound === "object" ? JSON.stringify(room.matchesPerRound || {}) : (room.matchesPerRound || "{}")
  };
  
  await client.createEntity(entity);
  return room;
}

async function getAllRooms() {
  const client = getTableClient(TABLES.rooms);
  await ensureTableExists(TABLES.rooms);
  
  const rooms = [];
  const entities = client.listEntities({
    queryOptions: { filter: "PartitionKey eq 'room'" }
  });
  
  for await (const entity of entities) {
    rooms.push({
      id: entity.id,
      code: entity.code,
      name: entity.name,
      status: entity.status || "waiting",
      createdBy: entity.createdBy || "admin",
      teams: JSON.parse(entity.teams || "[]"),
      createdAt: entity.createdAt,
      startedAt: entity.startedAt || "",
      finishedAt: entity.finishedAt || "",
      matchesPerRound: JSON.parse(entity.matchesPerRound || "{}")
    });
  }
  
  return rooms;
}

async function getRoomByCode(code) {
  const rooms = await getAllRooms();
  const searchCode = String(code).trim();
  return rooms.find(r => String(r.code).trim() === searchCode) || null;
}

async function updateRoom(room) {
  const client = getTableClient(TABLES.rooms);
  await ensureTableExists(TABLES.rooms);
  
  const entity = {
    partitionKey: "room",
    rowKey: room.id,
    id: room.id,
    code: room.code,
    name: room.name,
    status: room.status || "waiting",
    createdBy: room.createdBy || "admin",
    teams: typeof room.teams === "string" ? room.teams : JSON.stringify(room.teams || []),
    createdAt: room.createdAt,
    startedAt: room.startedAt || "",
    finishedAt: room.finishedAt || "",
    matchesPerRound: typeof room.matchesPerRound === "object" ? JSON.stringify(room.matchesPerRound || {}) : (room.matchesPerRound || "{}"),
    updatedAt: new Date().toISOString()
  };
  
  await client.upsertEntity(entity, "Replace");
  return room;
}

async function deleteRoom(roomId) {
  const client = getTableClient(TABLES.rooms);
  await ensureTableExists(TABLES.rooms);
  
  await client.deleteEntity("room", roomId);
}

// Export all functions
module.exports = {
  // Sessions
  createSession,
  getAllSessions,
  updateSession,
  deleteSession,
  
  // Teams
  createTeam,
  getAllTeams,
  updateTeam,
  
  // Matches
  createMatch,
  getAllMatches,
  updateMatch,
  
  // Validations
  createValidation,
  getAllValidations,
  updateValidation,
  deleteValidation,
  
  // Game State
  getGameState,
  updateGameState,
  
  // Rooms
  createRoom,
  getAllRooms,
  getRoomByCode,
  updateRoom,
  deleteRoom
};
