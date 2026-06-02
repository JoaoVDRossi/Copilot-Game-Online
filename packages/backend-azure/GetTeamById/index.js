const { getAllTeams } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[GetTeamById] Triggered');
    
    const id = req.params.id;
    
    if (!id) {
        context.res = {
            status: 400,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Team ID is required' })
        };
        return;
    }
    
    try {
        const teams = await getAllTeams();
        const team = teams.find(t => t.id === id);
        
        if (!team) {
            context.res = {
                status: 404,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Team not found' })
            };
            return;
        }
        
        context.log('[GetTeamById] Team found:', team.id);
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(team)
        };
    } catch (error) {
        context.log.error('[GetTeamById] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to fetch team', details: error.message })
        };
    }
};
