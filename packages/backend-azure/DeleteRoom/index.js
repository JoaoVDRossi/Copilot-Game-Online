const { deleteRoom } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[DeleteRoom] Triggered', { id: req.params.id });

    if (req.method === 'OPTIONS') {
        context.res = {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
        return;
    }

    const id = req.params.id;

    if (!id) {
        context.res = {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Room ID is required' })
        };
        return;
    }

    try {
        await deleteRoom(id);
        context.log('[DeleteRoom] Room deleted:', id);

        context.res = {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        context.log.error('[DeleteRoom] Error:', error.message);
        context.res = {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to delete room', details: error.message })
        };
    }
};
