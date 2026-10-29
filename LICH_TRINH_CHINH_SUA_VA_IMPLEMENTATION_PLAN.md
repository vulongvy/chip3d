# 🚀 LỊCH TRÌNH CHỈNH SỬA & IMPLEMENTATION PLAN CHI TIẾT
## Hướng Dẫn Sang Máy Tính Khác "Vibe Code" & Tạo Project Mới Siêu Tốc
*(Dự án: Chip English Adventure & 3D Anime City Commute)*

---

## ⚡ PHẦN 1: CÁCH TẠO PROJECT MỚI NHANH NHẤT (DƯỚI 1 PHÚT)

Khi bạn muốn bắt đầu một project mới từ bộ code này (cho bé khác học, hoặc tạo một thành phố mới):

### Cách 1: Dùng công cụ 1-Click tự động (Khuyên dùng)
Nhấp đúp chuột vào file:
```cmd
TAO_PROJECT_MOI.bat
```
- Công cụ sẽ hỏi tên thư mục project mới (Ví dụ: `chip_lop6` hoặc `city_hanoi`).
- Tự động sao chép 100% mã nguồn sạch, bỏ qua toàn bộ file rác và file dung lượng nặng (>1GB).
- Bạn sẽ có ngay một project mới tinh chỉ nặng ~39MB sẵn sàng chạy!

### Cách 2: Thủ công qua file ZIP
1. Lấy file nén: `dist\chip_english_adventure_lightweight.zip` (39.7 MB).
2. Copy sang máy tính mới hoặc thư mục mới và giải nén (Extract Here).
3. Đổi tên thư mục thành tên project bạn muốn.
4. Bấm `start_tool.bat` là chạy ngay!

---

## 📅 PHẦN 2: LỊCH TRÌNH CHỈNH SỬA TỪNG BƯỚC (STEP-BY-STEP IMPLEMENTATION SCHEDULE)

Dưới đây là lịch trình chuẩn để bạn chỉnh sửa và "vibe code" bộ mã nguồn này thành sản phẩm mới:

### 🗓️ BƯỚC 1: Đổi thông tin nhân vật & Tên học sinh (15 phút)
- **Mở file:** `data.js` và `game.js`
- **Chỉnh sửa:**
  - Đổi tên học sinh: Tìm chữ `"Hà My"` ➔ Đổi thành tên con bạn (ví dụ: `"Bảo Nam"`, `"Minh Anh"`).
  - Đổi tên lớp/trường: Tìm `"Lớp 5C4"`, `"Trường Tiểu Học Ngô Quyền"` ➔ Đổi thành lớp/trường mới.
  - Đổi avatar: Thay ảnh `chibi_ha_my.jpg` bằng ảnh chibi mới (giữ nguyên kích thước vuông).

### 🗓️ BƯỚC 2: Tùy biến nội dung câu hỏi bài học SGK (30 phút)
- **Mở file:** `data.js`
- **Vị trí:** Tìm mảng `const GRADE_5_ISLANDS = [ ... ];`
- **Cách sửa một câu:**
  ```javascript
  {
    id: "g5_u01_q01",
    question: "Where are you from? - I'm from ______.",
    options: ["Vietnam", "Vietnamese", "England", "American"],
    answer: 0,
    hint: "Việt Nam là tên quốc gia con nhé!",
    teacherIntro: "Bé Hà My ơi, cùng thầy làm câu hỏi về quê hương nào!",
    teacherPraise: "Tuyệt vời con yêu! Vietnam là đáp án chính xác!",
    teacherCorrection: "Chưa đúng rồi, từ chỉ quốc gia là Vietnam con nhé!"
  }
  ```
- **Sinh lại giọng đọc AI:** Chạy file `start_tool.bat` ➔ Bấm phím **[2]** để Microsoft Edge Neural TTS tự đọc và lưu toàn bộ câu mới vào máy hoàn toàn miễn phí.

### 🗓️ BƯỚC 3: Chỉnh sửa biển hiệu & Cửa hàng 3D trên phố (45 phút)
- **Mở file:** `city_commute.js`
- **Vị trí:** Tìm hàm `_buildDetailedSignboard(shop)` hoặc mảng danh sách cửa hàng.
- **Cách thêm tiệm mới ven đường:**
  ```javascript
  this._buildDetailedSignboard({
    x: 10.5,           // Lề đường bên phải (dương: phải, âm: trái)
    y: 4.8,            // Chiều cao biển hiệu so với mặt đất (mét)
    z: -285.0,         // Vị trí dọc tuyến đường (0: Trường, -1190: Về đến nhà)
    width: 5.2,        // Độ rộng biển hiệu
    height: 1.4,       // Chiều cao biển
    rotY: Math.PI / 2, // Góc quay mặt biển về lòng đường
    title: "TIỆM TRÀ SỮA TOCOTOCO",
    sub: "TRÀ SỮA & ĂN VẶT HỌC SINH",
    bg: "#ff9f43",     // Màu nền biển hiệu (mã màu Hex)
    textColor: "#ffffff"
  });
  ```

### 🗓️ BƯỚC 4: Thêm xe cộ chạy trên đường (30 phút)
- **Mở file:** `city_commute.js`
- **Vị trí:** Tìm hàm `_spawnTrafficCar()`
- **Cách dùng:**
  ```javascript
  // Thêm 1 chiếc Toyota Vios màu trắng đậu hoặc chạy ở lề đường:
  this._spawnTrafficCar("sedan", -6.5, -150.0, 0); 
  // Thêm 1 xe Honda Wave đậu trước cửa hàng:
  this._spawnTrafficCar("bike", 8.2, -60.0, Math.PI / 4);
  ```

