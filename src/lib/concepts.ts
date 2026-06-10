/* =========================================================================
   Cápsula · Fundamentos de IA en simple
   Contenido didáctico. Cada concepto se explica en 4 partes:
     que = Qué es · img = Imagínalo así · ej = Ejemplo · imp = Por qué te importa
   Fuente: material formativo «Fundamentos de IA para profesionales».
   ========================================================================= */

export interface Concept {
  k: string          // nombre del concepto
  tag?: string       // etiqueta corta opcional (chip)
  que: string
  img: string
  ej: string
  imp: string
}

/* ----------------------------- 1 · LOS CIMIENTOS ---------------------------
   Muñecas rusas: IA ⊃ ML ⊃ DL → produce un Modelo. */
export interface Foundation extends Concept { lvl: number; short: string }
export const FOUNDATIONS: Foundation[] = [
  {
    lvl: 1, k: 'Inteligencia artificial', tag: 'El paraguas',
    short: 'Cualquier sistema que hace tareas que asociamos con la inteligencia humana.',
    que: 'El campo más amplio: cualquier sistema de computadora que realiza tareas que normalmente asociamos con la inteligencia humana —entender lenguaje, reconocer una cara o tomar una decisión.',
    img: 'La categoría «transporte»: abarca desde una bicicleta hasta un avión, todo lo que sirve para moverte.',
    ej: 'Le pides en voz alta a tu teléfono que ponga una alarma y te entiende.',
    imp: 'Es el paraguas que da nombre a todo lo demás: define de qué estamos hablando.',
  },
  {
    lvl: 2, k: 'Machine learning', tag: 'Aprende de ejemplos',
    short: 'En vez de reglas a mano, descubre patrones observando muchos ejemplos.',
    que: 'Vive dentro de la IA: en lugar de programar reglas a mano, la computadora descubre sola los patrones observando muchos ejemplos.',
    img: 'Enseñar a un niño a reconocer perros mostrándole fotos, en vez de darle reglas sobre orejas y colas.',
    ej: 'El filtro de spam que aprende a separar la basura observando miles de correos que la gente marcó.',
    imp: 'Permite que un sistema mejore a partir de datos sin que alguien reescriba el programa cada vez.',
  },
  {
    lvl: 3, k: 'Deep learning', tag: 'Redes profundas',
    short: 'Redes neuronales con muchas capas para patrones muy complejos.',
    que: 'Un tipo de machine learning que usa redes neuronales con muchas capas apiladas (de ahí «profundo») para aprender patrones muy complejos.',
    img: 'Una línea de montaje con muchas estaciones: cada capa refina lo que recibe de la anterior hasta entender la imagen completa.',
    ej: 'El desbloqueo facial que reconoce tu rostro entre miles de caras posibles.',
    imp: 'Es la tecnología detrás de los avances más llamativos de hoy: asistentes que redactan o generan imágenes.',
  },
  {
    lvl: 4, k: 'El modelo', tag: 'El cerebro entrenado',
    short: 'El resultado del aprendizaje, listo para hacer la tarea.',
    que: 'El resultado concreto del aprendizaje: los patrones que la computadora dejó guardados después de estudiar todos los ejemplos. El «cerebro entrenado» que luego usas.',
    img: 'La receta final que un cocinero escribió después de probar mil veces: lista para repetir el plato.',
    ej: 'Una app traductora te devuelve la frase en inglés al instante: usa un modelo ya entrenado.',
    imp: 'Es el producto que de verdad usas; sin un modelo entrenado, todo lo anterior se queda en teoría.',
  },
]

