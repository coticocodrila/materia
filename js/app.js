/* Taller Materia · lógica del prototipo (navegación, vistas y carrito) */
const fmt=n=>'$'+n.toLocaleString('es-CL');
const $=s=>document.querySelector(s);

/* ---------- CARRITO (en memoria) ---------- */
let cart=[];
function addToCart(item){const ex=cart.find(i=>i.id===item.id);ex?ex.q+=item.q||1:cart.push({...item,q:item.q||1});drawCart();openCart();}
function drawCart(){
  $('#cartCount').textContent=cart.reduce((s,i)=>s+i.q,0);
  const L=$('#cartList'),F=$('#cartFoot');
  if(!cart.length){L.innerHTML='<p class="muted">Todavía no agregas nada.</p><p><a class="link" href="#piezas">Ver piezas</a></p>';F.innerHTML='';return;}
  L.innerHTML=cart.map(i=>`<div class="ci"><div class="ph ar-sq ${i.c}"><span></span></div><div><b>${i.t}</b><small>${i.sub}</small><small class="price">${i.q} × ${fmt(i.p)}</small></div><button class="xbtn" data-rm="${i.id}">Quitar</button></div>`).join('');
  const tot=cart.reduce((s,i)=>s+i.p*i.q,0);
  F.innerHTML=`<div class="tot"><span>Subtotal</span><span class="price">${fmt(tot)}</span></div><p class="mono muted">Envío se calcula en el pago.</p><a class="btn wide" href="#pago" id="goPay">Ir a pagar</a>`;
}
function openCart(){$('#cart').hidden=false;$('#scrim').hidden=false}
function closeCart(){$('#cart').hidden=true;$('#scrim').hidden=true}
$('#cartBtn').onclick=openCart;$('#cartClose').onclick=closeCart;$('#scrim').onclick=closeCart;
$('#cartList').onclick=e=>{const id=e.target.dataset.rm;if(id){cart=cart.filter(i=>i.id!==id);drawCart()}};
$('#cartFoot').onclick=e=>{if(e.target.id==='goPay')closeCart()};
function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,2200)}

/* ---------- PIEZAS UI ---------- */
const ph=(c,ar,txt,extra='')=>`<div class="ph ${c} ${ar} ${extra}"><span>${txt}</span></div>`;
const pieceCard=p=>{const a=A(p.a);return `<a class="card" href="#pieza-${p.id}"><div class="imgwrap">${ph(p.c,'ar-45',p.ph)}${p.ed==='Pieza única'||p.ed==='Original único'?'':''}</div><div class="row"><h3>${p.t}</h3><span class="price">${fmt(p.p)}</span></div><span class="by">${a.n} · ${a.d}${/único|única/.test(p.ed)?' · Pieza única':''}</span></a>`};
const kitCard=k=>`<a class="kitcard" href="#kit-${k.id}">${ph(k.c,'ar-43',k.ph)}<div class="row" style="display:flex;justify-content:space-between;gap:10px;align-items:baseline"><b style="font-size:1.05rem">${k.t}</b><span class="price">${fmt(k.p)}</span></div><div class="meta"><span>${k.nivel}</span><span>${k.horas}</span><span>+ tutorial</span></div></a>`;
const artistCard=a=>`<a class="card" href="#artista-${a.id}">${ph(a.c,'ar-34','retrato de '+a.n+' en su taller')}<div class="row"><h3>${a.n}<span class="ej">(ejemplo)</span></h3></div><span class="by">${a.d} · ${a.lugar}</span></a>`;

