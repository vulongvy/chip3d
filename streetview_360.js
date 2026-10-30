// ============================================================
// GOOGLE STREET VIEW 360° ENGINE - THỰC TẾ 100% TẠI VĨNH YÊN
// Tuyến đường 1.19 km từ TH Ngô Quyền (141 Trần Quốc Tuấn) -> Nhà Vườn Cây Cảnh Vũ Dậu
// Hỗ trợ hiển thị 41 ảnh 360° Panorama equirectangular, xoay 360°, zoom,
// tiến lùi bằng mũi tên trên mặt đường chuẩn xác như Google Maps thật!
// ============================================================

class StreetView360Viewer {
  constructor() {
    this.panos = window.STREET_VIEW_PANOS || [];
    this.currentPanoIndex = 0; // Mặc định ở Pano 41 (phần tử đầu tiên trong reversed list là id=41)
    this.isOpen = false;
    this.container = null;
    this.canvas = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.sphereMesh = null;
    this.textureLoader = new THREE.TextureLoader();
    this.loadedTextures = {};
    this.qualityMode = '2k'; // 'preview', '2k', 'hd'

    // Camera Rotation & Interaction
    this.lon = 180;
    this.lat = 0;
    this.targetLon = 180;
    this.targetLat = 0;
    this.fov = 75;
    this.targetFov = 75;
    this.isUserInteracting = false;
    this.onPointerDownPointerX = 0;
    this.onPointerDownPointerY = 0;
    this.onPointerDownLon = 0;
    this.onPointerDownLat = 0;
    this.animationFrameId = null;

    // Raycaster for 3D In-Scene Navigation Arrows
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.arrowForwardMesh = null;
    this.arrowBackwardMesh = null;

    this.initDOM();
    this.initThree();
    this.setupEventListeners();
  }

