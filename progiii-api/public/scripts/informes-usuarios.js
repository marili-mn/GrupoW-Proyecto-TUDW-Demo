document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/usuarios';
    
    // Verificar autenticación
    // if (!window.auth || !window.auth.isAuthenticated() || !window.auth.isAdmin()) {
    //     window.location.href = '../login.html';
    // }
    
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const informesContainer = document.querySelector('.informes-container');
    const usuariosDetailBody = document.getElementById('usuarios-detail-body');
    
    let allUsuariosData = [];
    let statsData = {};

    function formatDate(dateString) {
        if (!dateString) return '-';
        return new Date().toLocaleDateString('es-AR');
    }

    async function fetchAllUsuarios() {
        // MODO SUCIO
        loadingMessage.style.display = 'block';

        // Mock Stats
        const estadisticas = {
            total_usuarios: 8,
            usuarios_activos: 6,
            usuarios_inactivos: 2,
            total_clientes: 3,
            total_empleados: 2,
            total_administradores: 3,
            usuarios_con_celular: 0,
            usuarios_con_foto: 0
        };
        statsData = estadisticas;

        // Mock Usuarios
        const usuarios = [
             { usuario_id: 1, nombre: 'Alberto', apellido: 'López', nombre_usuario: 'alblop@correo.com', tipo_usuario: 3, activo: 0, creado: '2025-01-01' },
             { usuario_id: 2, nombre: 'Pamela', apellido: 'Gómez', nombre_usuario: 'pamgom@correo.com', tipo_usuario: 3, activo: 1, creado: '2025-01-01' },
             { usuario_id: 6, nombre: 'William', apellido: 'Corbalán', nombre_usuario: 'wilcor@correo.com', tipo_usuario: 2, activo: 1, creado: '2025-01-01' }
        ];
        allUsuariosData = usuarios;
        
        displayStats(estadisticas);
        displayUsuariosTable(usuarios);
        
        loadingMessage.style.display = 'none';
        informesContainer.style.display = 'block';
    }

    function displayStats(est) {
        document.getElementById('total-usuarios').textContent = est.total_usuarios;
        document.getElementById('usuarios-activos').textContent = est.usuarios_activos;
        document.getElementById('usuarios-inactivos').textContent = est.usuarios_inactivos;
        document.getElementById('tipo-1').textContent = est.total_clientes;
        document.getElementById('tipo-2').textContent = est.total_empleados;
        document.getElementById('tipo-3').textContent = est.total_administradores;
        document.getElementById('otros-tipos').textContent = 0;
        document.getElementById('usuarios-mes').textContent = 1;
        document.getElementById('usuarios-semana').textContent = 0;
        document.getElementById('usuarios-con-celular').textContent = est.usuarios_con_celular;
        document.getElementById('usuarios-con-foto').textContent = est.usuarios_con_foto;
    }

    function displayUsuariosTable(usuarios) {
        usuariosDetailBody.innerHTML = '';
        usuarios.forEach(usuario => {
            const row = usuariosDetailBody.insertRow();
            row.insertCell().textContent = usuario.usuario_id;
            row.insertCell().textContent = `${usuario.nombre} ${usuario.apellido}`;
            row.insertCell().textContent = usuario.nombre_usuario;
            row.insertCell().textContent = usuario.tipo_usuario === 1 ? 'Cliente' : (usuario.tipo_usuario === 2 ? 'Empleado' : 'Admin');
            row.insertCell().textContent = '-';
            row.insertCell().textContent = usuario.activo ? 'Activo' : 'Inactivo';
            row.insertCell().textContent = formatDate(usuario.creado);
        });
    }

    // PDF / CSV
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const pdfConfigModal = document.getElementById('pdf-config-modal');
    const pdfConfigForm = document.getElementById('pdf-config-form');
    const closePdfConfigBtn = document.querySelector('.close-pdf-config-modal');

    if(exportPdfBtn) exportPdfBtn.addEventListener('click', () => pdfConfigModal.style.display = 'flex');
    if(exportCsvBtn) exportCsvBtn.addEventListener('click', () => alert("Exportar CSV (Demo)"));
    if(closePdfConfigBtn) closePdfConfigBtn.addEventListener('click', () => pdfConfigModal.style.display = 'none');
    window.addEventListener('click', (e) => { if(e.target===pdfConfigModal) pdfConfigModal.style.display = 'none'; });
    if(pdfConfigForm) pdfConfigForm.addEventListener('submit', (e) => { e.preventDefault(); alert('PDF Demo'); pdfConfigModal.style.display='none'; });

    fetchAllUsuarios();
});