/* ------------------------ 2 · CÓMO HABLAN LOS MODELOS ----------------------- */
export const LANGUAGE: Concept[] = [
  {
    k: 'LLM', tag: 'Modelo grande de lenguaje',
    que: 'Un programa entrenado con enormes cantidades de texto que genera lenguaje calculando, palabra por palabra, cuál es la continuación más probable.',
    img: 'Un colega que leyó casi toda una biblioteca y, por costumbre, sabe qué palabra suele venir después de otra.',
    ej: 'Le pides «redacta un correo cordial para reprogramar una reunión» y lo devuelve completo en segundos.',
    imp: 'Es la base de los asistentes que usas a diario (ChatGPT, Gemini, Claude).',
  },
  {
    k: 'Prompt', tag: 'Tu pedido',
    que: 'La instrucción o pregunta que tú le escribes al modelo para que haga algo. Tu pedido expresado en palabras.',
    img: 'El encargo que le das a un asistente: mientras más claro lo expreses, mejor será lo que recibes.',
    ej: '«Resume este contrato en 5 puntos para alguien sin formación legal».',
    imp: 'La calidad de la respuesta depende directamente de qué tan claro y completo sea tu pedido.',
  },
  {
    k: 'Contexto', tag: 'Lo que tiene a la vista',
    que: 'Toda la información que el modelo tiene presente para responderte: tu pedido, los documentos que pegaste y los mensajes previos del chat.',
    img: 'Poner al tanto a alguien antes de pedirle ayuda, como cuando le cuentas los antecedentes a un abogado nuevo.',
    ej: 'Pegas un acta y luego preguntas «¿qué acuerdos quedaron pendientes?»: esa acta es el contexto.',
    imp: 'Sin el contexto adecuado el modelo responde a ciegas: darle la información correcta es clave.',
  },
  {
    k: 'Tokens', tag: 'Pedacitos de texto',
    que: 'Los pedacitos en que el modelo divide el texto: una palabra corta entera o solo un trozo de una larga.',
    img: 'Separar una palabra en partes pronunciables antes de leerla en voz alta.',
    ej: '«incomprensible» se parte en varios tokens (in-com-pren-sible); «sol» suele ser uno solo.',
    imp: 'Los servicios de IA miden su límite y su costo por tokens: afectan cuánto pagas y cuánto texto procesas.',
  },
  {
    k: 'Tokenización', tag: 'El primer paso',
    que: 'El proceso de cortar tu texto en esos pedacitos (tokens) antes de que el modelo lo procese.',
    img: 'Picar los ingredientes en trozos antes de empezar a cocinar.',
    ej: 'Envías un párrafo: el sistema lo divide en decenas de tokens y recién entonces empieza a trabajar.',
    imp: 'Es el paso invisible que convierte tu texto en algo manejable y define cuántos tokens consume tu mensaje.',
  },
  {
    k: 'Ventana de contexto', tag: 'El escritorio',
    que: 'La cantidad máxima de información (en tokens) que el modelo puede tener en cuenta a la vez. Si te pasas, deja fuera lo más antiguo.',
    img: 'Un escritorio de tamaño fijo: solo caben ciertos papeles; si pones uno nuevo, otro se cae.',
    ej: 'Pegas un manual de 500 páginas pero la ventana alcanza para 100: el resto no se toma en cuenta.',
    imp: 'Define cuánto material le das de una vez; con documentos largos conviene resumir o ir por partes.',
  },
]

/* ------------------------ 3 · LO QUE PUEDEN HACER HOY ----------------------- */
export interface TodayCard extends Concept { icon: string; warn?: boolean }
export const TODAY: TodayCard[] = [
  {
    icon: '◐', k: 'Multimodalidad', tag: 'Texto · imagen · audio · video',
    que: 'Recibir y combinar varios tipos de información: texto, imágenes, audio y a veces video. No se limita a leer palabras escritas.',
    img: 'Un asistente que además de leer tu correo, mira la foto adjunta y escucha la nota de voz que le mandaste.',
    ej: 'Le envías la foto de un recibo y preguntas cuánto suma: lee la imagen y te devuelve el total.',
    imp: 'Trabajas con la información tal como llega —fotos, audios, documentos— sin transcribir todo a texto primero.',
  },
  {
    icon: '◇', k: 'Razonamiento', tag: 'Piensa por pasos',
    que: 'Antes de la respuesta final, el modelo descompone el problema y lo resuelve por pasos en lugar de contestar de golpe.',
    img: 'Un contador que anota los pasos en una hoja borrador y recién al final te da el resultado.',
    ej: 'Repartir S/ 12,000 entre tres áreas con porcentajes distintos: calcula cada parte y luego entrega el reparto.',
    imp: 'En tareas de varios pasos reduce errores y da respuestas más confiables que contestar apurado.',
  },
  {
    icon: '⚠', k: 'Alucinación', tag: 'Cuidado: inventa con seguridad', warn: true,
    que: 'Cuando el modelo entrega una respuesta falsa o inventada pero la afirma con total seguridad. Está hecho para producir el texto más probable, no para verificar si es cierto.',
    img: 'Un empleado que, por no quedar mal, inventa un dato con voz firme en vez de admitir que no lo sabe.',
    ej: 'Le preguntas en qué artículo de una ley aparece una regla y te cita un número convincente… que no existe.',
    imp: 'Como suena seguro aunque esté equivocado, verifica siempre los datos sensibles: cifras, fechas, citas legales.',
  },
]

