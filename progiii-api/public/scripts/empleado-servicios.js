document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticación
    // if (!window.auth || !window.auth.isAuthenticated()) window.location.href = '../login.html';

    const activosBody = document.getElementById('servicios-activos-body');
    const inactivosBody = document.getElementById('servicios-inactivos-body');
    
    // MOCK DATA
    const MOCK_SERVICIOS = [
        { servicio_id: 1, descripcion: 'Sonido', importe: 150400.00, activo: 1, creado: '2025-01-01' },
        { servicio_id: 2, descripcion: 'Mesa dulce', importe: 25000.00, activo: 1, creado: '2025-01-01' },
        { servicio_id: 3, descripcion: 'Tarjetas de invitación', importe: 5000.00, activo: 1, creado: '2025-01-01' },
        { servicio_id: 4, descripcion: 'Mozos', importe: 15000.00, activo: 1, creado: '2025-01-01' },
        { servicio_id: 9, descripcion: 'DJ', importe: 23000.00, activo: 1, creado: '2025-01-01' }
    ];

    function formatCurrency(amount) {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
    }

    async function fetchServicios() {
        // MODO SUCIO: Bypass fetch
        renderServicios(MOCK_SERVICIOS);
    }

    function renderServicios(servicios) {
        if (activosBody) activosBody.innerHTML = '';
        if (inactivosBody) inactivosBody.innerHTML = '';

        servicios.forEach(servicio => {
            const row = document.createElement('tr');
            if (servicio.activo === 0) row.classList.add('inactive-row');

            row.innerHTML = `
                <td>${servicio.servicio_id}</td>
                <td>${servicio.descripcion}</td>
                <td>${formatCurrency(servicio.importe)}</td>
                <td>${servicio.activo ? 'Activo' : 'Inactivo'}</td>
                <td>${new Date(servicio.creado).toLocaleDateString()}</td>
                <td>
                    <button class="edit-btn" onclick="alert('Editar Servicio ${servicio.servicio_id}')">Editar</button>
                </td>
            `;
            
            if (servicio.activo === 1 && activosBody) {
                activosBody.appendChild(row);
            } else if (inactivosBody) {
                inactivosBody.appendChild(row);
            }
        });
    }

    // Modal dummy logic
    const addBtn = document.getElementById('open-add-modal-btn');
    const modal = document.getElementById('add-modal');
    const closeBtn = document.querySelector('.close-add-modal');
    const form = document.getElementById('add-servicio-form');

    if (addBtn) addBtn.addEventListener('click', () => modal.style.display = 'flex');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
    if (form) form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Servicio agregado (Demo)');
        modal.style.display = 'none';
        // Add dummy to list
        MOCK_SERVICIOS.push({
            servicio_id: MOCK_SERVICIOS.length + 10,
            descripcion: document.getElementById('add-descripcion').value,
            importe: document.getElementById('add-importe').value,
            activo: 1,
            creado: new Date().toISOString()
        });
        renderServicios(MOCK_SERVICIOS);
    });

    fetchServicios();
});
