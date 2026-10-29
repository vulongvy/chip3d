# 🎮 HƯỚNG DẪN "VIBE CODE" & PHÁT TRIỂN TIẾP TRÊN MÁY TÍNH MỚI
### Dự án: Chip English Adventure & 3D City Commute (Trường Tiểu Học Ngô Quyền)

Tài liệu này được biên soạn để bạn hoặc bất kỳ ai khi mang mã nguồn sang **máy tính mới** có thể mở lên chạy ngay lập tức trong 5 giây và tiếp tục phát triển ("vibe code") mà không gặp bất kỳ lỗi môi trường, CORS hay đường dẫn nào.

---

## ⚡ 1. Khởi động nhanh trong 1 Click (Quick Start)

Khi giải nén file `chip_english_adventure_lightweight.zip` (hoặc copy thư mục mã nguồn) sang máy tính mới:

1. **Nhấp đúp chuột vào file:**
   ```
   start_tool.bat
   ```
2. **Hệ thống tự động:**
   - 🔍 Tự động quét và nhận diện Python có trên máy tính (`python`, `py -3`, `python3`, `%LOCALAPPDATA%`, `Program Files`).
   - 🌐 Tự động tìm cổng mạng còn trống (8000, 8001...) để không bao giờ bị đụng độ cổng.
   - ⚡ Bật máy chủ HTTP nội bộ với tính năng **No-Cache** (sửa code là F5 ăn ngay).
   - 🚀 Tự động mở trình duyệt web đến giao diện chính của game.
   - 📱 Hiển thị đường link IP nội bộ (LAN) để mở thử nghiệm ngay trên iPad / iPhone / Android trong cùng mạng Wi-Fi.

> **Mẹo:** Bạn có thể khởi động thẳng vào game không cần qua Menu bằng cách chạy:
> `start_tool.bat --run` hoặc `python start_tool.py --run`

---

## 🗺️ 2. Sơ đồ cấu trúc dự án (Architecture Map)

Dự án được xây dựng bằng kiến trúc **Vanilla Web Standards (Three.js + Canvas2D + Web Audio + Web Speech API)**, không cần npm build hay webpack phức tạp, giúp việc chỉnh sửa code diễn ra trực tiếp và tức thì.

| Tệp / Thư mục | Vai trò chính | Hướng dẫn chỉnh sửa khi "Vibe Code" |
| :--- | :--- | :--- |
| `start_tool.bat` / `.py` | Trình quản lý khởi động, tự cài thư viện & đóng gói | Điểm bắt đầu trên mọi máy tính mới |
| `index.html` | Khung giao diện HTML5, HUD bảng điều khiển, CSS anime | Chỉnh giao diện người dùng, nút bấm, avatar |
| `city_commute.js` | **Lõi 3D Thành Phố (1.19 km)**: Phố Trần Quốc Tuấn, Ngô Quyền, Lê Xoay, Bùng binh Kim Ngọc, Sân Vườn Vũ Dậu | Thêm/sửa cửa hàng, biển hiệu, xe cộ, cây xanh, nhà dân |
| `three_arena.js` | Đấu trường 3D trường tiểu học Ngô Quyền (sân trường, lớp 5C4) | Chỉnh sửa bục đáp án A-B-C-D, tượng đài, cột cờ |
| `game.js` | Logic game chính: tính điểm, streak, câu hỏi, avatar phát biểu, fallback voice | Quản lý quy tắc chơi, thời gian trả lời, hiệu ứng âm thanh |
| `data.js` | Ngân hàng câu hỏi SGK Tiếng Anh Lớp 5 & từ vựng các đảo | Thêm bài học mới, từ vựng, câu hỏi ngữ pháp |
| `audio_manifest.js` | Bảng ánh xạ âm thanh giọng đọc AI Neural | Tự động sinh bởi công cụ cập nhật voice |
| `streetview_360.js` | Trình chiếu ảnh 360 độ Panorama thực tế | Chuyển đổi giữa chế độ 3D ảo và ảnh thực địa |
| `tools/` | Bộ công cụ sinh dữ liệu, voice AI, và dev script | Chứa `generate_audio_edge.py` (TTS miễn phí) |

---

## 🏙️ 3. Bí kíp chỉnh sửa thế giới 3D (`city_commute.js`)

Thành phố 3D được mô phỏng theo tỉ lệ thực $1:1$ dựa trên tọa độ 41 Waypoint trên tuyến đường 1.19 km:

### A. Hệ trục tọa độ và các mốc chính:
- Tuyến đường bắt đầu từ **Cổng Đình Làng Ngô Quyền & Nhà bé Hà My** ($Z \approx 65$), chạy dọc phố **Trần Quốc Tuấn**, rẽ vào **Ngô Quyền** ($Z \approx 0$ đến $-400$), qua **Ngã 3 Lê Xoay** ($Z \approx -500$), qua **Bưu Điện Tỉnh & Bùng Binh Kim Ngọc** ($Z \approx -900$), và kết thúc tại **Sân Nhà Cây Cảnh Vũ Dậu** ($Z \approx -1190$).
- Trục $X$: Chiều ngang đường ($X < 0$: lề trái, $X > 0$: lề phải, $X \approx 0$: tim đường).
- Trục $Y$: Độ cao ($Y = 0$: mặt đường).
- Trục $Z$: Chiều dọc hành trình từ trường về nhà.

