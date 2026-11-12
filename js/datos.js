/* Taller Materia · datos de ejemplo.
   Para cambiar artistas, piezas, kits, tutoriales, talleres o planes, edita este archivo.
   Todo lo que hay aquí es inventado para el prototipo. */

const ARTISTAS=[
 {id:'laura-barria',n:'Laura Barría',d:'Cerámica',lugar:'Coquimbo',crecio:'Creció en Andacollo',c:'c2',
  frase:'Trabajo con greda de la zona y la dejo hablar: si se agrieta, esa grieta también es parte del cuenco.',
  bio:'Hace cerámica utilitaria en un taller pequeño en el patio de su casa. Aprendió con su abuela y después estudió en un taller municipal.',
  inspira:'Las quebradas secas del interior, los colores de la loza enlozada que había en la cocina de su abuela.',
  proceso:'Torno y modelado a mano. Esmaltes que mezcla ella misma; cuece en horno eléctrico a 1.200 °C.',
  encargos:true},
 {id:'felipe-rojas',n:'Felipe Rojas',d:'Grabado',lugar:'La Serena',crecio:'Creció en Vicuña',c:'c5',
  frase:'Cada grabado empieza como un dibujo de cuaderno que hice caminando por el valle.',
  bio:'Grabador e ilustrador. Imprime a mano en una prensa que restauró él mismo.',
  inspira:'La flora del valle de Elqui y los afiches de feria antiguos.',
  proceso:'Linóleo y xilografía. Ediciones cortas, numeradas y firmadas.',
  encargos:true},
 {id:'maria-tapia',n:'María Tapia',d:'Textil',lugar:'Ovalle',crecio:'Creció en Ovalle',c:'c4',
  frase:'Me interesa que un tapiz se sienta como una manta que alguien usó mucho.',
  bio:'Tejedora en telar y punch needle. Trabaja con lana de oveja hilada en la provincia del Limarí.',
  inspira:'Las mantas de su familia, la geometría de los cerros.',
  proceso:'Telar de pie y punch needle. Tiñe con tintes naturales cuando puede.',
  encargos:false},
 {id:'ana-cortes',n:'Ana Cortés',d:'Ilustración',lugar:'La Serena',crecio:'Creció en Santiago',c:'c1',
  frase:'Dibujo mujeres en lugares tranquilos, que es lo que me gustaría tener más seguido.',
  bio:'Ilustradora. Pinta originales en gouache y hace reproducciones en risografía.',
  inspira:'Las plantas de su departamento y los libros ilustrados de los años setenta.',
  proceso:'Gouache sobre papel de algodón. Risografía a dos tintas.',
  encargos:true},
 {id:'tomas-vega',n:'Tomás Vega',d:'Madera',lugar:'Coquimbo',crecio:'Creció en Tongoy',c:'c3',
  frase:'Uso madera que otros botaron: cajones de feria, restos de carpintería.',
  bio:'Talla objetos pequeños de madera recuperada: cucharas, tablas, figuras.',
  inspira:'Los botes de pesca de Tongoy y sus colores gastados.',
  proceso:'Talla a mano con gubias. Terminación con aceite de linaza.',
  encargos:true},
];
const A=id=>ARTISTAS.find(a=>a.id===id);