/* ---------- VISTAS ---------- */
const V={};
V.inicio=()=>{const f=A('laura-barria');return `
<section class="hero-full">
 <div class="ph c5 hero-bg"><span>Laura Barría en su taller, sosteniendo un cuenco recién esmaltado. Foto horizontal a todo el ancho.</span></div>
 <div class="wrap hero-in">
  <p class="eyebrow">Hecho por artistas de la región</p>
  <h1>Compra piezas hechas a mano, conoce a quien las hizo y <em>aprende a hacer las tuyas.</em></h1>
  <p class="lead">Cerámica, grabado, textil e ilustración de artistas locales. Kits con tutorial para empezar en casa, y una caja de arte que llega cada mes.</p>
  <p class="hero-links"><a class="link" href="#piezas">Ver piezas</a><a class="link" href="#kits">Kits y tutoriales</a><a class="link" href="#art-box">Art-box</a></p>
 </div>
</section>

<section class="blk" style="background:var(--papel-2)"><div class="wrap featured">
  <div>${ph(f.c,'ar-34','manos de Laura modelando greda en el torno')}</div>
  <div>
   <p class="eyebrow">Artista del mes · Diciembre</p>
   <h2 style="font-size:clamp(2rem,4vw,3rem);margin-top:12px">${f.n}<span class="ej">(ejemplo)</span></h2>
   <blockquote>“${f.frase}”</blockquote>
   <dl class="facts"><dt>Vive en</dt><dd>${f.lugar}</dd><dt>Creció en</dt><dd>${f.crecio.replace('Creció en ','')}</dd><dt>Técnica</dt><dd>${f.proceso}</dd></dl>
   <div class="grid g3" style="margin-top:36px">${PIEZAS.filter(p=>p.a===f.id).slice(0,3).map(pieceCard).join('')}</div>
   <p style="margin-top:28px"><a class="btn ghost" href="#artista-${f.id}">Leer su historia</a></p>
  </div>
</div></section>

<section class="blk"><div class="wrap">
 <div class="sec-head"><div><p class="eyebrow">Recién llegadas</p><h2 style="margin-top:8px">Piezas nuevas</h2></div><a class="link" href="#piezas">Ver las ${PIEZAS.length} piezas</a></div>
 <div class="grid">${PIEZAS.slice(0,8).map(pieceCard).join('')}</div>
</div></section>

<section class="blk band-azul"><div class="wrap">
 <div class="sec-head"><div><p class="eyebrow">Hazlo tú</p><h2 style="margin-top:8px">Kits con su tutorial</h2><p style="margin-top:10px;max-width:52ch;opacity:.9">Todo lo que necesitas en una caja, y un video grabado por artistas de Taller Materia para hacerlo paso a paso.</p></div><a class="link" href="#kits">Ver kits y tutoriales</a></div>
 <div class="kits-row">${KITS.map(kitCard).join('')}</div>
 <div class="free-tut">
  <div style="position:relative">${ph('c2','ar-169','María Tapia mostrando el primer punto de punch needle','vid')}<button class="play" aria-label="Reproducir (prototipo)" onclick="toast('En el prototipo el video no se reproduce')"></button></div>
  <div><p class="eyebrow">Tutorial gratis</p><h3 style="font-size:1.8rem;margin-top:10px">Primeros puntos de punch needle</h3><p style="margin-top:10px;opacity:.9">12 minutos con María Tapia. Sin registrarte. Si te gusta, el kit trae el tutorial completo del cojín.</p><p style="margin-top:18px"><a class="btn" style="background:var(--papel);color:var(--tinta)" href="#tutorial-tut-intro-punch">Ver tutorial</a></p></div>
 </div>
</div></section>

${boxBlock(true)}

<section class="blk" style="padding-top:24px"><div class="wrap">
 <div class="sec-head"><h2>También en Taller Materia</h2></div>
 <div class="agenda">
  <a href="#talleres"><span class="eyebrow">Talleres · temporada verano</span><h3>${TALLERES.length} talleres con artistas</h3><p class="muted">Próximo: ${TALLERES[0].t}, ${TALLERES[0].d} ${TALLERES[0].m}.</p></a>
  <a href="#exposicion"><span class="eyebrow">Exposición digital · temporada 01</span><h3>“Patio”</h3><p class="muted">Cinco artistas y sus patios: donde trabajan, secan, tiñen y guardan.</p></a>
  <a href="#encargos"><span class="eyebrow">Encargos</span><h3>Pídele algo a un artista</h3><p class="muted">Un retrato, una vajilla, un regalo de matrimonio. Te conectamos con quien sabe hacerlo.</p></a>
 </div>
</div></section>`};

