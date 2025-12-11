document.addEventListener('DOMContentLoaded', () => {
    // Verificar autenticación
    // if (!window.auth || !window.auth.isAuthenticated()) window.location.href = '../login.html';

    const activosBody = document.getElementById('turnos-activos-body');
    const inactivosBody = document.getElementById('turnos-inactivos-body');
    
    // MOCK DATA
    const MOCK_TURNOS = [
        { turno_id: 1, orden: 1, hora_desde: '12:00:00', hora_hasta: '14:00:00', activo: 1, creado: '2025-01-01' },
        { turno_id: 2, orden: 2, hora_desde: '14:00:00', hora_hasta: '17:00:00', activo: 1, creado: '2025-01-01' },
        { turno_id: 4, orden: 4, hora_desde: '20:05:00', hora_hasta: '23:08:00', activo: 1, creado: '2025-01-01' }
    ];

    async function fetchTurnos() {
        // MODO SUCIO: Bypass fetch
        renderTurnos(MOCK_TURNOS);
    }

    function renderTurnos(turnos) {
        if (activosBody) activosBody.innerHTML = '';
        if (inactivosBody) inactivosBody.innerHTML = '';

        turnos.forEach(turno => {
            const row = document.createElement('tr');
            if (turno.activo === 0) row.classList.add('inactive-row');

            const horaDesde = turno.hora_desde.substring(0, 5);
            const horaHasta = turno.hora_hasta.substring(0, 5);

            row.innerHTML = `
                <td>${turno.turno_id}</td>
                <td>${turno.orden}</td>
                <td>${horaDesde}</td>
                <td>${horaHasta}</td>
                <td>${turno.activo ? 'Activo' : 'Inactivo'}</td>
                <td>${new Date(turno.creado).toLocaleDateString()}</td>
                <td>
                    <button class="edit-btn" onclick="alert('Editar Turno ${turno.turno_id}')">Editar</button>
                </td>
            `;
            
            if (turno.activo === 1 && activosBody) {
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
    const form = document.getElementById('add-turno-form');

    if (addBtn) addBtn.addEventListener('click', () => modal.style.display = 'flex');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
    if (form) form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Turno agregado (Demo)');
        modal.style.display = 'none';
        // Add dummy to list
        MOCK_TURNOS.push({
            turno_id: MOCK_TURNOS.length + 10,
            orden: document.getElementById('add-orden').value,
            hora_desde: document.getElementById('add-hora-desde').value,
            hora_hasta: document.getElementById('add-hora-hasta').value,
            activo: 1,
            creado: new Date().toISOString()
        });
        renderTurnos(MOCK_TURNOS);
    });

    fetchTurnos();
});
