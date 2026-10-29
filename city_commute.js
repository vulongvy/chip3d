// ============================================================
// CITY COMMUTE SIMULATION - GTA VICE CITY VĨNH YÊN OPEN WORLD
// Tuyến đường thực tế 1.19 km từ Nhà (Cây cảnh Vũ Dậu) đến Trường Tiểu học Ngô Quyền
// Tự do lái xe Honda Vision đỏ mận khắp bản đồ, Ba chở Bé Hà My, Camera GTA, Âm thanh & HUD
// ============================================================

(function () {
  'use strict';

  // 42 TỌA ĐỘ GPS THỰC TẾ (TỪ TRƯỜNG TIỂU HỌC NGÔ QUYỀN -> PHỐ TRẦN QUỐC TUẤN -> ĐẠI LỘ HÙNG VƯƠNG -> NHÀ VƯỜN CÂY CẢNH VŨ DẬU)
  const GPS_ROUTE_DATA = [
    { i: 0, x: 3.2, z: 62.85, dist: 0.0, street: 'Cổng Trường Tiểu Học Ngô Quyền (141 Trần Quốc Tuấn)' },
    { i: 1, x: -20.0, z: 62.85, dist: 23.2, street: 'Phố Trần Quốc Tuấn (141 Trần Quốc Tuấn)' },
    { i: 2, x: -50.0, z: 62.85, dist: 53.2, street: 'Đường Trần Quốc Tuấn' },
    { i: 3, x: -80.0, z: 62.85, dist: 83.2, street: 'Đường Trần Quốc Tuấn (Hàng Cây Xanh)' },
    { i: 4, x: -110.0, z: 61.5, dist: 113.2, street: 'Đường Trần Quốc Tuấn (Gần Ngã Ba)' },
    { i: 5, x: -130.4, z: 54.0, dist: 134.0, street: 'Ngã Ba Trần Quốc Tuấn - Ngô Quyền' },
    { i: 6, x: -155.0, z: 25.0, dist: 172.0, street: 'Đường Ngô Quyền (Số 24 Ngô Quyền)' },
    { i: 7, x: -185.0, z: -15.0, dist: 222.0, street: 'Đường Ngô Quyền (Ngã Ba Phố Lê Xoay - Tiệm Huyền Hậu)' },
    { i: 8, x: -220.0, z: -62.0, dist: 280.0, street: 'Đường Ngô Quyền' },
    { i: 9, x: -255.0, z: -110.0, dist: 339.0, street: 'Đường Ngô Quyền' },
    { i: 10, x: -288.0, z: -155.0, dist: 395.0, street: 'Đường Ngô Quyền' },
    { i: 11, x: -314.0, z: -192.0, dist: 442.0, street: 'Đường Ngô Quyền (Tiếp Cận Vòng Xuyến)' },
    { i: 12, x: -322.0, z: -206.0, dist: 458.0, street: 'Lối Vào Bùng Binh Ngô Quyền' },
    { i: 13, x: -336.0, z: -212.0, dist: 476.0, street: 'Vòng Xuyến Bùng Binh Ngô Quyền' },
    { i: 14, x: -344.0, z: -228.0, dist: 494.0, street: 'Vòng Xuyến Bùng Binh Ngô Quyền' },
    { i: 15, x: -346.0, z: -248.0, dist: 514.0, street: 'Lối Ra Đại Lộ Hùng Vương' },
    { i: 16, x: -345.9, z: -251.2, dist: 517.5, street: 'Đại Lộ Hùng Vương' },
    { i: 17, x: -384.8, z: -250.9, dist: 556.4, street: 'Đại Lộ Hùng Vương' },
    { i: 18, x: -390.6, z: -250.6, dist: 562.2, street: 'Đại Lộ Hùng Vương' },
    { i: 19, x: -429.5, z: -248.3, dist: 601.2, street: 'Đại Lộ Hùng Vương' },
    { i: 20, x: -440.7, z: -247.2, dist: 612.4, street: 'Đại Lộ Hùng Vương' },
    { i: 21, x: -446.5, z: -246.7, dist: 618.3, street: 'Đại Lộ Hùng Vương' },
    { i: 22, x: -471.2, z: -245.8, dist: 643.0, street: 'Đại Lộ Hùng Vương' },
    { i: 23, x: -509.3, z: -244.6, dist: 681.1, street: 'Đại Lộ Hùng Vương' },
    { i: 24, x: -547.4, z: -243.7, dist: 719.2, street: 'Đại Lộ Hùng Vương' },
    { i: 25, x: -552.1, z: -243.6, dist: 723.9, street: 'Đại Lộ Hùng Vương' },
    { i: 26, x: -590.2, z: -244.1, dist: 762.0, street: 'Đại Lộ Hùng Vương' },
    { i: 27, x: -629.4, z: -244.7, dist: 801.2, street: 'Đại Lộ Hùng Vương' },
    { i: 28, x: -634.3, z: -244.7, dist: 806.1, street: 'Đại Lộ Hùng Vương' },
    { i: 29, x: -665.1, z: -245.9, dist: 836.9, street: 'Đại Lộ Hùng Vương' },
    { i: 30, x: -709.6, z: -247.9, dist: 881.5, street: 'Đại Lộ Hùng Vương' },
    { i: 31, x: -744.1, z: -248.8, dist: 916.0, street: 'Đại Lộ Hùng Vương' },
    { i: 32, x: -751.2, z: -250.1, dist: 923.3, street: 'Đại Lộ Hùng Vương' },
    { i: 33, x: -760.5, z: -250.7, dist: 932.6, street: 'Đại Lộ Hùng Vương' },
    { i: 34, x: -842.8, z: -274.4, dist: 1018.0, street: 'Ngã Ba Lê Lợi - Hùng Vương' },
    { i: 35, x: -828.1, z: -300.4, dist: 1047.8, street: 'Đường Lê Lợi' },
    { i: 36, x: -841.4, z: -310.3, dist: 1064.3, street: 'Đường Lê Lợi' },
    { i: 37, x: -861.2, z: -306.6, dist: 1084.5, street: 'Lối Rẽ Phố Lê Lợi' },
    { i: 38, x: -871.0, z: -305.6, dist: 1094.4, street: 'Ngõ Dân Sinh Ra Nhà Bé' },
    { i: 39, x: -894.8, z: -301.3, dist: 1118.6, street: 'Ngõ Dân Sinh Ra Nhà Bé' },
    { i: 40, x: -907.0, z: -309.9, dist: 1133.5, street: 'Ngõ Dân Sinh Ra Nhà Bé' },
    { i: 41, x: -930.9, z: -319.4, dist: 1191.1, street: 'Vườn Cây Cảnh Vũ Dậu (Nhà Bé Hà My)' }
  ];

  class CityCommuteManager {
    constructor(arena) {
      this.routePoints = GPS_ROUTE_DATA;
      this.totalDistance = GPS_ROUTE_DATA[GPS_ROUTE_DATA.length - 1].dist;

      // Spline đường 3D
      const vectors = this.routePoints.map(p => new THREE.Vector3(p.x, 0.08, p.z));
      this.routeCurve = new THREE.CatmullRomCurve3(vectors, false, 'catmullrom', 0.2);

      // Trạng thái vận hành
      this.isCityMode = false;
      this.isMounted = false;
      this.isAutoPilot = false;
      this.autoProgress = 0.0;
      this.autoSpeed = 0.00045;
      this.autoDirection = 1;

      // Vật lý lái xe máy phong cách GTA Arcade
      this.bikeSpeed = 0;           // km/h
      this.bikeMaxSpeed = 65;       // km/h
      this.bikeAccel = 0.65;
      this.bikeBrake = 1.1;
      this.bikeFriction = 0.25;
      this.bikeTilt = 0;
      this.bikeHeading = Math.PI / 2;

      // Camera GTA & Street View
      this.cameraMode = 0;          // 0 = Chase, 1 = Far, 2 = Cockpit
      this.cameraYawOffset = 0;
      this.cameraPitchOffset = 0.12;
      this.cameraDistOffset = 0;

      // Trạng thái Đi bộ & Nhảy tự do Bé Hà My (Ngăn ngừa triệt để lỗi NaN)
      this.walkAnimTime = 0;
      this.isWalkingJumping = false;
      this.walkJumpVy = 0;
      this.walkBaseY = 0.16;

      // Web Audio Engine
      this.audioCtx = null;
      this.engineOsc = null;
      this.engineFilter = null;
      this.isAudioReady = false;

      // Bàn phím điều khiển độc lập cho City Mode (WASD, Mũi tên, Shift chạy nhanh)
      this.cityKeys = {
        forward: false,
        backward: false,
        left: false,
        right: false,
        shift: false
      };
      this.trafficLightSignals = [];
      this.trafficLightTimer = 0;

      // Cấu hình Bản đồ Google Maps & Radar Minimap
      this.radarNorthUp = true;        // Mặc định Cố định hướng Bắc chuẩn Google Maps (Khớp 100% ảnh người dùng)
      this.radarZoomMode = 'overview'; // Mặc định Toàn cảnh bao quát tuyến đường
      this.isGoogleMapsOpen = false;
      this.gmapsZoom = 1.0;
      this.gmapsPanX = 0;
      this.gmapsPanY = 0;
      this.gmapsLayer = 'map';

      // Nhóm đối tượng 3D Thành phố (Mặc định ẩn 100% khi đang ở trường học để bóc tách triệt để)
      this.cityGroup = new THREE.Group();
      this.cityGroup.visible = false;
      this._originalCanvasParent = null;

      // Ánh sáng chiếu rọi thành phố 1.19 km tương phản cao chuẩn Game 3D (Độ sáng cân bằng, không lóa trắng)
      this.cityAmbientLight = new THREE.AmbientLight(0x7dd3fc, 0.35); // Ánh sáng môi trường xanh trời dịu mát, giữ bóng đổ đậm nét
      this.cityGroup.add(this.cityAmbientLight);

      this.citySunLight = new THREE.DirectionalLight(0xfff7ed, 1.15); // Ánh nắng vàng ấm áp góc xiên, tạo bóng đổ sâu thẳm
      this.citySunLight.position.set(120, 220, 100);
      this.citySunLight.castShadow = true;
      this.cityGroup.add(this.citySunLight);

      // 1. Dựng nền đất thành phố mở rộng rộng lớn
      this.buildCityTerrain();

      // 2. Dựng mặt đường nhựa 3D, dải phân cách và vỉa hè
      this.buildCityRoads();

      // 3. Dựng các khu vực đặc trưng chuẩn 1:1 GPS Route
      this.buildRoundaboutZone();
      this.buildHungVuongAvenueAndMedian();
      this.buildTrafficLightSystem();
      this.buildHomeVuDauGarden();
      this.buildUrbanShophouses();
      this.buildStreetFloraAndLights();

      // 3.4. Dựng Hồ Trại Ổi, Hồ Tỉnh Uỷ, Vườn Hoa UB Thành Phố & Đại Lộ Kim Ngọc chuẩn Google Maps
      this.buildLakesAndParksGoogleMaps();

      // 3.5. Dựng Tuyến Phố 141 Trần Quốc Tuấn trước cổng trường theo đúng Google Street View
      this.buildTranQuocTuanStreetViewDetail();

      // 3.5b. Dựng Đoạn Phố Ngô Quyền & Ngã Ba Lê Xoay chuẩn 100% Google Street View
      this.buildNgoQuyenStreetViewDetail();

      // 3.6. Dựng Ngõ 141 Trần Quốc Tuấn & Ngõ Ven Hồ Đầm Vạc Chibi Realism
      this.buildCityAlleys();

      // 3.7. Dựng Quán Phở Bò Bốc Khói, Quán Trà Đá, Xe Kem Merino, Tiệm Sửa Xe Chibi
      this.buildStreetFoodAndShops();

      // 3.8. Dựng Cư Dân & NPC Chibi Đời Sống Việt Nam (18+ Nhân Vật Hoạt Họa)
      this.buildPedestriansAndNPCs();

      // 3.9. Dựng Phương Tiện Giao Thông AI Chibi (Wave, Lead, Taxi, Sedan)
      this.buildTrafficVehicles();

      // 4. Dựng Xe Máy Honda Vision Đỏ Mận & Ba chở Bé Hà My (Đỗ ngay cổng trường phố Trần Quốc Tuấn)
      this.buildHondaVisionBike();
      if (this.bikeMesh) this.bikeMesh.visible = true;

      // 5. Giao diện HUD GTA Vice City & Radar Minimap Chibi
      this.buildSpeedometerHUD();
      this.buildViceCityRadarMinimap();
      this.setupGlobalButtons();
      this.setupInteractionListeners();
      this.setupMouseOrbitControls();
      this.setupFullscreenGoogleMaps();

      // 6. Kết nối Three Arena
      this.bindArena(arena);

      // 7. Hook vào Game Loop
      this.update = this.update.bind(this);

      // Window resize handler
      window.addEventListener('resize', () => {
        if (this.isCityMode && this.renderer && this.camera) {
          this.renderer.setSize(window.innerWidth, window.innerHeight);
          this.camera.aspect = window.innerWidth / window.innerHeight;
          this.camera.updateProjectionMatrix();
        }
      });

      console.log('✅ [CityCommute] Thế giới mở 141 Trần Quốc Tuấn & Honda Vision Đỏ Mận đã sẵn sàng!');
    }

    bindArena(arena) {
      if (!arena) return;
      this.arena = arena;
      this.scene = arena.scene;
      this.camera = arena.camera;
      this.renderer = arena.renderer;

      // Đảm bảo cityGroup và bikeMesh nằm trong scene hiện tại của arena
      if (this.cityGroup && !this.scene.children.includes(this.cityGroup)) {
        this.scene.add(this.cityGroup);
      }
      if (this.bikeMesh && !this.scene.children.includes(this.bikeMesh)) {
        this.scene.add(this.bikeMesh);
      }

      this.cityGroup.visible = this.isCityMode;
      if (this.bikeMesh) this.bikeMesh.visible = this.isCityMode;

      this._hookIntoArenaLoop();
    }

    // ------------------------------------------------------------
    // 1. SÀN THÀNH PHỐ MỞ RỘNG KHỔNG LỒ (1500m x 900m)
    // ------------------------------------------------------------
    buildCityTerrain() {
      const groundGeo = new THREE.PlaneGeometry(1500, 900);
      const groundCanvas = document.createElement('canvas');
      groundCanvas.width = 512;
      groundCanvas.height = 512;
      const gctx = groundCanvas.getContext('2d');

      const grad = gctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, '#15803d');
      grad.addColorStop(0.5, '#16a34a');
      grad.addColorStop(1, '#15803d');
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 400; i++) {
        gctx.fillStyle = i % 2 === 0 ? '#22c55e' : '#14532d';
        gctx.globalAlpha = 0.2;
        gctx.beginPath();
        gctx.arc(Math.random() * 512, Math.random() * 512, 3 + Math.random() * 8, 0, Math.PI * 2);
        gctx.fill();
      }
      gctx.globalAlpha = 1.0;

      const groundTex = new THREE.CanvasTexture(groundCanvas);
      groundTex.wrapS = THREE.RepeatWrapping;
      groundTex.wrapT = THREE.RepeatWrapping;
      groundTex.repeat.set(60, 36);

      const groundMat = new THREE.MeshStandardMaterial({
        map: groundTex,
        roughness: 0.85,
        side: THREE.DoubleSide
      });

      const terrainMesh = new THREE.Mesh(groundGeo, groundMat);
      terrainMesh.rotation.x = -Math.PI / 2;
      terrainMesh.position.set(-450, -0.04, -150);
      terrainMesh.receiveShadow = true;
      this.cityGroup.add(terrainMesh);
    }

    // ============================================================
    // HỆ THỐNG VẼ LẠI GIAO DIỆN ANIME GHIBLI 1:1 THEO THỰC TẾ VĨNH YÊN
    // Tự động tạo Canvas Texture chuẩn phong cách Anime/Ghibli/Chibi cho toàn bộ công trình
    // ============================================================
    createAnimeTexture(filename, repeatX = 1, repeatY = 1) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 768;
      const ctx = canvas.getContext('2d');
      // Canvas chuẩn vẽ xuôi từ trái sang phải phong cách Anime Ghibli sắc nét
      const drawBox = (x, y, w, h, fill, stroke = '#1e293b', lw = 3, r = 0) => {
        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lw;
        ctx.beginPath();
        if (r > 0 && typeof ctx.roundRect === 'function') ctx.roundRect(x, y, w, h, r);
        else ctx.rect(x, y, w, h);
        ctx.fill();
        if (lw > 0) ctx.stroke();
      };

      const drawAnimeWindow = (x, y, w, h, frameColor = '#334155', hasCurtain = true, curtainColor = '#f472b6') => {
        drawBox(x, y, w, h, '#93c5fd', frameColor, 4, 6);
        if (hasCurtain) {
          ctx.fillStyle = curtainColor;
          ctx.beginPath();
          ctx.moveTo(x + 4, y + 4);
          ctx.quadraticCurveTo(x + w * 0.35, y + h * 0.4, x + 4, y + h * 0.75);
          ctx.lineTo(x + 4, y + 4);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(x + w - 4, y + 4);
          ctx.quadraticCurveTo(x + w * 0.65, y + h * 0.4, x + w - 4, y + h * 0.75);
          ctx.lineTo(x + w - 4, y + 4);
          ctx.fill();
        }
        // Cel-shading vệt sáng anime
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + 2, y + 2, w - 4, h - 4);
        ctx.clip();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.beginPath();
        ctx.moveTo(x, y + h * 0.55);
        ctx.lineTo(x + w * 0.55, y);
        ctx.lineTo(x + w * 0.75, y);
        ctx.lineTo(x, y + h * 0.85);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        // Khung chữ thập
        ctx.strokeStyle = frameColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h);
        ctx.moveTo(x, y + h / 2); ctx.lineTo(x + w, y + h / 2);
        ctx.stroke();
      };

      const drawSignBanner = (title, subtitle, bgCol = '#991b1b', textCol = '#fef08a', borderCol = '#fbbf24', icon = '') => {
        const by = 430;
        const bh = 150;
        drawBox(16, by, 480, bh, bgCol, borderCol, 6, 12);

        // Khung viền kép & họa tiết góc
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 3;
        ctx.strokeRect(24, by + 8, 464, bh - 16);

        const drawCornerBracket = (cx, cy, dx, dy) => {
          ctx.strokeStyle = borderCol;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(cx, cy + dy * 14);
          ctx.lineTo(cx, cy);
          ctx.lineTo(cx + dx * 14, cy);
          ctx.stroke();
        };
        drawCornerBracket(28, by + 12, 1, 1);
        drawCornerBracket(484, by + 12, -1, 1);
        drawCornerBracket(28, by + bh - 12, 1, -1);
        drawCornerBracket(484, by + bh - 12, -1, -1);

        // Chữ thương hiệu chính - Đậm nét, đổ bóng kép
        ctx.textAlign = 'center';
        ctx.font = '900 33px "Nunito", Arial, sans-serif';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillText((icon ? icon + ' ' : '') + title, 258, by + 60);
        ctx.fillStyle = textCol;
        ctx.fillText((icon ? icon + ' ' : '') + title, 256, by + 58);

        // Dòng phụ đề danh mục / địa chỉ
        ctx.font = '800 19px "Nunito", Arial, sans-serif';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillText(subtitle, 257, by + 109);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(subtitle, 256, by + 107);
      };

      const fn = (filename || '').toLowerCase();

      // 1. TRƯỜNG MẦM NON HẠNH PHÚC (Trần Quốc Tuấn đối diện trường Ngô Quyền)
      if (fn.includes('mamnon')) {
        drawBox(0, 0, 512, 768, '#fef9c3', '#ca8a04', 0);
        drawBox(0, 240, 512, 12, '#fde047', '#eab308', 2);
        drawBox(0, 470, 512, 12, '#fde047', '#eab308', 2);
        drawAnimeWindow(50, 40, 180, 150, '#eab308', true, '#f472b6');
        drawAnimeWindow(282, 40, 180, 150, '#eab308', true, '#38bdf8');
        drawAnimeWindow(50, 280, 180, 150, '#eab308', true, '#fbbf24');
        drawAnimeWindow(282, 280, 180, 150, '#eab308', true, '#4ade80');
        drawSignBanner('MẦM NON HẠNH PHÚC', 'NƠI CHẮP CÁNH ƯỚC MƠ TUỔI THƠ 🎈', '#ea580c', '#ffffff', '#fde047', '🌈');
        drawBox(140, 640, 232, 128, '#bae6fd', '#0284c7', 4, 8);
      }
      // 2. NỘI THẤT RÈM CỬA CAO CẤP (Trần Quốc Tuấn)
      else if (fn.includes('noithat') || fn.includes('remcua')) {
        drawBox(0, 0, 512, 768, '#f1f5f9', '#94a3b8', 0);
        drawBox(0, 240, 512, 12, '#cbd5e1', '#64748b', 2);
        drawBox(0, 470, 512, 12, '#cbd5e1', '#64748b', 2);
        drawAnimeWindow(50, 40, 180, 160, '#1e293b', true, '#1d4ed8');
        drawAnimeWindow(282, 40, 180, 160, '#1e293b', true, '#1d4ed8');
        drawAnimeWindow(50, 280, 180, 160, '#1e293b', true, '#d97706');
        drawAnimeWindow(282, 280, 180, 160, '#1e293b', true, '#d97706');
        drawSignBanner('RÈM CỬA & NỘI THẤT', 'RÈM VẢI NHẬP KHẨU • GIẤY DÁN TƯỜNG • THẢM', '#1e3a8a', '#fbbf24', '#f59e0b', '🛋️');
        drawBox(100, 630, 312, 138, '#93c5fd', '#1e293b', 4, 8);
      }
      // 3. QUÁN PHỞ BÒ LÝ GIA TRUYỀN & CHÁO DINH DƯỠNG (Trần Quốc Tuấn)
      else if (fn.includes('pholy') || fn.includes('chao')) {
        drawBox(0, 0, 512, 768, '#fef3c7', '#b45309', 0);
        drawBox(0, 240, 512, 16, '#78350f', '#451a03', 2);
        drawBox(0, 470, 512, 16, '#78350f', '#451a03', 2);
        drawAnimeWindow(50, 40, 180, 150, '#78350f', true, '#fef08a');
        drawAnimeWindow(282, 40, 180, 150, '#78350f', true, '#fef08a');
        drawAnimeWindow(50, 280, 180, 150, '#78350f', true, '#fde047');
        drawAnimeWindow(282, 280, 180, 150, '#78350f', true, '#fde047');
        drawSignBanner('PHỞ BÒ LÝ GIA TRUYỀN', 'CHÁO DINH DƯỠNG • BÒ TÁI LĂN • SỐT VANG', '#991b1b', '#fef08a', '#fbbf24', '🍜');
        drawBox(80, 630, 352, 138, '#fef9c3', '#78350f', 4, 8);
      }
      // 4. TIỆM TẠP HÓA CÔ HẰNG (Trần Quốc Tuấn)
      else if (fn.includes('shop_hang') || fn.includes('tqt_shop')) {
        drawBox(0, 0, 512, 768, '#fdf2f8', '#f472b6', 0);
        drawBox(0, 240, 512, 12, '#fbcfe8', '#ec4899', 2);
        drawBox(0, 470, 512, 12, '#fbcfe8', '#ec4899', 2);
        drawAnimeWindow(50, 40, 180, 150, '#db2777', true, '#f43f5e');
        drawAnimeWindow(282, 40, 180, 150, '#db2777', true, '#38bdf8');
        drawAnimeWindow(50, 280, 180, 150, '#db2777', true, '#fbbf24');
        drawAnimeWindow(282, 280, 180, 150, '#db2777', true, '#a855f7');
        drawSignBanner('TẠP HÓA CÔ HẰNG 5C4', 'KEM MERINO • TRÀ SỮA • BÁNH KẸO • ĐỒ DÙNG', '#be185d', '#fef08a', '#f472b6', '🍭');
        drawBox(80, 630, 352, 138, '#bae6fd', '#db2777', 4, 8);
      }
      // 5. TIỆM ÁO DÀI HOÀNG GIA (Trần Quốc Tuấn)
      else if (fn.includes('ao_dai')) {
        drawBox(0, 0, 512, 768, '#fff1f2', '#f43f5e', 0);
        drawBox(0, 240, 512, 14, '#fecdd3', '#e11d48', 2);
        drawBox(0, 470, 512, 14, '#fecdd3', '#e11d48', 2);
        drawAnimeWindow(50, 40, 180, 160, '#881337', true, '#fb7185');
        drawAnimeWindow(282, 40, 180, 160, '#881337', true, '#38bdf8');
        drawAnimeWindow(50, 280, 180, 160, '#881337', true, '#fde047');
        drawAnimeWindow(282, 280, 180, 160, '#881337', true, '#f43f5e');
        drawSignBanner('ÁO DÀI HOÀNG GIA', 'MAY ĐO THIẾT KẾ ÁO DÀI TRUYỀN THỐNG • DẠ HỘI', '#881337', '#fef08a', '#fbbf24', '🪷');
        drawBox(90, 630, 332, 138, '#ffe4e6', '#881337', 4, 8);
      }
      // 6. TIỆM VÀNG BẠC HOÀNG SƠN (Trần Quốc Tuấn)
      else if (fn.includes('hoangson') || fn.includes('vang_hoangson')) {
        drawBox(0, 0, 512, 768, '#f8fafc', '#d97706', 0);
        drawBox(0, 240, 512, 14, '#fef08a', '#ca8a04', 2);
        drawBox(0, 470, 512, 14, '#fef08a', '#ca8a04', 2);
        drawAnimeWindow(50, 40, 180, 160, '#b45309', true, '#facc15');
        drawAnimeWindow(282, 40, 180, 160, '#b45309', true, '#facc15');
        drawAnimeWindow(50, 280, 180, 160, '#b45309', true, '#facc15');
        drawAnimeWindow(282, 280, 180, 160, '#b45309', true, '#facc15');
        drawSignBanner('VÀNG BẠC HOÀNG SƠN', 'TRANG SỨC KIM CƯƠNG • VÀNG 9999 • BẠC PHONG THỦY', '#18181b', '#facc15', '#eab308', '💎');
        drawBox(90, 630, 332, 138, '#fef9c3', '#18181b', 4, 8);
      }
      // 7. BIỆT THỰ PHÁP CỔ ĐIỂN (Trần Quốc Tuấn & Lê Lợi)
      else if (fn.includes('french') || fn.includes('villa')) {
        drawBox(0, 0, 512, 768, '#fde047', '#ca8a04', 0);
        drawBox(0, 240, 512, 16, '#eab308', '#a16207', 2);
        drawBox(0, 470, 512, 16, '#eab308', '#a16207', 2);
        drawAnimeWindow(50, 40, 180, 160, '#166534', false);
        drawAnimeWindow(282, 40, 180, 160, '#166534', false);
        drawAnimeWindow(50, 280, 180, 160, '#166534', false);
        drawAnimeWindow(282, 280, 180, 160, '#166534', false);
        drawSignBanner('BIỆT THỰ KIẾN TRÚC PHÁP', 'DI SẢN ĐÔ THỊ CỔ VĨNH YÊN • 1930', '#15803d', '#ffffff', '#fde047', '🏛️');
        drawBox(100, 630, 312, 138, '#14532d', '#facc15', 4, 8);
      }
      // 8. CỬA HÀNG NHÔM KÍNH TRẦN QUỐC TUẤN (Cờ Tổ Quốc)
      else if (fn.includes('glass') || fn.includes('flags')) {
        drawBox(0, 0, 512, 768, '#e0f2fe', '#0284c7', 0);
        drawBox(0, 240, 512, 12, '#bae6fd', '#0284c7', 2);
        drawBox(0, 470, 512, 12, '#bae6fd', '#0284c7', 2);
        drawAnimeWindow(50, 40, 180, 160, '#0369a1', true, '#38bdf8');
        drawAnimeWindow(282, 40, 180, 160, '#0369a1', true, '#38bdf8');
        drawAnimeWindow(50, 280, 180, 160, '#0369a1', true, '#38bdf8');
        drawAnimeWindow(282, 280, 180, 160, '#0369a1', true, '#38bdf8');
        drawSignBanner('NHÔM KÍNH TRẦN QUỐC TUẤN', 'CỬA KÍNH CƯỜNG LỰC • CỬA CUỐN TỰ ĐỘNG', '#b91c1c', '#fef08a', '#facc15', '🇻🇳');
        drawBox(80, 630, 352, 138, '#7dd3fc', '#0284c7', 4, 8);
      }
      // 9. THỜI TRANG ELISE (Số 24 Ngô Quyền)
      else if (fn.includes('elise')) {
        drawBox(0, 0, 512, 768, '#f8fafc', '#64748b', 0);
        drawBox(0, 240, 512, 10, '#e2e8f0', '#0f172a', 2);
        drawBox(0, 470, 512, 10, '#e2e8f0', '#0f172a', 2);
        drawAnimeWindow(50, 40, 180, 160, '#0f172a', true, '#94a3b8');
        drawAnimeWindow(282, 40, 180, 160, '#0f172a', true, '#94a3b8');
        drawAnimeWindow(50, 280, 180, 160, '#0f172a', true, '#94a3b8');
        drawAnimeWindow(282, 280, 180, 160, '#0f172a', true, '#94a3b8');
        drawSignBanner('ELISE FASHION', 'SỐ 24 PHỐ NGÔ QUYỀN • BỘ SƯU TẬP CAO CẤP', '#0f172a', '#f8fafc', '#cbd5e1', '✨');
        drawBox(100, 630, 312, 138, '#e2e8f0', '#0f172a', 4, 8);
      }
      // 10. TIỆM VÀNG BẠC NGÔ QUYỀN
      else if (fn.includes('nq_vang')) {
        drawBox(0, 0, 512, 768, '#fef08a', '#b45309', 0);
        drawSignBanner('VÀNG BẠC NGÔ QUYỀN', 'BẢO TÍN HOÀNG KIM • VÀNG 9999 • ĐÁ QUÝ', '#78350f', '#fde047', '#f59e0b', '👑');
        drawAnimeWindow(50, 60, 180, 160, '#78350f', true, '#fde047');
        drawAnimeWindow(282, 60, 180, 160, '#78350f', true, '#fde047');
        drawBox(90, 630, 332, 138, '#fef9c3', '#78350f', 4, 8);
      }
      // 11. TIỆM CẦM ĐỒ 24 NGÔ QUYỀN
      else if (fn.includes('cam_do')) {
        drawBox(0, 0, 512, 768, '#fde047', '#dc2626', 0);
        drawSignBanner('CẦM ĐỒ UY TÍN 24 NGÔ QUYỀN', 'TÀI CHÍNH NHANH • LÃI SUẤT THẤP • AN TOÀN', '#dc2626', '#ffffff', '#fde047', '🤝');
        drawAnimeWindow(50, 60, 180, 160, '#dc2626', true, '#f87171');
        drawAnimeWindow(282, 60, 180, 160, '#dc2626', true, '#f87171');
        drawBox(90, 630, 332, 138, '#fee2e2', '#dc2626', 4, 8);
      }
      // 12. TIỆM CHĂN GA GỐI ĐỆM HUYỀN HẬU & VINAMILK (Ngã Ba Lê Xoay)
      else if (fn.includes('huyen_hau')) {
        drawBox(0, 0, 512, 768, '#fdf4ff', '#c026d3', 0);
        drawBox(0, 240, 512, 12, '#f5d0fe', '#a21caf', 2);
        drawBox(0, 470, 512, 12, '#f5d0fe', '#a21caf', 2);
        drawAnimeWindow(50, 40, 180, 160, '#86198f', true, '#ec4899');
        drawAnimeWindow(282, 40, 180, 160, '#86198f', true, '#ec4899');
        drawAnimeWindow(50, 260, 180, 150, '#86198f', true, '#f472b6');
        drawAnimeWindow(282, 260, 180, 150, '#86198f', true, '#f472b6');
        drawSignBanner('CHĂN GA GỐI ĐỆM HUYỀN HẬU', 'ĐỆM KIM CƯƠNG • SÔNG HỒNG • LIÊN Á', '#86198f', '#fef08a', '#f5d0fe', '🛏️');
        // Biển đại lý Vinamilk màu xanh dương đặc trưng
        drawBox(40, 615, 432, 48, '#0284c7', '#ffffff', 3, 8);
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 22px "Nunito", Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🥛 ĐẠI LÝ CHÍNH HÃNG VINAMILK • SỮA TƯƠI & SỮA CHUA', 256, 647);
        drawBox(60, 670, 392, 98, '#bae6fd', '#1d4ed8', 4, 8);
      }
      // 13. BƯU ĐIỆN TỈNH VĨNH PHÚC VNPT (Bùng Binh Kim Ngọc)
      else if (fn.includes('buudien') || fn.includes('vnpt')) {
        drawBox(0, 0, 512, 768, '#f8fafc', '#0284c7', 0);
        drawBox(0, 240, 512, 16, '#e0f2fe', '#0284c7', 2);
        drawBox(0, 470, 512, 16, '#e0f2fe', '#0284c7', 2);
        // Đồng hồ Bưu Điện Neoclassical trung tâm
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(256, 120, 56, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(256, 120, 48, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(256, 120); ctx.lineTo(256, 85);
        ctx.moveTo(256, 120); ctx.lineTo(285, 120);
        ctx.stroke();

        drawAnimeWindow(50, 60, 140, 140, '#0369a1', true, '#0284c7');
        drawAnimeWindow(322, 60, 140, 140, '#0369a1', true, '#0284c7');
        drawAnimeWindow(50, 270, 180, 160, '#0369a1', true, '#0284c7');
        drawAnimeWindow(282, 270, 180, 160, '#0369a1', true, '#0284c7');
        drawSignBanner('BƯU ĐIỆN TỈNH VĨNH PHÚC', 'TẬP ĐOÀN BƯU CHÍNH VIỄN THÔNG VIỆT NAM • VNPT', '#0284c7', '#ffffff', '#facc15', '🏛️');
        drawBox(80, 630, 352, 138, '#7dd3fc', '#0369a1', 4, 8);
      }
      // 14. BIỆT THỰ NHÀ VƯỜN INDOCHINE BÉ HÀ MY (Vườn Cây Cảnh Vũ Dậu - 1.19 km Final Destination)
      else if (fn.includes('vudau') || fn.includes('residence')) {
        // Tường sơn vàng kem ấm áp phong cách Indochine
        drawBox(0, 0, 512, 768, '#fef9c3', '#ca8a04', 0);

        // Gờ chỉ kiến trúc cổ điển phân tầng
        drawBox(0, 360, 512, 20, '#fef08a', '#ca8a04', 3);

        // --- TẦNG 2: PHÒNG NGỦ BÉ HÀ MY & BAN CÔNG HOA GIẤY ---
        // Cửa sổ chớp gỗ màu xanh rêu cổ điển phong cách Pháp
        drawBox(60, 60, 160, 200, '#166534', '#14532d', 4, 6);
        drawBox(292, 60, 160, 200, '#166534', '#14532d', 4, 6);
        // Nan chớp gỗ thoáng khí
        ctx.strokeStyle = '#14532d';
        ctx.lineWidth = 2;
        for (let ly = 75; ly < 250; ly += 14) {
          ctx.beginPath(); ctx.moveTo(70, ly); ctx.lineTo(210, ly); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(302, ly); ctx.lineTo(442, ly); ctx.stroke();
        }
        // Vòm kính bán nguyệt đón ánh nắng phía trên cửa sổ
        ctx.fillStyle = '#bae6fd';
        ctx.beginPath(); ctx.arc(140, 60, 48, Math.PI, 0); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(372, 60, 48, Math.PI, 0); ctx.fill(); ctx.stroke();

        // Ban công sắt uốn nghệ thuật tầng 2
        drawBox(30, 260, 452, 80, 'rgba(15, 23, 42, 0.08)', '#0f172a', 3, 4);
        for (let bx = 45; bx <= 470; bx += 22) {
          ctx.beginPath(); ctx.moveTo(bx, 260); ctx.lineTo(bx, 340); ctx.stroke();
        }
        // Giàn hoa giấy hồng rực rỡ buông rủ mềm mại quanh ban công
        const bgCols = ['#f43f5e', '#fb7185', '#fda4af', '#f472b6', '#e11d48'];
        for (let f = 0; f < 120; f++) {
          ctx.fillStyle = bgCols[f % bgCols.length];
          const fx = 40 + Math.random() * 432;
          const fy = 270 + Math.random() * 85;
          ctx.beginPath();
          ctx.arc(fx, fy, 4 + Math.random() * 7, 0, Math.PI * 2);
          ctx.fill();
        }

        // --- TẦNG 1: SẢNH ĐÓN PHÒNG KHÁCH ẤM CÚNG GIA ĐÌNH BÉ HÀ MY ---
        // Cửa đại sảnh 2 cánh gỗ lim nâu bóng sang trọng
        drawBox(176, 440, 160, 310, '#3e1a06', '#271003', 6, 8);
        drawBox(188, 455, 60, 120, '#58240c', '#271003', 3, 4);
        drawBox(264, 455, 60, 120, '#58240c', '#271003', 3, 4);
        drawBox(188, 595, 60, 135, '#58240c', '#271003', 3, 4);
        drawBox(264, 595, 60, 135, '#58240c', '#271003', 3, 4);
        // Tay nắm cửa mạ đồng vàng
        ctx.fillStyle = '#facc15';
        ctx.beginPath(); ctx.arc(244, 580, 8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(268, 580, 8, 0, Math.PI * 2); ctx.fill();

        // Cửa sổ phòng khách hai bên với rèm hoa và ánh đèn vàng ấm
        drawAnimeWindow(35, 460, 120, 180, '#3e1a06', true, '#fef08a');
        drawAnimeWindow(357, 460, 120, 180, '#3e1a06', true, '#fef08a');

        // Bậc tam cấp đá hoa cương trước cửa
        drawBox(140, 745, 232, 23, '#475569', '#1e293b', 2, 0);
      }
      // 15. HÀNG RÀO TÔN ĐỎ (Số 24 Ngô Quyền)
      else if (fn.includes('red_fence')) {
        drawBox(0, 0, 512, 768, '#dc2626', '#991b1b', 0);
        ctx.fillStyle = '#b91c1c';
        for (let x = 0; x < 512; x += 32) {
          ctx.fillRect(x, 0, 16, 768);
        }
        drawBox(0, 360, 512, 48, '#facc15', '#0f172a', 4);
        ctx.fillStyle = '#0f172a';
        ctx.font = '900 24px "Nunito", Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⚠️ CÔNG TRÌNH ĐANG THI CÔNG - CHÚ Ý AN TOÀN', 256, 394);
      }
      // 16. NHỰA ĐƯỜNG ANIME (ASPHALT)
      else if (fn.includes('asphalt')) {
        drawBox(0, 0, 512, 768, '#18181b', '#09090b', 0);
        ctx.fillStyle = '#27272a';
        for (let i = 0; i < 600; i++) {
          ctx.fillRect(Math.random() * 512, Math.random() * 768, 2, 2);
        }
      }
      // 17. GẠCH LÁT VỈA HÈ TERRAZZO ANIME
      else if (fn.includes('sidewalk') || fn.includes('tile')) {
        drawBox(0, 0, 512, 768, '#cbd5e1', '#94a3b8', 0);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 3;
        for (let x = 0; x < 512; x += 64) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 768); ctx.stroke();
        }
        for (let y = 0; y < 768; y += 64) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
        }
      }
      // 18. MẶT NƯỚC HỒ TRẠI ỔI & HỒ TỈNH ỦY
      else if (fn.includes('lake')) {
        const grad = ctx.createLinearGradient(0, 0, 512, 768);
        grad.addColorStop(0, '#0284c7');
        grad.addColorStop(0.5, '#0ea5e9');
        grad.addColorStop(1, '#38bdf8');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 768);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        for (let i = 0; i < 40; i++) {
          ctx.beginPath();
          ctx.ellipse(Math.random() * 512, Math.random() * 768, 25 + Math.random() * 40, 6, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // 19. VƯỜN HOA & ĐẢO CÂY
      else if (fn.includes('garden') || fn.includes('flowers')) {
        drawBox(0, 0, 512, 768, '#16a34a', '#15803d', 0);
        const fCols = ['#f43f5e', '#facc15', '#fb923c', '#e879f9'];
        for (let i = 0; i < 180; i++) {
          ctx.fillStyle = fCols[i % fCols.length];
          ctx.beginPath();
          ctx.arc(Math.random() * 512, Math.random() * 768, 4 + Math.random() * 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // 20. DEFAULT SHOPHOUSE ANIME CHUẨN
      else {
        drawBox(0, 0, 512, 768, '#fef08a', '#ca8a04', 0);
        drawAnimeWindow(50, 60, 180, 160, '#334155', true, '#38bdf8');
        drawAnimeWindow(282, 60, 180, 160, '#334155', true, '#f472b6');
        drawAnimeWindow(50, 280, 180, 160, '#334155', true, '#4ade80');
        drawAnimeWindow(282, 280, 180, 160, '#334155', true, '#fbbf24');
        drawSignBanner('PHỐ TRẦN QUỐC TUẤN', 'THÀNH PHỐ VĨNH YÊN • VĨNH PHÚC', '#b91c1c', '#fef08a', '#facc15', '🏬');
        drawBox(90, 630, 332, 138, '#bae6fd', '#0284c7', 4, 8);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      if (repeatX > 1 || repeatY > 1) {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(repeatX, repeatY);
      }
      return tex;
    }

    getRealTexture(filename, repeatX = 1, repeatY = 1) {
      if (!this._realTextures) this._realTextures = {};
      const key = `${filename}_${repeatX}_${repeatY}`;
      if (this._realTextures[key]) return this._realTextures[key];

      // Ưu tiên 100% Canvas Texture Anime Ghibli sắc nét, sống động, không lo mất file hay lỗi CORS
      const animeTex = this.createAnimeTexture(filename, repeatX, repeatY);
      if (animeTex) {
        this._realTextures[key] = animeTex;
        return animeTex;
      }

      if (!this._realTextureLoader) {
        this._realTextureLoader = new THREE.TextureLoader();
        this._realTextureLoader.setCrossOrigin(undefined);
      }

      const tex = this._realTextureLoader.load(`textures/real_facades/${filename}`);
      tex.wrapS = (repeatX > 1) ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
      tex.wrapT = (repeatY > 1) ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
      if (repeatX !== 1 || repeatY !== 1) {
        tex.repeat.set(repeatX, repeatY);
      }
      this._realTextures[key] = tex;
      return tex;
    }

    getRealFacadeMat(filename, options = {}) {
      const tex = this.getRealTexture(filename, options.repeatX || 1, options.repeatY || 1);
      return new THREE.MeshStandardMaterial({
        map: tex,
        roughness: options.roughness !== undefined ? options.roughness : 0.55,
        metalness: options.metalness !== undefined ? options.metalness : 0.08,
        side: THREE.DoubleSide,
        transparent: !!options.transparent,
        opacity: options.opacity !== undefined ? options.opacity : 1.0
      });
    }

    // ============================================================
    // HELPER: TẠO MÔ HÌNH Ô TÔ ANIME GHIBLI CHI TIẾT (SEDAN / SUV)
    // ============================================================
    createAnimeCarMesh(type = 'sedan', color = 0xf8fafc, plateText = '88A-5C4.99') {
      const car = new THREE.Group();
      const isSuv = type === 'suv';
      const width = isSuv ? 2.05 : 1.88;
      const length = isSuv ? 4.7 : 4.3;

      const paintMat = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.72,
        roughness: 0.22
      });
      const darkTrimMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
      const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.95, roughness: 0.08 });
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.08, transparent: true, opacity: 0.88 });
      const headLightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfffbeb, emissiveIntensity: 1.6, roughness: 0.1 });
      const tailLightMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 1.3, roughness: 0.2 });

      // 1. Thân gầm xe
      const bodyH = isSuv ? 0.72 : 0.62;
      const bodyGeo = new THREE.BoxGeometry(width, bodyH, length);
      const bodyMesh = new THREE.Mesh(bodyGeo, paintMat);
      bodyMesh.position.y = bodyH / 2 + 0.22;
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      car.add(bodyMesh);

      // Cản trước & cản sau
      const bumperF = new THREE.Mesh(new THREE.BoxGeometry(width * 0.98, 0.28, 0.25), darkTrimMat);
      bumperF.position.set(0, 0.28, length / 2 + 0.1);
      car.add(bumperF);

      const bumperR = new THREE.Mesh(new THREE.BoxGeometry(width * 0.98, 0.28, 0.25), darkTrimMat);
      bumperR.position.set(0, 0.28, -length / 2 - 0.1);
      car.add(bumperR);

      // 2. Cabin & Kính xe
      const cabinW = width * 0.88;
      const cabinH = isSuv ? 0.75 : 0.62;
      const cabinL = isSuv ? length * 0.62 : length * 0.52;
      const cabinGeo = new THREE.BoxGeometry(cabinW, cabinH, cabinL);
      const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
      cabinMesh.position.set(0, bodyH + 0.22 + cabinH / 2 - 0.04, isSuv ? -0.15 : -0.25);
      cabinMesh.castShadow = true;
      car.add(cabinMesh);

      // Mui xe
      const roofMesh = new THREE.Mesh(new THREE.BoxGeometry(cabinW * 0.96, 0.06, cabinL * 0.92), paintMat);
      roofMesh.position.set(0, bodyH + 0.22 + cabinH - 0.02, isSuv ? -0.15 : -0.25);
      car.add(roofMesh);

      // Nắp capo vát nhẹ
      const hoodL = length * 0.28;
      const hood = new THREE.Mesh(new THREE.BoxGeometry(width * 0.92, 0.08, hoodL), paintMat);
      hood.rotation.x = 0.06;
      hood.position.set(0, bodyH + 0.20, length / 2 - hoodL / 2);
      car.add(hood);

      // Lưới tản nhiệt mạ Chrome
      const grille = new THREE.Mesh(new THREE.BoxGeometry(width * 0.55, 0.20, 0.06), chromeMat);
      grille.position.set(0, 0.48, length / 2 + 0.03);
      car.add(grille);

      // Đèn pha trước Projector LED sắc nét
      [-width * 0.38, width * 0.38].forEach(hx => {
        const hl = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.10), headLightMat);
        hl.position.set(hx, 0.54, length / 2 + 0.04);
        hl.rotation.y = hx > 0 ? -0.12 : 0.12;
        car.add(hl);
      });

      // Đèn hậu sau LED đỏ Ruby
      [-width * 0.38, width * 0.38].forEach(tx => {
        const tl = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.08), tailLightMat);
        tl.position.set(tx, 0.56, -length / 2 - 0.03);
        tl.rotation.y = tx > 0 ? 0.12 : -0.12;
        car.add(tl);
      });

      // Gương chiếu hậu 2 bên
      [-width / 2 - 0.12, width / 2 + 0.12].forEach(mx => {
        const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.14), paintMat);
        mirror.position.set(mx, bodyH + 0.25, 0.45);
        car.add(mirror);
      });

      // 4 Bánh xe thể thao vành đúc mạ Chrome
      const wheelR = isSuv ? 0.38 : 0.33;
      const wheelW = 0.24;
      const wheelZf = length * 0.32;
      const wheelZr = -length * 0.32;
      const wheelX = width / 2 + 0.02;

      [[-wheelX, wheelR, wheelZf], [wheelX, wheelR, wheelZf], [-wheelX, wheelR, wheelZr], [wheelX, wheelR, wheelZr]].forEach(([wx, wy, wz]) => {
        const wg = new THREE.Group();
        wg.position.set(wx, wy, wz);

        const tire = new THREE.Mesh(new THREE.CylinderGeometry(wheelR, wheelR, wheelW, 20), darkTrimMat);
        tire.rotation.z = Math.PI / 2;
        tire.castShadow = true;
        wg.add(tire);

        const rim = new THREE.Mesh(new THREE.CylinderGeometry(wheelR * 0.65, wheelR * 0.65, wheelW + 0.02, 16), chromeMat);
        rim.rotation.z = Math.PI / 2;
        wg.add(rim);

        for (let s = 0; s < 5; s++) {
          const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.04, wheelR * 1.1, 0.03), chromeMat);
          spoke.rotation.x = (s / 5) * Math.PI * 2;
          spoke.position.x = (wx > 0 ? 1 : -1) * 0.01;
          wg.add(spoke);
        }
        car.add(wg);
      });

      // Biển số xe Vĩnh Phúc (Trước & Sau)
      const makePlate = (isRear) => {
        const pCanvas = document.createElement('canvas');
        pCanvas.width = 256; pCanvas.height = 128;
        const pctx = pCanvas.getContext('2d');
        pctx.fillStyle = '#ffffff';
        pctx.fillRect(0, 0, 256, 128);
        pctx.strokeStyle = '#0f172a';
        pctx.lineWidth = 6;
        pctx.strokeRect(3, 3, 250, 122);
        pctx.fillStyle = '#0f172a';
        pctx.font = '900 48px "Nunito", Arial';
        pctx.textAlign = 'center';
        pctx.fillText(plateText, 128, 78);
        const pTex = new THREE.CanvasTexture(pCanvas);
        const pMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.28), new THREE.MeshBasicMaterial({ map: pTex }));
        pMesh.position.set(0, 0.30, isRear ? -length / 2 - 0.14 : length / 2 + 0.14);
        if (isRear) pMesh.rotation.y = Math.PI;
        return pMesh;
      };
      car.add(makePlate(false));
      car.add(makePlate(true));

      return car;
    }

    // ============================================================
    // HELPER: TẠO CÂY BONSAI NGHỆ THUẬT VIỆT NAM (SÂN VŨ DẬU - GHIBLI CRAFTSMANSHIP)
    // ============================================================
    createAnimeBonsaiMesh(foliageType = 0) {
      const bg = new THREE.Group();

      // 1. Chậu kiểng gốm sứ nghệ thuật Bát Tràng (Đa dạng: men lam cobalt, men rạn ngọc, men gốm đất nung)
      const potW = 1.5, potH = 0.44, potD = 1.05;
      const potStyles = [
        { body: 0x1e3a8a, rim: 0x172554, foot: 0xfacc15 }, // Men lam hoàng gia chỉ vàng
        { body: 0x9a3412, rim: 0x7c2d12, foot: 0x451a03 }, // Gốm đất nung Bát Tràng truyền thống
        { body: 0x065f46, rim: 0x047857, foot: 0xd97706 }, // Men ngọc Celadon lục bảo
        { body: 0x334155, rim: 0x1e293b, foot: 0x94a3b8 }  // Đá mài Granite sang trọng
      ];
      const pStyle = potStyles[foliageType % potStyles.length];

      const potMat = new THREE.MeshStandardMaterial({ color: pStyle.body, roughness: 0.35, metalness: 0.15 });
      const rimMat = new THREE.MeshStandardMaterial({ color: pStyle.rim, roughness: 0.3 });
      const goldMat = new THREE.MeshStandardMaterial({ color: pStyle.foot, roughness: 0.3, metalness: 0.6 });

      const pot = new THREE.Mesh(new THREE.BoxGeometry(potW, potH, potD), potMat);
      pot.position.y = potH / 2 + 0.08;
      pot.castShadow = true;
      bg.add(pot);

      // Miệng chậu loe có đường gờ đôi nổi bật
      const rim = new THREE.Mesh(new THREE.BoxGeometry(potW + 0.14, 0.08, potD + 0.14), rimMat);
      rim.position.y = potH + 0.08;
      bg.add(rim);

      // 4 chân quỳ chạm khắc hoa văn góc chậu
      [[-potW/2 + 0.1, -potD/2 + 0.1], [potW/2 - 0.1, -potD/2 + 0.1], [-potW/2 + 0.1, potD/2 - 0.1], [potW/2 - 0.1, potD/2 - 0.1]].forEach(([fx, fz]) => {
        const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.10, 0.18), goldMat);
        foot.position.set(fx, 0.05, fz);
        bg.add(foot);
      });

      // Lớp đất phù sa & nhung rêu xanh phủ kín mặt chậu
      const soil = new THREE.Mesh(new THREE.PlaneGeometry(potW - 0.06, potD - 0.06), new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.9 }));
      soil.rotation.x = -Math.PI / 2;
      soil.position.y = potH + 0.09;
      bg.add(soil);

      // 2. Thân cây Bonsai cổ thụ gân guốc, uốn lượn phong trần (Nghệ thuật cây thế)
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x3e1f08, roughness: 0.9 });
      const woodBranchMat = new THREE.MeshStandardMaterial({ color: 0x54260a, roughness: 0.85 });

      // Bộ rễ lộ thiên (Surface Root Flares - Rễ móng rồng ôm đất)
      const rootAngles = [0.2, 1.4, 2.7, 4.1, 5.3];
      rootAngles.forEach(ang => {
        const root = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.10, 0.35, 6), woodMat);
        root.position.set(Math.cos(ang) * 0.28, potH + 0.12, Math.sin(ang) * 0.24);
        root.rotation.z = Math.cos(ang) * 0.55;
        root.rotation.x = Math.sin(ang) * 0.55;
        bg.add(root);
      });

      // Gốc cây thế phình to vững chãi
      const trunkBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.34, 0.55, 12), woodMat);
      trunkBase.position.set(0, potH + 0.30, 0);
      trunkBase.rotation.z = -0.12;
      trunkBase.castShadow = true;
      bg.add(trunkBase);

      // Thân giữa uốn lượn mềm mại
      const trunkMid = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 0.60, 10), woodMat);
      trunkMid.position.set(-0.06, potH + 0.75, 0.02);
      trunkMid.rotation.z = 0.25;
      trunkMid.rotation.y = 0.15;
      trunkMid.castShadow = true;
      bg.add(trunkMid);

      // Cành phóng (cành chính vươn sang trái)
      const branchL = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.15, 0.80, 8), woodBranchMat);
      branchL.position.set(-0.35, potH + 1.10, 0.06);
      branchL.rotation.z = 0.68;
      branchL.rotation.y = 0.22;
      branchL.castShadow = true;
      bg.add(branchL);

      // Cành nghinh phong (vươn sang phải lên cao)
      const branchR = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 0.90, 8), woodBranchMat);
      branchR.position.set(0.38, potH + 1.25, -0.04);
      branchR.rotation.z = -0.55;
      branchR.rotation.y = -0.30;
      branchR.castShadow = true;
      bg.add(branchR);

      // Ngọn cây vươn thẳng lên trời (Cành ngọn)
      const trunkTop = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.12, 0.65, 8), woodBranchMat);
      trunkTop.position.set(0.04, potH + 1.45, 0.02);
      trunkTop.rotation.z = 0.08;
      trunkTop.castShadow = true;
      bg.add(trunkTop);

      // 3. Các tầng tán mây Bonsai đa sắc độ (Cloud-pruned Foliage Pads - Studio Ghibli Layered Volumes)
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.75 }); // Đáy bóng tối
      const midMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.60 });  // Thân lá ngọc
      const highlightMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.50 }); // Ngọn đón nắng

      // Biến thể hoa rực rỡ cho một số cây
      const hasBlossoms = (foliageType % 2 === 1);
      const blossomMat = new THREE.MeshStandardMaterial({
        color: (foliageType % 4 === 1) ? 0xfacc15 : 0xf43f5e, // Hoa Mai Vàng hoặc Hoa Giấy rực rỡ
        roughness: 0.4
      });

      const padConfigs = [
        { x: -0.72, y: potH + 1.35, z: 0.14, rx: 0.70, ry: 0.26, rz: 0.55 }, // Tán phóng trái
        { x: 0.78, y: potH + 1.55, z: -0.12, rx: 0.80, ry: 0.28, rz: 0.62 }, // Tán nghinh phong phải
        { x: 0.05, y: potH + 1.85, z: 0.02, rx: 0.95, ry: 0.32, rz: 0.75 },  // Tán đỉnh ngọn
        { x: -0.25, y: potH + 1.55, z: -0.28, rx: 0.55, ry: 0.22, rz: 0.45 }, // Tán hậu (chiều sâu)
        { x: 0.32, y: potH + 1.15, z: 0.22, rx: 0.50, ry: 0.20, rz: 0.42 }   // Tán nghinh khách phía trước
      ];

      padConfigs.forEach(p => {
        const padGroup = new THREE.Group();
        padGroup.position.set(p.x, p.y, p.z);

        // Lớp đáy sẫm bóng râm
        const padBase = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), baseMat);
        padBase.scale.set(p.rx, p.ry * 0.7, p.rz);
        padBase.position.y = -p.ry * 0.2;
        padBase.castShadow = true;
        padGroup.add(padBase);

        // Khối tán chính màu ngọc lục bảo
        const padMid = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 10), midMat);
        padMid.scale.set(p.rx * 0.92, p.ry, p.rz * 0.92);
        padMid.castShadow = true;
        padGroup.add(padMid);

        // Đỉnh tán đón ánh nắng vàng Anime tươi sáng
        const padTop = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), highlightMat);
        padTop.scale.set(p.rx * 0.75, p.ry * 0.65, p.rz * 0.75);
        padTop.position.y = p.ry * 0.32;
        padGroup.add(padTop);

        // Điểm xuyết hoa vàng/hồng nếu là cây nở hoa
        if (hasBlossoms) {
          for (let f = 0; f < 5; f++) {
            const bx = (Math.random() - 0.5) * p.rx * 1.2;
            const bz = (Math.random() - 0.5) * p.rz * 1.2;
            const flower = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), blossomMat);
            flower.position.set(bx, p.ry * 0.35 + Math.random() * 0.05, bz);
            padGroup.add(flower);
          }
        }

        bg.add(padGroup);
      });

      return bg;
    }

    // ============================================================
    // HELPER: TẠO BIỂN VẪY HỘP ĐÈN LED CHIẾU SÁNG VUÔNG GÓC MẶT TIỀN (PROJECTING BLADE SIGN)
    // Giúp người lái xe quan sát 100% biển hiệu từ khoảng cách xa dọc theo tuyến phố, không bị che lấp
    // ============================================================
    createProjectingBladeSign(title, subtitle, bgCol = '#1e1b4b', textCol = '#ffffff', accentCol = '#facc15', shape = 'rect') {
      const signGroup = new THREE.Group();

      const sw = (shape === 'round') ? 1.15 : 1.30; // Z dimension (nhô ra ngoài vỉa hè)
      const sh = (shape === 'round') ? 1.15 : 1.35; // Y dimension (chiều cao biển)
      const st = 0.12; // X dimension (độ dày hộp đèn LED)

      // 1. Khung giá sắt nghệ thuật bắt chắc vào tường vươn ra -Z
      const ironMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8, metalness: 0.5 });
      const bracketBase = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.45, 0.08), ironMat);
      bracketBase.position.set(0, sh / 2, -0.04);
      signGroup.add(bracketBase);

      // Cặp tay đòn sắt giằng trên và dưới
      [-sh * 0.28, sh * 0.28].forEach(by => {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.55), ironMat);
        arm.position.set(0, sh / 2 + by, -0.28);
        signGroup.add(arm);
      });

      // 2. Canvas vẽ 2 mặt biển hiệu LED sắc nét phát sáng
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = bgCol;
      if (shape === 'round') {
        ctx.beginPath();
        ctx.arc(256, 256, 240, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = accentCol;
        ctx.lineWidth = 18;
        ctx.stroke();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(256, 256, 220, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.roundRect(16, 16, 480, 480, 32);
        ctx.fill();
        ctx.strokeStyle = accentCol;
        ctx.lineWidth = 18;
        ctx.roundRect(24, 24, 464, 464, 24);
        ctx.stroke();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.roundRect(38, 38, 436, 436, 18);
        ctx.stroke();
      }

      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;

      ctx.font = '900 68px "Nunito", Arial, sans-serif';
      ctx.fillStyle = textCol;
      ctx.fillText(title, 256, subtitle ? 230 : 275);

      if (subtitle) {
        ctx.font = '800 36px "Nunito", Arial, sans-serif';
        ctx.fillStyle = accentCol;
        ctx.fillText(subtitle, 256, 318);
      }

      const signTex = new THREE.CanvasTexture(canvas);
      const signMat = new THREE.MeshStandardMaterial({
        map: signTex,
        roughness: 0.22,
        metalness: 0.12,
        emissive: new THREE.Color(bgCol),
        emissiveIntensity: 0.35,
        side: THREE.DoubleSide
      });
      const edgeMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.6, metalness: 0.8 });

      // Hộp đèn: Mặt trái (+X) và Mặt phải (-X) hiển thị biển, các cạnh là viền kim loại
      const signBox = new THREE.Mesh(
        new THREE.BoxGeometry(st, sh, sw),
        [signMat, signMat, edgeMat, edgeMat, edgeMat, edgeMat]
      );
      // Đặt biển nhô ra ngoài vỉa hè theo trục -Z
      signBox.position.set(0, sh / 2, -(0.35 + sw / 2));
      signBox.castShadow = true;
      signGroup.add(signBox);

      return signGroup;
    }

    // ============================================================
    // HELPER: TẠO XE MÁY HONDA WAVE ALPHA CHUẨN VỈA HÈ VIỆT NAM
    // ============================================================
    createAnimeMotorbikeMesh(color = 0xb91c1c) {
      const bike = new THREE.Group();
      const frameMat = new THREE.MeshStandardMaterial({ color: color, roughness: 0.3, metalness: 0.7 });
      const darkMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
      const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.95, roughness: 0.1 });

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.45, 1.4), frameMat);
      body.position.set(0, 0.55, 0);
      body.castShadow = true;
      bike.add(body);

      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.75), darkMat);
      seat.position.set(0, 0.80, -0.25);
      bike.add(seat);

      const frontShield = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.55, 0.35), frameMat);
      frontShield.position.set(0, 0.72, 0.45);
      frontShield.rotation.x = -0.25;
      bike.add(frontShield);

      const hbar = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.62, 10), darkMat);
      hbar.rotation.z = Math.PI / 2;
      hbar.position.set(0, 1.05, 0.48);
      bike.add(hbar);

      const headLight = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 0.06, 14),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfffbeb, emissiveIntensity: 1.4 })
      );
      headLight.rotation.x = Math.PI / 2;
      headLight.position.set(0, 1.02, 0.55);
      bike.add(headLight);

      const makeWaveWheel = (isFront) => {
        const wg = new THREE.Group();
        const tire = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.045, 10, 24), darkMat);
        wg.add(tire);
        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.04, 16), chromeMat);
        rim.rotation.x = Math.PI / 2;
        wg.add(rim);
        for (let s = 0; s < 4; s++) {
          const sp = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.52, 0.015), chromeMat);
          sp.rotation.z = (s / 4) * Math.PI;
          wg.add(sp);
        }
        wg.position.set(0, 0.32, isFront ? 0.68 : -0.62);
        return wg;
      };
      bike.add(makeWaveWheel(true));
      bike.add(makeWaveWheel(false));

      const kickstand = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.38, 8), darkMat);
      kickstand.rotation.z = -0.45;
      kickstand.position.set(-0.14, 0.18, -0.15);
      bike.add(kickstand);
      bike.rotation.z = 0.08;

      return bike;
    }

    createRealBuildingMesh(width, height, depth, facadeTexture, wallColor = 0xfef08a, options = {}) {
      const bGroup = new THREE.Group();

      // 1. Khối hộp 3D vật lý (thân nhà, hông nhà, mái)
      const bodyMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.75 });
      const bodyGeo = new THREE.BoxGeometry(width, height, depth);
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.set(0, height / 2, depth / 2);
      body.castShadow = true;
      body.receiveShadow = true;
      bGroup.add(body);

      // 2. Mặt tiền tòa nhà Anime chuẩn 1:1
      const facadeMat = this.getRealFacadeMat(facadeTexture, { roughness: 0.55 });
      const facadeGeo = new THREE.PlaneGeometry(width, height);
      const facadeMesh = new THREE.Mesh(facadeGeo, facadeMat);
      facadeMesh.position.set(0, height / 2, -0.02);
      facadeMesh.rotation.y = Math.PI; // Quay mặt tiền ra hướng đường phố
      facadeMesh.castShadow = true;
      bGroup.add(facadeMesh);

      // 3. Mái hiên / Mái vòm thực tế nhô ra nếu có (Bố trí ở Y = 2.15m, nằm hoàn toàn dưới biển hiệu)
      if (options.hasAwning) {
        const awningMat = new THREE.MeshStandardMaterial({ color: options.awningColor || 0xb45309, roughness: 0.5 });
        const awning = new THREE.Mesh(new THREE.BoxGeometry(width * 0.96, 0.06, 1.2), awningMat);
        awning.position.set(0, 2.15, -0.60);
        awning.rotation.x = -Math.PI / 12; // Che mưa nắng cho cửa chính, 100% không che biển hiệu
        bGroup.add(awning);
      }

      // 4. Ban công 3D & Cục nóng điều hòa (Chỉ xuất hiện từ Tầng 2 trở lên, tuyệt đối không đè biển hiệu)
      const floors = options.floors || 3;
      for (let fl = 2; fl < floors; fl++) {
        const bal = new THREE.Mesh(
          new THREE.BoxGeometry(width * 0.88, 0.85, 0.55),
          new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
        );
        bal.position.set(0, fl * (height / floors) + 0.42, -0.28);
        bGroup.add(bal);

        const ac = new THREE.Mesh(
          new THREE.BoxGeometry(0.85, 0.52, 0.35),
          new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 })
        );
        ac.position.set(width * 0.38, fl * (height / floors) + 1.2, -0.18);
        bGroup.add(ac);
      }

      // 5. Bồn nước Inox Tân Á Đại Thành trên sân thượng (Chi tiết đặc trưng nhà phố Việt Nam)
      const waterTank = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 1.8, 14),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.2 })
      );
      waterTank.rotation.z = Math.PI / 2;
      waterTank.position.set(-width * 0.2, height + 0.9, depth / 2);
      bGroup.add(waterTank);

      // 6. Biển vẫy hộp đèn LED chiếu sáng nhô ra vuông góc mặt tiền (Projecting Blade Sign)
      // Bố trí ở cột trụ hông cửa chính (Y = 1.85m -> 3.10m), nằm HOÀN TOÀN DƯỚI biển hiệu chính (Y = 3.35m -> 4.5m), 100% không che chữ
      if (options.bladeSign) {
        const bs = options.bladeSign;
        const blade = this.createProjectingBladeSign(bs.title, bs.sub, bs.bg, bs.text, bs.accent, bs.shape || 'rect');
        const mountX = (bs.side === 'left') ? -width * 0.485 : width * 0.485;
        blade.position.set(mountX, 1.85, -0.02);
        bGroup.add(blade);
      }

      return bGroup;
    }

    // ------------------------------------------------------------
    // 2. DỰNG MẶT ĐƯỜNG NHỰA 3D, DẢI PHÂN CÁCH & VỈA HÈ TOÀN TUYẾN 1.19 KM
    // Chuẩn 1:1 GPS Route từ Trường Ngô Quyền đến Vườn Cây Cảnh Vũ Dậu
    // ------------------------------------------------------------
    buildCityRoads() {
      const roadGroup = new THREE.Group();
      const numSamples = 280;
      const points = this.routeCurve.getPoints(numSamples);

      const roadHalfWidth = 5.2; // Lòng đường rộng 10.4m (Chuẩn thực tế Phố Trần Quốc Tuấn)
      const curbWidth = 0.35;    // Bó vỉa bê tông rộng 0.35m
      const sidewalkWidth = 4.4; // Vỉa hè đi bộ lát gạch rộng 4.4m

      // Buffers for Roadway
      const roadPos = [], roadNorm = [], roadUv = [], roadIdx = [];
      // Buffers for Left & Right Curbs
      const curbPos = [], curbNorm = [], curbUv = [], curbIdx = [];
      // Buffers for Left & Right Sidewalks
      const walkPos = [], walkNorm = [], walkUv = [], walkIdx = [];

      for (let i = 0; i <= numSamples; i++) {
        const p = points[i];
        let tangent = new THREE.Vector3(0, 0, 1);
        if (i < numSamples) {
          tangent.subVectors(points[i + 1], p).normalize();
        } else {
          tangent.subVectors(p, points[i - 1]).normalize();
        }

        const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        const u = (i / numSamples) * 65;

        // 1. Lòng đường nhựa (-5.2m -> +5.2m)
        const rL = new THREE.Vector3().copy(p).addScaledVector(side, -roadHalfWidth);
        const rR = new THREE.Vector3().copy(p).addScaledVector(side, roadHalfWidth);
        roadPos.push(rL.x, 0.05, rL.z, rR.x, 0.05, rR.z);
        roadNorm.push(0, 1, 0, 0, 1, 0);
        roadUv.push(0, u, 1, u);

        // 2. Bó vỉa trái (-5.55m -> -5.2m) & Bó vỉa phải (+5.2m -> +5.55m)
        const cL1 = new THREE.Vector3().copy(p).addScaledVector(side, -(roadHalfWidth + curbWidth));
        const cL2 = rL;
        const cR1 = rR;
        const cR2 = new THREE.Vector3().copy(p).addScaledVector(side, roadHalfWidth + curbWidth);

        // Left curb (bó vỉa Y = 0.20)
        curbPos.push(cL1.x, 0.20, cL1.z, cL2.x, 0.20, cL2.z);
        curbNorm.push(0, 1, 0, 0, 1, 0);
        curbUv.push(0, u, 1, u);
        // Right curb (bó vỉa Y = 0.20)
        curbPos.push(cR1.x, 0.20, cR1.z, cR2.x, 0.20, cR2.z);
        curbNorm.push(0, 1, 0, 0, 1, 0);
        curbUv.push(0, u, 1, u);

        // 3. Vỉa hè lát gạch đi bộ Trái & Phải (vỉa hè Y = 0.16)
        const wL1 = new THREE.Vector3().copy(p).addScaledVector(side, -(roadHalfWidth + curbWidth + sidewalkWidth));
        const wL2 = cL1;
        const wR1 = cR2;
        const wR2 = new THREE.Vector3().copy(p).addScaledVector(side, roadHalfWidth + curbWidth + sidewalkWidth);

        // Left sidewalk
        walkPos.push(wL1.x, 0.16, wL1.z, wL2.x, 0.16, wL2.z);
        walkNorm.push(0, 1, 0, 0, 1, 0);
        walkUv.push(0, u, 1, u);
        // Right sidewalk
        walkPos.push(wR1.x, 0.16, wR1.z, wR2.x, 0.16, wR2.z);
        walkNorm.push(0, 1, 0, 0, 1, 0);
        walkUv.push(0, u, 1, u);

        if (i < numSamples) {
          // Road indices
          const idx = i * 2;
          roadIdx.push(idx, idx + 1, idx + 2, idx + 1, idx + 3, idx + 2);

          // Curb indices (2 strips = 4 vertices per sample)
          const cIdxL = i * 4;
          const cIdxR = i * 4 + 2;
          curbIdx.push(cIdxL, cIdxL + 1, cIdxL + 4, cIdxL + 1, cIdxL + 5, cIdxL + 4);
          curbIdx.push(cIdxR, cIdxR + 1, cIdxR + 4, cIdxR + 1, cIdxR + 5, cIdxR + 4);

          // Walk indices (2 strips = 4 vertices per sample)
          const wIdxL = i * 4;
          const wIdxR = i * 4 + 2;
          walkIdx.push(wIdxL, wIdxL + 1, wIdxL + 4, wIdxL + 1, wIdxL + 5, wIdxL + 4);
          walkIdx.push(wIdxR, wIdxR + 1, wIdxR + 4, wIdxR + 1, wIdxR + 5, wIdxR + 4);
        }
      }

      // --- MẶT ĐƯỜNG NHỰA ---
      const roadGeo = new THREE.BufferGeometry();
      roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadPos, 3));
      roadGeo.setAttribute('normal', new THREE.Float32BufferAttribute(roadNorm, 3));
      roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(roadUv, 2));
      roadGeo.setIndex(roadIdx);

      const roadCanvas = document.createElement('canvas');
      roadCanvas.width = 512;
      roadCanvas.height = 1024;
      const rctx = roadCanvas.getContext('2d');
      // Nhựa đường màu than đậm (Deep Charcoal Asphalt - xóa sạch vệt mờ trắng)
      rctx.fillStyle = '#1c1d21';
      rctx.fillRect(0, 0, 512, 1024);

      // Hạt nhám nhựa đường
      for (let n = 0; n < 2500; n++) {
        rctx.fillStyle = Math.random() > 0.5 ? '#27272a' : '#09090b';
        rctx.globalAlpha = 0.22;
        rctx.fillRect(Math.random() * 512, Math.random() * 1024, 2, 2);
      }
      rctx.globalAlpha = 1.0;

      // Vạch lề đường màu trắng nét liền
      rctx.fillStyle = '#f8fafc';
      rctx.fillRect(16, 0, 10, 1024);
      rctx.fillRect(486, 0, 10, 1024);

      // Vạch phân làn nét đứt (4 làn xe)
      rctx.fillStyle = 'rgba(248, 250, 252, 0.75)';
      for (let y = 0; y < 1024; y += 128) {
        rctx.fillRect(135, y + 20, 6, 80);
        rctx.fillRect(371, y + 20, 6, 80);
      }

      // Vạch tim đường đôi màu vàng nét liền (Chuẩn giao thông Việt Nam)
      rctx.fillStyle = '#f59e0b';
      rctx.fillRect(250, 0, 5, 1024);
      rctx.fillRect(257, 0, 5, 1024);

      const roadTex = new THREE.CanvasTexture(roadCanvas);
      roadTex.wrapS = THREE.ClampToEdgeWrapping;
      roadTex.wrapT = THREE.RepeatWrapping;
      roadTex.repeat.set(1, 45);

      const realAsphaltTex = this.getRealTexture('tex_real_asphalt_tqt.jpg', 1, 45);
      const roadMat = new THREE.MeshStandardMaterial({
        map: roadTex,
        bumpMap: realAsphaltTex,
        bumpScale: 0.04,
        roughness: 0.82,
        metalness: 0.05
      });
      const roadMesh = new THREE.Mesh(roadGeo, roadMat);
      roadMesh.receiveShadow = true;
      roadGroup.add(roadMesh);

      // --- BÓ VỈA BÊ TÔNG (CURBS) ---
      const curbGeo = new THREE.BufferGeometry();
      curbGeo.setAttribute('position', new THREE.Float32BufferAttribute(curbPos, 3));
      curbGeo.setAttribute('normal', new THREE.Float32BufferAttribute(curbNorm, 3));
      curbGeo.setAttribute('uv', new THREE.Float32BufferAttribute(curbUv, 2));
      curbGeo.setIndex(curbIdx);

      const curbMat = new THREE.MeshStandardMaterial({
        color: 0x475569,
        roughness: 0.65,
        metalness: 0.1
      });
      const curbMesh = new THREE.Mesh(curbGeo, curbMat);
      curbMesh.receiveShadow = true;
      roadGroup.add(curbMesh);

      // --- VỈA HÈ ĐI BỘ LÁT GẠCH CHÂN THỰC (REAL SIDEWALK TERRAZZO TILES) ---
      const walkGeo = new THREE.BufferGeometry();
      walkGeo.setAttribute('position', new THREE.Float32BufferAttribute(walkPos, 3));
      walkGeo.setAttribute('normal', new THREE.Float32BufferAttribute(walkNorm, 3));
      walkGeo.setAttribute('uv', new THREE.Float32BufferAttribute(walkUv, 2));
      walkGeo.setIndex(walkIdx);

      // Sử dụng ảnh chụp gạch lát terrazzo vỉa hè thực tế trích xuất từ Google Street View
      const walkTex = this.getRealTexture('tex_real_sidewalk_tile.jpg', 3, 85);
      const walkMat = new THREE.MeshStandardMaterial({
        map: walkTex,
        roughness: 0.68,
        metalness: 0.05
      });
      const walkMesh = new THREE.Mesh(walkGeo, walkMat);
      walkMesh.receiveShadow = true;
      roadGroup.add(walkMesh);

      // --- VẠCH SANG ĐƯỜNG NGƯỜI ĐI BỘ (ZEBRA CROSSINGS) TẠI CÁC NÚT GIAO ---
      const zebraCrossings = [
        { ptIdx: 5, heading: 0.7 },    // Ngã Ba Trần Quốc Tuấn - Ngô Quyền
        { ptIdx: 12, heading: 0.8 },   // Lối vào Vòng Xuyến Ngô Quyền
        { ptIdx: 34, heading: 1.57 }   // Ngã Ba Hùng Vương - Lê Lợi
      ];

      const zebraMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
      zebraCrossings.forEach(zc => {
        const p = points[Math.min(zc.ptIdx * 6, points.length - 1)];
        for (let s = -5.0; s <= 5.0; s += 1.25) {
          const zStripe = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 4.6), zebraMat);
          zStripe.rotation.x = -Math.PI / 2;
          zStripe.rotation.z = zc.heading;
          zStripe.position.set(
            p.x + Math.cos(zc.heading) * s,
            0.065,
            p.z + Math.sin(zc.heading) * s
          );
          roadGroup.add(zStripe);
        }
      });

      this.cityGroup.add(roadGroup);
    }

    // ------------------------------------------------------------
    // 3. VÒNG XUYẾN / BÙNG BINH NGÔ QUYỀN - HÙNG VƯƠNG
    // ------------------------------------------------------------
    buildRoundaboutZone() {
      // Tọa độ tâm bùng binh chuẩn theo Waypoint 13 & Google Maps: (-336.0, -212.0)
      const rbCenter = new THREE.Vector3(-336.0, 0.05, -212.0);
      const rbGroup = new THREE.Group();
      rbGroup.position.copy(rbCenter);

      // 1. MẶT ĐƯỜNG VÒNG XUYẾN TRÒN 3 LÀN XE (Bán kính từ 16.5m đến 34.0m)
      const roadRingGeo = new THREE.RingGeometry(16.5, 34.0, 48);
      const roadRingMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.88,
        metalness: 0.1,
        side: THREE.DoubleSide
      });
      const roadRing = new THREE.Mesh(roadRingGeo, roadRingMat);
      roadRing.rotation.x = -Math.PI / 2;
      roadRing.position.y = 0.002;
      roadRing.receiveShadow = true;
      rbGroup.add(roadRing);

      // Vạch sơn trắng đứt đoạn phân làn xe trên vòng xuyến (Bán kính 22m & 28m)
      [22.0, 28.0].forEach(r => {
        const laneMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc, side: THREE.DoubleSide, depthWrite: false });
        for (let a = 0; a < 36; a++) {
          if (a % 2 === 0) {
            const arcGeo = new THREE.RingGeometry(r - 0.12, r + 0.12, 4, 1, (a / 36) * Math.PI * 2, (1 / 72) * Math.PI * 2);
            const arcMesh = new THREE.Mesh(arcGeo, laneMat);
            arcMesh.rotation.x = -Math.PI / 2;
            arcMesh.position.y = 0.006;
            rbGroup.add(arcMesh);
          }
        }
      });

      // 2. ĐẢO XANH TRUNG TÂM BÙNG BINH (Bán kính 16.0m - Thảm cỏ hoa văn chụp từ Street View Pano 22)
      const islandTex = this.getRealTexture('island_bungbinh_garden.jpg', 2, 2);
      const islandMat = new THREE.MeshStandardMaterial({
        map: islandTex,
        roughness: 0.70
      });
      const islandGeo = new THREE.CylinderGeometry(16.0, 16.2, 0.45, 40);
      const island = new THREE.Mesh(islandGeo, islandMat);
      island.position.y = 0.225;
      island.receiveShadow = true;
      rbGroup.add(island);

      // Gờ bó vỉa sơn vạch trắng đỏ phản quang viền quanh đảo tròn (Đặc trưng đô thị Việt Nam từ Pano 22)
      const curbCanvas = document.createElement('canvas');
      curbCanvas.width = 512;
      curbCanvas.height = 64;
      const cCtx = curbCanvas.getContext('2d');
      for (let x = 0; x < 512; x += 32) {
        cCtx.fillStyle = (Math.floor(x / 32) % 2 === 0) ? '#dc2626' : '#ffffff';
        cCtx.fillRect(x, 0, 32, 64);
      }
      const curbTex = new THREE.CanvasTexture(curbCanvas);
      curbTex.wrapS = THREE.RepeatWrapping;
      curbTex.repeat.set(4, 1);
      const curbGeo = new THREE.CylinderGeometry(16.35, 16.35, 0.35, 40, 1, true);
      const curbMat = new THREE.MeshStandardMaterial({ map: curbTex, roughness: 0.5 });
      const curb = new THREE.Mesh(curbGeo, curbMat);
      curb.position.y = 0.20;
      rbGroup.add(curb);

      // 3. VÀNH HOA TRANG TRÍ ĐỒNG TÂM CÔNG VIÊN BÙNG BINH (Vàng cúc vạn thọ & Đỏ xác pháo)
      const marigoldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.55 });
      const salviaMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.55 });
      const topiaryMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 });

      // Vành bồn hoa ngoài (Bán kính 13.8m): Thảm cúc vạn thọ vàng tươi
      for (let i = 0; i < 28; i++) {
        const ang = (i / 28) * Math.PI * 2;
        const fl1 = new THREE.Mesh(new THREE.SphereGeometry(0.32, 10, 8), (i % 2 === 0) ? marigoldMat : salviaMat);
        fl1.scale.set(1.2, 0.7, 1.2);
        fl1.position.set(Math.cos(ang) * 13.8, 0.38, Math.sin(ang) * 13.8);
        rbGroup.add(fl1);
      }

      // Vành bồn hoa trong (Bán kính 11.2m): Thảm hoa xác pháo đỏ thắm
      for (let i = 0; i < 22; i++) {
        const ang = (i / 22) * Math.PI * 2;
        const fl2 = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), (i % 2 === 0) ? salviaMat : marigoldMat);
        fl2.scale.set(1.2, 0.7, 1.2);
        fl2.position.set(Math.cos(ang) * 11.2, 0.36, Math.sin(ang) * 11.2);
        rbGroup.add(fl2);
      }

      // Cụm cây kiểng cắt tỉa hình cầu tròn thanh lịch xen kẽ (Bán kính 12.5m)
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2;
        const topiary = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 10), topiaryMat);
        topiary.position.set(Math.cos(ang) * 12.5, 0.55, Math.sin(ang) * 12.5);
        topiary.castShadow = true;
        rbGroup.add(topiary);
      }

      // Hàng rào trắng hoa văn trang trí bảo vệ bồn hoa
      const fenceMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.2 });
      for (let f = 0; f < 32; f++) {
        const fAng = (f / 32) * Math.PI * 2;
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.75, 6), fenceMat);
        post.position.set(Math.cos(fAng) * 15.2, 0.60, Math.sin(fAng) * 15.2);
        rbGroup.add(post);
      }

      // 4. THÁP BIỂU TƯỢNG VÀNG KIM NGỌC VÀ BỒN HOA TẦNG TRUNG TÂM (Chuẩn thực tế Vĩnh Yên Pano 22)
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35 });
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.2 });

      // Đế hoa cương 3 tầng
      const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 4.0, 0.45, 24), stoneMat);
      tier1.position.y = 0.45;
      rbGroup.add(tier1);

      const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.7, 0.5, 20), stoneMat);
      tier2.position.y = 0.9;
      rbGroup.add(tier2);

      // Trụ tháp điêu khắc vút cao thanh thoát (Cao 7.2m, không chắn tầm nhìn ngang của camera)
      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.75, 7.2, 16), stoneMat);
      spire.position.y = 0.9 + 3.6;
      spire.castShadow = true;
      rbGroup.add(spire);

      // Quả cầu biểu tượng ánh kim trên đỉnh tháp
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), goldMat);
      orb.position.y = 0.9 + 7.2;
      rbGroup.add(orb);

      // Vòng cánh hoa biểu tượng cách điệu
      for (let p = 0; p < 6; p++) {
        const pAng = (p / 6) * Math.PI * 2;
        const petal = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.4, 0.6), goldMat);
        petal.position.set(Math.cos(pAng) * 0.8, 0.9 + 5.5, Math.sin(pAng) * 0.8);
        petal.rotation.y = pAng;
        petal.rotation.z = Math.PI / 8;
        rbGroup.add(petal);
      }

      this.cityGroup.add(rbGroup);
    }

    // ------------------------------------------------------------
    // 4. VƯỜN CÂY CẢNH VŨ DẬU & NHÀ BÉ HÀ MY (ĐIỂM XUẤT PHÁT)
    // ------------------------------------------------------------
    buildHomeVuDauGarden() {
      const homePos = new THREE.Vector3(-930.9, 0, -319.4);
      const homeGroup = new THREE.Group();
      homeGroup.position.copy(homePos);

      // 1. SÂN GẠCH ĐỎ BÁT TRÀNG TRUYỀN THỐNG (TERRACOTTA HERRINGBONE BRICK COURTYARD)
      const yardGeo = new THREE.PlaneGeometry(36, 30);
      const yardCanvas = document.createElement('canvas');
      yardCanvas.width = 512; yardCanvas.height = 512;
      const yctx = yardCanvas.getContext('2d');
      yctx.fillStyle = '#b91c1c'; // Gạch đỏ đất nung Bát Tràng
      yctx.fillRect(0, 0, 512, 512);
      yctx.strokeStyle = '#7c2d12';
      yctx.lineWidth = 3;
      const bw = 64, bh = 32;
      for (let y = 0; y < 512; y += bh) {
        const shift = (Math.floor(y / bh) % 2) * (bw / 2);
        for (let x = -bw; x < 512 + bw; x += bw) {
          yctx.strokeRect(x + shift, y, bw, bh);
          yctx.fillStyle = (Math.sin(x * y) > 0) ? 'rgba(234, 88, 12, 0.18)' : 'rgba(154, 52, 18, 0.18)';
          yctx.fillRect(x + shift + 2, y + 2, bw - 4, bh - 4);
        }
      }
      // Viền rêu mềm mại ở các mạch vữa
      yctx.fillStyle = 'rgba(21, 128, 61, 0.3)';
      for (let r = 0; r < 50; r++) {
        yctx.fillRect(Math.random() * 512, Math.random() * 512, 4, 4);
      }
      const yardTex = new THREE.CanvasTexture(yardCanvas);
      yardTex.wrapS = THREE.RepeatWrapping; yardTex.wrapT = THREE.RepeatWrapping;
      yardTex.repeat.set(6, 5);

      const yardMat = new THREE.MeshStandardMaterial({ map: yardTex, roughness: 0.65 });
      const yard = new THREE.Mesh(yardGeo, yardMat);
      yard.rotation.x = -Math.PI / 2;
      yard.position.set(0, 0.06, 0);
      yard.receiveShadow = true;
      homeGroup.add(yard);

      // 2. NGÔI NHÀ VƯỜN BIỆT THỰ INDOCHINE 2 TẦNG MÁI NGÓI ĐỎ BÉ HÀ MY
      const houseGeo = new THREE.BoxGeometry(18, 9.5, 12);
      const houseMat = new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.55 });
      const house = new THREE.Mesh(houseGeo, houseMat);
      house.position.set(0, 4.75, -16.0);
      house.castShadow = true;
      house.receiveShadow = true;
      homeGroup.add(house);

      // Mặt tiền nhà vườn biệt thự Indochine ấm cúng (Cửa chớp Pháp, ban công hoa giấy, không có biển thương mại)
      const villaMat = this.getRealFacadeMat('facade_vudau_residence.jpg', { roughness: 0.5 });
      const villaFacade = new THREE.Mesh(new THREE.PlaneGeometry(18, 9.5), villaMat);
      villaFacade.position.set(0, 4.75, -9.95);
      villaFacade.castShadow = true;
      homeGroup.add(villaFacade);

      // Mái ngói dốc truyền thống
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(14, 4.8, 4),
        new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.4 })
      );
      roof.position.set(0, 11.5, -16.0);
      roof.rotation.y = Math.PI / 4;
      homeGroup.add(roof);

      // Bức tường sân vườn hàng trăm thế Bonsai phía sau ảnh thực tế (Pano 01)
      const courtMat = this.getRealFacadeMat('facade_vudau_courtyard.jpg');
      const courtBackdrop = new THREE.Mesh(new THREE.PlaneGeometry(28, 7.5), courtMat);
      courtBackdrop.position.set(0, 3.75, -22.2);
      homeGroup.add(courtBackdrop);

      // 3. CỔNG TAM QUAN & BIỂN ĐẠI TỰ GỖ GỤ THẾP VÀNG "VƯỜN CÂY CẢNH VŨ DẬU" (100% RÕ NÉT, HOÀN TOÀN KHÔNG BỊ CHE KHUẤT)
      const gateGroup = new THREE.Group();
      gateGroup.position.set(0, 0, -6.8);

      const pillarMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.65 });
      const stoneBaseMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
      const tileMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.4 });
      const beamMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8 });

      // Trụ cổng xây gạch quét vôi trắng cao 5.8m có chân đế đá mài
      [-5.2, 5.2].forEach(px => {
        // Chân đế đá khối vững chãi
        const base = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 1.4), stoneBaseMat);
        base.position.set(px, 0.3, 0);
        base.castShadow = true;
        gateGroup.add(base);

        // Thân trụ cổng chính
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(1.1, 5.4, 1.1), pillarMat);
        pillar.position.set(px, 3.3, 0);
        pillar.castShadow = true;
        gateGroup.add(pillar);

        // Mái che mini đầu trụ cổng lợp ngói vảy rồng
        const cap = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.55, 4), tileMat);
        cap.position.set(px, 6.25, 0);
        cap.rotation.y = Math.PI / 4;
        gateGroup.add(cap);
      });

      // Xà ngang hạ (Architrave) ở độ cao 3.45m - Xe Honda Vision lái qua thông thoáng
      const lowerBeam = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.38, 0.7), beamMat);
      lowerBeam.position.set(0, 3.45, 0);
      lowerBeam.castShadow = true;
      gateGroup.add(lowerBeam);

      // Bức trán cổng (Header Wall) làm nền vững chãi đỡ biển hiệu đại tự
      const headerWall = new THREE.Mesh(
        new THREE.BoxGeometry(10.0, 1.85, 0.45),
        new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.7 })
      );
      headerWall.position.set(0, 4.55, 0.05);
      headerWall.castShadow = true;
      gateGroup.add(headerWall);

      // Xà ngang thượng (Upper Beam) ở độ cao 5.65m đỡ rui mè mái ngói
      const upperBeam = new THREE.Mesh(new THREE.BoxGeometry(11.4, 0.35, 0.7), beamMat);
      upperBeam.position.set(0, 5.65, 0);
      upperBeam.castShadow = true;
      gateGroup.add(upperBeam);

      // Mái ngói cong cổ truyền che nắng mưa nằm HOÀN TOÀN TRÊN CAO (Y = 5.95m), tuyệt đối KHÔNG cắt ngang biển hiệu
      const gateRoof = new THREE.Mesh(new THREE.BoxGeometry(11.8, 0.32, 1.6), tileMat);
      gateRoof.position.set(0, 5.95, 0.15);
      gateRoof.rotation.x = -0.15;
      gateRoof.castShadow = true;
      gateGroup.add(gateRoof);

      // Bờ nóc đỉnh ngói
      const roofRidge = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 11.8, 8), tileMat);
      roofRidge.rotation.z = Math.PI / 2;
      roofRidge.position.set(0, 6.18, -0.45);
      gateGroup.add(roofRidge);

      // BIỂN ĐẠI TỰ GỖ GỤ SƠN MÀI DÁT VÀNG THẾP 9999
      const signCanvas = document.createElement('canvas');
      signCanvas.width = 1024;
      signCanvas.height = 260;
      const sctx = signCanvas.getContext('2d');

      // Nền gỗ gụ sơn mài đỏ sẫm sang trọng
      sctx.fillStyle = '#1c0a00';
      sctx.roundRect(10, 10, 1004, 240, 20);
      sctx.fill();

      // Khung viền thếp vàng chạm trổ đôi hoa văn cổ truyền
      sctx.strokeStyle = '#facc15';
      sctx.lineWidth = 10;
      sctx.roundRect(16, 16, 992, 228, 16);
      sctx.stroke();

      sctx.strokeStyle = '#eab308';
      sctx.lineWidth = 3;
      sctx.roundRect(28, 28, 968, 204, 10);
      sctx.stroke();

      // Dòng tiêu đề chính: VƯỜN CÂY CẢNH VŨ DẬU
      sctx.textAlign = 'center';
      sctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
      sctx.shadowBlur = 10;
      sctx.shadowOffsetY = 4;

      sctx.font = '900 56px "Nunito", Arial, sans-serif';
      sctx.fillStyle = '#fde047';
      sctx.fillText('🌿 VƯỜN CÂY CẢNH VŨ DẬU 🌿', 512, 85);

      // Dòng phụ đề 1: Cội Nhà Tâm Hồn & Nghệ Thuật Bonsai
      sctx.font = '800 28px "Nunito", Arial, sans-serif';
      sctx.fillStyle = '#ffffff';
      sctx.fillText('CỘI NHÀ TÂM HỒN • NGHỆ THUẬT BONSAI CỔ THỤ & HOA LAN ĐỘT BIẾN', 512, 146);

      // Dòng phụ đề 2: Ngôi Nhà Thân Yêu Bé Hà My
      sctx.font = '900 26px "Nunito", Arial, sans-serif';
      sctx.fillStyle = '#facc15';
      sctx.fillText('ĐÍCH ĐẾN: NGÔI NHÀ THÂN YÊU CỦA BÉ HÀ MY (LỚP 5C4)', 512, 202);

      const signTex = new THREE.CanvasTexture(signCanvas);
      const signMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(9.6, 1.65),
        new THREE.MeshStandardMaterial({
          map: signTex,
          roughness: 0.35,
          metalness: 0.15,
          side: THREE.DoubleSide
        })
      );
      // Gắn chắc chắn trên mặt phẳng bức trán cổng: nằm hoàn toàn giữa xà hạ (3.45m) và xà thượng (5.65m)
      signMesh.position.set(0, 4.55, 0.32);
      gateGroup.add(signMesh);

      homeGroup.add(gateGroup);

      // Sắp xếp các chậu Bonsai nghệ thuật Việt Nam cao cấp men theo 2 bên và tường hiên
      // 1. Dãy Bonsai bên trái sân (px = -11.0)
      for (let i = 0; i < 6; i++) {
        const pz = -11.5 + i * 4.0;
        const bonsai = this.createAnimeBonsaiMesh(i);
        bonsai.position.set(-11.0, 0.06, pz);
        bonsai.rotation.y = (i % 2 === 0) ? 0.3 : -0.3;
        homeGroup.add(bonsai);
      }

      // 2. Dãy Bonsai bên phải sân (px = 11.0)
      for (let i = 0; i < 6; i++) {
        const pz = -11.5 + i * 4.0;
        const bonsai = this.createAnimeBonsaiMesh(i + 1);
        bonsai.position.set(11.0, 0.06, pz);
        bonsai.rotation.y = (i % 2 === 0) ? -0.35 : 0.25;
        homeGroup.add(bonsai);
      }

      // 3. Hàng chậu Bonsai thế cổ thụ xếp bên trong khuôn viên sân (pz = -11.0, không chắn lối vào cổng)
      [-8.5, -6.2, 6.2, 8.5].forEach((px, idx) => {
        const bonsai = this.createAnimeBonsaiMesh(idx + 2);
        bonsai.position.set(px, 0.06, -11.0);
        homeGroup.add(bonsai);
      });

      // 4. BỘ BÀN GHẾ ĐÁ MÀI UỐNG TRÀ CÂY CẢNH TRUYỀN THỐNG (Góc hiên bên phải)
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.35 });
      const tableGroup = new THREE.Group();
      tableGroup.position.set(6.5, 0.06, -3.5);
      const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.08, 16), stoneMat);
      tableTop.position.y = 0.72;
      tableGroup.add(tableTop);
      const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.68, 12), stoneMat);
      tableLeg.position.y = 0.34;
      tableGroup.add(tableLeg);

      // Ấm trà & chén trà sứ
      const teaPot = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0x15803d }));
      teaPot.position.set(0, 0.82, 0);
      tableGroup.add(teaPot);

      // 4 đôn đá ngồi
      for (let d = 0; d < 4; d++) {
        const dang = (d / 4) * Math.PI * 2;
        const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.42, 12), stoneMat);
        stool.position.set(Math.cos(dang) * 1.35, 0.21, Math.sin(dang) * 1.35);
        tableGroup.add(stool);
      }
      homeGroup.add(tableGroup);

      this.cityGroup.add(homeGroup);

      // 4b. ĐOẠN PHỐ LÊ LỢI & SHOWROOM NHÔM KÍNH PRIDE WINDOWS (Theo Pano 02 Street View)
      const leLoiGroup = new THREE.Group();
      leLoiGroup.position.set(-835.0, 0, -305.0);

      // Showroom Pride Windows (Bên trái đường - Mặt tiền ảnh thực tế Pano 02)
      const showroom = new THREE.Group();
      showroom.position.set(12.0, 0, 10.0);
      showroom.rotation.y = -Math.PI / 2.5;

      const srBody = new THREE.Mesh(
        new THREE.BoxGeometry(16, 9.5, 10),
        new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.5 })
      );
      srBody.position.set(0, 4.75, 5.0);
      srBody.castShadow = true;
      showroom.add(srBody);

      // Mặt tiền ảnh chụp thực tế Showroom Pride Windows & Austdoor
      const srMat = this.getRealFacadeMat('facade_pride_windows.jpg');
      const srFacade = new THREE.Mesh(new THREE.PlaneGeometry(16, 9.5), srMat);
      srFacade.position.set(0, 4.75, -0.05);
      srFacade.castShadow = true;
      showroom.add(srFacade);

      leLoiGroup.add(showroom);

      // Biệt thự Pháp Cổ Phố Lê Lợi (ảnh thực tế Pano 02)
      const villaLeLoi = this.createRealBuildingMesh(12, 11, 10, 'facade_leloi_villa.jpg', 0xfef08a, { floors: 3 });
      villaLeLoi.position.set(28.0, 0, 18.0);
      villaLeLoi.rotation.y = -Math.PI / 2.5;
      leLoiGroup.add(villaLeLoi);

      // Xe Toyota Vios vàng cát đỗ lề đường (như ảnh Pano 02)
      const viosGoldGroup = this.createAnimeCarMesh('sedan', 0xd4c5a9, '88A-198.54');
      viosGoldGroup.position.set(-6.0, 0.05, -5.0);
      viosGoldGroup.rotation.y = 0.5;
      leLoiGroup.add(viosGoldGroup);

      this.cityGroup.add(leLoiGroup);
    }

    // ------------------------------------------------------------
    // 4.5. DỰNG CẢNH QUAN HỒ NƯỚC, CÔNG VIÊN & ĐỊA DANH CHUẨN GOOGLE MAPS
    // Hồ Trại Ổi, Hồ Tỉnh Uỷ, Vườn Hoa UB Thành Phố, Đại Lộ Kim Ngọc & Các Điểm Landmark
    // ------------------------------------------------------------
    buildLakesAndParksGoogleMaps() {
      const gmapsGroup = new THREE.Group();

      // ==========================================================
      // A. HỒ TRẠI ỔI (PHÍA BẮC BÙNG BINH KIM NGỌC - ĐƯỜNG HÀ HUY TẬP)
      // ==========================================================
      const lakeTraiOiGroup = new THREE.Group();
      lakeTraiOiGroup.position.set(-290.0, 0, -325.0);

      // Mặt nước Hồ Trại Ổi uốn lượn kẹp giữa Kim Ngọc và Hà Huy Tập
      const waterMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        roughness: 0.18,
        metalness: 0.82,
        transparent: true,
        opacity: 0.88,
        side: THREE.DoubleSide
      });

      const waterTraiOi = new THREE.Mesh(new THREE.PlaneGeometry(115, 68), waterMat);
      waterTraiOi.rotation.x = -Math.PI / 2;
      waterTraiOi.rotation.z = -Math.PI / 5;
      waterTraiOi.position.y = 0.03;
      lakeTraiOiGroup.add(waterTraiOi);

      // Kè đá bờ hồ bê tông kiên cố
      const bankTraiOi = new THREE.Mesh(
        new THREE.BoxGeometry(118, 0.45, 71),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.75 })
      );
      bankTraiOi.position.y = 0.12;
      bankTraiOi.rotation.y = -Math.PI / 5;
      lakeTraiOiGroup.add(bankTraiOi);

      // Hàng cây liễu rủ bóng ven Hồ Trại Ổi
      const willowTrunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.8 });
      const willowLeafMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 });
      for (let w = -45; w <= 45; w += 18) {
        const wt = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 3.2, 8), willowTrunkMat);
        wt.position.set(w, 1.6, 28);
        lakeTraiOiGroup.add(wt);

        const wl = new THREE.Mesh(new THREE.ConeGeometry(2.4, 3.8, 8), willowLeafMat);
        wl.position.set(w, 4.2, 28);
        lakeTraiOiGroup.add(wl);
      }

      // Biển tên chỉ dẫn Google Maps: 🌊 HỒ TRẠI ỔI
      const toSignCanvas = document.createElement('canvas');
      toSignCanvas.width = 512;
      toSignCanvas.height = 160;
      const toctx = toSignCanvas.getContext('2d');
      toctx.fillStyle = '#0284c7';
      toctx.roundRect(8, 8, 496, 144, 20);
      toctx.fill();
      toctx.strokeStyle = '#ffffff';
      toctx.lineWidth = 8;
      toctx.stroke();
      toctx.fillStyle = '#ffffff';
      toctx.font = '900 46px "Nunito", Arial';
      toctx.textAlign = 'center';
      toctx.fillText('🌊 HỒ TRẠI ỔI', 256, 75);
      toctx.font = 'bold 24px "Nunito", Arial';
      toctx.fillStyle = '#fef08a';
      toctx.fillText('KHU ĐÔ THỊ ĐỒI CAO - KIM NGỌC', 256, 120);

      const toSignMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(6.4, 2.0),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(toSignCanvas) })
      );
      toSignMesh.position.set(-15, 1.2, 32);
      lakeTraiOiGroup.add(toSignMesh);

      // Bảng ngắm cảnh ảnh thực tế Hồ Trại Ổi (Trích xuất từ Google Street View Pano 22)
      const toPhotoMat = this.getRealFacadeMat('lake_traioi_view.jpg');
      const toPhotoMesh = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 4.2), toPhotoMat);
      toPhotoMesh.position.set(-15, 4.2, 32);
      lakeTraiOiGroup.add(toPhotoMesh);

      gmapsGroup.add(lakeTraiOiGroup);

      // ==========================================================
      // B. HỒ TỈNH UỶ & QUẦN THỂ ĐẦM VẠC (PHÍA NAM TUYẾN ĐƯỜNG)
      // ==========================================================
      const lakeTinhUyGroup = new THREE.Group();
      lakeTinhUyGroup.position.set(-490.0, 0, -90.0);

      const waterTinhUy = new THREE.Mesh(new THREE.PlaneGeometry(210, 135), waterMat);
      waterTinhUy.rotation.x = -Math.PI / 2;
      waterTinhUy.position.y = 0.03;
      lakeTinhUyGroup.add(waterTinhUy);

      // Đường dạo bộ ven hồ Tỉnh Uỷ lát gạch đỏ
      const walkTinhUy = new THREE.Mesh(
        new THREE.PlaneGeometry(216, 14),
        new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.7 })
      );
      walkTinhUy.rotation.x = -Math.PI / 2;
      walkTinhUy.position.set(0, 0.07, -72);
      lakeTinhUyGroup.add(walkTinhUy);

      // Lan can đá ven hồ Tỉnh Uỷ
      const railMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 });
      for (let rx = -95; rx <= 95; rx += 12) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.1, 8), railMat);
        post.position.set(rx, 0.55, -65);
        lakeTinhUyGroup.add(post);
      }
      const topRail = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 200, 8), railMat);
      topRail.rotation.z = Math.PI / 2;
      topRail.position.set(0, 1.05, -65);
      lakeTinhUyGroup.add(topRail);

      // Biển tên chỉ dẫn: 🌊 HỒ TỈNH ỦY - ĐẦM VẠC
      const tuSignCanvas = document.createElement('canvas');
      tuSignCanvas.width = 512;
      tuSignCanvas.height = 160;
      const tuctx = tuSignCanvas.getContext('2d');
      tuctx.fillStyle = '#0369a1';
      tuctx.roundRect(8, 8, 496, 144, 20);
      tuctx.fill();
      tuctx.strokeStyle = '#38bdf8';
      tuctx.lineWidth = 8;
      tuctx.stroke();
      tuctx.fillStyle = '#ffffff';
      tuctx.font = '900 46px "Nunito", Arial';
      tuctx.textAlign = 'center';
      tuctx.fillText('🌊 HỒ TỈNH ỦY', 256, 75);
      tuctx.font = 'bold 24px "Nunito", Arial';
      tuctx.fillStyle = '#fef08a';
      tuctx.fillText('DANH THẮNG ĐẦM VẠC VĨNH YÊN', 256, 120);

      const tuSignMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(6.4, 2.0),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(tuSignCanvas) })
      );
      tuSignMesh.position.set(20, 1.2, -68);
      lakeTinhUyGroup.add(tuSignMesh);

      // Bảng ngắm cảnh ảnh thực tế Hồ Tỉnh Ủy & Đầm Vạc (Trích xuất từ Google Street View Pano 27)
      const tuPhotoMat = this.getRealFacadeMat('lake_tinhuy_view.jpg');
      const tuPhotoMesh = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 4.2), tuPhotoMat);
      tuPhotoMesh.position.set(20, 4.2, -68);
      lakeTinhUyGroup.add(tuPhotoMesh);

      gmapsGroup.add(lakeTinhUyGroup);

      // ==========================================================
      // C. VƯỜN HOA UB THÀNH PHỐ (BẮC ĐẠI LỘ HÙNG VƯƠNG)
      // Công viên hình bầu dục màu xanh tươi với lối đi dạo, đài phun nước & bồn hoa
      // ==========================================================
      const parkGroup = new THREE.Group();
      parkGroup.position.set(-545.0, 0, -298.0);

      // Nền cỏ công viên bầu dục xanh mát
      const parkLawn = new THREE.Mesh(
        new THREE.CylinderGeometry(42, 42, 0.35, 32),
        new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.85 })
      );
      parkLawn.scale.set(1.9, 1.0, 0.85); // Hình bầu dục trải dài theo Hùng Vương
      parkLawn.position.y = 0.15;
      parkGroup.add(parkLawn);

      // Lối đi dạo lát đá uốn lượn
      const pathRing = new THREE.Mesh(
        new THREE.RingGeometry(24, 28, 32),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.65, side: THREE.DoubleSide })
      );
      pathRing.rotation.x = -Math.PI / 2;
      pathRing.scale.set(1.7, 0.8, 1.0);
      pathRing.position.y = 0.34;
      parkGroup.add(pathRing);

      // Đài phun nước trung tâm công viên
      const fountainBasin = new THREE.Mesh(
        new THREE.CylinderGeometry(5.5, 5.5, 0.7, 24),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.5 })
      );
      fountainBasin.position.y = 0.5;
      parkGroup.add(fountainBasin);

      const waterJet = new THREE.Mesh(
        new THREE.ConeGeometry(1.6, 5.2, 16),
        new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.75 })
      );
      waterJet.position.y = 3.2;
      parkGroup.add(waterJet);

      // Các bồn hoa rực rỡ sắc màu (hoa hồng, cúc vạn thọ)
      const flowerColors = [0xef4444, 0xf59e0b, 0xec4899, 0xa855f7];
      for (let f = 0; f < 8; f++) {
        const fang = (f / 8) * Math.PI * 2;
        const fx = Math.cos(fang) * 48;
        const fz = Math.sin(fang) * 20;

        const fBed = new THREE.Mesh(
          new THREE.CylinderGeometry(3.2, 3.4, 0.45, 16),
          new THREE.MeshStandardMaterial({ color: flowerColors[f % flowerColors.length], roughness: 0.6 })
        );
        fBed.position.set(fx, 0.45, fz);
        parkGroup.add(fBed);
      }

      // Cổng chào & Biển tên: 🌳 VƯỜN HOA UB THÀNH PHỐ
      const parkSignCanvas = document.createElement('canvas');
      parkSignCanvas.width = 1024;
      parkSignCanvas.height = 256;
      const psctx = parkSignCanvas.getContext('2d');
      psctx.fillStyle = '#15803d';
      psctx.roundRect(10, 10, 1004, 236, 24);
      psctx.fill();
      psctx.strokeStyle = '#fef08a';
      psctx.lineWidth = 12;
      psctx.stroke();
      psctx.fillStyle = '#ffffff';
      psctx.font = '900 60px "Nunito", Arial';
      psctx.textAlign = 'center';
      psctx.fillText('🌳 VƯỜN HOA UB THÀNH PHỐ', 512, 100);
      psctx.font = 'bold 36px "Nunito", Arial';
      psctx.fillStyle = '#fef08a';
      psctx.fillText('CÔNG VIÊN ĐẠI LỘ HÙNG VƯƠNG - VĨNH YÊN', 512, 180);

      const parkSignMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(12.0, 3.0),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(parkSignCanvas) })
      );
      parkSignMesh.position.set(0, 3.2, 28);
      parkGroup.add(parkSignMesh);

      gmapsGroup.add(parkGroup);

      // ==========================================================
      // D. ĐẠI LỘ KIM NGỌC (NỐI QUA BÙNG BINH LÊN PHÍA BẮC)
      // ==========================================================
      const knGroup = new THREE.Group();
      const knRoadGeo = new THREE.PlaneGeometry(160, 14);
      const knRoadMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.88, side: THREE.DoubleSide });
      const knRoad = new THREE.Mesh(knRoadGeo, knRoadMat);
      knRoad.rotation.x = -Math.PI / 2;
      knRoad.rotation.z = -Math.PI / 3.8;
      knRoad.position.set(-330.0, 0.052, -215.0);
      knGroup.add(knRoad);

      // Dải phân cách hoa vàng Đại Lộ Kim Ngọc
      const knMedGeo = new THREE.BoxGeometry(158, 0.35, 1.2);
      const knMedMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });
      const knMed = new THREE.Mesh(knMedGeo, knMedMat);
      knMed.rotation.y = -Math.PI / 3.8;
      knMed.position.set(-330.0, 0.18, -215.0);
      knGroup.add(knMed);

      gmapsGroup.add(knGroup);

      // ==========================================================
      // ==========================================================
      // E. CÁC TÒA NHÀ LANDMARK ĐẶC TRƯNG CHUẨN GOOGLE STREET VIEW
      // 1. Tòa Nhà Bưu Điện Tỉnh Vĩnh Phúc (VNPT) - 6 Tầng Mặt Kính Cong (Chuẩn 100% Pano 22)
      // ==========================================================
      const postOfficeGroup = new THREE.Group();
      postOfficeGroup.position.set(-296.0, 0, -256.0);
      postOfficeGroup.lookAt(-336.0, 0, -212.0); // Mặt tiền hướng thẳng về tâm bùng binh

      // Khối nhà chính 6 tầng
      const poBuilding = new THREE.Mesh(
        new THREE.BoxGeometry(26, 20, 16),
        new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.6 })
      );
      poBuilding.position.set(0, 10.0, 8.0);
      poBuilding.castShadow = true;
      poBuilding.receiveShadow = true;
      postOfficeGroup.add(poBuilding);

      // Mặt tiền ảnh chụp thực tế Bưu Điện Tỉnh Vĩnh Phúc VNPT hướng ra bùng binh
      const vnptMat = this.getRealFacadeMat('facade_buudien_vnpt.jpg', { roughness: 0.45 });
      const vnptFacade = new THREE.Mesh(new THREE.PlaneGeometry(26, 20), vnptMat);
      vnptFacade.position.set(0, 10.0, 16.05);
      vnptFacade.castShadow = true;
      postOfficeGroup.add(vnptFacade);

      // Biển vẫy LED VNPT Bưu Điện Tỉnh Vĩnh Phúc vuông góc mặt tiền
      const poBlade = this.createProjectingBladeSign('VNPT', 'BƯU ĐIỆN VĨNH PHÚC', '#0284c7', '#ffffff', '#fde047', 'round');
      poBlade.position.set(13.2, 5.2, 16.0);
      postOfficeGroup.add(poBlade);

      // Xe ô tô màu trắng đỗ trước sảnh Bưu Điện (như ảnh Pano 22)
      const poCarGroup = this.createAnimeCarMesh('sedan', 0xf8fafc, '88A-088.66');
      poCarGroup.position.set(5.5, 0.05, 19.8);
      poCarGroup.rotation.y = 0.3;
      postOfficeGroup.add(poCarGroup);

      // Chữ sơn quảng cáo dịch vụ vá xe trên bó vỉa hè (chi tiết đời thực từ Pano 22!)
      const vaXeCanvas = document.createElement('canvas');
      vaXeCanvas.width = 256;
      vaXeCanvas.height = 64;
      const vxCtx = vaXeCanvas.getContext('2d');
      vxCtx.fillStyle = 'rgba(0,0,0,0)';
      vxCtx.fillRect(0, 0, 256, 64);
      vxCtx.fillStyle = '#0f172a';
      vxCtx.font = 'bold 24px Arial, sans-serif';
      vxCtx.fillText('0973.492.856 VÁ XE', 10, 42);
      const vaXeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.2, 0.8),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(vaXeCanvas), transparent: true, depthWrite: false })
      );
      vaXeMesh.rotation.x = -Math.PI / 2;
      vaXeMesh.position.set(-6.5, 0.056, -6.5);
      postOfficeGroup.add(vaXeMesh);

      gmapsGroup.add(postOfficeGroup);

      // 1b. Cổng Chào Nghệ Thuật Biểu Tượng Vĩnh Phúc (Cạnh Bùng Binh phía Công Viên - Pano 22)
      const welcomeArchGroup = new THREE.Group();
      welcomeArchGroup.position.set(-372.0, 0, -175.0);
      welcomeArchGroup.lookAt(-336.0, 0, -212.0);

      const archSteelMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.2 });
      const archGoldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.6, roughness: 0.3 });

      // Khung vòm nghệ thuật
      const archPillar1 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.55, 9.5, 12), archSteelMat);
      archPillar1.position.set(-8.5, 4.75, 0);
      welcomeArchGroup.add(archPillar1);

      const archPillar2 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.55, 9.5, 12), archSteelMat);
      archPillar2.position.set(8.5, 4.75, 0);
      welcomeArchGroup.add(archPillar2);

      const archSpan = new THREE.Mesh(new THREE.BoxGeometry(18.0, 1.4, 0.8), archGoldMat);
      archSpan.position.set(0, 9.5, 0);
      welcomeArchGroup.add(archSpan);

      // Biểu tượng đóa hoa Vĩnh Phúc & Cổng chào nghệ thuật (Ảnh chụp thực tế từ Pano 22)
      const archMat = this.getRealFacadeMat('arch_congchao_vinhphuc.jpg');
      const vpLogoMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(16.0, 3.8),
        archMat
      );
      vpLogoMesh.position.set(0, 11.2, 0.05);
      welcomeArchGroup.add(vpLogoMesh);

      gmapsGroup.add(welcomeArchGroup);

      // 2. Tiệm Bánh La Baker (Đường Ngô Quyền - X = -215, Z = -75)
      const laBakerGroup = new THREE.Group();
      laBakerGroup.position.set(-218.0, 0, -78.0);
      laBakerGroup.lookAt(-220.0, 0, -62.0);

      const lbHouse = new THREE.Mesh(
        new THREE.BoxGeometry(11, 10, 9),
        new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.4 })
      );
      lbHouse.position.y = 5.0;
      laBakerGroup.add(lbHouse);

      const lbSignCanvas = document.createElement('canvas');
      lbSignCanvas.width = 512;
      lbSignCanvas.height = 128;
      const lbctx = lbSignCanvas.getContext('2d');
      lbctx.fillStyle = '#ea580c';
      lbctx.fillRect(0, 0, 512, 128);
      lbctx.fillStyle = '#ffffff';
      lbctx.font = '900 40px "Nunito", Arial';
      lbctx.textAlign = 'center';
      lbctx.fillText('☕ LA BAKER', 256, 52);
      lbctx.font = 'bold 22px "Nunito", Arial';
      lbctx.fillStyle = '#fef08a';
      lbctx.fillText('BAKERY & COFFEE SPECIALTY', 256, 95);

      const lbSign = new THREE.Mesh(
        new THREE.PlaneGeometry(6.2, 1.6),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(lbSignCanvas) })
      );
      lbSign.position.set(0, 4.8, 4.6);
      laBakerGroup.add(lbSign);
      gmapsGroup.add(laBakerGroup);

      // 3. Tiệm Bánh Hưng Yên Bakery (Gần Ngã Ba Hùng Vương - Lê Lợi: X = -820, Z = -282)
      const hyBakerGroup = new THREE.Group();
      hyBakerGroup.position.set(-820.0, 0, -282.0);
      hyBakerGroup.lookAt(-828.0, 0, -300.0);

      const hyHouse = new THREE.Mesh(
        new THREE.BoxGeometry(10, 9.5, 9),
        new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.4 })
      );
      hyHouse.position.y = 4.75;
      hyBakerGroup.add(hyHouse);

      const hySignCanvas = document.createElement('canvas');
      hySignCanvas.width = 512;
      hySignCanvas.height = 128;
      const hyctx = hySignCanvas.getContext('2d');
      hyctx.fillStyle = '#c2410c';
      hyctx.fillRect(0, 0, 512, 128);
      hyctx.fillStyle = '#ffffff';
      hyctx.font = '900 36px "Nunito", Arial';
      hyctx.textAlign = 'center';
      hyctx.fillText('🥐 HƯNG YÊN BAKERY', 256, 52);
      hyctx.font = 'bold 22px "Nunito", Arial';
      hyctx.fillStyle = '#fef08a';
      hyctx.fillText('BÁNH MÌ PATE & BÁNH NGỌT TƯƠI', 256, 95);

      const hySign = new THREE.Mesh(
        new THREE.PlaneGeometry(6.0, 1.5),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(hySignCanvas) })
      );
      hySign.position.set(0, 4.6, 4.6);
      hyBakerGroup.add(hySign);

      // Biển vẫy LED Hưng Yên Bakery vuông góc mặt tiền
      const hyBlade = this.createProjectingBladeSign('HƯNG YÊN', 'BAKERY & BÁNH MÌ', '#c2410c', '#fff7ed', '#fde047', 'round');
      hyBlade.position.set(5.2, 3.8, 4.6);
      hyBakerGroup.add(hyBlade);

      gmapsGroup.add(hyBakerGroup);

      this.cityGroup.add(gmapsGroup);
    }

    // ------------------------------------------------------------
    // 5. DÃY NHÀ PHỐ & CỬA HÀNG VIỆT NAM CHÂN THỰC DỌC TUYẾN PHỐ
    // Tái tạo phong cách Nhà Ống 3-4 Tầng, Cửa Cuốn, Mái Hiên Di Động, Biển Hiệu Hiflex
    // ------------------------------------------------------------
    buildUrbanShophouses() {
      const houseGroup = new THREE.Group();
      const shopData = [
        { name: 'PHỞ BÒ GIA TRUYỀN HÀ NỘI', sub: 'ĐC: 86 NGÔ QUYỀN - ĐT: 0983.123.456', bg: '#991b1b', fg: '#fef08a' },
        { name: 'WINMART+ TIỆN LỢI TƯƠI NGON', sub: 'MỞ CỬA 6H00 - 22H00 MỖI NGÀY', bg: '#b91c1c', fg: '#ffffff' },
        { name: 'NHÀ THUỐC LONG CHÂU', sub: 'CHUẨN GPP - DƯỢC PHẨM CHÍNH HÃNG', bg: '#1d4ed8', fg: '#ffffff' },
        { name: 'CÀ PHÊ PHỐ VĨNH YÊN', sub: 'CÀ PHÊ MUỐI & TRÀ TRÁI CÂY TƯƠI', bg: '#78350f', fg: '#fef08a' },
        { name: 'BÁNH MÌ PATE ĐÀ NẴNG', sub: 'NÓNG GIÒN - CHẢ BÒ ĐẶC BIỆT', bg: '#ea580c', fg: '#ffffff' },
        { name: 'TRÀ SỮA TOCOTOCO & CHANH', sub: 'TRÀ SỮA TRÂN CHÂU HOÀNG GIA', bg: '#d97706', fg: '#ffffff' },
        { name: 'CẮT TÓC NAM NỮ HẢI BARBER', sub: 'UỐN NHUỘM TẠO KIỂU CHUYÊN NGHIỆP', bg: '#0f172a', fg: '#38bdf8' },
        { name: 'TẠP HÓA CÔ LAN', sub: 'BÁNH KẸO - NƯỚC GIẢI KHÁT - ĐỒ DÙNG', bg: '#15803d', fg: '#fef08a' },
        { name: 'CƠM VĂN PHÒNG BÌNH DÂN', sub: 'CƠM SƯỜN - BÚN CHẢ HÀ NỘI', bg: '#b45309', fg: '#ffffff' },
        { name: 'THỜI TRANG BÉ YÊU 5C4', sub: 'QUẦN ÁO TRẺ EM CAO CẤP', bg: '#db2777', fg: '#ffffff' }
      ];

      const wallColors = [0xfef08a, 0xfde047, 0xfef3c7, 0xa7f3d0, 0xfbcfe8, 0xbae6fd, 0xf1f5f9];

      for (let s = 3; s < this.routePoints.length - 2; s += 2) {
        // Bỏ qua các điểm waypoint 24 Ngô Quyền, ngã ba Lê Xoay và tiếp giáp vòng xuyến Bùng Binh Ngô Quyền
        if ((s >= 5 && s <= 7) || (s >= 10 && s <= 16)) continue;

        const pt = this.routePoints[s];
        // Không sinh nhà nếu waypoint quá gần tâm vòng xuyến (-325, -220)
        if (Math.hypot(pt.x - (-325.0), pt.z - (-220.0)) < 42.0) continue;

        const nextPt = this.routePoints[s + 1] || pt;
        const tangent = new THREE.Vector3(nextPt.x - pt.x, 0, nextPt.z - pt.z).normalize();
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

        [-1, 1].forEach((sideMult, sIdx) => {
          const distFromCenter = 16.5 + Math.random() * 1.5;
          const shopPos = new THREE.Vector3().copy(pt).addScaledVector(normal, sideMult * distFromCenter);

          // 1. TUYỆT ĐỐI KHÔNG SINH NHÀ TRONG PHẠM VI 55M QUANH VÒNG XUYẾN BÙNG BINH NGÔ QUYỀN
          if (Math.hypot(shopPos.x - (-325.0), shopPos.z - (-220.0)) < 55.0) return;

          // 2. TUYỆT ĐỐI KHÔNG ĐÈ LÊN HỒ TRẠI ỔI (-290, -325)
          if (Math.hypot(shopPos.x - (-290.0), shopPos.z - (-325.0)) < 65.0) return;

          // 3. TUYỆT ĐỐI KHÔNG ĐÈ LÊN VƯỜN HOA UB THÀNH PHỐ (-545, -298)
          if (Math.hypot(shopPos.x - (-545.0), shopPos.z - (-298.0)) < 60.0) return;

          // 4. TUYỆT ĐỐI KHÔNG ĐÈ LÊN VƯỜN CÂY CẢNH VŨ DẬU (-930.9, -319.4)
          if (Math.hypot(shopPos.x - (-930.9), shopPos.z - (-319.4)) < 45.0) return;

          // 5. TUYỆT ĐỐI KHÔNG ĐÈ LÊN KHU VỰC CỔNG TRƯỜNG & PHỐ TRẦN QUỐC TUẤN
          if (Math.hypot(shopPos.x, shopPos.z - 62.85) < 65.0) return;

          // 6. TUYỆT ĐỐI KHÔNG ĐÈ LÊN KHU VỰC 24 NGÔ QUYỀN & NGÃ BA LÊ XOAY (STREET VIEW THỰC TẾ)
          if (Math.hypot(shopPos.x - (-155.0), shopPos.z - 25.0) < 35.0) return;
          if (Math.hypot(shopPos.x - (-185.0), shopPos.z - (-15.0)) < 35.0) return;

          const hIdx = (s * 2 + sIdx);
          const shopInfo = shopData[hIdx % shopData.length];
          const color = wallColors[hIdx % wallColors.length];

          const shGroup = new THREE.Group();
          shGroup.position.set(shopPos.x, 0, shopPos.z);
          shGroup.lookAt(pt.x, 0, pt.z);

          const width = 7.6;
          const depth = 8.5;
          const floorCount = 3 + (hIdx % 2);
          const height = floorCount * 3.4;

          // 1. Thân nhà ống bê tông
          const wallMat = new THREE.MeshStandardMaterial({ color, roughness: 0.65 });
          const bodyMesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), wallMat);
          bodyMesh.position.set(0, height / 2, 0);
          bodyMesh.castShadow = true;
          bodyMesh.receiveShadow = true;
          shGroup.add(bodyMesh);

          // 2. Mặt tiền tòa nhà chân thực ánh xạ từ kho ảnh chụp Street View thực tế
          const realFacadeList = [
            'facade_mamnon_hanhphuc.jpg',
            'facade_noithat_remcua.jpg',
            'facade_pholy_chaongon.jpg',
            'facade_ao_dai_hoanggia.jpg',
            'facade_tqt_shop_hang.jpg',
            'facade_tqt_vang_hoangson.jpg',
            'facade_tqt_french_villa.jpg',
            'facade_tqt_glass_flags.jpg',
            'facade_elise_luxury.jpg',
            'facade_nq_vang_bac.jpg',
            'facade_nq_cam_do.jpg',
            'facade_dientu_ha.jpg',
            'facade_pride_windows.jpg',
            'facade_leloi_villa.jpg'
          ];
          const chosenTex = realFacadeList[hIdx % realFacadeList.length];
          const facadeMat = this.getRealFacadeMat(chosenTex, { roughness: 0.55 });
          const facadeGeo = new THREE.PlaneGeometry(width, height);
          const facadeMesh = new THREE.Mesh(facadeGeo, facadeMat);
          facadeMesh.position.set(0, height / 2, depth / 2 + 0.05);
          facadeMesh.rotation.y = 0; // Mặt tiền hướng thẳng ra đường phố
          facadeMesh.castShadow = true;
          shGroup.add(facadeMesh);

          // 3. Mái hiên di động vươn ra vỉa hè
          const awningCanvas = document.createElement('canvas');
          awningCanvas.width = 128;
          awningCanvas.height = 128;
          const actx = awningCanvas.getContext('2d');
          const stripeCol = sIdx === 0 ? '#1d4ed8' : '#b91c1c';
          actx.fillStyle = '#ffffff';
          actx.fillRect(0, 0, 128, 128);
          actx.fillStyle = stripeCol;
          for (let st = 0; st < 128; st += 32) {
            actx.fillRect(st, 0, 16, 128);
          }
          const awningTex = new THREE.CanvasTexture(awningCanvas);
          awningTex.wrapS = THREE.RepeatWrapping;
          awningTex.wrapT = THREE.RepeatWrapping;
          awningTex.repeat.set(4, 1);

          const awningGeo = new THREE.PlaneGeometry(width * 0.95, 1.3);
          const awningMat = new THREE.MeshStandardMaterial({ map: awningTex, roughness: 0.6, side: THREE.DoubleSide });
          const awningMesh = new THREE.Mesh(awningGeo, awningMat);
          awningMesh.rotation.x = -Math.PI / 12;
          awningMesh.position.set(0, 2.15, depth / 2 + 0.60);
          shGroup.add(awningMesh);

          // 4. Ban công & Cục nóng điều hòa các tầng trên (Chỉ từ Tầng 2 trở lên)
          const railMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.3 });
          for (let f = 2; f < floorCount; f++) {
            const floorY = f * 3.4 + 1.6;
            const balconySlab = new THREE.Mesh(new THREE.BoxGeometry(width * 0.82, 0.2, 0.9), wallMat);
            balconySlab.position.set(0, floorY - 0.9, depth / 2 + 0.45);
            shGroup.add(balconySlab);

            const railing = new THREE.Mesh(new THREE.BoxGeometry(width * 0.82, 0.75, 0.08), railMat);
            railing.position.set(0, floorY - 0.45, depth / 2 + 0.9);
            shGroup.add(railing);

            const ac = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 0.35), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 }));
            ac.position.set(width * 0.32, floorY - 0.2, depth / 2 + 0.35);
            shGroup.add(ac);
          }

          // 6. Mái ngói dốc hoặc bồn nước inox trên nóc
          if (hIdx % 2 === 0) {
            const roofMesh = new THREE.Mesh(
              new THREE.ConeGeometry(width * 0.75, 2.5, 4),
              new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.5 })
            );
            roofMesh.rotation.y = Math.PI / 4;
            roofMesh.position.set(0, height + 1.25, 0);
            shGroup.add(roofMesh);
          } else {
            const tankMesh = new THREE.Mesh(
              new THREE.CylinderGeometry(0.75, 0.75, 1.8, 12),
              new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 })
            );
            tankMesh.rotation.z = Math.PI / 2;
            tankMesh.position.set(1.5, height + 1.0, 0);
            shGroup.add(tankMesh);
          }

          houseGroup.add(shGroup);
        });
      }

      this.cityGroup.add(houseGroup);
    }

    // ------------------------------------------------------------
    // 5.1. ĐẠI LỘ HÙNG VƯƠNG: DẢI PHÂN CÁCH CỨNG (432M) & CÂY XĂNG PETROLIMEX
    // ------------------------------------------------------------
    buildHungVuongAvenueAndMedian() {
      const avenueGroup = new THREE.Group();

      const medianLen = 432;
      const medianW = 2.6;
      const medianH = 0.35;
      const medianX = -564;
      const medianZ = -248.5;

      // Khối bê tông dải phân cách giữa
      const curbGeo = new THREE.BoxGeometry(medianLen, medianH, medianW);
      const curbMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 });
      const medianCurb = new THREE.Mesh(curbGeo, curbMat);
      medianCurb.position.set(medianX, medianH / 2, medianZ);
      medianCurb.receiveShadow = true;
      avenueGroup.add(medianCurb);

      // Thảm hoa vàng & dải phân cách Đại Lộ Hùng Vương (Ảnh chụp thực tế từ Pano 25)
      const medianTex = this.getRealTexture('median_hungvuong_flowers.jpg', 54, 1);
      const grassGeo = new THREE.BoxGeometry(medianLen - 0.2, 0.05, medianW - 0.2);
      const grassMat = new THREE.MeshStandardMaterial({
        map: medianTex,
        roughness: 0.70
      });
      const medianGrass = new THREE.Mesh(grassGeo, grassMat);
      medianGrass.position.set(medianX, medianH + 0.04, medianZ);
      avenueGroup.add(medianGrass);

      // Đầu vạch phản quang vàng đen
      [-medianLen / 2 + 1, medianLen / 2 - 1].forEach(endX => {
        const endBlock = new THREE.Mesh(
          new THREE.BoxGeometry(2.0, medianH + 0.1, medianW),
          new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 })
        );
        endBlock.position.set(medianX + endX, (medianH + 0.1) / 2, medianZ);
        avenueGroup.add(endBlock);
      });

      // Hàng cây cau vua & hoa giấy dọc dải phân cách
      const palmTrunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.7 });
      const palmFrondMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.5 });
      const bougMatPink = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.5 });
      const bougMatPurple = new THREE.MeshStandardMaterial({ color: 0xc026d3, roughness: 0.5 });

      for (let px = -medianLen / 2 + 10; px <= medianLen / 2 - 10; px += 22) {
        const worldX = medianX + px;

        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 5.2, 8), palmTrunkMat);
        trunk.position.set(worldX, medianH + 2.6, medianZ);
        trunk.castShadow = true;
        avenueGroup.add(trunk);

        for (let f = 0; f < 6; f++) {
          const fAng = (f / 6) * Math.PI * 2;
          const frond = new THREE.Mesh(new THREE.ConeGeometry(0.45, 2.6, 5), palmFrondMat);
          frond.rotation.z = Math.PI / 3;
          frond.rotation.y = fAng;
          frond.position.set(worldX + Math.cos(fAng) * 0.6, medianH + 5.1, medianZ + Math.sin(fAng) * 0.6);
          avenueGroup.add(frond);
        }

        const bush = new THREE.Mesh(
          new THREE.SphereGeometry(0.95, 8, 8),
          (Math.abs(px) % 44 === 0) ? bougMatPurple : bougMatPink
        );
        bush.position.set(worldX, medianH + 0.65, medianZ);
        avenueGroup.add(bush);
      }

      // Cột đèn cao áp đôi vươn 2 bên
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.25 });
      const lampMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 1.2 });

      for (let lx = -medianLen / 2 + 18; lx <= medianLen / 2 - 18; lx += 40) {
        const worldX = medianX + lx;
        const lightGroup = new THREE.Group();
        lightGroup.position.set(worldX, medianH, medianZ);

        const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 8.5, 10), poleMat);
        mast.position.y = 4.25;
        mast.castShadow = true;
        lightGroup.add(mast);

        [-2.2, 2.2].forEach(armOffset => {
          const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 2.4, 8), poleMat);
          arm.rotation.x = armOffset > 0 ? Math.PI / 4 : -Math.PI / 4;
          arm.position.set(0, 8.2, armOffset / 2);
          lightGroup.add(arm);

          const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.18, 0.85), lampMat);
          lamp.position.set(0, 8.7, armOffset);
          lightGroup.add(lamp);
        });

        avenueGroup.add(lightGroup);
      }

      // 2. CÂY XĂNG PETROLIMEX VĨNH PHÚC
      const gasPos = new THREE.Vector3(-545, 0, -232);
      const gasGroup = new THREE.Group();
      gasGroup.position.copy(gasPos);

      const forecourt = new THREE.Mesh(
        new THREE.PlaneGeometry(36, 18),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 })
      );
      forecourt.rotation.x = -Math.PI / 2;
      forecourt.position.set(0, 0.06, 0);
      gasGroup.add(forecourt);

      const canopy = new THREE.Mesh(
        new THREE.BoxGeometry(24, 1.2, 12),
        new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.4 })
      );
      canopy.position.set(0, 5.8, 0);
      gasGroup.add(canopy);

      const canopyTrim = new THREE.Mesh(
        new THREE.BoxGeometry(24.4, 0.35, 12.4),
        new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.3 })
      );
      canopyTrim.position.set(0, 5.8, 0);
      gasGroup.add(canopyTrim);

      [-8, 8].forEach(cx => {
        [-3.8, 3.8].forEach(cz => {
          const col = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 5.8, 12), poleMat);
          col.position.set(cx, 2.9, cz);
          col.castShadow = true;
          gasGroup.add(col);
        });
      });

      const petroCanvas = document.createElement('canvas');
      petroCanvas.width = 512;
      petroCanvas.height = 128;
      const pctx = petroCanvas.getContext('2d');
      pctx.fillStyle = '#1d4ed8';
      pctx.fillRect(0, 0, 512, 128);
      pctx.fillStyle = '#ea580c';
      pctx.fillRect(0, 114, 512, 14);
      pctx.fillStyle = '#ffffff';
      pctx.font = '900 52px "Nunito", Arial';
      pctx.textAlign = 'center';
      pctx.fillText('⛽ PETROLIMEX VĨNH PHÚC', 256, 75);

      const pMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(12, 2.8),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(petroCanvas) })
      );
      pMesh.position.set(0, 7.6, -6.05);
      pMesh.rotation.y = Math.PI;
      gasGroup.add(pMesh);

      const pumpMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.4 });
      [-6, 6].forEach(px => {
        const island = new THREE.Mesh(
          new THREE.BoxGeometry(1.6, 0.25, 4.5),
          new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5 })
        );
        island.position.set(px, 0.125, 0);
        gasGroup.add(island);

        const pump = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 1.2), pumpMat);
        pump.position.set(px, 1.05, 0);
        gasGroup.add(pump);
      });

      avenueGroup.add(gasGroup);
      this.cityGroup.add(avenueGroup);
    }

    // ------------------------------------------------------------
    // 5.2. HỆ THỐNG ĐÈN GIAO THÔNG 3D & BIỂN TÊN ĐƯỜNG PHỐ CHUẨN 1:1
    // Hoạt động tuần hoàn: Xanh (15s) -> Vàng (3s) -> Đỏ (12s)
    // ------------------------------------------------------------
    buildTrafficLightSystem() {
      // 1. NGÃ BA TRẦN QUỐC TUẤN - NGÔ QUYỀN (X: -130.4, Z: 54.0)
      this.createTrafficLightPole(-134.0, 0, 58.0, Math.PI / 4, 5.5);
      this.createStreetNamePost(-128.0, 0, 50.0, 'PHỐ TRẦN QUỐC TUẤN', 'ĐƯỜNG NGÔ QUYỀN');

      // 2. VÒNG XUYẾN BÙNG BINH NGÔ QUYỀN - HÙNG VƯƠNG (4 Nhánh tiếp cận)
      this.createTrafficLightPole(-326.0, 0, -188.0, Math.PI * 0.75, 4.2);
      this.createTrafficLightPole(-350.0, 0, -244.0, 0, 5.5);
      this.createTrafficLightPole(-340.0, 0, -204.0, -Math.PI / 2, 5.0);
      this.createTrafficLightPole(-338.0, 0, -248.0, Math.PI / 2, 4.5);

      // 3. NGÃ BA HÙNG VƯƠNG - LÊ LỢI (X: -842.8, Z: -255.0)
      this.createTrafficLightPole(-846.0, 0, -250.0, Math.PI / 2, 5.2);
      this.createStreetNamePost(-840.0, 0, -252.0, 'ĐẠI LỘ HÙNG VƯƠNG', 'PHỐ LÊ LỢI');
    }

    createTrafficLightPole(x, y, z, rotY, mastArmLen = 5.2) {
      const poleGroup = new THREE.Group();
      poleGroup.position.set(x, y, z);
      poleGroup.rotation.y = rotY;

      const steelMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.65, roughness: 0.35 });
      const housingMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });

      // 1. Cột thép đứng cao 6.2m
      const verticalPole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 6.2, 12), steelMat);
      verticalPole.position.y = 3.1;
      verticalPole.castShadow = true;
      poleGroup.add(verticalPole);

      // 2. Tay vươn ngang qua lòng đường
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, mastArmLen, 10), steelMat);
      arm.rotation.z = Math.PI / 2;
      arm.position.set(mastArmLen / 2, 5.8, 0);
      poleGroup.add(arm);

      // 3. Hộp đèn tín hiệu 3 mắt (Đỏ, Vàng, Xanh)
      const boxMain = new THREE.Group();
      boxMain.position.set(mastArmLen - 0.5, 5.8, 0);

      const backPlate = new THREE.Mesh(new THREE.BoxGeometry(0.8, 2.2, 0.45), housingMat);
      boxMain.add(backPlate);

      // Mắt đèn Đỏ
      const redMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0x450a0a,
        emissiveIntensity: 0.1,
        roughness: 0.2
      });
      const redLens = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), redMat);
      redLens.position.set(0, 0.68, 0.2);
      boxMain.add(redLens);

      // Mắt đèn Vàng
      const yellowMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0x451a03,
        emissiveIntensity: 0.1,
        roughness: 0.2
      });
      const yellowLens = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), yellowMat);
      yellowLens.position.set(0, 0, 0.2);
      boxMain.add(yellowLens);

      // Mắt đèn Xanh
      const greenMat = new THREE.MeshStandardMaterial({
        color: 0x22c55e,
        emissive: 0x22c55e,
        emissiveIntensity: 2.2,
        roughness: 0.2
      });
      const greenLens = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), greenMat);
      greenLens.position.set(0, -0.68, 0.2);
      boxMain.add(greenLens);

      // Mái che nắng (hood visors)
      [0.68, 0, -0.68].forEach(hy => {
        const hood = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.22, 12, 1, true, 0, Math.PI), housingMat);
        hood.rotation.x = Math.PI / 2;
        hood.position.set(0, hy, 0.28);
        boxMain.add(hood);
      });

      // Màn hình đếm giây LED
      const timerCanvas = document.createElement('canvas');
      timerCanvas.width = 128;
      timerCanvas.height = 128;
      const tctx = timerCanvas.getContext('2d');
      tctx.fillStyle = '#0f172a';
      tctx.fillRect(0, 0, 128, 128);
      tctx.fillStyle = '#22c55e';
      tctx.font = 'bold 72px "Courier New", monospace';
      tctx.textAlign = 'center';
      tctx.fillText('15', 64, 90);
      const timerTex = new THREE.CanvasTexture(timerCanvas);
      const timerMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.55, 0.55),
        new THREE.MeshBasicMaterial({ map: timerTex })
      );
      timerMesh.position.set(0.68, 0.68, 0.23);
      boxMain.add(timerMesh);

      poleGroup.add(boxMain);

      const signalObj = {
        redLens,
        yellowLens,
        greenLens,
        timerMesh,
        timerTex,
        timerCanvas,
        tctx,
        lastSec: -1
      };
      this.trafficLightSignals.push(signalObj);

      this.cityGroup.add(poleGroup);
      return poleGroup;
    }

    createStreetNamePost(x, y, z, street1, street2) {
      const postGroup = new THREE.Group();
      postGroup.position.set(x, y, z);

      const metalMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.3 });
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 3.6, 10), metalMat);
      post.position.y = 1.8;
      postGroup.add(post);

      const makeSignMesh = (text) => {
        const sc = document.createElement('canvas');
        sc.width = 512;
        sc.height = 128;
        const ctx = sc.getContext('2d');
        ctx.fillStyle = '#0284c7';
        ctx.roundRect(4, 4, 504, 120, 12);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 6;
        ctx.roundRect(8, 8, 496, 112, 10);
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 38px "Nunito", Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text, 256, 75);

        return new THREE.Mesh(
          new THREE.PlaneGeometry(1.9, 0.48),
          new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), side: THREE.DoubleSide })
        );
      };

      if (street1) {
        const s1 = makeSignMesh(street1);
        s1.position.set(0, 3.3, 0);
        postGroup.add(s1);
      }
      if (street2) {
        const s2 = makeSignMesh(street2);
        s2.rotation.y = Math.PI / 2;
        s2.position.set(0, 3.0, 0);
        postGroup.add(s2);
      }

      this.cityGroup.add(postGroup);
    }

    // ------------------------------------------------------------
    // 5.3. CẬP NHẬT CHU KỲ ĐÈN GIAO THÔNG THỜI GIAN THỰC
    // ------------------------------------------------------------
    updateTrafficLights(dt) {
      if (!this.trafficLightSignals || !this.trafficLightSignals.length) return;
      this.trafficLightTimer = ((this.trafficLightTimer || 0) + dt) % 30.0;
      const t = this.trafficLightTimer;

      let state = 'green';
      let remainingSec = 0;
      if (t < 15.0) {
        state = 'green';
        remainingSec = Math.ceil(15.0 - t);
      } else if (t < 18.0) {
        state = 'yellow';
        remainingSec = Math.ceil(18.0 - t);
      } else {
        state = 'red';
        remainingSec = Math.ceil(30.0 - t);
      }

      this.trafficLightSignals.forEach(sig => {
        if (state === 'green') {
          sig.greenLens.material.emissive.setHex(0x22c55e);
          sig.greenLens.material.emissiveIntensity = 2.4;
          sig.yellowLens.material.emissiveIntensity = 0.08;
          sig.redLens.material.emissiveIntensity = 0.08;
        } else if (state === 'yellow') {
          sig.yellowLens.material.emissive.setHex(0xfacc15);
          sig.yellowLens.material.emissiveIntensity = 2.4;
          sig.greenLens.material.emissiveIntensity = 0.08;
          sig.redLens.material.emissiveIntensity = 0.08;
        } else {
          sig.redLens.material.emissive.setHex(0xef4444);
          sig.redLens.material.emissiveIntensity = 2.4;
          sig.greenLens.material.emissiveIntensity = 0.08;
          sig.yellowLens.material.emissiveIntensity = 0.08;
        }

        if (sig.lastSec !== remainingSec && sig.tctx) {
          sig.lastSec = remainingSec;
          sig.tctx.fillStyle = '#0f172a';
          sig.tctx.fillRect(0, 0, 128, 128);
          sig.tctx.fillStyle = state === 'green' ? '#22c55e' : (state === 'yellow' ? '#facc15' : '#ef4444');
          sig.tctx.font = 'bold 72px "Courier New", monospace';
          sig.tctx.textAlign = 'center';
          sig.tctx.fillText(String(remainingSec).padStart(2, '0'), 64, 90);
          sig.timerTex.needsUpdate = true;
        }
      });
    }

    // ------------------------------------------------------------
    // 6. CÂY XANH ĐÔ THỊ & CỘT ĐÈN CAO ÁP
    // ------------------------------------------------------------
    buildStreetFloraAndLights() {
      const decoGroup = new THREE.Group();
      const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
      const treeLeafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 });
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7, roughness: 0.3 });

      // Bắt đầu từ Waypoint 8 (sau Ngã Ba Lê Xoay) để không che khuất mặt tiền các dãy phố cửa hàng chi tiết
      for (let i = 8; i < this.routePoints.length - 2; i += 2) {
        // Bỏ qua khu vực vòng xuyến Bùng Binh Ngô Quyền
        if (i >= 11 && i <= 15) continue;
        const pt = this.routePoints[i];
        if (Math.hypot(pt.x - (-325.0), pt.z - (-220.0)) < 45.0) continue;

        const nextPt = this.routePoints[i + 1] || pt;
        const tangent = new THREE.Vector3(nextPt.x - pt.x, 0, nextPt.z - pt.z).normalize();
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

        const treePos = new THREE.Vector3().copy(pt).addScaledVector(normal, 8.5);
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.35, 3.8, 10), treeTrunkMat);
        trunk.position.set(treePos.x, 1.9, treePos.z);
        trunk.castShadow = true;
        decoGroup.add(trunk);

        const crown = new THREE.Mesh(new THREE.SphereGeometry(2.0, 12, 12), treeLeafMat);
        crown.position.set(treePos.x, 4.6, treePos.z);
        crown.castShadow = true;
        decoGroup.add(crown);

        const lightPos = new THREE.Vector3().copy(pt).addScaledVector(normal, -8.5);
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 6.5, 8), poleMat);
        pole.position.set(lightPos.x, 3.25, lightPos.z);
        decoGroup.add(pole);

        const lampHead = new THREE.Mesh(
          new THREE.BoxGeometry(0.85, 0.25, 0.45),
          new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 0.8 })
        );
        lampHead.position.set(lightPos.x, 6.5, lightPos.z);
        decoGroup.add(lampHead);
      }

      this.cityGroup.add(decoGroup);
    }

    // ------------------------------------------------------------
    // 6.5. KHU PHỐ 141 TRẦN QUỐC TUẤN TRƯỚC CỔNG TRƯỜNG TIỂU HỌC NGÔ QUYỀN
    // ------------------------------------------------------------
    // 6.5. KHU PHỐ 141 TRẦN QUỐC TUẤN TRƯỚC CỔNG TRƯỜNG TIỂU HỌC NGÔ QUYỀN
    // Tái hiện chính xác 100% theo ảnh Google Street View thực tế ngoài đời
    // ------------------------------------------------------------
    buildTranQuocTuanStreetViewDetail() {
      const streetGroup = new THREE.Group();

      // 1. VẠCH SANG ĐƯỜNG NGƯỜI ĐI BỘ (ZEBRA CROSSING) TẠI CỔNG TRƯỜNG NGÔ QUYỀN
      // Nối từ vỉa hè trường (Z = 57.65) sang vỉa hè đối diện (Z = 68.05) tại X = 0
      const zebraMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
      for (let s = -3.3; s <= 3.3; s += 1.1) {
        const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 9.8), zebraMat);
        stripe.rotation.x = -Math.PI / 2;
        stripe.position.set(s, 0.056, 62.85);
        streetGroup.add(stripe);
      }

      // 2. CHỮ SƠN TRẮNG LỚN TRÊN MẶT ĐƯỜNG: "TRẦN QUỐC TUẤN" (CHUẨN GOOGLE STREET VIEW)
      const textCanvas = document.createElement('canvas');
      textCanvas.width = 1024;
      textCanvas.height = 256;
      const tctx = textCanvas.getContext('2d');
      tctx.clearRect(0, 0, 1024, 256);
      tctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      tctx.font = '900 92px "Nunito", Arial, sans-serif';
      tctx.textAlign = 'center';
      tctx.fillText('TRẦN QUỐC TUẤN', 512, 160);

      const textTex = new THREE.CanvasTexture(textCanvas);
      const streetNameMark = new THREE.Mesh(
        new THREE.PlaneGeometry(11.0, 2.75),
        new THREE.MeshBasicMaterial({ map: textTex, transparent: true })
      );
      streetNameMark.rotation.x = -Math.PI / 2;
      streetNameMark.position.set(1.5, 0.058, 62.85);
      streetGroup.add(streetNameMark);

      // 3. ĐĨA ĐỊNH HƯỚNG GOOGLE STREET VIEW TRÊN MẶT ĐƯỜNG (CHẤM TRÒN ĐỊNH HƯỚNG)
      const arrowCanvas = document.createElement('canvas');
      arrowCanvas.width = 512;
      arrowCanvas.height = 512;
      const actx = arrowCanvas.getContext('2d');
      actx.fillStyle = 'rgba(15, 23, 42, 0.65)';
      actx.beginPath();
      actx.arc(256, 256, 220, 0, Math.PI * 2);
      actx.fill();
      actx.strokeStyle = '#ffffff';
      actx.lineWidth = 14;
      actx.stroke();
      actx.fillStyle = '#ffffff';
      actx.beginPath();
      actx.moveTo(256, 85);
      actx.lineTo(365, 315);
      actx.lineTo(256, 260);
      actx.lineTo(147, 315);
      actx.closePath();
      actx.fill();

      const streetViewDisc = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 3.6),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(arrowCanvas), transparent: true })
      );
      streetViewDisc.rotation.x = -Math.PI / 2;
      streetViewDisc.rotation.z = -Math.PI / 2;
      streetViewDisc.position.set(-6.5, 0.058, 62.85);
      streetGroup.add(streetViewDisc);

      // 4. HÀNG RÀO KIM LOẠI AN TOÀN HỌC SINH DỌC MÉP VỈA HÈ TRƯỜNG (Z = 57.20, Y = 0.16)
      // Mở lối qua đường rộng 9m ngay giữa cổng trường (-4.5m -> +4.5m)
      const guardMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35, metalness: 0.3 });
      const whiteGuardMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.3 });

      const buildGuardRailSection = (startX, endX) => {
        const length = Math.abs(endX - startX);
        const midX = (startX + endX) / 2;
        // Thanh ngang trên & dưới
        [0.85, 0.42].forEach(ry => {
          const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, length, 12), ry === 0.85 ? guardMat : whiteGuardMat);
          rail.rotation.z = Math.PI / 2;
          rail.position.set(midX, 0.16 + ry, 57.20);
          streetGroup.add(rail);
        });
        // Các cột đứng cách nhau 2.5m
        const step = (endX > startX) ? 2.5 : -2.5;
        for (let x = startX; (step > 0 ? x <= endX : x >= endX); x += step) {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.95, 12), guardMat);
          post.position.set(x, 0.16 + 0.475, 57.20);
          streetGroup.add(post);
        }
      };
      buildGuardRailSection(-4.5, -36.0); // Đoạn hàng rào phía Tây
      buildGuardRailSection(4.5, 36.0);   // Đoạn hàng rào phía Đông

      // 5. BIỂN BÁO GIAO THÔNG VỈA HÈ: "CHÚ Ý TRƯỜNG HỌC - ĐI CHẬM 20 KM/H"
      const signPostMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.2 });
      const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.4), signPostMat);
      signPost.position.set(-12.0, 0.16 + 1.7, 57.0);
      streetGroup.add(signPost);

      const schoolSignCanvas = document.createElement('canvas');
      schoolSignCanvas.width = 256;
      schoolSignCanvas.height = 256;
      const ssctx = schoolSignCanvas.getContext('2d');
      ssctx.fillStyle = '#dc2626';
      ssctx.beginPath();
      ssctx.arc(128, 128, 120, 0, Math.PI * 2);
      ssctx.fill();
      ssctx.fillStyle = '#ffffff';
      ssctx.beginPath();
      ssctx.arc(128, 128, 96, 0, Math.PI * 2);
      ssctx.fill();
      ssctx.fillStyle = '#0f172a';
      ssctx.font = 'bold 84px "Nunito", Arial';
      ssctx.textAlign = 'center';
      ssctx.fillText('20', 128, 158);

      const schoolSignMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 1.2),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(schoolSignCanvas) })
      );
      schoolSignMesh.position.set(-12.0, 0.16 + 3.1, 57.0);
      schoolSignMesh.rotation.y = -Math.PI / 2;
      streetGroup.add(schoolSignMesh);

      // 6. CÂY XANH BÓNG MÁT DỌC VỈA HÈ (XÀ CỪ & PHƯỢNG VĨ CHIBI)
      const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
      const treeLeafMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 });

      // Cây bên vỉa hè trường (Z = 55.4, Y = 0.16)
      [-36.0, -24.0, -12.0, 14.0, 26.0, 38.0].forEach(tx => {
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.45, 4.8, 10), treeTrunkMat);
        trunk.position.set(tx, 0.16 + 2.4, 55.4);
        trunk.castShadow = true;
        streetGroup.add(trunk);

        const leaves = new THREE.Mesh(new THREE.SphereGeometry(2.9, 12, 12), treeLeafMat);
        leaves.position.set(tx, 0.16 + 5.6, 55.4);
        leaves.castShadow = true;
        streetGroup.add(leaves);
      });

      // Vỉa hè phía trước dãy cửa hàng được giữ thông thoáng để lộ toàn bộ biển hiệu chân thực 1:1

      // 7. CỘT ĐÈN CAO ÁP CHIẾU SÁNG ĐƯỜNG PHỐ (Đặt chuẩn tại khe ranh giới giữa các khối nhà, 100% không che biển hiệu)
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7, roughness: 0.3 });
      [-45.5, -19.5, 21.0, 48.0].forEach(px => {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.14, 7.2, 8), poleMat);
        pole.position.set(px, 0.16 + 3.6, 68.2);
        streetGroup.add(pole);

        const lampArm = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.10, 1.4), poleMat);
        lampArm.position.set(px, 0.16 + 7.1, 67.5);
        streetGroup.add(lampArm);

        const lampHead = new THREE.Mesh(
          new THREE.BoxGeometry(0.40, 0.16, 0.75),
          new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 0.8 })
        );
        lampHead.position.set(px, 0.16 + 7.0, 66.9);
        streetGroup.add(lampHead);
      });

      // 8. XE Ô TÔ ĐỖ BÊN ĐƯỜNG TRẦN QUỐC TUẤN (THEO GOOGLE STREET VIEW THỰC TẾ)
      // A. Xe sedan màu trắng (Hyundai Grand i10) đỗ sát mép bó vỉa trường
      const carWhiteGroup = new THREE.Group();
      carWhiteGroup.position.set(16.0, 0.05, 58.7);
      carWhiteGroup.rotation.y = -Math.PI / 2;

      const carMatWhite = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, metalness: 0.2 });
      const carGlassMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.1, metalness: 0.8 });
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
      const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });
      const lightMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 0.9 });
      const tailLightMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0xef4444, emissiveIntensity: 0.8 });

      const carBody = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.75, 3.8), carMatWhite);
      carBody.position.y = 0.55;
      carBody.castShadow = true;
      carWhiteGroup.add(carBody);

      const carCabin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.65, 2.1), carGlassMat);
      carCabin.position.set(0, 1.15, -0.2);
      carCabin.castShadow = true;
      carWhiteGroup.add(carCabin);

      [-0.65, 0.65].forEach(lx => {
        const hLight = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), lightMat);
        hLight.position.set(lx, 0.6, 1.85);
        carWhiteGroup.add(hLight);
        const tLight = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.08), tailLightMat);
        tLight.position.set(lx, 0.65, -1.86);
        carWhiteGroup.add(tLight);
      });

      const plateMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const plateFront = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.16), plateMat);
      plateFront.position.set(0, 0.35, 1.91);
      carWhiteGroup.add(plateFront);

      [[-0.95, 0.3, 1.1], [0.95, 0.3, 1.1], [-0.95, 0.3, -1.1], [0.95, 0.3, -1.1]].forEach(([wx, wy, wz]) => {
        const w = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 16), wheelMat);
        w.rotation.z = Math.PI / 2;
        w.position.set(wx, wy, wz);
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.23, 12), chromeMat);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(wx, wy, wz);
        carWhiteGroup.add(w);
        carWhiteGroup.add(hub);
      });
      streetGroup.add(carWhiteGroup);

      // B. Xe SUV đỏ mận đỗ lề bên đối diện (Đỗ xa ở X = -70m, không che khuất mặt tiền quán phở và các shop)
      const suvGroup = new THREE.Group();
      suvGroup.position.set(-70.0, 0.05, 67.0);
      suvGroup.rotation.y = -Math.PI / 2;

      const suvMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.35, metalness: 0.3 });
      const suvBody = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.9, 4.4), suvMat);
      suvBody.position.y = 0.65;
      suvBody.castShadow = true;
      suvGroup.add(suvBody);

      const suvCabin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.7, 2.6), carGlassMat);
      suvCabin.position.set(0, 1.35, -0.2);
      suvCabin.castShadow = true;
      suvGroup.add(suvCabin);

      [-0.7, 0.7].forEach(lx => {
        const hLight = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), lightMat);
        hLight.position.set(lx, 0.75, 2.15);
        suvGroup.add(hLight);
        const tLight = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.14, 0.08), tailLightMat);
        tLight.position.set(lx, 0.8, -2.16);
        suvGroup.add(tLight);
      });

      [[-1.0, 0.35, 1.3], [1.0, 0.35, 1.3], [-1.0, 0.35, -1.3], [1.0, 0.35, -1.3]].forEach(([wx, wy, wz]) => {
        const w = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.25, 16), wheelMat);
        w.rotation.z = Math.PI / 2;
        w.position.set(wx, wy, wz);
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.26, 12), chromeMat);
        hub.rotation.z = Math.PI / 2;
        hub.position.set(wx, wy, wz);
        suvGroup.add(w);
        suvGroup.add(hub);
      });
      streetGroup.add(suvGroup);

      // 9. CỔNG ĐÌNH LÀNG NGÔ QUYỀN CỔ KÍNH (X = +13.0, Z = 73.0, Y = 0.16)
      // Tái hiện kiến trúc Tam Quan cổ truyền Việt Nam: Cột trụ gạch quét vôi, mái ngói đao cong 2 tầng,
      // biển đại tự sơn son thếp vàng, cửa gỗ lim cổ và cây bồ đề đại thụ
      const templeGroup = new THREE.Group();
      templeGroup.position.set(13.0, 0.16, 73.0);

      const antiqueWallMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.75 });
      const stonePlinthMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.85 });
      const antiqueTileMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.42 });
      const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x3e1a06, roughness: 0.7 });
      const redLacquerMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.35 });

      // Trụ biểu chính Tam Quan (4 cột trụ vững chãi có đế đá hoa sen)
      [-3.6, -1.6, 1.6, 3.6].forEach((colX, ci) => {
        const isMainCol = Math.abs(colX) < 2.0;
        const colH = isMainCol ? 4.8 : 3.8;
        const colW = isMainCol ? 0.75 : 0.6;

        // Chân đế đá tảng hoa sen
        const plinth = new THREE.Mesh(new THREE.BoxGeometry(colW + 0.3, 0.45, colW + 0.3), stonePlinthMat);
        plinth.position.set(colX, 0.225, 0);
        plinth.castShadow = true;
        templeGroup.add(plinth);

        // Thân cột gạch vôi cổ
        const col = new THREE.Mesh(new THREE.BoxGeometry(colW, colH, colW), antiqueWallMat);
        col.position.set(colX, colH / 2 + 0.45, 0);
        col.castShadow = true;
        templeGroup.add(col);

        // Đỉnh cột có nghê đá hoặc lồng đèn gốm men cổ
        const cap = new THREE.Mesh(new THREE.ConeGeometry(colW * 0.7, 0.4, 4), antiqueTileMat);
        cap.position.set(colX, colH + 0.65, 0);
        cap.rotation.y = Math.PI / 4;
        templeGroup.add(cap);
      });

      // Tường bao và vòm cuốn cổng phụ 2 bên
      [-2.6, 2.6].forEach(sideX => {
        const sideWall = new THREE.Mesh(new THREE.BoxGeometry(1.4, 3.2, 0.5), antiqueWallMat);
        sideWall.position.set(sideX, 1.6, 0);
        sideWall.castShadow = true;
        templeGroup.add(sideWall);

        // Vòm cửa phụ giả cổ
        const archDoor = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.55, 12, 1, false, 0, Math.PI), darkWoodMat);
        archDoor.rotation.z = Math.PI / 2;
        archDoor.rotation.y = Math.PI / 2;
        archDoor.position.set(sideX, 2.2, 0);
        templeGroup.add(archDoor);
      });

      // Cửa gỗ chính 2 cánh bằng gỗ lim cổ với then cài và chốt đồng
      const mainDoorGeo = new THREE.BoxGeometry(2.4, 3.0, 0.12);
      const mainDoor = new THREE.Mesh(mainDoorGeo, darkWoodMat);
      mainDoor.position.set(0, 1.5, 0);
      templeGroup.add(mainDoor);

      // Nẹp đồng & chốt gõ cửa cổ
      [-0.45, 0.45].forEach(dx => {
        const stud = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8 }));
        stud.position.set(dx, 1.65, 0.08);
        templeGroup.add(stud);
      });

      // BỨC ĐẠI TỰ THẾP VÀNG: "🏛️ ĐÌNH LÀNG NGÔ QUYỀN • DI TÍCH LỊCH SỬ VĂN HÓA"
      const signCanvas = document.createElement('canvas');
      signCanvas.width = 768;
      signCanvas.height = 160;
      const stCtx = signCanvas.getContext('2d');
      stCtx.fillStyle = '#831843';
      stCtx.fillRect(0, 0, 768, 160);
      stCtx.strokeStyle = '#facc15';
      stCtx.lineWidth = 8;
      stCtx.strokeRect(6, 6, 756, 148);
      stCtx.lineWidth = 2;
      stCtx.strokeRect(14, 14, 740, 132);

      stCtx.fillStyle = '#fde047';
      stCtx.font = '900 44px "Nunito", Arial, sans-serif';
      stCtx.textAlign = 'center';
      stCtx.fillText('ĐÌNH LÀNG NGÔ QUYỀN', 384, 68);

      stCtx.fillStyle = '#fef08a';
      stCtx.font = '800 22px "Nunito", Arial, sans-serif';
      stCtx.fillText('DI TÍCH LỊCH SỬ VĂN HÓA TRUYỀN THỐNG VĨNH YÊN', 384, 118);

      const signTex = new THREE.CanvasTexture(signCanvas);
      const tSignMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.75), new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide }));
      tSignMesh.position.set(0, 3.8, -0.32);
      tSignMesh.rotation.y = Math.PI; // Hướng mặt chữ ra đường Trần Quốc Tuấn, 100% không bị ngược chữ
      templeGroup.add(tSignMesh);

      // TẦNG MÁI NGÓI CỔ TRUYỀN 2 TẦNG (MÁI HẠ & MÁI THƯỢNG CONG VÚT)
      // Mái hạ (tầng 1 che trọn toàn bộ cổng tam quan, rộng 9.6m)
      const roofLower = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.28, 2.2), antiqueTileMat);
      roofLower.position.set(0, 4.45, 0);
      roofLower.rotation.x = -0.10;
      roofLower.castShadow = true;
      templeGroup.add(roofLower);

      // Cổ diêm đỡ mái thượng
      const neckWall = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.75, 1.2), antiqueWallMat);
      neckWall.position.set(0, 4.95, 0);
      templeGroup.add(neckWall);

      // Mái thượng (tầng 2 vươn cao với kìm nóc chạm khắc, rộng 6.8m)
      const roofUpper = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.28, 2.0), antiqueTileMat);
      roofUpper.position.set(0, 5.5, 0);
      roofUpper.rotation.x = -0.12;
      roofUpper.castShadow = true;
      templeGroup.add(roofUpper);

      // Bờ nóc kìm nóc đỉnh ngói
      const ridgeUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 7.0, 8), antiqueTileMat);
      ridgeUpper.rotation.z = Math.PI / 2;
      ridgeUpper.position.set(0, 5.75, -0.4);
      templeGroup.add(ridgeUpper);

      // Đèn lồng đỏ lễ hội truyền thống treo 2 bên cổng
      [-1.8, 1.8].forEach(lx => {
        const lantern = new THREE.Mesh(
          new THREE.SphereGeometry(0.24, 12, 12),
          new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0xef4444, emissiveIntensity: 0.6 })
        );
        lantern.scale.set(1.0, 1.3, 1.0);
        lantern.position.set(lx, 4.0, 0.6);
        templeGroup.add(lantern);

        const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 0.25), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
        tassel.position.set(lx, 3.65, 0.6);
        templeGroup.add(tassel);
      });

      // Cờ ngũ sắc hội làng truyền thống
      const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 7.5), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 }));
      flagPole.position.set(-4.6, 3.75, 0.8);
      templeGroup.add(flagPole);

      const flagCanvas = document.createElement('canvas');
      flagCanvas.width = 256;
      flagCanvas.height = 256;
      const fctx = flagCanvas.getContext('2d');
      fctx.fillStyle = '#facc15';
      fctx.fillRect(0, 0, 256, 256);
      fctx.fillStyle = '#dc2626';
      fctx.fillRect(20, 20, 216, 216);
      fctx.fillStyle = '#16a34a';
      fctx.fillRect(40, 40, 176, 176);
      fctx.fillStyle = '#ffffff';
      fctx.fillRect(60, 60, 136, 136);
      fctx.fillStyle = '#2563eb';
      fctx.fillRect(80, 80, 96, 96);

      const festFlag = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 1.6),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(flagCanvas), side: THREE.DoubleSide })
      );
      festFlag.position.set(-3.8, 6.2, 0.8);
      templeGroup.add(festFlag);

      // CÂY BỒ ĐỀ CỔ THỤ CẠNH CỔNG ĐÌNH (Thân cây xù xì, rễ nổi, tán lá râm mát)
      const bodhiTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.95, 6.0, 12), new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 }));
      bodhiTrunk.position.set(6.2, 3.0, 1.0);
      templeGroup.add(bodhiTrunk);

      // Rễ cây bồ đề bò trên mặt đất
      for (let r = 0; r < 4; r++) {
        const root = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 1.8), new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 }));
        root.rotation.z = Math.PI / 3 + r * 0.2;
        root.rotation.y = r * (Math.PI / 2);
        root.position.set(6.2 + Math.cos(r * 1.5) * 0.8, 0.4, 1.0 + Math.sin(r * 1.5) * 0.8);
        templeGroup.add(root);
      }

      // Tán lá nhiều tầng xum xuê
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.65 });
      const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 });
      const bodhiCrown1 = new THREE.Mesh(new THREE.SphereGeometry(3.6, 14, 14), leafMat);
      bodhiCrown1.position.set(6.2, 6.8, 1.0);
      templeGroup.add(bodhiCrown1);

      const bodhiCrown2 = new THREE.Mesh(new THREE.SphereGeometry(2.8, 12, 12), leafMat2);
      bodhiCrown2.position.set(5.0, 8.0, 0.6);
      templeGroup.add(bodhiCrown2);

      const bodhiCrown3 = new THREE.Mesh(new THREE.SphereGeometry(2.5, 12, 12), leafMat);
      bodhiCrown3.position.set(7.4, 7.5, 1.4);
      templeGroup.add(bodhiCrown3);

      // Bàn đá dâng hương dưới gốc cây bồ đề
      const stoneAltar = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.85, 0.9), stonePlinthMat);
      stoneAltar.position.set(4.5, 0.425, 1.8);
      templeGroup.add(stoneAltar);

      const censer = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.22, 12), new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.5 }));
      censer.position.set(4.5, 0.96, 1.8);
      templeGroup.add(censer);

      streetGroup.add(templeGroup);

      // 10. DÃY NHÀ PHỐ CHÂN THỰC 100% TỪ ẢNH CHỤP STREET VIEW ĐỐI DIỆN TRƯỜNG NGÔ QUYỀN (Z = 73.0)
      // Để trống hoàn toàn X = 0 (từ X = -6 đến X = +6) cho Cổng Ngõ 141 Trần Quốc Tuấn!
      const realTqtShops = [
        { 
          x: -52.0, w: 10.5, h: 12.0, d: 8.5, tex: 'facade_mamnon_hanhphuc.jpg', wall: 0xfef08a, floors: 3, hasAwning: true, awningColor: '#ea580c',
          bladeSign: { title: 'MẦM NON', sub: 'HẠNH PHÚC 5C4', bg: '#047857', text: '#ffffff', accent: '#fde047', shape: 'round', side: 'right' }
        },
        { 
          x: -39.0, w: 9.8,  h: 13.5, d: 8.0, tex: 'facade_noithat_remcua.jpg',  wall: 0xfde047, floors: 4, hasAwning: true, awningColor: '#1d4ed8',
          bladeSign: { title: 'RÈM CỬA', sub: 'NỘI THẤT CAO CẤP', bg: '#1e40af', text: '#ffffff', accent: '#38bdf8', shape: 'rect', side: 'right' }
        },
        { 
          x: -26.0, w: 9.8,  h: 14.0, d: 8.0, tex: 'facade_pholy_chaongon.jpg', wall: 0xfef9c3, floors: 4, hasAwning: true, awningColor: '#b45309',
          bladeSign: { title: 'PHỞ LÝ', sub: 'BÒ TÁI LĂN SỐT VANG', bg: '#991b1b', text: '#fde047', accent: '#f97316', shape: 'rect', side: 'left' }
        },
        { 
          x: -13.0, w: 9.5,  h: 11.0, d: 8.0, tex: 'facade_tqt_shop_hang.jpg',  wall: 0xfbcfe8, floors: 3, hasAwning: true, awningColor: '#db2777',
          bladeSign: { title: 'CÔ HẰNG', sub: 'TẠP HÓA 5C4', bg: '#be185d', text: '#ffffff', accent: '#fbcfe8', shape: 'rect', side: 'right' }
        },
        // Cổng Ngõ 141 Trần Quốc Tuấn tại X = 0 (Độ rộng 12m)
        // Cổng Đình Làng Ngô Quyền Cổ Kính tại X = 13.0, Cây bồ đề cổ thụ tại X = 18.8
        { 
          x: 30.0,  w: 9.8,  h: 12.0, d: 8.0, tex: 'facade_ao_dai_hoanggia.jpg', wall: 0xfef3c7, floors: 3, hasAwning: true, awningColor: '#b91c1c',
          bladeSign: { title: 'ÁO DÀI', sub: 'HOÀNG GIA HUẾ', bg: '#6b21a8', text: '#fef08a', accent: '#f472b6', shape: 'rect', side: 'left' }
        },
        { 
          x: 42.0,  w: 9.8,  h: 14.0, d: 8.0, tex: 'facade_tqt_vang_hoangson.jpg', wall: 0xf1f5f9, floors: 4, hasAwning: true, awningColor: '#d97706',
          bladeSign: { title: 'HOÀNG SƠN', sub: 'VÀNG BẠC 9999', bg: '#78350f', text: '#fef08a', accent: '#facc15', shape: 'rect', side: 'right' }
        },
        { x: 54.0,  w: 10.2, h: 12.5, d: 8.5, tex: 'facade_tqt_french_villa.jpg', wall: 0xfde047, floors: 3, hasAwning: false },
        { x: 66.0,  w: 10.5, h: 14.5, d: 8.5, tex: 'facade_tqt_glass_flags.jpg', wall: 0xe0f2fe, floors: 4, hasAwning: true, awningColor: '#dc2626' }
      ];

      realTqtShops.forEach((s) => {
        const b = this.createRealBuildingMesh(s.w, s.h, s.d, s.tex, s.wall, {
          floors: s.floors,
          hasAwning: s.hasAwning,
          awningColor: s.awningColor,
          bladeSign: s.bladeSign
        });
        b.position.set(s.x, 0.16, 73.0);
        streetGroup.add(b);
      });

      this.cityGroup.add(streetGroup);
    }

    // ------------------------------------------------------------
    // 6.5b. ĐOẠN PHỐ NGÔ QUYỀN & NGÃ BA LÊ XOAY (100% GOOGLE STREET VIEW THỰC TẾ)
    // Tái tạo 2 địa điểm then chốt từ ảnh & link Google Street View của User:
    // 1. Số 24 Ngô Quyền: Cây cổ thụ quét vôi trắng, Cột điện bê tông búi dây cáp chằng chịt,
    //    chữ sơn "NGÔ QUYỀN" trên mặt đường, tiệm phố mái đỏ, xe 7 chỗ bạc.
    // 2. Ngã ba Ngô Quyền - Phố Lê Xoay: Tiệm chăn ga gối đệm "HUYỀN HẬU", biển VINAMILK,
    //    biển tên "PHỐ LÊ XOAY", biển Cấm đỗ xe cột sọc đỏ trắng, ô tô Vios bạc,
    //    cây cổ thụ quét vôi trắng & quán trà đá vỉa hè dù đỏ mận, vạch qua đường, biển đi bộ đế vàng đen, nắp cống tròn.
    // ------------------------------------------------------------
    buildNgoQuyenStreetViewDetail() {
      const nqGroup = new THREE.Group();

      // Vector hướng đường Ngô Quyền từ trường về vòng xuyến:
      // Điểm 6: (-155.0, 25.0) -> Điểm 7: (-185.0, -15.0)
      // Tangent: (-0.6, 0, -0.8), Góc xoay đường theta = Math.atan2(-0.6, -0.8)
      const roadAngle = Math.atan2(-0.6, -0.8);

      // ============================================================
      // PHẦN 1: ĐỊA ĐIỂM SỐ 24 NGÔ QUYỀN (Waypoint 6: X = -155.0, Z = 25.0)
      // Dựa theo ảnh media_1791569947544_83434a8a.jpg
      // ============================================================
      const group24 = new THREE.Group();
      group24.position.set(-155.0, 0, 25.0);
      group24.rotation.y = roadAngle;

      // 1.1. CHỮ SƠN PHẢN QUANG TRÊN MẶT ĐƯỜNG: "NGÔ QUYỀN" (Y = 0.056 - Tránh Z-fight)
      const stencilCanvas = document.createElement('canvas');
      stencilCanvas.width = 512;
      stencilCanvas.height = 128;
      const stCtx = stencilCanvas.getContext('2d');
      stCtx.fillStyle = 'rgba(0, 0, 0, 0)';
      stCtx.fillRect(0, 0, 512, 128);
      stCtx.fillStyle = '#f8fafc';
      stCtx.font = 'bold 56px "Nunito", Arial, sans-serif';
      stCtx.textAlign = 'center';
      stCtx.textBaseline = 'middle';
      stCtx.fillText('NGÔ QUYỀN', 256, 64);

      const stencilMat = new THREE.MeshBasicMaterial({
        map: new THREE.CanvasTexture(stencilCanvas),
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const stencilMesh = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 1.8), stencilMat);
      stencilMesh.rotation.set(-Math.PI / 2, 0, Math.PI);
      stencilMesh.position.set(0, 0.056, 0);
      group24.add(stencilMesh);

      // 1.2. CÂY CỔ THỤ QUÉT VÔI TRẮNG GỐC CÂY (ĐẶC TRƯNG VIỆT NAM CHỐNG MỐI MỌT)
      // Vị trí: Vỉa hè bên trái (local X = 9.2, Z = -8.5)
      const tree24Group = new THREE.Group();
      tree24Group.position.set(9.2, 0.16, -8.5);

      // Nửa gốc dưới quét vôi trắng (Y: 0 -> 1.8m)
      const trunkWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.95 });
      const trunkWhite = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.65, 1.8, 12), trunkWhiteMat);
      trunkWhite.position.y = 0.9;
      trunkWhite.castShadow = true;
      tree24Group.add(trunkWhite);

      // Thân trên vỏ cây sần sùi (Y: 1.8m -> 5.2m)
      const trunkBarkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
      const trunkBark = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.48, 3.4, 10), trunkBarkMat);
      trunkBark.position.y = 1.8 + 1.7;
      trunkBark.castShadow = true;
      tree24Group.add(trunkBark);

      // Tán lá xum xuê
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.65 });
      const crown1 = new THREE.Mesh(new THREE.SphereGeometry(3.2, 12, 10), leafMat);
      crown1.position.set(0, 6.2, 0);
      crown1.castShadow = true;
      tree24Group.add(crown1);

      const crown2 = new THREE.Mesh(new THREE.SphereGeometry(2.4, 10, 8), leafMat);
      crown2.position.set(-1.2, 5.8, 0.8);
      tree24Group.add(crown2);
      group24.add(tree24Group);

      // 1.3. CỘT ĐIỆN BÊ TÔNG BÚI DÂY CÁP VIỄN THÔNG CHẰNG CHỊT (VIETNAM TELECOM POLE)
      // Vị trí: Sát mép vỉa hè (local X = 8.6, Z = -5.0)
      const pole24Group = new THREE.Group();
      pole24Group.position.set(8.6, 0.16, -5.0);

      const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
      const poleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 7.8, 10), poleMat);
      poleMesh.position.y = 3.9;
      pole24Group.add(poleMesh);

      // Xà đỡ sứ cách điện
      const crossArmMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6, roughness: 0.4 });
      const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 1.8), crossArmMat);
      arm1.position.set(0, 7.2, 0);
      pole24Group.add(arm1);

      [-0.7, -0.25, 0.25, 0.7].forEach(az => {
        const ins = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.22, 8), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 }));
        ins.position.set(0, 7.35, az);
        pole24Group.add(ins);
      });

      // Hộp công tơ / trạm cáp viễn thông
      const meterBox = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.65, 0.25), new THREE.MeshStandardMaterial({ color: 0x334155 }));
      meterBox.position.set(0.2, 3.2, 0);
      pole24Group.add(meterBox);

      // Búi dây cáp viễn thông cuộn tròn (Torus) & dây chùng dọc phố
      const cableMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
      for (let c = 0; c < 3; c++) {
        const loop = new THREE.Mesh(new THREE.TorusGeometry(0.38 + c * 0.08, 0.035, 6, 16), cableMat);
        loop.position.set(0.18, 5.8 - c * 0.4, 0.1);
        loop.rotation.y = Math.PI / 2 + (c * 0.2);
        pole24Group.add(loop);
      }
      group24.add(pole24Group);

      // 1.4. DÃY NHÀ PHỐ ẢNH CHỤP THỰC TẾ SỐ 24 NGÔ QUYỀN (Google Street View Pano 25 & Ảnh Người Dùng)
      const eliseHouse = this.createRealBuildingMesh(10.2, 12.0, 8.5, 'facade_elise_luxury.jpg', 0xf1f5f9, { 
        floors: 3, hasAwning: true, awningColor: '#1e1b4b',
        bladeSign: { title: 'ELISE', sub: 'FASHION BOUTIQUE', bg: '#0f172a', text: '#ffffff', accent: '#e2e8f0', shape: 'round', side: 'right' }
      });
      eliseHouse.position.set(12.0, 0.16, 4.0);
      eliseHouse.rotation.y = Math.PI / 2;
      group24.add(eliseHouse);

      const vangHouse = this.createRealBuildingMesh(9.8, 13.5, 8.5, 'facade_nq_vang_bac.jpg', 0xfef08a, { 
        floors: 4, hasAwning: true, awningColor: '#b45309',
        bladeSign: { title: 'VÀNG BẠC', sub: 'NGÔ QUYỀN 9999', bg: '#78350f', text: '#fde047', accent: '#facc15', shape: 'rect', side: 'left' }
      });
      vangHouse.position.set(12.0, 0.16, 14.5);
      vangHouse.rotation.y = Math.PI / 2;
      group24.add(vangHouse);

      const camDoHouse = this.createRealBuildingMesh(10.5, 13.0, 8.5, 'facade_nq_cam_do.jpg', 0xfde047, { 
        floors: 4, hasAwning: true, awningColor: '#dc2626',
        bladeSign: { title: 'CẦM ĐỒ', sub: 'UY TÍN 24/7', bg: '#991b1b', text: '#fef08a', accent: '#facc15', shape: 'rect', side: 'right' }
      });
      camDoHouse.position.set(12.0, 0.16, -6.5);
      camDoHouse.rotation.y = Math.PI / 2;
      group24.add(camDoHouse);

      // Hàng rào tôn đỏ & hàng cây xà cừ bên đối diện vỉa hè (Ảnh thực tế Pano 25)
      const redFenceMat = this.getRealFacadeMat('facade_nq_red_fence.jpg', { repeatX: 3, repeatY: 1 });
      const redFence = new THREE.Mesh(new THREE.PlaneGeometry(28.0, 3.2), redFenceMat);
      redFence.position.set(-10.5, 1.6, 4.0);
      redFence.rotation.y = Math.PI / 2;
      group24.add(redFence);

      // 1.5. XE Ô TÔ 7 CHỖ MÀU BẠC (TOYOTA INNOVA) ĐỖ BÊN ĐƯỜNG (local X = 5.8, Z = 8.0)
      const car7Group = this.createAnimeCarMesh('suv', 0xd1d5db, '88A-124.89');
      car7Group.position.set(5.8, 0.05, 8.0);
      group24.add(car7Group);

      nqGroup.add(group24);

      // ============================================================
      // PHẦN 2: NGÃ BA NGÔ QUYỀN - PHỐ LÊ XOAY (Waypoint 7: X = -185.0, Z = -15.0)
      // Dựa trực tiếp 100% theo ảnh Street View streetview_point2.jpg & Google Maps Link của User!
      // ============================================================
      const groupLX = new THREE.Group();
      groupLX.position.set(-185.0, 0, -15.0);
      groupLX.rotation.y = roadAngle;

      // 2.1. VẠCH KẺ ĐƯỜNG NGƯỜI ĐI BỘ (ZEBRA CROSSING) (Y = 0.056)
      const zebraMat = new THREE.MeshBasicMaterial({ color: 0xffffff, depthWrite: false });
      for (let zb = -5.0; zb <= 5.0; zb += 1.4) {
        const stripe = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 4.2), zebraMat);
        stripe.rotation.x = -Math.PI / 2;
        stripe.position.set(zb, 0.056, 0);
        groupLX.add(stripe);
      }

      // 2.2. NẮP CỐNG TRÒN GANG ĐÚC GIỮA LÒNG ĐƯỜNG (CAST-IRON MANHOLE) (Y = 0.056)
      const manholeCanvas = document.createElement('canvas');
      manholeCanvas.width = 128;
      manholeCanvas.height = 128;
      const mhCtx = manholeCanvas.getContext('2d');
      mhCtx.fillStyle = '#334155';
      mhCtx.beginPath();
      mhCtx.arc(64, 64, 60, 0, Math.PI * 2);
      mhCtx.fill();
      mhCtx.strokeStyle = '#1e293b';
      mhCtx.lineWidth = 4;
      mhCtx.stroke();
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        mhCtx.beginPath();
        mhCtx.moveTo(64, 64);
        mhCtx.lineTo(64 + Math.cos(a) * 52, 64 + Math.sin(a) * 52);
        mhCtx.stroke();
      }

      const manholeMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 1.2),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(manholeCanvas), transparent: true, depthWrite: false })
      );
      manholeMesh.rotation.x = -Math.PI / 2;
      manholeMesh.position.set(2.4, 0.056, 4.0);
      groupLX.add(manholeMesh);

      // 2.3. BIỂN BÁO NGƯỜI ĐI BỘ QUA ĐƯỜNG VỚI ĐẾ BÊ TÔNG SỌC VÀNG ĐEN ĐẶC TRƯNG VĨNH YÊN
      // Vị trí: Mép vỉa hè trước vạch qua đường (local X = 6.2, Z = -1.2), tuyệt đối không che mặt tiền tiệm
      const pedSignGroup = new THREE.Group();
      pedSignGroup.position.set(6.2, 0.16, -4.8);

      // Đế bê tông sọc vàng đen chống va chạm xe cộ
      const baseCanvas = document.createElement('canvas');
      baseCanvas.width = 128;
      baseCanvas.height = 128;
      const bCtx = baseCanvas.getContext('2d');
      bCtx.fillStyle = '#eab308';
      bCtx.fillRect(0, 0, 128, 128);
      bCtx.fillStyle = '#0f172a';
      for (let i = -128; i < 256; i += 32) {
        bCtx.beginPath();
        bCtx.moveTo(i, 0);
        bCtx.lineTo(i + 20, 0);
        bCtx.lineTo(i + 20 + 128, 128);
        bCtx.lineTo(i + 128, 128);
        bCtx.fill();
      }
      const pedBase = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.7, 0.8),
        new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(baseCanvas), roughness: 0.7 })
      );
      pedBase.position.y = 0.35;
      pedSignGroup.add(pedBase);

      // Cột sắt
      const pedPole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.8), new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 }));
      pedPole.position.y = 0.7 + 1.4;
      pedSignGroup.add(pedPole);

      // Biển vuông màu xanh W.423a
      const pedCanvas = document.createElement('canvas');
      pedCanvas.width = 128;
      pedCanvas.height = 128;
      const pctx = pedCanvas.getContext('2d');
      pctx.fillStyle = '#1d4ed8';
      pctx.fillRect(0, 0, 128, 128);
      pctx.fillStyle = '#ffffff';
      pctx.beginPath();
      pctx.moveTo(64, 16);
      pctx.lineTo(112, 112);
      pctx.lineTo(16, 112);
      pctx.closePath();
      pctx.fill();
      pctx.fillStyle = '#0f172a';
      pctx.beginPath();
      pctx.arc(64, 52, 10, 0, Math.PI * 2);
      pctx.fill();
      pctx.fillRect(58, 66, 12, 32);

      const pedSignMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.9, 0.9),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(pedCanvas), side: THREE.DoubleSide })
      );
      pedSignMesh.position.y = 3.2;
      pedSignMesh.rotation.y = Math.PI / 2;
      pedSignGroup.add(pedSignMesh);
      groupLX.add(pedSignGroup);

      // 2.4. BIỂN CẤM ĐỖ XE (CỘT SƠN ĐỎ TRẮNG PHẢN QUANG) & BIỂN TÊN "PHỐ LÊ XOAY"
      const signCornerGroup = new THREE.Group();
      signCornerGroup.position.set(6.2, 0.16, -3.2); // Đặt tại mép vỉa hè trước góc cua, 100% không che mặt tiền Huyền Hậu & Vinamilk

      // Cột sơn sọc đỏ trắng phản quang
      const stripeCanvas = document.createElement('canvas');
      stripeCanvas.width = 64;
      stripeCanvas.height = 256;
      const sCtx = stripeCanvas.getContext('2d');
      for (let y = 0; y < 256; y += 32) {
        sCtx.fillStyle = (Math.floor(y / 32) % 2 === 0) ? '#dc2626' : '#ffffff';
        sCtx.fillRect(0, y, 64, 32);
      }
      const stripedPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 3.2),
        new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(stripeCanvas), roughness: 0.5 })
      );
      stripedPole.position.y = 1.6;
      signCornerGroup.add(stripedPole);

      // Biển cấm đỗ xe (nền xanh viền đỏ gạch đỏ)
      const noParkCanvas = document.createElement('canvas');
      noParkCanvas.width = 128;
      noParkCanvas.height = 128;
      const npCtx = noParkCanvas.getContext('2d');
      npCtx.fillStyle = '#dc2626';
      npCtx.beginPath();
      npCtx.arc(64, 64, 60, 0, Math.PI * 2);
      npCtx.fill();
      npCtx.fillStyle = '#1d4ed8';
      npCtx.beginPath();
      npCtx.arc(64, 64, 46, 0, Math.PI * 2);
      npCtx.fill();
      npCtx.strokeStyle = '#dc2626';
      npCtx.lineWidth = 14;
      npCtx.beginPath();
      npCtx.moveTo(24, 24);
      npCtx.lineTo(104, 104);
      npCtx.stroke();

      const noParkTex = new THREE.CanvasTexture(noParkCanvas);
      const noParkMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.85, 0.85),
        new THREE.MeshBasicMaterial({ map: noParkTex, side: THREE.DoubleSide })
      );
      noParkMesh.position.y = 2.8;
      noParkMesh.rotation.y = Math.PI / 2;
      signCornerGroup.add(noParkMesh);

      // Biển tên đường chính xác: "PHỐ LÊ XOAY" (Gắn 2 mặt trước và sau để không bao giờ bị ngược chữ khi nhìn từ 2 hướng)
      const streetCanvas = document.createElement('canvas');
      streetCanvas.width = 256;
      streetCanvas.height = 80;
      const stnCtx = streetCanvas.getContext('2d');
      stnCtx.fillStyle = '#0f2a4a';
      stnCtx.fillRect(0, 0, 256, 80);
      stnCtx.lineWidth = 4;
      stnCtx.strokeStyle = '#ffffff';
      stnCtx.strokeRect(4, 4, 248, 72);
      stnCtx.fillStyle = '#ffffff';
      stnCtx.font = 'bold 28px "Nunito", Arial, sans-serif';
      stnCtx.textAlign = 'center';
      stnCtx.textBaseline = 'middle';
      stnCtx.fillText('PHỐ LÊ XOAY', 128, 40);

      const stnTex = new THREE.CanvasTexture(streetCanvas);
      // Mặt trước (hướng ra đường Ngô Quyền đón xe đi từ trường tới)
      const streetNameFront = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 0.5),
        new THREE.MeshBasicMaterial({ map: stnTex })
      );
      streetNameFront.position.set(0, 2.1, -0.01);
      streetNameFront.rotation.y = Math.PI;
      signCornerGroup.add(streetNameFront);

      // Mặt sau (hướng vào trong phố Lê Xoay)
      const streetNameBack = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 0.5),
        new THREE.MeshBasicMaterial({ map: stnTex })
      );
      streetNameBack.position.set(0, 2.1, 0.01);
      streetNameBack.rotation.y = 0;
      signCornerGroup.add(streetNameBack);

      groupLX.add(signCornerGroup);

      // 2.5. TÒA NHÀ GÓC PHỐ 4 TẦNG: TIỆM "HUYỀN HẬU" & "VINAMILK"
      // Vị trí: Góc ngã ba vỉa hè phía trước xe (local X = 12.5, Z = 6.0)
      const huyenHauGroup = new THREE.Group();
      huyenHauGroup.position.set(12.5, 0.16, 6.0);
      huyenHauGroup.rotation.y = Math.PI / 2; // Hướng mặt tiền ra đường Ngô Quyền

      // Khối nhà 4 tầng
      const hhBuilding = new THREE.Mesh(
        new THREE.BoxGeometry(10.5, 14.0, 8.5),
        new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.65 })
      );
      hhBuilding.position.set(0, 7.0, 4.25);
      hhBuilding.castShadow = true;
      huyenHauGroup.add(hhBuilding);

      // Mặt tiền ảnh chụp thực tế Tiệm Huyền Hậu & Vinamilk Ngã Ba Lê Xoay (Trích xuất từ Google Street View Pano 27)
      const hhMat = this.getRealFacadeMat('facade_nq_huyen_hau.jpg', { roughness: 0.55 });
      const hhFacade = new THREE.Mesh(new THREE.PlaneGeometry(10.5, 14.0), hhMat);
      hhFacade.position.set(0, 7.0, -0.05);
      hhFacade.rotation.y = Math.PI; // Mặt tiền hướng thẳng ra mặt phố
      hhFacade.castShadow = true;
      huyenHauGroup.add(hhFacade);

      // Tầng 1: Cửa kính showroom trưng bày chăn ga gối đệm
      const glassMatShowroom = new THREE.MeshStandardMaterial({ color: 0x93c5fd, roughness: 0.1, transparent: true, opacity: 0.6 });
      const glassDoor = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 3.0), glassMatShowroom);
      glassDoor.position.set(-1.2, 1.5, -0.05);
      glassDoor.rotation.y = Math.PI;
      huyenHauGroup.add(glassDoor);

      // Chồng chăn nệm sắc màu bên trong kính
      const quiltColors = [0xec4899, 0x3b82f6, 0xf59e0b, 0x10b981];
      quiltColors.forEach((qc, qi) => {
        const quilt = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 1.2), new THREE.MeshStandardMaterial({ color: qc, roughness: 0.8 }));
        quilt.position.set(-1.2 + (qi % 2) * 1.8 - 0.9, 0.4 + Math.floor(qi / 2) * 0.45, 0.8);
        huyenHauGroup.add(quilt);
      });

      // Biển vẫy LED chiếu sáng nhô ra vuông góc vỉa hè cho Tiệm Huyền Hậu & Vinamilk (Bố trí ở Y = 2.45m tránh che biển chính)
      const hhBlade = this.createProjectingBladeSign('HUYỀN HẬU', 'CHĂN GA GỐI ĐỆM', '#831843', '#fdf2f8', '#f472b6', 'rect');
      hhBlade.position.set(10.5 * 0.48, 2.45, -0.05);
      huyenHauGroup.add(hhBlade);

      const vmBlade = this.createProjectingBladeSign('VINAMILK', 'SỮA TƯƠI 100%', '#1e3a8a', '#ffffff', '#60a5fa', 'round');
      vmBlade.position.set(-10.5 * 0.48, 2.45, -0.05);
      huyenHauGroup.add(vmBlade);

      groupLX.add(huyenHauGroup);

      // 2.6. XE TOYOTA VIOS MÀU BẠC ĐỖ TRƯỚC TIỆM HUYỀN HẬU (local X = 5.8, Z = 9.5)
      const viosGroup = this.createAnimeCarMesh('sedan', 0xe2e8f0, '88A-256.32');
      viosGroup.position.set(5.8, 0.05, 9.5);
      groupLX.add(viosGroup);

      // 2.7. XE MÁY HONDA WAVE ALPHA DỰNG GỌN TRÊN VỈA HÈ
      const waveBike = this.createAnimeMotorbikeMesh(0xb91c1c);
      waveBike.position.set(7.5, 0.16, 5.5);
      waveBike.rotation.y = 0.4;
      groupLX.add(waveBike);

      // ============================================================
      // PHẦN 3: PHÍA ĐỐI DIỆN ĐƯỜNG (BÊN PHẢI): CÂY CỔ THỤ QUÉT VÔI & QUÁN TRÀ ĐÁ DÙ ĐỎ MẬN
      // Dựa trực tiếp ảnh streetview_point2.jpg bên phải ngã ba
      // ============================================================
      // 3.1. CÂY CỔ THỤ GỐC QUÉT VÔI TRẮNG (local X = -9.5, Z = 0.5)
      const giantTreeGroup = new THREE.Group();
      giantTreeGroup.position.set(-9.5, 0.16, 0.5);

      // Thân dưới quét vôi trắng (Y: 0 -> 1.9m)
      const bigTrunkWhite = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.95, 1.9, 14), trunkWhiteMat);
      bigTrunkWhite.position.y = 0.95;
      bigTrunkWhite.castShadow = true;
      giantTreeGroup.add(bigTrunkWhite);

      // Thân trên vỏ nâu xù xì (Y: 1.9 -> 5.8m)
      const bigTrunkBark = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 3.9, 12), trunkBarkMat);
      bigTrunkBark.position.y = 1.9 + 1.95;
      bigTrunkBark.castShadow = true;
      giantTreeGroup.add(bigTrunkBark);

      // Tán lá cây cổ thụ tỏa rộng che mát cả góc ngã ba
      const bigCrown1 = new THREE.Mesh(new THREE.SphereGeometry(4.6, 14, 12), leafMat);
      bigCrown1.position.set(0, 7.8, 0);
      bigCrown1.castShadow = true;
      giantTreeGroup.add(bigCrown1);

      const bigCrown2 = new THREE.Mesh(new THREE.SphereGeometry(3.6, 12, 10), leafMat);
      bigCrown2.position.set(2.0, 7.2, 1.5);
      giantTreeGroup.add(bigCrown2);

      const bigCrown3 = new THREE.Mesh(new THREE.SphereGeometry(3.2, 10, 8), leafMat);
      bigCrown3.position.set(-1.8, 7.0, -1.5);
      giantTreeGroup.add(bigCrown3);
      groupLX.add(giantTreeGroup);

      // 3.2. QUÁN NƯỚC TRÀ ĐÁ VỈA HÈ DƯỚI BÓNG CÂY VỚI DÙ ĐỎ MẬN CHÍN (local X = -9.0, Z = -3.5)
      const teaStallGroup = new THREE.Group();
      teaStallGroup.position.set(-9.0, 0.16, -3.5);

      // Cây dù tròn màu đỏ đô/mận chín đặc trưng quán nước Việt Nam
      const umbrellaPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.7), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 }));
      umbrellaPole.position.y = 1.35;
      teaStallGroup.add(umbrellaPole);

      const umbrellaMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.65 }); // Đỏ đô / Maroon
      const umbrellaCanopy = new THREE.Mesh(new THREE.ConeGeometry(1.85, 0.75, 16), umbrellaMat);
      umbrellaCanopy.position.y = 2.7;
      umbrellaCanopy.castShadow = true;
      teaStallGroup.add(umbrellaCanopy);

      // Bàn gỗ thấp
      const teaTable = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.55, 0.75), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 }));
      teaTable.position.set(0, 0.275, 0);
      teaStallGroup.add(teaTable);

      // Ấm tích ủ trong giỏ mây
      const teaPot = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.28, 10), new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 }));
      teaPot.position.set(-0.25, 0.69, 0);
      teaStallGroup.add(teaPot);

      // Hũ thủy tinh kẹo lạc & cốc trà đá vàng
      const candyJar = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.22, 8), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 }));
      candyJar.position.set(0.25, 0.66, 0.1);
      teaStallGroup.add(candyJar);

      const icedTea = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.12, 8), new THREE.MeshStandardMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.8 }));
      icedTea.position.set(0.05, 0.61, -0.15);
      teaStallGroup.add(icedTea);

      // Ghế nhựa xanh đỏ Song Long xếp xung quanh
      const stoolColors = [0xef4444, 0x3b82f6, 0xef4444, 0x10b981, 0x3b82f6];
      [[-0.8, -0.5], [0.8, -0.5], [-0.7, 0.6], [0.7, 0.6], [0, 0.9]].forEach(([sx, sz], sidx) => {
        const stool = new THREE.Mesh(
          new THREE.BoxGeometry(0.35, 0.3, 0.35),
          new THREE.MeshStandardMaterial({ color: stoolColors[sidx], roughness: 0.5 })
        );
        stool.position.set(sx, 0.15, sz);
        teaStallGroup.add(stool);
      });

      // Xe Wave dựng hóng mát cạnh quán nước
      const teaBike = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.7, 1.5), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 }));
      teaBike.position.set(-1.6, 0.35, 0.5);
      teaBike.rotation.y = -0.3;
      teaStallGroup.add(teaBike);

      groupLX.add(teaStallGroup);

      nqGroup.add(groupLX);

      this.cityGroup.add(nqGroup);
    }

    // ------------------------------------------------------------
    // 6.6. NGÕ 141 TRẦN QUỐC TUẤN & NGÕ VEN HỒ ĐẦM VẠC (CHIBI REALISM)
    // Tái tạo bản sao kỹ thuật số cách điệu 1:1 theo Google Street View
    // ------------------------------------------------------------
    buildCityAlleys() {
      const alleyGroup = new THREE.Group();

      // ==========================================================
      // A. NGÕ 141 TRẦN QUỐC TUẤN (TỔ DÂN PHỐ SỐ 8)
      // Cổng ngõ nằm chính diện đối diện Cổng Trường Ngô Quyền tại X = 0, Z = 72.8
      // Con ngõ đâm sâu về phía Bắc (Z > 73) vào khu dân cư văn hóa
      // ==========================================================
      const alley141 = new THREE.Group();
      alley141.position.set(0.0, 0.16, 72.8);

      // 1. CỔNG NGÕ 141 (VÒM GẠCH ĐỎ & BIỂN HIỆU TỔ DÂN PHỐ SỐ 8)
      const brickMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.75 });
      const archMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.6 });
      const tileMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.5 });

      // Trụ cổng trái & phải (bo góc tròn Chibi)
      [-2.1, 2.1].forEach(px => {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.75, 4.5, 0.75), brickMat);
        pillar.position.set(px, 2.25, 0);
        pillar.castShadow = true;
        alley141.add(pillar);

        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.4, 0.9), archMat);
        cap.position.set(px, 4.6, 0);
        alley141.add(cap);

        const globe = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), archMat);
        globe.position.set(px, 4.95, 0);
        alley141.add(globe);
      });

      // Xà vòm cuốn nối 2 trụ cổng
      const lintel = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.7, 0.7), archMat);
      lintel.position.set(0, 4.2, 0);
      alley141.add(lintel);

      // Mái ngói cong cổ kính trên đỉnh cổng
      const roof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 1.0, 4), tileMat);
      roof.rotation.y = Math.PI / 4;
      roof.position.set(0, 4.85, 0);
      alley141.add(roof);

      // Biển hiệu ngõ: "TỔ DÂN PHỐ SỐ 8 - NGÕ 141 TRẦN QUỐC TUẤN"
      const signCanvas = document.createElement('canvas');
      signCanvas.width = 1024;
      signCanvas.height = 320;
      const sctx = signCanvas.getContext('2d');
      sctx.fillStyle = '#991b1b';
      sctx.roundRect(10, 10, 1004, 300, 24);
      sctx.fill();
      sctx.strokeStyle = '#facc15';
      sctx.lineWidth = 12;
      sctx.roundRect(16, 16, 992, 288, 20);
      sctx.stroke();

      sctx.fillStyle = '#fef08a';
      sctx.font = 'bold 44px "Nunito", Arial';
      sctx.textAlign = 'center';
      sctx.fillText('⭐ TỔ DÂN PHỐ SỐ 8 ⭐', 512, 75);

      sctx.fillStyle = '#ffffff';
      sctx.font = '900 68px "Nunito", Arial';
      sctx.fillText('NGÕ 141 TRẦN QUỐC TUẤN', 512, 175);

      sctx.fillStyle = '#fef08a';
      sctx.font = 'bold 40px "Nunito", Arial';
      sctx.fillText('📍 KHU DÂN CƯ VĂN HÓA TIÊU BIỂU', 512, 260);

      const signMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.8, 1.3),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(signCanvas) })
      );
      signMesh.position.set(0, 3.85, 0.38);
      alley141.add(signMesh);

      // 2. LÒNG NGÕ BÊ TÔNG 42M X 3.8M (CON NGÕ DÂN SINH ĐI SÂU VÀO TRONG)
      const alleyRoad = new THREE.Mesh(
        new THREE.BoxGeometry(3.8, 0.16, 42.0),
        new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.82 })
      );
      alleyRoad.position.set(0, 0.08, 21.0);
      alleyRoad.receiveShadow = true;
      alley141.add(alleyRoad);

      // Gờ vỉa hè hai bên ngõ
      const curbMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 });
      [-2.05, 2.05].forEach(cx => {
        const curb = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 42.0), curbMat);
        curb.position.set(cx, 0.11, 21.0);
        alley141.add(curb);
      });

      // Nắp hố ga tròn gang đúc trong ngõ
      const manholeMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.4 });
      [8.0, 26.0].forEach(mz => {
        const mh = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.04, 16), manholeMat);
        mh.position.set(0, 0.17, mz);
        alley141.add(mh);
      });

      // 3. NHÀ DÂN DỌC THEO NGÕ 141
      // A. Nhà Số 2 (Bên phải, Z = 10.0): Có Giàn hoa giấy Chibi và xe Dream dựng trước cửa
      const house2Group = new THREE.Group();
      house2Group.position.set(5.1, 0, 10.0);

      const h2Body = new THREE.Mesh(
        new THREE.BoxGeometry(6.0, 7.2, 7.8),
        new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.65 })
      );
      h2Body.position.y = 3.6;
      h2Body.castShadow = true;
      house2Group.add(h2Body);

      // Cửa sắt kéo xếp màu xanh rêu Chibi ở tầng 1
      const ironDoor = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 2.8, 3.2),
        new THREE.MeshStandardMaterial({ color: 0x166534, metalness: 0.5, roughness: 0.35 })
      );
      ironDoor.position.set(-3.05, 1.4, 0);
      house2Group.add(ironDoor);

      // Bậc tam cấp đá mài
      const step = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.16, 3.4), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
      step.position.set(-3.25, 0.08, 0);
      house2Group.add(step);

      // Biển số nhà: "Số 2"
      const numCanvas = document.createElement('canvas');
      numCanvas.width = 128;
      numCanvas.height = 96;
      const nctx = numCanvas.getContext('2d');
      nctx.fillStyle = '#0284c7';
      nctx.roundRect(4, 4, 120, 88, 12);
      nctx.fill();
      nctx.strokeStyle = '#fff';
      nctx.lineWidth = 4;
      nctx.strokeRect(6, 6, 116, 84);
      nctx.fillStyle = '#ffffff';
      nctx.font = 'bold 42px "Nunito", Arial';
      nctx.textAlign = 'center';
      nctx.fillText('Số 2', 64, 60);

      const numMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.3), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(numCanvas) }));
      numMesh.position.set(-3.06, 2.5, 2.1);
      numMesh.rotation.y = -Math.PI / 2;
      house2Group.add(numMesh);

      // Ban công tầng 2 có GIÀN HOA GIẤY (BOUGAINVILLEA) Chibi màu hồng tím rực rỡ
      const bal2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.85, 4.2), new THREE.MeshStandardMaterial({ color: 0x334155 }));
      bal2.position.set(-3.3, 3.8, 0);
      house2Group.add(bal2);

      const flowerMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.4 });
      for (let f = 0; f < 18; f++) {
        const flower = new THREE.Mesh(new THREE.SphereGeometry(0.22 + (f % 3) * 0.08, 8, 8), flowerMat);
        flower.position.set(-3.4 - (f % 2) * 0.15, 3.6 + (f % 4) * 0.35, -1.8 + f * 0.22);
        house2Group.add(flower);
      }

      // Xe máy Honda Dream II Chibi dựng nghiêng trước cửa nhà số 2
      const dreamGroup = new THREE.Group();
      dreamGroup.position.set(-2.4, 0.08, -1.2);
      dreamGroup.rotation.y = Math.PI / 3;
      const dreamBody = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 1.3), new THREE.MeshStandardMaterial({ color: 0x831843 }));
      dreamBody.position.y = 0.42;
      dreamGroup.add(dreamBody);
      const dreamShield = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.55, 0.15), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
      dreamShield.position.set(0, 0.55, 0.35);
      dreamGroup.add(dreamShield);
      house2Group.add(dreamGroup);

      alley141.add(house2Group);

      // B. Nhà Số 4 (Bên phải, Z = 26.0): Có dây phơi quần áo Chibi
      const house4Group = new THREE.Group();
      house4Group.position.set(5.1, 0, 26.0);
      const h4Body = new THREE.Mesh(
        new THREE.BoxGeometry(6.0, 8.4, 8.0),
        new THREE.MeshStandardMaterial({ color: 0xe0f2fe, roughness: 0.65 })
      );
      h4Body.position.y = 4.2;
      h4Body.castShadow = true;
      house4Group.add(h4Body);

      // Dây phơi quần áo Chibi trên ban công (áo trắng, khăn quàng đỏ)
      const clothesLine = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 3.8), new THREE.MeshBasicMaterial({ color: 0x94a3b8 }));
      clothesLine.rotation.z = Math.PI / 2;
      clothesLine.position.set(-3.2, 4.5, 0);
      house4Group.add(clothesLine);

      // Áo sơ mi học sinh trắng & khăn quàng đỏ phơi trên dây
      const shirt = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.5), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      shirt.position.set(-3.2, 4.2, -0.6);
      house4Group.add(shirt);

      const scarf = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.2), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
      scarf.position.set(-3.2, 4.3, 0.4);
      house4Group.add(scarf);

      alley141.add(house4Group);

      // C. Nhà Số 1 (Bên trái, Z = 10.0): Tường gạch mộc, chậu cây cảnh bonsai, hộp công tơ điện
      const house1Group = new THREE.Group();
      house1Group.position.set(-5.1, 0, 10.0);
      const h1Body = new THREE.Mesh(
        new THREE.BoxGeometry(6.0, 7.5, 7.8),
        new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.75 })
      );
      h1Body.position.y = 3.75;
      h1Body.castShadow = true;
      house1Group.add(h1Body);

      // Hộp công tơ điện màu trắng gắn tường Chibi
      const meterBox = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.4), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 }));
      meterBox.position.set(3.05, 1.8, 1.5);
      house1Group.add(meterBox);

      // Chậu cây cảnh bonsai dưới chân tường
      for (let p = 0; p < 4; p++) {
        const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.28, 8), new THREE.MeshStandardMaterial({ color: 0x92400e }));
        pot.position.set(2.4, 0.14, -1.8 + p * 1.1);
        house1Group.add(pot);

        const plant = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 8), new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.5 }));
        plant.position.set(2.4, 0.38, -1.8 + p * 1.1);
        house1Group.add(plant);
      }

      alley141.add(house1Group);

      // D. Mèo tam thể Chibi nằm lười trên bờ tường ngõ
      const catGroup = new THREE.Group();
      catGroup.position.set(-2.2, 2.2, 5.0);
      const catBody = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
      catBody.scale.set(1.4, 0.8, 0.9);
      catGroup.add(catBody);
      const catHead = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), new THREE.MeshStandardMaterial({ color: 0xffedd5 }));
      catHead.position.set(0.24, 0.1, 0);
      catGroup.add(catHead);
      alley141.add(catGroup);

      alleyGroup.add(alley141);
      this.cityGroup.add(alleyGroup);
    }

    // ------------------------------------------------------------
    // 6.7. QUÁN ĂN SÁNG, TRÀ ĐÁ VỈA HÈ, XE KEM MERINO & SHOP (CHIBI REALISM)
    // Tái tạo đời sống đường phố Việt Nam sống động, ấm cúng
    // ------------------------------------------------------------
    buildStreetFoodAndShops() {
      const foodGroup = new THREE.Group();

      // ==========================================================
      // 1. QUÁN PHỞ BÒ GIA TRUYỀN HÀ NỘI / ĂN SÁNG (X = -26.0, Z = 70.2)
      // Tọa lạc ngay trên vỉa hè trước Quán Phở Bò số 141 Trần Quốc Tuấn
      // ==========================================================
      const phoGroup = new THREE.Group();
      phoGroup.position.set(-26.0, 0.16, 70.2);

      // Biển vẫy chữ A truyền thống đặt trên vỉa hè (Cao 1.1m, tuyệt đối không che biển chính tòa nhà)
      const aSignCanvas = document.createElement('canvas');
      aSignCanvas.width = 256;
      aSignCanvas.height = 384;
      const actx = aSignCanvas.getContext('2d');
      actx.fillStyle = '#ea580c';
      actx.roundRect(6, 6, 244, 372, 16);
      actx.fill();
      actx.strokeStyle = '#fef08a';
      actx.lineWidth = 6;
      actx.strokeRect(10, 10, 236, 364);

      actx.fillStyle = '#fef08a';
      actx.font = 'bold 26px Nunito, Arial';
      actx.textAlign = 'center';
      actx.fillText('🍜 PHỞ BÒ LÝ', 128, 55);
      actx.fillStyle = '#ffffff';
      actx.font = 'bold 18px Nunito, Arial';
      actx.fillText('GIA TRUYỀN HÀ NỘI', 128, 90);
      actx.fillText('BÁNH MÌ PÂTÉ GIÒN', 128, 125);
      actx.fillText('CHÁO DINH DƯỠNG', 128, 160);
      actx.fillStyle = '#fde047';
      actx.font = '900 16px Nunito, Arial';
      actx.fillText('SỐ 141 TRẦN QUỐC TUẤN', 128, 340);

      const aSignMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(aSignCanvas), side: THREE.DoubleSide });
      const aSignGroup = new THREE.Group();
      aSignGroup.position.set(2.0, 0.55, -0.6);

      const aPlane1 = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 1.1), aSignMat);
      aPlane1.rotation.x = Math.PI / 14;
      aPlane1.rotation.y = Math.PI;
      aSignGroup.add(aPlane1);

      const aPlane2 = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 1.1), aSignMat);
      aPlane2.rotation.x = -Math.PI / 14;
      aSignGroup.add(aPlane2);
      phoGroup.add(aSignGroup);

      // 1. XE PHỞ INOX CHUẨN ĐƯỜNG PHỐ VIỆT NAM (ARTISAN GHIBLI PHO CART)
      const inoxMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.88, roughness: 0.18 });
      const inoxDarkMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.80, roughness: 0.25 });
      const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 });
      const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
      const glassCartMat = new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.45, roughness: 0.1 });

      const phoCartGroup = new THREE.Group();
      phoCartGroup.position.set(0, 0, -0.8);

      // Thân quầy xe Inox chính
      const cartBody = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.88, 1.05), inoxMat);
      cartBody.position.y = 0.44 + 0.12;
      cartBody.castShadow = true;
      phoCartGroup.add(cartBody);

      // Bánh xe cao su có nan hoa 2 bên đầu xe
      const wheelRubberMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85 });
      [-1.25, 1.25].forEach(wx => {
        const cartWheel = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 16), wheelRubberMat);
        cartWheel.rotation.z = Math.PI / 2;
        cartWheel.position.set(wx, 0.16, 0.54);
        phoCartGroup.add(cartWheel);
      });

      // Tủ kính trưng bày thịt bò tái lăn, nạm, gà ta bên trái xe
      const glassCase = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.72, 0.95), glassCartMat);
      glassCase.position.set(-0.65, 0.88 + 0.12 + 0.36, 0);
      phoCartGroup.add(glassCase);

      // Khung nhôm bao quanh tủ kính
      const frameMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.9, roughness: 0.2 });
      const topFrame = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.04, 0.97), frameMat);
      topFrame.position.set(-0.65, 0.88 + 0.12 + 0.74, 0);
      phoCartGroup.add(topFrame);

      // Thớt gỗ nghiến tròn thái thịt bò bên trong tủ kính
      const cuttingBoard = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 16), woodMat);
      cuttingBoard.position.set(-0.75, 0.88 + 0.12 + 0.05, 0.1);
      phoCartGroup.add(cuttingBoard);

      // Chồng bát sứ trắng tinh khôi chuẩn bị chan nước dùng
      for (let b = 0; b < 4; b++) {
        const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.07, 0.06, 12), ceramicMat);
        bowl.position.set(-0.35, 0.88 + 0.12 + 0.04 + b * 0.05, 0.1);
        phoCartGroup.add(bowl);
      }

      // Đĩa chanh ớt tươi & hành hoa thái nhỏ
      const limeHerb = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.10, 0.04, 12),
        new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.5 })
      );
      limeHerb.position.set(-0.35, 0.88 + 0.12 + 0.03, -0.25);
      phoCartGroup.add(limeHerb);

      // Nồi nước dùng Inox siêu to khổng lồ đang sôi sùng sục bên phải xe
      const bigPot = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.34, 0.68, 20), inoxMat);
      bigPot.position.set(0.75, 0.88 + 0.12 + 0.34, 0);
      bigPot.castShadow = true;
      phoCartGroup.add(bigPot);

      // Vành mép & quai nồi Inox
      const potRim = new THREE.Mesh(new THREE.TorusGeometry(0.39, 0.025, 8, 20), inoxDarkMat);
      potRim.rotation.x = Math.PI / 2;
      potRim.position.set(0.75, 0.88 + 0.12 + 0.68, 0);
      phoCartGroup.add(potRim);

      // Nồi trần bánh phở nhỏ hơn bên cạnh
      const blanchPot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.20, 0.52, 16), inoxMat);
      blanchPot.position.set(0.18, 0.88 + 0.12 + 0.26, 0.12);
      phoCartGroup.add(blanchPot);

      // Biển hiệu đèn LED đỏ rực trên nóc xe Phở: "PHỞ LÝ • BÒ TÁI LĂN"
      const cartSignCanvas = document.createElement('canvas');
      cartSignCanvas.width = 512; cartSignCanvas.height = 96;
      const csctx = cartSignCanvas.getContext('2d');
      csctx.fillStyle = '#991b1b';
      csctx.fillRect(0, 0, 512, 96);
      csctx.strokeStyle = '#fde047';
      csctx.lineWidth = 6;
      csctx.strokeRect(4, 4, 504, 88);
      csctx.fillStyle = '#fde047';
      csctx.font = '900 42px "Nunito", Arial, sans-serif';
      csctx.textAlign = 'center';
      csctx.fillText('🍜 PHỞ LÝ - BÒ TÁI LĂN • SỐT VANG', 256, 62);

      const cartSignMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.4, 0.45),
        new THREE.MeshStandardMaterial({
          map: new THREE.CanvasTexture(cartSignCanvas),
          emissive: 0x991b1b,
          emissiveIntensity: 0.3,
          side: THREE.DoubleSide
        })
      );
      cartSignMesh.position.set(0, 0.88 + 0.12 + 0.88, 0.54);
      cartSignMesh.rotation.y = Math.PI; // Hướng mặt trước ra vỉa hè đón khách (chữ chuẩn không bị ngược gương)
      phoCartGroup.add(cartSignMesh);

      // Hạt khói phở thơm lừng bốc nghi ngút (Particle Steam Chibi)
      this.steamPuffs = [];
      const steamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.65 });
      for (let s = 0; s < 4; s++) {
        const steam = new THREE.Mesh(new THREE.SphereGeometry(0.12 + s * 0.05, 8, 8), steamMat);
        steam.position.set(0.75, 1.8 + s * 0.26, 0);
        phoCartGroup.add(steam);
        this.steamPuffs.push(steam);
      }
      phoGroup.add(phoCartGroup);

      // Bàn ghế nhựa Song Long màu đỏ & xanh lá Chibi
      const tableRedMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
      const stoolBlueMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 });

      const phoTable = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.55, 0.75), tableRedMat);
      phoTable.position.set(0.6, 0.28, 0.75);
      phoGroup.add(phoTable);

      // Ống đũa gỗ & lọ tương ớt Chin-su trên bàn
      const chopstickCup = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.16, 8), woodMat);
      chopstickCup.position.set(0.35, 0.55 + 0.08, 0.75);
      phoGroup.add(chopstickCup);

      const chiliBottle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.14, 8), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      chiliBottle.position.set(0.48, 0.55 + 0.07, 0.75);
      phoGroup.add(chiliBottle);

      [[-0.45, 0.75], [0.45, 0.75], [0.6, 1.25], [0.6, 0.25]].forEach(([sx, sz]) => {
        const stool = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.28, 0.3), stoolBlueMat);
        stool.position.set(sx, 0.14, sz);
        phoGroup.add(stool);
      });

      // Vòng tròn tương tác [E] Ăn Phở Bò Bát Đàn
      const triggerCanvas = document.createElement('canvas');
      triggerCanvas.width = 256;
      triggerCanvas.height = 256;
      const tctx = triggerCanvas.getContext('2d');
      tctx.fillStyle = '#f97316';
      tctx.beginPath();
      tctx.arc(128, 128, 110, 0, Math.PI * 2);
      tctx.fill();
      tctx.fillStyle = '#ffffff';
      tctx.font = 'bold 44px Nunito, Arial';
      tctx.textAlign = 'center';
      tctx.fillText('🍜 [E]', 128, 145);

      const phoTrigger = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 1.6),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(triggerCanvas), transparent: true })
      );
      phoTrigger.rotation.x = -Math.PI / 2;
      phoTrigger.position.set(0.6, 0.065, 0.6);
      phoGroup.add(phoTrigger);

      foodGroup.add(phoGroup);

      // ==========================================================
      // 2. QUÁN TRÀ ĐÁ VỈA HÈ CHIBI (X = -13.0, Z = 70.2)
      // Tọa lạc trên vỉa hè trước Quán Trà Đá Điểm Hẹn
      // ==========================================================
      const teaGroup = new THREE.Group();
      teaGroup.position.set(-13.0, 0.16, 70.2);

      // Ô che nắng dù bạt 7 màu Chibi
      const umbrellaGroup = new THREE.Group();
      umbrellaGroup.position.set(0, 0, 0);

      const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
      const uPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2), poleMat);
      uPole.position.y = 1.6;
      umbrellaGroup.add(uPole);

      const uCanvasMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5 });
      const uCanopy = new THREE.Mesh(new THREE.ConeGeometry(1.9, 0.65, 12), uCanvasMat);
      uCanopy.position.y = 3.0;
      umbrellaGroup.add(uCanopy);
      teaGroup.add(umbrellaGroup);

      // Chiếc bàn nhựa Song Long đỏ
      const teaTable = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.52, 0.55), tableRedMat);
      teaTable.position.set(0, 0.26, 0.4);
      teaGroup.add(teaTable);

      // 4 Ghế nhựa lùn Song Long xanh & đỏ
      [[-0.45, 0.4], [0.45, 0.4], [0, 0.85], [0, -0.05]].forEach(([sx, sz], i) => {
        const stool = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.26, 0.28), i % 2 === 0 ? stoolBlueMat : tableRedMat);
        stool.position.set(sx, 0.13, sz);
        teaGroup.add(stool);
      });

      // Phích nước Rạng Đông lùn béo tròn màu đỏ in hoa
      const thermosMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
      const thermos = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.32, 12), thermosMat);
      thermos.position.set(0.18, 0.68, 0.4);
      teaGroup.add(thermos);

      // Khay ấm chén Bát Tràng men rạn
      const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.03, 12), new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }));
      tray.position.set(-0.12, 0.53, 0.4);
      teaGroup.add(tray);

      const teapot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshStandardMaterial({ color: 0x15803d }));
      teapot.position.set(-0.12, 0.6, 0.4);
      teaGroup.add(teapot);

      // Điếu cày bằng ống tre Chibi
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.65, 8), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 }));
      pipe.position.set(0.42, 0.35, 0.6);
      pipe.rotation.z = Math.PI / 4;
      teaGroup.add(pipe);

      foodGroup.add(teaGroup);

      // ==========================================================
      // 3. TIỆM SỬA XE MÁY & BƠM VÁ CHIBI (X = -48.0, Z = 70.2)
      // ==========================================================
      const mechanicGroup = new THREE.Group();
      mechanicGroup.position.set(-48.0, 0.16, 70.2);

      // Máy nén khí Puma màu đỏ béo mập
      const compMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.45 });
      const compressor = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.65, 12), compMat);
      compressor.rotation.z = Math.PI / 2;
      compressor.position.set(0, 0.35, 0);
      mechanicGroup.add(compressor);

      // Chậu nhôm đựng nước để thử săm lốp sủi bọt
      const tubMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
      const tub = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.25, 0.16, 12), tubMat);
      tub.position.set(0.7, 0.08, 0.3);
      mechanicGroup.add(tub);

      // Kệ để dầu nhớt Castrol & Honda (chai đỏ & bạc)
      for (let b = 0; b < 4; b++) {
        const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8), new THREE.MeshStandardMaterial({ color: b % 2 === 0 ? 0xdc2626 : 0xf8fafc }));
        bottle.position.set(-0.6, 0.1 + (b % 2) * 0.22, -0.4 + Math.floor(b / 2) * 0.2);
        mechanicGroup.add(bottle);
      }

      foodGroup.add(mechanicGroup);

      // ==========================================================
      // 4. XE ĐẨY KEM MERINO CHIBI (X = 8.5, Z = 55.4 - VỈA HÈ TRƯỜNG NGÔ QUYỀN)
      // ==========================================================
      const iceGroup = new THREE.Group();
      iceGroup.position.set(8.5, 0.16, 55.4);

      const cartMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      const iceCart = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.75, 0.8), cartMat);
      iceCart.position.y = 0.45;
      iceGroup.add(iceCart);

      // Dù che màu đỏ tròn Merino
      const merinoUmbrella = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.4, 10), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
      merinoUmbrella.position.set(0, 1.8, 0);
      iceGroup.add(merinoUmbrella);

      const mPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.6), poleMat);
      mPole.position.set(0, 1.0, 0);
      iceGroup.add(mPole);

      foodGroup.add(iceGroup);

      this.cityGroup.add(foodGroup);
    }

    // ------------------------------------------------------------
    // 6.8. CƯ DÂN & NPC CHIBI ĐỜI SỐNG VIỆT NAM (18+ NHÂN VẬT HOẠT HỌA)
    // Tỉ lệ 2-3 heads tall, cử động tự nhiên, lời thoại tiếng Việt dí dỏm
    // ------------------------------------------------------------
    buildPedestriansAndNPCs() {
      this.npcs = [];
      const npcGroup = new THREE.Group();

      const skinMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.5 });
      const hairBlackMat = new THREE.MeshStandardMaterial({ color: 0x1e1b18, roughness: 0.6 });

      // Helper: Tạo Texture khuôn mặt Anime Chibi biểu cảm cao cấp
      const createChibiFaceTexture = () => {
        const fCanvas = document.createElement('canvas');
        fCanvas.width = 256; fCanvas.height = 256;
        const fctx = fCanvas.getContext('2d');
        fctx.fillStyle = '#ffedd5';
        fctx.fillRect(0, 0, 256, 256);

        // Má hồng đào anime phơn phớt
        fctx.fillStyle = 'rgba(244, 63, 94, 0.35)';
        fctx.beginPath(); fctx.ellipse(65, 145, 26, 14, 0, 0, Math.PI * 2); fctx.fill();
        fctx.beginPath(); fctx.ellipse(191, 145, 26, 14, 0, 0, Math.PI * 2); fctx.fill();

        // Mắt Anime to tròn long lanh có gradient và catchlight
        [-1, 1].forEach(side => {
          const cx = side === -1 ? 75 : 181;
          const grad = fctx.createLinearGradient(cx, 80, cx, 145);
          grad.addColorStop(0, '#0f172a');
          grad.addColorStop(0.5, '#1e1b4b');
          grad.addColorStop(1, '#4338ca');
          fctx.fillStyle = grad;
          fctx.beginPath();
          fctx.ellipse(cx, 110, 24, 30, 0, 0, Math.PI * 2);
          fctx.fill();

          // Viền mi mắt cong đen tuyền
          fctx.strokeStyle = '#020617';
          fctx.lineWidth = 4.5;
          fctx.beginPath();
          fctx.arc(cx, 106, 25, Math.PI * 1.15, Math.PI * 1.85);
          fctx.stroke();

          // Catchlights
          fctx.fillStyle = '#ffffff';
          fctx.beginPath(); fctx.arc(cx - 7, 98, 7.5, 0, Math.PI * 2); fctx.fill();
          fctx.beginPath(); fctx.arc(cx + 8, 122, 4, 0, Math.PI * 2); fctx.fill();

          // Lông mày
          fctx.strokeStyle = '#3e1f0e';
          fctx.lineWidth = 3;
          fctx.beginPath();
          fctx.arc(cx, 75, 18, Math.PI * 1.25, Math.PI * 1.75);
          fctx.stroke();
        });

        // Nụ cười xinh xắn
        fctx.strokeStyle = '#e11d48';
        fctx.lineWidth = 3.5;
        fctx.beginPath();
        fctx.arc(128, 158, 14, 0.15, Math.PI - 0.15);
        fctx.stroke();

        const tex = new THREE.CanvasTexture(fCanvas);
        tex.minFilter = THREE.LinearFilter;
        return tex;
      };

      const chibiFaceTex = createChibiFaceTexture();
      const whiteSoleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      const shoeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
      const whiteCollarMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });

      const createChibiHumanoid = (cfg) => {
        const root = new THREE.Group();
        root.position.set(cfg.pos.x, cfg.pos.y || 0, cfg.pos.z);
        root.rotation.y = cfg.rotY || 0;

        // Torso Chibi
        const shirtMat = new THREE.MeshStandardMaterial({ color: cfg.shirtColor || 0xffffff, roughness: 0.5 });
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 0.52, 12), shirtMat);
        torso.position.y = cfg.isSitting ? 0.38 : 0.58;
        torso.castShadow = true;
        root.add(torso);

        // Cổ áo trắng học sinh / sơ mi
        const collar = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 6, 16, Math.PI), whiteCollarMat);
        collar.rotation.x = Math.PI / 2;
        collar.position.set(0, (cfg.isSitting ? 0.38 : 0.58) + 0.26, 0.05);
        root.add(collar);

        // Khăn quàng đỏ Đội viên Thiếu niên Tiền phong có dải nơ bay
        if (cfg.hasRedScarf) {
          const scarfMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
          const scarf = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.28, 4), scarfMat);
          scarf.position.set(0, (cfg.isSitting ? 0.38 : 0.58) + 0.16, 0.15);
          scarf.rotation.x = Math.PI / 4;
          root.add(scarf);

          // Hai dải khăn quàng đỏ rủ xuống ngực
          [-0.04, 0.04].forEach((tx, ti) => {
            const tail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.20, 0.015), scarfMat);
            tail.position.set(tx, (cfg.isSitting ? 0.38 : 0.58) + 0.04, 0.20);
            tail.rotation.z = ti === 0 ? 0.15 : -0.15;
            root.add(tail);
          });
        }

        // Đầu Chibi to tròn mắt anime
        const headGroup = new THREE.Group();
        headGroup.position.y = (cfg.isSitting ? 0.38 : 0.58) + 0.44;
        const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 16), skinMat);
        headMesh.castShadow = true;
        headGroup.add(headMesh);

        // Mặt Anime HD cong ôm khít trán & má
        const facePlane = new THREE.Mesh(
          new THREE.PlaneGeometry(0.32, 0.32),
          new THREE.MeshBasicMaterial({ map: chibiFaceTex, transparent: true })
        );
        facePlane.position.set(0, 0.01, 0.252);
        headGroup.add(facePlane);

        // Mũ / Tóc Anime
        if (cfg.hat === 'pith') {
          // Mũ cối bộ đội / bảo vệ xanh lá
          const pith = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 14, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x15803d }));
          pith.position.y = 0.08;
          headGroup.add(pith);
          const pithRim = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.03, 16), new THREE.MeshStandardMaterial({ color: 0x15803d }));
          pithRim.position.y = 0.08;
          headGroup.add(pithRim);
        } else if (cfg.hat === 'helmet') {
          // Nón bảo hiểm xe máy có kính chắn gió
          const helm = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 14, 0, Math.PI * 2, 0, Math.PI / 1.7), new THREE.MeshStandardMaterial({ color: cfg.helmetColor || 0xef4444, roughness: 0.3 }));
          helm.position.y = 0.06;
          headGroup.add(helm);
        } else {
          // Tóc Anime nhiều lớp có mái bồng bềnh
          const hair = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 14, 0, Math.PI * 2, 0, Math.PI * 0.65), hairBlackMat);
          hair.position.y = 0.05;
          headGroup.add(hair);

          // Lọn tóc mái anime trước trán
          const bangs = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.16, 8), hairBlackMat);
          bangs.rotation.x = Math.PI / 1.8;
          bangs.rotation.z = -0.2;
          bangs.position.set(-0.06, 0.18, 0.22);
          headGroup.add(bangs);
        }
        root.add(headGroup);

        // Chân Chibi có giày thể thao đế trắng
        const pantsMat = new THREE.MeshStandardMaterial({ color: cfg.pantsColor || 0x1e3a8a, roughness: 0.6 });
        const legL = new THREE.Group();
        const legR = new THREE.Group();
        const legGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.38, 10);

        const legLMesh = new THREE.Mesh(legGeo, pantsMat);
        legLMesh.position.y = -0.19;
        legL.add(legLMesh);
        const legRMesh = new THREE.Mesh(legGeo, pantsMat);
        legRMesh.position.y = -0.19;
        legR.add(legRMesh);

        // Giày thể thao & đế cao su trắng
        [-1, 1].forEach((side, idx) => {
          const lGroup = idx === 0 ? legL : legR;
          const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.07, 0.18), shoeMat);
          shoe.position.set(0, -0.37, 0.04);
          lGroup.add(shoe);

          const sole = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.024, 0.19), whiteSoleMat);
          sole.position.set(0, -0.405, 0.04);
          lGroup.add(sole);
        });

        if (cfg.isSitting) {
          legL.position.set(-0.12, 0.38, 0.1);
          legL.rotation.x = -Math.PI / 2.2;
          legR.position.set(0.12, 0.38, 0.1);
          legR.rotation.x = -Math.PI / 2.2;
        } else {
          legL.position.set(-0.12, 0.38, 0);
          legR.position.set(0.12, 0.38, 0);
        }
        root.add(legL);
        root.add(legR);

        // Tay Chibi
        const armL = new THREE.Group();
        const armR = new THREE.Group();
        const armGeo = new THREE.CylinderGeometry(0.055, 0.05, 0.35, 8);
        const armLMesh = new THREE.Mesh(armGeo, shirtMat);
        armLMesh.position.y = -0.17;
        armL.add(armLMesh);
        const armRMesh = new THREE.Mesh(armGeo, shirtMat);
        armRMesh.position.y = -0.17;
        armR.add(armRMesh);

        armL.position.set(-0.28, cfg.isSitting ? 0.48 : 0.68, 0);
        armR.position.set(0.28, cfg.isSitting ? 0.48 : 0.68, 0);
        root.add(armL);
        root.add(armR);

        // Ba lô học sinh
        if (cfg.hasBackpack) {
          const bp = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.42, 0.18), new THREE.MeshStandardMaterial({ color: cfg.backpackColor || 0x0284c7 }));
          bp.position.set(0, 0.58, -0.22);
          root.add(bp);
        }

        // Quạt nan
        let propFan = null;
        if (cfg.hasFan) {
          propFan = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.28), new THREE.MeshStandardMaterial({ color: 0xd97706, side: THREE.DoubleSide }));
          propFan.position.set(0, -0.32, 0.1);
          armR.add(propFan);
        }

        // Cờ-lê thợ sửa xe
        if (cfg.hasWrench) {
          const wr = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, 0.02), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 }));
          wr.position.set(0, -0.32, 0.1);
          armR.add(wr);
        }

        // Cần câu cá
        if (cfg.hasFishingRod) {
          const frod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 2.5), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
          frod.rotation.x = -Math.PI / 4;
          frod.position.set(0, 0.2, 0.8);
          armR.add(frod);
        }

        const npcObj = {
          id: cfg.id,
          name: cfg.name,
          avatar: cfg.avatar || '👤',
          dialogue: cfg.dialogue,
          group: root,
          headGroup: headGroup,
          legL: legL,
          legR: legR,
          armL: armL,
          armR: armR,
          propFan: propFan,
          isSitting: !!cfg.isSitting,
          isPatrol: !!cfg.isPatrol,
          patrolRange: cfg.patrolRange || 8,
          patrolAxis: cfg.patrolAxis || 'x',
          patrolDir: 1,
          speed: cfg.speed || 1.1,
          basePos: { x: cfg.pos.x, z: cfg.pos.z },
          currentOffset: 0
        };

        this.npcs.push(npcObj);
        npcGroup.add(root);
      };

      // 18 Nhân vật Chibi sống động dọc tuyến phố và các ngõ:
      const npcConfigs = [
        { id: 'student_boy', name: 'Học Sinh Nam 5C4', avatar: '🎒', pos: { x: -4.0, z: 51.5 }, shirtColor: 0xffffff, pantsColor: 0x1e3a8a, hasRedScarf: true, hasBackpack: true, backpackColor: 0x0284c7, isPatrol: true, patrolRange: 10, patrolAxis: 'x', dialogue: "Em chào chị Hà My 5C4 ạ! Chị thi tiếng Anh toàn điểm 10 đỉnh chóp!" },
        { id: 'student_girl', name: 'Học Sinh Nữ 5C4', avatar: '🎀', pos: { x: -8.0, z: 51.5 }, shirtColor: 0xffffff, pantsColor: 0x831843, hasRedScarf: true, hasBackpack: true, backpackColor: 0xec4899, isPatrol: true, patrolRange: 8, patrolAxis: 'x', dialogue: "Hà My ơi, chiều nay cậu có ra sân trường chơi nhảy dây cùng chúng tớ không?" },
        { id: 'student_icecream', name: 'Bé Lớp 1 Ăn Kem', avatar: '🍦', pos: { x: 4.5, z: 52.0 }, shirtColor: 0xfef08a, pantsColor: 0x15803d, isPatrol: true, patrolRange: 6, patrolAxis: 'x', dialogue: "Kem Merino mát lạnh ngon tuyệt cú mèo luôn chị Hà My ơi!" },
        { id: 'tea_lady', name: 'Bà Chủ Quán Trà Đá', avatar: '👵', pos: { x: -19.5, z: 69.2 }, shirtColor: 0x9333ea, pantsColor: 0x0f172a, isSitting: true, hasFan: true, dialogue: "Trà xanh nóng hổi, kẹo lạc giòn tan đây hai bố con ơi! Ngồi làm chén nước mát!" },
        { id: 'tea_driver', name: 'Bác Xe Ôm Uống Trà', avatar: '🪖', pos: { x: -20.8, z: 69.5 }, shirtColor: 0x15803d, pantsColor: 0x334155, hat: 'pith', isSitting: true, dialogue: "Xe Vision của chú Dậu chạy êm ru, màu đỏ mận sáng bóng đẹp mắt quá!" },
        { id: 'tea_clerk', name: 'Chú Công Chức Đọc Báo', avatar: '📰', pos: { x: -19.2, z: 68.4 }, shirtColor: 0x38bdf8, pantsColor: 0x1e293b, isSitting: true, dialogue: "Phố Trần Quốc Tuấn trường Ngô Quyền giờ tan tầm lúc nào cũng vui như hội!" },
        { id: 'mechanic', name: 'Anh Thợ Sửa Xe Máy', avatar: '🔧', pos: { x: -31.8, z: 69.0 }, shirtColor: 0x0284c7, pantsColor: 0x1e293b, isSitting: true, hasWrench: true, dialogue: "Bác tài cần bơm lốp hay thay dầu nhớt chính hãng cứ ghé em nhé, 2 phút xong ngay!" },
        { id: 'ninja_lead', name: 'Chị Ninja Lead Áo Hoa', avatar: '🕶️', pos: { x: -14.0, z: 68.5 }, shirtColor: 0xf472b6, pantsColor: 0xf472b6, hat: 'helmet', helmetColor: 0xf472b6, isPatrol: true, patrolRange: 9, patrolAxis: 'x', dialogue: "Xi-nhan trái nhưng rẽ phải là thương hiệu của các chị rồi em ơi haha!" },
        { id: 'parent_gate', name: 'Mẹ Đón Con Tan Trường', avatar: '👩', pos: { x: -1.5, z: 51.2 }, shirtColor: 0x10b981, pantsColor: 0x0f172a, hat: 'helmet', helmetColor: 0xef4444, rotY: Math.PI, dialogue: "Hà My ngoan quá, được bố đón bằng xe máy xịn về nhà vườn Vũ Dậu nhé!" },
        { id: 'lake_jogger', name: 'Chị Chạy Bộ Đầm Vạc', avatar: '🏃‍♀️', pos: { x: -54.0, z: 50.0 }, shirtColor: 0xec4899, pantsColor: 0x1e293b, isPatrol: true, patrolRange: 14, patrolAxis: 'z', speed: 2.2, dialogue: "Không khí ven hồ Đầm Vạc chiều thu mát lành, chạy bộ sảng khoái ghê!" },
        { id: 'lake_elder', name: 'Bác Dưỡng Sinh Ven Hồ', avatar: '👴', pos: { x: -46.0, z: 45.0 }, shirtColor: 0xf8fafc, pantsColor: 0x475569, isPatrol: true, patrolRange: 10, patrolAxis: 'z', speed: 0.8, dialogue: "Mặt nước hồ phẳng lặng như gương, thành phố Vĩnh Yên quê mình đổi mới từng ngày!" },
        { id: 'lake_fisherman', name: 'Bác Câu Cá Bến Hồ', avatar: '🎣', pos: { x: -61.0, z: 30.5 }, shirtColor: 0x854d0e, pantsColor: 0x1e293b, isSitting: true, hasFishingRod: true, rotY: -Math.PI / 4, dialogue: "Đầm Vạc cá rô phi với trôi cắn câu nhiều lắm, câu một lúc là đầy xô mang về rán giòn!" },
        { id: 'alley_resident', name: 'Cụ Bà Tưới Hoa Ngõ 141', avatar: '👵', pos: { x: -7.0, z: 76.5 }, shirtColor: 0xa855f7, pantsColor: 0x0f172a, isPatrol: true, patrolRange: 6, patrolAxis: 'z', dialogue: "Ngõ 141 này yên tĩnh nhất phố, giàn hoa giấy nhà bà năm nào cũng nở rực cả góc ngõ!" },
        { id: 'alley_youth', name: 'Anh Thanh Niên Ngõ 141', avatar: '🏍️', pos: { x: -13.0, z: 85.0 }, shirtColor: 0x3b82f6, pantsColor: 0x1e293b, isPatrol: true, patrolRange: 8, patrolAxis: 'z', dialogue: "Xe Dream chiến của anh là hàng sưu tầm đấy nhé, pô nổ êm giòn tan!" },
        { id: 'winmart_staff', name: 'Nhân Viên WinMart+', avatar: '🏪', pos: { x: 0.5, z: 69.2 }, shirtColor: 0xdc2626, pantsColor: 0x0f172a, rotY: Math.PI, dialogue: "WinMart+ kính chào quý khách! Sữa tươi và bánh kẹo học sinh đang giảm giá cực sốc ạ!" },
        { id: 'longchau_staff', name: 'Dược Sĩ Long Châu', avatar: '💊', pos: { x: -11.5, z: 69.2 }, shirtColor: 0xf8fafc, pantsColor: 0x0284c7, rotY: Math.PI, dialogue: "Giao mùa thời tiết se lạnh, hai bố con nhớ mặc áo ấm kẻo ho nhé!" },
        { id: 'icecream_seller', name: 'Chú Bán Kem Merino', avatar: '🍦', pos: { x: 6.8, z: 52.8 }, shirtColor: 0xef4444, pantsColor: 0x334155, rotY: -Math.PI / 2, dialogue: "Kem sô-cô-la, đậu xanh, dâu tây Merino mát lạnh đây các cháu học sinh ơi!" },
        { id: 'pho_chef', name: 'Cô Bán Phở Bát Đàn', avatar: '🍜', pos: { x: -2.5, z: 69.2 }, shirtColor: 0xf97316, pantsColor: 0x0f172a, rotY: Math.PI, dialogue: "Phở bò tái nạm nước dùng xương hầm 12 tiếng thơm nức mũi, mời hai bố con vào xơi!" }
      ];

      npcConfigs.forEach(cfg => createChibiHumanoid(cfg));
      this.cityGroup.add(npcGroup);
    }

    // ------------------------------------------------------------
    // 6.9. PHƯƠNG TIỆN GIAO THÔNG AI CHIBI (WAVE, LEAD, TAXI, SEDAN)
    // Xe cộ bo tròn Choro-Q chạy tuần hoàn trên phố Trần Quốc Tuấn & Ngô Quyền
    // ------------------------------------------------------------
    buildTrafficVehicles() {
      this.trafficVehicles = [];
      const trafficGroup = new THREE.Group();

      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });

      // 1. Honda Wave Alpha Xanh Ngọc Chibi
      const waveRoot = new THREE.Group();
      const waveBody = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.42, 1.4), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
      waveBody.position.y = 0.45;
      waveRoot.add(waveBody);
      const waveRider = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.55), new THREE.MeshStandardMaterial({ color: 0x334155 }));
      waveRider.position.set(0, 0.85, 0);
      waveRoot.add(waveRider);
      const waveHelm = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      waveHelm.position.set(0, 1.25, 0);
      waveRoot.add(waveHelm);

      const wFront = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 12), wheelMat);
      wFront.rotation.z = Math.PI / 2;
      wFront.position.set(0, 0.24, 0.55);
      waveRoot.add(wFront);
      const wRear = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 12), wheelMat);
      wRear.rotation.z = Math.PI / 2;
      wRear.position.set(0, 0.24, -0.55);
      waveRoot.add(wRear);

      this.trafficVehicles.push({
        group: waveRoot,
        wheels: [wFront, wRear],
        progress: 0.08,
        speed: 0.00032,
        laneOffset: 2.8,
        type: 'bike'
      });
      trafficGroup.add(waveRoot);

      // 2. Honda Lead Trắng Ngà Chibi (Chị Ninja Lead)
      const leadRoot = new THREE.Group();
      const leadBody = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.45, 1.45), new THREE.MeshStandardMaterial({ color: 0xfef9c3 }));
      leadBody.position.y = 0.45;
      leadRoot.add(leadBody);
      const leadRider = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.22, 0.55), new THREE.MeshStandardMaterial({ color: 0xf472b6 }));
      leadRider.position.set(0, 0.85, 0);
      leadRoot.add(leadRider);
      const leadHelm = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), new THREE.MeshStandardMaterial({ color: 0xf472b6 }));
      leadHelm.position.set(0, 1.25, 0);
      leadRoot.add(leadHelm);

      const lFront = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 12), wheelMat);
      lFront.rotation.z = Math.PI / 2;
      lFront.position.set(0, 0.22, 0.55);
      leadRoot.add(lFront);
      const lRear = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.1, 12), wheelMat);
      lRear.rotation.z = Math.PI / 2;
      lRear.position.set(0, 0.22, -0.55);
      leadRoot.add(lRear);

      this.trafficVehicles.push({
        group: leadRoot,
        wheels: [lFront, lRear],
        progress: 0.35,
        speed: 0.00028,
        laneOffset: 3.2,
        type: 'bike'
      });
      trafficGroup.add(leadRoot);

      // 3. Taxi Mai Linh Xanh Lá Chibi (Có mào taxi phát sáng)
      const taxiRoot = new THREE.Group();
      const taxiBody = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.75, 3.6), new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.35 }));
      taxiBody.position.y = 0.55;
      taxiRoot.add(taxiBody);
      const taxiCabin = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.65, 2.0), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1 }));
      taxiCabin.position.set(0, 1.15, -0.2);
      taxiRoot.add(taxiCabin);

      const taxiSign = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.22, 0.3),
        new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 0.9 })
      );
      taxiSign.position.set(0, 1.58, -0.2);
      taxiRoot.add(taxiSign);

      const tWheels = [];
      [[-0.9, 0.3, 1.1], [0.9, 0.3, 1.1], [-0.9, 0.3, -1.1], [0.9, 0.3, -1.1]].forEach(([wx, wy, wz]) => {
        const w = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 14), wheelMat);
        w.rotation.z = Math.PI / 2;
        w.position.set(wx, wy, wz);
        taxiRoot.add(w);
        tWheels.push(w);
      });

      this.trafficVehicles.push({
        group: taxiRoot,
        wheels: tWheels,
        progress: 0.62,
        speed: 0.00038,
        laneOffset: -3.2,
        type: 'car'
      });
      trafficGroup.add(taxiRoot);

      // 4. Xe Sedan 4 Chỗ Màu Bạc Chibi
      const sedanRoot = new THREE.Group();
      const sedanBody = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.72, 3.8), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.4, roughness: 0.3 }));
      sedanBody.position.y = 0.55;
      sedanRoot.add(sedanBody);
      const sedanCabin = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.65, 2.2), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1 }));
      sedanCabin.position.set(0, 1.15, -0.2);
      sedanRoot.add(sedanCabin);

      const sWheels = [];
      [[-0.9, 0.3, 1.1], [0.9, 0.3, 1.1], [-0.9, 0.3, -1.1], [0.9, 0.3, -1.1]].forEach(([wx, wy, wz]) => {
        const w = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.22, 14), wheelMat);
        w.rotation.z = Math.PI / 2;
        w.position.set(wx, wy, wz);
        sedanRoot.add(w);
        sWheels.push(w);
      });

      this.trafficVehicles.push({
        group: sedanRoot,
        wheels: sWheels,
        progress: 0.85,
        speed: 0.00042,
        laneOffset: -3.0,
        type: 'car'
      });
      trafficGroup.add(sedanRoot);

      this.cityGroup.add(trafficGroup);
    }

    // ------------------------------------------------------------
    // 7. MÔ HÌNH 3D XE MÁY HONDA VISION ĐỎ MẬN & BA CHỞ BÉ HÀ MY
    // ------------------------------------------------------------
    buildHondaVisionBike() {
      this.bikeMesh = new THREE.Group();
      this.bikeMesh.name = 'HondaVisionBikeGroup';

      // 1. VẬT LIỆU CHUẨN PBR HONDA VISION CAO CẤP
      const metallicPlum = new THREE.MeshStandardMaterial({
        color: 0x881337, // Đỏ mận ánh kim chín muồi đặc trưng Honda Vision
        roughness: 0.18,
        metalness: 0.82
      });

      const chromeMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.08,
        metalness: 0.98
      });

      const glossBlack = new THREE.MeshStandardMaterial({
        color: 0x09090b,
        roughness: 0.15,
        metalness: 0.7
      });

      const matteBlack = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.85,
        metalness: 0.1
      });

      const seatLeatherMat = new THREE.MeshStandardMaterial({
        color: 0x1c1917, // Da đen thể thao vân sần chỉ đỏ
        roughness: 0.65,
        metalness: 0.08
      });

      const amberLightMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.9
      });

      // 2. THÂN CHÍNH XE HONDA VISION
      const bodyGroup = new THREE.Group();

      // Khung gầm trung tâm
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.40, 1.25), metallicPlum);
      chassis.position.set(0, 0.42, -0.05);
      chassis.castShadow = true;
      bodyGroup.add(chassis);

      // Yếm trước chữ V vuốt cong khí động học (V-shape Front Apron)
      const apronGeo = new THREE.CylinderGeometry(0.22, 0.35, 0.62, 20, 1, false, 0, Math.PI);
      const apron = new THREE.Mesh(apronGeo, metallicPlum);
      apron.rotation.y = -Math.PI / 2;
      apron.rotation.x = 0.20;
      apron.position.set(0, 0.64, 0.45);
      apron.castShadow = true;
      bodyGroup.add(apron);

      // Nẹp viền Chrome chữ V mặt nạ trước (V-shape Chrome Emblem)
      const chromeV = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.018, 8, 20, Math.PI * 0.75), chromeMat);
      chromeV.rotation.z = Math.PI * 0.62;
      chromeV.position.set(0, 0.66, 0.62);
      bodyGroup.add(chromeV);

      // Đèn xi-nhan trước LED 2 bên yếm (Left & Right Turn Signals)
      [-0.17, 0.17].forEach(sx => {
        const signal = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 0.08), amberLightMat);
        signal.rotation.y = sx > 0 ? 0.32 : -0.32;
        signal.position.set(sx, 0.66, 0.56);
        bodyGroup.add(signal);
      });

      // Sàn để chân phẳng rộng rãi (Flat Floorboard with Anti-slip Texture)
      const floorboard = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.05, 0.50), matteBlack);
      floorboard.position.set(0, 0.24, 0.12);
      bodyGroup.add(floorboard);

      // Ốp sườn sau thon gọn khí động học (Rear Tapered Side Panels)
      const rearLeft = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.30, 0.72), metallicPlum);
      rearLeft.position.set(-0.16, 0.53, -0.48);
      rearLeft.rotation.y = 0.08;
      bodyGroup.add(rearLeft);

      const rearRight = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.30, 0.72), metallicPlum);
      rearRight.position.set(0.16, 0.53, -0.48);
      rearRight.rotation.y = -0.08;
      bodyGroup.add(rearRight);

      // Chữ nổi 3D "VISION" mạ Chrome hai bên sườn
      const makeBadge = (side) => {
        const bCanvas = document.createElement('canvas');
        bCanvas.width = 128; bCanvas.height = 32;
        const bctx = bCanvas.getContext('2d');
        bctx.fillStyle = '#f8fafc';
        bctx.font = 'bold 24px Arial, sans-serif';
        bctx.textAlign = 'center';
        bctx.fillText('VISION', 64, 24);
        const bTex = new THREE.CanvasTexture(bCanvas);
        const bMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.06), new THREE.MeshBasicMaterial({ map: bTex, transparent: true }));
        bMesh.position.set(side * 0.23, 0.55, -0.48);
        bMesh.rotation.y = side > 0 ? Math.PI / 2 : -Math.PI / 2;
        return bMesh;
      };
      bodyGroup.add(makeBadge(1));
      bodyGroup.add(makeBadge(-1));

      // Yên xe 2 tầng da đen thể thao (2-Tier Contoured Saddle)
      const seatGroup = new THREE.Group();
      const driverSeat = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.11, 0.44), seatLeatherMat);
      driverSeat.position.set(0, 0.70, -0.08);
      seatGroup.add(driverSeat);

      const passengerSeat = new THREE.Mesh(new THREE.BoxGeometry(0.31, 0.13, 0.40), seatLeatherMat);
      passengerSeat.position.set(0, 0.74, -0.42);
      seatGroup.add(passengerSeat);
      bodyGroup.add(seatGroup);

      // Tay dắt sau hợp kim nhôm (Die-cast Aluminum Rear Grab Rail)
      const grabRail = new THREE.Mesh(new THREE.TorusGeometry(0.20, 0.022, 8, 20, Math.PI), chromeMat);
      grabRail.rotation.x = Math.PI / 2;
      grabRail.position.set(0, 0.77, -0.70);
      bodyGroup.add(grabRail);

      // Cụm đèn hậu LED sắc sảo (Rear LED Taillight Cluster)
      const taillight = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.08, 0.06),
        new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xdc2626, emissiveIntensity: 0.9 })
      );
      taillight.position.set(0, 0.66, -0.82);
      bodyGroup.add(taillight);

      // Chắn bùn sau & Biển số 88-B1 5C4.99 (Rear Mudguard & License Plate)
      const mudguard = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.30, 0.12), matteBlack);
      mudguard.position.set(0, 0.46, -0.84);
      mudguard.rotation.x = -0.3;
      bodyGroup.add(mudguard);

      const pCanvas = document.createElement('canvas');
      pCanvas.width = 256; pCanvas.height = 180;
      const pctx = pCanvas.getContext('2d');
      pctx.fillStyle = '#ffffff';
      pctx.fillRect(0, 0, 256, 180);
      pctx.strokeStyle = '#0f172a';
      pctx.lineWidth = 8;
      pctx.strokeRect(4, 4, 248, 172);
      pctx.fillStyle = '#0f172a';
      pctx.font = '900 52px "Nunito", Arial';
      pctx.textAlign = 'center';
      pctx.fillText('88-B1', 128, 68);
      pctx.fillText('5C4.99', 128, 142);

      const plateMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.17), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(pCanvas) }));
      plateMesh.position.set(0, 0.42, -0.90);
      plateMesh.rotation.y = Math.PI;
      bodyGroup.add(plateMesh);

      // 3. ĐẦU XE, GHI ĐÔNG & BẢNG ĐỒNG HỒ DIGITAL COCKPIT
      const headGroup = new THREE.Group();

      // Ốp đầu xe thon gọn dạng giọt nước nằm dưới tầm mắt
      const headCowlGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.12, 20);
      const headCowl = new THREE.Mesh(headCowlGeo, metallicPlum);
      headCowl.position.set(0, 0.98, 0.42);
      headCowl.rotation.x = 0.25;
      headGroup.add(headCowl);

      // Kính chắn gió mini thể thao tối màu (Smoked Sport Flyscreen)
      const flyscreen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.26, 0.10),
        new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.1, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
      );
      flyscreen.position.set(0, 1.05, 0.48);
      flyscreen.rotation.x = -0.35;
      headGroup.add(flyscreen);

      // Đèn pha LED Crystal Vision Projector
      const headlight = new THREE.Mesh(
        new THREE.CylinderGeometry(0.10, 0.08, 0.08, 16),
        new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfffbeb, emissiveIntensity: 1.2, roughness: 0.05 })
      );
      headlight.rotation.x = Math.PI / 2;
      headlight.position.set(0, 0.96, 0.52);
      headGroup.add(headlight);

      // Luồng sáng đèn rọi chiếu mặt đường
      const headSpot = new THREE.SpotLight(0xfffbeb, 2.5, 60, Math.PI / 4, 0.35);
      headSpot.position.set(0, 0.96, 0.55);
      headSpot.target.position.set(0, 0, 16.0);
      headGroup.add(headSpot);
      headGroup.add(headSpot.target);

      // Tay lái ghi-đông thể thao (Handlebars)
      const hBar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.68, 12), matteBlack);
      hBar.rotation.z = Math.PI / 2;
      hBar.position.set(0, 1.02, 0.40);
      headGroup.add(hBar);

      // Cặp tay nắm bọc cao su vân sần & gù ghi đông mạ chrome
      [-0.32, 0.32].forEach(hx => {
        const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.12, 12), matteBlack);
        grip.rotation.z = Math.PI / 2;
        grip.position.set(hx, 1.02, 0.40);
        headGroup.add(grip);

        const barEnd = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.025, 12), chromeMat);
        barEnd.rotation.z = Math.PI / 2;
        barEnd.position.set(hx > 0 ? hx + 0.07 : hx - 0.07, 1.02, 0.40);
        headGroup.add(barEnd);

        // Tay thắng hợp kim sáng bóng (Chrome Brake Lever)
        const lever = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.12, 8), chromeMat);
        lever.rotation.z = hx > 0 ? -0.22 : 0.22;
        lever.position.set(hx, 1.01, 0.44);
        headGroup.add(lever);

        // Hộp dầu phanh đĩa (Brake Reservoir)
        const reservoir = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.04), glossBlack);
        reservoir.position.set(hx * 0.75, 1.04, 0.41);
        headGroup.add(reservoir);
      });

      // Cặp gương chiếu hậu bầu dục phản chiếu đường phố (Góc mở rộng sang 2 bên ngoại vi)
      const mirrorTex = this.createMirrorTexture();
      [-0.42, 0.42].forEach(mx => {
        const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.16, 8), chromeMat);
        stalk.position.set(mx * 0.88, 1.08, 0.42);
        stalk.rotation.z = mx > 0 ? 0.38 : -0.38;
        stalk.rotation.x = 0.15;
        headGroup.add(stalk);

        const mirrorBack = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.075, 0.025), glossBlack);
        mirrorBack.position.set(mx, 1.14, 0.45);
        mirrorBack.rotation.y = mx > 0 ? -0.15 : 0.15;
        headGroup.add(mirrorBack);

        const mirrorGlass = new THREE.Mesh(
          new THREE.PlaneGeometry(0.11, 0.068),
          new THREE.MeshBasicMaterial({ map: mirrorTex })
        );
        mirrorGlass.position.set(mx, 1.14, 0.435);
        mirrorGlass.rotation.y = Math.PI + (mx > 0 ? 0.15 : -0.15);
        headGroup.add(mirrorGlass);
      });

      // BẢNG ĐỒNG HỒ ĐIỆN TỬ LCD DIGITAL SPEEDOMETER (Nghiêng góc nhìn người lái)
      this.dashCanvas = document.createElement('canvas');
      this.dashCanvas.width = 512;
      this.dashCanvas.height = 256;
      this.dashCtx = this.dashCanvas.getContext('2d');
      this.dashTex = new THREE.CanvasTexture(this.dashCanvas);
      this.drawSpeedometerCanvas(0);

      this.dashMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.26, 0.13),
        new THREE.MeshBasicMaterial({ map: this.dashTex, transparent: true })
      );
      this.dashMesh.position.set(0, 1.04, 0.39);
      this.dashMesh.rotation.x = -0.42;
      headGroup.add(this.dashMesh);

      bodyGroup.add(headGroup);

      // 4. BÁNH XE THỂ THAO 14 INCH & PHANH ĐĨA NISSIN
      const createWheel = (isFront) => {
        const wg = new THREE.Group();
        const tire = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.075, 14, 32), matteBlack);
        wg.add(tire);

        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.06, 20), chromeMat);
        rim.rotation.x = Math.PI / 2;
        wg.add(rim);

        for (let s = 0; s < 5; s++) {
          const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.28, 0.04), chromeMat);
          spoke.rotation.z = (s / 5) * Math.PI * 2;
          wg.add(spoke);
        }

        if (isFront) {
          const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.015, 18), chromeMat);
          disc.rotation.x = Math.PI / 2;
          disc.position.z = 0.04;
          wg.add(disc);

          const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.04), new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85 }));
          caliper.position.set(0.12, 0.04, 0.04);
          wg.add(caliper);
        }
        return wg;
      };

      // Phuộc ống lồng trước
      const forkMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.18 });
      [-0.10, 0.10].forEach(fx => {
        const fork = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12), forkMat);
        fork.position.set(fx, 0.46, 0.58);
        fork.rotation.x = -0.18;
        bodyGroup.add(fork);
      });

      this.frontWheel = createWheel(true);
      this.frontWheel.position.set(0, 0.28, 0.65);
      bodyGroup.add(this.frontWheel);

      this.rearWheel = createWheel(false);
      this.rearWheel.position.set(0, 0.28, -0.62);
      bodyGroup.add(this.rearWheel);

      // Ống xả thể thao bên phải với ốp cách nhiệt mạ bạc
      const exhaustGroup = new THREE.Group();
      const muffler = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.68, 14), matteBlack);
      muffler.rotation.x = Math.PI / 2;
      muffler.position.set(0.24, 0.28, -0.42);
      exhaustGroup.add(muffler);

      const heatShield = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.10, 0.44), chromeMat);
      heatShield.position.set(0.28, 0.30, -0.42);
      exhaustGroup.add(heatShield);
      bodyGroup.add(exhaustGroup);

      // Đổ bóng tiếp xúc mặt đường nhựa (Soft Asphalt Contact Shadow)
      const shadowTex = this.createGroundShadowTexture();
      const groundShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(1.8, 0.9),
        new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.70 })
      );
      groundShadow.rotation.x = -Math.PI / 2;
      groundShadow.position.set(0, 0.015, 0.02);
      bodyGroup.add(groundShadow);

      this.bikeMesh.add(bodyGroup);

      // 5. CÁNH TAY NGƯỜI LÁI GÓC NHÌN THỨ NHẤT (FIRST-PERSON COCKPIT ARMS)
      this.cockpitArms = new THREE.Group();
      this.cockpitArms.name = 'CockpitArmsGroup';
      const armJacketMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.55 });
      const gloveMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 });

      [-0.30, 0.30].forEach(ax => {
        const armGeo = new THREE.CylinderGeometry(0.044, 0.052, 0.44, 12);
        const armMesh = new THREE.Mesh(armGeo, armJacketMat);
        armMesh.position.set(ax, 0.94, 0.22);
        armMesh.rotation.x = -Math.PI / 3.4;
        armMesh.rotation.z = ax > 0 ? -0.15 : 0.15;
        this.cockpitArms.add(armMesh);

        // Găng tay da ôm chặt tay lái
        const glove = new THREE.Mesh(new THREE.SphereGeometry(0.042, 12, 12), gloveMat);
        glove.position.set(ax > 0 ? ax + 0.02 : ax - 0.02, 1.02, 0.40);
        this.cockpitArms.add(glove);
      });
      this.cockpitArms.visible = false;
      this.bikeMesh.add(this.cockpitArms);

      // 6. NGƯỜI BA CẦM LÁI GÓC NHÌN THỨ 3 (DRIVER DAD IN CHASE VIEW - PHONG CÁCH ANIME CHI TIẾT)
      this.dadGroup = new THREE.Group();
      this.dadGroup.name = 'DriverDadGroup';
      this.dadGroup.position.set(0, 0.65, 0.08);

      const skinMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.5 });
      const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.65 });
      const shoesMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.4 });
      const shoeSoleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      const goldTrimMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.2 });
      const darkTrimMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });

      // Cổ áo & Khăn gió
      const dadNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.12, 12), skinMat);
      dadNeck.position.set(0, 0.72, 0.04);
      this.dadGroup.add(dadNeck);

      // Thân áo khoác bomber màu xanh navy có cổ áo trắng lịch lãm
      const dadTorsoGeo = new THREE.CylinderGeometry(0.19, 0.22, 0.52, 16);
      const dadTorso = new THREE.Mesh(dadTorsoGeo, armJacketMat);
      dadTorso.scale.set(1.15, 1.0, 0.75);
      dadTorso.position.y = 0.45;
      dadTorso.rotation.x = 0.12;
      this.dadGroup.add(dadTorso);

      // Viền cổ áo sơ mi trắng bên trong & Cổ áo bomber
      const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.022, 8, 16, Math.PI), shoeSoleMat);
      collarMesh.rotation.x = Math.PI / 2 + 0.12;
      collarMesh.position.set(0, 0.70, 0.06);
      this.dadGroup.add(collarMesh);

      // Đường khóa kéo kim loại & nẹp áo khoác
      const zipper = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.44, 0.02), goldTrimMat);
      zipper.position.set(0, 0.46, 0.21);
      zipper.rotation.x = 0.12;
      this.dadGroup.add(zipper);

      // Cánh tay áo khoác gập góc tự nhiên 2 khúc (Khớp vai -> Khuỷu tay -> Cẳng tay ôm ghi-đông)
      [-0.20, 0.20].forEach(ax => {
        // 1. Bắp tay trên (Upper Arm): từ vai chếch xuống khuỷu tay
        const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.046, 0.24, 10), armJacketMat);
        upperArm.position.set(ax * 1.08, 0.52, 0.12);
        upperArm.rotation.x = -Math.PI / 4.2;
        upperArm.rotation.z = ax > 0 ? -0.15 : 0.15;
        this.dadGroup.add(upperArm);

        // Khớp khuỷu tay tròn mềm mại
        const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.046, 8, 8), armJacketMat);
        elbow.position.set(ax * 1.15, 0.44, 0.19);
        this.dadGroup.add(elbow);

        // 2. Cẳng tay dưới (Forearm): từ khuỷu tay vươn tới tay nắm xe
        const foreArm = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.040, 0.24, 10), armJacketMat);
        foreArm.position.set(ax > 0 ? ax + 0.05 : ax - 0.05, 0.40, 0.26);
        foreArm.rotation.x = -Math.PI / 3.0;
        foreArm.rotation.z = ax > 0 ? 0.12 : -0.12;
        this.dadGroup.add(foreArm);

        // Bo gấu tay áo (cuff)
        const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.044, 0.014, 6, 12), darkTrimMat);
        cuff.position.set(ax > 0 ? ax + 0.06 : ax - 0.06, 0.38, 0.30);
        cuff.rotation.x = -Math.PI / 3.0;
        this.dadGroup.add(cuff);

        // Găng tay da ôm chặt tay lái & ngón tay khẽ tì tay thắng
        const glove = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 10), shoesMat);
        glove.position.set(ax > 0 ? ax + 0.07 : ax - 0.07, 0.36, 0.33);
        this.dadGroup.add(glove);
      });

      // Đôi chân người Ba đặt tự nhiên lên sàn để chân xe Vision (Đùi & Bắp chân)
      [-0.14, 0.14].forEach(lx => {
        // Đùi nghiêng về phía trước
        const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.35, 10), pantsMat);
        thigh.position.set(lx, 0.22, 0.12);
        thigh.rotation.x = Math.PI / 4;
        this.dadGroup.add(thigh);

        // Bắp chân chúc xuống sàn xe
        const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.06, 0.36, 10), pantsMat);
        shin.position.set(lx, -0.06, 0.24);
        shin.rotation.x = -0.15;
        this.dadGroup.add(shin);

        // Đôi giày thể thao nam đế trắng đặt vững vàng trên sàn xe
        const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.08, 0.22), shoesMat);
        shoe.position.set(lx, -0.24, 0.26);
        this.dadGroup.add(shoe);

        const sole = new THREE.Mesh(new THREE.BoxGeometry(0.115, 0.025, 0.23), shoeSoleMat);
        sole.position.set(lx, -0.28, 0.26);
        this.dadGroup.add(sole);
      });

      // Đầu & Mũ bảo hiểm thời trang 3/4 kính râm có tem vàng thể thao
      const dadHead = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), skinMat);
      dadHead.position.set(0, 0.82, 0.04);
      this.dadGroup.add(dadHead);

      const dadHelmet = new THREE.Mesh(
        new THREE.SphereGeometry(0.155, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.72),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.25, metalness: 0.35 })
      );
      dadHelmet.position.set(0, 0.85, 0.04);
      this.dadGroup.add(dadHelmet);

      // Đường viền tem vàng thể thao trên nón
      const helmetStripe = new THREE.Mesh(new THREE.TorusGeometry(0.156, 0.008, 6, 24, Math.PI), goldTrimMat);
      helmetStripe.rotation.x = Math.PI / 2;
      helmetStripe.position.set(0, 0.88, 0.04);
      this.dadGroup.add(helmetStripe);

      const visor = new THREE.Mesh(
        new THREE.CylinderGeometry(0.145, 0.145, 0.07, 16, 1, true, 0, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, transparent: true, opacity: 0.90 })
      );
      visor.rotation.y = -Math.PI / 2;
      visor.position.set(0, 0.82, 0.08);
      this.dadGroup.add(visor);

      this.bikeMesh.add(this.dadGroup);

      // 7. BÉ HÀ MY NGỒI SAU ÔM EO BA (PILLION PASSENGER HÀ MY - DỄ THƯƠNG CHIBI)
      this.haMyRiderGroup = new THREE.Group();
      this.haMyRiderGroup.name = 'HaMyPassengerGroup';
      this.haMyRiderGroup.position.set(0, 0.72, -0.36);

      const pinkJacketMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.45 });
      const haMyTorsoGeo = new THREE.CylinderGeometry(0.14, 0.17, 0.40, 16);
      const haMyTorso = new THREE.Mesh(haMyTorsoGeo, pinkJacketMat);
      haMyTorso.scale.set(1.1, 1.0, 0.75);
      haMyTorso.position.y = 0.32;
      this.haMyRiderGroup.add(haMyTorso);

      // Cổ áo trắng học sinh lấp ló
      const haMyCollar = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.016, 6, 14, Math.PI), shoeSoleMat);
      haMyCollar.rotation.x = Math.PI / 2 + 0.1;
      haMyCollar.position.set(0, 0.50, 0.04);
      this.haMyRiderGroup.add(haMyCollar);

      // Balo đi học màu vàng tươi sau lưng có quai đeo và khóa kéo
      const backpack = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.26, 0.13),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 })
      );
      backpack.position.set(0, 0.32, -0.13);
      this.haMyRiderGroup.add(backpack);

      const bpPocket = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.05), new THREE.MeshStandardMaterial({ color: 0xeab308 }));
      bpPocket.position.set(0, 0.28, -0.20);
      this.haMyRiderGroup.add(bpPocket);

      // Móc khóa thỏ trắng Chibi dễ thương treo balo
      const bunnyCharm = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), shoeSoleMat);
      bunnyCharm.position.set(0.08, 0.22, -0.21);
      this.haMyRiderGroup.add(bunnyCharm);

      // Đôi tay nhỏ xinh gập góc ôm trọn eo Ba
      [-0.14, 0.14].forEach(hx => {
        // Bắp tay trên
        const upperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.034, 0.18, 8), pinkJacketMat);
        upperArm.position.set(hx * 1.08, 0.36, 0.05);
        upperArm.rotation.x = -Math.PI / 3.8;
        upperArm.rotation.z = hx > 0 ? -0.15 : 0.15;
        this.haMyRiderGroup.add(upperArm);

        // Cẳng tay ôm eo
        const foreArm = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.030, 0.18, 8), pinkJacketMat);
        foreArm.position.set(hx > 0 ? hx - 0.02 : hx + 0.02, 0.28, 0.16);
        foreArm.rotation.x = -Math.PI / 2.8;
        foreArm.rotation.y = hx > 0 ? -0.2 : 0.2;
        this.haMyRiderGroup.add(foreArm);

        const hand = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), skinMat);
        hand.position.set(hx > 0 ? hx - 0.04 : hx + 0.04, 0.24, 0.24);
        this.haMyRiderGroup.add(hand);
      });

      // Đôi chân bé Hà My đặt trên gác chân sau xe Honda Vision
      [-0.13, 0.13].forEach(hx => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.045, 0.26, 8), skinMat);
        leg.position.set(hx, 0.06, 0.08);
        leg.rotation.x = 0.35;
        this.haMyRiderGroup.add(leg);

        // Giày búp bê màu hồng có tất trắng
        const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.046, 0.046, 0.06, 8), shoeSoleMat);
        sock.position.set(hx, -0.06, 0.12);
        this.haMyRiderGroup.add(sock);

        const shoe = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 8), pinkJacketMat);
        shoe.scale.set(0.9, 0.65, 1.3);
        shoe.position.set(hx, -0.09, 0.14);
        this.haMyRiderGroup.add(shoe);
      });

      // Đầu bé Hà My & Mũ bảo hiểm Chibi hồng có tai mèo dễ thương
      const haMyHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), skinMat);
      haMyHead.position.set(0, 0.60, 0.02);
      this.haMyRiderGroup.add(haMyHead);

      const haMyHelmet = new THREE.Mesh(
        new THREE.SphereGeometry(0.145, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.72),
        new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.25, metalness: 0.25 })
      );
      haMyHelmet.position.set(0, 0.63, 0.02);
      this.haMyRiderGroup.add(haMyHelmet);

      // Cặp tai mèo Chibi trên nón bảo hiểm bé Hà My
      [-0.07, 0.07].forEach(ex => {
        const ear = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.08, 8), new THREE.MeshStandardMaterial({ color: 0xf43f5e }));
        ear.position.set(ex, 0.76, 0.04);
        ear.rotation.z = ex > 0 ? -0.25 : 0.25;
        this.haMyRiderGroup.add(ear);
      });

      // Hai lọn tóc hạt dẻ buộc hai bên lấp ló dưới nón bảo hiểm
      [-0.12, 0.12].forEach(tx => {
        const hairTassel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 0.16, 8), new THREE.MeshStandardMaterial({ color: 0x3e1f0e, roughness: 0.6 }));
        hairTassel.position.set(tx, 0.50, -0.04);
        hairTassel.rotation.z = tx > 0 ? 0.35 : -0.35;
        this.haMyRiderGroup.add(hairTassel);
      });

      this.bikeMesh.add(this.haMyRiderGroup);

      // Vị trí đỗ xuất phát chuẩn GPS: Pano 41 tại Cổng trường Ngô Quyền (0, 0.05, 54.0), hướng thẳng về phía Tây (-X)
      this.bikeMesh.position.set(0.0, 0.05, 54.0);
      this.bikeHeading = -Math.PI / 2;
      this.bikeMesh.rotation.y = -Math.PI / 2;
      if (this.scene) this.scene.add(this.bikeMesh);

      this.haMyRiderGroup.visible = false;
      this.isMounted = false;
      this.buildBikePromptBillboard();
    }

    createMirrorTexture() {
      const mc = document.createElement('canvas');
      mc.width = 256; mc.height = 128;
      const mctx = mc.getContext('2d');
      const grad = mctx.createLinearGradient(0, 0, 0, 128);
      grad.addColorStop(0.0, '#38bdf8');
      grad.addColorStop(0.55, '#e2e8f0');
      grad.addColorStop(0.65, '#475569');
      grad.addColorStop(1.0, '#1e293b');
      mctx.fillStyle = grad;
      mctx.fillRect(0, 0, 256, 128);
      mctx.strokeStyle = 'rgba(250, 204, 21, 0.75)';
      mctx.lineWidth = 4;
      mctx.beginPath();
      mctx.moveTo(128, 70);
      mctx.lineTo(128, 128);
      mctx.stroke();
      return new THREE.CanvasTexture(mc);
    }

    createGroundShadowTexture() {
      const sc = document.createElement('canvas');
      sc.width = 256; sc.height = 256;
      const sctx = sc.getContext('2d');
      const grad = sctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0.0, 'rgba(0, 0, 0, 0.70)');
      grad.addColorStop(0.45, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(0.8, 'rgba(0, 0, 0, 0.08)');
      grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(sc);
    }

    drawSpeedometerCanvas(speed = 0) {
      if (!this.dashCanvas || !this.dashCtx) return;
      const ctx = this.dashCtx;
      const w = 512, h = 256;
      ctx.clearRect(0, 0, w, h);

      // Khung bảng đồng hồ LCD kính hun khói
      ctx.fillStyle = '#09090b';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(8, 8, w - 16, h - 16, 24);
      } else {
        ctx.rect(8, 8, w - 16, h - 16);
      }
      ctx.fill();
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Logo Honda
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 22px "Nunito", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('H O N D A', w / 2, 42);

      // Chữ số vận tốc điện tử neon
      const spdVal = Math.round(Math.abs(speed));
      ctx.fillStyle = '#22c55e';
      ctx.font = '900 108px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(String(spdVal), w / 2, 146);

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 24px "Nunito", Arial, sans-serif';
      ctx.fillText('km/h', w / 2, 182);

      // Vòng cung tốc độ thể thao
      const maxSpd = 60;
      const fraction = Math.min(1.0, spdVal / maxSpd);
      ctx.beginPath();
      ctx.arc(w / 2, 136, 112, Math.PI * 0.8, Math.PI * 2.2);
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.stroke();

      if (fraction > 0.02) {
        ctx.beginPath();
        ctx.arc(w / 2, 136, 112, Math.PI * 0.8, Math.PI * 0.8 + fraction * (Math.PI * 1.4));
        ctx.strokeStyle = fraction > 0.7 ? '#ef4444' : (fraction > 0.4 ? '#eab308' : '#22c55e');
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Đèn báo ECO & Odometer
      ctx.fillStyle = fraction > 0.1 && fraction < 0.65 ? '#22c55e' : '#3f3f46';
      ctx.font = 'bold 18px "Nunito", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('● ECO', 36, 60);

      ctx.fillStyle = '#38bdf8';
      ctx.textAlign = 'right';
      ctx.fillText('ODO 1,190 km', w - 36, 60);

      // Vạch xăng và phân khối
      ctx.fillStyle = '#22c55e';
      ctx.textAlign = 'left';
      ctx.fillText('E [■■■■■] F', 36, 225);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('ESP 110cc', w - 36, 225);

      if (this.dashTex) this.dashTex.needsUpdate = true;
    }

    buildBikePromptBillboard() {
      if (this.bikePromptBillboard) return;
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 160;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgba(136, 19, 55, 0.94)';
      ctx.roundRect(10, 10, 492, 140, 24);
      ctx.fill();

      ctx.strokeStyle = '#fda4af';
      ctx.lineWidth = 6;
      ctx.roundRect(10, 10, 492, 140, 24);
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.font = '900 40px "Nunito", Arial';
      ctx.textAlign = 'center';
      ctx.fillText('🛵 XE HONDA VISION CỦA BA', 256, 62);

      ctx.fillStyle = '#ffffff';
      ctx.font = '800 30px "Nunito", Arial';
      ctx.fillText('👉 Bấm [F] để Ba chở ra phố!', 256, 118);

      const tex = new THREE.CanvasTexture(canvas);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.75), mat);
      plane.position.set(0, 2.1, 0);

      this.bikePromptBillboard = plane;
      this.bikeMesh.add(this.bikePromptBillboard);
    }

    // ------------------------------------------------------------
    // 8. HỆ THỐNG ÂM THANH ĐỘNG CƠ XE MÁY & CÒI (WEB AUDIO API)
    // ------------------------------------------------------------
    initAudioEngine() {
      if (this.isAudioReady) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioCtx();

        this.engineOsc = this.audioCtx.createOscillator();
        this.engineGain = this.audioCtx.createGain();
        this.engineFilter = this.audioCtx.createBiquadFilter();

        this.engineOsc.type = 'sawtooth';
        this.engineOsc.frequency.setValueAtTime(28, this.audioCtx.currentTime);

        this.engineFilter.type = 'lowpass';
        this.engineFilter.frequency.setValueAtTime(160, this.audioCtx.currentTime);

        this.engineGain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);

        this.engineOsc.connect(this.engineFilter);
        this.engineFilter.connect(this.engineGain);
        this.engineGain.connect(this.audioCtx.destination);
        this.engineOsc.start();

        this.isAudioReady = true;
      } catch (e) {}
    }

    playHornSound() {
      this.initAudioEngine();
      if (!this.audioCtx) return;
      try {
        const o1 = this.audioCtx.createOscillator();
        const o2 = this.audioCtx.createOscillator();
        const g = this.audioCtx.createGain();

        o1.type = 'sine';
        o1.frequency.setValueAtTime(430, this.audioCtx.currentTime);
        o2.type = 'sine';
        o2.frequency.setValueAtTime(520, this.audioCtx.currentTime);

        g.gain.setValueAtTime(0.14, this.audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.28);

        o1.connect(g);
        o2.connect(g);
        g.connect(this.audioCtx.destination);

        o1.start();
        o2.start();
        o1.stop(this.audioCtx.currentTime + 0.3);
        o2.stop(this.audioCtx.currentTime + 0.3);

        // NPCs xung quanh quay lại vẫy tay chào vui vẻ khi nghe tiếng còi
        if (this.npcs && this.npcs.length) {
          const playerPos = this.isMounted
            ? this.bikeMesh.position
            : (this.arena && this.arena.studentMesh ? this.arena.studentMesh.position : this.bikeMesh.position);

          let waved = false;
          this.npcs.forEach(npc => {
            const d = Math.hypot(npc.group.position.x - playerPos.x, npc.group.position.z - playerPos.z);
            if (d < 16.0) {
              waved = true;
              npc.armR.rotation.x = -1.3;
              npc.armR.rotation.z = -0.55;
              setTimeout(() => {
                if (npc.armR) { npc.armR.rotation.x = 0; npc.armR.rotation.z = 0; }
              }, 1400);
            }
          });
          if (waved) {
            this.showComicDialogue('🛵', 'CÒI XE HONDA VISION', 'Bim bim! Xe Ba đón bé Hà My kìa! Chúc hai bố con đi đường bình an nhé!');
          }
        }
      } catch (e) {}
    }

    updateEngineSound(spd) {
      if (!this.isAudioReady || !this.engineOsc) return;
      try {
        const targetFreq = 28 + (Math.abs(spd) / 60) * 65;
        const targetCut = 160 + (Math.abs(spd) / 60) * 360;
        this.engineOsc.frequency.setTargetAtTime(targetFreq, this.audioCtx.currentTime, 0.08);
        this.engineFilter.frequency.setTargetAtTime(targetCut, this.audioCtx.currentTime, 0.08);
      } catch (e) {}
    }

    // ------------------------------------------------------------
    // 9. NÚT KÍCH HOẠT VÀ NÚT QUAY LẠI TRƯỜNG HỌC
    // ------------------------------------------------------------
    setupGlobalButtons() {
      // Nút trên Dashboard Header
      const headerBtn = document.getElementById('btn-commute-bike');
      if (headerBtn) {
        headerBtn.addEventListener('click', () => {
          this.activateCityMode(0);
        });
      }

      // Nút Street View 360 trên Header
      const headerSvBtn = document.getElementById('btn-header-open-streetview');
      if (headerSvBtn) {
        headerSvBtn.addEventListener('click', () => {
          if (typeof window.openStreetView360 === 'function') {
            window.openStreetView360(41);
          }
        });
      }

      // Nút Street View trên Viewport Fullscreen
      const svBtn = document.getElementById('btn-open-streetview');
      if (svBtn) {
        svBtn.addEventListener('click', () => {
          if (typeof window.openStreetView360 === 'function') {
            window.openStreetView360(this.getClosestPanoId());
          }
        });
      }

      // Nút Street View trên Radar mini
      const radarSvBtn = document.getElementById('btn-radar-streetview');
      if (radarSvBtn) {
        radarSvBtn.addEventListener('click', () => {
          if (typeof window.openStreetView360 === 'function') {
            window.openStreetView360(this.getClosestPanoId());
          }
        });
      }

      // Nút quay lại trường học trên Viewport Fullscreen
      const backBtn = document.getElementById('btn-back-to-school');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          this.deactivateCityMode();
        });
      }

      // Proximity prompt click handler
      const promptEl = document.getElementById('bike-proximity-prompt');
      if (promptEl) {
        promptEl.addEventListener('click', () => {
          this.mountBike();
        });
      }

      // Nút bật/tắt danh sách Đi Nhanh (Fast Travel Dropdown)
      const btnToggleFast = document.getElementById('btn-toggle-fast-travel');
      const ftBar = document.getElementById('gmaps-fast-travel-bar');
      if (btnToggleFast && ftBar) {
        btnToggleFast.addEventListener('click', (e) => {
          e.stopPropagation();
          const isHidden = ftBar.style.display === 'none' || !ftBar.style.display;
          ftBar.style.display = isHidden ? 'flex' : 'none';
        });
        document.addEventListener('click', (e) => {
          if (!e.target.closest('#gmaps-fast-travel-bar') && !e.target.closest('#btn-toggle-fast-travel')) {
            ftBar.style.display = 'none';
          }
        });
      }
    }

    // ------------------------------------------------------------
    // 9.5. TÌM ĐIỂM ẢNH STREET VIEW 360° GẦN NHẤT & CẬP NHẬT SKY SPHERE THỰC TẾ
    // ------------------------------------------------------------
    getClosestPanoId() {
      const currentPos = (this.isMounted && this.bikeMesh) 
        ? this.bikeMesh.position 
        : (this.arena && this.arena.studentMesh ? this.arena.studentMesh.position : { x: 0, z: 54 });
      let closestId = 41;
      let minDist = Infinity;
      if (window.STREET_VIEW_PANOS && window.STREET_VIEW_PANOS.length) {
        for (let p of window.STREET_VIEW_PANOS) {
          if (p.worldPos) {
            const d = Math.hypot(currentPos.x - p.worldPos.x, currentPos.z - p.worldPos.z);
            if (d < minDist) {
              minDist = d;
              closestId = p.id;
            }
          }
        }
      }
      return closestId;
    }

    updateCitySkySphere(panoId = null) {
      const targetId = panoId || this.getClosestPanoId();
      if (this._currentSkyPanoId === targetId && this.citySkySphere && this.citySkySphere.material && this.citySkySphere.material.map) return;
      this._currentSkyPanoId = targetId;

      const pano = (window.STREET_VIEW_PANOS || []).find(p => p.id === targetId);
      if (!pano) return;

      if (!this._skyTextureCache) this._skyTextureCache = new Map();
      if (!this._skyTextureLoader) {
        this._skyTextureLoader = new THREE.TextureLoader();
        this._skyTextureLoader.setCrossOrigin(undefined);
      }

      const loadPanoTexture = (url, onLoad) => {
        if (this._skyTextureCache.has(url)) {
          onLoad(this._skyTextureCache.get(url));
          return;
        }
        const img = new Image();
        img.onload = () => {
          const tex = new THREE.Texture(img);
          tex.needsUpdate = true;
          this._skyTextureCache.set(url, tex);
          onLoad(tex);
        };
        img.onerror = () => {
          this._skyTextureLoader.load(url, (tex) => {
            this._skyTextureCache.set(url, tex);
            onLoad(tex);
          });
        };
        img.src = url;
      };

      const applyTexture = (tex) => {
        tex.mapping = THREE.EquirectangularReflectionMapping;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;

        if (!this.citySkySphere) {
          const skyGeo = new THREE.SphereGeometry(750, 64, 40);
          const skyMat = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.BackSide,
            depthWrite: false,
            depthTest: false,
            fog: false
          });
          this.citySkySphere = new THREE.Mesh(skyGeo, skyMat);
          this.citySkySphere.name = 'CitySkySphere';
          this.citySkySphere.renderOrder = -100;
          if (this.scene) this.scene.add(this.citySkySphere);
        } else {
          this.citySkySphere.material = new THREE.MeshBasicMaterial({
            map: tex,
            side: THREE.BackSide,
            depthWrite: false,
            depthTest: false,
            fog: false
          });
          this.citySkySphere.renderOrder = -100;
        }
        this.citySkySphere.visible = false; // Luôn ẩn cầu 360 ảnh chụp trong thế giới 3D Anime
        this.citySkySphere.rotation.y = 0;

        const navBanner = document.getElementById('vice-city-nav-instruction');
        if (navBanner) {
          navBanner.innerHTML = `<strong>↑ ${pano.road.toUpperCase()}</strong> • 📍 ${pano.title} (${pano.desc}) • <em>GPS ${pano.lat.toFixed(4)}, ${pano.lng.toFixed(4)}</em>`;
        }

        const gmapsTop = document.getElementById('gmaps-top-instruction');
        if (gmapsTop) {
          const remainingMeters = Math.max(0, Math.round((targetId - 1) * (1190 / 40)));
          gmapsTop.innerHTML = `
            <div style="font-size: 1.05rem; font-weight: 900; color: #fff; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span style="font-size: 1.3rem;">⬆</span>
              <span>${pano.road.toUpperCase()}</span>
            </div>
            <div style="font-size: 0.82rem; font-weight: 700; color: #e8f0fe; margin-top: 2px;">
              📍 ${pano.title} • Còn ${remainingMeters}m đến Nhà Vườn Cây Cảnh Vũ Dậu
            </div>
          `;
        }
      };

      const targetUrl = (window.STREET_VIEW_BASE64 && window.STREET_VIEW_BASE64[targetId])
        ? window.STREET_VIEW_BASE64[targetId]
        : pano.image2k;

      loadPanoTexture(targetUrl, (tex) => {
        if (this._currentSkyPanoId === targetId) {
          applyTexture(tex);
        }
      });

      // Preload ảnh pano liền kề
      const allPanos = window.STREET_VIEW_PANOS || [];
      const currIdx = allPanos.findIndex(p => p.id === targetId);
      [currIdx - 1, currIdx + 1].forEach(idx => {
        if (idx >= 0 && idx < allPanos.length) {
          const pNear = allPanos[idx];
          if (pNear) {
            const nearUrl = (window.STREET_VIEW_BASE64 && window.STREET_VIEW_BASE64[pNear.id])
              ? window.STREET_VIEW_BASE64[pNear.id]
              : pNear.image2k;
            if (!this._skyTextureCache.has(nearUrl)) {
              loadPanoTexture(nearUrl, () => {});
            }
          }
        }
      });
    }

    // ------------------------------------------------------------
    // 10. GIAO DIỆN BẢNG ĐỒNG HỒ VISION HUD (GÓC DƯỚI BÊN PHẢI)
    // ------------------------------------------------------------
    buildSpeedometerHUD() {
      let hudEl = document.getElementById('vision-bike-hud');
      if (hudEl) hudEl.remove();

      hudEl = document.createElement('div');
      hudEl.id = 'vision-bike-hud';
      hudEl.style.display = 'none'; // Chỉ hiện khi ở chế độ lái xe
      hudEl.innerHTML = `
        <style>
          #vision-bike-hud {
            position: fixed;
            bottom: 20px;
            right: 22px;
            z-index: 99999;
            background: linear-gradient(145deg, rgba(24, 24, 27, 0.95), rgba(136, 19, 55, 0.92));
            border: 3px solid #f43f5e;
            box-shadow: 0 14px 40px rgba(0,0,0,0.7), 0 0 24px rgba(244, 63, 94, 0.4);
            border-radius: 22px;
            padding: 14px 18px;
            color: #fff;
            font-family: 'Nunito', Arial, sans-serif;
            width: 320px;
            user-select: none;
            backdrop-filter: blur(12px);
          }
          .v-hud-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255,255,255,0.18);
            padding-bottom: 6px;
            margin-bottom: 8px;
          }
          .v-hud-title {
            font-size: 0.92rem;
            font-weight: 900;
            color: #fecdd3;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .v-hud-badge {
            font-size: 0.72rem;
            background: #991b1b;
            color: #fef08a;
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 800;
          }
          .v-hud-main {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .v-gauge-box {
            position: relative;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(circle, #27272a, #09090b);
            border: 3px solid #fda4af;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: inset 0 2px 8px rgba(0,0,0,0.8);
            flex-shrink: 0;
          }
          .v-speed-val {
            font-size: 1.7rem;
            font-weight: 900;
            color: #ffffff;
            line-height: 1;
          }
          .v-speed-unit {
            font-size: 0.65rem;
            color: #fb7185;
            font-weight: 800;
            margin-top: 2px;
          }
          .v-info-box {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
            min-width: 0;
          }
          .v-street-name {
            font-size: 0.8rem;
            font-weight: 800;
            color: #fef08a;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .v-progress-bar-bg {
            width: 100%;
            height: 8px;
            background: rgba(0,0,0,0.5);
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.2);
          }
          .v-progress-fill {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #f43f5e, #fbbf24);
          }
          .v-dist-text {
            font-size: 0.72rem;
            color: #cbd5e1;
            font-weight: 700;
          }
          .v-btn-row {
            display: flex;
            gap: 6px;
            margin-top: 10px;
          }
          .v-hud-btn {
            flex: 1;
            background: rgba(255,255,255,0.14);
            border: 1px solid rgba(255,255,255,0.25);
            color: #fff;
            border-radius: 10px;
            padding: 7px 4px;
            font-size: 0.75rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.15s ease;
            text-align: center;
            font-family: 'Nunito', Arial, sans-serif;
          }
          .v-hud-btn:hover {
            background: #f43f5e;
            border-color: #fda4af;
          }
          .v-hud-btn.active {
            background: #e11d48;
            box-shadow: 0 0 10px rgba(225, 29, 72, 0.8);
          }
          .v-teleport-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
            margin-top: 8px;
            border-top: 1px solid rgba(255,255,255,0.15);
            padding-top: 8px;
          }
          .v-tp-btn {
            background: rgba(0,0,0,0.35);
            border: 1px solid rgba(255,255,255,0.15);
            color: #e2e8f0;
            border-radius: 8px;
            padding: 5px 6px;
            font-size: 0.7rem;
            font-weight: 700;
            cursor: pointer;
            text-align: center;
            font-family: 'Nunito', Arial, sans-serif;
          }
          .v-tp-btn:hover {
            background: rgba(244, 63, 94, 0.4);
            color: #fff;
          }
        </style>
        <div class="v-hud-header">
          <div class="v-hud-title">
            <span>🛵</span>
            <span>HONDA VISION ĐỎ MẬN</span>
          </div>
          <span class="v-hud-badge">88-B1 5C4.99</span>
        </div>
        <div class="v-hud-main">
          <div class="v-gauge-box">
            <span class="v-speed-val" id="v-speed-val">0</span>
            <span class="v-speed-unit">KM/H</span>
          </div>
          <div class="v-info-box">
            <div class="v-street-name" id="v-street-name">📍 Sân Nhà Cây Cảnh Vũ Dậu</div>
            <div class="v-progress-bar-bg">
              <div class="v-progress-fill" id="v-progress-fill"></div>
            </div>
            <div class="v-dist-text" id="v-dist-text">0m / 1,191m (0%)</div>
          </div>
        </div>
        <div class="v-btn-row">
          <button class="v-hud-btn" id="btn-v-auto-ride">🎬 Lái Tự Động</button>
          <button class="v-hud-btn" id="btn-v-horn">📢 Còi (H)</button>
          <button class="v-hud-btn" id="btn-v-mount">🚶 Xuống Xe (F)</button>
        </div>
        <div class="v-teleport-grid">
          <button class="v-tp-btn" id="btn-tp-school">🏫 Cổng Trường Học (0m)</button>
          <button class="v-tp-btn" id="btn-tp-roundabout">🔄 Bùng Binh Ngô Quyền</button>
          <button class="v-tp-btn" id="btn-tp-avenue">🛣️ Đại Lộ Hùng Vương</button>
          <button class="v-tp-btn" id="btn-tp-home">🏡 Sân Nhà Vũ Dậu (1.2km)</button>
        </div>
      `;
      document.body.appendChild(hudEl);

      document.getElementById('btn-v-auto-ride').addEventListener('click', () => {
        this.initAudioEngine();
        this.toggleAutoPilot();
      });

      document.getElementById('btn-v-horn').addEventListener('click', () => {
        this.playHornSound();
      });

      document.getElementById('btn-v-mount').addEventListener('click', () => {
        this.toggleMount();
      });

      document.getElementById('btn-tp-school').addEventListener('click', () => this.teleportToWaypoint(0));
      document.getElementById('btn-tp-roundabout').addEventListener('click', () => this.teleportToWaypoint(13));
      document.getElementById('btn-tp-avenue').addEventListener('click', () => this.teleportToWaypoint(23));
      document.getElementById('btn-tp-home').addEventListener('click', () => this.teleportToWaypoint(41));
    }

    // ------------------------------------------------------------
    // 11. KÍCH HOẠT CHẾ ĐỘ THẾ GIỚI MỞ GTA VICE CITY TOÀN MÀN HÌNH
    // ------------------------------------------------------------
    activateCityMode(startIdx = 0, startMounted = true) {
      // Đảm bảo kết nối đúng arena mới nhất
      if (window.Campus3DArenaInstance && this.arena !== window.Campus3DArenaInstance) {
        this.bindArena(window.Campus3DArenaInstance);
      }

      this.isCityMode = true;
      if (this.arena) this.arena.isCityDrivingMode = true;
      this.isMounted = !!startMounted;

      // 1. Gỡ bỏ triệt để class toàn màn hình roblox trước đó nếu có (ghi nhớ trạng thái để khôi phục khi về trường)
      this._wasRobloxFullscreen = document.body.classList.contains('mode-roblox-fullscreen');
      document.body.classList.remove('mode-roblox-fullscreen');
      document.body.classList.add('city-driving-active');

      // Ẩn tất cả modals nếu có
      document.querySelectorAll('.modal-overlay, .campus-modal-overlay').forEach(el => {
        el.style.setProperty('display', 'none', 'important');
      });

      // 2. Kích thước Canvas và Camera toàn màn hình - Giữ nguyên DOM hierarchy để chống mất focus và sự kiện
      if (this.renderer && this.renderer.domElement) {
        this.renderer.domElement.classList.add('vice-city-canvas-fullscreen');
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }

      if (this.camera) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      }

      // Hiện Viewport HUD và Nút quay lại trường học
      const fsViewport = document.getElementById('vice-city-fullscreen-viewport');
      if (fsViewport) {
        fsViewport.style.setProperty('display', 'block', 'important');
      }

      // Ghi nhớ trạng thái màn hình trước đó
      this._wasInQuiz = !!document.getElementById('roblox-game-container');

      // 3. Không gian Thành Phố 3D Anime Ghibli tươi sáng, đồng bộ với Trường Học Ngô Quyền
      this.scene.fog = null;
      this.renderer.setClearColor(0x38bdf8, 1.0);
      this.scene.background = new THREE.Color(0x38bdf8);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.05;
      if (THREE.sRGBEncoding) {
        this.renderer.outputEncoding = THREE.sRGBEncoding;
      }

      // TẮT TOÀN BỘ ĐÈN TRƯỜNG HỌC ĐỂ TRÁNH CHỒNG ĐÈN GÂY CHÁY SÁNG MÀN HÌNH
      if (this.arena) {
        if (this.arena.ambientLight) this.arena.ambientLight.visible = false;
        if (this.arena.sunLight) this.arena.sunLight.visible = false;
        if (this.arena.rimLight) this.arena.rimLight.visible = false;
        if (this.arena.hemiLight) this.arena.hemiLight.visible = false;
      }

      // Bật hệ thống đèn chuyên biệt cho Thành phố Anime 1.19 km (Nắng ấm Studio Ghibli & Chiều sâu đổ bóng)
      if (this.citySunLight) {
        this.citySunLight.visible = true;
        this.citySunLight.intensity = 1.35;
        this.citySunLight.color.setHex(0xfffbeb);
        this.citySunLight.castShadow = true;
      }
      if (this.cityAmbientLight) {
        this.cityAmbientLight.visible = true;
        this.cityAmbientLight.intensity = 0.65;
        this.cityAmbientLight.color.setHex(0xf1f5f9);
      }

      // GIỮ NGUYÊN KHUÔN VIÊN TRƯỜNG HỌC ĐỂ NHÌN TỪ NGOÀI PHỐ TRẦN QUỐC TUẤN VÀO
      if (this.arena && typeof this.arena.setSchoolCampusVisible === 'function') {
        this.arena.setSchoolCampusVisible(true);
      }
      this.cityGroup.visible = true;
      this.bikeMesh.visible = true;

      // HIỂN THỊ 100% TOÀN BỘ CÔNG TRÌNH 3D THÀNH PHỐ ANIME 1:1
      if (this.cityGroup) {
        this.cityGroup.children.forEach(c => {
          c.visible = true;
        });
      }

      // TẮT BẦU CẦU 360 ẢNH THẬT KHI ĐI LẠI TRONG THẾ GIỚI 3D ĐỂ LOẠI BỎ TRIỆT ĐỂ MÉO HÌNH VÀ VÒNG LẶP
      if (this.citySkySphere) {
        this.citySkySphere.visible = false;
      }
      this.updateCitySkySphere(startIdx || 41);
      if (this.citySkySphere) {
        this.citySkySphere.visible = false;
      }

      // Giữ Vòm trời Ghibli Anime và Mặt trời tỏa sáng luôn hoạt động
      if (this.arena) {
        if (this.arena.skyDome) this.arena.skyDome.visible = true;
        if (this.arena.sunGroup) this.arena.sunGroup.visible = true;
      }

      if (this.arena) {
        this.arena.isCityDrivingMode = true;
        this.arena.selectionLocked = false;
        if (this.arena.navArrowGroup) this.arena.navArrowGroup.visible = false;
        if (this.arena.beaconBeamGroup) this.arena.beaconBeamGroup.visible = false;
        // Đồng bộ trạng thái phím hiện tại để nhân vật bước đi mượt mà không bị khựng lại
        if (this.arena.keys) {
          this.cityKeys.forward = !!this.arena.keys.forward;
          this.cityKeys.backward = !!this.arena.keys.backward;
          this.cityKeys.left = !!this.arena.keys.left;
          this.cityKeys.right = !!this.arena.keys.right;
        }
      }

      if (this.isMounted) {
        if (this.haMyRiderGroup) this.haMyRiderGroup.visible = true;
        if (this.arena && this.arena.studentMesh) this.arena.studentMesh.visible = false;
      } else {
        if (this.haMyRiderGroup) this.haMyRiderGroup.visible = false;
        if (this.arena && this.arena.studentMesh) this.arena.studentMesh.visible = true;
      }
      if (this.bikePromptBillboard) this.bikePromptBillboard.visible = false;

      // 4. Nếu chưa có vị trí hoặc cần đến điểm cụ thể (mặc định cổng trường 141 Trần Quốc Tuấn)
      if (typeof startIdx === 'number' && startIdx >= 0) {
        this.teleportToWaypoint(startIdx);
      } else if (this.isMounted) {
        this.cameraYawOffset = 0;
        this._updateFollowCamera(this.bikeMesh.position, true);
      }

      // Hiện HUD xe máy ở góc dưới phải
      const hud = document.getElementById('vision-bike-hud');
      if (hud) hud.style.setProperty('display', 'block', 'important');

      const btnMount = document.getElementById('btn-v-mount');
      if (btnMount) btnMount.textContent = this.isMounted ? '🚶 Xuống Xe (F)' : '🛵 Lên Xe Vision (F)';

      const promptEl = document.getElementById('bike-proximity-prompt');
      if (promptEl) promptEl.style.display = 'none';

      this.initAudioEngine();
    }

    activateCityModeFromGate(startX = 0, startZ = 56.5) {
      this.gateTransitionCooldown = Date.now();
      if (this.arena) this.arena.gateTransitionCooldown = Date.now();
      this._wasRobloxFullscreen = document.body.classList.contains('mode-roblox-fullscreen');
      document.body.classList.remove('mode-roblox-fullscreen');
      this.activateCityMode(-1, false); // startMounted = false: Đi bộ tự do!
      this.isMounted = false;
      this.walkBaseY = 0.16; // Chiều cao vỉa hè trường học chuẩn xác (0.16m)

      // Đặt Bé Hà My đứng ngay vỉa hè trước cổng trường hướng về phía Tây phố Trần Quốc Tuấn
      if (this.arena && this.arena.studentMesh) {
        this.arena.studentMesh.visible = true;
        this.arena.studentMesh.position.set(startX, 0.16, startZ);
        this.arena.studentMesh.rotation.y = -Math.PI / 2;
        if (this.arena.navArrowGroup) this.arena.navArrowGroup.visible = false;
        if (this.arena.beaconBeamGroup) this.arena.beaconBeamGroup.visible = false;
      }
      if (this.haMyRiderGroup) this.haMyRiderGroup.visible = false;

      // Đặt xe Honda Vision của Ba đỗ ngay trên vỉa hè trước cổng trường
      if (this.bikeMesh) {
        this.bikeMesh.visible = true;
        this.bikeMesh.position.set(3.2, 0.16, 55.6);
        this.bikeHeading = -Math.PI / 2;
        this.bikeMesh.rotation.y = this.bikeHeading;
      }
      this.bikeSpeed = 0;
      this.cameraYawOffset = -Math.PI / 2;
      this.cameraPitchOffset = 0.12;
      this.cameraDistOffset = 0;
      this._updateWalkingCamera(new THREE.Vector3(startX, 0.16, startZ));

      const btnMount = document.getElementById('btn-v-mount');
      if (btnMount) btnMount.textContent = '🛵 Lên Xe Vision (F)';
      const btnWalk = document.getElementById('btn-radar-walk');
      if (btnWalk) btnWalk.textContent = '🛵 Lên Xe Vision (F)';

      this.showComicDialogue('🎒', 'BÉ HÀ MY', 'Tan học rồi! Bé đã bước ra phố Trần Quốc Tuấn. Ba đang chờ đón ngoài cổng trường kìa!');
    }

    deactivateCityMode() {
      this.isCityMode = false;
      if (this.arena) this.arena.isCityDrivingMode = false;
      this.isAutoPilot = false;
      this.isMounted = false;

      // 1. Gỡ bỏ fullscreen khỏi body để khôi phục giao diện trường học
      document.body.classList.remove('city-driving-active');
      if (this._wasRobloxFullscreen) {
        document.body.classList.add('mode-roblox-fullscreen');
      }

      // 2. Ẩn Viewport Fullscreen
      const fsViewport = document.getElementById('vice-city-fullscreen-viewport');
      if (fsViewport) {
        fsViewport.style.setProperty('display', 'none', 'important');
      }

      // Tắt ánh sáng chuyên biệt thành phố khi vào lại trường học
      if (this.citySunLight) this.citySunLight.visible = false;
      if (this.cityAmbientLight) this.cityAmbientLight.visible = false;

      // Khôi phục hệ thống chiếu sáng sắc nét trường học
      if (this.arena) {
        if (this.arena.ambientLight) this.arena.ambientLight.visible = true;
        if (this.arena.sunLight) this.arena.sunLight.visible = true;
        if (this.arena.rimLight) this.arena.rimLight.visible = true;
        if (this.arena.hemiLight) this.arena.hemiLight.visible = true;
      }

      // Khôi phục độ phơi sáng chuẩn của sân trường
      if (this.renderer) {
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 0.96;
      }

      // BÓC TÁCH TRIỆT ĐỂ: ẨN THÀNH PHỐ
      this.cityGroup.visible = false;
      if (this.citySkySphere) this.citySkySphere.visible = false;
      if (this.bikeMesh) this.bikeMesh.visible = false;
      if (this.haMyRiderGroup) this.haMyRiderGroup.visible = false;
      if (this.bikePromptBillboard) this.bikePromptBillboard.visible = false;

      const hud = document.getElementById('vision-bike-hud');
      if (hud) hud.style.setProperty('display', 'none', 'important');

      const toast = document.getElementById('npc-speech-toast');
      if (toast) toast.style.display = 'none';
      const promptToast = document.getElementById('street-prop-prompt');
      if (promptToast) promptToast.style.display = 'none';

      // TUYỆT ĐỐI KHÔNG SƯƠNG MÙ
      if (this.scene) this.scene.fog = null;
      if (this.renderer) this.renderer.setClearColor(0x38bdf8, 1.0);

      // Nếu người dùng trước đó vào City Mode từ màn hình Quiz, đưa về Sân Trường Ngô Quyền hoàn chỉnh
      if (document.getElementById('roblox-game-container')) {
        if (window.ChipGameInstance && typeof window.ChipGameInstance.renderGrade5WorldMap === 'function') {
          if (typeof window.ChipGameInstance.cleanup3D === 'function') {
            window.ChipGameInstance.cleanup3D();
          }
          window.ChipGameInstance.renderGrade5WorldMap();
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 80);
          return;
        }
      }

      // Khôi phục kích thước canvas ban đầu trong trường học
      if (this.renderer && this.renderer.domElement) {
        this.renderer.domElement.classList.remove('vice-city-canvas-fullscreen');
        this.renderer.domElement.style.removeProperty('position');
        this.renderer.domElement.style.removeProperty('top');
        this.renderer.domElement.style.removeProperty('left');
        this.renderer.domElement.style.removeProperty('width');
        this.renderer.domElement.style.removeProperty('height');
      }

      // Khôi phục toàn bộ khuôn viên trường học
      if (this.arena && typeof this.arena.setSchoolCampusVisible === 'function') {
        this.arena.setSchoolCampusVisible(true);
      }
      if (this.arena) {
        this.arena.isCityDrivingMode = false;
        if (typeof this.arena.handleResize === 'function') {
          this.arena.handleResize();
        }
        if (this.arena.studentMesh) {
          this.arena.studentMesh.visible = true;
          this.arena.studentMesh.position.set(0, 0, 1.5);
          this.arena.studentMesh.rotation.y = 0;
        }
        this.arena.cameraYaw = 0.0;
        this.arena.cameraPitch = 0.20;
        this.arena.cameraDistance = 4.8;
      }

      if (this.camera && this.arena && this.arena.studentMesh) {
        const sPos = this.arena.studentMesh.position;
        this.camera.position.set(sPos.x, sPos.y + 2.5, sPos.z + 5.0);
        this.camera.lookAt(sPos.x, sPos.y + 1.25, sPos.z);
      }

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 50);
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 150);
    }

    mountBike() {
      this.isMounted = true;
      this.isCityMode = true;
      if (this.arena) {
        this.arena.isCityDrivingMode = true;
        this.arena.selectionLocked = false;
      }
      if (this.arena && typeof this.arena.setSchoolCampusVisible === 'function') {
        this.arena.setSchoolCampusVisible(true);
      }
      this.cityGroup.visible = true;
      this.bikeMesh.visible = true;
      if (this.arena && this.arena.studentMesh) this.arena.studentMesh.visible = false;
      if (this.haMyRiderGroup) this.haMyRiderGroup.visible = true;
      if (this.bikePromptBillboard) this.bikePromptBillboard.visible = false;

      document.body.classList.add('city-driving-active');

      const fsViewport = document.getElementById('vice-city-fullscreen-viewport');
      if (fsViewport) fsViewport.style.setProperty('display', 'block', 'important');

      const hud = document.getElementById('vision-bike-hud');
      if (hud) hud.style.setProperty('display', 'block', 'important');

      const btn = document.getElementById('btn-v-mount');
      if (btn) btn.textContent = '🚶 Xuống Xe (F)';

      const promptEl = document.getElementById('bike-proximity-prompt');
      if (promptEl) promptEl.style.display = 'none';

      if (this.renderer && this.renderer.domElement) {
        this.renderer.domElement.classList.add('vice-city-canvas-fullscreen');
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
      if (this.camera) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      }

      this.initAudioEngine();
      this.cameraYawOffset = 0;
      this._updateFollowCamera(this.bikeMesh.position, true);
    }

    teleportToWaypoint(idx, customCoord = null) {
      if (!this.isCityMode) {
        this.activateCityMode(-1, this.isMounted !== false);
      }
      let pt = customCoord;
      let angle = -Math.PI / 2;

      if (!pt) {
        if (typeof idx === 'number' && this.routePoints[idx]) {
          pt = this.routePoints[idx];
          if (idx === 41) {
            pt = { x: -930.9, z: -312.0 }; // Lùi ra 14m trước cổng để camera bắt trọn 100% cổng tam quan và biển đại tự
            angle = -Math.PI; // Hướng mặt thẳng vào sân vườn nhà Cây Cảnh Vũ Dậu
          } else if (idx < this.routePoints.length - 1) {
            const nextPt = this.routePoints[idx + 1];
            angle = Math.atan2(nextPt.x - pt.x, nextPt.z - pt.z);
          } else {
            const prevPt = this.routePoints[idx - 1] || pt;
            angle = Math.atan2(pt.x - prevPt.x, pt.z - prevPt.z);
          }
        } else if (idx === 'traioi') {
          pt = { x: -290.0, z: -320.0 };
          angle = -Math.PI / 4;
        } else if (idx === 'tinhuy') {
          pt = { x: -485.0, z: -95.0 };
          angle = -Math.PI / 6;
        } else if (idx === 'park') {
          pt = { x: -545.0, z: -275.0 };
          angle = -Math.PI / 2;
        } else {
          pt = this.routePoints[0];
        }
      }

      // Nếu dịch chuyển nhanh qua các điểm trên tuyến (ngoại trừ cổng trường idx=0 khi đang đi bộ), tự động lên xe!
      if (idx !== 0 && !this.isMounted) {
        this.mountBike();
      }

      this.bikeMesh.position.set(pt.x, 0.05, pt.z);
      this.bikeSpeed = 0;
      this.isAutoPilot = false;
      this.bikeHeading = angle;
      this.bikeMesh.rotation.y = angle;
      this.updateCitySkySphere();

      if (typeof idx === 'number') {
        this.autoProgress = idx / (this.routePoints.length - 1);
      }

      // Đóng dropdown Đi Nhanh khi đã dịch chuyển
      const ftBar = document.getElementById('gmaps-fast-travel-bar');
      if (ftBar) ftBar.style.display = 'none';

      if (this.isMounted) {
        // Căn chỉnh góc quay vàng điện ảnh cho từng địa danh để 100% biển hiệu và không gian khoáng đạt, không bị xe che
        if (idx === 6) {
          // Số 24 Ngô Quyền: Chếch sang trái để ngắm Elise Luxury, Vàng Bạc Ngô Quyền & Cột điện viễn thông
          this.cameraYawOffset = 0.52;
          this.cameraPitchOffset = 0.10;
          this.cameraDistOffset = 1.0;
        } else if (idx === 7) {
          // Ngã Ba Lê Xoay: Chếch sang trái ngắm Tiệm Huyền Hậu, Vinamilk & Biển Phố Lê Xoay
          this.cameraYawOffset = 0.62;
          this.cameraPitchOffset = 0.10;
          this.cameraDistOffset = 1.2;
        } else if (idx === 12 || idx === 13) {
          // Bưu Điện VNPT & Bùng Binh Kim Ngọc: Chếch ngắm tháp hoa & Tòa nhà Bưu điện
          this.cameraYawOffset = -1.15;
          this.cameraPitchOffset = 0.12;
          this.cameraDistOffset = 1.5;
        } else if (idx === 34 || idx === 35) {
          // Hưng Yên Bakery: Chếch phải ngắm tiệm bánh
          this.cameraYawOffset = 0.32;
          this.cameraPitchOffset = 0.12;
          this.cameraDistOffset = 1.0;
        } else if (idx === 41) {
          // Sân Nhà Cây Cảnh Vũ Dậu: Lùi camera ra xa ngắm trọn vẹn biển đại tự & cổng ngói đỏ & sân gạch
          this.cameraYawOffset = 0;
          this.cameraPitchOffset = 0.10;
          this.cameraDistOffset = 2.0;
        } else {
          this.cameraYawOffset = 0;
          this.cameraPitchOffset = 0.12;
          this.cameraDistOffset = 0;
        }

        if (this.arena && this.arena.studentMesh) {
          this.arena.studentMesh.visible = false;
          this.arena.studentMesh.position.set(pt.x, 0.05, pt.z);
        }
        if (this.haMyRiderGroup) {
          this.haMyRiderGroup.visible = true;
        }
        this._updateFollowCamera(this.bikeMesh.position, true);
      } else {
        if (this.arena && this.arena.studentMesh) {
          this.arena.studentMesh.visible = true;
          this.arena.studentMesh.position.set(pt.x + 1.2, 0.16, pt.z);
          this.arena.studentMesh.rotation.y = angle;
        }
        if (this.haMyRiderGroup) {
          this.haMyRiderGroup.visible = false;
        }
        this.cameraYawOffset = angle;
        this.cameraPitchOffset = 0.08;
        this._updateWalkingCamera(new THREE.Vector3(pt.x + 1.2, 0.16, pt.z));
      }

      // Thông báo địa điểm mới
      const streetName = (typeof idx === 'number' && this.routePoints[idx]) ? this.routePoints[idx].street : (pt.street || 'Địa danh Google Maps');
      this.showToastNotification('📍 Đã đến: ' + streetName);
    }

    toggleAutoPilot() {
      this.isAutoPilot = !this.isAutoPilot;
      const btn = document.getElementById('btn-v-auto-ride');
      if (btn) btn.classList.toggle('active', this.isAutoPilot);
    }

    toggleMount() {
      if (this.isMounted) {
        // ĐANG LÁI XE -> XUỐNG XE ĐI BỘ
        this.isMounted = false;
        this.bikeSpeed = 0;
        if (this.haMyRiderGroup) this.haMyRiderGroup.visible = false;
        if (this.bikePromptBillboard) this.bikePromptBillboard.visible = true;

        if (this.arena && this.arena.studentMesh) {
          this.arena.studentMesh.visible = true;
          const sideAngle = this.bikeHeading + Math.PI / 2;
          this.arena.studentMesh.position.set(
            this.bikeMesh.position.x + Math.sin(sideAngle) * 1.4,
            0,
            this.bikeMesh.position.z + Math.cos(sideAngle) * 1.4
          );
        }
        if (this.arena) {
          this.arena.isCityDrivingMode = true; // Vẫn ở chế độ Thế giới mở thành phố
        }
        const btn = document.getElementById('btn-v-mount');
        if (btn) btn.textContent = '🛵 Lên Xe (F)';
        const btnR = document.getElementById('btn-radar-walk');
        if (btnR) btnR.textContent = '🛵 Lên Xe (F)';
        this.showComicDialogue('👧', 'BÉ HÀ MY', 'Con xuống xe đi dạo phố, ngắm quán xá và vào ngõ 141 chơi một lát nhé Ba!');
      } else {
        if (this.arena && this.arena.studentMesh && this.bikeMesh) {
          const sPos = this.arena.studentMesh.position;
          const bPos = this.bikeMesh.position;
          const dist = Math.hypot(sPos.x - bPos.x, sPos.z - bPos.z);
          if (dist >= 4.0) {
            this.bikeMesh.position.set(sPos.x, 0.05, sPos.z);
          }
        }
        this.mountBike();
        const btnR = document.getElementById('btn-radar-walk');
        if (btnR) btnR.textContent = '🚶 Xuống Xe (F)';
        this.showComicDialogue('🛵', 'BA CHỞ HÀ MY', 'Nào lên xe con gái ơi, ôm chặt eo Ba để Ba vít ga dạo phố Vĩnh Yên về nhà nhé!');
      }
    }

    cycleCameraMode() {
      this.cameraMode = (this.cameraMode + 1) % 3;
      if (this.dadGroup) this.dadGroup.visible = (this.cameraMode !== 2);
      if (this.haMyRiderGroup) this.haMyRiderGroup.visible = (this.cameraMode !== 2 && this.isMounted);
      if (this.cockpitArms) this.cockpitArms.visible = (this.cameraMode === 2);

      const camNames = ['📷 GTA Chase', '📷 Toàn Cảnh', '📷 Street View 360°'];
      const btnCam = document.getElementById('btn-radar-cam');
      if (btnCam) btnCam.textContent = camNames[this.cameraMode];
      this.showComicDialogue(
        this.cameraMode === 2 ? '👁️' : '📷',
        'CHẾ ĐỘ CAMERA',
        this.cameraMode === 2
          ? 'Đã chuyển sang Góc nhìn thứ nhất Google Street View 360°! Rê chuột để soi đường phố xung quanh!'
          : (this.cameraMode === 1 ? 'Đã chuyển sang Góc nhìn toàn cảnh từ trên cao!' : 'Đã chuyển sang Góc nhìn thứ ba GTA Chase bám sau!')
      );
    }

    // ------------------------------------------------------------
    // 12. VÒNG LẶP CẬP NHẬT XE MÁY & CAMERA GTA CHUẨN XÁC
    // ------------------------------------------------------------
    _hookIntoArenaLoop() {
      // Vòng lặp Three.js được điều phối trực tiếp bởi RobloxClassroom3D.prototype.animate
      // Tuyệt đối không monkey-patch gián tiếp để tránh đệ quy hoặc nghẽn RAF
    }

    update() {
      if (!this.isCityMode) return;
      if (!this.bikeMesh) return;

      try {
        const now = performance.now();
        const dt = Math.min(0.08, (now - (this.lastFrameTime || now)) / 1000);
        this.lastFrameTime = now;

        // Cập nhật vị trí SkySphere ảnh thực tế 1:1 luôn đi theo Camera
        if (this.citySkySphere && this.camera && this.citySkySphere.visible) {
          this.citySkySphere.position.copy(this.camera.position);
          if (!this._lastSkyCheck || now - this._lastSkyCheck > 250) {
            this._lastSkyCheck = now;
            this.updateCitySkySphere();
          }
        }

      // 1. Cập nhật hiệu ứng hơi nước bốc khói nồi Phở Bò Bát Đàn Chibi
      if (this.steamPuffs && this.steamPuffs.length) {
        this.steamPuffs.forEach((puff, idx) => {
          puff.position.y += dt * 0.35;
          const s = 1.0 + (puff.position.y - 1.5) * 0.6;
          puff.scale.set(s, s, s);
          if (puff.position.y > 2.4) {
            puff.position.y = 1.45 + idx * 0.15;
            puff.scale.set(1, 1, 1);
          }
        });
      }

      // 2. Cập nhật Cư Dân & NPC Chibi Đời Sống Việt Nam
      this.updatePedestrians(now * 0.001, dt);

      // 3. Cập nhật Phương Tiện Giao Thông AI Chibi (Wave, Lead, Taxi, Sedan)
      this.updateTrafficVehicles(dt);

      // 3.5. Cập nhật Đèn Giao Thông Đổi Màu Theo Chu Kỳ
      this.updateTrafficLights(dt);

      // 4. Cập nhật Mini-Radar Bản Đồ GTA Vice City
      this.updateRadarMinimap();

      // 4.5. Cập nhật Bản Đồ Toàn Màn Hình Google Maps (nếu đang mở)
      if (this.isGoogleMapsOpen) {
        this.renderFullscreenGoogleMaps();
      }

      // 5. Kiểm tra điểm tương tác đường phố gần nhất
      this.checkNearbyInteractions();

      // Xoay biển hiệu 3D của Ba hướng về camera
      if (this.bikePromptBillboard && this.camera && this.bikePromptBillboard.visible) {
        this.bikePromptBillboard.lookAt(this.camera.position);
      }

      // ========================================================
      // 6. CHẾ ĐỘ VẬN HÀNH: LÁI XE HONDA VISION HOẶC ĐI BỘ TRẢI NGHIỆM
      // ========================================================
      const keys = {
        forward: this.cityKeys.forward || (this.arena && this.arena.keys && this.arena.keys.forward),
        backward: this.cityKeys.backward || (this.arena && this.arena.keys && this.arena.keys.backward),
        left: this.cityKeys.left || (this.arena && this.arena.keys && this.arena.keys.left),
        right: this.cityKeys.right || (this.arena && this.arena.keys && this.arena.keys.right),
        shift: this.cityKeys.shift
      };

      if (this.isMounted) {
        // --- ĐANG LÁI XE HONDA VISION CỦA BA ---
        if (this.isAutoPilot) {
          this.autoProgress += this.autoDirection * this.autoSpeed;
          if (this.autoProgress >= 1.0) {
            this.autoProgress = 1.0;
            this.autoDirection = -1;
          } else if (this.autoProgress <= 0.0) {
            this.autoProgress = 0.0;
            this.autoDirection = 1;
          }

          const currentPos = this.routeCurve.getPointAt(this.autoProgress);
          const lookAhead = Math.min(1, Math.max(0, this.autoProgress + this.autoDirection * 0.015));
          const forwardPos = this.routeCurve.getPointAt(lookAhead);

          this.bikeMesh.position.set(currentPos.x, 0.05, currentPos.z);
          this.bikeMesh.lookAt(forwardPos.x, 0.05, forwardPos.z);
          this.bikeHeading = this.bikeMesh.rotation.y;
          this.bikeSpeed = 38;

          if (this.frontWheel) this.frontWheel.rotation.x += 0.3;
          if (this.rearWheel) this.rearWheel.rotation.x += 0.3;

          if (this.haMyRiderGroup) {
            this.haMyRiderGroup.position.y = 0.8 + Math.sin(Date.now() * 0.008) * 0.02;
          }

          this._updateFollowCamera(currentPos);
        } else {
          // Lái xe tự do phím bấm WASD
          if (keys.forward) {
            this.initAudioEngine();
            this.bikeSpeed = Math.min(this.bikeMaxSpeed, this.bikeSpeed + this.bikeAccel);
          } else if (keys.backward) {
            this.bikeSpeed = Math.max(-14, this.bikeSpeed - this.bikeBrake);
          } else {
            if (this.bikeSpeed > 0) this.bikeSpeed = Math.max(0, this.bikeSpeed - this.bikeFriction);
            if (this.bikeSpeed < 0) this.bikeSpeed = Math.min(0, this.bikeSpeed + this.bikeFriction);
          }

          const steerRate = 0.045;
          if (keys.left) {
            this.bikeHeading += steerRate;
            this.bikeTilt = Math.max(-0.28, this.bikeTilt - 0.05);
          } else if (keys.right) {
            this.bikeHeading -= steerRate;
            this.bikeTilt = Math.min(0.28, this.bikeTilt + 0.05);
          } else {
            this.bikeTilt *= 0.82;
          }

          const moveDist = (this.bikeSpeed / 3.6) * 0.016;
          this.bikeMesh.rotation.y = this.bikeHeading;
          this.bikeMesh.rotation.z = -this.bikeTilt;
          this.bikeMesh.translateZ(moveDist);

          const wheelRot = moveDist / 0.3;
          if (this.frontWheel) this.frontWheel.rotation.x += wheelRot;
          if (this.rearWheel) this.rearWheel.rotation.x += wheelRot;

          if (this.haMyRiderGroup) {
            this.haMyRiderGroup.position.y = 0.8 + Math.sin(Date.now() * 0.012) * (this.bikeSpeed > 5 ? 0.018 : 0.005);
          }

          this._updateFollowCamera(this.bikeMesh.position);
          this._calculateNearestRouteProgress();
        }

        this.updateEngineSound(this.bikeSpeed);
      } else {
        // --- ĐANG ĐI BỘ CHIBI TỰ DO TRÊN ĐƯỜNG PHỐ & NGÕ XÓM (WALKING MODE) ---
        this.updateWalkingPhysics(dt);
        this._calculateNearestRouteProgressForStudent();
        if (this.isAudioReady && this.engineGain) {
          this.engineGain.gain.setTargetAtTime(0.001, this.audioCtx.currentTime, 0.1);
        }
      }

      this._updateHUD();
      if (this.dashTex) {
        this.drawSpeedometerCanvas(this.bikeSpeed || 0);
      }
      } catch (loopErr) {
        console.error("CityCommuteManager.update error:", loopErr);
      }
    }

    // ------------------------------------------------------------
    // 13. VẬT LÝ ĐI BỘ CHIBI TỰ DO & CAMERA GOOGLE STREET VIEW 360°
    // ------------------------------------------------------------
    triggerWalkingJump() {
      if (this.isMounted || this.isWalkingJumping) return;
      this.isWalkingJumping = true;
      this.walkJumpVy = 8.8; // Vận tốc nảy lên tự do
      if (this.arena && typeof this.arena.playSound === 'function') {
        this.arena.playSound('jump');
      }
    }

    updateWalkingPhysics(dt) {
      if (!this.arena || !this.arena.studentMesh) return;
      const student = this.arena.studentMesh;
      student.visible = true;

      // Bảo vệ chống triệt để lỗi NaN
      if (typeof this.walkAnimTime !== 'number' || isNaN(this.walkAnimTime)) {
        this.walkAnimTime = 0;
      }
      if (!isFinite(student.position.x) || !isFinite(student.position.y) || !isFinite(student.position.z)) {
        student.position.set(0, 0.16, 55.4);
      }

      const keys = {
        forward: this.cityKeys.forward || (this.arena && this.arena.keys && this.arena.keys.forward),
        backward: this.cityKeys.backward || (this.arena && this.arena.keys && this.arena.keys.backward),
        left: this.cityKeys.left || (this.arena && this.arena.keys && this.arena.keys.left),
        right: this.cityKeys.right || (this.arena && this.arena.keys && this.arena.keys.right),
        shift: this.cityKeys.shift
      };

      // Xử lý vật lý Nhảy cao (Space) ngoài cổng trường
      if (this.isWalkingJumping) {
        this.walkJumpVy -= 24.0 * dt; // Trọng lực rơi tự do
        this.walkBaseY += this.walkJumpVy * dt;
        const groundLevel = 0.16;
        if (this.walkBaseY <= groundLevel) {
          this.walkBaseY = groundLevel;
          this.walkJumpVy = 0;
          this.isWalkingJumping = false;
          if (this.arena && typeof this.arena.playSound === 'function') {
            this.arena.playSound('land');
          }
        }
      }

      // Vector hướng nhìn camera trên mặt phẳng X-Z
      const camDir = new THREE.Vector3();
      if (this.camera) {
        this.camera.getWorldDirection(camDir);
      } else {
        camDir.set(0, 0, -1);
      }
      camDir.y = 0;
      if (camDir.lengthSq() > 0.001) camDir.normalize();
      else camDir.set(0, 0, -1);

      // Vector vuông góc chuẩn xác (Cross product với trục Y hướng lên)
      const camRight = new THREE.Vector3().crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

      const moveVec = new THREE.Vector3();
      if (keys.forward) moveVec.add(camDir);
      if (keys.backward) moveVec.sub(camDir);
      if (keys.left) moveVec.sub(camRight);
      if (keys.right) moveVec.add(camRight);

      const isMoving = moveVec.lengthSq() > 0.001;

      if (isMoving) {
        moveVec.normalize();
        const isRun = !!keys.shift;
        const walkSpeed = isRun ? 18.0 : 11.0;

        student.position.addScaledVector(moveVec, walkSpeed * dt);

        // Tự do đi bộ khám phá toàn bộ 1.19 km thành phố Vĩnh Yên (không bị chặn ở X = -150)
        student.position.x = Math.max(-1050.0, Math.min(50.0, student.position.x));
        student.position.z = Math.max(-420.0, Math.min(95.0, student.position.z));

        // Xoay nhân vật về hướng di chuyển
        const targetYaw = Math.atan2(moveVec.x, moveVec.z);
        student.rotation.y = targetYaw;

        // Hoạt họa bước chân và vung tay Chibi
        this.walkAnimTime += dt * (isRun ? 12.0 : 8.5);
        if (this.isWalkingJumping) {
          // Tư thế co chân nhảy vui tươi
          if (this.arena.studentLegL) this.arena.studentLegL.rotation.x = -0.45;
          if (this.arena.studentLegR) this.arena.studentLegR.rotation.x = -0.45;
          if (this.arena.studentArmL) this.arena.studentArmL.rotation.x = 0.75;
          if (this.arena.studentArmR) this.arena.studentArmR.rotation.x = 0.75;
        } else {
          if (this.arena.studentLegL) this.arena.studentLegL.rotation.x = Math.sin(this.walkAnimTime) * 0.6;
          if (this.arena.studentLegR) this.arena.studentLegR.rotation.x = -Math.sin(this.walkAnimTime) * 0.6;
          if (this.arena.studentArmR) this.arena.studentArmR.rotation.x = -Math.sin(this.walkAnimTime) * 0.45;
          if (this.arena.studentArmL) this.arena.studentArmL.rotation.x = Math.sin(this.walkAnimTime) * 0.25;
        }

        // Bobbing nhún nhảy Chibi kết hợp với độ cao nhảy
        const bobbing = this.isWalkingJumping ? 0 : Math.abs(Math.sin(this.walkAnimTime)) * 0.07;
        student.position.y = this.walkBaseY + bobbing;
      } else {
        if (this.isWalkingJumping) {
          if (this.arena.studentLegL) this.arena.studentLegL.rotation.x = -0.4;
          if (this.arena.studentLegR) this.arena.studentLegR.rotation.x = -0.4;
          student.position.y = this.walkBaseY;
        } else {
          // Đứng thở nhẹ nhàng
          if (this.arena.studentLegL) this.arena.studentLegL.rotation.x *= 0.82;
          if (this.arena.studentLegR) this.arena.studentLegR.rotation.x *= 0.82;
          if (this.arena.studentArmR) this.arena.studentArmR.rotation.x *= 0.82;
          student.position.y = this.walkBaseY + Math.sin(Date.now() * 0.0035) * 0.02;
        }
      }

      // Cập nhật Camera bám theo Bé Hà My đi bộ
      this._updateWalkingCamera(student.position);

      // Kiểm tra khoảng cách với Xe Honda Vision của Ba
      const distToBike = student.position.distanceTo(this.bikeMesh.position);
      const promptEl = document.getElementById('bike-proximity-prompt');
      if (distToBike < 4.2) {
        if (promptEl) promptEl.style.display = 'flex';
      } else {
        if (promptEl) promptEl.style.display = 'none';
      }

      // Kiểm tra nếu đi bộ quay lại cổng trường Ngô Quyền (Z <= 52.8, |X| <= 4.2 có cooldown chống giật màn hình)
      const now = Date.now();
      if (this.isCityMode && (!this.gateTransitionCooldown || now - this.gateTransitionCooldown > 2500)) {
        if (student.position.z <= 52.8 && Math.abs(student.position.x) <= 4.2) {
          this.gateTransitionCooldown = now;
          if (this.arena) this.arena.gateTransitionCooldown = now;
          this.deactivateCityMode();
          if (this.arena && this.arena.studentMesh) {
            this.arena.studentMesh.position.set(0, 0, 48.0); // Căn chính giữa trục trung tâm trường học (X = 0)
            this.arena.studentMesh.rotation.y = Math.PI; // Quay mặt thẳng vào trong sân trường
            if (typeof this.arena.cameraYaw !== 'undefined') {
              this.arena.cameraYaw = 0;
              this.arena.cameraPitch = 0.20;
              this.arena.cameraDistance = 4.8;
            }
            if (typeof this.arena.handleResize === 'function') {
              this.arena.handleResize();
            }
          }
          window.dispatchEvent(new Event('resize'));
          return;
        }
      }

      // Gợi ý khi đi dạo gần cổng trường
      const distToGate = Math.hypot(student.position.x, student.position.z - 54.0);
      if (distToGate < 3.8 && Math.abs(student.position.x) <= 4.8 && distToBike >= 4.2) {
        let toastEl = document.getElementById('street-prop-prompt');
        if (!toastEl) {
          toastEl = document.createElement('div');
          toastEl.id = 'street-prop-prompt';
          toastEl.className = 'street-interaction-prompt';
          document.body.appendChild(toastEl);
        }
        toastEl.textContent = '🏫 Bước vào cổng để về lại Sân Trường Tiểu Học Ngô Quyền';
        toastEl.style.display = 'flex';
      }
    }

    _updateWalkingCamera(studentPos) {
      if (!this.camera) return;

      const yaw = isFinite(this.cameraYawOffset) ? this.cameraYawOffset : -Math.PI / 2;
      const rawPitch = isFinite(this.cameraPitchOffset) ? this.cameraPitchOffset : 0.12;
      const pitch = Math.max(-0.25, Math.min(0.60, rawPitch));

      const sX = isFinite(studentPos.x) ? studentPos.x : 0;
      const sY = isFinite(studentPos.y) ? studentPos.y : 0;
      const sZ = isFinite(studentPos.z) ? studentPos.z : 58.5;

      // Mode 0: Chase (Người thứ 3 GTA Chibi)
      if (this.cameraMode === 0) {
        const camDist = Math.max(1.8, 4.2 + (this.cameraDistOffset || 0));
        const camHeight = 1.6;
        const horizDist = camDist * Math.cos(pitch);
        let targetX = sX - Math.sin(yaw) * horizDist;
        let targetZ = sZ - Math.cos(yaw) * horizDist;
        let targetY = Math.max(0.60, sY + camHeight + camDist * Math.sin(pitch));

        // Chống camera xuyên qua tường rào trường học khi đang ở trước cổng trường
        if (sX >= -35.0 && sX <= 35.0) {
          if (sZ >= 55.0 && targetZ < 55.2) {
            targetZ = 55.2;
          }
          if (sZ <= 68.0 && targetZ > 69.2) {
            targetZ = 69.2;
          }
        }

        const lookAhead = 1.2;
        const lookX = sX + Math.sin(yaw) * lookAhead;
        const lookZ = sZ + Math.cos(yaw) * lookAhead;
        const lookY = sY + 1.25;
        this.camera.position.set(targetX, targetY, targetZ);
        this.camera.lookAt(lookX, lookY, lookZ);
      }
      // Mode 1: Far Cinematic (Bao quát toàn cảnh)
      else if (this.cameraMode === 1) {
        const camDist = Math.max(2.5, 7.8 + (this.cameraDistOffset || 0));
        const camHeight = 2.6;
        const horizDist = camDist * Math.cos(pitch);
        let targetX = sX - Math.sin(yaw) * horizDist;
        let targetZ = sZ - Math.cos(yaw) * horizDist;
        let targetY = Math.max(1.0, sY + camHeight + camDist * Math.sin(pitch));

        if (sZ >= 55.0 && targetZ < 55.2) targetZ = 55.2;

        const lookAhead = 2.0;
        const lookX = sX + Math.sin(yaw) * lookAhead;
        const lookZ = sZ + Math.cos(yaw) * lookAhead;
        this.camera.position.set(targetX, targetY, targetZ);
        this.camera.lookAt(lookX, sY + 1.25, lookZ);
      }
      // Mode 2: Google Street View First-Person 360° Photosphere
      else if (this.cameraMode === 2) {
        const eyeY = sY + 1.55;
        this.camera.position.set(sX, eyeY, sZ);

        const lookDist = 10.0;
        const lx = sX + Math.sin(yaw) * lookDist;
        const lz = sZ + Math.cos(yaw) * lookDist;
        const ly = eyeY - Math.tan(pitch) * lookDist;
      }

      if (this.arena && this.arena.skyDome && this.camera) {
        this.arena.skyDome.position.copy(this.camera.position);
      }
      if (this.arena && this.arena.sunGroup && this.camera) {
        this.arena.sunGroup.position.set(this.camera.position.x + 120, this.camera.position.y + 160, this.camera.position.z + 120);
      }
    }

    _updateFollowCamera(targetPos, instant = false) {
      if (!this.camera) return;

      const yaw = this.bikeHeading + (this.cameraYawOffset || 0);
      const pitch = Math.max(-0.65, Math.min(1.10, this.cameraPitchOffset || 0));

      let camDist = 3.6 + (this.cameraDistOffset || 0);
      let camHeight = 1.6;

      if (this.cameraMode === 2) {
        // Góc nhìn thứ nhất Google Street View Cockpit trên xe máy Honda Vision
        if (this.dadGroup) this.dadGroup.visible = false;
        if (this.haMyRiderGroup) this.haMyRiderGroup.visible = false;
        if (this.cockpitArms) this.cockpitArms.visible = true;

        const eyeOffsetBack = 0.08;
        const eyeX = targetPos.x - Math.sin(yaw) * eyeOffsetBack;
        const eyeZ = targetPos.z - Math.cos(yaw) * eyeOffsetBack;
        const eyeY = targetPos.y + 1.28;
        this.camera.position.set(eyeX, eyeY, eyeZ);

        const lookDist = 18.0;
        const lx = eyeX + Math.sin(yaw) * lookDist;
        const lz = eyeZ + Math.cos(yaw) * lookDist;
        const ly = eyeY - 0.72 - Math.tan(pitch) * lookDist;
        this.camera.lookAt(lx, ly, lz);
        return;
      }

      // Mode 0 (GTA Chase) & Mode 1 (Far Cinematic)
      if (this.dadGroup) this.dadGroup.visible = true;
      if (this.haMyRiderGroup) this.haMyRiderGroup.visible = !!this.isMounted;
      if (this.cockpitArms) this.cockpitArms.visible = false;

      camDist = (this.cameraMode === 1 ? 6.2 : 3.6) + (this.cameraDistOffset || 0);
      camHeight = (this.cameraMode === 1 ? 2.6 : 1.48);

      const speedOffset = (this.bikeSpeed / this.bikeMaxSpeed) * 0.7;
      const actualDist = camDist + speedOffset;

      const horizDist = actualDist * Math.cos(pitch);
      const desiredX = targetPos.x - Math.sin(yaw) * horizDist;
      const desiredZ = targetPos.z - Math.cos(yaw) * horizDist;
      const desiredY = Math.max(0.65, targetPos.y + camHeight + actualDist * Math.sin(pitch));

      if (instant) {
        this.camera.position.set(desiredX, desiredY, desiredZ);
      } else {
        const lerpRate = 0.22;
        this.camera.position.x += (desiredX - this.camera.position.x) * lerpRate;
        this.camera.position.y += (desiredY - this.camera.position.y) * lerpRate;
        this.camera.position.z += (desiredZ - this.camera.position.z) * lerpRate;
      }

      // Nhìn vào xe máy với độ cao vừa tầm, cho phép nghiêng lên/xuống tự do
      const lookDist = 1.8;
      const lookX = targetPos.x + Math.sin(yaw) * lookDist;
      const lookZ = targetPos.z + Math.cos(yaw) * lookDist;
      const lookY = targetPos.y + 1.25;
      this.camera.lookAt(lookX, lookY, lookZ);

      // Đồng bộ vòm trời Studio Ghibli và Mặt trời luôn bám theo Camera trên toàn bộ 1.19 km
      if (this.arena && this.arena.skyDome) {
        this.arena.skyDome.position.copy(this.camera.position);
      }
      if (this.arena && this.arena.sunGroup) {
        this.arena.sunGroup.position.set(this.camera.position.x + 120, this.camera.position.y + 160, this.camera.position.z + 120);
      }
      if (this.citySunLight) {
        this.citySunLight.position.set(targetPos.x + 80, 180, targetPos.z + 60);
        this.citySunLight.target.position.copy(targetPos);
      }
    }

    _calculateNearestRouteProgressForStudent() {
      if (!this.arena || !this.arena.studentMesh) return;
      const sx = this.arena.studentMesh.position.x;
      const sz = this.arena.studentMesh.position.z;

      let closestIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < this.routePoints.length; i++) {
        const d = Math.hypot(this.routePoints[i].x - sx, this.routePoints[i].z - sz);
        if (d < minDist) {
          minDist = d;
          closestIdx = i;
        }
      }
      this.autoProgress = closestIdx / (this.routePoints.length - 1);
    }

    // ------------------------------------------------------------
    // 14. MINI-RADAR GTA VICE CITY & LA BÀN BẮC (CANVAS 2D)
    // ------------------------------------------------------------
    buildViceCityRadarMinimap() {
      const btnWalk = document.getElementById('btn-radar-walk');
      if (btnWalk) {
        btnWalk.addEventListener('click', () => {
          this.toggleMount();
        });
      }

      const btnCam = document.getElementById('btn-radar-cam');
      if (btnCam) {
        btnCam.addEventListener('click', () => {
          this.cycleCameraMode();
        });
      }

      // Nút Toàn cảnh / Cận cảnh trên Radar
      const btnZoom = document.getElementById('btn-radar-zoom');
      if (btnZoom) {
        btnZoom.addEventListener('click', (e) => {
          e.stopPropagation();
          this.radarZoomMode = this.radarZoomMode === 'overview' ? 'follow' : 'overview';
          btnZoom.textContent = this.radarZoomMode === 'overview' ? '🔍 Toàn tuyến' : '🔍 Cận cảnh';
        });
      }

      // Nút Cố định hướng Bắc / Xoay theo xe
      const btnOrient = document.getElementById('btn-radar-orient');
      if (btnOrient) {
        btnOrient.addEventListener('click', (e) => {
          e.stopPropagation();
          this.radarNorthUp = !this.radarNorthUp;
          btnOrient.textContent = this.radarNorthUp ? '🧭 Bắc ⬆' : '🔄 Xoay';
        });
      }

      // Nút mở Bản đồ to và click vào khung radar
      const btnFullMap = document.getElementById('btn-radar-fullmap');
      if (btnFullMap) {
        btnFullMap.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openGoogleMapsFullscreen();
        });
      }

      const radarFrame = document.getElementById('vice-city-radar-card-frame');
      if (radarFrame) {
        radarFrame.addEventListener('click', () => {
          this.openGoogleMapsFullscreen();
        });
      }

      // Nút mở Bản đồ trên thanh điều hướng góc trên bên trái
      const btnOpenMap = document.getElementById('btn-open-google-maps');
      if (btnOpenMap) {
        btnOpenMap.addEventListener('click', () => {
          this.openGoogleMapsFullscreen();
        });
      }

      // Các nút Dịch chuyển Nhanh (Fast-Travel Pills)
      document.querySelectorAll('#gmaps-fast-travel-bar .gmaps-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tp = btn.getAttribute('data-tp');
          const idx = isNaN(Number(tp)) ? tp : Number(tp);
          this.teleportToWaypoint(idx);
        });
      });
    }

    updateRadarMinimap() {
      const canvas = document.getElementById('vice-city-radar-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width || 220;
      const h = canvas.height || 180;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // 1. Bo tròn khung bản đồ Google Maps
      ctx.save();
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(0, 0, w, h, 14);
        ctx.clip();
      }

      // 2. Nền đất Google Maps tiêu chuẩn (#f1f3f4)
      ctx.fillStyle = '#f1f3f4';
      ctx.fillRect(0, 0, w, h);

      // Tọa độ người chơi hiện tại (bảo vệ chống NaN)
      const playerPos = this.isMounted
        ? this.bikeMesh.position
        : (this.arena && this.arena.studentMesh ? this.arena.studentMesh.position : this.bikeMesh.position);

      const px = isFinite(playerPos.x) ? playerPos.x : 0;
      const pz = isFinite(playerPos.z) ? playerPos.z : 58.5;

      // Góc xoay của bản đồ: nếu radarNorthUp = true -> 0 rad (Cố định hướng Bắc chuẩn Google Maps!)
      const currentCamYaw = isFinite(this.cameraYawOffset) ? this.cameraYawOffset : -Math.PI / 2;
      const mapYaw = this.radarNorthUp ? 0 : currentCamYaw;

      // Tiêu cự bản đồ:
      // Overview (Toàn tuyến): nghiêng về trọng tâm tuyến đường (-460, -170) để hiển thị đầy đủ Trường, Hồ, Bùng binh & Nhà Vũ Dậu
      // Follow (Cận cảnh): bám sát vị trí hiện tại
      const isOverview = this.radarZoomMode === 'overview';
      const focusX = isOverview ? (px * 0.35 + (-460) * 0.65) : px;
      const focusZ = isOverview ? (pz * 0.35 + (-170) * 0.65) : pz;
      const mapScale = isOverview ? 0.20 : 0.52;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-mapYaw);

      // ==========================================================
      // 3. VẼ CẢNH QUAN HỒ NƯỚC & CÔNG VIÊN CHUẨN GOOGLE MAPS VĨNH YÊN
      // ==========================================================

      const toRadX = (wx) => (wx - focusX) * mapScale;
      const toRadZ = (wz) => (wz - focusZ) * mapScale;

      // ==========================================================
      // 3. VẼ CẢNH QUAN HỒ NƯỚC & CÔNG VIÊN CHUẨN GOOGLE MAPS VĨNH YÊN
      // ==========================================================

      // A. HỒ TRẠI ỔI (Phía Bắc Bùng Binh Ngô Quyền - Kẹp giữa Kim Ngọc & Hà Huy Tập)
      const toX = toRadX(-290.0);
      const toZ = toRadZ(-325.0);
      ctx.fillStyle = '#a5c9eb';
      ctx.strokeStyle = '#80b4e2';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(toX, toZ, 58 * mapScale, 30 * mapScale, -Math.PI / 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Nhãn Hồ Trại Ổi
      ctx.fillStyle = '#1a73e8';
      ctx.font = 'bold 8.5px "Nunito", Arial, sans-serif';
      ctx.textAlign = 'center';
      if (isOverview || Math.hypot(toX, toZ) < 130) {
        ctx.fillText('🌊 Hồ Trại Ổi', toX, toZ);
      }

      // B. HỒ TỈNH UỶ & ĐẦM VẠC (Phía Nam Tuyến Đường - Gần Hùng Vương & Ngô Quyền)
      const tuX = toRadX(-475.0);
      const tuZ = toRadZ(-95.0);
      ctx.fillStyle = '#a5c9eb';
      ctx.strokeStyle = '#80b4e2';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(tuX, tuZ, 92 * mapScale, 56 * mapScale, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Nhãn Hồ Tỉnh Uỷ
      if (isOverview || Math.hypot(tuX, tuZ) < 135) {
        ctx.fillStyle = '#1a73e8';
        ctx.fillText('🌊 Hồ Tỉnh Uỷ', tuX, tuZ - 6);
        ctx.fillStyle = '#5c93c4';
        ctx.font = '7.5px "Nunito", Arial, sans-serif';
        ctx.fillText('Đầm Vạc', tuX, tuZ + 8);
      }

      // C. VƯỜN HOA UB THÀNH PHỐ (Bắc Đại Lộ Hùng Vương - Công viên bầu dục lớn)
      const vhX = toRadX(-545.0);
      const vhZ = toRadZ(-298.0);
      ctx.fillStyle = '#ceead6';
      ctx.strokeStyle = '#a8dab5';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(vhX, vhZ, 66 * mapScale, 26 * mapScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Vòng tròn dạo bộ bên trong công viên
      ctx.strokeStyle = '#bfe5ca';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.ellipse(vhX, vhZ, 42 * mapScale, 15 * mapScale, 0, 0, Math.PI * 2);
      ctx.stroke();

      if (isOverview || Math.hypot(vhX, vhZ) < 130) {
        ctx.fillStyle = '#137333';
        ctx.font = 'bold 8px "Nunito", Arial, sans-serif';
        ctx.fillText('🌳 Vườn hoa UB TP', vhX, vhZ);
      }

      // D. CÔNG VIÊN ĐỒI CAO (Nam Bùng Binh Ngô Quyền)
      const dcX = toRadX(-365.0);
      const dcZ = toRadZ(-150.0);
      ctx.fillStyle = '#ceead6';
      ctx.strokeStyle = '#a8dab5';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(dcX, dcZ, 22 * mapScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      if (isOverview || Math.hypot(dcX, dcZ) < 120) {
        ctx.fillStyle = '#137333';
        ctx.font = '7.5px "Nunito", Arial, sans-serif';
        ctx.fillText('🌲 CV Đồi Cao', dcX, dcZ);
      }

      // E. Khuôn viên Trường Tiểu học Ngô Quyền (Google Maps Park Green #ceead6)
      const scMapX = toRadX(0.0);
      const scMapZ = toRadZ(28.0);
      ctx.fillStyle = '#ceead6';
      ctx.strokeStyle = '#a8dab5';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.rect(scMapX - 25 * mapScale, scMapZ - 24 * mapScale, 50 * mapScale, 48 * mapScale);
      ctx.fill();
      ctx.stroke();
      if (isOverview || Math.hypot(scMapX, scMapZ) < 120) {
        ctx.fillStyle = '#137333';
        ctx.font = 'bold 8.5px "Nunito", Arial, sans-serif';
        ctx.fillText('🏫 TH Ngô Quyền', scMapX, scMapZ);
      }

      // F. Khuôn viên Nhà Bé - Vườn Cây Cảnh Vũ Dậu (#c8e6c9)
      const hmMapX = toRadX(-930.9);
      const hmMapZ = toRadZ(-319.4);
      ctx.fillStyle = '#c8e6c9';
      ctx.strokeStyle = '#a5d6a7';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.rect(hmMapX - 20 * mapScale, hmMapZ - 16 * mapScale, 40 * mapScale, 32 * mapScale);
      ctx.fill();
      ctx.stroke();
      if (isOverview || Math.hypot(hmMapX, hmMapZ) < 130) {
        ctx.fillStyle = '#137333';
        ctx.font = 'bold 8px "Nunito", Arial, sans-serif';
        ctx.fillText('🏡 Cây Cảnh Vũ Dậu', hmMapX, hmMapZ);
      }

      // ==========================================================
      // 4. MẠNG LƯỚI ĐƯỜNG PHỐ CHUẨN GOOGLE MAPS (2-PASS: CASING & NỘI TỰ)
      // ==========================================================

      // PASS 1: ĐƯỜNG PHỤ CASING XÁM (#dadce0) & ĐẠI LỘ CHÍNH CASING VÀNG (#fbbc04)
      ctx.strokeStyle = '#dadce0';
      ctx.lineWidth = 9;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(toRadX(-115.0), toRadZ(18.0));
      ctx.lineTo(toRadX(-305.0), toRadZ(-165.0));
      ctx.stroke();

      // Phố Hà Huy Tập (Chạy ven Hồ Trại Ổi phía Bắc)
      ctx.beginPath();
      ctx.moveTo(toRadX(-245.0), toRadZ(-345.0));
      ctx.lineTo(toRadX(-340.0), toRadZ(-260.0));
      ctx.stroke();

      // Đường Điện Biên Phủ (Hướng Nam từ Hùng Vương)
      ctx.beginPath();
      ctx.moveTo(toRadX(-745.0), toRadZ(-248.0));
      ctx.lineTo(toRadX(-745.0), toRadZ(-135.0));
      ctx.stroke();

      // Tuyến đường chính: Trần Quốc Tuấn & Ngô Quyền Casing (#dadce0)
      ctx.lineWidth = 14;
      ctx.beginPath();
      for (let i = 0; i <= 15 && i < this.routePoints.length; i++) {
        const pt = this.routePoints[i];
        if (i === 0) ctx.moveTo(toRadX(pt.x), toRadZ(pt.z));
        else ctx.lineTo(toRadX(pt.x), toRadZ(pt.z));
      }
      ctx.stroke();

      // Đại Lộ Hùng Vương Casing Vàng Google Maps (#fbbc04)
      ctx.strokeStyle = '#fbbc04';
      ctx.lineWidth = 16;
      ctx.beginPath();
      for (let i = 15; i <= 34 && i < this.routePoints.length; i++) {
        const pt = this.routePoints[i];
        if (i === 15) ctx.moveTo(toRadX(pt.x), toRadZ(pt.z));
        else ctx.lineTo(toRadX(pt.x), toRadZ(pt.z));
      }
      ctx.stroke();

      // Đường Kim Ngọc Casing Vàng qua Bùng Binh
      ctx.beginPath();
      ctx.moveTo(toRadX(-220.0), toRadZ(-310.0));
      ctx.lineTo(toRadX(-440.0), toRadZ(-105.0));
      ctx.stroke();

      // Vòng xuyến Bùng Binh Ngô Quyền Casing
      const bbX = toRadX(-336.0);
      const bbZ = toRadZ(-212.0);
      ctx.beginPath();
      ctx.arc(bbX, bbZ, 19 * mapScale, 0, Math.PI * 2);
      ctx.stroke();

      // Phố Lê Lợi & Ngõ vào Cây Cảnh Vũ Dậu Casing
      ctx.strokeStyle = '#dadce0';
      ctx.lineWidth = 11;
      ctx.beginPath();
      for (let i = 34; i < this.routePoints.length; i++) {
        const pt = this.routePoints[i];
        if (i === 34) ctx.moveTo(toRadX(pt.x), toRadZ(pt.z));
        else ctx.lineTo(toRadX(pt.x), toRadZ(pt.z));
      }
      ctx.stroke();

      // PASS 2: LÒNG ĐƯỜNG TRẮNG TINH GOOGLE MAPS (#ffffff)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(toRadX(-115.0), toRadZ(18.0));
      ctx.lineTo(toRadX(-305.0), toRadZ(-165.0));
      ctx.moveTo(toRadX(-245.0), toRadZ(-165.0));
      ctx.lineTo(toRadX(-345.0), toRadZ(-75.0));
      ctx.moveTo(toRadX(-745.0), toRadZ(-248.0));
      ctx.lineTo(toRadX(-745.0), toRadZ(-135.0));
      ctx.stroke();

      // Đường chính toàn tuyến trắng tinh
      ctx.lineWidth = 10;
      ctx.beginPath();
      for (let i = 0; i < this.routePoints.length; i++) {
        const pt = this.routePoints[i];
        if (i === 0) ctx.moveTo(toRadX(pt.x), toRadZ(pt.z));
        else ctx.lineTo(toRadX(pt.x), toRadZ(pt.z));
      }
      ctx.stroke();

      // Lòng đường Kim Ngọc
      ctx.lineWidth = 11;
      ctx.beginPath();
      ctx.moveTo(toRadX(-220.0), toRadZ(-310.0));
      ctx.lineTo(toRadX(-440.0), toRadZ(-105.0));
      ctx.stroke();

      // Lòng vòng xuyến
      ctx.lineWidth = 11;
      ctx.beginPath();
      ctx.arc(bbX, bbZ, 19 * mapScale, 0, Math.PI * 2);
      ctx.stroke();

      // Đảo xanh trung tâm bùng binh
      ctx.fillStyle = '#ceead6';
      ctx.beginPath();
      ctx.arc(bbX, bbZ, 9 * mapScale, 0, Math.PI * 2);
      ctx.fill();

      // ==========================================================
      // 5. TUYẾN ĐƯỜNG GPS CHỈ ĐƯỜNG ĐỎ RỰC RỠ CHUẨN GOOGLE MAPS (#ea4335)
      // ==========================================================
      if (this.routePoints && this.routePoints.length) {
        // Viền bóng tương phản trắng
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 6.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        for (let i = 0; i < this.routePoints.length; i++) {
          const pt = this.routePoints[i];
          if (i === 0) ctx.moveTo(toRadX(pt.x), toRadZ(pt.z));
          else ctx.lineTo(toRadX(pt.x), toRadZ(pt.z));
        }
        ctx.stroke();

        // Vạch đỏ Google Maps GPS đặc trưng (#ea4335)
        ctx.strokeStyle = '#ea4335';
        ctx.lineWidth = 4.4;
        ctx.beginPath();
        for (let i = 0; i < this.routePoints.length; i++) {
          const pt = this.routePoints[i];
          if (i === 0) ctx.moveTo(toRadX(pt.x), toRadZ(pt.z));
          else ctx.lineTo(toRadX(pt.x), toRadZ(pt.z));
        }
        ctx.stroke();

        // Mũi tên chỉ hướng di chuyển dọc tuyến đường đỏ
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < this.routePoints.length - 1; i += 2) {
          const p1 = this.routePoints[i];
          const p2 = this.routePoints[i + 1];
          const segX = (p1.x + p2.x) / 2;
          const segZ = (p1.z + p2.z) / 2;
          const mx = toRadX(segX);
          const mz = toRadZ(segZ);
          ctx.beginPath();
          ctx.arc(mx, mz, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ==========================================================
      // 6. TÊN ĐƯỜNG PHỐ CHUẨN GOOGLE MAPS
      // ==========================================================
      ctx.fillStyle = '#5f6368';
      ctx.font = 'bold 8px "Nunito", Arial, sans-serif';
      ctx.textAlign = 'center';

      const tqtX = toRadX(-55.0);
      const tqtZ = toRadZ(58.0);
      if (isOverview || Math.hypot(tqtX, tqtZ) < 120) {
        ctx.fillText('Đ. Trần Quốc Tuấn', tqtX, tqtZ - 8);
      }

      const nqX = toRadX(-210.0);
      const nqZ = toRadZ(-40.0);
      if (isOverview || Math.hypot(nqX, nqZ) < 120) {
        ctx.fillText('Đ. Ngô Quyền', nqX, nqZ - 8);
      }

      const knLabelX = toRadX(-280.0);
      const knLabelZ = toRadZ(-250.0);
      if (isOverview || Math.hypot(knLabelX, knLabelZ) < 120) {
        ctx.fillText('Đ. Kim Ngọc', knLabelX, knLabelZ - 8);
      }

      const hvX = toRadX(-550.0);
      const hvZ = toRadZ(-245.0);
      if (isOverview || Math.hypot(hvX, hvZ) < 120) {
        ctx.fillText('Hùng Vương', hvX, hvZ - 9);
      }

      const llX = toRadX(-840.0);
      const llZ = toRadZ(-295.0);
      if (isOverview || Math.hypot(llX, llZ) < 120) {
        ctx.fillText('Đ. Lê Lợi', llX, llZ - 8);
      }

      // ==========================================================
      // 7. GOOGLE MAPS POI PINS & BADGES
      // ==========================================================
      const hmPinX = toRadX(-930.9);
      const hmPinZ = toRadZ(-319.4);
      ctx.fillStyle = '#ea4335';
      ctx.beginPath();
      ctx.arc(hmPinX, hmPinZ, 5.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.fillStyle = '#ea4335';
      ctx.font = '900 8.5px "Nunito", Arial, sans-serif';
      ctx.fillText('📍 Cây cảnh VŨ DẬU', hmPinX + 2, hmPinZ - 9);

      const scPinX = toRadX(3.2);
      const scPinZ = toRadZ(58.0);
      ctx.fillStyle = '#1a73e8';
      ctx.beginPath();
      ctx.arc(scPinX, scPinZ, 5.0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      if (isOverview || Math.hypot(scPinX, scPinZ) < 120) {
        ctx.fillStyle = '#1a73e8';
        ctx.font = 'bold 8px "Nunito", Arial, sans-serif';
        ctx.fillText('🏫 Tiểu học Ngô Quyền', scPinX, scPinZ + 12);
      }

      const lbX = toRadX(-218.0);
      const lbZ = toRadZ(-78.0);
      if (isOverview || Math.hypot(lbX, lbZ) < 120) {
        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        ctx.arc(lbX, lbZ, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 7.5px "Nunito", Arial, sans-serif';
        ctx.fillText('☕ La Baker', lbX, lbZ - 6);
      }

      const hyX = toRadX(-820.0);
      const hyZ = toRadZ(-282.0);
      if (isOverview || Math.hypot(hyX, hyZ) < 120) {
        ctx.fillStyle = '#c2410c';
        ctx.beginPath();
        ctx.arc(hyX, hyZ, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 7.5px "Nunito", Arial, sans-serif';
        ctx.fillText('🥐 Hưng Yên BAKERY', hyX, hyZ - 6);
      }

      const poX = toRadX(-310.0);
      const poZ = toRadZ(-248.0);
      if (isOverview || Math.hypot(poX, poZ) < 120) {
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(poX, poZ, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0369a1';
        ctx.font = '7.5px "Nunito", Arial, sans-serif';
        ctx.fillText('📮 Bưu Điện VP', poX, poZ - 6);
      }

      // Xe cộ AI chấm cam
      if (this.trafficVehicles && this.trafficVehicles.length) {
        ctx.fillStyle = '#f59e0b';
        this.trafficVehicles.forEach(veh => {
          const vx = toRadX(veh.group.position.x);
          const vz = toRadZ(veh.group.position.z);
          if (Math.hypot(vx, vz) < 95) {
            ctx.beginPath();
            ctx.arc(vx, vz, 2.6, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      // ==========================================================
      // 8. VẼ ĐIỂM ĐỊNH VỊ NGƯỜI CHƠI CHUẨN GOOGLE MAPS NAVIGATION PUCK
      // ==========================================================
      const playerMapX = toRadX(px);
      const playerMapZ = toRadZ(pz);

      ctx.save();
      ctx.translate(playerMapX, playerMapZ);
      const playerHeading = this.isMounted
        ? this.bikeHeading
        : (this.arena && this.arena.studentMesh ? this.arena.studentMesh.rotation.y : 0);
      const puckAngle = (isFinite(playerHeading) ? playerHeading : 0) - Math.PI / 2;
      ctx.rotate(puckAngle);

      ctx.fillStyle = 'rgba(66, 133, 244, 0.28)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 32, -Math.PI / 2 - 0.45, -Math.PI / 2 + 0.45);
      ctx.closePath();
      ctx.fill();

      const pulseR = 8.5 + Math.sin(Date.now() * 0.005) * 1.5;
      ctx.fillStyle = 'rgba(26, 115, 232, 0.22)';
      ctx.beginPath();
      ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1a73e8';
      ctx.beginPath();
      ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(0, -5.0);
      ctx.lineTo(2.2, -1.2);
      ctx.lineTo(-2.2, -1.2);
      ctx.closePath();
      ctx.fill();

      ctx.restore(); // restore player transform

      ctx.restore(); // restore map transform
      ctx.restore(); // restore clip

      // ==========================================================
      // 9. CẬP NHẬT KIM LA BÀN HƯỚNG BẮC (N)
      // ==========================================================
      const northEl = document.getElementById('vc-radar-north');
      if (northEl) {
        northEl.style.transform = `rotate(${-mapYaw}rad)`;
      }

      // ==========================================================
      // 10. CẬP NHẬT CHỈ ĐƯỜNG ĐIỀU HƯỚNG GOOGLE MAPS LIVE THEO THỜI GIAN THỰC
      // ==========================================================
      const badgeEl = document.getElementById('vc-radar-street-badge');
      const distEl = document.getElementById('gmaps-nav-dist');
      const topBannerEl = document.getElementById('gmaps-top-instruction');

      let instruction = '⬆ Đ. TRẦN QUỐC TUẤN';
      let fullInstruction = 'Đi về hướng Tây trên Đ. Trần Quốc Tuấn';
      let nextStep = 'Tiếp tục 130m rẽ vào Đ. Ngô Quyền';
      let remDist = Math.max(0.05, ((1.0 - (this.autoProgress || 0)) * 1.19));

      if (this.autoProgress > 0.08 && this.autoProgress <= 0.38) {
        instruction = '↖ Đ. NGÔ QUYỀN';
        fullInstruction = 'Rẽ trái vào Đường Ngô Quyền';
        nextStep = 'Tiếp tục 310m đến Bùng Binh Ngô Quyền';
      } else if (this.autoProgress > 0.38 && this.autoProgress <= 0.46) {
        instruction = '🔄 BÙNG BINH KIM NGỌC';
        fullInstruction = 'Vào Vòng Xuyến Ngô Quyền - Kim Ngọc (Hồ Trại Ổi phía Bắc)';
        nextStep = 'Lấy lối ra thứ 2 vào Đại Lộ Hùng Vương';
      } else if (this.autoProgress > 0.46 && this.autoProgress <= 0.85) {
        instruction = '⬆ ĐẠI LỘ HÙNG VƯƠNG';
        fullInstruction = 'Đi thẳng trên Đại Lộ Hùng Vương (Qua Vườn hoa UB TP)';
        nextStep = 'Chuẩn bị rẽ phải tại tiệm Hưng Yên Bakery';
      } else if (this.autoProgress > 0.85 && this.autoProgress < 0.98) {
        instruction = '↗ Đ. LÊ LỢI (HƯNG YÊN BAKERY)';
        fullInstruction = 'Rẽ phải vào Phố Lê Lợi / Ngõ Dân Sinh';
        nextStep = 'Đi thêm 120m đến Vườn Cây Cảnh Vũ Dậu';
      } else if (this.autoProgress >= 0.98) {
        instruction = '📍 CÂY CẢNH VŨ DẬU';
        fullInstruction = 'Đã đến đích: Vườn Cây Cảnh Vũ Dậu - Nhà Bé Hà My!';
        nextStep = 'Bé Hà My đã về nhà an toàn!';
      }

      if (badgeEl) badgeEl.textContent = instruction;
      if (distEl) distEl.textContent = remDist.toFixed(2) + ' km';
      if (topBannerEl) {
        topBannerEl.innerHTML = `
          <span style="font-size: 0.95rem; font-weight: 900; color: #fef08a;">${instruction.split(' ')[0]}</span>
          <span style="font-weight: 900; color: #ffffff;">${instruction.substring(instruction.indexOf(' ') + 1)}</span>
          <span style="opacity: 0.75; font-size: 0.75rem; color: #93c5fd;">•</span>
          <span style="color: #e0f2fe; font-size: 0.76rem; font-weight: 700;">${nextStep}</span>
          <span style="background: rgba(254,240,138,0.25); color: #fef08a; padding: 1px 7px; border-radius: 999px; font-size: 0.74rem; font-weight: 800;">Còn ${remDist.toFixed(2)} km</span>
        `;
      }
    }

    // ------------------------------------------------------------
    // 15. TƯƠNG TÁC ĐỜI SỐNG VỈA HÈ & CHUỘT XOAY 360° (MOUSE ORBIT)
    // ------------------------------------------------------------
    setupMouseOrbitControls() {
      let isDragging = false;
      let lastX = 0, lastY = 0;

      window.addEventListener('contextmenu', (e) => {
        if (this.isCityMode) e.preventDefault();
      });

      const onStart = (clientX, clientY, target) => {
        if (!this.isCityMode) return;
        if (target && target.closest && target.closest('button, input, select, #mobile-touch-hud')) return;
        isDragging = true;
        lastX = clientX;
        lastY = clientY;
      };

      const onMove = (clientX, clientY) => {
        if (!isDragging || !this.isCityMode) return;
        const dx = clientX - lastX;
        const dy = clientY - lastY;
        lastX = clientX;
        lastY = clientY;

        this.cameraYawOffset = (this.cameraYawOffset || 0) - dx * 0.0055;
        this.cameraPitchOffset = Math.max(-0.65, Math.min(1.10, (this.cameraPitchOffset || 0) + dy * 0.0055));
      };

      const onEnd = () => {
        isDragging = false;
      };

      window.addEventListener('mousedown', (e) => {
        onStart(e.clientX, e.clientY, e.target);
      });

      window.addEventListener('mousemove', (e) => {
        onMove(e.clientX, e.clientY);
      });

      window.addEventListener('mouseup', onEnd);

      // Cảm ứng vuốt xoay Camera 3D trên màn hình iPhone / iPad
      window.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          onStart(e.touches[0].clientX, e.touches[0].clientY, e.target);
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
          onMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      window.addEventListener('touchend', onEnd);

      window.addEventListener('wheel', (e) => {
        if (!this.isCityMode) return;
        if (e.target.closest('#vice-city-radar-container, #vision-bike-hud')) return;
        this.cameraDistOffset = Math.max(-2.5, Math.min(8.0, (this.cameraDistOffset || 0) + e.deltaY * 0.005));
      }, { passive: true });
    }

    setupInteractionListeners() {
      // 1. Lắng nghe phím nhấn xuống (keydown)
      window.addEventListener('keydown', (e) => {
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
        if (!this.isCityMode) return; // Đang trong trường: 100% phím bấm do three_arena & game xử lý, không được bật xe máy!

        const code = e.code;
        const key = (e.key || '').toLowerCase();

        // Cập nhật trạng thái phím di chuyển CityKeys (bắt cả Telex / Unikey biến thể)
        if (code === 'KeyW' || key === 'w' || key === 'ư' || code === 'ArrowUp') this.cityKeys.forward = true;
        if (code === 'KeyS' || key === 's' || code === 'ArrowDown') this.cityKeys.backward = true;
        if (code === 'KeyA' || key === 'a' || key === 'â' || key === 'ă' || code === 'ArrowLeft') this.cityKeys.left = true;
        if (code === 'KeyD' || key === 'd' || key === 'đ' || code === 'ArrowRight') this.cityKeys.right = true;
        if (code === 'ShiftLeft' || code === 'ShiftRight' || key === 'shift') this.cityKeys.shift = true;

        // Phím F: Lên / Xuống xe Honda Vision (CHỈ khi đang ở ngoài phố City Mode)
        if (code === 'KeyF' || key === 'f') {
          if (this.isMounted) {
            this.toggleMount();
            return;
          }
          if (this.arena && this.arena.studentMesh && this.bikeMesh) {
            const sPos = this.arena.studentMesh.position;
            const bPos = this.bikeMesh.position;
            const dist = Math.hypot(sPos.x - bPos.x, sPos.z - bPos.z);
            if (dist <= 3.5) {
              this.mountBike();
              this.showComicDialogue('🛵', 'BA CHỞ HÀ MY', 'Nào lên xe con gái ơi, ôm chặt eo Ba để Ba vít ga dạo phố Vĩnh Yên về nhà nhé!');
              return;
            }
          }
        }

        // Phím E: Tương tác quán xá, NPC lân cận
        if (code === 'KeyE' || key === 'e') {
          this.interactNearby();
        }

        // Phím C: Đổi góc nhìn Camera 3D
        if (code === 'KeyC' || key === 'c') {
          this.cycleCameraMode();
        }

        // Phím V: Đổi góc nhìn Camera 3D (Đuổi theo / Góc nhìn thứ nhất / Toàn cảnh)
        if (code === 'KeyV' || key === 'v') {
          this.cycleCameraMode();
        }

        // Phím H: Bấm còi Bim Bim
        if (code === 'KeyH' || key === 'h') {
          this.playHornSound();
        }

        // Phím M: Bật / Tắt Bản đồ Google Maps Toàn Màn Hình
        if (code === 'KeyM' || key === 'm') {
          this.toggleGoogleMapsFullscreen();
        }

        // Phím Escape: Đóng Bản đồ nếu đang mở, hoặc Quay lại trường học
        if (code === 'Escape') {
          if (this.isGoogleMapsOpen) {
            this.closeGoogleMapsFullscreen();
            return;
          }
          this.deactivateCityMode();
        }

        // Phím Space: Phanh gấp khi đang lái xe Vision, hoặc Nhảy cao khi đang Đi bộ
        if (code === 'Space' || key === ' ') {
          e.preventDefault();
          if (this.isMounted) {
            this.bikeSpeed = Math.max(0, this.bikeSpeed - this.bikeBrake * 2.2);
          } else {
            this.triggerWalkingJump();
          }
        }
      });

      // 2. Lắng nghe phím nhả ra (keyup)
      window.addEventListener('keyup', (e) => {
        const code = e.code;
        const key = (e.key || '').toLowerCase();

        if (code === 'KeyW' || key === 'w' || key === 'ư' || code === 'ArrowUp') this.cityKeys.forward = false;
        if (code === 'KeyS' || key === 's' || code === 'ArrowDown') this.cityKeys.backward = false;
        if (code === 'KeyA' || key === 'a' || key === 'â' || key === 'ă' || code === 'ArrowLeft') this.cityKeys.left = false;
        if (code === 'KeyD' || key === 'd' || key === 'đ' || code === 'ArrowRight') this.cityKeys.right = false;
        if (code === 'ShiftLeft' || code === 'ShiftRight' || key === 'shift') this.cityKeys.shift = false;
      });

      // 3. Reset phím khi blur cửa sổ tránh kẹt phím
      window.addEventListener('blur', () => {
        this.cityKeys.forward = false;
        this.cityKeys.backward = false;
        this.cityKeys.left = false;
        this.cityKeys.right = false;
        this.cityKeys.shift = false;
      });
    }

    checkNearbyInteractions() {
      const playerPos = this.isMounted
        ? this.bikeMesh.position
        : (this.arena && this.arena.studentMesh ? this.arena.studentMesh.position : this.bikeMesh.position);

      const dPho = Math.hypot(playerPos.x - (-2.0), playerPos.z - 69.5);
      const dTea = Math.hypot(playerPos.x - (-20.0), playerPos.z - 69.0);
      const dIce = Math.hypot(playerPos.x - 6.0, playerPos.z - 52.5);

      let promptMsg = null;
      if (dPho < 3.8) {
        promptMsg = '🍜 Bấm [E] để Húp Bát Phở Bò Bát Đàn bốc khói!';
      } else if (dTea < 3.8) {
        promptMsg = '☕ Bấm [E] để Ngồi Uống Trà Đá & Ăn Kẹo Lạc!';
      } else if (dIce < 3.8) {
        promptMsg = '🍦 Bấm [E] để Thưởng Thức Kem Merino Mát Lạnh!';
      }

      let toastEl = document.getElementById('street-prop-prompt');
      if (promptMsg) {
        if (!toastEl) {
          toastEl = document.createElement('div');
          toastEl.id = 'street-prop-prompt';
          toastEl.className = 'street-interaction-prompt';
          document.body.appendChild(toastEl);
        }
        toastEl.textContent = promptMsg;
        toastEl.style.display = 'flex';
      } else if (toastEl) {
        toastEl.style.display = 'none';
      }
    }

    interactNearby() {
      const playerPos = this.isMounted
        ? this.bikeMesh.position
        : (this.arena && this.arena.studentMesh ? this.arena.studentMesh.position : this.bikeMesh.position);

      // 1. Quán Phở
      const distPho = Math.hypot(playerPos.x - (-2.0), playerPos.z - 69.5);
      if (distPho < 4.2) {
        this.showComicDialogue('🍜', 'QUÁN PHỞ BÒ HÀ NỘI', 'Ực... Bát phở bò tái nạm bốc khói thơm lừng! Bé Hà My và Ba đã ăn no căng bụng, hồi phục 100% thể lực!');
        return;
      }

      // 2. Quán Trà Đá
      const distTea = Math.hypot(playerPos.x - (-20.0), playerPos.z - 69.0);
      if (distTea < 4.2) {
        this.showComicDialogue('☕', 'QUÁN TRÀ ĐÁ VỈA HÈ', 'Khà... Chén trà xanh nóng hổi kèm thanh kẹo lạc giòn rụm! Ngồi ngắm phố Trần Quốc Tuấn thật thư thái!');
        return;
      }

      // 3. Xe Kem Merino
      const distIce = Math.hypot(playerPos.x - 6.0, playerPos.z - 52.5);
      if (distIce < 4.2) {
        this.showComicDialogue('🍦', 'XE KEM MERINO', 'Kem Merino mát lạnh sảng khoái! Thưởng thức một que kem dâu tây ngọt ngào sau giờ học!');
        return;
      }

      // 4. Nếu gần bất kỳ NPC nào
      if (this.activeNearbyNPC) {
        this.showComicDialogue(this.activeNearbyNPC.avatar, this.activeNearbyNPC.name, this.activeNearbyNPC.dialogue);
      }
    }

    showToastNotification(text) {
      if (typeof this.showComicDialogue === 'function') {
        this.showComicDialogue('📍', 'THÀNH PHỐ VĨNH YÊN', text);
      }
    }

    showComicDialogue(avatar, name, text) {
      const toast = document.getElementById('npc-speech-toast');
      const avEl = document.getElementById('npc-toast-avatar');
      const nameEl = document.getElementById('npc-toast-name');
      const textEl = document.getElementById('npc-toast-text');
      if (!toast || !avEl || !nameEl || !textEl) return;

      avEl.textContent = avatar;
      nameEl.textContent = name;
      textEl.textContent = `"${text}"`;
      toast.style.display = 'flex';

      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        toast.style.display = 'none';
      }, 5500);
    }

    updatePedestrians(time, dt) {
      if (!this.npcs || !this.npcs.length) return;
      const playerPos = this.isMounted
        ? this.bikeMesh.position
        : (this.arena && this.arena.studentMesh ? this.arena.studentMesh.position : this.bikeMesh.position);

      let nearestNPC = null;
      let minDist = Infinity;

      this.npcs.forEach(npc => {
        // Tuần tra
        if (npc.isPatrol) {
          npc.currentOffset += npc.patrolDir * npc.speed * dt;
          if (Math.abs(npc.currentOffset) > npc.patrolRange / 2) {
            npc.patrolDir *= -1;
            npc.group.rotation.y += Math.PI;
          }

          if (npc.patrolAxis === 'x') {
            npc.group.position.x = npc.basePos.x + npc.currentOffset;
          } else {
            npc.group.position.z = npc.basePos.z + npc.currentOffset;
          }

          const walkFreq = time * 7.5;
          npc.legL.rotation.x = Math.sin(walkFreq) * 0.55;
          npc.legR.rotation.x = -Math.sin(walkFreq) * 0.55;
          npc.armL.rotation.x = -Math.sin(walkFreq) * 0.45;
          npc.armR.rotation.x = Math.sin(walkFreq) * 0.45;
          npc.group.position.y = Math.abs(Math.sin(walkFreq)) * 0.05;
        } else if (npc.isSitting) {
          if (npc.propFan) {
            npc.armR.rotation.z = Math.sin(time * 3.5) * 0.35 - 0.2;
          }
          npc.headGroup.position.y = (npc.isSitting ? 0.38 : 0.58) + 0.44 + Math.sin(time * 2.0) * 0.015;
        }

        const dist = Math.hypot(npc.group.position.x - playerPos.x, npc.group.position.z - playerPos.z);
        if (dist < 3.8) {
          npc.headGroup.lookAt(playerPos.x, npc.headGroup.position.y + 0.5, playerPos.z);
          if (dist < minDist) {
            minDist = dist;
            nearestNPC = npc;
          }
        } else {
          npc.headGroup.rotation.set(0, 0, 0);
        }
      });

      this.activeNearbyNPC = nearestNPC;
      if (nearestNPC && minDist < 3.2 && !this._lastToastNPC) {
        this._lastToastNPC = nearestNPC.id;
        this.showComicDialogue(nearestNPC.avatar, nearestNPC.name, nearestNPC.dialogue);
      } else if (!nearestNPC) {
        this._lastToastNPC = null;
      }
    }

    updateTrafficVehicles(dt) {
      if (!this.trafficVehicles || !this.trafficVehicles.length || !this.routeCurve) return;
      const playerPos = this.isMounted
        ? this.bikeMesh.position
        : (this.arena && this.arena.studentMesh ? this.arena.studentMesh.position : this.bikeMesh.position);

      this.trafficVehicles.forEach(veh => {
        const distToPlayer = veh.group.position.distanceTo(playerPos);
        const shouldYield = distToPlayer < 6.5;

        const effectiveSpeed = shouldYield ? veh.speed * 0.15 : veh.speed;
        veh.progress = (veh.progress + effectiveSpeed) % 1.0;

        const posOnCurve = this.routeCurve.getPointAt(veh.progress);
        const tangent = this.routeCurve.getTangentAt(veh.progress).normalize();
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

        const actualPos = new THREE.Vector3().copy(posOnCurve).addScaledVector(normal, veh.laneOffset);
        veh.group.position.set(actualPos.x, 0.05, actualPos.z);

        const lookTarget = new THREE.Vector3().copy(actualPos).add(tangent);
        veh.group.lookAt(lookTarget.x, 0.05, lookTarget.z);

        if (veh.wheels && veh.wheels.length) {
          const wheelRot = (effectiveSpeed * 1200) * dt;
          veh.wheels.forEach(w => {
            w.rotation.x += wheelRot;
          });
        }
      });
    }

    _calculateNearestRouteProgress() {
      const bx = this.bikeMesh.position.x;
      const bz = this.bikeMesh.position.z;

      let closestIdx = 0;
      let minDist = Infinity;
      for (let i = 0; i < this.routePoints.length; i++) {
        const d = Math.hypot(this.routePoints[i].x - bx, this.routePoints[i].z - bz);
        if (d < minDist) {
          minDist = d;
          closestIdx = i;
        }
      }
      this.autoProgress = closestIdx / (this.routePoints.length - 1);
    }

    _updateHUD() {
      const spdEl = document.getElementById('v-speed-val');
      if (spdEl) spdEl.textContent = Math.round(Math.abs(this.bikeSpeed));

      const prog = Math.min(1, Math.max(0, this.autoProgress));
      const fillEl = document.getElementById('v-progress-fill');
      if (fillEl) fillEl.style.width = Math.round(prog * 100) + '%';

      const currentMeters = Math.round(prog * this.totalDistance);
      const distEl = document.getElementById('v-dist-text');
      if (distEl) distEl.textContent = `${currentMeters}m / 1,191m (${Math.round(prog * 100)}%)`;

      const ptIdx = Math.min(this.routePoints.length - 1, Math.floor(prog * this.routePoints.length));
      const currentStreet = this.routePoints[ptIdx] ? this.routePoints[ptIdx].street : 'Thành Phố Vĩnh Yên';
      const streetEl = document.getElementById('v-street-name');
      if (streetEl) streetEl.textContent = '📍 ' + currentStreet;
    }

    // ============================================================
    // 16. GOOGLE MAPS VĨNH YÊN FULLSCREEN & BẢN ĐỒ TƯƠNG TÁC CHUẨN XÁC 1:1
    // ============================================================
    setupFullscreenGoogleMaps() {
      const modal = document.getElementById('google-maps-fullscreen-modal');
      const btnClose = document.getElementById('btn-close-google-maps');
      const btnLayer = document.getElementById('btn-gmaps-layer-toggle');
      const btnCenter = document.getElementById('btn-gmaps-center-player');
      const btnZoomIn = document.getElementById('btn-gmaps-zoom-in');
      const btnZoomOut = document.getElementById('btn-gmaps-zoom-out');
      const canvas = document.getElementById('google-maps-full-canvas');

      if (btnClose) {
        btnClose.addEventListener('click', () => {
          this.closeGoogleMapsFullscreen();
        });
      }

      if (btnLayer) {
        btnLayer.addEventListener('click', () => {
          this.gmapsLayer = this.gmapsLayer === 'map' ? 'sat' : 'map';
          btnLayer.textContent = this.gmapsLayer === 'map' ? '🗺️ Lớp: Bản đồ giao thông' : '🛰️ Lớp: Ảnh chụp vệ tinh';
          this.renderFullscreenGoogleMaps();
        });
      }

      if (btnCenter) {
        btnCenter.addEventListener('click', () => {
          this.gmapsPanX = 0;
          this.gmapsPanY = 0;
          this.gmapsZoom = 1.0;
          this.renderFullscreenGoogleMaps();
        });
      }

      if (btnZoomIn) {
        btnZoomIn.addEventListener('click', () => {
          this.gmapsZoom = Math.min(3.8, this.gmapsZoom * 1.3);
          this.renderFullscreenGoogleMaps();
        });
      }

      if (btnZoomOut) {
        btnZoomOut.addEventListener('click', () => {
          this.gmapsZoom = Math.max(0.42, this.gmapsZoom / 1.3);
          this.renderFullscreenGoogleMaps();
        });
      }

      // Kéo rê chuột (Pan & Drag) trên bản đồ tương tác Google Maps
      if (canvas) {
        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;

        canvas.addEventListener('mousedown', (e) => {
          isDragging = true;
          dragStartX = e.clientX;
          dragStartY = e.clientY;
          canvas.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
          if (!this.isGoogleMapsOpen) return;
          if (isDragging) {
            const dx = e.clientX - dragStartX;
            const dy = e.clientY - dragStartY;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            this.gmapsPanX += dx;
            this.gmapsPanY += dy;
            this.renderFullscreenGoogleMaps();
          }
        });

        window.addEventListener('mouseup', () => {
          if (isDragging) {
            isDragging = false;
            if (canvas) canvas.style.cursor = 'grab';
          }
        });

        // Cuộn chuột phóng to thu nhỏ (Zoom In / Zoom Out)
        canvas.addEventListener('wheel', (e) => {
          e.preventDefault();
          const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
          this.gmapsZoom = Math.max(0.42, Math.min(4.0, this.gmapsZoom * zoomFactor));
          this.renderFullscreenGoogleMaps();
        }, { passive: false });

        // Click trên canvas để dịch chuyển đến địa điểm
        canvas.addEventListener('click', (e) => {
          const rect = canvas.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;
          this._handleGoogleMapsCanvasClick(clickX, clickY, canvas.width, canvas.height);
        });
      }

      // Đóng modal khi click ra ngoài nền mờ
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            this.closeGoogleMapsFullscreen();
          }
        });
      }
    }

    openGoogleMapsFullscreen() {
      const modal = document.getElementById('google-maps-fullscreen-modal');
      if (!modal) return;
      this.isGoogleMapsOpen = true;
      modal.style.display = 'flex';

      // Khởi tạo kích thước canvas
      const canvas = document.getElementById('google-maps-full-canvas');
      if (canvas) {
        const rect = canvas.parentElement ? canvas.parentElement.getBoundingClientRect() : { width: 900, height: 600 };
        canvas.width = rect.width || 900;
        canvas.height = rect.height || 600;
      }

      this.populateGoogleMapsWaypointList();
      this.renderFullscreenGoogleMaps();
    }

    closeGoogleMapsFullscreen() {
      const modal = document.getElementById('google-maps-fullscreen-modal');
      if (modal) modal.style.display = 'none';
      this.isGoogleMapsOpen = false;
    }

    toggleGoogleMapsFullscreen() {
      if (this.isGoogleMapsOpen) {
        this.closeGoogleMapsFullscreen();
      } else {
        this.openGoogleMapsFullscreen();
      }
    }

    populateGoogleMapsWaypointList() {
      const listContainer = document.getElementById('gmaps-waypoint-list');
      if (!listContainer) return;
      listContainer.innerHTML = '';

      const waypoints = [
        {
          id: 0,
          target: 0,
          icon: '🏫',
          title: 'Trường Tiểu học Ngô Quyền',
          desc: '141 Phố Trần Quốc Tuấn • Cổng trường rực rỡ cờ hoa',
          dist: '0 m',
          time: 'Khởi hành'
        },
        {
          id: 1,
          target: 8,
          icon: '☕',
          title: 'La Baker Coffee & Bakery',
          desc: 'Đường Ngô Quyền • Quán cà phê bánh ngọt sang trọng',
          dist: '280 m',
          time: '1 phút'
        },
        {
          id: 2,
          target: 13,
          icon: '🔄',
          title: 'Bùng Binh Kim Ngọc',
          desc: 'Vòng Xuyến Kim Ngọc - Ngô Quyền • Tháp biểu tượng',
          dist: '476 m',
          time: '2 phút'
        },
        {
          id: 3,
          target: 'traioi',
          icon: '🌊',
          title: 'Hồ Trại Ổi Vĩnh Yên',
          desc: 'Kẹp giữa Kim Ngọc & Hà Huy Tập • Liễu rủ bóng mát',
          dist: '490 m',
          time: '2 phút'
        },
        {
          id: 4,
          target: 'tinhuy',
          icon: '🌊',
          title: 'Hồ Tỉnh Uỷ - Đầm Vạc',
          desc: 'Phía Nam Tuyến Đường • Quần thể danh thắng Đầm Vạc',
          dist: '650 m',
          time: '2 phút'
        },
        {
          id: 5,
          target: 'park',
          icon: '🌳',
          title: 'Vườn Hoa UB Thành Phố',
          desc: 'Đại Lộ Hùng Vương • Công viên dạo bộ & đài phun nước',
          dist: '720 m',
          time: '3 phút'
        },
        {
          id: 6,
          target: 34,
          icon: '🥐',
          title: 'Hưng Yên BAKERY',
          desc: 'Góc Đại Lộ Hùng Vương & Phố Lê Lợi • Tiệm bánh thơm lừng',
          dist: '1,018 m',
          time: '3 phút'
        },
        {
          id: 7,
          target: 41,
          icon: '📍',
          title: 'Cây Cảnh VŨ DẬU (Đích đến)',
          desc: 'Ngõ Dân Sinh Phố Lê Lợi • Ngôi nhà ấm cúng của Bé Hà My',
          dist: '1,191 m',
          time: '4 phút'
        }
      ];

      const curProg = this.autoProgress || 0;
      let activeIndex = Math.min(waypoints.length - 1, Math.floor(curProg * waypoints.length));

      waypoints.forEach((wp, index) => {
        const card = document.createElement('div');
        card.className = `gmaps-waypoint-card ${index === activeIndex ? 'active' : ''}`;
        card.style.cssText = `
          background: ${index === activeIndex ? '#e8f0fe' : '#ffffff'};
          border: 1.5px solid ${index === activeIndex ? '#1a73e8' : '#e0e0e0'};
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: ${index === activeIndex ? '0 3px 10px rgba(26,115,232,0.18)' : '0 1px 3px rgba(0,0,0,0.05)'};
        `;

        card.innerHTML = `
          <div style="width: 38px; height: 38px; border-radius: 50%; background: ${index === 7 ? '#ea4335' : (index === 0 ? '#1a73e8' : '#f1f3f4')}; color: ${index === 7 || index === 0 ? '#fff' : '#333'}; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.12);">
            ${wp.icon}
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
              <span style="font-size: 0.88rem; font-weight: 800; color: #202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${wp.title}</span>
              <span style="font-size: 0.74rem; font-weight: 800; color: #1a73e8; background: #e8f0fe; padding: 2px 6px; border-radius: 999px; flex-shrink: 0;">${wp.dist}</span>
            </div>
            <div style="font-size: 0.74rem; color: #5f6368; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${wp.desc}</div>
          </div>
          <button class="gmaps-card-btn-tp" style="background: #1a73e8; color: #fff; border: none; padding: 6px 10px; border-radius: 8px; font-weight: 800; font-size: 0.74rem; cursor: pointer; flex-shrink: 0; font-family: 'Nunito', Arial, sans-serif;">
            ⚡ Đến
          </button>
        `;

        const btnTp = card.querySelector('.gmaps-card-btn-tp');
        const handleTeleport = (e) => {
          e.stopPropagation();
          this.teleportToWaypoint(wp.target);
          this.closeGoogleMapsFullscreen();
        };

        if (btnTp) btnTp.addEventListener('click', handleTeleport);
        card.addEventListener('click', handleTeleport);

        listContainer.appendChild(card);
      });
    }

    _handleGoogleMapsCanvasClick(clickX, clickY, w, h) {
      const centerX = -460.0;
      const centerZ = -170.0;
      const baseScale = (Math.min(w, h * 1.55) / 1150) * (this.gmapsZoom || 1.0);
      const cx = (w / 2) + (this.gmapsPanX || 0);
      const cy = (h / 2) + (this.gmapsPanY || 0);

      const toScrX = (wx) => cx + (wx - centerX) * baseScale;
      const toScrY = (wz) => cy + (wz - centerZ) * baseScale;

      const pois = [
        { target: 0, x: 3.2, z: 58.0, name: 'Trường Tiểu học Ngô Quyền' },
        { target: 8, x: -218.0, z: -78.0, name: 'La Baker' },
        { target: 13, x: -336.0, z: -212.0, name: 'Bùng Binh Kim Ngọc' },
        { target: 'traioi', x: -290.0, z: -320.0, name: 'Hồ Trại Ổi' },
        { target: 'tinhuy', x: -485.0, z: -95.0, name: 'Hồ Tỉnh Uỷ' },
        { target: 'park', x: -545.0, z: -275.0, name: 'Vườn hoa UB Thành phố' },
        { target: 34, x: -842.8, z: -274.4, name: 'Hưng Yên BAKERY' },
        { target: 41, x: -930.9, z: -319.4, name: 'Cây Cảnh VŨ DẬU' }
      ];

      for (const poi of pois) {
        const sx = toScrX(poi.x);
        const sy = toScrY(poi.z);
        if (Math.hypot(clickX - sx, clickY - sy) < 32) {
          this.teleportToWaypoint(poi.target);
          this.closeGoogleMapsFullscreen();
          return;
        }
      }
    }

    renderFullscreenGoogleMaps() {
      const canvas = document.getElementById('google-maps-full-canvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.width || (canvas.parentElement ? canvas.parentElement.clientWidth : 900);
      const h = canvas.height || (canvas.parentElement ? canvas.parentElement.clientHeight : 600);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);

      const isSat = this.gmapsLayer === 'sat';

      // 1. Nền bản đồ
      if (isSat) {
        ctx.fillStyle = '#1c2826';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#22332c';
        for (let rx = 20; rx < w; rx += 75) {
          for (let ry = 20; ry < h; ry += 65) {
            ctx.fillRect(rx, ry, 45, 35);
          }
        }
      } else {
        ctx.fillStyle = '#f1f3f4';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#e8eaed';
        ctx.strokeStyle = '#dadce0';
        ctx.lineWidth = 1;
        ctx.fillRect(w * 0.72, h * 0.52, 95, 75);
        ctx.strokeRect(w * 0.72, h * 0.52, 95, 75);
        ctx.fillRect(w * 0.55, h * 0.38, 110, 60);
        ctx.strokeRect(w * 0.55, h * 0.38, 110, 60);
        ctx.fillRect(w * 0.28, h * 0.58, 140, 85);
        ctx.strokeRect(w * 0.28, h * 0.58, 140, 85);
        ctx.fillRect(w * 0.08, h * 0.24, 85, 95);
        ctx.strokeRect(w * 0.08, h * 0.24, 85, 95);
      }

      // Trọng tâm bản đồ chuẩn xác: Trung điểm toàn tuyến (-460m, -170m)
      const centerX = -460.0;
      const centerZ = -170.0;

      // Tỷ lệ phóng to chuẩn xịn: Hiển thị trọn vẹn toàn bộ 1.19 km từ Trường Ngô Quyền đến Nhà Vũ Dậu
      const baseScale = (Math.min(w, h * 1.55) / 1150) * (this.gmapsZoom || 1.0);
      const cx = (w / 2) + (this.gmapsPanX || 0);
      const cy = (h / 2) + (this.gmapsPanY || 0);

      const toScrX = (wx) => cx + (wx - centerX) * baseScale;
      const toScrY = (wz) => cy + (wz - centerZ) * baseScale;

      // ==========================================================
      // 2. VẼ CẢNH QUAN HỒ NƯỚC (WATER BODIES - CHUẨN GOOGLE MAPS)
      // ==========================================================
      const waterColor = isSat ? '#0f2b38' : '#a5c9eb';
      const waterStroke = isSat ? '#164e63' : '#80b4e2';

      // A. HỒ TRẠI ỔI (Phía Bắc Bùng Binh Kim Ngọc - Kẹp giữa Kim Ngọc & Hà Huy Tập)
      const toX = toScrX(-290.0);
      const toZ = toScrY(-330.0);
      ctx.fillStyle = waterColor;
      ctx.strokeStyle = waterStroke;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.ellipse(toX, toZ, 85 * baseScale, 46 * baseScale, -Math.PI / 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isSat ? '#7dd3fc' : '#1a73e8';
      ctx.font = 'bold 12px "Nunito", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🌊 Hồ Trại Ổi', toX, toZ);

      // B. HỒ TỈNH UỶ & ĐẦM VẠC (Phía Nam Tuyến Đường - Gần Hùng Vương & Ngô Quyền)
      const tuX = toScrX(-490.0);
      const tuZ = toScrY(-90.0);
      ctx.fillStyle = waterColor;
      ctx.beginPath();
      ctx.ellipse(tuX, tuZ, 135 * baseScale, 78 * baseScale, -Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isSat ? '#7dd3fc' : '#1a73e8';
      ctx.font = 'bold 13px "Nunito", Arial, sans-serif';
      ctx.fillText('🌊 Hồ Tỉnh Uỷ', tuX, tuZ - 8);
      ctx.fillStyle = isSat ? '#38bdf8' : '#5c93c4';
      ctx.font = '10.5px "Nunito", Arial, sans-serif';
      ctx.fillText('Quần thể thắng cảnh Đầm Vạc', tuX, tuZ + 10);

      // C. HỒ NƯỚC NHỎ GÓC ĐÔNG NAM (Gần Trường Ngô Quyền)
      const cornerLakeX = toScrX(60.0);
      const cornerLakeZ = toScrY(110.0);
      ctx.fillStyle = waterColor;
      ctx.beginPath();
      ctx.ellipse(cornerLakeX, cornerLakeZ, 45 * baseScale, 28 * baseScale, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // ==========================================================
      // 3. VẼ CÔNG VIÊN & KHUÔN VIÊN XANH (PARKS & GREEN SPACES)
      // ==========================================================
      const parkColor = isSat ? '#143823' : '#ceead6';
      const parkStroke = isSat ? '#166534' : '#a8dab5';

      // A. VƯỜN HOA UB THÀNH PHỐ (Bắc Đại Lộ Hùng Vương)
      const vhX = toScrX(-545.0);
      const vhZ = toScrY(-298.0);
      ctx.fillStyle = parkColor;
      ctx.strokeStyle = parkStroke;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(vhX, vhZ, 92 * baseScale, 38 * baseScale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = isSat ? '#1e5233' : '#bfe5ca';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(vhX, vhZ, 60 * baseScale, 22 * baseScale, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = waterColor;
      ctx.beginPath();
      ctx.arc(vhX, vhZ, 6 * baseScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = isSat ? '#86efac' : '#137333';
      ctx.font = 'bold 11.5px "Nunito", Arial, sans-serif';
      ctx.fillText('🌳 Vườn hoa UB Thành phố', vhX, vhZ - 12);

      // B. CÔNG VIÊN ĐỒI CAO (Nam Bùng Binh Kim Ngọc)
      const dcX = toScrX(-365.0);
      const dcZ = toScrY(-170.0);
      ctx.fillStyle = parkColor;
      ctx.strokeStyle = parkStroke;
      ctx.beginPath();
      ctx.arc(dcX, dcZ, 34 * baseScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = isSat ? '#86efac' : '#137333';
      ctx.font = '10.5px "Nunito", Arial, sans-serif';
      ctx.fillText('🌲 CV Đồi Cao', dcX, dcZ);

      // C. KHUÔN VIÊN TRƯỜNG TIỂU HỌC NGÔ QUYỀN
      const scX = toScrX(3.2);
      const scZ = toScrY(40.0);
      ctx.fillStyle = parkColor;
      ctx.strokeStyle = parkStroke;
      ctx.beginPath();
      ctx.roundRect(scX - 35 * baseScale, scZ - 32 * baseScale, 70 * baseScale, 64 * baseScale, 8);
      ctx.fill();
      ctx.stroke();

      // D. KHUÔN VIÊN VƯỜN CÂY CẢNH VŨ DẬU
      const hmX = toScrX(-930.9);
      const hmZ = toScrY(-319.4);
      ctx.fillStyle = isSat ? '#1b4332' : '#c8e6c9';
      ctx.strokeStyle = isSat ? '#2d6a4f' : '#a5d6a7';
      ctx.beginPath();
      ctx.roundRect(hmX - 28 * baseScale, hmZ - 22 * baseScale, 56 * baseScale, 44 * baseScale, 6);
      ctx.fill();
      ctx.stroke();

      // ==========================================================
      // 4. MẠNG LƯỚI ĐƯỜNG PHỐ CHUẨN GOOGLE MAPS (2-PASS CASING & FILL)
      // ==========================================================

      // PASS 1: ĐƯỜNG VIỀN CASING
      ctx.strokeStyle = isSat ? '#334155' : '#dadce0';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(toScrX(-245.0), toScrY(-345.0));
      ctx.lineTo(toScrX(-340.0), toScrY(-260.0));
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(toScrX(-745.0), toScrY(-248.0));
      ctx.lineTo(toScrX(-745.0), toScrY(-120.0));
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(toScrX(-260.0), toScrY(-100.0));
      ctx.lineTo(toScrX(-310.0), toScrY(20.0));
      ctx.moveTo(toScrX(-310.0), toScrY(-180.0));
      ctx.lineTo(toScrX(-370.0), toScrY(-120.0));
      ctx.stroke();

      ctx.lineWidth = 16;
      ctx.beginPath();
      for (let i = 0; i <= 15 && i < this.routePoints.length; i++) {
        const pt = this.routePoints[i];
        if (i === 0) ctx.moveTo(toScrX(pt.x), toScrY(pt.z));
        else ctx.lineTo(toScrX(pt.x), toScrY(pt.z));
      }
      ctx.stroke();

      ctx.lineWidth = 13;
      ctx.beginPath();
      for (let i = 34; i < this.routePoints.length; i++) {
        const pt = this.routePoints[i];
        if (i === 34) ctx.moveTo(toScrX(pt.x), toScrY(pt.z));
        else ctx.lineTo(toScrX(pt.x), toScrY(pt.z));
      }
      ctx.stroke();

      ctx.strokeStyle = isSat ? '#f59e0b' : '#fbbc04';
      ctx.lineWidth = 20;

      ctx.beginPath();
      ctx.moveTo(toScrX(-220.0), toScrY(-320.0));
      ctx.lineTo(toScrX(-440.0), toScrY(-105.0));
      ctx.stroke();

      const bbX = toScrX(-336.0);
      const bbZ = toScrY(-212.0);
      ctx.beginPath();
      ctx.arc(bbX, bbZ, 25 * baseScale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      for (let i = 15; i <= 34 && i < this.routePoints.length; i++) {
        const pt = this.routePoints[i];
        if (i === 15) ctx.moveTo(toScrX(pt.x), toScrY(pt.z));
        else ctx.lineTo(toScrX(pt.x), toScrY(pt.z));
      }
      ctx.stroke();

      // PASS 2: LÒNG ĐƯỜNG TRẮNG TINH GOOGLE MAPS (#ffffff)
      ctx.strokeStyle = isSat ? '#cbd5e1' : '#ffffff';
      ctx.lineWidth = 7;

      ctx.beginPath();
      ctx.moveTo(toScrX(-245.0), toScrY(-345.0));
      ctx.lineTo(toScrX(-340.0), toScrY(-260.0));
      ctx.moveTo(toScrX(-745.0), toScrY(-248.0));
      ctx.lineTo(toScrX(-745.0), toScrY(-120.0));
      ctx.moveTo(toScrX(-260.0), toScrY(-100.0));
      ctx.lineTo(toScrX(-310.0), toScrY(20.0));
      ctx.moveTo(toScrX(-310.0), toScrY(-180.0));
      ctx.lineTo(toScrX(-370.0), toScrY(-120.0));
      ctx.stroke();

      ctx.lineWidth = 11;
      ctx.beginPath();
      for (let i = 0; i <= 15 && i < this.routePoints.length; i++) {
        const pt = this.routePoints[i];
        if (i === 0) ctx.moveTo(toScrX(pt.x), toScrY(pt.z));
        else ctx.lineTo(toScrX(pt.x), toScrY(pt.z));
      }
      for (let i = 34; i < this.routePoints.length; i++) {
        const pt = this.routePoints[i];
        if (i === 34) ctx.moveTo(toScrX(pt.x), toScrY(pt.z));
        else ctx.lineTo(toScrX(pt.x), toScrY(pt.z));
      }
      ctx.stroke();

      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(toScrX(-220.0), toScrY(-320.0));
      ctx.lineTo(toScrX(-440.0), toScrY(-105.0));
      for (let i = 15; i <= 34 && i < this.routePoints.length; i++) {
        const pt = this.routePoints[i];
        if (i === 15) ctx.moveTo(toScrX(pt.x), toScrY(pt.z));
        else ctx.lineTo(toScrX(pt.x), toScrY(pt.z));
      }
      ctx.stroke();

      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(bbX, bbZ, 25 * baseScale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = parkColor;
      ctx.beginPath();
      ctx.arc(bbX, bbZ, 12 * baseScale, 0, Math.PI * 2);
      ctx.fill();

      // ==========================================================
      // 5. TUYẾN ĐƯỜNG GPS CHỈ ĐƯỜNG ĐỎ RỰC RỠ CHUẨN GOOGLE MAPS (#ea4335)
      // ==========================================================
      if (this.routePoints && this.routePoints.length) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8.5;
        ctx.beginPath();
        for (let i = 0; i < this.routePoints.length; i++) {
          const pt = this.routePoints[i];
          if (i === 0) ctx.moveTo(toScrX(pt.x), toScrY(pt.z));
          else ctx.lineTo(toScrX(pt.x), toScrY(pt.z));
        }
        ctx.stroke();

        ctx.strokeStyle = '#ea4335';
        ctx.lineWidth = 5.6;
        ctx.beginPath();
        for (let i = 0; i < this.routePoints.length; i++) {
          const pt = this.routePoints[i];
          if (i === 0) ctx.moveTo(toScrX(pt.x), toScrY(pt.z));
          else ctx.lineTo(toScrX(pt.x), toScrY(pt.z));
        }
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        for (let i = 1; i < this.routePoints.length - 1; i += 3) {
          const pt = this.routePoints[i];
          ctx.beginPath();
          ctx.arc(toScrX(pt.x), toScrY(pt.z), 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ==========================================================
      // 6. NHÃN TÊN ĐƯỜNG PHỐ CHUẨN GOOGLE MAPS (TEXT VỚI HALO TRẮNG)
      // ==========================================================
      const drawStreetLabel = (text, wx, wz, angle = 0) => {
        const sx = toScrX(wx);
        const sy = toScrY(wz);
        ctx.save();
        ctx.translate(sx, sy);
        if (angle !== 0) ctx.rotate(angle);
        ctx.font = 'bold 11px "Nunito", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.strokeStyle = isSat ? '#0f172a' : '#ffffff';
        ctx.lineWidth = 3.5;
        ctx.strokeText(text, 0, 0);
        ctx.fillStyle = isSat ? '#f1f5f9' : '#5f6368';
        ctx.fillText(text, 0, 0);
        ctx.restore();
      };

      drawStreetLabel('Đ. Trần Quốc Tuấn', -60.0, 58.0);
      drawStreetLabel('Đường Ngô Quyền', -210.0, -40.0, -Math.PI / 4.5);
      drawStreetLabel('Đường Kim Ngọc', -280.0, -250.0, -Math.PI / 3.8);
      drawStreetLabel('Đại Lộ Hùng Vương', -550.0, -248.0);
      drawStreetLabel('Đ. Lê Lợi', -840.0, -295.0, Math.PI / 2.5);
      drawStreetLabel('Phố Hà Huy Tập', -290.0, -300.0, -Math.PI / 3.5);
      drawStreetLabel('Đ. Điện Biên Phủ', -745.0, -180.0, Math.PI / 2);

      // ==========================================================
      // 7. CÁC POI PINS & BADGES CHUẨN XÁC THEO ẢNH NGƯỜI DÙNG
      // ==========================================================
      const drawGoogleBadge = (icon, label, wx, wz, bgColor, fgColor = '#ffffff') => {
        const sx = toScrX(wx);
        const sy = toScrY(wz);

        ctx.save();
        ctx.font = 'bold 11px "Nunito", Arial, sans-serif';
        const textWidth = ctx.measureText(label).width;
        const padX = 7;
        const badgeH = 22;
        const badgeW = textWidth + badgeH + padX * 2;

        ctx.shadowColor = 'rgba(0,0,0,0.22)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = bgColor;
        ctx.beginPath();
        ctx.roundRect(sx - badgeW / 2, sy - badgeH / 2, badgeW, badgeH, 11);
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = '12px "Nunito", Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(icon, sx - badgeW / 2 + padX, sy);

        ctx.fillStyle = fgColor;
        ctx.font = 'bold 10.5px "Nunito", Arial, sans-serif';
        ctx.fillText(label, sx - badgeW / 2 + padX + 16, sy);

        ctx.restore();
      };

      drawGoogleBadge('🏫', 'TH Ngô Quyền', 3.2, 58.0, '#1a73e8', '#ffffff');
      drawGoogleBadge('☕', 'La Baker', -218.0, -78.0, '#ea580c', '#ffffff');
      drawGoogleBadge('🍽️', 'Bếp Cẩm Nhung', -245.0, -42.0, '#ea580c', '#ffffff');
      drawGoogleBadge('📮', 'Bưu Điện VP', -315.0, -245.0, '#0284c7', '#ffffff');
      drawGoogleBadge('🏛️', 'Bảo tàng Tỉnh', -380.0, -145.0, '#7c3aed', '#ffffff');
      drawGoogleBadge('🏛️', 'UBND Phường', -630.0, -325.0, '#0284c7', '#ffffff');
      drawGoogleBadge('⛩️', 'Chùa Tích Sơn', -720.0, -345.0, '#64748b', '#ffffff');
      drawGoogleBadge('🥐', 'Hưng Yên BAKERY', -825.0, -282.0, '#c2410c', '#ffffff');

      // Pin đỏ CÂY CẢNH VŨ DẬU
      const pinX = toScrX(-930.9);
      const pinY = toScrY(-319.4);
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;

      ctx.fillStyle = '#ea4335';
      ctx.beginPath();
      ctx.arc(pinX, pinY - 14, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pinX - 6, pinY - 7);
      ctx.lineTo(pinX, pinY);
      ctx.lineTo(pinX + 6, pinY - 7);
      ctx.fillStyle = '#ea4335';
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pinX, pinY - 14, 4.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      ctx.save();
      ctx.font = '900 13px "Nunito", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.strokeText('📍 Cây cảnh VŨ DẬU', pinX, pinY - 32);
      ctx.fillStyle = '#ea4335';
      ctx.fillText('📍 Cây cảnh VŨ DẬU', pinX, pinY - 32);
      ctx.restore();

      // ==========================================================
      // 8. ĐIỂM ĐỊNH VỊ VỊ TRÍ BÉ HÀ MY LIVE GOOGLE MAPS PUCK
      // ==========================================================
      const playerPos = this.isMounted
        ? this.bikeMesh.position
        : (this.arena && this.arena.studentMesh ? this.arena.studentMesh.position : this.bikeMesh.position);

      const px = isFinite(playerPos.x) ? playerPos.x : 0;
      const pz = isFinite(playerPos.z) ? playerPos.z : 58.0;
      const pScreenX = toScrX(px);
      const pScreenY = toScrY(pz);

      ctx.save();
      ctx.translate(pScreenX, pScreenY);

      const pYaw = this.isMounted
        ? this.bikeHeading
        : (this.arena && this.arena.studentMesh ? this.arena.studentMesh.rotation.y : 0);

      const screenAngle = pYaw - Math.PI / 2;
      ctx.rotate(screenAngle);

      ctx.fillStyle = 'rgba(66, 133, 244, 0.28)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 48, -0.45, 0.45);
      ctx.closePath();
      ctx.fill();

      const pulseRadius = 12 + Math.sin(Date.now() * 0.006) * 3;
      ctx.fillStyle = 'rgba(26, 115, 232, 0.22)';
      ctx.beginPath();
      ctx.arc(0, 0, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1a73e8';
      ctx.beginPath();
      ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(7, 0);
      ctx.lineTo(-3, -4);
      ctx.lineTo(-1, 0);
      ctx.lineTo(-3, 4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  // Khởi tạo CityCommuteManager khi Three Arena đã sẵn sàng
  function initCitySimulation() {
    if (window.Campus3DArenaInstance) {
      if (!window.CityCommuteInstance) {
        window.CityCommuteInstance = new CityCommuteManager(window.Campus3DArenaInstance);
        window.cityCommuteManager = window.CityCommuteInstance;
      } else {
        window.CityCommuteInstance.bindArena(window.Campus3DArenaInstance);
      }
    } else {
      setTimeout(initCitySimulation, 100);
    }
  }

  // Cung cấp API toàn cục ngay lập tức (không bao giờ lỗi undefined function)
  window.enterViceCityMode = function (idx = 0) {
    if (window.CityCommuteInstance) {
      window.CityCommuteInstance.activateCityMode(idx);
    } else {
      console.log("⏳ Đang chuẩn bị xe Honda Vision và Thành Phố Vĩnh Yên...");
      const waitTimer = setInterval(() => {
        if (window.CityCommuteInstance) {
          clearInterval(waitTimer);
          window.CityCommuteInstance.activateCityMode(idx);
        }
      }, 50);
    }
  };

  window.enterViceCityModeFromGate = function (startX = 0, startZ = 56.5) {
    if (window.CityCommuteInstance) {
      window.CityCommuteInstance.activateCityModeFromGate(startX, startZ);
    } else {
      const waitTimer = setInterval(() => {
        if (window.CityCommuteInstance) {
          clearInterval(waitTimer);
          window.CityCommuteInstance.activateCityModeFromGate(startX, startZ);
        }
      }, 50);
    }
  };

  window.exitViceCityMode = function () {
    if (window.CityCommuteInstance) {
      window.CityCommuteInstance.deactivateCityMode();
    }
  };

  // Event Delegation trên Document: Bắt 100% mọi sự kiện click vào nút Ra phố lái xe & Vào trường học
  document.addEventListener('click', function (e) {
    const target = e.target;
    if (!target) return;
    const btnEnter = target.closest('#btn-commute-bike, #btn-main-open-city, #btn-quiz-open-city');
    if (btnEnter) {
      e.preventDefault();
      window.enterViceCityMode(0);
      return;
    }
    const btnExit = target.closest('#btn-back-to-school');
    if (btnExit) {
      e.preventDefault();
      window.exitViceCityMode();
      return;
    }
  });

  // Tự động kiểm tra URL nếu có tham số ?mode=city hoặc ?vicecity=1
  if (window.location.search.includes('mode=city') || window.location.search.includes('vicecity')) {
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => window.enterViceCityMode(0), 400);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCitySimulation);
  } else {
    initCitySimulation();
  }

  window.CityCommuteManager = CityCommuteManager;
})();
