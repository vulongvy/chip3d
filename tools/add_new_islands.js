// Script to safely append Islands 7, 8, 9, 10 to GRADE_5_ISLANDS in data.js
const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, '..', 'data.js');
let content = fs.readFileSync(dataJsPath, 'utf8');

const newIslandsContent = `  // ĐẢO 7: THÌ HIỆN TẠI TIẾP DIỄN (Trang 34 - 40 SGK Bổ Trợ)
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
`;

const updatedRanksContent = `const GRADE_5_RANKS = [
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
];`;

// Find end of GRADE_5_ISLANDS array:
// The last item in GRADE_5_ISLANDS ends right before GRADE_5_RANKS
const oldRanksRegex = /\r?\n\s*\]\r?\n\s*\}\r?\n\];\r?\n\r?\nconst GRADE_5_RANKS\s*=\s*\[[\s\S]*?\];/;
if (!oldRanksRegex.test(content)) {
  console.error("Could not match old GRADE_5_RANKS regex!");
  process.exit(1);
}

const replacement = `\r\n    ]\r\n  },\r\n\r\n` + newIslandsContent + `];\r\n\r\n` + updatedRanksContent;
const newContent = content.replace(oldRanksRegex, replacement);
fs.writeFileSync(dataJsPath, newContent, 'utf8');
console.log("Successfully updated data.js with Islands 7, 8, 9, 10 and expanded GRADE_5_RANKS to 10 levels!");

