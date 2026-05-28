const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 25px; right: 90px; z-index: 99999; font-family: 'DM Sans', sans-serif; touch-action: none;">
  <div id="cb-button" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 130px; height: 48px; border-radius: 24px; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; cursor: move; box-shadow: 0 6px 20px rgba(78,94,56,0.3); user-select: none; font-size: 13.5px; font-weight: 500;">
    <span id="cb-icon" style="font-size: 18px; display: inline-block;">✨</span>
    <span>Tanya AI</span>
  </div>
  
  <div id="cb-box" style="display: none; width: 330px; height: 450px; background: #ebdcb9; border: 1px solid rgba(92,74,42,0.15); border-radius: 16px; box-shadow: 0 12px 36px rgba(92,74,42,0.25); position: absolute; bottom: 65px; right: 0; flex-direction: column; overflow: hidden; pointer-events: auto;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 14px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <span>🤖</span>
        <span>Asisten Pintar TESIS 36</span>
      </div>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 22px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    
    <div id="cb-messages" style="flex: 1; padding: 14px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 10px; background: #ebdcb9;"></div>
    
    <div id="cb-quick-replies" style="display: flex; flex-direction: column; gap: 5px; padding: 8px 14px; background: #ebdcb9;">
      <button class="cb-qr-btn" onclick="sendQuickReply('📋 Ringkasan Penelitian')">📋 Ringkasan Penelitian</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('📚 Jurnal Pendukung')">📚 Jurnal Pendukung</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('📍 Lokasi & Waktu')">📍 Lokasi & Waktu</button>
    </div>

    <div style="padding: 10px 14px; background: #ebdcb9;">
      <div id="cb-input-container" style="display: flex; align-items: center; background: #fdfaf4; border: 1px solid rgba(92,74,42,0.2); border-radius: 22px; padding: 4px 6px 4px 14px; box-shadow: 0 4px 12px rgba(92,74,42,0.08); transition: border-color 0.2s, box-shadow 0.2s;">
        <input type="text" id="cb-input" placeholder="Tanya sesuatu..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 8px 0; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
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
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 3px; box-shadow: 0 2px 5px rgba(92,74,42,0.08); }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 3px; box-shadow: 0 2px 5px rgba(78,94,56,0.15); }
  
  #cb-button { transition: transform 0.2s, box-shadow 0.2s; }
  #cb-button:hover { transform: scale(1.04); box-shadow: 0 8px 24px rgba(78,94,56,0.4); }
  #cb-button:hover #cb-icon { animation: cbRotate 0.6s ease-in-out; }
  #cb-button:active { transform: scale(0.96); }
  
  #cb-input-container:focus-within { border-color: #6b7c52; box-shadow: 0 4px 14px rgba(107,124,82,0.15); }
  #cb-send:hover { background: #4e5e38; }
  
  .cb-qr-btn { background: rgba(253, 250, 244, 0.6); border: 1px solid rgba(92,74,42,0.1); color: #5c4a2a; padding: 7px 12px; border-radius: 10px; font-size: 11.5px; cursor: pointer; font-weight: 500; transition: all 0.2s; text-align: left; width: 100%; display: flex; align-items: center; box-shadow: 0 1px 3px rgba(92,74,42,0.03); }
  .cb-qr-btn:hover { background: #6b7c52; color: #ffffff; border-color: #6b7c52; transform: translateX(2px); box-shadow: 0 2px 6px rgba(107,124,82,0.12); }
  
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(92,74,42,0.2); border-radius: 2px; }
`;
document.head.appendChild(style);

const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');
const cbWidget = document.getElementById('cb-widget');
const cbButton = document.getElementById('cb-button');

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
    appendMessage('bot', 'Halo! Gw sistem AI TESIS 36. Ada yang bisa dibantu terkait riset biosekuriti Avian Influenza (H5N1)? Lu bisa nanya ringkasan atau minta jurnal pendukung.');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
  
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
  document.getElementById('cb-input').value = text;
  sendMessage();
}

function sendMessage() {
  const input = document.getElementById('cb-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text, true);
  input.value = '';

  setTimeout(() => {
    const query = text.toLowerCase();
    let reply = '';

    // 1. Obrolan Santai / Sapaan (User-Friendly Conversational Flow)
    if (query.match(/(halo|hai|hello|hey|hei|p|permisi|assalamualaikum|spada)/)) {
      reply = 'Halo juga! Ada yang bisa gw bantu seputar website atau hasil riset Avian Influenza tim TESIS 36?';
    } else if (query.match(/(kabar|gimana|apa kabar|how are you)/)) {
      reply = 'Kabar baik banget! Gw siap bantu nemuin informasi ringkasan atau jurnal di web ini. Lu gimana?';
    } else if (query.match(/(makasih|terima kasih|thanks|thank you|ok|oke|siap)/)) {
      reply = 'Sama-sama! Senang bisa bantu. Kalau ada bagian bab yang kurang jelas, tanyain lagi aja ya.';
    } else if (query.match(/(siapa|nama|lu siapa|identity|bot)/)) {
      reply = 'Gw Asisten Pintar berbasis AI yang dipasang khusus buat bantu pembaca memahami seluruh isi materi penelitian TESIS 36.';
    }
    
    // 2. Konten Inti / Jurnal Pendukung (Riset Context)
    else if (query.includes('jurnal') || query.includes('pendukung') || query.includes('referensi') || query.includes('buku') || query.includes('pustaka')) {
      reply = 'Berikut adalah daftar dokumen serta jurnal pendukung utama yang mendasari analisis biosekuriti riset ini:\n\n' +
              '• Food and Agriculture Organization (FAO, 2008) – "Biosecurity for Highly Pathogenic Avian Influenza: FAO Animal Production and Health Paper". Acuan standar prosedur sanitasi global.\n\n' +
              '• World Health Organization (WHO, 2024) – "Global Influenza Surveillance and Response System (GISRS) for H5N1 Monitoring". Panduan mitigasi transmisi dari unggas ke manusia.\n\n' +
              '• Jurnal Epidemiologi & Kesehatan Komunitas – "Analisis Kendala Struktural Finansial Peternakan Rakyat Menengah Kebawah dalam Penerapan Regulasi Biosekuriti 3 Sektor".';
    } else if (query.includes('ringkasan') || query.includes('summarize') || query.includes('kesimpulan') || query.includes('abstrak') || query.includes('isi')) {
      reply = 'Ringkasan Eksekutif Penelitian:\nStudi kualitatif ini menginvestigasi efektivitas penegakan biosekuriti peternak unggas mandiri di pemukiman semi-padat terhadap ancaman Avian Influenza (H5N1). Hasil analisis mendeteksi celah kritis pada minimnya ketersediaan sekat disinfeksi, absennya penggunaan APD standar pelindung pernapasan, serta benturan modal ekonomi sebagai pemicu utama rendahnya kepatuhan higienitas kandang.';
    } else if (query.includes('lokasi') || query.includes('tempat') || query.includes('kapan') || query.includes('waktu') || query.includes('tasik')) {
      reply = 'Pengumpulan data primer dan observasi lapangan dilakukan secara mendalam di kawasan peternakan rakyat Kampung Sukaruas, Kabupaten Tasikmalaya, Provinsi Jawa Barat. Studi ini berlangsung selama empat hari penuh, tepatnya pada 21 hingga 24 Januari 2026.';
    }
    
    // 3. Fallback cerdas jika out of topic parah
    else {
      reply = 'Hmm, gw belum punya data spesifik tentang itu di repositori TESIS 36. Tapi kalau terkait ringkasan bab, metodologi di Tasikmalaya, atau jurnal pendukung flu burung, gw paham banget. Mau cari tahu bagian itu?';
    }

    appendMessage('bot', reply, true);
  }, 650);
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
