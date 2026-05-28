// --- 1. MEMBUAT ELEMEN CHATBOT SECARA OTOMATIS ---
const chatbotHTML = `
<div id="cb-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'DM Sans', sans-serif;">
  <div id="cb-button" onclick="toggleChat()" style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #6b7c52, #4e5e38); color: white; text-align: center; line-height: 60px; font-size: 28px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: transform 0.2s;">💬</div>
  <div id="cb-box" style="display: none; width: 320px; height: 400px; background: #faf7f1; border: 1px solid rgba(90,70,40,.12); border-radius: 14px; box-shadow: 0 8px 32px rgba(90,70,40,.18); position: absolute; bottom: 75px; right: 0; flex-direction: column; overflow: hidden;">
    <div id="cb-header" style="background: #5c4a2a; color: #faf7f1; padding: 12px; font-weight: bold; font-size: 14px; display: flex; justify-content: space-between; align-items: center;">
      <span>🤖 Asisten TeSis 36</span>
      <span id="cb-close" onclick="toggleChat()" style="cursor: pointer; font-size: 18px;">×</span>
    </div>
    <div id="cb-messages" style="flex: 1; padding: 10px; overflow-y: auto; font-size: 13px; display: flex; flex-direction: column; gap: 8px;"></div>
    <div id="cb-input-area" style="display: flex; border-top: 1px solid rgba(90,70,40,.12); background: white;">
      <input type="text" id="cb-input" placeholder="Tanya sesuatu..." onkeypress="handleKey(event)" style="flex: 1; border: none; padding: 12px; outline: none; font-size: 13px;">
      <button id="cb-send" onclick="sendMessage()" style="background: transparent; border: none; color: #6b7c52; padding: 0 15px; cursor: pointer; font-weight: bold;">Kirim</button>
    </div>
  </div>
</div>
`;

// Inject HTML chatbot ke dalam halaman web saat script dimuat
document.body.insertAdjacentHTML('beforeend', chatbotHTML);

// Tambahkan CSS dinamis untuk bubble chat agar tampilan rapi
const style = document.createElement('style');
style.innerHTML = `
  .msg { padding: 8px 12px; border-radius: 10px; max-width: 80%; line-height: 1.4; word-wrap: break-word; }
  .bot { background: #e8dfc8; color: #2e2416; align-self: flex-start; }
  .user { background: #6b7c52; color: white; align-self: flex-end; }
  #cb-button:hover { transform: scale(1.1); }
`;
document.head.appendChild(style);

// --- 2. LOGIKA STATE MENGGUNAKAN LOCAL STORAGE ---
const msgContainer = document.getElementById('cb-messages');
const chatBox = document.getElementById('cb-box');

// Fungsi untuk mengecek status terakhir chat sewaktu pindah halaman
function initChatbot() {
  // Jika sebelumnya user sedang membuka panel chat, tetap buka meskipun ganti halaman
  if (localStorage.getItem('chat_open') === 'true') {
    chatBox.style.display = 'flex';
  }
  
  // Ambil histori percakapan dari memori browser lokal
  const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
  if (savedMessages.length === 0) {
    appendMessage('bot', 'Halo! Ada yang bisa dibantu terkait penelitian Avian Influenza TeSis 36? (Ketik: info / temuan / lokasi)');
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

  // Sistem Autoreply Otomatis sesuai isi penelitian SMAN 8 Jakarta
  setTimeout(() => {
    const lowerText = text.toLowerCase();
    let reply = 'Maaf, aku kurang paham. Coba ketik kata kunci seperti "info", "temuan", atau "lokasi".';

    if (lowerText.includes('info') || lowerText.includes('halo') || lowerText.includes('hai')) {
      reply = 'Ini adalah website hasil penelitian kualitatif Avian Influenza (H5N1) oleh tim TeSis 36 SMAN 8 Jakarta.';
    } else if (lowerText.includes('temuan') || lowerText.includes('hasil') || lowerText.includes('kesimpulan')) {
      reply = 'Temuan utama kami: Sanitasi kandang di lokasi masih minim, peternak jarang menggunakan APD, dan faktor ekonomi menjadi hambatan utama penerapan biosekuriti.';
    } else if (lowerText.includes('lokasi') || lowerText.includes('tempat') || lowerText.includes('kapan')) {
      reply = 'Penelitian lapangan ini dilaksanakan di Kampung Sukaruas, Kabupaten Tasikmalaya, Jawa Barat pada tanggal 21–24 Januari 2026.';
    }

    appendMessage('bot', reply, true);
  }, 600);
}

function appendMessage(sender, text, save = false) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('msg', sender);
  msgDiv.innerText = text;
  msgContainer.appendChild(msgDiv);
  msgContainer.scrollTop = msgContainer.scrollHeight;

  if (save) {
    const savedMessages = JSON.parse(localStorage.getItem('chat_history')) || [];
    savedMessages.push({ sender, text });
    localStorage.setItem('chat_history', JSON.stringify(savedMessages));
  }
}

// Jalankan chatbot setelah DOM siap
document.addEventListener('DOMContentLoaded', initChatbot);