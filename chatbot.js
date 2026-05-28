// ==========================================
// DATA PENELITIAN TESIS 36 (RULE-BASED SYSTEM)
// ==========================================
const BOT_RESPONSES = {
  default: "Sori bro, gw gak paham maksud lu. Coba tanya hal lain seputar riset TESIS 36, atau klik aja tombol pintas di bawah biar cepet!",
  
  halo: "Halo juga bro! Ada yang bisa gw bantu seputar penelitian TESIS 36? Tanya aja santai.",
  
  ringkasan: `Nih ringkasan riset gw:
  Riset kualitatif ini nganalisis praktik biosekuriti peternak unggas terhadap virus Flu Burung (H5N1) di Kampung Sukaruas, Tasikmalaya. 
  
  Temuan utamanya: masih banyak celah kritis karena peternak jarang pakai APD (masker/baju khusus) dan minim sekat disinfeksi. Faktor utamanya jelas karena benturan modal ekonomi peternak rakyat.`,
  
  jurnal: `Riset ini didukung beberapa jurnal utama, bro:
  1. FAO (2008) - Soal standar sanitasi global & biosekuriti flu burung.
  2. WHO (2024) - Panduan mitigasi transmisi dari unggas ke manusia (GISRS).
  3. Jurnal Epidemiologi & Kesehatan Komunitas terkait kendala finansial peternak kecil.`,
  
  lokasi: "Riset lapangan ini diambil di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat, pas tanggal 21–24 Januari 2026 kemarin bro.",

  tujuan: "Tujuan riset ini tuh buat nyari tahu sejauh mana peternak mandiri paham dan nerapin higienitas kandang, sekaligus nyari tahu hambatan nyata mereka di lapangan dalam mencegah penyebaran H5N1.",

  saran: "Saran dari riset ini: peternak buat butuh bantuan modal atau subsidi disinfektan/APD dari pemerintah, plus edukasi berkala yang gak kaku biar mereka paham pentingnya masker sama sekat pembatas kandang.",

  jenis: "Riset ini pake jenis penelitian KUALITATIF deskriptif, bro. Jadi gw gak pake angka-angka statistik atau rumus kuantitatif, melainkan fokus ke analisis mendalam terhadap perilaku dan wawancara nyata di lapangan.",

  responden: "Data responden atau informan di riset ini adalah para peternak unggas mandiri/rakyat yang ada di Kampung Sukaruas, Tasikmalaya. Pemilihannya pake teknik purposive sampling supaya dapet peternak yang emang sesuai kriteria riset.",

  latar_belakang: "Latar belakang riset ini karena virus Avian Influenza (H5N1) masih jadi ancaman nyata buat peternakan rakyat. Kampung Sukaruas dipilih karena sektor peternakan unggas mandiri di sana aktif, tapi pemahaman soal biosekuriti ketat masih fluktuatif akibat kendala ekonomi."
};

// Fungsi pencari jawaban berdasarkan kata kunci (Keyword Matching)
function getSimulatedResponse(inputText) {
  const text = inputText.toLowerCase();
  
  if (text.includes("halo") || text.includes("hai") || text.includes(" p ") || text === "p") {
    return BOT_RESPONSES.halo;
  }
  if (text.includes("ringkasan") || text.includes("rangkuman") || text.includes("kesimpulan") || text.includes("tentang") || text.includes("inti")) {
    return BOT_RESPONSES.ringkasan;
  }
  if (text.includes("jurnal") || text.includes("buku") || text.includes("referensi") || text.includes("dokumen") || text.includes("pustaka")) {
    return BOT_RESPONSES.jurnal;
  }
  if (text.includes("lokasi") || text.includes("tempat") || text.includes("di mana") || text.includes("waktu") || text.includes("kapan") || text.includes("tasikmalaya")) {
    return BOT_RESPONSES.lokasi;
  }
  if (text.includes("tujuan") || text.includes("maksud") || text.includes("buat apa")) {
    return BOT_RESPONSES.tujuan;
  }
  if (text.includes("saran") || text.includes("rekomendasi") || text.includes("solusi") || text.includes("perbaikan")) {
    return BOT_RESPONSES.saran;
  }
  if (text.includes("jenis") || text.includes("kualitatif") || text.includes("kuantitatif") || text.includes("metode") || text.includes("metodologi")) {
    return BOT_RESPONSES.jenis;
  }
  if (text.includes("responden") || text.includes("informan") || text.includes("peternak") || text.includes("subjek") || text.includes("objek")) {
    return BOT_RESPONSES.responden;
  }
  if (text.includes("latar belakang") || text.includes("alasan") || text.includes("kenapa") || text.includes("mengapa")) {
    return BOT_RESPONSES.latar_belakang;
  }
  
  return BOT_RESPONSES.default;
}

