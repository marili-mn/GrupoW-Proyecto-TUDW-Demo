document.addEventListener('DOMContentLoaded', () => {

    const API_URL = '/usuarios';
    
    // Verificar autenticación y permisos
    // if (!window.auth || !window.auth.isAuthenticated() || !window.auth.isAdmin()) {
    //     window.location.href = '../login.html';
    // }
    
    const activosBody = document.getElementById('usuarios-activos-body');
    const inactivosBody = document.getElementById('usuarios-inactivos-body');
    const filterInput = document.getElementById('filter-input-user');
    const noResultsMessage = document.getElementById('no-results-user');
    
    const addUserModal = document.getElementById('add-user-modal');
    const openAddUserModalBtn = document.getElementById('open-add-user-modal-btn');
    const closeAddUserModalBtn = document.querySelector('.close-add-user-modal');
    const addUserForm = document.getElementById('add-user-form');

    const detailsUserModal = document.getElementById('details-user-modal');
    const closeDetailsUserModalBtn = document.querySelector('.close-details-user-modal');
    const userDetailsView = document.getElementById('user-details-view');
    const editUserForm = document.getElementById('edit-user-form');
    const openEditUserFormBtn = document.getElementById('open-edit-user-form-btn');
    const cancelEditUserBtn = document.getElementById('cancel-edit-user-btn');
    const deleteUserBtn = document.getElementById('delete-user-btn');
    
    // MOCK DATA
    const MOCK_USUARIOS = [
        { usuario_id: 1, nombre: 'Alberto', apellido: 'López', nombre_usuario: 'alblop@correo.com', tipo_usuario: 3, activo: 0 },
        { usuario_id: 2, nombre: 'Pamela', apellido: 'Gómez', nombre_usuario: 'pamgom@correo.com', tipo_usuario: 3, activo: 1 },
        { usuario_id: 6, nombre: 'William', apellido: 'Corbalán', nombre_usuario: 'wilcor@correo.com', tipo_usuario: 2, activo: 1 },
        { usuario_id: 4, nombre: 'Oscar', apellido: 'Ramirez', nombre_usuario: 'oscram@correo.com', tipo_usuario: 1, activo: 1 }
    ];

    let allUsuarios = []; 

    function formatDate(dateString) {
        if (!dateString) return '-';
        return new Date().toLocaleDateString();
    }
    
    function getTipoUsuarioNombre(tipoUsuario) {
        const tipos = {
            1: 'Cliente',
            2: 'Empleado',
            3: 'Administrador'
        };
        return tipos[tipoUsuario] || `Tipo ${tipoUsuario}`;
    }
    
    function getLocalUserById(id) {
        return allUsuarios.find(u => u.usuario_id == id);
    }

    function showViewMode() {
        userDetailsView.style.display = 'block';
        editUserForm.style.display = 'none';
    }

    function openDetailsModal(user) {
        document.getElementById('view-id').textContent = user.usuario_id;
        document.getElementById('view-nombre').textContent = user.nombre;
        document.getElementById('view-apellido').textContent = user.apellido;
        document.getElementById('view-nombre-usuario').textContent = user.nombre_usuario;
        document.getElementById('view-tipo-usuario').textContent = getTipoUsuarioNombre(user.tipo_usuario);
        document.getElementById('view-celular').textContent = user.celular || '-';
        
        const activoText = user.activo === 1 ? '✅ Activado' : '❌ Desactivado';
        document.getElementById('view-activo').textContent = activoText;
        
        document.getElementById('view-creado').textContent = formatDate(user.creado);
        
        document.getElementById('edit-user-id').value = user.usuario_id;
        document.getElementById('edit-nombre').value = user.nombre;
        document.getElementById('edit-apellido').value = user.apellido;
        document.getElementById('edit-nombre-usuario').value = user.nombre_usuario;
        document.getElementById('edit-tipo-usuario').value = user.tipo_usuario;
        
        deleteUserBtn.dataset.id = user.usuario_id;
        
        showViewMode();
        detailsUserModal.style.display = 'flex';
    }

    function renderUsuarios(usuariosToRender) {
        activosBody.innerHTML = ''; 
        inactivosBody.innerHTML = ''; 
        
        const usuariosActivos = usuariosToRender.filter(u => u.activo === 1);
        const usuariosInactivos = usuariosToRender.filter(u => u.activo === 0);

        if (usuariosToRender.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }

        const createRow = (user, tbody) => {
            const row = tbody.insertRow();
            if (user.activo === 0) row.classList.add('user-inactive-row');
            
            row.insertCell().textContent = user.usuario_id;
            row.insertCell().textContent = `${user.nombre} ${user.apellido}`;
            row.insertCell().textContent = user.nombre_usuario;
            row.insertCell().textContent = getTipoUsuarioNombre(user.tipo_usuario);
            row.insertCell().textContent = user.celular || '-';
            row.insertCell().textContent = user.activo === 1 ? 'Activado' : 'Desactivado';
            row.insertCell().textContent = formatDate(user.creado);

            const actionsCell = row.insertCell();
            actionsCell.className = 'table-actions';
            
            const viewButton = document.createElement('button');
            viewButton.textContent = 'Ver / Editar';
            viewButton.className = 'edit-btn';
            viewButton.addEventListener('click', () => openDetailsModal(user));

            actionsCell.appendChild(viewButton);
        };
        
        usuariosActivos.forEach(user => createRow(user, activosBody));
        usuariosInactivos.forEach(user => createRow(user, inactivosBody));
    }
    
    function syncTableColumnWidths() {}

    async function fetchUsuarios() {
        // MODO SUCIO
        allUsuarios = MOCK_USUARIOS;
        renderUsuarios(allUsuarios);
    }

    async function toggleUserActivation(id, currentStatus) {
        alert('Acción simulada (Demo)');
        detailsUserModal.style.display = 'none'; 
    }
    
    window.filterUsuarios = function() {
        const filterText = filterInput.value.toLowerCase();
        
        const filteredUsuarios = allUsuarios.filter(user => {
            return user.nombre.toLowerCase().includes(filterText) || 
                   user.apellido.toLowerCase().includes(filterText) ||
                   user.nombre_usuario.toLowerCase().includes(filterText);
        });

        renderUsuarios(filteredUsuarios);
    }

    openAddUserModalBtn.addEventListener('click', () => {
        addUserModal.style.display = 'flex';
        addUserForm.reset(); 
    });

    closeAddUserModalBtn.addEventListener('click', () => {
        addUserModal.style.display = 'none';
    });

    closeDetailsUserModalBtn.addEventListener('click', () => {
        detailsUserModal.style.display = 'none';
        showViewMode(); 
    });

    window.addEventListener('click', (event) => {
        if (event.target === addUserModal) addUserModal.style.display = 'none';
        if (event.target === detailsUserModal) {
            detailsUserModal.style.display = 'none';
            showViewMode(); 
        }
    });
    
    openEditUserFormBtn.addEventListener('click', () => {
        userDetailsView.style.display = 'none';
        editUserForm.style.display = 'block';
    });

    cancelEditUserBtn.addEventListener('click', showViewMode);
    
    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Usuario creado (Demo)');
        addUserModal.style.display = 'none';
    });

    editUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Usuario actualizado (Demo)');
        detailsUserModal.style.display = 'none'; 
        showViewMode(); 
    });

    deleteUserBtn.addEventListener('click', async () => {
        alert('Acción simulada (Demo)');
        detailsUserModal.style.display = 'none';
    });

    fetchUsuarios();
});
