const { getAllValidations } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[GetValidations] Triggered');
    
    try {
        const validations = await getAllValidations();
        
        context.log('[GetValidations] Total validations:', validations.length);
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(validations)
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
