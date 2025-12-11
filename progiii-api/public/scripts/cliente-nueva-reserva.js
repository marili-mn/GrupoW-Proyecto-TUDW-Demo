document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3007/api/v1/reservas';
    const form = document.getElementById('reserva-form');
    const salonSelect = document.getElementById('salon_id');
    const turnoSelect = document.getElementById('turno_id');
    const serviciosContainer = document.getElementById('servicios-container');
    
    let salones = [];
    let turnos = [];
    let servicios = [];
    let serviciosSeleccionados = [];

    // --- DATOS MOCK (DIRTY FIX) ---
    const MOCK_SALONES = [
        { salon_id: 1, titulo: 'Principal', direccion: 'San Lorenzo 1000', capacidad: 250, importe: 95000.00, activo: 1 },
        { salon_id: 2, titulo: 'Secundario', direccion: 'San Lorenzo 1000', capacidad: 70, importe: 7000.00, activo: 1 },
        { salon_id: 3, titulo: 'Cancha Fútbol 5', direccion: 'Alberdi 300', capacidad: 50, importe: 150000.00, activo: 1 },
        { salon_id: 4, titulo: 'Maquina de Jugar', direccion: 'Peru 50', capacidad: 100, importe: 95000.00, activo: 1 },
        { salon_id: 5, titulo: 'Trampolín Play', direccion: 'Belgrano 100', capacidad: 70, importe: 200000.00, activo: 1 },
        { salon_id: 6, titulo: 'Villa Tranquila', direccion: 'los jacarandaes', capacidad: 300, importe: 500000.00, activo: 1 }
    ];

    const MOCK_TURNOS = [
        { turno_id: 1, orden: 1, hora_desde: '12:00:00', hora_hasta: '14:00:00', activo: 1 },
        { turno_id: 2, orden: 2, hora_desde: '14:00:00', hora_hasta: '17:00:00', activo: 1 },
        { turno_id: 3, orden: 7, hora_desde: '18:00:00', hora_hasta: '20:00:00', activo: 0 },
        { turno_id: 4, orden: 4, hora_desde: '20:05:00', hora_hasta: '23:08:00', activo: 1 }
    ];

    const MOCK_SERVICIOS = [
        { servicio_id: 1, descripcion: 'Sonido', importe: 150400.00, activo: 1 },
        { servicio_id: 2, descripcion: 'Mesa dulce', importe: 25000.00, activo: 1 },
        { servicio_id: 3, descripcion: 'Tarjetas de invitación', importe: 5000.00, activo: 1 },
        { servicio_id: 4, descripcion: 'Mozos', importe: 15000.00, activo: 1 },
        { servicio_id: 5, descripcion: 'Sala de video juegos', importe: 15000.00, activo: 1 },
        { servicio_id: 6, descripcion: 'Mago', importe: 25000.00, activo: 1 },
        { servicio_id: 7, descripcion: 'Cabezones', importe: 80000.00, activo: 1 },
        { servicio_id: 8, descripcion: 'Maquillaje infantil', importe: 1000.00, activo: 1 },
        { servicio_id: 9, descripcion: 'DJ', importe: 23000.00, activo: 1 }
    ];

    // Configurar fecha mínima (hoy)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('fecha_reserva').setAttribute('min', today);

    function formatCurrency(amount) {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(amount);
    }

    async function fetchSalones() {
        // MODO SUCIO: Injectar
        salones = MOCK_SALONES;
        
        salonSelect.innerHTML = '<option value="">Seleccione un salón</option>';
        salones.forEach(salon => {
            const option = document.createElement('option');
            option.value = salon.salon_id;
            option.textContent = `${salon.titulo} - ${formatCurrency(salon.importe)}`;
            option.dataset.importe = salon.importe;
            salonSelect.appendChild(option);
        });
    }

    async function fetchTurnos() {
        // MODO SUCIO: Injectar
        turnos = MOCK_TURNOS.filter(t => t.activo === 1);
        
        turnoSelect.innerHTML = '<option value="">Seleccione un turno</option>';
        turnos.forEach(turno => {
            const option = document.createElement('option');
            option.value = turno.turno_id;
            option.textContent = `${turno.hora_desde.substring(0, 5)} - ${turno.hora_hasta.substring(0, 5)}`;
            turnoSelect.appendChild(option);
        });
    }

    async function fetchServicios() {
        // MODO SUCIO: Injectar
        servicios = MOCK_SERVICIOS;
        
        serviciosContainer.innerHTML = '';
        servicios.forEach(servicio => {
            const div = document.createElement('div');
            div.style.marginBottom = '10px';
            div.innerHTML = `
                <label style="display: flex; align-items: center; cursor: pointer;">
                    <input type="checkbox" value="${servicio.servicio_id}" 
                           data-descripcion="${servicio.descripcion}" 
                           data-importe="${servicio.importe}"
                           onchange="updateServicios()" 
                           style="margin-right: 10px; width: 20px; height: 20px;">
                    <span>${servicio.descripcion} - ${formatCurrency(servicio.importe)}</span>
                </label>
            `;
            serviciosContainer.appendChild(div);
        });
    }

    window.updateServicios = function() {
        serviciosSeleccionados = [];
        const checkboxes = serviciosContainer.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(cb => {
            serviciosSeleccionados.push({
                servicio_id: parseInt(cb.value),
                descripcion: cb.dataset.descripcion,
                importe: parseFloat(cb.dataset.importe)
            });
        });
        calcularTotal();
    };

    function calcularTotal() {
        const salonOption = salonSelect.options[salonSelect.selectedIndex];
        const importeSalon = salonOption ? parseFloat(salonOption.dataset.importe || 0) : 0;
        const importeServicios = serviciosSeleccionados.reduce((sum, s) => sum + s.importe, 0);
        const total = importeSalon + importeServicios;

        document.getElementById('importe-salon').textContent = formatCurrency(importeSalon);
        document.getElementById('importe-servicios').textContent = formatCurrency(importeServicios);
        document.getElementById('importe-total').textContent = formatCurrency(total);
    }

    salonSelect.addEventListener('change', calcularTotal);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('¡Reserva creada exitosamente! (Simulación Demo)');
        window.location.href = 'reservas.html';
    });

    fetchSalones();
    fetchTurnos();
    fetchServicios();
});