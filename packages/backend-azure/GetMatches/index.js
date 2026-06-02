const { getAllMatches } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[GetMatches] Triggered');
    
    try {
        const teamId = req.query.teamId;
        const matches = await getAllMatches(teamId);
        
        context.log('[GetMatches] Total matches:', matches.length);
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(matches)
        };
    } catch (error) {
        context.log.error('[GetMatches] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to fetch matches', details: error.message })
        };
    }
};