const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 25px; right: 90px; z-index: 99999; font-family: 'DM Sans', sans-serif; touch-action: none;">
  <div id="cb-button" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100px; height: 48px; border-radius: 24px; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; cursor: move; box-shadow: 0 6px 20px rgba(78,94,56,0.3); user-select: none; font-size: 14px; font-weight: 500;">
    <span id="cb-icon" style="font-size: 18px; display: inline-block;">🐓</span>
    <span>Chat</span>
  </div>
  
  <div id="cb-box" style="display: none; width: 330px; height: 450px; background: #ebdcb9; border: 1px solid rgba(92,74,42,0.15); border-radius: 16px; box-shadow: 0 12px 36px rgba(92,74,42,0.25); position: absolute; bottom: 65px; right: 0; flex-direction: column; overflow: hidden; pointer-events: auto;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 14px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <span>🐔</span>
        <span>Chatbot TESIS 36</span>
      </div>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 22px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    
    <div id="cb-messages" style="flex: 1; padding: 14px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 10px; background: #ebdcb9;"></div>
    
    <div id="cb-quick-replies" style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 6px 14px; background: #ebdcb9; transition: all 0.25s ease-in-out; max-height: 110px; opacity: 1; overflow: hidden;">
      <button class="cb-qr-btn" onclick="sendQuickReply('Minta ringkasan penelitian dong')">📋 Ringkasan</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('Apa saja jurnal pendukung riset ini?')">📚 Jurnal Pustaka</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('Penelitian ini jenis risetnya kualitatif atau kuantitatif?')">🧐 Jenis Riset</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('Siapa saja data responden peternak di riset ini?')">🐓 Responden</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('Penelitian ini lokasinya di mana?')">📍 Lokasi & Waktu</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('Apa rekomendasi atau saran dari riset ini?')">💡 Solusi & Saran</button>
    </div>

    <div style="padding: 10px 14px; background: #ebdcb9;">
      <div id="cb-input-container" style="display: flex; align-items: center; background: #fdfaf4; border: 1px solid rgba(92,74,42,0.2); border-radius: 22px; padding: 4px 6px 4px 14px; box-shadow: 0 4px 12px rgba(92,74,42,0.08); transition: border-color 0.2s, box-shadow 0.2s;">
        <input type="text" id="cb-input" placeholder="Ketik disini!" onkeypress="handleKey(event)" oninput="checkInputToggle()" style="flex: 1; border: none; padding: 8px 0; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
        <button id="cb-send" onclick="sendMessage()" style="background: #6b7c52; border: none; color: #ffffff; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; transition: background 0.2s; box-shadow: 0 2px 6px rgba(107,124,82,0.2);">➔</button>
      </div>
    </div>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', chatbotHTML);

const style = document.createElement('style');
style.innerHTML = `
  @keyframes cbPop {
    0% { transform: scale(0.7) translateY(10px); opacity: 0; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }
  @keyframes cbRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .cb-msg { padding: 10px 14px; border-radius: 14px; max-width: 80%; line-height: 1.45; word-wrap: break-word; box-sizing: border-box; animation: cbPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 3px; box-shadow: 0 2px 5px rgba(92,74,42,0.08); white-space: pre-line; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 3px; box-shadow: 0 2px 5px rgba(78,94,56,0.15); }
  
  #cb-button { transition: transform 0.2s, box-shadow 0.2s; }
  #cb-button:hover { transform: scale(1.04); box-shadow: 0 8px 24px rgba(78,94,56,0.4); }
  #cb-button:hover #cb-icon { animation: cbRotate 0.6s ease-in-out; }
  #cb-button:active { transform: scale(0.96); }
  
  #cb-input-container:focus-within { border-color: #6b7c52; box-shadow: 0 4px 14px rgba(107,124,82,0.15); }
  #cb-send:hover { background: #4e5e38; }
  
  /* Styling tombol QR yang lebih ringkas dan pas di grid */
  .cb-qr-btn { background: rgba(253, 250, 244, 0.65); border: 1px solid rgba(92,74,42,0.1); color: #5c4a2a; padding: 6px 10px; border-radius: 8px; font-size: 11px; cursor: pointer; font-weight: 500; transition: all 0.2s; text-align: left; width: 100%; display: flex; align-items: center; box-shadow: 0 1px 3px rgba(92,74,42,0.03); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cb-qr-btn:hover { background: #6b7c52; color: #ffffff; border-color: #6b7c52; transform: translateY(-1px); box-shadow: 0 2px 6px rgba(107,124,82,0.12); }
  
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(92,74,42,0.2); border-radius: 2px; }
`;
document.head.appendChild(style);

