# -*- coding: utf-8 -*-
import sys, re

# Read original data.js to get Grade 1 & 2 islands
with open('data.js', 'r', encoding='utf-8') as f:
    text = f.read()

matches = list(re.finditer(r'\{\s*\n\s*id:\s*"island-(\d+)"', text))
spans = []
for i in range(len(matches)):
    start = matches[i].start()
    end = matches[i+1].start() if i+1 < len(matches) else text.find('const PLAYER_RANKS = [')
    block = text[start:end].rstrip()
    block = re.sub(r'\]\s*;\s*(//.*)?$', '', block).rstrip()
    if block.endswith(','):
        block = block[:-1].rstrip()
    block = re.sub(r'\]\s*;\s*(//.*)?$', '', block).rstrip()
    spans.append(block)

# Grade 1 (Islands 1-4)
g1_blocks = spans[0:4]

# Grade 2 (Islands 5-8 transformed)
g2_blocks = []
for idx, b in enumerate(spans[4:8]):
    old_num = idx + 5
    new_num = idx + 1
    new_stars = idx * 4
    b_mod = re.sub(r'id:\s*"island-' + str(old_num) + '"', f'id: "g2-island-{new_num}"', b)
    b_mod = re.sub(r'islandNumber:\s*' + str(old_num), f'islandNumber: {new_num}', b_mod)
    b_mod = re.sub(r'requiredStars:\s*\d+', f'requiredStars: {new_stars}', b_mod)
    b_mod = re.sub(r'stage-' + str(old_num) + '-', f'g2-stage-{new_num}-', b_mod)
    g2_blocks.append(b_mod)

