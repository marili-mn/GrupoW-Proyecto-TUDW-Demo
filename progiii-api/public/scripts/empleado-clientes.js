document.addEventListener('DOMContentLoaded', () => {
    const API_URL = '/usuarios';
    const clientesBody = document.getElementById('clientes-body');
    const noResults = document.getElementById('no-results');
    
    // MOCK CLIENTES (Filtrado de MOCK_USUARIOS)
    const MOCK_CLIENTES = [
        { usuario_id: 4, nombre: 'Oscar', apellido: 'Ramirez', nombre_usuario: 'oscram@correo.com', celular: '123-4567', activo: 1, creado: '2025-01-01', tipo_usuario: 1 },
        { usuario_id: 8, nombre: 'Javier', apellido: 'Acosta', nombre_usuario: 'profe@gmail.com', celular: '555-9999', activo: 1, creado: '2025-01-01', tipo_usuario: 1 }
    ];

    let allClientes = [];

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-AR');
    }

    async function fetchClientes() {
        // MODO SUCIO: Bypass fetch
        allClientes = MOCK_CLIENTES;
        renderClientes(allClientes);
    }

    function renderClientes(clientesToRender) {
        clientesBody.innerHTML = '';
        
        if (clientesToRender.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';

        const sortedClientes = [...clientesToRender].sort((a, b) => {
            const dateA = new Date(a.creado || 0);
            const dateB = new Date(b.creado || 0);
            return dateB - dateA;
        });

        sortedClientes.forEach(cliente => {
            const row = clientesBody.insertRow();
            
            if (cliente.activo === 0 || cliente.activo === false) {
                row.classList.add('user-inactive-row');
            }

            row.insertCell().textContent = cliente.usuario_id;
            row.insertCell().textContent = `${cliente.nombre || ''} ${cliente.apellido || ''}`.trim() || '-';
            row.insertCell().textContent = cliente.nombre_usuario || '-';
            row.insertCell().textContent = cliente.celular || '-';
            row.insertCell().textContent = (cliente.activo === 1 || cliente.activo === true) ? 'Activo' : 'Inactivo';
            
            // Placeholder para conteo de reservas
            row.insertCell().textContent = Math.floor(Math.random() * 5); // Dato ficticio
            
            row.insertCell().textContent = formatDate(cliente.creado);
        });
    }

    window.filterClientes = function() {
        const filterText = document.getElementById('filter-input').value.toLowerCase();
        const filteredClientes = allClientes.filter(cliente => {
            const nombreCompleto = `${cliente.nombre || ''} ${cliente.apellido || ''}`.toLowerCase();
            return nombreCompleto.includes(filterText) ||
                   (cliente.nombre_usuario && cliente.nombre_usuario.toLowerCase().includes(filterText));
        });
        renderClientes(filteredClientes);
    };

    fetchClientes();
});