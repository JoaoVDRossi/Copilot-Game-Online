const { getAllValidations, createValidation, updateValidation } = require('../utils/storage');

module.exports = async function (context, req) {
    context.log('[UpdateValidation] Triggered', { id: req.params.id });
    
    const id = req.params.id;
    const updates = req.body || {};
    
    try {
        const allValidations = await getAllValidations();
        const existing = allValidations.find(v => v.id === id);
        
        if (!existing) {
            // Create new validation
            const newValidation = {
                id,
                ...updates,
                createdAt: new Date().toISOString()
            };
            
            await createValidation(newValidation);
            context.log('[UpdateValidation] Validation created:', id);
            
            context.res = {
                status: 201,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(newValidation)
            };
            return;
        }
        
        // Update existing validation
        const updated = {
            ...existing,
            ...updates,
            updatedAt: new Date().toISOString()
        };
        
        await updateValidation(updated);
        context.log('[UpdateValidation] Validation updated:', id);
        
        context.res = {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(updated)
        };
    } catch (error) {
        context.log.error('[UpdateValidation] Error:', error.message);
        context.res = {
            status: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Failed to update validation', details: error.message })
        };
    }
};
