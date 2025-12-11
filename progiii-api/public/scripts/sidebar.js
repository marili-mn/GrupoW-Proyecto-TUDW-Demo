// =============================
// SIDEBAR - NAVEGACIÓN ROBUSTA
// =============================

// MODO DESARROLLO (sin login)
if (!localStorage.getItem('usuario')) {
    localStorage.setItem('usuario', JSON.stringify({
        nombre: 'Usuario Demo',
        tipo_usuario: 3  // Por defecto Admin si no hay nadie
    }));
};

if (window.sidebarInitialized) {
    // Evitar doble inicialización
} else {
    window.sidebarInitialized = true;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebarOnLoad);
    } else {
        initSidebarOnLoad();
    }
}

function initSidebarOnLoad() {
    if (!window.Icons) { setTimeout(initSidebarOnLoad, 100); return; }
    createSidebar();
}

// --- HELPER DE RUTAS ---
function getLink(target) {
    // target ejemplo: 'index.html', 'empleado/reservas.html', 'administrador/index.html'
    const pathname = window.location.pathname;
    
    // Determinar profundidad actual
    // Si estamos en /public/carpeta/archivo.html -> profundidad 1 (desde public)
    // Si estamos en /public/archivo.html -> profundidad 0
    
    const isSubfolder = pathname.includes('/administrador/') || 
                        pathname.includes('/empleado/') || 
                        pathname.includes('/cliente/');
    
    const prefix = isSubfolder ? '../' : '';
    
    return prefix + target;
}

function createSidebar() {
    if (!document.body) { setTimeout(createSidebar, 50); return; }
    if (document.getElementById('main-sidebar')) return;
    
    const userRole = getUserRole(); // 'administrador', 'empleado', 'cliente'
    const currentPage = getCurrentPage();
    
    let sidebarHTML = '';
    if (userRole === 'administrador') sidebarHTML = createAdminSidebar(currentPage);
    else if (userRole === 'empleado') sidebarHTML = createEmployeeSidebar(currentPage);
    else if (userRole === 'cliente') sidebarHTML = createClientSidebar(currentPage);
    else return;
    
    const sidebarDiv = document.createElement('div');
    sidebarDiv.innerHTML = sidebarHTML;
    document.body.insertBefore(sidebarDiv.firstElementChild, document.body.firstChild);
    
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebar-overlay';
    document.body.appendChild(overlay);

    document.body.classList.add('with-sidebar');
    setTimeout(initSidebarEvents, 10);
}

// --- SIDEBARS POR ROL ---

function createAdminSidebar(currentPage) {
    // Admin tiene acceso a TODO en la raíz y su carpeta
    return `
        <aside class="sidebar" id="main-sidebar">
            <div class="sidebar-header">
                <div class="sidebar-logo"><span class="sidebar-icon">🏢</span> Sistema Reservas</div>
                <button class="sidebar-toggle" id="sidebar-toggle">◀</button>
            </div>
            <ul class="sidebar-menu">
                <li><a href="${getLink('index.html')}" class="${currentPage==='index'?'active':''}"><span class="icon">🏠</span> Inicio</a></li>
                
                <li class="header">GESTIÓN PRINCIPAL</li>
                <li><a href="${getLink('administrador/reservas.html')}" class="${currentPage==='reservas'?'active':''}"><span class="icon">📅</span> Reservas</a></li>
                <li><a href="${getLink('usuarios.html')}" class="${currentPage==='usuarios'?'active':''}"><span class="icon">👥</span> Usuarios</a></li>
                <li><a href="${getLink('salones.html')}" class="${currentPage==='salones'?'active':''}"><span class="icon">🏰</span> Salones</a></li>
                
                <li class="header">CONFIGURACIÓN</li>
                <li><a href="${getLink('empleado/servicios.html')}" class="${currentPage==='servicios'?'active':''}"><span class="icon">🎉</span> Servicios</a></li>
                <li><a href="${getLink('empleado/turnos.html')}" class="${currentPage==='turnos'?'active':''}"><span class="icon">⏰</span> Turnos</a></li>
                
                <li class="header">REPORTES</li>
                <li><a href="${getLink('administrador/reportes-reservas.html')}" class="${currentPage.includes('reportes')?'active':''}"><span class="icon">📊</span> Reporte Reservas</a></li>
                <li><a href="${getLink('informes-salones.html')}" class="${currentPage.includes('informes-salones')?'active':''}"><span class="icon">📈</span> Informe Salones</a></li>
                <li><a href="${getLink('informes-usuarios.html')}" class="${currentPage.includes('informes-usuarios')?'active':''}"><span class="icon">📋</span> Informe Usuarios</a></li>
                
                <li class="divider"></li>
                <li><a href="#" id="logout-link"><span class="icon">🚪</span> Cerrar Sesión</a></li>
            </ul>
        </aside>
    `;
}

