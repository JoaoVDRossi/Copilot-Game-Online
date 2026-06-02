const { getGameState } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[GetGameState] Triggered');
    
    try {
        const gameState = await getGameState();
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(gameState)
        };
    } catch (error) {
        context.log.error('[GetGameState] Error:', error.message);
        
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to fetch game state', details: error.message })
        };
    }
};
