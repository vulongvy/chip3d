// ==============================================================
// CHIP ENGLISH ADVENTURE - HỆ THỐNG DỮ LIỆU ĐA KHỐI LỚP (CURRICULUM DATABASE)
// Phân nhóm dữ liệu chuẩn: Lớp 1, Lớp 2 và Lớp 5 (Hà My 5C4)
// Sách giáo khoa & Sách bài tập bổ trợ chuẩn Global Success
// ==============================================================

// --------------------------------------------------------------
// KHỐI LỚP 1: BƯỚC KHỞI ĐẦU VUI NHỘN (PHONICS & CƠ BẢN)
// --------------------------------------------------------------
const GRADE_1_ISLANDS = [
{
    id: "island-1",
    islandNumber: 1,
    name: "Đảo Sân Trường Vui Nhộn",
    title: "Unit 1: In the playground (Chữ B)",
    theme: "forest",
    badge: "⚽",
    skyColor: "linear-gradient(180deg, #60a5fa 0%, #bae6fd 100%)",
    requiredStars: 0,
    stages: [
      {
        id: "stage-1-1",
        number: 1,
        name: "Bắn Bóng Bay",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Bấm nổ bong bóng đúng từ",
        starsReward: 3
      },
      {
        id: "stage-1-2",
        number: 2,
        name: "Xếp Chữ Tí Hon",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Ghép chữ cái 3-4 ký tự",
        starsReward: 3
      },
      {
        id: "stage-1-3",
        number: 3,
        name: "Nhìn Hình Đọc Chữ",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Đọc chữ chọn đúng đồ vật",
        starsReward: 4
      }
    ],
    words: [
      { id: "w1", word: "Ball", meaning: "Quả bóng", icon: "⚽", example: "A ball", phonics: "B" },
      { id: "w2", word: "Book", meaning: "Quyển sách", icon: "📚", example: "A book", phonics: "B" },
      { id: "w3", word: "Bike", meaning: "Xe đạp", icon: "🚲", example: "A bike", phonics: "B" },
      { id: "w4", word: "Boy", meaning: "Cậu bé", icon: "👦", example: "A boy", phonics: "B" },
      { id: "w5", word: "Bag", meaning: "Cái cặp", icon: "🎒", example: "A bag", phonics: "B" }
    ],
    quizzes: [
      {
        question: "What is this?",
        situation: "Bé nhìn đồ vật trong hình nhé:",
        targetPicture: "⚽",
        instruction: "Bé đọc chữ và bấm chọn tên đúng của đồ vật:",
        options: [
          { text: "A ball", correct: true },
          { text: "A book", correct: false },
          { text: "A bike", correct: false }
        ],
        explanation: "Quả bóng đọc là 'A ball'!"
      },
      {
        question: "What is this?",
        situation: "Đố bé đây là đồ dùng gì nè:",
        targetPicture: "📚",
        instruction: "Bé bấm chọn chữ đúng với quyển sách:",
        options: [
          { text: "A book", correct: true },
          { text: "A boy", correct: false },
          { text: "A bag", correct: false }
        ],
        explanation: "Quyển sách là 'A book'!"
      },
      {
        question: "Who is this?",
        situation: "Bạn nhỏ đáng yêu này là ai thế bé ơi?",
        targetPicture: "👦",
        instruction: "Bé chọn chữ chỉ cậu bé:",
        options: [
          { text: "A boy", correct: true },
          { text: "A bike", correct: false },
          { text: "A ball", correct: false }
        ],
        explanation: "Cậu bé đọc là 'A boy'!"
      }
    ]
  },
{
    id: "island-2",
    islandNumber: 2,
    name: "Đảo Bữa Tiệc Bánh Ngọt",
    title: "Unit 2: In the dining room (Chữ C)",
    theme: "candy",
    badge: "🎂",
    skyColor: "linear-gradient(180deg, #f472b6 0%, #fdf2f8 100%)",
    requiredStars: 4,
    stages: [
      {
        id: "stage-2-1",
        number: 1,
        name: "Nối Tranh & Chữ",
        type: "matching",
        icon: "🔗",
        targetDesc: "Nối hình với từ vựng đúng",
        starsReward: 3
      },
      {
        id: "stage-2-2",
        number: 2,
        name: "Bắt Chữ Cái Đầu",
        type: "phonics",
        icon: "🅰️",
        targetDesc: "Tìm chữ cái bắt đầu",
        starsReward: 3
      },
      {
        id: "stage-2-3",
        number: 3,
        name: "Thử Thách Món Ngon",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Nhìn hình chọn món ăn",
        starsReward: 4
      }
    ],
    words: [
      { id: "w6", word: "Cat", meaning: "Con mèo", icon: "🐱", example: "A cat", phonics: "C" },
      { id: "w7", word: "Car", meaning: "Xe ô tô", icon: "🚗", example: "A car", phonics: "C" },
      { id: "w8", word: "Cake", meaning: "Bánh kem", icon: "🎂", example: "A cake", phonics: "C" },
      { id: "w9", word: "Cup", meaning: "Cái cốc", icon: "🥛", example: "A cup", phonics: "C" }
    ],
    quizzes: [
      {
        question: "What's this?",
        situation: "Món bánh sinh nhật thơm ngon:",
        targetPicture: "🎂",
        instruction: "Bé chọn từ đúng với hình bánh kem:",
        options: [
          { text: "A cake", correct: true },
          { text: "A cup", correct: false },
          { text: "A car", correct: false }
        ],
        explanation: "Bánh kem đọc là 'A cake'!"
      },
      {
        question: "What's this?",
        situation: "Bạn mèo kêu meo meo nè:",
        targetPicture: "🐱",
        instruction: "Bé bấm chọn chữ chỉ chú mèo:",
        options: [
          { text: "A cat", correct: true },
          { text: "A car", correct: false },
          { text: "A cup", correct: false }
        ],
        explanation: "Con mèo đọc là 'A cat'!"
      },
      {
        question: "What is this?",
        situation: "Chiếc xe ô tô đang chạy xình xịch:",
        targetPicture: "🚗",
        instruction: "Xe ô tô tiếng Anh là chữ nào bé nhỉ?",
        options: [
          { text: "A car", correct: true },
          { text: "A cat", correct: false },
          { text: "A cake", correct: false }
        ],
        explanation: "Xe ô tô đọc là 'A car'!"
      }
    ]
  },
{
    id: "island-3",
    islandNumber: 3,
    name: "Đảo Màu Sắc Rực Rỡ",
    title: "Unit 3: Colors (Màu Sắc)",
    theme: "desert",
    badge: "🎨",
    skyColor: "linear-gradient(180deg, #f59e0b 0%, #fef3c7 100%)",
    requiredStars: 10,
    stages: [
      {
        id: "stage-3-1",
        number: 1,
        name: "Lật Thẻ Sắc Màu",
        type: "memory",
        icon: "🎴",
        targetDesc: "Màu đỏ, xanh, vàng",
        starsReward: 3
      },
      {
        id: "stage-3-2",
        number: 2,
        name: "Bắn Bong Bóng Màu",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Bắn nổ bóng màu sắc",
        starsReward: 3
      },
      {
        id: "stage-3-3",
        number: 3,
        name: "Pha Màu Thần Kỳ",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Chọn đúng tên màu sắc",
        starsReward: 4
      }
    ],
    words: [
      { id: "w10", word: "Red", meaning: "Màu đỏ", icon: "🔴", example: "It is red", phonics: "R" },
      { id: "w11", word: "Blue", meaning: "Màu xanh dương", icon: "🔵", example: "It is blue", phonics: "B" },
      { id: "w12", word: "Green", meaning: "Màu xanh lá", icon: "🟢", example: "It is green", phonics: "G" },
      { id: "w13", word: "Yellow", meaning: "Màu vàng", icon: "🟡", example: "It is yellow", phonics: "Y" }
    ],
    quizzes: [
      {
        question: "What color is it?",
        situation: "Trái tim màu đỏ rực rỡ:",
        targetPicture: "🔴",
        instruction: "Bé chọn chữ chỉ màu đỏ:",
        options: [
          { text: "Red", correct: true },
          { text: "Blue", correct: false },
          { text: "Yellow", correct: false }
        ],
        explanation: "Màu đỏ đọc là 'Red'!"
      },
      {
        question: "What color is the sky?",
        situation: "Bầu trời xanh ngắt nè:",
        targetPicture: "🔵",
        instruction: "Bé chọn chữ chỉ màu xanh dương:",
        options: [
          { text: "Blue", correct: true },
          { text: "Red", correct: false },
          { text: "Green", correct: false }
        ],
        explanation: "Màu xanh dương là 'Blue'!"
      },
      {
        question: "What color is the leaf?",
        situation: "Chiếc lá cây màu xanh:",
        targetPicture: "🟢",
        instruction: "Bé chọn chữ chỉ màu xanh lá:",
        options: [
          { text: "Green", correct: true },
          { text: "Yellow", correct: false },
          { text: "Red", correct: false }
        ],
        explanation: "Màu xanh lá cây là 'Green'!"
      }
    ]
  },
{
    id: "island-4",
    islandNumber: 4,
    name: "Đảo Con Số Tí Hon",
    title: "Unit 4: Numbers (Đếm Số 1 - 5)",
    theme: "snow",
    badge: "🔢",
    skyColor: "linear-gradient(180deg, #38bdf8 0%, #e0f2fe 100%)",
    requiredStars: 18,
    stages: [
      {
        id: "stage-4-1",
        number: 1,
        name: "Nối Số & Đồ Vật",
        type: "matching",
        icon: "🔗",
        targetDesc: "Nối số đếm với chữ",
        starsReward: 3
      },
      {
        id: "stage-4-2",
        number: 2,
        name: "Xếp Chữ Số Đếm",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Ghép: One, Two, Three",
        starsReward: 3
      },
      {
        id: "stage-4-3",
        number: 3,
        name: "Bé Làm Toán Nhí",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Đếm số lượng đồ vật",
        starsReward: 5
      }
    ],
    words: [
      { id: "w14", word: "One", meaning: "Số 1", icon: "1️⃣", example: "One ball", phonics: "O" },
      { id: "w15", word: "Two", meaning: "Số 2", icon: "2️⃣", example: "Two cats", phonics: "T" },
      { id: "w16", word: "Three", meaning: "Số 3", icon: "3️⃣", example: "Three books", phonics: "T" },
      { id: "w17", word: "Four", meaning: "Số 4", icon: "4️⃣", example: "Four cars", phonics: "F" },
      { id: "w18", word: "Five", meaning: "Số 5", icon: "5️⃣", example: "Five apples", phonics: "F" }
    ],
    quizzes: [
      {
        question: "How many cats?",
        situation: "Có 2 chú mèo đang chơi nè: 🐱 🐱",
        targetPicture: "🐱🐱",
        instruction: "Bé đếm xem có mấy bạn mèo?",
        options: [
          { text: "Two", correct: true },
          { text: "One", correct: false },
          { text: "Three", correct: false }
        ],
        explanation: "Có 2 chú mèo đọc là: 'Two'!"
      },
      {
        question: "How many balls?",
        situation: "Bé đếm bóng giúp bạn nhé: ⚽ ⚽ ⚽",
        targetPicture: "⚽⚽⚽",
        instruction: "Có mấy quả bóng đây?",
        options: [
          { text: "Three", correct: true },
          { text: "Two", correct: false },
          { text: "Four", correct: false }
        ],
        explanation: "Có 3 quả bóng là 'Three'!"
      },
      {
        question: "How many books?",
        situation: "Chỉ có duy nhất 1 quyển sách: 📚",
        targetPicture: "📚",
        instruction: "Bé chọn chữ chỉ số 1:",
        options: [
          { text: "One", correct: true },
          { text: "Two", correct: false },
          { text: "Five", correct: false }
        ],
        explanation: "Số 1 là 'One'!"
      }
    ]
  }
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
{
    id: "g2-island-1",
    islandNumber: 1,
    name: "Đảo Gia Đình Yêu Thương",
    title: "Unit 5: My Family (Gia Đình Bé)",
    theme: "castle",
    badge: "🏡",
    skyColor: "linear-gradient(180deg, #c084fc 0%, #fae8ff 100%)",
    requiredStars: 0,
    stages: [
      {
        id: "g2-stage-1-1",
        number: 1,
        name: "Lật Thẻ Người Thân",
        type: "memory",
        icon: "🎴",
        targetDesc: "Bố, mẹ, em bé",
        starsReward: 3
      },
      {
        id: "g2-stage-1-2",
        number: 2,
        name: "Bắn Bong Bóng Gia Đình",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Bắn bóng Dad, Mom, Baby",
        starsReward: 3
      },
      {
        id: "g2-stage-1-3",
        number: 3,
        name: "Album Ảnh Của Bé",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Đọc chữ chọn người thân",
        starsReward: 5
      }
    ],
    words: [
      { id: "w19", word: "Dad", meaning: "Bố / Ba", icon: "👨", example: "My dad", phonics: "D" },
      { id: "w20", word: "Mom", meaning: "Mẹ", icon: "👩", example: "My mom", phonics: "M" },
      { id: "w21", word: "Baby", meaning: "Em bé", icon: "👶", example: "A baby", phonics: "B" }
    ],
    quizzes: [
      {
        question: "This is my mom.",
        situation: "Người mẹ dịu dàng của bé:",
        targetPicture: "👩",
        instruction: "Bé chọn chữ chỉ người mẹ:",
        options: [
          { text: "Mom", correct: true },
          { text: "Dad", correct: false },
          { text: "Baby", correct: false }
        ],
        explanation: "Người mẹ là 'Mom'!"
      },
      {
        question: "This is my dad.",
        situation: "Người cha thân yêu:",
        targetPicture: "👨",
        instruction: "Bé chọn chữ chỉ người cha:",
        options: [
          { text: "Dad", correct: true },
          { text: "Mom", correct: false },
          { text: "Baby", correct: false }
        ],
        explanation: "Người cha là 'Dad'!"
      },
      {
        question: "Look at the cute baby!",
        situation: "Em bé tí hon đang cười toe toét:",
        targetPicture: "👶",
        instruction: "Bé chọn chữ chỉ em bé:",
        options: [
          { text: "Baby", correct: true },
          { text: "Dad", correct: false },
          { text: "Mom", correct: false }
        ],
        explanation: "Em bé là 'Baby'!"
      }
    ]
  },
{
    id: "g2-island-2",
    islandNumber: 2,
    name: "Đảo Thú Cưng Đáng Yêu",
    title: "Unit 6: Animals (Các Bạn Thú Cưng)",
    theme: "beach",
    badge: "🐶",
    skyColor: "linear-gradient(180deg, #2dd4bf 0%, #ccfbf1 100%)",
    requiredStars: 4,
    stages: [
      {
        id: "g2-stage-2-1",
        number: 1,
        name: "Nối Tranh Con Vật",
        type: "matching",
        icon: "🔗",
        targetDesc: "Nối hình chó, mèo, vịt",
        starsReward: 3
      },
      {
        id: "g2-stage-2-2",
        number: 2,
        name: "Bắt Chữ Cái Con Vật",
        type: "phonics",
        icon: "🅰️",
        targetDesc: "Tìm chữ cái bắt đầu",
        starsReward: 3
      },
      {
        id: "g2-stage-2-3",
        number: 3,
        name: "Tiếng Kêu Con Vật",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Đọc tên đúng của bạn thú",
        starsReward: 5
      }
    ],
    words: [
      { id: "w22", word: "Dog", meaning: "Con chó", icon: "🐶", example: "A dog", phonics: "D" },
      { id: "w23", word: "Cat", meaning: "Con mèo", icon: "🐱", example: "A cat", phonics: "C" },
      { id: "w24", word: "Bird", meaning: "Con chim", icon: "🐦", example: "A bird", phonics: "B" },
      { id: "w25", word: "Fish", meaning: "Con cá", icon: "🐟", example: "A fish", phonics: "F" },
      { id: "w26", word: "Duck", meaning: "Con vịt", icon: "🦆", example: "A duck", phonics: "D" }
    ],
    quizzes: [
      {
        question: "Woof woof! What is this?",
        situation: "Chú cún con vẫy đuôi mừng bé:",
        targetPicture: "🐶",
        instruction: "Bé chọn chữ chỉ chú cún con:",
        options: [
          { text: "A dog", correct: true },
          { text: "A duck", correct: false },
          { text: "A fish", correct: false }
        ],
        explanation: "Con chó là 'A dog'!"
      },
      {
        question: "Quack quack! What is this?",
        situation: "Bạn vịt đang bơi dưới nước:",
        targetPicture: "🦆",
        instruction: "Bé chọn chữ chỉ con vịt:",
        options: [
          { text: "A duck", correct: true },
          { text: "A bird", correct: false },
          { text: "A dog", correct: false }
        ],
        explanation: "Con vịt là 'A duck'!"
      },
      {
        question: "Swim swim! What is this?",
        situation: "Chú cá nhỏ bơi lội tung tăng:",
        targetPicture: "🐟",
        instruction: "Bé chọn chữ chỉ chú cá:",
        options: [
          { text: "A fish", correct: true },
          { text: "A cat", correct: false },
          { text: "A bird", correct: false }
        ],
        explanation: "Con cá là 'A fish'!"
      }
    ]
  },
{
    id: "g2-island-3",
    islandNumber: 3,
    name: "Đảo Cơ Thể Bé Khỏe",
    title: "Unit 7: Body Parts (Bộ Phận Cơ Thể)",
    theme: "toy",
    badge: "👃",
    skyColor: "linear-gradient(180deg, #fb923c 0%, #ffedd5 100%)",
    requiredStars: 8,
    stages: [
      {
        id: "g2-stage-3-1",
        number: 1,
        name: "Bắn Bóng Phản Xạ",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Bắn bóng từ vựng cơ thể",
        starsReward: 3
      },
      {
        id: "g2-stage-3-2",
        number: 2,
        name: "Xếp Chữ Eye & Nose",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Ghép chữ bộ phận",
        starsReward: 3
      },
      {
        id: "g2-stage-3-3",
        number: 3,
        name: "Chỉ Đúng Bộ Phận",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Nhìn hình chọn tên bộ phận",
        starsReward: 5
      }
    ],
    words: [
      { id: "w27", word: "Eye", meaning: "Mắt", icon: "👁️", example: "An eye", phonics: "E" },
      { id: "w28", word: "Nose", meaning: "Mũi", icon: "👃", example: "A nose", phonics: "N" },
      { id: "w29", word: "Ear", meaning: "Tai", icon: "👂", example: "An ear", phonics: "E" },
      { id: "w30", word: "Hand", meaning: "Bàn tay", icon: "✋", example: "A hand", phonics: "H" }
    ],
    quizzes: [
      {
        question: "Touch your nose!",
        situation: "Chiếc mũi xinh xắn của bé nè:",
        targetPicture: "👃",
        instruction: "Bé chọn chữ chỉ chiếc mũi:",
        options: [
          { text: "Nose", correct: true },
          { text: "Eye", correct: false },
          { text: "Ear", correct: false }
        ],
        explanation: "Chiếc mũi là 'Nose'!"
      },
      {
        question: "Open your eyes!",
        situation: "Đôi mắt sáng lấp lánh:",
        targetPicture: "👁️",
        instruction: "Bé chọn chữ chỉ đôi mắt:",
        options: [
          { text: "Eye", correct: true },
          { text: "Hand", correct: false },
          { text: "Nose", correct: false }
        ],
        explanation: "Mắt là 'Eye'!"
      },
      {
        question: "Clap your hands!",
        situation: "Bàn tay vỗ bôm bốp vui tai:",
        targetPicture: "✋",
        instruction: "Bé chọn chữ chỉ bàn tay:",
        options: [
          { text: "Hand", correct: true },
          { text: "Ear", correct: false },
          { text: "Nose", correct: false }
        ],
        explanation: "Bàn tay là 'Hand'!"
      }
    ]
  },
{
    id: "g2-island-4",
    islandNumber: 4,
    name: "Đảo Hộp Quà Đồ Chơi",
    title: "Unit 8: Toys (Vương Quốc Đồ Chơi)",
    theme: "clock",
    badge: "🧸",
    skyColor: "linear-gradient(180deg, #818cf8 0%, #312e81 100%)",
    requiredStars: 12,
    stages: [
      {
        id: "g2-stage-4-1",
        number: 1,
        name: "Nối Cặp Đồ Chơi",
        type: "matching",
        icon: "🔗",
        targetDesc: "Nối hình với chữ",
        starsReward: 4
      },
      {
        id: "g2-stage-4-2",
        number: 2,
        name: "Bắt Chữ Mở Rương",
        type: "phonics",
        icon: "🅰️",
        targetDesc: "Tìm chữ cái bắt đầu",
        starsReward: 4
      },
      {
        id: "g2-stage-4-3",
        number: 3,
        name: "Mở Rương Đồ Chơi",
        type: "quiz",
        icon: "🎯",
        targetDesc: "Đại chiến tốt nghiệp Lớp 1-2",
        starsReward: 6
      }
    ],
    words: [
      { id: "w31", word: "Car", meaning: "Ô tô", icon: "🚗", example: "A toy car", phonics: "C" },
      { id: "w32", word: "Ball", meaning: "Quả bóng", icon: "⚽", example: "A ball", phonics: "B" },
      { id: "w33", word: "Doll", meaning: "Búp bê", icon: "🪆", example: "A doll", phonics: "D" },
      { id: "w34", word: "Kite", meaning: "Con diều", icon: "🪁", example: "A kite", phonics: "K" },
      { id: "w35", word: "Bear", meaning: "Gấu bông", icon: "🧸", example: "A teddy bear", phonics: "B" }
    ],
    quizzes: [
      {
        question: "What toy is this?",
        situation: "Chú gấu bông mềm mịn:",
        targetPicture: "🧸",
        instruction: "Bé chọn chữ chỉ chú gấu bông:",
        options: [
          { text: "A bear", correct: true },
          { text: "A doll", correct: false },
          { text: "A kite", correct: false }
        ],
        explanation: "Gấu bông là 'A bear'!"
      },
      {
        question: "Fly high in the sky!",
        situation: "Cánh diều bay cao trong gió:",
        targetPicture: "🪁",
        instruction: "Bé chọn chữ chỉ cánh diều:",
        options: [
          { text: "A kite", correct: true },
          { text: "A car", correct: false },
          { text: "A ball", correct: false }
        ],
        explanation: "Cánh diều là 'A kite'!"
      },
      {
        question: "A pretty toy for you!",
        situation: "Cô búp bê mặc váy hoa xinh xắn:",
        targetPicture: "🪆",
        instruction: "Bé chọn chữ chỉ búp bê:",
        options: [
          { text: "A doll", correct: true },
          { text: "A ball", correct: false },
          { text: "A car", correct: false }
        ],
        explanation: "Búp bê là 'A doll'!"
      }
    ]
  }
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
      { id: "g5w1_1", word: "Watches", meaning: "Xem TV", icon: "📺", phonics: "W" },
      { id: "g5w1_2", word: "Finishes", meaning: "Hoàn thành", icon: "🏁", phonics: "F" },
      { id: "g5w1_3", word: "Studies", meaning: "Học tập", icon: "📖", phonics: "S" },
      { id: "g5w1_4", word: "Teaches", meaning: "Dạy học", icon: "👩‍🏫", phonics: "T" },
      { id: "g5w1_5", word: "Brushes", meaning: "Chải răng", icon: "🪥", phonics: "B" },
      { id: "g5w1_6", word: "Flies", meaning: "Bay", icon: "✈️", phonics: "F" }
    ],
    quizzes: [
      {
        question: "The cakes ______ so tasty.",
        teacherIntro: "Hà My ơi, con hãy nhìn thật kỹ danh từ 'The cakes' đứng trước chỗ trống nhé! Xem đây là 1 chiếc bánh hay nhiều chiếc bánh nào?",
        teacherPraise: "Quá giỏi luôn Hà My 5C4! Con nhận ra ngay 'The cakes' có đuôi -s là danh từ số nhiều!",
        teacherExplanation: "Trong tiếng Anh, danh từ số nhiều 'The cakes' (những chiếc bánh ngọt) tương đương với đại từ 'They', nên động từ To Be bắt buộc phải là 'are'. Nếu chỉ có 1 chiếc bánh 'The cake' thì ta mới dùng 'is' con nhé!",
        teacherCorrection: "Chưa đúng rồi con ơi! Bẫy ở đây là từ 'cakes' có đuôi 's' ở cuối, tức là nhiều chiếc bánh (danh từ số nhiều). Danh từ số nhiều thì phải đi với 'are', không được dùng 'is' hay 'am' đâu nhé!",
        vietnameseTranslation: "Những chiếc bánh này thật là thơm ngon.",
        grammarTrap: "Bẫy lớp 5: Quên nhìn đuôi -s của danh từ số nhiều, tưởng nhầm là số ít và chọn 'is'.",
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
        teacherIntro: "Ở câu số 2, chủ ngữ là 'Her name' (tên của bạn ấy). Con thử suy nghĩ xem 'tên' là số ít hay số nhiều nào?",
        teacherPraise: "Chính xác tuyệt đối! 'Her name' là 1 cái tên riêng (danh từ số ít) nên đi với 'is' là chuẩn 100%!",
        teacherExplanation: "Chủ ngữ 'Her name' (Tên của cô ấy) là danh từ số ít ở ngôi thứ ba, nên động từ To Be ở hiện tại đơn là 'is'. Rất nhiều bạn nhìn thấy 'Her' lại tưởng nhầm nhưng thực chất danh từ chính là 'name' nhé!",
        teacherCorrection: "Suýt đúng rồi con ơi! Chú ý nhé: Mặc dù có từ 'Her' (của cô ấy), nhưng chủ ngữ chính là 'name' (tên - số ít). Tên của một người là số ít nên ta phải dùng 'is', không dùng 'are' con nhé!",
        vietnameseTranslation: "Tên của bạn ấy là Jennifer.",
        grammarTrap: "Bẫy: Nhầm lẫn tính từ sở hữu 'Her' với số nhiều. Danh từ chính ở đây là 'name' (số ít).",
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
        teacherIntro: "Hà My quan sát xem: trên bàn có 1 chiếc bút hay nhiều chiếc bút qua từ 'The pens' nhé!",
        teacherPraise: "Tuyệt vời! 'The pens' có đuôi -s rõ ràng là số nhiều nên đi với 'are' hoàn toàn chuẩn xác!",
        teacherExplanation: "'The pens' là danh từ số nhiều (những chiếc bút mực). Quy tắc vàng của lớp 5: Danh từ số nhiều luôn đi với To Be là 'are' ở thì hiện tại đơn.",
        teacherCorrection: "Chưa chính xác rồi con gái ơi! Con nhìn kỹ từ 'pens' có chữ 's' ở đuôi kìa. Đó là những chiếc bút (số nhiều), vì vậy phải dùng 'are', con đừng chọn 'is' nhé!",
        vietnameseTranslation: "Những chiếc bút mực đang ở trên bàn.",
        grammarTrap: "Bẫy: Bỏ quên đuôi -s ở danh từ chỉ đồ vật.",
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
        teacherIntro: "Câu này là câu giới thiệu bản thân quen thuộc nhất này Hà My: Chủ ngữ là 'I' (Tôi) thì To Be là gì nhỉ?",
        teacherPraise: "Xuất sắc! Đại từ 'I' độc nhất vô nhị luôn luôn đi liền với 'am'!",
        teacherExplanation: "Trong tiếng Anh, đại từ nhân xưng 'I' (Tôi) ở thì hiện tại đơn chỉ đi với duy nhất một dạng động từ To Be là 'am' (viết tắt là I'm).",
        teacherCorrection: "Ôi nhầm xíu rồi con ơi! Đại từ 'I' là trường hợp đặc biệt nhất, không bao giờ đi với 'is' hay 'are', mà chỉ đi duy nhất với 'am': I am a student!",
        vietnameseTranslation: "Tôi là một học sinh.",
        grammarTrap: "Bẫy: Nhầm 'I' đi với 'is'.",
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
        teacherIntro: "Hà My chú ý chủ ngữ 'My mother' (Mẹ của tôi) là một người hay nhiều người để chọn To Be nha!",
        teacherPraise: "Đúng chuẩn luôn! 'My mother' là ngôi thứ ba số ít (tương đương đại từ 'She') nên đi với 'is'!",
        teacherExplanation: "'My mother' (Mẹ của tôi) là danh từ số ít chỉ 1 người (ngôi thứ 3 số ít), vì vậy động từ To Be chia là 'is'.",
        teacherCorrection: "Chưa đúng rồi con yêu! 'My mother' chỉ có 1 người mẹ thôi, là danh từ số ít, nên ta phải dùng 'is'. Khi nào là 'My parents' (bố mẹ - 2 người) thì mới dùng 'are' con nhé!",
        vietnameseTranslation: "Mẹ của tôi là một giáo viên.",
        grammarTrap: "Bẫy: Nhầm người thân trong gia đình số ít với số nhiều.",
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
        teacherIntro: "Câu này có dấu sở hữu cách 'Kate's sisters' này Hà My! Con hãy nhìn kỹ từ đứng sau dấu sở hữu nhé!",
        teacherPraise: "Thông minh lắm Hà My! Con không bị lừa bởi tên bạn Kate mà đã nhìn ra 'sisters' có đuôi -s là số nhiều!",
        teacherExplanation: "'Kate's sisters' nghĩa là 'các chị em gái của Kate'. Danh từ chính ở đây là 'sisters' (có đuôi -s là số nhiều), do đó động từ To Be phải là 'are'.",
        teacherCorrection: "Đây là một câu bẫy kinh điển lớp 5C4 nè con! Tên bạn 'Kate' là 1 người, nhưng từ chính là 'sisters' (các chị em gái - có đuôi -s số nhiều). Vì vậy ta phải chọn 'are' theo 'sisters' chứ không chọn 'is' theo 'Kate' đâu nhé!",
        vietnameseTranslation: "Các chị em gái của Kate rất là xinh xắn.",
        grammarTrap: "Bẫy sở hữu cách: Nhìn vào người sở hữu (Kate) thay vì danh từ được sở hữu (sisters).",
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
        teacherIntro: "Hà My nhớ lại xem: Đại từ 'You' (Bạn) thì luôn luôn đi với động từ To Be nào nhỉ?",
        teacherPraise: "Chính xác 100%! 'You' luôn luôn đi cùng 'are', dù là 'bạn' (1 người) hay 'các bạn' (nhiều người)!",
        teacherExplanation: "Quy tắc ngữ pháp cố định: Đại từ nhân xưng 'You' luôn luôn đi với 'are' (viết tắt là You're), không bao giờ đi với 'is' hay 'am'.",
        teacherCorrection: "Nhầm một chút rồi con ơi! Trong tiếng Anh, dù 'You' có nghĩa là 1 người bạn hay nhiều bạn thì quy tắc bắt buộc vẫn luôn là 'You are', không bao giờ dùng 'You is' con nhé!",
        vietnameseTranslation: "Cậu là người bạn thân nhất của tớ.",
        grammarTrap: "Bẫy: Tưởng 'You' là 1 người thì dùng 'is'.",
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
        teacherIntro: "Đây là câu trả lời ngắn phủ định cho câu hỏi 'Are they...?'. Con xem chủ ngữ 'they' ở phủ định viết sao nhé!",
        teacherPraise: "Quá tuyệt vời! Câu hỏi bắt đầu bằng 'Are' và chủ ngữ là 'they', nên câu phủ định là 'No, they aren't'!",
        teacherExplanation: "Trong câu trả lời ngắn phủ định với To Be: 'No, + S + to be + not'. Với chủ ngữ 'they', ta dùng 'aren't' (viết tắt của are not).",
        teacherCorrection: "Chưa chuẩn rồi con ơi! Câu hỏi dùng 'Are your parents...' và câu trả lời có chủ ngữ 'they'. Vì là phủ định ('No') nên ta phải chọn 'aren't', không thể chọn 'isn't' vì 'they' là số nhiều con nhé!",
        vietnameseTranslation: "Bố mẹ bạn có ở nhà không? - Không, họ không có ở nhà.",
        grammarTrap: "Bẫy câu trả lời ngắn: Nhầm giữa isn't và aren't khi chủ ngữ là 'they'.",
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
        teacherIntro: "Câu hỏi bắt đầu bằng 'Is it...?' và câu trả lời bắt đầu bằng 'No, it...'. Con chọn dạng phủ định tương ứng nhé!",
        teacherPraise: "Đúng rồi Hà My ơi! 'No, it isn't' là mẫu câu chuẩn SGK không thể sai được!",
        teacherExplanation: "Khi câu hỏi bắt đầu bằng 'Is it...?', câu trả lời ngắn khẳng định là 'Yes, it is', còn phủ định bắt buộc là 'No, it isn't'.",
        teacherCorrection: "Chưa chính xác con ơi! Chủ ngữ là 'it' (ngôi thứ 3 số ít) và câu có từ 'No', nên dạng phủ định phải là 'isn't' (viết tắt của is not), chứ không dùng 'aren't' hay chỉ mỗi từ 'not' được!",
        vietnameseTranslation: "Hôm nay có phải thứ Hai không? - Không, không phải.",
        grammarTrap: "Bẫy câu trả lời ngắn: Quên thêm to be trước not hoặc nhầm sang aren't.",
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
        teacherIntro: "Con hãy quan sát danh từ 'The books' để quyết định to be là 'is' hay 'are' nhé!",
        teacherPraise: "Chính xác luôn! 'The books' (những quyển sách) có đuôi -s là danh từ số nhiều nên đi với 'are'!",
        teacherExplanation: "'The books' là danh từ số nhiều chỉ đồ vật (những cuốn sách). Danh từ số nhiều luôn đi với To Be là 'are'.",
        teacherCorrection: "Con nhìn kỹ từ 'books' nhé, có chữ 's' ở cuối biểu thị số nhiều (nhiều cuốn sách). Đã là số nhiều thì bắt buộc dùng 'are', chỉ khi nào là 'The book' (1 cuốn sách) thì mới dùng 'is' con nha!",
        vietnameseTranslation: "Những cuốn sách này thật là thú vị.",
        grammarTrap: "Bẫy: Bỏ sót đuôi -s ở danh từ số nhiều.",
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
        teacherIntro: "Hà My để ý từ 'Your cat' (chú mèo của bạn) xem có đuôi -s không nào?",
        teacherPraise: "Chuẩn xác 100%! 'Your cat' không có đuôi -s, là 1 chú mèo (danh từ số ít) nên đi với 'is'!",
        teacherExplanation: "'Your cat' là danh từ số ít chỉ con vật. Ở ngôi thứ ba số ít, động từ To Be tương ứng là 'is'.",
        teacherCorrection: "Chưa đúng rồi con gái! 'Your cat' là 1 chú mèo (không có chữ 's' ở sau chữ cat), là số ít nên phải đi với 'is'. Nếu là 'Your cats' (những chú mèo) thì mới dùng 'are' nhé!",
        vietnameseTranslation: "Chú mèo của bạn trông thật đáng yêu.",
        grammarTrap: "Bẫy: Tưởng 'Your' là số nhiều. Danh từ quyết định là 'cat' (số ít).",
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
        teacherIntro: "Chủ ngữ là 'My brother' (anh/em trai của tôi). Con hãy chọn động từ To Be thích hợp nhé!",
        teacherPraise: "Tuyệt vời Hà My ơi! 'My brother' là 1 người (ngôi thứ ba số ít) nên đi với 'is' là hoàn toàn chính xác!",
        teacherExplanation: "'My brother' là danh từ số ít chỉ 1 người nam (tương đương đại từ 'He'). Động từ To Be đi với 'He' hoặc danh từ số ít luôn là 'is'.",
        teacherCorrection: "Chưa đúng rồi con ơi! 'My brother' là danh từ số ít chỉ 1 người anh/em trai. Vì vậy ta phải dùng 'is'. Khi nào có chữ 's' là 'My brothers' (nhiều anh em trai) thì mới dùng 'are' con nhé!",
        vietnameseTranslation: "Anh trai của tôi đang đi nghỉ mát.",
        grammarTrap: "Bẫy: Nhầm lẫn giữa số ít và số nhiều của danh từ chỉ người thân.",
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
        teacherIntro: "Chủ ngữ câu này có 2 bạn: 'Mary and Jane'. Con xem 2 bạn thì là số ít hay số nhiều nào?",
        teacherPraise: "Thông minh lắm! Hai người trở lên thì là chủ ngữ số nhiều (tương đương 'They') nên đi với 'are'!",
        teacherExplanation: "'Mary and Jane' là chủ ngữ ghép gồm 2 người, tương đương với đại từ 'They' (Họ). Do đó động từ To Be bắt buộc phải chia là 'are'.",
        teacherCorrection: "Ôi con bị bẫy rồi! Nhìn riêng 'Jane' thì là 1 người, nhưng câu này có cả 'Mary and Jane' (tức là 2 người bạn). Hai người là số nhiều nên bắt buộc phải chọn 'are', không chọn 'is' con nhé!",
        vietnameseTranslation: "Mary và Jane đang ở công viên.",
        grammarTrap: "Bẫy chủ ngữ ghép: Chỉ nhìn bạn đứng gần chỗ trống nhất (Jane) mà quên mất bạn phía trước (Mary).",
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
        teacherIntro: "Chủ ngữ là 'My favorite color' (màu sắc yêu thích của tôi). Hãy xác định To Be nhé Hà My!",
        teacherPraise: "Xuất sắc! Màu sắc yêu thích là một danh từ số ít trừu tượng nên đi với 'is'!",
        teacherExplanation: "'My favorite color' (Màu sắc yêu thích của tôi) là danh từ số ít chỉ 1 sự vật, nên động từ To Be là 'is'.",
        teacherCorrection: "Chưa chính xác rồi con! Cụm từ 'My favorite color' (màu yêu thích) là danh từ số ít, nên động từ To Be phải là 'is', con đừng nhầm sang 'are' nhé!",
        vietnameseTranslation: "Màu sắc yêu thích của tôi là màu xanh da trời.",
        grammarTrap: "Bẫy: Tưởng cụm từ dài là số nhiều.",
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
        teacherIntro: "Đại từ 'They' (Họ / Chúng nó) là số ít hay số nhiều nhỉ Hà My?",
        teacherPraise: "Chính xác 100%! 'They' luôn luôn đi với 'are' trong mọi trường hợp của thì hiện tại đơn!",
        teacherExplanation: "'They' là đại từ nhân xưng ngôi thứ 3 số nhiều, luôn luôn đi cùng động từ To Be là 'are' (They are doctors).",
        teacherCorrection: "Nhầm xíu rồi con ơi! 'They' có nghĩa là 'Họ' (nhiều người), là đại từ số nhiều nên bắt buộc phải dùng 'are', không bao giờ dùng 'is' hay 'am' nhé!",
        vietnameseTranslation: "Họ là những bác sĩ.",
        grammarTrap: "Bẫy: Nhầm đại từ nhân xưng số nhiều với số ít.",
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
    requiredStars: 0,
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
      { id: "g5w2_1", word: "Walks", meaning: "Đi bộ", icon: "🚶", phonics: "W" },
      { id: "g5w2_2", word: "Thinks", meaning: "Suy nghĩ", icon: "🤔", phonics: "T" },
      { id: "g5w2_3", word: "Tries", meaning: "Cố gắng", icon: "💪", phonics: "T" },
      { id: "g5w2_4", word: "Tells", meaning: "Kể chuyện", icon: "🧚", phonics: "T" },
      { id: "g5w2_5", word: "Waters", meaning: "Tưới cây", icon: "🌻", phonics: "W" },
      { id: "g5w2_6", word: "Writes", meaning: "Viết thư", icon: "✉️", phonics: "W" }
    ],
    quizzes: [
      {
        question: "He usually ______ to school.",
        teacherIntro: "Hà My chú ý: Chủ ngữ là 'He' (ngôi thứ ba số ít) và có trạng từ chỉ tần suất 'usually'. Động từ 'walk' phải làm sao nhỉ?",
        teacherPraise: "Đỉnh chóp luôn Hà My! Chủ ngữ 'He' thì động từ thường 'walk' bắt buộc phải thêm đuôi '-s' thành 'walks'!",
        teacherExplanation: "Quy tắc cốt lõi thì Hiện Tại Đơn lớp 5: Khi chủ ngữ là ngôi thứ ba số ít (He, She, It, Danh từ số ít), động từ thường phải thêm '-s' hoặc '-es'. Do đó: walk ➔ walks.",
        teacherCorrection: "Con chọn 'walk' nguyên thể là bị bẫy rồi! Động từ nguyên thể chỉ đi với I / You / We / They thôi. Ở đây chủ ngữ là 'He' (anh ấy - số ít), nên động từ bắt buộc phải thêm đuôi '-s' thành 'walks' con nhé!",
        vietnameseTranslation: "Cậu ấy thường đi bộ đến trường.",
        grammarTrap: "Bẫy số 1 lớp 5: Quên thêm đuôi -s cho động từ khi chủ ngữ là He/She/It.",
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
        teacherIntro: "Chủ ngữ là bạn 'Paul' (1 người bạn trai). Động từ 'think' (nghĩ) sẽ chia thế nào trong giờ Toán?",
        teacherPraise: "Rất chuẩn xác! Paul là tên riêng 1 người nên động từ 'think' phải thêm '-s' thành 'thinks'!",
        teacherExplanation: "Paul là danh từ riêng chỉ 1 người (ngôi thứ 3 số ít), nên động từ 'think' phải thêm đuôi '-s' thành 'thinks'. Cụm từ: thinks of (nghĩ về).",
        teacherCorrection: "Chưa chính xác rồi con ơi! Vì 'Paul' là tên của 1 bạn (số ít), nên động từ không được để nguyên thể 'think' mà phải thêm đuôi '-s' thành 'thinks' nhé!",
        vietnameseTranslation: "Paul thường nghĩ về Daisy trong giờ học Toán.",
        grammarTrap: "Bẫy: Tên riêng 1 người vẫn là ngôi thứ 3 số ít, động từ phải thêm -s.",
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
        teacherIntro: "Chủ ngữ 'The baby' (em bé - số ít) và động từ tận cùng bằng 'y': 'try'. Con nhớ quy tắc biến đổi 'y' thành gì không?",
        teacherPraise: "Thông minh tuyệt đỉnh! Động từ 'try' tận cùng bằng phụ âm + y, khi đi với số ít biến thành '-ies' là 'tries'!",
        teacherExplanation: "Quy tắc biến đổi đuôi: Động từ kết thúc bằng phụ âm + 'y' (tr + y), ta đổi 'y' thành 'i' rồi thêm 'es' ➔ tries. 'The baby' là số ít nên chọn 'tries'.",
        teacherCorrection: "Suýt đúng rồi con ơi! Khi động từ tận cùng bằng phụ âm + y như 'try', ta phải đổi 'y' thành 'i' rồi mới thêm 'es' thành 'tries', chứ không giữ nguyên 'trys' hay để nguyên mẫu 'try' con nhé!",
        vietnameseTranslation: "Em bé đang cố gắng với tới những ngón chân của mình.",
        grammarTrap: "Bẫy chính tả: Quên đổi 'y' thành 'ies' sau phụ âm.",
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
        teacherIntro: "Chủ ngữ 'Mum' (Mẹ - 1 người). Động từ 'tell' (kể chuyện) chia thế nào nhỉ Hà My?",
        teacherPraise: "Xuất sắc! 'Mum' là danh từ số ít nên động từ 'tell' thêm '-s' thành 'tells'!",
        teacherExplanation: "'Mum' (Mẹ) là ngôi thứ 3 số ít. Ở thể khẳng định hiện tại đơn, động từ 'tell' thêm đuôi '-s' thành 'tells'.",
        teacherCorrection: "Chưa đúng rồi con gái! 'Mum' là 1 người mẹ (ngôi thứ 3 số ít), nên động từ bắt buộc phải thêm đuôi '-s' là 'tells', con không để nguyên thể 'tell' nhé!",
        vietnameseTranslation: "Mẹ kể một câu chuyện cổ tích cho con trai mình nghe.",
        grammarTrap: "Bẫy: Để động từ nguyên thể với chủ ngữ Mum/Dad.",
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
        teacherIntro: "Hà My nhìn kỹ chủ ngữ nhé: 'Tim and Kim' là mấy người? Hai người thì động từ 'win' có thêm đuôi '-s' không nào?",
        teacherPraise: "Tuyệt đỉnh phân tích! 'Tim and Kim' là 2 người (số nhiều) nên động từ 'win' GIỮ NGUYÊN THỂ!",
        teacherExplanation: "Chủ ngữ 'Tim and Kim' là 2 người (danh từ số nhiều, tương đương 'They'). Với chủ ngữ số nhiều, động từ ở hiện tại đơn GIỮ NGUYÊN MẪU không thêm s/es ➔ chọn 'win'.",
        teacherCorrection: "Con bị bẫy rồi! 'Tim and Kim' là 2 người bạn (số nhiều). Với chủ ngữ số nhiều thì động từ KHÔNG ĐƯỢC thêm -s, mà phải giữ nguyên thể là 'win' con nhé!",
        vietnameseTranslation: "Tim và Kim không bao giờ chiến thắng trong một cuộc thi.",
        grammarTrap: "Bẫy số nhiều: Tưởng có tên riêng là thêm -s, nhưng ở đây có tới 2 người (Tim và Kim) nên động từ giữ nguyên mẫu!",
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
        teacherIntro: "Chủ ngữ là bạn 'Bobby' (1 cậu bé). Động từ 'take' (tắm) chia thế nào nhỉ?",
        teacherPraise: "Chính xác 100%! Bobby là ngôi thứ 3 số ít nên 'take' thêm '-s' thành 'takes' (takes a bath)!",
        teacherExplanation: "Bobby là tên riêng 1 người (số ít). Động từ 'take' thêm đuôi '-s' thành 'takes'. Cụm từ: takes a bath (đi tắm).",
        teacherCorrection: "Chưa chính xác con ơi! Bobby là 1 người (ngôi thứ 3 số ít), nên động từ 'take' phải thêm đuôi '-s' thành 'takes', không để nguyên 'take' nhé!",
        vietnameseTranslation: "Bobby đang đi tắm bồn.",
        grammarTrap: "Bẫy: Quên chia động từ theo tên riêng số ít.",
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
        teacherIntro: "Bạn 'Linda' hát một bài hát. Động từ 'sing' (hát) sẽ chia như thế nào với Linda?",
        teacherPraise: "Chuẩn không cần chỉnh! Linda là số ít nên động từ 'sing' thêm '-s' thành 'sings'!",
        teacherExplanation: "Chủ ngữ 'Linda' là danh từ riêng số ít (She). Động từ 'sing' chia ở hiện tại đơn thêm '-s' thành 'sings'.",
        teacherCorrection: "Chưa đúng rồi con gái! Linda là 1 bạn nữ (số ít), nên động từ 'sing' phải thêm đuôi '-s' thành 'sings', con đừng chọn 'sing' nguyên mẫu nhé!",
        vietnameseTranslation: "Linda hát một bài hát trong cuộc thi ở trường.",
        grammarTrap: "Bẫy: Nhầm lẫn giữa động từ nguyên thể và động từ thêm -s.",
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
        teacherIntro: "Bạn 'Lucy' ngắm mình trong gương. Động từ 'look' (ngắm nhìn) đi với Lucy ra sao nhỉ?",
        teacherPraise: "Rất giỏi! Lucy là số ít nên động từ 'look' thêm '-s' thành 'looks'!",
        teacherExplanation: "Chủ ngữ 'Lucy' là ngôi thứ 3 số ít, động từ thường 'look' thêm đuôi '-s' thành 'looks'. Cụm từ: looks at herself (ngắm nhìn chính mình).",
        teacherCorrection: "Chưa chính xác con ơi! Lucy là tên của 1 bạn (số ít), nên động từ 'look' phải thêm đuôi '-s' là 'looks' con nhé!",
        vietnameseTranslation: "Lucy ngắm nhìn chính mình trong gương.",
        grammarTrap: "Bẫy: Quên thêm -s cho ngôi thứ 3 số ít.",
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
        teacherIntro: "Bạn 'Mina' tưới hoa 2 lần mỗi tuần. Từ 'water' ở đây là động từ (tưới nước), chia thế nào với Mina?",
        teacherPraise: "Xuất sắc! Mina là số ít nên động từ 'water' thêm '-s' thành 'waters'!",
        teacherExplanation: "Trong câu này 'water' là động từ mang nghĩa 'tưới nước'. Vì chủ ngữ Mina là số ít nên động từ thêm '-s' thành 'waters'.",
        teacherCorrection: "Suýt đúng rồi con! Từ 'water' bình thường là nước uống (danh từ), nhưng ở đây là hành động 'tưới hoa' (động từ). Với chủ ngữ Mina (1 người), động từ 'water' phải thêm '-s' thành 'waters' nhé!",
        vietnameseTranslation: "Mina tưới hoa hai lần một tuần.",
        grammarTrap: "Bẫy từ loại: 'water' vừa là danh từ (nước) vừa là động từ (tưới cây).",
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
        teacherIntro: "Bạn 'Nina' trông có vẻ vui vẻ. Động từ 'look' (trông có vẻ) đi với Nina thế nào nhỉ?",
        teacherPraise: "Tuyệt vời! Nina là số ít nên động từ liên kết 'look' thêm '-s' thành 'looks'!",
        teacherExplanation: "'Look' ở đây là động từ liên kết (linking verb) mang nghĩa 'trông có vẻ'. Chủ ngữ Nina là số ít nên động từ thêm '-s' thành 'looks'.",
        teacherCorrection: "Chưa đúng rồi con gái ơi! Nina là 1 người (số ít) nên động từ 'look' phải thêm '-s' thành 'looks happy' nhé!",
        vietnameseTranslation: "Nina trông có vẻ rất vui vẻ.",
        grammarTrap: "Bẫy: Quên chia động từ liên kết (look + adj).",
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
        teacherIntro: "Bạn 'Lisa' viết một lá thư. Động từ 'write' (viết) chia thế nào với chủ ngữ Lisa?",
        teacherPraise: "Chuẩn xác 100%! Lisa là số ít nên động từ 'write' thêm '-s' thành 'writes'!",
        teacherExplanation: "Chủ ngữ 'Lisa' là ngôi thứ 3 số ít. Động từ 'write' đã có tận cùng là 'e' nên ta chỉ việc thêm '-s' thành 'writes'.",
        teacherCorrection: "Chưa chính xác con ơi! Với chủ ngữ là Lisa (1 người), động từ 'write' phải thêm đuôi '-s' thành 'writes', không thể để 'write' nguyên thể được con nhé!",
        vietnameseTranslation: "Lisa viết một lá thư gửi cho người bạn của mình.",
        grammarTrap: "Bẫy: Bỏ quên đuôi -s.",
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
        teacherIntro: "Chủ ngữ 'His mother' (Mẹ của cậu ấy). Động từ 'read' (đọc báo) chia thế nào nào?",
        teacherPraise: "Đúng chuẩn luôn! 'His mother' là số ít nên động từ 'read' thêm '-s' thành 'reads'!",
        teacherExplanation: "'His mother' là danh từ số ít chỉ 1 người. Động từ 'read' chia ở hiện tại đơn thêm đuôi '-s' phát âm là /riːdz/ (reads the newspaper).",
        teacherCorrection: "Chưa đúng rồi con yêu! 'His mother' là mẹ của cậu ấy (1 người - số ít). Động từ 'read' phải thêm đuôi '-s' thành 'reads' con nhé!",
        vietnameseTranslation: "Mẹ của cậu ấy đang đọc báo.",
        grammarTrap: "Bẫy: Nhầm tính từ sở hữu 'His' thành nhiều người. Danh từ chính là 'mother' (số ít).",
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
    requiredStars: 0,
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
      { id: "g5w3_1", word: "DOES", meaning: "Trợ động từ số ít", icon: "⚡", phonics: "D" },
      { id: "g5w3_2", word: "DONT", meaning: "Phủ định số nhiều", icon: "🚫", phonics: "D" },
      { id: "g5w3_3", word: "DOESNT", meaning: "Phủ định số ít", icon: "⛔", phonics: "D" },
      { id: "g5w3_4", word: "ISNT", meaning: "To be phủ định số ít", icon: "❌", phonics: "I" },
      { id: "g5w3_5", word: "ARENT", meaning: "To be phủ định số nhiều", icon: "⭕", phonics: "A" }
    ],
    quizzes: [
      {
        question: "Mark ______ like salad.",
        teacherIntro: "Đây là câu phủ định với động từ 'like'. Chủ ngữ là bạn 'Mark' (số ít), ta mượn trợ động từ phủ định nào: 'don't' hay 'doesn't'?",
        teacherPraise: "Quá thông minh Hà My ơi! Chủ ngữ số ít 'Mark' mượn trợ động từ phủ định là 'doesn't'!",
        teacherExplanation: "Công thức phủ định Hiện Tại Đơn: S(He/She/It/Số ít) + DOESN'T + V(nguyên mẫu). Vì Mark là số ít nên ta dùng 'doesn't like'.",
        teacherCorrection: "Con bị nhầm giữa don't và doesn't rồi! Nhớ công thức của thầy Tuấn nhé: He / She / It và Danh từ số ít (như Mark) PHẢI ĐI VỚI 'doesn't', còn 'don't' chỉ đi với I / You / We / They thôi!",
        vietnameseTranslation: "Mark không thích món sa-lát.",
        grammarTrap: "Bẫy trợ động từ: Nhầm 'don't' với 'doesn't' cho ngôi thứ 3 số ít.",
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
        teacherIntro: "Bạn 'Bella' không ăn dưa hấu. Chủ ngữ là Bella (1 bạn gái - số ít), con chọn 'don't' hay 'doesn't'?",
        teacherPraise: "Tuyệt vời! Bella là số ít nên dùng trợ động từ 'doesn't' hoàn toàn chính xác!",
        teacherExplanation: "Bella là ngôi thứ 3 số ít (She), câu phủ định dùng trợ động từ 'doesn't' kết hợp động từ nguyên mẫu 'eat' ➔ doesn't eat.",
        teacherCorrection: "Chưa đúng rồi con gái ơi! Bella là tên 1 người (số ít) nên bắt buộc phải dùng 'doesn't', không được dùng 'don't' con nhé!",
        vietnameseTranslation: "Bella không ăn dưa hấu.",
        grammarTrap: "Bẫy: Dùng nhầm 'don't' cho chủ ngữ số ít.",
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
        teacherIntro: "Hà My chú ý chủ ngữ ghép: 'Mark and I' (Mark và tôi = Chúng tôi / We). Chủ ngữ này đi với 'don't' hay 'doesn't' nhỉ?",
        teacherPraise: "Đỉnh của chóp! 'Mark and I' chính là 'We' (Chúng tôi - số nhiều) nên phải dùng 'don't'!",
        teacherExplanation: "'Mark and I' (Mark và tôi) tương đương với đại từ 'We' (Chúng tôi - ngôi thứ nhất số nhiều). Với 'We', câu phủ định dùng trợ động từ 'don't'.",
        teacherCorrection: "Đây là cái bẫy rất tinh vi của lớp 5 nè con! Nhiều bạn chỉ nhìn thấy 'Mark' rồi vội chọn 'doesn't', nhưng ở đây là 'Mark and I' (Mark và tôi = 2 người = We). Hai người thì phải dùng 'don't' con nhé!",
        vietnameseTranslation: "Mark và tôi không uống trà.",
        grammarTrap: "Bẫy chủ ngữ ghép có 'I': 'Ai đó and I' = WE (Chúng tôi) ➔ dùng DON'T!",
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
        teacherIntro: "Mẹ của tôi (My mother) không uống rượu. Chủ ngữ là số ít thì dùng trợ từ nào nào?",
        teacherPraise: "Chính xác 100%! 'My mother' là số ít nên đi với 'doesn't'!",
        teacherExplanation: "Chủ ngữ 'My mother' là danh từ số ít, ở thể phủ định mượn trợ động từ 'doesn't' + động từ nguyên mẫu 'drink'.",
        teacherCorrection: "Chưa chính xác con ơi! 'My mother' (1 người mẹ) là số ít nên phải đi với 'doesn't', con đừng chọn 'don't' nhé!",
        vietnameseTranslation: "Mẹ của tôi không uống rượu.",
        grammarTrap: "Bẫy: Nhầm lẫn trợ từ phủ định don't/doesn't.",
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
        teacherIntro: "'David and Nick' là 2 người bạn. Hai người (số nhiều) thì phủ định dùng 'don't' hay 'doesn't'?",
        teacherPraise: "Xuất sắc luôn! Hai người là số nhiều (tương đương 'They') nên mượn trợ động từ 'don't'!",
        teacherExplanation: "'David and Nick' là danh từ số nhiều (2 người), tương đương với đại từ 'They'. Câu phủ định đi với 'don't like'.",
        teacherCorrection: "Con chú ý nhé: 'David and Nick' là 2 người (số nhiều). Chủ ngữ số nhiều thì KHÔNG DÙNG 'doesn't', mà phải dùng 'don't' con nha!",
        vietnameseTranslation: "David và Nick không thích đậu Hà Lan.",
        grammarTrap: "Bẫy: Tưởng tên riêng là số ít mà quên rằng có 2 người kết nối bằng chữ 'and'.",
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
        teacherIntro: "Đây là câu hỏi nghi vấn dạng Yes/No với chủ ngữ 'you'. Trợ động từ đứng đầu câu là 'Do' hay 'Does' nhỉ?",
        teacherPraise: "Chuẩn xác tuyệt đối! 'Do you like...?' là mẫu câu hỏi kinh điển nhất của tiếng Anh!",
        teacherExplanation: "Quy tắc câu hỏi Yes/No hiện tại đơn: DO + I/you/we/they + V? Do đó chủ ngữ 'you' bắt buộc đi với trợ động từ 'Do'.",
        teacherCorrection: "Chưa đúng rồi con ơi! Chủ ngữ là 'you' thì câu hỏi luôn bắt đầu bằng 'Do' (Do you like...?). 'Does' chỉ dùng cho He/She/It thôi nhé!",
        vietnameseTranslation: "Bạn có thích món sa-lát không?",
        grammarTrap: "Bẫy câu hỏi: Nhầm lẫn giữa Do và Does.",
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
        teacherIntro: "Câu hỏi với chủ ngữ là bạn 'Paul' (1 người - số ít). Trợ động từ đứng đầu câu là gì nào?",
        teacherPraise: "Rất chuẩn! Chủ ngữ số ít 'Paul' thì câu hỏi phải bắt đầu bằng 'Does'!",
        teacherExplanation: "Công thức câu hỏi nghi vấn với chủ ngữ số ít: DOES + he/she/it/tên riêng + V(nguyên mẫu)? Vì vậy: Does Paul like...?",
        teacherCorrection: "Chưa chính xác con yêu! 'Paul' là 1 người (ngôi thứ 3 số ít), nên khi đặt câu hỏi ta phải dùng trợ động từ 'Does', không dùng 'Do' nhé!",
        vietnameseTranslation: "Paul có thích món đậu Hà Lan không?",
        grammarTrap: "Bẫy: Dùng Do cho chủ ngữ số ít.",
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
        teacherIntro: "Chủ ngữ câu hỏi là 'they' (họ / chúng nó - số nhiều). Ta dùng 'Do' hay 'Does'?",
        teacherPraise: "Chính xác 100%! Chủ ngữ 'they' đi với trợ động từ 'Do' đứng đầu câu hỏi!",
        teacherExplanation: "Với chủ ngữ số nhiều 'they', trợ động từ trong câu nghi vấn hiện tại đơn là 'Do' ➔ Do they eat bananas?",
        teacherCorrection: "Nhầm xíu rồi con gái! 'They' là số nhiều nên câu hỏi phải bắt đầu bằng 'Do', không dùng 'Does' con nhé!",
        vietnameseTranslation: "Họ có ăn chuối không?",
        grammarTrap: "Bẫy: Nhầm Do và Does với đại từ số nhiều.",
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
        teacherIntro: "Câu hỏi về 'your cat' (chú mèo của bạn - số ít). Con chọn 'Do' hay 'Does' nào?",
        teacherPraise: "Xuất sắc! 'Your cat' là 1 con vật (số ít) nên câu hỏi dùng trợ động từ 'Does'!",
        teacherExplanation: "'Your cat' là danh từ số ít (tương đương 'It'), vì vậy câu hỏi nghi vấn phải mượn trợ động từ 'Does'.",
        teacherCorrection: "Con chú ý nhé: 'Your cat' chỉ có 1 chú mèo thôi (danh từ số ít), nên câu hỏi phải dùng 'Does your cat drink milk?', không dùng 'Do' nha!",
        vietnameseTranslation: "Chú mèo của bạn có uống sữa không?",
        grammarTrap: "Bẫy: Nhìn chữ 'Your' rồi tưởng là số nhiều, danh từ chính là 'cat' (số ít).",
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
        teacherIntro: "Câu hỏi về 'the dog' (chú chó - số ít). Đứng đầu câu hỏi là gì nhỉ?",
        teacherPraise: "Đúng chuẩn luôn! 'The dog' là danh từ số ít nên mượn trợ động từ 'Does'!",
        teacherExplanation: "'The dog' là danh từ số ít. Câu hỏi hiện tại đơn với danh từ số ít bắt đầu bằng 'Does' + S + V(nguyên mẫu)?",
        teacherCorrection: "Chưa chính xác con ơi! 'The dog' là 1 chú chó (số ít), nên phải dùng 'Does', không dùng 'Do' nhé!",
        vietnameseTranslation: "Chú chó có sủa trong vườn không?",
        grammarTrap: "Bẫy: Nhầm trợ động từ số ít và số nhiều.",
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
        teacherIntro: "Tớ bị thấp. Tớ ... chơi bóng rổ. Chủ ngữ là 'I' thì dạng phủ định là 'don't' hay 'doesn't'?",
        teacherPraise: "Rất giỏi! Đại từ 'I' ở câu phủ định luôn đi với 'don't' (I don't play basketball)!",
        teacherExplanation: "Chủ ngữ là đại từ 'I', câu phủ định ở hiện tại đơn dùng trợ động từ 'don't' + động từ nguyên mẫu 'play'.",
        teacherCorrection: "Chưa đúng rồi con gái ơi! Chủ ngữ 'I' không bao giờ đi với 'doesn't', mà luôn đi với 'don't' con nhé!",
        vietnameseTranslation: "Tớ bị thấp. Tớ không chơi bóng rổ.",
        grammarTrap: "Bẫy: Nhầm đại từ 'I' đi với 'doesn't'.",
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
        teacherIntro: "Hà My nhìn kỹ từ 'your students' có đuôi -s nhé! Những học sinh của bạn là số nhiều hay số ít?",
        teacherPraise: "Quá thông minh! 'Your students' có đuôi -s là danh từ số nhiều nên câu hỏi dùng 'Do'!",
        teacherExplanation: "'Your students' có đuôi -s là danh từ số nhiều (các học sinh). Với chủ ngữ số nhiều, câu hỏi bắt đầu bằng 'Do'.",
        teacherCorrection: "Bẫy ở đây nè con ơi! 'students' có đuôi -s nghĩa là 'các học sinh' (số nhiều). Chủ ngữ số nhiều thì câu hỏi phải dùng 'Do', không dùng 'Does' con nhé!",
        vietnameseTranslation: "Các học sinh của bạn có nói tiếng Anh lưu loát không?",
        grammarTrap: "Bẫy: Không để ý đuôi -s của danh từ students nên chọn nhầm Does.",
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
    requiredStars: 0,
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
      { id: "g5w4_1", word: "Dolphin", meaning: "Cá heo", icon: "🐬", phonics: "D" },
      { id: "g5w4_2", word: "Peacock", meaning: "Con công", icon: "🦚", phonics: "P" },
      { id: "g5w4_3", word: "Chicken", meaning: "Thịt gà", icon: "🍗", phonics: "C" },
      { id: "g5w4_4", word: "Noodles", meaning: "Phở / Mì", icon: "🍜", phonics: "N" },
      { id: "g5w4_5", word: "Sandwich", meaning: "Bánh mì kẹp", icon: "🥪", phonics: "S" },
      { id: "g5w4_6", word: "Giraffe", meaning: "Hươu cao cổ", icon: "🦒", phonics: "G" },
      { id: "g5w4_7", word: "Pizza", meaning: "Bánh pizza", icon: "🍕", phonics: "P" }
    ],
    quizzes: [
      {
        question: "Can you tell me about yourself? - My name is Ha My. I'm in class ______.",
        teacherIntro: "Câu hỏi giới thiệu về bản thân của chính bạn Hà My 5C4 lớp mình nè!",
        teacherPraise: "Tuyệt cú mèo! Đúng chuẩn bạn Hà My lớp 5C4 rồi!",
        teacherExplanation: "Hà My là học sinh lớp 5C4 trường Tiểu học, câu trả lời chuẩn xác là: 'I'm in class 5C4'.",
        teacherCorrection: "Con chọn nhầm lớp rồi kìa! Hà My học lớp 5C4 mà, chọn '5C4' mới đúng lớp của con nha!",
        vietnameseTranslation: "Bạn có thể giới thiệu về bản thân không? - Tên tớ là Hà My. Tớ học lớp 5C4.",
        grammarTrap: "Nhớ chính xác tên lớp 5C4 của bé Hà My.",
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
        teacherIntro: "Đố Hà My con vật nào trong các phương án là loài vật được nhắc đến trong Unit 1 SGK?",
        teacherPraise: "Chính xác! Peacock (con công) hoặc Dolphin (cá heo) là các con vật tiêu biểu trong SGK lớp 5!",
        teacherExplanation: "Trong Unit 1 Global Success Lớp 5, các con vật yêu thích được học gồm có: peacock (con công), dolphin (cá heo), monkey (con khỉ)...",
        teacherCorrection: "Chưa đúng con ơi! Con hãy đọc kỹ câu hỏi hỏi về 'favorite animal' (con vật yêu thích) để chọn đúng từ chỉ con vật nhé!",
        vietnameseTranslation: "Con vật yêu thích của bạn là gì? - Đó là một con công / cá heo.",
        grammarTrap: "Bẫy: Nhầm lẫn giữa từ chỉ con vật và đồ vật khác.",
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
        teacherIntro: "Câu hỏi về món ăn yêu thích: 'favorite food'. Con chọn món ăn nào nhỉ?",
        teacherPraise: "Đúng rồi! Pizza / Chicken / Fish là những món ăn quen thuộc trong bài học!",
        teacherExplanation: "Câu hỏi 'What is your favorite food?' hỏi về món ăn. Ta trả lời bằng tên món ăn: pizza, chicken, noodles, rice...",
        teacherCorrection: "Chưa chính xác con ơi! 'Food' nghĩa là đồ ăn, con hãy chọn từ chỉ món ăn chứ không chọn từ chỉ đồ uống hay màu sắc nhé!",
        vietnameseTranslation: "Món ăn yêu thích của bạn là gì? - Đó là món pizza.",
        grammarTrap: "Bẫy từ vựng: Phân biệt giữa food (đồ ăn), drink (đồ uống) và colour (màu sắc).",
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
        teacherIntro: "Hôm qua bạn đã ở đâu? Con hãy chọn một địa điểm vui chơi phù hợp nhé!",
        teacherPraise: "Xuất sắc! 'campsite' (khu cắm trại) hoặc 'park' (công viên) là địa điểm chuẩn xác trong SGK!",
        teacherExplanation: "Câu hỏi về nơi chốn: 'Where were you yesterday?'. Trả lời: 'I was at the campsite / zoo / park' (ở khu cắm trại / sở thú / công viên).",
        teacherCorrection: "Chưa đúng rồi con yêu! Con hãy chọn một từ chỉ địa điểm (nơi chốn) để trả lời cho câu hỏi 'Where' nhé!",
        vietnameseTranslation: "Hôm qua bạn ở đâu? - Tớ đã ở khu cắm trại cùng với các bạn của tớ.",
        grammarTrap: "Bẫy từ loại: Chọn đúng danh từ chỉ địa điểm.",
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
        teacherIntro: "Câu hỏi về 'favorite colour' (màu sắc yêu thích). Màu sắc nào đúng nào?",
        teacherPraise: "Chuẩn xác 100%! 'purple' (màu tím) hoặc 'blue' (màu xanh) là từ chỉ màu sắc!",
        teacherExplanation: "'Colour' là màu sắc. Câu trả lời phải là một từ chỉ màu: red, blue, purple, yellow, green...",
        teacherCorrection: "Nhầm xíu rồi con ơi! Đề bài hỏi 'colour' (màu sắc), con hãy chọn từ chỉ màu sắc chứ đừng chọn nhầm món ăn hay con vật nha!",
        vietnameseTranslation: "Màu sắc yêu thích của bạn là gì? - Đó là màu tím.",
        grammarTrap: "Bẫy: Nhầm lẫn câu hỏi về màu sắc với con vật hay thức ăn.",
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
    requiredStars: 0,
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
      { id: "g5w5_1", word: "Class 5C4", meaning: "Lớp 5C4", icon: "🏫", phonics: "C" },
      { id: "g5w5_2", word: "City", meaning: "Thành phố lớn", icon: "🏙️", phonics: "C" },
      { id: "g5w5_3", word: "Town", meaning: "Thị trấn nhỏ", icon: "🏘️", phonics: "T" },
      { id: "g5w5_4", word: "Village", meaning: "Ngôi làng", icon: "🏡", phonics: "V" },
      { id: "g5w5_5", word: "Favorite", meaning: "Yêu thích nhất", icon: "⭐", phonics: "F" }
    ],
    quizzes: [
      {
        question: "Where are you ______? - I'm from Vietnam.",
        teacherIntro: "Mẫu câu hỏi bạn đến từ đâu quen thuộc: 'Where are you ...?'",
        teacherPraise: "Tuyệt vời! 'Where are you from?' - 'I'm from Vietnam' là mẫu câu quốc dân!",
        teacherExplanation: "Cấu trúc hỏi quê quán, quốc tịch: 'Where are you from?' (Bạn đến từ đâu?) ➔ 'I'm from + Nơi chốn'. Đi với giới từ 'from'.",
        teacherCorrection: "Chưa chính xác con ơi! Mẫu câu hỏi quê hương, nguồn gốc luôn là 'Where are you from?', con điền từ 'from' nhé!",
        vietnameseTranslation: "Bạn đến từ đâu? - Tôi đến từ Việt Nam.",
        grammarTrap: "Bẫy giới từ: from (đến từ) chứ không phải at, in hay on.",
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
        teacherIntro: "Câu hỏi 'Ông bà của bạn sống ở đâu?'. Chủ ngữ 'your grandparents' (ông bà - số nhiều), con chọn trợ từ và động từ sao nhỉ?",
        teacherPraise: "Đỉnh chóp! 'grandparents' có đuôi -s (số nhiều) nên dùng 'do' và động từ nguyên thể 'live' ➔ do / live!",
        teacherExplanation: "'Your grandparents' là danh từ số nhiều (ông bà). Câu hỏi mượn trợ động từ 'do' và động từ chính giữ nguyên mẫu 'live': Where do your grandparents live?",
        teacherCorrection: "Con chú ý nhé: 'grandparents' có chữ 's' là cả ông và bà (2 người - số nhiều). Số nhiều thì dùng trợ từ 'do', không dùng 'does' con nha!",
        vietnameseTranslation: "Ông bà của bạn sống ở đâu?",
        grammarTrap: "Bẫy: Nhầm grandparents là 1 người và dùng does.",
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
        teacherIntro: "Cậu ấy sống ở một ... nhỏ. Trong các từ sau, từ nào chỉ nơi ở: town, book, run?",
        teacherPraise: "Chính xác! 'town' (thị trấn) hoặc 'village' (ngôi làng) là từ chỉ nơi chốn sinh sống!",
        teacherExplanation: "Sau cụm 'lives in a small...' cần một danh từ chỉ nơi chốn: town (thị trấn), village (ngôi làng), city (thành phố).",
        teacherCorrection: "Chưa đúng rồi con gái! Cần một từ chỉ nơi sinh sống như 'town' (thị trấn), con xem lại nhé!",
        vietnameseTranslation: "Cậu ấy sống ở một thị trấn nhỏ.",
        grammarTrap: "Bẫy nghĩa từ vựng chỉ nơi chốn.",
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
        teacherIntro: "Tôi sống ... ông bà của tôi. Con chọn giới từ nào có nghĩa là 'với / cùng với'?",
        teacherPraise: "Chuẩn xác 100%! 'live with' nghĩa là 'sống cùng với ai'!",
        teacherExplanation: "Cụm động từ: 'live with someone' = sống cùng với ai đó. Ví dụ: I live with my parents / grandparents.",
        teacherCorrection: "Chưa chính xác con yêu! Khi nói sống cùng với ai, trong tiếng Anh dùng giới từ 'with' (live with), không dùng 'at' hay 'to' nhé!",
        vietnameseTranslation: "Tôi sống cùng với ông bà của tôi ở một thị trấn nhỏ.",
        grammarTrap: "Bẫy giới từ đi kèm động từ live: live with (sống với ai) vs live in (sống ở đâu).",
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
        teacherIntro: "Câu trả lời là 'It's purple' (Màu tím). Vậy câu hỏi phải hỏi về cái gì nhỉ?",
        teacherPraise: "Thông minh tuyệt đỉnh! 'What is your favorite colour?' ➔ Hỏi về màu sắc!",
        teacherExplanation: "Câu trả lời là 'purple' (màu tím), nên câu hỏi bắt buộc phải dùng từ để hỏi 'What' và danh từ 'colour': What is your favorite colour?",
        teacherCorrection: "Con nhìn câu trả lời nhé: 'It's purple' (Đó là màu tím). Vì câu trả lời là màu sắc nên câu hỏi phải là 'What is your favorite colour?' chứ không phải hỏi về con vật hay thức ăn con nhé!",
        vietnameseTranslation: "Màu sắc yêu thích của bạn là gì? - Đó là màu tím.",
        grammarTrap: "Bẫy: Phải nhìn vào câu trả lời để suy ra câu hỏi.",
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
        teacherIntro: "Hoa sống cùng gia đình ở một ... lớn. Chọn từ chỉ nơi chốn: city, pencil, sleep?",
        teacherPraise: "Rất chuẩn! 'city' (thành phố) là từ chỉ nơi chốn chính xác!",
        teacherExplanation: "'city' (thành phố) kết hợp với tính từ 'big' tạo thành 'a big city' (một thành phố lớn).",
        teacherCorrection: "Chưa đúng rồi con ơi! Cần một từ chỉ địa điểm nơi cư trú như 'city' (thành phố) con nhé!",
        vietnameseTranslation: "Hoa sống cùng gia đình ở một thành phố lớn.",
        grammarTrap: "Bẫy từ vựng nơi chốn.",
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
        teacherIntro: "Món ăn ... của cậu ấy là pizza và gà rán. Điền từ gì có nghĩa là 'yêu thích'?",
        teacherPraise: "Xuất sắc! 'favorite' nghĩa là 'yêu thích nhất'!",
        teacherExplanation: "Tính từ 'favorite' đứng trước danh từ 'food' ➔ 'favorite food' (món ăn yêu thích).",
        teacherCorrection: "Chưa chính xác con gái ơi! Cụm từ quen thuộc trong bài là 'favorite food' (món ăn yêu thích), con chọn từ 'favorite' nhé!",
        vietnameseTranslation: "Món ăn yêu thích của cậu ấy là pizza và gà rán.",
        grammarTrap: "Bẫy chính tả từ 'favorite'.",
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
        teacherIntro: "Câu trả lời là 'He is a driver' (Ông ấy là một tài xế). Vậy câu hỏi đang hỏi về ai trong gia đình?",
        teacherPraise: "Chuẩn luôn! 'He' là người nam nên câu hỏi hỏi về 'father' hoặc 'uncle'!",
        teacherExplanation: "Đại từ 'He' chỉ phái nam, do đó câu hỏi nghề nghiệp phải hỏi về người nam như 'father' (bố) hoặc 'brother' (anh trai), không thể là 'mother' hay 'sister'.",
        teacherCorrection: "Con chú ý đại từ ở câu trả lời kìa: 'He is a driver' (Chú ấy / Bác ấy / Bố là tài xế). 'He' chỉ nam giới nên trong câu hỏi phải là 'father', không thể là 'mother' con nhé!",
        vietnameseTranslation: "Bố của bạn làm nghề gì? - Bác ấy là một tài xế.",
        grammarTrap: "Bẫy hòa hợp đại từ: He (nam) ứng với father/brother; She (nữ) ứng với mother/sister.",
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
        teacherIntro: "Câu trả lời là 'Yes, she does'. Vậy câu hỏi bắt đầu bằng trợ động từ nào?",
        teacherPraise: "Tuyệt vời! Câu trả lời có 'she does' thì câu hỏi chắc chắn bắt đầu bằng 'Does'!",
        teacherExplanation: "Quy tắc ngữ pháp: Câu hỏi hiện tại đơn với chủ ngữ 'she' bắt đầu bằng 'Does': Does she work at a bank? ➔ Yes, she does.",
        teacherCorrection: "Chưa chính xác con ơi! Con nhìn câu trả lời nhé: 'Yes, she does'. Câu trả lời dùng 'does' và chủ ngữ là 'she' thì câu hỏi phải bắt đầu bằng 'Does', không dùng 'Do' con nha!",
        vietnameseTranslation: "Cô ấy có làm việc ở ngân hàng không? - Vâng, đúng vậy.",
        grammarTrap: "Bẫy: Nhìn ngay vào trợ động từ ở câu trả lời để chọn đúng từ hỏi.",
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
        teacherIntro: "Cô ấy sống ở một ... lớn của Việt Nam. Chọn danh từ phù hợp:",
        teacherPraise: "Chính xác! 'city' (thành phố) là đáp án chuẩn xác!",
        teacherExplanation: "'city of Vietnam' (thành phố của Việt Nam) như Hà Nội, TP.HCM, Đà Nẵng.",
        teacherCorrection: "Chưa đúng rồi con yêu! Cần một từ chỉ địa danh lớn như 'city' (thành phố) nhé!",
        vietnameseTranslation: "Cô ấy sống ở một thành phố lớn của Việt Nam.",
        grammarTrap: "Bẫy từ vựng địa lý.",
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
        teacherIntro: "Câu hỏi bố bạn làm việc ở đâu. Chủ ngữ 'your father' (bố của bạn - số ít), con chọn trợ động từ nào?",
        teacherPraise: "Rất chuẩn! 'your father' là 1 người (ngôi thứ 3 số ít) nên mượn trợ động từ 'does'!",
        teacherExplanation: "Chủ ngữ 'your father' là ngôi thứ 3 số ít (He). Cấu trúc hỏi nơi làm việc: Where DOES + S(số ít) + work?",
        teacherCorrection: "Chưa chính xác con ơi! 'your father' là bố của bạn (1 người - số ít) nên câu hỏi phải dùng 'does', không dùng 'do' nhé!",
        vietnameseTranslation: "Bố bạn làm việc ở đâu? - Bác ấy làm việc ở một bệnh viện lớn.",
        grammarTrap: "Bẫy: Nhầm lẫn giữa do và does với danh từ số ít chỉ người thân.",
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
    requiredStars: 0,
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
      { id: "g5w6_1", word: "Earth", meaning: "Trái Đất", icon: "🌍", phonics: "E" },
      { id: "g5w6_2", word: "Boils", meaning: "Sôi ở 100 độ C", icon: "♨️", phonics: "B" },
      { id: "g5w6_3", word: "Borrow", meaning: "Mượn sách", icon: "📚", phonics: "B" },
      { id: "g5w6_4", word: "Doctor", meaning: "Bác sĩ", icon: "👨‍⚕️", phonics: "D" },
      { id: "g5w6_5", word: "Teacher", meaning: "Giáo viên", icon: "👩‍🏫", phonics: "T" }
    ],
    quizzes: [
      {
        question: "Truc is from Da Nang.",
        teacherIntro: "Bài đọc hiểu Trang 17 SGK: Trúc đến từ Đà Nẵng. Câu này Đúng (True) hay Sai (False) dựa vào bài đọc?",
        teacherPraise: "Xuất sắc! Bài đọc ghi rõ: 'My name is Truc. I am from Da Nang' nên câu này là TRUE!",
        teacherExplanation: "Trong đoạn văn bài đọc trang 17: Bạn Trúc giới thiệu 'I'm from Da Nang', do đó câu nhận định này hoàn toàn Đúng (True).",
        teacherCorrection: "Chưa đúng rồi con ơi! Con nhớ lại bài đọc trang 17 nhé: Bạn Trúc giới thiệu bạn ấy đến từ Đà Nẵng, nên đáp án phải là True (Đúng) con nhé!",
        vietnameseTranslation: "Trúc đến từ Đà Nẵng.",
        grammarTrap: "Bẫy đọc hiểu: Cần đọc kỹ thông tin xuất thân của nhân vật trong bài đọc.",
        situation: "Bài đọc bạn Trúc (SGK Trang 19): 'My name is Truc. I'm from Vinh Phuc Province. I'm in class 5A...'",
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
        teacherIntro: "Trúc sống ở một thị trấn nhỏ. Con kiểm tra thông tin trong bài đọc xem Đúng hay Sai nhé!",
        teacherPraise: "Chuẩn xác 100%! Trong bài đọc bạn Trúc nói bạn ấy sống ở thị trấn nhỏ ➔ TRUE!",
        teacherExplanation: "Dẫn chứng trong bài đọc SGK: 'I live in a small town with my family' ➔ Câu này là True.",
        teacherCorrection: "Con đọc kỹ lại bài đọc nhé: Bạn Trúc nói 'I live in a small town', vậy thông tin này là True (Đúng) chứ không phải False đâu nha!",
        vietnameseTranslation: "Trúc sống ở một thị trấn nhỏ.",
        grammarTrap: "Bẫy đọc hiểu: Đối chiếu câu văn trong bài đọc với câu nhận định.",
        situation: "Bài đọc bạn Trúc (SGK Trang 19): '...I live in a small town with my family. My town is small and quiet...'",
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
        teacherIntro: "Thị trấn của bạn ấy thì to lớn và ồn ào. Câu này Đúng hay Sai nhỉ Hà My?",
        teacherPraise: "Thông minh lắm! Trong bài nói thị trấn yên bình (peaceful) chứ không hề ồn ào (noisy) ➔ FALSE!",
        teacherExplanation: "Bài đọc miêu tả thị trấn của Trúc là 'small and quiet' (nhỏ và yên tĩnh). Do đó câu nói 'big and noisy' là hoàn toàn SAI (False).",
        teacherCorrection: "Ôi con bị bẫy rồi! Trong bài đọc bạn Trúc kể thị trấn của bạn ấy rất yên bình và nhỏ nhắn, chứ không hề to lớn và ồn ào (noisy). Vì vậy câu này là FALSE (Sai) con nhé!",
        vietnameseTranslation: "Thị trấn của bạn ấy to lớn và ồn ào.",
        grammarTrap: "Bẫy thông tin đối lập: 'quiet' (yên tĩnh) đối lập với 'noisy' (ồn ào).",
        situation: "Bài đọc bạn Trúc (SGK Trang 19): '...My town is small and quiet. It has a large and beautiful lake...'",
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
        teacherIntro: "Trúc học lớp 5C. Con nhớ xem lớp của bạn Trúc là lớp nào trong bài đọc?",
        teacherPraise: "Chính xác! Bạn Trúc học lớp 5C cùng khối 5 với lớp 5C4 của Hà My ➔ TRUE!",
        teacherExplanation: "Dẫn chứng bài đọc: 'I am in class 5C at Primary School' ➔ Câu này Đúng (True).",
        teacherCorrection: "Con nhớ lại bài đọc nhé: Bạn Trúc tự giới thiệu 'I'm in class 5C', nên thông tin này là True (Đúng) con nhé!",
        vietnameseTranslation: "Trúc học lớp 5C.",
        grammarTrap: "Bẫy đọc hiểu: Nhớ đúng tên lớp của nhân vật.",
        situation: "Bài đọc bạn Trúc (SGK Trang 19): '...I'm in class 5A at Nguyen Dinh Chieu Primary School...'",
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
        teacherIntro: "Trúc, Linh và Phong là những người bạn thân nhất. Đúng hay Sai nào Hà My?",
        teacherPraise: "Tuyệt vời! Đoạn cuối bài đọc khẳng định ba bạn là bạn thân ➔ TRUE!",
        teacherExplanation: "Dẫn chứng bài đọc SGK: 'Linh and Phong are my best friends. We often play together' ➔ Câu này là True.",
        teacherCorrection: "Chưa chính xác con ơi! Trong bài đọc bạn Trúc kể Linh và Phong là hai người bạn thân nhất của bạn ấy, nên câu này là True (Đúng) con nhé!",
        vietnameseTranslation: "Trúc, Linh và Phong là những người bạn thân nhất.",
        grammarTrap: "Bẫy đọc hiểu: Xác nhận mối quan hệ bạn bè của các nhân vật.",
        situation: "Bài đọc bạn Trúc (SGK Trang 19): '...Linh and Phong are my best friends. We go to the same school...'",
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
        teacherIntro: "Trái Đất quay xung quanh Mặt Trời. Đây là chân lý khoa học! Chủ ngữ 'The Earth' (Trái Đất - số ít) thì động từ 'go' chia thế nào?",
        teacherPraise: "Đỉnh cao khoa học! 'The Earth' là số ít, động từ tận cùng bằng 'o' (go) thêm '-es' thành 'goes'!",
        teacherExplanation: "Quy tắc thì Hiện Tại Đơn diễn tả chân lý, sự thật hiển nhiên: 'The Earth' (Trái Đất) là danh từ số ít. Động từ tận cùng bằng 'o' thêm '-es' ➔ goes. Cụm từ: goes around the Sun (quay quanh Mặt Trời).",
        teacherCorrection: "Con chú ý nhé: 'The Earth' (Trái Đất) là 1 thiên thể (danh từ số ít). Động từ 'go' tận cùng là chữ 'o' nên khi đi với số ít phải thêm đuôi '-es' thành 'goes', không để nguyên 'go' hay thêm mỗi chữ 's' được con nha!",
        vietnameseTranslation: "Trái Đất quay xung quanh Mặt Trời.",
        grammarTrap: "Bẫy chính tả đuôi động từ: Động từ kết thúc bằng 'o' (go, do) phải thêm '-es' thành 'goes, does'.",
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
        teacherIntro: "Nước sôi ở 100 độ C. Nước (Water) là danh từ không đếm được (coi như số ít), động từ 'boil' chia sao nhỉ?",
        teacherPraise: "Xuất sắc! Danh từ không đếm được 'Water' coi như số ít nên động từ 'boil' thêm '-s' thành 'boils'!",
        teacherExplanation: "Hiện tại đơn diễn tả quy luật tự nhiên: 'Water' (Nước) là danh từ không đếm được, luôn chia theo ngôi thứ 3 số ít. Do đó động từ 'boil' (sôi) thêm '-s' thành 'boils'.",
        teacherCorrection: "Chưa chính xác con ơi! Trong tiếng Anh, danh từ không đếm được như 'Water' luôn được coi là số ít. Vì vậy động từ 'boil' bắt buộc phải thêm đuôi '-s' thành 'boils' con nhé!",
        vietnameseTranslation: "Nước sôi ở 100 độ C.",
        grammarTrap: "Bẫy danh từ không đếm được: Water, milk, rice... luôn chia động từ ở dạng số ít (thêm -s/-es).",
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
        teacherIntro: "Bạn của tôi (My friend - 1 người bạn) đi bơi vào mỗi cuối tuần. Động từ 'go' chia thế nào?",
        teacherPraise: "Chính xác 100%! 'My friend' là số ít nên động từ 'go' thêm '-es' thành 'goes' (goes swimming)!",
        teacherExplanation: "'My friend' là danh từ số ít (không có đuôi -s). Động từ 'go' tận cùng bằng chữ 'o' nên thêm '-es' thành 'goes'.",
        teacherCorrection: "Con nhìn kỹ từ 'friend' nhé, không có đuôi 's' nên chỉ là 1 người bạn (số ít). Động từ 'go' phải thêm '-es' thành 'goes', con đừng để 'go' nguyên thể nhé!",
        vietnameseTranslation: "Bạn của tôi đi bơi vào mỗi dịp cuối tuần.",
        grammarTrap: "Bẫy: Quên thêm -es cho động từ 'go'.",
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
        teacherIntro: "Bạn 'Julie' (1 người) thích trượt tuyết. Động từ 'like' chia thế nào với Julie?",
        teacherPraise: "Chuẩn xác! Julie là số ít nên động từ 'like' thêm '-s' thành 'likes'!",
        teacherExplanation: "Chủ ngữ 'Julie' là danh từ riêng số ít (She). Động từ thường 'like' thêm đuôi '-s' thành 'likes'.",
        teacherCorrection: "Chưa đúng rồi con gái! Julie là 1 bạn nữ (số ít), nên động từ 'like' phải thêm đuôi '-s' thành 'likes', không để nguyên 'like' con nhé!",
        vietnameseTranslation: "Julie thích môn trượt tuyết.",
        grammarTrap: "Bẫy: Quên chia động từ thêm -s với tên riêng.",
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
        teacherIntro: "Câu hỏi với bạn 'Emma' (1 người - số ít). Trợ động từ đứng đầu câu là 'Do' hay 'Does'?",
        teacherPraise: "Tuyệt vời! 'Emma' là số ít nên câu hỏi dùng trợ động từ 'Does'!",
        teacherExplanation: "Công thức câu hỏi nghi vấn Hiện Tại Đơn với chủ ngữ số ít: DOES + S(số ít) + V(nguyên mẫu)? Vì vậy: Does Emma talk...?",
        teacherCorrection: "Chưa chính xác con ơi! Emma là tên của 1 người (ngôi thứ 3 số ít), nên câu hỏi bắt buộc phải dùng trợ động từ 'Does', không dùng 'Do' nhé!",
        vietnameseTranslation: "Emma có nói chuyện với bố mẹ của bạn ấy không?",
        grammarTrap: "Bẫy: Nhầm Do và Does cho tên riêng số ít.",
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
        teacherIntro: "Bạn 'Tom' luôn luôn đọc sách ở đây. Động từ 'read' chia thế nào với Tom?",
        teacherPraise: "Xuất sắc! Tom là số ít nên động từ 'read' thêm '-s' thành 'reads'!",
        teacherExplanation: "Chủ ngữ 'Tom' là ngôi thứ 3 số ít (He). Động từ 'read' chia ở hiện tại đơn thêm đuôi '-s' thành 'reads'.",
        teacherCorrection: "Chưa đúng rồi con yêu! Tom là 1 bạn nam (số ít), nên động từ 'read' phải thêm đuôi '-s' thành 'reads', con đừng chọn 'read' nguyên mẫu nhé!",
        vietnameseTranslation: "Tom luôn luôn đọc sách ở đây.",
        grammarTrap: "Bẫy: Trạng từ tần suất 'always' đứng giữa chủ ngữ và động từ, động từ vẫn phải chia thêm -s bình thường.",
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
        teacherIntro: "Chúng tôi (We) tập thể dục buổi sáng đều đặn. Chủ ngữ 'We' (số nhiều) thì động từ 'do' chia sao nhỉ?",
        teacherPraise: "Đỉnh của chóp! Chủ ngữ 'We' là ngôi thứ nhất số nhiều nên động từ 'do' GIỮ NGUYÊN THỂ!",
        teacherExplanation: "Quy tắc cốt lõi: Với các chủ ngữ I / You / We / They và danh từ số nhiều, động từ ở thì hiện tại đơn GIỮ NGUYÊN MẪU. Cụm từ: do morning exercise (tập thể dục buổi sáng).",
        teacherCorrection: "Con chú ý nhé: Chủ ngữ là 'We' (Chúng tôi - số nhiều) thì động từ KHÔNG ĐƯỢC chia 'does' mà phải giữ nguyên thể là 'do' (do morning exercise) con nha!",
        vietnameseTranslation: "Chúng tôi tập thể dục buổi sáng đều đặn.",
        grammarTrap: "Bẫy: Nhầm lẫn giữa 'do' và 'does' khi chủ ngữ là We.",
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
  },

  // ĐẢO 7: THÌ HIỆN TẠI TIẾP DIỄN (Trang 34 - 40 SGK Bổ Trợ)
  {
    id: "g5-island-7",
    islandNumber: 7,
    name: "Đảo Hiện Tại Tiếp Diễn (Present Continuous)",
    title: "Present Continuous: Hành động đang diễn ra (S + am/is/are + V-ing) (Trang 34 - 40)",
    theme: "ocean",
    badge: "⚡",
    skyColor: "linear-gradient(180deg, #0284c7 0%, #bae6fd 100%)",
    requiredStars: 0,
    stages: [
      {
        id: "g5-stage-7-1",
        number: 1,
        name: "Bắn Bóng Thêm Đuôi -ING",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Chọn đúng dạng đuôi -ing: running, dancing, writing...",
        starsReward: 3
      },
      {
        id: "g5-stage-7-2",
        number: 2,
        name: "Xếp Chữ Dấu Hiệu Tiếp Diễn",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Ghép các từ chỉ thời gian: NOW, LISTEN, MOMENT",
        starsReward: 3
      },
      {
        id: "g5-stage-7-3",
        number: 3,
        name: "Thử Thách Trắc Nghiệm Thì Tiếp Diễn",
        type: "quiz",
        icon: "🎯",
        targetDesc: "12 câu hỏi trắc nghiệm thì hiện tại tiếp diễn từ SGK trang 37-40",
        starsReward: 5
      }
    ],
    words: [
      { id: "g5w7_1", word: "Running", meaning: "Đang chạy bộ", icon: "🏃", phonics: "R" },
      { id: "g5w7_2", word: "Dancing", meaning: "Đang khiêu vũ múa", icon: "💃", phonics: "D" },
      { id: "g5w7_3", word: "Listening", meaning: "Đang lắng nghe", icon: "🎧", phonics: "L" },
      { id: "g5w7_4", word: "Swimming", meaning: "Đang bơi lội", icon: "🏊", phonics: "S" },
      { id: "g5w7_5", word: "Writing", meaning: "Đang viết thư", icon: "✍️", phonics: "W" }
    ],
    quizzes: [
      {
        question: "My baby sister ________ now.",
        teacherIntro: "Hà My ơi, con nhìn thấy từ 'now' (bây giờ) chưa? Đây là dấu hiệu thì Hiện Tại Tiếp Diễn nhé!",
        teacherPraise: "Xuất sắc lắm Hà My! Động từ smile có tận cùng là chữ e, ta phải bỏ e rồi mới thêm ing thành smiling!",
        teacherExplanation: "Quy tắc thì Hiện Tại Tiếp Diễn: S + am/is/are + V-ing. 'My baby sister' là số ít đi với 'is'. Động từ 'smile' kết thúc bằng 'e' nên bỏ 'e' rồi thêm '-ing' ➔ is smiling.",
        teacherCorrection: "Chưa đúng rồi con ơi! Động từ smile tận cùng là chữ e, con nhớ quy tắc bỏ e rồi thêm ing thành smiling nhé!",
        vietnameseTranslation: "Em gái bé bỏng của tôi đang mỉm cười ngay bây giờ.",
        grammarTrap: "Bẫy chính tả: Động từ kết thúc bằng chữ 'e' phải bỏ 'e' trước khi thêm đuôi '-ing'.",
        situation: "Bài 3 - Câu 1 (SGK Trang 39):",
        targetPicture: "👶",
        instruction: "Hà My chọn dạng đúng của động từ smile:",
        options: [
          { text: "is smiling", correct: true },
          { text: "is smileing", correct: false },
          { text: "smiling", correct: false },
          { text: "is smilling", correct: false }
        ],
        explanation: "Chủ ngữ số ít đi với 'is', động từ 'smile' bỏ 'e' thêm 'ing' -> 'is smiling'!"
      },
      {
        question: "Steve is in his bedroom. He ________ the floor at the moment.",
        teacherIntro: "Steve đang ở trong phòng ngủ. Cụm từ 'at the moment' (ngay lúc này) báo hiệu thì gì nào con?",
        teacherPraise: "Tuyệt vời con gái! Steve là chủ ngữ số ít nên đi với 'is cleaning'!",
        teacherExplanation: "Dấu hiệu 'at the moment' (ngay lúc này) chỉ hành động đang diễn ra. Chủ ngữ 'He' (Steve - số ít) đi với cấu trúc 'is + V-ing' ➔ is cleaning.",
        teacherCorrection: "Con chú ý nhé: Cụm từ 'at the moment' nghĩa là ngay lúc này. Steve là 1 người nên ta chọn 'is cleaning' con nhé!",
        vietnameseTranslation: "Steve đang ở trong phòng ngủ. Cậu ấy đang lau sàn nhà vào lúc này.",
        grammarTrap: "Bẫy thì: Nhận diện cụm từ 'at the moment' để chia thì tiếp diễn, tránh nhầm sang hiện tại đơn.",
        situation: "Bài 3 - Câu 2 (SGK Trang 39):",
        targetPicture: "🧹",
        instruction: "Hà My chọn dạng đúng của động từ clean:",
        options: [
          { text: "is cleaning", correct: true },
          { text: "cleans", correct: false },
          { text: "cleaning", correct: false },
          { text: "are cleaning", correct: false }
        ],
        explanation: "Dấu hiệu 'at the moment', chủ ngữ 'He' số ít -> 'is cleaning'!"
      },
      {
        question: "I am at the table with my family. We ________ dinner.",
        teacherIntro: "Cả nhà đang ngồi vào bàn ăn. Chủ ngữ 'We' (chúng tôi) thì động từ have chia tiếp diễn như thế nào?",
        teacherPraise: "Chính xác tuyệt đối! 'We' đi với 'are', và động từ have bỏ chữ e thành having!",
        teacherExplanation: "Chủ ngữ 'We' (chúng tôi - ngôi thứ nhất số nhiều) đi với 'are'. Động từ 'have' tận cùng bằng 'e' nên bỏ 'e' thêm '-ing' ➔ are having.",
        teacherCorrection: "Bẫy ở đây là chữ have tận cùng là e, con phải bỏ e thành having, và chủ ngữ We đi với are having nhé!",
        vietnameseTranslation: "Tôi đang ngồi ở bàn cùng gia đình. Chúng tôi đang dùng bữa tối.",
        grammarTrap: "Bẫy chia To Be theo chủ ngữ số nhiều 'We' và bỏ 'e' của 'have' thành 'having'.",
        situation: "Bài 3 - Câu 3 (SGK Trang 39):",
        targetPicture: "🍽️",
        instruction: "Hà My chọn dạng đúng của động từ have dinner:",
        options: [
          { text: "are having", correct: true },
          { text: "are haveing", correct: false },
          { text: "is having", correct: false },
          { text: "having", correct: false }
        ],
        explanation: "Chủ ngữ 'We' số nhiều đi với 'are having'!"
      },
      {
        question: "My mum and I ________ shopping at the moment.",
        teacherIntro: "Mẹ và tôi đang đi mua sắm. 'My mum and I' là mấy người vậy con gái?",
        teacherPraise: "Quá thông minh Hà My ơi! Mẹ và tôi là 2 người, tức là chúng tôi (số nhiều), nên phải dùng are going!",
        teacherExplanation: "Bẫy ngữ pháp kinh điển: 'My mum and I' gồm 2 người (tương đương đại từ We - chúng tôi), vì vậy động từ To Be phải là 'are', không được nhìn thấy 'I' mà vội vàng chọn 'am'!",
        teacherCorrection: "Bẫy siêu to này con! Mặc dù đứng cạnh chữ I, nhưng chủ ngữ là 'Mẹ và tôi' gồm 2 người, nên phải dùng are going con nha!",
        vietnameseTranslation: "Mẹ và tôi đang đi mua sắm vào thời điểm này.",
        grammarTrap: "Bẫy chủ ngữ ghép: 'X and I' là chủ ngữ số nhiều (We), phải dùng 'are', không dùng 'am'.",
        situation: "Bài 3 - Câu 5 (SGK Trang 39):",
        targetPicture: "🛍️",
        instruction: "Hà My chọn To Be + V-ing cho 'My mum and I':",
        options: [
          { text: "are going", correct: true },
          { text: "am going", correct: false },
          { text: "goes", correct: false },
          { text: "go", correct: false }
        ],
        explanation: "'My mum and I' là chủ ngữ 2 người (số nhiều) -> 'are going'!"
      },
      {
        question: "Look! The sun ________. Isn't the colour beautiful?",
        teacherIntro: "Nhìn kìa, mặt trời đang lặn! Từ 'Look!' có dấu chấm than là dấu hiệu hành động đang diễn ra ngay trước mắt!",
        teacherPraise: "Tuyệt đỉnh! Động từ set có 1 nguyên âm kẹp giữa 2 phụ âm nên nhân đôi chữ t thành setting!",
        teacherExplanation: "Dấu hiệu 'Look!' (Nhìn kìa!) yêu cầu dùng thì Hiện Tại Tiếp Diễn. 'The sun' là số ít đi với 'is'. Động từ 1 âm tiết 'set' có 1 nguyên âm 'e' kẹp giữa 2 phụ âm 's' và 't' nên phải nhân đôi phụ âm cuối 't' ➔ is setting.",
        teacherCorrection: "Con nhớ quy tắc nhân đôi phụ âm nhé: từ set có âm e kẹp giữa s và t, nên phải gấp đôi chữ t thành setting con nhé!",
        vietnameseTranslation: "Nhìn kìa! Mặt trời đang lặn. Màu sắc thật là đẹp phải không?",
        grammarTrap: "Bẫy nhân đôi phụ âm: Động từ 1 âm tiết có nguyên âm kẹp giữa 2 phụ âm (set, run, swim, stop) phải gấp đôi phụ âm cuối.",
        situation: "Bài 2 - Câu 11 (SGK Trang 37):",
        targetPicture: "🌅",
        instruction: "Hà My chọn dạng tiếp diễn của động từ set:",
        options: [
          { text: "is setting", correct: true },
          { text: "is seting", correct: false },
          { text: "sets", correct: false },
          { text: "are setting", correct: false }
        ],
        explanation: "Sau 'Look!', chủ ngữ 'The sun' số ít, 'set' gấp đôi 't' -> 'is setting'!"
      },
      {
        question: "Molly and Sue ________ the car at the moment.",
        teacherIntro: "Molly và Sue đang rửa xe ô tô. Con hãy chú ý xem chủ ngữ ở đây là số ít hay số nhiều nhé!",
        teacherPraise: "Chuẩn xác 100%! Molly và Sue là hai người nên ta chọn are washing!",
        teacherExplanation: "Chủ ngữ ghép 'Molly and Sue' gồm 2 người (danh từ số nhiều), đi với động từ To Be 'are'. Động từ 'wash' kết thúc bằng 2 phụ âm 'sh' nên chỉ cần thêm đuôi '-ing' ➔ are washing.",
        teacherCorrection: "Con nhìn kỹ nhé: Có cả bạn Molly và bạn Sue là 2 người, chủ ngữ số nhiều phải dùng are washing con nha!",
        vietnameseTranslation: "Molly và Sue đang rửa xe ô tô vào lúc này.",
        grammarTrap: "Bẫy chủ ngữ 2 người và quy tắc thêm đuôi -ing thông thường cho từ tận cùng là sh.",
        situation: "Bài 3 - Câu 7 (SGK Trang 39):",
        targetPicture: "🚗",
        instruction: "Hà My chọn dạng đúng của wash car:",
        options: [
          { text: "are washing", correct: true },
          { text: "is washing", correct: false },
          { text: "are washhing", correct: false },
          { text: "am washing", correct: false }
        ],
        explanation: "Chủ ngữ 2 người 'Molly and Sue' đi với 'are washing'!"
      },
      {
        question: "Listen! Someone ________ at the door.",
        teacherIntro: "Lắng nghe kìa! Có ai đó đang gõ cửa. 'Listen!' là dấu hiệu nhận biết hành động đang diễn ra!",
        teacherPraise: "Giỏi quá Hà My! Đại từ bất định 'Someone' luôn chia ở dạng số ít là is knocking!",
        teacherExplanation: "Dấu hiệu 'Listen!' (Hãy lắng nghe!) báo hiệu hành động đang diễn ra ngay lúc nói. Đại từ bất định 'Someone' (ai đó) luôn luôn chia động từ ở ngôi thứ 3 số ít ➔ is knocking.",
        teacherCorrection: "Con nhớ nhé: Khi gặp 'Listen!' ta chia thì tiếp diễn. Từ 'Someone' (ai đó) luôn đi với động từ số ít is knocking con nhé!",
        vietnameseTranslation: "Hãy lắng nghe kìa! Có ai đó đang gõ cửa.",
        grammarTrap: "Bẫy đại từ bất định: Someone, anyone, everyone... luôn chia động từ ở dạng số ít.",
        situation: "Bài 2 - Câu 39 (SGK Trang 38):",
        targetPicture: "🚪",
        instruction: "Hà My chọn dạng đúng của knock:",
        options: [
          { text: "is knocking", correct: true },
          { text: "knocks", correct: false },
          { text: "are knocking", correct: false },
          { text: "is knockking", correct: false }
        ],
        explanation: "Dấu hiệu 'Listen!', đại từ bất định 'Someone' số ít -> 'is knocking'!"
      },
      {
        question: "The children ________ in the bedroom at the moment.",
        teacherIntro: "Các bạn nhỏ đang ngủ trong phòng. Danh từ 'The children' là 1 bạn hay nhiều bạn nhỏ nào?",
        teacherPraise: "Xuất sắc! 'The children' là số nhiều của child, nên ta chọn are sleeping!",
        teacherExplanation: "Danh từ số nhiều bất quy tắc: 1 đứa trẻ là 'child', từ 2 đứa trẻ trở lên là 'children'. Vì vậy 'The children' là số nhiều, đi với 'are sleeping'.",
        teacherCorrection: "Con cẩn thận bẫy nhé: 'child' là 1 đứa trẻ, còn 'children' là nhiều đứa trẻ (số nhiều) nên phải dùng are sleeping con nhé!",
        vietnameseTranslation: "Những đứa trẻ đang ngủ trong phòng ngủ vào lúc này.",
        grammarTrap: "Bẫy danh từ số nhiều bất quy tắc: 'children' không có đuôi s nhưng là danh từ số nhiều!",
        situation: "Bài 2 - Câu 44 (SGK Trang 38):",
        targetPicture: "🛏️",
        instruction: "Hà My chọn dạng đúng của sleep:",
        options: [
          { text: "are sleeping", correct: true },
          { text: "is sleeping", correct: false },
          { text: "sleeps", correct: false },
          { text: "are sleep", correct: false }
        ],
        explanation: "'The children' là danh từ số nhiều -> 'are sleeping'!"
      },
      {
        question: "Right now, Sandra ________ a cake.",
        teacherIntro: "Ngay lúc này, Sandra đang hoàn thiện chiếc bánh. 'Right now' là dấu hiệu thì gì con nhỉ?",
        teacherPraise: "Rất chuẩn! Sandra là ngôi thứ 3 số ít nên đi với is finishing!",
        teacherExplanation: "Cụm từ 'Right now' (ngay lúc này) báo hiệu thì Hiện Tại Tiếp Diễn. Sandra là tên riêng 1 người (ngôi thứ 3 số ít) đi với 'is finishing'.",
        teacherCorrection: "Dấu hiệu 'Right now' là ngay lúc này, Sandra là 1 người nên đáp án đúng phải là is finishing con nhé!",
        vietnameseTranslation: "Ngay lúc này, Sandra đang hoàn thành một chiếc bánh ngọt.",
        grammarTrap: "Dấu hiệu nhận biết 'Right now' kết hợp với ngôi thứ 3 số ít.",
        situation: "Bài 2 - Câu 36 (SGK Trang 38):",
        targetPicture: "🎂",
        instruction: "Hà My chọn dạng tiếp diễn của finish:",
        options: [
          { text: "is finishing", correct: true },
          { text: "finishes", correct: false },
          { text: "are finishing", correct: false },
          { text: "is finish", correct: false }
        ],
        explanation: "Dấu hiệu 'Right now', Sandra số ít -> 'is finishing'!"
      },
      {
        question: "Look! The boy ________.",
        teacherIntro: "Nhìn kìa, cậu bé đang khóc! Động từ cry tận cùng bằng chữ y thì thêm đuôi ing như thế nào?",
        teacherPraise: "Tuyệt vời con gái! Động từ tận cùng bằng chữ y chỉ việc thêm trực tiếp đuôi ing thành crying!",
        teacherExplanation: "Quy tắc thêm đuôi '-ing': Tất cả các động từ kết thúc bằng chữ 'y' (như cry, play, study) đều GIỮ NGUYÊN 'y' và thêm '-ing' (crying, playing, studying), không đổi y thành i!",
        teacherCorrection: "Con lưu ý nhé: Động từ kết thúc bằng chữ y như cry thì giữ nguyên y và thêm ing thành crying con nha!",
        vietnameseTranslation: "Nhìn kìa! Cậu bé đang khóc.",
        grammarTrap: "Bẫy chuyển đổi 'y' sang 'i': Thêm đuôi -ing giữ nguyên chữ y, không biến đổi như khi thêm -es/-ed!",
        situation: "Bài 2 - Câu 29 (SGK Trang 38):",
        targetPicture: "😢",
        instruction: "Hà My chọn dạng đúng của cry:",
        options: [
          { text: "is crying", correct: true },
          { text: "are crying", correct: false },
          { text: "cries", correct: false },
          { text: "is cryying", correct: false }
        ],
        explanation: "The boy số ít, động từ cry giữ nguyên y thêm ing -> 'is crying'!"
      },
      {
        question: "Where ________ your aunt staying at your house this week?",
        teacherIntro: "Bác của bạn đang ở phòng nào trong tuần này? 'Your aunt' là danh từ số ít hay số nhiều?",
        teacherPraise: "Chính xác! 'Your aunt' là danh từ số ít, cấu trúc câu hỏi tiếp diễn dùng trợ động từ To Be 'is'!",
        teacherExplanation: "Cấu trúc câu hỏi nghi vấn Thì Hiện Tại Tiếp Diễn: Wh-word + is/are + S + V-ing? Chủ ngữ 'your aunt' (bác/dì của bạn - số ít) nên dùng To Be 'is'.",
        teacherCorrection: "Chưa đúng rồi con! Vì sau chủ ngữ có động từ 'staying' đuôi ing, nên câu hỏi phải dùng To Be 'is', không dùng does con nhé!",
        vietnameseTranslation: "Dì của bạn đang ở đâu tại nhà bạn trong tuần này?",
        grammarTrap: "Bẫy trợ động từ: Nhầm lẫn giữa 'is' (thì tiếp diễn) và 'does' (thì hiện tại đơn).",
        situation: "Bài 2 - Câu 5 (SGK Trang 37):",
        targetPicture: "🏠",
        instruction: "Hà My chọn trợ động từ cho câu hỏi tiếp diễn:",
        options: [
          { text: "is", correct: true },
          { text: "are", correct: false },
          { text: "does", correct: false },
          { text: "do", correct: false }
        ],
        explanation: "Câu hỏi tiếp diễn với chủ ngữ số ít 'your aunt' -> 'is'!"
      },
      {
        question: "Jane and Paul ________ on holiday with us right now.",
        teacherIntro: "Jane và Paul không đi nghỉ mát cùng chúng tôi lúc này. Đây là câu phủ định thì tiếp diễn!",
        teacherPraise: "Quá giỏi Hà My ơi! Jane và Paul là hai người, phủ định tiếp diễn dùng aren't going!",
        teacherExplanation: "Cấu trúc phủ định thì Hiện Tại Tiếp Diễn: S + am/is/are + not + V-ing. Chủ ngữ 'Jane and Paul' là 2 người (số nhiều) ➔ are not going = aren't going.",
        teacherCorrection: "Con chú ý nhé: Dấu hiệu 'right now' và chủ ngữ 2 người Jane and Paul nên dạng phủ định là aren't going con nhé!",
        vietnameseTranslation: "Jane và Paul không đi nghỉ mát cùng chúng tôi vào lúc này.",
        grammarTrap: "Bẫy phủ định thì tiếp diễn: aren't + V-ing, tránh nhầm sang hiện tại đơn 'don't go'.",
        situation: "Bài 2 - Câu 10 (SGK Trang 37):",
        targetPicture: "🏖️",
        instruction: "Hà My chọn dạng phủ định của go on holiday:",
        options: [
          { text: "aren't going", correct: true },
          { text: "isn't going", correct: false },
          { text: "don't go", correct: false },
          { text: "doesn't go", correct: false }
        ],
        explanation: "Chủ ngữ số nhiều 'Jane and Paul', phủ định tiếp diễn -> 'aren't going'!"
      }
    ]
  },

  // ĐẢO 8: HOẠT ĐỘNG RẢNH RỖI & ĐỊA CHỈ NƠI Ở (Unit 2 & Unit 4 SGK Bổ Trợ)
  {
    id: "g5-island-8",
    islandNumber: 8,
    name: "Đảo Hoạt Động Rảnh Rỗi & Địa Chỉ",
    title: "Unit 2 & Unit 4: Our Homes & Free Time Activities (Trang 25 - 26, 61 - 64)",
    theme: "sky",
    badge: "🏡",
    skyColor: "linear-gradient(180deg, #38bdf8 0%, #fef08a 100%)",
    requiredStars: 0,
    stages: [
      {
        id: "g5-stage-8-1",
        number: 1,
        name: "Bắn Bóng Nhà Cửa & Nơi Ở",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Chọn đúng từ vựng: flat, tower, building, guitar...",
        starsReward: 3
      },
      {
        id: "g5-stage-8-2",
        number: 2,
        name: "Xếp Chữ Sở Thích Bạn Minh Anh",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Ghép các từ: GUITAR, PICNIC, TENNIS, ADDRESS",
        starsReward: 3
      },
      {
        id: "g5-stage-8-3",
        number: 3,
        name: "Thử Thách Đọc Hiểu & Giao Tiếp Bạn Minh Anh",
        type: "quiz",
        icon: "🎯",
        targetDesc: "10 câu hỏi đọc hiểu đoạn văn bạn Minh Anh và mẫu câu hỏi địa chỉ",
        starsReward: 5
      }
    ],
    words: [
      { id: "g5w8_1", word: "Tower", meaning: "Tòa tháp cao tầng", icon: "🗼", phonics: "T" },
      { id: "g5w8_2", word: "Guitar", meaning: "Đàn ghi-ta cổ điển", icon: "🎸", phonics: "G" },
      { id: "g5w8_3", word: "Picnic", meaning: "Dã ngoại cắm trại", icon: "🧺", phonics: "P" },
      { id: "g5w8_4", word: "Address", meaning: "Địa chỉ nơi ở", icon: "📍", phonics: "A" },
      { id: "g5w8_5", word: "Building", meaning: "Tòa cao ốc hiện đại", icon: "🏢", phonics: "B" }
    ],
    quizzes: [
      {
        question: "Where do you live? - I live ________ 116 Hoa Binh Street.",
        teacherIntro: "Hỏi và trả lời về nơi ở trong bài Unit 2: Khi có số nhà cụ thể 116 thì ta dùng giới từ gì nào?",
        teacherPraise: "Đúng rồi Hà My ơi! Khi có số nhà cụ thể ta dùng giới từ 'at' (at 116 Hoa Binh Street)!",
        teacherExplanation: "Quy tắc ngữ pháp về giới từ chỉ nơi chốn trong Unit 2: Khi có số nhà cụ thể (ví dụ 116 Hoa Binh Street), bắt buộc dùng giới từ 'at'. Nếu chỉ có tên đường không có số nhà thì dùng 'in/on'.",
        teacherCorrection: "Bí kíp Unit 2 đây con: Nếu chỉ có tên đường ta dùng on, nhưng khi có số nhà cụ thể như 116 thì bắt buộc phải dùng giới từ 'at' con nhé!",
        vietnameseTranslation: "Bạn sống ở đâu? - Tôi sống tại số 116 đường Hòa Bình.",
        grammarTrap: "Bẫy giới từ: Phân biệt 'at + số nhà cụ thể' với 'in/on + tên đường phố'.",
        situation: "Phần B - Cấu trúc 1 (SGK Trang 25):",
        targetPicture: "📍",
        instruction: "Hà My chọn giới từ phù hợp với số nhà cụ thể:",
        options: [
          { text: "at", correct: true },
          { text: "in", correct: false },
          { text: "on", correct: false },
          { text: "from", correct: false }
        ],
        explanation: "Có số nhà cụ thể '116 Hoa Binh Street' dùng giới từ 'at'!"
      },
      {
        question: "What's your address? - ________ 38 Dien Bien Street.",
        teacherIntro: "Khi bạn hỏi 'Địa chỉ của bạn là gì?', câu trả lời chuẩn trong SGK bắt đầu bằng từ nào?",
        teacherPraise: "Tuyệt vời! 'What's your address?' được trả lời bằng 'It's + địa chỉ'!",
        teacherExplanation: "Mẫu câu giao tiếp chuẩn SGK Lớp 5 Unit 2: Hỏi: 'What's your address?' ➔ Trả lời: 'It's + địa chỉ cụ thể' (It's 38 Dien Bien Street).",
        teacherCorrection: "Con nhớ mẫu câu giao tiếp Unit 2 nhé: 'What's your address?' luôn trả lời bằng 'It's...' con nha!",
        vietnameseTranslation: "Địa chỉ của bạn ở đâu? - Đó là số 38 đường Điện Biên.",
        grammarTrap: "Bẫy mẫu câu giao tiếp: Trả lời về địa chỉ dùng 'It's...', không dùng 'I am...'.",
        situation: "Phần B - Cấu trúc 2 (SGK Trang 25):",
        targetPicture: "🏘️",
        instruction: "Hà My chọn mẫu câu trả lời địa chỉ:",
        options: [
          { text: "It's", correct: true },
          { text: "I am", correct: false },
          { text: "They are", correct: false },
          { text: "There is", correct: false }
        ],
        explanation: "Trả lời cho câu hỏi 'What's your address?' là 'It's + địa chỉ'!"
      },
      {
        question: "I live in a big ________ with many floors.",
        teacherIntro: "Tôi sống trong một tòa tháp cao tầng có nhiều tầng lầu. Từ vựng chỉ tòa tháp trong Unit 2 là gì?",
        teacherPraise: "Chính xác 100%! 'tower' là tòa tháp cao tầng trong SGK Lớp 5!",
        teacherExplanation: "Từ vựng SGK Lớp 5 Unit 2: 'tower' nghĩa là tòa tháp cao vút (như Bitexco Tower, Landmark 81), 'flat' là căn hộ, 'house' là ngôi nhà riêng.",
        teacherCorrection: "Từ vựng Unit 2 trang 25 chỉ tòa tháp cao tầng là 'tower' con nhé!",
        vietnameseTranslation: "Tôi sống trong một tòa tháp lớn với rất nhiều tầng.",
        grammarTrap: "Bẫy nhận diện từ vựng nơi chốn: tower (tòa tháp) vs flat (căn hộ) vs building (tòa nhà).",
        situation: "Bài tập 1 (SGK Trang 26):",
        targetPicture: "🗼",
        instruction: "Hà My chọn từ vựng chỉ tòa tháp:",
        options: [
          { text: "tower", correct: true },
          { text: "table", correct: false },
          { text: "water", correct: false },
          { text: "cloud", correct: false }
        ],
        explanation: "'tower' có nghĩa là tòa tháp cao tầng!"
      },
      {
        question: "What does Minh Anh do in her free time? (Bài đọc Trang 63)",
        teacherIntro: "Trong bài đọc trang 63, bạn Minh Anh kể bạn ấy thường làm gì vào thời gian rảnh rỗi?",
        teacherPraise: "Xuất sắc! Bài đọc ghi rõ: 'In my free time, I often play the guitar'!",
        teacherExplanation: "Trích dẫn bài đọc Unit 4 SGK Trang 63: 'My name is Minh Anh... In my free time, I often play the guitar.' Do đó câu trả lời chính xác là bạn ấy chơi đàn guitar.",
        teacherCorrection: "Con nhớ lại bài đọc trang 63 nhé: Bạn Minh Anh nói 'In my free time, I often play the guitar' con nhé!",
        vietnameseTranslation: "Minh Anh làm gì vào thời gian rảnh rỗi? - Bạn ấy thường chơi đàn ghi-ta.",
        grammarTrap: "Bẫy đọc hiểu: Đọc kỹ chi tiết hoạt động của chính bạn Minh Anh trong đoạn 1.",
        situation: "Bài đọc 10 - Câu 1 (SGK Trang 63):",
        targetPicture: "🎸",
        instruction: "Hà My chọn hoạt động rảnh rỗi của bạn Minh Anh:",
        options: [
          { text: "She often plays the guitar.", correct: true },
          { text: "She goes swimming.", correct: false },
          { text: "She cleans the house.", correct: false },
          { text: "She watches football.", correct: false }
        ],
        explanation: "Dẫn chứng bài đọc: 'In my free time, I often play the guitar'!"
      },
      {
        question: "Why does Minh Anh like playing the guitar? (Bài đọc Trang 63)",
        teacherIntro: "Tại sao bạn Minh Anh lại thích chơi đàn ghi-ta? Con tìm lý do trong bài đọc nhé!",
        teacherPraise: "Quá tuyệt vời! Minh Anh thích chơi đàn ghi-ta vì nó giúp bạn ấy thư giãn rất nhiều!",
        teacherExplanation: "Dẫn chứng trong bài đọc trang 63: 'I like playing the guitar because it helps me relax a lot.' Từ 'relax' có nghĩa là thư giãn tinh thần sau giờ học.",
        teacherCorrection: "Trong bài đọc Minh Anh có nói: 'I like playing the guitar because it helps me relax a lot' con nhé!",
        vietnameseTranslation: "Tại sao bạn Minh Anh lại thích chơi đàn ghi-ta? - Vì nó giúp bạn ấy thư giãn rất nhiều.",
        grammarTrap: "Bẫy lý do: Nhớ từ khóa quan trọng 'relax a lot' (thư giãn nhiều).",
        situation: "Bài đọc 10 - Câu 2 (SGK Trang 63):",
        targetPicture: "🧘",
        instruction: "Hà My chọn lý do bạn Minh Anh thích chơi guitar:",
        options: [
          { text: "Because it helps her relax a lot.", correct: true },
          { text: "Because her mother wants her to play.", correct: false },
          { text: "Because she is a doctor.", correct: false },
          { text: "Because she wants to be a singer.", correct: false }
        ],
        explanation: "Dẫn chứng bài đọc: 'because it helps me relax a lot'!"
      },
      {
        question: "What does Minh Anh's father often do on TV? (Bài đọc Trang 63)",
        teacherIntro: "Bố của bạn Minh Anh thường xem chương trình gì trên ti vi nào con?",
        teacherPraise: "Chính xác! Bố bạn Minh Anh là người hâm mộ bóng đá nên thường xem các chương trình thể thao!",
        teacherExplanation: "Dẫn chứng bài đọc trang 63: 'My father often watches sports programs on TV because he is a big fan of football.'",
        teacherCorrection: "Bài đọc trang 63 kể rằng bố bạn Minh Anh là fan bóng đá và thường xem sports programs trên TV con nhé!",
        vietnameseTranslation: "Bố bạn Minh Anh thường làm gì? - Bác ấy thường xem các chương trình thể thao trên TV.",
        grammarTrap: "Bẫy nhân vật: Phân biệt sở thích của người bố (watches sports) với sở thích của người mẹ (cooking).",
        situation: "Bài đọc 10 - Câu 4 (SGK Trang 63):",
        targetPicture: "📺",
        instruction: "Hà My chọn hoạt động của bố bạn Minh Anh:",
        options: [
          { text: "He often watches sports programs.", correct: true },
          { text: "He cooks meals.", correct: false },
          { text: "He plays chess.", correct: false },
          { text: "He reads books.", correct: false }
        ],
        explanation: "Dẫn chứng: 'My father often watches sports programs on TV'!"
      },
      {
        question: "What does her mother like doing? (Bài đọc Trang 63)",
        teacherIntro: "Mẹ của bạn Minh Anh thích làm việc gì cho cả gia đình?",
        teacherPraise: "Rất giỏi! Mẹ bạn Minh Anh thích nấu nướng những bữa cơm ngon cho gia đình!",
        teacherExplanation: "Dẫn chứng SGK Trang 63: 'My mother likes cooking. She usually cooks meals for our family.'",
        teacherCorrection: "Trong bài đọc ghi rõ: 'My mother likes cooking. She usually cooks meals for our family' con nha!",
        vietnameseTranslation: "Mẹ của bạn ấy thích làm gì? - Bác ấy thích nấu ăn.",
        grammarTrap: "Từ vựng sở thích: like + cooking (nấu ăn).",
        situation: "Bài đọc 10 - Câu 5 (SGK Trang 63):",
        targetPicture: "🍳",
        instruction: "Hà My chọn sở thích của mẹ bạn Minh Anh:",
        options: [
          { text: "She likes cooking.", correct: true },
          { text: "She likes running.", correct: false },
          { text: "She likes watching films.", correct: false },
          { text: "She likes surfing the web.", correct: false }
        ],
        explanation: "Dẫn chứng bài đọc: 'My mother likes cooking'!"
      },
      {
        question: "How often does Minh Anh's family go for a picnic? (Bài đọc Trang 63)",
        teacherIntro: "Gia đình bạn Minh Anh đi dã ngoại cắm trại với tần suất bao lâu một lần?",
        teacherPraise: "Tuyệt đối chính xác! Gia đình Minh Anh đi dã ngoại mỗi tháng một lần (once a month)!",
        teacherExplanation: "Dẫn chứng câu áp chót bài đọc trang 63: 'We go for a picnic once a month.' Từ 'once a month' có nghĩa là mỗi tháng một lần.",
        teacherCorrection: "Con xem câu cuối bài đọc nhé: 'We go for a picnic once a month' nghĩa là mỗi tháng một lần con nhé!",
        vietnameseTranslation: "Gia đình bạn Minh Anh đi dã ngoại mấy lần? - Một tháng một lần.",
        grammarTrap: "Cụm từ chỉ tần suất: once a month (1 lần/tháng) vs twice a week (2 lần/tuần).",
        situation: "Bài đọc 10 - Câu 8 (SGK Trang 63):",
        targetPicture: "⛺",
        instruction: "Hà My chọn tần suất đi dã ngoại:",
        options: [
          { text: "Once a month.", correct: true },
          { text: "Every day.", correct: false },
          { text: "Twice a week.", correct: false },
          { text: "Never.", correct: false }
        ],
        explanation: "Dẫn chứng: 'We go for a picnic once a month'!"
      },
      {
        question: "Mark ________ like salad. (Trang 64)",
        teacherIntro: "Bài tập điền don't hoặc doesn't trang 64: Bạn Mark là 1 người thì câu phủ định dùng từ nào?",
        teacherPraise: "Chuẩn luôn Hà My ơi! Mark là ngôi thứ 3 số ít nên ta dùng trợ động từ doesn't!",
        teacherExplanation: "Quy tắc câu phủ định Hiện Tại Đơn với động từ thường: S (số ít: He, She, It, Mark) + DOESN'T + V(nguyên mẫu). Do đó: Mark doesn't like salad.",
        teacherCorrection: "Con nhớ quy tắc nhé: Với ngôi thứ 3 số ít như Mark, phủ định của động từ thường ta dùng doesn't con nha!",
        vietnameseTranslation: "Mark không thích món salad.",
        grammarTrap: "Bẫy trợ động từ phủ định: Ngôi thứ 3 số ít đi với doesn't, không đi với don't.",
        situation: "Bài 11 - Câu 1 (SGK Trang 64):",
        targetPicture: "🥗",
        instruction: "Hà My chọn don't hay doesn't:",
        options: [
          { text: "doesn't", correct: true },
          { text: "don't", correct: false },
          { text: "isn't", correct: false },
          { text: "aren't", correct: false }
        ],
        explanation: "Chủ ngữ ngôi thứ 3 số ít 'Mark' dùng 'doesn't'!"
      },
      {
        question: "David and Phillip ________ play tennis every Sunday. (Trang 64)",
        teacherIntro: "David và Phillip không chơi quần vợt vào chủ nhật. Chủ ngữ là 2 bạn thì dùng don't hay doesn't?",
        teacherPraise: "Xuất sắc! Hai người là chủ ngữ số nhiều nên dùng don't!",
        teacherExplanation: "Chủ ngữ ghép 'David and Phillip' là 2 người (danh từ số nhiều), vì vậy trợ động từ phủ định ở thì hiện tại đơn là 'don't' ➔ David and Phillip don't play tennis.",
        teacherCorrection: "Chưa đúng rồi con! David và Phillip là 2 người (số nhiều), nên câu phủ định phải dùng don't con nhé!",
        vietnameseTranslation: "David và Phillip không chơi quần vợt vào mỗi Chủ Nhật.",
        grammarTrap: "Bẫy chủ ngữ ghép 2 người: Là số nhiều (They) nên dùng don't.",
        situation: "Bài 11 - Câu 5 (SGK Trang 64):",
        targetPicture: "🎾",
        instruction: "Hà My chọn trợ động từ phủ định số nhiều:",
        options: [
          { text: "don't", correct: true },
          { text: "doesn't", correct: false },
          { text: "isn't", correct: false },
          { text: "aren't", correct: false }
        ],
        explanation: "Chủ ngữ 2 người 'David and Phillip' dùng trợ động từ 'don't'!"
      }
    ]
  },

  // ĐẢO 9: QUÁ KHỨ KỶ NIỆM (Past Simple - Was/Were & Động Từ Bất Quy Tắc)
  {
    id: "g5-island-9",
    islandNumber: 9,
    name: "Đảo Quá Khứ Kỷ Niệm (Past Simple)",
    title: "Past Simple: Động từ Was/Were & Bảng Động Từ Quá Khứ (Trang 85 - 90)",
    theme: "sunset",
    badge: "⏳",
    skyColor: "linear-gradient(180deg, #f97316 0%, #fed7aa 100%)",
    requiredStars: 0,
    stages: [
      {
        id: "g5-stage-9-1",
        number: 1,
        name: "Bắn Bóng Was hay Were",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Phân biệt Was (I, he, she, it) và Were (you, we, they)",
        starsReward: 3
      },
      {
        id: "g5-stage-9-2",
        number: 2,
        name: "Xếp Chữ Quá Khứ Bất Quy Tắc",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Ghép các động từ V2: WENT, BOUGHT, MADE, VISITED",
        starsReward: 3
      },
      {
        id: "g5-stage-9-3",
        number: 3,
        name: "Thử Thách Bậc Thầy Quá Khứ Đơn",
        type: "quiz",
        icon: "🎯",
        targetDesc: "12 câu hỏi trắc nghiệm quá khứ đơn từ SGK trang 89-90",
        starsReward: 5
      }
    ],
    words: [
      { id: "g5w9_1", word: "Went", meaning: "Đã đi (quá khứ của Go)", icon: "🚶", phonics: "W" },
      { id: "g5w9_2", word: "Bought", meaning: "Đã mua sắm (quá khứ của Buy)", icon: "🛍️", phonics: "B" },
      { id: "g5w9_3", word: "Made", meaning: "Đã làm bánh (quá khứ của Make)", icon: "🎂", phonics: "M" },
      { id: "g5w9_4", word: "Visited", meaning: "Đã đi thăm quan", icon: "🏛️", phonics: "V" },
      { id: "g5w9_5", word: "Yesterday", meaning: "Ngày hôm qua", icon: "📅", phonics: "Y" }
    ],
    quizzes: [
      {
        question: "My parents ________ very tired after their trip to Newcastle. (Trang 89)",
        teacherIntro: "Bố mẹ tôi đã rất mệt sau chuyến đi. 'My parents' có s là số ít hay số nhiều trong quá khứ?",
        teacherPraise: "Rất xuất sắc Hà My ơi! 'My parents' là bố mẹ (số nhiều) nên trong quá khứ đi với 'were'!",
        teacherExplanation: "Quy tắc động từ To Be ở thì Quá Khứ Đơn: I / He / She / It / Danh từ số ít ➔ đi với WAS (3 chữ). You / We / They / Danh từ số nhiều ➔ đi với WERE (4 chữ). 'My parents' có đuôi -s là danh từ số nhiều nên dùng 'were'.",
        teacherCorrection: "Con nhìn đuôi chữ parents có s nhé, đây là bố mẹ (2 người - số nhiều), quá khứ phải dùng were con nha!",
        vietnameseTranslation: "Bố mẹ tôi đã rất mệt mỏi sau chuyến đi đến Newcastle.",
        grammarTrap: "Bẫy danh từ số nhiều có đuôi -s: 'parents' (bố mẹ) luôn đi với 'were' 4 chữ.",
        situation: "Bài 1 - Câu 1 (SGK Trang 89):",
        targetPicture: "🛋️",
        instruction: "Hà My chọn was hay were cho My parents:",
        options: [
          { text: "were", correct: true },
          { text: "was", correct: false },
          { text: "are", correct: false },
          { text: "is", correct: false }
        ],
        explanation: "'My parents' là danh từ số nhiều -> dùng 'were'!"
      },
      {
        question: "I ________ on a long trip to the USA two years ago. (Trang 89)",
        teacherIntro: "Tôi đã có chuyến đi Mỹ 2 năm trước. Dấu hiệu 'ago' là quá khứ, chủ ngữ 'I' đi với từ nào?",
        teacherPraise: "Đúng rồi con gái! Trong thì quá khứ đơn, chủ ngữ 'I' luôn đi với động từ 'was'!",
        teacherExplanation: "Dấu hiệu nhận biết quá khứ: 'two years ago' (hai năm trước). Đại từ nhân xưng 'I' trong thì quá khứ đơn luôn đi với 'was' (3 chữ) ➔ I was.",
        teacherCorrection: "Con chú ý nhé: Trong thì quá khứ đơn, chủ ngữ 'I' đi với 'was' ba chữ, không đi với were con nhé!",
        vietnameseTranslation: "Tôi đã có một chuyến đi dài đến Mỹ hai năm trước.",
        grammarTrap: "Bẫy To Be của 'I': Hiện tại đi với 'am', quá khứ đi với 'was'.",
        situation: "Bài 1 - Câu 4 (SGK Trang 89):",
        targetPicture: "🗽",
        instruction: "Hà My chọn động từ To Be quá khứ cho chủ ngữ 'I':",
        options: [
          { text: "was", correct: true },
          { text: "were", correct: false },
          { text: "am", correct: false },
          { text: "be", correct: false }
        ],
        explanation: "Chủ ngữ 'I' ở quá khứ đơn đi với 'was'!"
      },
      {
        question: "They ________ in the History Museum yesterday. (Trang 89)",
        teacherIntro: "Họ đã ở bảo tàng lịch sử ngày hôm qua. 'Yesterday' là quá khứ, chủ ngữ 'They' đi với từ nào?",
        teacherPraise: "Chính xác 100%! 'They' là số nhiều nên quá khứ đi với 'were' bốn chữ!",
        teacherExplanation: "Dấu hiệu 'yesterday' (ngày hôm qua). Chủ ngữ 'They' (họ - ngôi thứ ba số nhiều) trong thì quá khứ đơn luôn đi với 'were'.",
        teacherCorrection: "Con nhớ nhé: Chủ ngữ số nhiều They / We / You trong quá khứ luôn đi với 'were' bốn chữ con nhé!",
        vietnameseTranslation: "Họ đã ở trong Bảo tàng Lịch sử vào ngày hôm qua.",
        grammarTrap: "Dấu hiệu 'yesterday' và chủ ngữ số nhiều 'They' đi với were.",
        situation: "Bài 1 - Câu 6 (SGK Trang 89):",
        targetPicture: "🏛️",
        instruction: "Hà My chọn was hay were cho 'They':",
        options: [
          { text: "were", correct: true },
          { text: "was", correct: false },
          { text: "are", correct: false },
          { text: "have been", correct: false }
        ],
        explanation: "Chủ ngữ số nhiều 'They' ở quá khứ đi với 'were'!"
      },
      {
        question: "You were not at home yesterday, where ________ you? (Trang 89)",
        teacherIntro: "Hôm qua bạn không có ở nhà, bạn đã ở đâu vậy? Chủ ngữ 'you' đi với từ nào trong quá khứ?",
        teacherPraise: "Tuyệt đỉnh! Chủ ngữ 'you' luôn luôn đi với 'were'!",
        teacherExplanation: "Đại từ 'You' (bạn / các bạn) luôn đi cùng động từ To Be 'were' (4 chữ) ở thì quá khứ đơn, bất kể là số ít hay số nhiều: 'where were you?'",
        teacherCorrection: "Con lưu ý quy tắc vàng nhé: Chủ ngữ 'you' dù là 1 người hay nhiều người thì trong quá khứ đều đi với 'were' con nha!",
        vietnameseTranslation: "Hôm qua bạn không có ở nhà, bạn đã ở đâu thế?",
        grammarTrap: "Bẫy đại từ 'You': Luôn đi với 'were', không bao giờ đi với 'was'.",
        situation: "Bài 1 - Câu 14 (SGK Trang 89):",
        targetPicture: "❓",
        instruction: "Hà My chọn dạng To Be quá khứ cho 'you':",
        options: [
          { text: "were", correct: true },
          { text: "was", correct: false },
          { text: "are", correct: false },
          { text: "did", correct: false }
        ],
        explanation: "Chủ ngữ 'you' luôn đi với 'were' -> 'where were you?'!"
      },
      {
        question: "There ________ a lot of people at the party last night. (Trang 89)",
        teacherIntro: "Đã có rất nhiều người ở bữa tiệc tối qua. Từ 'people' (mọi người) là danh từ số ít hay số nhiều?",
        teacherPraise: "Quá thông minh! 'people' là danh từ số nhiều của person, nên ta dùng 'There were'!",
        teacherExplanation: "Dấu hiệu 'last night' (tối qua). 'People' là danh từ số nhiều đặc biệt (những người / mọi người). Cấu trúc tồn tại ở quá khứ: There was + danh từ số ít; There were + danh từ số nhiều ➔ There were a lot of people.",
        teacherCorrection: "Bẫy danh từ đặc biệt: 'person' là 1 người, còn 'people' là nhiều người (số nhiều), nên trong quá khứ phải dùng There were con nhé!",
        vietnameseTranslation: "Đã có rất nhiều người tham dự bữa tiệc tối hôm qua.",
        grammarTrap: "Bẫy danh từ số nhiều bất quy tắc: 'people' không có đuôi s nhưng là số nhiều!",
        situation: "Bài 1 - Câu 20 (SGK Trang 89):",
        targetPicture: "🎉",
        instruction: "Hà My chọn There was hay There were:",
        options: [
          { text: "were", correct: true },
          { text: "was", correct: false },
          { text: "are", correct: false },
          { text: "is", correct: false }
        ],
        explanation: "'people' là danh từ số nhiều -> dùng 'There were'!"
      },
      {
        question: "I ________ a delicious cake for my son yesterday. (Trang 90)",
        teacherIntro: "Tôi đã làm một chiếc bánh ngon hôm qua. Động từ 'make' chuyển sang quá khứ thành từ gì?",
        teacherPraise: "Xuất sắc! 'make' là động từ bất quy tắc, quá khứ là 'made', không có từ maked!",
        teacherExplanation: "Động từ bất quy tắc (Irregular verbs): 'Make' (làm/chế tạo) ở quá khứ đơn (V2) chuyển thành 'Made'. Không được thêm đuôi -ed thành 'maked'.",
        teacherCorrection: "Con chú ý nhé: 'make' đổi sang quá khứ là 'made', trong tiếng Anh không có từ maked con nha!",
        vietnameseTranslation: "Hôm qua tôi đã làm một chiếc bánh thơm ngon cho con trai mình.",
        grammarTrap: "Bẫy động từ bất quy tắc: make ➔ made (không thêm -ed thành maked).",
        situation: "Bài 2 - Câu 1 (SGK Trang 90):",
        targetPicture: "🎂",
        instruction: "Hà My chọn dạng quá khứ của make:",
        options: [
          { text: "made", correct: true },
          { text: "maked", correct: false },
          { text: "makes", correct: false },
          { text: "makeing", correct: false }
        ],
        explanation: "Quá khứ của 'make' là 'made'!"
      },
      {
        question: "They ________ a new car last week. (Trang 90)",
        teacherIntro: "Họ đã mua một chiếc xe hơi tuần trước. Quá khứ của động từ 'buy' (mua) là gì nào con?",
        teacherPraise: "Chính xác tuyệt đối! Động từ 'buy' chuyển sang quá khứ thành 'bought'!",
        teacherExplanation: "Động từ bất quy tắc: 'Buy' (mua) chuyển sang quá khứ đơn (V2) là 'Bought'. Đây là từ vựng rất phổ biến trong đề thi và bài tập SGK.",
        teacherCorrection: "Con nhớ bảng động từ bất quy tắc nhé: 'buy' chuyển sang quá khứ là 'bought', không thêm đuôi ed thành buyed con nhé!",
        vietnameseTranslation: "Họ đã mua một chiếc xe ô tô mới vào tuần trước.",
        grammarTrap: "Bẫy động từ bất quy tắc: buy ➔ bought (không tồn tại từ buyed).",
        situation: "Bài 2 - Câu 3 (SGK Trang 90):",
        targetPicture: "🚘",
        instruction: "Hà My chọn dạng quá khứ của buy:",
        options: [
          { text: "bought", correct: true },
          { text: "buyed", correct: false },
          { text: "buys", correct: false },
          { text: "buying", correct: false }
        ],
        explanation: "Quá khứ của 'buy' là 'bought'!"
      },
      {
        question: "We ________ to the cinema last Sunday. (Trang 90)",
        teacherIntro: "Chủ nhật trước chúng tôi đã đi xem phim. Động từ 'go' đổi sang quá khứ thành từ nào?",
        teacherPraise: "Quá giỏi Hà My! 'go' chuyển sang quá khứ là 'went', câu này con nhớ rất tốt!",
        teacherExplanation: "Động từ bất quy tắc quan trọng nhất: 'Go' (đi) khi chuyển sang quá khứ đơn (V2) đổi thành 'Went'. Cụm từ: went to the cinema (đã đi xem phim).",
        teacherCorrection: "Con chú ý từ rất quen thuộc này nhé: Động từ 'go' khi sang quá khứ biến đổi hoàn toàn thành 'went' con nha!",
        vietnameseTranslation: "Chúng tôi đã đi xem phim vào Chủ Nhật tuần trước.",
        grammarTrap: "Bẫy động từ bất quy tắc kinh điển: go ➔ went (không bao giờ dùng goed).",
        situation: "Bài 2 - Câu 8 (SGK Trang 90):",
        targetPicture: "🎬",
        instruction: "Hà My chọn dạng quá khứ của go:",
        options: [
          { text: "went", correct: true },
          { text: "goed", correct: false },
          { text: "go", correct: false },
          { text: "going", correct: false }
        ],
        explanation: "Quá khứ của 'go' là 'went'!"
      },
      {
        question: "She ________ her key yesterday and had to find it. (Trang 90)",
        teacherIntro: "Hôm qua cô ấy đã làm mất chìa khóa. Động từ 'lose' (làm mất) chuyển sang quá khứ là gì?",
        teacherPraise: "Đỉnh của chóp! 'lose' chuyển sang dạng quá khứ là 'lost'!",
        teacherExplanation: "Động từ bất quy tắc: 'Lose' (đánh mất) chuyển sang thì quá khứ đơn (V2) là 'Lost'.",
        teacherCorrection: "Con ghi nhớ nhé: Động từ 'lose' đổi sang quá khứ là 'lost' (đã làm mất) con nha!",
        vietnameseTranslation: "Hôm qua cô ấy đã đánh mất chìa khóa và phải đi tìm nó.",
        grammarTrap: "Bẫy chính tả bất quy tắc: lose ➔ lost.",
        situation: "Bài 2 - Câu 6 (SGK Trang 90):",
        targetPicture: "🔑",
        instruction: "Hà My chọn dạng quá khứ của lose:",
        options: [
          { text: "lost", correct: true },
          { text: "loosed", correct: false },
          { text: "loses", correct: false },
          { text: "losed", correct: false }
        ],
        explanation: "Quá khứ của 'lose' là 'lost'!"
      },
      {
        question: "My mother ________ her best friend at the cafe. (Trang 90)",
        teacherIntro: "Mẹ tôi đã nhìn thấy người bạn thân nhất ở quán cà phê. Quá khứ của động từ 'see' là gì con?",
        teacherPraise: "Tuyệt vời! 'see' chuyển sang quá khứ đơn là 'saw'!",
        teacherExplanation: "Động từ bất quy tắc: 'See' (nhìn thấy / gặp gỡ) đổi sang quá khứ đơn (V2) là 'Saw'.",
        teacherCorrection: "Con nhớ bảng bất quy tắc nhé: Động từ 'see' (nhìn thấy) sang quá khứ là 'saw' con nhé!",
        vietnameseTranslation: "Mẹ tôi đã gặp người bạn thân nhất tại quán cà phê.",
        grammarTrap: "Bẫy chia động từ: see ➔ saw (không thêm ed thành seed).",
        situation: "Bài 2 - Câu 10 (SGK Trang 90):",
        targetPicture: "☕",
        instruction: "Hà My chọn dạng quá khứ của see:",
        options: [
          { text: "saw", correct: true },
          { text: "see", correct: false },
          { text: "seed", correct: false },
          { text: "seen", correct: false }
        ],
        explanation: "Quá khứ của 'see' là 'saw'!"
      },
      {
        question: "Sarah ________ her hair two days ago. (Trang 90)",
        teacherIntro: "Sarah đã gội đầu 2 ngày trước. Động từ có quy tắc 'wash' thêm đuôi gì khi ở quá khứ?",
        teacherPraise: "Chuẩn xác! Động từ có quy tắc 'wash' chỉ việc thêm đuôi -ed thành 'washed'!",
        teacherExplanation: "Động từ có quy tắc (Regular verbs): 'Wash' (gội / rửa) khi chuyển sang quá khứ đơn chỉ cần thêm đuôi '-ed' ➔ washed.",
        teacherCorrection: "Với động từ có quy tắc như 'wash', khi ở thì quá khứ đơn ta thêm đuôi -ed thành 'washed' con nhé!",
        vietnameseTranslation: "Sarah đã gội đầu cách đây hai ngày.",
        grammarTrap: "Nhận diện động từ có quy tắc thêm đuôi '-ed' cho thì quá khứ.",
        situation: "Bài 2 - Câu 15 (SGK Trang 90):",
        targetPicture: "🚿",
        instruction: "Hà My chọn dạng quá khứ của wash:",
        options: [
          { text: "washed", correct: true },
          { text: "washes", correct: false },
          { text: "wash", correct: false },
          { text: "washs", correct: false }
        ],
        explanation: "Động từ có quy tắc 'wash' thêm đuôi '-ed' -> 'washed'!"
      },
      {
        question: "He ________ his homework carefully last night. (Trang 90)",
        teacherIntro: "Tối qua cậu ấy đã làm bài tập về nhà rất cẩn thận. Quá khứ của động từ 'do' là gì con?",
        teacherPraise: "Xuất sắc! Quá khứ đơn của 'do' chính là 'did'!",
        teacherExplanation: "Động từ bất quy tắc: 'Do' (làm) ở thì quá khứ đơn chuyển thành 'Did' (V2). Cụm từ: did his homework (đã làm bài tập về nhà).",
        teacherCorrection: "Con nhớ nhé: Trong thì quá khứ đơn, động từ 'do' chuyển thành 'did' (V2) con nha!",
        vietnameseTranslation: "Cậu ấy đã làm bài tập về nhà rất cẩn thận vào tối hôm qua.",
        grammarTrap: "Bẫy động từ bất quy tắc: do ➔ did (done là phân từ V3).",
        situation: "Bài 2 - Câu 11 (SGK Trang 90):",
        targetPicture: "📝",
        instruction: "Hà My chọn dạng quá khứ của do homework:",
        options: [
          { text: "did", correct: true },
          { text: "done", correct: false },
          { text: "do", correct: false },
          { text: "does", correct: false }
        ],
        explanation: "Quá khứ của 'do' là 'did'!"
      }
    ]
  },

  // ĐẢO 10: HOẠT ĐỘNG TRƯỜNG HỌC & CHUYẾN ĐI BÀ NÀ (Unit 7, Unit 9 & Review 2)
  {
    id: "g5-island-10",
    islandNumber: 10,
    name: "Đảo Trường Học & Chuyến Đi Bà Nà",
    title: "Unit 7, 9 & Review 2: School Activities & Ba Na Hills Holiday (Trang 115 - 154)",
    theme: "forest",
    badge: "🏆",
    skyColor: "linear-gradient(180deg, #10b981 0%, #a7f3d0 100%)",
    requiredStars: 0,
    stages: [
      {
        id: "g5-stage-10-1",
        number: 1,
        name: "Bắn Bóng Tìm Từ Khác Biệt (Odd One Out)",
        type: "bubble",
        icon: "🎈",
        targetDesc: "Tìm từ không cùng nhóm: pilot, vet, nurse, fun...",
        starsReward: 3
      },
      {
        id: "g5-stage-10-2",
        number: 2,
        name: "Xếp Chữ Chuyến Du Lịch",
        type: "spelling",
        icon: "🔤",
        targetDesc: "Ghép các từ: BRIDGE, CABLE, PROJECT, SCHOOL",
        starsReward: 3
      },
      {
        id: "g5-stage-10-3",
        number: 3,
        name: "Thử Thách Đỉnh Cao Lớp 5 Toàn Diện",
        type: "quiz",
        icon: "🎯",
        targetDesc: "12 câu hỏi trắc nghiệm hoạt động trường học & đọc hiểu chuyến đi Bà Nà",
        starsReward: 5
      }
    ],
    words: [
      { id: "g5w10_1", word: "Bridge", meaning: "Cây cầu (Golden Bridge)", icon: "🌉", phonics: "B" },
      { id: "g5w10_2", word: "Cable", meaning: "Cáp treo (cable car)", icon: "🚡", phonics: "C" },
      { id: "g5w10_3", word: "Project", meaning: "Dự án học tập", icon: "📊", phonics: "P" },
      { id: "g5w10_4", word: "Amusement", meaning: "Khu vui chơi giải trí", icon: "🎡", phonics: "A" },
      { id: "g5w10_5", word: "Holiday", meaning: "Kỳ nghỉ hè tuyệt vời", icon: "🏖️", phonics: "H" }
    ],
    quizzes: [
      {
        question: "Circle the odd one out: A. pilot | B. vet | C. nurse | D. fun (Trang 115)",
        teacherIntro: "Bài tập tìm từ khác biệt trang 115: Pilot, vet, nurse và fun, từ nào không cùng nhóm?",
        teacherPraise: "Xuất sắc! Pilot, vet, nurse là các nghề nghiệp, còn fun là tính từ vui vẻ!",
        teacherExplanation: "Phân loại từ vựng Unit 7: 'Pilot' (phi công), 'vet' (bác sĩ thú y), 'nurse' (y tá) đều là các danh từ chỉ nghề nghiệp. Riêng 'fun' (niềm vui / vui vẻ) là danh từ/tính từ cảm xúc nên là từ khác biệt (odd one out).",
        teacherCorrection: "Con quan sát nhé: Ba từ kia đều là nghề nghiệp bác sĩ thú y, y tá, phi công; chỉ có 'fun' là niềm vui nên nó khác biệt con nhé!",
        vietnameseTranslation: "Khoanh tròn từ khác loại: Phi công, bác sĩ thú y, y tá, vui vẻ.",
        grammarTrap: "Bẫy từ vựng khác loại: Nhận diện trường từ vựng nghề nghiệp vs tính từ.",
        situation: "Bài 4 - Câu 3 (SGK Trang 115):",
        targetPicture: "✈️",
        instruction: "Hà My chọn từ không cùng nhóm:",
        options: [
          { text: "fun", correct: true },
          { text: "pilot", correct: false },
          { text: "vet", correct: false },
          { text: "nurse", correct: false }
        ],
        explanation: "'fun' là tính từ vui vẻ, 3 từ còn lại là nghề nghiệp!"
      },
      {
        question: "Circle the odd one out: A. swim | B. read | C. sing | D. playing (Trang 115)",
        teacherIntro: "Trong 4 từ: swim, read, sing và playing, từ nào có hình thức khác với các từ còn lại?",
        teacherPraise: "Rất tinh mắt Hà My ơi! Swim, read, sing là động từ nguyên mẫu, chỉ có 'playing' có đuôi -ing!",
        teacherExplanation: "Phân tích ngữ pháp: 'swim' (bơi), 'read' (đọc), 'sing' (hát) đều là động từ ở dạng nguyên thể không đuôi. Riêng 'playing' là động từ đã thêm hậu tố đuôi '-ing'.",
        teacherCorrection: "Con chú ý hình thức của từ nhé: Ba từ kia là động từ nguyên thể, chỉ có 'playing' là thêm đuôi -ing con nha!",
        vietnameseTranslation: "Khoanh tròn từ khác loại: Bơi, đọc, hát, đang chơi.",
        grammarTrap: "Bẫy hình thức động từ: Động từ nguyên mẫu vs Động từ dạng V-ing.",
        situation: "Bài 4 - Câu 5 (SGK Trang 115):",
        targetPicture: "🎾",
        instruction: "Hà My tìm từ có dạng khác biệt:",
        options: [
          { text: "playing", correct: true },
          { text: "swim", correct: false },
          { text: "read", correct: false },
          { text: "sing", correct: false }
        ],
        explanation: "'playing' có đuôi '-ing', 3 từ còn lại ở dạng nguyên thể!"
      },
      {
        question: "Circle the odd one out: A. hospital | B. fire station | C. doctor | D. farm (Trang 115)",
        teacherIntro: "Bệnh viện, trạm cứu hỏa, trang trại và bác sĩ. Từ nào không cùng loại nào con?",
        teacherPraise: "Chuẩn luôn! Hospital, fire station, farm là nơi chốn địa điểm, còn 'doctor' là nghề nghiệp!",
        teacherExplanation: "Trường từ vựng: 'Hospital' (bệnh viện), 'fire station' (trạm cứu hỏa), 'farm' (trang trại) là các danh từ chỉ nơi chốn / địa điểm làm việc. Riêng 'doctor' (bác sĩ) là danh từ chỉ người / nghề nghiệp.",
        teacherCorrection: "Con phân biệt nơi chốn và con người nhé: Ba từ kia là địa điểm, chỉ có 'doctor' là người bác sĩ con nhé!",
        vietnameseTranslation: "Khoanh tròn từ khác loại: Bệnh viện, trạm cứu hỏa, bác sĩ, trang trại.",
        grammarTrap: "Bẫy phân loại từ: Nơi chốn địa điểm vs Con người nghề nghiệp.",
        situation: "Bài 4 - Câu 7 (SGK Trang 115):",
        targetPicture: "🏥",
        instruction: "Hà My chọn từ chỉ người khác với các nơi chốn:",
        options: [
          { text: "doctor", correct: true },
          { text: "hospital", correct: false },
          { text: "fire station", correct: false },
          { text: "farm", correct: false }
        ],
        explanation: "'doctor' là người bác sĩ, 3 từ còn lại là địa điểm nơi chốn!"
      },
      {
        question: "Why does she like reading books? - ________ she thinks it's fun. (Trang 116)",
        teacherIntro: "Câu hỏi bắt đầu bằng từ 'Why' (Tại sao) thì câu trả lời bắt đầu bằng từ gì nào Hà My?",
        teacherPraise: "Chính xác tuyệt đối! Câu hỏi 'Why' luôn được trả lời bằng 'Because' (Bởi vì)!",
        teacherExplanation: "Cấu trúc cặp câu hỏi - câu trả lời chỉ nguyên nhân lý do trong Unit 7: Hỏi: 'Why do/does + S + like + V-ing?' ➔ Trả lời: 'Because + S + thinks/likes...'.",
        teacherCorrection: "Quy tắc cặp từ hỏi đáp: Khi câu hỏi là 'Why' (Tại sao), con luôn bắt đầu câu trả lời bằng 'Because' (Bởi vì) con nhé!",
        vietnameseTranslation: "Tại sao cô ấy thích đọc sách? - Bởi vì cô ấy nghĩ nó rất vui.",
        grammarTrap: "Bẫy liên từ: Câu hỏi 'Why' (tại sao) luôn đi với câu trả lời 'Because' (bởi vì).",
        situation: "Bài 5 - Câu 2 (SGK Trang 116):",
        targetPicture: "📖",
        instruction: "Hà My chọn liên từ trả lời cho câu hỏi Why:",
        options: [
          { text: "Because", correct: true },
          { text: "So", correct: false },
          { text: "Although", correct: false },
          { text: "And", correct: false }
        ],
        explanation: "Trả lời cho câu hỏi 'Why' luôn bắt đầu bằng 'Because'!"
      },
      {
        question: "What school activity do you like? - I like ________. (Trang 116)",
        teacherIntro: "Bạn thích hoạt động trường học nào? Sau động từ 'like' thì động từ chia ở dạng nào con gái?",
        teacherPraise: "Tuyệt đỉnh! Sau động từ 'like' ta dùng V-ing: like doing projects (thích làm dự án)!",
        teacherExplanation: "Quy tắc ngữ pháp quan trọng Unit 7: Sau các động từ chỉ sở thích như 'like, love, enjoy', động từ đi sau luôn ở dạng danh động từ 'V-ing'. Vì vậy: like + doing projects (làm các bài tập dự án).",
        teacherCorrection: "Con nhớ công thức nhé: Sau like, love, enjoy ta luôn dùng động từ đuôi -ing, vì vậy phải là 'doing projects' con nhé!",
        vietnameseTranslation: "Bạn thích hoạt động trường học nào? - Tôi thích làm các bài tập dự án.",
        grammarTrap: "Cấu trúc sở thích: like + V-ing.",
        situation: "Bài 6 - Câu 3 (SGK Trang 116):",
        targetPicture: "📊",
        instruction: "Hà My chọn dạng đúng sau động từ like:",
        options: [
          { text: "doing projects", correct: true },
          { text: "do projects", correct: false },
          { text: "did projects", correct: false },
          { text: "does projects", correct: false }
        ],
        explanation: "Sau 'like' dùng động từ đuôi '-ing' -> 'doing projects'!"
      },
      {
        question: "What would you like to be in the future? - I'd like to be ________. (Trang 116)",
        teacherIntro: "Bạn muốn làm nghề gì trong tương lai? 'doctor' bắt đầu bằng phụ âm d thì dùng a hay an?",
        teacherPraise: "Quá chuẩn! Từ 'doctor' bắt đầu bằng phụ âm nên ta dùng 'a doctor'!",
        teacherExplanation: "Mẫu câu hỏi nghề nghiệp mơ ước: 'What would you like to be in the future?' ➔ 'I'd like to be + a/an + nghề nghiệp'. 'Doctor' bắt đầu bằng phụ âm 'd' nên dùng mạo từ 'a doctor'.",
        teacherCorrection: "Con nhớ quy tắc mạo từ nhé: Đứng trước danh từ nghề nghiệp số ít bắt đầu bằng phụ âm ta dùng 'a doctor' con nha!",
        vietnameseTranslation: "Bạn muốn làm nghề gì trong tương lai? - Tôi muốn trở thành một bác sĩ.",
        grammarTrap: "Mạo từ a/an trước nghề nghiệp: 'a doctor' (bắt đầu bằng phụ âm d).",
        situation: "Bài 5 - Câu 6 (SGK Trang 116):",
        targetPicture: "🩺",
        instruction: "Hà My chọn dạng có mạo từ cho nghề nghiệp doctor:",
        options: [
          { text: "a doctor", correct: true },
          { text: "doctor", correct: false },
          { text: "the doctor", correct: false },
          { text: "an doctor", correct: false }
        ],
        explanation: "Trước nghề nghiệp số ít bắt đầu bằng phụ âm dùng 'a doctor'!"
      },
      {
        question: "Where did you go last night? (Trang 136)",
        teacherIntro: "Tối qua bạn đã đi đâu? Câu hỏi có trợ động từ quá khứ 'did', câu trả lời chia động từ thế nào?",
        teacherPraise: "Xuất sắc! Trong câu trả lời quá khứ, động từ go chuyển thành went: 'I went to the cinema'!",
        teacherExplanation: "Cấu trúc hỏi đáp thì Quá Khứ Đơn trong Unit 9: Hỏi: 'Where did you go...?' ➔ Trả lời: 'I went to + địa điểm' (I went to the cinema).",
        teacherCorrection: "Con chú ý thì quá khứ nhé: Câu hỏi hỏi về tối qua 'last night', nên động từ go phải chia thành 'went' con nhé!",
        vietnameseTranslation: "Tối qua bạn đã đi đâu thế? - Tôi đã đi đến rạp chiếu phim.",
        grammarTrap: "Bẫy thì: Câu hỏi có 'did' động từ nguyên thể 'go', nhưng câu trả lời khẳng định phải lùi thì thành 'went'.",
        situation: "Bài 6 - Câu 1 (SGK Trang 136):",
        targetPicture: "🍿",
        instruction: "Hà My chọn câu trả lời đúng cho Where did you go:",
        options: [
          { text: "I went to the cinema.", correct: true },
          { text: "I go to school.", correct: false },
          { text: "I am at home.", correct: false },
          { text: "I playing chess.", correct: false }
        ],
        explanation: "Hỏi quá khứ 'Where did you go' trả lời bằng 'I went to the cinema'!"
      },
      {
        question: "Did you stay at home yesterday? (Trang 136)",
        teacherIntro: "Hôm qua bạn có ở nhà không? Câu hỏi bắt đầu bằng 'Did you...?' thì trả lời phủ định thế nào?",
        teacherPraise: "Rất thông minh! Câu hỏi 'Did you...?' trả lời phủ định bằng 'No, I didn't'!",
        teacherExplanation: "Câu hỏi Yes/No ở thì Quá Khứ Đơn: 'Did + S + V(nguyên mẫu)?' ➔ Trả lời khẳng định: 'Yes, S + did.' / Phủ định: 'No, S + didn't.'",
        teacherCorrection: "Con nhớ cặp trợ động từ hỏi và đáp nhé: Hỏi bằng 'Did' thì trả lời phải dùng 'didn't', không dùng do hay am not con nha!",
        vietnameseTranslation: "Hôm qua bạn có ở nhà không? - Không, tôi không ở nhà. Tôi đã đi sở thú.",
        grammarTrap: "Bẫy trợ động từ ngắn: Did you...? ➔ No, I didn't.",
        situation: "Bài 6 - Câu 5 (SGK Trang 136):",
        targetPicture: "🦁",
        instruction: "Hà My chọn câu trả lời Yes/No đúng thì:",
        options: [
          { text: "No, I didn't. I was at the zoo.", correct: true },
          { text: "Yes, I do.", correct: false },
          { text: "No, I am not.", correct: false },
          { text: "Yes, I can.", correct: false }
        ],
        explanation: "Hỏi bằng 'Did' trả lời phủ định bằng 'No, I didn't'!"
      },
      {
        question: "Where did Linh and her class go on last Sunday? (Bài đọc Trang 154)",
        teacherIntro: "Chủ nhật trước bạn Linh và cả lớp đã đi du lịch ở đâu trong bài đọc trang 154?",
        teacherPraise: "Chính xác! Câu đầu bài đọc kể: 'Last Sunday, Linh and her class went to Ba Na Hills'!",
        teacherExplanation: "Dẫn chứng bài đọc Review 2 SGK Trang 154: 'Last Sunday, Linh and her class went to Ba Na Hills.' Địa điểm tham quan là Bà Nà Hills ở Đà Nẵng.",
        teacherCorrection: "Con xem lại câu đầu bài đọc trang 154 nhé: Cả lớp bạn Linh đã đi tham quan Bà Nà Hills con nhé!",
        vietnameseTranslation: "Chủ nhật trước bạn Linh và cả lớp đã đi đâu? - Đến Bà Nà Hills.",
        grammarTrap: "Bẫy đọc hiểu: Nắm chắc địa danh du lịch trong bài đọc.",
        situation: "Bài 7 - Câu 1 (SGK Trang 154):",
        targetPicture: "🚡",
        instruction: "Hà My chọn địa điểm du lịch của bạn Linh:",
        options: [
          { text: "Ba Na Hills", correct: true },
          { text: "Ha Long Bay", correct: false },
          { text: "Cat Ba Island", correct: false },
          { text: "The local zoo", correct: false }
        ],
        explanation: "Dẫn chứng bài đọc: 'went to Ba Na Hills'!"
      },
      {
        question: "What did they do in the morning at Ba Na Hills? (Bài đọc Trang 154)",
        teacherIntro: "Buổi sáng ở Bà Nà Hills, các bạn ấy đã đi dạo trên cây cầu nổi tiếng nào?",
        teacherPraise: "Tuyệt vời! Các bạn ấy đã đi dạo trên Cầu Vàng (Golden Bridge) và đi cáp treo!",
        teacherExplanation: "Dẫn chứng bài đọc Review 2 SGK Trang 154: 'First, they walked over Golden Bridge. They enjoyed the cable car ride.' Cầu Vàng (Golden Bridge) là cây cầu đôi bàn tay khổng lồ nổi tiếng tại Bà Nà.",
        teacherCorrection: "Trong bài đọc kể: 'First, they walked over Golden Bridge' nghĩa là đi dạo trên Cầu Vàng con nhé!",
        vietnameseTranslation: "Họ đã làm gì vào buổi sáng? - Họ đã đi dạo qua Cầu Vàng.",
        grammarTrap: "Bẫy đọc hiểu sự kiện: 'walked over Golden Bridge' là hoạt động đầu tiên buổi sáng.",
        situation: "Bài 7 - Câu 3 (SGK Trang 154):",
        targetPicture: "🌉",
        instruction: "Hà My chọn hoạt động buổi sáng của các bạn:",
        options: [
          { text: "They walked over Golden Bridge.", correct: true },
          { text: "They went swimming.", correct: false },
          { text: "They played soccer.", correct: false },
          { text: "They slept in hotel.", correct: false }
        ],
        explanation: "Dẫn chứng bài đọc: 'First, they walked over Golden Bridge'!"
      },
      {
        question: "What did they do after that? (Bài đọc Trang 154)",
        teacherIntro: "Sau khi ngắm Cầu Vàng, các bạn học sinh đã làm gì ở khu vui chơi?",
        teacherPraise: "Chuẩn xác! Các bạn ấy đã chơi rất nhiều trò chơi vui nhộn tại công viên giải trí amusement park!",
        teacherExplanation: "Dẫn chứng bài đọc Review 2 SGK Trang 154: 'After that, they played some games at the amusement park. Their trip was lots of fun.'",
        teacherCorrection: "Bài đọc ghi: 'After that, they played some games at the amusement park' con nhé!",
        vietnameseTranslation: "Sau đó họ đã làm gì? - Họ đã chơi một số trò chơi ở công viên giải trí.",
        grammarTrap: "Từ vựng công viên giải trí: 'amusement park'.",
        situation: "Bài 7 - Câu 4 (SGK Trang 154):",
        targetPicture: "🎡",
        instruction: "Hà My chọn hoạt động tiếp theo:",
        options: [
          { text: "They played games at the amusement park.", correct: true },
          { text: "They went to the hospital.", correct: false },
          { text: "They bought a car.", correct: false },
          { text: "They drove to school.", correct: false }
        ],
        explanation: "Dẫn chứng: 'they played some games at the amusement park'!"
      },
      {
        question: "How many floors are there in your school? - ________ four. (Trang 116)",
        teacherIntro: "Có bao nhiêu tầng trong trường của bạn? Số 4 là số nhiều thì ta dùng There is hay There are?",
        teacherPraise: "Đỉnh cao! Bốn tầng là số nhiều nên ta dùng cấu trúc 'There are four'!",
        teacherExplanation: "Cấu trúc trả lời số lượng đồ vật / địa điểm: There is + danh từ số ít / There are + danh từ số nhiều. 'Four' (4 tầng) là số nhiều nên dùng 'There are four'.",
        teacherCorrection: "Con nhớ quy tắc số lượng nhé: Four (4 tầng) là số nhiều, nên cấu trúc câu trả lời bắt buộc là 'There are four' con nha!",
        vietnameseTranslation: "Có bao nhiêu tầng trong trường của bạn? - Có 4 tầng.",
        grammarTrap: "Cấu trúc There is vs There are theo số lượng đếm được.",
        situation: "Bài 6 - Câu 10 (SGK Trang 116):",
        targetPicture: "🏫",
        instruction: "Hà My chọn There is hay There are:",
        options: [
          { text: "There are", correct: true },
          { text: "There is", correct: false },
          { text: "They are", correct: false },
          { text: "It has", correct: false }
        ],
        explanation: "Bốn tầng là số nhiều -> dùng 'There are four'!"
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
  { level: 7, minExp: 550, title: "Chiến Binh Tiếp Diễn ⚡", icon: "⚡", bonus: "Chinh phục Thì Hiện Tại Tiếp Diễn (Trang 34-40)" },
  { level: 8, minExp: 720, title: "Chuyên Gia Đọc Hiểu 🏡", icon: "🏡", bonus: "Mở khóa Unit 2 & 4: Nơi Ở & Hoạt Động Rảnh Rỗi" },
  { level: 9, minExp: 920, title: "Đại Sứ Quá Khứ Đơn ⏳", icon: "⏳", bonus: "Làm chủ Bảng Động Từ Was/Were & Bất Quy Tắc" },
  { level: 10, minExp: 1150, title: "Huyền Thoại Thần Đồng Hà My 5C4 🏆", icon: "🏆", bonus: "Xuất sắc hoàn thành 100% toàn bộ SGK Lớp 5 nâng cao!" }
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


// ==============================================================
// CÁC NGÂN HÀNG CÂU HỎI & TRÒ CHƠI BỔ TRỢ MỞ RỘNG (EXPANDED MINIGAMES & POOLS)
// ==============================================================

// 1. ĐẠI CHIẾN BOSS NGỮ PHÁP: DR. MISTAKE (ERROR IDENTIFICATION & CORRECTION)
const GRADE_5_BOSS_QUESTIONS = [
  {
    sentence: "She don't like drinking orange juice in the morning.",
    question: "Dr. Mistake đã gài một lỗi sai trong câu trên! Hãy sửa đúng để giáng sét vào Boss:",
    options: [
      { text: "Sửa 'don't' thành 'doesn't'", correct: true },
      { text: "Sửa 'orange' thành 'an orange'", correct: false },
      { text: "Sửa 'drinking' thành 'drink'", correct: false }
    ],
    explanation: "Chủ ngữ ngôi thứ 3 số ít 'She' trong thì Hiện tại đơn phủ định phải dùng 'doesn't'!"
  },
  {
    sentence: "They was at Ba Na Hills with their family last Sunday.",
    question: "Hãy tìm lỗi sai ngữ pháp thì Quá khứ đơn:",
    options: [
      { text: "Sửa 'was' thành 'were'", correct: true },
      { text: "Sửa 'with' thành 'at'", correct: false },
      { text: "Sửa 'last' thành 'in'", correct: false }
    ],
    explanation: "Chủ ngữ số nhiều 'They' trong quá khứ đơn đi với to be 'were'!"
  },
  {
    sentence: "What are you do right now, Ha My?",
    question: "Phát hiện lỗi sai ở câu thì Hiện tại tiếp diễn:",
    options: [
      { text: "Sửa 'do' thành 'doing'", correct: true },
      { text: "Sửa 'are' thành 'is'", correct: false },
      { text: "Sửa 'now' thành 'yesterday'", correct: false }
    ],
    explanation: "Hiện tại tiếp diễn: What + are + you + doing + right now?"
  },
  {
    sentence: "My sister often go to the library by bicycle.",
    question: "Dr. Mistake đang đắc chí! Sửa câu này để trừ máu Boss:",
    options: [
      { text: "Sửa 'go' thành 'goes'", correct: true },
      { text: "Sửa 'by' thành 'with'", correct: false },
      { text: "Sửa 'bicycle' thành 'bicycles'", correct: false }
    ],
    explanation: "Chủ ngữ ngôi thứ 3 số ít 'My sister', động từ kết thúc bằng -o phải thêm -es thành 'goes'!"
  },
  {
    sentence: "Yesterday, I see a beautiful rainbow over Ngo Quyen school.",
    question: "Sửa lỗi sai động từ trong quá khứ:",
    options: [
      { text: "Sửa 'see' thành 'saw'", correct: true },
      { text: "Sửa 'over' thành 'in'", correct: false },
      { text: "Sửa 'beautiful' thành 'beauty'", correct: false }
    ],
    explanation: "'Yesterday' là thời gian quá khứ, động từ bất quy tắc của see là 'saw'!"
  },
  {
    sentence: "Where does you live in Da Nang city?",
    question: "Sửa lỗi trợ động từ trong câu hỏi:",
    options: [
      { text: "Sửa 'does' thành 'do'", correct: true },
      { text: "Sửa 'in' thành 'at'", correct: false },
      { text: "Sửa 'city' thành 'town'", correct: false }
    ],
    explanation: "Chủ ngữ 'you' đi với trợ động từ 'do': Where do you live?"
  },
  {
    sentence: "He is listen to music in his bedroom.",
    question: "Tìm lỗi sai trong câu tiếp diễn:",
    options: [
      { text: "Sửa 'listen' thành 'listening'", correct: true },
      { text: "Sửa 'is' thành 'are'", correct: false },
      { text: "Sửa 'his' thành 'her'", correct: false }
    ],
    explanation: "Hiện tại tiếp diễn: S + is/am/are + V-ing. Cần sửa thành 'listening'!"
  },
  {
    sentence: "We didn't went to school last weekend.",
    question: "Lỗi sai kinh điển sau trợ động từ didn't:",
    options: [
      { text: "Sửa 'went' thành 'go'", correct: true },
      { text: "Sửa 'didn't' thành 'don't'", correct: false },
      { text: "Sửa 'last' thành 'next'", correct: false }
    ],
    explanation: "Sau trợ động từ 'didn't', động từ chính luôn ở dạng nguyên mẫu: didn't go!"
  },
  {
    sentence: "How many book do you have on your desk?",
    question: "Sửa lỗi danh từ số nhiều sau How many:",
    options: [
      { text: "Sửa 'book' thành 'books'", correct: true },
      { text: "Sửa 'do' thành 'does'", correct: false },
      { text: "Sửa 'your' thành 'you'", correct: false }
    ],
    explanation: "Sau 'How many' bắt buộc là danh từ số nhiều đếm được: How many books!"
  },
  {
    sentence: "My father always drive carefully to work.",
    question: "Sửa lỗi chia động từ theo chủ ngữ số ít:",
    options: [
      { text: "Sửa 'drive' thành 'drives'", correct: true },
      { text: "Sửa 'carefully' thành 'careful'", correct: false },
      { text: "Sửa 'to' thành 'at'", correct: false }
    ],
    explanation: "'My father' là ngôi thứ 3 số ít, động từ cần thêm s: drives!"
  },
  {
    sentence: "There is three apples in the fruit basket.",
    question: "Lỗi to be với số nhiều:",
    options: [
      { text: "Sửa 'There is' thành 'There are'", correct: true },
      { text: "Sửa 'in' thành 'on'", correct: false },
      { text: "Sửa 'fruit' thành 'fruits'", correct: false }
    ],
    explanation: "Số lượng 'three apples' là số nhiều, dùng 'There are'!"
  },
  {
    sentence: "She bought a new dress tomorrow afternoon.",
    question: "Lỗi sai thời gian với động từ quá khứ:",
    options: [
      { text: "Sửa 'tomorrow' thành 'yesterday'", correct: true },
      { text: "Sửa 'bought' thành 'buy'", correct: false },
      { text: "Sửa 'dress' thành 'dresses'", correct: false }
    ],
    explanation: "'Bought' là thì quá khứ, không thể đi với 'tomorrow' (ngày mai), phải sửa thành 'yesterday'!"
  }
];

// 2. SÚT PHẠT ĐỀN 11M: THỂ THAO & HÀNH ĐỘNG (PENALTY SHOOTOUT QUESTIONS)
const GRADE_5_PENALTY_QUESTIONS = [
  {
    question: "What do football players use to kick the ball?",
    situation: "Thầy Việt cất tiếng còi: Cầu thủ dùng gì để sút bóng?",
    options: [
      { text: "Their feet 👟", correct: true },
      { text: "Their hands ✋", correct: false },
      { text: "Their shoulders 💪", correct: false }
    ],
    explanation: "Trong bóng đá, cầu thủ dùng chân (feet) để sút bóng!"
  },
  {
    question: "Look! The striker is ______ towards the goal!",
    situation: "Tiền đạo đang tăng tốc tiến về khung thành:",
    options: [
      { text: "running 🏃‍♂️", correct: true },
      { text: "sleeping 😴", correct: false },
      { text: "cooking 🍳", correct: false }
    ],
    explanation: "Cầu thủ đang chạy: is running towards the goal!"
  },
  {
    question: "How often do you play sports at Ngo Quyen school?",
    situation: "Bạn có thường xuyên chơi thể thao ở trường không?",
    options: [
      { text: "Twice a week 📅", correct: true },
      { text: "At 7 o'clock ⏰", correct: false },
      { text: "By bicycle 🚲", correct: false }
    ],
    explanation: "Hỏi 'How often' trả lời về tần suất: Twice a week (2 lần một tuần)!"
  },
  {
    question: "Which sport needs a high hoop, an orange ball and jumping?",
    situation: "Môn thể thao nào cần rổ cao và bóng màu cam?",
    options: [
      { text: "Basketball 🏀", correct: true },
      { text: "Swimming 🏊‍♀️", correct: false },
      { text: "Chess ♟️", correct: false }
    ],
    explanation: "Đó chính là môn bóng rổ (Basketball)!"
  },
  {
    question: "Yesterday, class 5C4 ______ a friendly football match.",
    situation: "Hôm qua lớp 5C4 đã thi đấu giao hữu:",
    options: [
      { text: "played ⚽", correct: true },
      { text: "play", correct: false },
      { text: "is playing", correct: false }
    ],
    explanation: "'Yesterday' dùng quá khứ đơn có đuôi -ed: played!"
  },
  {
    question: "The goalkeeper caught the ball with his big ______.",
    situation: "Thủ môn bắt dính quả bóng bằng:",
    options: [
      { text: "gloves 🧤", correct: true },
      { text: "socks 🧦", correct: false },
      { text: "hat 🧢", correct: false }
    ],
    explanation: "Thủ môn đeo găng tay bắt bóng: gloves!"
  },
  {
    question: "What should you do before playing sports?",
    situation: "Trước khi vận động mạnh, chúng mình nên làm gì?",
    options: [
      { text: "Warm up properly 🧘‍♀️", correct: true },
      { text: "Eat lots of candy 🍬", correct: false },
      { text: "Go to sleep 🛏️", correct: false }
    ],
    explanation: "Nên khởi động kỹ (warm up) để tránh chấn thương!"
  },
  {
    question: "My brother ______ swimming every Saturday afternoon.",
    situation: "Em trai tôi đi bơi vào mỗi chiều thứ 7:",
    options: [
      { text: "goes 🏊", correct: true },
      { text: "plays", correct: false },
      { text: "does", correct: false }
    ],
    explanation: "Đi bơi dùng cụm 'go swimming', chủ ngữ 'My brother' chia là 'goes'!"
  },
  {
    question: "Our football team won the championship ______!",
    situation: "Đội bóng lớp 5C4 đã đoạt:",
    options: [
      { text: "trophy 🏆", correct: true },
      { text: "book 📚", correct: false },
      { text: "pencil ✏️", correct: false }
    ],
    explanation: "Đoạt cúp vô địch: championship trophy!"
  },
  {
    question: "Can you ______ the ball into the top corner?",
    situation: "Em có thể sút quả bóng vào góc chữ A không?",
    options: [
      { text: "kick ⚽", correct: true },
      { text: "read 📖", correct: false },
      { text: "write ✍️", correct: false }
    ],
    explanation: "Sút bóng là 'kick the ball'!"
  }
];

// 3. THƯ VIỆN LẬT THẺ TRÍ NHỚ (LIBRARY MEMORY MATCH PAIRS)
const GRADE_5_MEMORY_CARDS = [
  { id: 'm1', pairId: 'go_went', text: 'Go', icon: '🚶', match: 'Went', type: 'present' },
  { id: 'm2', pairId: 'go_went', text: 'Went', icon: '🚶‍♂️', match: 'Go', type: 'past' },
  { id: 'm3', pairId: 'see_saw', text: 'See', icon: '👀', match: 'Saw', type: 'present' },
  { id: 'm4', pairId: 'see_saw', text: 'Saw', icon: '🔍', match: 'See', type: 'past' },
  { id: 'm5', pairId: 'eat_ate', text: 'Eat', icon: '🍎', match: 'Ate', type: 'present' },
  { id: 'm6', pairId: 'eat_ate', text: 'Ate', icon: '🍽️', match: 'Eat', type: 'past' },
  { id: 'm7', pairId: 'have_had', text: 'Have', icon: '🤲', match: 'Had', type: 'present' },
  { id: 'm8', pairId: 'have_had', text: 'Had', icon: '🎁', match: 'Have', type: 'past' },
  { id: 'm9', pairId: 'buy_bought', text: 'Buy', icon: '🛒', match: 'Bought', type: 'present' },
  { id: 'm10', pairId: 'buy_bought', text: 'Bought', icon: '🛍️', match: 'Buy', type: 'past' },
  { id: 'm11', pairId: 'do_did', text: 'Do', icon: '✍️', match: 'Did', type: 'present' },
  { id: 'm12', pairId: 'do_did', text: 'Did', icon: '✅', match: 'Do', type: 'past' }
];

// 4. ĐẤU TRƯỜNG VÔ TẬN: NGÂN HÀNG CÂU HỎI LUYỆN TẬP BẤT TẬN (ENDLESS PRACTICE POOL)
const GRADE_5_ENDLESS_POOL = [
  {
    question: "Where will you go this summer vacation?",
    situation: "Kỳ nghỉ hè tới em dự định sẽ đi đâu?",
    options: [
      { text: "I will visit Ha Long Bay 🏖️", correct: true },
      { text: "I am 10 years old", correct: false },
      { text: "It is 8 o'clock", correct: false }
    ],
    explanation: "Hỏi 'Where will you go' trả lời 'I will visit...'!"
  },
  {
    question: "What is your mother's job?",
    situation: "Hỏi về nghề nghiệp của mẹ:",
    options: [
      { text: "She is an English teacher 👩‍🏫", correct: true },
      { text: "She likes music", correct: false },
      { text: "She is at home", correct: false }
    ],
    explanation: "Hỏi nghề nghiệp trả lời 'She is a/an...'!"
  },
  {
    question: "What's the matter with you, Nam? - I have a ______.",
    situation: "Bé Nam bị đau răng sau khi ăn kẹo:",
    options: [
      { text: "toothache 🦷", correct: true },
      { text: "headache 🤕", correct: false },
      { text: "stomach ache 🤢", correct: false }
    ],
    explanation: "Đau răng là 'toothache'!"
  },
  {
    question: "You shouldn't ______ chocolate before going to bed.",
    situation: "Lời khuyên: Không nên ăn sô cô la trước khi đi ngủ:",
    options: [
      { text: "eat 🍫", correct: true },
      { text: "eating", correct: false },
      { text: "ate", correct: false }
    ],
    explanation: "Sau modal verb 'shouldn't' là động từ nguyên mẫu: shouldn't eat!"
  },
  {
    question: "How can I get to the city post office?",
    situation: "Hỏi đường đi đến bưu điện thành phố:",
    options: [
      { text: "Turn left at the next corner ⬅️", correct: true },
      { text: "It is 5 dollars 💵", correct: false },
      { text: "I like postcards ✉️", correct: false }
    ],
    explanation: "Chỉ đường: Turn left (Rẽ trái) at the next corner!"
  },
  {
    question: "What is the story about? - It's about a clever ______.",
    situation: "Câu chuyện dân gian về chú cáo thông minh:",
    options: [
      { text: "fox 🦊", correct: true },
      { text: "table 🪑", correct: false },
      { text: "school 🏫", correct: false }
    ],
    explanation: "Chú cáo là 'fox' (The Fox and the Crow)!"
  },
  {
    question: "What was the weather like in Da Nang yesterday?",
    situation: "Hỏi về thời tiết hôm qua ở Đà Nẵng:",
    options: [
      { text: "It was sunny and warm ☀️", correct: true },
      { text: "It is raining 🌧️", correct: false },
      { text: "It will be cold ❄️", correct: false }
    ],
    explanation: "Hỏi quá khứ 'was': It was sunny and warm!"
  },
  {
    question: "Which one is bigger, Da Nang or Hoi An?",
    situation: "So sánh hơn: Thành phố nào lớn hơn?",
    options: [
      { text: "Da Nang is bigger 🏙️", correct: true },
      { text: "Da Nang is smallest", correct: false },
      { text: "Hoi An is old", correct: false }
    ],
    explanation: "So sánh hơn với tính từ ngắn: big -> bigger!"
  },
  {
    question: "What did you see at the zoo? - I saw baby ______.",
    situation: "Em nhìn thấy những chú gấu trúc con ở sở thú:",
    options: [
      { text: "pandas 🐼", correct: true },
      { text: "bicycles 🚲", correct: false },
      { text: "notebooks 📓", correct: false }
    ],
    explanation: "Gấu trúc là 'pandas'!"
  },
  {
    question: "I want to buy some medicine. Where should I go?",
    situation: "Muốn mua thuốc uống thì đến đâu?",
    options: [
      { text: "To the pharmacy 💊", correct: true },
      { text: "To the bakery 🥐", correct: false },
      { text: "To the cinema 🎬", correct: false }
    ],
    explanation: "Hiệu thuốc là 'pharmacy'!"
  },
  {
    question: "How do you practice speaking English every day?",
    situation: "Em luyện nói tiếng Anh hằng ngày bằng cách nào?",
    options: [
      { text: "I talk with my foreign friends 🗣️", correct: true },
      { text: "I watch cartoon quietly 📺", correct: false },
      { text: "I go to sleep early 💤", correct: false }
    ],
    explanation: "Nói chuyện với bạn bè: I talk with my foreign friends!"
  },
  {
    question: "What are they doing in the schoolyard? - They are playing ______.",
    situation: "Các bạn đang chơi cầu lông ngoài sân trường:",
    options: [
      { text: "badminton 🏸", correct: true },
      { text: "piano 🎹", correct: false },
      { text: "guitar 🎸", correct: false }
    ],
    explanation: "Chơi cầu lông: playing badminton!"
  }
];

// ==============================================================
// GIÁO TRÌNH TOÁN LỚP 5 CHUẨN SGK CHƯƠNG TRÌNH MỚI (BÉ HÀ MY 5C4)
// Phân số, Số thập phân, Tỉ số %, Hình học & Toán chuyển động
// ==============================================================

const GRADE_5_MATH_TOPICS = [
  { id: 'all', name: 'Tất Cả Chuyên Đề', icon: '📚', desc: 'Ôn luyện toàn diện kiến thức Toán Lớp 5' },
  { id: 'fractions', name: 'Phân Số & Hỗn Số', icon: '➗', desc: 'Rút gọn, quy đồng, 4 phép tính phân số' },
  { id: 'decimals', name: 'Số Thập Phân & Đo Lường', icon: '🔢', desc: 'Cộng trừ nhân chia số thập phân, đổi đơn vị' },
  { id: 'percentages', name: 'Tỉ Số Phần Trăm %', icon: '📊', desc: 'Tìm tỉ số %, giảm giá, lãi suất thực tế' },
  { id: 'geometry', name: 'Hình Học & Thể Tích', icon: '📐', desc: 'Tam giác, hình thang, hình tròn, hình hộp chữ nhật' },
  { id: 'motion', name: 'Toán Chuyển Động Đều', icon: '🚀', desc: 'Vận tốc, quãng đường, thời gian (v = s : t)' },
  { id: 'puzzles', name: 'Toán Tư Duy & Tính Nhanh', icon: '💡', desc: 'Tính nhanh, quy luật dãy số, toán đố thông minh' }
];

const GRADE_5_MATH_QUESTIONS = [
  // 1. Phân số & Hỗn số
  {
    id: 'm_q1',
    topic: 'fractions',
    title: 'Phép cộng hai phân số khác mẫu số',
    question: 'Kết quả của phép tính: 3/5 + 1/4 là bao nhiêu?',
    formula: 'a/b + c/d = (a×d + b×c) / (b×d)',
    options: [
      { text: '17/20', correct: true },
      { text: '4/9', correct: false },
      { text: '7/20', correct: false },
      { text: '19/20', correct: false }
    ],
    explanation: 'Quy đồng mẫu số chung là 20: 3/5 = 12/20 và 1/4 = 5/20. Khi đó: 12/20 + 5/20 = 17/20.'
  },
  {
    id: 'm_q2',
    topic: 'fractions',
    title: 'Tìm phân số của một số',
    question: 'Tìm 2/3 của 60 kg là bao nhiêu ki-lô-gam?',
    formula: 'Giá trị = Số ban đầu × Phân số',
    options: [
      { text: '40 kg', correct: true },
      { text: '30 kg', correct: false },
      { text: '45 kg', correct: false },
      { text: '50 kg', correct: false }
    ],
    explanation: 'Muốn tìm 2/3 của 60 kg, ta lấy: 60 × 2/3 = (60 × 2) : 3 = 120 : 3 = 40 kg.'
  },
  {
    id: 'm_q3',
    topic: 'fractions',
    title: 'Phép nhân hai phân số rút gọn',
    question: 'Tính giá trị biểu thức: 4/7 × 14/5 = ?',
    formula: 'a/b × c/d = (a × c) / (b × d)',
    options: [
      { text: '8/5', correct: true },
      { text: '56/35', correct: false },
      { text: '7/5', correct: false },
      { text: '12/5', correct: false }
    ],
    explanation: 'Ta rút gọn chéo số 14 ở tử với số 7 ở mẫu (14 : 7 = 2): 4/7 × 14/5 = (4 × 2) / 5 = 8/5 (tối giản).'
  },
  {
    id: 'm_q4',
    topic: 'fractions',
    title: 'Chuyển đổi hỗn số thành phân số',
    question: 'Hỗn số 3 và 2/5 được viết dưới dạng phân số là gì?',
    formula: 'Hỗn số a b/c = (a × c + b) / c',
    options: [
      { text: '17/5', correct: true },
      { text: '15/5', correct: false },
      { text: '11/5', correct: false },
      { text: '13/5', correct: false }
    ],
    explanation: 'Tử số = phần nguyên × mẫu số + tử số = 3 × 5 + 2 = 17. Mẫu số giữ nguyên là 5. Vậy kết quả là 17/5.'
  },
  {
    id: 'm_q5',
    topic: 'fractions',
    title: 'Phép chia hai phân số',
    question: 'Kết quả của phép chia: 5/6 : 10/3 là bao nhiêu?',
    formula: 'a/b : c/d = a/b × d/c',
    options: [
      { text: '1/4', correct: true },
      { text: '1/2', correct: false },
      { text: '25/9', correct: false },
      { text: '15/60', correct: false }
    ],
    explanation: 'Lấy phân số thứ nhất nhân với phân số đảo ngược: 5/6 × 3/10 = 15/60. Rút gọn chia cả tử và mẫu cho 15 ta được 1/4.'
  },

  // 2. Số Thập Phân & Đo Lường
  {
    id: 'm_q6',
    topic: 'decimals',
    title: 'Cấu tạo hàng của số thập phân',
    question: 'Trong số thập phân 84,375 thì chữ số 7 có giá trị thuộc hàng nào?',
    formula: 'Sau dấu phẩy: Hàng phần mười, hàng phần trăm, hàng phần nghìn...',
    options: [
      { text: 'Hàng phần trăm (7/100)', correct: true },
      { text: 'Hàng phần mười (7/10)', correct: false },
      { text: 'Hàng phần nghìn (7/1000)', correct: false },
      { text: 'Hàng đơn vị (7)', correct: false }
    ],
    explanation: 'Chữ số 3 là hàng phần mười, chữ số 7 là hàng phần trăm (có giá trị là 0,07 = 7/100), chữ số 5 là hàng phần nghìn.'
  },
  {
    id: 'm_q7',
    topic: 'decimals',
    title: 'Đổi đơn vị đo độ dài sang số thập phân',
    question: 'Viết số đo 3 mét 5 đề-xi-mét (3m 5dm) dưới dạng số thập phân có đơn vị mét là:',
    formula: '1 dm = 0,1 m',
    options: [
      { text: '3,5 m', correct: true },
      { text: '3,05 m', correct: false },
      { text: '35 m', correct: false },
      { text: '0,35 m', correct: false }
    ],
    explanation: 'Vì 1 m = 10 dm nên 5 dm = 5/10 m = 0,5 m. Do đó 3 m 5 dm = 3 + 0,5 = 3,5 m.'
  },
  {
    id: 'm_q8',
    topic: 'decimals',
    title: 'Đổi đơn vị đo diện tích héc-ta',
    question: 'Một khu rừng sinh thái có diện tích 4 ha. Diện tích đó bằng bao nhiêu mét vuông (m²)?',
    formula: '1 ha = 10 000 m²',
    options: [
      { text: '40 000 m²', correct: true },
      { text: '4 000 m²', correct: false },
      { text: '400 m²', correct: false },
      { text: '400 000 m²', correct: false }
    ],
    explanation: '1 héc-ta (ha) = 10 000 m². Vậy 4 ha = 4 × 10 000 = 40 000 m².'
  },
  {
    id: 'm_q9',
    topic: 'decimals',
    title: 'Phép cộng số thập phân',
    question: 'Tính giá trị phép cộng: 25,8 + 14,35 = ?',
    formula: 'Đặt tính thẳng hàng dấu phẩy',
    options: [
      { text: '40,15', correct: true },
      { text: '39,15', correct: false },
      { text: '40,05', correct: false },
      { text: '39,43', correct: false }
    ],
    explanation: '25,80 + 14,35: 0 + 5 = 5; 8 + 3 = 11 viết 1 nhớ 1; 5 + 4 + 1 = 10 viết 0 nhớ 1; 2 + 1 + 1 = 4. Kết quả là 40,15.'
  },
  {
    id: 'm_q10',
    topic: 'decimals',
    title: 'Phép trừ số thập phân',
    question: 'Kết quả của phép tính: 48,6 - 19,25 là:',
    formula: 'Viết thêm chữ số 0 vào bên phải: 48,6 = 48,60',
    options: [
      { text: '29,35', correct: true },
      { text: '29,45', correct: false },
      { text: '28,35', correct: false },
      { text: '30,35', correct: false }
    ],
    explanation: 'Đặt tính: 48,60 - 19,25 = 29,35.'
  },
  {
    id: 'm_q11',
    topic: 'decimals',
    title: 'Nhân nhẩm số thập phân với 100',
    question: 'Khi nhân nhẩm 3,45 với 100, ta được kết quả là:',
    formula: 'Dịch chuyển dấu phẩy sang bên phải 2 chữ số',
    options: [
      { text: '345', correct: true },
      { text: '34,5', correct: false },
      { text: '3450', correct: false },
      { text: '0,0345', correct: false }
    ],
    explanation: 'Muốn nhân một số thập phân với 100, ta chỉ việc chuyển dấu phẩy của số đó sang bên phải hai chữ số: 3,45 × 100 = 345.'
  },
  {
    id: 'm_q12',
    topic: 'decimals',
    title: 'Chia số thập phân cho số tự nhiên',
    question: 'Tính: 15,6 : 4 = ?',
    formula: 'Chia phần nguyên rồi đặt dấu phẩy vào thương',
    options: [
      { text: '3,9', correct: true },
      { text: '3,4', correct: false },
      { text: '4,1', correct: false },
      { text: '3,6', correct: false }
    ],
    explanation: '15 chia 4 được 3 dư 3. Đặt dấu phẩy vào thương. Hạ 6 được 36; 36 chia 4 được 9. Kết quả là 3,9.'
  },

  // 3. Tỉ Số Phần Trăm %
  {
    id: 'm_q13',
    topic: 'percentages',
    title: 'Tìm tỉ số phần trăm của hai số',
    question: 'Lớp 5C4 có 40 học sinh, trong đó có 24 bạn nữ. Hỏi số học sinh nữ chiếm bao nhiêu phần trăm số học sinh cả lớp?',
    formula: 'Tỉ số % = (24 : 40) × 100%',
    options: [
      { text: '60%', correct: true },
      { text: '55%', correct: false },
      { text: '65%', correct: false },
      { text: '40%', correct: false }
    ],
    explanation: 'Tỉ số của số học sinh nữ và học sinh cả lớp là: 24 : 40 = 0,6. Đổi ra phần trăm: 0,6 × 100% = 60%.'
  },
  {
    id: 'm_q14',
    topic: 'percentages',
    title: 'Bài toán giảm giá mua sắm thực tế',
    question: 'Một chiếc cặp sách giá 200 000 đồng đang được giảm giá 15%. Số tiền được giảm là bao nhiêu đồng?',
    formula: 'Số tiền giảm = 200 000 × 15 : 100',
    options: [
      { text: '30 000 đồng', correct: true },
      { text: '25 000 đồng', correct: false },
      { text: '35 000 đồng', correct: false },
      { text: '170 000 đồng', correct: false }
    ],
    explanation: 'Số tiền được giảm là: 200 000 × 15 : 100 = 30 000 đồng. Giá sau khi giảm là: 200 000 - 30 000 = 170 000 đồng.'
  },
  {
    id: 'm_q15',
    topic: 'percentages',
    title: 'Tìm một số khi biết phần trăm của nó',
    question: 'Biết 25% của một số là 50. Số đó là bao nhiêu?',
    formula: 'Số cần tìm = 50 : 25 × 100',
    options: [
      { text: '200', correct: true },
      { text: '125', correct: false },
      { text: '150', correct: false },
      { text: '250', correct: false }
    ],
    explanation: 'Số cần tìm là: 50 : 25 × 100 = 2 × 100 = 200 (hoặc 50 : 0,25 = 200).'
  },
  {
    id: 'm_q16',
    topic: 'percentages',
    title: 'Bài toán tiền gửi tiết kiệm ngân hàng',
    question: 'Bác Ba gửi tiết kiệm 10 000 000 đồng với lãi suất 6% một năm. Sau một năm, số tiền lãi Bác Ba nhận được là:',
    formula: 'Tiền lãi = 10 000 000 × 6 : 100',
    options: [
      { text: '600 000 đồng', correct: true },
      { text: '60 000 đồng', correct: false },
      { text: '6 000 000 đồng', correct: false },
      { text: '10 600 000 đồng', correct: false }
    ],
    explanation: 'Tiền lãi sau 1 năm là: 10 000 000 × 6 : 100 = 600 000 đồng.'
  },
  {
    id: 'm_q17',
    topic: 'percentages',
    title: 'Tính tỉ số phần trăm sản lượng',
    question: 'Một trang trại dự kiến thu hoạch 50 tấn thóc nhưng thực tế thu hoạch được 55 tấn. Trang trại đã đạt bao nhiêu phần trăm kế hoạch?',
    formula: 'Thực tế : Kế hoạch × 100%',
    options: [
      { text: '110%', correct: true },
      { text: '105%', correct: false },
      { text: '115%', correct: false },
      { text: '120%', correct: false }
    ],
    explanation: 'Tỉ số phần trăm trang trại đạt được: 55 : 50 = 1,1 = 110% kế hoạch (vượt mức 10%).'
  },

  // 4. Hình Học & Thể Tích
  {
    id: 'm_q18',
    topic: 'geometry',
    title: 'Diện tích hình tam giác',
    question: 'Tính diện tích hình tam giác có độ dài đáy a = 12 cm và chiều cao h = 8 cm:',
    formula: 'S = (a × h) : 2',
    options: [
      { text: '48 cm²', correct: true },
      { text: '96 cm²', correct: false },
      { text: '40 cm²', correct: false },
      { text: '20 cm²', correct: false }
    ],
    explanation: 'Diện tích hình tam giác: S = (12 × 8) : 2 = 96 : 2 = 48 cm².'
  },
  {
    id: 'm_q19',
    topic: 'geometry',
    title: 'Diện tích hình thang',
    question: 'Một thửa ruộng hình thang có đáy lớn 10 m, đáy bé 6 m và chiều cao 5 m. Diện tích thửa ruộng là:',
    formula: 'S = (a + b) × h : 2',
    options: [
      { text: '40 m²', correct: true },
      { text: '80 m²', correct: false },
      { text: '45 m²', correct: false },
      { text: '50 m²', correct: false }
    ],
    explanation: 'S = (10 + 6) × 5 : 2 = 16 × 5 : 2 = 80 : 2 = 40 m².'
  },
  {
    id: 'm_q20',
    topic: 'geometry',
    title: 'Chu vi hình tròn',
    question: 'Tính chu vi hình tròn có bán kính r = 5 cm (lấy số Pi = 3,14):',
    formula: 'C = r × 2 × 3,14',
    options: [
      { text: '31,4 cm', correct: true },
      { text: '78,5 cm', correct: false },
      { text: '15,7 cm', correct: false },
      { text: '62,8 cm', correct: false }
    ],
    explanation: 'Chu vi hình tròn: C = 5 × 2 × 3,14 = 10 × 3,14 = 31,4 cm.'
  },
  {
    id: 'm_q21',
    topic: 'geometry',
    title: 'Diện tích hình tròn',
    question: 'Một bồn hoa hình tròn ở sân trường Ngô Quyền có bán kính r = 3 m. Diện tích bồn hoa là:',
    formula: 'S = r × r × 3,14',
    options: [
      { text: '28,26 m²', correct: true },
      { text: '18,84 m²', correct: false },
      { text: '9,42 m²', correct: false },
      { text: '31,4 m²', correct: false }
    ],
    explanation: 'Diện tích bồn hoa: S = 3 × 3 × 3,14 = 9 × 3,14 = 28,26 m².'
  },
  {
    id: 'm_q22',
    topic: 'geometry',
    title: 'Thể tích hình lập phương',
    question: 'Một khối đồ chơi rubik hình lập phương có cạnh 6 cm. Thể tích của khối rubik đó là:',
    formula: 'V = a × a × a = a³',
    options: [
      { text: '216 cm³', correct: true },
      { text: '144 cm³', correct: false },
      { text: '36 cm³', correct: false },
      { text: '180 cm³', correct: false }
    ],
    explanation: 'Thể tích hình lập phương: V = 6 × 6 × 6 = 36 × 6 = 216 cm³.'
  },
  {
    id: 'm_q23',
    topic: 'geometry',
    title: 'Thể tích hình hộp chữ nhật',
    question: 'Một bể kính nuôi cá hình hộp chữ nhật có chiều dài 80 cm, chiều rộng 50 cm và chiều cao 40 cm. Bể chứa được tối đa bao nhiêu lít nước? (1 lít = 1 dm³)',
    formula: 'V = a × b × c (đổi sang dm: 8 × 5 × 4)',
    options: [
      { text: '160 lít', correct: true },
      { text: '160 000 lít', correct: false },
      { text: '16 lít', correct: false },
      { text: '200 lít', correct: false }
    ],
    explanation: 'Đổi: 80 cm = 8 dm; 50 cm = 5 dm; 40 cm = 4 dm. Thể tích bể: V = 8 × 5 × 4 = 160 dm³ = 160 lít nước.'
  },

  // 5. Toán Chuyển Động Đều
  {
    id: 'm_q24',
    topic: 'motion',
    title: 'Tính vận tốc chuyển động',
    question: 'Một người đi xe đạp đi được quãng đường 36 km trong thời gian 3 giờ. Vận tốc của người đi xe đạp là:',
    formula: 'v = s : t',
    options: [
      { text: '12 km/giờ', correct: true },
      { text: '10 km/giờ', correct: false },
      { text: '15 km/giờ', correct: false },
      { text: '18 km/giờ', correct: false }
    ],
    explanation: 'Vận tốc của người đi xe đạp: v = 36 : 3 = 12 km/giờ.'
  },
  {
    id: 'm_q25',
    topic: 'motion',
    title: 'Tính quãng đường ô tô chạy',
    question: 'Một ô tô chạy với vận tốc 45 km/giờ. Quãng đường ô tô đi được trong 2 giờ 30 phút là:',
    formula: 's = v × t (2 giờ 30 phút = 2,5 giờ)',
    options: [
      { text: '112,5 km', correct: true },
      { text: '90 km', correct: false },
      { text: '110 km', correct: false },
      { text: '135 km', correct: false }
    ],
    explanation: 'Đổi 2 giờ 30 phút = 2,5 giờ. Quãng đường ô tô đi được: s = 45 × 2,5 = 112,5 km.'
  },
  {
    id: 'm_q26',
    topic: 'motion',
    title: 'Tính thời gian đi hết quãng đường',
    question: 'Quãng đường từ Hà Nội về quê dài 120 km. Bố lái xe máy với vận tốc 40 km/giờ. Hỏi bố đi hết bao nhiêu thời gian?',
    formula: 't = s : v',
    options: [
      { text: '3 giờ', correct: true },
      { text: '2 giờ 30 phút', correct: false },
      { text: '4 giờ', correct: false },
      { text: '3 giờ 15 phút', correct: false }
    ],
    explanation: 'Thời gian bố đi: t = 120 : 40 = 3 giờ.'
  },
  {
    id: 'm_q27',
    topic: 'motion',
    title: 'Hai xe đi ngược chiều gặp nhau',
    question: 'Hai thành phố A và B cách nhau 150 km. Cùng một lúc, một ô tô đi từ A với vận tốc 60 km/h và một xe máy đi từ B với vận tốc 40 km/h ngược chiều nhau. Sau bao lâu hai xe gặp nhau?',
    formula: 'Thời gian gặp nhau = s : (v₁ + v₂)',
    options: [
      { text: '1 giờ 30 phút (1,5 giờ)', correct: true },
      { text: '2 giờ', correct: false },
      { text: '1 giờ 15 phút', correct: false },
      { text: '1 giờ 45 phút', correct: false }
    ],
    explanation: 'Tổng vận tốc hai xe: 60 + 40 = 100 km/h. Thời gian để hai xe gặp nhau: 150 : 100 = 1,5 giờ = 1 giờ 30 phút.'
  },

  // 6. Toán Tư Duy & Tính Nhanh
  {
    id: 'm_q28',
    topic: 'puzzles',
    title: 'Tính nhanh biểu thức số thập phân',
    question: 'Tính nhanh giá trị biểu thức: 2,5 × 16,4 × 4 = ?',
    formula: 'Giao hoán kết hợp: (2,5 × 4) = 10',
    options: [
      { text: '164', correct: true },
      { text: '16,4', correct: false },
      { text: '1640', correct: false },
      { text: '82', correct: false }
    ],
    explanation: 'Nhóm các thừa số có tích tròn chục: (2,5 × 4) × 16,4 = 10 × 16,4 = 164.'
  },
  {
    id: 'm_q29',
    topic: 'puzzles',
    title: 'Quy luật dãy số chính phương',
    question: 'Tìm số tiếp theo trong dãy số sau: 1, 4, 9, 16, 25, ...',
    formula: 'Dãy số chính phương: 1², 2², 3², 4², 5², 6²...',
    options: [
      { text: '36', correct: true },
      { text: '30', correct: false },
      { text: '35', correct: false },
      { text: '49', correct: false }
    ],
    explanation: 'Quy luật: 1×1 = 1; 2×2 = 4; 3×3 = 9; 4×4 = 16; 5×5 = 25. Số tiếp theo là: 6×6 = 36.'
  },
  {
    id: 'm_q30',
    topic: 'puzzles',
    title: 'Bài toán cổ: Vừa gà vừa chó',
    question: 'Vừa gà vừa chó, bó lại cho tròn, 36 con, 100 chân. Hỏi có bao nhiêu con chó?',
    formula: 'Phương pháp giả thiết tạm',
    options: [
      { text: '14 con chó (22 con gà)', correct: true },
      { text: '16 con chó (20 con gà)', correct: false },
      { text: '12 con chó (24 con gà)', correct: false },
      { text: '18 con chó (18 con gà)', correct: false }
    ],
    explanation: 'Giả sử cả 36 con đều là gà thì có: 36 × 2 = 72 chân. Số chân bị thiếu so với thực tế: 100 - 72 = 28 chân. Mỗi con chó hơn mỗi con gà: 4 - 2 = 2 chân. Vậy số con chó là: 28 : 2 = 14 con (Số con gà = 36 - 14 = 22 con).'
  }
];

if (typeof window !== 'undefined') {
  window.GRADE_5_MATH_TOPICS = GRADE_5_MATH_TOPICS;
  window.GRADE_5_MATH_QUESTIONS = GRADE_5_MATH_QUESTIONS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CURRICULUM_DATA,
    GRADE_1_ISLANDS,
    GRADE_2_ISLANDS,
    GRADE_5_ISLANDS,
    ISLANDS_DATA,
    PLAYER_RANKS,
    GRADE_5_BOSS_QUESTIONS,
    GRADE_5_PENALTY_QUESTIONS,
    GRADE_5_MEMORY_CARDS,
    GRADE_5_ENDLESS_POOL,
    GRADE_5_MATH_TOPICS,
    GRADE_5_MATH_QUESTIONS
  };
}
