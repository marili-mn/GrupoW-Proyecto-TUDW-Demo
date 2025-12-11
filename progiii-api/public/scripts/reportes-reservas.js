document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/reportes/reservas';
    const reservasBody = document.getElementById('reservas-body');
    const buscarBtn = document.getElementById('buscar-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const noResults = document.getElementById('no-results');
    
    let reservasData = [];

    function formatCurrency(amount) {
        if (!amount) return '$0.00';
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('es-AR');
    }

    async function fetchReservas() {
        // MODO SUCIO
        reservasData = [
            { 
                reserva_id: 1, 
                fecha_reserva: '2025-10-08', 
                cliente_nombre: 'Alberto',
                cliente_apellido: 'López',
                salon_titulo: 'Principal', 
                hora_desde: '12:00:00', 
                hora_hasta: '14:00:00',
                servicios: 'Sonido, Mesa Dulce',
                importe_total: 200000.00, 
                activo: 1 
            },
            { 
                reserva_id: 2, 
                fecha_reserva: '2025-10-08', 
                cliente_nombre: 'Alberto',
                cliente_apellido: 'López',
                salon_titulo: 'Secundario', 
                hora_desde: '12:00:00', 
                hora_hasta: '14:00:00',
                servicios: '-',
                importe_total: 100000.00, 
                activo: 1 
            }
        ];
        renderReservas(reservasData);
    }

    function renderReservas(reservas) {
        reservasBody.innerHTML = '';
        if (reservas.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        noResults.style.display = 'none';

        reservas.forEach(reserva => {
            const row = reservasBody.insertRow();
            if (reserva.activo === 0) row.classList.add('user-inactive-row');

            row.insertCell().textContent = reserva.reserva_id;
            row.insertCell().textContent = formatDate(reserva.fecha_reserva);
            row.insertCell().textContent = `${reserva.cliente_nombre} ${reserva.cliente_apellido}`;
            row.insertCell().textContent = reserva.salon_titulo;
            
            const turno = reserva.hora_desde ? `${reserva.hora_desde.substring(0, 5)} - ${reserva.hora_hasta.substring(0, 5)}` : '-';
            row.insertCell().textContent = turno;
            
            row.insertCell().textContent = reserva.servicios;
            row.insertCell().textContent = formatCurrency(reserva.importe_total);
            row.insertCell().textContent = reserva.activo === 1 ? 'Activa' : 'Cancelada';
        });
    }

    buscarBtn.addEventListener('click', fetchReservas);
    exportCsvBtn.addEventListener('click', () => alert("Exportar CSV (Demo)"));
    exportPdfBtn.addEventListener('click', () => alert("Exportar PDF (Demo)"));

    fetchReservas();
});