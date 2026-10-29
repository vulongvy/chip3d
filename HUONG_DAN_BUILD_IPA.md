# 🍏 HƯỚNG DẪN TẠO VÀ CÀI ĐẶT FILE .IPA CHO IPHONE (TỪ MÁY WINDOWS)

Dự án **Chip English Adventure & 3D City Commute** đã được thiết lập sẵn toàn bộ mã nguồn Native iOS (Swift + WebKit WKWebView) và kịch bản tự động biên dịch file `.ipa`.

---

## ❓ Vì sao Apple yêu cầu môi trường Mac để tạo file `.ipa`?
File `.ipa` của iPhone thực chất là một gói nén chứa tệp thực thi nhị phân kiến trúc **ARM64 Mach-O**. Apple chỉ cho phép biên dịch kiến trúc này thông qua bộ công cụ **Xcode và Clang iOS SDK** chạy trên macOS.

👉 **Giải pháp hoàn hảo (Không cần mua máy Mac):**  
Chúng ta sử dụng **máy chủ macOS 14 đám mây miễn phí của GitHub Actions** để tự động build dự án và xuất file `.ipa` hoàn chỉnh cho bạn tải về!

---

## ⚡ BƯỚC 1: LẤY FILE .IPA TỰ ĐỘNG BẰNG GITHUB ACTIONS (MIỄN PHÍ)

1. Tải hoặc đẩy toàn bộ thư mục dự án này lên một kho lưu trữ (Repository) trên **GitHub** của bạn.
2. Trên trình duyệt web, vào trang GitHub Repository của bạn:
   - Nhấp vào tab **Actions** ở menu phía trên.
   - Nhìn sang cột bên trái, chọn luồng: **Build iOS IPA Package**.
   - Nhấn vào nút **Run workflow** (nút màu xanh) ➔ Chọn nhánh `main` ➔ Bấm **Run workflow**.
3. Máy chủ Mac ảo của GitHub sẽ tự động:
   - Chuẩn bị tài nguyên web 3D.
   - Biên dịch dự án Swift WKWebView sang mã máy iOS ARM64.
   - Đóng gói thành file `Chip3D.ipa`.
4. Sau khoảng 2–3 phút, khi quy trình báo dấu tích xanh ✅ thành công:
   - Nhấp vào phiên chạy đó, cuộn xuống mục **Artifacts**.
   - Bấm tải file **`Chip3D-iOS-App`** về máy tính (bên trong chính là file **`Chip3D.ipa`**).

---

## 📲 BƯỚC 2: CÀI FILE .IPA VÀO IPHONE TỪ MÁY TÍNH WINDOWS

Trên máy tính Windows, có 3 công cụ sideload file `.ipa` vào iPhone cực kỳ nhanh chóng và an toàn:

### 🌟 Cách 1: Dùng Sideloadly (Khuyên dùng nhất trên Windows - 1 Phút)
1. Tải công cụ **Sideloadly** miễn phí cho Windows tại: [https://sideloadly.io](https://sideloadly.io)
2. Cài đặt Sideloadly và cắm iPhone vào máy tính bằng cáp sạc USB (nếu iPhone hỏi thì chọn *"Tin cậy máy tính này"*).
3. Mở Sideloadly:
   - Kéo file `Chip3D.ipa` thả vào ô biểu tượng IPA trong Sideloadly.
   - Nhập tài khoản **Apple ID** của bạn vào ô `Apple ID` (để Sideloadly tự động ký chứng chỉ cài đặt miễn phí của Apple).
   - Nhấn nút **Start**.
4. Chờ 30 giây đến khi thanh tiến trình báo `Done!`.
5. **Kích hoạt trên iPhone**:
   - Vào **Cài đặt (Settings)** ➔ **Cài đặt chung (General)** ➔ **Quản lý VPN & Thiết bị (VPN & Device Management)**.
   - Chọn tài khoản Apple ID của bạn ➔ Bấm **Tin cậy (Trust)**.
   - Mở biểu tượng game **Chip 3D** trên màn hình chính và trải nghiệm toàn màn hình!

---

### 🌟 Cách 2: Dùng AltStore / AltServer
Nếu bạn đã cài sẵn AltStore trên iPhone:
1. Chép file `Chip3D.ipa` vào ứng dụng *Tệp (Files)* trên iPhone (hoặc gửi qua AirDrop / Telegram / Google Drive).
2. Mở ứng dụng **AltStore** trên iPhone ➔ Tab **My Apps** ➔ Bấm dấu `+` ở góc trên cùng.
3. Chọn file `Chip3D.ipa` để AltStore tự động cài đặt.

---

### 🌟 Cách 3: Dùng TrollStore (Dành cho máy có TrollStore)
Nếu iPhone của bạn đang chạy TrollStore:
- Chỉ cần gửi file `Chip3D.ipa` sang iPhone, chạm vào file và chọn **Install with TrollStore**.
- Ứng dụng sẽ được cài vĩnh viễn không bao giờ bị giới hạn 7 ngày!

---

## 🛠️ CẤU TRÚC DỰ ÁN NATIVE IOS TRONG MÃ NGUỒN
- [`ios/Chip3D/AppDelegate.swift`](file:///H:/toollong/18-%20tieng%20anh/chip/ios/Chip3D/AppDelegate.swift): Khởi tạo cửa sổ ứng dụng iOS thuần.
- [`ios/Chip3D/ViewController.swift`](file:///H:/toollong/18-%20tieng%20anh/chip/ios/Chip3D/ViewController.swift): Lớp bọc `WKWebView` hiệu năng cao với WebGL, Audio HTML5 và Local File System.
- [`ios/Chip3D/Info.plist`](file:///H:/toollong/18-%20tieng%20anh/chip/ios/Chip3D/Info.plist): Khai báo màn hình ngang (Landscape), ẩn thanh trạng thái, quyền mạng nội bộ.
- [`ios/project.yml`](file:///H:/toollong/18-%20tieng%20anh/chip/ios/project.yml): Định nghĩa cấu hình XcodeGen.
- [`tools/prepare_ios_assets.py`](file:///H:/toollong/18-%20tieng%20anh/chip/tools/prepare_ios_assets.py): Tự động nén và đồng bộ tài nguyên Web vào `ios/Chip3D/www`.
- [`.github/workflows/build-ipa.yml`](file:///H:/toollong/18-%20tieng%20anh/chip/.github/workflows/build-ipa.yml): Kịch bản đám mây tự động build file `.ipa`.
