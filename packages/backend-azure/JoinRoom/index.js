const { getRoomByCode, updateRoom } = require('../utils/storage');

/**
 * Normalizes a team name for dedup purposes.
 * Removes accents, converts to lowercase, strips non-alphanumeric.
 */
function normalizeTeamName(name) {
    return name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}

module.exports = async function (context, req) {
    context.log('[JoinRoom] Triggered');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
        return;
    }

    const { roomCode, playerName, teamName } = req.body || {};

    if (!roomCode || !playerName || !teamName) {
        context.res = {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'roomCode, playerName, and teamName are required' })
        };
        return;
    }

    try {
        const room = await getRoomByCode(roomCode.trim());

        if (!room) {
            context.res = {
                status: 404,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Room not found' })
            };
            return;
        }

        if (room.status === 'finished') {
            context.res = {
                status: 400,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Room is finished' })
            };
            return;
        }

        const teams = typeof room.teams === 'string' ? JSON.parse(room.teams) : (room.teams || []);
        const normalizedInput = normalizeTeamName(teamName);
        const trimmedPlayer = playerName.trim();

        let team = teams.find(t => t.normalizedName === normalizedInput);
        let isNewTeam = false;

        if (team) {
            if (!team.members.includes(trimmedPlayer)) {
                team.members.push(trimmedPlayer);
            }
        } else {
            team = {
                id: `team-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                name: teamName.trim().replace(/\s+/g, ' '),
                normalizedName: normalizedInput,
                members: [trimmedPlayer],
                score: 0,
                completedRounds: [],
                joinedAt: new Date().toISOString()
            };
            teams.push(team);
            isNewTeam = true;
        }

        room.teams = JSON.stringify(teams);
        await updateRoom(room);

        context.res = {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({
                room: { ...room, teams: teams },
                team: team,
                isNewTeam: isNewTeam
            })
        };
    } catch (error) {
        context.log.error('[JoinRoom] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Failed to join room' })
        };
    }
};