const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');
const cbWidget = document.getElementById('cb-widget');
const cbButton = document.getElementById('cb-button');
const qrContainer = document.getElementById('cb-quick-replies');

function initChatbot() {
  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }
  
  const isNavigating = sessionStorage.getItem('cb_navigating');
  if (!isNavigating) {
    localStorage.removeItem('chat_history');
  }
  sessionStorage.removeItem('cb_navigating');
  
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sessionStorage.setItem('cb_navigating', 'true');
    });
  });

  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];

  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Gw Chatbot TESIS 36. Sekarang lu bisa tanya apa aja secara bebas, sapa gw, atau pencet tombol cepat di bawah biar instan.');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
  
  checkInputToggle();
  makeDraggable(cbWidget, cbButton);
}

function toggleChat() {
  if (chatBox.style.display === 'none' || chatBox.style.display === '') {
    chatBox.style.display = 'flex';
    localStorage.setItem('chat_open', 'true');
    adjustChatBoxPosition();
  } else {
    chatBox.style.display = 'none';
    localStorage.setItem('chat_open', 'false');
  }
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendQuickReply(text) {
  const inputEl = document.getElementById('cb-input');
  if (!inputEl) return;
  inputEl.value = text;
  checkInputToggle(); 
  sendMessage();
}

function checkInputToggle() {
  const inputEl = document.getElementById('cb-input');
  if (!inputEl) return;
  
  const inputVal = inputEl.value.trim();
  if (inputVal.length > 0) {
    qrContainer.style.display = 'none'; // Sembunyikan grid total pas ngetik biar space chat lega
  } else {
    qrContainer.style.display = 'grid'; // Tampilkan kembali grid pas input kosong
  }
}

function sendMessage() {
  const input = document.getElementById('cb-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text, true);
  input.value = '';
  checkInputToggle(); 

  const loadingDiv = document.createElement('div');
  loadingDiv.classList.add('cb-msg', 'cb-bot');
  loadingDiv.id = 'cb-typing-indicator';
  loadingDiv.innerText = 'Ketik...';
  msgContainer.appendChild(loadingDiv);
  msgContainer.scrollTop = msgContainer.scrollHeight;

  setTimeout(() => {
    const indicator = document.getElementById('cb-typing-indicator');
    if (indicator) indicator.remove();

    const botReply = getSimulatedResponse(text);
    appendMessage('bot', botReply, true);
  }, 400); 
}

function appendMessage(sender, text, save = false) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('cb-msg', `cb-${sender}`);
  msgDiv.innerText = text;
  msgContainer.appendChild(msgDiv);
  msgContainer.scrollTop = msgContainer.scrollHeight;

  if (save) {
    const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
    savedMessages.push({ sender, text });
    localStorage.setItem('chat_history', JSON.stringify(savedMessages));
  }
}

function makeDraggable(elmnt, dragAnchor) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let isDragging = false;

  dragAnchor.onmousedown = dragMouseDown;
  dragAnchor.ontouchstart = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    isDragging = false;
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    pos3 = clientX;
    pos4 = clientY;

    if (e.type === 'mousedown') {
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    } else if (e.type === 'touchstart') {
      document.ontouchend = closeDragElement;
      document.ontouchmove = elementDrag;
    }
  }

  function elementDrag(e) {
    e = e || window.event;
    isDragging = true;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    pos3 = clientX;
    pos4 = clientY;

    let newTop = elmnt.offsetTop - pos2;
    let newLeft = elmnt.offsetLeft - pos1;

    const maxTop = window.innerHeight - 60;
    const maxLeft = window.innerWidth - 140;
    if (newTop < 10) newTop = 10;
    if (newTop > maxTop) newTop = maxTop;
    if (newLeft < 10) newLeft = 10;
    if (newLeft > maxLeft) newLeft = maxLeft;

    elmnt.style.top = newTop + "px";
    elmnt.style.left = newLeft + "px";
    elmnt.style.bottom = "auto";
    elmnt.style.right = "auto";

    adjustChatBoxPosition();
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;

    if (!isDragging) {
      toggleChat();
    }
  }
}

function adjustChatBoxPosition() {
  const rect = cbWidget.getBoundingClientRect();
  if (rect.left < 350) {
    chatBox.style.right = "auto";
    chatBox.style.left = "0px";
  } else {
    chatBox.style.left = "auto";
    chatBox.style.right = "0px";
  }

  if (rect.top < 470) {
    chatBox.style.bottom = "auto";
    chatBox.style.top = "60px";
  } else {
    chatBox.style.top = "auto";
    chatBox.style.bottom = "65px";
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