  // ------------------------------------------------------------
  // 1. TẠO GIAO DIỆN DOM MODAL TOÀN MÀN HÌNH CHUẨN GOOGLE STREET VIEW
  // ------------------------------------------------------------
  initDOM() {
    let el = document.getElementById('streetview-360-viewport');
    if (!el) {
      el = document.createElement('div');
      el.id = 'streetview-360-viewport';
      el.style.cssText = `
        display: none;
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        z-index: 999998;
        background: #000;
        overflow: hidden;
        user-select: none;
        font-family: 'Nunito', Roboto, Arial, sans-serif;
      `;
      el.innerHTML = `
        <!-- Canvas Three.js -->
        <canvas id="streetview-360-canvas" style="width: 100%; height: 100%; display: block; cursor: grab;"></canvas>

        <!-- TOP BAR: THÔNG TIN ĐỊA DANH & ĐIỀU HƯỚNG -->
        <div style="position: absolute; top: 16px; left: 20px; right: 20px; z-index: 10; display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; pointer-events: none;">
          <!-- Card Tiêu đề Địa điểm Google Street View -->
          <div style="background: rgba(15, 23, 42, 0.92); border: 2px solid rgba(250, 204, 21, 0.6); backdrop-filter: blur(12px); border-radius: 18px; padding: 12px 20px; color: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.6); pointer-events: auto; max-width: 620px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
              <span style="background: #ea4335; color: #fff; font-size: 0.72rem; font-weight: 900; padding: 2px 8px; border-radius: 6px; letter-spacing: 0.5px;">GOOGLE STREET VIEW 360°</span>
              <span id="sv-date-badge" style="background: rgba(255,255,255,0.15); color: #fef08a; font-size: 0.75rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">T5/2026</span>
              <span id="sv-index-badge" style="background: #1a73e8; color: #fff; font-size: 0.75rem; font-weight: 900; padding: 2px 8px; border-radius: 6px;">Điểm 41/41</span>
            </div>
            <h2 id="sv-title" style="margin: 0; font-size: 1.25rem; font-weight: 900; color: #fef08a; text-shadow: 0 2px 4px rgba(0,0,0,0.5); line-height: 1.3;">
              Cổng Trường Tiểu Học Ngô Quyền (141 Trần Quốc Tuấn)
            </h2>
            <div id="sv-desc" style="font-size: 0.85rem; color: #cbd5e1; margin-top: 4px; font-weight: 600;">
              141 Phố Trần Quốc Tuấn - Điểm xuất phát của Bé Hà My
            </div>
            <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px; font-size: 0.78rem; color: #94a3b8;">
              <span id="sv-gps">📍 21.305214, 105.598219</span>
              <span>•</span>
              <span id="sv-road">Đ. Trần Quốc Tuấn</span>
              <span>•</span>
              <a id="sv-gmaps-link" href="#" target="_blank" style="color: #60a5fa; text-decoration: underline; font-weight: 700; pointer-events: auto;">Mở Google Maps ↗</a>
            </div>
          </div>

          <!-- Nút Công cụ bên phải (Chất lượng ảnh, 3D Mode, Đóng) -->
          <div style="display: flex; gap: 8px; align-items: center; pointer-events: auto;">
            <!-- Nút chọn độ phân giải -->
            <button id="btn-sv-quality" style="background: rgba(15, 23, 42, 0.9); border: 1.5px solid rgba(255,255,255,0.3); color: #fff; padding: 9px 14px; border-radius: 999px; font-weight: 800; font-size: 0.82rem; cursor: pointer; backdrop-filter: blur(8px); display: flex; align-items: center; gap: 6px;" title="Chuyển đổi chất lượng ảnh 2K mượt mà hoặc 16K siêu nét">
              <span>🖼️</span>
              <span id="sv-quality-text">Chất lượng: 2K Chuẩn</span>
            </button>

            <!-- Nút Chuyển sang 3D Lái Xe Vice City -->
            <button id="btn-sv-enter-3d" style="background: linear-gradient(135deg, #e11d48, #be123c); border: 2px solid #fda4af; color: #fff; padding: 9px 18px; border-radius: 999px; font-weight: 900; font-size: 0.88rem; cursor: pointer; box-shadow: 0 4px 16px rgba(225, 29, 72, 0.4); display: flex; align-items: center; gap: 6px;">
              <span>🛵</span>
              <span>Lái Xe 3D Tại Đây</span>
            </button>

            <!-- Nút Đóng Street View -->
            <button id="btn-sv-close" style="background: rgba(15, 23, 42, 0.9); border: 2px solid rgba(255,255,255,0.4); color: #fff; width: 42px; height: 42px; border-radius: 50%; font-weight: 900; font-size: 1.3rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.4);" title="Đóng Street View (Esc hoặc V)">
              ✕
            </button>
          </div>
        </div>

        <!-- HINT ĐIỀU KHIỂN GIỮA MÀN HÌNH KHI MỚI VÀO -->
        <div id="sv-guide-toast" style="position: absolute; top: 120px; left: 50%; transform: translateX(-50%); z-index: 10; background: rgba(0,0,0,0.75); color: #fff; border: 1px solid rgba(255,255,255,0.25); border-radius: 999px; padding: 8px 24px; font-size: 0.82rem; font-weight: 800; pointer-events: none; backdrop-filter: blur(6px); display: flex; align-items: center; gap: 8px; transition: opacity 0.5s;">
          <span>🖱️</span>
          <span>Kéo chuột để xoay 360° toàn cảnh • Cuộn chuột để thu phóng • Bấm mũi tên ⬆ ⬇ để đi trên phố</span>
        </div>

        <!-- NÚT ĐIỀU HƯỚNG BƯỚC ĐI TIẾN / LÙI (BÊN DƯỚI GẦN MẶT ĐƯỜNG) -->
        <div style="position: absolute; bottom: 125px; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; gap: 14px; pointer-events: auto;">
          <button id="btn-sv-step-back" style="background: rgba(15, 23, 42, 0.9); border: 2px solid #38bdf8; color: #fff; padding: 12px 24px; border-radius: 999px; font-weight: 900; font-size: 0.92rem; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 8px; backdrop-filter: blur(8px);">
            <span style="font-size: 1.2rem;">⬇</span>
            <span>Về Cổng Trường (Lùi)</span>
          </button>
          <button id="btn-sv-step-forward" style="background: linear-gradient(135deg, #16a34a, #15803d); border: 2px solid #86efac; color: #fff; padding: 12px 26px; border-radius: 999px; font-weight: 900; font-size: 0.95rem; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,0.5), 0 0 16px rgba(34,197,94,0.4); display: flex; align-items: center; gap: 8px;">
            <span>Tiến Về Cây Cảnh Vũ Dậu</span>
            <span style="font-size: 1.2rem;">⬆</span>
          </button>
        </div>

        <!-- THANH CUỘN 41 ĐIỂM ẢNH NHANH (CAROUSEL DRAWER DƯỚI ĐÁY) -->
        <div id="sv-bottom-carousel-container" style="position: absolute; bottom: 0; left: 0; right: 0; z-index: 10; background: linear-gradient(to top, rgba(15,23,42,0.98), rgba(15,23,42,0.85) 75%, transparent); padding: 12px 18px 10px; border-top: 1.5px solid rgba(255,255,255,0.15); pointer-events: auto;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 0.82rem; font-weight: 900; color: #facc15; text-transform: uppercase; letter-spacing: 0.5px;">
                🗺️ Toàn bộ 41 Điểm Ảnh Street View (1.19 km)
              </span>
              <span id="sv-distance-progress" style="font-size: 0.78rem; color: #94a3b8; font-weight: 700;">
                Còn 1.19 km đến đích
              </span>
            </div>
            <!-- Quick teleport presets -->
            <div style="display: flex; gap: 6px;">
              <button class="sv-preset-btn" data-panoid="41" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px; cursor: pointer;">🏫 TH Ngô Quyền</button>
              <button class="sv-preset-btn" data-panoid="27" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px; cursor: pointer;">🏪 Đ. Ngô Quyền</button>
              <button class="sv-preset-btn" data-panoid="22" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px; cursor: pointer;">🔄 Bùng Binh Kim Ngọc</button>
              <button class="sv-preset-btn" data-panoid="14" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px; cursor: pointer;">🛣️ ĐL Hùng Vương</button>
              <button class="sv-preset-btn" data-panoid="1" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px; cursor: pointer;">📍 Cây Cảnh Vũ Dậu</button>
            </div>
          </div>

          <!-- Thumbnails Row -->
          <div id="sv-thumbnails-strip" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scroll-behavior: smooth;">
            <!-- Rendered by JS -->
          </div>
        </div>
      `;
      document.body.appendChild(el);
    }
    this.container = el;
    this.canvas = document.getElementById('streetview-360-canvas');
  }

