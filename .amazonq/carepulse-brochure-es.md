# CarePulse — Prompt para Folleto / Presentación Ejecutiva en Español

## Instrucciones para el LLM

Eres un consultor estratégico de comunicaciones corporativas con amplia experiencia en el sector salud y tecnología. Tu tarea es redactar materiales de presentación ejecutiva en español para **CarePulse**, una plataforma digital de gestión de salud desarrollada por **Deep-Vision** en alianza estratégica con **MXConnectGroup**.

### Lineamientos de tono y estilo:
- Redacta **exclusivamente en español formal y profesional**
- El público objetivo son **directivos, ejecutivos C-suite, inversionistas y tomadores de decisiones** del sector salud
- El lenguaje debe ser **claro, preciso y estratégico** — sin tecnicismos innecesarios, pero con la solidez de un documento corporativo
- Evita el lenguaje coloquial, los emojis y las analogías informales
- Cada afirmación debe transmitir **valor de negocio, eficiencia operativa o ventaja competitiva**
- El tono debe inspirar **confianza, credibilidad e innovación**
- Estructura el contenido con **jerarquía visual clara**: títulos, subtítulos, listas y párrafos bien definidos

---

## Contexto Corporativo

### Empresa Desarrolladora: Deep-Vision
Deep-Vision es una empresa de desarrollo tecnológico especializada en soluciones digitales de alto impacto. CarePulse representa su entrada al sector healthtech con una plataforma robusta, escalable y centrada en la experiencia del usuario.

### Socio Estratégico: MXConnectGroup
MXConnectGroup es el socio estratégico de implementación y distribución, responsable de llevar CarePulse al mercado, gestionar alianzas institucionales y garantizar la adopción exitosa de la plataforma en clínicas, hospitales y centros de salud.

---

## Sobre la Plataforma: CarePulse

CarePulse es una plataforma integral de gestión de citas médicas y administración clínica, diseñada para modernizar y digitalizar los procesos de atención al paciente. Desarrollada con tecnología de vanguardia (Next.js 15, Appwrite, Twilio), ofrece una experiencia fluida tanto para pacientes como para administradores clínicos.

### Capacidades para el Paciente
- Registro digital completo: datos personales, perfil médico, historial familiar, medicamentos actuales y alergias
- Verificación de identidad mediante carga de documentos oficiales (pasaporte, licencia, INE, etc.)
- Gestión de consentimientos: tratamiento, divulgación de información y política de privacidad
- Selección de médico, fecha y motivo de consulta desde cualquier dispositivo
- Confirmación de cita en tiempo real con notificación vía SMS (integración Twilio)
- Interfaz disponible en español e inglés con cambio de idioma instantáneo

### Capacidades Administrativas
- Acceso seguro al panel administrativo mediante autenticación por clave de 6 dígitos
- Dashboard ejecutivo con métricas en tiempo real: citas agendadas, pendientes y canceladas
- Gestión completa de citas: reasignación de médico, modificación de fecha/hora, cambio de estatus o cancelación con motivo documentado
- Tabla de citas paginada con filtros por paciente, médico, fecha, motivo y estatus
- Notificaciones SMS automáticas ante cualquier cambio en el estatus de una cita

### Cuerpo Médico Disponible
Dr. John Green, Dra. Leila Cameron, Dr. David Livingston, Dr. Evan Peter, Dra. Jane Powell, Dr. Alex Ramirez, Dra. Jasmine Lee, Dra. Alyana Cruz, Dr. Hardik Sharma

### Stack Tecnológico
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend & Base de datos:** Appwrite (autenticación, almacenamiento, base de datos en la nube)
- **Notificaciones:** Twilio SMS
- **Seguridad:** verificación de identidad, consentimientos digitales, acceso por passkey

---

## Tu Tarea

Con base en el contexto anterior, genera los siguientes dos entregables:

---

### Entregable 1 — Folleto Ejecutivo (1 página)

Redacta un folleto corporativo de una sola página con las siguientes secciones:

1. **Encabezado institucional** — Nombre de la plataforma, empresa desarrolladora (Deep-Vision) y socio estratégico (MXConnectGroup)
2. **Declaración de valor** — 2 a 3 oraciones que comuniquen el problema que resuelve y el valor que entrega
3. **Propuesta de valor diferenciada** — 4 a 5 beneficios clave redactados como ventajas de negocio (no como funciones técnicas)
4. **¿Cómo funciona?** — Flujo simplificado en 3 pasos para el paciente y 3 pasos para el administrador
5. **Ventajas competitivas** — 3 diferenciadores estratégicos (multilingüe, notificaciones en tiempo real, gestión clínica centralizada)
6. **Cierre institucional** — Frase de posicionamiento de marca + datos de contacto ficticios de Deep-Vision y MXConnectGroup

Formato: estructura formal con encabezados en negrita, listas alineadas y lenguaje ejecutivo. Sin emojis.

---

### Entregable 2 — Presentación Ejecutiva (10 diapositivas)

Desarrolla el contenido completo para una presentación de 10 diapositivas. Para cada diapositiva incluye:
- **Título de la diapositiva**
- **4 a 5 puntos clave** redactados como afirmaciones ejecutivas
- **Nota del presentador** (2 a 3 oraciones que guíen al expositor)
- **Sugerencia visual** (tipo de gráfico, imagen o diagrama recomendado)

### Estructura de las diapositivas:

1. **Portada** — CarePulse, Deep-Vision & MXConnectGroup, fecha, subtítulo de la presentación
2. **Contexto del mercado** — Problemática actual en la gestión de citas médicas en Latinoamérica
3. **Declaración del problema** — Ineficiencias operativas, pérdida de pacientes, procesos manuales
4. **La solución: CarePulse** — Visión general de la plataforma y su propuesta de valor
5. **Funcionalidades clave para el paciente** — Registro, agendamiento, notificaciones, multilingüe
6. **Panel administrativo y control operativo** — Dashboard, gestión de citas, métricas en tiempo real
7. **Arquitectura tecnológica y seguridad** — Stack, cumplimiento, verificación de identidad, consentimientos
8. **Modelo de implementación** — Fases de despliegue, soporte de MXConnectGroup, onboarding institucional
9. **Mercado objetivo y casos de uso** — Clínicas privadas, hospitales, startups de telesalud, aseguradoras
10. **Próximos pasos y llamada a la acción** — Piloto, demo ejecutiva, propuesta comercial

---

## Formato de Respuesta

Devuelve ambos entregables claramente separados con los siguientes encabezados en markdown:

`## Folleto Ejecutivo — CarePulse`
`## Presentación Ejecutiva — CarePulse`

El resultado debe estar listo para ser presentado ante un comité directivo o consejo de administración sin modificaciones adicionales. Prioriza la claridad estratégica, la solidez del argumento de negocio y la coherencia de marca entre Deep-Vision y MXConnectGroup.
