const { updateRoom } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[UpdateRoom] Triggered');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
        return;
    }

    const roomData = req.body || {};
    const roomId = context.bindingData.id || roomData.id;

    if (!roomId) {
        context.res = {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Room ID is required' })
        };
        return;
    }

    const room = {
        id: roomId,
        code: roomData.code,
        name: roomData.name,
        status: roomData.status,
        createdBy: roomData.createdBy || 'admin',
        teams: typeof roomData.teams === 'string' ? roomData.teams : JSON.stringify(roomData.teams || []),
        createdAt: roomData.createdAt,
        startedAt: roomData.startedAt || '',
        finishedAt: roomData.finishedAt || '',
        validatorToken: roomData.validatorToken || '',
        validators: typeof roomData.validators === 'string' ? roomData.validators : JSON.stringify(roomData.validators || [])
    };

    try {
        const updated = await updateRoom(room);
        context.res = {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(updated)
        };
    } catch (error) {
        context.log.error('[UpdateRoom] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Failed to update room' })
        };
    }
};
