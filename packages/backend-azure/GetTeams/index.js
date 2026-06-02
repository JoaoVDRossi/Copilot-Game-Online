const { getAllTeams } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[GetTeams] Triggered');
    
    try {
        const teams = await getAllTeams();
        
        context.log('[GetTeams] Total teams:', teams.length);
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(teams)
        };
    } catch (error) {
        context.log.error('[GetTeams] Error:', error.message);
        
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to fetch teams', details: error.message })
        };
    }
};
