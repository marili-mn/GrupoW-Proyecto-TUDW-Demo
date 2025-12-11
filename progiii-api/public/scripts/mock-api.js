
// ============================================
// MOCK API - Backend Simulado (Datos SQL Reales)
// ============================================

(function() {
    console.log("%c⚠️ MOCK API ACTIVADO: Backend Simulado en Memoria", "background: #000; color: #0f0; font-size: 14px; padding: 5px; border-radius: 4px;");

    // --- 1. DATOS (Estructura idéntica al SQL) ---

    const DB = {
        usuarios: [
            { usuario_id: 1, nombre: 'Alberto', apellido: 'López', nombre_usuario: 'alblop@correo.com', contrasenia: '123456', tipo_usuario: 3, celular: null, foto: null, activo: 0 },
            { usuario_id: 2, nombre: 'Pamela', apellido: 'Gómez', nombre_usuario: 'pamgom@correo.com', contrasenia: '123456', tipo_usuario: 3, celular: null, foto: null, activo: 1 },
            { usuario_id: 3, nombre: 'Esteban', apellido: 'Ciro', nombre_usuario: 'estcir@correo.com', contrasenia: '123456', tipo_usuario: 3, celular: null, foto: null, activo: 1 },
            { usuario_id: 4, nombre: 'Oscar', apellido: 'Ramirez', nombre_usuario: 'oscram@correo.com', contrasenia: '123456', tipo_usuario: 1, celular: null, foto: null, activo: 1 },
            { usuario_id: 5, nombre: 'Claudia', apellido: 'Juárez', nombre_usuario: 'clajua@correo.com', contrasenia: '123456', tipo_usuario: 1, celular: null, foto: null, activo: 0 },
            { usuario_id: 6, nombre: 'William', apellido: 'Corbalán', nombre_usuario: 'wilcor@correo.com', contrasenia: '123456', tipo_usuario: 2, celular: null, foto: null, activo: 1 },
            { usuario_id: 7, nombre: 'Anahí', apellido: 'Flores', nombre_usuario: 'anaflo@correo.com', contrasenia: '123456', tipo_usuario: 2, celular: null, foto: null, activo: 1 },
            { usuario_id: 8, nombre: 'Javier', apellido: 'Acosta', nombre_usuario: 'profesorjaviertecnologia@gmail.com', contrasenia: '123456', tipo_usuario: 1, celular: null, foto: null, activo: 1 }
        ],
        salones: [
            { salon_id: 1, titulo: 'Principal', direccion: 'San Lorenzo 1000', capacidad: 250, importe: 95000.00, activo: 1, imagen: 'salon1.jpg' },
            { salon_id: 2, titulo: 'Secundario', direccion: 'San Lorenzo 1000', capacidad: 70, importe: 7000.00, activo: 1, imagen: 'salon2.jpg' },
            { salon_id: 3, titulo: 'Cancha Fútbol 5', direccion: 'Alberdi 300', capacidad: 50, importe: 150000.00, activo: 1, imagen: 'salon3.jpg' },
            { salon_id: 4, titulo: 'Maquina de Jugar', direccion: 'Peru 50', capacidad: 100, importe: 95000.00, activo: 1, imagen: 'salon4.jpg' },
            { salon_id: 5, titulo: 'Trampolín Play', direccion: 'Belgrano 100', capacidad: 70, importe: 200000.00, activo: 1, imagen: 'salon5.jpg' },
            { salon_id: 6, titulo: 'Villa Tranquila', direccion: 'los jacarandaes', capacidad: 300, importe: 500000.00, activo: 1, imagen: 'salon6.jpg' }
        ],
        servicios: [
            { servicio_id: 1, descripcion: 'Sonido', importe: 150400.00, activo: 1 },
            { servicio_id: 2, descripcion: 'Mesa dulce', importe: 25000.00, activo: 1 },
            { servicio_id: 3, descripcion: 'Tarjetas de invitación', importe: 5000.00, activo: 1 },
            { servicio_id: 4, descripcion: 'Mozos', importe: 15000.00, activo: 1 },
            { servicio_id: 5, descripcion: 'Sala de video juegos', importe: 15000.00, activo: 1 },
            { servicio_id: 6, descripcion: 'Mago', importe: 25000.00, activo: 1 },
            { servicio_id: 7, descripcion: 'Cabezones', importe: 80000.00, activo: 1 },
            { servicio_id: 8, descripcion: 'Maquillaje infantil', importe: 1000.00, activo: 1 },
            { servicio_id: 9, descripcion: 'DJ', importe: 23000.00, activo: 1 }
        ],
        turnos: [
            { turno_id: 1, orden: 1, hora_desde: '12:00:00', hora_hasta: '14:00:00', activo: 1 },
            { turno_id: 2, orden: 2, hora_desde: '14:00:00', hora_hasta: '17:00:00', activo: 1 },
            { turno_id: 3, orden: 7, hora_desde: '18:00:00', hora_hasta: '20:00:00', activo: 0 },
            { turno_id: 4, orden: 4, hora_desde: '20:05:00', hora_hasta: '23:08:00', activo: 1 }
        ],
        reservas: [
            { reserva_id: 1, fecha_reserva: '2025-10-08', salon_id: 1, usuario_id: 1, turno_id: 1, tematica: 'Plim plim', importe_total: 200000.00, activo: 1, estado: 'pendiente' },
            { reserva_id: 2, fecha_reserva: '2025-10-08', salon_id: 2, usuario_id: 1, turno_id: 1, tematica: 'Messi', importe_total: 100000.00, activo: 1, estado: 'pendiente' },
            { reserva_id: 3, fecha_reserva: '2025-10-08', salon_id: 2, usuario_id: 2, turno_id: 1, tematica: 'Palermo', importe_total: 500000.00, activo: 1, estado: 'pendiente' },
            { reserva_id: 4, fecha_reserva: '2025-11-13', salon_id: 2, usuario_id: 4, turno_id: 1, tematica: null, importe_total: 7000.00, activo: 0, estado: 'cancelada' }
        ],
        notificaciones: [
             { id: 1, usuario_id: 4, tipo: 'reserva_creada', titulo: 'Reserva Creada', mensaje: 'Su reserva ha sido creada.', leida: 0, fecha_creacion: '2025-11-01 18:56:53' },
             { id: 2, usuario_id: 2, tipo: 'nueva_reserva', titulo: 'Nueva Reserva', mensaje: 'Nueva reserva de Oscar Ramirez.', leida: 0, fecha_creacion: '2025-11-01 18:56:53' }
        ]
    };

    // --- HELPER: ENRIQUECER RESERVAS ---
    // Simula el JOIN que hace el backend para entregar datos completos al frontend
    const getReservasEnriquecidas = (userId = null) => {
        let lista = DB.reservas;
        if (userId) {
            lista = lista.filter(r => r.usuario_id === userId);
        }

        return lista.map(r => {
            const salon = DB.salones.find(s => s.salon_id === r.salon_id) || {};
            const usuario = DB.usuarios.find(u => u.usuario_id === r.usuario_id) || {};
            const turno = DB.turnos.find(t => t.turno_id === r.turno_id) || {};
            
            // Estructura plana que espera el frontend a veces, o anidada
            return {
                ...r,
                salon_titulo: salon.titulo || 'Desconocido',
                salon_direccion: salon.direccion || '',
                usuario_nombre: usuario.nombre || '',
                usuario_apellido: usuario.apellido || '',
                cliente_nombre: usuario.nombre || '',      // Alias para algunos scripts
                cliente_apellido: usuario.apellido || '', // Alias
                nombre_usuario: usuario.nombre_usuario || '',
                hora_desde: turno.hora_desde || '',
                hora_hasta: turno.hora_hasta || '',
                // Servicios simulados (array de strings o objetos, según script)
                servicios: "Sonido ($150400), Mesa dulce ($25000)" 
            };
        });
    };

    // --- 2. FETCH INTERCEPTOR ---

    const originalFetch = window.fetch;

    window.fetch = async function(url, options = {}) {
        const urlStr = url.toString();
        
        // Dejar pasar si no es API local
        if (!urlStr.includes('localhost') && !urlStr.includes('/api/')) {
            return originalFetch(url, options);
        }

        console.log(`📡 Mock API Request: ${options.method || 'GET'} ${urlStr}`);
        
        // Latencia artificial
        await new Promise(r => setTimeout(r, 200));

        let response = { success: false, message: 'Ruta mock no encontrada' };
        let status = 404;

        try {
            // === AUTH ===
            if (urlStr.includes('/auth/login')) {
                const body = JSON.parse(options.body);
                // Buscar por usuario OR email
                const user = DB.usuarios.find(u => 
                    u.nombre_usuario === body.nombre_usuario || 
                    u.nombre_usuario.split('@')[0] === body.nombre_usuario // Permitir login sin @dominio
                );
                
                if (user && user.activo === 1) {
                    status = 200;
                    response = { success: true, data: { token: 'mock-token-123', usuario: user } };
                } else {
                    status = 401;
                    response = { success: false, message: 'Credenciales inválidas o usuario inactivo' };
                }
            }
            
            // === SALONES ===
            else if (urlStr.includes('/salones')) {
                // GET
                if (!options.method || options.method === 'GET') {
                    status = 200;
                    // Algunos scripts esperan array directo, otros {data: []}. Enviamos {success, data} que es lo estándar de tu app.
                    // PERO, si el script falla, puede que espere el array directo dentro de data.
                    response = { success: true, data: DB.salones };
                }
            }

            // === SERVICIOS ===
            else if (urlStr.includes('/servicios')) {
                 if (!options.method || options.method === 'GET') {
                    status = 200;
                    response = { success: true, data: DB.servicios };
                 }
            }

            // === TURNOS ===
            else if (urlStr.includes('/turnos')) {
                 if (!options.method || options.method === 'GET') {
                    status = 200;
                    response = { success: true, data: DB.turnos };
                 }
            }

            // === RESERVAS ===
            else if (urlStr.includes('/reservas')) {
                // GET Mis Reservas (Cliente)
                if (urlStr.includes('/mis-reservas')) {
                    const currentUser = JSON.parse(localStorage.getItem('usuario') || '{}');
                    const data = getReservasEnriquecidas(currentUser.usuario_id);
                    status = 200;
                    response = { success: true, data: data };
                }
                // GET Todas (Admin / Empleado)
                else if (!options.method || options.method === 'GET') {
                    const data = getReservasEnriquecidas(null); // Todas
                    status = 200;
                    response = { success: true, data: data };
                }
                // POST (Crear)
                else if (options.method === 'POST') {
                    const body = JSON.parse(options.body);
                    const newId = DB.reservas.length + 100;
                    const newReserva = {
                        reserva_id: newId,
                        ...body,
                        activo: 1,
                        estado: 'pendiente',
                        fecha_reserva: body.fecha_reserva || new Date().toISOString().split('T')[0]
                    };
                    DB.reservas.push(newReserva);
                    status = 201;
                    response = { success: true, message: 'Reserva creada con éxito', data: newReserva };
                }
                // DELETE / Cancelar
                else if (options.method === 'DELETE') {
                    // Extraer ID de la URL
                    const parts = urlStr.split('/');
                    const id = parseInt(parts[parts.length - 1]);
                    const res = DB.reservas.find(r => r.reserva_id === id);
                    if (res) {
                        res.activo = 0;
                        res.estado = 'cancelada';
                        status = 200;
                        response = { success: true, message: 'Reserva cancelada' };
                    }
                }
                // PUT / Editar
                else if (options.method === 'PUT') {
                     status = 200;
                     response = { success: true, message: 'Reserva actualizada' };
                }
            }

            // === USUARIOS ===
            else if (urlStr.includes('/usuarios')) {
                if (!options.method || options.method === 'GET') {
                    status = 200;
                    response = { success: true, data: DB.usuarios };
                }
            }
             // === NOTIFICACIONES ===
             else if (urlStr.includes('/notificaciones')) {
                status = 200;
                response = { success: true, data: DB.notificaciones };
            }

            // Fallback genérico para estadísticas y reportes
            else {
                status = 200;
                response = { success: true, data: [] };
            }

        } catch (e) {
            console.error("Mock Server Error:", e);
            status = 500;
            response = { success: false, error: e.message };
        }

        return new Response(JSON.stringify(response), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    };

    // --- 3. UI LOGIN HELPER ---
    if (window.location.pathname.includes('login.html')) {
        window.addEventListener('load', () => {
            const div = document.createElement('div');
            div.style.cssText = "position:fixed; bottom:20px; right:20px; background:white; padding:15px; border-radius:10px; box-shadow:0 0 20px rgba(0,0,0,0.2); z-index:9999; font-family:sans-serif; border:1px solid #ddd; width: 220px;";
            div.innerHTML = `
                <h4 style="margin:0 0 10px; color:#333; font-size:14px; border-bottom:1px solid #eee; padding-bottom:5px;">🧪 Credenciales (SQL)</h4>
                
                <div style="margin-bottom:8px;">
                    <div style="font-weight:bold; font-size:12px; color:#555;">ADMINISTRADOR</div>
                    <button onclick="mockLogin('pamgom@correo.com')" style="width:100%; padding:5px; background:#e3f2fd; border:1px solid #bbdefb; border-radius:4px; cursor:pointer; text-align:left; font-size:11px;">Pamela (pamgom@correo.com)</button>
                </div>

                <div style="margin-bottom:8px;">
                    <div style="font-weight:bold; font-size:12px; color:#555;">EMPLEADO</div>
                    <button onclick="mockLogin('wilcor@correo.com')" style="width:100%; padding:5px; background:#e8f5e9; border:1px solid #c8e6c9; border-radius:4px; cursor:pointer; text-align:left; font-size:11px;">William (wilcor@correo.com)</button>
                </div>

                <div>
                    <div style="font-weight:bold; font-size:12px; color:#555;">CLIENTE</div>
                    <button onclick="mockLogin('oscram@correo.com')" style="width:100%; padding:5px; background:#fff3e0; border:1px solid #ffe0b2; border-radius:4px; cursor:pointer; text-align:left; font-size:11px;">Oscar (oscram@correo.com)</button>
                </div>
            `;
            document.body.appendChild(div);

            window.mockLogin = (u) => {
                const userIn = document.getElementById('nombre_usuario');
                const passIn = document.getElementById('contrasenia');
                const btn = document.getElementById('login-btn');
                
                if(userIn && passIn) {
                    userIn.value = u;
                    passIn.value = '123456';
                    userIn.dispatchEvent(new Event('input')); // Trigger events if any
                    btn.click();
                }
            };
        });
    }

})();
