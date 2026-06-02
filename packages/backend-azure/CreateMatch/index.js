const { createMatch } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[CreateMatch] Triggered');
    
    const matchData = req.body || {};
    
    const newMatch = {
        id: matchData.id || Date.now().toString(),
        teamId: matchData.teamId,
        teamName: matchData.teamName,
        roundId: matchData.roundId,
        promptCardId: matchData.promptCardId,
        useCaseCardId: matchData.useCaseCardId,
        toolCardId: matchData.toolCardId,
        timestamp: matchData.timestamp || new Date().toISOString(),
        tested: matchData.tested || false
    };
    
    try {
        await createMatch(newMatch);
        context.log('[CreateMatch] Match created:', newMatch.id);
        
        context.res = {
            status: 201,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(newMatch)
        };
    } catch (error) {
        context.log.error('[CreateMatch] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to create match', details: error.message })
        };
    }
};