function boxBlock(home){return `
<section class="blk" ${home?'':'style="padding-top:12px"'}><div class="wrap box">
 <div>
  ${home?'<p class="eyebrow">Suscripción</p><h2 style="font-size:clamp(1.9rem,3.5vw,2.8rem);margin-top:10px">Art-box: una caja de arte cada mes</h2>':''}
  <p style="font-size:1.12rem;margin-top:${home?16:0}px;max-width:48ch">Cada caja trae obra impresa de un artista invitado, una pieza para intervenir tú y algo de colaboradores de la zona. Llega la primera semana del mes.</p>
  <div class="plans" role="group" aria-label="Planes">${PLANES.map((pl,i)=>`<button class="plan" data-plan="${pl.id}" aria-pressed="${i===0}"><b>${pl.t}</b><span class="price">${fmt(pl.p)}</span><span class="muted" style="font-size:.9rem">${pl.det}</span></button>`).join('')}</div>
  <p style="margin-top:18px;display:flex;gap:16px;flex-wrap:wrap;align-items:center"><button class="btn" data-subscribe>Suscribirme</button>${home?'<a class="link" href="#art-box">Cómo funciona</a>':''}</p>
 </div>
 <div class="manifest">
  <div class="head"><span>CAJA N.º 03 · DICIEMBRE</span><span>ARTISTA INVITADA: ANA CORTÉS</span></div>
  <ol>
   <li><span>01</span><span><b>Risografía A4 a dos tintas</b><br>“Plantas de interior”, tiraje solo para suscriptores</span></li>
   <li><span>02</span><span><b>Pieza de arcilla para pintar</b><br>Un posavasos bizcochado, listo para tus colores</span></li>
   <li><span>03</span><span><b>3 gouaches en pomo</b><br>La paleta que usa Ana</span></li>
   <li><span>04</span><span><b>Postal de colaborador</b><br>Café de grano de un tostador local, 50 g</span></li>
   <li><span>05</span><span><b>Acceso al tutorial</b><br>Gouache: mezclar colores planos (55 min)</span></li>
  </ol>
 </div>
</div></section>`}

V.piezas=(st={d:'Todas',o:'nuevas'})=>{
  const ds=['Todas',...new Set(ARTISTAS.map(a=>a.d))];
  let list=PIEZAS.filter(p=>st.d==='Todas'||A(p.a).d===st.d);
  if(st.o==='menor')list=[...list].sort((a,b)=>a.p-b.p);
  if(st.o==='mayor')list=[...list].sort((a,b)=>b.p-a.p);
  return `<div class="wrap"><div class="pagehead"><p class="eyebrow">Catálogo</p><h1>Piezas</h1><p>Cada pieza viene con la historia de quien la hizo. Muchas son únicas: cuando se venden, no vuelven.</p></div>
  <div class="toolbar"><div class="chips" role="group" aria-label="Filtrar por técnica">${ds.map(d=>`<button class="chip" data-f="${d}" aria-pressed="${d===st.d}">${d}</button>`).join('')}</div>
   <label style="display:flex;align-items:center;gap:8px;font-weight:500">Ordenar <select id="sortSel"><option value="nuevas"${st.o==='nuevas'?' selected':''}>Más nuevas</option><option value="menor"${st.o==='menor'?' selected':''}>Precio: menor a mayor</option><option value="mayor"${st.o==='mayor'?' selected':''}>Precio: mayor a menor</option></select></label></div>
  <p class="mono muted" style="margin-bottom:20px">${list.length} piezas</p>
  <div class="grid">${list.map(pieceCard).join('')}</div></div>`};

