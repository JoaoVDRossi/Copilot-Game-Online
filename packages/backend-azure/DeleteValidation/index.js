const { deleteValidation } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[DeleteValidation] Triggered', { id: req.params.id });
    
    const id = req.params.id;
    
    if (!id) {
        context.res = {
            status: 400,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Validation ID is required' })
        };
        return;
    }
    
    try {
        await deleteValidation(id);
        context.log('[DeleteValidation] Validation deleted:', id);
        
        context.res = {
            status: 204,
            headers: { 
                'Access-Control-Allow-Origin': '*'
            }
        };
    } catch (error) {
        context.log.error('[DeleteValidation] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to delete validation', details: error.message })
        };
    }
};