/* ----------------- 4 · CÓMO SE VUELVEN EXPERTOS EN LO TUYO ------------------ */
export interface ExpertWay extends Concept {
  id: 'finetuning' | 'rag'
  scene: { actor: string; action: string; result: string }
  pros: string; cons: string
}
export const EXPERT_WAYS: ExpertWay[] = [
  {
    id: 'finetuning', k: 'Fine-tuning', tag: 'Ajuste fino',
    que: 'Re-entrenar un modelo ya existente con tus propios ejemplos para que cambie su forma de responder de manera permanente. El modelo queda modificado por dentro.',
    img: 'Mandar a un empleado a un curso intensivo: vuelve con habilidades nuevas incorporadas y ya no necesita el manual al lado.',
    ej: 'Le das 2,000 correos antiguos de tu empresa y, tras el entrenamiento, redacta solo con el tono exacto de tu marca.',
    imp: 'Sirve para cambiar comportamiento o estilo de forma estable, pero cuesta tiempo y dinero.',
    scene: { actor: 'El modelo', action: 'va a un curso con tus ejemplos', result: 'vuelve cambiado para siempre' },
    pros: 'Estilo y comportamiento estables, sin recordárselo cada vez.',
    cons: 'Cuesta tiempo y dinero, y hay que rehacerlo cuando cambia lo que debe saber.',
  },
  {
    id: 'rag', k: 'RAG', tag: 'Generación aumentada por recuperación',
    que: 'Antes de responder, la IA busca en tus documentos los fragmentos relevantes y los usa para contestar. El modelo no se modifica: solo consulta el material que le acercas.',
    img: 'Un recepcionista que abre el archivador y revisa la ficha exacta en vez de responder de memoria.',
    ej: 'Preguntas cuántas vacaciones te tocan: localiza ese párrafo del reglamento y responde según esa política.',
    imp: 'La IA responde con información actual y privada tuya sin re-entrenarla; basta actualizar los documentos.',
    scene: { actor: 'El modelo', action: 'consulta tu archivador al instante', result: 'responde sin cambiar por dentro' },
    pros: 'Información actual y privada; actualizas un documento y la respuesta cambia.',
    cons: 'Depende de tener los documentos bien organizados y buscables.',
  },
]
export const EMBEDDING: Concept = {
  k: 'Embedding', tag: 'La pieza que lo hace posible',
  que: 'Convertir un texto en una lista de números que representa su significado: dos textos que dicen lo mismo con otras palabras obtienen números parecidos.',
  img: 'Darle a cada frase un punto en un mapa, donde los temas parecidos quedan cerca unos de otros.',
  ej: '«pedir días libres» y «trámite de vacaciones» reciben números cercanos: buscas una y el sistema encuentra la otra.',
  imp: 'Es lo que hace posible el RAG: encuentra el fragmento correcto aunque la pregunta use otras palabras.',
}

/* -------------------- 5 · DE HERRAMIENTA A COLABORADOR ---------------------- */
export const COLLAB: Concept[] = [
  {
    k: 'Agente de IA', tag: 'No solo responde: actúa',
    que: 'Una IA que además de responder, actúa: usa herramientas, decide los pasos y completa una tarea de principio a fin. Recibe un objetivo, no solo una pregunta.',
    img: 'La diferencia entre un consultor que aconseja por teléfono y un asistente que hace las llamadas y te trae el trámite resuelto.',
    ej: '«Agenda una reunión con el cliente el jueves»: revisa tu calendario, busca un horario, redacta la invitación y la envía.',
    imp: 'Marca el salto de una IA que entrega texto a una que de verdad te quita trabajo de encima.',
  },
  {
    k: 'Human-in-the-loop', tag: 'La máquina propone, tú decides',
    que: 'Un punto de control donde el agente se detiene y pide tu aprobación antes de ejecutar un paso importante.',
    img: 'Un cajero que prepara la operación pero necesita la firma del supervisor antes de liberar el dinero.',
    ej: 'El agente redacta un correo para 500 clientes y, antes de enviarlo, te muestra el texto para tu visto bueno.',
    imp: 'Aprovechas la velocidad de la IA sin perder el control sobre decisiones con consecuencias reales.',
  },
  {
    k: 'AI-first', tag: 'La IA desde el diseño',
    que: 'Ante cada tarea nueva, tu primera pregunta es «¿cómo podría resolver esto la IA?», en vez de sumarla al final como un agregado.',
    img: 'Construir una casa pensando la instalación eléctrica desde los planos, no rompiendo paredes después para meter los cables.',
    ej: 'Antes de armar el proceso para revisar contratos, defines qué puede leer y resumir la IA, y recién sobre eso los pasos manuales.',
    imp: 'Cambia «a ver si la IA me ayuda» por «diseño mi trabajo contando con la IA desde el inicio».',
  },
  {
    k: 'Entender los fundamentos', tag: 'No solo apretar botones',
    que: 'Comprender cómo funciona la IA por dentro —qué sabe hacer, dónde falla, por qué da cierta respuesta— en vez de solo aprender la app de moda.',
    img: 'Saber manejar entendiendo el tránsito y cómo responde el auto, frente a memorizar los botones de un modelo que cambiarás el próximo año.',
    ej: 'Como sabes que la IA puede inventar datos, verificas las cifras de cualquier informe que te genere, sea cual sea la app.',
    imp: 'Las herramientas cambian cada pocos meses; los fundamentos te mantienen útil y autónomo.',
  },
]

/* El método de lectura de la cápsula (4 partes). */
export const READ_METHOD = [
  { k: 'Qué es', d: 'La definición, sin tecnicismos.', icon: '?' },
  { k: 'Imagínalo así', d: 'Una analogía del día a día.', icon: '◎' },
  { k: 'Ejemplo', d: 'Un caso concreto y cotidiano.', icon: '▸' },
  { k: 'Por qué te importa', d: 'Para qué te sirve en tu trabajo.', icon: '★' },
]
