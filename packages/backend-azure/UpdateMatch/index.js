const { updateMatch } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[UpdateMatch] Triggered');
    
    const matchData = req.body || {};
    
    if (!matchData.id) {
        context.res = {
            status: 400,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Match ID is required' })
        };
        return;
    }
    
    try {
        const updated = await updateMatch(matchData);
        context.log('[UpdateMatch] Match updated:', matchData.id);
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(updated)
        };
    } catch (error) {
        context.log.error('[UpdateMatch] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to update match', details: error.message })
        };
    }
};
