// ==========================================
// CONFIGURATION - GEMINI API KEY INTEGRATED
// ==========================================
// Menggunakan API Key paling gres dari image_ae57c3.png
const GEMINI_API_KEY = "AQ.Ab8RN6JeQq8mm_x4bpy4DuMt3C_0BRaLZMQ_I3H2xi2Z8Bt2vw"; 

// System Instruction: Menjaga kepribadian bot tetap santai (gw-lu) & menguasai materi TESIS 36
const SYSTEM_INSTRUCTION = `
Lu adalah Asisten Pintar berbasis AI bernama "Chatbot TESIS 36".
Tugas utama lu adalah membantu pengunjung website memahami hasil penelitian kualitatif berjudul:
"Analisis Praktik Biosekuriti Peternak Ungas Terhadap Avian Influenza (H5N1) di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat" oleh Tim TESIS 36 SMAN 8 Jakarta.

Materi & Fakta Penelitian (Gunakan ini untuk menjawab pertanyaan):
1. Waktu & Lokasi: Lapangan di Kampung Sukaruas, Tasikmalaya pada 21–24 Januari 2026.
2. Fokus Penelitian: Studi kualitatif mengenai implementasi higienitas, sanitasi, dan biosekuriti peternak unggas mandiri/rakyat terhadap virus H5N1.
3. Temuan Utama: Adanya celah kritis pada minimnya sekat disinfeksi, peternak sangat jarang memakai APD (terutama masker/pelindung pernapasan), serta adanya benturan modal ekonomi sebagai alasan utama rendahnya kepatuhan higienitas kandang.
4. Jurnal/Dokumen Pendukung Utama:
   - FAO (2008): "Biosecurity for Highly Pathogenic Avian Influenza: FAO Animal Production and Health Paper" (Standar sanitasi global).
   - WHO (2024): "Global Influenza Surveillance and Response System (GISRS) for H5N1 Monitoring" (Mitigasi transmisi unggas ke manusia).
   - Jurnal Epidemiologi & Kesehatan Komunitas tentang kendala struktural finansial peternak kecil.

Gaya Komunikasi:
- Gunakan bahasa Indonesia yang santai, interaktif, ramah, dan bersahabat (wajib gunakan panggilan "gw-lu" agar sangat user-friendly).
- Jawab secara singkat, padat, jelas, langsung ke inti pertanyaan tanpa penjelasan bertele-tele (no yapping).
- Jika user menyapa (halo, hai, p, apa kabar, dll) atau sekadar basa-basi di luar topik, balas dengan sangat santai, ramah, lalu arahkan kembali secara halus untuk mendiskusikan riset atau mencoba tombol pintas yang ada.
`;

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
    
    <div id="cb-quick-replies" style="display: flex; flex-direction: column; gap: 5px; padding: 8px 14px; background: #ebdcb9; transition: all 0.25s ease-in-out; max-height: 120px; opacity: 1; overflow: hidden;">
      <button class="cb-qr-btn" onclick="sendQuickReply('Minta ringkasan penelitian dong')">📋 Ringkasan Penelitian</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('Apa saja jurnal pendukung riset ini?')">📚 Jurnal Pendukung</button>
      <button class="cb-qr-btn" onclick="sendQuickReply('Penelitian ini lokasinya di mana?')">📍 Lokasi & Waktu</button>
    </div>

    <div style="padding: 10px 14px; background: #ebdcb9;">
      <div id="cb-input-container" style="display: flex; align-items: center; background: #fdfaf4; border: 1px solid rgba(92,74,42,0.2); border-radius: 22px; padding: 4px 6px 4px 14px; box-shadow: 0 4px 12px rgba(92,74,42,0.08); transition: border-color 0.2s, box-shadow 0.2s;">
        <input type="text" id="cb-input" placeholder="Tanya apa saja ke AI..." onkeypress="handleKey(event)" oninput="checkInputToggle()" style="flex: 1; border: none; padding: 8px 0; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
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
const qrContainer = document.getElementById('cb-quick-replies');

let chatContextHistory = [];

function initChatbot() {
  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }
  
  const isNavigating = sessionStorage.getItem('cb_navigating');
  if (!isNavigating) {
    localStorage.removeItem('chat_history');
    localStorage.removeItem('cb_context_memory');
  }
  sessionStorage.removeItem('cb_navigating');
  
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sessionStorage.setItem('cb_navigating', 'true');
    });
  });

  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  chatContextHistory = JSON.parse(localStorage.getItem('cb_context_memory')) || [];

  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Gw Chatbot TESIS 36. Sekarang lu bisa tanya apa aja secara bebas, sapa gw, atau minta rangkuman & jurnal pendukung secara langsung.');
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
    qrContainer.style.maxHeight = '0px';
    qrContainer.style.opacity = '0';
    qrContainer.style.paddingTop = '0px';
    qrContainer.style.paddingBottom = '0px';
  } else {
    qrContainer.style.maxHeight = '120px';
    qrContainer.style.opacity = '1';
    qrContainer.style.paddingTop = '8px';
    qrContainer.style.paddingBottom = '8px';
  }
}

async function sendMessage() {
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

  if (chatContextHistory.length > 0 && chatContextHistory[chatContextHistory.length - 1].role === 'user') {
    chatContextHistory[chatContextHistory.length - 1].parts[0].text += " " + text;
  } else {
    chatContextHistory.push({ role: "user", parts: [{ text: text }] });
  }

  try {
    // FIX API URL: Mengembalikan metode penembakan key resmi lewat parameter URL (?key=)
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: chatContextHistory,
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        generationConfig: { maxOutputTokens: 800, temperature: 0.7 }
      })
    });

    const data = await response.json();
    
    const indicator = document.getElementById('cb-typing-indicator');
    if (indicator) indicator.remove();

    let botReply = "";
    
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      botReply = data.candidates[0].content.parts[0].text.trim();
      chatContextHistory.push({ role: "model", parts: [{ text: botReply }] });
      localStorage.setItem('cb_context_memory', JSON.stringify(chatContextHistory));
    } else {
      botReply = "Sori banget bro, koneksi AI sempat terputus sebentar. Boleh coba kirim ulang pertanyaannya?";
      chatContextHistory.pop();
    }

    appendMessage('bot', botReply, true);

  } catch (error) {
    const indicator = document.getElementById('cb-typing-indicator');
    if (indicator) indicator.remove();
    
    appendMessage('bot', 'Aduh sori bro, gagal nyambung ke otak AI. Coba cek integrasi API Key-nya di konsol web lu.', true);
    chatContextHistory.pop(); 
    checkInputToggle(); 
    console.error("Gemini API Error: ", error);
  }
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
