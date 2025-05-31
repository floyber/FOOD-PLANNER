// --- Funciones de Utilidad ---

// Función para mostrar notificaciones (Puedes mejorar esto visualmente con CSS y HTML)
function mostrarNotificacion(titulo, mensaje, tipo = "error") {
    console.log(`[Notificación ${tipo.toUpperCase()}] ${titulo}: ${mensaje}`);
    // Usamos alert para una demostración sencilla.
    // Para una mejor UX, considera usar una librería como Toastify o SweetAlert,
    // o implementar un div de notificación personalizado en tu HTML.
    alert(`${titulo}\n${mensaje}`);
}

// Función para validar la complejidad de la contraseña
function validatePassword(password) {
    // La contraseña debe tener al menos 8 caracteres,
    // una mayúscula, una minúscula, un número y un símbolo.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|:;"'<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}\[\]|:;"'<>,.?/~`-]{8,}$/;
    return regex.test(password);
}

// --- API Endpoints ---
const REGISTRO_API_URL = "http://localhost:3000/api/Usuario"; // Endpoint para registro
const LOGIN_API_URL = "http://localhost:3000/api/login";     // Endpoint para login

// --- Registro Handler (Frontend) ---
// Apunta al formulario de registro usando su ID 'registroForm'
const formRegistro = document.getElementById("registroForm");
const registroExitosoDiv = document.getElementById("registroExitoso"); // El div de mensaje de éxito

if (formRegistro) {
    formRegistro.addEventListener("submit", async function (e) {
        e.preventDefault(); // Evita el envío tradicional del formulario

        // Captura los valores de los campos del formulario usando sus IDs
        const nombre_completo = document.getElementById('nombre').value;
        const correo_electronico = document.getElementById('email').value;
        const contraseña = document.getElementById('password').value;
        const repeat_contraseña = document.getElementById('confirmPassword').value;
        const terminosAceptados = document.getElementById('terminos').checked;

        // Oculta mensajes de error previos y el mensaje de éxito
        document.getElementById('nombreError').style.display = 'none';
        document.getElementById('emailError').style.display = 'none';
        document.getElementById('passwordError').style.display = 'none';
        document.getElementById('confirmPasswordError').style.display = 'none';
        document.getElementById('terminosError').style.display = 'none';
        if (registroExitosoDiv) registroExitosoDiv.style.display = 'none';


        // Validaciones del lado del cliente y muestra mensajes de error específicos
        let isValid = true;

        if (!nombre_completo) {
            document.getElementById('nombreError').style.display = 'block';
            isValid = false;
        }
        if (!correo_electronico || !correo_electronico.includes('@')) { // Validación básica de email
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }
        if (!validatePassword(contraseña)) {
            document.getElementById('passwordError').style.display = 'block';
            isValid = false;
        }
        if (contraseña !== repeat_contraseña) {
            document.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
        }
        if (!terminosAceptados) {
            document.getElementById('terminosError').style.display = 'block';
            isValid = false;
        }

        if (!isValid) {
            mostrarNotificacion("¡Error de validación!", "Por favor corrige los errores en el formulario.");
            return;
        }

        try {
            // Envía la solicitud de registro al backend
            const response = await fetch(REGISTRO_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Envía los datos con los nombres de campo que espera tu backend
                    nombre_completo: nombre_completo,
                    correo_electronico: correo_electronico,
                    contraseña: contraseña // El backend espera 'contraseña'
                }),
            });

            // Manejo de la respuesta del servidor
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Error desconocido en el registro.");
                } else {
                    const errorText = await response.text();
                    throw new Error("Respuesta inesperada del servidor: " + errorText.substring(0, 200) + "...");
                }
            }

            // Si la respuesta es OK
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                mostrarNotificacion("¡Registro exitoso!", data.message || "Tu cuenta ha sido creada correctamente.", "success");
                formRegistro.reset(); // Limpia el formulario
                if (registroExitosoDiv) registroExitosoDiv.style.display = 'block'; // Muestra el mensaje de éxito

                // Redirige al usuario al inicio de sesión después de un pequeño delay
                setTimeout(() => {
                    window.location.href = "INICIOindex.html"; // Redirige a la página de login
                }, 2000); // 2 segundos de delay

            } else {
                mostrarNotificacion("¡Registro exitoso!", "Registro completado, pero la respuesta del servidor no fue JSON esperada.", "warning");
                formRegistro.reset();
                if (registroExitosoDiv) registroExitosoDiv.style.display = 'block';
                setTimeout(() => {
                    window.location.href = "INICIOindex.html";
                }, 2000);
            }

        } catch (error) {
            mostrarNotificacion("¡Error de registro!", error.message);
        }
    });
}

// --- Login Handler (Frontend) ---
// Tu HTML de login no fue proporcionado, así que asumo el ID 'form-iniciar-sesion'
// y campos 'email' y 'password' como en el ejemplo anterior.
const formLogin = document.getElementById("form-iniciar-sesion");

if (formLogin) {
    formLogin.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Captura los valores de los campos del formulario de login usando IDs
        const correo_electronico = document.getElementById('loginEmail').value; // Asegúrate de que el ID sea 'loginEmail' en tu HTML de login
        const contraseña = document.getElementById('loginPassword').value; // Asegúrate de que el ID sea 'loginPassword'

        if (!correo_electronico || !contraseña) {
            mostrarNotificacion("¡Error de inicio de sesión!", "Email y contraseña son obligatorios.");
            return;
        }

        try {
            const response = await fetch(LOGIN_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo_electronico: correo_electronico,
                    contraseña: contraseña
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error desconocido en el inicio de sesión.");
            }

            const data = await response.json();
            mostrarNotificacion("¡Inicio de sesión exitoso!", data.message || "Bienvenido/a.", "success");
            formLogin.reset();

            setTimeout(() => {
                window.location.href = "cuenta.html"; // Redirige a la página de cuenta después del login
            }, 1500);

        } catch (error) {
            mostrarNotificacion("¡Error de inicio de sesión!", error.message);
        }
    });
}