output = []
output.append("""// ==============================================================
// CHIP ENGLISH ADVENTURE - HỆ THỐNG DỮ LIỆU ĐA KHỐI LỚP (CURRICULUM DATABASE)
// Phân nhóm dữ liệu chuẩn: Lớp 1, Lớp 2 và Lớp 5 (Hà My 5C4)
// Sách giáo khoa & Sách bài tập bổ trợ chuẩn Global Success
// ==============================================================

// --------------------------------------------------------------
// KHỐI LỚP 1: BƯỚC KHỞI ĐẦU VUI NHỘN (PHONICS & CƠ BẢN)
// --------------------------------------------------------------
const GRADE_1_ISLANDS = [
""" + ",\n".join(g1_blocks) + """
];

const GRADE_1_RANKS = [
  { level: 1, minExp: 0, title: "Hạt Mầm Nhí 🌱", icon: "🌱", bonus: "Bắt đầu học tiếng Anh" },
  { level: 2, minExp: 40, title: "Bé Khám Phá 🌟", icon: "🌟", bonus: "Mở khóa Đảo Bánh Ngọt" },
  { level: 3, minExp: 90, title: "Bé Tinh Anh 🎈", icon: "🎈", bonus: "Mở khóa Đảo Màu Sắc" },
  { level: 4, minExp: 160, title: "Hiệp Sĩ Tí Hon 🛡️", icon: "🛡️", bonus: "Mở khóa Đảo Con Số" },
  { level: 5, minExp: 250, title: "Ngôi Sao Nhí ⭐", icon: "⭐", bonus: "Chăm chỉ vượt ải" },
  { level: 6, minExp: 360, title: "Thần Đồng Nhí 🏆", icon: "🏆", bonus: "Vươn tới đỉnh cao" },
  { level: 7, minExp: 490, title: "Dũng Sĩ Toàn Năng 👑", icon: "👑", bonus: "Bậc thầy tiếng Anh nhí" },
  { level: 8, minExp: 650, title: "Siêu Nhân Lớp 1 🚀", icon: "🚀", bonus: "Hoàn thành xuất sắc Lớp 1!" }
];

// --------------------------------------------------------------
// KHỐI LỚP 2: TỰ TIN KHÁM PHÁ (GIA ĐÌNH, ĐỒ VẬT, ĐỘNG VẬT)
// --------------------------------------------------------------
const GRADE_2_ISLANDS = [
""" + ",\n".join(g2_blocks) + """
];

const GRADE_2_RANKS = [
  { level: 1, minExp: 0, title: "Bé Vững Vàng 🦊", icon: "🦊", bonus: "Khởi động Lớp 2" },
  { level: 2, minExp: 40, title: "Thám Tử Nhí 🔍", icon: "🔍", bonus: "Mở khóa Đảo Thú Cưng" },
  { level: 3, minExp: 90, title: "Chiến Binh Từ Vựng ⚔️", icon: "⚔️", bonus: "Mở khóa Đảo Cơ Thể" },
  { level: 4, minExp: 160, title: "Nhà Thám Hiểm 🧭", icon: "🧭", bonus: "Mở khóa Đảo Đồ Chơi" },
  { level: 5, minExp: 250, title: "Ngôi Sao Tỏa Sáng ⭐", icon: "⭐", bonus: "Tiến bộ vượt bậc" },
  { level: 6, minExp: 360, title: "Thần Đồng Lớp 2 🏆", icon: "🏆", bonus: "Chinh phục bài tập khó" },
  { level: 7, minExp: 490, title: "Dũng Sĩ Tinh Anh 👑", icon: "👑", bonus: "Gần chạm đích vinh quang" },
  { level: 8, minExp: 650, title: "Thủ Khoa Lớp 2 🚀", icon: "🚀", bonus: "Hoàn thành xuất sắc Lớp 2!" }
];

// --------------------------------------------------------------
// KHỐI LỚP 5: CHƯƠNG TRÌNH HÀ MY 5C4 (SÁCH BÀI TẬP BỔ TRỢ GLOBAL SUCCESS)
// Trích xuất chuẩn xác 100% từ 19 ảnh bài tập SGK bổ trợ của bé Hà My
// Bao gồm: Hiện tại đơn (To be, V/V-s-es, Phủ định don't/doesn't, Nghi vấn Do/Does)
// và Unit 1: All about me (Từ vựng, cấu trúc, bài đọc Trúc, bài tập nâng cao)
// --------------------------------------------------------------
const GRADE_5_ISLANDS = [
  // ĐẢO 1: ĐỘNG TỪ TO BE & QUY TẮC ĐUÔI S/ES (Trang 1 - 3)
  {
    id: "g5-island-1",
    islandNumber: 1,
    name: "Đảo Hải Đăng To Be & Đuôi S/ES",
    title: "Present Simple: Động từ To Be (am/is/are) & Quy tắc đuôi S/ES (Trang 1 - 3)",
    theme: "forest",
    badge: "💡",
    skyColor: "linear-gradient(180deg, #38bdf8 0%, #e0f2fe 100%)",
    requiredStars: 0,
    stages: [
      {
        id: "g5-stage-1-1",
        number: 1,
        name: "Bắn Bóng To Be",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Bấm bóng chọn Am / Is / Are phù hợp",
        starsReward: 3
      },
      {
        id: "g5-stage-1-2",
        number: 2,
        name: "Xếp Chữ Động Từ Thêm S/ES",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Ghép đúng dạng động từ theo ngôi thứ 3",
        starsReward: 3
      },
      {
        id: "g5-stage-1-3",
        number: 3,
        name: "Thử Thách Trắc Nghiệm To Be (Bài B1)",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Hoàn thành 15 câu am/is/are từ SGK",
        starsReward: 4
      }
    ],
    words: [
      { id: "g5w1_1", word: "Watches", meaning: "Xem TV (watch -> watches /iz/)", icon: "📺", phonics: "W" },
      { id: "g5w1_2", word: "Finishes", meaning: "Hoàn thành (finish -> finishes /iz/)", icon: "🏁", phonics: "F" },
      { id: "g5w1_3", word: "Studies", meaning: "Học tập (study -> studies /z/)", icon: "📖", phonics: "S" },
      { id: "g5w1_4", word: "Teaches", meaning: "Dạy học (teach -> teaches /iz/)", icon: "👩‍🏫", phonics: "T" },
      { id: "g5w1_5", word: "Brushes", meaning: "Chải răng (brush -> brushes /iz/)", icon: "🪥", phonics: "B" },
      { id: "g5w1_6", word: "Flies", meaning: "Bay (fly -> flies /z/)", icon: "✈️", phonics: "F" }
    ],
    quizzes: [
      {
        question: "The cakes ______ so tasty.",
        situation: "Bài B1 - Câu 1 (SGK Trang 3):",
        targetPicture: "🧁",
        instruction: "Hà My chọn dạng đúng của động từ To Be:",
        options: [
          { text: "are", correct: true },
          { text: "is", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "'The cakes' là danh từ số nhiều (những chiếc bánh ngon) nên đi với 'are'!"
      },
      {
        question: "Her name ______ Jennifer.",
        situation: "Bài B1 - Câu 2 (SGK Trang 3):",
        targetPicture: "👧",
        instruction: "Hà My chọn động từ To Be:",
        options: [
          { text: "is", correct: true },
          { text: "are", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "'Her name' là danh từ số ít (tên của bạn ấy) nên đi với 'is'!"
      },
      {
        question: "The pens ______ on the table.",
        situation: "Bài B1 - Câu 3 (SGK Trang 3):",
        targetPicture: "🖊️",
        instruction: "Hà My chọn to be cho 'The pens':",
        options: [
          { text: "are", correct: true },
          { text: "is", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "'The pens' có đuôi 's' (những chiếc bút - số nhiều) nên đi với 'are'!"
      },
      {
        question: "I ______ a student.",
        situation: "Bài B1 - Câu 4 (SGK Trang 3):",
        targetPicture: "🎒",
        instruction: "Chọn to be cho chủ ngữ 'I':",
        options: [
          { text: "am", correct: true },
          { text: "is", correct: false },
          { text: "are", correct: false }
        ],
        explanation: "Chủ ngữ 'I' luôn đi với 'am' (I am a student)!"
      },
      {
        question: "My mother ______ a teacher.",
        situation: "Bài B1 - Câu 5 (SGK Trang 3):",
        targetPicture: "👩‍🏫",
        instruction: "Chọn to be cho 'My mother':",
        options: [
          { text: "is", correct: true },
          { text: "are", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "'My mother' (Mẹ của tôi) là ngôi thứ 3 số ít nên đi với 'is'!"
      },
      {
        question: "Kate's sisters ______ very pretty.",
        situation: "Bài B1 - Câu 6 (SGK Trang 3):",
        targetPicture: "👭",
        instruction: "Chọn to be cho 'Kate's sisters':",
        options: [
          { text: "are", correct: true },
          { text: "is", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "'Kate's sisters' là các chị em gái (danh từ số nhiều) nên đi với 'are'!"
      },
      {
        question: "You ______ my best friend.",
        situation: "Bài B1 - Câu 7 (SGK Trang 3):",
        targetPicture: "🤝",
        instruction: "Chọn to be cho 'You':",
        options: [
          { text: "are", correct: true },
          { text: "is", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "Chủ ngữ 'You' luôn đi cùng động từ to be 'are'!"
      },
      {
        question: "Are your parents at home? - No, they ______.",
        situation: "Bài B1 - Câu 8 (SGK Trang 3):",
        targetPicture: "🏡",
        instruction: "Chọn câu trả lời phủ định ngắn:",
        options: [
          { text: "aren't", correct: true },
          { text: "isn't", correct: false },
          { text: "am not", correct: false }
        ],
        explanation: "Chủ ngữ 'they' ở câu phủ định là 'No, they aren't'!"
      },
      {
        question: "Is it Monday today? - No, it ______.",
        situation: "Bài B1 - Câu 9 (SGK Trang 3):",
        targetPicture: "📅",
        instruction: "Chọn đáp án đúng:",
        options: [
          { text: "isn't", correct: true },
          { text: "aren't", correct: false },
          { text: "not", correct: false }
        ],
        explanation: "Hỏi 'Is it...?' trả lời phủ định là 'No, it isn't'!"
      },
      {
        question: "The books ______ interesting.",
        situation: "Bài B1 - Câu 10 (SGK Trang 3):",
        targetPicture: "📚",
        instruction: "Chọn to be cho 'The books':",
        options: [
          { text: "are", correct: true },
          { text: "is", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "'The books' là số nhiều nên đi với 'are'!"
      },
      {
        question: "Your cat ______ so cute.",
        situation: "Bài B1 - Câu 11 (SGK Trang 3):",
        targetPicture: "🐱",
        instruction: "Chọn to be cho 'Your cat':",
        options: [
          { text: "is", correct: true },
          { text: "are", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "'Your cat' (chú mèo của bạn) là số ít nên đi với 'is'!"
      },
      {
        question: "My brother ______ on holiday.",
        situation: "Bài B1 - Câu 12 (SGK Trang 3):",
        targetPicture: "🏖️",
        instruction: "Chọn to be cho 'My brother':",
        options: [
          { text: "is", correct: true },
          { text: "are", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "'My brother' là số ít nên đi với 'is'!"
      },
      {
        question: "Mary and Jane ______ at the park.",
        situation: "Bài B1 - Câu 13 (SGK Trang 3):",
        targetPicture: "🏞️",
        instruction: "Chọn to be cho 'Mary and Jane':",
        options: [
          { text: "are", correct: true },
          { text: "is", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "'Mary and Jane' là 2 người (số nhiều) nên đi với 'are'!"
      },
      {
        question: "My favorite color ______ blue.",
        situation: "Bài B1 - Câu 14 (SGK Trang 3):",
        targetPicture: "🎨",
        instruction: "Chọn to be cho 'My favorite color':",
        options: [
          { text: "is", correct: true },
          { text: "are", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "'My favorite color' (màu yêu thích của tôi) là số ít nên đi với 'is'!"
      },
      {
        question: "They ______ doctors.",
        situation: "Bài B1 - Câu 15 (SGK Trang 3):",
        targetPicture: "🩺",
        instruction: "Chọn to be cho 'They':",
        options: [
          { text: "are", correct: true },
          { text: "is", correct: false },
          { text: "am", correct: false }
        ],
        explanation: "Chủ ngữ 'They' (họ) là số nhiều nên đi với 'are'!"
      }
    ]
  },

  // ĐẢO 2: CÂU KHẲNG ĐỊNH & ĐỘNG TỪ THƯỜNG V / V(S/ES) (Trang 4 - 7)
  {
    id: "g5-island-2",
    islandNumber: 2,
    name: "Đảo Lâu Đài Khẳng Định & Động Từ Thường",
    title: "Present Simple: Câu khẳng định V / V(s/es) (Trang 4 - 7)",
    theme: "castle",
    badge: "🏰",
    skyColor: "linear-gradient(180deg, #a78bfa 0%, #ede9fe 100%)",
    requiredStars: 4,
    stages: [
      {
        id: "g5-stage-2-1",
        number: 1,
        name: "Nối Chủ Ngữ & Động Từ",
        type: "matching",
        icon: "🔗",
        targetDesc: "Nối chủ ngữ tương ứng với động từ chia đúng",
        starsReward: 3
      },
      {
        id: "g5-stage-2-2",
        number: 2,
        name: "Lật Thẻ Động Từ Biến Hình",
        type: "memory",
        icon: "🎴",
        targetDesc: "Ghép động từ nguyên mẫu và dạng thêm s/es",
        starsReward: 3
      },
      {
        id: "g5-stage-2-3",
        number: 3,
        name: "Đấu Trí Trắc Nghiệm Ngữ Pháp (Bài B5)",
        type: "quiz",
        icon: "🎯",
        targetDesc: "12 câu trắc nghiệm chuẩn 100% trang 5",
        starsReward: 4
      }
    ],
    words: [
      { id: "g5w2_1", word: "Walks", meaning: "Đi bộ (He walks to school)", icon: "🚶", phonics: "W" },
      { id: "g5w2_2", word: "Thinks", meaning: "Suy nghĩ (Paul thinks)", icon: "🤔", phonics: "T" },
      { id: "g5w2_3", word: "Tries", meaning: "Cố gắng (try -> tries)", icon: "💪", phonics: "T" },
      { id: "g5w2_4", word: "Tells", meaning: "Kể chuyện (Mum tells a fairy tale)", icon: "🧚", phonics: "T" },
      { id: "g5w2_5", word: "Waters", meaning: "Tưới cây (Mina waters flowers)", icon: "🌻", phonics: "W" },
      { id: "g5w2_6", word: "Writes", meaning: "Viết thư (Lisa writes a letter)", icon: "✉️", phonics: "W" }
    ],
    quizzes: [
      {
        question: "He usually ______ to school.",
        situation: "Bài B5 - Câu 1 (SGK Trang 5):",
        targetPicture: "🚶",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "walks", correct: true },
          { text: "walk", correct: false },
          { text: "walking", correct: false }
        ],
        explanation: "Chủ ngữ 'He' ở thì Hiện tại đơn, động từ thường thêm 's' -> 'walks'!"
      },
      {
        question: "Paul ______ of Daisy in Maths lesson.",
        situation: "Bài B5 - Câu 2 (SGK Trang 5):",
        targetPicture: "📐",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "thinks", correct: true },
          { text: "thinkes", correct: false },
          { text: "think", correct: false }
        ],
        explanation: "Paul là ngôi thứ 3 số ít, động từ 'think' chỉ thêm 's' -> 'thinks'!"
      },
      {
        question: "The baby ______ to reach his toes.",
        situation: "Bài B5 - Câu 3 (SGK Trang 5):",
        targetPicture: "👶",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "tries", correct: true },
          { text: "trys", correct: false },
          { text: "try", correct: false }
        ],
        explanation: "Động từ 'try' kết thúc bằng phụ âm + y, đổi 'y' thành 'ies' -> 'tries'!"
      },
      {
        question: "Mum ______ a fairy tale to her son.",
        situation: "Bài B5 - Câu 4 (SGK Trang 5):",
        targetPicture: "📖",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "tells", correct: true },
          { text: "tell", correct: false },
          { text: "teller", correct: false }
        ],
        explanation: "Mum là ngôi thứ 3 số ít, động từ thêm 's' -> 'tells'!"
      },
      {
        question: "Tim and Kim never ______ a contest.",
        situation: "Bài B5 - Câu 5 (SGK Trang 5):",
        targetPicture: "🏆",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "win", correct: true },
          { text: "wins", correct: false },
          { text: "wines", correct: false }
        ],
        explanation: "Tim and Kim là 2 người (chủ ngữ số nhiều) nên động từ giữ nguyên -> 'win'!"
      },
      {
        question: "Bobby ______ a bath.",
        situation: "Bài B5 - Câu 6 (SGK Trang 5):",
        targetPicture: "🛁",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "has", correct: true },
          { text: "haves", correct: false },
          { text: "have", correct: false }
        ],
        explanation: "Bobby là số ít, động từ đặc biệt 'have' chuyển thành 'has'!"
      },
      {
        question: "Linda ______ a song on a school contest.",
        situation: "Bài B5 - Câu 7 (SGK Trang 5):",
        targetPicture: "🎤",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "sings", correct: true },
          { text: "sing", correct: false },
          { text: "singers", correct: false }
        ],
        explanation: "Linda là ngôi thứ 3 số ít, động từ 'sing' thêm 's' -> 'sings'!"
      },
      {
        question: "Lucy ______ at herself in the mirror.",
        situation: "Bài B5 - Câu 8 (SGK Trang 5):",
        targetPicture: "🪞",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "looks", correct: true },
          { text: "look", correct: false },
          { text: "looked", correct: false }
        ],
        explanation: "Lucy là số ít, động từ thì Hiện tại đơn thêm 's' -> 'looks'!"
      },
      {
        question: "Mina ______ the flowers twice a week.",
        situation: "Bài B5 - Câu 9 (SGK Trang 5):",
        targetPicture: "🌻",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "waters", correct: true },
          { text: "water", correct: false },
          { text: "wateres", correct: false }
        ],
        explanation: "Mina là số ít, động từ 'water' (tưới cây) thêm 's' -> 'waters'!"
      },
      {
        question: "Nina ______ happy.",
        situation: "Bài B5 - Câu 10 (SGK Trang 5):",
        targetPicture: "😊",
        instruction: "Hà My chọn to be cho Nina:",
        options: [
          { text: "is", correct: true },
          { text: "am", correct: false },
          { text: "are", correct: false }
        ],
        explanation: "Nina là số ít, động từ to be là 'is' (Nina is happy)!"
      },
      {
        question: "Lisa ______ a letter to her friend.",
        situation: "Bài B5 - Câu 11 (SGK Trang 5):",
        targetPicture: "✉️",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "writes", correct: true },
          { text: "write", correct: false },
          { text: "writees", correct: false }
        ],
        explanation: "Lisa là số ít, động từ 'write' thêm 's' -> 'writes'!"
      },
      {
        question: "His mother ______ the newspaper.",
        situation: "Bài B5 - Câu 12 (SGK Trang 5):",
        targetPicture: "📰",
        instruction: "Hà My chọn đáp án đúng:",
        options: [
          { text: "reads", correct: true },
          { text: "read", correct: false },
          { text: "reading", correct: false }
        ],
        explanation: "His mother là ngôi thứ 3 số ít, động từ 'read' thêm 's' -> 'reads'!"
      }
    ]
  },

  // ĐẢO 3: CÂU PHỦ ĐỊNH & NGHI VẤN (Trang 8 - 14)
  {
    id: "g5-island-3",
    islandNumber: 3,
    name: "Đảo Thung Lũng Trợ Động Từ (Don't / Doesn't / Do / Does)",
    title: "Present Simple: Câu phủ định & nghi vấn (Trang 8 - 14)",
    theme: "desert",
    badge: "🏜️",
    skyColor: "linear-gradient(180deg, #f59e0b 0%, #fef3c7 100%)",
    requiredStars: 8,
    stages: [
      {
        id: "g5-stage-3-1",
        number: 1,
        name: "Bắn Bóng Trợ Động Từ",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Chọn Don't, Doesn't, Do, Does phù hợp",
        starsReward: 3
      },
      {
        id: "g5-stage-3-2",
        number: 2,
        name: "Xếp Chữ Trợ Động Từ",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Ghép chính xác từ DOES, DONT, DOESNT",
        starsReward: 3
      },
      {
        id: "g5-stage-3-3",
        number: 3,
        name: "Thử Thách Phủ Định & Nghi Vấn (Trang 8, 10, 13)",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Chinh phục câu hỏi và phủ định từ SGK",
        starsReward: 4
      }
    ],
    words: [
      { id: "g5w3_1", word: "DOES", meaning: "Trợ động từ số ít (He/She/It)", icon: "⚡", phonics: "D" },
      { id: "g5w3_2", word: "DONT", meaning: "Phủ định số nhiều (I/We/They don't)", icon: "🚫", phonics: "D" },
      { id: "g5w3_3", word: "DOESNT", meaning: "Phủ định số ít (He/She doesn't)", icon: "⛔", phonics: "D" },
      { id: "g5w3_4", word: "ISNT", meaning: "To be phủ định số ít (isn't)", icon: "❌", phonics: "I" },
      { id: "g5w3_5", word: "ARENT", meaning: "To be phủ định số nhiều (aren't)", icon: "⭕", phonics: "A" }
    ],
    quizzes: [
      {
        question: "Mark ______ like salad.",
        situation: "Bài 1 - Câu 1 (SGK Trang 8):",
        targetPicture: "🥗",
        instruction: "Hà My chọn trợ động từ phủ định:",
        options: [
          { text: "doesn't", correct: true },
          { text: "don't", correct: false },
          { text: "isn't", correct: false }
        ],
        explanation: "Mark là ngôi thứ 3 số ít nên dùng 'doesn't' + like!"
      },
      {
        question: "Bella ______ eat watermelon.",
        situation: "Bài 1 - Câu 2 (SGK Trang 8):",
        targetPicture: "🍉",
        instruction: "Hà My chọn trợ động từ phủ định:",
        options: [
          { text: "doesn't", correct: true },
          { text: "don't", correct: false },
          { text: "aren't", correct: false }
        ],
        explanation: "Bella là số ít nên đi với 'doesn't'!"
      },
      {
        question: "Mark and I ______ drink tea.",
        situation: "Bài 1 - Câu 3 (SGK Trang 8):",
        targetPicture: "🍵",
        instruction: "Hà My chọn dạng phủ định:",
        options: [
          { text: "don't", correct: true },
          { text: "doesn't", correct: false },
          { text: "not", correct: false }
        ],
        explanation: "Mark and I là 2 người (chúng tôi - số nhiều) nên dùng 'don't'!"
      },
      {
        question: "My mother ______ drink wine.",
        situation: "Bài 1 - Câu 4 (SGK Trang 8):",
        targetPicture: "🍷",
        instruction: "Hà My chọn trợ động từ phủ định:",
        options: [
          { text: "doesn't", correct: true },
          { text: "don't", correct: false },
          { text: "isn't", correct: false }
        ],
        explanation: "My mother là số ít nên dùng 'doesn't'!"
      },
      {
        question: "David and Nick ______ like peas.",
        situation: "Bài 1 - Câu 5 (SGK Trang 8):",
        targetPicture: "🫛",
        instruction: "Hà My chọn dạng phủ định:",
        options: [
          { text: "don't", correct: true },
          { text: "doesn't", correct: false },
          { text: "aren't", correct: false }
        ],
        explanation: "David and Nick là danh từ số nhiều nên dùng 'don't'!"
      },
      {
        question: "______ you like salad?",
        situation: "Bài 4 - Câu 1 (SGK Trang 10):",
        targetPicture: "🥗",
        instruction: "Hà My chọn trợ động từ để hỏi:",
        options: [
          { text: "Do", correct: true },
          { text: "Does", correct: false },
          { text: "Is", correct: false }
        ],
        explanation: "Chủ ngữ 'you' đi với trợ động từ nghi vấn 'Do' (Do you like salad?)!"
      },
      {
        question: "______ Paul like peas?",
        situation: "Bài 4 - Câu 2 (SGK Trang 10):",
        targetPicture: "🫛",
        instruction: "Hà My chọn trợ động từ hỏi:",
        options: [
          { text: "Does", correct: true },
          { text: "Do", correct: false },
          { text: "Is", correct: false }
        ],
        explanation: "Paul là ngôi thứ 3 số ít nên câu hỏi dùng 'Does'!"
      },
      {
        question: "______ they eat bananas?",
        situation: "Bài 4 - Câu 3 (SGK Trang 10):",
        targetPicture: "🍌",
        instruction: "Hà My chọn trợ động từ hỏi:",
        options: [
          { text: "Do", correct: true },
          { text: "Does", correct: false },
          { text: "Are", correct: false }
        ],
        explanation: "Chủ ngữ 'they' (họ) dùng trợ động từ câu hỏi 'Do'!"
      },
      {
        question: "______ your cat drink milk?",
        situation: "Bài 4 - Câu 5 (SGK Trang 10):",
        targetPicture: "🐱",
        instruction: "Hà My chọn trợ động từ hỏi:",
        options: [
          { text: "Does", correct: true },
          { text: "Do", correct: false },
          { text: "Is", correct: false }
        ],
        explanation: "Your cat (mèo của bạn) là số ít nên dùng 'Does'!"
      },
      {
        question: "______ the dog bark in the garden?",
        situation: "Bài 5 - Câu 1 (SGK Trang 10):",
        targetPicture: "🐶",
        instruction: "Hà My chọn trợ động từ hỏi:",
        options: [
          { text: "Does", correct: true },
          { text: "Do", correct: false },
          { text: "Are", correct: false }
        ],
        explanation: "The dog là số ít nên câu hỏi dùng 'Does the dog bark...?'!"
      },
      {
        question: "I am short. I ______ play basketball.",
        situation: "Bài 2 - Câu 3 (SGK Trang 8):",
        targetPicture: "🏀",
        instruction: "Hà My chọn dạng phủ định:",
        options: [
          { text: "don't", correct: true },
          { text: "doesn't", correct: false },
          { text: "am not", correct: false }
        ],
        explanation: "Chủ ngữ 'I' với động từ thường 'play' phủ định dùng 'don't'!"
      },
      {
        question: "______ your students speak English fluently?",
        situation: "Bài 5 - Câu 11 (SGK Trang 10):",
        targetPicture: "🗣️",
        instruction: "Hà My chọn trợ động từ hỏi:",
        options: [
          { text: "Do", correct: true },
          { text: "Does", correct: false },
          { text: "Is", correct: false }
        ],
        explanation: "Your students có 's' (các học sinh - số nhiều) nên dùng 'Do'!"
      }
    ]
  },

  // ĐẢO 4: UNIT 1 - ALL ABOUT ME (Trang 15 - 17)
  {
    id: "g5-island-4",
    islandNumber: 4,
    name: "Đảo Ngôi Làng Bản Thân (All About Me)",
    title: "Unit 1: All About Me - Từ vựng & Sở thích của Hà My (Trang 15 - 17)",
    theme: "candy",
    badge: "👧",
    skyColor: "linear-gradient(180deg, #ec4899 0%, #fdf2f8 100%)",
    requiredStars: 12,
    stages: [
      {
        id: "g5-stage-4-1",
        number: 1,
        name: "Nối Tranh & Từ Vựng Unit 1",
        type: "matching",
        icon: "🔗",
        targetDesc: "Nối tranh các con vật, món ăn với tên tiếng Anh",
        starsReward: 3
      },
      {
        id: "g5-stage-4-2",
        number: 2,
        name: "Xếp Chữ Thú Cưng & Món Ngon",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Đánh vần dolphin, peacock, chicken, noodles...",
        starsReward: 3
      },
      {
        id: "g5-stage-4-3",
        number: 3,
        name: "Bắn Bóng Khám Phá Sở Thích Unit 1",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Tìm nhanh từ vựng Unit 1 bay trong bóng",
        starsReward: 4
      }
    ],
    words: [
      { id: "g5w4_1", word: "Dolphin", meaning: "Cá heo (dolphin)", icon: "🐬", phonics: "D" },
      { id: "g5w4_2", word: "Peacock", meaning: "Con công (peacock)", icon: "🦚", phonics: "P" },
      { id: "g5w4_3", word: "Chicken", meaning: "Thịt gà (chicken)", icon: "🍗", phonics: "C" },
      { id: "g5w4_4", word: "Noodles", meaning: "Phở / Mì (Pho noodles)", icon: "🍜", phonics: "N" },
      { id: "g5w4_5", word: "Sandwich", meaning: "Bánh mì kẹp (sandwich)", icon: "🥪", phonics: "S" },
      { id: "g5w4_6", word: "Giraffe", meaning: "Hươu cao cổ (giraffe)", icon: "🦒", phonics: "G" },
      { id: "g5w4_7", word: "Pizza", meaning: "Bánh pizza (pizza)", icon: "🍕", phonics: "P" }
    ],
    quizzes: [
      {
        question: "Can you tell me about yourself? - My name is Ha My. I'm in class ______.",
        situation: "Giới thiệu thông tin (SGK Trang 16):",
        targetPicture: "👧",
        instruction: "Hà My chọn lớp học của mình nhé:",
        options: [
          { text: "5C4", correct: true },
          { text: "1A", correct: false },
          { text: "2B", correct: false }
        ],
        explanation: "Hà My học lớp 5C4 chăm ngoan và học giỏi!"
      },
      {
        question: "What is your favorite animal? - It's a ______.",
        situation: "Hỏi đáp sở thích (SGK Trang 16):",
        targetPicture: "🐬",
        instruction: "Hà My chọn con vật trong hình:",
        options: [
          { text: "dolphin", correct: true },
          { text: "peacock", correct: false },
          { text: "giraffe", correct: false }
        ],
        explanation: "Chú cá heo thông minh đọc là 'dolphin'!"
      },
      {
        question: "What is your favorite food? - It's ______.",
        situation: "Món ăn yêu thích (SGK Trang 16):",
        targetPicture: "🍗",
        instruction: "Hà My chọn tên món ăn:",
        options: [
          { text: "chicken", correct: true },
          { text: "sandwich", correct: false },
          { text: "pizza", correct: false }
        ],
        explanation: "Món thịt gà thơm ngon đọc là 'chicken'!"
      },
      {
        question: "Where were you yesterday? - I was at the ______ with my friends.",
        situation: "Hỏi địa điểm hôm qua (SGK Trang 16):",
        targetPicture: "🏞️",
        instruction: "Hà My chọn từ đúng:",
        options: [
          { text: "park", correct: true },
          { text: "supermarket", correct: false },
          { text: "zoo", correct: false }
        ],
        explanation: "Công viên trong tiếng Anh là 'park'!"
      },
      {
        question: "What is your favorite colour? - It's ______.",
        situation: "Màu sắc yêu thích (SGK Trang 16):",
        targetPicture: "🌸",
        instruction: "Hà My chọn màu hồng:",
        options: [
          { text: "pink", correct: true },
          { text: "blue", correct: false },
          { text: "yellow", correct: false }
        ],
        explanation: "Màu hồng đọc là 'pink'!"
      }
    ]
  },

  // ĐẢO 5: UNIT 1 - MẪU CÂU GIAO TIẾP & TRẮC NGHIỆM (Trang 16, 18, 21)
  {
    id: "g5-island-5",
    islandNumber: 5,
    name: "Đảo Khu Rừng Đối Thoại & Giao Tiếp",
    title: "Unit 1: Mẫu câu giao tiếp & Trắc nghiệm toàn diện (Trang 16, 18, 21)",
    theme: "beach",
    badge: "🏖️",
    skyColor: "linear-gradient(180deg, #14b8a6 0%, #ccfbf1 100%)",
    requiredStars: 16,
    stages: [
      {
        id: "g5-stage-5-1",
        number: 1,
        name: "Nối Câu Hỏi & Trả Lời (Bài 3 Trang 18)",
        type: "matching",
        icon: "🔗",
        targetDesc: "Nối câu hỏi với câu trả lời tương ứng từ bài tập SGK",
        starsReward: 3
      },
      {
        id: "g5-stage-5-2",
        number: 2,
        name: "Lật Thẻ Đối Thoại Thông Minh",
        type: "memory",
        icon: "🎴",
        targetDesc: "Ghi nhớ cặp câu hỏi & trả lời giao tiếp",
        starsReward: 3
      },
      {
        id: "g5-stage-5-3",
        number: 3,
        name: "Trắc Nghiệm Giao Tiếp Unit 1 (Bài 9 Trang 21)",
        type: "quiz",
        icon: "🎯",
        targetDesc: "11 câu trắc nghiệm chuẩn 100% trang 21",
        starsReward: 4
      }
    ],
    words: [
      { id: "g5w5_1", word: "Class 5C4", meaning: "Lớp 5C4 (Hà My)", icon: "🏫", phonics: "C" },
      { id: "g5w5_2", word: "City", meaning: "Thành phố lớn (big city)", icon: "🏙️", phonics: "C" },
      { id: "g5w5_3", word: "Town", meaning: "Thị trấn nhỏ (small town)", icon: "🏘️", phonics: "T" },
      { id: "g5w5_4", word: "Village", meaning: "Ngôi làng (small village)", icon: "🏡", phonics: "V" },
      { id: "g5w5_5", word: "Favorite", meaning: "Yêu thích nhất (favorite)", icon: "⭐", phonics: "F" }
    ],
    quizzes: [
      {
        question: "Where are you ______? - I'm from Vietnam.",
        situation: "Bài 9 - Câu 1 (SGK Trang 21):",
        targetPicture: "🇻🇳",
        instruction: "Hà My chọn từ điền vào chỗ trống:",
        options: [
          { text: "from", correct: true },
          { text: "street", correct: false },
          { text: "come", correct: false },
          { text: "lane", correct: false }
        ],
        explanation: "Cấu trúc hỏi quê hương/quốc tịch: 'Where are you from?'!"
      },
      {
        question: "Where ______ your grandparents ______?",
        situation: "Bài 9 - Câu 2 (SGK Trang 21):",
        targetPicture: "👴👵",
        instruction: "Hà My chọn dạng trợ động từ & động từ:",
        options: [
          { text: "do - live", correct: true },
          { text: "does - live", correct: false },
          { text: "do - lives", correct: false },
          { text: "does - lives", correct: false }
        ],
        explanation: "'Grandparents' (ông bà) là số nhiều nên dùng 'do' và V nguyên mẫu 'live'!"
      },
      {
        question: "He lives in a small ______.",
        situation: "Bài 9 - Câu 3 (SGK Trang 21):",
        targetPicture: "🏡",
        instruction: "Hà My chọn danh từ số ít đúng:",
        options: [
          { text: "village", correct: true },
          { text: "towers", correct: false },
          { text: "towns", correct: false },
          { text: "mountains", correct: false }
        ],
        explanation: "Sau mạo từ 'a small' cần 1 danh từ số ít -> 'village' (ngôi làng)!"
      },
      {
        question: "I live ______ my grandparents in a small town.",
        situation: "Bài 9 - Câu 4 (SGK Trang 21):",
        targetPicture: "👨‍👩‍👧",
        instruction: "Hà My chọn giới từ thích hợp:",
        options: [
          { text: "with", correct: true },
          { text: "in", correct: false },
          { text: "for", correct: false },
          { text: "at", correct: false }
        ],
        explanation: "Sống cùng với ai đó dùng 'live with' (live with my grandparents)!"
      },
      {
        question: "______ is your favorite ______? - It's purple.",
        situation: "Bài 9 - Câu 5 (SGK Trang 21):",
        targetPicture: "💜",
        instruction: "Hà My chọn từ hỏi và danh từ:",
        options: [
          { text: "What - colour", correct: true },
          { text: "When - colour", correct: false },
          { text: "How - colour", correct: false },
          { text: "Which - colour", correct: false }
        ],
        explanation: "Câu hỏi màu sắc yêu thích: 'What is your favorite colour?'!"
      },
      {
        question: "Hoa lives with her family in a big ______.",
        situation: "Bài 9 - Câu 6 (SGK Trang 21):",
        targetPicture: "🏙️",
        instruction: "Hà My chọn danh từ thích hợp:",
        options: [
          { text: "city", correct: true },
          { text: "cities", correct: false },
          { text: "towns", correct: false },
          { text: "class", correct: false }
        ],
        explanation: "Sau 'a big' là danh từ số ít -> 'city' (thành phố)!"
      },
      {
        question: "His ______ food is pizza and chicken.",
        situation: "Bài 9 - Câu 7 (SGK Trang 21):",
        targetPicture: "🍕",
        instruction: "Hà My chọn từ đúng:",
        options: [
          { text: "favorite", correct: true },
          { text: "like", correct: false },
          { text: "with", correct: false },
          { text: "of", correct: false }
        ],
        explanation: "'His favorite food' có nghĩa là 'Món ăn yêu thích của bạn ấy'!"
      },
      {
        question: "What does your ______ do? - He is a driver.",
        situation: "Bài 9 - Câu 8 (SGK Trang 21):",
        targetPicture: "🚗",
        instruction: "Hà My chọn nhân vật phù hợp với 'He':",
        options: [
          { text: "grandfather", correct: true },
          { text: "mother", correct: false },
          { text: "sister", correct: false },
          { text: "aunt", correct: false }
        ],
        explanation: "Câu trả lời là 'He' (ông/bác trai) nên chọn 'grandfather'!"
      },
      {
        question: "______ she work at a bank? - Yes, she does.",
        situation: "Bài 9 - Câu 9 (SGK Trang 21):",
        targetPicture: "🏦",
        instruction: "Hà My chọn trợ động từ đúng:",
        options: [
          { text: "Does", correct: true },
          { text: "Is", correct: false },
          { text: "Do", correct: false },
          { text: "Did", correct: false }
        ],
        explanation: "Chủ ngữ 'she' với động từ thường 'work', trả lời 'Yes, she does' -> dùng 'Does'!"
      },
      {
        question: "She lives in a big ______ of Vietnam.",
        situation: "Bài 9 - Câu 10 (SGK Trang 21):",
        targetPicture: "🏙️",
        instruction: "Hà My chọn danh từ số ít:",
        options: [
          { text: "city", correct: true },
          { text: "street", correct: false },
          { text: "villages", correct: false },
          { text: "lane", correct: false }
        ],
        explanation: "'in a big city of Vietnam' (ở 1 thành phố lớn của Việt Nam)!"
      },
      {
        question: "Where ______ your father work? - He works in a big hospital.",
        situation: "Bài 9 - Câu 11 (SGK Trang 21):",
        targetPicture: "🏥",
        instruction: "Hà My chọn trợ động từ đúng:",
        options: [
          { text: "does", correct: true },
          { text: "do", correct: false },
          { text: "did", correct: false },
          { text: "lives", correct: false }
        ],
        explanation: "'Your father' là ngôi thứ 3 số ít nên dùng trợ động từ 'does'!"
      }
    ]
  },

  // ĐẢO 6: ĐỌC HIỂU BẠN TRÚC & NGỮ PHÁP THỰC TẾ NÂNG CAO (Trang 19 - 21)
  {
    id: "g5-island-6",
    islandNumber: 6,
    name: "Đảo Đỉnh Núi Thần Đồng Hà My 5C4",
    title: "Đọc hiểu bạn Trúc, An Bình & 24 Câu Ngữ Pháp Thực Tế (Trang 19 - 21)",
    theme: "clock",
    badge: "👑",
    skyColor: "linear-gradient(180deg, #6366f1 0%, #e0e7ff 100%)",
    requiredStars: 20,
    stages: [
      {
        id: "g5-stage-6-1",
        number: 1,
        name: "Đọc Hiểu True/False (Trang 19)",
        type: "quiz",
        icon: "📖",
        targetDesc: "Đọc đoạn văn bạn Trúc và kiểm tra Đúng/Sai",
        starsReward: 3
      },
      {
        id: "g5-stage-6-2",
        number: 2,
        name: "Xếp Chữ Ngữ Pháp Thực Tế",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Ghép các từ quan trọng: EARTH, BOILS, BORROW",
        starsReward: 3
      },
      {
        id: "g5-stage-6-3",
        number: 3,
        name: "Đấu Trường Ngữ Pháp Đỉnh Cao 5C4",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Chinh phục các câu ngữ pháp thực tế trang 20",
        starsReward: 5
      }
    ],
    words: [
      { id: "g5w6_1", word: "Earth", meaning: "Trái Đất (The Earth goes around the Sun)", icon: "🌍", phonics: "E" },
      { id: "g5w6_2", word: "Boils", meaning: "Sôi ở 100 độ C (Water boils at 100 degrees)", icon: "♨️", phonics: "B" },
      { id: "g5w6_3", word: "Borrow", meaning: "Mượn sách (borrow books)", icon: "📚", phonics: "B" },
      { id: "g5w6_4", word: "Doctor", meaning: "Bác sĩ (He works in a hospital)", icon: "👨‍⚕️", phonics: "D" },
      { id: "g5w6_5", word: "Teacher", meaning: "Giáo viên (teach -> teaches)", icon: "👩‍🏫", phonics: "T" }
    ],
    quizzes: [
      {
        question: "Truc is from Da Nang.",
        situation: "Bài đọc bạn Trúc (SGK Trang 19):\n'My name is Truc. I'm from Vinh Phuc Province. I'm in class 5A...'",
        targetPicture: "📖",
        instruction: "Hà My xem câu trên là Đúng (TRUE) hay Sai (FALSE):",
        options: [
          { text: "FALSE", correct: true },
          { text: "TRUE", correct: false }
        ],
        explanation: "Trong bài viết: 'I'm from Vinh Phuc Province' chứ không phải Đà Nẵng -> FALSE!"
      },
      {
        question: "Truc lives in a small town.",
        situation: "Bài đọc bạn Trúc (SGK Trang 19):\n'...I live in a small town with my family. My town is small and quiet...'",
        targetPicture: "🏡",
        instruction: "Câu trên là Đúng (TRUE) hay Sai (FALSE):",
        options: [
          { text: "TRUE", correct: true },
          { text: "FALSE", correct: false }
        ],
        explanation: "Trong bài viết bạn nói: 'I live in a small town' -> TRUE!"
      },
      {
        question: "Her town is big and noisy.",
        situation: "Bài đọc bạn Trúc (SGK Trang 19):\n'...My town is small and quiet. It has a large and beautiful lake...'",
        targetPicture: "🏞️",
        instruction: "Câu trên là Đúng hay Sai:",
        options: [
          { text: "FALSE", correct: true },
          { text: "TRUE", correct: false }
        ],
        explanation: "Thị trấn nhỏ và yên bình ('small and quiet'), không phải 'big and noisy' -> FALSE!"
      },
      {
        question: "Truc is in class 5C.",
        situation: "Bài đọc bạn Trúc (SGK Trang 19):\n'...I'm in class 5A at Nguyen Dinh Chieu Primary School...'",
        targetPicture: "🏫",
        instruction: "Câu trên là Đúng hay Sai:",
        options: [
          { text: "FALSE", correct: true },
          { text: "TRUE", correct: false }
        ],
        explanation: "Bạn Trúc học lớp 5A (không phải lớp 5C) -> FALSE!"
      },
      {
        question: "Truc, Linh and Phong are best friends.",
        situation: "Bài đọc bạn Trúc (SGK Trang 19):\n'...Linh and Phong are my best friends. We go to the same school...'",
        targetPicture: "👭",
        instruction: "Câu trên là Đúng hay Sai:",
        options: [
          { text: "TRUE", correct: true },
          { text: "FALSE", correct: false }
        ],
        explanation: "Chính xác! Trúc, Linh và Phong là bạn thân của nhau -> TRUE!"
      },
      {
        question: "The Earth ______ around the Sun.",
        situation: "Bài 8 - Câu 18 (SGK Trang 20 - Sự thật hiển nhiên):",
        targetPicture: "🌍",
        instruction: "Hà My chọn dạng đúng của động từ 'go':",
        options: [
          { text: "goes", correct: true },
          { text: "go", correct: false },
          { text: "going", correct: false }
        ],
        explanation: "Trái Đất quay quanh Mặt Trời (chân lý tự nhiên), ngôi thứ 3 số ít chia 'goes'!"
      },
      {
        question: "Water ______ at 100 degrees centigrade.",
        situation: "Bài 8 - Câu 23 (SGK Trang 20 - Quy luật khoa học):",
        targetPicture: "♨️",
        instruction: "Hà My chọn dạng đúng của 'boil' (sôi):",
        options: [
          { text: "boils", correct: true },
          { text: "boil", correct: false },
          { text: "boiling", correct: false }
        ],
        explanation: "Nước sôi ở 100 độ C là quy luật tự nhiên, 'Water' không đếm được dùng 'boils'!"
      },
      {
        question: "My friend ______ swimming every weekend.",
        situation: "Bài 8 - Câu 1 (SGK Trang 20):",
        targetPicture: "🏊",
        instruction: "Hà My chọn dạng đúng của 'go':",
        options: [
          { text: "goes", correct: true },
          { text: "go", correct: false },
          { text: "went", correct: false }
        ],
        explanation: "'My friend' là số ít nên đi với 'goes swimming'!"
      },
      {
        question: "Julie ______ skiing.",
        situation: "Bài 8 - Câu 2 (SGK Trang 20):",
        targetPicture: "⛷️",
        instruction: "Hà My chọn dạng phủ định của 'not / like':",
        options: [
          { text: "doesn't like", correct: true },
          { text: "don't like", correct: false },
          { text: "isn't like", correct: false }
        ],
        explanation: "Julie là số ít nên phủ định thì Hiện tại đơn dùng 'doesn't like'!"
      },
      {
        question: "______ Emma talk to her parent?",
        situation: "Bài 8 - Câu 3 (SGK Trang 20):",
        targetPicture: "💬",
        instruction: "Hà My chọn trợ động từ nghi vấn:",
        options: [
          { text: "Does", correct: true },
          { text: "Do", correct: false },
          { text: "Is", correct: false }
        ],
        explanation: "Emma là ngôi thứ 3 số ít nên đặt câu hỏi với 'Does'!"
      },
      {
        question: "Tom always ______ books here.",
        situation: "Bài 8 - Câu 7 (SGK Trang 20):",
        targetPicture: "📚",
        instruction: "Hà My chọn dạng đúng của 'borrow':",
        options: [
          { text: "borrows", correct: true },
          { text: "borrow", correct: false },
          { text: "borrowes", correct: false }
        ],
        explanation: "Tom là ngôi thứ 3 số ít, động từ thêm 's' -> 'borrows'!"
      },
      {
        question: "We ______ morning exercise regularly.",
        situation: "Bài 8 - Câu 21 (SGK Trang 20):",
        targetPicture: "🏃",
        instruction: "Hà My chọn dạng phủ định của 'not / do':",
        options: [
          { text: "don't do", correct: true },
          { text: "doesn't do", correct: false },
          { text: "not do", correct: false }
        ],
        explanation: "Chủ ngữ 'We' dùng trợ động từ phủ định 'don't' + V nguyên mẫu 'do' -> 'don't do'!"
      }
    ]
  }
];

const GRADE_5_RANKS = [
  { level: 1, minExp: 0, title: "Học Sinh 5C4 Tập Sự 🥉", icon: "🥉", bonus: "Bắt đầu hành trình chinh phục SGK Lớp 5" },
  { level: 2, minExp: 50, title: "Kiện Tướng To Be 💡", icon: "💡", bonus: "Mở khóa Đảo Khẳng Định V/V(s/es)" },
  { level: 3, minExp: 110, title: "Chuyên Gia Động Từ 🏰", icon: "🏰", bonus: "Mở khóa Đảo Trợ Động Từ Don't/Doesn't" },
  { level: 4, minExp: 190, title: "Bậc Thầy Nghi Vấn 🏜️", icon: "🏜️", bonus: "Mở khóa Đảo All About Me - Sở Thích" },
  { level: 5, minExp: 290, title: "Ngôi Sao Unit 1 👧", icon: "👧", bonus: "Mở khóa Đảo Giao Tiếp & Đối Thoại" },
  { level: 6, minExp: 410, title: "Nhà Hùng Biện 5C4 🏖️", icon: "🏖️", bonus: "Mở khóa Đỉnh Núi Thần Đồng Ngữ Pháp" },
  { level: 7, minExp: 550, title: "Quán Quân Ngữ Pháp Tiểu Học 👑", icon: "👑", bonus: "Chinh phục 24 câu ngữ pháp chuyên sâu" },
  { level: 8, minExp: 720, title: "Thủ Khoa Tiếng Anh Hà My 5C4 🚀", icon: "🚀", bonus: "Xuất sắc hoàn thành xuất sắc toàn bộ SGK Lớp 5!" }
];

// --------------------------------------------------------------
// CẤU TRÚC DỮ LIỆU TỔNG HỢP TOÀN BỘ CÁC KHỐI LỚP (CURRICULUM_DATA)
// --------------------------------------------------------------
const CURRICULUM_DATA = {
  grade1: {
    gradeId: "grade1",
    gradeName: "Lớp 1 - Khởi Động Vui Nhộn",
    studentName: "Bé Lớp 1",
    avatar: "🐣",
    headerTitle: "🎒 GIÁO TRÌNH TIẾNG ANH LỚP 1 (SGK TIỂU HỌC)",
    headerSub: "Phát âm chữ cái (Phonics), từ vựng 3-4 chữ & nhận diện tranh vui nhộn!",
    islands: GRADE_1_ISLANDS,
    ranks: GRADE_1_RANKS
  },
  grade2: {
    gradeId: "grade2",
    gradeName: "Lớp 2 - Tự Tin Khám Phá",
    studentName: "Bé Lớp 2",
    avatar: "🦊",
    headerTitle: "📚 GIÁO TRÌNH TIẾNG ANH LỚP 2 (SGK TIỂU HỌC)",
    headerSub: "Chủ đề gia đình, trường học, bộ phận cơ thể & thế giới động vật xung quanh bé!",
    islands: GRADE_2_ISLANDS,
    ranks: GRADE_2_RANKS
  },
  grade5: {
    gradeId: "grade5",
    gradeName: "Lớp 5 - Hà My 5C4",
    studentName: "Hà My (5C4)",
    avatar: "👧",
    headerTitle: "👑 GIÁO TRÌNH LỚP 5 - BỔ TRỢ GLOBAL SUCCESS (HÀ MY 5C4)",
    headerSub: "Bám sát 100% giáo trình bổ trợ: Ngữ pháp thì Hiện tại đơn, trợ động từ & Unit 1 All About Me!",
    islands: GRADE_5_ISLANDS,
    ranks: GRADE_5_RANKS
  }
};

// Tương thích ngược với các biến toàn cục cũ
const ISLANDS_DATA = GRADE_5_ISLANDS;
const PLAYER_RANKS = GRADE_5_RANKS;
""")

full_js = "".join(output)
with open('data.js', 'w', encoding='utf-8') as f:
    f.write(full_js)

print("Generated new data.js successfully! Length:", len(full_js))
