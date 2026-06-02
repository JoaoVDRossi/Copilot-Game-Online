const { updateGameState } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[UpdateGameState] Triggered', { body: req.body });
    
    const updates = req.body || {};
    
    try {
        const updatedState = await updateGameState(updates);
        
        context.log('[UpdateGameState] State updated', updatedState);
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(updatedState)
        };
    } catch (error) {
        context.log.error('[UpdateGameState] Error:', error.message);
        
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to update game state', details: error.message })
        };
    }
};