  // ------------------------------------------------------------
  // 2. KHỞI TẠO THREE.JS SPHERE CHO CHẾ ĐỘ PHOTO SPHERE 360°
  // ------------------------------------------------------------
  initThree() {
    if (!this.canvas) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(this.fov, window.innerWidth / window.innerHeight, 1, 1100);
    this.camera.target = new THREE.Vector3(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Bầu cầu 360° khổng lồ (Equirectangular Sphere)
    // Radius 500, scale x = -1 để nhìn từ tâm quả cầu ra mặt trong
    const geometry = new THREE.SphereGeometry(500, 64, 40);
    geometry.scale(-1, 1, 1);

    // Material ban đầu màu đen tuyền chờ nạp ảnh
    const material = new THREE.MeshBasicMaterial({
      color: 0x111111,
      side: THREE.FrontSide
    });

    this.sphereMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphereMesh);

    this.renderThumbnailsStrip();
  }

  // ------------------------------------------------------------
  // 3. RENDER DANH SÁCH ẢNH THU NHỎ DƯỚI ĐÁY MÀN HÌNH
  // ------------------------------------------------------------
  renderThumbnailsStrip() {
    const strip = document.getElementById('sv-thumbnails-strip');
    if (!strip) return;
    strip.innerHTML = '';

    this.panos.forEach((p, idx) => {
      const card = document.createElement('div');
      card.id = `sv-thumb-card-${p.id}`;
      card.style.cssText = `
        flex-shrink: 0;
        width: 104px;
        background: rgba(30, 41, 59, 0.85);
        border: 2px solid ${idx === this.currentPanoIndex ? '#facc15' : 'rgba(255,255,255,0.18)'};
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.15s, border-color 0.15s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      `;
      card.innerHTML = `
        <div style="position: relative; width: 104px; height: 52px; background: #0f172a; overflow: hidden;">
          <img src="${p.preview}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'">
          <div style="position: absolute; bottom: 2px; right: 4px; background: rgba(0,0,0,0.7); color: #fff; font-size: 0.65rem; font-weight: 900; padding: 1px 4px; border-radius: 4px;">#${p.id}</div>
        </div>
        <div style="padding: 4px 6px;">
          <div style="font-size: 0.68rem; font-weight: 800; color: #f8fafc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${p.title.split('-')[0].replace('Cổng ', '').replace('ĐÍCH ĐẾN: ', '')}
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        this.navigateToPanoIndex(idx);
      });
      strip.appendChild(card);
    });
  }

  // ------------------------------------------------------------
  // 4. MỞ STREET VIEW 360° TẠI MỘT ĐIỂM CỤ THỂ HOẶC TỌA ĐỘ 3D
  // ------------------------------------------------------------
  open(panoIdOrIndex = 0) {
    let targetIndex = 0;
    if (typeof panoIdOrIndex === 'number') {
      if (panoIdOrIndex >= 0 && panoIdOrIndex < this.panos.length) {
        targetIndex = panoIdOrIndex;
      } else {
        // Tìm theo id (ví dụ id 41)
        const found = this.panos.findIndex(p => p.id === panoIdOrIndex);
        if (found !== -1) targetIndex = found;
      }
    }

    this.isOpen = true;
    if (this.container) {
      this.container.style.display = 'block';
    }

    this.handleResize();
    this.navigateToPanoIndex(targetIndex);

    // Bắt đầu vòng lặp render
    if (!this.animationFrameId) {
      this.animate();
    }

    // Tự động ẩn Toast hướng dẫn sau 4.5 giây
    const guide = document.getElementById('sv-guide-toast');
    if (guide) {
      guide.style.opacity = '1';
      setTimeout(() => {
        if (guide) guide.style.opacity = '0';
      }, 4500);
    }
  }

  close() {
    this.isOpen = false;
    if (this.container) {
      this.container.style.display = 'none';
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // ------------------------------------------------------------
  // 5. CHUYỂN ĐỔI SANG ĐIỂM ẢNH MỚI & NẠP TEXTURE
  // ------------------------------------------------------------
  navigateToPanoIndex(idx) {
    if (idx < 0 || idx >= this.panos.length) return;
    this.currentPanoIndex = idx;
    const pano = this.panos[idx];
    if (!pano) return;

    // Cập nhật thông tin UI
    const titleEl = document.getElementById('sv-title');
    const descEl = document.getElementById('sv-desc');
    const dateEl = document.getElementById('sv-date-badge');
    const indexEl = document.getElementById('sv-index-badge');
    const gpsEl = document.getElementById('sv-gps');
    const roadEl = document.getElementById('sv-road');
    const linkEl = document.getElementById('sv-gmaps-link');
    const distEl = document.getElementById('sv-distance-progress');

    if (titleEl) titleEl.textContent = pano.title;
    if (descEl) descEl.textContent = pano.desc;
    if (dateEl) dateEl.textContent = `T${pano.date.replace('-', '/')}`;
    if (indexEl) indexEl.textContent = `Điểm #${pano.id} (41 ảnh)`;
    if (gpsEl) gpsEl.textContent = `📍 ${pano.lat.toFixed(6)}, ${pano.lng.toFixed(6)}`;
    if (roadEl) roadEl.textContent = pano.road;
    if (linkEl) linkEl.href = pano.gmapsUrl;

    // Tính khoảng cách còn lại đến đích Nhà Vườn Vũ Dậu (id=1)
    const distRemaining = ((pano.id - 1) / 40 * 1.19).toFixed(2);
    if (distEl) {
      distEl.textContent = pano.id === 1 ? '🎉 ĐÃ ĐẾN ĐÍCH!' : `Còn ${distRemaining} km đến đích`;
    }

    // Cập nhật trạng thái nút tiến / lùi
    const btnBack = document.getElementById('btn-sv-step-back');
    const btnFwd = document.getElementById('btn-sv-step-forward');
    if (btnBack) {
      btnBack.style.opacity = pano.prevId ? '1' : '0.4';
      btnBack.style.pointerEvents = pano.prevId ? 'auto' : 'none';
      btnBack.title = pano.prevId ? `Lùi về điểm #${pano.prevId}` : 'Đã ở cổng trường';
    }
    if (btnFwd) {
      btnFwd.style.opacity = pano.nextId ? '1' : '0.4';
      btnFwd.style.pointerEvents = pano.nextId ? 'auto' : 'none';
      btnFwd.title = pano.nextId ? `Tiến tới điểm #${pano.nextId}` : 'Đã đến đích Vũ Dậu';
    }

    // Cuộn carousel dưới đáy tới vị trí thumbnail đang chọn
    document.querySelectorAll('[id^="sv-thumb-card-"]').forEach(c => {
      c.style.borderColor = 'rgba(255,255,255,0.18)';
    });
    const activeCard = document.getElementById(`sv-thumb-card-${pano.id}`);
    if (activeCard) {
      activeCard.style.borderColor = '#facc15';
      activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    // Nạp Texture ảnh 360° Panorama
    this.loadPanoTexture(pano);
  }

  loadPanoTexture(pano) {
    if (!this.sphereMesh) return;

    // Chọn URL ảnh theo chất lượng đã chọn
    let textureUrl = pano.image2k;
    if (this.qualityMode === 'preview') {
      textureUrl = pano.preview;
    } else if (this.qualityMode === 'hd') {
      textureUrl = pano.imageHd;
    }

    // Nếu ảnh 2K chưa nạp xong, nạp ngay ảnh preview (10ms) để không bị màn hình đen!
    if (!this.loadedTextures[textureUrl]) {
      // Nạp ảnh xem trước siêu tốc
      this.textureLoader.load(pano.preview, (previewTex) => {
        previewTex.mapping = THREE.EquirectangularReflectionMapping;
        // Chỉ áp dụng preview nếu chưa có texture chất lượng cao hơn
        if (!this.loadedTextures[textureUrl]) {
          this.sphereMesh.material.map = previewTex;
          this.sphereMesh.material.needsUpdate = true;
        }
      });
    }

    // Nạp ảnh chất lượng chuẩn (2K hoặc HD)
    this.textureLoader.load(
      textureUrl,
      (tex) => {
        tex.mapping = THREE.EquirectangularReflectionMapping;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        this.loadedTextures[textureUrl] = tex;

        this.sphereMesh.material.map = tex;
        this.sphereMesh.material.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.warn("⚠️ Lỗi nạp 2K texture, dùng preview:", err);
        this.textureLoader.load(pano.preview, (fallbackTex) => {
          this.sphereMesh.material.map = fallbackTex;
          this.sphereMesh.material.needsUpdate = true;
        });
      }
    );
  }

  // Bước tiếp về phía Nhà Vườn Vũ Dậu (id giảm dần: 41 -> 1)
  stepForward() {
    const curPano = this.panos[this.currentPanoIndex];
    if (curPano && curPano.nextId !== null) {
      const nextIdx = this.panos.findIndex(p => p.id === curPano.nextId);
      if (nextIdx !== -1) {
        this.zoomStepTransition(() => {
          this.navigateToPanoIndex(nextIdx);
        });
      }
    }
  }

  // Bước lùi về phía Trường Tiểu Học Ngô Quyền (id tăng dần: 1 -> 41)
  stepBackward() {
    const curPano = this.panos[this.currentPanoIndex];
    if (curPano && curPano.prevId !== null) {
      const prevIdx = this.panos.findIndex(p => p.id === curPano.prevId);
      if (prevIdx !== -1) {
        this.zoomStepTransition(() => {
          this.navigateToPanoIndex(prevIdx);
        });
      }
    }
  }

  // Hoạt họa chuyển tiếp lướt camera khi bước đi như Google Maps
  zoomStepTransition(callback) {
    const origFov = this.targetFov;
    this.targetFov = Math.max(45, origFov - 18);
    setTimeout(() => {
      if (callback) callback();
      setTimeout(() => {
        this.targetFov = origFov;
      }, 80);
    }, 150);
  }

  // ------------------------------------------------------------
  // 6. SỰ KIỆN TƯƠNG TÁC CHUỘT, CẢM ỨNG & PHÍM TẮT
  // ------------------------------------------------------------
  setupEventListeners() {
    if (!this.canvas) return;

    // Chuột xuống
    this.canvas.addEventListener('pointerdown', (e) => {
      this.isUserInteracting = true;
      this.canvas.style.cursor = 'grabbing';
      this.onPointerDownPointerX = e.clientX;
      this.onPointerDownPointerY = e.clientY;
      this.onPointerDownLon = this.targetLon;
      this.onPointerDownLat = this.targetLat;
    });

    // Chuột di chuyển
    window.addEventListener('pointermove', (e) => {
      if (this.isUserInteracting) {
        this.targetLon = (this.onPointerDownPointerX - e.clientX) * 0.18 + this.onPointerDownLon;
        this.targetLat = (e.clientY - this.onPointerDownPointerY) * 0.18 + this.onPointerDownLat;
      }
    });

    // Chuột nhả
    window.addEventListener('pointerup', () => {
      this.isUserInteracting = false;
      if (this.canvas) this.canvas.style.cursor = 'grab';
    });

    // Cuộn chuột thu phóng FOV
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.targetFov += e.deltaY * 0.05;
      this.targetFov = Math.max(35, Math.min(95, this.targetFov));
    }, { passive: false });

    // [MOBILE-FIX] Pinch 2 ngon tay de phong to / thu nho (thay con lan chuot)
    const svPointers = new Map();
    let svPinchDist = null;
    this.canvas.addEventListener('pointerdown', (e) => {
      svPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (svPointers.size === 2) {
        const pts = [...svPointers.values()];
        svPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        this.isUserInteracting = false;
      }
    });
    window.addEventListener('pointermove', (e) => {
      if (!svPointers.has(e.pointerId)) return;
      svPointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (svPointers.size === 2 && svPinchDist) {
        const pts = [...svPointers.values()];
        const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        this.targetFov += (svPinchDist - d) * 0.08;
        this.targetFov = Math.max(35, Math.min(95, this.targetFov));
        svPinchDist = d;
      }
    });
    const svClearPointer = (e) => {
      svPointers.delete(e.pointerId);
      if (svPointers.size < 2) svPinchDist = null;
    };
    window.addEventListener('pointerup', svClearPointer);
    window.addEventListener('pointercancel', svClearPointer);

    // Phím tắt bàn phím
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;

      if (e.key === 'Escape' || e.key === 'v' || e.key === 'V') {
        this.close();
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        this.stepForward();
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        this.stepBackward();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.targetLon -= 8;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.targetLon += 8;
      }
    });