V.pieza=id=>{const p=PIEZAS.find(x=>x.id===id);if(!p)return V.nf();const a=A(p.a);const otras=PIEZAS.filter(x=>x.a===a.id&&x.id!==p.id);
 const unica=/único|única/.test(p.ed);
 return `<div class="wrap">
 <div class="crumbs"><a href="#piezas">Piezas</a> / <a href="#piezas">${a.d}</a> / ${p.t}</div>
 <div class="pdp">
  <div class="gallery">${ph(p.c,'ar-sq',p.ph)}${ph('c1','ar-sq','detalle de la textura de cerca')}${ph('c3','ar-sq','la pieza en uso, en una casa')}</div>
  <div class="buy">
   <a class="artist-mini" href="#artista-${a.id}">${ph(a.c,'','')}<div><b>${a.n}</b><span class="ej">(ejemplo)</span><br><span class="muted" style="font-size:.9rem">${a.d} · ${a.lugar}</span></div></a>
   <h1>${p.t}</h1>
   <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><span class="price">${fmt(p.p)}</span><span class="muted">${p.ed}</span></div>
   <p>${p.sobre}</p>
   <div class="buyrow">${unica?'':`<div class="qty"><button data-q="-1" aria-label="Menos">−</button><output id="qty">1</output><button data-q="1" aria-label="Más">+</button></div>`}<button class="btn" data-add="${p.id}">Agregar al carrito</button></div>
   <div class="note"><span>Envío a todo Chile, embalado por la artista. Despacho en 3 a 5 días hábiles.</span><span>Retiro gratis en La Serena.</span></div>
   <dl class="specs"><dt>Técnica</dt><dd>${p.tec}</dd><dt>Medidas</dt><dd>${p.med}</dd><dt>Materiales</dt><dd>${p.mat}</dd><dt>Edición</dt><dd>${p.ed}</dd><dt>Tiempo</dt><dd>${p.tiempo}</dd></dl>
  </div>
 </div>
 <section class="story">
  <div><p class="eyebrow">Quién la hizo</p><h2 style="font-size:2rem;margin-top:10px">${a.n}</h2><p class="muted" style="margin-top:6px">${a.lugar} · ${a.crecio}</p>${ph(a.c,'ar-34','retrato de '+a.n,'')}<p style="margin-top:14px"><a class="link" href="#artista-${a.id}">Ver perfil y todas sus piezas</a></p></div>
  <div class="prose">
   <blockquote style="margin:0;font-size:1.5rem;line-height:1.25;font-weight:500">“${a.frase}”</blockquote>
   <h3>Sobre esta pieza</h3><p>${p.sobre} ${a.bio}</p>
   <h3>Qué la inspira</h3><p>${a.inspira}</p>
   <h3>Cómo se hizo</h3><p>${a.proceso}</p>
   <div class="process"><figure>${ph('c4','ar-sq','boceto en cuaderno')}<figcaption>1. Boceto</figcaption></figure><figure>${ph('c3','ar-sq','la pieza a medio hacer en el taller')}<figcaption>2. En el taller</figcaption></figure><figure>${ph('c5','ar-sq','pieza terminada antes de embalar')}<figcaption>3. Terminada</figcaption></figure></div>
  </div>
 </section>
 ${otras.length?`<section class="blk"><div class="sec-head"><h2>Más de ${a.n.split(' ')[0]}</h2><a class="link" href="#artista-${a.id}">Ver todo</a></div><div class="grid">${otras.slice(0,4).map(pieceCard).join('')}</div></section>`:''}
 </div>`};

V.artistas=()=>`<div class="wrap"><div class="pagehead"><p class="eyebrow">Quiénes hacen Taller Materia</p><h1>Artistas</h1><p>Personas que trabajan en sus casas y talleres de la región. Cada perfil cuenta dónde viven, qué las inspira y cómo trabajan.</p></div>
 <div class="grid">${ARTISTAS.map(artistCard).join('')}</div>
 <section class="blk"><div class="ok" style="border-color:var(--azul-tinta)"><b>¿Eres artista?</b> <span class="muted">Postula para mostrar y vender tu trabajo, dictar talleres o recibir encargos.</span> <a class="link" href="#postula">Postular</a></div></section></div>`;

