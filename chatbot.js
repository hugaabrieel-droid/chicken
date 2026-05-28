// ==========================================
// DATA PENELITIAN TESIS 36 (REVISI PADAT & BERISI)
// ==========================================
const BOT_RESPONSES = {
  default: "Sori bro, gw gak paham. Coba tanya hal lain seputar riset TESIS 36, atau klik tombol pintas di bawah biar cepet!",
  
  halo: "Halo bro! Ada yang bisa gw bantu seputar penelitian kualitatif TESIS 36? Tanya aja santai.",
  
  ringkasan: `Inti Riset: Riset kualitatif ini menganalisis celah kritis biosekuriti peternak unggas rakyat terhadap virus Flu Burung (H5N1) di Kampung Sukaruas, Tasikmalaya.
  Temuan Utama: Kebanyakan peternak mandiri abai APD (masker/baju khusus) dan minim sekat disinfeksi kandang akibat keterbatasan modal ekonomi.`,
  
  jurnal: `Referensi Utama Riset:
  1. Standar Sanitasi Global: Panduan Biosekuriti FAO (2008).
  2. Mitigasi Transmisi Unggas-Manusia: Data GISRS WHO (2024).
  3. Dampak Ekonomi: Jurnal Epidemiologi Kesehatan Komunitas terkait kendala finansial peternak kecil.`,
  
  lokasi: "Lokasi & Waktu: Sektor peternakan unggas Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat. Pengambilan data lapangan dilakukan pada 21–24 Januari 2026.",

  tujuan: "Tujuan: Mengidentifikasi sejauh mana penerapan higienitas kandang oleh peternak mandiri, sekaligus memetakan hambatan finansial dan struktural nyata mereka dalam memutus rantai penyebaran H5N1.",

  saran: "Rekomendasi Riset: Peternak butuh subsidi nyata untuk disinfektan/APD dari pemerintah daerah, serta edukasi biosekuriti yang tidak kaku agar sekat pembatas area bersih-kotor kandang bisa diterapkan.",

  jenis: "Jenis Penelitian: Kualitatif deskriptif (bukan kuantitatif). Pendekatan berfokus pada observasi fisik kandang dan wawancara mendalam untuk memahami perilaku peternak secara kontekstual.",

  responden: "Subjek/Responden: Para peternak unggas mandiri (skala kecil/rakyat) di Kampung Sukaruas. Pemilihan informan menggunakan teknik purposive sampling agar data yang diperoleh relevan dan akurat.",

  latar_belakang: "Latar Belakang: Virus Avian Influenza (H5N1) masih endemis dan mengancam peternakan rakyat. Kampung Sukaruas dipilih karena aktivitas peternakan mandirinya tinggi, namun penerapan biosekuritinya fluktuatif akibat benturan ekonomi."
};

function getSimulatedResponse(inputText) {
  const text = inputText.toLowerCase();
  if (text.includes("halo") || text.includes("hai") || text === "p") return BOT_RESPONSES.halo;
  if (text.includes("ringkasan") || text.includes("rangkuman") || text.includes("kesimpulan") || text.includes("inti")) return BOT_RESPONSES.ringkasan;
  if (text.includes("jurnal") || text.includes("referensi") || text.includes("pustaka") || text.includes("buku")) return BOT_RESPONSES.jurnal;
  if (text.includes("lokasi") || text.includes("tempat") || text.includes("di mana") || text.includes("tasikmalaya")) return BOT_RESPONSES.lokasi;
  if (text.includes("tujuan") || text.includes("maksud") || text.includes("buat apa")) return BOT_RESPONSES.tujuan;
  if (text.includes("saran") || text.includes("rekomendasi") || text.includes("solusi")) return BOT_RESPONSES.saran;
  if (text.includes("jenis") || text.includes("kualitatif") || text.includes("kuantitatif") || text.includes("metode")) return BOT_RESPONSES.jenis;
  if (text.includes("responden") || text.includes("informan") || text.includes("peternak")) return BOT_RESPONSES.responden;
  if (text.includes("latar belakang") || text.includes("alasan") || text.includes("kenapa")) return BOT_RESPONSES.latar_belakang;
  return BOT_RESPONSES.default;
}

