const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 25px; right: 90px; z-index: 99999; font-family: 'DM Sans', sans-serif; touch-action: none;">
  <div id="cb-button" style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 120px; height: 50px; border-radius: 25px; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; cursor: move; box-shadow: 0 6px 16px rgba(0,0,0,0.2); user-select: none; font-size: 14px; font-weight: 500;">
    <span id="cb-icon" style="font-size: 20px; display: inline-block;">✨</span>
    <span>Tanya AI</span>
  </div>
  
  <div id="cb-box" style="display: none; width: 330px; height: 430px; background: #f4ede2; border: 1px solid rgba(90,70,40,.12); border-radius: 16px; box-shadow: 0 12px 36px rgba(90,70,40,.2); position: absolute; bottom: 65px; right: 0; flex-direction: column; overflow: hidden; pointer-events: auto;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 14px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <span>🤖</span>
        <span>Asisten Pintar TESIS 36</span>
      </div>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 22px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    
    <div id="cb-messages" style="flex: 1; padding: 14px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 10px; background: #f4ede2;"></div>
    
    <div id="cb-quick-replies" style="display: flex; gap: 6px; padding: 8px 14px; background: #f4ede2; overflow-x: auto; white-space: nowrap; border-top: 1px solid rgba(90,70,40,.06);">
      <button class="cb-qr-btn" onclick="sendQuickReply('📋 Ringkasan Penelitian')">📋 Ringkasan</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('📚 Jurnal Pendukung')">📚 Jurnal Pendukung</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('📍 Lokasi & Waktu')">📍 Lokasi & Waktu</button>
    </div>

    <div id="cb-input-area" style="display: flex; border-top: 1px solid rgba(90,70,40,.1); background: #ffffff; padding: 4px;">
      <input type="text" id="cb-input" placeholder="Tanya atau minta jurnal pendukung..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 12px; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
      <button id="cb-send" onclick="sendMessage()" style="background: transparent; border: none; color: #6b7c52; padding: 0 16px; cursor: pointer; font-weight: 600; font-size: 12.5px;">Kirim</button>
    </div>
  </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', chatbotHTML);

// Injection Styles, Animasi Muter Ikon (Hover), Animasi Bubbly Terbuka (Pop)
const style = document.createElement('style');
style.innerHTML = `
  @keyframes cbPop {
    0% { transform: scale(0.6); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes cbRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .cb-msg { padding: 10px 14px; border-radius: 14px; max-width: 80%; line-height: 1.45; word-wrap: break-word; box-sizing: border-box; animation: cbPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 3px; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 3px; }
  
  #cb-button { transition: transform 0.2s, box-shadow 0.2s; }
  #cb-button:hover { transform: scale(1.05); box-shadow: 0 8px 20px rgba(0,0,0,0.25); }
  #cb-button:hover #cb-icon { animation: cbRotate 0.6s ease-in-out; }
  #cb-button:active { transform: scale(0.95); }
  
  .cb-qr-btn { background: #ffffff; border: 1px solid rgba(90,70,40,.15); color: #5c4a2a; padding: 6px 12px; border-radius: 15px; font-size: 11.5px; cursor: pointer; font-weight: 500; transition: all 0.2s; display: inline-block; }
  .cb-qr-btn:hover { background: #6b7c52; color: #ffffff; border-color: #6b7c52; transform: translateY(-1px); }
  
  #cb-quick-replies::-webkit-scrollbar { display: none; }
  #cb-quick-replies { -ms-overflow-style: none; scrollbar-width: none; }
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(90,70,40,0.15); border-radius: 2px; }
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
  
  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Gw sistem AI TESIS 36. Lu bisa minta ringkasan riset atau jurnal pendukung biosekuriti Avian Influenza (H5N1) di sini.');
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
    let reply = 'Maaf, gw kurang paham. Coba minta "ringkasan", klik menu "jurnal pendukung", atau tanyakan "lokasi".';

    // Logika Pemrosesan Bahasa & Keyword Contextual Berdasarkan Permintaan User
    if (query.includes('jurnal') || query.includes('pendukung') || query.includes('referensi') || query.includes('buku')) {
      reply = 'Berikut beberapa jurnal pendukung biosekuriti unggas utama yang kami gunakan:\n\n' +
              '1. FAO (2008) - "Biosecurity for Avian Influenza Consistent Guidelines"\n' +
              '2. WHO (2024) - "Global Influenza Surveillance Protocols for H5N1"\n' +
              '3. Jurnal Epidemiologi Indonesia - "Faktor Penghambat Implementasi Biosekuriti 3 Sektor Peternakan Rakyat".';
    } else if (query.includes('ringkasan') || query.includes('summarize') || query.includes('kesimpulan') || query.includes('info')) {
      reply = 'Abstrak/Ringkasan Riset:\nPenelitian kualitatif ini menganalisis penerapan biosekuriti peternak rakyat terhadap virus H5N1. Ditemukan hambatan utama berupa faktor struktural ekonomi, kurangnya kesadaran APD, dan keterbatasan sanitasi mandiri di area pemukiman padat.';
    } else if (query.includes('lokasi') || query.includes('tempat') || query.includes('kapan') || query.includes('waktu')) {
      reply = 'Studi kasus lapangan ini dilaksanakan secara kualitatif di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat pada rentang tanggal 21-24 Januari 2026.';
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
    const maxLeft = window.innerWidth - 130;
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

  if (rect.top < 450) {
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
