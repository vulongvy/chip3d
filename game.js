// ==========================================
// ĐỘNG CƠ GAME PHIÊU LƯU ĐẢO BẢN ĐỒ - CHIP ENGLISH
// ==========================================

class SoundController {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.currentVoiceAudio = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  playTone(freq, type, duration, startTime = 0) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + startTime);

    gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + startTime + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(this.audioCtx.currentTime + startTime);
    osc.stop(this.audioCtx.currentTime + startTime + duration);
  }

  playClick() {
    this.playTone(600, 'sine', 0.08);
  }

  playStep() {
    this.playFootstep('stone');
  }

  // Âm thanh bước chân chân thực phản hồi theo vật liệu (Grass, Stone, Marble, Wood, Brick)
  playFootstep(surface = 'stone') {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;

    if (surface === 'grass') {
      const bufferSize = Math.floor(this.audioCtx.sampleRate * 0.045);
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }
      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(850 + Math.random() * 200, now);
      filter.Q.setValueAtTime(1.8, now);
      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);
      noise.start(now);
    } else if (surface === 'wood') {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      const baseFreq = 190 + Math.random() * 25;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, now + 0.055);
      gain.gain.setValueAtTime(0.065, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.055);
    } else if (surface === 'marble') {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      const baseFreq = 420 + Math.random() * 30;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.35, now + 0.04);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else {
      // 'brick' / 'stone'
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      const baseFreq = 310 + Math.random() * 35;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + 0.045);
      gain.gain.setValueAtTime(0.055, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    }
  }

  playCorrect() {
    if (!this.soundEnabled) return;
    this.init();
    this.playTone(523.25, 'triangle', 0.15, 0);     // C5
    this.playTone(659.25, 'triangle', 0.15, 0.1);   // E5
    this.playTone(783.99, 'triangle', 0.25, 0.2);   // G5
    this.playTone(1046.50, 'triangle', 0.35, 0.3);  // C6
  }

  playWrong() {
    if (!this.soundEnabled) return;
    this.init();
    this.playTone(240, 'sawtooth', 0.18, 0);
    this.playTone(180, 'sawtooth', 0.25, 0.12);
  }

  playCoin() {
    if (!this.soundEnabled) return;
    this.init();
    this.playTone(987.77, 'sine', 0.12, 0);       // B5
    this.playTone(1318.51, 'sine', 0.25, 0.08);   // E6
  }

  playVictory() {
    if (!this.soundEnabled) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50, 880, 1046.50];
    const delays = [0, 0.12, 0.24, 0.36, 0.5, 0.65];
    notes.forEach((freq, i) => {
      this.playTone(freq, 'triangle', 0.28, delays[i]);
    });
  }

  // Phân tích câu nói song ngữ (Tiếng Việt + Tiếng Anh lồng ghép) để phát âm chuẩn xác từng đoạn
  parseBilingualSentence(text) {
    if (!text) return [];

    // Nếu văn bản thuần tiếng Anh (như câu hỏi đề bài: "1. I ______ ten years old.")
    if (!/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(text)) {
      const enClean = text.replace(/_{2,}/g, ' blank ');
      return [{ text: enClean, lang: 'en-US' }];
    }

    // Tách các đoạn tiếng Anh trong dấu ngoặc kép / đơn: 'The cakes', "am", 'is', 'are'
    const regex = /(['"“])([^'"“”]+?)\1/g;
    const segments = [];
    let lastIndex = 0;
    let match;

    const isEnglishTerm = (str) => {
      const clean = str.trim().toLowerCase().replace(/^[“"'`]+|[”"'`]+$/g, '');
      if (!clean) return false;
      return /^[a-z0-9\s'.,!?-]+$/i.test(clean) && !/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(clean);
    };

    while ((match = regex.exec(text)) !== null) {
      const pre = text.substring(lastIndex, match.index);
      if (pre.trim()) {
        segments.push({ text: pre.trim(), lang: 'vi-VN' });
      }

      const inside = match[2].trim();
      if (isEnglishTerm(inside)) {
        const cleanedInside = inside.replace(/_{2,}/g, ' blank ');
        segments.push({ text: cleanedInside, lang: 'en-US' });
      } else {
        segments.push({ text: inside, lang: 'vi-VN' });
      }

      lastIndex = regex.lastIndex;
    }

    const post = text.substring(lastIndex);
    if (post.trim()) {
      segments.push({ text: post.trim(), lang: 'vi-VN' });
    }

    // Tách tiếp các thuật ngữ tiếng Anh cố định thường gặp trong ngữ pháp
    const finalSegments = [];
    segments.forEach(seg => {
      if (seg.lang === 'vi-VN') {
        const parts = seg.text.split(/(To Be|Global Success|All About Me)/gi);
        parts.forEach(p => {
          if (!p.trim()) return;
          if (/^(To Be|Global Success|All About Me)$/i.test(p.trim())) {
            finalSegments.push({ text: p.trim(), lang: 'en-US' });
          } else {
            finalSegments.push({ text: p.trim(), lang: 'vi-VN' });
          }
        });
      } else {
        finalSegments.push(seg);
      }
    });

    return finalSegments;
  }

  // Phát âm song ngữ tuần tự, mượt mà, tự nhiên (Tiếng Việt bằng giọng vi-VN, Tiếng Anh bằng giọng en-US)
  speakBilingual(text, onComplete) {
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      if (onComplete) onComplete();
      return;
    }

    window.speechSynthesis.cancel();
    const segments = this.parseBilingualSentence(text);
    if (segments.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.startsWith('vi') || v.name.includes('Vietnamese') || v.name.includes('An') || v.name.includes('Nam') || v.name.includes('Linh') || v.name.includes('Mai'));
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Guy')));

    let currentIdx = 0;
    const playNext = () => {
      if (currentIdx >= segments.length) {
        if (onComplete) onComplete();
        return;
      }

      const seg = segments[currentIdx++];
      const utterance = new SpeechSynthesisUtterance(seg.text);

      if (seg.lang === 'en-US') {
        utterance.lang = 'en-US';
        utterance.rate = 0.88;
        utterance.pitch = 1.05;
        if (enVoice) utterance.voice = enVoice;
      } else {
        utterance.lang = 'vi-VN';
        utterance.rate = 0.96;
        utterance.pitch = 1.02;
        if (viVoice) utterance.voice = viVoice;
      }

      utterance.onend = () => {
        playNext();
      };
      utterance.onerror = () => {
        playNext();
      };

      window.speechSynthesis.speak(utterance);
    };

    playNext();
  }

  // Lấy đường dẫn file âm thanh giọng clone Quang Minh (nếu có trong Manifest)
  getQuangMinhAudioUrl(textOrKey) {
    if (!textOrKey) return null;
    const str = String(textOrKey).trim();
    if (!window.QUANG_MINH_VOICE_MANIFEST && !window.QUANG_MINH_TEXT_MAP) return null;

    if (window.QUANG_MINH_VOICE_MANIFEST && window.QUANG_MINH_VOICE_MANIFEST[str]) {
      return window.QUANG_MINH_VOICE_MANIFEST[str];
    }
    if (window.QUANG_MINH_TEXT_MAP) {
      if (window.QUANG_MINH_TEXT_MAP[str]) {
        return window.QUANG_MINH_TEXT_MAP[str];
      }
      // Loại bỏ emoji, ký tự đặc biệt, chuẩn hóa khoảng trắng
      const clean = str.replace(/[\u{10000}-\u{10ffff}]|[\u2600-\u27bf]|[\u2300-\u23ff]|[\u2b50-\u2b55]|\uFE0F|\u200D/gu, '')
                       .replace(/_{2,}/g, ' chỗ trống ')
                       .replace(/\s+/g, ' ')
                       .trim();
      if (window.QUANG_MINH_TEXT_MAP[clean]) {
        return window.QUANG_MINH_TEXT_MAP[clean];
      }

      // Fuzzy / prefix match (nếu câu dài khớp 30 ký tự đầu)
      if (clean.length > 20) {
        const prefix = clean.substring(0, 30).toLowerCase();
        for (const [k, url] of Object.entries(window.QUANG_MINH_TEXT_MAP)) {
          if (k.toLowerCase().startsWith(prefix) || k.toLowerCase().includes(prefix)) {
            return url;
          }
        }
      }
    }
    return null;
  }

  // Phát âm thanh giọng clone Quang Minh với hiệu ứng avatar động và fallback an toàn
  playClonedAudio(audioUrl, onComplete, fallbackText) {
    this.stopSpeaking();
    console.log("🎙️ [Quang Minh Voice Playing]:", audioUrl);
    try {
      const audio = new Audio(audioUrl);
      this.currentVoiceAudio = audio;
      
      const pulseElem = document.getElementById('teacher-speak-pulse');
      if (pulseElem) pulseElem.classList.add('active');

      const cleanup = () => {
        if (pulseElem) pulseElem.classList.remove('active');
        if (this.currentVoiceAudio === audio) this.currentVoiceAudio = null;
      };

      audio.onended = () => {
        cleanup();
        if (onComplete) onComplete();
      };
      audio.onerror = (e) => {
        console.warn('⚠️ Lỗi phát audio Quang Minh, chuyển sang TTS:', audioUrl, e);
        cleanup();
        if (fallbackText) {
          this.speakBilingual(fallbackText, onComplete);
        } else if (onComplete) {
          onComplete();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('⚠️ Play audio blocked (cần click tương tác trước):', err);
          cleanup();
          if (fallbackText) {
            this.speakBilingual(fallbackText, onComplete);
          } else if (onComplete) {
            onComplete();
          }
        });
      }
      return true;
    } catch (e) {
      console.error(e);
      if (fallbackText) this.speakBilingual(fallbackText, onComplete);
      return false;
    }
  }

  stopSpeaking() {
    if (this.currentVoiceAudio) {
      try {
        this.currentVoiceAudio.pause();
        this.currentVoiceAudio.currentTime = 0;
      } catch (e) {}
      this.currentVoiceAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    const pulseElem = document.getElementById('teacher-speak-pulse');
    if (pulseElem) pulseElem.classList.remove('active');
  }

  speak(text) {
    const audioUrl = this.getQuangMinhAudioUrl(text);
    if (audioUrl) {
      this.playClonedAudio(audioUrl, null, text);
      return;
    }

    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') return;
    this.stopSpeaking();
    const cleanText = (text || '').replace(/_{2,}/g, ' blank ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (enVoice) utterance.voice = enVoice;

    window.speechSynthesis.speak(utterance);
  }

  speakVietnamese(text, onComplete) {
    const audioUrl = this.getQuangMinhAudioUrl(text);
    if (audioUrl) {
      this.playClonedAudio(audioUrl, onComplete, text);
      return;
    }
    // Tự động phân đoạn song ngữ để phát âm chuẩn xác cả tiếng Việt và các từ tiếng Anh lồng ghép
    this.speakBilingual(text, onComplete);
  }
}

class ConfettiManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(count = 70) {
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 120,
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: -Math.random() * 13 - 6,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
    if (!this.animationId) this.loop();
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.012;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();

      if (p.opacity <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
      }
    }
    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.loop());
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ==============================================================
// CHUỖI NHIỆM VỤ DẪN ĐƯỜNG LIÊN HOÀN ("DẮT MŨI" 10 BƯỚC KHUÔN VIÊN & THIÊN ĐÌNH)
// Tự Động Định Hướng Mũi Tên 3D, Cột Sáng Thiên Đình & Bấm Phím [T] Dịch Chuyển
// ==============================================================
const STORY_CHAIN_QUESTS = [
  {
    step: 0,
    npcId: 'xuan_my',
    targetName: 'Xuân My',
    targetTitle: 'Trưởng Ban Sao Đỏ 5C4',
    targetIcon: '📜',
    locationName: 'Sân Trường Ngô Quyền',
    coords: { x: 0, y: 0, z: 24 },
    taskDesc: 'Gặp bạn Xuân My tại sân trường để kiểm tra từ vựng Đồ Dùng Học Tập!',
    dialogue: 'Chào Hà My! Tớ là Xuân My đây. Cậu hãy giúp tớ kiểm tra từ vựng "School Supplies" xem cậu đã sẵn sàng cho ngày học mới chưa nhé!',
    question: 'Từ tiếng Anh nào chỉ "Cặp Sách / Balo Học Sinh"?',
    options: ['Backpack / School bag', 'Ruler', 'Pencil sharpener', 'Notebook'],
    correct: 0,
    explanation: 'Backpack hoặc School bag là chiếc cặp sách thân thiết của học sinh lớp 5!',
    guideToNext: 'Tuyệt vời Bé Hà My! Bác Bếp Bear ở Căn Tin đang cần em giúp dịch thực đơn tiếng Anh đấy, mau qua gặp bác nhé!'
  },
  {
    step: 1,
    npcId: 'chef_bear',
    targetName: 'Bác Bếp Bear',
    targetTitle: 'Đầu Bếp Căn Tin 5C4',
    targetIcon: '👨‍🍳',
    locationName: 'Nhà Ăn Căn Tin Lớp 5C4',
    coords: { x: -26, y: 0.6, z: 12.5 },
    taskDesc: 'Đến Căn Tin gặp Bác Bếp Bear để hỗ trợ thực đơn dinh dưỡng!',
    dialogue: 'Bác Bear chào cháu Hà My! Căn tin hôm nay có nhiều món ngon, cháu giúp bác kiểm tra từ vựng dinh dưỡng nhé!',
    question: 'Món nào sau đây là "Milk and Bread" trong bữa sáng bổ dưỡng?',
    options: ['Sữa tươi và Bánh mì', 'Cơm gà xối mỡ', 'Trà sữa trân châu', 'Khoai tây chiên'],
    correct: 0,
    explanation: 'Milk là sữa tươi, Bread là bánh mì - bộ đôi bữa sáng giàu năng lượng cho học sinh!',
    guideToNext: 'Cảm ơn cháu! Bác Ba Bảo Vệ ở Cổng Trường vừa báo có người hỏi chỉ dẫn tiếng Anh, cháu chạy ra hỗ trợ bác nhé!'
  },
  {
    step: 2,
    npcId: 'bac_bao_ve',
    targetName: 'Bác Ba Bảo Vệ',
    targetTitle: 'An Ninh Trường Ngô Quyền',
    targetIcon: '👮',
    locationName: 'Cổng Trường Chính',
    coords: { x: 13.2, y: 0, z: 27.8 },
    taskDesc: 'Ra Cổng Trường gặp Bác Ba Bảo Vệ để giải đáp bảng chỉ đường!',
    dialogue: 'Bác Ba chào cháu Hà My! Có người nước ngoài muốn hỏi đường đến Thư Viện, cháu dịch giúp bác câu này nhé!',
    question: 'Bảng chỉ dẫn: "Turn right and go straight to the library" nghĩa là gì?',
    options: ['Rẽ phải và đi thẳng tới thư viện', 'Rẽ trái đi vào căng tin', 'Dừng lại ở cổng trường', 'Đi lên tầng hai'],
    correct: 0,
    explanation: 'Turn right là rẽ phải, go straight là đi thẳng tới thư viện (library)!',
    guideToNext: 'Cháu giỏi quá! Thầy Việt ở Sân Thể Dục đang tìm tiền đạo biết tiếng Anh cho đội tuyển trường, cháu qua thử tài nhé!'
  },
  {
    step: 3,
    npcId: 'coach_viet',
    targetName: 'Thầy Việt',
    targetTitle: 'HLV Thể Dục 5C4',
    targetIcon: '⚽',
    locationName: 'Sân Bóng Đá Mini',
    coords: { x: -50, y: 0, z: 34 },
    taskDesc: 'Gặp Thầy Việt tại Sân Bóng Đá để tham gia bài test Thể thao!',
    dialogue: 'Hoan hô Hà My! Đội bóng 5C4 cần một cầu thủ xuất sắc hiểu khẩu lệnh thể thao tiếng Anh, em sẵn sàng chưa?',
    question: 'Khẩu lệnh: "Pass the ball and score a goal!" nghĩa là gì?',
    options: ['Chuyền bóng và ghi bàn!', 'Giữ bóng lại', 'Ném bóng ra ngoài', 'Thổi còi kết thúc'],
    correct: 0,
    explanation: 'Pass the ball là chuyền bóng, Score a goal là ghi bàn thắng tuyệt đẹp!',
    guideToNext: 'Phong độ đỉnh cao! Cô Huệ ở Thư Viện đang tìm một độc giả nhí tiếng Anh cừ khôi, em qua thăm cô nhé!'
  },
  {
    step: 4,
    npcId: 'librarian_hue',
    targetName: 'Cô Huệ',
    targetTitle: 'Thủ Thư Thư Viện',
    targetIcon: '📖',
    locationName: 'Thư Viện Ngô Quyền',
    coords: { x: 55, y: 0, z: 24 },
    taskDesc: 'Đến Thư Viện gặp Cô Huệ để mượn sách truyện tiếng Anh hay!',
    dialogue: 'Cô Huệ chào bé Hà My thông minh! Thư viện vừa về bộ sách truyện ngụ ngôn tiếng Anh, em giúp cô phân loại nhé!',
    question: 'Truyện ngụ ngôn: "The Tortoise and the Hare". Con vật nào kiên trì giành chiến thắng?',
    options: ['The Tortoise (Chú Rùa)', 'The Hare (Chú Thỏ)', 'The Fox (Con Cáo)', 'The Wolf (Con Sói)'],
    correct: 0,
    explanation: 'Chú Rùa (The Tortoise) chậm mà chắc, kiên trì không bỏ cuộc nên đã chiến thắng vẻ vang!',
    guideToNext: 'Em đọc sách giỏi quá! Báo động: Boss Dr. Mistake đang thách đấu ngữ pháp tại Đại Sân Khấu, em hãy ra tiếp chiêu!'
  },
  {
    step: 5,
    npcId: 'boss_dr_mistake',
    targetName: 'Boss Dr. Mistake',
    targetTitle: 'Giáo Sư Lỗi Sai Ngữ Pháp',
    targetIcon: '🧙‍♂️',
    locationName: 'Đại Sân Khấu Chào Cờ',
    coords: { x: 0, y: 1.2, z: 78 },
    taskDesc: 'Tiến ra Đại Sân Khấu để đánh bại Boss Dr. Mistake!',
    dialogue: 'Ha ha ha! Ta là Boss Dr. Mistake! Ta thách Hà My tìm ra lỗi sai ngữ pháp trong câu của ta đấy!',
    question: 'Sửa lỗi sai: "Yesterday she go to the supermarket." -> Động từ đúng phải là:',
    options: ['went', 'goes', 'going', 'gone'],
    correct: 0,
    explanation: 'Yesterday là quá khứ đơn, quá khứ bất quy tắc của "go" là "went"!',
    guideToNext: 'Ta chịu thua rồi! Nhưng em có đủ bản lĩnh leo Tháp Obby lên tận Thiên Đình Tây Du Ký để bái kiến Tôn Ngộ Không không?!'
  },
  {
    step: 6,
    npcId: 'sun_wukong',
    targetName: 'Tôn Ngộ Không',
    targetTitle: 'Tề Thiên Đại Thánh',
    targetIcon: '🐒',
    locationName: 'Cung Điện Thiên Đình (Đỉnh Tháp 80M)',
    coords: { x: 21, y: 80.6, z: 32 },
    taskDesc: 'Nhảy Tháp Obby leo 80M lên Thiên Đình bái kiến Tề Thiên Đại Thánh Tôn Ngộ Không!',
    dialogue: 'Khá khen cho tiểu nha đầu Hà My tự mình nhảy Obby leo lên tận mây xanh 80M! Hãy thi thố từ vựng phép thuật với Lão Tôn nào!',
    question: 'Tôn Ngộ Không nói: "I can transform 72 times." Từ "transform" nghĩa là gì?',
    options: ['Biến hóa', 'Ăn uống', 'Đi ngủ', 'Chạy bộ'],
    correct: 0,
    explanation: 'Transform là biến hóa (72 phép biến hóa thần thông Địa Sát của Ngộ Không)!',
    guideToNext: 'Ha ha, giỏi lắm! Lão Trư đệ đệ của ta đang ăn vụng Đào Tiên đằng kia, mau qua bắt quả tang nó bằng tiếng Anh!'
  },
  {
    step: 7,
    npcId: 'zhu_bajie',
    targetName: 'Trư Bát Giới',
    targetTitle: 'Thiên Bồng Nguyên Soái',
    targetIcon: '🐷',
    locationName: 'Vườn Đào Tiên Thiên Đình (80M)',
    coords: { x: 29, y: 80.6, z: 32 },
    taskDesc: 'Đến Vườn Đào Tiên 80M bắt quả tang Trư Bát Giới đang ăn vụng!',
    dialogue: 'Ôi ôi, bé Hà My! Lão Trư chỉ nếm thử một quả Đào Tiên ngọt lịm thôi mà! Em đừng mách sư phụ nhé!',
    question: 'Để xin một quả đào lịch sự, Trư Bát Giới nên nói câu nào?',
    options: ['May I have a peach, please?', 'Give me peach!', 'I don\'t want peach.', 'Peach is bad.'],
    correct: 0,
    explanation: 'May I have a peach, please? là câu đề nghị lịch sự tiêu chuẩn sách giáo khoa Lớp 5!',
    guideToNext: 'Hì hì, Hà My giỏi quá! Sa sư đệ đang canh giữ Nam Thiên Môn, em qua chào đệ ấy một tiếng nhé!'
  },
  {
    step: 8,
    npcId: 'sha_wujing',
    targetName: 'Sa Tăng',
    targetTitle: 'Quyển Liêm Đại Tướng',
    targetIcon: '🧔',
    locationName: 'Nam Thiên Môn Thiên Đình (80M)',
    coords: { x: 21, y: 80.6, z: 40 },
    taskDesc: 'Qua Nam Thiên Môn gặp Sa Tăng đàm đạo về lòng kiên trì!',
    dialogue: 'A Di Đà Phật! Sa Tăng bái kiến bé Hà My. Vượt 80M leo Obby lên đây chứng minh em có lòng kiên trì tuyệt vời!',
    question: 'Thành ngữ: "Practice makes perfect" nghĩa là gì trong học tập?',
    options: ['Có công mài sắt có ngày nên kim (Càng luyện tập càng thành thạo)', 'Học trước quên sau', 'Không cần học cũng giỏi', 'Học một biết mười'],
    correct: 0,
    explanation: 'Practice makes perfect: Càng chăm chỉ luyện tập tiếng Anh thì kết quả càng hoàn hảo!',
    guideToNext: 'Bé Hà My thật đức hạnh! Thái Thượng Lão Quân và Ngọc Hoàng trên Ngai Vàng Kim Loan đang đợi ban đại thưởng cho em!'
  },
  {
    step: 9,
    npcId: 'jade_emperor',
    targetName: 'Thái Thượng Lão Quân',
    targetTitle: 'Đạo Tổ Tiên Giới & Ngọc Hoàng',
    targetIcon: '🧙‍♂️',
    locationName: 'Điện Kim Loan Thiên Đình (80M)',
    coords: { x: 25, y: 81.8, z: 44.5 },
    taskDesc: 'Lên Ngai Vàng Kim Loan diện kiến Thái Thượng Lão Quân để nhận Đại Danh Hiệu!',
    dialogue: 'Lành thay! Bé Hà My lớp 5C4 đã hoàn thành xuất sắc toàn bộ chuỗi nhiệm vụ trường học và leo đỉnh Thiên Đình 80M! Hãy tiếp nhận khảo hạch tối cao!',
    question: 'Chọn câu viết đúng ngữ pháp tiếng Anh nhất:',
    options: ['She always practices English diligently.', 'She practice always English.', 'She is practice English yesterday.', 'She don\'t likes English.'],
    correct: 0,
    explanation: 'Chủ ngữ She ngôi thứ 3 số ít, trạng từ tần suất always đứng trước động từ practices, diligently đứng cuối!',
    guideToNext: '🎉 CHÚC MỪNG BÉ HÀ MY 5C4 ĐÃ ĐẮC ĐẠO THỦ KHOA TIẾNG ANH THIÊN ĐÌNH TỐI CAO! TOÀN BỘ BẢO BỐI ĐÃ ĐƯỢC BAN TẶNG!'
  }
];

class StoryQuestlineManager {
  constructor(gameEngine) {
    this.game = gameEngine;
    this.arena = null;
    this.currentStep = 0;
    this.load();
  }

  load() {
    try {
      const saved = localStorage.getItem('chip_story_quest_step');
      if (saved !== null) {
        this.currentStep = parseInt(saved, 10) || 0;
      }
    } catch (e) {
      this.currentStep = 0;
    }
    if (this.currentStep >= STORY_CHAIN_QUESTS.length) {
      this.currentStep = STORY_CHAIN_QUESTS.length - 1;
    }
  }

  save() {
    try {
      localStorage.setItem('chip_story_quest_step', this.currentStep);
    } catch (e) {}
  }

  getCurrentQuest() {
    return STORY_CHAIN_QUESTS[this.currentStep] || STORY_CHAIN_QUESTS[0];
  }

  isTargetNPC(npcId) {
    const q = this.getCurrentQuest();
    return q && q.npcId === npcId;
  }

  attachArena(arena) {
    this.arena = arena;
    this.syncWithArena();
  }

  syncWithArena() {
    if (!this.arena) return;
    const q = this.getCurrentQuest();
    if (q) {
      this.arena.setQuestNavigationTarget(
        q.coords.x,
        q.coords.y,
        q.coords.z,
        q.targetName,
        q.targetIcon
      );
      this.updateHUDNavigator();
    }
  }

  updateNavDistance(dist, target, hasArrived) {
    document.querySelectorAll('.dist-val').forEach(el => {
      el.textContent = hasArrived ? 'ĐÃ ĐẾN NƠI 🎉' : `${dist}m`;
    });
  }

  updateHUDNavigator() {
    const q = this.getCurrentQuest();
    if (!q) return;

    document.querySelectorAll('.hud-quest-navigator').forEach(navEl => {
      navEl.style.display = 'flex';
      const titleEl = navEl.querySelector('.quest-nav-title');
      const descEl = navEl.querySelector('.quest-nav-desc');
      if (titleEl) titleEl.textContent = `Nhiệm Vụ ${this.currentStep + 1}/10: ${q.targetIcon} ${q.targetName}`;
      if (descEl) descEl.textContent = q.taskDesc;
    });

    document.querySelectorAll('.btn-quest-nav-teleport').forEach(btn => {
      if (!btn._wired) {
        btn._wired = true;
        btn.addEventListener('click', () => {
          if (this.arena) {
            this.arena.teleportToQuestTarget();
          }
        });
      }
    });
  }

  handleNPCInteract(npc, game) {
    const q = this.getCurrentQuest();
    if (!q) return;
    this.openQuestModal(q, game);
  }

  openQuestModal(quest, game) {
    // Tắt ngay cột sáng và mũi tên khi bắt đầu tương tác với NPC
    if (this.arena) {
      if (this.arena.navArrowGroup) this.arena.navArrowGroup.visible = false;
      if (this.arena.beaconBeamGroup) this.arena.beaconBeamGroup.visible = false;
    }

    let modal = document.getElementById('campus-story-quest-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'campus-story-quest-modal';
      modal.className = 'campus-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="campus-modal-card story-quest-modal-card">
        <div class="campus-modal-header">
          <div class="campus-modal-title-box">
            <span class="campus-modal-icon">${quest.targetIcon}</span>
            <div>
              <h3>NHIỆM VỤ TIẾNG ANH: ${quest.targetName.toUpperCase()}</h3>
              <span class="campus-modal-sub">📍 Địa điểm: ${quest.locationName}</span>
            </div>
          </div>
          <button class="campus-modal-close" id="btn-close-story-quest-modal">✖</button>
        </div>

        <div class="quest-dialogue-banner">
          <div class="quest-npc-avatar-chibi">${quest.targetIcon}</div>
          <div class="quest-npc-speech-bubble">
            "${quest.dialogue}"
          </div>
        </div>

        <div class="story-quiz-container">
          <div class="story-quiz-question-box">
            <span class="story-quiz-tag">CÂU HỎI THÁCH ĐẤU [BƯỚC ${this.currentStep + 1}/10]</span>
            <div class="story-quiz-question-text">${quest.question}</div>
          </div>

          <div class="story-quiz-options-grid" id="story-quiz-options">
            ${quest.options.map((opt, idx) => `
              <button class="story-option-btn" data-opt-idx="${idx}">
                <span class="opt-prefix">${['A', 'B', 'C', 'D'][idx]}</span>
                <span class="opt-text">${opt}</span>
              </button>
            `).join('')}
          </div>

          <div class="story-quiz-feedback-box" id="story-quiz-feedback" style="display: none;"></div>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById('btn-close-story-quest-modal');
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };

    const optionsContainer = document.getElementById('story-quiz-options');
    const feedbackBox = document.getElementById('story-quiz-feedback');

    optionsContainer.querySelectorAll('.story-option-btn').forEach(btn => {
      btn.onclick = (e) => {
        const selectedIdx = parseInt(e.currentTarget.getAttribute('data-opt-idx'), 10);
        const isCorrect = (selectedIdx === quest.correct);

        if (isCorrect) {
          game.sound.playCorrect();
          game.confetti.fire(70);
          btn.classList.add('correct');

          if (game.economy) {
            game.economy.addCoins(50, `Hoàn thành nhiệm vụ ${quest.targetName}`);
            game.economy.addExp(40);
            game.economy.addStars(2);
            game.updateCampusHUDCurrency();
          }

          feedbackBox.className = 'story-quiz-feedback-box success';
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = `
            <div class="fb-title">🎉 CHÍNH XÁC XUẤT SẮC! (+50 Xu 🪙, +2 Sao ⭐)</div>
            <div class="fb-explain">${quest.explanation}</div>
            <div class="fb-guide">
              <strong>${quest.targetName}:</strong> "${quest.guideToNext}"
            </div>
            <button class="btn-advance-story-quest" id="btn-advance-quest">
              Tiếp Nhận Hướng Dẫn & Gặp NPC Tiếp Theo ➡️
            </button>
          `;

          const btnAdv = document.getElementById('btn-advance-quest');
          if (btnAdv) {
            btnAdv.onclick = () => {
              modal.style.display = 'none';
              this.advanceStep();
            };
          }
        } else {
          game.sound.playWrong();
          btn.classList.add('wrong');
          feedbackBox.className = 'story-quiz-feedback-box error';
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = `
            <div class="fb-title">❌ Chưa chính xác rồi bé ơi!</div>
            <div class="fb-explain">Bé hãy suy nghĩ kỹ và thử chọn lại một đáp án khác nhé!</div>
          `;
        }
      };
    });
  }

  advanceStep() {
    if (this.currentStep < STORY_CHAIN_QUESTS.length - 1) {
      this.currentStep++;
      this.save();
      this.syncWithArena();

      const nextQ = this.getCurrentQuest();
      if (this.game) {
        this.game.showNPCDialogue(
          { name: nextQ.targetName, title: nextQ.targetTitle, icon: nextQ.targetIcon },
          `🧭 Mũi tên dẫn đường đang chỉ thẳng tới vị trí của ${nextQ.targetName} tại ${nextQ.locationName}! Hãy đi theo hướng mũi tên hoặc bấm [T] để đến ngay!`
        );
      }
    } else {
      this.game.sound.playVictory();
      this.game.confetti.fire(150);
      if (this.game.economy) {
        this.game.economy.addCoins(500, 'Đắc đạo Thủ Khoa Tiếng Anh Thiên Đình');
        this.game.economy.addStars(50);
        this.game.updateCampusHUDCurrency();
      }
      if (this.game.shop) {
        this.game.shop.unlockItem('pet_cloud');
        this.game.shop.unlockItem('outfit_wukong');
      }
      alert("👑 CHÚC MỪNG BÉ HÀ MY 5C4!\nEm đã hoàn thành toàn bộ 10 bước Chuỗi Nhiệm Vụ Liên Hoàn từ Sân Trường lên Cung Điện Thiên Đình!\nPhần thưởng tối cao:\n✨ +500 Xu Vàng 🪙\n✨ +50 Sao Tím ⭐\n✨ Thú cưng Thần Thoại: Cân Đẩu Vân ☁️\n✨ Trang phục Hoàng Kim: Giáp Tôn Ngộ Không 🐒!");
    }
  }
}

class ChipGameEngine {
  constructor() {
    this.sound = new SoundController();
    this.confetti = new ConfettiManager(document.getElementById('confetti-canvas'));

    // Khối lớp học hiện tại (Mặc định lớp 5 của Hà My 5C4)
    this.currentGrade = localStorage.getItem('chip_current_grade') || 'grade5';
    if (!CURRICULUM_DATA[this.currentGrade]) {
      this.currentGrade = 'grade5';
    }

    // Mini game states
    this.memoryState = {};
    this.spellingState = {};
    this.quizState = { qIdx: 0, streak: 0 };
    this.active3DArena = null;
    this.quizKeyHandler = null;

    // Tự động làm mới toàn bộ tiến trình học tập, sao, exp, bài đã làm và nhiệm vụ về 0 cho bé Hà My test ngày mai
    const CLEAN_TEST_KEY = 'chip_fresh_reset_ha_my_20261003';
    if (localStorage.getItem(CLEAN_TEST_KEY) !== 'done') {
      [
        'chip_coins', 'chip_stars', 'chip_exp',
        'chip_quests_v2', 'chip_quests_v3', 'chip_shop_outfits', 'chip_shop_pets',
        'chip_equipped_outfit', 'chip_equipped_pet',
        'chip_stars_grade5', 'chip_exp_grade5', 'chip_completed_stages_grade5',
        'chip_stars_grade1', 'chip_exp_grade1', 'chip_completed_stages_grade1',
        'chip_stars_grade2', 'chip_exp_grade2', 'chip_completed_stages_grade2'
      ].forEach(k => localStorage.removeItem(k));
      localStorage.setItem(CLEAN_TEST_KEY, 'done');
      console.log('✨ [CLEAN TEST RESET]: Đã dọn sạch toàn bộ bài học và nhiệm vụ về 0 sẵn sàng cho bé Hà My test!');
    }

    // Khởi tạo các phân hệ Campus RPG (Kinh tế, Nhiệm vụ, Cửa hàng, Nhạc nền)
    this.initCampusRPG();
    window.ChipGameInstance = this;

    // Khởi tạo Chuỗi Nhiệm Vụ Liên Hoàn "Dắt Mũi" 10 Bước
    this.storyQuestline = new StoryQuestlineManager(this);
    window.StoryQuestlineInstance = this.storyQuestline;

    this.loadGradeData();
    this.initUI();
    this.renderWorldMap();
  }

  getCurrentCurriculum() {
    return CURRICULUM_DATA[this.currentGrade] || CURRICULUM_DATA.grade5;
  }

  getCurrentIslands() {
    return this.getCurrentCurriculum().islands;
  }

  getCurrentRanks() {
    return this.getCurrentCurriculum().ranks;
  }

  loadGradeData() {
    this.stars = parseInt(localStorage.getItem(`chip_stars_${this.currentGrade}`) || '0', 10);
    this.exp = parseInt(localStorage.getItem(`chip_exp_${this.currentGrade}`) || '0', 10);
    this.completedStages = JSON.parse(localStorage.getItem(`chip_completed_stages_${this.currentGrade}`) || '{}');

    this.currentIslandIndex = 0;
    this.currentStageIndex = 0;
    this.activeStage = null;
  }

  saveGradeData() {
    localStorage.setItem(`chip_stars_${this.currentGrade}`, this.stars);
    localStorage.setItem(`chip_exp_${this.currentGrade}`, this.exp);
    localStorage.setItem(`chip_completed_stages_${this.currentGrade}`, JSON.stringify(this.completedStages));
  }

  switchGrade(gradeKey) {
    this.cleanup3D();
    if (!CURRICULUM_DATA[gradeKey] || this.currentGrade === gradeKey) return;
    this.currentGrade = gradeKey;
    localStorage.setItem('chip_current_grade', gradeKey);
    this.loadGradeData();
    this.updateDashboard();
    this.updateGradeTabsUI();
    this.renderWorldMap();
    this.sound.playClick();
  }

  updateGradeTabsUI() {
    const tabBtns = document.querySelectorAll('.grade-tab-btn');
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-grade') === this.currentGrade) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  isSmartMode() {
    return this.currentGrade === 'grade5';
  }

  initUI() {
    const soundBtn = document.getElementById('sound-toggle-btn');
    soundBtn.addEventListener('click', () => {
      const on = this.sound.toggleSound();
      soundBtn.textContent = on ? '🔊' : '🔇';
    });

    document.getElementById('btn-victory-continue').addEventListener('click', () => {
      this.sound.playClick();
      this.closeVictoryModal();
      this.renderIslandMiniMap(this.currentIslandIndex);
    });

    const tabBtns = document.querySelectorAll('.grade-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const grade = btn.getAttribute('data-grade');
        this.switchGrade(grade);
      });
    });

    // Nút Reset sạch tiến trình cho con gái test
    const resetBtn = document.getElementById('btn-reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetAllGameProgress();
      });
    }

    this.initNotebookUI();
    this.initGlobalModalListeners();
    this.updateGradeTabsUI();
    this.updateDashboard();
  }

  // Khởi tạo trình lắng nghe đóng mở các modal toàn cục
  initGlobalModalListeners() {
    const wireClose = (btnId, modalId) => {
      const btn = document.getElementById(btnId);
      const modal = document.getElementById(modalId);
      if (btn && modal) {
        btn.onclick = () => { modal.style.display = 'none'; };
      }
    };

    wireClose('btn-close-quest-modal', 'campus-quest-modal');
    wireClose('btn-close-shop-modal', 'campus-shop-modal');
    wireClose('btn-close-snack-modal', 'campus-snack-modal');
    wireClose('btn-close-fishing-modal', 'campus-fishing-modal');
    wireClose('btn-close-lb-modal', 'campus-leaderboard-modal');
    wireClose('btn-close-penalty-modal', 'campus-penalty-modal');
    wireClose('btn-close-memory-modal', 'campus-memory-modal');
    wireClose('btn-close-boss-modal', 'campus-boss-modal');
    wireClose('btn-close-endless-modal', 'campus-endless-modal');
    wireClose('btn-close-celestial-modal', 'campus-celestial-modal');
    wireClose('btn-close-story-quest-modal', 'campus-story-quest-modal');

    // Đóng khi bấm ra ngoài nền tối overlay
    document.querySelectorAll('.campus-modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.style.display = 'none';
        }
      });
    });
  }

  // Kết nối toàn bộ callback tương tác thế giới 3D (Áp dụng chung cho cả Sân Trường Chính & Phòng Học)
  setupArenaCallbacks(arena) {
    if (!arena) return;

    if (this.storyQuestline) {
      this.storyQuestline.attachArena(arena);
    }

    arena.onQuestNavUpdate = (dist, target, hasArrived) => {
      if (this.storyQuestline) {
        this.storyQuestline.updateNavDistance(dist, target, hasArrived);
      }
    };

    arena.onNPCInteractCallback = (npc) => {
      // Khi tương tác NPC -> Tắt ngay lập tức cột sáng và mũi tên điều hướng
      if (arena.navArrowGroup) arena.navArrowGroup.visible = false;
      if (arena.beaconBeamGroup) arena.beaconBeamGroup.visible = false;

      // 1. Tương tác 4 NPC Thần Thoại Tây Du Ký trên Thiên Đình Bầu Trời
      if (npc.id === 'sun_wukong' || npc.id === 'zhu_bajie' || npc.id === 'sha_wujing' || npc.id === 'jade_emperor') {
        this.openCelestialQuestModal(npc);
        return;
      }

      // 2. Tương tác NPC trong Chuỗi Nhiệm Vụ Dẫn Đường Liên Hoàn ("Dắt Mũi")
      if (this.storyQuestline && this.storyQuestline.isTargetNPC(npc.id)) {
        this.storyQuestline.handleNPCInteract(npc, this);
        return;
      }

      if (npc.id === 'co_bay_an_vat') {
        this.openCoBaySnackShopModal();
      } else if (npc.id === 'teacher_co_mai') {
        this.openMathClassroomModal();
      } else if (npc.id === 'boss_dr_mistake') {
        this.openBossBattleMinigame();
      } else if (npc.id === 'xuan_my') {
        this.openQuestModal();
      } else if (npc.id === 'chef_bear') {
        this.openCanteenModal();
      } else if (npc.id === 'fisherman') {
        this.openFishingModal();
      } else if (npc.id === 'coach_viet' || npc.id === 'goalie_robot') {
        this.openSoccerPenaltyMinigame();
      } else if (npc.id === 'librarian_hue') {
        this.openLibraryMemoryMinigame();
      } else if (npc.id === 'gardener_tu') {
        this.openBotanicalQuizModal();
      } else if (npc.id === 'co_lan' || npc.id === 'thay_tuan') {
        const speech = (this.activeStage && this.activeStage.teacherIntro) || "Chào mừng con gái Hà My! Hãy quan sát kỹ câu hỏi trên bảng đen nhé!";
        this.sound.speakVietnamese(speech);
        this.showNPCDialogue(npc, speech);
      } else if (npc.quotes && npc.quotes.length > 0) {
        const quote = npc.quotes[Math.floor(Math.random() * npc.quotes.length)];
        this.showNPCDialogue(npc, quote);
      }
    };

    arena.onFishingSpotCallback = () => {
      this.openFishingModal();
    };

    arena.onFlagpoleCallback = () => {
      this.triggerFlagSalute();
    };

    arena.onSoccerPenaltyCallback = () => {
      this.openSoccerPenaltyMinigame();
    };

    arena.onLibraryCallback = () => {
      this.openLibraryMemoryMinigame();
    };

    arena.onBossBattleCallback = () => {
      this.openBossBattleMinigame();
    };

    arena.onBotanicalGardenCallback = () => {
      this.openBotanicalQuizModal();
    };

    arena.onBasketballCallback = () => {
      this.openBasketballPrompt();
    };

    arena.onHonorRollCallback = () => {
      this.openHonorRollModal();
    };

    arena.onBunnySanctuaryCallback = () => {
      this.openBunnySanctuaryModal();
    };

    arena.onVendingMachineCallback = () => {
      this.openVendingMachineModal();
    };

    arena.onPhotoBoothCallback = () => {
      this.openPhotoBoothModal();
    };

    arena.onReadingNookCallback = () => {
      this.openReadingNookModal();
    };

    arena.onSchoolDrumCallback = () => {
      this.playSchoolDrumEffect();
    };

    arena.onFolkGameCallback = () => {
      this.openFolkGameModal();
    };

    arena.onCollectStarCallback = (star) => {
      if (this.economy) {
        this.economy.addStars(1);
        this.economy.addCoins(5);
        this.economy.addExp(10);
        this.updateCampusHUDCurrency();
      }
    };
  }

  // Phương thức reset sạch toàn bộ dữ liệu bài học, nhiệm vụ, xu, sao về 0
  resetAllGameProgress() {
    const confirmReset = window.confirm("Bạn có chắc chắn muốn RESET toàn bộ nhiệm vụ, số bài đã làm, điểm sao và cấp độ về 0 để con gái bắt đầu làm bài kiểm tra từ đầu không?");
    if (!confirmReset) return;

    // 1. Dọn sạch toàn bộ localStorage liên quan
    [
      'chip_coins', 'chip_stars', 'chip_exp',
      'chip_quests_v2', 'chip_shop_outfits', 'chip_shop_pets',
      'chip_equipped_outfit', 'chip_equipped_pet',
      'chip_stars_grade5', 'chip_exp_grade5', 'chip_completed_stages_grade5',
      'chip_stars_grade1', 'chip_exp_grade1', 'chip_completed_stages_grade1',
      'chip_stars_grade2', 'chip_exp_grade2', 'chip_completed_stages_grade2'
    ].forEach(k => localStorage.removeItem(k));

    // 2. Đặt lại trạng thái trong engine
    this.stars = 0;
    this.exp = 0;
    this.completedStages = {};
    this.currentIslandIndex = 0;
    this.currentStageIndex = 0;
    this.activeStage = null;
    this.quizState = { qIdx: 0, streak: 0 };
    this.saveGradeData();

    // 3. Reset các phân hệ RPG
    if (this.economy && typeof this.economy.reset === 'function') {
      this.economy.reset();
    }
    if (this.questMgr && typeof this.questMgr.reset === 'function') {
      this.questMgr.reset();
    }
    if (this.shop && typeof this.shop.reset === 'function') {
      this.shop.reset();
    }

    // 4. Cập nhật lại giao diện Dashboard và Bản đồ
    this.cleanup3D();
    this.updateDashboard();
    this.renderWorldMap();
    if (typeof this.updateQuestUI === 'function') {
      this.updateQuestUI();
    }

    this.sound.playCorrect();
    alert("🎉 Đã reset thành công! Toàn bộ nhiệm vụ, số bài đã làm và cấp độ đã trở về 0, sẵn sàng cho bé Hà My làm bài!");
  }

  initNotebookUI() {
    const btnOpen = document.getElementById('btn-grammar-notebook');
    const modal = document.getElementById('grammar-notebook-modal');
    const btnClose = document.getElementById('btn-close-notebook');

    if (btnOpen) {
      btnOpen.addEventListener('click', () => {
        this.sound.playClick();
        this.renderNotebookTab('tobe');
        modal.classList.add('active');
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', () => {
        this.sound.playClick();
        modal.classList.remove('active');
      });
    }

    const tabBtns = document.querySelectorAll('.nb-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.sound.playClick();
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tabKey = btn.getAttribute('data-nbtab');
        this.renderNotebookTab(tabKey);
      });
    });
  }

  renderNotebookTab(tabKey) {
    const bodyEl = document.getElementById('notebook-content-body');
    if (!bodyEl) return;

    if (tabKey === 'tobe') {
      bodyEl.innerHTML = `
        <div class="nb-rule-card">
          <div class="nb-rule-title">📘 1. Công Thức Động Từ To Be (Thì Hiện Tại Đơn - Trang 1 & 3)</div>
          <div class="nb-formula-banner">
            ⭐ I + AM<br>
            ⭐ He / She / It / Danh từ số ít / Tên riêng + IS<br>
            ⭐ We / You / They / Danh từ số nhiều (có -s) + ARE
          </div>
          <div class="nb-mnemonic-callout">
            💡 <strong>Mẹo Tư Duy Của Hà My:</strong> Nhìn ngay vào CHỦ NGỮ đứng trước chỗ trống:<br>
            - Nếu chủ ngữ có đuôi "-s" (như <em>the cakes, the pens, my friends</em>) ➔ Danh từ số nhiều ➔ Bắt buộc đi với <strong>ARE</strong>!<br>
            - Nếu là tên riêng hoặc danh từ số ít (như <em>Paul, Jennifer, her name, the dog</em>) ➔ Đi với <strong>IS</strong>!<br>
            - Riêng chủ ngữ <em>I</em> ➔ Đi với <strong>AM</strong>!
          </div>
          <table class="nb-table">
            <thead><tr><th>Thể</th><th>Cấu Trúc</th><th>Ví Dụ Trong Bài Hà My</th></tr></thead>
            <tbody>
              <tr><td>Khẳng định (+)</td><td>S + am / is / are + ...</td><td>The cakes <strong>are</strong> so tasty.<br>Her name <strong>is</strong> Jennifer.</td></tr>
              <tr><td>Phủ định (-)</td><td>S + am not / isn't / aren't + ...</td><td>He <strong>isn't</strong> a doctor.<br>They <strong>aren't</strong> hungry.</td></tr>
              <tr><td>Nghi vấn (?)</td><td>Am / Is / Are + S + ...?</td><td><strong>Are</strong> they hungry? ➔ Yes, they are.<br><strong>Is</strong> he French? ➔ No, he isn't.</td></tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tabKey === 'verbs') {
      bodyEl.innerHTML = `
        <div class="nb-rule-card">
          <div class="nb-rule-title">📗 2. Động Từ Thường Ở Thì Hiện Tại Đơn (Trang 2 & Trang 4-7)</div>
          <div class="nb-formula-banner">
            ⭐ S (I / We / You / They / Số nhiều) + V (nguyên thể)<br>
            ⭐ S (He / She / It / Danh từ số ít) + V-s / V-es
          </div>
          <div class="nb-mnemonic-callout">
            💡 <strong>Quy Tắc Vàng:</strong> Thì hiện tại đơn diễn tả <strong>thói quen hàng ngày</strong> hoặc <strong>chân lý khoa học</strong>.<br>
            - Khi chủ ngữ là số ít (He, She, It, Paul, Bobby, Mum...) ➔ Động từ <strong>PHẢI THÊM ĐUÔI -S hoặc -ES</strong>!<br>
            - Khi chủ ngữ là số nhiều (Tim and Kim, They, We) ➔ Động từ <strong>GIỮ NGUYÊN THỂ</strong>!
          </div>
          <table class="nb-table">
            <thead><tr><th>Chủ Ngữ</th><th>Dạng Động Từ</th><th>Ví Dụ Điển Hình (Trang 5)</th></tr></thead>
            <tbody>
              <tr><td>He / Paul / Linda (Số ít)</td><td>Thêm -s / -es</td><td>He usually <strong>walks</strong> to school.<br>Paul <strong>thinks</strong> it's a good idea.<br>Linda <strong>sings</strong> very well.</td></tr>
              <tr><td>Tim and Kim / They (Số nhiều)</td><td>Nguyên thể (V-bare)</td><td>Tim and Kim never <strong>win</strong>.</td></tr>
              <tr><td>Bất quy tắc: Have</td><td>Chuyển thành HAS</td><td>Bobby <strong>has</strong> a bath every day.</td></tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tabKey === 'ses') {
      bodyEl.innerHTML = `
        <div class="nb-rule-card">
          <div class="nb-rule-title">📙 3. Quy Tắc Thêm Đuôi -S và -ES (Trang 2 & Trang 6)</div>
          <div class="nb-mnemonic-callout">
            🔥 <strong>MẸO THẦN CHÚ "ÔNG SÁU CHẠY XE SH ZUI":</strong><br>
            Các động từ tận cùng bằng: <strong>O, S, X, CH, SH, Z</strong> ➔ BẮT BUỘC THÊM <strong>-ES</strong>!<br>
            - g<strong>o</strong> ➔ go<strong>es</strong> | d<strong>o</strong> ➔ do<strong>es</strong><br>
            - wat<strong>ch</strong> ➔ watch<strong>es</strong> | tea<strong>ch</strong> ➔ teach<strong>es</strong><br>
            - wa<strong>sh</strong> ➔ wash<strong>es</strong> | fi<strong>x</strong> ➔ fix<strong>es</strong> | mi<strong>ss</strong> ➔ miss<strong>es</strong>
          </div>
          <table class="nb-table">
            <thead><tr><th>Đuôi Tận Cùng</th><th>Quy Tắc</th><th>Ví Dụ Cụ Thể Trong Sách</th></tr></thead>
            <tbody>
              <tr><td>O, S, X, CH, SH, Z</td><td>Thêm -ES</td><td>watch ➔ watches, wash ➔ washes, fix ➔ fixes, go ➔ goes</td></tr>
              <tr><td>Phụ âm + Y (fly, cry, try)</td><td>Đổi Y thành I + ES</td><td>fly ➔ fl<strong>ies</strong>, cry ➔ cr<strong>ies</strong>, try ➔ tr<strong>ies</strong></td></tr>
              <tr><td>Nguyên âm + Y (play, buy)</td><td>Chỉ thêm -S</td><td>play ➔ play<strong>s</strong>, buy ➔ buy<strong>s</strong></td></tr>
              <tr><td>Các động từ còn lại</td><td>Chỉ thêm -S</td><td>walk ➔ walks, think ➔ thinks, eat ➔ eats, read ➔ reads</td></tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tabKey === 'pronun') {
      bodyEl.innerHTML = `
        <div class="nb-rule-card">
          <div class="nb-rule-title">🎧 4. Bí Kíp Phát Âm Đuôi -S / -ES (/s/, /iz/, /z/ - Trang 2)</div>
          <div class="nb-mnemonic-callout">
            🎯 <strong>3 QUY TẮC PHÁT ÂM CHUẨN CỦA HÀ MY:</strong><br><br>
            1️⃣ <strong>Đọc là /iz/</strong>: Khi động từ tận cùng bằng các âm gió /s, z, ʃ, ʧ, ʒ, ʤ/ (ch, sh, s, x, z, ce, ge).<br>
            ➔ Ví dụ: <em>watches /iz/, washes /iz/, fixes /iz/, dances /iz/</em>.<br><br>
            2️⃣ <strong>Đọc là /s/</strong>: Mẹo <strong>"THỜI PHONG KIẾN PHƯƠNG TÂY"</strong> (các âm vô thanh /θ, p, k, f, t/).<br>
            ➔ Ví dụ: <em>walks /s/, stops /s/, looks /s/, laughs /s/, waits /s/</em>.<br><br>
            3️⃣ <strong>Đọc là /z/</strong>: Tất cả các nguyên âm và phụ âm hữu thanh còn lại.<br>
            ➔ Ví dụ: <em>plays /z/, cleans /z/, reads /z/, wins /z/, waters /z/, lives /z/</em>.
          </div>
        </div>
      `;
    } else if (tabKey === 'aux') {
      bodyEl.innerHTML = `
        <div class="nb-rule-card">
          <div class="nb-rule-title">⚡ 5. Trợ Động Từ (Don't / Doesn't / Do / Does - Trang 8-10, 13)</div>
          <div class="nb-formula-banner">
            ⭐ Phủ định: S + DON'T / DOESN'T + V (nguyên thể)<br>
            ⭐ Nghi vấn: DO / DOES + S + V (nguyên thể)?
          </div>
          <div class="nb-mnemonic-callout">
            ⚠️ <strong>BẪY CẦN TRÁNH TUYỆT ĐỐI:</strong><br>
            Khi trong câu ĐÃ CÓ trợ động từ <em>don't, doesn't, do, does</em> thì động từ chính <strong>LUÔN VỀ DẠNG NGUYÊN THỂ (bare infinitive - bỏ sạch đuôi s/es)</strong>!<br>
            ❌ <em>He doesn't walks (SAI)</em> ➔ ✅ <em>He doesn't <strong>walk</strong> (ĐÚNG)</em><br>
            ❌ <em>Does she likes milk? (SAI)</em> ➔ ✅ <em>Does she <strong>like</strong> milk? (ĐÚNG)</em>
          </div>
          <table class="nb-table">
            <thead><tr><th>Chủ Ngữ</th><th>Phủ Định</th><th>Nghi Vấn & Trả Lời</th></tr></thead>
            <tbody>
              <tr><td>I / You / We / They / Số nhiều</td><td>DON'T + V-bare</td><td><strong>Do</strong> you walk? ➔ Yes, I do. / No, I don't.</td></tr>
              <tr><td>He / She / It / Số ít</td><td>DOESN'T + V-bare</td><td><strong>Does</strong> the dog bark? ➔ Yes, it does. / No, it doesn't.</td></tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tabKey === 'unit1') {
      bodyEl.innerHTML = `
        <div class="nb-rule-card">
          <div class="nb-rule-title">👑 6. Unit 1: All About Me (Giao Tiếp & Bản Thân - Trang 15-22)</div>
          <div class="nb-mnemonic-callout">
            👧 <strong>MẪU CÂU HỘI THOẠI TRỌNG TÂM CỦA HÀ MY:</strong><br>
            1. Hỏi lớp học: <strong>What class are you in?</strong> ➔ <em>I'm in class 5C4.</em><br>
            2. Hỏi tuổi: <strong>How old are you?</strong> ➔ <em>I'm 10 / 11 years old.</em><br>
            3. Hỏi sở thích: <strong>What is your favorite animal / sport / colour / food?</strong><br>
            ➔ <em>My favorite animal is a dolphin / peacock / giraffe / panda.</em><br>
            ➔ <em>My favorite sport is swimming / football / badminton.</em><br>
            ➔ <em>My favorite food is Pho noodles / pizza / sandwich.</em><br>
            4. Hỏi nơi ở: <strong>Where do you live?</strong> ➔ <em>I live in the countryside / a small town / Hanoi city.</em><br>
            5. Hỏi quá khứ: <strong>Where were you yesterday?</strong> ➔ <em>I was at school / at home.</em>
          </div>
        </div>
      `;
    } else if (tabKey === 'cont') {
      bodyEl.innerHTML = `
        <div class="nb-rule-card">
          <div class="nb-rule-title">⚡ 7. Thì Hiện Tại Tiếp Diễn (Present Continuous Tense - Trang 34-40)</div>
          <div class="nb-formula-banner">
            ⭐ Khẳng định (+): S + am / is / are + V-ing<br>
            ⭐ Phủ định (-): S + am not / isn't / aren't + V-ing<br>
            ⭐ Nghi vấn (?): Am / Is / Are + S + V-ing? ➔ Yes, S + to be / No, S + to be + not
          </div>
          <div class="nb-mnemonic-callout">
            💡 <strong>Dấu Hiệu Nhận Biết Bắt Buộc Nhớ:</strong><br>
            - <strong>now</strong> (bây giờ), <strong>right now</strong> (ngay bây giờ), <strong>at the moment</strong> (lúc này), <strong>at present</strong> (hiện tại), <strong>today</strong>.<br>
            - Sau câu mệnh lệnh chú ý: <strong>Look!</strong> (Nhìn kìa!), <strong>Listen!</strong> (Lắng nghe kìa!), <strong>Be quiet!</strong> (Giữ trật tự!).<br>
            - Hành động song song: <strong>While</strong> (trong khi): <em>My mum is cooking while my dad is reading.</em>
          </div>
          <table class="nb-table">
            <thead><tr><th>Quy Tắc Thêm Đuôi -ing</th><th>Cách Biến Đổi</th><th>Ví Dụ Trong Bài SGK</th></tr></thead>
            <tbody>
              <tr><td>Thông thường</td><td>Thêm trực tiếp -ing</td><td>speak ➔ <strong>speaking</strong>, cook ➔ <strong>cooking</strong></td></tr>
              <tr><td>Tận cùng là 'e'</td><td>Bỏ 'e' rồi thêm -ing</td><td>dance ➔ <strong>dancing</strong>, smile ➔ <strong>smiling</strong>, write ➔ <strong>writing</strong></td></tr>
              <tr><td>1 âm tiết (1 nguyên âm kẹp giữa 2 phụ âm)</td><td>Gấp đôi phụ âm cuối rồi thêm -ing</td><td>run ➔ <strong>running</strong>, swim ➔ <strong>swimming</strong>, set ➔ <strong>setting</strong>, put ➔ <strong>putting</strong></td></tr>
              <tr><td>Tận cùng là 'ie'</td><td>Đổi 'ie' thành 'y' + ing</td><td>lie ➔ <strong>lying</strong>, tie ➔ <strong>tying</strong></td></tr>
              <tr><td>Tận cùng là 'y' (kể cả cry, play, study)</td><td>Giữ nguyên 'y' + ing</td><td>cry ➔ <strong>crying</strong>, play ➔ <strong>playing</strong>, study ➔ <strong>studying</strong></td></tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tabKey === 'freetime') {
      bodyEl.innerHTML = `
        <div class="nb-rule-card">
          <div class="nb-rule-title">🏡 8. Unit 2 & Unit 4: Nơi Ở & Thời Gian Rảnh (Trang 25-26, 61-64)</div>
          <div class="nb-mnemonic-callout">
            📍 <strong>1. MẪU CÂU HỎI VỀ ĐỊA CHỈ & NƠI Ở (Unit 2):</strong><br>
            - Hỏi: <strong>Where do you live?</strong> ➔ Trả lời: <em>I live in a big tower / flat / building.</em><br>
            - Khi có số nhà cụ thể: <em>I live <strong>at</strong> 116 Hoa Binh Street.</em> (Số nhà dùng <strong>AT</strong>, tên đường dùng <strong>IN / ON</strong>).<br>
            - Hỏi địa chỉ: <strong>What's your address?</strong> ➔ Trả lời: <strong>It's</strong> <em>38 Dien Bien Street.</em><br><br>
            🎸 <strong>2. HOẠT ĐỘNG THỜI GIAN RẢNH (Unit 4):</strong><br>
            - Hỏi: <strong>What do you do in your free time?</strong> ➔ Trả lời: <em>I often play the guitar / table tennis.</em><br>
            - Hỏi lý do: <strong>Why do you like playing the guitar?</strong><br>
            ➔ Trả lời: <strong>Because it helps me relax a lot.</strong> (Bởi vì nó giúp tôi thư giãn rất nhiều).<br>
            - Tần suất: <em>go for a picnic <strong>once a month</strong></em> (mỗi tháng một lần).
          </div>
        </div>
      `;
    } else if (tabKey === 'past') {
      bodyEl.innerHTML = `
        <div class="nb-rule-card">
          <div class="nb-rule-title">⏳ 9. Thì Quá Khứ Đơn (Past Simple Tense - Trang 85-90)</div>
          <div class="nb-formula-banner">
            ⭐ To Be Quá Khứ: I / He / She / It / Số ít + <strong>WAS</strong> (3 chữ)<br>
            ⭐ To Be Quá Khứ: You / We / They / Số nhiều + <strong>WERE</strong> (4 chữ)<br>
            ⭐ Động từ thường: S + V2 / V-ed (Phủ định: S + <strong>didn't</strong> + V nguyên thể)
          </div>
          <div class="nb-mnemonic-callout">
            📅 <strong>Dấu Hiệu Quá Khứ Đơn:</strong> <em>yesterday</em> (hôm qua), <em>last night / last week / last Sunday</em> (tuần trước, tối qua), <em>two days ago</em> (cách đây 2 ngày).
          </div>
          <table class="nb-table">
            <thead><tr><th>Động Từ Nguyên Mẫu (V1)</th><th>Quá Khứ Đơn (V2)</th><th>Ý Nghĩa Trong Bài</th></tr></thead>
            <tbody>
              <tr><td>go</td><td><strong>went</strong></td><td>đã đi (went to the cinema)</td></tr>
              <tr><td>buy</td><td><strong>bought</strong></td><td>đã mua (bought a new car)</td></tr>
              <tr><td>make</td><td><strong>made</strong></td><td>đã làm (made a delicious cake)</td></tr>
              <tr><td>see</td><td><strong>saw</strong></td><td>đã gặp/nhìn (saw her best friend)</td></tr>
              <tr><td>do</td><td><strong>did</strong></td><td>đã làm (did homework)</td></tr>
              <tr><td>lose</td><td><strong>lost</strong></td><td>đã làm mất (lost her key)</td></tr>
              <tr><td>wash (có quy tắc)</td><td><strong>washed</strong></td><td>đã gội đầu (washed her hair)</td></tr>
              <tr><td>visit (có quy tắc)</td><td><strong>visited</strong></td><td>đã thăm quan (visited museum)</td></tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tabKey === 'school_trip') {
      bodyEl.innerHTML = `
        <div class="nb-rule-card">
          <div class="nb-rule-title">🏆 10. Unit 7 & Review 2: Hoạt Động Trường Học & Chuyến Đi Bà Nà (Trang 115-154)</div>
          <div class="nb-mnemonic-callout">
            🎒 <strong>1. HOẠT ĐỘNG TRƯỜNG HỌC & MƠ ƯỚC (Unit 7):</strong><br>
            - <strong>What school activity do you like?</strong> ➔ <em>I like <strong>doing projects</strong></em> (Sau like dùng V-ing).<br>
            - <strong>Why do you like reading books?</strong> ➔ <strong>Because</strong> <em>she thinks it's fun.</em><br>
            - <strong>What would you like to be in the future?</strong> ➔ <em>I'd like to be <strong>a doctor / a nurse / a pilot</strong>.</em><br>
            - <strong>How many floors are there in your school?</strong> ➔ <strong>There are four.</strong><br><br>
            🚡 <strong>2. CHUYẾN ĐI BÀ NÀ HILLS (Review 2 - Trang 154):</strong><br>
            - <em>Last Sunday, Linh and her class <strong>went to Ba Na Hills</strong>.</em><br>
            - <em>First, they <strong>walked over Golden Bridge</strong> and enjoyed the <strong>cable car ride</strong>.</em><br>
            - <em>After that, they played games at the <strong>amusement park</strong>.</em><br>
            - <em>Their trip was lots of fun!</em>
          </div>
        </div>
      `;
    }
  }

  getPlayerRank() {
    const ranks = this.getCurrentRanks();
    let currentRank = ranks[0];
    for (let r of ranks) {
      if (this.exp >= r.minExp) {
        currentRank = r;
      }
    }
    return currentRank;
  }

  getNextRank() {
    const ranks = this.getCurrentRanks();
    const current = this.getPlayerRank();
    const nextIdx = ranks.findIndex(r => r.level === current.level) + 1;
    return ranks[nextIdx] || null;
  }

  updateDashboard() {
    const curr = this.getCurrentCurriculum();
    const starsEl = document.getElementById('stars-display');
    if (starsEl) starsEl.textContent = this.stars;

    const avatarEl = document.getElementById('player-avatar');
    if (avatarEl) avatarEl.textContent = curr.avatar;

    const nameEl = document.getElementById('player-name-text');
    if (nameEl) nameEl.textContent = curr.studentName;

    const nbBtn = document.getElementById('btn-grammar-notebook');
    if (nbBtn) {
      if (this.currentGrade === 'grade5') {
        nbBtn.classList.remove('hidden');
      } else {
        nbBtn.classList.add('hidden');
      }
    }

    const rank = this.getPlayerRank();
    const nextRank = this.getNextRank();

    const badgeEl = document.getElementById('player-rank-badge');
    if (badgeEl) badgeEl.textContent = `Lv.${rank.level} ${rank.title}`;

    const expFill = document.getElementById('exp-fill');
    const expText = document.getElementById('exp-text');
    if (nextRank) {
      const expInLevel = this.exp - rank.minExp;
      const expNeeded = nextRank.minExp - rank.minExp;
      const pct = Math.min(100, Math.max(5, (expInLevel / expNeeded) * 100));
      if (expFill && expFill.style) expFill.style.width = `${pct}%`;
      if (expText) expText.textContent = `${this.exp}/${nextRank.minExp} EXP`;
    } else {
      if (expFill && expFill.style) expFill.style.width = '100%';
      if (expText) expText.textContent = `MAX EXP ⭐`;
    }
  }

  addRewards(starsCount, expCount) {
    const oldRank = this.getPlayerRank();
    this.stars += starsCount;
    this.exp += expCount;
    this.saveGradeData();
    this.updateDashboard();

    const newRank = this.getPlayerRank();
    if (newRank.level > oldRank.level) {
      setTimeout(() => {
        alert(`🎊 CHÚC MỪNG BÉ ĐÃ THĂNG CẤP!\nBé vừa đạt cấp độ: ${newRank.title}\n${newRank.bonus}`);
      }, 700);
    }
  }

  showVictoryModal(title, msg, starsEarned, expEarned) {
    this.addRewards(starsEarned, expEarned);
    this.sound.playVictory();
    this.confetti.fire(80);

    const modal = document.getElementById('victory-modal');
    document.getElementById('victory-title').textContent = title;
    document.getElementById('victory-msg').textContent = msg;
    document.getElementById('victory-stars-count').textContent = `+${starsEarned} ⭐`;
    document.getElementById('victory-exp-count').textContent = `+${expEarned} EXP ⚡`;
    modal.classList.add('active');
  }

  closeVictoryModal() {
    document.getElementById('victory-modal').classList.remove('active');
  }

  // ========================================================
  // VIEW 1: BẢN ĐỒ THẾ GIỚI CÁC ĐẢO BAY (WORLD MAP)
  // ========================================================
  cleanup3D() {
    document.body.classList.remove('mode-roblox-fullscreen');
    if (this.active3DArena) {
      if (typeof this.active3DArena.cleanup === 'function') {
        this.active3DArena.cleanup();
      } else if (typeof this.active3DArena.destroy === 'function') {
        this.active3DArena.destroy();
      }
      this.active3DArena = null;
    }
    if (this.quizKeyHandler) {
      window.removeEventListener('keydown', this.quizKeyHandler);
      this.quizKeyHandler = null;
    }
    if (this.advanceKeyHandler) {
      window.removeEventListener('keydown', this.advanceKeyHandler);
      this.advanceKeyHandler = null;
    }
    if (this.fullscreenChangeHandler) {
      document.removeEventListener('fullscreenchange', this.fullscreenChangeHandler);
      this.fullscreenChangeHandler = null;
    }
    if (document.fullscreenElement) {
      try { document.exitFullscreen(); } catch (e) {}
    }
  }

  renderWorldMap() {
    this.cleanup3D();

    if (this.currentGrade === 'grade5') {
      this.renderGrade5WorldMap();
    } else {
      this.renderStandardWorldMap();
    }
  }

  // ========================================================
  // TRƯỜNG TIỂU HỌC NGÔ QUYỀN - LỚP 5C4 CỦA HÀ MY (MAIN SCREEN)
  // ========================================================
  renderGrade5WorldMap() {
    const islands = this.getCurrentIslands();
    const mainCard = document.getElementById('main-game-screen');

    mainCard.innerHTML = `
      <div class="world-map-header" style="margin-bottom: 16px;">
        <div class="grade-banner-tag">🌟 KHỐI LỚP 5 - HÀ MY 5C4</div>
        <h2 style="color: #0369a1; font-size: 1.85rem; font-weight: 900; margin-top: 6px;">
          🏫 TRƯỜNG TIỂU HỌC NGÔ QUYỀN - LỚP 5C4
        </h2>
        <p style="color: #475569; font-weight: 700; font-size: 1rem;">
          Cùng Thầy Giáo Tuấn Chinh Phục Toàn Diện 19 Trang Sách Bài Tập Bổ Trợ Global Success!
        </p>

        <!-- GOOGLE STREET VIEW 360° REALISM HERO BANNER (41 ẢNH THẬT 100%) -->
        <div style="margin-top: 14px; background: linear-gradient(135deg, #0f172a, #1e293b); border: 2.5px solid #10b981; border-radius: 18px; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.35);">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="background: rgba(16,185,129,0.2); border: 2px solid #10b981; border-radius: 50%; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; flex-shrink: 0;">👁️</div>
            <div>
              <div style="font-weight: 900; font-size: 1.12rem; color: #facc15; display: flex; align-items: center; gap: 8px;">
                <span>41 ẢNH THỰC TẾ GOOGLE STREET VIEW 360° (1.19 KM)</span>
                <span style="background: #ef4444; color: #fff; font-size: 0.72rem; padding: 2px 8px; border-radius: 999px;">ẢNH THẬT ĐÃ TẢI VỀ</span>
              </div>
              <div style="font-size: 0.86rem; color: #cbd5e1; font-weight: 700; margin-top: 3px;">
                Tuyến đường 1.19 km từ Cổng TH Ngô Quyền (141 Trần Quốc Tuấn) ➔ Bùng Binh Kim Ngọc ➔ Đích Đến: Nhà Vườn Cây Cảnh Vũ Dậu
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button id="btn-hero-open-streetview" style="background: linear-gradient(135deg, #059669, #10b981); color: #fff; border: 2px solid #a7f3d0; padding: 11px 24px; border-radius: 999px; font-weight: 900; font-size: 0.95rem; cursor: pointer; box-shadow: 0 6px 20px rgba(16,185,129,0.45); display: flex; align-items: center; gap: 8px;">
              <span>👁️</span>
              <span>XEM 41 ẢNH 360° THỰC TẾ</span>
            </button>
            <button id="btn-hero-open-city" style="background: linear-gradient(135deg, #e11d48, #be123c); color: #fff; border: 2px solid #fda4af; padding: 11px 22px; border-radius: 999px; font-weight: 900; font-size: 0.95rem; cursor: pointer; box-shadow: 0 6px 20px rgba(225,29,72,0.4); display: flex; align-items: center; gap: 8px;">
              <span>🛵</span>
              <span>RA PHỐ LÁI XE 3D</span>
            </button>
          </div>
        </div>
      </div>

      <!-- MAIN 3D PLAZA HERO (SÂN TRƯỜNG & LỚP HỌC 3D) -->
      <div class="main-plaza-hero">
        <div class="main-plaza-3d-viewport" id="main-3d-plaza" title="Sân trường 3D Trường Tiểu Học Ngô Quyền: Bấm trực tiếp vào các bục 1, 2, 3, 4 trên sàn 3D để vào bài học!">
          <div class="main-plaza-overlay-hud">
            <span class="arena-badge-5c4">👧 Hà My (5C4) & 👨‍🏫 Thầy Tuấn</span>
            <span style="background: rgba(15,23,42,0.85); color: #86efac; padding: 6px 16px; border-radius: 20px; font-size: 0.82rem; font-weight: 800; border: 1.5px solid rgba(134,239,172,0.4);">
              ✨ ĐÃ MỞ KHÓA 100% CẢ 6 KHU VỰC BÀI TẬP
            </span>
          </div>

          <!-- HUD QUEST NAVIGATOR ("DẮT MŨI" CHỈ ĐƯỜNG LIÊN HOÀN) -->
          <div class="hud-quest-navigator" id="hud-quest-navigator" style="display: none;">
            <div class="quest-nav-pill">
              <span class="quest-nav-compass">🧭</span>
              <div class="quest-nav-info">
                <span class="quest-nav-title" id="hud-quest-title">Nhiệm Vụ Dẫn Đường</span>
                <span class="quest-nav-desc" id="hud-quest-desc">Đang tìm NPC tiếp theo...</span>
              </div>
              <div class="quest-nav-distance-badge" id="hud-quest-dist-badge">
                <span class="dist-val" id="hud-quest-dist-val">--</span>m
              </div>
              <button class="btn-quest-nav-teleport" id="btn-quest-nav-teleport" title="Bấm phím [T] hoặc click để dịch chuyển ngay">
                🚀 Đến Ngay [T]
              </button>
            </div>
          </div>
        </div>

        <div class="main-plaza-controls-bar">
          <button class="btn-camera-toggle" id="btn-main-camera-toggle" style="font-size: 0.92rem; padding: 10px 18px;" title="Xoay camera 180 độ xem khuôn mặt Chibi dễ thương của Bé Hà My (hoặc bấm phím C)">
            📷 Xoay Xem Mặt Bé Hà My (Phím C)
          </button>
          <button class="btn-teacher-voice" id="btn-main-teacher-greeting" style="font-size: 0.92rem; padding: 10px 18px;">
            🎙️ Nghe Thầy Tuấn Chào Đón & Giảng Bài
          </button>
          <button class="btn-smart-hint" id="btn-main-open-notebook" style="font-size: 0.92rem; padding: 10px 18px;">
            📖 Mở Sổ Tay Bí Kíp Lớp 5
          </button>
          <button class="btn-zone-action" id="btn-main-open-streetview" style="background: linear-gradient(135deg, #059669, #10b981); color: #fff; border: 2px solid #a7f3d0; padding: 10px 22px; font-size: 0.95rem; font-weight: 900; border-radius: 50px; cursor: pointer; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">
            👁️ 41 ẢNH STREET VIEW 360°
          </button>
          <button class="btn-zone-action" id="btn-main-open-city" style="background: linear-gradient(135deg, #881337, #e11d48); color: #fff; border: 2px solid #fda4af; padding: 10px 22px; font-size: 0.95rem; font-weight: 900; border-radius: 50px; cursor: pointer; box-shadow: 0 4px 14px rgba(225, 29, 72, 0.4);">
            🏙️ RA PHỐ LÁI XE (GTA VICE CITY)
          </button>
          <button class="btn-zone-action primary-3d" id="btn-main-quick-start" style="padding: 10px 22px; font-size: 0.95rem;">
            🚀 VÀO ĐẤU TRƯỜNG 3D HỌC NGAY
          </button>
        </div>
      </div>

      <!-- ROBLOX GAME ZONES CONTAINER -->
      <div class="roblox-zones-list" id="roblox-zones-list">
        <!-- Render 6 Island Cards -->
      </div>
    `;

    // 1. Initialize 3D Classroom/Plaza on the Main Screen
    const plazaContainer = document.getElementById('main-3d-plaza');
    if (typeof RobloxClassroom3D !== 'undefined' && plazaContainer) {
      try {
        console.log("🎮 Đang khởi tạo Sân Trường 3D Lớp 5C4...");
        this.active3DArena = new RobloxClassroom3D(plazaContainer);
        this.setupArenaCallbacks(this.active3DArena);

        // Áp dụng trang phục và thú cưng đã lưu
        if (this.shop) {
          this.shop.applyTo3DWorld();
          this.shop.applyPetTo3DWorld();
        }

        this.active3DArena.updateBlackboardText(
          "🏫 TRƯỜNG HỌC 5C4 - GLOBAL SUCCESS",
          "Chào mừng Hà My 5C4 đến với lớp học tiếng Anh!",
          "Bé bấm nút bên dưới hoặc click bục 3D để cùng Thầy Tuấn học nhé!"
        );

        // Render 4 interactive preview pads on the floor
        const previewPads = [
          { text: "1. Động Từ To Be" },
          { text: "2. Hiện Tại Đơn" },
          { text: "3. Don't / Doesn't" },
          { text: "4. All About Me" }
        ];
        this.active3DArena.renderOptionsPads(previewPads, (idx) => {
          this.sound.playClick();
          this.currentIslandIndex = idx;
          const targetIsland = islands[idx] || islands[0];
          const quizStage = targetIsland.stages.find(s => s.type === 'quiz') || targetIsland.stages[0];
          this.activeStage = quizStage;
          this.startStageGameplay(targetIsland, quizStage);
        });
        console.log("✅ Khởi tạo Sân Trường 3D thành công!");
      } catch (err) {
        console.error("❌ Lỗi khởi tạo 3D Arena:", err);
      }
    } else {
      console.warn("⚠️ Không tìm thấy RobloxClassroom3D hoặc plazaContainer");
    }

    // 2. Main quick buttons (An toàn, kiểm tra null trước khi gán)
    const btnCam = document.getElementById('btn-main-camera-toggle');
    if (btnCam) {
      btnCam.addEventListener('click', () => {
        this.sound.playClick();
        if (this.active3DArena && typeof this.active3DArena.toggleCameraHeroView === 'function') {
          this.active3DArena.toggleCameraHeroView();
        }
      });
    }

    const btnGreeting = document.getElementById('btn-main-teacher-greeting');
    if (btnGreeting) {
      btnGreeting.addEventListener('click', () => {
        this.sound.speakVietnamese("Chào mừng con gái Hà My lớp 5C4 đến với Trường Tiểu Học Ngô Quyền! Hôm nay thầy trò mình cùng làm bài tập bổ trợ trong sách giáo khoa nhé. Con hãy chọn một khu vực bài học bên dưới để thầy trò mình cùng bắt đầu nào!");
      });
    }

    const btnNotebook = document.getElementById('btn-main-open-notebook');
    if (btnNotebook) {
      btnNotebook.addEventListener('click', () => {
        this.sound.playClick();
        const nbBtn = document.getElementById('btn-grammar-notebook');
        if (nbBtn) nbBtn.click();
      });
    }

    const btnOpenCity = document.getElementById('btn-main-open-city');
    if (btnOpenCity) {
      btnOpenCity.addEventListener('click', () => {
        this.sound.playClick();
        if (typeof window.enterViceCityMode === 'function') {
          window.enterViceCityMode();
        }
      });
    }

    const btnMainStreetView = document.getElementById('btn-main-open-streetview');
    if (btnMainStreetView) {
      btnMainStreetView.addEventListener('click', () => {
        this.sound.playClick();
        if (typeof window.openStreetView360 === 'function') {
          window.openStreetView360(41);
        }
      });
    }

    const btnHeroStreetView = document.getElementById('btn-hero-open-streetview');
    if (btnHeroStreetView) {
      btnHeroStreetView.addEventListener('click', () => {
        this.sound.playClick();
        if (typeof window.openStreetView360 === 'function') {
          window.openStreetView360(41);
        }
      });
    }

    const btnHeroCity = document.getElementById('btn-hero-open-city');
    if (btnHeroCity) {
      btnHeroCity.addEventListener('click', () => {
        this.sound.playClick();
        if (typeof window.enterViceCityMode === 'function') {
          window.enterViceCityMode(0);
        }
      });
    }

    const btnHeaderStreetView = document.getElementById('btn-header-open-streetview');
    if (btnHeaderStreetView) {
      btnHeaderStreetView.addEventListener('click', () => {
        this.sound.playClick();
        if (typeof window.openStreetView360 === 'function') {
          window.openStreetView360(41);
        }
      });
    }

    const btnQuickStart = document.getElementById('btn-main-quick-start');
    if (btnQuickStart) {
      btnQuickStart.addEventListener('click', () => {
        console.log("🚀 Bấm nút VÀO ĐẤU TRƯỜNG 3D HỌC NGAY...");
        this.sound.playClick();
        this.currentIslandIndex = 0;
        const targetIsland = islands[0];
        if (targetIsland && targetIsland.stages) {
          const quizStage = targetIsland.stages.find(s => s.type === 'quiz') || targetIsland.stages[0];
          this.activeStage = quizStage;
          this.startStageGameplay(targetIsland, quizStage);
        } else {
          console.error("❌ Dữ liệu đảo 1 chưa sẵn sàng");
        }
      });
    }

    // 3. Render 6 Roblox Zone Cards
    const zonesList = document.getElementById('roblox-zones-list');
    islands.forEach((island, idx) => {
      const card = document.createElement('div');
      card.className = 'roblox-zone-card';

      const quizStage = island.stages.find(s => s.type === 'quiz');
      const bubbleStage = island.stages.find(s => s.type === 'bubble');
      const otherStage = island.stages.find(s => s.type === 'spelling' || s.type === 'matching' || s.type === 'memory');

      card.innerHTML = `
        <div class="roblox-zone-header">
          <div class="roblox-zone-title-wrap">
            <div class="roblox-zone-icon-box">${island.badge}</div>
            <div>
              <div class="roblox-zone-title">Khu Vực ${island.islandNumber}: ${island.name}</div>
              <div class="roblox-zone-subtitle">${island.title}</div>
            </div>
          </div>
          <span class="roblox-zone-badge">⭐ Đã Mở Khóa 100%</span>
        </div>

        <div class="roblox-zone-actions-grid">
          ${quizStage ? `
            <button class="btn-zone-action primary-3d" id="btn-zone-quiz-${idx}">
              🎯 Đấu Trường 3D Thầy Tuấn (${island.quizzes ? island.quizzes.length : 0} câu)
            </button>
          ` : ''}
          ${bubbleStage ? `
            <button class="btn-zone-action bubble-btn" id="btn-zone-bubble-${idx}">
              🎈 Bắn Bóng Ngữ Pháp (Luyện Nghe)
            </button>
          ` : ''}
          ${otherStage ? `
            <button class="btn-zone-action spelling-btn" id="btn-zone-other-${idx}">
              ${otherStage.icon} ${otherStage.name}
            </button>
          ` : ''}
          <button class="btn-zone-action" id="btn-zone-map-${idx}" style="background: #f1f5f9; color: #334155;">
            🗺️ Khám Phá Chi Tiết Đảo
          </button>
        </div>
      `;

      zonesList.appendChild(card);

      // Attach direct action events
      if (quizStage) {
        document.getElementById(`btn-zone-quiz-${idx}`).addEventListener('click', () => {
          this.sound.playClick();
          this.currentIslandIndex = idx;
          this.activeStage = quizStage;
          this.startStageGameplay(island, quizStage);
        });
      }

      if (bubbleStage) {
        document.getElementById(`btn-zone-bubble-${idx}`).addEventListener('click', () => {
          this.sound.playClick();
          this.currentIslandIndex = idx;
          this.activeStage = bubbleStage;
          this.startStageGameplay(island, bubbleStage);
        });
      }

      if (otherStage) {
        document.getElementById(`btn-zone-other-${idx}`).addEventListener('click', () => {
          this.sound.playClick();
          this.currentIslandIndex = idx;
          this.activeStage = otherStage;
          this.startStageGameplay(island, otherStage);
        });
      }

      document.getElementById(`btn-zone-map-${idx}`).addEventListener('click', () => {
        this.sound.playClick();
        this.currentIslandIndex = idx;
        this.renderIslandMiniMap(idx);
      });
    });
  }

  // ========================================================
  // BẢN ĐỒ THẾ GIỚI CHUẨN (CHO KHỐI LỚP 1 VÀ LỚP 2)
  // ========================================================
  renderStandardWorldMap() {
    const curr = this.getCurrentCurriculum();
    const islands = this.getCurrentIslands();
    const mainCard = document.getElementById('main-game-screen');

    mainCard.innerHTML = `
      <div class="world-map-header">
        <div class="grade-banner-tag">${curr.gradeName}</div>
        <h2>${curr.headerTitle}</h2>
        <p>${curr.headerSub}</p>
      </div>

      <div class="islands-container" id="islands-list">
        <!-- Render Islands -->
      </div>
    `;

    const list = document.getElementById('islands-list');

    islands.forEach((island, idx) => {
      const isLocked = this.stars < island.requiredStars;
      const islandCard = document.createElement('div');
      islandCard.className = `island-card theme-${island.theme} ${isLocked ? 'locked' : ''}`;

      let completedInIsland = 0;
      island.stages.forEach(s => {
        if (this.completedStages[s.id]) completedInIsland++;
      });

      const themeLandmarks = {
        forest: '🌲🏰🌲',
        desert: '🏜️🏛️🐪',
        snow: '❄️🏔️🐧',
        castle: '🏰👑💐',
        candy: '🍰🧁🍭',
        beach: '🏖️🏄‍♂️🐚',
        toy: '🧸🤖🚀',
        clock: '🕰️🌙⭐'
      };
      let landmarkEmoji = themeLandmarks[island.theme] || '🏝️✨';

      islandCard.innerHTML = `
        <div class="island-visual">
          <div class="island-cliff">
            <span class="island-landmarks">${landmarkEmoji}</span>
          </div>
        </div>

        <div class="island-details">
          <h3>${island.badge} Đảo số ${island.islandNumber}: ${island.name}</h3>
          <div class="island-subtitle">${island.title}</div>
          <div class="island-progress-bar">
            <span>Tiến độ: <strong>${completedInIsland} / ${island.stages.length}</strong> Ải</span>
            ${isLocked ? `<span style="color: #dc2626;">🔒 Cần ${island.requiredStars} ⭐ để mở</span>` : ''}
          </div>
        </div>

        <div>
          <button class="btn-enter-island ${isLocked ? 'locked' : ''}">
            ${isLocked ? '🔒 Chưa Mở' : 'Khám Phá Đảo 🚀'}
          </button>
        </div>
      `;

      if (!isLocked) {
        islandCard.addEventListener('click', () => {
          this.sound.playClick();
          this.currentIslandIndex = idx;
          this.renderIslandMiniMap(idx);
        });
      }

      list.appendChild(islandCard);
    });
  }

  renderIslandMiniMap(islandIndex) {
    this.cleanup3D();
    const curr = this.getCurrentCurriculum();
    const islands = this.getCurrentIslands();
    const island = islands[islandIndex];
    const mainCard = document.getElementById('main-game-screen');

    // Find current active step index (first incomplete stage)
    let activeStageIdx = 0;
    island.stages.forEach((stg, i) => {
      if (this.completedStages[stg.id]) {
        activeStageIdx = Math.min(island.stages.length - 1, i + 1);
      }
    });

    mainCard.innerHTML = `
      <div class="island-map-view">
        <div class="island-map-header">
          <button class="btn-back-world" id="btn-back-to-world">⬅ Bản Đồ Thế Giới</button>
          <div style="text-align: right;">
            <h3 style="font-size: 1.25rem; color: #1e1b4b;">${island.badge} ${island.name}</h3>
            <span style="font-size: 0.85rem; color: #6366f1; font-weight: 700;">${island.title}</span>
          </div>
        </div>

        <div class="adventure-path-arena theme-${island.theme}-bg">
          <div class="path-stages-container">
            <div class="path-line-svg"></div>

            ${island.stages.map((stage, idx) => {
              const isCompleted = !!this.completedStages[stage.id];
              const isCurrent = idx === activeStageIdx;
              const isLocked = idx > activeStageIdx;

              let nodeClass = 'stage-step-node';
              if (isCompleted) nodeClass += ' completed';
              if (isCurrent) nodeClass += ' active';
              if (isLocked) nodeClass += ' locked';

              return `
                <div class="${nodeClass}" data-stage-index="${idx}" id="stage-node-${idx}">
                  ${isCurrent ? `<div class="hero-pawn">${curr.avatar}</div>` : ''}

                  <div class="step-stone-circle">
                    <span class="step-icon">${stage.icon}</span>
                    ${isCompleted ? `<div class="step-stars-row">⭐⭐⭐</div>` : ''}
                  </div>

                  <div class="step-name-label">
                    <div>Ải ${stage.number}: ${stage.name}</div>
                    <div style="font-size: 0.75rem; color: #6b7280; font-weight: 600;">+${stage.starsReward}⭐ +30EXP</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-back-to-world').addEventListener('click', () => {
      this.sound.playClick();
      this.renderWorldMap();
    });

    // Add click event on nodes
    island.stages.forEach((stage, idx) => {
      const node = document.getElementById(`stage-node-${idx}`);
      const isLocked = idx > activeStageIdx;

      if (!isLocked) {
        node.addEventListener('click', () => {
          this.sound.playStep();
          this.currentStageIndex = idx;
          this.activeStage = stage;
          this.startStageGameplay(island, stage);
        });
      }
    });
  }

  // ========================================================
  // VIEW 3: VÀO MÀN CHƠI CỦA ẢI (STAGE GAMEPLAY)
  // ========================================================
  startStageGameplay(island, stage) {
    const mainCard = document.getElementById('main-game-screen');

    if (stage.type === 'memory') {
      this.playMemoryStage(mainCard, island, stage);
    } else if (stage.type === 'spelling') {
      this.playSpellingStage(mainCard, island, stage);
    } else if (stage.type === 'quiz') {
      this.playQuizStage(mainCard, island, stage);
    } else if (stage.type === 'bubble') {
      this.playBubbleStage(mainCard, island, stage);
    } else if (stage.type === 'matching') {
      this.playMatchingStage(mainCard, island, stage);
    } else if (stage.type === 'phonics') {
      this.playPhonicsStage(mainCard, island, stage);
    }
  }

  finishStage(island, stage) {
    this.completedStages[stage.id] = 3;
    this.saveGradeData();

    this.showVictoryModal(
      `Ải ${stage.number} Hoàn Thành! 🏆`,
      `Bé đã vượt qua ${stage.name} và tiến thêm 1 bước trên bản đồ!`,
      stage.starsReward,
      30
    );
  }

  // --------------------------------------------------------
  // GAMEPLAY 1: LẬT THẺ GHI NHỚ
  // --------------------------------------------------------
  playMemoryStage(container, island, stage) {
    const words = island.words.slice(0, 4);
    let cardList = [];
    words.forEach(w => {
      cardList.push({ id: w.id, type: 'word', display: w.word, icon: '🔤', word: w.word });
      cardList.push({ id: w.id, type: 'meaning', display: w.meaning, icon: w.icon, word: w.word });
    });
    cardList.sort(() => Math.random() - 0.5);

    this.memoryState = {
      cards: cardList,
      flipped: [],
      matchedCount: 0,
      totalPairs: words.length,
      locked: false
    };

    container.innerHTML = `
      <div class="game-playing-header">
        <button class="btn-back-world" id="btn-exit-stage">⬅ Bản Đồ Đảo</button>
        <h3 style="color: #1e1b4b;">🎴 Ải ${stage.number}: ${stage.name}</h3>
        <div class="stat-pill" id="memory-counter">0 / ${words.length} cặp</div>
      </div>
      <div class="cards-grid" id="memory-grid"></div>
    `;

    document.getElementById('btn-exit-stage').addEventListener('click', () => {
      this.sound.playClick();
      this.renderIslandMiniMap(this.currentIslandIndex);
    });

    const grid = document.getElementById('memory-grid');
    cardList.forEach((card, idx) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'memory-card';
      cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-front"><span style="font-size: 2.2rem;">❓</span></div>
          <div class="card-back">
            <span style="font-size: 2.2rem;">${card.icon}</span>
            <div class="card-back-text">${card.display}</div>
          </div>
        </div>
      `;
      cardEl.addEventListener('click', () => this.handleMemoryClick(cardEl, card, idx, island, stage));
      grid.appendChild(cardEl);
    });
  }

  handleMemoryClick(cardEl, card, index, island, stage) {
    if (this.memoryState.locked) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    this.sound.playClick();
    cardEl.classList.add('flipped');
    this.sound.speak(card.word);

    this.memoryState.flipped.push({ cardEl, card });

    if (this.memoryState.flipped.length === 2) {
      this.memoryState.locked = true;
      const [c1, c2] = this.memoryState.flipped;

      if (c1.card.id === c2.card.id && c1.card.type !== c2.card.type) {
        setTimeout(() => {
          this.sound.playCorrect();
          c1.cardEl.classList.add('matched');
          c2.cardEl.classList.add('matched');
          this.memoryState.matchedCount++;
          document.getElementById('memory-counter').textContent = `${this.memoryState.matchedCount} / ${this.memoryState.totalPairs} cặp`;
          this.memoryState.flipped = [];
          this.memoryState.locked = false;

          if (this.memoryState.matchedCount === this.memoryState.totalPairs) {
            setTimeout(() => this.finishStage(island, stage), 600);
          }
        }, 500);
      } else {
        setTimeout(() => {
          this.sound.playWrong();
          c1.cardEl.classList.remove('flipped');
          c2.cardEl.classList.remove('flipped');
          this.memoryState.flipped = [];
          this.memoryState.locked = false;
        }, 900);
      }
    }
  }

  // --------------------------------------------------------
  // GAMEPLAY 2: GHÉP CHỮ ĐÁNH VẦN
  // --------------------------------------------------------
  playSpellingStage(container, island, stage) {
    this.spellingState.wordIdx = 0;
    this.renderSpellingCard(container, island, stage);
  }

  renderSpellingCard(container, island, stage) {
    const wordObj = island.words[this.spellingState.wordIdx];
    this.spellingState.selected = [];

    const targetLetters = wordObj.word.toUpperCase().split('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const distractor = alphabet[Math.floor(Math.random() * alphabet.length)];
    const pool = [...targetLetters, distractor].sort(() => Math.random() - 0.5);

    this.spellingState.pool = pool.map((l, i) => ({ letter: l, id: i, used: false }));

    container.innerHTML = `
      <div class="game-playing-header">
        <button class="btn-back-world" id="btn-exit-stage">⬅ Bản Đồ Đảo</button>
        <h3 style="color: #1e1b4b;">🔤 Ải ${stage.number}: ${stage.name}</h3>
        <div class="stat-pill">Từ ${this.spellingState.wordIdx + 1} / ${island.words.length}</div>
      </div>

      <div class="spelling-board">
        <div class="word-clue-card">
          <div class="clue-visual">
            <span class="clue-icon">${wordObj.icon}</span>
            <div>
              <div class="clue-vietnamese">${wordObj.meaning}</div>
              <div class="clue-meaning-sub">Bấm loa để nghe phát âm!</div>
            </div>
          </div>
          <button class="btn-icon-round" id="btn-spelling-speak">🔊</button>
        </div>

        <div class="spelling-slots" id="spelling-slots"></div>
        <div class="spelling-pool" id="spelling-pool"></div>

        <div class="spelling-actions">
          <button class="btn-spelling-action hint" id="btn-spelling-hint">💡 Gợi ý chữ đầu</button>
          <button class="btn-spelling-action reset" id="btn-spelling-reset">🔄 Làm lại</button>
        </div>
      </div>
    `;

    document.getElementById('btn-exit-stage').addEventListener('click', () => {
      this.sound.playClick();
      this.renderIslandMiniMap(this.currentIslandIndex);
    });

    document.getElementById('btn-spelling-speak').addEventListener('click', () => {
      this.sound.speak(wordObj.word);
    });

    setTimeout(() => this.sound.speak(wordObj.word), 350);

    document.getElementById('btn-spelling-reset').addEventListener('click', () => {
      this.sound.playClick();
      this.spellingState.pool.forEach(p => p.used = false);
      this.spellingState.selected = [];
      this.renderSpellingBubbles(wordObj, island, stage);
    });

    document.getElementById('btn-spelling-hint').addEventListener('click', () => {
      const first = wordObj.word.toUpperCase()[0];
      const match = this.spellingState.pool.find(p => p.letter === first && !p.used);
      if (match) {
        this.spellingState.pool.forEach(p => p.used = false);
        this.spellingState.selected = [match];
        match.used = true;
        this.renderSpellingBubbles(wordObj, island, stage);
      }
    });

    this.renderSpellingBubbles(wordObj, island, stage);
  }

  renderSpellingBubbles(wordObj, island, stage) {
    const slotsEl = document.getElementById('spelling-slots');
    const poolEl = document.getElementById('spelling-pool');
    slotsEl.innerHTML = '';
    poolEl.innerHTML = '';

    const targetLen = wordObj.word.length;

    for (let i = 0; i < targetLen; i++) {
      const slot = document.createElement('div');
      slot.className = `letter-slot ${this.spellingState.selected[i] ? 'filled' : ''}`;
      slot.textContent = this.spellingState.selected[i]?.letter || '';
      slot.addEventListener('click', () => {
        if (this.spellingState.selected[i]) {
          const removed = this.spellingState.selected.splice(i, 1)[0];
          removed.used = false;
          this.renderSpellingBubbles(wordObj, island, stage);
        }
      });
      slotsEl.appendChild(slot);
    }

    this.spellingState.pool.forEach(item => {
      const b = document.createElement('div');
      b.className = `bubble-letter ${item.used ? 'used' : ''}`;
      b.textContent = item.letter;
      b.addEventListener('click', () => {
        if (!item.used && this.spellingState.selected.length < targetLen) {
          this.sound.playClick();
          item.used = true;
          this.spellingState.selected.push(item);
          this.renderSpellingBubbles(wordObj, island, stage);

          // Check word complete
          if (this.spellingState.selected.length === targetLen) {
            const spelled = this.spellingState.selected.map(s => s.letter).join('');
            if (spelled === wordObj.word.toUpperCase()) {
              this.sound.playCorrect();
              this.sound.speak(wordObj.word);
              this.confetti.fire(40);

              setTimeout(() => {
                if (this.spellingState.wordIdx + 1 < island.words.length) {
                  this.spellingState.wordIdx++;
                  this.renderSpellingCard(document.getElementById('main-game-screen'), island, stage);
                } else {
                  this.finishStage(island, stage);
                }
              }, 1100);
            } else {
              this.sound.playWrong();
              setTimeout(() => {
                this.spellingState.pool.forEach(p => p.used = false);
                this.spellingState.selected = [];
                this.renderSpellingBubbles(wordObj, island, stage);
              }, 700);
            }
          }
        }
      });
      poolEl.appendChild(b);
    });
  }

  // --------------------------------------------------------
  // --------------------------------------------------------
  // GAMEPLAY 3: QUIZ ĐẤU TRƯỜNG 3D ROBLOX / PLAY TOGETHER (LỚP 5C4) & BẢN CHUẨN
  // --------------------------------------------------------
  playQuizStage(container, island, stage) {
    this.quizState.qIdx = 0;
    this.quizState.streak = 0;
    this.renderQuizStep(container, island, stage);
  }

  renderQuizStep(container, island, stage) {
    this.cleanup3D();

    if (this.currentGrade === 'grade5') {
      this.renderGrade5RobloxQuiz(container, island, stage);
    } else {
      this.renderStandardQuiz(container, island, stage);
    }
  }

  // ========================================================
  // LỚP HỌC 3D ROBLOX / PLAY TOGETHER - DÀNH RIÊNG CHO HÀ MY 5C4
  // ========================================================
  renderGrade5RobloxQuiz(container, island, stage) {
    // 1. Bật chế độ Game 16:9 Toàn Màn Hình Roblox
    document.body.classList.add('mode-roblox-fullscreen');

    const qObj = island.quizzes[this.quizState.qIdx];
    if (!qObj) {
      this.cleanup3D();
      this.finishStage(island, stage);
      return;
    }

    // Shuffle answer options
    const shuffledOptions = [...qObj.options].sort(() => Math.random() - 0.5);

    // Mẹo ngữ pháp & công thức
    let formulaText = '';
    let hintSteps = [];
    if (this.currentIslandIndex === 0) {
      formulaText = 'To Be: I + am | Số ít + is | Số nhiều (-s) + are';
      hintSteps = [
        'Bước 1: Nhìn chủ ngữ phía trước xem có đuôi "-s" không.',
        'Bước 2: Nếu có "-s" (như the cakes, the pens) ➔ Số nhiều ➔ Chọn ARE.',
        'Bước 3: Nếu là số ít/tên riêng (Paul, Her name, My cat) ➔ Chọn IS.',
        'Bước 4: Riêng chủ ngữ "I" ➔ Bắt buộc chọn AM.'
      ];
    } else if (this.currentIslandIndex === 1) {
      formulaText = 'Hiện Tại Đơn: S(he/she/it/số ít) + V-s/es | S(they/we/I) + V-bare';
      hintSteps = [
        'Bước 1: Xác định chủ ngữ là số ít hay số nhiều.',
        'Bước 2: Tìm trạng từ tần suất (usually, never, always...).',
        'Bước 3: Chủ ngữ số ít thì động từ BẮT BUỘC có đuôi -s hoặc -es!',
        'Bước 4: Tận cùng -y sau phụ âm đổi thành -ies (try ➔ tries).'
      ];
    } else if (this.currentIslandIndex === 2) {
      formulaText = 'Trợ Động Từ: S + don\'t/doesn\'t + V(nguyên thể) | Do/Does + S + V?';
      hintSteps = [
        'Bước 1: He/She/It và danh từ số ít ➔ Đi với DOESN\'T hoặc DOES.',
        'Bước 2: They/We/You/I và 2 người trở lên ➔ Đi với DON\'T hoặc DO.',
        'Bước 3: ĐÃ CÓ trợ động từ thì động từ chính PHẢI về nguyên thể!'
      ];
    } else if (this.currentIslandIndex === 3) {
      formulaText = 'Unit 1: Từ vựng & Sở thích cá nhân (All About Me)';
      hintSteps = [
        'Bước 1: Đọc kỹ từ khóa câu hỏi (animal, food, colour, class...).',
        'Bước 2: Hà My học lớp 5C4 trường Tiểu học.',
        'Bước 3: Phân biệt chính xác giữa món ăn, đồ uống và màu sắc.'
      ];
    } else if (this.currentIslandIndex === 4) {
      formulaText = 'Unit 1: Mẫu câu đối thoại giao tiếp chuẩn SGK';
      hintSteps = [
        'Bước 1: Xác định từ để hỏi (Where from, Where live, What do...).',
        'Bước 2: "Where are you from?" ➔ "I\'m from Vietnam".',
        'Bước 3: "live with" = sống cùng ai; "live in" = sống ở đâu.'
      ];
    } else {
      formulaText = 'Sự Thật Khoa Học & Đọc Hiểu: The Earth goes around the Sun';
      hintSteps = [
        'Bước 1: Hiện tại đơn diễn tả sự thật hiển nhiên (boils, goes, rises...).',
        'Bước 2: Danh từ không đếm được (Water) chia động từ số ít (-s).',
        'Bước 3: Đọc kỹ đối chiếu chi tiết bài đọc (True/False).'
      ];
    }

    // 2. KHUNG HÌNH CHUẨN 16:9 RESPONSIVE FULL VIEWPORT & HUD GLASSMORPHISM
    container.innerHTML = `
      <div class="roblox-game-container-169" id="roblox-game-container">
        <!-- 3D VIEWPORT CANVAS (THREE.JS ARENA) -->
        <div class="roblox-canvas-viewport" id="roblox-3d-arena"></div>

        <!-- HUD: GÓC TRÊN BÊN TRÁI (Bé Hà My Chibi & Thầy Tuấn Trợ Giảng) -->
        <div class="hud-top-left">
          <div class="hud-top-left-row">
            <button class="hud-btn-back" id="btn-exit-stage" title="Rời phòng học về bản đồ">
              <span>⬅ Rời Lớp</span>
            </button>
            <button class="hud-btn-back" id="btn-quiz-open-city" style="background: linear-gradient(135deg, #881337, #e11d48); border: 1.5px solid #fda4af;" title="Bung toàn màn hình lái xe Honda Vision đỏ mận khám phá thành phố Vĩnh Yên 1.2km!">
              <span>🏙️ Ra Phố Lái Xe</span>
            </button>

            <!-- CHIBI BÉ HÀ MY CARD -->
            <div class="hud-chibi-hero-card" title="Bé Hà My Lớp 5C4 Chibi">
              <div class="hud-chibi-hero-avatar">
                <img src="chibi_ha_my.jpg" alt="Bé Hà My Chibi" class="hud-chibi-img">
                <span class="hud-chibi-sparkle">✨</span>
              </div>
              <div class="hud-chibi-hero-info">
                <span class="hud-chibi-hero-name">Bé Hà My</span>
                <span class="hud-chibi-hero-tag">🌸 5C4 Chibi</span>
              </div>
            </div>
          </div>

          <!-- THẦY TUẤN TRỢ GIẢNG -->
          <div class="hud-teacher-card" id="hud-teacher-card">
            <div class="hud-teacher-avatar" id="hud-teacher-avatar" title="Thầy Tuấn 5C4">
              👨‍🏫
              <span class="hud-speaking-pulse" id="teacher-speak-pulse"></span>
            </div>
            <div class="hud-teacher-body">
              <div class="hud-teacher-meta">
                <span class="hud-teacher-name">Thầy Tuấn 5C4</span>
                <span class="hud-lesson-tag">${qObj.situation || "Lớp 5C4"}</span>
                <button class="hud-btn-chip" id="btn-speak-teacher" title="Nghe thầy giảng bài">🎙️ Giảng</button>
                <button class="hud-btn-chip" id="btn-speak-english" title="Nghe đề tiếng Anh">🇬🇧 Đề</button>
                <button class="hud-btn-chip hud-btn-hint" id="btn-toggle-hint" title="Xem mẹo tư duy của Thầy Tuấn">💡 Mẹo</button>
              </div>
              <div class="hud-quiz-prompt-bar">
                <span class="hud-quiz-prompt-label">📝 ĐỀ BÀI CÂU HỎI:</span>
                <span class="hud-quiz-prompt-text">${qObj.question || ''}</span>
              </div>
              <div class="hud-teacher-speech" id="teacher-speech-box">
                "${qObj.teacherIntro || qObj.instruction || 'Chào Hà My! Con hãy quan sát bảng đen và bước lên bục đáp án đúng nhé!'}"
              </div>
            </div>
          </div>
        </div>

        <!-- HUD: GÓC TRÊN BÊN PHẢI (TIỀN TỆ XU/SAO/EXP, PHÍM TẮT RPG & MINIMAP) -->
        <div class="hud-top-right">
          <div class="hud-top-right-panels">
            <!-- HÀNG 1: TIỀN TỆ & TIẾN TRÌNH -->
            <div class="hud-currency-bar">
              <div class="hud-pill-coins" id="hud-coins-pill" title="Chip Xu Thưởng 5C4">
                🪙 <span id="hud-coin-count">${this.economy ? this.economy.coins : 120}</span> Xu
              </div>
              <div class="hud-pill-stars" id="hud-stars-pill" title="Sao Tím Danh Hiệu">
                ⭐ <span id="hud-star-count">${this.economy ? this.economy.stars : 25}</span>
              </div>
              <div class="hud-pill-level" id="hud-level-pill" title="Cấp Độ & Danh Hiệu">
                ⚡ <span id="hud-rank-title">${this.economy ? this.economy.getRankTitle() : 'Lv.1 Tập Sự'}</span>
              </div>
              <div class="hud-pill-streak" id="quiz-streak-pill">🔥 Chuỗi: ${this.quizState.streak || 0}</div>
              <div class="hud-pill-progress">⭐ Câu ${this.quizState.qIdx + 1}/${island.quizzes.length}</div>
            </div>

            <!-- HÀNG 2: CÁC NÚT TÍNH NĂNG RPG -->
            <div class="hud-actions-bar">
              <button class="hud-btn-rpg" id="btn-open-quests" title="Mở Sổ Tay Nhiệm Vụ Của Xuân My">
                📜 Nhiệm Vụ <span class="hud-quest-noti-dot" id="hud-quest-dot" style="display:none;">!</span>
              </button>
              <button class="hud-btn-rpg" id="btn-open-penalty" title="Thách Đấu Sút Phạt Đền 11M Tại Sân Bóng">
                ⚽ Sút Phạt
              </button>
              <button class="hud-btn-rpg" id="btn-open-memory" title="Chơi Lật Thẻ Trí Nhớ Tại Thư Viện">
                🃏 Lật Thẻ
              </button>
              <button class="hud-btn-rpg" id="btn-open-boss" title="Đại Chiến Boss Ngữ Pháp Dr. Mistake">
                ⚔️ Đấu Boss
              </button>
              <button class="hud-btn-rpg" id="btn-open-endless" title="Đấu Trường Vô Tận & Luyện Tập Không Giới Hạn">
                ♾️ Vô Tận
              </button>
              <button class="hud-btn-rpg" id="btn-open-shop" title="Cửa Hàng Thời Trang & Thú Cưng">
                🛍️ Cửa Hàng & Pet
              </button>
              <button class="hud-btn-rpg" id="btn-open-leaderboard" title="Bảng Xếp Hạng Tuần Lớp 5C4">
                🏆 Xếp Hạng
              </button>
              <button class="hud-btn-rpg" id="btn-toggle-bgm" title="Bật/Tắt Nhạc Nền Trường Học">
                🎵 Nhạc: Bật
              </button>
              <button class="hud-btn-rpg" id="btn-toggle-camera-quiz" title="Xoay Camera 180 độ xem khuôn mặt Chibi Bé Hà My (Phím C)">
                📷 Xem Mặt Hà My
              </button>
              <button class="hud-btn-fullscreen" id="btn-toggle-fullscreen" title="Bật/Tắt chế độ toàn màn hình">
                ⛶ Toàn màn hình
              </button>
            </div>
          </div>

          <!-- RADAR MINIMAP GÓC TRÊN BÊN PHẢI (CỐ ĐỊNH, KHÔNG BỊ NÚT ĐẨY TRÀN RA GIỮA) -->
          <div class="hud-minimap-wrap" title="Bản Đồ Trường Học Lớp 5C4">
            <canvas id="campus-minimap-canvas" class="hud-minimap-canvas" width="110" height="110"></canvas>
            <span class="hud-minimap-label">🗺️ BẢN ĐỒ KHUÔN VIÊN</span>
          </div>
        </div>

        <!-- BUFF HIỆU ỨNG THỨC ĂN CĂN TIN -->
        <div class="hud-active-buffs" id="hud-active-buffs"></div>

        <!-- HUD QUEST NAVIGATOR ("DẮT MŨI" CHỈ ĐƯỜNG LIÊN HOÀN) -->
        <div class="hud-quest-navigator" id="hud-quest-navigator" style="display: none;">
          <div class="quest-nav-pill">
            <span class="quest-nav-compass">🧭</span>
            <div class="quest-nav-info">
              <span class="quest-nav-title" id="hud-quest-title">Nhiệm Vụ Dẫn Đường</span>
              <span class="quest-nav-desc" id="hud-quest-desc">Đang tìm NPC tiếp theo...</span>
            </div>
            <div class="quest-nav-distance-badge" id="hud-quest-dist-badge">
              <span class="dist-val" id="hud-quest-dist-val">--</span>m
            </div>
            <button class="btn-quest-nav-teleport" id="btn-quest-nav-teleport" title="Bấm phím [T] hoặc click để dịch chuyển ngay">
              🚀 Đến Ngay [T]
            </button>
          </div>
        </div>

        <!-- FLOATING INTERACTION TOAST KHI ĐẾN GẦN NPC / HỒ CÂU / CỘT CỜ -->
        <div class="hud-interaction-toast" id="hud-interaction-toast" style="display: none;">
          <div class="hud-interaction-content">
            <span class="hud-interaction-icon" id="interaction-target-icon">💬</span>
            <span class="hud-interaction-text" id="interaction-target-text">Bấm [E] hoặc [F] để Nói Chuyện</span>
            <button class="hud-btn-interact" id="btn-interact-action">Tương Tác ✨</button>
          </div>
        </div>

        <!-- RPG Modals are loaded globally in index.html -->

        <!-- FLOATING HINT MODAL (Bật khi bấm nút 💡 Mẹo) -->
        <div class="hud-hint-modal" id="smart-hint-box" style="display: none;">
          <div class="hud-hint-title-bar">
            <span>💡 MẸO TƯ DUY TỪ THẦY TUẤN (5C4)</span>
            <button class="hud-hint-close-btn" id="btn-close-hint">✖</button>
          </div>
          <div class="smart-hint-steps">
            ${hintSteps.map((st, i) => `<div class="smart-hint-step-item"><span>${i + 1}️⃣</span> <span>${st}</span></div>`).join('')}
          </div>
        </div>

        <!-- HUD: GÓC DƯỚI MÀN HÌNH - THANH NHẮC PHÍM TỐI GIẢN (LOẠI BỎ THẺ NÚT A/B/C/D & D-PAD ĐEN) -->
        <div class="hud-bottom-bar">
          <div class="hud-nav-instruction">
            <span class="hud-joy-icon">🎮</span>
            <span><strong>🖱️ Giữ chuột:</strong> Xoay 360° • <strong>Cuộn chuột:</strong> Zoom • <strong>WASD / Mũi tên:</strong> Chạy • <strong>[SPACE]:</strong> Nhảy Parkour 🚀 • <strong>[E]/[F]:</strong> Tương tác • <strong>Phím 1-4:</strong> Bục đáp án</span>
          </div>
        </div>

        <!-- FLOATING RESULT / PEDAGOGY FEEDBACK OVERLAY (Hiện khi chọn đáp án) -->
        <div class="hud-feedback-overlay" id="pedagogy-feedback-container" style="display: none;"></div>
      </div>
    `;

    // 1. Back button
    document.getElementById('btn-exit-stage').addEventListener('click', () => {
      this.sound.playClick();
      this.cleanup3D();
      this.renderIslandMiniMap(this.currentIslandIndex);
    });

    const btnQuizCity = document.getElementById('btn-quiz-open-city');
    if (btnQuizCity) {
      btnQuizCity.addEventListener('click', () => {
        this.sound.playClick();
        if (typeof window.enterViceCityMode === 'function') {
          window.enterViceCityMode();
        }
      });
    }

    // 2. Fullscreen Toggle Button (RequestFullscreen API)
    const fsBtn = document.getElementById('btn-toggle-fullscreen');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        const gameContainer = document.getElementById('roblox-game-container');
        if (!document.fullscreenElement) {
          if (gameContainer && gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen().catch(e => console.warn(e));
          } else if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(e => console.warn(e));
          }
        }
      });
    }

    this.fullscreenChangeHandler = () => {
      const isFs = !!document.fullscreenElement;
      if (fsBtn) fsBtn.textContent = isFs ? '🗗 Thu nhỏ' : '⛶ Toàn màn hình';
      if (this.active3DArena) this.active3DArena.handleResize();
    };
    document.addEventListener('fullscreenchange', this.fullscreenChangeHandler);

    // 3. Teacher Voice button
    document.getElementById('btn-speak-teacher').addEventListener('click', () => {
      this.sound.speakVietnamese(qObj.teacherIntro || "Hà My hãy suy nghĩ thật kỹ để chọn bục đáp án đúng nhé!");
    });

    // 4. English Audio button
    document.getElementById('btn-speak-english').addEventListener('click', () => {
      this.sound.speak(qObj.question);
    });

    // 5. Toggle Hint modal
    const hintBtn = document.getElementById('btn-toggle-hint');
    const hintBox = document.getElementById('smart-hint-box');
    const hintCloseBtn = document.getElementById('btn-close-hint');
    if (hintBtn && hintBox) {
      hintBtn.addEventListener('click', () => {
        this.sound.playClick();
        hintBox.style.display = hintBox.style.display === 'none' ? 'block' : 'none';
      });
    }
    if (hintCloseBtn && hintBox) {
      hintCloseBtn.addEventListener('click', () => {
        hintBox.style.display = 'none';
      });
    }

    // RPG Modal Open/Close Button Listeners
    const btnQuests = document.getElementById('btn-open-quests');
    if (btnQuests) btnQuests.addEventListener('click', () => this.openQuestModal());

    const btnShop = document.getElementById('btn-open-shop');
    if (btnShop) btnShop.addEventListener('click', () => this.openShopModal('outfits'));

    const btnLb = document.getElementById('btn-open-leaderboard');
    if (btnLb) btnLb.addEventListener('click', () => this.openLeaderboardModal());

    const btnPenalty = document.getElementById('btn-open-penalty');
    if (btnPenalty) btnPenalty.addEventListener('click', () => this.openSoccerPenaltyMinigame());

    const btnMemory = document.getElementById('btn-open-memory');
    if (btnMemory) btnMemory.addEventListener('click', () => this.openLibraryMemoryMinigame());

    const btnBoss = document.getElementById('btn-open-boss');
    if (btnBoss) btnBoss.addEventListener('click', () => this.openBossBattleMinigame());

    const btnEndless = document.getElementById('btn-open-endless');
    if (btnEndless) btnEndless.addEventListener('click', () => this.openEndlessQuizMode());

    const btnBgm = document.getElementById('btn-toggle-bgm');
    if (btnBgm) btnBgm.addEventListener('click', () => this.toggleBGM());

    const btnCamQuiz = document.getElementById('btn-toggle-camera-quiz');
    if (btnCamQuiz) {
      btnCamQuiz.addEventListener('click', () => {
        this.sound.playClick();
        if (this.active3DArena && typeof this.active3DArena.toggleCameraHeroView === 'function') {
          this.active3DArena.toggleCameraHeroView();
        }
      });
    }

    const closeQ = document.getElementById('btn-close-quest-modal');
    if (closeQ) closeQ.addEventListener('click', () => document.getElementById('campus-quest-modal').style.display = 'none');

    const closeS = document.getElementById('btn-close-shop-modal');
    if (closeS) closeS.addEventListener('click', () => document.getElementById('campus-shop-modal').style.display = 'none');

    const closeF = document.getElementById('btn-close-fishing-modal');
    if (closeF) closeF.addEventListener('click', () => document.getElementById('campus-fishing-modal').style.display = 'none');

    const closeLb = document.getElementById('btn-close-lb-modal');
    if (closeLb) closeLb.addEventListener('click', () => document.getElementById('campus-leaderboard-modal').style.display = 'none');

    const closePen = document.getElementById('btn-close-penalty-modal');
    if (closePen) closePen.addEventListener('click', () => document.getElementById('campus-penalty-modal').style.display = 'none');

    const closeMem = document.getElementById('btn-close-memory-modal');
    if (closeMem) closeMem.addEventListener('click', () => document.getElementById('campus-memory-modal').style.display = 'none');

    const closeBoss = document.getElementById('btn-close-boss-modal');
    if (closeBoss) closeBoss.addEventListener('click', () => document.getElementById('campus-boss-modal').style.display = 'none');

    const closeEndless = document.getElementById('btn-close-endless-modal');
    if (closeEndless) closeEndless.addEventListener('click', () => document.getElementById('campus-endless-modal').style.display = 'none');

    // 6. Initialize 3D Roblox Classroom Arena
    const arenaContainer = document.getElementById('roblox-3d-arena');
    if (typeof RobloxClassroom3D !== 'undefined' && arenaContainer) {
      try {
        console.log("🎮 Đang khởi tạo Phòng Học 3D 16:9 của Thầy Tuấn...");
        this.active3DArena = new RobloxClassroom3D(arenaContainer);
        this.active3DArena.updateBlackboardText(
          qObj.situation || "🏫 LỚP 5C4 - GLOBAL SUCCESS",
          qObj.question,
          formulaText
        );
        this.active3DArena.renderOptionsPads(shuffledOptions, (idx, opt) => {
          this.handleRobloxOptionSelect(idx, opt, qObj, shuffledOptions, island, stage);
        });
        console.log("✅ Khởi tạo Phòng Học 3D 16:9 thành công!");

        // Khởi tạo Radar Minimap
        const minimapCanvas = document.getElementById('campus-minimap-canvas');
        if (minimapCanvas && typeof CampusRPG !== 'undefined') {
          this.minimap = new CampusRPG.MinimapRadar(minimapCanvas, this.active3DArena);
        }

        // Tự động áp dụng trang phục và thú cưng đã trang bị
        if (this.shop) {
          this.shop.applyTo3DWorld();
          this.shop.applyPetTo3DWorld();
        }

        // Gắn các callback tương tác RPG toàn diện
        this.setupArenaCallbacks(this.active3DArena);

        this.active3DArena.onProximityUpdateCallback = ({ nearbyTarget, standingPadIndex }) => {
          const toast = document.getElementById('hud-interaction-toast');
          const toastText = document.getElementById('interaction-target-text');
          const toastIcon = document.getElementById('interaction-target-icon');

          if (nearbyTarget && standingPadIndex < 0) {
            if (toast) toast.style.display = 'flex';
            if (toastText) toastText.textContent = nearbyTarget.prompt;
            if (toastIcon) {
              if (nearbyTarget.type === 'npc') {
                toastIcon.textContent = nearbyTarget.npc.icon || (
                  nearbyTarget.npc.id === 'teacher_co_mai' ? '📐' :
                  nearbyTarget.npc.id === 'xuan_my' ? '📜' :
                  nearbyTarget.npc.id === 'chef_bear' ? '👨‍🍳' :
                  nearbyTarget.npc.id === 'fisherman' ? '🎣' :
                  nearbyTarget.npc.id === 'coach_viet' ? '⚽' :
                  nearbyTarget.npc.id === 'goalie_robot' ? '🤖' :
                  nearbyTarget.npc.id === 'librarian_hue' ? '📖' :
                  nearbyTarget.npc.id === 'boss_dr_mistake' ? '🧙‍♂️' :
                  nearbyTarget.npc.id === 'gardener_tu' ? '🌻' : '💬'
                );
              } else if (nearbyTarget.type === 'fishing') {
                toastIcon.textContent = '🎣';
              } else if (nearbyTarget.type === 'flagpole') {
                toastIcon.textContent = '🇻🇳';
              } else if (nearbyTarget.type === 'soccer_penalty') {
                toastIcon.textContent = '⚽';
              } else if (nearbyTarget.type === 'library') {
                toastIcon.textContent = '📖';
              } else if (nearbyTarget.type === 'boss_battle') {
                toastIcon.textContent = '⚔️';
              } else if (nearbyTarget.type === 'botanical_garden') {
                toastIcon.textContent = '🌺';
              } else if (nearbyTarget.type === 'basketball') {
                toastIcon.textContent = '🏀';
              } else if (nearbyTarget.type === 'school_drum') {
                toastIcon.textContent = '🥁';
              } else if (nearbyTarget.type === 'folk_game') {
                toastIcon.textContent = '🌾';
              }
            }
          } else {
            if (toast) toast.style.display = 'none';
          }

          // Vẽ Radar Minimap
          if (this.minimap && this.active3DArena.studentMesh) {
            this.minimap.render(this.active3DArena.studentMesh.position, this.active3DArena.studentMesh.rotation.y);
          }
        };

        // Gắn sự kiện nút tương tác nhanh trên HUD
        const interactBtn = document.getElementById('btn-interact-action');
        if (interactBtn) {
          interactBtn.addEventListener('click', () => {
            this.active3DArena.triggerInteractionKey();
          });
        }

        // Bật BGM nhẹ nhàng
        if (this.bgm && !this.bgm.isPlaying) {
          this.bgm.start();
        }

        this.updateCampusHUDCurrency();
      } catch (err) {
        console.error("❌ Lỗi khởi tạo Phòng Học 3D 16:9:", err);
      }
    }

    // 7. Auto voice greeting from Teacher Thầy Tuấn
    setTimeout(() => {
      if (qObj.teacherIntro) {
        this.sound.speakVietnamese(qObj.teacherIntro);
      } else {
        this.sound.speak(qObj.question);
      }
    }, 450);

    // 8. Keyboard Shortcuts: ONLY numbers 1, 2, 3, 4! Never letters A, B, C, D to avoid WASD conflict!
    this.quizKeyHandler = (e) => {
      const key = e.key;
      let selectedIdx = -1;
      if (key === '1') selectedIdx = 0;
      else if (key === '2') selectedIdx = 1;
      else if (key === '3') selectedIdx = 2;
      else if (key === '4') selectedIdx = 3;

      if (selectedIdx >= 0 && selectedIdx < shuffledOptions.length) {
        if (!this.active3DArena || !this.active3DArena.selectionLocked) {
          this.handleRobloxOptionSelect(selectedIdx, shuffledOptions[selectedIdx], qObj, shuffledOptions, island, stage);
        }
      }
    };
    window.addEventListener('keydown', this.quizKeyHandler);
  }

  handleRobloxOptionSelect(idx, opt, qObj, shuffledOptions, island, stage) {
    // 1. Remove keyboard selection handler immediately
    if (this.quizKeyHandler) {
      window.removeEventListener('keydown', this.quizKeyHandler);
      this.quizKeyHandler = null;
    }

    // 2. Lock 3D movement and make avatar jump to the chosen pad
    if (this.active3DArena) {
      this.active3DArena.selectionLocked = true;
      this.active3DArena.jumpToPad(idx);
    }

    // 3. Pronounce chosen option
    this.sound.speak(opt.text);

    const feedbackContainer = document.getElementById('pedagogy-feedback-container');
    const speechBox = document.getElementById('teacher-speech-box');
    if (feedbackContainer) feedbackContainer.style.display = 'flex';

    if (opt.correct) {
      // CORRECT ANSWER
      if (this.active3DArena) this.active3DArena.playVictoryCelebration();
      this.sound.playCorrect();
      this.confetti.fire(70);

      this.quizState.streak = (this.quizState.streak || 0) + 1;
      const streakPill = document.getElementById('quiz-streak-pill');
      if (streakPill) streakPill.textContent = `🔥 Chuỗi: ${this.quizState.streak}`;

      // Cập nhật phần thưởng kinh tế RPG (Xu, Sao, EXP, Quests)
      if (this.economy) {
        this.sound.playCoin();
        const gainedCoins = this.economy.addCoins(20, 'Trả lời đúng bài học 5C4');
        this.economy.addStars(1);
        this.economy.addExp(25);
      }
      if (this.quests) {
        this.quests.trackProgress('answer_quiz', 1);
      }
      this.updateCampusHUDCurrency();

      if (speechBox) {
        speechBox.innerHTML = `🎉 <strong>${qObj.teacherPraise || 'Xuất sắc tuyệt đối Hà My 5C4 ơi! Chuẩn xác 100%!'}</strong>`;
      }

      if (feedbackContainer) {
        feedbackContainer.innerHTML = `
          <div class="hud-feedback-card correct">
            <div class="hud-feedback-header">
              <div class="hud-feedback-chibi-badge">
                <img src="chibi_ha_my.jpg" alt="Bé Hà My Chibi" class="hud-feedback-chibi-img">
                <div class="hud-feedback-title">🎉 CHÍNH XÁC XUẤT SẮC BÉ HÀ MY ƠI!</div>
              </div>
              <span style="font-size: 0.85rem; font-weight: 800; color: #4ade80;">🪙 +20 Xu  ⭐ +1 Sao  ⚡ +25 EXP</span>
            </div>
            <div class="hud-grammar-pill">
              🔍 <strong>Giải Thích Của Thầy Tuấn:</strong><br>
              ${qObj.teacherExplanation || qObj.explanation}
            </div>
            <div class="hud-teacher-verdict">
              💬 "${qObj.teacherPraise || 'Hà My áp dụng rất đúng quy tắc ngữ pháp!'}"
            </div>
            <div class="hud-translation-pill">
              🇻🇳 <strong>Dịch Nghĩa SGK:</strong> "${qObj.vietnameseTranslation || ''}"
            </div>
            ${qObj.grammarTrap ? `
              <div class="hud-trap-alert">
                ⚠️ <strong>Mẹo Tránh Bẫy Thi Cử:</strong><br>
                ${qObj.grammarTrap}
              </div>
            ` : ''}
            <button class="hud-btn-advance" id="btn-next-step">
              <span>Tiếp Tục Phiêu Lưu 🚀</span>
              <small style="font-size: 0.75rem; opacity: 0.85;">(Bấm SPACE hoặc ENTER)</small>
            </button>
          </div>
        `;
      }

      // Voice praise
      setTimeout(() => {
        this.sound.speakVietnamese(qObj.teacherPraise || "Chính xác xuất sắc Hà My ơi!");
      }, 500);

      const advanceToNext = () => {
        if (this.advanceKeyHandler) {
          window.removeEventListener('keydown', this.advanceKeyHandler);
          this.advanceKeyHandler = null;
        }
        if (this.quizState.qIdx + 1 < island.quizzes.length) {
          this.quizState.qIdx++;
          this.renderQuizStep(document.getElementById('main-game-screen'), island, stage);
        } else {
          this.cleanup3D();
          this.finishStage(island, stage);
        }
      };

      this.advanceKeyHandler = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          advanceToNext();
        }
      };
      window.addEventListener('keydown', this.advanceKeyHandler);

      const nextBtn = document.getElementById('btn-next-step');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          this.sound.playClick();
          advanceToNext();
        });
      }

    } else {
      // WRONG ANSWER
      const correctIdx = shuffledOptions.findIndex(o => o.correct);
      if (this.active3DArena) this.active3DArena.playWrongReaction(correctIdx);
      this.sound.playWrong();

      this.quizState.streak = 0;
      const streakPill = document.getElementById('quiz-streak-pill');
      if (streakPill) streakPill.textContent = `🔥 Chuỗi: 0`;

      if (speechBox) {
        speechBox.innerHTML = `💡 <strong>${qObj.teacherCorrection || 'Chưa đúng rồi con ơi, hãy cùng thầy quan sát nhé!'}</strong>`;
      }

      if (feedbackContainer) {
        feedbackContainer.innerHTML = `
          <div class="hud-feedback-card wrong">
            <div class="hud-feedback-header">
              <div class="hud-feedback-chibi-badge">
                <img src="chibi_ha_my.jpg" alt="Bé Hà My Chibi" class="hud-feedback-chibi-img">
                <div class="hud-feedback-title">💡 CHƯA CHÍNH XÁC RỒI! HÀ MY CHÚ Ý NHÉ:</div>
              </div>
            </div>
            <div class="hud-trap-alert">
              ⚠️ <strong>Bẫy Ngữ Pháp Con Vừa Mắc:</strong><br>
              ${qObj.teacherCorrection || qObj.grammarTrap || 'Con cần chú ý kỹ sự hòa hợp giữa chủ ngữ và động từ!'}
            </div>
            <div class="hud-grammar-pill">
              🔍 <strong>Đáp Án Đúng Chuẩn 100%:</strong><br>
              ${qObj.teacherExplanation || qObj.explanation}
            </div>
            <div class="hud-translation-pill">
              🇻🇳 <strong>Dịch Nghĩa SGK:</strong> "${qObj.vietnameseTranslation || ''}"
            </div>
            <button class="hud-btn-advance" id="btn-skip-next" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
              <span>Xem Đáp Án & Đi Tiếp ⏩</span>
              <small style="font-size: 0.75rem; opacity: 0.85;">(Bấm SPACE hoặc ENTER)</small>
            </button>
          </div>
        `;
      }

      // Voice correction
      setTimeout(() => {
        this.sound.speakVietnamese(qObj.teacherCorrection || "Chưa đúng rồi con yêu, hãy cùng thầy phân tích nhé!");
      }, 500);

      const advanceToNext = () => {
        if (this.advanceKeyHandler) {
          window.removeEventListener('keydown', this.advanceKeyHandler);
          this.advanceKeyHandler = null;
        }
        if (this.quizState.qIdx + 1 < island.quizzes.length) {
          this.quizState.qIdx++;
          this.renderQuizStep(document.getElementById('main-game-screen'), island, stage);
        } else {
          this.cleanup3D();
          this.finishStage(island, stage);
        }
      };

      this.advanceKeyHandler = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          advanceToNext();
        }
      };
      window.addEventListener('keydown', this.advanceKeyHandler);

      const skipBtn = document.getElementById('btn-skip-next');
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          this.sound.playClick();
          advanceToNext();
        });
      }
    }
  }

  // ========================================================
  // BẢN QUIZ CHUẨN (CHO KHỐI LỚP 1 VÀ LỚP 2)
  // ========================================================
  renderStandardQuiz(container, island, stage) {
    const qObj = island.quizzes[this.quizState.qIdx];
    const shuffledOptions = [...qObj.options].sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="game-playing-header">
        <button class="btn-back-world" id="btn-exit-stage">⬅ Bản Đồ Đảo</button>
        <h3 style="color: #1e1b4b;">🎯 Ải ${stage.number}: ${stage.name}</h3>
        <div class="stat-pill">Câu ${this.quizState.qIdx + 1} / ${island.quizzes.length}</div>
      </div>

      <div class="quiz-arena">
        <div class="quiz-target-picture-box">
          <div class="quiz-target-emoji">${qObj.targetPicture || '📝'}</div>
          <div class="quiz-question-callout">
            <span class="quiz-callout-text">"${qObj.question}"</span>
            <button class="btn-icon-round" id="btn-quiz-speak" title="Nghe câu hỏi">🔊</button>
          </div>
          ${qObj.situation ? `<div class="quiz-situation-sub">${qObj.situation}</div>` : ''}
        </div>

        <div class="quiz-task-instruction">
          <span>👉</span>
          <span>${qObj.instruction}</span>
        </div>

        <div class="quiz-options-grid" id="quiz-options-list"></div>
        <div class="quiz-post-explanation" id="quiz-post-exp" style="display: none;"></div>
      </div>
    `;

    document.getElementById('btn-exit-stage').addEventListener('click', () => {
      this.sound.playClick();
      this.renderIslandMiniMap(this.currentIslandIndex);
    });

    document.getElementById('btn-quiz-speak').addEventListener('click', () => {
      this.sound.speak(qObj.question);
    });

    setTimeout(() => this.sound.speak(qObj.question), 300);

    const letters = ['A', 'B', 'C', 'D'];
    const optList = document.getElementById('quiz-options-list');

    shuffledOptions.forEach((opt, idx) => {
      const btn = document.createElement('div');
      btn.className = 'clean-quiz-option';
      btn.innerHTML = `
        <div class="option-left-content">
          <span class="option-badge-letter">${letters[idx] || (idx + 1)}</span>
          <span class="option-english-text">${opt.text}</span>
        </div>
        <button class="btn-speak-option" title="Nghe từ/câu này">🔊</button>
      `;

      btn.querySelector('.btn-speak-option').addEventListener('click', (e) => {
        e.stopPropagation();
        this.sound.speak(opt.text);
      });

      btn.addEventListener('click', () => {
        this.handleStandardQuizSelect(btn, opt, qObj, shuffledOptions, island, stage);
      });

      optList.appendChild(btn);
    });
  }

  handleStandardQuizSelect(btnEl, opt, qObj, shuffledOptions, island, stage) {
    const allBtns = document.querySelectorAll('.clean-quiz-option');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    this.sound.speak(opt.text);
    const expBox = document.getElementById('quiz-post-exp');
    expBox.style.display = 'block';

    if (opt.correct) {
      btnEl.classList.add('correct');
      this.sound.playCorrect();
      this.confetti.fire(50);
      expBox.style.background = '#dcfce7';
      expBox.style.borderColor = '#86efac';
      expBox.style.color = '#15803d';
      expBox.innerHTML = `🎉 <strong>Chính xác xuất sắc!</strong> ${qObj.explanation}`;

      setTimeout(() => {
        if (this.quizState.qIdx + 1 < island.quizzes.length) {
          this.quizState.qIdx++;
          this.renderQuizStep(document.getElementById('main-game-screen'), island, stage);
        } else {
          this.finishStage(island, stage);
        }
      }, 1800);
    } else {
      btnEl.classList.add('wrong');
      this.sound.playWrong();
      expBox.style.background = '#fee2e2';
      expBox.style.borderColor = '#fca5a5';
      expBox.style.color = '#b91c1c';
      expBox.innerHTML = `💡 <strong>Chưa đúng rồi!</strong> ${qObj.explanation}`;

      allBtns.forEach((b, i) => {
        if (shuffledOptions[i].correct) b.classList.add('correct');
      });

      setTimeout(() => {
        if (this.quizState.qIdx + 1 < island.quizzes.length) {
          this.quizState.qIdx++;
          this.renderQuizStep(document.getElementById('main-game-screen'), island, stage);
        } else {
          this.finishStage(island, stage);
        }
      }, 2400);
    }
  }

  // GAMEPLAY 4: BẮN BONG BÓNG (BUBBLE POP)
  // --------------------------------------------------------
  playBubbleStage(container, island, stage) {
    this.bubbleState = {
      wordIdx: 0,
      totalWords: Math.min(4, island.words.length)
    };
    this.renderBubbleRound(container, island, stage);
  }

  renderBubbleRound(container, island, stage) {
    const targetWordObj = island.words[this.bubbleState.wordIdx];

    const otherWords = island.words.filter(w => w.id !== targetWordObj.id);
    const distractors = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
    const bubbleItems = [targetWordObj, ...distractors].sort(() => Math.random() - 0.5);
    const isSmart = this.isSmartMode();

    container.innerHTML = `
      <div class="game-playing-header">
        <button class="btn-back-world" id="btn-exit-stage">⬅ Bản Đồ Đảo</button>
        <h3 style="color: #1e1b4b;">🎧 Ải ${stage.number}: Luyện Nghe & Chọn Bóng Chữ</h3>
        <div class="stat-pill">Câu ${this.bubbleState.wordIdx + 1} / ${this.bubbleState.totalWords}</div>
      </div>

      <div class="bubble-arena">
        <!-- KHUNG LUYỆN NGHE: TUYỆT ĐỐI KHÔNG IN CHỮ TIẾNG ANH ĐỂ TRÁNH LỘ ĐÁP ÁN! -->
        <div class="listening-center-card">
          <div class="listening-info-group">
            <div class="listening-sound-badge" id="btn-bubble-headphone" title="Bấm nghe lại phát âm">🎧</div>
            <div class="listening-text-col">
              <div class="listening-title">
                <span>🔊 Bé hãy lắng nghe phát âm!</span>
              </div>
              <div class="listening-subhint">
                👉 Lắng nghe thật kỹ và chạm vào quả bóng có từ đúng nhất!
              </div>
            </div>
          </div>
          <button class="btn-replay-audio" id="btn-bubble-speak" title="Nghe lại phát âm">
            <span>🔊</span>
            <span>Nghe Lại</span>
          </button>
        </div>

        <div class="bubbles-stage" id="bubbles-stage"></div>

        <div class="bubble-feedback-banner" id="bubble-feedback" style="display: none;"></div>
      </div>
    `;

    document.getElementById('btn-exit-stage').addEventListener('click', () => {
      this.sound.playClick();
      this.renderIslandMiniMap(this.currentIslandIndex);
    });

    const speakWord = () => {
      this.sound.speak(targetWordObj.word);
    };

    document.getElementById('btn-bubble-speak').addEventListener('click', speakWord);
    document.getElementById('btn-bubble-headphone').addEventListener('click', speakWord);

    // Tự động phát âm ngay khi bắt đầu để học sinh lắng nghe
    setTimeout(speakWord, 350);

    const stageEl = document.getElementById('bubbles-stage');
    const feedbackEl = document.getElementById('bubble-feedback');

    bubbleItems.forEach(item => {
      const bEl = document.createElement('div');
      bEl.className = 'floating-bubble';
      bEl.textContent = item.word;

      bEl.addEventListener('click', () => {
        if (item.id === targetWordObj.id) {
          this.sound.playCorrect();
          this.sound.speak(item.word);
          this.confetti.fire(40);
          bEl.classList.add('popped');

          feedbackEl.style.display = 'block';
          feedbackEl.className = 'bubble-feedback-banner correct';
          feedbackEl.innerHTML = `🎉 <strong>Chính xác!</strong> Từ vừa nghe là <strong>"${targetWordObj.word}"</strong>!`;

          setTimeout(() => {
            if (this.bubbleState.wordIdx + 1 < this.bubbleState.totalWords) {
              this.bubbleState.wordIdx++;
              this.renderBubbleRound(container, island, stage);
            } else {
              this.finishStage(island, stage);
            }
          }, 1100);
        } else {
          this.sound.playWrong();
          bEl.style.transform = 'scale(0.85)';
          feedbackEl.style.display = 'block';
          feedbackEl.className = 'bubble-feedback-banner wrong';
          feedbackEl.innerHTML = `💡 Chưa đúng rồi! Bé bấm loa 🔊 để nghe lại phát âm nhé!`;
          setTimeout(() => {
            bEl.style.transform = '';
          }, 350);
        }
      });

      stageEl.appendChild(bEl);
    });
  }

  // --------------------------------------------------------
  // GAMEPLAY 5: NỐI CẶP TRANH & CHỮ (MATCHING PAIRS)
  // --------------------------------------------------------
  playMatchingStage(container, island, stage) {
    const selectedWords = island.words.slice(0, 4);
    const picCards = [...selectedWords].sort(() => Math.random() - 0.5);
    const wordCards = [...selectedWords].sort(() => Math.random() - 0.5);

    this.matchingState = {
      selectedPic: null,
      selectedPicEl: null,
      selectedWord: null,
      selectedWordEl: null,
      matchedPairs: 0,
      totalPairs: selectedWords.length
    };

    container.innerHTML = `
      <div class="game-playing-header">
        <button class="btn-back-world" id="btn-exit-stage">⬅ Bản Đồ Đảo</button>
        <h3 style="color: #1e1b4b;">🔗 Ải ${stage.number}: ${stage.name}</h3>
        <div class="stat-pill" id="matching-counter">0 / ${selectedWords.length} cặp</div>
      </div>

      <div class="matching-arena">
        <div class="matching-prompt">
          <span>👉</span>
          <span>${this.isSmartMode() ? 'Hà My bấm vào 1 hình / gợi ý bên trái rồi nối với từ vựng tiếng Anh tương ứng bên phải nhé!' : 'Bé bấm vào 1 hình bên trái rồi bấm vào 1 chữ đúng bên phải để nối cặp nhé!'}</span>
        </div>

        <div class="matching-grid-columns">
          <div class="matching-col" id="col-pictures"></div>
          <div class="matching-col" id="col-words"></div>
        </div>
      </div>
    `;

    document.getElementById('btn-exit-stage').addEventListener('click', () => {
      this.sound.playClick();
      this.renderIslandMiniMap(this.currentIslandIndex);
    });

    const colPic = document.getElementById('col-pictures');
    const colWord = document.getElementById('col-words');

    picCards.forEach(item => {
      const card = document.createElement('div');
      card.className = 'matching-item-card';
      if (item.leftText) {
        card.innerHTML = `<span class="matching-text">${item.leftText}</span>`;
      } else {
        card.innerHTML = `
          <div class="matching-left-box">
            <span class="matching-icon">${item.icon}</span>
            ${item.meaning ? `<span class="matching-sub-meaning">${item.meaning}</span>` : ''}
          </div>
        `;
      }
      card.addEventListener('click', () => {
        if (card.classList.contains('matched')) return;
        this.sound.playClick();
        if (this.matchingState.selectedPicEl) {
          this.matchingState.selectedPicEl.classList.remove('selected');
        }
        this.matchingState.selectedPic = item;
        this.matchingState.selectedPicEl = card;
        card.classList.add('selected');
        this.checkMatchCondition(island, stage);
      });
      colPic.appendChild(card);
    });

    wordCards.forEach(item => {
      const card = document.createElement('div');
      card.className = 'matching-item-card';
      card.innerHTML = `<span class="matching-text">${item.word}</span> <button class="btn-icon-round" style="width: 32px; height: 32px; font-size: 0.9rem;" title="Nghe">🔊</button>`;
      
      card.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        this.sound.speak(item.word);
      });

      card.addEventListener('click', () => {
        if (card.classList.contains('matched')) return;
        this.sound.playClick();
        this.sound.speak(item.word);
        if (this.matchingState.selectedWordEl) {
          this.matchingState.selectedWordEl.classList.remove('selected');
        }
        this.matchingState.selectedWord = item;
        this.matchingState.selectedWordEl = card;
        card.classList.add('selected');
        this.checkMatchCondition(island, stage);
      });
      colWord.appendChild(card);
    });
  }

  checkMatchCondition(island, stage) {
    const { selectedPic, selectedPicEl, selectedWord, selectedWordEl } = this.matchingState;
    if (selectedPic && selectedWord) {
      if (selectedPic.id === selectedWord.id) {
        this.sound.playCorrect();
        this.confetti.fire(30);
        selectedPicEl.classList.remove('selected');
        selectedWordEl.classList.remove('selected');
        selectedPicEl.classList.add('matched');
        selectedWordEl.classList.add('matched');
        this.matchingState.selectedPic = null;
        this.matchingState.selectedPicEl = null;
        this.matchingState.selectedWord = null;
        this.matchingState.selectedWordEl = null;
        this.matchingState.matchedPairs++;

        document.getElementById('matching-counter').textContent = 
          `${this.matchingState.matchedPairs} / ${this.matchingState.totalPairs} cặp`;

        if (this.matchingState.matchedPairs === this.matchingState.totalPairs) {
          setTimeout(() => this.finishStage(island, stage), 700);
        }
      } else {
        this.sound.playWrong();
        setTimeout(() => {
          if (selectedPicEl) selectedPicEl.classList.remove('selected');
          if (selectedWordEl) selectedWordEl.classList.remove('selected');
          this.matchingState.selectedPic = null;
          this.matchingState.selectedPicEl = null;
          this.matchingState.selectedWord = null;
          this.matchingState.selectedWordEl = null;
        }, 600);
      }
    }
  }

  // --------------------------------------------------------
  // GAMEPLAY 6: BẮT CHỮ CÁI ĐẦU (PHONICS HUNT)
  // --------------------------------------------------------
  playPhonicsStage(container, island, stage) {
    this.phonicsState = {
      wordIdx: 0,
      totalWords: Math.min(3, island.words.length)
    };
    this.renderPhonicsStep(container, island, stage);
  }

  renderPhonicsStep(container, island, stage) {
    const wordObj = island.words[this.phonicsState.wordIdx];
    const correctLetter = (wordObj.phonics || wordObj.word[0]).toUpperCase();

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const otherLetters = alphabet.split('').filter(l => l !== correctLetter);
    const distractors = otherLetters.sort(() => Math.random() - 0.5).slice(0, 2);
    const letterChoices = [correctLetter, ...distractors].sort(() => Math.random() - 0.5);

    const maskedWord = '_ ' + wordObj.word.slice(1).toUpperCase().split('').join(' ');

    container.innerHTML = `
      <div class="game-playing-header">
        <button class="btn-back-world" id="btn-exit-stage">⬅ Bản Đồ Đảo</button>
        <h3 style="color: #1e1b4b;">🎧 Ải ${stage.number}: Luyện Nghe Phonics</h3>
        <div class="stat-pill">Câu ${this.phonicsState.wordIdx + 1} / ${this.phonicsState.totalWords}</div>
      </div>

      <div class="phonics-arena">
        <div class="phonics-picture-card">
          <div class="phonics-big-icon">${wordObj.icon}</div>
          <div class="phonics-word-hint">
            <span class="phonics-masked-text" id="phonics-masked-word">${maskedWord}</span>
            <button class="btn-icon-round" id="btn-phonics-speak" title="Nghe phát âm">🔊</button>
          </div>
          <div style="font-size: 1.1rem; color: #1e1b4b; font-weight: 800; margin-top: 6px;">🎧 Bé lắng nghe phát âm và chọn chữ cái bắt đầu:</div>
        </div>

        <div class="phonics-buttons-row" id="phonics-letters-row"></div>
      </div>
    `;

    document.getElementById('btn-exit-stage').addEventListener('click', () => {
      this.sound.playClick();
      this.renderIslandMiniMap(this.currentIslandIndex);
    });

    document.getElementById('btn-phonics-speak').addEventListener('click', () => {
      this.sound.speak(`${correctLetter}... ${wordObj.word}`);
    });

    setTimeout(() => this.sound.speak(`${correctLetter}... ${wordObj.word}`), 350);

    const row = document.getElementById('phonics-letters-row');
    letterChoices.forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'phonics-letter-btn';
      btn.textContent = letter;

      btn.addEventListener('click', () => {
        this.sound.speak(letter);
        if (letter === correctLetter) {
          btn.classList.add('correct');
          this.sound.playCorrect();
          this.confetti.fire(35);
          const maskedEl = document.getElementById('phonics-masked-word');
          if (maskedEl) {
            maskedEl.textContent = wordObj.word.toUpperCase().split('').join(' ');
            maskedEl.style.borderColor = '#22c55e';
            maskedEl.style.background = '#dcfce7';
            maskedEl.style.color = '#15803d';
          }

          setTimeout(() => {
            if (this.phonicsState.wordIdx + 1 < this.phonicsState.totalWords) {
              this.phonicsState.wordIdx++;
              this.renderPhonicsStep(container, island, stage);
            } else {
              this.finishStage(island, stage);
            }
          }, 900);
        } else {
          btn.classList.add('wrong');
          this.sound.playWrong();
          setTimeout(() => btn.classList.remove('wrong'), 500);
        }
      });

      row.appendChild(btn);
    });
  }


