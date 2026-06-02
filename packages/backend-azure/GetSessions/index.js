const { getAllSessions } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[GetSessions] Triggered');
    
    try {
        const sessions = await getAllSessions();
        
        context.log('[GetSessions] Total sessions:', sessions.length);
        
        // Log each session details
        sessions.forEach((s, idx) => {
            context.log(`[GetSessions] Session ${idx}:`, {
                id: s.id,
                roundId: s.roundId,
                active: s.active,
                startedAt: s.startedAt,
                endsAt: s.endsAt
            });
        });
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(sessions)
        };
    } catch (error) {
        context.log.error('[GetSessions] Error:', error.message);
        
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to fetch sessions', details: error.message })
        };
    }
};
