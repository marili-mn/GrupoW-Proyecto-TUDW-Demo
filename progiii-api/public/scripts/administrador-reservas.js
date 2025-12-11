document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/reservas';
    const activosBody = document.getElementById('reservas-activas-body');
    const inactivosBody = document.getElementById('reservas-inactivas-body');
    const addModal = document.getElementById('add-modal');
    const detailsModal = document.getElementById('details-modal');
    const closeAddModalBtn = document.querySelector('.close-add-modal');
    const closeDetailsModalBtn = document.querySelector('.close-details-modal');
    const openAddModalBtn = document.getElementById('open-add-modal-btn');
    const reservaForm = document.getElementById('reserva-form');
    const openEditBtn = document.getElementById('open-edit-btn');
    const deleteReservaBtn = document.getElementById('delete-reserva-btn');
    const noResults = document.getElementById('no-results');
    const modalTitle = document.getElementById('modal-title');
    const comentariosList = document.getElementById('comentarios-list');
    const agregarComentarioBtn = document.getElementById('agregar-comentario-btn');
    const nuevoComentarioInput = document.getElementById('nuevo-comentario');
    
    // --- DATOS MOCK ---
    let MOCK_RESERVAS = [
        { 
            reserva_id: 1, 
            fecha_reserva: '2025-10-08', 
            salon_titulo: 'Principal', 
            usuario_nombre: 'Alberto',
            usuario_apellido: 'López',
            hora_desde: '12:00:00', 
            hora_hasta: '14:00:00',
            tematica: 'Plim plim', 
            importe_total: 200000.00, 
            activo: 1, 
            creado: '2025-08-19T22:02:33.000Z',
            comentarios: [
                { usuario_nombre: 'Admin', comentario: 'Confirmado por teléfono.', creado: '2025-08-20T10:00:00Z' }
            ]
        },
        { 
            reserva_id: 2, 
            fecha_reserva: '2025-10-08', 
            salon_titulo: 'Secundario', 
            usuario_nombre: 'Alberto',
            usuario_apellido: 'López',
            hora_desde: '12:00:00', 
            hora_hasta: '14:00:00',
            tematica: 'Messi', 
            importe_total: 100000.00, 
            activo: 1, 
            creado: '2025-08-19T22:03:45.000Z',
            comentarios: []
        },
        { 
            reserva_id: 4, 
            fecha_reserva: '2025-11-13', 
            salon_titulo: 'Secundario', 
            usuario_nombre: 'Oscar',
            usuario_apellido: 'Ramirez',
            hora_desde: '12:00:00', 
            hora_hasta: '14:00:00',
            tematica: '-', 
            importe_total: 7000.00, 
            activo: 0, 
            creado: '2025-11-01T18:56:53.000Z',
            comentarios: []
        }
    ];

    let currentReserva = null;
    let isEditMode = false;

    function formatCurrency(amount) {
        if (!amount) return '$0.00';
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('es-AR');
    }

    function formatDateTime(dateString) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('es-AR') + ' ' + new Date(dateString).toLocaleTimeString('es-AR');
    }

    function formatTime(timeString) {
        if (!timeString) return '-';
        return timeString.substring(0, 5);
    }

    async function fetchReservas() {
        renderReservas(MOCK_RESERVAS);
    }

    function renderReservas(reservasToRender) {
        activosBody.innerHTML = '';
        inactivosBody.innerHTML = '';
        
        if (reservasToRender.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        noResults.style.display = 'none';

        const sorted = [...reservasToRender].sort((a, b) => new Date(b.fecha_reserva) - new Date(a.fecha_reserva));
        const reservasActivas = sorted.filter(r => r.activo === 1);
        const reservasInactivas = sorted.filter(r => r.activo === 0);

        reservasActivas.forEach(reserva => createRow(reserva, activosBody));
        reservasInactivas.forEach(reserva => createRow(reserva, inactivosBody));
    }

    function createRow(reserva, tbody) {
        const row = tbody.insertRow();
        if (reserva.activo === 0) row.classList.add('user-inactive-row');

        row.insertCell().textContent = reserva.reserva_id;
        row.insertCell().textContent = formatDate(reserva.fecha_reserva);
        row.insertCell().textContent = `${reserva.usuario_nombre} ${reserva.usuario_apellido}`;
        row.insertCell().textContent = reserva.salon_titulo;
        row.insertCell().textContent = reserva.hora_desde ? `${formatTime(reserva.hora_desde)} - ${formatTime(reserva.hora_hasta)}` : '-';
        row.insertCell().textContent = reserva.tematica || '-';
        row.insertCell().textContent = formatCurrency(reserva.importe_total);
        row.insertCell().textContent = (reserva.activo === 1) ? 'Activa' : 'Cancelada';
        row.insertCell().textContent = formatDateTime(reserva.creado);

        const cell10 = row.insertCell();
        const viewBtn = document.createElement('button');
        viewBtn.textContent = 'Ver / Editar';
        viewBtn.className = 'edit-btn';
        viewBtn.addEventListener('click', () => openDetailsModal(reserva));
        cell10.appendChild(viewBtn);
    }

    function openDetailsModal(reserva) {
        currentReserva = reserva;
        document.getElementById('view-id').textContent = reserva.reserva_id;
        document.getElementById('view-fecha').textContent = formatDate(reserva.fecha_reserva);
        document.getElementById('view-cliente').textContent = `${reserva.usuario_nombre} ${reserva.usuario_apellido}`;
        document.getElementById('view-salon').textContent = reserva.salon_titulo;
        document.getElementById('view-importe-total').textContent = formatCurrency(reserva.importe_total);
        document.getElementById('view-estado').textContent = reserva.activo === 1 ? 'Activa' : 'Cancelada';
        
        renderComentarios(reserva.comentarios || []);
        
        detailsModal.style.display = 'flex';
    }

    function renderComentarios(comentarios) {
        comentariosList.innerHTML = '';
        if (!comentarios || comentarios.length === 0) {
            comentariosList.innerHTML = '<p>No hay comentarios.</p>';
            return;
        }
        comentarios.forEach(c => {
            const div = document.createElement('div');
            div.style.cssText = "border-bottom:1px solid #eee; padding:5px; margin-bottom:5px;";
            div.innerHTML = `<strong>${c.usuario_nombre}:</strong> ${c.comentario} <br><small>${formatDateTime(c.creado)}</small>`;
            comentariosList.appendChild(div);
        });
    }

    // Agregar Comentario Mock
    if (agregarComentarioBtn) {
        agregarComentarioBtn.addEventListener('click', () => {
            const text = nuevoComentarioInput.value.trim();
            if (!text) return;
            
            if (!currentReserva.comentarios) currentReserva.comentarios = [];
            currentReserva.comentarios.push({
                usuario_nombre: 'Admin (Tú)',
                comentario: text,
                creado: new Date().toISOString()
            });
            
            nuevoComentarioInput.value = '';
            renderComentarios(currentReserva.comentarios);
        });
    }

    // Modal Crear/Editar
    function openAddModal() {
        isEditMode = false;
        modalTitle.textContent = 'Crear Nueva Reserva (Demo)';
        reservaForm.reset();
        addModal.style.display = 'flex';
    }

    const openAddModalBtn = document.getElementById('open-add-modal-btn');
    if (openAddModalBtn) openAddModalBtn.addEventListener('click', openAddModal);
    
    closeAddModalBtn.addEventListener('click', () => addModal.style.display = 'none');
    closeDetailsModalBtn.addEventListener('click', () => detailsModal.style.display = 'none');
    
    openEditBtn.addEventListener('click', () => {
        isEditMode = true;
        modalTitle.textContent = 'Editar Reserva (Demo)';
        document.getElementById('form-fecha-reserva').value = '2025-10-08'; // Mock
        document.getElementById('form-tematica').value = currentReserva.tematica;
        detailsModal.style.display = 'none';
        addModal.style.display = 'flex';
    });

    window.addEventListener('click', (event) => {
        if (event.target === addModal) addModal.style.display = 'none';
        if (event.target === detailsModal) detailsModal.style.display = 'none';
    });

    reservaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (isEditMode && currentReserva) {
            currentReserva.tematica = document.getElementById('form-tematica').value;
            // Update other fields as needed for demo
            alert('Reserva actualizada (Memoria)');
        } else {
            MOCK_RESERVAS.push({
                reserva_id: MOCK_RESERVAS.length + 100,
                fecha_reserva: document.getElementById('form-fecha-reserva').value,
                salon_titulo: 'Nuevo Salón',
                usuario_nombre: 'Cliente',
                usuario_apellido: 'Nuevo',
                importe_total: 150000,
                activo: 1,
                creado: new Date().toISOString(),
                comentarios: []
            });
            alert('Reserva creada (Memoria)');
        }
        
        addModal.style.display = 'none';
        renderReservas(MOCK_RESERVAS);
    });

    deleteReservaBtn.addEventListener('click', async () => {
        if(currentReserva) {
            currentReserva.activo = currentReserva.activo ? 0 : 1;
            renderReservas(MOCK_RESERVAS);
            alert(currentReserva.activo ? 'Reserva reactivada' : 'Reserva cancelada');
            detailsModal.style.display = 'none';
        }
    });

    // Cargar selects mock
    const salonSelect = document.getElementById('form-salon-id');
    if(salonSelect) salonSelect.innerHTML = '<option value="1">Principal</option><option value="2">Secundario</option>';
    
    const turnoSelect = document.getElementById('form-turno-id');
    if(turnoSelect) turnoSelect.innerHTML = '<option value="1">12:00 - 14:00</option>';
    
    const usuarioSelect = document.getElementById('form-usuario-id');
    if(usuarioSelect) usuarioSelect.innerHTML = '<option value="1">Alberto López</option>';

    fetchReservas();
});
