const { getAllRooms, getRoomByCode } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[GetRooms] Triggered');

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
        return;
    }

    try {
        const code = req.query.code;

        if (code) {
            // Get specific room by code
            const room = await getRoomByCode(code);
            if (!room) {
                context.res = {
                    status: 404,
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                    body: JSON.stringify({ error: 'Room not found' })
                };
                return;
            }
            context.res = {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify(room)
            };
        } else {
            // Get all rooms
            const rooms = await getAllRooms();
            context.res = {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify(rooms)
            };
        }
    } catch (error) {
        context.log.error('[GetRooms] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Failed to get rooms' })
        };
    }
};
