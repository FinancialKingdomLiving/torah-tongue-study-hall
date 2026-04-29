
const $=id=>document.getElementById(id);
function set(id,html){const e=$(id);if(e)e.innerHTML=html}
function renderStats(){set('statWords',LEXICON.length);set('statVerbs',VERBS.length);set('statLevels',LEVELS.length)}
function renderCategories(){
 const cats=[...new Set(LEXICON.map(w=>w.category))].sort();
 if($('categoryFilter'))$('categoryFilter').innerHTML='<option value="all">All categories</option>'+cats.map(c=>`<option value="${c}">${c}</option>`).join('');
 if($('levelFilter'))$('levelFilter').innerHTML='<option value="all">All levels</option>'+LEVELS.map(l=>`<option value="${l.level}">Level ${l.level}</option>`).join('');
}
function renderLexicon(){
 const q=($('searchBox')?.value||'').toLowerCase();
 const cat=($('categoryFilter')?.value||'all');
 const level=($('levelFilter')?.value||'all');
 let list=LEXICON.filter(w=>Object.values(w).flat().join(' ').toLowerCase().includes(q));
 if(cat!=='all')list=list.filter(w=>w.category===cat);
 if(level!=='all')list=list.filter(w=>String(w.level)===level);
 set('resultCount',`${list.length} entries showing of ${LEXICON.length}`);
 set('lexiconCards',list.map(w=>`<div class="card word-card" onclick="openStudy('${w.id}')"><span class="badge">${w.strong}</span><span class="badge">Level ${w.level}</span><span class="badge">${w.category}</span><div class="bigword">${w.hebrew}</div><p class="phonetic">${w.phonetic}</p><p><span class="label">Meaning</span><br>${w.gloss}</p><p><span class="label">Root</span><br>${w.root}</p><p class="small">${w.part}</p><button onclick="event.stopPropagation();openStudy('${w.id}')">Full Vocabulary Study →</button></div>`).join(''))
}
function openStudy(id){
 const w=LEXICON.find(x=>x.id===id);if(!w)return;
 set('lessonContent',`<div class="lesson"><div class="closebar"><span class="badge">Vocabulary Entry • ${w.strong}</span><button onclick="closeStudy()">Close ✕</button></div><div class="bigword">${w.hebrew}</div><h1>${w.phonetic}</h1><p class="notice">${w.gloss}</p><section class="grid two"><div class="card"><p><span class="label">Transliteration</span><br>${w.translit}</p><p><span class="label">Root</span><br>${w.root}</p><p><span class="label">Part of Speech</span><br>${w.part}</p><p><span class="label">Category</span><br>${w.category}</p><p><span class="label">Level</span><br>${w.level}</p></div><div class="card"><h3>Pronunciation</h3><p class="notice">${w.pronunciation}</p></div></section><div class="deep-section"><h2>BDB-Style Meaning Range</h2><ul>${w.range.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="deep-section"><h2>School Explanation</h2><p>${w.note}</p></div><div class="deep-section"><h2>Usage / Context</h2><p>${w.usage}</p></div><div class="deep-section"><h2>Daily Drill</h2><ul>${w.drill.map(d=>`<li>${d}</li>`).join('')}</ul></div></div>`);
 $('studyOverlay').classList.add('active');document.body.style.overflow='hidden';
}
function closeStudy(){$('studyOverlay').classList.remove('active');document.body.style.overflow=''}
function renderVerbs(){const q=($('verbSearch')?.value||'').toLowerCase();const list=VERBS.filter(w=>Object.values(w).flat().join(' ').toLowerCase().includes(q));set('verbCount',`${list.length} verbs showing of ${VERBS.length}`);set('verbCards',list.map(w=>`<div class="card word-card" onclick="openStudy('${w.id}')"><span class="badge">${w.strong}</span><div class="bigword">${w.hebrew}</div><p class="phonetic">${w.phonetic}</p><p>${w.gloss}</p><p class="notice">Root: ${w.root}</p></div>`).join(''))}
function renderLevels(){set('levelGrid',LEVELS.map(l=>`<div class="card level-card"><span class="badge">Level ${l.level}</span><h3>${l.title}</h3><p>${l.goal}</p><p class="notice">${l.outcome}</p><a class="btn" href="lexicon.html">Study Level ${l.level}</a></div>`).join(''))}
function renderVowels(){set('vowelGrid',VOWELS.map(v=>`<div class="card"><span class="badge">${v.name}</span><div class="bigword">${v.mark}</div><h3>${v.sound}</h3><p>${v.note}</p></div>`).join(''))}
function renderParsing(){set('parseRows',PARSING.map(p=>`<tr><td class="bigword" style="font-size:34px">${p.form}</td><td>${p.lemma}</td><td><b>${p.parse}</b><br><span class="small">${p.note}</span></td><td>${p.meaning}</td></tr>`).join(''))}
document.addEventListener('DOMContentLoaded',()=>{renderStats();renderCategories();if($('lexiconCards'))renderLexicon();if($('verbCards'))renderVerbs();if($('levelGrid'))renderLevels();if($('vowelGrid'))renderVowels();if($('parseRows'))renderParsing()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('studyOverlay'))closeStudy()})