V.artista=id=>{const a=A(id);if(!a)return V.nf();const ps=PIEZAS.filter(p=>p.a===id);const ts=TALLERES.filter(t=>t.a===id);const tu=TUTS.filter(t=>t.a===id);
 return `<div class="wrap"><div class="crumbs"><a href="#artistas">Artistas</a> / ${a.n}</div>
 <section class="profile"><div>${ph(a.c,'ar-45','retrato de '+a.n+' en su taller')}</div>
  <div><p class="eyebrow">${a.d} · ${a.lugar}</p><h1 style="margin-top:12px">${a.n}<span class="ej">(ejemplo)</span></h1><p class="lead">${a.bio}</p>
   <blockquote style="margin:28px 0 0;font-size:1.45rem;line-height:1.3;font-weight:500;max-width:34ch">“${a.frase}”</blockquote>
   <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:28px"><a class="btn" href="#piezas-de">Ver sus ${ps.length} piezas</a>${a.encargos?`<a class="btn ghost" href="#encargos">Pedirle un encargo</a>`:''}</div>
  </div></section>
 <div class="cols3"><div><h3>Dónde vive</h3><p>${a.lugar}. ${a.crecio}.</p></div><div><h3>Qué la inspira</h3><p>${a.inspira}</p></div><div><h3>Cómo trabaja</h3><p>${a.proceso}</p></div></div>
 <section class="blk" id="piezas-de"><div class="sec-head"><h2>Piezas</h2></div><div class="grid">${ps.map(pieceCard).join('')}</div></section>
 ${(ts.length||tu.length)?`<section class="blk" style="padding-top:0"><div class="sec-head"><h2>Aprende con ${a.n.split(' ')[0]}</h2></div><div class="rows">${ts.map(talRow).join('')}${tu.map(tutRow).join('')}</div></section>`:''}
 </div>`};

const talRow=t=>{const a=A(t.a);return `<a class="rowitem" href="#talleres"><div class="when"><b>${t.d}</b>${t.m} · taller</div><div><h3>${t.t}</h3><p class="muted" style="margin-top:4px">${a.n} · ${t.mod} · ${t.cupos}</p></div><span class="price">${fmt(t.p)}</span></a>`};
const tutRow=t=>{const a=t.a?A(t.a):null;return `<a class="rowitem" href="#tutorial-${t.id}"><div class="when"><b>${t.min}</b>min · video</div><div><h3>${t.t}</h3><p class="muted" style="margin-top:4px">${a?a.n:'Equipo Taller Materia'}</p></div><span class="acc ${t.acc}">${t.acc==='pago'?fmt(t.p):ACC[t.acc]}</span></a>`};

V.kits=()=>`<div class="wrap"><div class="pagehead"><p class="eyebrow">Hazlo tú</p><h1>Kits y tutoriales</h1><p>Kits armados por Taller Materia con materiales probados. Cada uno trae acceso a su tutorial en video. Algunos tutoriales son gratis para que pruebes antes.</p></div>
 <div class="kits-row" style="padding-bottom:20px">${KITS.map(kitCard).join('')}</div>
 <section class="blk"><div class="sec-head"><div><h2>Tutoriales</h2><p class="muted" style="margin-top:8px">Algunos son gratis, otros vienen con su kit y otros se compran aparte.</p></div></div>
 <div class="rows">${TUTS.map(tutRow).join('')}</div></section></div>`;
V.tutoriales=V.kits;

V.kit=id=>{const k=KITS.find(x=>x.id===id);if(!k)return V.nf();const t=TUTS.find(x=>x.id===k.tut);const a=k.con?A(k.con):null;
 return `<div class="wrap"><div class="crumbs"><a href="#kits">Kits y tutoriales</a> / ${k.t}</div>
 <div class="pdp"><div class="gallery">${ph(k.c,'ar-sq',k.ph)}${ph('c3','ar-sq','caja cerrada con etiqueta Taller Materia')}${ph('c1','ar-sq','resultado terminado hecho con el kit')}</div>
 <div class="buy"><p class="eyebrow">Kit Taller Materia</p><h1>${k.t}</h1><span class="price">${fmt(k.p)}</span>
  <dl class="specs"><dt>Nivel</dt><dd>${k.nivel}</dd><dt>Tiempo</dt><dd>${k.horas}</dd><dt>Tutorial</dt><dd><a class="link" href="#tutorial-${t.id}">${t.t}</a> · ${t.min} min</dd>${a?`<dt>Con</dt><dd><a class="link" href="#artista-${a.id}">${a.n}</a></dd>`:''}</dl>
  <div><p class="eyebrow" style="margin-bottom:10px">Qué trae la caja</p><ul style="margin:0;padding-left:18px;display:grid;gap:4px">${k.incluye.map(i=>`<li>${i}</li>`).join('')}</ul></div>
  <button class="btn wide" data-addkit="${k.id}">Agregar al carrito</button>
  <p class="note"><span>Al comprar, el tutorial queda disponible en tu cuenta.</span></p>
 </div></div>
 <section class="blk"><div class="sec-head"><h2>El tutorial</h2></div><div style="position:relative;max-width:880px">${ph(k.c,'ar-169','vista previa del tutorial '+t.t,'vid')}<button class="play" aria-label="Ver avance (prototipo)" onclick="toast('En el prototipo el video no se reproduce')"></button></div><p class="muted" style="margin-top:10px">Avance de 1 minuto. El tutorial completo se desbloquea con el kit.</p></section></div>`};