const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 25px; right: 25px; z-index: 99999; font-family: 'DM Sans', sans-serif; touch-action: none;">
  <div id="cb-button" style="display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; cursor: pointer; box-shadow: 0 6px 20px rgba(78,94,56,0.4); user-select: none; font-size: 24px;">
    <span id="cb-icon" style="display: inline-block;">🐓</span>
  </div>
  
  <div id="cb-box" style="display: none; width: 330px; max-width: 90vw; height: 450px; max-height: 80vh; background: #ebdcb9; border: 1px solid rgba(92,74,42,0.15); border-radius: 16px; box-shadow: 0 12px 36px rgba(92,74,42,0.25); position: absolute; bottom: 65px; right: 0; flex-direction: column; overflow: hidden; pointer-events: auto;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 14px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <span>🐔</span>
        <span>Chatbot TESIS 36</span>
      </div>
      <span id="cb-close" onclick="toggleChat(event)" style="cursor: pointer; font-size: 14px; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,0.1); transition: all 0.2s;">✕</span>
    </div>
    
    <div id="cb-messages" style="flex: 1; padding: 14px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 10px; background: #ebdcb9;"></div>
    
    <div id="cb-quick-replies" style="display: flex; flex-direction: row; gap: 6px; padding: 6px 14px; background: #ebdcb9; overflow-x: auto; white-space: nowrap; scroll-behavior: smooth; -webkit-overflow-scrolling: touch;">
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
  #cb-button:hover { transform: scale(1.06); box-shadow: 0 8px 24px rgba(78,94,56,0.5); }
  #cb-button:hover #cb-icon { animation: cbRotate 0.5s ease-in-out; }
  #cb-button:active { transform: scale(0.95); }
  
  #cb-close:hover { background: rgba(255,255,255,0.25); transform: rotate(90deg); }
  #cb-input-container:focus-within { border-color: #6b7c52; box-shadow: 0 4px 14px rgba(107,124,82,0.15); }
  #cb-send:hover { background: #4e5e38; }
  
  .cb-qr-btn { display: inline-flex; align-items: center; background: rgba(253, 250, 244, 0.8); border: 1px solid rgba(92,74,42,0.12); color: #5c4a2a; padding: 5px 10px; border-radius: 12px; font-size: 11px; cursor: pointer; font-weight: 500; transition: all 0.2s; flex-shrink: 0; box-shadow: 0 1px 3px rgba(92,74,42,0.03); }
  .cb-qr-btn:hover { background: #6b7c52; color: #ffffff; border-color: #6b7c52; box-shadow: 0 2px 6px rgba(107,124,82,0.12); }
  
  #cb-quick-replies::-webkit-scrollbar { height: 0px; background: transparent; }
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
  
  // Deteksi Navigasi vs Refresh Halaman
  const isNavigating = sessionStorage.getItem('cb_navigating');
  if (!isNavigating) {
    // Kalau murni REFRESH atau TAB BARU, hapus histori agar chat bersih lagi
    localStorage.removeItem('chat_history');
  }
  sessionStorage.removeItem('cb_navigating');
  
  // Set flag jika user klik link internal (pindah page website)
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sessionStorage.setItem('cb_navigating', 'true');
    });
  });

  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];

  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Gw Chatbot TESIS 36. Silakan tanya apa saja secara bebas atau geser pintasan di bawah.');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
  
  checkInputToggle();
  makeSmartInteraction(cbWidget, cbButton);
}

function toggleChat(e) {
  if (e) e.stopPropagation();
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
    qrContainer.style.display = 'none';
  } else {
    qrContainer.style.display = 'flex';
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

// SOLUSI BUG HP: Logika Pintar Memisahkan Drag (Geser) dan Click (Sentuh)
function makeSmartInteraction(elmnt, dragAnchor) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let startX = 0, startY = 0;
  let isDragging = false;
  const dragThreshold = 6; // Toleransi pixel pergerakan untuk membedakan geser vs klik

  dragAnchor.addEventListener('mousedown', startDrag);
  dragAnchor.addEventListener('touchstart', startDrag, { passive: true });

  function startDrag(e) {
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    startX = clientX;
    startY = clientY;
    pos3 = clientX;
    pos4 = clientY;
    isDragging = false;

    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', endDrag);
    } else {
      document.addEventListener('touchmove', onDrag, { passive: false });
      document.addEventListener('touchend', endDrag);
    }
  }

  function onDrag(e) {
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    // Hitung jarak pergerakan dari posisi awal
    if (Math.abs(clientX - startX) > dragThreshold || Math.abs(clientY - startY) > dragThreshold) {
      isDragging = true;
    }

    if (!isDragging) return;
    if (e.cancelable) e.preventDefault(); // Cegah layar hp ikut scroll pas tombol digeser

    pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    pos3 = clientX;
    pos4 = clientY;

    let newTop = elmnt.offsetTop - pos2;
    let newLeft = elmnt.offsetLeft - pos1;

    // Batasan agar widget gak keluar dari layar browser
    const maxTop = window.innerHeight - 60;
    const maxLeft = window.innerWidth - 65;
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

  function endDrag() {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', endDrag);

    // Jika user TIDAK melakukan drag bermakna, berarti dia melakukan KLIK/SENTUH murni
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
