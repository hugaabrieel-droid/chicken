const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; font-family: 'DM Sans', sans-serif;">
  <div id="cb-button" onclick="toggleChat()" style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; text-align: center; line-height: 55px; font-size: 26px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; user-select: none;">💬</div>
  
  <div id="cb-box" style="display: none; width: 310px; height: 390px; background: #faf7f1; border: 1px solid rgba(90,70,40,.12); border-radius: 12px; box-shadow: 0 6px 24px rgba(90,70,40,.15); position: absolute; bottom: 70px; right: 0; flex-direction: column; overflow: hidden;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 12px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <span>🤖 Asisten TESIS 36</span>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 20px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    <div id="cb-messages" style="flex: 1; padding: 12px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 8px; background: #faf7f1;"></div>
    <div id="cb-input-area" style="display: flex; border-top: 1px solid rgba(90,70,40,.1); background: #ffffff;">
      <input type="text" id="cb-input" placeholder="Tanya sesuatu..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 10px 12px; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
      <button id="cb-send" onclick="sendMessage()" style="background: transparent; border: none; color: #6b7c52; padding: 0 14px; cursor: pointer; font-weight: 600; font-size: 12.5px;">Kirim</button>
    </div>
  </div>
</div>
`;


document.body.insertAdjacentHTML('beforeend', chatbotHTML);


const style = document.createElement('style');
style.innerHTML = `
  .cb-msg { padding: 8px 12px; border-radius: 10px; max-width: 80%; line-height: 1.4; word-wrap: break-word; box-sizing: border-box; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 2px; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; }
  #cb-button:hover { transform: scale(1.06); }
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(90,70,40,0.15); border-radius: 2px; }
`;
document.head.appendChild(style);



const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');

function initChatbot() {

  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }
  

  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Ada yang bisa dibantu terkait penelitian Avian Influenza TESIS 36? (Cetik: info / temuan / lokasi)');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
}

function toggleChat() {
  if (chatBox.style.display === 'none' || chatBox.style.display === '') {
    chatBox.style.display = 'flex';
    localStorage.setItem('chat_open', 'true');
  } else {
    chatBox.style.display = 'none';
    localStorage.setItem('chat_open', 'false');
  }
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('cb-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text, true);
  input.value = '';


  setTimeout(() => {
    const lowerText = text.toLowerCase();
    let reply = 'Maaf, gw kurang paham. Coba ketik kata kunci seperti "info", "temuan", atau "lokasi".';

    if (lowerText.includes('info') || lowerText.includes('halo') || lowerText.includes('hai') || lowerText.includes('p')) {
      reply = 'Ini adalah website hasil penelitian kualitatif Avian Influenza (H5N1) oleh tim TESIS 36 SMAN 8 Jakarta.';
    } else if (lowerText.includes('temuan') || lowerText.includes('hasil') || lowerText.includes('kesimpulan')) {
      reply = 'Temuan utama: Sanitasi kandang ayam di lokasi minim, peternak jarang pakai APD, dan keterbatasan ekonomi jadi hambatan utama biosekuriti.';
    } else if (lowerText.includes('lokasi') || lowerText.includes('tempat') || lowerText.includes('kapan')) {
      reply = 'Penelitian lapangan dilakukan di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat pada 21–24 Januari 2026.';
    }

    appendMessage('bot', reply, true);
  }, 500);
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}

const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; font-family: 'DM Sans', sans-serif;">
  <div id="cb-button" onclick="toggleChat()" style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; text-align: center; line-height: 55px; font-size: 26px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; user-select: none;">💬</div>
  
  <div id="cb-box" style="display: none; width: 310px; height: 390px; background: #faf7f1; border: 1px solid rgba(90,70,40,.12); border-radius: 12px; box-shadow: 0 6px 24px rgba(90,70,40,.15); position: absolute; bottom: 70px; right: 0; flex-direction: column; overflow: hidden;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 12px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <span>🤖 Asisten TESIS 36</span>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 20px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    <div id="cb-messages" style="flex: 1; padding: 12px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 8px; background: #faf7f1;"></div>
    <div id="cb-input-area" style="display: flex; border-top: 1px solid rgba(90,70,40,.1); background: #ffffff;">
      <input type="text" id="cb-input" placeholder="Tanya sesuatu..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 10px 12px; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
      <button id="cb-send" onclick="sendMessage()" style="background: transparent; border: none; color: #6b7c52; padding: 0 14px; cursor: pointer; font-weight: 600; font-size: 12.5px;">Kirim</button>
    </div>
  </div>
</div>
`;


