// ==========================================
// DATA PENELITIAN TESIS 36 (REVISI MATANG & PADAT)
// ==========================================
const BOT_RESPONSES = {
  default: "Sori bro, gw gak paham maksud lu. Coba tanya hal lain seputar riset TESIS 36, atau klik aja tombol pintas di bawah biar cepet!",
  
  halo: "Halo juga bro! Ada yang bisa gw bantu seputar penelitian TESIS 36? Tanya aja santai.",
  
  ringkasan: `Riset kualitatif deskriptif ini berfokus pada analisis perilaku dan kendala peternak unggas mandiri dalam menerapkan biosekuriti terhadap virus Avian Influenza (H5N1) di Kampung Sukaruas, Tasikmalaya.

Temuan Utama lapangan menunjukkan adanya celah biosekuriti yang kritis:
1. Minimnya penggunaan APD (masker/baju khusus) saat kontak langsung dengan unggas.
2. Absennya sekat desinfeksi kendaraan dan pembatasan zona steril di area kandang.
3. Faktor determinan utama adalah hambatan ekonomi (keterbatasan modal) pada sektor peternakan rakyat untuk membangun fasilitas standar.`,
  
  jurnal: `Riset ini dipijak oleh tiga landasan literatur utama:
1. Standardisasi Biosekuriti Global (FAO, 2008) - Mengenai pedoman teknis higienitas peternakan skala kecil-menengah.
2. Protokol Mitigasi Zoonosis (WHO, 2024) - Panduan pengawasan transmisi influenza dari unggas ke manusia berbasis GISRS.
3. Studi Epidemiologi & Sosio-Ekonomi - Menyoroti korelasi antara keterbatasan finansial peternak mandiri dengan kerentanan penyebaran wabah di daerah rural.`,
  
  lokasi: "Studi kasus lapangan ini dilaksanakan di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat. Pengambilan data primer berupa wawancara mendalam dan observasi kandang dilakukan pada tanggal 21–24 Januari 2026 kemarin.",

  tujuan: "Tujuan utama riset ini adalah mengidentifikasi tingkat pemahaman peternak mandiri mengenai rantai penularan H5N1, mengevaluasi implementasi nyata biosekuriti di kandang, serta memetakan hambatan struktural dan ekonomi yang dihadapi peternak dalam memutus mata rantai virus.",

  saran: "Rekomendasi taktis dari riset ini meliputi:\n1. Pemerintah Daerah perlunya skema subsidi penyediaan desinfektan dan APD bagi peternak mandiri.\n2. Pendekatan edukasi non-formal yang berkala (tidak kaku/teoretis) agar peternak paham pentingnya zonasi kandang dan proteksi diri.",

  jenis: "Riset ini murni menggunakan pendekatan KUALITATIF DESKRIPTIF dengan metode studi kasus. Riset tidak memakai olah data statistik (kuantitatif), melainkan berfokus pada kedalaman data, narasi perilaku, dan analisis kontekstual di lapangan.",

  responden: "Informan utama (responden) ditentukan melalui teknik purposive sampling, yaitu para peternak unggas mandiri/rakyat di Kampung Sukaruas yang mengelola kandang secara mandiri tanpa terikat korporasi besar, sehingga didapatkan data hambatan modal yang valid.",

  latar_belakang: "Didasari oleh fluktuasi kasus Avian Influenza (H5N1) yang masih mengancam sektor peternakan rakyat. Kampung Sukaruas dipilih sebagai lokus karena mobilitas peternakan mandirinya tinggi, namun di sisi lain memiliki kerentanan besar akibat penerapan biosekuriti yang masih minim karena benturan modal."
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
  <div id="cb-button" style="display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; cursor: default; box-shadow: 0 6px 20px rgba(78,94,56,0.35); user-select: none;">
    <span id="cb-icon" style="font-size: 22px; display: inline-block;">🐓</span>
  </div>
  
  <div id="cb-box" style="display: none; width: 330px; height: 450px; background: #ebdcb9; border: 1px solid rgba(92,74,42,0.15); border-radius: 16px; box-shadow: 0 12px 36px rgba(92,74,42,0.25); position: absolute; bottom: 65px; right: 0; flex-direction: column; overflow: hidden; pointer-events: auto;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 14px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <span>🐔</span>
        <span>Chatbot TESIS 36</span>
      </div>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 11px; font-weight: bold; background: rgba(255,255,255,0.15); padding: 4px 8px; border-radius: 12px; transition: background 0.2s;">CLOSE</span>
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
  .cb-msg { padding: 10px 14px; border-radius: 14px; max-width: 85%; line-height: 1.45; word-wrap: break-word; box-sizing: border-box; animation: cbPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 3px; box-shadow: 0 2px 5px rgba(92,74,42,0.08); white-space: pre-line; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 3px; box-shadow: 0 2px 5px rgba(78,94,56,0.15); }
  
  #cb-button { transition: transform 0.2s, box-shadow 0.2s; }
  #cb-button:hover { transform: scale(1.06); box-shadow: 0 8px 24px rgba(78,94,56,0.4); }
  #cb-button:hover #cb-icon { animation: cbRotate 0.5s ease-in-out; }
  #cb-button:active { transform: scale(0.94); }
  
  #cb-close:hover { background: rgba(255,255,255,0.3) !important; }
  #cb-input-container:focus-within { border-color: #6b7c52; box-shadow: 0 4px 14px rgba(107,124,82,0.15); }
  #cb-send:hover { background: #4e5e38; }
  
  .cb-qr-btn { display: inline-flex; align-items: center; background: rgba(253, 250, 244, 0.8); border: 1px solid rgba(92,74,42,0.12); color: #5c4a2a; padding: 5px 11px; border-radius: 12px; font-size: 11px; cursor: pointer; font-weight: 500; transition: all 0.2s; flex-shrink: 0; box-shadow: 0 1px 3px rgba(92,74,42,0.03); }
  .cb-qr-btn:hover { background: #6b7c52; color: #ffffff; border-color: #6b7c52; }
  
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
    appendMessage('bot', 'Halo! Gw Chatbot TESIS 36. Sekarang lu bisa tanya apa aja secara bebas seputar riset, sapa gw, atau geser tombol cepat di bawah biar instan.');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
  
  checkInputToggle();
  setupSmartTouchDrag(cbWidget, cbButton);
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

// SISTEM FIX MOBILE BUG: Memisahkan Event Click dan Drag secara Sempurna via Threshold Jarak
function setupSmartTouchDrag(elmnt, dragAnchor) {
  let startX = 0, startY = 0;
  let posX1 = 0, posX2 = 0, posY1 = 0, posY2 = 0;
  let moveThreshold = 6; // Nilai piksel batas toleransi getaran jari sebelum dianggap 'drag'
  let isDragging = false;

  // Handler PC
  dragAnchor.addEventListener('mousedown', (e) => {
    isDragging = false;
    startX = e.clientX;
    startY = e.clientY;
    posX3 = e.clientX;
    posX4 = e.clientY;

    document.onmousemove = (ev) => {
      if (Math.abs(ev.clientX - startX) > moveThreshold || Math.abs(ev.clientY - startY) > moveThreshold) {
        isDragging = true;
      }
      if (isDragging) {
        posX1 = posX3 - ev.clientX;
        posY1 = posX4 - ev.clientY;
        posX3 = ev.clientX;
        posX4 = ev.clientY;
        updateElementPosition(elmnt, elmnt.offsetTop - posY1, elmnt.offsetLeft - posX1);
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      if (!isDragging) toggleChat();
    };
  });

  // Handler MOBILE Layar Sentuh (Aman Sekali Klik)
  dragAnchor.addEventListener('touchstart', (e) => {
    isDragging = false;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    posX3 = startX;
    posX4 = startY;
  }, { passive: true });

  dragAnchor.addEventListener('touchmove', (e) => {
    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;

    if (Math.abs(currentX - startX) > moveThreshold || Math.abs(currentY - startY) > moveThreshold) {
      isDragging = true;
    }

    if (isDragging) {
      posX1 = posX3 - currentX;
      posY1 = posX4 - currentY;
      posX3 = currentX;
      posX4 = currentY;
      updateElementPosition(elmnt, elmnt.offsetTop - posY1, elmnt.offsetLeft - posX1);
    }
  }, { passive: true });

  dragAnchor.addEventListener('touchend', () => {
    if (!isDragging) toggleChat();
  });
}

function updateElementPosition(elmnt, top, left) {
  const maxTop = window.innerHeight - 60;
  const maxLeft = window.innerWidth - 70;
  if (top < 10) top = 10;
  if (top > maxTop) top = maxTop;
  if (left < 10) left = 10;
  if (left > maxLeft) left = maxLeft;

  elmnt.style.top = top + "px";
  elmnt.style.left = left + "px";
  elmnt.style.bottom = "auto";
  elmnt.style.right = "auto";

  adjustChatBoxPosition();
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