    // Nút giao diện UI
    const btnClose = document.getElementById('btn-sv-close');
    if (btnClose) btnClose.addEventListener('click', () => this.close());

    const btnFwd = document.getElementById('btn-sv-step-forward');
    if (btnFwd) btnFwd.addEventListener('click', () => this.stepForward());

    const btnBack = document.getElementById('btn-sv-step-back');
    if (btnBack) btnBack.addEventListener('click', () => this.stepBackward());

    // Nút Lái xe 3D tại tọa độ ảnh này
    const btnEnter3D = document.getElementById('btn-sv-enter-3d');
    if (btnEnter3D) {
      btnEnter3D.addEventListener('click', () => {
        const p = this.panos[this.currentPanoIndex];
        this.close();
        if (typeof window.enterViceCityMode === 'function') {
          window.enterViceCityMode(0);
          if (p && p.worldPos && window.CityCommuteInstance) {
            setTimeout(() => {
              window.CityCommuteInstance.bikeMesh.position.set(p.worldPos.x, 0.16, p.worldPos.z);
              if (window.CityCommuteInstance.arena && window.CityCommuteInstance.arena.studentMesh) {
                window.CityCommuteInstance.arena.studentMesh.position.set(p.worldPos.x, 0.16, p.worldPos.z);
              }
            }, 100);
          }
        }
      });
    }