V.tutorial=id=>{const t=TUTS.find(x=>x.id===id);if(!t)return V.nf();const a=t.a?A(t.a):null;const k=t.kit?KITS.find(x=>x.id===t.kit):null;
 const lock=t.acc!=='gratis';
 return `<div class="wrap"><div class="crumbs"><a href="#tutoriales">Tutoriales</a> / ${t.t}</div>
 <div style="position:relative;max-width:960px">${ph(t.c,'ar-169',t.t,'vid')}${lock?'':'<button class="play" aria-label="Reproducir (prototipo)" onclick="toast(\'En el prototipo el video no se reproduce\')"></button>'}</div>
 <div style="display:grid;gap:14px;max-width:720px;padding-block:28px 60px"><span class="acc ${t.acc}" style="justify-self:start">${t.acc==='pago'?fmt(t.p):ACC[t.acc]}</span><h1 style="font-size:clamp(1.9rem,4vw,2.8rem)">${t.t}</h1><p class="muted">${t.min} minutos · ${a?`con <a class="link" href="#artista-${a.id}">${a.n}</a>`:'Equipo Taller Materia'}</p>
  ${t.acc==='gratis'?'<p>Libre, sin registrarte.</p>':''}
  ${t.acc==='kit'?`<div class="ok" style="border-color:var(--naranjo)">Este tutorial viene con el <a class="link" href="#kit-${k.id}">${k.t}</a> (${fmt(k.p)}).</div>`:''}
  ${t.acc==='pago'?`<p><button class="btn" data-addtut="${t.id}">Comprar tutorial · ${fmt(t.p)}</button></p>`:''}
 </div></div>`};

V['art-box']=()=>`<div class="wrap"><div class="pagehead"><p class="eyebrow">Suscripción mensual</p><h1>Art-box</h1></div></div>${boxBlock(false)}
 <div class="wrap"><section class="blk" style="padding-top:0"><div class="sec-head"><h2>Cajas anteriores</h2></div><div class="grid g3">
 ${[['n.º 01 · Octubre','Felipe Rojas','c5','caja abierta con grabado y gubia'],['n.º 02 · Noviembre','María Tapia','c4','caja abierta con lanas y bastidor'],['n.º 03 · Diciembre','Ana Cortés','c1','caja abierta con risografía y gouaches']].map(b=>`<div class="card">${ph(b[2],'ar-43',b[3])}<h3>Caja ${b[0]}</h3><span class="by">Artista invitado: ${b[1]}</span></div>`).join('')}
 </div></section></div>`;

V.talleres=()=>`<div class="wrap"><div class="pagehead"><p class="eyebrow">Temporada verano</p><h1>Talleres</h1><p>Talleres dictados por artistas de Taller Materia, presenciales en la región u online. Grupos chicos.</p></div>
 <div class="rows">${TALLERES.map(t=>{const a=A(t.a);return `<div class="rowitem"><div class="when"><b>${t.d}</b>${t.m}</div><div><h3>${t.t}</h3><p class="muted" style="margin-top:4px"><a class="link" href="#artista-${a.id}">${a.n}</a> · ${t.mod} · ${t.cupos}</p></div><div style="display:flex;gap:14px;align-items:center"><span class="price">${fmt(t.p)}</span><button class="btn" data-addtal="${t.t}">Inscribirme</button></div></div>`}).join('')}</div><div style="height:60px"></div></div>`;

