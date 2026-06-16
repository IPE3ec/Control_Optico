// notificaciones.js
// Este script se encarga de manejar notificaciones en la aplicación.

// Función para mostrar notificaciones en la interfaz (popup/alert)
function mostrarNotificacion(mensaje, tipo = 'info') {
  // Puedes personalizar: usar un modal, toast, etc.
  alert(`🔔 ${mensaje}`);
  // Aquí podrías enviar a un sistema de notificaciones más elaborado
}

// Función para obtener notificaciones desde la hoja (futuro)
async function obtenerNotificaciones(opticaId) {
  // Placeholder: podrías consultar una hoja de notificaciones
  // Por ahora, devolvemos datos simulados
  return [
    { mensaje: 'Paciente María Pérez tiene cita en 1 hora', tipo: 'recordatorio' },
    { mensaje: 'Nuevo mensaje de proveedor', tipo: 'info' },
    { mensaje: 'Inventario bajo: monturas modelo X', tipo: 'alerta' }
  ];
}

// Función para mostrar el badge con el número de notificaciones
async function actualizarBadge(opticaId) {
  const notificaciones = await obtenerNotificaciones(opticaId);
  const badge = document.querySelector('.badge-count');
  if (badge) {
    const count = notificaciones.length;
    badge.textContent = count > 0 ? count : '';
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }
}

// Registrar el Service Worker (si no está registrado)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registrado con éxito:', registration);
      // Solicitar permisos para notificaciones push (opcional)
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    })
    .catch((error) => {
      console.error('Error al registrar Service Worker:', error);
    });
}

// Exportar funciones para usar en otras páginas (opcional)
window.mostrarNotificacion = mostrarNotificacion;
window.actualizarBadge = actualizarBadge;