document.body.insertAdjacentHTML('beforeend', chatbotHTML);


const style = document.createElement('style');
style.innerHTML = `
  .cb-msg { padding: 8px 12px; border-radius: 10px; max-width: 80%; line-height: 1.4; word-wrap: break-word; box-sizing: border-box; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 2px; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; }
  #cb-button:hover { transform: scale(1.06); }
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(90,70,40,0.15); border-radius: 2px; }
`;
document.head.appendChild(style);



const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');

function initChatbot() {

  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }
  

  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Ada yang bisa dibantu terkait penelitian Avian Influenza TESIS 36? (Cetik: info / temuan / lokasi)');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
}

function toggleChat() {
  if (chatBox.style.display === 'none' || chatBox.style.display === '') {
    chatBox.style.display = 'flex';
    localStorage.setItem('chat_open', 'true');
  } else {
    chatBox.style.display = 'none';
    localStorage.setItem('chat_open', 'false');
  }
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('cb-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text, true);
  input.value = '';


  setTimeout(() => {
    const lowerText = text.toLowerCase();
    let reply = 'Maaf, gw kurang paham. Coba ketik kata kunci seperti "info", "temuan", atau "lokasi".';

    if (lowerText.includes('info') || lowerText.includes('halo') || lowerText.includes('hai') || lowerText.includes('p')) {
      reply = 'Ini adalah website hasil penelitian kualitatif Avian Influenza (H5N1) oleh tim TESIS 36 SMAN 8 Jakarta.';
    } else if (lowerText.includes('temuan') || lowerText.includes('hasil') || lowerText.includes('kesimpulan')) {
      reply = 'Temuan utama: Sanitasi kandang ayam di lokasi minim, peternak jarang pakai APD, dan keterbatasan ekonomi jadi hambatan utama biosekuriti.';
    } else if (lowerText.includes('lokasi') || lowerText.includes('tempat') || lowerText.includes('kapan')) {
      reply = 'Penelitian lapangan dilakukan di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat pada 21–24 Januari 2026.';
    }

    appendMessage('bot', reply, true);
  }, 500);
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; font-family: 'DM Sans', sans-serif;">
  <div id="cb-button" onclick="toggleChat()" style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; text-align: center; line-height: 55px; font-size: 26px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; user-select: none;">💬</div>
  
  <div id="cb-box" style="display: none; width: 310px; height: 390px; background: #faf7f1; border: 1px solid rgba(90,70,40,.12); border-radius: 12px; box-shadow: 0 6px 24px rgba(90,70,40,.15); position: absolute; bottom: 70px; right: 0; flex-direction: column; overflow: hidden;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 12px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <span>🤖 Asisten TESIS 36</span>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 20px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    <div id="cb-messages" style="flex: 1; padding: 12px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 8px; background: #faf7f1;"></div>
    <div id="cb-input-area" style="display: flex; border-top: 1px solid rgba(90,70,40,.1); background: #ffffff;">
      <input type="text" id="cb-input" placeholder="Tanya sesuatu..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 10px 12px; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
      <button id="cb-send" onclick="sendMessage()" style="background: transparent; border: none; color: #6b7c52; padding: 0 14px; cursor: pointer; font-weight: 600; font-size: 12.5px;">Kirim</button>
    </div>
  </div>
</div>
`;


document.body.insertAdjacentHTML('beforeend', chatbotHTML);


const style = document.createElement('style');
style.innerHTML = `
  .cb-msg { padding: 8px 12px; border-radius: 10px; max-width: 80%; line-height: 1.4; word-wrap: break-word; box-sizing: border-box; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 2px; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; }
  #cb-button:hover { transform: scale(1.06); }
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(90,70,40,0.15); border-radius: 2px; }
`;
document.head.appendChild(style);



const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');

function initChatbot() {

  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }
  

  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Ada yang bisa dibantu terkait penelitian Avian Influenza TESIS 36? (Cetik: info / temuan / lokasi)');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
}

function toggleChat() {
  if (chatBox.style.display === 'none' || chatBox.style.display === '') {
    chatBox.style.display = 'flex';
    localStorage.setItem('chat_open', 'true');
  } else {
    chatBox.style.display = 'none';
    localStorage.setItem('chat_open', 'false');
  }
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('cb-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text, true);
  input.value = '';


  setTimeout(() => {
    const lowerText = text.toLowerCase();
    let reply = 'Maaf, gw kurang paham. Coba ketik kata kunci seperti "info", "temuan", atau "lokasi".';

    if (lowerText.includes('info') || lowerText.includes('halo') || lowerText.includes('hai') || lowerText.includes('p')) {
      reply = 'Ini adalah website hasil penelitian kualitatif Avian Influenza (H5N1) oleh tim TESIS 36 SMAN 8 Jakarta.';
    } else if (lowerText.includes('temuan') || lowerText.includes('hasil') || lowerText.includes('kesimpulan')) {
      reply = 'Temuan utama: Sanitasi kandang ayam di lokasi minim, peternak jarang pakai APD, dan keterbatasan ekonomi jadi hambatan utama biosekuriti.';
    } else if (lowerText.includes('lokasi') || lowerText.includes('tempat') || lowerText.includes('kapan')) {
      reply = 'Penelitian lapangan dilakukan di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat pada 21–24 Januari 2026.';
    }

    appendMessage('bot', reply, true);
  }, 500);
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; font-family: 'DM Sans', sans-serif;">
  <div id="cb-button" onclick="toggleChat()" style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; text-align: center; line-height: 55px; font-size: 26px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; user-select: none;">💬</div>
  
  <div id="cb-box" style="display: none; width: 310px; height: 390px; background: #faf7f1; border: 1px solid rgba(90,70,40,.12); border-radius: 12px; box-shadow: 0 6px 24px rgba(90,70,40,.15); position: absolute; bottom: 70px; right: 0; flex-direction: column; overflow: hidden;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 12px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <span>🤖 Asisten TESIS 36</span>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 20px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    <div id="cb-messages" style="flex: 1; padding: 12px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 8px; background: #faf7f1;"></div>
    <div id="cb-input-area" style="display: flex; border-top: 1px solid rgba(90,70,40,.1); background: #ffffff;">
      <input type="text" id="cb-input" placeholder="Tanya sesuatu..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 10px 12px; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
      <button id="cb-send" onclick="sendMessage()" style="background: transparent; border: none; color: #6b7c52; padding: 0 14px; cursor: pointer; font-weight: 600; font-size: 12.5px;">Kirim</button>
    </div>
  </div>
</div>
`;


document.body.insertAdjacentHTML('beforeend', chatbotHTML);


const style = document.createElement('style');
style.innerHTML = `
  .cb-msg { padding: 8px 12px; border-radius: 10px; max-width: 80%; line-height: 1.4; word-wrap: break-word; box-sizing: border-box; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 2px; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; }
  #cb-button:hover { transform: scale(1.06); }
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(90,70,40,0.15); border-radius: 2px; }
`;
document.head.appendChild(style);



const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');

function initChatbot() {

  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }
  

  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Ada yang bisa dibantu terkait penelitian Avian Influenza TESIS 36? (Cetik: info / temuan / lokasi)');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
}