    // Nút chuyển chất lượng
    const btnQuality = document.getElementById('btn-sv-quality');
    const qText = document.getElementById('sv-quality-text');
    if (btnQuality) {
      btnQuality.addEventListener('click', () => {
        if (this.qualityMode === '2k') {
          this.qualityMode = 'hd';
          if (qText) qText.textContent = 'Chất lượng: 16K Siêu Nét';
        } else if (this.qualityMode === 'hd') {
          this.qualityMode = 'preview';
          if (qText) qText.textContent = 'Chất lượng: Xem Nhanh';
        } else {
          this.qualityMode = '2k';
          if (qText) qText.textContent = 'Chất lượng: 2K Chuẩn';
        }
        const p = this.panos[this.currentPanoIndex];
        if (p) this.loadPanoTexture(p);
      });
    }

    // Các nút preset nhảy nhanh
    document.querySelectorAll('.sv-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = parseInt(btn.getAttribute('data-panoid'), 10);
        const idx = this.panos.findIndex(p => p.id === pid);
        if (idx !== -1) this.navigateToPanoIndex(idx);
      });
    });

    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    if (!this.renderer || !this.camera) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // ------------------------------------------------------------
  // 7. VÒNG LẶP RENDER MƯỢT MÀ VỚI QUÁN TÍNH DAMPING
  // ------------------------------------------------------------
  animate() {
    if (!this.isOpen) return;
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Giới hạn góc ngước lên / nhìn xuống (Pitch)
    this.targetLat = Math.max(-85, Math.min(85, this.targetLat));

    // Làm mượt chuyển động (Damping)
    this.lat += (this.targetLat - this.lat) * 0.12;
    this.lon += (this.targetLon - this.lon) * 0.12;
    this.fov += (this.targetFov - this.fov) * 0.15;

    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();

    // Chuyển đổi tọa độ Cầu Spherical -> Cartesian Coordinates
    const phi = THREE.MathUtils.degToRad(90 - this.lat);
    const theta = THREE.MathUtils.degToRad(this.lon);

    const targetX = 500 * Math.sin(phi) * Math.cos(theta);
    const targetY = 500 * Math.cos(phi);
    const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

    this.camera.lookAt(targetX, targetY, targetZ);
    this.renderer.render(this.scene, this.camera);
  }
}

// Khởi tạo Global Instance
window.StreetView360Instance = null;

function initStreetView360() {
  if (!window.StreetView360Instance && typeof THREE !== 'undefined') {
    window.StreetView360Instance = new StreetView360Viewer();
    console.log("✅ StreetView 360° Engine đã sẵn sàng với 41 ảnh thực tế!");
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStreetView360);
} else {
  initStreetView360();
}

// Cung cấp API toàn cục mở nhanh
window.openStreetView360 = function (panoIdOrIdx = 41) {
  if (window.StreetView360Instance) {
    window.StreetView360Instance.open(panoIdOrIdx);
  } else {
    initStreetView360();
    setTimeout(() => {
      if (window.StreetView360Instance) window.StreetView360Instance.open(panoIdOrIdx);
    }, 100);
  }
};
