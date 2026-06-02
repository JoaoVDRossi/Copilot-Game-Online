const { getAllTeams, createTeam, updateTeam } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[CreateOrUpdateTeam] Triggered');
    
    const teamData = req.body || {};
    const name = teamData.name || 'Team';
    const members = teamData.members || [];
    const area = teamData.area || '';
    
    try {
        const allTeams = await getAllTeams();
        let team = allTeams.find(t => t.name === name);
        
        if (team) {
            // Update existing team
            team.members = members;
            team.area = area;
            team.points = teamData.points !== undefined ? teamData.points : team.points;
            
            await updateTeam(team);
            context.log('[CreateOrUpdateTeam] Team updated:', team.id);
        } else {
            // Create new team
            team = {
                id: teamData.id || Date.now().toString(),
                name,
                members,
                points: teamData.points || 0,
                area
            };
            
            await createTeam(team);
            context.log('[CreateOrUpdateTeam] Team created:', team.id);
        }
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(team)
        };
    } catch (error) {
        context.log.error('[CreateOrUpdateTeam] Error:', error.message);
        
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to create/update team', details: error.message })
        };
    }
};