function toggleChat() {
  if (chatBox.style.display === 'none' || chatBox.style.display === '') {
    chatBox.style.display = 'flex';
    localStorage.setItem('chat_open', 'true');
  } else {
    chatBox.style.display = 'none';
    localStorage.setItem('chat_open', 'false');
  }
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('cb-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text, true);
  input.value = '';


  setTimeout(() => {
    const lowerText = text.toLowerCase();
    let reply = 'Maaf, gw kurang paham. Coba ketik kata kunci seperti "info", "temuan", atau "lokasi".';

    if (lowerText.includes('info') || lowerText.includes('halo') || lowerText.includes('hai') || lowerText.includes('p')) {
      reply = 'Ini adalah website hasil penelitian kualitatif Avian Influenza (H5N1) oleh tim TESIS 36 SMAN 8 Jakarta.';
    } else if (lowerText.includes('temuan') || lowerText.includes('hasil') || lowerText.includes('kesimpulan')) {
      reply = 'Temuan utama: Sanitasi kandang ayam di lokasi minim, peternak jarang pakai APD, dan keterbatasan ekonomi jadi hambatan utama biosekuriti.';
    } else if (lowerText.includes('lokasi') || lowerText.includes('tempat') || lowerText.includes('kapan')) {
      reply = 'Penelitian lapangan dilakukan di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat pada 21–24 Januari 2026.';
    }

    appendMessage('bot', reply, true);
  }, 500);
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; font-family: 'DM Sans', sans-serif;">
  <div id="cb-button" onclick="toggleChat()" style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; text-align: center; line-height: 55px; font-size: 26px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; user-select: none;">💬</div>
  
  <div id="cb-box" style="display: none; width: 310px; height: 390px; background: #faf7f1; border: 1px solid rgba(90,70,40,.12); border-radius: 12px; box-shadow: 0 6px 24px rgba(90,70,40,.15); position: absolute; bottom: 70px; right: 0; flex-direction: column; overflow: hidden;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 12px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <span>🤖 Asisten TESIS 36</span>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 20px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    <div id="cb-messages" style="flex: 1; padding: 12px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 8px; background: #faf7f1;"></div>
    <div id="cb-input-area" style="display: flex; border-top: 1px solid rgba(90,70,40,.1); background: #ffffff;">
      <input type="text" id="cb-input" placeholder="Tanya sesuatu..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 10px 12px; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
      <button id="cb-send" onclick="sendMessage()" style="background: transparent; border: none; color: #6b7c52; padding: 0 14px; cursor: pointer; font-weight: 600; font-size: 12.5px;">Kirim</button>
    </div>
  </div>
</div>
`;


document.body.insertAdjacentHTML('beforeend', chatbotHTML);


const style = document.createElement('style');
style.innerHTML = `
  .cb-msg { padding: 8px 12px; border-radius: 10px; max-width: 80%; line-height: 1.4; word-wrap: break-word; box-sizing: border-box; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 2px; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; }
  #cb-button:hover { transform: scale(1.06); }
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(90,70,40,0.15); border-radius: 2px; }
`;
document.head.appendChild(style);



const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');

function initChatbot() {

  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }


  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Ada yang bisa dibantu terkait penelitian Avian Influenza TESIS 36? (Cetik: info / temuan / lokasi)');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
}

function toggleChat() {
  if (chatBox.style.display === 'none' || chatBox.style.display === '') {
    chatBox.style.display = 'flex';
    localStorage.setItem('chat_open', 'true');
  } else {
    chatBox.style.display = 'none';
    localStorage.setItem('chat_open', 'false');
  }
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('cb-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text, true);
  input.value = '';


  setTimeout(() => {
    const lowerText = text.toLowerCase();
    let reply = 'Maaf, gw kurang paham. Coba ketik kata kunci seperti "info", "temuan", atau "lokasi".';

    if (lowerText.includes('info') || lowerText.includes('halo') || lowerText.includes('hai') || lowerText.includes('p')) {
      reply = 'Ini adalah website hasil penelitian kualitatif Avian Influenza (H5N1) oleh tim TESIS 36 SMAN 8 Jakarta.';
    } else if (lowerText.includes('temuan') || lowerText.includes('hasil') || lowerText.includes('kesimpulan')) {
      reply = 'Temuan utama: Sanitasi kandang ayam di lokasi minim, peternak jarang pakai APD, dan keterbatasan ekonomi jadi hambatan utama biosekuriti.';
    } else if (lowerText.includes('lokasi') || lowerText.includes('tempat') || lowerText.includes('kapan')) {
      reply = 'Penelitian lapangan dilakukan di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat pada 21–24 Januari 2026.';
    }

    appendMessage('bot', reply, true);
  }, 500);
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; font-family: 'DM Sans', sans-serif;">
  <div id="cb-button" onclick="toggleChat()" style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; text-align: center; line-height: 55px; font-size: 26px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; user-select: none;">💬</div>
  
  <div id="cb-box" style="display: none; width: 310px; height: 390px; background: #faf7f1; border: 1px solid rgba(90,70,40,.12); border-radius: 12px; box-shadow: 0 6px 24px rgba(90,70,40,.15); position: absolute; bottom: 70px; right: 0; flex-direction: column; overflow: hidden;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 12px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <span>🤖 Asisten TESIS 36</span>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 20px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    <div id="cb-messages" style="flex: 1; padding: 12px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 8px; background: #faf7f1;"></div>
    <div id="cb-input-area" style="display: flex; border-top: 1px solid rgba(90,70,40,.1); background: #ffffff;">
      <input type="text" id="cb-input" placeholder="Tanya sesuatu..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 10px 12px; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
      <button id="cb-send" onclick="sendMessage()" style="background: transparent; border: none; color: #6b7c52; padding: 0 14px; cursor: pointer; font-weight: 600; font-size: 12.5px;">Kirim</button>
    </div>
  </div>
</div>
`;

// Masukin elemen HTML ke dalam body web secara dinamis
document.body.insertAdjacentHTML('beforeend', chatbotHTML);

// Tambah gaya CSS bubble chat internal
const style = document.createElement('style');
style.innerHTML = `
  .cb-msg { padding: 8px 12px; border-radius: 10px; max-width: 80%; line-height: 1.4; word-wrap: break-word; box-sizing: border-box; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 2px; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; }
  #cb-button:hover { transform: scale(1.06); }
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(90,70,40,0.15); border-radius: 2px; }
`;
document.head.appendChild(style);



const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');

function initChatbot() {

  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }
  

  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Ada yang bisa dibantu terkait penelitian Avian Influenza TESIS 36? (Cetik: info / temuan / lokasi)');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
}

