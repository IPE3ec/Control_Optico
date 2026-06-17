// ================================================================
// app.js - Lógica central con carga dinámica de API_URL
// ================================================================

// Obtener el ID de la óptica desde la URL
const urlParams = new URLSearchParams(window.location.search);
const opticaId = urlParams.get('cliente') || 'default';

// Variable global que contendrá la URL de API
let API_URL = null;

// ================================================================
// CARGAR CONFIGURACIÓN DE API DESDE api-config.json
// ================================================================
async function loadApiConfig() {
    try {
        const response = await fetch('api-config.json');
        if (!response.ok) {
            throw new Error(`Error al cargar api-config.json: ${response.status}`);
        }
        const config = await response.json();
        API_URL = config[opticaId] || config['default'];
        
        if (!API_URL) {
            throw new Error(`No se encontró URL de API para el cliente: ${opticaId}`);
        }
        
        console.log(`🔑 API_URL cargada para ${opticaId}: ${API_URL}`);
        return API_URL;
    } catch (error) {
        console.error('❌ Error al cargar la configuración de API:', error);
        // Mostrar mensaje de error al usuario
        alert('No se pudo cargar la configuración de la aplicación. Verifica tu conexión.');
        return null;
    }
}

// ================================================================
// FUNCIONES DE CONFIGURACIÓN (usando API_URL dinámica)
// ================================================================
async function loadConfig() {
    if (!API_URL) {
        await loadApiConfig();
    }
    try {
        const response = await fetch(`${API_URL}?action=get&id=${opticaId}`);
        const config = await response.json();
        applyConfig(config);
    } catch (error) {
        console.error('Error cargando configuración:', error);
    }
}

// ================================================================
// INICIO - Cargar API_URL primero, luego el resto
// ================================================================
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Cargar la URL de API desde api-config.json
    await loadApiConfig();
    
    // 2. Si no se pudo cargar, detener la ejecución
    if (!API_URL) {
        document.body.innerHTML = `
            <div style="text-align:center; padding: 2rem;">
                <h2>⚠️ Error de configuración</h2>
                <p>No se pudo cargar la configuración de la aplicación.</p>
                <p>ID de cliente: ${opticaId}</p>
                <button onclick="location.reload()">Reintentar</button>
            </div>
        `;
        return;
    }
    
    // 3. Cargar el resto de la aplicación
    loadConfig();
    setupHeaderEvents();
    updateNavLinks();
});

// ================================================================
// EXPONER VARIABLES GLOBALES
// ================================================================
window.opticaId = opticaId;
window.getApiUrl = () => API_URL;