V.exposicion=()=>`<div class="wrap"><div class="pagehead"><p class="eyebrow">Exposición digital · temporada 01</p><h1>Patio</h1><p>Cinco artistas abren el lugar donde trabajan: el patio donde secan la greda, tiñen la lana o guardan la madera. Fotos, audio y las piezas que salieron de ahí.</p></div>
 <div class="grid g3">${ARTISTAS.map((a,i)=>`<a class="card" href="#artista-${a.id}">${ph(a.c,i%2?'ar-34':'ar-45','el patio-taller de '+a.n)}<h3>Sala ${i+1} · ${a.n}</h3><span class="by">${a.d} · ${a.lugar}</span></a>`).join('')}</div>
 <p class="mono muted" style="padding-block:40px 60px">Formato a definir: galería de fotos, recorrido 360° o video. Esta página es un esbozo.</p></div>`;

V.encargos=()=>`<div class="wrap"><div class="pagehead"><p class="eyebrow">Encargos</p><h1>Pídele algo a un artista</h1><p>Cuéntanos qué necesitas. Lo mandamos a los artistas que hacen ese tipo de trabajo y te responden con propuesta y precio.</p></div>
 <div class="pdp" style="padding-bottom:60px"><form class="stack" id="encForm">
  <label for="enc-que">¿Qué necesitas?<textarea id="enc-que" rows="4" required placeholder="Ej.: un juego de 6 tazas para regalo de matrimonio, en tonos arena"></textarea></label>
  <label for="enc-tec">Técnica<select id="enc-tec"><option>No sé, ayúdenme</option>${[...new Set(ARTISTAS.map(a=>a.d))].map(d=>`<option>${d}</option>`).join('')}</select></label>
  <label for="enc-fecha">¿Para cuándo?<input id="enc-fecha" type="text" placeholder="Ej.: fines de enero"></label>
  <label for="enc-pres">Presupuesto aproximado<input id="enc-pres" type="text" placeholder="Ej.: $60.000"></label>
  <label for="enc-mail">Tu correo<input id="enc-mail" type="email" required></label>
  <button class="btn" type="submit" style="justify-self:start">Enviar encargo</button>
  <div class="ok" id="encOk" hidden>Recibido. En el sitio real, aquí le diríamos a la persona en cuántos días le responden. En el prototipo no se envía nada.</div>
 </form>
 <div><p class="eyebrow" style="margin-bottom:14px">Aceptan encargos</p><div style="display:grid;gap:14px">${ARTISTAS.filter(a=>a.encargos).map(a=>`<a class="artist-mini" href="#artista-${a.id}">${ph(a.c,'','')}<div><b>${a.n}</b><br><span class="muted" style="font-size:.9rem">${a.d} · ${a.lugar}</span></div></a>`).join('')}</div></div></div></div>`;

V.pago=()=>{const tot=cart.reduce((s,i)=>s+i.p*i.q,0);return `<div class="wrap"><div class="pagehead"><p class="eyebrow">Pago</p><h1>Finalizar compra</h1></div>
 ${cart.length?`<div class="pdp" style="padding-bottom:60px"><form class="stack" id="payForm"><label for="p-nom">Nombre<input id="p-nom" required></label><label for="p-mail">Correo<input id="p-mail" type="email" required></label><label for="p-dir">Dirección de envío<input id="p-dir"></label><label for="p-com">Comuna<input id="p-com"></label><button class="btn" type="submit" style="justify-self:start">Pagar ${fmt(tot)}</button><div class="ok" id="payOk" hidden>Así se vería la confirmación. En el prototipo no se cobra nada.</div></form>
 <div class="manifest"><div class="head"><span>RESUMEN</span><span>${cart.length} ítems</span></div><ol>${cart.map(i=>`<li><span>${i.q}×</span><span><b>${i.t}</b><br>${i.sub} · ${fmt(i.p*i.q)}</span></li>`).join('')}</ol><div class="head" style="border-bottom:0;border-top:1.5px dashed var(--tinta-2);padding-top:12px;margin:14px 0 0"><span>SUBTOTAL</span><span>${fmt(tot)}</span></div></div></div>`
 :'<p class="muted" style="padding-bottom:80px">Tu carrito está vacío. <a class="link" href="#piezas">Ver piezas</a></p>'}</div>`};