const PIEZAS=[
 {id:'cuenco-salpicado',t:'Cuenco salpicado azul',a:'laura-barria',p:28000,c:'c5',ph:'cuenco blanco con salpicado azul, sobre mesa de madera',
  tec:'Cerámica de alta temperatura, torno',med:'Ø 18 cm · alto 7 cm',mat:'Gres, esmalte de cobalto',ed:'Pieza única',tiempo:'3 semanas (incluye secado y 2 cocciones)',
  sobre:'Un cuenco hondo pensado para sopa o ensalada. El salpicado se hace con un pincel cargado de cobalto, golpeado sobre el borde antes de la segunda cocción, así que ningún cuenco queda igual a otro.',nueva:true},
 {id:'taza-cerro',t:'Taza Cerro',a:'laura-barria',p:16000,c:'c2',ph:'taza rosada con asa gruesa, en la mano de la artista',
  tec:'Cerámica, modelado a mano',med:'Alto 9 cm · 300 ml',mat:'Gres, esmalte satinado',ed:'Serie de 6',tiempo:'2 semanas',sobre:'Una taza gruesa que mantiene el calor. La forma del asa viene de una piedra que Laura encontró en el río Elqui.'},
 {id:'grabado-chanar',t:'Chañar en flor',a:'felipe-rojas',p:40000,c:'c3',ph:'grabado en azul de una rama de chañar, enmarcado',
  tec:'Linóleo a una tinta',med:'30 × 40 cm',mat:'Papel de algodón 300 g',ed:'Edición de 20, numerada',tiempo:'1 semana de tallado, 2 días de impresión',sobre:'Una rama de chañar dibujada en marzo, cuando florece. Se imprime a mano, una copia a la vez.',nueva:true},
 {id:'grabado-feria',t:'Afiche de feria',a:'felipe-rojas',p:22000,c:'c4',ph:'grabado a dos colores con tipografía de feria',
  tec:'Xilografía a dos tintas',med:'21 × 30 cm',mat:'Papel de algodón',ed:'Edición de 30',tiempo:'5 días',sobre:'Homenaje a los afiches pintados a mano de las ferias de La Serena.'},
 {id:'tapiz-cerros',t:'Tapiz Cerros',a:'maria-tapia',p:45000,c:'c4',ph:'tapiz de lana colgado en una vara de madera, colores mostaza y negro',
  tec:'Telar de pie',med:'40 × 60 cm',mat:'Lana de oveja, vara de eucalipto',ed:'Pieza única',tiempo:'4 semanas',sobre:'Las franjas siguen el perfil de los cerros que María ve desde su ventana en Ovalle.'},
 {id:'cojin-punch',t:'Cojín punch',a:'maria-tapia',p:32000,c:'c2',ph:'cojín bordado en punch needle con formas redondas',
  tec:'Punch needle',med:'40 × 40 cm',mat:'Lana, tela de algodón',ed:'Serie de 4',tiempo:'2 semanas',sobre:'Un cojín grueso, con relleno de fibra.'},
 {id:'ilustracion-siesta',t:'Siesta de domingo',a:'ana-cortes',p:35000,c:'c1',ph:'ilustración original de una mujer descansando entre plantas',
  tec:'Gouache sobre papel',med:'24 × 32 cm',mat:'Papel de algodón 300 g',ed:'Original único',tiempo:'1 semana',sobre:'El original de la portada de su fanzine. Se entrega sin marco.',nueva:true},
 {id:'riso-plantas',t:'Plantas de interior',a:'ana-cortes',p:12000,c:'c5',ph:'risografía a dos tintas, azul y rosado, de plantas en macetas',
  tec:'Risografía',med:'A4',mat:'Papel bond 120 g',ed:'Tiraje de 50',tiempo:'—',sobre:'Reproducción a dos tintas de una serie de dibujos.'},
 {id:'cuchara-tongoy',t:'Cuchara Tongoy',a:'tomas-vega',p:14000,c:'c3',ph:'cuchara de madera clara sobre un paño de lino',
  tec:'Talla a mano',med:'Largo 24 cm',mat:'Madera de cajón recuperada, aceite de linaza',ed:'Pieza única',tiempo:'2 días',sobre:'Tallada de una tabla de cajón de feria. Apta para cocinar.'},
 {id:'bote-figura',t:'Bote pintado',a:'tomas-vega',p:18000,c:'c5',ph:'pequeño bote de madera pintado de azul y rojo gastado',
  tec:'Talla y pintura',med:'Largo 18 cm',mat:'Madera recuperada, pintura acrílica',ed:'Serie de 10',tiempo:'3 días',sobre:'Una réplica pequeña de los botes de la caleta de Tongoy.'},
 {id:'plato-hondo',t:'Plato hondo arena',a:'laura-barria',p:20000,c:'c4',ph:'plato hondo color arena con borde irregular',
  tec:'Cerámica, torno',med:'Ø 22 cm',mat:'Gres',ed:'Serie de 8',tiempo:'3 semanas',sobre:'Esmalte mate color arena.'},
 {id:'grabado-pajaro',t:'Chincol',a:'felipe-rojas',p:15000,c:'c2',ph:'grabado pequeño de un chincol en negro',
  tec:'Linóleo',med:'15 × 15 cm',mat:'Papel de algodón',ed:'Edición de 40',tiempo:'3 días',sobre:'El pájaro que canta en todos los patios.'},
];

