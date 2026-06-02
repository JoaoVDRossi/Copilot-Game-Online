const { getAllSessions, updateSession } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('UpdateSession triggered', { id: req.params.id, body: req.body });
    
    const id = req.params.id;
    const updates = req.body || {};
    
    try {
        // Get all sessions to find the one to update
        const sessions = await getAllSessions();
        const session = sessions.find(s => s.id === id);
        
        if (!session) {
            context.res = {
                status: 404,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Session not found' })
            };
            return;
        }
        
        // Merge updates
        const updatedSession = {
            ...session,
            ...updates,
            id // Preserve ID
        };
        
        await updateSession(updatedSession);
        
        context.log('Session updated', updatedSession);
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(updatedSession)
        };
    } catch (error) {
        context.log.error('UpdateSession error:', error.message);
        
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to update session', details: error.message })
        };
    }
};
