document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/reservas';
    const reservasBody = document.getElementById('reservas-body');
    const detailsModal = document.getElementById('details-modal');
    const closeDetailsModalBtn = document.querySelector('.close-details-modal');
    const noResults = document.getElementById('no-results');
    
    // Elementos del Modal de Creación
    const addModal = document.getElementById('add-modal');
    const openAddModalBtn = document.getElementById('open-add-modal-btn');
    const closeAddModalBtn = document.querySelector('.close-add-modal');
    const addForm = document.getElementById('add-reserva-form');

    // --- MOCK DATA ---
    const MOCK_RESERVAS = [
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
            creado: '2025-08-19T22:02:33.000Z'
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
            creado: '2025-08-19T22:03:45.000Z'
        }
    ];

    let allReservas = [];

    function formatCurrency(amount) {
        if (!amount) return '$0.00';
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('es-AR');
    }
    
    function formatTime(timeString) {
         if (!timeString) return '-';
         return timeString.substring(0, 5);
    }

    async function fetchReservas() {
        // MODO SUCIO
        allReservas = MOCK_RESERVAS;
        renderReservas(allReservas);
    }

    function renderReservas(reservasToRender) {
        reservasBody.innerHTML = '';
        if (reservasToRender.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        noResults.style.display = 'none';

        const sorted = [...reservasToRender].sort((a, b) => new Date(b.fecha_reserva) - new Date(a.fecha_reserva));

        sorted.forEach(reserva => {
            const row = reservasBody.insertRow();
            if (reserva.activo === 0) row.classList.add('user-inactive-row');

            row.insertCell().textContent = reserva.reserva_id;
            row.insertCell().textContent = formatDate(reserva.fecha_reserva);
            row.insertCell().textContent = `${reserva.usuario_nombre || 'Cliente'} ${reserva.usuario_apellido || ''}`;
            row.insertCell().textContent = reserva.salon_titulo;
            row.insertCell().textContent = reserva.hora_desde ? `${formatTime(reserva.hora_desde)} - ${formatTime(reserva.hora_hasta)}` : '-';
            row.insertCell().textContent = reserva.tematica || '-';
            row.insertCell().textContent = formatCurrency(reserva.importe_total);
            row.insertCell().textContent = reserva.activo === 1 ? 'Activa' : 'Cancelada';
            
            row.style.cursor = 'pointer';
            row.addEventListener('click', () => openDetailsModal(reserva));
        });
    }

    function openDetailsModal(reserva) {
        document.getElementById('view-id').textContent = reserva.reserva_id;
        document.getElementById('view-fecha').textContent = formatDate(reserva.fecha_reserva);
        document.getElementById('view-cliente').textContent = `${reserva.usuario_nombre || 'Cliente'} ${reserva.usuario_apellido || ''}`;
        document.getElementById('view-salon').textContent = reserva.salon_titulo;
        document.getElementById('view-importe-total').textContent = formatCurrency(reserva.importe_total);
        
        detailsModal.style.display = 'flex';
    }

    // Event Listeners para Modales
    closeDetailsModalBtn.addEventListener('click', () => detailsModal.style.display = 'none');
    
    if (openAddModalBtn) {
        openAddModalBtn.addEventListener('click', () => {
            addModal.style.display = 'flex';
            // Poner fecha de hoy como default
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('add-fecha').value = today;
        });
    }

    if (closeAddModalBtn) {
        closeAddModalBtn.addEventListener('click', () => addModal.style.display = 'none');
    }

    window.addEventListener('click', (e) => {
        if (e.target === detailsModal) detailsModal.style.display = 'none';
        if (e.target === addModal) addModal.style.display = 'none';
    });

    // Lógica de "Guardar Reserva" (Simulada)
    if (addForm) {
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const salonSelect = document.getElementById('add-salon');
            const clienteSelect = document.getElementById('add-cliente');
            const fecha = document.getElementById('add-fecha').value;
            const tematica = document.getElementById('add-tematica').value;
            const importe = document.getElementById('add-importe').value;

            const nuevaReserva = {
                reserva_id: allReservas.length + 100,
                fecha_reserva: fecha,
                salon_titulo: salonSelect.options[salonSelect.selectedIndex].text,
                usuario_nombre: clienteSelect.options[clienteSelect.selectedIndex].text.split(' ')[0], // Nombre simulado
                usuario_apellido: clienteSelect.options[clienteSelect.selectedIndex].text.split(' ')[1] || '',
                hora_desde: '12:00:00', // Hardcodeado por simplicidad
                hora_hasta: '16:00:00',
                tematica: tematica,
                importe_total: parseFloat(importe),
                activo: 1,
                creado: new Date().toISOString()
            };

            allReservas.push(nuevaReserva);
            renderReservas(allReservas);
            
            alert('¡Reserva creada exitosamente! (Demo)');
            addModal.style.display = 'none';
            addForm.reset();
        });
    }

    fetchReservas();
});
