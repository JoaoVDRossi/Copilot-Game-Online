const { getAllValidations } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[GetValidations] Triggered');
    
    try {
        const validations = await getAllValidations();
        
        // Get only pending validations (not yet validated)
        const pending = validations.filter(v => !v.validated);
        
        context.log('[GetValidations] Pending validations:', pending.length);
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(pending)
        };
    } catch (error) {
        context.log.error('[GetValidations] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to fetch validations', details: error.message })
        };
    }
};
