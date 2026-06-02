const { createSession } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[CreateSession] Triggered');
    
    // Accept full session object from request body
    const sessionData = req.body || {};
    
    context.log('[CreateSession] Received data:', JSON.stringify(sessionData, null, 2));
    
    // Validation
    if (!sessionData.roundId) {
        context.res = {
            status: 400,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'roundId is required' })
        };
        return;
    }
    
    const newSession = {
        id: sessionData.id || Date.now().toString(),
        roundId: sessionData.roundId,
        gmId: sessionData.gmId || null,
        active: sessionData.active !== undefined ? sessionData.active : false,
        startedAt: sessionData.startedAt,
        endsAt: sessionData.endsAt,
        duration: sessionData.duration || 900,
        timerVisible: sessionData.timerVisible !== undefined ? sessionData.timerVisible : true
    };
    
    context.log('[CreateSession] Creating session:', JSON.stringify(newSession, null, 2));
    
    try {
        const created = await createSession(newSession);
        
        context.log('[CreateSession] Session created successfully:', created.id);
        
        context.res = {
            status: 201,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(created)
        };
    } catch (error) {
        context.log.error('[CreateSession] Error:', error.message);
        
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to create session', details: error.message })
        };
    }
};