const KITS=[
 {id:'kit-punch',t:'Kit punch needle',p:24000,c:'c2',ph:'contenido del kit ordenado sobre la mesa: aguja, bastidor, lanas',nivel:'Principiante',horas:'4–6 h',
  incluye:['Aguja punch n.º 10','Bastidor de 20 cm','Tela monk con diseño impreso','5 madejas de lana','Enhebrador'],tut:'tut-punch',con:'maria-tapia'},
 {id:'kit-arcilla',t:'Kit arcilla sin horno',p:18000,c:'c4',ph:'bloque de arcilla, estecas y pinturas en caja de cartón',nivel:'Principiante',horas:'3 h + secado',
  incluye:['1 kg de arcilla de secado al aire','3 estecas de madera','4 pinturas acrílicas','Barniz al agua','Pincel'],tut:'tut-arcilla',con:'laura-barria'},
 {id:'kit-grabado',t:'Kit grabado en goma',p:22000,c:'c5',ph:'plancha de goma, gubias y tinta azul',nivel:'Intermedio',horas:'3–4 h',
  incluye:['2 planchas de goma 10 × 15 cm','Mango con 5 gubias','Tinta al agua azul','Rodillo','10 hojas de papel'],tut:'tut-grabado',con:'felipe-rojas'},
 {id:'kit-reloj',t:'Kit reloj de papel',p:16000,c:'c1',ph:'máquina de reloj, papeles de colores y plantilla',nivel:'Principiante',horas:'2 h',
  incluye:['Máquina de reloj silenciosa','Base de cartón 25 cm','Papeles de colores','Plantillas','Pegamento'],tut:'tut-reloj',con:null},
];
const TUTS=[
 {id:'tut-intro-punch',t:'Primeros puntos de punch needle',acc:'gratis',min:12,a:'maria-tapia',c:'c2'},
 {id:'tut-punch',t:'Cojín completo en punch needle',acc:'kit',kit:'kit-punch',min:48,a:'maria-tapia',c:'c4'},
 {id:'tut-arcilla',t:'Cuenco pellizcado sin horno',acc:'kit',kit:'kit-arcilla',min:35,a:'laura-barria',c:'c4'},
 {id:'tut-grabado',t:'Tu primer sello en goma',acc:'kit',kit:'kit-grabado',min:40,a:'felipe-rojas',c:'c5'},
 {id:'tut-reloj',t:'Reloj de papel paso a paso',acc:'kit',kit:'kit-reloj',min:25,a:null,c:'c1'},
 {id:'tut-gouache',t:'Gouache: mezclar colores planos',acc:'pago',p:6000,min:55,a:'ana-cortes',c:'c1'},
 {id:'tut-madera',t:'Tallar una cuchara de madera',acc:'pago',p:8000,min:70,a:'tomas-vega',c:'c3'},
 {id:'tut-esmalte',t:'Cómo elegir esmaltes (charla)',acc:'gratis',min:18,a:'laura-barria',c:'c5'},
];
const TALLERES=[
 {d:'14',m:'dic',t:'Torno para principiantes',a:'laura-barria',mod:'Presencial · Coquimbo',cupos:'4 de 8 cupos',p:35000},
 {d:'18',m:'dic',t:'Grabado en linóleo: de la libreta a la prensa',a:'felipe-rojas',mod:'Online · 2 sesiones',cupos:'12 de 20 cupos',p:25000},
 {d:'11',m:'ene',t:'Punch needle en grupo',a:'maria-tapia',mod:'Presencial · La Serena',cupos:'8 de 10 cupos',p:30000},
 {d:'25',m:'ene',t:'Cuaderno de dibujo de plantas',a:'ana-cortes',mod:'Online · 1 sesión',cupos:'Abierto',p:15000},
];
const PLANES=[
 {id:'box-mes',t:'Mes a mes',p:19900,det:'Una caja cada mes. Cancelas cuando quieras.'},
 {id:'box-tri',t:'Temporada (3 meses)',p:54900,det:'3 cajas. Sale a $18.300 cada una.'},
];
const ACC={gratis:'Gratis',kit:'Incluido con kit',pago:'Pago'};