// ========================================================
  // PHÂN HỆ CAMPUS RPG: KINH TẾ, NHIỆM VỤ, SHOP, CÂU CÁ, MINIMAP
  // ========================================================
  initCampusRPG() {
    if (typeof CampusRPG !== 'undefined') {
      this.economy = new CampusRPG.EconomyManager();
      this.quests = new CampusRPG.QuestManager(this.economy);
      this.shop = new CampusRPG.ShopManager(this.economy);
      this.bgm = new CampusRPG.WebAudioBGM();

      window.CampusEconomyInstance = this.economy;
      window.CampusQuestInstance = this.quests;
      window.CampusShopInstance = this.shop;

      // Lắng nghe thay đổi kinh tế để cập nhật HUD
      this.economy.onChange((data) => {
        this.updateCampusHUDCurrency();
        this.updateDashboard();
      });

      this.quests.onChange(() => {
        this.quests.checkAnyClaimable();
      });
    }
  }

  updateCampusHUDCurrency() {
    if (!this.economy) return;
    const coinEl = document.getElementById('hud-coin-count');
    if (coinEl) coinEl.textContent = this.economy.coins;

    const starEl = document.getElementById('hud-star-count');
    if (starEl) starEl.textContent = this.economy.stars;

    const levelEl = document.getElementById('hud-rank-title');
    if (levelEl) levelEl.textContent = this.economy.getRankTitle();

    this.updateCampusActiveBuffs();
  }

  updateCampusActiveBuffs() {
    const buffContainer = document.getElementById('hud-active-buffs');
    if (!buffContainer || !this.economy) return;

    this.economy.checkBuffExpiry();
    const buff = this.economy.activeBuff;

    if (buff) {
      buffContainer.innerHTML = `
        <div class="hud-buff-pill">
          <span>${buff.icon || '⚡'}</span>
          <span><strong>${buff.name || 'Buff Hoạt Động'}</strong></span>
        </div>
      `;
      // Đồng bộ vào Three.js Arena
      if (this.active3DArena) {
        if (buff.type === 'speed' || buff.type === 'speed_jump') {
          this.active3DArena.speedMultiplier = 1.4;
        } else {
          this.active3DArena.speedMultiplier = 1.0;
        }
        if (buff.type === 'jump' || buff.type === 'speed_jump') {
          this.active3DArena.jumpMultiplier = 1.45;
        } else {
          this.active3DArena.jumpMultiplier = 1.0;
        }
      }
    } else {
      buffContainer.innerHTML = '';
      if (this.active3DArena) {
        this.active3DArena.speedMultiplier = 1.0;
        this.active3DArena.jumpMultiplier = 1.0;
      }
    }
  }

  toggleBGM() {
    if (!this.bgm) return;
    const isPlaying = this.bgm.toggle();
    const bgmBtn = document.getElementById('btn-toggle-bgm');
    if (bgmBtn) {
      bgmBtn.innerHTML = isPlaying ? '🎵 Nhạc: Bật' : '🔇 Nhạc: Tắt';
      bgmBtn.classList.toggle('active', isPlaying);
    }
  }

  // --------------------------------------------------------
  // MODAL 1: SỔ TAY NHIỆM VỤ CỦA XUÂN MY (QUEST SYSTEM)
  // --------------------------------------------------------
  openQuestModal(activeCat = 'all') {
    this.sound.playClick();
    if (!this.quests) return;

    const modal = document.getElementById('campus-quest-modal');
    if (!modal) return;
    modal.style.display = 'flex';

    // 1. Render Category Filter Tabs
    const catContainer = document.getElementById('campus-quest-categories');
    if (catContainer) {
      const allQ = this.quests.quests;
      const countAll = allQ.length;
      const countDaily = allQ.filter(q => q.category === 'daily').length;
      const countAcad = allQ.filter(q => q.category === 'academic').length;
      const countSports = allQ.filter(q => q.category === 'sports').length;
      const countEpic = allQ.filter(q => q.category === 'epic').length;

      const tabs = [
        { id: 'all', label: `🌟 Tất Cả (${countAll})` },
        { id: 'daily', label: `☀️ Hằng Ngày (${countDaily})` },
        { id: 'academic', label: `📚 Học Tập (${countAcad})` },
        { id: 'sports', label: `⚽ Thể Thao (${countSports})` },
        { id: 'epic', label: `👑 Sử Thi (${countEpic})` }
      ];

      catContainer.innerHTML = tabs.map(t => `
        <button class="quest-cat-btn ${t.id === activeCat ? 'active' : ''}" data-cat="${t.id}">${t.label}</button>
      `).join('');

      catContainer.querySelectorAll('.quest-cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const cat = e.currentTarget.getAttribute('data-cat');
          this.openQuestModal(cat);
        });
      });
    }

    // 2. Render Quest Cards List
    const questListEl = document.getElementById('campus-quest-list');
    if (questListEl) {
      const displayQuests = (activeCat === 'all')
        ? this.quests.quests
        : this.quests.quests.filter(q => q.category === activeCat);

      if (displayQuests.length === 0) {
        questListEl.innerHTML = `<div class="quest-empty-tip">✨ Hiện chưa có nhiệm vụ nào trong danh mục này!</div>`;
      } else {
        questListEl.innerHTML = displayQuests.map(q => {
          const isDone = q.current >= q.goal;
          const progressPct = Math.min(100, Math.round((q.current / q.goal) * 100));

          let actionHtml = '';
          if (q.claimed) {
            actionHtml = '<button class="quest-btn-claimed" disabled>✅ Đã Nhận</button>';
          } else if (isDone) {
            actionHtml = `<button class="quest-btn-claim pulse-glow" data-quest-id="${q.id}">🎁 Nhận ${q.coins} Xu + ${q.stars} ⭐</button>`;
          } else {
            actionHtml = `<span class="quest-status-text">Đang làm (${q.current}/${q.goal})</span>`;
          }

          const hasTeleport = q.teleport && !q.claimed;

          return `
            <div class="quest-card ${isDone && !q.claimed ? 'quest-claimable' : ''}">
              <div class="quest-card-header">
                <span class="quest-npc-tag">${q.npcIcon} ${q.npc} - ${q.location}</span>
                <div class="quest-rewards-badge">
                  <span>🪙 +${q.coins}</span>
                  <span>⭐ +${q.stars}</span>
                  <span>⚡ +${q.exp}</span>
                </div>
              </div>
              <h4 class="quest-title">${q.title}</h4>
              <p class="quest-desc">${q.desc}</p>
              ${q.rewardItem ? `<div class="quest-special-item">🎁 Quà đặc biệt: <strong>${q.rewardItem}</strong></div>` : ''}
              <div class="quest-progress-wrap">
                <div class="quest-progress-bar">
                  <div class="quest-progress-fill" style="width: ${progressPct}%;"></div>
                </div>
                <span class="quest-progress-number">${q.current}/${q.goal}</span>
              </div>
              <div class="quest-card-footer">
                ${hasTeleport ? `
                  <button class="quest-btn-teleport" data-tx="${q.teleport.x}" data-tz="${q.teleport.z}" data-tloc="${q.teleport.label || q.location}">
                    🚀 Đến Ngay
                  </button>
                ` : '<div></div>'}
                ${actionHtml}
              </div>
            </div>
          `;
        }).join('');
      }

      // Gắn sự kiện nút Nhận Thưởng
      questListEl.querySelectorAll('.quest-btn-claim').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const qId = e.currentTarget.getAttribute('data-quest-id');
          if (this.quests.claimReward(qId)) {
            this.sound.playCorrect();
            this.sound.playCoin();
            this.confetti.fire(60);
            this.openQuestModal(activeCat); // Render lại danh sách đúng tab hiện tại
            this.updateCampusHUDCurrency();
          }
        });
      });

      // Gắn sự kiện nút Dịch Chuyển Tức Thời 🚀 Đến Ngay
      questListEl.querySelectorAll('.quest-btn-teleport').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tx = parseFloat(e.currentTarget.getAttribute('data-tx'));
          const tz = parseFloat(e.currentTarget.getAttribute('data-tz'));
          const tloc = e.currentTarget.getAttribute('data-tloc');
          modal.style.display = 'none';
          if (this.active3DArena) {
            this.sound.playClick();
            this.active3DArena.teleportTo(tx, tz, tloc);
          }
        });
      });
    }

    modal.style.display = 'flex';
  }

  // --------------------------------------------------------
  // MODAL 2: CỬA HÀNG THỜI TRANG & THÚ CƯNG & CĂN TIN (SHOP)
  // --------------------------------------------------------
  openShopModal(defaultTab = 'outfits') {
    this.sound.playClick();
    if (!this.shop) return;

    const modal = document.getElementById('campus-shop-modal');
    if (!modal) return;
    modal.style.display = 'flex';

    this.renderShopTab(defaultTab);

    // Gắn sự kiện chuyển tab shop
    modal.querySelectorAll('.shop-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-shoptab');
        modal.querySelectorAll('.shop-tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.renderShopTab(tab);
      });
    });

    modal.style.display = 'flex';
  }

  renderShopTab(tab) {
    const contentEl = document.getElementById('campus-shop-content');
    if (!contentEl) return;

    if (tab === 'outfits') {
      contentEl.innerHTML = `
        <div class="shop-grid">
          ${this.shop.outfits.map(item => {
            const isEquipped = (this.shop.equippedOutfit === item.id);
            let btnHtml = '';
            if (item.owned) {
              btnHtml = isEquipped
                ? '<button class="shop-btn-equipped" disabled>✨ Đang Mặc</button>'
                : `<button class="shop-btn-equip" data-equip="${item.id}">Mặc Đồ 👗</button>`;
            } else {
              const canAfford = this.economy.coins >= item.price;
              btnHtml = `<button class="shop-btn-buy ${canAfford ? '' : 'disabled'}" data-buy-outfit="${item.id}">Mua: 🪙 ${item.price} Xu</button>`;
            }

            return `
              <div class="shop-item-card ${isEquipped ? 'item-equipped' : ''}">
                <div class="shop-item-icon">${item.icon}</div>
                <div class="shop-item-name">${item.name}</div>
                <div class="shop-item-desc">${item.desc}</div>
                <div class="shop-item-action">${btnHtml}</div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      contentEl.querySelectorAll('[data-buy-outfit]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-buy-outfit');
          if (this.shop.buyOutfit(id)) {
            this.sound.playCoin();
            this.confetti.fire(40);
            this.renderShopTab('outfits');
            this.updateCampusHUDCurrency();
          } else {
            alert("Bé chưa đủ Chip Xu rồi! Hãy hoàn thành nhiệm vụ để kiếm thêm Xu nhé!");
          }
        });
      });

      contentEl.querySelectorAll('[data-equip]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-equip');
          this.shop.equipOutfit(id);
          this.sound.playClick();
          this.renderShopTab('outfits');
        });
      });

    } else if (tab === 'pets') {
      contentEl.innerHTML = `
        <div class="shop-grid">
          ${this.shop.pets.map(pet => {
            const isEquipped = (this.shop.equippedPet === pet.id);
            let btnHtml = '';
            if (pet.owned) {
              btnHtml = isEquipped
                ? '<button class="shop-btn-equipped" disabled>🐾 Đang Đi Cùng</button>'
                : `<button class="shop-btn-equip" data-equip-pet="${pet.id}">Chọn Pet 🐕</button>`;
            } else {
              const canAfford = this.economy.coins >= pet.price;
              btnHtml = `<button class="shop-btn-buy ${canAfford ? '' : 'disabled'}" data-buy-pet="${pet.id}">Nhận Nuôi: 🪙 ${pet.price} Xu</button>`;
            }

            return `
              <div class="shop-item-card ${isEquipped ? 'item-equipped' : ''}">
                <div class="shop-item-icon">${pet.icon}</div>
                <div class="shop-item-name">${pet.name}</div>
                <div class="shop-item-desc">${pet.desc}</div>
                <div class="shop-item-action">${btnHtml}</div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      contentEl.querySelectorAll('[data-buy-pet]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-buy-pet');
          if (this.shop.buyPet(id)) {
            this.sound.playCoin();
            this.confetti.fire(40);
            this.renderShopTab('pets');
            this.updateCampusHUDCurrency();
          } else {
            alert("Bé chưa đủ Chip Xu rồi! Hãy làm thêm bài tập để đón thú cưng nhé!");
          }
        });
      });

      contentEl.querySelectorAll('[data-equip-pet]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-equip-pet');
          this.shop.equipPet(id);
          this.sound.playClick();
          this.renderShopTab('pets');
        });
      });

    } else if (tab === 'canteen') {
      contentEl.innerHTML = `
        <div class="shop-grid">
          ${CampusRPG.CANTEEN_FOODS.map(f => {
            const canAfford = this.economy.coins >= f.cost;
            return `
              <div class="shop-item-card">
                <div class="shop-item-icon">${f.icon}</div>
                <div class="shop-item-name">${f.nameVi}</div>
                <div class="shop-item-sub">🇬🇧 ${f.nameEn}</div>
                <div class="shop-item-desc">${f.desc}</div>
                <div class="shop-buff-tag">⚡ ${f.buffName}</div>
                <div class="shop-item-action">
                  <button class="shop-btn-buy ${canAfford ? '' : 'disabled'}" data-buy-food="${f.id}">
                    Ăn Ngay: 🪙 ${f.cost} Xu
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      contentEl.querySelectorAll('[data-buy-food]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-buy-food');
          const food = this.shop.buyFood(id);
          if (food) {
            this.sound.playCoin();
            this.confetti.fire(35);
            this.updateCampusHUDCurrency();
            alert(`Ngon tuyệt! Bé đã ăn ${food.nameVi} và nhận hiệu ứng: ${food.buffName}!`);
          } else {
            alert("Bé chưa đủ Chip Xu rồi!");
          }
        });
      });
    }
  }

  // --------------------------------------------------------
  // MODAL 3: HỒ CÂU CÁ TRƯỜNG NGÔ QUYỀN (FISHING MINIGAME)
  // --------------------------------------------------------
  openFishingModal() {
    this.sound.playClick();
    const modal = document.getElementById('campus-fishing-modal');
    if (!modal) return;
    modal.style.display = 'flex';

    // Chọn ngẫu nhiên 1 loài cá từ CampusRPG.FISH_SPECIES
    const species = CampusRPG.FISH_SPECIES[Math.floor(Math.random() * CampusRPG.FISH_SPECIES.length)];

    // Xáo trộn thứ tự các lựa chọn ngẫu nhiên mỗi lần câu cá (hoàn toàn không cố định vị trí số 1)
    const rawOptions = species.options.map((optText, origIdx) => ({
      text: optText,
      isCorrect: origIdx === (species.correctIdx ?? 0)
    }));
    const shuffledOptions = [...rawOptions].sort(() => Math.random() - 0.5);

    const container = document.getElementById('campus-fishing-body');
    if (container) {
      container.innerHTML = `
        <div class="fishing-content">
          <div class="fishing-water-box">
            <div class="fishing-float animate-bob">🎣</div>
            <div class="fishing-ripple"></div>
            <div class="fishing-fish-shadow">${species.icon}</div>
          </div>
          <div class="fishing-alert-text">🌊 Phao rung mạnh! Có một chú <strong>${species.nameVi}</strong> cắn câu!</div>
          <div class="fishing-quiz-card">
            <div class="fishing-vocab-tag">🇬🇧 Thử Thách Từ Vựng: "<strong>${species.vocabWord}</strong>"</div>
            <p class="fishing-question-text">${species.question}</p>
            <div class="fishing-options-grid">
              ${shuffledOptions.map((opt, idx) => `
                <button class="fishing-opt-btn" data-correct="${opt.isCorrect}">${opt.text}</button>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      container.querySelectorAll('.fishing-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const isCorrect = e.currentTarget.getAttribute('data-correct') === 'true';
          if (isCorrect) {
            // Câu cá thành công!
            this.sound.playVictory();
            this.sound.playCoin();
            this.confetti.fire(65);
            this.economy.addCoins(species.coins, `Câu được ${species.nameVi}`);
            this.economy.addStars(species.stars);
            this.economy.addExp(species.exp);
            this.quests.trackProgress('catch_fish', 1);

            container.innerHTML = `
              <div class="fishing-victory-card">
                <div class="fishing-big-fish animate-bounce">${species.icon}</div>
                <h3>🎉 TUYỆT VỜI! CÂU THÀNH CÔNG!</h3>
                <p>Bé Hà My vừa câu được chú <strong>${species.nameVi}</strong> (${species.nameEn}) cực xịn!</p>
                <div class="fishing-reward-pills">
                  <span>🪙 +${species.coins} Xu</span>
                  <span>⭐ +${species.stars} Sao</span>
                  <span>⚡ +${species.exp} EXP</span>
                </div>
                <button class="btn-continue-fishing" id="btn-close-fish-success">Thả Cá Vào Xô & Tiếp Tục 🐟</button>
              </div>
            `;

            document.getElementById('btn-close-fish-success').addEventListener('click', () => {
              modal.style.display = 'none';
              this.updateCampusHUDCurrency();
            });
          } else {
            this.sound.playWrong();
            const correctOpt = rawOptions.find(o => o.isCorrect);
            container.innerHTML = `
              <div class="fishing-victory-card">
                <div class="fishing-big-fish" style="opacity: 0.6;">💨🐟</div>
                <h3 style="color: #ef4444;">ÔI CÁ BƠI MẤT RỒI!</h3>
                <p>Bé chọn chưa đúng nên cá giật mạnh tuột mất! Đáp án đúng là: <strong style="color: #38bdf8;">"${correctOpt ? correctOpt.text : ''}"</strong></p>
                <button class="btn-continue-fishing" id="btn-close-fish-fail" style="background: #0284c7;">Thử Thách Lại Lần Sau 🎣</button>
              </div>
            `;
            document.getElementById('btn-close-fish-fail').addEventListener('click', () => {
              modal.style.display = 'none';
            });
          }
        });
      });
    }
  }

  // --------------------------------------------------------
  // MODAL 4: CĂN TIN TRƯỜNG HỌC (CANTEEN DIALOG)
  // --------------------------------------------------------
  openCanteenModal() {
    this.openShopModal('canteen');
  }

  // --------------------------------------------------------
  // MODAL: GÁNH QUÀ VẶT CÔ BẢY CỔNG TRƯỜNG NGÔ QUYỀN
  // --------------------------------------------------------
  openCoBaySnackShopModal() {
    this.sound.playClick();
    const modal = document.getElementById('campus-snack-modal');
    if (!modal) return;
    modal.style.display = 'flex';

    const coinEl = document.getElementById('snack-modal-coins');
    if (coinEl && this.economy) coinEl.textContent = this.economy.coins;

    const closeBtn = document.getElementById('btn-close-snack-modal');
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };

    const container = document.getElementById('campus-snack-body');
    if (!container) return;

    const SNACK_ITEMS = [
      {
        id: 'tra_tac',
        name: 'Trà Tắc Khổng Lồ',
        icon: '🧋',
        price: 10,
        tag: 'Bán Chạy Nhất ⭐',
        desc: 'Ly trà tắc mật ong khổng lồ mát lạnh, uống vào tỉnh táo học bài cực siêu!',
        buffText: '⚡ Siêu Tốc Độ (+40%) trong 60s',
        buff: { name: 'Trà Tắc Tốc Độ', duration: 60, speed: 1.4, jump: 1.0 }
      },
      {
        id: 'banh_trang_tron',
        name: 'Bánh Tráng Trộn Full Topping',
        icon: '🥢',
        price: 15,
        tag: 'Ngon Bá Cháy 🔥',
        desc: 'Bánh tráng Tây Ninh trộn trứng cút, khô bò, xoài chua ngọt, thơm nức mũi!',
        buffText: '🦘 Bật Nhảy Siêu Cao (+50%) trong 60s',
        buff: { name: 'Bánh Tráng Nhảy Cao', duration: 60, speed: 1.0, jump: 1.5 }
      },
      {
        id: 'ca_vien_chien',
        name: 'Cá Viên Chiên Thập Cẩm',
        icon: '🍢',
        price: 15,
        tag: 'Giòn Rụm 😋',
        desc: 'Xiên cá viên bò viên chiên vàng ruộm chấm tương đen tương đỏ ngon tuyệt!',
        buffText: '✨ Hào Quang Lấp Lánh + 25 EXP',
        buff: { name: 'Cá Viên Năng Lượng', duration: 60, speed: 1.2, jump: 1.2, exp: 25 }
      },
      {
        id: 'xoai_lac',
        name: 'Xoài Lắc Muối Tôm',
        icon: '🥭',
        price: 12,
        tag: 'Chua Cay Giòn 💥',
        desc: 'Xoài non giòn rụm lắc muối tôm cay ngọt, tỉnh cả người học ngữ pháp!',
        buffText: '⚡🦘 Combo Chạy & Nhảy (+25%) trong 60s',
        buff: { name: 'Xoài Lắc Nhanh Nhẹn', duration: 60, speed: 1.25, jump: 1.25 }
      },
      {
        id: 'me_ngao_duong',
        name: 'Me Ngào Đường Chua Ngọt',
        icon: '🍬',
        price: 8,
        tag: 'Tuổi Thơ 🍭',
        desc: 'Kẹo me dẻo quánh chua thanh ngọt lịm, nhâm nhi vui vẻ cùng bạn bè!',
        buffText: '🎁 Nhận Ngay +30 EXP & +1 Sao Tím',
        buff: { name: 'Kẹo Me May Mắn', duration: 0, exp: 30, stars: 1 }
      },
      {
        id: 'tra_dao_cam_sa',
        name: 'Trà Đào Cam Sả Mát Lạnh',
        icon: '🥤',
        price: 18,
        tag: 'Đặc Biệt 🌟',
        desc: 'Trà đào thơm lừng miếng đào giòn sần sật và hương cam sả thơm phức!',
        buffText: '🌈 Siêu Combo (+50% Tốc Độ & Nhảy Cao, 90s)',
        buff: { name: 'Trà Đào Toàn Diện', duration: 90, speed: 1.5, jump: 1.4 }
      }
    ];

    const renderSnackList = () => {
      const currentCoins = this.economy ? this.economy.coins : 0;
      if (coinEl) coinEl.textContent = currentCoins;

      container.innerHTML = `
        <div class="snack-grid-container">
          ${SNACK_ITEMS.map(item => {
            const canAfford = currentCoins >= item.price;
            return `
              <div class="snack-card">
                <div class="snack-card-top">
                  <span class="snack-card-badge">${item.tag}</span>
                  <div class="snack-card-icon">${item.icon}</div>
                  <h4 class="snack-card-title">${item.name}</h4>
                  <p class="snack-card-desc">${item.desc}</p>
                </div>
                <div class="snack-card-buff">${item.buffText}</div>
                <div class="snack-card-bottom">
                  <div class="snack-card-price">
                    <span class="snack-price-val">${item.price}</span>
                    <span class="snack-price-unit">🪙 Xu</span>
                  </div>
                  <button class="btn-snack-buy ${canAfford ? 'active' : 'disabled'}" data-item-id="${item.id}">
                    ${canAfford ? 'Thưởng Thức 😋' : 'Thiếu Xu 🪙'}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      container.querySelectorAll('.btn-snack-buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const itemId = e.currentTarget.getAttribute('data-item-id');
          const item = SNACK_ITEMS.find(it => it.id === itemId);
          if (!item) return;

          if (!this.economy || this.economy.coins < item.price) {
            this.sound.playWrong();
            alert("Bé chưa đủ Xu Vàng rồi! Hãy hoàn thành thêm bài học hoặc thử thách để kiếm thêm Xu nhé!");
            return;
          }

          // Trừ Xu
          this.economy.spendCoins(item.price);
          this.sound.playCoin();
          this.confetti.fire(60);

          // Áp dụng Buff vào Economy & 3D Arena
          if (item.buff.exp) this.economy.addExp(item.buff.exp);
          if (item.buff.stars) this.economy.addStars(item.buff.stars);

          if (item.buff.duration > 0) {
            this.economy.setBuff({
              name: item.name,
              icon: item.icon,
              desc: item.buffText,
              duration: item.buff.duration
            });

            if (window.Campus3DArenaInstance) {
              if (item.buff.speed) window.Campus3DArenaInstance.speedMultiplier = item.buff.speed;
              if (item.buff.jump) window.Campus3DArenaInstance.jumpMultiplier = item.buff.jump;

              // Reset sau khi hết thời gian buff
              if (this._snackBuffTimer) clearTimeout(this._snackBuffTimer);
              this._snackBuffTimer = setTimeout(() => {
                if (window.Campus3DArenaInstance) {
                  window.Campus3DArenaInstance.speedMultiplier = 1.0;
                  window.Campus3DArenaInstance.jumpMultiplier = 1.0;
                }
              }, item.buff.duration * 1000);
            }
          }

          this.updateCampusHUDCurrency();
          renderSnackList();

          // Giọng cô Bảy cảm ơn
          const cobayThanks = [
            `Cô Bảy cảm ơn bé Hà My nha! Ăn ${item.name} ngon lành rồi học bài thật giỏi nghen con!`,
            `Ngon tuyệt cú mèo luôn! Bé Hà My nạp năng lượng chạy siêu nhanh trong sân trường nha!`,
            `Cô Bảy chúc con gái làm bài tập điểm 10 rực rỡ nghen!`
          ];
          const msg = cobayThanks[Math.floor(Math.random() * cobayThanks.length)];
          this.sound.speakVietnamese(msg);
        });
      });
    };

    renderSnackList();
  }

  // --------------------------------------------------------
  // MODAL 5: BẢNG XẾP HẠNG TUẦN (LEADERBOARD)
  // --------------------------------------------------------
  openLeaderboardModal() {
    this.sound.playClick();
    const modal = document.getElementById('campus-leaderboard-modal');
    if (!modal) return;

    const listEl = document.getElementById('campus-leaderboard-list');
    if (listEl) {
      listEl.innerHTML = CampusRPG.LEADERBOARD_DATA.map(item => `
        <div class="leaderboard-item ${item.rank === 1 ? 'rank-gold' : (item.rank === 2 ? 'rank-silver' : (item.rank === 3 ? 'rank-bronze' : ''))}">
          <div class="lb-rank">#${item.rank}</div>
          <div class="lb-avatar">${item.avatar.includes('.') ? `<img src="${item.avatar}" class="lb-img">` : item.avatar}</div>
          <div class="lb-info">
            <div class="lb-name">${item.name}</div>
            <div class="lb-badge">${item.badge}</div>
          </div>
          <div class="lb-stats">
            <span class="lb-score">⚡ ${item.score}</span>
            <span class="lb-stars">⭐ ${item.stars}</span>
          </div>
        </div>
      `).join('');
    }

    modal.style.display = 'flex';
  }

  // --------------------------------------------------------
  // MINIGAME 1: SÚT PHẠT ĐỀN 11M (SOCCER PENALTY SHOOTOUT)
  // --------------------------------------------------------
  openSoccerPenaltyMinigame() {
    this.sound.playClick();
    const modal = document.getElementById('campus-penalty-modal');
    if (!modal) return;

    const questions = (typeof GRADE_5_PENALTY_QUESTIONS !== 'undefined' && GRADE_5_PENALTY_QUESTIONS.length > 0)
      ? GRADE_5_PENALTY_QUESTIONS
      : [
          {
            question: "What do football players use to kick the ball?",
            situation: "Thầy Việt cất tiếng còi: Cầu thủ dùng gì để sút bóng?",
            options: [
              { text: "Their feet 👟", correct: true },
              { text: "Their hands ✋", correct: false },
              { text: "Their head 🤕", correct: false }
            ],
            explanation: "Cầu thủ dùng chân (feet) để sút bóng vào lưới!"
          }
        ];

    const q = questions[Math.floor(Math.random() * questions.length)];
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

    const container = document.getElementById('campus-penalty-body');
    if (!container) return;

    container.innerHTML = `
      <div class="penalty-arena">
        <div class="penalty-stadium-scene">
          <div class="penalty-scoreboard">
            <span>⚽ SÂN VẬN ĐỘNG 5C4</span>
            <span class="penalty-live-badge">SÚT PHẠT 11M</span>
          </div>

          <!-- KHUNG THÀNH VÀ THỦ MÔN ROBOT -->
          <div class="penalty-goal-structure" id="penalty-goal-box">
            <div class="penalty-crossbar"></div>
            <div class="penalty-net-mesh"></div>
            <div class="penalty-robot-goalie" id="penalty-goalie">🤖</div>
            <div class="penalty-target-spots" id="penalty-target-spots" style="display: none;">
              <button class="penalty-target-btn target-tl" data-corner="tl">↖️ Góc Cao Trái</button>
              <button class="penalty-target-btn target-tr" data-corner="tr">↗️ Góc Cao Phải</button>
              <button class="penalty-target-btn target-bl" data-corner="bl">↙️ Góc Thấp Trái</button>
              <button class="penalty-target-btn target-br" data-corner="br">↘️ Góc Thấp Phải</button>
            </div>
          </div>

          <div class="penalty-pitch-turf">
            <div class="penalty-penalty-spot"></div>
            <div class="penalty-ball-element" id="penalty-ball">⚽</div>
          </div>
        </div>

        <div class="penalty-question-panel" id="penalty-question-panel">
          <div class="penalty-coach-prompt">
            <span class="coach-avatar">👨‍🏫 Thầy Việt:</span>
            <span>"${q.situation || 'Hãy trả lời chính xác để mở khóa góc sút phạt đền!'}"</span>
          </div>
          <div class="penalty-en-question">${q.question}</div>
          <div class="penalty-options-grid">
            ${shuffledOptions.map((opt, i) => `
              <button class="penalty-opt-btn" data-correct="${opt.correct}">${opt.text}</button>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';

    // Xử lý chọn đáp án
    container.querySelectorAll('.penalty-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const isCorrect = e.currentTarget.getAttribute('data-correct') === 'true';
        const panel = document.getElementById('penalty-question-panel');
        const targetSpots = document.getElementById('penalty-target-spots');
        const goalie = document.getElementById('penalty-goalie');
        const ball = document.getElementById('penalty-ball');

        if (isCorrect) {
          this.sound.playCorrect();
          panel.innerHTML = `
            <div class="penalty-aim-callout animate-pulse">
              🎯 <strong>ĐÁP ÁN CHÍNH XÁC!</strong> Bé Hà My hãy bấm chọn 1 trong 4 góc khung thành trên kia để thực hiện cú sút!
            </div>
          `;
          if (targetSpots) targetSpots.style.display = 'flex';

          // Gắn sự kiện chọn góc sút
          targetSpots.querySelectorAll('.penalty-target-btn').forEach(tBtn => {
            tBtn.addEventListener('click', (te) => {
              const corner = te.currentTarget.getAttribute('data-corner');
              targetSpots.style.display = 'none';

              // Robot bay người sang góc ngẫu nhiên hoặc ngược góc
              const robotDives = ['tl', 'tr', 'bl', 'br'].filter(c => c !== corner);
              const robotCorner = robotDives[Math.floor(Math.random() * robotDives.length)];

              if (ball) ball.className = `penalty-ball-element shoot-${corner}`;
              if (goalie) goalie.className = `penalty-robot-goalie dive-${robotCorner}`;

              setTimeout(() => {
                this.sound.playVictory();
                this.sound.playCoin();
                this.confetti.fire(70);

                if (this.economy) {
                  this.economy.addCoins(15, 'Sút phạt đền thành công');
                  this.economy.addStars(1);
                  this.economy.addExp(20);
                }
                if (this.quests) {
                  this.quests.trackProgress('score_penalty', 1);
                }
                this.updateCampusHUDCurrency();

                panel.innerHTML = `
                  <div class="penalty-result-card goal-card">
                    <h3>⚽ VÀOOOOOOOO! GOAL!</h3>
                    <p>Bé Hà My vừa tung cú sút sấm sét đánh bại Thủ Môn Robot!</p>
                    <div class="penalty-exp-text">${q.explanation}</div>
                    <div class="penalty-rewards-pills">
                      <span>🪙 +15 Xu Vàng</span>
                      <span>⭐ +1 Sao Tím</span>
                      <span>⚡ +20 EXP</span>
                    </div>
                    <div class="penalty-action-btns">
                      <button class="penalty-btn-action" id="btn-shoot-again">⚽ Sút Tiếp Quả Nữa</button>
                      <button class="penalty-btn-action secondary" id="btn-close-penalty">Đóng Sân Bóng</button>
                    </div>
                  </div>
                `;

                const btnAgain = document.getElementById('btn-shoot-again');
                if (btnAgain) btnAgain.onclick = () => this.openSoccerPenaltyMinigame();

                const btnClose = document.getElementById('btn-close-penalty');
                if (btnClose) btnClose.onclick = () => { modal.style.display = 'none'; };
              }, 700);
            });
          });
        } else {
          this.sound.playWrong();
          panel.innerHTML = `
            <div class="penalty-result-card miss-card">
              <h3>🧤 THỦ MÔN ROBOT BẮT DÍNH BÓNG!</h3>
              <p>Chưa chính xác rồi con ơi! ${q.explanation}</p>
              <div class="penalty-action-btns">
                <button class="penalty-btn-action" id="btn-retry-penalty">🔄 Thử Lại Ngay</button>
                <button class="penalty-btn-action secondary" id="btn-close-penalty-fail">Đóng</button>
              </div>
            </div>
          `;
          const btnRetry = document.getElementById('btn-retry-penalty');
          if (btnRetry) btnRetry.onclick = () => this.openSoccerPenaltyMinigame();
          const btnCloseFail = document.getElementById('btn-close-penalty-fail');
          if (btnCloseFail) btnCloseFail.onclick = () => { modal.style.display = 'none'; };
        }
      });
    });
  }

  // --------------------------------------------------------
  // MINIGAME 2: LẬT THẺ TRÍ NHỚ TỪ VỰNG THƯ VIỆN NGÔ QUYỀN
  // --------------------------------------------------------
  openLibraryMemoryMinigame() {
    this.sound.playClick();
    const modal = document.getElementById('campus-memory-modal');
    if (!modal) return;

    const cardsData = (typeof GRADE_5_MEMORY_CARDS !== 'undefined' && GRADE_5_MEMORY_CARDS.length >= 8)
      ? [...GRADE_5_MEMORY_CARDS]
      : [
          { id: 'm1', pairId: 'go_went', text: 'Go', icon: '🚶', match: 'Went', type: 'present' },
          { id: 'm2', pairId: 'go_went', text: 'Went', icon: '🚶‍♂️', match: 'Go', type: 'past' },
          { id: 'm3', pairId: 'see_saw', text: 'See', icon: '👀', match: 'Saw', type: 'present' },
          { id: 'm4', pairId: 'see_saw', text: 'Saw', icon: '🔍', match: 'See', type: 'past' },
          { id: 'm5', pairId: 'eat_ate', text: 'Eat', icon: '🍎', match: 'Ate', type: 'present' },
          { id: 'm6', pairId: 'eat_ate', text: 'Ate', icon: '🍽️', match: 'Eat', type: 'past' },
          { id: 'm7', pairId: 'do_did', text: 'Do', icon: '✍️', match: 'Did', type: 'present' },
          { id: 'm8', pairId: 'do_did', text: 'Did', icon: '✅', match: 'Do', type: 'past' }
        ];

    // Lấy 4 cặp (8 thẻ) ngẫu nhiên và xáo trộn
    const uniquePairs = [...new Set(cardsData.map(c => c.pairId))].sort(() => Math.random() - 0.5).slice(0, 4);
    const selectedCards = cardsData.filter(c => uniquePairs.includes(c.pairId)).sort(() => Math.random() - 0.5);

    const container = document.getElementById('campus-memory-body');
    if (!container) return;

    let flippedCards = [];
    let matchedPairsCount = 0;
    const totalPairs = uniquePairs.length;
    let lockBoard = false;

    container.innerHTML = `
      <div class="memory-game-wrap">
        <div class="memory-top-bar">
          <div class="memory-librarian-callout">
            <span class="librarian-avatar">👩‍🏫 Cô Huệ:</span>
            <span>"Hà My hãy lật tìm các cặp Động từ Hiện tại & Quá khứ tương ứng nhé!"</span>
          </div>
          <div class="memory-status-badge">
            Ghép được: <strong id="memory-matched-count">0</strong> / ${totalPairs} cặp
          </div>
        </div>

        <div class="memory-cards-grid">
          ${selectedCards.map((c, idx) => `
            <div class="memory-card" data-idx="${idx}" data-pair="${c.pairId}">
              <div class="memory-card-inner">
                <div class="memory-card-front">
                  <span class="card-qmark">📖</span>
                  <span class="card-logo-mini">5C4</span>
                </div>
                <div class="memory-card-back">
                  <span class="card-icon">${c.icon}</span>
                  <strong class="card-text">${c.text}</strong>
                  <span class="card-tense-tag">${c.type === 'present' ? 'V (Hiện tại)' : 'V2 (Quá khứ)'}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    modal.style.display = 'flex';

    // Xử lý lật thẻ
    const cardEls = container.querySelectorAll('.memory-card');
    cardEls.forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        if (lockBoard) return;
        if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

        this.sound.playClick();
        cardEl.classList.add('flipped');
        flippedCards.push(cardEl);

        if (flippedCards.length === 2) {
          lockBoard = true;
          const [c1, c2] = flippedCards;
          const pair1 = c1.getAttribute('data-pair');
          const pair2 = c2.getAttribute('data-pair');

          if (pair1 === pair2) {
            // Đúng cặp!
            setTimeout(() => {
              this.sound.playCorrect();
              c1.classList.add('matched');
              c2.classList.add('matched');
              matchedPairsCount++;
              const matchCountEl = document.getElementById('memory-matched-count');
              if (matchCountEl) matchCountEl.textContent = matchedPairsCount;

              flippedCards = [];
              lockBoard = false;

              if (matchedPairsCount >= totalPairs) {
                // Thắng minigame!
                setTimeout(() => {
                  this.sound.playVictory();
                  this.sound.playCoin();
                  this.confetti.fire(80);

                  if (this.economy) {
                    this.economy.addCoins(25, 'Hoàn thành lật thẻ thư viện');
                    this.economy.addStars(2);
                    this.economy.addExp(35);
                  }
                  if (this.quests) {
                    this.quests.trackProgress('play_memory', 1);
                  }
                  this.updateCampusHUDCurrency();

                  container.innerHTML = `
                    <div class="memory-victory-card">
                      <div class="memory-win-trophy">🏆</div>
                      <h3>🎉 XUẤT SẮC! TRÍ NHỚ ĐỈNH CAO!</h3>
                      <p>Bé Hà My đã ghi nhớ chính xác toàn bộ các cặp Động từ Quá khứ bất quy tắc!</p>
                      <div class="memory-rewards-pills">
                        <span>🪙 +25 Xu Vàng</span>
                        <span>⭐ +2 Sao Tím</span>
                        <span>⚡ +35 EXP</span>
                      </div>
                      <div class="memory-action-btns">
                        <button class="penalty-btn-action" id="btn-memory-play-again">🃏 Chơi Lại Ván Mới</button>
                        <button class="penalty-btn-action secondary" id="btn-close-memory-win">Đóng Thư Viện</button>
                      </div>
                    </div>
                  `;

                  const btnAgain = document.getElementById('btn-memory-play-again');
                  if (btnAgain) btnAgain.onclick = () => this.openLibraryMemoryMinigame();

                  const btnCloseWin = document.getElementById('btn-close-memory-win');
                  if (btnCloseWin) btnCloseWin.onclick = () => { modal.style.display = 'none'; };
                }, 400);
              }
            }, 300);
          } else {
            // Sai cặp, lật úp lại
            setTimeout(() => {
              c1.classList.remove('flipped');
              c2.classList.remove('flipped');
              flippedCards = [];
              lockBoard = false;
            }, 900);
          }
        }
      });
    });
  }

  // --------------------------------------------------------
  // MINIGAME 3: ĐẠI CHIẾN BOSS NGỮ PHÁP - DR. MISTAKE
  // --------------------------------------------------------
  openBossBattleMinigame() {
    this.sound.playClick();
    const modal = document.getElementById('campus-boss-modal');
    if (!modal) return;
    modal.style.display = 'flex';

    const questions = (typeof GRADE_5_BOSS_QUESTIONS !== 'undefined' && GRADE_5_BOSS_QUESTIONS.length > 0)
      ? [...GRADE_5_BOSS_QUESTIONS].sort(() => Math.random() - 0.5)
      : [];

    let currentQIdx = 0;
    let bossHp = 3;
    const maxHp = 3;

    const container = document.getElementById('campus-boss-body');
    if (!container) return;

    const renderBossRound = () => {
      if (bossHp <= 0) {
        // Boss Defeated!
        this.sound.playVictory();
        this.sound.playCoin();
        this.confetti.fire(100);

        if (this.economy) {
          this.economy.addCoins(50, 'Đánh bại Boss Dr. Mistake');
          this.economy.addStars(3);
          this.economy.addExp(60);
        }
        if (this.quests) {
          this.quests.trackProgress('defeat_boss', 1);
        }
        this.updateCampusHUDCurrency();

        container.innerHTML = `
          <div class="boss-victory-screen">
            <div class="boss-defeated-avatar">💥🧙‍♂️💥</div>
            <h3>⚡ GIÁO SƯ LỖI SAI ĐÃ BỊ ĐÁNH BẠI!</h3>
            <p>Dr. Mistake: <em>"Áaaaa! Kiến thức ngữ pháp của bạn Hà My quá đỉnh cao! Ta xin chịu thua!"</em></p>
            <div class="boss-loot-chest">🎁 RƯƠNG KHO BÁU BẢO VẬT 5C4 ĐÃ MỞ!</div>
            <div class="boss-rewards-pills">
              <span>🪙 +50 Xu Vàng</span>
              <span>⭐ +3 Sao Tím</span>
              <span>⚡ +60 EXP</span>
            </div>
            <div class="boss-action-btns">
              <button class="penalty-btn-action" id="btn-boss-battle-again">⚔️ Tái Đấu Dr. Mistake</button>
              <button class="penalty-btn-action secondary" id="btn-close-boss-win">Rời Sân Khấu</button>
            </div>
          </div>
        `;

        const btnAgain = document.getElementById('btn-boss-battle-again');
        if (btnAgain) btnAgain.onclick = () => this.openBossBattleMinigame();

        const btnCloseWin = document.getElementById('btn-close-boss-win');
        if (btnCloseWin) btnCloseWin.onclick = () => { modal.style.display = 'none'; };
        return;
      }

      if (currentQIdx >= questions.length) {
        currentQIdx = 0;
      }

      const q = questions[currentQIdx];
      const shuffledBossOptions = [...q.options].sort(() => Math.random() - 0.5);
      const hpPct = Math.round((bossHp / maxHp) * 100);
      const hearts = '❤️'.repeat(bossHp) + '🖤'.repeat(maxHp - bossHp);

      container.innerHTML = `
        <div class="boss-arena-wrap" id="boss-arena-box">
          <div class="boss-status-header">
            <div class="boss-profile">
              <div class="boss-avatar-box">🧙‍♂️</div>
              <div>
                <h4 class="boss-name">Dr. Mistake (Giáo Sư Lỗi Sai)</h4>
                <div class="boss-hearts">${hearts} (${bossHp}/${maxHp} HP)</div>
              </div>
            </div>
            <div class="boss-hp-bar">
              <div class="boss-hp-fill" style="width: ${hpPct}%;"></div>
            </div>
          </div>

          <div class="boss-speech-bubble">
            "Hahaha! Ta đã gài 1 lỗi sai tinh vi vào câu này! Đố Hà My phát hiện và sửa được!"
          </div>

          <div class="boss-sentence-display">
            <span class="boss-sentence-label">📜 CÂU CHỨA LỖI SAI:</span>
            <div class="boss-target-sentence">"${q.sentence}"</div>
          </div>

          <div class="boss-quiz-task">
            <span>👉 ${q.question}</span>
          </div>

          <div class="boss-options-grid">
            ${shuffledBossOptions.map((opt, i) => `
              <button class="boss-opt-btn" data-correct="${opt.correct}">${opt.text}</button>
            `).join('')}
          </div>
        </div>
      `;

      container.querySelectorAll('.boss-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const isCorrect = e.currentTarget.getAttribute('data-correct') === 'true';
          const arenaBox = document.getElementById('boss-arena-box');

          if (isCorrect) {
            this.sound.playCorrect();
            bossHp--;
            currentQIdx++;

            if (arenaBox) arenaBox.classList.add('boss-shake-damage');

            container.innerHTML = `
              <div class="boss-hit-splash">
                <div class="boss-lightning-icon animate-bounce">⚡⚡⚡</div>
                <h3>SÉT ĐÁNH TRÚNG DR. MISTAKE! (-1 HP)</h3>
                <p>Chính xác tuyệt đối! ${q.explanation}</p>
                <button class="penalty-btn-action" id="btn-boss-next-round">⚔️ Giáng Đòn Tiếp Theo!</button>
              </div>
            `;

            const nextBtn = document.getElementById('btn-boss-next-round');
            if (nextBtn) nextBtn.onclick = () => renderBossRound();
          } else {
            this.sound.playWrong();
            container.innerHTML = `
              <div class="boss-hit-splash boss-wrong">
                <div class="boss-laugh-icon">😈</div>
                <h3>DR. MISTAKE ĐÃ ĐỠ ĐƯỢC ĐÒN!</h3>
                <p>Chưa đúng rồi con yêu! ${q.explanation}</p>
                <button class="penalty-btn-action" id="btn-boss-retry-round">🔄 Cố Gắng Lại Nào!</button>
              </div>
            `;
            const retryBtn = document.getElementById('btn-boss-retry-round');
            if (retryBtn) retryBtn.onclick = () => renderBossRound();
          }
        });
      });
    };

    renderBossRound();
  }

  // --------------------------------------------------------
  // MINIGAME 4: ĐẤU TRƯỜNG VÔ TẬN & LUYỆN TẬP BẤT TẬN (ENDLESS ARENA)
  // --------------------------------------------------------
  openEndlessQuizMode() {
    this.sound.playClick();
    const modal = document.getElementById('campus-endless-modal');
    if (!modal) return;
    modal.style.display = 'flex';

    // Tổng hợp toàn bộ ngân hàng câu hỏi lớp 5
    let pool = [];
    if (typeof GRADE_5_ISLANDS !== 'undefined') {
      GRADE_5_ISLANDS.forEach(isl => {
        if (isl.quizzes) pool.push(...isl.quizzes);
      });
    }
    if (typeof GRADE_5_ENDLESS_POOL !== 'undefined') {
      pool.push(...GRADE_5_ENDLESS_POOL);
    }

    if (pool.length === 0) {
      alert("Chưa nạp câu hỏi cho chế độ Vô Tận!");
      return;
    }

    // Xáo trộn ngân hàng
    let questions = [...pool].sort(() => Math.random() - 0.5);
    let qIdx = 0;
    let sessionStreak = 0;
    let sessionCoinsEarned = 0;
    let sessionStarsEarned = 0;
    let sessionTotalAnswered = 0;

    const container = document.getElementById('campus-endless-body');
    if (!container) return;

    const renderEndlessQuestion = () => {
      if (qIdx >= questions.length) {
        questions = [...pool].sort(() => Math.random() - 0.5);
        qIdx = 0;
      }

      const q = questions[qIdx];
      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

      // Multiplier
      let multiplier = 1;
      let comboTag = '';
      if (sessionStreak >= 5) {
        multiplier = 2;
        comboTag = '🔥 x2 SIÊU COMBO!';
      } else if (sessionStreak >= 3) {
        multiplier = 1.5;
        comboTag = '⚡ x1.5 COMBO!';
      }

      container.innerHTML = `
        <div class="endless-arena-wrap">
          <div class="endless-hud-bar">
            <div class="endless-stat-badge">🔥 Chuỗi: <strong>${sessionStreak}</strong> ${comboTag ? `<span class="combo-pill">${comboTag}</span>` : ''}</div>
            <div class="endless-stat-badge">🪙 +${sessionCoinsEarned} Xu</div>
            <div class="endless-stat-badge">⭐ +${sessionStarsEarned} Sao</div>
            <div class="endless-stat-badge">Đã làm: ${sessionTotalAnswered} câu</div>
          </div>

          <div class="endless-card">
            ${q.situation ? `<div class="endless-situation">💡 ${q.situation}</div>` : ''}
            <h3 class="endless-question-text">"${q.question}"</h3>
            <div class="endless-options-grid">
              ${shuffledOptions.map((opt, i) => `
                <button class="endless-opt-btn" data-correct="${opt.correct}">
                  <span class="endless-key-num">${i + 1}</span>
                  <span>${opt.text}</span>
                </button>
              `).join('')}
            </div>
            <div class="endless-feedback" id="endless-feedback" style="display: none;"></div>
          </div>

          <div class="endless-bottom-bar">
            <button class="penalty-btn-action secondary" id="btn-endless-exit">🛑 Dừng & Nhận Thưởng</button>
          </div>
        </div>
      `;

      // Phím tắt 1, 2, 3
      const keyHandler = (e) => {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= shuffledOptions.length) {
          const btn = container.querySelectorAll('.endless-opt-btn')[num - 1];
          if (btn) btn.click();
        }
      };
      window.addEventListener('keydown', keyHandler, { once: true });

      // Exit button
      const exitBtn = document.getElementById('btn-endless-exit');
      if (exitBtn) {
        exitBtn.onclick = () => {
          modal.style.display = 'none';
          this.updateCampusHUDCurrency();
        };
      }

      // Xử lý chọn đáp án
      container.querySelectorAll('.endless-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const isCorrect = e.currentTarget.getAttribute('data-correct') === 'true';
          const feedback = document.getElementById('endless-feedback');
          sessionTotalAnswered++;

          if (isCorrect) {
            this.sound.playCorrect();
            sessionStreak++;
            const addCoin = Math.round(5 * multiplier);
            const addStar = sessionStreak % 3 === 0 ? 1 : 0;
            sessionCoinsEarned += addCoin;
            sessionStarsEarned += addStar;

            if (this.economy) {
              this.economy.addCoins(addCoin, 'Đấu trường vô tận');
              if (addStar > 0) this.economy.addStars(addStar);
              this.economy.addExp(10);
            }
            if (this.quests) {
              this.quests.trackProgress('answer_endless', 1);
              this.quests.trackProgress('streak_count', sessionStreak);
            }
            this.updateCampusHUDCurrency();

            if (feedback) {
              feedback.className = 'endless-feedback success';
              feedback.style.display = 'block';
              feedback.innerHTML = `
                <div>🎉 <strong>CHÍNH XÁC!</strong> +${addCoin} Xu 🪙 ${addStar > 0 ? `+${addStar} Sao ⭐` : ''}</div>
                <div class="feedback-sub">${q.explanation || ''}</div>
              `;
            }

            setTimeout(() => {
              qIdx++;
              renderEndlessQuestion();
            }, 1100);
          } else {
            this.sound.playWrong();
            sessionStreak = 0;
            if (feedback) {
              feedback.className = 'endless-feedback error';
              feedback.style.display = 'block';
              feedback.innerHTML = `
                <div>❌ <strong>CHƯA ĐÚNG!</strong> Chuỗi bị ngắt!</div>
                <div class="feedback-sub">${q.explanation || 'Hãy cố gắng ở câu tiếp theo nhé!'}</div>
              `;
            }

            setTimeout(() => {
              qIdx++;
              renderEndlessQuestion();
            }, 1800);
          }
        });
      });
    };

    renderEndlessQuestion();
  }

  // --------------------------------------------------------
  // MINIGAME 5: VƯỜN HOA & NHÀ KÍNH CỦA CHÚ TƯ (BOTANICAL GARDEN)
  // --------------------------------------------------------
  openBotanicalQuizModal() {
    this.sound.playClick();
    this.sound.speakVietnamese("Chào bé Hà My! Cùng chú Tư tưới nước cho các luống hoa trường Ngô Quyền nhé!");
    if (this.economy) {
      this.sound.playVictory();
      this.confetti.fire(60);
      this.economy.addCoins(10, 'Chăm sóc vườn hoa trường học');
      this.economy.addStars(1);
      this.economy.addExp(15);
      this.updateCampusHUDCurrency();
    }
    alert("🌺 Chú Tư: 'Cảm ơn bé Hà My đã tưới nước cho vườn cúc họa mi và hoa hồng! Tặng con 10 Xu Vàng 🪙 và 1 Sao Tím ⭐!'");
  }

  // --------------------------------------------------------
  // MINIGAME 6: SÂN BÓNG RỔ (BASKETBALL HOOP SHOT)
  // --------------------------------------------------------
  openBasketballPrompt() {
    this.sound.playClick();
    this.sound.speakVietnamese("Bé Hà My thực hiện cú ném bóng rổ 3 điểm tuyệt đẹp!");
    if (this.economy) {
      this.sound.playVictory();
      this.confetti.fire(60);
      this.economy.addCoins(12, 'Ném bóng rổ 3 điểm');
      this.economy.addStars(1);
      this.economy.addExp(15);
      this.updateCampusHUDCurrency();
    }
    alert("🏀 SWISH! Quả bóng rổ bay vút qua lưới! Hà My ghi 3 điểm ngoạn mục! Thưởng: +12 Xu Vàng 🪙 và +1 Sao Tím ⭐!");
  }

  // --------------------------------------------------------
  // CHÀO CỜ TỔ QUỐC VIỆT NAM (FLAG SALUTE EVENT)
  // --------------------------------------------------------
  triggerFlagSalute() {
    this.sound.playVictory();
    this.confetti.fire(80);
    this.economy.addCoins(15, 'Chào cờ Tổ quốc Việt Nam');
    this.economy.addExp(20);
    this.sound.speakVietnamese("Nghiêm! Chào cờ! Tự hào Lớp 5C4 Việt Nam!");
    alert("🇻🇳 Bé Hà My đã thực hiện nghi thức Chào Cờ Tổ Quốc Việt Nam! Thưởng: +15 Xu Vàng 🪙 và +20 EXP ⚡!");
  }

  // --------------------------------------------------------
  // HỘI THOẠI NPC GEN Z & CÁC BẠN HỌC SINH 5C4
  // --------------------------------------------------------
  showNPCDialogue(npc, quote) {
    if (!quote) return;

    // Phát âm song ngữ chuẩn xác
    this.sound.speakVietnamese(quote);

    // Thưởng xu vui vẻ khi giao tiếp với bạn bè & bác bảo vệ / cô bán quà vặt
    if (this.economy) {
      this.sound.playCoin();
      this.economy.addCoins(2, `Trò chuyện với ${npc.name}`);
      this.updateCampusHUDCurrency();
    }

    let modal = document.getElementById('campus-npc-speech-toast');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'campus-npc-speech-toast';
      modal.className = 'campus-npc-dialogue-modal';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="npc-dialogue-content">
        <div class="npc-dialogue-avatar">${npc.icon || '💬'}</div>
        <div class="npc-dialogue-body">
          <div class="npc-dialogue-header">
            <span class="npc-dialogue-name">${npc.name}</span>
            <span class="npc-dialogue-title">${npc.title || 'Lớp 5C4 Ngô Quyền'}</span>
            <span class="npc-dialogue-coin">+2 🪙</span>
          </div>
          <div class="npc-dialogue-bubble">
            "${quote}"
          </div>
        </div>
        <button class="npc-dialogue-close" id="btn-close-dialogue">✖</button>
      </div>
    `;

    modal.style.display = 'flex';
    modal.classList.remove('fade-out');

    const closeBtn = document.getElementById('btn-close-dialogue');
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.add('fade-out');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
      };
    }

    if (this.npcDialogueTimeout) clearTimeout(this.npcDialogueTimeout);
    this.npcDialogueTimeout = setTimeout(() => {
      if (modal.style.display !== 'none') {
        modal.classList.add('fade-out');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
      }
    }, 5500);
  }

  // --------------------------------------------------------
  // MODAL KHẢO HẠCH TIẾNG ANH 4 NPC TÂY DU KÝ TRÊN THIÊN ĐÌNH
  // --------------------------------------------------------
  openCelestialQuestModal(npc) {
    this.sound.playClick();
    const modal = document.getElementById('campus-celestial-modal');
    if (!modal) return;

    const CELESTIAL_TRIALS = {
      sun_wukong: {
        npcTitle: 'TỀ THIÊN ĐẠI THÁNH TÔN NGỘ KHÔNG',
        subtitle: 'Cung Điện Thiên Đình - 72 Phép Biến Hóa Từ Vựng',
        charIcon: '🐒',
        speech: 'Ta là Tề Thiên Đại Thánh! Bé Hà My hãy chứng minh tài năng tiếng Anh để nhận bảo bối của Lão Tôn nhé!',
        speakEn: 'I can transform seventy-two times and fly with the Somersault Cloud!',
        qTag: '🐒 THỬ THÁCH MỸ HẦU VƯƠNG',
        question: 'Tôn Ngộ Không cưỡi "Cân Đẩu Vân" lướt gió. Từ tiếng Anh nào là "Đám Mây"?',
        options: [
          'Cloud (Đám mây)',
          'River (Dòng sông)',
          'Mountain (Ngọn núi)',
          'Forest (Khu rừng)'
        ],
        correct: 0,
        explanation: 'Cloud nghĩa là đám mây. Somersault Cloud chính là bảo bối Cân Đẩu Vân của Tôn Ngộ Không!',
        rewardCoins: 120,
        rewardStars: 15,
        unlockPet: 'pet_cloud'
      },
      zhu_bajie: {
        npcTitle: 'THIÊN BỒNG NGUYÊN SOÁI TRƯ BÁT GIỚI',
        subtitle: 'Vườn Đào Tiên 3000 Năm - Tiệc Trái Cây & Phép Lịch Sự',
        charIcon: '🐷',
        speech: 'Hì hì, lão Trư chào bé Hà My! Đào Tiên ở đây ngọt lịm, em hãy dùng tiếng Anh lịch sự để thưởng thức tiệc đào nhé!',
        speakEn: 'May I have a delicious celestial peach, please?',
        qTag: '🍑 ĐẠI TIỆC VƯỜN ĐÀO TIÊN',
        question: 'Để xin một quả đào tiên thật lịch sự, câu nói chuẩn tiếng Anh là gì?',
        options: [
          'May I have a peach, please?',
          'Give me peach now!',
          'I do not like peach.',
          'Where is the peach?'
        ],
        correct: 0,
        explanation: 'Cấu trúc "May I have..., please?" là cách đề nghị xin phép vô cùng lịch sự và chuẩn mực!',
        rewardCoins: 120,
        rewardStars: 15,
        unlockOutfit: 'outfit_fairy'
      },
      sha_wujing: {
        npcTitle: 'QUYỂN LIÊM ĐẠI TƯỚNG SA TĂNG',
        subtitle: 'Nam Thiên Môn - Lòng Kiên Trì & Ngữ Pháp Vững Chắc',
        charIcon: '🧔',
        speech: 'A Di Đà Phật! Sa Tăng canh giữ Nam Thiên Môn, hoan nghênh bé Hà My đến đàm đạo về tinh thần chăm chỉ!',
        speakEn: 'Practice makes perfect. Never give up on your learning journey!',
        qTag: '🧔 KHẢO HẠCH SA TĂNG',
        question: 'Thành ngữ: "Practice makes perfect" khuyên học sinh điều gì?',
        options: [
          'Càng chăm chỉ rèn luyện thì kết quả càng hoàn hảo!',
          'Không cần học cũng giỏi.',
          'Học trước quên sau.',
          'Đi chơi quan trọng hơn học bài.'
        ],
        correct: 0,
        explanation: 'Practice makes perfect: Càng kiên trì ôn luyện từ vựng và ngữ pháp mỗi ngày thì bé sẽ càng xuất sắc!',
        rewardCoins: 120,
        rewardStars: 15,
        unlockPet: 'pet_panda'
      },
      jade_emperor: {
        npcTitle: 'THÁI THƯỢNG LÃO QUÂN & NGỌC HOÀNG',
        subtitle: 'Điện Kim Loan - Đại Khảo Hạch Đan Dược Thủ Khoa',
        charIcon: '🧙‍♂️',
        speech: 'Lành thay! Đan Dược Trí Tuệ trong Lò Bát Quái chỉ trao cho Trạng Nguyên tiếng Anh nhí xuất sắc nhất!',
        speakEn: 'She always practices English diligently every single day.',
        qTag: '👑 ĐẠI KHẢO HẠCH THỦ KHOA',
        question: 'Chọn câu viết đúng thì Quá Khứ Đơn chuẩn sách giáo khoa Lớp 5:',
        options: [
          'Yesterday, Ha My visited the Celestial Heaven Realm.',
          'Yesterday, Ha My visit the Celestial Heaven Realm.',
          'Yesterday, Ha My is visit the Celestial Heaven Realm.',
          'Yesterday, Ha My visiting the Celestial Heaven Realm.'
        ],
        correct: 0,
        explanation: 'Yesterday là dấu hiệu thì quá khứ đơn, động từ có quy tắc thêm -ed: "visited"!',
        rewardCoins: 250,
        rewardStars: 30,
        unlockOutfit: 'outfit_wukong'
      }
    };

    const trial = CELESTIAL_TRIALS[npc.id] || CELESTIAL_TRIALS.sun_wukong;

    const titleEl = document.getElementById('celestial-npc-title');
    const subEl = document.getElementById('celestial-npc-subtitle');
    const iconEl = document.getElementById('celestial-npc-icon');
    const charEl = document.getElementById('celestial-avatar-char');
    const speechEl = document.getElementById('celestial-speech-content');
    const qTagEl = document.getElementById('celestial-q-tag');
    const qTextEl = document.getElementById('celestial-q-text');
    const gridEl = document.getElementById('celestial-options-grid');
    const fbEl = document.getElementById('celestial-feedback-box');
    const btnSpeak = document.getElementById('btn-celestial-speak-en');

    if (titleEl) titleEl.textContent = trial.npcTitle;
    if (subEl) subEl.textContent = trial.subtitle;
    if (iconEl) iconEl.textContent = trial.charIcon;
    if (charEl) charEl.textContent = trial.charIcon;
    if (speechEl) speechEl.textContent = `"${trial.speech}"`;
    if (qTagEl) qTagEl.textContent = trial.qTag;
    if (qTextEl) qTextEl.textContent = trial.question;

    if (btnSpeak) {
      btnSpeak.onclick = () => {
        this.sound.speakEnglish(trial.speakEn);
      };
    }

    if (fbEl) {
      fbEl.style.display = 'none';
      fbEl.innerHTML = '';
    }

    if (gridEl) {
      gridEl.innerHTML = trial.options.map((opt, idx) => `
        <button class="celestial-opt-btn" data-c-idx="${idx}">
          <span class="c-opt-prefix">${['A', 'B', 'C', 'D'][idx]}</span>
          <span class="c-opt-text">${opt}</span>
        </button>
      `).join('');

      gridEl.querySelectorAll('.celestial-opt-btn').forEach(btn => {
        btn.onclick = (e) => {
          const selectedIdx = parseInt(e.currentTarget.getAttribute('data-c-idx'), 10);
          const isCorrect = (selectedIdx === trial.correct);

          if (isCorrect) {
            this.sound.playCorrect();
            this.confetti.fire(90);
            btn.classList.add('correct');

            if (this.economy) {
              this.economy.addCoins(trial.rewardCoins, `Khảo hạch ${trial.npcTitle}`);
              this.economy.addStars(trial.rewardStars);
              this.economy.addExp(50);
              this.updateCampusHUDCurrency();
            }

            if (trial.unlockPet && this.shop) {
              this.shop.unlockItem(trial.unlockPet);
            }
            if (trial.unlockOutfit && this.shop) {
              this.shop.unlockItem(trial.unlockOutfit);
            }

            if (this.quests) {
              if (npc.id === 'sun_wukong') this.quests.trackProgress('talk_wukong', 1);
              if (npc.id === 'zhu_bajie') this.quests.trackProgress('talk_bajie', 1);
              if (npc.id === 'sha_wujing') this.quests.trackProgress('talk_sha', 1);
              if (npc.id === 'jade_emperor') this.quests.trackProgress('talk_laozi', 1);
            }

            if (fbEl) {
              fbEl.className = 'celestial-feedback-box success';
              fbEl.style.display = 'block';
              fbEl.innerHTML = `
                <div class="c-fb-title">✨ KHẢO HẠCH THÀNH CÔNG! (+${trial.rewardCoins} Xu 🪙, +${trial.rewardStars} Sao ⭐)</div>
                <div class="c-fb-body">${trial.explanation}</div>
                <div class="c-fb-sub">Bảo bối tiên giới đã được thêm vào tủ đồ & Sổ Tay RPG của bé!</div>
              `;
            }
          } else {
            this.sound.playWrong();
            btn.classList.add('wrong');
            if (fbEl) {
              fbEl.className = 'celestial-feedback-box error';
              fbEl.style.display = 'block';
              fbEl.innerHTML = `
                <div class="c-fb-title">❌ Chưa đúng rồi!</div>
                <div class="c-fb-body">Bé hãy quan sát kỹ câu hỏi và bấm nút 🔊 Nghe phát âm để chọn lại nhé!</div>
              `;
            }
          }
        };
      });
    }

    modal.style.display = 'flex';
  }

  // --------------------------------------------------------
  // VIGNETTE 1: BẢNG VÀNG DANH DỰ 5C4 (HONOR ROLL SHOWCASE)
  // --------------------------------------------------------
  openHonorRollModal() {
    this.sound.playVictory();
    this.confetti.fire(90);
    this.sound.speakVietnamese("Chúc mừng con gái Hà My! Bảng vàng danh dự vinh danh học sinh xuất sắc lớp 5C4!");

    if (this.economy) {
      this.economy.addCoins(15, 'Chiêm ngưỡng Bảng Vàng Danh Dự');
      this.economy.addExp(25);
      this.updateCampusHUDCurrency();
    }

    let modal = document.getElementById('campus-honor-roll-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'campus-honor-roll-modal';
      modal.className = 'campus-modal-overlay';
      document.body.appendChild(modal);
    }

    const currentStars = this.economy ? this.economy.stars : 10;
    const currentCoins = this.economy ? this.economy.coins : 50;

    modal.innerHTML = `
      <div class="campus-modal-card honor-roll-modal-card" style="max-width: 540px; background: linear-gradient(135deg, #1e1b4b, #312e81); border: 3px solid #facc15; box-shadow: 0 16px 48px rgba(0,0,0,0.6); color: #fff; border-radius: 20px; overflow: hidden; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(250,204,21,0.4); padding-bottom: 12px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 38px;">🏆</span>
            <div>
              <h3 style="margin: 0; color: #fde047; font-size: 22px; font-weight: 800;">BẢNG VÀNG DANH DỰ 5C4</h3>
              <span style="color: #cbd5e1; font-size: 13px;">Trường Tiểu Học Ngô Quyền • Năm Học 2026</span>
            </div>
          </div>
          <button class="campus-modal-close" id="btn-close-honor-modal" style="background: rgba(255,255,255,0.15); border: none; color: #fff; font-size: 20px; border-radius: 50%; width: 36px; height: 36px; cursor: pointer;">✖</button>
        </div>

        <div style="text-align: center; background: rgba(255,255,255,0.08); border-radius: 16px; padding: 18px; margin-bottom: 16px;">
          <div style="font-size: 52px; margin-bottom: 8px;">👑</div>
          <h2 style="margin: 0 0 6px 0; color: #fbcfe8; font-size: 26px;">BÉ HÀ MY - 5C4</h2>
          <div style="display: inline-block; background: #e11d48; color: #fff; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 700; margin-bottom: 12px;">⭐ NGÔI SAO SÁNG TOÀN TRƯỜNG ⭐</div>
          <div style="display: flex; justify-content: center; gap: 16px; font-size: 14px; color: #fef08a;">
            <span>⭐ ${currentStars} Sao Tím</span>
            <span>🪙 ${currentCoins} Xu Vàng</span>
            <span>⚡ Cấp Độ ${this.economy ? this.economy.level : 1}</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
          <div style="background: rgba(255,255,255,0.06); padding: 10px; border-radius: 12px; border-left: 4px solid #facc15;">
            <div style="font-weight: 700; color: #fde047; font-size: 13px;">🌟 Tinh Hoa Tiếng Anh</div>
            <div style="font-size: 12px; color: #e2e8f0;">Đạt điểm 10/10 mọi bài kiểm tra ngữ pháp</div>
          </div>
          <div style="background: rgba(255,255,255,0.06); padding: 10px; border-radius: 12px; border-left: 4px solid #38bdf8;">
            <div style="font-weight: 700; color: #38bdf8; font-size: 13px;">☁️ Chinh Phục Mây Thần</div>
            <div style="font-size: 12px; color: #e2e8f0;">Parkour chạm đỉnh Thiên Đình 80M</div>
          </div>
          <div style="background: rgba(255,255,255,0.06); padding: 10px; border-radius: 12px; border-left: 4px solid #4ade80;">
            <div style="font-weight: 700; color: #4ade80; font-size: 13px;">💖 Bé Ngoan Thân Thiện</div>
            <div style="font-size: 12px; color: #e2e8f0;">Trò chuyện chan hòa cùng thầy cô, bạn bè</div>
          </div>
          <div style="background: rgba(255,255,255,0.06); padding: 10px; border-radius: 12px; border-left: 4px solid #ec4899;">
            <div style="font-weight: 700; color: #ec4899; font-size: 13px;">🐇 Yêu Thương Động Vật</div>
            <div style="font-size: 12px; color: #e2e8f0;">Chăm sóc đàn thỏ cưng và cá koi sân trường</div>
          </div>
        </div>

        <div style="background: rgba(250,204,21,0.12); border: 1px dashed #facc15; border-radius: 12px; padding: 12px; font-style: italic; color: #fef08a; font-size: 13px; text-align: center; margin-bottom: 16px;">
          "Thầy Tuấn & Cô Lan: Bé Hà My luôn cố gắng hết mình, thông minh và lễ phép. Con là niềm tự hào của Lớp 5C4!"
        </div>

        <button id="btn-honor-praise" style="width: 100%; padding: 12px; background: linear-gradient(90deg, #f59e0b, #e11d48); border: none; color: #fff; font-size: 15px; font-weight: 800; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 12px rgba(225,29,72,0.4);">
          🎉 Vinh Danh Bé Hà My (+15 Xu 🪙, +25 EXP ⚡)
        </button>
      </div>
    `;

    modal.style.display = 'flex';
    const closeBtn = document.getElementById('btn-close-honor-modal');
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };
    const praiseBtn = document.getElementById('btn-honor-praise');
    if (praiseBtn) praiseBtn.onclick = () => {
      this.sound.playVictory();
      this.confetti.fire(60);
      modal.style.display = 'none';
    };
  }

  // --------------------------------------------------------
  // VIGNETTE 2: VƯỜN THỎ CƯNG CHIBI (KAWAII BUNNY SANCTUARY)
  // --------------------------------------------------------
  openBunnySanctuaryModal() {
    this.sound.playClick();
    this.sound.speakVietnamese("Chào mừng bé Hà My đến Vườn Thỏ Cưng Chibi! Cùng cho thỏ ăn và học từ vựng tiếng Anh nhé!");

    let modal = document.getElementById('campus-bunny-sanctuary-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'campus-bunny-sanctuary-modal';
      modal.className = 'campus-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="campus-modal-card bunny-modal-card" style="max-width: 520px; background: linear-gradient(135deg, #064e3b, #047857); border: 3px solid #86efac; box-shadow: 0 16px 48px rgba(0,0,0,0.5); color: #fff; border-radius: 20px; padding: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(134,239,172,0.4); padding-bottom: 10px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 36px;">🐰</span>
            <div>
              <h3 style="margin: 0; color: #86efac; font-size: 20px; font-weight: 800;">VƯỜN THỎ CƯNG CHIBI 5C4</h3>
              <span style="color: #a7f3d0; font-size: 13px;">Kawaii Bunny Sanctuary & English Nature</span>
            </div>
          </div>
          <button class="campus-modal-close" id="btn-close-bunny-modal" style="background: rgba(255,255,255,0.15); border: none; color: #fff; font-size: 20px; border-radius: 50%; width: 34px; height: 34px; cursor: pointer;">✖</button>
        </div>

        <div style="display: flex; justify-content: space-around; background: rgba(0,0,0,0.25); border-radius: 14px; padding: 12px; margin-bottom: 14px;">
          <div style="text-align: center;">
            <div style="font-size: 32px;">🐇</div>
            <div style="font-weight: 700; font-size: 13px; color: #fff;">Snowball</div>
            <div style="font-size: 11px; color: #cbd5e1;">Thỏ Tuyết Nhảy Nhót</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 32px;">🥕</div>
            <div style="font-weight: 700; font-size: 13px; color: #fde047;">Caramel</div>
            <div style="font-size: 11px; color: #cbd5e1;">Thỏ Nâu Gặm Cà Rốt</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 32px;">🌸</div>
            <div style="font-weight: 700; font-size: 13px; color: #fbcfe8;">Marshmallow</div>
            <div style="font-size: 11px; color: #cbd5e1;">Thỏ Kem Lắc Tai</div>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.1); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
          <div style="font-weight: 700; color: #fde047; font-size: 14px; margin-bottom: 8px;">📚 BỘ TỪ VỰNG TIẾNG ANH CHỦ ĐỀ THỎ CƯNG:</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px;">
            <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 8px;">
              <b>Rabbit</b> /ˈræb.ɪt/<br><span style="color: #a7f3d0;">= Chú thỏ đáng yêu</span>
            </div>
            <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 8px;">
              <b>Carrot</b> /ˈkær.ət/<br><span style="color: #a7f3d0;">= Củ cà rốt giòn ngọt</span>
            </div>
            <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 8px;">
              <b>Fluffy</b> /ˈflʌf.i/<br><span style="color: #a7f3d0;">= Mềm mại, bồng bềnh</span>
            </div>
            <div style="background: rgba(0,0,0,0.2); padding: 8px; border-radius: 8px;">
              <b>Hop</b> /hɒp/<br><span style="color: #a7f3d0;">= Nhảy nhót tung tăng</span>
            </div>
          </div>
        </div>

        <div id="bunny-action-feedback" style="display: none; background: #065f46; border: 1px solid #34d399; padding: 10px; border-radius: 10px; text-align: center; color: #fef08a; font-size: 13px; margin-bottom: 12px;"></div>

        <div style="display: flex; gap: 10px;">
          <button id="btn-feed-carrot" style="flex: 1; padding: 11px; background: linear-gradient(90deg, #ea580c, #f59e0b); border: none; color: #fff; font-size: 13px; font-weight: 700; border-radius: 10px; cursor: pointer;">
            🥕 Cho Thỏ Ăn Cà Rốt
          </button>
          <button id="btn-pet-bunny" style="flex: 1; padding: 11px; background: linear-gradient(90deg, #059669, #10b981); border: none; color: #fff; font-size: 13px; font-weight: 700; border-radius: 10px; cursor: pointer;">
            💕 Vuốt Ve Thỏ Con
          </button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    const closeBtn = document.getElementById('btn-close-bunny-modal');
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };

    const fbBox = document.getElementById('bunny-action-feedback');
    const feedBtn = document.getElementById('btn-feed-carrot');
    if (feedBtn) {
      feedBtn.onclick = () => {
        this.sound.playCorrect();
        this.sound.speakEnglish("The rabbit is eating a delicious carrot! Crunch crunch!");
        if (this.economy) {
          this.economy.addCoins(8, 'Cho thỏ ăn cà rốt');
          this.economy.addExp(15);
          this.economy.addStars(1);
          this.updateCampusHUDCurrency();
        }
        if (fbBox) {
          fbBox.style.display = 'block';
          fbBox.innerHTML = `🥕 Chú thỏ Caramel gặm cà rốt giòn rụm! Thưởng: +8 Xu 🪙, +15 EXP ⚡, +1 Sao ⭐!`;
        }
      };
    }

    const petBtn = document.getElementById('btn-pet-bunny');
    if (petBtn) {
      petBtn.onclick = () => {
        this.sound.playVictory();
        this.sound.speakEnglish("The fluffy bunny loves you, Ha My!");
        if (this.economy) {
          this.economy.addCoins(5, 'Vuốt ve thỏ cưng');
          this.economy.addExp(10);
          this.updateCampusHUDCurrency();
        }
        if (fbBox) {
          fbBox.style.display = 'block';
          fbBox.innerHTML = `💕 Thỏ Snowball và Marshmallow rúc vào tay Hà My ấm áp! Thưởng: +5 Xu 🪙, +10 EXP ⚡!`;
        }
      };
    }
  }

  // --------------------------------------------------------
  // VIGNETTE 3: MÁY BÁN NƯỚC TỰ ĐỘNG CUTE (KAWAII VENDING MACHINE)
  // --------------------------------------------------------
  openVendingMachineModal() {
    this.sound.playClick();
    this.sound.speakVietnamese("Máy bán nước tự động dễ thương! Mời con gái Hà My chọn một món đồ uống yêu thích nhé!");

    let modal = document.getElementById('campus-vending-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'campus-vending-modal';
      modal.className = 'campus-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="campus-modal-card vm-modal-card" style="max-width: 500px; background: linear-gradient(135deg, #831843, #be185d); border: 3px solid #fbcfe8; box-shadow: 0 16px 48px rgba(0,0,0,0.5); color: #fff; border-radius: 20px; padding: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(251,207,232,0.4); padding-bottom: 10px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 36px;">🧋</span>
            <div>
              <h3 style="margin: 0; color: #fbcfe8; font-size: 20px; font-weight: 800;">MÁY BÁN NƯỚC TỰ ĐỘNG 5C4</h3>
              <span style="color: #fce7f3; font-size: 13px;">Uống Đồ Ngon • Nhận Buff Tốc Độ & Bật Nhảy!</span>
            </div>
          </div>
          <button class="campus-modal-close" id="btn-close-vm-modal" style="background: rgba(255,255,255,0.15); border: none; color: #fff; font-size: 20px; border-radius: 50%; width: 34px; height: 34px; cursor: pointer;">✖</button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div class="vm-drink-card" data-drink="boba" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 14px; padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s;">
            <div style="font-size: 40px; margin-bottom: 4px;">🧋</div>
            <div style="font-weight: 800; font-size: 14px; color: #fef08a;">Trà Sữa Trân Châu</div>
            <div style="font-size: 11px; color: #67e8f9; margin-top: 4px;">⚡ Buff: +35% Tốc Độ Chạy (25s)</div>
            <button style="margin-top: 8px; width: 100%; padding: 6px; background: #e11d48; border: none; color: #fff; border-radius: 8px; font-weight: 700; cursor: pointer;">Chọn Uống 🧋</button>
          </div>

          <div class="vm-drink-card" data-drink="orange" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 14px; padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s;">
            <div style="font-size: 40px; margin-bottom: 4px;">🍊</div>
            <div style="font-weight: 800; font-size: 14px; color: #fde047;">Nước Cam Ép Tươi</div>
            <div style="font-size: 11px; color: #4ade80; margin-top: 4px;">🦘 Buff: +30% Nhảy Cao Hơn (20s)</div>
            <button style="margin-top: 8px; width: 100%; padding: 6px; background: #ea580c; border: none; color: #fff; border-radius: 8px; font-weight: 700; cursor: pointer;">Chọn Uống 🍊</button>
          </div>

          <div class="vm-drink-card" data-drink="strawberry" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 14px; padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s;">
            <div style="font-size: 40px; margin-bottom: 4px;">🍓</div>
            <div style="font-weight: 800; font-size: 14px; color: #fbcfe8;">Sinh Tố Dâu Cheese</div>
            <div style="font-size: 11px; color: #f472b6; margin-top: 4px;">💖 Thưởng Ngay: +20 EXP Siêu Cấp</div>
            <button style="margin-top: 8px; width: 100%; padding: 6px; background: #db2777; border: none; color: #fff; border-radius: 8px; font-weight: 700; cursor: pointer;">Chọn Uống 🍓</button>
          </div>

          <div class="vm-drink-card" data-drink="rainbow" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); border-radius: 14px; padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s;">
            <div style="font-size: 40px; margin-bottom: 4px;">🍦</div>
            <div style="font-weight: 800; font-size: 14px; color: #a7f3d0;">Kem 7 Sắc Cầu Vồng</div>
            <div style="font-size: 11px; color: #fef08a; margin-top: 4px;">⭐ Thưởng Ngay: +2 Sao Tím May Mắn</div>
            <button style="margin-top: 8px; width: 100%; padding: 6px; background: #7c3aed; border: none; color: #fff; border-radius: 8px; font-weight: 700; cursor: pointer;">Chọn Uống 🍦</button>
          </div>
        </div>

        <div id="vm-feedback" style="display: none; background: rgba(0,0,0,0.3); border: 1px solid #fbcfe8; padding: 10px; border-radius: 10px; text-align: center; color: #fef08a; font-size: 13px;"></div>
      </div>
    `;

    modal.style.display = 'flex';
    const closeBtn = document.getElementById('btn-close-vm-modal');
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };

    const drinkCards = modal.querySelectorAll('.vm-drink-card');
    drinkCards.forEach(card => {
      card.onclick = () => {
        const type = card.getAttribute('data-drink');
        this.sound.playCorrect();
        const fb = document.getElementById('vm-feedback');

        if (type === 'boba') {
          if (this.active3DArena) {
            this.active3DArena.speedMultiplier = 1.35;
            setTimeout(() => { if (this.active3DArena) this.active3DArena.speedMultiplier = 1.0; }, 25000);
          }
          this.sound.speakVietnamese("Bé Hà My vừa uống Trà Sữa Trân Châu! Chạy siêu nhanh trong 25 giây!");
          if (fb) {
            fb.style.display = 'block';
            fb.innerHTML = `⚡ <b>BUFF KÍCH HOẠT:</b> Tốc độ chạy tăng +35% trong 25 giây! Hãy thử chạy khắp khuôn viên nhé!`;
          }
        } else if (type === 'orange') {
          if (this.active3DArena) {
            this.active3DArena.jumpMultiplier = 1.3;
            setTimeout(() => { if (this.active3DArena) this.active3DArena.jumpMultiplier = 1.0; }, 20000);
          }
          this.sound.speakVietnamese("Nước cam ép bổ dưỡng! Bé Hà My có thể nhảy cao hơn 30%!");
          if (fb) {
            fb.style.display = 'block';
            fb.innerHTML = `🦘 <b>BUFF KÍCH HOẠT:</b> Lực nhảy tăng +30% trong 20 giây! Chinh phục các bục parkour dễ dàng hơn!`;
          }
        } else if (type === 'strawberry') {
          if (this.economy) {
            this.economy.addExp(25);
            this.updateCampusHUDCurrency();
          }
          this.sound.speakVietnamese("Sinh tố dâu ngọt ngào! Thưởng ngay 25 điểm kinh nghiệm!");
          if (fb) {
            fb.style.display = 'block';
            fb.innerHTML = `💖 <b>THƯỞNG:</b> Nhận ngay +25 EXP ⚡!`;
          }
        } else if (type === 'rainbow') {
          if (this.economy) {
            this.economy.addStars(2);
            this.economy.addCoins(10);
            this.updateCampusHUDCurrency();
          }
          this.confetti.fire(70);
          this.sound.speakVietnamese("Kem cầu vồng may mắn! Tặng con gái 2 Sao Tím và 10 Xu!");
          if (fb) {
            fb.style.display = 'block';
            fb.innerHTML = `⭐ <b>THƯỞNG:</b> Nhận ngay +2 Sao Tím ⭐ và +10 Xu Vàng 🪙!`;
          }
        }

        setTimeout(() => { modal.style.display = 'none'; }, 2200);
      };
    });
  }

  // --------------------------------------------------------
  // VIGNETTE 4: KHU CHECK-IN SỐNG ẢO 5C4 (SELFIE PHOTO BOOTH)
  // --------------------------------------------------------
  openPhotoBoothModal() {
    this.sound.playClick();
    this.sound.speakVietnamese("Chào mừng bé Hà My đến Khu Check-in Sống Ảo 5C4! Cùng bấm máy chụp ảnh lưu niệm nhé!");

    let modal = document.getElementById('campus-photobooth-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'campus-photobooth-modal';
      modal.className = 'campus-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="campus-modal-card photo-modal-card" style="max-width: 480px; background: #ffffff; border: 4px solid #f472b6; box-shadow: 0 16px 48px rgba(0,0,0,0.4); color: #1e293b; border-radius: 20px; padding: 22px; text-align: center;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #f472b6; padding-bottom: 8px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 28px;">📸</span>
            <h3 style="margin: 0; color: #db2777; font-size: 19px; font-weight: 800;">CHECK-IN KỶ NIỆM 5C4</h3>
          </div>
          <button class="campus-modal-close" id="btn-close-photo-modal" style="background: #f1f5f9; border: none; color: #475569; font-size: 20px; border-radius: 50%; width: 34px; height: 34px; cursor: pointer;">✖</button>
        </div>

        <div id="polaroid-photo-frame" style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 14px; box-shadow: inset 0 2px 6px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #fbcfe8, #fed7aa); height: 180px; border-radius: 8px; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;">
            <div style="font-size: 64px;">👧💖</div>
            <div style="font-weight: 800; color: #be185d; font-size: 16px;">BÉ HÀ MY • LỚP 5C4</div>
            <div style="font-size: 12px; color: #831843;">Trường Tiểu Học Ngô Quyền - 2026</div>
            <div id="camera-flash-overlay" style="display: none; position: absolute; inset: 0; background: #fff; z-index: 10;"></div>
          </div>
          <div style="font-family: 'Caveat', cursive, 'Nunito', sans-serif; font-size: 18px; color: #be185d; margin-top: 10px; font-weight: 700;">
            "Khoảnh khắc tuổi thơ rạng rỡ dưới mái trường thân yêu 💕"
          </div>
        </div>

        <button id="btn-snap-camera" style="width: 100%; padding: 13px; background: linear-gradient(90deg, #ec4899, #f43f5e); border: none; color: #fff; font-size: 16px; font-weight: 800; border-radius: 12px; cursor: pointer; box-shadow: 0 4px 14px rgba(236,72,153,0.4);">
          📸 BẤM CHỤP ẢNH TÁCH TÁCH! (+15 Xu 🪙, +1 Sao ⭐)
        </button>
      </div>
    `;

    modal.style.display = 'flex';
    const closeBtn = document.getElementById('btn-close-photo-modal');
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };

    const snapBtn = document.getElementById('btn-snap-camera');
    if (snapBtn) {
      snapBtn.onclick = () => {
        const flash = document.getElementById('camera-flash-overlay');
        if (flash) {
          flash.style.display = 'block';
          setTimeout(() => { flash.style.display = 'none'; }, 220);
        }

        this.sound.playVictory();
        this.confetti.fire(80);
        this.sound.speakVietnamese("Tách! Bức ảnh của bé Hà My thật xinh đẹp!");

        if (this.active3DArena) {
          this.active3DArena.playVictoryCelebration();
        }

        if (this.economy) {
          this.economy.addCoins(15, 'Chụp ảnh kỷ niệm 5C4');
          this.economy.addStars(1);
          this.economy.addExp(20);
          this.updateCampusHUDCurrency();
        }

        snapBtn.innerHTML = `✨ ĐÃ LƯU BỨC ẢNH VÀO ALBUM KỶ NIỆM! 💖`;
        snapBtn.style.background = '#059669';
        setTimeout(() => { modal.style.display = 'none'; }, 2500);
      };
    }
  }

  // --------------------------------------------------------
  // VIGNETTE 5: GÓC ĐỌC SÁCH CÂY PHƯỢNG (OUTDOOR READING NOOK)
  // --------------------------------------------------------
  openReadingNookModal() {
    this.sound.playClick();
    this.sound.speakVietnamese("Góc đọc sách dưới bóng cây phượng vĩ! Cùng đọc câu chuyện tiếng Anh ý nghĩa này nhé!");

    let modal = document.getElementById('campus-reading-nook-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'campus-reading-nook-modal';
      modal.className = 'campus-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="campus-modal-card reading-modal-card" style="max-width: 540px; background: linear-gradient(135deg, #1e293b, #0f172a); border: 3px solid #38bdf8; box-shadow: 0 16px 48px rgba(0,0,0,0.6); color: #fff; border-radius: 20px; padding: 22px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(56,189,248,0.4); padding-bottom: 10px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 34px;">📖</span>
            <div>
              <h3 style="margin: 0; color: #38bdf8; font-size: 20px; font-weight: 800;">GÓC ĐỌC SÁCH CÂY PHƯỢNG 5C4</h3>
              <span style="color: #94a3b8; font-size: 13px;">English Story Nook • Truyện Song Ngữ Lớp 5</span>
            </div>
          </div>
          <button class="campus-modal-close" id="btn-close-reading-modal" style="background: rgba(255,255,255,0.15); border: none; color: #fff; font-size: 20px; border-radius: 50%; width: 34px; height: 34px; cursor: pointer;">✖</button>
        </div>

        <div style="background: rgba(255,255,255,0.06); border-radius: 14px; padding: 16px; margin-bottom: 14px; border-left: 4px solid #38bdf8;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="font-weight: 800; color: #fde047; font-size: 16px;">🌟 The Golden Star of Grade 5C4</div>
            <button id="btn-read-aloud" style="padding: 4px 10px; background: #0284c7; border: none; color: #fff; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">🔊 Nghe Đọc</button>
          </div>
          <div style="font-size: 13px; line-height: 1.6; color: #e2e8f0; margin-bottom: 10px;">
            "Once upon a time in Ngô Quyền School, a smart little girl named Hà My discovered a magical star in her classroom. The star whispered: <i>'Knowledge is your superpower! Every English word you learn makes the world brighter!'</i> Hà My smiled happily and shared the starlight with all her wonderful friends."
          </div>
          <div style="font-size: 12px; line-height: 1.5; color: #94a3b8; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 8px;">
            <b>Bản dịch:</b> Ngày xửa ngày xưa tại Trường Ngô Quyền, có một cô bé thông minh tên là Hà My tìm thấy một ngôi sao thần kỳ trong lớp học. Ngôi sao khẽ thì thầm: <i>"Tri thức là siêu năng lực của con! Mỗi từ tiếng Anh con học được sẽ làm thế giới bừng sáng!"</i> Hà My mỉm cười hạnh phúc và chia sẻ ánh sao cùng tất cả bạn bè thân yêu.
          </div>
        </div>

        <div style="background: rgba(250,204,21,0.12); border: 1px solid #facc15; border-radius: 12px; padding: 12px; margin-bottom: 14px;">
          <div style="font-weight: 700; color: #fde047; font-size: 13px; margin-bottom: 8px;">❓ CÂU HỎI ĐỌC HIỂU: What did the little star whisper?</div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="btn-reading-quiz-opt" data-correct="true" style="text-align: left; padding: 8px 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: #fff; font-size: 13px; cursor: pointer;">
              A. "Knowledge is your superpower!" ⭐
            </button>
            <button class="btn-reading-quiz-opt" data-correct="false" style="text-align: left; padding: 8px 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; color: #fff; font-size: 13px; cursor: pointer;">
              B. "Stars cannot shine."
            </button>
          </div>
        </div>

        <div id="reading-quiz-feedback" style="display: none; padding: 10px; border-radius: 10px; text-align: center; font-size: 13px; font-weight: 700;"></div>
      </div>
    `;

    modal.style.display = 'flex';
    const closeBtn = document.getElementById('btn-close-reading-modal');
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };

    const readAloudBtn = document.getElementById('btn-read-aloud');
    if (readAloudBtn) {
      readAloudBtn.onclick = () => {
        this.sound.speakEnglish("Knowledge is your superpower! Every English word you learn makes the world brighter!");
      };
    }

    const quizOpts = modal.querySelectorAll('.btn-reading-quiz-opt');
    const fbBox = document.getElementById('reading-quiz-feedback');
    quizOpts.forEach(opt => {
      opt.onclick = () => {
        const isCorrect = opt.getAttribute('data-correct') === 'true';
        if (isCorrect) {
          this.sound.playVictory();
          this.confetti.fire(70);
          if (this.economy) {
            this.economy.addCoins(20, 'Đọc hiểu truyện tiếng Anh');
            this.economy.addExp(25);
            this.economy.addStars(2);
            this.updateCampusHUDCurrency();
          }
          if (fbBox) {
            fbBox.style.display = 'block';
            fbBox.style.background = '#065f46';
            fbBox.style.color = '#86efac';
            fbBox.innerHTML = `🎉 CHÍNH XÁC! Thưởng: +20 Xu 🪙, +25 EXP ⚡, +2 Sao ⭐!`;
          }
          setTimeout(() => { modal.style.display = 'none'; }, 2000);
        } else {
          this.sound.playWrong();
          if (fbBox) {
            fbBox.style.display = 'block';
            fbBox.style.background = '#991b1b';
            fbBox.style.color = '#fecaca';
            fbBox.innerHTML = `❌ Chưa chính xác, bé hãy đọc lại lời thì thầm của ngôi sao nhé!`;
          }
        }
      };
    });
  }

  // ========================================================
  // PHÂN HỆ MỚI: CHIẾC TRỐNG TRƯỜNG DA TRÂU TRUYỀN THỐNG 🥁
  // Âm thanh trầm bổng vang dội 3 nhịp TÙNG... TÙNG... TÙNG!
  // ========================================================
  playSchoolDrumEffect() {
    this.sound.playClick();
    this.sound.playVictory();
    this.confetti.fire(90);

    // Phát âm thanh tiếng trống trường da trâu bằng Web Audio API (Âm bass 85Hz - 45Hz vang rền)
    if (this.sound && this.sound.audioCtx) {
      const ctx = this.sound.audioCtx;
      const now = ctx.currentTime;
      [0, 0.45, 0.95].forEach((delay) => {
        const strikeTime = now + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, strikeTime);
        osc.frequency.exponentialRampToValueAtTime(55, strikeTime + 0.35);

        gain.gain.setValueAtTime(0.7, strikeTime);
        gain.gain.exponentialRampToValueAtTime(0.001, strikeTime + 0.42);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(strikeTime);
        osc.stop(strikeTime + 0.45);
      });
    }

    this.sound.speakVietnamese("Tùng... Tùng... Tùng! Tiếng trống trường Ngô Quyền vang lên rộn rã báo giờ ra chơi!");

    if (this.economy) {
      this.economy.addCoins(15, 'Đánh trống trường báo giờ ra chơi');
      this.economy.addExp(20);
      this.economy.addStars(1);
      this.updateCampusHUDCurrency();
    }

    // Hiển thị thông báo Toast hoành tráng
    let banner = document.getElementById('school-drum-toast-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'school-drum-toast-banner';
      banner.className = 'school-drum-toast-modal';
      document.body.appendChild(banner);
    }

    banner.innerHTML = `
      <div class="drum-toast-content">
        <div class="drum-toast-icon animate-bounce">🥁</div>
        <div class="drum-toast-body">
          <h3 class="drum-toast-title">TÙNG... TÙNG... TÙNG! TIẾNG TRỐNG TRƯỜNG VANG DỘI!</h3>
          <p class="drum-toast-desc">
            Tiếng trống trường Ngô Quyền đã điểm! Báo hiệu giờ ra chơi rộn rã đã đến!
            Chúc con gái <strong>Bé Hà My 5C4</strong> cùng bạn bè vui chơi bổ ích, khỏe khoắn và nạp đầy năng lượng!
          </p>
          <div class="drum-toast-reward">
            <span>🪙 +15 Xu Vàng</span>
            <span>⭐ +1 Sao Tím</span>
            <span>⚡ +20 EXP</span>
          </div>
        </div>
        <button class="drum-toast-close" id="btn-close-drum-toast">✖</button>
      </div>
    `;

    banner.style.display = 'flex';
    const closeBtn = document.getElementById('btn-close-drum-toast');
    if (closeBtn) closeBtn.onclick = () => { banner.style.display = 'none'; };

    setTimeout(() => {
      if (banner && banner.style.display !== 'none') {
        banner.style.display = 'none';
      }
    }, 5500);
  }

  // ========================================================
  // PHÂN HỆ MỚI: PHÒNG HỌC TOÁN 5C4 & LUYỆN THI CÔ MAI (LỚP 5)
  // 6 Chuyên đề chuẩn SGK Kết Nối Tri Thức + Cánh Diều
  // ========================================================
  openMathClassroomModal(activeTopicId = 'all', questionIdx = 0) {
    this.sound.playClick();
    this.sound.speakVietnamese("Chào mừng bé Hà My đến Phòng Học Toán 5C4 cùng Cô Mai!");

    let modal = document.getElementById('campus-math-classroom-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'campus-math-classroom-modal';
      modal.className = 'campus-modal-overlay';
      document.body.appendChild(modal);
    }

    const topics = window.GRADE_5_MATH_TOPICS || [
      { id: 'phanso', name: '➗ Phân Số & Hỗn Số', icon: '➗', desc: 'Rút gọn, quy đồng, hỗn số' },
      { id: 'thapphan', name: '🔢 Số Thập Phân', icon: '🔢', desc: '4 phép tính số thập phân' },
      { id: 'tiso', name: '📊 Tỉ Số Phần Trăm', icon: '📊', desc: 'Tìm tỉ số %, giảm giá thực tế' },
      { id: 'hinhhoc', name: '📐 Hình Học & Thể Tích', icon: '📐', desc: 'Tam giác, hình thang, hình tròn, thể tích' },
      { id: 'chuyendong', name: '🚗 Chuyển Động Đều', icon: '🚗', desc: 's = v x t, gặp nhau & đuổi kịp' },
      { id: 'tuduy', name: '🧠 Toán Tư Duy Thực Tế', icon: '🧠', desc: 'Bài toán logic & ứng dụng cuộc sống' }
    ];

    const allQuestions = window.GRADE_5_MATH_QUESTIONS || [];
    let currentTopicQuestions = (activeTopicId === 'all')
      ? allQuestions
      : (activeTopicId === 'handbook' ? [] : allQuestions.filter(q => q.topic === activeTopicId));

    if (currentTopicQuestions.length === 0 && activeTopicId !== 'handbook') {
      currentTopicQuestions = allQuestions;
    }

    if (questionIdx >= currentTopicQuestions.length) {
      questionIdx = 0;
    }

    const renderMathModalContent = (topicId, qIdx) => {
      const isHandbook = (topicId === 'handbook');
      const filteredQuestions = (topicId === 'all')
        ? allQuestions
        : (isHandbook ? [] : allQuestions.filter(q => q.topic === topicId));

      const q = (!isHandbook && filteredQuestions.length > 0)
        ? filteredQuestions[qIdx % filteredQuestions.length]
        : null;

      modal.innerHTML = `
        <div class="campus-modal-card math-classroom-modal-card">
          <!-- HEADER PHÒNG HỌC TOÁN CÔ MAI -->
          <div class="math-modal-header">
            <div class="math-header-left">
              <span class="math-icon-badge">📐</span>
              <div>
                <h3 class="math-title">PHÒNG HỌC TOÁN LỚP 5C4 • CÔ MAI</h3>
                <span class="math-subtitle">Giáo Trình Chuẩn Lớp 5 • Ôn Luyện Thi Điểm 10 Chuyên Đề</span>
              </div>
            </div>
            <div class="math-header-right">
              <button class="math-tab-btn ${isHandbook ? 'active' : ''}" id="btn-math-handbook">
                📖 Sổ Tay Công Thức
              </button>
              <button class="campus-modal-close" id="btn-close-math-modal">✖</button>
            </div>
          </div>

          <!-- LỜI DẶN DÒ YÊU THƯƠNG CỦA CÔ MAI -->
          <div class="math-teacher-banner">
            <div class="math-teacher-avatar">📐👩‍🏫</div>
            <div class="math-teacher-speech">
              "Chào con gái <strong>Bé Hà My 5C4</strong>! Hôm nay cô trò mình cùng chinh phục các dạng bài toán lớp 5 nhé!
              Hãy đọc kỹ đề bài, áp dụng đúng công thức và phân tích logic từng bước nha con!"
            </div>
          </div>

          <!-- THANH CHỌN CHUYÊN ĐỀ TOÁN HỌC -->
          <div class="math-topic-tabs-bar">
            <button class="math-topic-pill ${topicId === 'all' ? 'active' : ''}" data-topic="all">
              🌟 Tất Cả (${allQuestions.length})
            </button>
            ${topics.map(t => {
              const count = allQuestions.filter(q => q.topic === t.id).length;
              return `
                <button class="math-topic-pill ${topicId === t.id ? 'active' : ''}" data-topic="${t.id}">
                  ${t.name} (${count})
                </button>
              `;
            }).join('')}
          </div>

          <!-- NỘI DUNG CHÍNH: BÀI TẬP HOẶC SỔ TAY CÔNG THỨC -->
          <div class="math-modal-body" id="math-modal-body-container">
            ${isHandbook ? this.renderMathHandbookHTML() : this.renderMathQuestionHTML(q, qIdx, filteredQuestions.length)}
          </div>
        </div>
      `;

      modal.style.display = 'flex';

      // Gắn sự kiện đóng modal
      const closeBtn = document.getElementById('btn-close-math-modal');
      if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };

      // Gắn sự kiện chuyển tab sổ tay công thức
      const handbookBtn = document.getElementById('btn-math-handbook');
      if (handbookBtn) {
        handbookBtn.onclick = () => renderMathModalContent('handbook', 0);
      }

      // Gắn sự kiện chọn chuyên đề
      modal.querySelectorAll('.math-topic-pill').forEach(btn => {
        btn.onclick = () => {
          const tid = btn.getAttribute('data-topic');
          renderMathModalContent(tid, 0);
        };
      });

      // Nếu đang ở màn hình câu hỏi, gắn sự kiện chọn đáp án & nghe đề
      if (!isHandbook && q) {
        const btnSpeak = document.getElementById('btn-math-speak-question');
        if (btnSpeak) {
          btnSpeak.onclick = () => {
            this.sound.speakVietnamese(`${q.question}. Mẹo công thức: ${q.formula || ''}`);
          };
        }

        modal.querySelectorAll('.math-option-card').forEach(btn => {
          btn.onclick = () => {
            const isCorrect = btn.getAttribute('data-correct') === 'true';
            const feedbackContainer = document.getElementById('math-feedback-container');

            if (isCorrect) {
              this.sound.playCorrect();
              this.sound.playVictory();
              this.sound.playCoin();
              this.confetti.fire(70);

              btn.classList.add('correct');

              if (this.economy) {
                this.economy.addCoins(20, 'Giải đúng bài toán lớp 5');
                this.economy.addStars(1);
                this.economy.addExp(25);
                this.updateCampusHUDCurrency();
              }

              if (feedbackContainer) {
                feedbackContainer.className = 'math-feedback-box success';
                feedbackContainer.style.display = 'block';
                feedbackContainer.innerHTML = `
                  <div class="math-fb-header">
                    <span class="math-fb-badge">🎉 CHÍNH XÁC XUẤT SẮC BÉ HÀ MY!</span>
                    <span class="math-fb-rewards">🪙 +20 Xu  ⭐ +1 Sao  ⚡ +25 EXP</span>
                  </div>
                  <div class="math-fb-explanation">
                    🔍 <strong>Lời Giải Chi Tiết Của Cô Mai:</strong><br>
                    ${q.explanation}
                  </div>
                  <div class="math-fb-actions">
                    <button class="math-btn-next" id="btn-math-next-q">Câu Tiếp Theo 🚀</button>
                  </div>
                `;

                const nextBtn = document.getElementById('btn-math-next-q');
                if (nextBtn) {
                  nextBtn.onclick = () => {
                    renderMathModalContent(topicId, (qIdx + 1) % filteredQuestions.length);
                  };
                }
              }
            } else {
              this.sound.playWrong();
              btn.classList.add('wrong');

              if (feedbackContainer) {
                feedbackContainer.className = 'math-feedback-box error';
                feedbackContainer.style.display = 'block';
                feedbackContainer.innerHTML = `
                  <div class="math-fb-header">
                    <span class="math-fb-badge error">💡 CHƯA ĐÚNG RỒI CON YÊU!</span>
                  </div>
                  <div class="math-fb-explanation">
                    📐 <strong>Gợi Ý Của Cô Mai:</strong> Hãy xem kỹ công thức <em>"${q.formula || ''}"</em> và thử tính lại từng bước nhé!<br>
                    <small style="opacity: 0.9; margin-top: 6px; display: block;">${q.explanation}</small>
                  </div>
                `;
              }
            }
          };
        });
      }
    };

    renderMathModalContent(activeTopicId, questionIdx);
  }

  renderMathQuestionHTML(q, qIdx, totalCount) {
    if (!q) return '<div class="math-empty-tip">✨ Chưa có câu hỏi trong chuyên đề này!</div>';

    const letters = ['A', 'B', 'C', 'D'];
    return `
      <div class="math-quiz-wrapper">
        <div class="math-quiz-status-bar">
          <span class="math-q-index-pill">Câu ${qIdx + 1} / ${totalCount}</span>
          <span class="math-q-topic-badge">Chuyên đề: ${q.topic}</span>
          <button class="math-btn-speak" id="btn-math-speak-question" title="Nghe Cô Mai đọc đề bài">
            🔊 Nghe Đề Bài
          </button>
        </div>

        <div class="math-question-card">
          <div class="math-q-text">👉 ${q.question}</div>
          ${q.formula ? `
            <div class="math-formula-callout">
              📐 <strong>Công Thức Áp Dụng:</strong> <code>${q.formula}</code>
            </div>
          ` : ''}
        </div>

        <div class="math-options-grid">
          ${q.options.map((opt, i) => `
            <div class="math-option-card" data-correct="${opt.correct}">
              <span class="math-opt-letter">${letters[i]}</span>
              <span class="math-opt-text">${opt.text}</span>
            </div>
          `).join('')}
        </div>

        <div class="math-feedback-container" id="math-feedback-container" style="display: none;"></div>
      </div>
    `;
  }

  renderMathHandbookHTML() {
    return `
      <div class="math-handbook-container">
        <div class="handbook-intro-card">
          <h4>📚 SỔ TAY CÔNG THỨC TOÁN LỚP 5 TOÀN TẬP (BẢN ĐẦY ĐỦ 2026)</h4>
          <p>Bộ bí kíp công thức trọng tâm giúp con giải nhanh mọi bài thi toán giữa kỳ và cuối kỳ!</p>
        </div>

        <div class="handbook-grid">
          <!-- CARD 1: HÌNH HỌC PHẲNG -->
          <div class="handbook-card">
            <div class="handbook-card-title">📐 1. Hình Học Phẳng (Tam Giác, Hình Thang, Hình Tròn)</div>
            <ul class="handbook-list">
              <li><strong>Hình Tam Giác:</strong> S = (a × h) : 2 (Diện tích = Cạnh đáy × Chiều cao : 2)</li>
              <li><strong>Hình Thang:</strong> S = (a + b) × h : 2 ("Đáy lớn đáy nhỏ ta đem cộng vào, nhân với chiều cao, chia đôi lấy nửa")</li>
              <li><strong>Chu vi Hình Tròn:</strong> C = d × 3.14 = r × 2 × 3.14</li>
              <li><strong>Diện tích Hình Tròn:</strong> S = r × r × 3.14</li>
            </ul>
          </div>

          <!-- CARD 2: HÌNH HỌC KHÔNG GIAN & THỂ TÍCH -->
          <div class="handbook-card">
            <div class="handbook-card-title">📦 2. Hình Hộp Chữ Nhật & Hình Lập Phương</div>
            <ul class="handbook-list">
              <li><strong>S xung quanh hộp chữ nhật:</strong> (a + b) × 2 × c (Chu vi đáy × Chiều cao)</li>
              <li><strong>S toàn phần hộp chữ nhật:</strong> Sxq + (a × b × 2)</li>
              <li><strong>Thể tích Hộp Chữ Nhật:</strong> V = a × b × c (Dài × Rộng × Cao)</li>
              <li><strong>Thể tích Hình Lập Phương:</strong> V = a × a × a (Cạnh × Cạnh × Cạnh)</li>
              <li><strong>Đổi đơn vị đo:</strong> 1 m³ = 1000 dm³ = 1 000 000 cm³ = 1000 lít</li>
            </ul>
          </div>

          <!-- CARD 3: TOÁN CHUYỂN ĐỘNG ĐỀU -->
          <div class="handbook-card">
            <div class="handbook-card-title">🚗 3. Toán Chuyển Động Đều (s = v x t)</div>
            <ul class="handbook-list">
              <li><strong>Quãng đường:</strong> s = v × t (km hoặc m)</li>
              <li><strong>Vận tốc:</strong> v = s : t (km/h hoặc m/s)</li>
              <li><strong>Thời gian:</strong> t = s : v (giờ hoặc giây)</li>
              <li><strong>Hai xe đi NGƯỢC CHIỀU (Gặp nhau):</strong> t(gặp) = s : (v1 + v2)</li>
              <li><strong>Hai xe đi CÙNG CHIỀU (Đuổi kịp):</strong> t(đuổi) = s : (v1 - v2)</li>
            </ul>
          </div>

          <!-- CARD 4: TỈ SỐ PHẦN TRĂM -->
          <div class="handbook-card">
            <div class="handbook-card-title">📊 4. Tỉ Số Phần Trăm & Ứng Dụng Thực Tế</div>
            <ul class="handbook-list">
              <li><strong>Tìm tỉ số % của A và B:</strong> (A : B) × 100%</li>
              <li><strong>Tìm a% của số B:</strong> B × a : 100</li>
              <li><strong>Tìm số biết a% của nó là B:</strong> B : a × 100</li>
              <li><strong>Bài toán giảm giá x%:</strong> Giá mới = Giá gốc × (100% - x%) : 100</li>
              <li><strong>Bài toán tiền lãi:</strong> Tiền sau 1 năm = Tiền gửi + (Tiền gửi × Lãi suất %)</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================================
  // PHÂN HỆ MỚI: SÂN CHƠI DÂN GIAN Ô ĂN QUAN 🌾
  // Toán học dân gian Việt Nam rèn luyện tính nhẩm & chiến thuật
  // ========================================================
  openFolkGameModal() {
    this.sound.playClick();
    this.sound.speakVietnamese("Chào mừng bé Hà My đến Sân Chơi Dân Gian Ô Ăn Quan! Cùng tính toán nước đi rải quân nhé!");

    let modal = document.getElementById('campus-folk-game-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'campus-folk-game-modal';
      modal.className = 'campus-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="campus-modal-card folk-game-modal-card">
        <div class="folk-modal-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 36px;">🌾</span>
            <div>
              <h3 style="margin: 0; color: #fde047; font-size: 20px; font-weight: 800;">TRÒ CHƠI DÂN GIAN: Ô ĂN QUAN TRÍ TUỆ</h3>
              <span style="color: #cbd5e1; font-size: 13px;">Toán Học Dân Gian Việt Nam • Rèn Luyện Tính Nhẩm & Chiến Thuật</span>
            </div>
          </div>
          <button class="campus-modal-close" id="btn-close-folk-modal">✖</button>
        </div>

        <div style="background: rgba(0,0,0,0.25); border-radius: 14px; padding: 14px; margin-bottom: 14px; color: #fff; line-height: 1.6; font-size: 14px;">
          🌾 <strong>Luật Chơi Dân Gian & Vẻ Đẹp Toán Học:</strong><br>
          Bàn cờ gồm 2 ô Quan lớn ở hai đầu (mỗi ô có 1 viên Quan lớn tương đương 10 điểm dân) và 10 ô Dân hình chữ nhật xếp thành 2 hàng (mỗi ô có 5 viên sỏi nhỏ).
          Khi đến lượt, con bốc toàn bộ sỏi ở một ô Dân của mình rồi rải lần lượt từng viên theo chiều kim đồng hồ hoặc ngược chiều kim đồng hồ!
        </div>

        <div style="background: rgba(250,204,21,0.12); border: 2px dashed #facc15; border-radius: 14px; padding: 16px; margin-bottom: 16px;">
          <h4 style="margin: 0 0 10px 0; color: #fef08a; font-size: 16px;">❓ BÀI TOÁN TÍNH NHẨM DÂN GIAN:</h4>
          <p style="margin: 0 0 12px 0; color: #fff; font-size: 14px;">
            Ô Dân số 3 của Hà My đang có đúng <strong>5 viên sỏi</strong>. Hà My chọn rải <em>xuôi chiều kim đồng hồ</em>:
            viên thứ 1 vào ô 4, viên thứ 2 vào ô 5, viên thứ 3 vào ô Quan, viên thứ 4 vào ô 6, và viên thứ 5 vào ô 7.
            Nếu ô số 8 đang trống (không có sỏi) và ô số 9 có 8 viên sỏi, hỏi Hà My sẽ <strong>ăn được bao nhiêu viên sỏi</strong> theo luật "cách một ô trống"?
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <button class="folk-quiz-btn" data-correct="true">
              A. Ăn trọn 8 viên sỏi ở ô số 9! 🎯
            </button>
            <button class="folk-quiz-btn" data-correct="false">
              B. Không ăn được viên nào.
            </button>
            <button class="folk-quiz-btn" data-correct="false">
              C. Chỉ ăn được 1 viên sỏi.
            </button>
            <button class="folk-quiz-btn" data-correct="false">
              D. Bị mất lượt chơi.
            </button>
          </div>
        </div>

        <div id="folk-quiz-feedback" style="display: none; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 14px; text-align: center; margin-bottom: 14px;"></div>
      </div>
    `;

    modal.style.display = 'flex';
    const closeBtn = document.getElementById('btn-close-folk-modal');
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; };

    modal.querySelectorAll('.folk-quiz-btn').forEach(btn => {
      btn.onclick = () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        const fb = document.getElementById('folk-quiz-feedback');

        if (isCorrect) {
          this.sound.playCorrect();
          this.sound.playVictory();
          this.sound.playCoin();
          this.confetti.fire(70);

          if (this.economy) {
            this.economy.addCoins(15, 'Chiến thắng câu đố Ô Ăn Quan');
            this.economy.addStars(1);
            this.economy.addExp(20);
            this.updateCampusHUDCurrency();
          }

          if (fb) {
            fb.style.display = 'block';
            fb.style.background = '#065f46';
            fb.style.color = '#86efac';
            fb.innerHTML = `🎉 CHÍNH XÁC XUẤT SẮC! Theo luật Ô Ăn Quan: Viên sỏi cuối rơi vào ô 7, ô 8 trống kế tiếp thì người chơi được "ăn" toàn bộ sỏi ở ô 9 liền sau đó! Thưởng: +15 Xu 🪙, +1 Sao ⭐, +20 EXP ⚡!`;
          }
          setTimeout(() => { modal.style.display = 'none'; }, 2500);
        } else {
          this.sound.playWrong();
          if (fb) {
            fb.style.display = 'block';
            fb.style.background = '#991b1b';
            fb.style.color = '#fecaca';
            fb.innerHTML = `❌ Chưa chính xác! Bé hãy nhớ quy tắc: Nếu sau viên sỏi cuối cùng là 1 ô trống rồi đến 1 ô có sỏi thì con sẽ được ăn ô đó nhé!`;
          }
        }
      };
    });
  }
}