### B. Cách thêm một cửa hàng / biển hiệu mới:
Trong `city_commute.js`, hàm `_buildDetailedSignboard(shop)` nhận các tham số trực quan:
```javascript
{
  x: 10.5,           // Tọa độ ngang lề đường
  y: 4.8,            // Độ cao biển hiệu
  z: -285.0,         // Vị trí dọc tuyến đường (mét)
  width: 5.2,        // Chiều rộng biển
  height: 1.4,       // Chiều cao biển
  rotY: Math.PI / 2, // Hướng xoay mặt biển ra đường
  title: "TÊN TIỆM CỦA BẠN",
  sub: "DỊCH VỤ / SẢN PHẨM",
  bg: "#d63031",     // Màu nền biển hiệu (hex code)
  textColor: "#fff"  // Màu chữ
}
```

### C. Cách thêm xe cộ / NPC chuyển động:
Hàm `_spawnTrafficCar(type, x, z, heading)` hoặc `_buildBonsaiGarden()` đã được mô-đun hóa sẵn trong file. Bạn chỉ cần gọi hàm và truyền tọa độ mong muốn.

---

## 📚 4. Cách thêm bài học & câu hỏi SGK mới (`data.js`)

Mở file `data.js`, tìm mảng `GRADE_5_ISLANDS`. Mỗi câu hỏi có cấu trúc:
```javascript
{
  id: "g5_u11_q01",
  question: "What's the matter with you? - I have a ______.",
  options: ["headache", "stomach ache", "toothache", "fever"],
  answer: 0,
  hint: "Bạn nhìn hình bạn nhỏ đang ôm đầu nhé!",
  teacherIntro: "Hà My ơi, bạn nhỏ trong tranh đang bị đau đầu đấy!",
  teacherPraise: "Tuyệt vời con gái! Headache chính là đau đầu!",
  teacherCorrection: "Chưa chính xác rồi, con chú ý từ headache nhé!"
}
```

### Tự động tạo giọng đọc AI Neural cho câu hỏi mới:
Sau khi sửa `data.js`, bạn chỉ cần:
- Bấm vào `start_tool.bat` ➔ chọn mục **[2] Tải & Sinh Voice Audio mới**.
- Hoặc nhấp đúp vào file `CAP_NHAT_VOICE_QUANG_MINH.cmd`.
- Công cụ sử dụng Microsoft Edge Neural TTS giọng **vi-VN-NamMinhNeural** (giọng thầy giáo chuẩn miền Bắc) tải hoàn toàn miễn phí qua mạng, không tốn GPU, tự lưu vào thư mục `audio/` và cập nhật `audio_manifest.js`.

---

## 🧪 5. Kiểm thử tự động không cần mở màn hình (Headless CDP)

Khi đang code trên máy mới hoặc muốn chụp ảnh kiểm tra góc nhìn 3D:
1. Đảm bảo game đang chạy ở port 8000 (`start_tool.bat`).
2. Chạy lệnh:
   ```powershell
   python capture_tqt_shops.py
   ```
3. Script sẽ tự khởi động Edge/Chrome ngầm, lái xe qua 6 địa điểm chính (Phở Lý, Cổng Đình Cổ, Elise Ngô Quyền, Ngã Ba Lê Xoay, Bưu Điện VNPT, Vườn Cây Cảnh Vũ Dậu) và lưu ảnh chất lượng cao vào thư mục `screenshots/`.

---

## 🛠️ 6. Bảng gỡ lỗi khi đổi máy tính (Troubleshooting Checklist)

| Hiện tượng | Nguyên nhân | Cách xử lý tức thì |
| :--- | :--- | :--- |
| **Ảnh 3D hoặc âm thanh không tải được** | Chạy bằng cách nhấp đúp thẳng vào `index.html` (`file:///`) dẫn đến bị trình duyệt chặn CORS | Chạy qua `start_tool.bat` để mở qua giao thức `http://localhost:8000` |
| **Cổng 8000 bị phần mềm khác chiếm** | Đã có dịch vụ khác dùng port 8000 | `start_tool.py` sẽ tự động phát hiện và nhảy sang cổng 8001, 8002... bạn không cần cấu hình gì |
| **Không nghe thấy tiếng cô/thầy giáo đọc** | Chưa tải gói audio hoặc thư mục `audio` để trống | Game có sẵn cơ chế **Fallback 100%**: tự động chuyển sang Web Speech API trên trình duyệt. Để có giọng AI mượt mà, chọn mục [2] trong `start_tool.bat`. |
| **Sửa code `.js` nhưng trình duyệt không đổi** | Trình duyệt lưu cache file cũ | `start_tool.py` đã gửi header `Cache-Control: no-cache`. Bạn chỉ cần nhấn `Ctrl + F5` hoặc `F5` trên trình duyệt. |

---

## 🚀 7. Đóng gói lại gửi cho người khác
Khi bạn đã "vibe code" xong các tính năng mới trên máy của mình và muốn gửi cho bạn bè:
1. Mở `start_tool.bat`
2. Chọn phím **[3] Đóng gói bản Siêu Nhẹ (.ZIP ~25MB)**.
3. File `.zip` sạch sẽ, tối ưu hóa dung lượng sẽ được tạo tự động trong thư mục `dist/` để bạn gửi đi bất cứ đâu!
