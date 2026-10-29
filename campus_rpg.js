/**
 * ============================================================
 * CAMPUS RPG CORE ENGINE - HỆ SINH THÁI KHUÔN VIÊN TRƯỜNG HỌC 5C4
 * Phong cách: Trường Tiểu Học Ngô Quyền - Lớp 5C4
 * ============================================================
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CampusRPG = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  // ============================================================
  // 1. DATA DEFINITIONS (QUESTS, SHOP ITEMS, PETS, FISHING)
  // ============================================================
  const DEFAULT_QUESTS = [
    // --- 1. NHIỆM VỤ HÀNG NGÀY (DAILY QUESTS) ---
    {
      id: 'quest_daily_login',
      category: 'daily',
      title: 'Điểm Danh Ngày Mới 5C4',
      npc: 'Xuân My',
      npcIcon: '🎀',
      location: 'Sân Trường Ngô Quyền',
      teleport: { x: 6.5, z: 20.5 },
      targetType: 'daily_login',
      current: 1,
      goal: 1,
      coins: 35,
      stars: 5,
      exp: 25,
      claimed: false,
      desc: 'Chào ngày mới! Đăng nhập và dạo bước trong khuôn viên trường Tiểu Học Ngô Quyền.'
    },
    {
      id: 'quest_tobe',
      category: 'daily',
      title: 'Tiết Học Ngữ Pháp Thầy Tuấn',
      npc: 'Thầy Tuấn',
      npcIcon: '👨‍🏫',
      location: 'Phòng Học 5C4',
      teleport: { x: 0, z: 4 },
      targetType: 'answer_quiz',
      current: 0,
      goal: 5,
      coins: 50,
      stars: 10,
      exp: 40,
      claimed: false,
      desc: 'Đến phòng học 5C4 nghe Thầy Tuấn giảng và hoàn thành 5 câu trắc nghiệm ngữ pháp xuất sắc!'
    },
    {
      id: 'quest_canteen',
      category: 'daily',
      title: 'Bữa Phụ Dinh Dưỡng Căn Tin',
      npc: 'Bác Bếp Bear',
      npcIcon: '👨‍🍳',
      location: 'Khu Căn Tin',
      teleport: { x: -24, z: 16 },
      targetType: 'order_food',
      current: 0,
      goal: 1,
      coins: 35,
      stars: 5,
      exp: 30,
      rewardItem: 'Hộp Sữa Tăng Tốc 🥛',
      claimed: false,
      desc: 'Chạy ra Căn tin chào Bác Bếp Bear và thưởng thức 1 món ăn bổ dưỡng bằng tiếng Anh!'
    },
    {
      id: 'quest_fishing_daily',
      category: 'daily',
      title: 'Thư Giãn Hồ Cá Ngô Quyền',
      npc: 'Bác Ngư Phủ',
      npcIcon: '🎣',
      location: 'Hồ Câu Cá Vườn Hoa',
      teleport: { x: 36, z: 62 },
      targetType: 'catch_fish',
      current: 0,
      goal: 2,
      coins: 45,
      stars: 8,
      exp: 35,
      claimed: false,
      desc: 'Ra cầu gỗ hồ nước thả cần câu và dịch đúng từ vựng của 2 chú cá bơi lội dưới nước!'
    },
    {
      id: 'quest_shootout_daily',
      category: 'daily',
      title: 'Vua Sút Phạt Đền 11M',
      npc: 'Thầy Việt',
      npcIcon: '⚽',
      location: 'Sân Bóng Đá Mini',
      teleport: { x: -55, z: 38 },
      targetType: 'score_penalty',
      current: 0,
      goal: 3,
      coins: 60,
      stars: 10,
      exp: 45,
      rewardItem: 'Bóng Vàng Sút Xoáy ⚽',
      claimed: false,
      desc: 'Đến sân bóng đá cỏ nhân tạo, trả lời câu hỏi và sút bóng tung lưới Thủ Môn Robot 3 lần!'
    },
    {
      id: 'quest_memory_daily',
      category: 'daily',
      title: 'Lật Thẻ Trí Nhớ Thư Viện',
      npc: 'Cô Huệ',
      npcIcon: '📖',
      location: 'Thư Viện Ngô Quyền',
      teleport: { x: 55, z: 24 },
      targetType: 'play_memory',
      current: 0,
      goal: 1,
      coins: 50,
      stars: 10,
      exp: 40,
      claimed: false,
      desc: 'Ghé Thư Viện hiện đại 2 tầng gặp Cô Thủ Thư Huệ và hoàn thành 1 ván lật thẻ ghép cặp từ vựng!'
    },

    // --- 2. NHIỆM VỤ HỌC TẬP & NGỮ PHÁP (ACADEMIC MASTERY) ---
    {
      id: 'quest_streak_5',
      category: 'academic',
      title: 'Tia Chớp Chuỗi 5 Câu Đúng',
      npc: 'Thầy Tuấn',
      npcIcon: '⚡',
      location: 'Đấu Trường 3D',
      teleport: { x: 0, z: 4 },
      targetType: 'streak_count',
      current: 0,
      goal: 5,
      coins: 60,
      stars: 12,
      exp: 50,
      claimed: false,
      desc: 'Trả lời đúng liên tiếp 5 câu trắc nghiệm tiếng Anh mà không mắc bất kỳ sai sót nào!'
    },
    {
      id: 'quest_streak_10',
      category: 'academic',
      title: 'Chiến Thần Bất Bại Chuỗi 10',
      npc: 'Thầy Tuấn',
      npcIcon: '🔥',
      location: 'Đấu Trường 3D',
      teleport: { x: 0, z: 4 },
      targetType: 'streak_count',
      current: 0,
      goal: 10,
      coins: 120,
      stars: 25,
      exp: 100,
      rewardItem: 'Huy Hiệu Bất Bại 5C4 🎖️',
      claimed: false,
      desc: 'Đạt chuỗi đúng 10 câu liên tục - Thể hiện phong độ đỉnh cao của thần đồng tiếng Anh!'
    },
    {
      id: 'quest_grammar_continuous',
      category: 'academic',
      title: 'Bậc Thầy Hiện Tại Tiếp Diễn',
      npc: 'Thầy Tuấn',
      npcIcon: '🏃',
      location: 'Phòng Học 5C4',
      teleport: { x: 0, z: 4 },
      targetType: 'answer_continuous',
      current: 0,
      goal: 5,
      coins: 70,
      stars: 15,
      exp: 60,
      claimed: false,
      desc: 'Hoàn thành 5 câu hỏi thì Hiện Tại Tiếp Diễn (is/am/are + V-ing) trong chương trình lớp 5!'
    },
    {
      id: 'quest_grammar_past',
      category: 'academic',
      title: 'Nhà Sử Học Quá Khứ Đơn',
      npc: 'Thầy Tuấn',
      npcIcon: '📜',
      location: 'Phòng Học 5C4',
      teleport: { x: 0, z: 4 },
      targetType: 'answer_past',
      current: 0,
      goal: 5,
      coins: 70,
      stars: 15,
      exp: 60,
      claimed: false,
      desc: 'Chinh phục 5 câu hỏi thì Quá Khứ Đơn với was/were và các động từ bất quy tắc (went, saw, ate)!'
    },
    {
      id: 'quest_endless_10',
      category: 'academic',
      title: 'Chiến Binh Đấu Trường Vô Tận',
      npc: 'Xuân My',
      npcIcon: '♾️',
      location: 'Khuôn Viên Trường',
      teleport: { x: 0, z: 20 },
      targetType: 'answer_endless',
      current: 0,
      goal: 10,
      coins: 100,
      stars: 20,
      exp: 80,
      claimed: false,
      desc: 'Vượt qua 10 câu hỏi thử thách không giới hạn trong chế độ Đấu Trường Vô Tận!'
    },
    {
      id: 'quest_speed_blitz',
      category: 'academic',
      title: 'Thần Tốc 60 Giây Phản Xạ',
      npc: 'Xuân My',
      npcIcon: '⏱️',
      location: 'Khuôn Viên Trường',
      teleport: { x: 0, z: 20 },
      targetType: 'blitz_score',
      current: 0,
      goal: 6,
      coins: 80,
      stars: 15,
      exp: 65,
      claimed: false,
      desc: 'Trả lời đúng ít nhất 6 câu trong thử thách Thần Tốc 60 Giây đếm ngược nghẹt thở!'
    },
    {
      id: 'quest_island_clear_3',
      category: 'academic',
      title: 'Nhà Thám Hiểm 3 Đảo Tri Thức',
      npc: 'Thầy Tuấn',
      npcIcon: '🏝️',
      location: 'Bản Đồ Thế Giới',
      teleport: { x: 0, z: 4 },
      targetType: 'clear_island',
      current: 0,
      goal: 3,
      coins: 90,
      stars: 18,
      exp: 70,
      claimed: false,
      desc: 'Chinh phục trọn vẹn toàn bộ các màn chơi tại 3 hòn đảo tiếng Anh đầu tiên!'
    },
    {
      id: 'quest_island_clear_7',
      category: 'academic',
      title: 'Đại Dương Tri Thức 7 Đảo',
      npc: 'Thầy Tuấn',
      npcIcon: '🌊',
      location: 'Bản Đồ Thế Giới',
      teleport: { x: 0, z: 4 },
      targetType: 'clear_island',
      current: 0,
      goal: 7,
      coins: 160,
      stars: 32,
      exp: 130,
      claimed: false,
      desc: 'Vượt qua 7 hòn đảo bài tập phong phú từ Hiện tại đơn đến Tiếp diễn & Quá khứ!'
    },
    {
      id: 'quest_island_clear_10',
      category: 'academic',
      title: 'Đại Sứ Toàn Năng 10 Đảo 5C4',
      npc: 'Thầy Tuấn',
      npcIcon: '👑',
      location: 'Bản Đồ Thế Giới',
      teleport: { x: 0, z: 4 },
      targetType: 'clear_island',
      current: 0,
      goal: 10,
      coins: 250,
      stars: 50,
      exp: 200,
      rewardItem: 'Cúp Vàng Danh Dự 5C4 🏆',
      claimed: false,
      desc: 'Hoàn thành xuất sắc toàn bộ 10 hòn đảo giáo trình SGK & Sách bổ trợ Lớp 5!'
    },

    // --- 3. NHIỆM VỤ VẬN ĐỘNG & KHÁM PHÁ KHUÔN VIÊN (SPORTS & EXPLORATION) ---
    {
      id: 'quest_parkour',
      category: 'sports',
      title: 'Chiến Thần Parkour & Đỉnh Tháp Obby',
      npc: 'Xuân My',
      npcIcon: '⭐',
      location: 'Sân Vận Động Obby',
      teleport: { x: 25, z: 38 },
      targetType: 'collect_stars',
      current: 0,
      goal: 3,
      coins: 70,
      stars: 15,
      exp: 60,
      rewardItem: 'Vương Miện Lấp Lánh 👑',
      claimed: false,
      desc: 'Chinh phục các bậc thang cầu vồng và thu thập đủ 3 ngôi sao trên đỉnh ngọn tháp Obby!'
    },
    {
      id: 'quest_flagpole',
      category: 'sports',
      title: 'Nghi Thức Chào Cờ Việt Nam',
      npc: 'Bác Bảo Vệ',
      npcIcon: '🇻🇳',
      location: 'Cột Cờ Sân Trường',
      teleport: { x: 0, z: 38 },
      targetType: 'salute_flag',
      current: 0,
      goal: 1,
      coins: 40,
      stars: 8,
      exp: 35,
      claimed: false,
      desc: 'Đến chân Cột Cờ Tổ Quốc đứng trang nghiêm và thực hiện nghi thức chào cờ đầu tuần!'
    },
    {
      id: 'quest_tour_library',
      category: 'sports',
      title: 'Ghé Thăm Thư Viện Ngô Quyền',
      npc: 'Cô Huệ',
      npcIcon: '📚',
      location: 'Thư Viện Ngô Quyền',
      teleport: { x: 55, z: 24 },
      targetType: 'visit_library',
      current: 0,
      goal: 1,
      coins: 35,
      stars: 6,
      exp: 30,
      claimed: false,
      desc: 'Dạo bước sang cánh đông tới Thư Viện 2 tầng lộng lẫy và trò chuyện cùng Cô Thủ Thư Huệ!'
    },
    {
      id: 'quest_tour_garden',
      category: 'sports',
      title: 'Dạo Chơi Vườn Hoa Sinh Thái',
      npc: 'Chú Tư',
      npcIcon: '🌺',
      location: 'Vườn Sinh Thái',
      teleport: { x: 60, z: 60 },
      targetType: 'visit_garden',
      current: 0,
      goal: 1,
      coins: 35,
      stars: 6,
      exp: 30,
      claimed: false,
      desc: 'Khám phá Nhà Kính Vòm Sinh Học, ngắm luống hoa cúc, hoa hồng và trò chuyện với Chú Tư!'
    },
    {
      id: 'quest_basketball',
      category: 'sports',
      title: 'Tập Luyện Sân Bóng Rổ',
      npc: 'Thầy Việt',
      npcIcon: '🏀',
      location: 'Sân Bóng Rổ Cạnh Sân Bóng',
      teleport: { x: -55, z: 62 },
      targetType: 'play_basketball',
      current: 0,
      goal: 1,
      coins: 45,
      stars: 8,
      exp: 35,
      claimed: false,
      desc: 'Chạy sang Sân Bóng Rổ bên cạnh sân bóng đá và thử tài ném bóng rổ thể thao!'
    },
    {
      id: 'quest_legendary_fish',
      category: 'sports',
      title: 'Ngư Thủ Bắt Cá Quý Hiếm',
      npc: 'Bác Ngư Phủ',
      npcIcon: '🐬',
      location: 'Hồ Câu Cá Vườn Hoa',
      teleport: { x: 36, z: 62 },
      targetType: 'catch_rare_fish',
      current: 0,
      goal: 1,
      coins: 80,
      stars: 20,
      exp: 70,
      claimed: false,
      desc: 'Thả cần câu và bắt thành công chú Cá Heo Xanh hoặc Cá Rồng Vàng bơi lội dưới hồ!'
    },

    // --- 4. NHIỆM VỤ SỬ THI & BOSS BATTLE (EPIC & BOSS BATTLES) ---
    {
      id: 'quest_boss_mistake',
      category: 'epic',
      title: 'Đại Chiến Boss: Dr. Mistake',
      npc: 'Dr. Mistake',
      npcIcon: '⚔️',
      location: 'Đại Sân Khấu Chào Cờ',
      teleport: { x: 0, z: 75 },
      targetType: 'defeat_boss',
      current: 0,
      goal: 1,
      coins: 150,
      stars: 30,
      exp: 120,
      rewardItem: 'Gậy Phép Thuật Ngữ Pháp 🪄',
      claimed: false,
      desc: 'Lên Đại Sân Khấu, phát hiện và sửa đúng các lỗi sai ngữ pháp để hạ gục Boss Dr. Mistake (100 HP)!'
    },
    {
      id: 'quest_boss_master',
      category: 'epic',
      title: 'Khắc Tinh Của Giáo Sư Lỗi Sai',
      npc: 'Dr. Mistake',
      npcIcon: '🧙‍♂️',
      location: 'Đại Sân Khấu Chào Cờ',
      teleport: { x: 0, z: 75 },
      targetType: 'defeat_boss',
      current: 0,
      goal: 2,
      coins: 200,
      stars: 40,
      exp: 160,
      claimed: false,
      desc: 'Đánh bại Boss Dr. Mistake 2 lần để bảo vệ sự chuẩn xác của tiếng Anh khối 5!'
    },
    {
      id: 'quest_fashionista',
      category: 'epic',
      title: 'Ngôi Sao Thời Trang Học Đường',
      npc: 'Bảo Ngọc',
      npcIcon: '👗',
      location: 'Cửa Hàng Thời Trang',
      teleport: { x: -11, z: 12 },
      targetType: 'equip_custom_outfit',
      current: 0,
      goal: 1,
      coins: 80,
      stars: 15,
      exp: 60,
      claimed: false,
      desc: 'Sắm và mặc trang phục Áo Dài Trắng Nữ Sinh hoặc đeo Vương Miện Hoàng Gia trong Cửa Hàng!'
    },
    {
      id: 'quest_super_god',
      category: 'epic',
      title: 'Huyền Thoại Siêu Thần 5C4',
      npc: 'Thầy Tuấn',
      npcIcon: '🌟',
      location: 'Toàn Khuôn Viên 5C4',
      teleport: { x: 0, z: 4 },
      targetType: 'total_stars',
      current: 0,
      goal: 100,
      coins: 300,
      stars: 60,
      exp: 300,
      rewardItem: 'Hào Quang Siêu Thần Lớp 5C4 ✨',
      claimed: false,
      desc: 'Tích lũy đạt mốc 100 Ngôi Sao Tím để mở khóa danh hiệu Siêu Thần 5C4 tối thượng!'
    },
    // --- 5. NHIỆM VỤ THIÊN ĐÌNH TÂY DU KÝ (SKY CELESTIAL QUESTS) ---
    {
      id: 'quest_celestial_wukong',
      category: 'epic',
      title: 'Bái Kiến Tề Thiên Đại Thánh',
      npc: 'Tôn Ngộ Không',
      npcIcon: '🐒',
      location: 'Cung Điện Thiên Đình (Đỉnh Tháp)',
      teleport: { x: 20, y: 32, z: 30 },
      targetType: 'talk_wukong',
      current: 0,
      goal: 1,
      coins: 100,
      stars: 20,
      exp: 100,
      rewardItem: 'Kim Cô Hào Quang 👑',
      claimed: false,
      desc: 'Leo Tháp Sky Obby lên Thiên Đình bái kiến Tề Thiên Đại Thánh và đối đáp tiếng Anh thần thông!'
    },
    {
      id: 'quest_celestial_bajie',
      category: 'epic',
      title: 'Đại Tiệc Vườn Đào Tiên Bát Giới',
      npc: 'Trư Bát Giới',
      npcIcon: '🐷',
      location: 'Cung Điện Thiên Đình (Đỉnh Tháp)',
      teleport: { x: 30, y: 32, z: 30 },
      targetType: 'talk_bajie',
      current: 0,
      goal: 1,
      coins: 90,
      stars: 18,
      exp: 90,
      rewardItem: 'Đào Tiên Trường Thọ 🍑',
      claimed: false,
      desc: 'Cùng Thiên Bồng Nguyên Soái Trư Bát Giới học từ vựng ẩm thực và thưởng thức đào tiên!'
    },
    {
      id: 'quest_celestial_sha',
      category: 'epic',
      title: 'Hành Trình Vượt Sông Mây Sa Tăng',
      npc: 'Sa Tăng',
      npcIcon: '🧔',
      location: 'Cung Điện Thiên Đình (Đỉnh Tháp)',
      teleport: { x: 20, y: 32, z: 38 },
      targetType: 'talk_sha',
      current: 0,
      goal: 1,
      coins: 90,
      stars: 18,
      exp: 90,
      rewardItem: 'Ngọc Bích Lưu Sa Hà 💎',
      claimed: false,
      desc: 'Thử tài cùng Quyển Liêm Sa Tăng về địa lý, sông ngòi và các động từ hành trình thỉnh kinh!'
    },
    {
      id: 'quest_celestial_laozi',
      category: 'epic',
      title: 'Khảo Hạch Đan Dược Thái Thượng Lão Quân',
      npc: 'Thái Thượng Lão Quân',
      npcIcon: '🧙‍♂️',
      location: 'Điện Kim Loan Thiên Đình',
      teleport: { x: 25, y: 32, z: 40 },
      targetType: 'talk_laozi',
      current: 0,
      goal: 1,
      coins: 200,
      stars: 35,
      exp: 250,
      rewardItem: 'Cân Đẩu Vân Thần Kỳ ☁️',
      claimed: false,
      desc: 'Vượt qua bài khảo hạch ngữ pháp cao nhất để đắc đạo danh hiệu Thủ Khoa Tiếng Anh Thiên Đình!'
    }
  ];

  const SHOP_OUTFITS = [
    {
      id: 'outfit_default',
      name: 'Váy Nữ Sinh 5C4 & Nón Quai Thao',
      price: 0,
      type: 'dress',
      icon: '🌸',
      desc: 'Đồng phục đặc trưng lớp 5C4 thướt tha mang đậm bản sắc truyền thống Việt Nam.',
      owned: true
    },
    {
      id: 'outfit_aodai',
      name: 'Áo Dài Trắng Nữ Sinh Tinh Khôi',
      price: 80,
      type: 'dress',
      icon: '👗',
      desc: 'Tà áo dài trắng Việt Nam thanh lịch, dịu dàng, nón lá hoa sen trang nhã.',
      owned: false
    },
    {
      id: 'outfit_wukong',
      name: 'Giáp Kim Cô Tề Thiên Đại Thánh',
      price: 150,
      type: 'dress',
      icon: '🐒',
      desc: 'Chiến giáp hoàng kim lộng lẫy, áo choàng đỏ và vòng kim cô thần thánh của Tôn Ngộ Không.',
      owned: false
    },
    {
      id: 'outfit_fairy',
      name: 'Váy Tiên Nữ Mây Bồng Bềnh',
      price: 140,
      type: 'dress',
      icon: '🪷',
      desc: 'Lụa đào tiên giới phất phơ, đính hoa sen phát sáng lấp lánh nơi Thiên Đình.',
      owned: false
    },
    {
      id: 'outfit_cyber_suit',
      name: 'Bộ Giáp Neon Cyber Slay 2026',
      price: 160,
      type: 'dress',
      icon: '⚡',
      desc: 'Giáp thể thao phát quang đa sắc phong cách Gen Z năng động, tăng tốc độ di chuyển.',
      owned: false
    },
    {
      id: 'outfit_princess',
      name: 'Đầm Dạ Hội Công Chúa Cổ Tích',
      price: 130,
      type: 'dress',
      icon: '👸',
      desc: 'Váy công chúa xòe bồng bềnh kết hoa ngọc trai và ánh sao lung linh.',
      owned: false
    },
    {
      id: 'outfit_ninja',
      name: 'Trang Phục Ninja Bóng Đêm',
      price: 110,
      type: 'dress',
      icon: '🥷',
      desc: 'Bộ nhẫn giả siêu nhẹ, di chuyển thoăn thoắt và nhảy bục cực êm.',
      owned: false
    },
    {
      id: 'outfit_wizard',
      name: 'Áo Choàng Pháp Sư Tinh Tú',
      price: 125,
      type: 'dress',
      icon: '🧙‍♀️',
      desc: 'Áo choàng nhung tím huyền bí đính chòm sao lấp lánh của học viện phép thuật.',
      owned: false
    },
    {
      id: 'acc_crown',
      name: 'Vương Miện Vàng Hoàng Gia',
      price: 100,
      type: 'accessory',
      icon: '👑',
      desc: 'Vương miện vàng đính đá quý lấp lánh dành cho thủ khoa tiếng Anh lớp 5C4.',
      owned: false
    },
    {
      id: 'acc_wings',
      name: 'Đôi Cánh Thiên Thần Phát Sáng',
      price: 120,
      type: 'accessory',
      icon: '🧚',
      desc: 'Đôi cánh thiên thần trắng muốt lấp lánh đập nhẹ nhàng theo từng bước nhảy.',
      owned: false
    },
    {
      id: 'acc_glasses',
      name: 'Kính Cận Trí Tuệ Học Sinh Giỏi',
      price: 50,
      type: 'accessory',
      icon: '👓',
      desc: 'Kính gọng tròn vàng Nobita siêu đáng yêu, tăng +10% tập trung khi làm bài.',
      owned: false
    },
    {
      id: 'acc_backpack',
      name: 'Balo Khủng Long Xanh Mini',
      price: 60,
      type: 'accessory',
      icon: '🎒',
      desc: 'Chiếc balo khủng long đeo sau lưng bé vừa năng động vừa dễ thương.',
      owned: false
    }
  ];

  const SHOP_PETS = [
    {
      id: 'pet_corgi',
      name: 'Chú Cún Corgi Vàng Chibi',
      price: 0,
      icon: '🐕',
      desc: 'Chú cún cưng trung thành, mông tròn xoe vẫy đuôi lon ton bám sát theo bạn.',
      owned: true
    },
    {
      id: 'pet_shiba',
      name: 'Chó Shiba Vui Vẻ Nhật Bản',
      price: 100,
      icon: '🦊',
      desc: 'Khuôn mặt cười híp mắt siêu cưng, luôn nhảy múa khi bạn trả lời đúng.',
      owned: false
    },
    {
      id: 'pet_cat',
      name: 'Mèo Mướp Trắng Tai Hồng',
      price: 120,
      icon: '🐱',
      desc: 'Mèo con mắt to tròn, bước đi nhẹ tênh và có tiếng kêu meo meo ngọt ngào.',
      owned: false
    },
    {
      id: 'pet_dragon',
      name: 'Bé Rồng Cầu Vồng Thần Thoại',
      price: 200,
      icon: '🐲',
      desc: 'Rồng con phát sáng cầu vồng, vỗ cánh bay lơ lửng bên vai bé!',
      owned: false
    },
    {
      id: 'pet_cloud',
      name: 'Cân Đẩu Vân Mini Phát Sáng',
      price: 150,
      icon: '☁️',
      desc: 'Đám mây vàng thần kỳ của Tôn Ngộ Không, bay bồng bềnh nâng bước chân bé!',
      owned: false
    },
    {
      id: 'pet_phoenix',
      name: 'Phượng Hoàng Lửa Bất Tử',
      price: 180,
      icon: '🔥',
      desc: 'Thần điểu rực lửa ngũ sắc, vỗ cánh uy nghi và ban phát phước lành học tập.',
      owned: false
    },
    {
      id: 'pet_kitsune',
      name: 'Bé Cáo Chín Đuôi Hồ Ly',
      price: 140,
      icon: '🦊',
      desc: 'Hồ ly 9 đuôi lông trắng tai hồng, nhảy múa tinh nghịch quanh chân bạn.',
      owned: false
    },
    {
      id: 'pet_robot',
      name: 'Robot Trợ Lý AI Cyber',
      price: 130,
      icon: '🤖',
      desc: 'Robot mini bay lơ lửng với màn hình led biểu cảm, nhắc nhở từ vựng tiếng Anh.',
      owned: false
    },
    {
      id: 'pet_unicorn',
      name: 'Kỳ Lân Cầu Vồng Một Sừng',
      price: 170,
      icon: '🦄',
      desc: 'Kỳ lân thần thoại bờm 7 sắc cầu vồng, sừng xoắn phát quang kỳ diệu.',
      owned: false
    },
    {
      id: 'pet_panda',
      name: 'Gấu Trúc Kungfu Ăn Trúc',
      price: 120,
      icon: '🐼',
      desc: 'Chú gấu trúc tròn xoe thích nhai lá trúc và múa võ cổ truyền vui nhộn.',
      owned: false
    },
    {
      id: 'pet_parrot',
      name: 'Vẹt Song Ngữ Thông Thái',
      price: 110,
      icon: '🦜',
      desc: 'Chú vẹt nhiệt đới sặc sỡ, thông thạo tiếng Anh và luôn cổ vũ bé học tập.',
      owned: false
    }
  ];

  const CANTEEN_FOODS = [
    {
      id: 'food_pizza',
      nameEn: 'Cheesy Pizza',
      nameVi: 'Bánh Pizza Phô Mai',
      icon: '🍕',
      cost: 20,
      buff: 'speed',
      duration: 60,
      buffName: 'Tăng tốc chạy +40%',
      desc: 'Pizza giòn rụm nóng hổi, giúp đôi chân bé Hà My chạy nhanh như gió!'
    },
    {
      id: 'food_milk',
      nameEn: 'Fresh Strawberry Milk',
      nameVi: 'Sữa Dâu Tươi Thơm Ngon',
      icon: '🥛',
      cost: 15,
      buff: 'jump',
      duration: 60,
      buffName: 'Tăng lực nhảy cao +50%',
      desc: 'Sữa dâu giàu canxi giúp bé nhảy vọt qua các bậc thang Obby thật dễ dàng!'
    },
    {
      id: 'food_melon',
      nameEn: 'Sweet Watermelon',
      nameVi: 'Dưa Hấu Mát Lạnh',
      icon: '🍉',
      cost: 15,
      buff: 'sparkle',
      duration: 60,
      buffName: 'Hiệu ứng Hoa Bay Lấp Lánh',
      desc: 'Dưa hấu mọng nước giải nhiệt, tạo vòng tròn cánh hoa rơi quanh bước chân.'
    },
    {
      id: 'food_boba',
      nameEn: 'Bubble Milk Tea',
      nameVi: 'Trà Sữa Trân Châu Đường Đen',
      icon: '🧋',
      cost: 25,
      buff: 'double_coin',
      count: 5,
      buffName: 'Nhân đôi Xu (5 câu tiếp theo)',
      desc: 'Mỗi câu trả lời đúng tiếp theo sẽ được thưởng gấp đôi số Chip Xu!'
    },
    {
      id: 'food_icecream',
      nameEn: 'Rainbow Ice Cream',
      nameVi: 'Kem Cầu Vồng 3 Tầng',
      icon: '🍦',
      cost: 20,
      buff: 'speed_jump',
      duration: 45,
      buffName: 'Combo Tốc Độ & Nhảy Cao',
      desc: 'Món kem ngọt ngào kết hợp cả chạy nhanh và bật nhảy siêu đỉnh!'
    }
  ];

  const FISH_SPECIES = [
    {
      nameEn: 'Golden Carp',
      nameVi: 'Cá Chép Vàng May Mắn',
      icon: '🐟',
      rarity: 'Common',
      coins: 15,
      stars: 2,
      exp: 15,
      vocabWord: 'Golden',
      question: 'Từ "Golden" trong tiếng Anh có nghĩa là gì?',
      options: ['Màu vàng óng ánh', 'Màu xanh lá cây', 'Màu hồng dễ thương', 'Màu tím than'],
      correctIdx: 0
    },
    {
      nameEn: 'Rainbow Trout',
      nameVi: 'Cá Hồi Cầu Vồng',
      icon: '🐠',
      rarity: 'Rare',
      coins: 25,
      stars: 4,
      exp: 25,
      vocabWord: 'Swim',
      question: 'Động từ "Bơi lội" trong tiếng Anh là:',
      options: ['Fly (Bay)', 'Swim (Bơi lội)', 'Run (Chạy)', 'Sing (Hát)'],
      correctIdx: 1
    },
    {
      nameEn: 'Clownfish Nemo',
      nameVi: 'Cá Hề Nemo Tinh Nghịch',
      icon: '🐡',
      rarity: 'Common',
      coins: 18,
      stars: 2,
      exp: 18,
      vocabWord: 'Orange',
      question: 'Chú cá hề Nemo có màu gì đặc trưng ("Orange")?',
      options: ['Màu xanh lam', 'Màu vàng chanh', 'Màu cam rực rỡ', 'Màu đỏ tươi'],
      correctIdx: 2
    },
    {
      nameEn: 'Dancing Starfish',
      nameVi: 'Sao Biển Vũ Công',
      icon: '⭐',
      rarity: 'Rare',
      coins: 28,
      stars: 5,
      exp: 28,
      vocabWord: 'Starfish',
      question: '"The starfish has 5 arms". Từ "Starfish" nghĩa là gì?',
      options: ['Cá mập', 'Sao biển', 'Con sứa', 'Rùa biển'],
      correctIdx: 1
    },
    {
      nameEn: 'Gliding Seahorse',
      nameVi: 'Cá Ngựa Hoàng Gia',
      icon: '🌊',
      rarity: 'Rare',
      coins: 30,
      stars: 5,
      exp: 30,
      vocabWord: 'Horse',
      question: 'Trong từ "Seahorse" (cá ngựa), "Sea" là biển, còn "Horse" là con gì?',
      options: ['Con cá', 'Con chim', 'Con ngựa', 'Con hổ'],
      correctIdx: 2
    },
    {
      nameEn: 'Clever Octopus',
      nameVi: 'Bạch Tuộc Thông Thái',
      icon: '🐙',
      rarity: 'Epic',
      coins: 45,
      stars: 8,
      exp: 45,
      vocabWord: 'Eight',
      question: 'Bạch tuộc có 8 xúc tu ("Eight arms"). Số 8 trong tiếng Anh là:',
      options: ['Eight', 'Seven', 'Nine', 'Six'],
      correctIdx: 0
    },
    {
      nameEn: 'Friendly Dolphin',
      nameVi: 'Cá Heo Thân Thiện',
      icon: '🐬',
      rarity: 'Epic',
      coins: 48,
      stars: 9,
      exp: 48,
      vocabWord: 'Friendly',
      question: '"Dolphins are very friendly animals". Từ "Friendly" nghĩa là:',
      options: ['Hung dữ, đáng sợ', 'Nhút nhát, sợ sệt', 'Chậm chạp', 'Thân thiện, hòa đồng'],
      correctIdx: 3
    },
    {
      nameEn: 'Angel Fish',
      nameVi: 'Cá Thiên Thần Thần Kỳ',
      icon: '🐡',
      rarity: 'Epic',
      coins: 40,
      stars: 8,
      exp: 40,
      vocabWord: 'Angel',
      question: 'Nghĩa của từ "Angel" trong tiếng Anh là gì?',
      options: ['Phù thủy', 'Thiên thần', 'Ngôi sao', 'Nàng tiên cá'],
      correctIdx: 1
    },
    {
      nameEn: 'Glowing Jellyfish',
      nameVi: 'Sứa Biển Dạ Quang',
      icon: '🪼',
      rarity: 'Rare',
      coins: 32,
      stars: 6,
      exp: 32,
      vocabWord: 'Light',
      question: '"Jellyfish glow in the dark with light". Từ "Light" nghĩa là:',
      options: ['Bóng tối u ám', 'Âm thanh', 'Ánh sáng / Phát sáng', 'Gió mát'],
      correctIdx: 2
    },
    {
      nameEn: 'Speedy Swordfish',
      nameVi: 'Cá Kiếm Tốc Độ',
      icon: '🗡️',
      rarity: 'Epic',
      coins: 50,
      stars: 10,
      exp: 50,
      vocabWord: 'Fast',
      question: '"Swordfish can swim very fast!". Từ "Fast" có nghĩa là:',
      options: ['Nhanh thoăn thoắt', 'Chậm chạp', 'Lười biếng', 'Buồn ngủ'],
      correctIdx: 0
    },
    {
      nameEn: 'Cute Pufferfish',
      nameVi: 'Cá Nóc Phồng Đáng Yêu',
      icon: '🐡',
      rarity: 'Common',
      coins: 20,
      stars: 3,
      exp: 20,
      vocabWord: 'Round',
      question: '"The pufferfish puffs up into a round ball". Từ "Round" là hình gì?',
      options: ['Hình vuông', 'Hình tam giác', 'Hình tròn', 'Hình chữ nhật'],
      correctIdx: 2
    },
    {
      nameEn: 'Legendary Sky Whale',
      nameVi: 'Cá Voi Xanh Huyền Thoại',
      icon: '🐳',
      rarity: 'Legendary',
      coins: 60,
      stars: 15,
      exp: 60,
      vocabWord: 'Ocean',
      question: '"The whale lives in the deep blue ocean". Từ "Ocean" nghĩa là:',
      options: ['Dòng suối nhỏ', 'Hồ nước ngọt', 'Đại dương bao la', 'Sa mạc khô cằn'],
      correctIdx: 2
    }
  ];

  const LEADERBOARD_DATA = [
    { rank: 1, name: 'Hà My (5C4)', score: 980, stars: 65, badge: 'Thủ Khoa 5C4 👑', avatar: 'chibi_ha_my.jpg' },
    { rank: 2, name: 'Bảo Nam (5C4)', score: 870, stars: 52, badge: 'Chiến Thần Obby ⚡', avatar: '👦' },
    { rank: 3, name: 'Thảo Linh (5C4)', score: 820, stars: 48, badge: 'Đại Sứ Từ Vựng 🌸', avatar: '👧' },
    { rank: 4, name: 'Minh Đức (5C4)', score: 760, stars: 41, badge: 'Vua Ngữ Pháp 📘', avatar: '🧑' },
    { rank: 5, name: 'Xuân My (Đội Trưởng)', score: 740, stars: 39, badge: 'Sao Đỏ Gương Mẫu 🎖️', avatar: '🎀' },
    { rank: 6, name: 'Mai Phương (5C4)', score: 690, stars: 35, badge: 'Ngư Phủ Nhí 🎣', avatar: '🐱' }
  ];

  // ============================================================
  // 2. ECONOMY MANAGER (COINS, STARS, EXP, LEVELS, BUFFS)
  // ============================================================
  class EconomyManager {
    constructor() {
      this.coins = parseInt(localStorage.getItem('chip_coins') || '0', 10);
      this.stars = parseInt(localStorage.getItem('chip_stars') || '0', 10);
      this.exp = parseInt(localStorage.getItem('chip_exp') || '0', 10);
      this.level = this.calculateLevel(this.exp);
      this.activeBuff = null; // { type, expireAt, name, icon }
      this.listeners = [];
    }

    reset() {
      this.coins = 0;
      this.stars = 0;
      this.exp = 0;
      this.level = 1;
      this.activeBuff = null;
      this.save();
      this.notify();
    }

    onChange(cb) {
      if (typeof cb === 'function') this.listeners.push(cb);
    }

    notify() {
      this.save();
      this.listeners.forEach(cb => cb({
        coins: this.coins,
        stars: this.stars,
        exp: this.exp,
        level: this.level,
        rankTitle: this.getRankTitle(),
        activeBuff: this.activeBuff
      }));
    }

    save() {
      localStorage.setItem('chip_coins', this.coins.toString());
      localStorage.setItem('chip_stars', this.stars.toString());
      localStorage.setItem('chip_exp', this.exp.toString());
    }

    calculateLevel(exp) {
      if (exp >= 1600) return 10;
      if (exp >= 1250) return 9;
      if (exp >= 950) return 8;
      if (exp >= 700) return 7;
      if (exp >= 500) return 6;
      if (exp >= 350) return 5;
      if (exp >= 220) return 4;
      if (exp >= 120) return 3;
      if (exp >= 50) return 2;
      return 1;
    }

    getRankTitle() {
      const titles = [
        'Tập Sự Nhí 🥉',
        'Học Việc Chăm Chỉ 🥈',
        'Nhà Thám Hiểm Lớp 5 🥇',
        'Trợ Lý Thầy Tuấn 📘',
        'Hiệp Sĩ Từ Vựng ⚔️',
        'Ngư Phủ Thông Thái 🎣',
        'Chiến Thần Parkour ⚡',
        'Cao Thủ Ngữ Pháp 🎓',
        'Quán Quân 5C4 🌟',
        'Thần Đồng Tiếng Anh 👑'
      ];
      return `Lv.${this.level} ${titles[this.level - 1] || titles[0]}`;
    }

    addCoins(amt, reason = '') {
      let multiplier = 1;
      if (this.activeBuff && this.activeBuff.type === 'double_coin') {
        multiplier = 2;
        if (this.activeBuff.count) {
          this.activeBuff.count--;
          if (this.activeBuff.count <= 0) this.activeBuff = null;
        }
      }
      const actualAmt = amt * multiplier;
      this.coins += actualAmt;
      this.notify();
      this.triggerCoinBurstEffect(actualAmt);
      return actualAmt;
    }

    spendCoins(amt) {
      if (this.coins >= amt) {
        this.coins -= amt;
        this.notify();
        return true;
      }
      return false;
    }

    addStars(amt) {
      this.stars += amt;
      this.notify();
      this.triggerStarBurstEffect(amt);
    }

    addExp(amt) {
      this.exp += amt;
      const oldLevel = this.level;
      this.level = this.calculateLevel(this.exp);
      this.notify();
      if (this.level > oldLevel) {
        this.triggerLevelUpEffect(this.level);
      }
    }

    setBuff(buffData) {
      this.activeBuff = {
        ...buffData,
        expireAt: buffData.duration ? Date.now() + buffData.duration * 1000 : null
      };
      this.notify();
    }

    checkBuffExpiry() {
      if (this.activeBuff && this.activeBuff.expireAt && Date.now() > this.activeBuff.expireAt) {
        this.activeBuff = null;
        this.notify();
      }
    }

    triggerCoinBurstEffect(amt) {
      try {
        const hudCoins = document.getElementById('hud-coin-count') || document.getElementById('hud-coins-pill');
        if (hudCoins) {
          const floater = document.createElement('div');
          floater.className = 'currency-float-gain coin-gain';
          floater.innerHTML = `+${amt} 🪙`;
          floater.style.position = 'absolute';
          floater.style.top = '-20px';
          floater.style.right = '0';
          floater.style.fontWeight = '900';
          floater.style.color = '#f59e0b';
          floater.style.fontSize = '1.2rem';
          floater.style.textShadow = '0 2px 8px rgba(0,0,0,0.4)';
          floater.style.animation = 'floatUpFade 1.4s ease-out forwards';
          hudCoins.parentElement.style.position = 'relative';
          hudCoins.parentElement.appendChild(floater);
          setTimeout(() => floater.remove(), 1400);
        }
      } catch (e) {}
    }

    triggerStarBurstEffect(amt) {
      try {
        const hudStars = document.getElementById('stars-display') || document.getElementById('hud-stars-pill');
        if (hudStars) {
          const floater = document.createElement('div');
          floater.className = 'currency-float-gain star-gain';
          floater.innerHTML = `+${amt} ⭐`;
          floater.style.position = 'absolute';
          floater.style.top = '-20px';
          floater.style.right = '0';
          floater.style.fontWeight = '900';
          floater.style.color = '#c084fc';
          floater.style.fontSize = '1.2rem';
          floater.style.textShadow = '0 2px 8px rgba(0,0,0,0.4)';
          floater.style.animation = 'floatUpFade 1.4s ease-out forwards';
          hudStars.parentElement.style.position = 'relative';
          hudStars.parentElement.appendChild(floater);
          setTimeout(() => floater.remove(), 1400);
        }
      } catch (e) {}
    }

    triggerLevelUpEffect(newLevel) {
      try {
        const banner = document.createElement('div');
        banner.className = 'level-up-banner';
        banner.innerHTML = `
          <div class="level-up-card">
            <div class="level-up-icon">🎉</div>
            <div class="level-up-text">
              <span class="level-up-sub">CHÚC MỪNG HÀ MY LÊN CẤP!</span>
              <strong class="level-up-title">${this.getRankTitle()}</strong>
            </div>
          </div>
        `;
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 3200);
      } catch (e) {}
    }
  }

  // ============================================================
  // 3. QUEST MANAGER (DAILY & STORY QUESTS)
  // ============================================================
  class QuestManager {
    constructor(economy) {
      this.economy = economy;
      this.quests = this.loadQuests();
      this.listeners = [];
    }

    loadQuests() {
      try {
        const saved = localStorage.getItem('chip_quests_v3') || localStorage.getItem('chip_quests_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          return DEFAULT_QUESTS.map(dq => {
            const f = parsed.find(p => p.id === dq.id);
            return f ? { ...dq, current: f.current || 0, claimed: !!f.claimed } : { ...dq };
          });
        }
      } catch (e) {}
      return JSON.parse(JSON.stringify(DEFAULT_QUESTS));
    }

    save() {
      try {
        localStorage.setItem('chip_quests_v3', JSON.stringify(this.quests));
      } catch (e) {}
      this.listeners.forEach(cb => cb(this.quests));
    }

    reset() {
      this.quests = JSON.parse(JSON.stringify(DEFAULT_QUESTS));
      this.save();
    }

    onChange(cb) {
      if (typeof cb === 'function') this.listeners.push(cb);
    }

    trackProgress(type, amount = 1) {
      let changed = false;
      this.quests.forEach(q => {
        if (!q.claimed) {
          if (q.targetType === type) {
            if (type === 'streak_count' || type === 'blitz_score') {
              if (amount > q.current) {
                q.current = Math.min(q.goal, amount);
                changed = true;
              }
            } else if (type === 'total_stars') {
              const stars = this.economy ? this.economy.stars : 0;
              if (stars > q.current) {
                q.current = Math.min(q.goal, stars);
                changed = true;
              }
            } else {
              q.current = Math.min(q.goal, q.current + amount);
              changed = true;
            }
          } else if (q.targetType === 'total_stars' && this.economy) {
            if (this.economy.stars > q.current) {
              q.current = Math.min(q.goal, this.economy.stars);
              changed = true;
            }
          }
        }
      });
      if (changed) {
        this.save();
        this.checkAnyClaimable();
      }
    }

    claimReward(questId) {
      const q = this.quests.find(item => item.id === questId);
      if (!q || q.claimed || q.current < q.goal) return false;

      q.claimed = true;
      this.economy.addCoins(q.coins, `Nhiệm vụ: ${q.title}`);
      this.economy.addStars(q.stars);
      this.economy.addExp(q.exp);

      if (q.rewardItem) {
        if (q.id === 'quest_parkour' && typeof window !== 'undefined') {
          // Unlock Crown in shop
          const shop = window.CampusShopInstance;
          if (shop) shop.unlockItem('acc_crown');
        }
      }

      this.save();
      return true;
    }

    hasUnclaimed() {
      return this.quests.some(q => !q.claimed && q.current >= q.goal);
    }

    checkAnyClaimable() {
      if (typeof document !== 'undefined') {
        const dot = document.getElementById('hud-quest-dot');
        if (dot) {
          dot.style.display = this.hasUnclaimed() ? 'block' : 'none';
        }
      }
    }
  }

  // ============================================================
  // 4. SHOP & PET MANAGER
  // ============================================================
  class ShopManager {
    constructor(economy) {
      this.economy = economy;
      this.outfits = this.loadOutfits();
      this.pets = this.loadPets();
      this.equippedOutfit = localStorage.getItem('chip_equipped_outfit') || 'outfit_default';
      this.equippedPet = localStorage.getItem('chip_equipped_pet') || 'pet_corgi';
      this.listeners = [];
    }

    loadOutfits() {
      try {
        const saved = localStorage.getItem('chip_shop_outfits');
        if (saved) {
          const parsed = JSON.parse(saved);
          return SHOP_OUTFITS.map(o => {
            const f = parsed.find(p => p.id === o.id);
            return f ? { ...o, owned: !!f.owned } : { ...o };
          });
        }
      } catch (e) {}
      return JSON.parse(JSON.stringify(SHOP_OUTFITS));
    }

    loadPets() {
      try {
        const saved = localStorage.getItem('chip_shop_pets');
        if (saved) {
          const parsed = JSON.parse(saved);
          return SHOP_PETS.map(p => {
            const f = parsed.find(item => item.id === p.id);
            return f ? { ...p, owned: !!f.owned } : { ...p };
          });
        }
      } catch (e) {}
      return JSON.parse(JSON.stringify(SHOP_PETS));
    }

    save() {
      try {
        localStorage.setItem('chip_shop_outfits', JSON.stringify(this.outfits));
        localStorage.setItem('chip_shop_pets', JSON.stringify(this.pets));
        localStorage.setItem('chip_equipped_outfit', this.equippedOutfit);
        localStorage.setItem('chip_equipped_pet', this.equippedPet);
      } catch (e) {}
      this.listeners.forEach(cb => cb());
    }

    onChange(cb) {
      if (typeof cb === 'function') this.listeners.push(cb);
    }

    unlockItem(id) {
      const outfit = this.outfits.find(o => o.id === id);
      if (outfit) {
        outfit.owned = true;
        this.save();
        return;
      }
      const pet = this.pets.find(p => p.id === id);
      if (pet) {
        pet.owned = true;
        this.save();
      }
    }

    buyOutfit(id) {
      const item = this.outfits.find(o => o.id === id);
      if (!item || item.owned) return false;
      if (this.economy.spendCoins(item.price)) {
        item.owned = true;
        this.equippedOutfit = item.id;
        this.save();
        this.applyTo3DWorld();
        return true;
      }
      return false;
    }

    equipOutfit(id) {
      const item = this.outfits.find(o => o.id === id);
      if (item && item.owned) {
        this.equippedOutfit = id;
        this.save();
        this.applyTo3DWorld();
        return true;
      }
      return false;
    }

    buyPet(id) {
      const pet = this.pets.find(p => p.id === id);
      if (!pet || pet.owned) return false;
      if (this.economy.spendCoins(pet.price)) {
        pet.owned = true;
        this.equippedPet = pet.id;
        this.save();
        this.applyPetTo3DWorld();
        return true;
      }
      return false;
    }

    equipPet(id) {
      const pet = this.pets.find(p => p.id === id);
      if (pet && pet.owned) {
        this.equippedPet = id;
        this.save();
        this.applyPetTo3DWorld();
        return true;
      }
      return false;
    }

    buyFood(foodId) {
      const food = CANTEEN_FOODS.find(f => f.id === foodId);
      if (!food) return false;
      if (this.economy.spendCoins(food.cost)) {
        this.economy.setBuff({
          type: food.buff,
          duration: food.duration,
          count: food.count,
          name: food.buffName,
          icon: food.icon
        });
        if (typeof window !== 'undefined' && window.CampusQuestInstance) {
          window.CampusQuestInstance.trackProgress('order_food', 1);
        }
        return food;
      }
      return false;
    }

    applyTo3DWorld() {
      if (typeof window !== 'undefined' && window.Campus3DArenaInstance && typeof window.Campus3DArenaInstance.updateOutfit === 'function') {
        window.Campus3DArenaInstance.updateOutfit(this.equippedOutfit);
      }
    }

    applyPetTo3DWorld() {
      if (typeof window !== 'undefined' && window.Campus3DArenaInstance && typeof window.Campus3DArenaInstance.updatePet === 'function') {
        window.Campus3DArenaInstance.updatePet(this.equippedPet);
      }
    }
  }

  // ============================================================
  // 5. WEB AUDIO BGM SYNTHESIZER (Play Together / Animal Crossing)
  // Không phụ thuộc file MP3 ngoài, tự tạo giai điệu êm dịu, vui tươi
  // ============================================================
  class WebAudioBGM {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.timer = null;
      this.step = 0;
      this.volume = 0.12;

      // Giai điệu ngũ cung vui tươi & êm dịu phong cách Animal Crossing
      // Tần số nốt (Hz): C5, D5, E5, G5, A5, C6...
      this.melody = [
        523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25,
        587.33, 659.25, 783.99, 1046.50, 880.00, 783.99, 659.25, 523.25,
        440.00, 523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33,
        523.25, 587.33, 659.25, 523.25, 440.00, 392.00, 440.00, 523.25
      ];
      this.bass = [
        261.63, 261.63, 329.63, 329.63, 392.00, 392.00, 261.63, 261.63,
        293.66, 293.66, 329.63, 329.63, 392.00, 392.00, 261.63, 261.63
      ];
    }

    initContext() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
    }

    start() {
      this.initContext();
      if (!this.ctx || this.isPlaying) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;
      this.step = 0;
      this.playNote();
    }

    playNote() {
      if (!this.isPlaying || !this.ctx) return;

      const now = this.ctx.currentTime;
      const freq = this.melody[this.step % this.melody.length];

      // Âm sắc Xylophone / Marimba dịu êm (Sine wave + decay)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);

      // Thêm nốt bass đệm ấm áp mỗi 2 phách
      if (this.step % 2 === 0) {
        const bassFreq = this.bass[(this.step / 2) % this.bass.length];
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();

        bOsc.type = 'triangle';
        bOsc.frequency.setValueAtTime(bassFreq, now);

        bGain.gain.setValueAtTime(this.volume * 0.7, now);
        bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

        bOsc.connect(bGain);
        bGain.connect(this.ctx.destination);

        bOsc.start(now);
        bOsc.stop(now + 0.51);
      }

      this.step++;
      this.timer = setTimeout(() => this.playNote(), 320); // Tempo thư giãn ~94 BPM
    }

    stop() {
      this.isPlaying = false;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }

    toggle() {
      if (this.isPlaying) {
        this.stop();
        return false;
      } else {
        this.start();
        return true;
      }
    }
  }

  // ============================================================
  // 6. MINIMAP RADAR SYSTEM
  // ============================================================
  class MinimapRadar {
    constructor(canvas, arena) {
      this.canvas = canvas;
      this.arena = arena;
      this.ctx = canvas ? canvas.getContext('2d') : null;
      this.size = 140;
      if (this.canvas) {
        this.canvas.width = this.size;
        this.canvas.height = this.size;
      }
    }

    render(playerPos, playerRotY) {
      if (!this.ctx || !playerPos) return;

      const ctx = this.ctx;
      const w = this.size;
      const h = this.size;
      const cx = w / 2;
      const cy = h / 2;

      // Tỉ lệ scale: 1 mét thế giới 3D = 0.70px trên radar (bao quát khuôn viên mở rộng 260m x 190m)
      const scale = 0.70;

      // Nền tròn Glassmorphism
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, cx - 2, 0, Math.PI * 2);
      ctx.clip();

      // Nền xanh trường học mờ
      ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
      ctx.fillRect(0, 0, w, h);

      // Lưới radar nhẹ
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.arc(cx, cy, 48, 0, Math.PI * 2);
      ctx.stroke();

      // Tọa độ thế giới các địa điểm chính (World Positions)
      const POIs = [
        { label: '🇬🇧 Lớp Anh', x: 0, z: 4, color: '#38bdf8' },
        { label: '📐 Lớp Toán', x: 35, z: 4, color: '#059669' },
        { label: '🥁 Trống', x: 17, z: 22, color: '#ef4444' },
        { label: '🍔 Căn Tin', x: -26, z: 16, color: '#f97316' },
        { label: '🎣 Hồ Câu', x: 36, z: 36, color: '#06b6d4' },
        { label: '⭐ Obby', x: 25, z: 38, color: '#a855f7' },
        { label: '🇻🇳 Cột Cờ', x: 0, z: 38, color: '#ef4444' },
        { label: '⚽ Sân Bóng', x: -55, z: 38, color: '#22c55e' },
        { label: '🏀 Sân Rổ', x: -60, z: 28, color: '#f59e0b' },
        { label: '📖 Thư Viện', x: 55, z: 24, color: '#8b5cf6' },
        { label: '🎭 Sân Khấu', x: -36, z: 38, color: '#ec4899' },
        { label: '🌺 Vườn Hoa', x: 55, z: 36, color: '#10b981' }
      ];

      // Vẽ các địa điểm tương đối so với trung tâm khuôn viên (X = 0, Z = 38)
      POIs.forEach(poi => {
        const mapX = cx + (poi.x) * scale;
        const mapY = cy + (poi.z - 38) * scale;

        ctx.fillStyle = poi.color;
        ctx.beginPath();
        ctx.arc(mapX, mapY, 4.0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8.5px Nunito, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(poi.label, mapX, mapY - 5);
      });

      // Vẽ vị trí Bé Hà My (Chấm đỏ cam nổi bật kèm nón góc nhìn)
      const pMapX = cx + (playerPos.x) * scale;
      const pMapY = cy + (playerPos.z - 38) * scale;

      // Hướng nhìn (Vision Cone)
      ctx.save();
      ctx.translate(pMapX, pMapY);
      ctx.rotate(-playerRotY);

      ctx.fillStyle = 'rgba(236, 72, 153, 0.35)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 16, -Math.PI / 4, Math.PI / 4);
      ctx.closePath();
      ctx.fill();

      // Chấm nhân vật
      ctx.fillStyle = '#f43f5e';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.restore();

      // Viền radar
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, cx - 2, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // ============================================================
  // EXPORT ECOSYSTEM
  // ============================================================
  return {
    DEFAULT_QUESTS,
    SHOP_OUTFITS,
    SHOP_PETS,
    CANTEEN_FOODS,
    FISH_SPECIES,
    LEADERBOARD_DATA,
    EconomyManager,
    QuestManager,
    ShopManager,
    WebAudioBGM,
    MinimapRadar
  };
});