window.ChipGameEngine = ChipGameEngine;

// Khởi chạy khi load xong DOM
window.addEventListener('DOMContentLoaded', () => {
  window.chipApp = new ChipGameEngine();
  if (window.location.search.includes('streetview') || window.location.search.includes('mode=sv')) {
    setTimeout(() => {
      if (typeof window.openStreetView360 === 'function') window.openStreetView360(41);
    }, 600);
  }
});

// ============================================================
// [MOBILE-FIX] MODAL MANAGER: mo modal moi thi dong het modal cu,
// khoa HUD cam ung o phia sau khi co modal dang mo.
// ============================================================
window.ChipCloseAllModals = function () {
  document.querySelectorAll('.campus-modal-overlay, .modal-overlay').forEach(el => {
    el.style.display = 'none';
    el.classList.remove('active');
  });
  ['google-maps-fullscreen-modal', 'campus-story-quest-modal', 'streetview-360-viewport'].forEach(id => {
    const m = document.getElementById(id);
    if (m) { m.style.display = 'none'; m.classList.remove('active'); }
  });
  if (typeof window.ChipCloseMenu === 'function') window.ChipCloseMenu();
  document.body.classList.remove('chip-modal-open');
};

window.addEventListener('DOMContentLoaded', () => {
  const OPENERS = [
    'openQuestModal', 'openShopModal', 'openFishingModal', 'openCanteenModal',
    'openCoBaySnackShopModal', 'openLeaderboardModal', 'openCelestialQuestModal',
    'openMathClassroomModal', 'openFolkGameModal', 'openBotanicalQuizModal',
    'openHonorRollModal', 'openBunnySanctuaryModal', 'openVendingMachineModal',
    'openPhotoBoothModal', 'openReadingNookModal', 'openSoccerPenaltyMinigame',
    'openLibraryMemoryMinigame', 'openBossBattleMinigame', 'openEndlessQuizMode',
    'showVictoryModal'
  ];
  function wrapOpeners(target) {
    if (!target) return;
    OPENERS.forEach(name => {
      const orig = target[name];
      if (typeof orig === 'function' && !orig.__chipWrapped) {
        const wrapped = function (...args) {
          if (typeof window.ChipCloseAllModals === 'function') window.ChipCloseAllModals();
          const r = orig.apply(this, args);
          document.body.classList.add('chip-modal-open');
          return r;
        };
        wrapped.__chipWrapped = true;
        target[name] = wrapped;
      }
    });
  }
  // chipApp da duoc tao boi listener DOMContentLoaded dang ky truoc o tren
  wrapOpeners(window.chipApp);
  wrapOpeners(window.StoryQuestlineInstance);
  setTimeout(() => { wrapOpeners(window.chipApp); wrapOpeners(window.StoryQuestlineInstance); }, 1500);

  // Dong bo class khoa HUD: bat ky overlay nao dang hien thi deu khoa HUD
  function syncModalBodyClass() {
    let anyOpen = false;
    document.querySelectorAll('.campus-modal-overlay, .modal-overlay').forEach(el => {
      if (el.classList.contains('active') || (el.style.display && el.style.display !== 'none')) anyOpen = true;
    });
    ['google-maps-fullscreen-modal', 'campus-story-quest-modal'].forEach(id => {
      const m = document.getElementById(id);
      if (m && m.style.display && m.style.display !== 'none') anyOpen = true;
    });
    const sheet = document.getElementById('chip-menu-sheet');
    if (sheet && sheet.classList.contains('open')) anyOpen = true;
    document.body.classList.toggle('chip-modal-open', anyOpen);
  }
  const mo = new MutationObserver(syncModalBodyClass);
  mo.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'], subtree: true });
  syncModalBodyClass();
});