V.postula=()=>`<div class="wrap"><div class="pagehead"><p class="eyebrow">Para artistas</p><h1>Postula tu trabajo</h1><p>Esta página queda pendiente: depende de cómo decidas vender las piezas (comisión, consignación o exhibición).</p></div><div style="height:80px"></div></div>`;
V.nf=()=>`<div class="wrap"><div class="pagehead"><h1>No encontramos esta página</h1><p><a class="link" href="#">Volver al inicio</a></p></div></div>`;

/* ---------- ROUTER ---------- */
let pstate={d:'Todas',o:'nuevas'};
function route(){
  const h=decodeURIComponent(location.hash.slice(1));
  let html,nav='';
  const m=h.match(/^(pieza|artista|kit|tutorial)-(.+)$/);
  if(!h)html=V.inicio();
  else if(m){html=V[m[1]](m[2]);nav={pieza:'piezas',artista:'artistas',kit:'kits',tutorial:'kits'}[m[1]];}
  else if(h==='piezas-de'){document.getElementById('piezas-de')?.scrollIntoView();return;}
  else if(V[h]){html=h==='piezas'?V.piezas(pstate):V[h]();nav=h==='tutoriales'?'kits':h;}
  else html=V.nf();
  $('#app').innerHTML=html;
  document.querySelectorAll('[data-nav]').forEach(a=>{a.dataset.nav===nav?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
  $('#top').classList.remove('open');$('#menuBtn').setAttribute('aria-expanded','false');
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);
$('#menuBtn').onclick=()=>{const o=$('#top').classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',o)};

/* ---------- EVENTOS ---------- */
document.addEventListener('click',e=>{
  const t=e.target.closest('button,a');if(!t)return;
  if(t.matches('a[href="#piezas-de"]')){e.preventDefault();document.getElementById('piezas-de')?.scrollIntoView({behavior:'smooth'});return;}
  if(t.dataset.f){pstate.d=t.dataset.f;$('#app').innerHTML=V.piezas(pstate);return;}
  if(t.dataset.q){const o=$('#qty');o.textContent=Math.max(1,+o.textContent+ +t.dataset.q);return;}
  if(t.dataset.add){const p=PIEZAS.find(x=>x.id===t.dataset.add);const q=$('#qty')?+$('#qty').textContent:1;addToCart({id:p.id,t:p.t,sub:A(p.a).n,p:p.p,c:p.c,q});return;}
  if(t.dataset.addkit){const k=KITS.find(x=>x.id===t.dataset.addkit);addToCart({id:k.id,t:k.t,sub:'Kit + tutorial',p:k.p,c:k.c});return;}
  if(t.dataset.addtut){const k=TUTS.find(x=>x.id===t.dataset.addtut);addToCart({id:k.id,t:k.t,sub:'Tutorial en video',p:k.p,c:k.c});return;}
  if(t.dataset.addtal){const k=TALLERES.find(x=>x.t===t.dataset.addtal);addToCart({id:'tal-'+k.d+k.m,t:k.t,sub:'Taller · '+k.d+' '+k.m,p:k.p,c:'c3'});return;}
  if(t.dataset.plan){t.parentElement.querySelectorAll('.plan').forEach(b=>b.setAttribute('aria-pressed',b===t));return;}
  if(t.hasAttribute('data-subscribe')){const id=document.querySelector('.plan[aria-pressed="true"]').dataset.plan;const pl=PLANES.find(x=>x.id===id);addToCart({id:pl.id,t:'Art-box · '+pl.t,sub:'Suscripción',p:pl.p,c:'c4'});return;}
});
document.addEventListener('change',e=>{if(e.target.id==='sortSel'){pstate.o=e.target.value;$('#app').innerHTML=V.piezas(pstate)}});
document.addEventListener('submit',e=>{
  e.preventDefault();
  if(e.target.id==='encForm')$('#encOk').hidden=false;
  if(e.target.id==='payForm')$('#payOk').hidden=false;
  if(e.target.id==='newsForm')$('#newsMsg').hidden=false;
});
drawCart();route();
