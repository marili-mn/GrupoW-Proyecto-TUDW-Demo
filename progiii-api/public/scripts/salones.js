document.addEventListener('DOMContentLoaded', () => {

    const activosContainer = document.getElementById('salones-activos-container');
    const inactivosContainer = document.getElementById('salones-inactivos-container');
    const filterInput = document.getElementById('filter-input');
    const noResultsMessage = document.getElementById('no-results');
    
    const addModal = document.getElementById('add-modal');
    const openAddModalBtn = document.getElementById('open-add-modal-btn');
    const closeAddModalBtn = document.querySelector('.close-add-modal');
    const addSalonForm = document.getElementById('add-salon-form');

    const detailsModal = document.getElementById('details-modal');
    const closeDetailsModalBtn = document.querySelector('.close-details-modal');
    const salonDetailsView = document.getElementById('salon-details-view');
    const editSalonForm = document.getElementById('edit-salon-form');
    const openEditFormBtn = document.getElementById('open-edit-form-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const deleteSalonBtn = document.getElementById('delete-salon-btn');
    
    let allSalones = []; 
    const API_URL = '/salones';

    // DATOS HARDCODEADOS PARA DEMO (Dirty Fix Re-aplicado)
    const MOCK_SALONES = [
        { salon_id: 1, titulo: 'Principal', direccion: 'San Lorenzo 1000', capacidad: 250, importe: 95000.00, activo: 1, imagen: 'salon1.jpg' },
        { salon_id: 2, titulo: 'Secundario', direccion: 'San Lorenzo 1000', capacidad: 70, importe: 7000.00, activo: 1, imagen: 'salon2.jpg' },
        { salon_id: 3, titulo: 'Cancha Fútbol 5', direccion: 'Alberdi 300', capacidad: 50, importe: 150000.00, activo: 1, imagen: 'salon3.jpg' },
        { salon_id: 4, titulo: 'Maquina de Jugar', direccion: 'Peru 50', capacidad: 100, importe: 95000.00, activo: 1, imagen: 'salon4.jpg' },
        { salon_id: 5, titulo: 'Trampolín Play', direccion: 'Belgrano 100', capacidad: 70, importe: 200000.00, activo: 1, imagen: 'salon5.jpg' },
        { salon_id: 6, titulo: 'Villa Tranquila', direccion: 'los jacarandaes', capacidad: 300, importe: 500000.00, activo: 1, imagen: 'salon6.jpg' }
    ];
    
    function showViewMode() {
        salonDetailsView.style.display = 'block';
        editSalonForm.style.display = 'none';
    }

    function openDetailsModal(salon) {
        document.getElementById('view-titulo').textContent = salon.titulo;
        document.getElementById('view-direccion').textContent = salon.direccion;
        document.getElementById('view-capacidad').textContent = salon.capacidad;
        document.getElementById('view-importe').textContent = `$${parseFloat(salon.importe).toFixed(2)}`;
        
        document.getElementById('edit-id').value = salon.salon_id;
        document.getElementById('edit-titulo').value = salon.titulo;
        document.getElementById('edit-direccion').value = salon.direccion;
        document.getElementById('edit-capacidad').value = salon.capacidad;
        document.getElementById('edit-importe').value = salon.importe;
        
        deleteSalonBtn.dataset.id = salon.salon_id;
        
        if (salon.activo === 0 || salon.activo === false) {
            deleteSalonBtn.textContent = 'Reactivar Salón';
            deleteSalonBtn.className = 'activate-btn';
        } else {
            deleteSalonBtn.textContent = 'Desactivar Salón';
            deleteSalonBtn.className = 'delete-btn';
        }
        
        const permanentDeleteBtn = document.getElementById('permanent-delete-salon-btn');
        if (permanentDeleteBtn) {
            if (salon.activo === 0 || salon.activo === false) {
                permanentDeleteBtn.style.display = 'block';
                permanentDeleteBtn.dataset.id = salon.salon_id;
            } else {
                permanentDeleteBtn.style.display = 'none';
            }
        }

        showViewMode();
        detailsModal.style.display = 'flex';
        detailsModal.classList.add('show');
    }

    function renderSalones(salonesToRender) {
        activosContainer.innerHTML = '';
        inactivosContainer.innerHTML = '';

        if (salonesToRender.length === 0) {
            noResultsMessage.style.display = 'block';
            return;
        }

        noResultsMessage.style.display = 'none';

        const salonesActivos = salonesToRender.filter(s => s.activo === 1 || s.activo === true || s.activo === '1');
        const salonesInactivos = salonesToRender.filter(s => s.activo === 0 || s.activo === false || s.activo === '0' || s.activo === null);

        salonesActivos.forEach(salon => {
            const card = createSalonCard(salon);
            activosContainer.appendChild(card);
        });

        salonesInactivos.forEach(salon => {
            const card = createSalonCard(salon, true);
            inactivosContainer.appendChild(card);
        });
    }

    function createSalonCard(salon, isInactive = false) {
        const card = document.createElement('div');
        card.className = 'salon-card';
        if (isInactive) {
            card.classList.add('salon-inactive');
            card.style.opacity = '0.7';
            card.style.border = '2px solid #dc3545';
        }
        card.dataset.id = salon.salon_id; 

        card.innerHTML = `
            <h3 class="card-title">${salon.titulo}</h3>
            <p class="card-info"><strong>Dirección:</strong> ${salon.direccion}</p>
            <p class="card-info"><strong>Capacidad:</strong> ${salon.capacidad} personas</p>
            <p class="card-info"><strong>Importe:</strong> $${parseFloat(salon.importe).toFixed(2)}</p>
            <p class="card-info"><strong>Estado:</strong> ${isInactive ? '❌ Desactivado' : '✅ Activo'}</p>
            <button class="view-btn" data-id="${salon.salon_id}">Modificar</button>
        `;

        card.querySelector('.view-btn').addEventListener('click', () => openDetailsModal(salon));

        return card;
    }


    async function fetchSalones() {
        // MODO SUCIO: Bypass fetch
        console.log("Forzando carga de datos ficticios en Salones");
        allSalones = MOCK_SALONES;
        renderSalones(allSalones);
    }
    
    openAddModalBtn.addEventListener('click', () => {
        addModal.style.display = 'flex';
        addModal.classList.add('show');
        addSalonForm.reset(); 
    });

    closeAddModalBtn.addEventListener('click', () => {
        addModal.classList.remove('show');
        setTimeout(() => {
            addModal.style.display = 'none';
        }, 300);
    });

    closeDetailsModalBtn.addEventListener('click', () => {
        detailsModal.classList.remove('show');
        setTimeout(() => {
            detailsModal.style.display = 'none';
            showViewMode();
        }, 300);
    });

    window.addEventListener('click', (event) => {
        if (event.target === addModal) {
            addModal.classList.remove('show');
            setTimeout(() => {
                addModal.style.display = 'none';
            }, 300);
        }
        if (event.target === detailsModal) {
            detailsModal.classList.remove('show');
            setTimeout(() => {
                detailsModal.style.display = 'none';
                showViewMode();
            }, 300);
        }
    });
    
    openEditFormBtn.addEventListener('click', () => {
        salonDetailsView.style.display = 'none';
        editSalonForm.style.display = 'block';
    });

    cancelEditBtn.addEventListener('click', showViewMode);
    
    window.filterSalones = function() {
        const filterText = filterInput.value.toLowerCase();
        
        const filteredSalones = allSalones.filter(salon => {
            return salon.titulo.toLowerCase().includes(filterText) || 
                   salon.direccion.toLowerCase().includes(filterText);
        });

        renderSalones(filteredSalones);
    }
    
    addSalonForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Salón creado (Demo)');
        addModal.style.display = 'none';
        allSalones.push({
            salon_id: allSalones.length + 10,
            titulo: document.getElementById('add-titulo').value,
            direccion: document.getElementById('add-direccion').value,
            capacidad: document.getElementById('add-capacidad').value,
            importe: document.getElementById('add-importe').value,
            activo: 1
        });
        renderSalones(allSalones);
    });

    editSalonForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        alert('Salón actualizado (Demo)');
        detailsModal.style.display = 'none'; 
        showViewMode(); 
    });

    deleteSalonBtn.addEventListener('click', async () => {
        alert('Acción simulada (Demo)');
        detailsModal.style.display = 'none'; 
    });

    fetchSalones();
});