function toggleChat() {
  if (chatBox.style.display === 'none' || chatBox.style.display === '') {
    chatBox.style.display = 'flex';
    localStorage.setItem('chat_open', 'true');
  } else {
    chatBox.style.display = 'none';
    localStorage.setItem('chat_open', 'false');
  }
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('cb-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text, true);
  input.value = '';


  setTimeout(() => {
    const lowerText = text.toLowerCase();
    let reply = 'Maaf, gw kurang paham. Coba ketik kata kunci seperti "info", "temuan", atau "lokasi".';

    if (lowerText.includes('info') || lowerText.includes('halo') || lowerText.includes('hai') || lowerText.includes('p')) {
      reply = 'Ini adalah website hasil penelitian kualitatif Avian Influenza (H5N1) oleh tim TESIS 36 SMAN 8 Jakarta.';
    } else if (lowerText.includes('temuan') || lowerText.includes('hasil') || lowerText.includes('kesimpulan')) {
      reply = 'Temuan utama: Sanitasi kandang ayam di lokasi minim, peternak jarang pakai APD, dan keterbatasan ekonomi jadi hambatan utama biosekuriti.';
    } else if (lowerText.includes('lokasi') || lowerText.includes('tempat') || lowerText.includes('kapan')) {
      reply = 'Penelitian lapangan dilakukan di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat pada 21–24 Januari 2026.';
    }

    appendMessage('bot', reply, true);
  }, 500);
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; font-family: 'DM Sans', sans-serif;">
  <div id="cb-button" onclick="toggleChat()" style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; text-align: center; line-height: 55px; font-size: 26px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; user-select: none;">💬</div>
  
  <div id="cb-box" style="display: none; width: 310px; height: 390px; background: #faf7f1; border: 1px solid rgba(90,70,40,.12); border-radius: 12px; box-shadow: 0 6px 24px rgba(90,70,40,.15); position: absolute; bottom: 70px; right: 0; flex-direction: column; overflow: hidden;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 12px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <span>🤖 Asisten TESIS 36</span>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 20px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    <div id="cb-messages" style="flex: 1; padding: 12px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 8px; background: #faf7f1;"></div>
    <div id="cb-input-area" style="display: flex; border-top: 1px solid rgba(90,70,40,.1); background: #ffffff;">
      <input type="text" id="cb-input" placeholder="Tanya sesuatu..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 10px 12px; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
      <button id="cb-send" onclick="sendMessage()" style="background: transparent; border: none; color: #6b7c52; padding: 0 14px; cursor: pointer; font-weight: 600; font-size: 12.5px;">Kirim</button>
    </div>
  </div>
</div>
`;


document.body.insertAdjacentHTML('beforeend', chatbotHTML);


const style = document.createElement('style');
style.innerHTML = `
  .cb-msg { padding: 8px 12px; border-radius: 10px; max-width: 80%; line-height: 1.4; word-wrap: break-word; box-sizing: border-box; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 2px; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; }
  #cb-button:hover { transform: scale(1.06); }
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(90,70,40,0.15); border-radius: 2px; }
`;
document.head.appendChild(style);



const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');

function initChatbot() {

  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }
  
  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Ada yang bisa dibantu terkait penelitian Avian Influenza TESIS 36? (Cetik: info / temuan / lokasi)');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
}

function toggleChat() {
  if (chatBox.style.display === 'none' || chatBox.style.display === '') {
    chatBox.style.display = 'flex';
    localStorage.setItem('chat_open', 'true');
  } else {
    chatBox.style.display = 'none';
    localStorage.setItem('chat_open', 'false');
  }
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('cb-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text, true);
  input.value = '';


  setTimeout(() => {
    const lowerText = text.toLowerCase();
    let reply = 'Maaf, gw kurang paham. Coba ketik kata kunci seperti "info", "temuan", atau "lokasi".';

    if (lowerText.includes('info') || lowerText.includes('halo') || lowerText.includes('hai') || lowerText.includes('p')) {
      reply = 'Ini adalah website hasil penelitian kualitatif Avian Influenza (H5N1) oleh tim TESIS 36 SMAN 8 Jakarta.';
    } else if (lowerText.includes('temuan') || lowerText.includes('hasil') || lowerText.includes('kesimpulan')) {
      reply = 'Temuan utama: Sanitasi kandang ayam di lokasi minim, peternak jarang pakai APD, dan keterbatasan ekonomi jadi hambatan utama biosekuriti.';
    } else if (lowerText.includes('lokasi') || lowerText.includes('tempat') || lowerText.includes('kapan')) {
      reply = 'Penelitian lapangan dilakukan di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat pada 21–24 Januari 2026.';
    }

    appendMessage('bot', reply, true);
  }, 500);
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; font-family: 'DM Sans', sans-serif;">
  <div id="cb-button" onclick="toggleChat()" style="width: 55px; height: 55px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; text-align: center; line-height: 55px; font-size: 26px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.2s; user-select: none;">💬</div>
  
  <div id="cb-box" style="display: none; width: 310px; height: 390px; background: #faf7f1; border: 1px solid rgba(90,70,40,.12); border-radius: 12px; box-shadow: 0 6px 24px rgba(90,70,40,.15); position: absolute; bottom: 70px; right: 0; flex-direction: column; overflow: hidden;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 12px; font-weight: 500; font-size: 13.5px; display: flex; justify-content: space-between; align-items: center; user-select: none;">
      <span>🤖 Asisten TESIS 36</span>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 20px; font-weight: 300; line-height: 1;">&times;</span>
    </div>
    <div id="cb-messages" style="flex: 1; padding: 12px; overflow-y: auto; font-size: 12.5px; display: flex; flex-direction: column; gap: 8px; background: #faf7f1;"></div>
    <div id="cb-input-area" style="display: flex; border-top: 1px solid rgba(90,70,40,.1); background: #ffffff;">
      <input type="text" id="cb-input" placeholder="Tanya sesuatu..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 10px 12px; outline: none; font-size: 12.5px; background: transparent; color: #2e2416;">
      <button id="cb-send" onclick="sendMessage()" style="background: transparent; border: none; color: #6b7c52; padding: 0 14px; cursor: pointer; font-weight: 600; font-size: 12.5px;">Kirim</button>
    </div>
  </div>
</div>
`;


document.body.insertAdjacentHTML('beforeend', chatbotHTML);


const style = document.createElement('style');
style.innerHTML = `
  .cb-msg { padding: 8px 12px; border-radius: 10px; max-width: 80%; line-height: 1.4; word-wrap: break-word; box-sizing: border-box; }
  .cb-bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; border-bottom-left-radius: 2px; }
  .cb-user { background: #6b7c52; color: #ffffff; align-self: flex-end; border-bottom-right-radius: 2px; }
  #cb-button:hover { transform: scale(1.06); }
  #cb-messages::-webkit-scrollbar { width: 4px; }
  #cb-messages::-webkit-scrollbar-thumb { background: rgba(90,70,40,0.15); border-radius: 2px; }
`;
document.head.appendChild(style);



const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');

function initChatbot() {

  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }
  

  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Ada yang bisa dibantu terkait penelitian Avian Influenza TESIS 36? (Cetik: info / temuan / lokasi)');
  } else {
    savedMessages.forEach(msg => appendMessage(msg.sender, msg.text, false));
  }
}