### 🗓️ BƯỚC 5: Tùy biến giao diện & Màu sắc Anime Studio Ghibli (30 phút)
- **Mở file:** `style.css` và `city_commute.js`
- **Chỉnh bầu trời & ánh sáng:**
  - Bầu trời Ghibli: Tìm hàm `_buildSkyDome()` trong `city_commute.js` để chỉnh màu gradient (xanh lam ngọc, nắng vàng, hoặc hoàng hôn tím hồng).
  - Ánh nắng mặt trời: Tìm `this.sunLight` chỉnh `color: 0xfff3d1`, `intensity: 1.35`.

---

## 🗺️ PHẦN 3: BẢN ĐỒ TỌA ĐỘ 3D 1.19 KM ĐỂ CĂN CHỈNH VỊ TRÍ

| Mốc Km | Tọa độ Z | Địa điểm thực tế tại Vĩnh Yên | Điểm nổi bật đã dựng 3D |
| :---: | :---: | :--- | :--- |
| **0.00 km** | $Z \approx +65$ | Trường TH Ngô Quyền & Nhà bé Hà My | Cổng Đình Cổ Kính, Biệt thự Đông Dương, Cây xanh |
| **0.08 km** | $Z \approx +40$ | Phố Trần Quốc Tuấn (đoạn 1) | Quán Phở Lý, Rèm Cửa Cao Cấp, Mầm Non Hạnh Phúc |
| **0.25 km** | $Z \approx -120$ | Ngã rẽ Phố Ngô Quyền | Tiệm Áo Dài Hoàng Gia, Vàng Bạc Hoàng Sơn |
| **0.45 km** | $Z \approx -285$ | Số 24 Ngô Quyền | Showroom Thời Trang Elise, Vàng Bạc Ngô Quyền, Innova SUV |
| **0.65 km** | $Z \approx -500$ | Ngã Ba Lê Xoay | Tiệm Chăn Ga Huyền Hậu, Đại Lý Vinamilk, Honda Wave |
| **0.95 km** | $Z \approx -900$ | Vòng xuyến Bùng Binh Kim Ngọc | Trụ sở Bưu Điện Tỉnh VNPT, Cột tháp hoa, Công viên tròn |
| **1.19 km** | $Z \approx -1190$ | Đích đến: Nhà Cây Cảnh Vũ Dậu | Vườn Bonsai truyền thống, Bàn trà đá, Sân gạch đỏ |

---

## 🤖 PHẦN 4: PROMPT MẪU COPY & PASTE CHO AI TRÊN MÁY TÍNH MỚI

Khi bạn mở VSCode / Cursor / ChatGPT / Claude trên máy tính khác, hãy **copy nguyên đoạn văn bản bên dưới** và gửi cho AI:

```markdown
Chào bạn, tôi đang phát triển dự án "Chip English Adventure & 3D City Commute" viết bằng JavaScript thuần (Three.js + HTML5 Canvas, không dùng Node build/Webpack).

Cấu trúc dự án:
- index.html: Giao diện và HUD anime.
- city_commute.js: Thế giới 3D 1.19 km (Phố Trần Quốc Tuấn -> Ngô Quyền -> Lê Xoay -> Bùng Binh Kim Ngọc -> Vườn Vũ Dậu).
- three_arena.js: Đấu trường 3D trường tiểu học Ngô Quyền.
- game.js: Logic bài học Tiếng Anh lớp 5 và cơ chế phát âm thanh Fallback.
- data.js: Ngân hàng câu hỏi SGK (mảng GRADE_5_ISLANDS).
- start_tool.bat / start_tool.py: Máy chủ HTTP nội bộ hỗ trợ CORS và tự động mở trình duyệt.

Tôi muốn bạn hỗ trợ tôi "vibe code" tính năng sau đây:
[ĐIỀN TÍNH NĂNG BẠN MUỐN THÊM VÀO ĐÂY, VÍ DỤ: Thêm hiệu ứng lá rơi rụng dọc đường Ngô Quyền, hoặc thêm bài học Unit 12...]

Hãy đọc kỹ code hiện tại và đưa ra code drop-in replacement trực tiếp giúp tôi nhé!
```

---

## 🛠️ PHẦN 5: BẢNG KIỂM TRA SỰ CỐ (TROUBLESHOOTING CHECKLIST)

1. **Mở trình duyệt bị trắng màn hình / không tải được 3D:**
   - *Nguyên nhân:* Mở bằng cách nhấp đúp file `index.html` (dính lỗi CORS trình duyệt).
   - *Cách xử lý:* Luôn chạy bằng `start_tool.bat`.
2. **Không nghe thấy tiếng cô/thầy giáo đọc bài:**
   - *Nguyên nhân:* Thư mục `audio` đang trống do tải bản nhẹ.
   - *Cách xử lý:* Chạy `start_tool.bat` ➔ Bấm phím **[2]** để tạo giọng đọc tự động. Hoặc game sẽ tự động dùng giọng Web Speech API của trình duyệt.
3. **Chỉnh sửa file `.js` nhưng trình duyệt không thấy thay đổi:**
   - *Nguyên nhân:* Trình duyệt lưu cache file cũ.
   - *Cách xử lý:* Bấm tổ hợp phím **Ctrl + F5** trên trình duyệt để tải lại hoàn toàn.
4. **Muốn đóng gói bản mới sau khi đã chỉnh sửa xong:**
   - Chạy `start_tool.bat` ➔ Bấm phím **[3]**, file ZIP mới sẽ tự động được tạo trong thư mục `dist/`.
