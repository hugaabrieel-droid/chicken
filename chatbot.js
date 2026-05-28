// ==========================================
// DATA PENELITIAN TESIS 36 (RULE-BASED SYSTEM)
// ==========================================
const BOT_RESPONSES = {
  default: "Sori bro, gw gak paham maksud lu. Coba tanya hal lain seputar riset TESIS 36, atau klik aja tombol pintas di bawah biar cepet!",
  
  halo: "Halo juga bro! Ada yang bisa gw bantu seputar penelitian TESIS 36? Tanya aja santai.",
  
  ringkasan: `Ringkasan Penelitian TESIS 36:
  Riset kualitatif deskriptif ini menganalisis implementasi biosekuriti peternak unggas mandiri terhadap virus Avian Influenza (H5N1) di Kampung Sukaruas, Tasikmalaya. 
  
  Temuan Utama: Kesadaran peternak sudah ada, namun penerapan riil di lapangan masih memiliki celah kritis (seperti absennya APD/masker dan minimnya penyekatan disinfeksi area kandang). Hal ini terjadi akibat benturan keterbatasan modal ekonomi peternak rakyat dalam skala mandiri.`,
  
  jurnal: `Riset ini didukung oleh tiga pilar literatur utama, bro:
  1. Standar Biosekuriti Global FAO (2008) - Mengenai regulasi sanitasi peternakan di negara berkembang.
  2. Panduan Mitigasi Transmisi WHO (2024) - Melalui sistem GISRS untuk memutus rantai penularan zoonosis dari unggas ke manusia.
  3. Jurnal Epidemiologi Veteriner & Kebijakan Publik - Terkait analisis dampak finansial terhadap kepatuhan peternak kecil.`,
  
  lokasi: "Studi lapangan dilakukan secara mendalam di pemukiman peternakan unggas rakyat Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat. Pengambilan data primer dilaksanakan selama periode tanggal 21–24 Januari 2026.",

  tujuan: "Tujuan utama riset ini adalah memetakan tingkat kepatuhan higienitas kandang peternak mandiri, sekaligus mengidentifikasi hambatan sosio-ekonomi yang mereka hadapi secara nyata dalam memutus rantai penyebaran virus H5N1.",

  saran: "Rekomendasi Riset: Peternak mandiri memerlukan intervensi berupa subsidi disinfektan dan APD dari dinas terkait, serta model edukasi partisipatif yang tidak kaku agar mereka memahami urgensi pembatasan zonasi kandang secara konsisten.",

  jenis: "Riset ini murni menggunakan pendekatan KUALITATIF dengan metode deskriptif analitis. Data tidak diukur dengan angka statistik/kuantitatif, melainkan melalui teknik wawancara mendalam dan observasi lingkungan kandang untuk menjabarkan fenomena sosial di lapangan.",

  responden: "Subjek data atau informan utama riset ini meliputi para peternak unggas mandiri (skala kecil/rakyat) di wilayah Kampung Sukaruas. Pemilihan informan menggunakan teknik purposive sampling agar data yang diperoleh relevan dengan kriteria riset biosekuriti.",

  latar_belakang: "Latar Belakang: Virus Avian Influenza (H5N1) tetap menjadi ancaman endemis dengan risiko mutasi zoonosis yang tinggi. Kampung Sukaruas dipilih sebagai lokus karena sektor peternakan mandirinya aktif namun rentan akibat fluktuasi penerapan standar biosekuriti."
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
  <div id="cb-button" style="display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; cursor: default; box-shadow: 0 6px 20px rgba(78,94,56,0.35); user-select: none; font-size: 22px;">
    <span id="cb-icon" style="display: inline-block;">🐓</span>
  </div>
  
  <div id="cb-box" style="display: none; width: 330px; height: 450px; background: #ebdcb9; border: 1px solid rgba(92,74,42,0.15); border-radius: 16px; box-shadow: 0 12px 36px rgba(92,74,42,0.25); position: absolute; bottom: 65px; right: 0; flex-direction: column; overflow: hidden; pointer-events: auto;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 14px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <span>🐔</span>
        <span>Chatbot TESIS 36</span>
      </div>
      <div id="cb-close" onclick="toggleChat()" style="cursor: pointer; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; transition: background 0.2s;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
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
  #cb-button:hover { transform: scale(1.06); box-shadow: 0 8px 24px rgba(78,94,56,0.45); }
  #cb-button:hover #cb-icon { animation: cbRotate 0.5s ease-in-out; }
  #cb-button:active { transform: scale(0.95); }
  
  #cb-close:hover { background: rgba(250, 247, 241, 0.2); color: #ff8a8a; }
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
    appendMessage('bot', 'Halo! Gw Chatbot TESIS 36. Sekarang lu bisa tanya apa aja secara bebas, sapa gw, atau geser tombol cepat di bawah biar instan.');
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

// LOGIKA DRAG TERBARU: Menyelesaikan isu bug ketukan sekali/long click di Smartphone
function makeDraggable(elmnt, dragAnchor) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let startX = 0, startY = 0;
  let isMoved = false;

  dragAnchor.onmousedown = startDrag;
  dragAnchor.ontouchstart = startDrag;

  function startDrag(e) {
    e = e || window.event;
    isMoved = false;
    
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    startX = clientX;
    startY = clientY;
    pos3 = clientX;
    pos4 = clientY;

    if (e.type === 'mousedown') {
      document.onmouseup = stopDrag;
      document.onmousemove = moveElement;
    } else if (e.type === 'touchstart') {
      document.ontouchend = stopDrag;
      document.ontouchmove = moveElement;
    }
  }

  function moveElement(e) {
    e = e || window.event;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    // Jika bergeser lebih dari 5 piksel, tandai sebagai pergerakan geser (drag)
    if (Math.abs(clientX - startX) > 5 || Math.abs(clientY - startY) > 5) {
      isMoved = true;
    }

    pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    pos3 = clientX;
    pos4 = clientY;

    let newTop = elmnt.offsetTop - pos2;
    let newLeft = elmnt.offsetLeft - pos1;

    const maxTop = window.innerHeight - 60;
    const maxLeft = window.innerWidth - 70;
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

  function stopDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;

    // Jika posisi tidak bergeser banyak, berarti eksekusi sebagai klik biasa (Langsung responsif!)
    if (!isMoved) {
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