function toggleChat() {
  if (chatBox.style.display === 'none' || chatBox.style.display === '') {
    chatBox.style.display = 'flex';
    localStorage.setItem('chat_open', 'true');
  } else {
    chatBox.style.display = 'none';
    localStorage.setItem('chat_open', 'false');
  }
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById('cb-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text, true);
  input.value = '';


  setTimeout(() => {
    const lowerText = text.toLowerCase();
    let reply = 'Maaf, gw kurang paham. Coba ketik kata kunci seperti "info", "temuan", atau "lokasi".';

    if (lowerText.includes('info') || lowerText.includes('halo') || lowerText.includes('hai') || lowerText.includes('p')) {
      reply = 'Ini adalah website hasil penelitian kualitatif Avian Influenza (H5N1) oleh tim TESIS 36 SMAN 8 Jakarta.';
    } else if (lowerText.includes('temuan') || lowerText.includes('hasil') || lowerText.includes('kesimpulan')) {
      reply = 'Temuan utama: Sanitasi kandang ayam di lokasi minim, peternak jarang pakai APD, dan keterbatasan ekonomi jadi hambatan utama biosekuriti.';
    } else if (lowerText.includes('lokasi') || lowerText.includes('tempat') || lowerText.includes('kapan')) {
      reply = 'Penelitian lapangan dilakukan di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat pada 21–24 Januari 2026.';
    }

    appendMessage('bot', reply, true);
  }, 500);
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
