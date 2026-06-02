const { createRoom } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[CreateRoom] Triggered');

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

    const roomData = req.body || {};

    if (!roomData.name) {
        context.res = {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Room name is required' })
        };
        return;
    }

    // Generate 6-digit code
    const code = roomData.code || Math.floor(100000 + Math.random() * 900000).toString();

    const newRoom = {
        id: roomData.id || `room-${Date.now()}`,
        code: code,
        name: roomData.name,
        status: roomData.status || 'waiting',
        createdBy: roomData.createdBy || 'admin',
        teams: JSON.stringify(roomData.teams || []),
        createdAt: roomData.createdAt || new Date().toISOString(),
        startedAt: roomData.startedAt || '',
        finishedAt: roomData.finishedAt || ''
    };

    try {
        const created = await createRoom(newRoom);
        context.res = {
            status: 201,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(created)
        };
    } catch (error) {
        context.log.error('[CreateRoom] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Failed to create room' })
        };
    }
};
