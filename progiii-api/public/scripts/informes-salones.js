document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/salones';
    
    // Verificar autenticación
    // if (!window.auth || !window.auth.isAuthenticated() || !window.auth.isAdmin()) {
    //     window.location.href = '../login.html';
    // }
    
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const informesContainer = document.querySelector('.informes-container');
    const salonesDetailBody = document.getElementById('salones-detail-body');
    
    let allSalonesData = [];
    let statsData = {};

    function formatCurrency(amount) {
        if (!amount) return '$0.00';
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(amount);
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        return new Date().toLocaleDateString('es-AR');
    }

    async function fetchAllSalones() {
        // MODO SUCIO
        loadingMessage.style.display = 'block';
        
        // Mock Stats
        const estadisticas = {
            total_salones: 6,
            salones_activos: 6,
            salones_inactivos: 0,
            capacidad_total: 840,
            capacidad_promedio: 140,
            capacidad_maxima: 300,
            capacidad_minima: 50,
            importe_total: 997000,
            importe_promedio: 166166,
            importe_maximo: 500000,
            importe_minimo: 7000
        };
        displayStats(estadisticas);

        // Mock Salones
        const allSalones = [
             { salon_id: 1, titulo: 'Principal', direccion: 'San Lorenzo 1000', capacidad: 250, importe: 95000.00, activo: 1, creado: '2025-01-01' },
             { salon_id: 2, titulo: 'Secundario', direccion: 'San Lorenzo 1000', capacidad: 70, importe: 7000.00, activo: 1, creado: '2025-01-01' },
             { salon_id: 3, titulo: 'Cancha Fútbol 5', direccion: 'Alberdi 300', capacidad: 50, importe: 150000.00, activo: 1, creado: '2025-01-01' },
             { salon_id: 6, titulo: 'Villa Tranquila', direccion: 'los jacarandaes', capacidad: 300, importe: 500000.00, activo: 1, creado: '2025-01-01' }
        ];

        allSalonesData = allSalones;
        statsData = estadisticas;
        displaySalonesTable(allSalones);
        
        loadingMessage.style.display = 'none';
        informesContainer.style.display = 'block';
    }

    function displayStats(estadisticas) {
        document.getElementById('total-salones').textContent = estadisticas.total_salones;
        document.getElementById('salones-activos').textContent = estadisticas.salones_activos;
        document.getElementById('salones-inactivos').textContent = estadisticas.salones_inactivos;
        document.getElementById('capacidad-total').textContent = estadisticas.capacidad_total;
        document.getElementById('capacidad-promedio').textContent = estadisticas.capacidad_promedio;
        document.getElementById('capacidad-maxima').textContent = estadisticas.capacidad_maxima;
        document.getElementById('capacidad-minima').textContent = estadisticas.capacidad_minima;
        document.getElementById('importe-total').textContent = formatCurrency(estadisticas.importe_total);
        document.getElementById('importe-promedio').textContent = formatCurrency(estadisticas.importe_promedio);
        document.getElementById('importe-maximo').textContent = formatCurrency(estadisticas.importe_maximo);
        document.getElementById('importe-minimo').textContent = formatCurrency(estadisticas.importe_minimo);
    }

    function displaySalonesTable(salones) {
        salonesDetailBody.innerHTML = '';
        salones.forEach(salon => {
            const row = salonesDetailBody.insertRow();
            row.insertCell().textContent = salon.salon_id;
            row.insertCell().textContent = salon.titulo;
            row.insertCell().textContent = salon.direccion;
            row.insertCell().textContent = salon.capacidad;
            row.insertCell().textContent = formatCurrency(salon.importe);
            row.insertCell().textContent = salon.activo ? 'Activo' : 'Inactivo';
            row.insertCell().textContent = formatDate(salon.creado);
        });
    }

    // Funcionalidad de PDF y CSV (Simplificada para demo)
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const pdfConfigModal = document.getElementById('pdf-config-modal');
    const pdfConfigForm = document.getElementById('pdf-config-form');
    const closePdfConfigBtn = document.querySelector('.close-pdf-config-modal');

    exportPdfBtn.addEventListener('click', () => pdfConfigModal.style.display = 'flex');
    exportCsvBtn.addEventListener('click', () => alert("Exportar a CSV (Demo)"));
    closePdfConfigBtn.addEventListener('click', () => pdfConfigModal.style.display = 'none');
    window.addEventListener('click', (event) => { if (event.target === pdfConfigModal) pdfConfigModal.style.display = 'none'; });

    pdfConfigForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Generar PDF (Demo)");
        pdfConfigModal.style.display = 'none';
    });

    fetchAllSalones();
});