function createEmployeeSidebar(currentPage) {
    // Empleado usa vistas de /empleado/ y algunas de raíz (como salones lectura)
    return `
        <aside class="sidebar" id="main-sidebar">
            <div class="sidebar-header">
                <div class="sidebar-logo"><span class="sidebar-icon">💼</span> Empleado</div>
                <button class="sidebar-toggle" id="sidebar-toggle">◀</button>
            </div>
            <ul class="sidebar-menu">
                <li><a href="${getLink('index.html')}" class="${currentPage==='index'?'active':''}"><span class="icon">🏠</span> Inicio</a></li>
                
                <li class="header">OPERACIONES</li>
                <li><a href="${getLink('empleado/reservas.html')}" class="${currentPage==='reservas'?'active':''}"><span class="icon">📅</span> Reservas</a></li>
                <li><a href="${getLink('empleado/clientes.html')}" class="${currentPage==='clientes'?'active':''}"><span class="icon">👥</span> Clientes</a></li>
                
                <li class="header">CATÁLOGOS</li>
                <li><a href="${getLink('salones.html')}" class="${currentPage==='salones'?'active':''}"><span class="icon">🏰</span> Salones</a></li>
                <li><a href="${getLink('empleado/servicios.html')}" class="${currentPage==='servicios'?'active':''}"><span class="icon">🎉</span> Servicios</a></li>
                <li><a href="${getLink('empleado/turnos.html')}" class="${currentPage==='turnos'?'active':''}"><span class="icon">⏰</span> Turnos</a></li>
                
                <li class="divider"></li>
                <li><a href="#" id="logout-link"><span class="icon">🚪</span> Cerrar Sesión</a></li>
            </ul>
        </aside>
    `;
}

function createClientSidebar(currentPage) {
    // Cliente usa vistas de /cliente/
    return `
        <aside class="sidebar" id="main-sidebar">
            <div class="sidebar-header">
                <div class="sidebar-logo"><span class="sidebar-icon">👤</span> Mi Cuenta</div>
                <button class="sidebar-toggle" id="sidebar-toggle">◀</button>
            </div>
            <ul class="sidebar-menu">
                <li><a href="${getLink('index.html')}" class="${currentPage==='index'?'active':''}"><span class="icon">🏠</span> Inicio</a></li>
                
                <li class="header">MIS COSAS</li>
                <li><a href="${getLink('cliente/reservas.html')}" class="${currentPage==='reservas'?'active':''}"><span class="icon">📅</span> Mis Reservas</a></li>
                <li><a href="${getLink('cliente/nueva-reserva.html')}" class="${currentPage==='nueva-reserva'?'active':''}"><span class="icon">➕</span> Nueva Reserva</a></li>
                
                <li class="header">EXPLORAR</li>
                <li><a href="${getLink('cliente/salones-view.html')}" class="${currentPage==='salones-view'?'active':''}"><span class="icon">🏰</span> Ver Salones</a></li>
                <li><a href="${getLink('cliente/servicios-view.html')}" class="${currentPage==='servicios-view'?'active':''}"><span class="icon">🎉</span> Ver Servicios</a></li>
                <li><a href="${getLink('cliente/turnos-view.html')}" class="${currentPage==='turnos-view'?'active':''}"><span class="icon">⏰</span> Ver Horarios</a></li>
                
                <li class="divider"></li>
                <li><a href="#" id="logout-link"><span class="icon">🚪</span> Cerrar Sesión</a></li>
            </ul>
        </aside>
    `;
}

// --- UTILIDADES ---

function getUserRole() {
    try {
        const u = JSON.parse(localStorage.getItem('usuario'));
        if (!u) return null;
        if (u.tipo_usuario === 1) return 'cliente';
        if (u.tipo_usuario === 2) return 'empleado';
        if (u.tipo_usuario === 3) return 'administrador';
    } catch(e) { return null; }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('nueva-reserva')) return 'nueva-reserva';
    if (path.includes('reportes')) return 'reportes';
    if (path.includes('reservas')) return 'reservas';
    if (path.includes('salones')) return 'salones';
    if (path.includes('usuarios')) return 'usuarios';
    if (path.includes('clientes')) return 'clientes';
    if (path.includes('servicios')) return 'servicios';
    if (path.includes('turnos')) return 'turnos';
    if (path.includes('informes')) return 'informes-salones'; // Default info
    return 'index';
}

function initSidebarEvents() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const body = document.body;
    
    if (toggle) {
        toggle.addEventListener('click', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.toggle('collapsed');
                body.classList.toggle('sidebar-collapsed');
            } else {
                sidebar.classList.toggle('mobile-open');
                overlay.classList.toggle('active');
            }
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
        });
    }
    
    const logout = document.getElementById('logout-link');
    if (logout) {
        logout.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.auth) window.auth.logout();
            else {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                window.location.href = getLink('login.html');
            }
        });
    }
}