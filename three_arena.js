// ==============================================================
// 3D MINECRAFT / ROBLOX TRƯỜNG TIỂU HỌC NGÔ QUYỀN GAME ENGINE
// Trường Học Toàn Diện 5C4: Lớp Học - Nhà Ăn - Sân Trường - Hồ Câu Cá - Parkour
// Tự Do Di Chuyển Bằng WASD & Phím Mũi Tên, Xoay Chuột 360°, Tương Tác NPC & Quests
// ==============================================================

// Polyfill CanvasRenderingContext2D.prototype.roundRect nếu môi trường chưa hỗ trợ
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (typeof r === 'undefined') r = 0;
    let tl, tr, br, bl;
    if (typeof r === 'number') {
      tl = tr = br = bl = r;
    } else if (Array.isArray(r)) {
      tl = r[0] || 0; tr = r[1] || 0; br = r[2] || 0; bl = r[3] || 0;
    } else {
      tl = r.tl || 0; tr = r.tr || 0; br = r.br || 0; bl = r.bl || 0;
    }
    this.beginPath();
    this.moveTo(x + tl, y);
    this.lineTo(x + w - tr, y);
    this.quadraticCurveTo(x + w, y, x + w, y + tr);
    this.lineTo(x + w, y + h - br);
    this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    this.lineTo(x + bl, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - bl);
    this.lineTo(x, y + tl);
    this.quadraticCurveTo(x, y, x + tl, y);
    this.closePath();
    return this;
  };
}

class RobloxClassroom3D {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.animId = null;

    // Characters & Interactive Objects
    this.studentMesh = null;
    this.studentLegL = null;
    this.studentLegR = null;
    this.studentArmL = null;
    this.studentArmR = null;
    this.studentTasselL = null;
    this.studentTasselR = null;
    this.studentDressMeshes = [];
    this.studentHatMesh = null;
    this.studentAccessories = {};

    this.teacherMesh = null;
    this.teacherRod = null;
    this.petMesh = null;
    this.petTail = null;
    this.currentPetType = 'pet_corgi';

    // NPCs list
    this.npcs = [];
    this.classmates = [];
    this.fishMeshes = [];
    this.fallingPetals = [];
    this.butterflies = [];
    this.exclamationMarks = [];
    this.fountainWaterJets = [];
    this.fountainSpoutMesh = null;
    this.fountainRipples = [];
    this.floatingClouds = [];
    this.animatedBunnies = [];
    this.jumpingKoi = null;
    this.fireflies = [];
    this.hotAirBalloon = null;
    this.buntingGarlands = [];
    this.sunGroup = null;
    this.stylizedTrees = [];
    this.grassTufts = [];
    this.waterLilies = [];

    // Chân thực hóa PBR & Môi trường sống động
    this.waterNormalTex = null;
    this.pondWaterNormalTex = null;
    this.ceilingFans = [];
    this.godRays = [];
    this.sunPollen = [];
    this.acFanMesh = null;
    this.lastFootstepCycle = 0;

    this.blackboardTexture = null;
    this.blackboardCanvas = null;
    this.standingPrompt = null;
    this.standingPromptTexture = null;

    // Environment Collections
    this.pads = [];
    this.particles = [];
    this.parkourStars = [];
    this.foodItems = [];
    this.solidPlatforms = [];

    // Player Controller State
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false
    };
    this.playerSpeed = 0.22;
    this.speedMultiplier = 1.0;
    this.jumpMultiplier = 1.0;
    this.playerPos = { x: 0, y: 0, z: 1.5 };
    this.playerRot = 0;
    this.isWalking = false;
    this.walkCycle = 0;
    this.jumpY = 0;
    this.jumpVelocity = 0;
    this.isJumping = false;
    this.isDancing = false;
    this.isConfused = false;
    this.playerBaseY = 0;

    // Pad Proximity & Selection
    this.standingPadIndex = -1;
    this.onSelectCallback = null;
    this.selectionLocked = false;

    // Interaction Callbacks
    this.onNPCInteractCallback = null;
    this.onFishingSpotCallback = null;
    this.onFlagpoleCallback = null;
    this.onCollectStarCallback = null;
    this.onProximityUpdateCallback = null;
    this.onHonorRollCallback = null;
    this.onBunnySanctuaryCallback = null;
    this.onVendingMachineCallback = null;
    this.onPhotoBoothCallback = null;
    this.onReadingNookCallback = null;
    this.onSchoolDrumCallback = null;
    this.onFolkGameCallback = null;
    this.nearbyTarget = null; // { type, name, dist, prompt }

    // Quest Navigation & "Dắt Mũi" 3D Arrow System
    this.questNavTarget = null;
    this.navArrowGroup = null;
    this.beaconBeamGroup = null;
    this.beaconGroundRing = null;
    this.onQuestNavUpdate = null;
    this.springCooldown = false;
    this.teleportCooldown = false;

    // World Elements
    this.vietnamFlag = null;
    this.fountainWater = null;
    this.crownTrophy = null;

    // Camera Mode & Mouse Look / Orbit Controls (Roblox 3rd-Person Style)
    this.cameraTarget = new THREE.Vector3(0, 1.25, 3.2);
    this.cameraYaw = 0.0;            // Góc nhìn thẳng từ phía sau Bé Hà My ngắm bảng đen & bục đáp án
    this.cameraPitch = 0.20;         // Độ nghiêng dịu mắt
    this.cameraDistance = 4.8;       // Khoảng cách camera vừa vặn chuẩn Roblox
    this.minDistance = 2.5;          // Min zoom distance
    this.maxDistance = 22.0;         // Max zoom distance (Cho phép zoom bao quát toàn khuôn viên)
    this.minPitch = -0.55;           // Cho phép ngửa camera nhìn lên bầu trời / ngọn cờ
    this.maxPitch = 1.30;            // Cho phép chúi camera nhìn toàn cảnh từ trên cao
    this.isMouseDown = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.dragDistance = 0;

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn("THREE.js is not loaded.");
      return;
    }

    // Expose instance and core Three.js objects for global access (Vice City & Quest / Shop)
    window.Campus3DArenaInstance = this;
    window.arena = this;
    window.scene = this.scene;
    window.camera = this.camera;
    this.isCityDrivingMode = false;

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 420;

    // 1. Scene & Lighting - Bầu trời xanh trong trẻo, sắc nét, không bị sương mù làm bạc màu
    this.scene = new THREE.Scene();
    window.scene = this.scene;
    this.scene.background = new THREE.Color(0x38bdf8);
    this.scene.fog = null; // Gỡ bỏ hoàn toàn sương mù, trong trẻo rực rỡ như nắng hè!

    // Vòm trời 3D khổng lồ 360 độ, Mặt trời tỏa hào quang & Dãy núi trập trùng chân trời
    this.buildAtmosphericSkyDome();

    // 2. Camera: Spherical Third-Person Orbit Camera behind Bé Hà My
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 2600);
    const cosPitch = Math.cos(this.cameraPitch);
    const sinPitch = Math.sin(this.cameraPitch);
    const initCamZ = 3.2 + this.cameraDistance * cosPitch;
    const initCamY = 1.6 + this.cameraDistance * sinPitch + (this.cameraDistance * 0.06);
    this.camera.position.set(0, initCamY, initCamZ);
    this.cameraTarget.set(0, 1.34, 3.2);
    this.camera.lookAt(this.cameraTarget);
    window.camera = this.camera;

    // 3. WebGL Renderer - Đồ họa siêu nét, tương phản cao, triệt tiêu 100% lớp mờ trắng
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x38bdf8, 1.0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.96;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    window.renderer = this.renderer;

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // Tự động kết nối với CityCommuteManager nếu đã sẵn sàng
    if (window.CityCommuteInstance && typeof window.CityCommuteInstance.bindArena === 'function') {
      window.CityCommuteInstance.bindArena(this);
    }

    // 4. Lights - Hệ thống chiếu sáng sắc nét, rực rỡ, độ tương phản cao chuẩn Game 3D
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.42);
    this.scene.add(ambientLight);
    this.ambientLight = ambientLight;

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 0.85);
    sunLight.position.set(50, 100, 48);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 300;
    sunLight.shadow.camera.left = -95;
    sunLight.shadow.camera.right = 95;
    sunLight.shadow.camera.top = 95;
    sunLight.shadow.camera.bottom = -95;
    sunLight.shadow.bias = -0.0003;
    sunLight.shadow.normalBias = 0.035;
    sunLight.shadow.radius = 2.0;
    this.scene.add(sunLight);
    this.sunLight = sunLight;

    // Đèn viền Anime Rim Backlight tạo hào quang nhẹ quanh nhân vật
    const rimLight = new THREE.DirectionalLight(0xfef08a, 0.10);
    rimLight.position.set(-45, 55, -45);
    this.scene.add(rimLight);
    this.rimLight = rimLight;

    // Ánh sáng bầu trời và mặt đất tự nhiên (HemisphereLight) phản quang dịu mát
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x15803d, 0.20);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);
    this.hemiLight = hemiLight;

    // 4.5. Image-Based Lighting (IBL / Environment Map) cho phản chiếu chân thực
    this.setupEnvironmentLighting();

    // Nhóm đối tượng độc lập gom toàn bộ khuôn viên trường học để bóc tách 100% với đường phố
    this.schoolCampusGroup = new THREE.Group();
    this.schoolCampusGroup.name = 'schoolCampusGroup';
    this.scene.add(this.schoolCampusGroup);

    // 5. Build Entire Campus World (Classroom, Cafeteria, School Yard, Fishing Pond, Minecraft Parkour)
    this.buildCampusWorld();

    // 6. Build Characters (Chibi Bé Hà My với Nón Quai Thao, Thầy Tuấn, Pet)
    this.buildStudentHaMy();
    this.buildTeacherThayTuan();
    this.buildCompanionPet();

    // 6.5. Setup Quest Navigation Arrow & Celestial Light Beacon ("Dắt Mũi" 3D)
    this.setupQuestNavigation();

    // 7. Setup Controls: Keyboard + Mouse Orbit Look/Zoom + 3D Mouse Raycasting
    this.setupKeyboardControls();
    this.setupMouseOrbitControls();
    this.setupMouseRaycaster();

    // 8. Start Game Loop
    this.animate = this.animate.bind(this);
    this.animate();

    // 9. Responsive Resize Listener & ResizeObserver
    this.handleResize = () => {
      if (!this.container || !this.renderer || !this.camera) return;
      if (this.isCityDrivingMode) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        return;
      }
      const w = this.container.clientWidth || 1280;
      const h = this.container.clientHeight || 720;
      if (w === 0 || h === 0) return;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };

    window.addEventListener('resize', this.handleResize);

    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      this.resizeObserver.observe(this.container);
    }
  }

  // ------------------------------------------------------------
  // PHÍM ĐIỀU KHIỂN & BỘ ĐỆM AN TOÀN TRÁNH KẸT PHÍM UNIKEY / IME
  // ------------------------------------------------------------
  resetKeys() {
    this.keys.forward = false;
    this.keys.backward = false;
    this.keys.left = false;
    this.keys.right = false;
    this.keys.space = false;
    this.keys.shift = false;
    this.isWalking = false;
    this.playerVx = 0;
    this.playerVz = 0;
    this.jumpBufferFrames = 0;
  }

  // ------------------------------------------------------------
  // HIỂN THỊ LIÊN TỤC KHUÔN VIÊN TRƯỜNG HỌC:
  // Khi ở ngoài phố Trần Quốc Tuấn: Giữ nguyên sân trường, tòa nhà, cột cờ
  // để khi nhìn qua cổng trường vẫn thấy trọn vẹn khuôn viên trường học!
  // ------------------------------------------------------------
  setSchoolCampusVisible(visible) {
    if (this.schoolCampusGroup) {
      this.schoolCampusGroup.visible = true; // Luôn giữ hiển thị để nhìn qua cổng trường
    }
    if (this.groundMesh) this.groundMesh.visible = true;
    if (this.skyDome) this.skyDome.visible = true; // Luôn giữ Vòm trời Ghibli Anime tươi sáng
    if (this.sunGroup) this.sunGroup.visible = true; // Luôn giữ Mặt trời Anime tỏa sáng
    if (this.scene) {
      this.scene.background = new THREE.Color(0x38bdf8);
    }
    if (this.renderer) {
      this.renderer.setClearColor(0x38bdf8, 1.0);
    }
    // Chỉ ẩn tháp Obby 80m trên trời và các HUD chỉ đường minigame khi ra đường phố
    if (this.parkourGroup) this.parkourGroup.visible = !!visible;
    if (this.teacherMesh) this.teacherMesh.visible = !!visible;
    if (this.petMesh) this.petMesh.visible = !!visible;
    if (this.navArrowGroup) this.navArrowGroup.visible = !!visible;
    if (this.beaconBeamGroup) this.beaconBeamGroup.visible = !!visible;
    if (this.standingPrompt) this.standingPrompt.visible = !!visible;
    if (this.acFanMesh) this.acFanMesh.visible = !!visible;
    if (this.floatingClouds && this.floatingClouds.length) {
      this.floatingClouds.forEach(c => { if (c && c.group) c.group.visible = !!visible; });
    }
    if (this.sunPollen && this.sunPollen.length) {
      this.sunPollen.forEach(p => { if (p && p.mesh) p.mesh.visible = !!visible; });
    }
    if (this.pads && this.pads.length) {
      this.pads.forEach(p => {
        if (p.mesh) p.mesh.visible = !!visible;
        if (p.spot) p.spot.visible = !!visible;
      });
    }
  }

  // ------------------------------------------------------------
  // HỌA TIẾT NỀN GẠCH & CỎ SÂN TRƯỜNG TIỂU HỌC NGÔ QUYỀN
  // ------------------------------------------------------------
  createGrassCanvasTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Nền cỏ xanh mướt đa tầng sắc độ (Lush Emerald & Spring Lime Gradient)
    const bgGrad = ctx.createLinearGradient(0, 0, 512, 512);
    bgGrad.addColorStop(0.0, '#15803d');
    bgGrad.addColorStop(0.5, '#16a34a');
    bgGrad.addColorStop(1.0, '#15803d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 512);

    // Lớp đốm cỏ sáng dịu nhẹ kiểu Ghibli / Animal Crossing
    for (let i = 0; i < 450; i++) {
      const gx = Math.random() * 512;
      const gy = Math.random() * 512;
      const r = 3 + Math.random() * 10;
      ctx.fillStyle = i % 3 === 0 ? '#22c55e' : (i % 3 === 1 ? '#4ade80' : '#14532d');
      ctx.globalAlpha = 0.18;
      ctx.beginPath();
      ctx.arc(gx, gy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Các nhánh cỏ nhọn vẽ tay nghệ thuật (Hand-painted grass blade strokes)
    ctx.globalAlpha = 0.35;
    for (let b = 0; b < 280; b++) {
      const bx = Math.random() * 512;
      const by = Math.random() * 512;
      const h = 8 + Math.random() * 14;
      ctx.strokeStyle = b % 2 === 0 ? '#4ade80' : '#86efac';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.quadraticCurveTo(bx + (Math.random() - 0.5) * 6, by - h * 0.6, bx + (Math.random() - 0.5) * 8, by - h);
      ctx.stroke();
    }

    // Cỏ 4 lá may mắn (Lucky Clovers 🍀)
    ctx.globalAlpha = 0.55;
    for (let c = 0; c < 32; c++) {
      const cx = Math.random() * 512;
      const cy = Math.random() * 512;
      ctx.fillStyle = '#86efac';
      for (let l = 0; l < 4; l++) {
        const ang = (l / 4) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(ang) * 4.5, cy + Math.sin(ang) * 4.5, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Hoa cúc họa mi rải thưa thớt tự nhiên, không dày đặc làm bạc màu nền
    ctx.globalAlpha = 0.45;
    for (let f = 0; f < 8; f++) {
      const fx = Math.random() * 512;
      const fy = Math.random() * 512;
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(fx, fy, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1.0;
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(16, 12);
    return tex;
  }

  // ------------------------------------------------------------
  // BỘ TẠO NORMAL MAP THỦ TỤC TỪ HEIGHTMAP (PROCEDURAL NORMAL MAP GENERATOR)
  // Tạo độ nổi khối 3D vi mô chân thực chuẩn PBR (Sobel 3x3 Filter)
  // Giúp bề mặt bắt sáng mặt trời góc nghiêng, tạo khe đổ bóng và điểm chói specular
  // ------------------------------------------------------------
  createNormalMapFromHeightCanvas(hCanvas, strength = 1.5) {
    const w = hCanvas.width;
    const h = hCanvas.height;
    const hCtx = hCanvas.getContext('2d');
    const hData = hCtx.getImageData(0, 0, w, h).data;

    const normCanvas = document.createElement('canvas');
    normCanvas.width = w;
    normCanvas.height = h;
    const normCtx = normCanvas.getContext('2d');
    const normImg = normCtx.createImageData(w, h);
    const nData = normImg.data;

    const getHeight = (x, y) => {
      const wx = (x + w) % w;
      const wy = (y + h) % h;
      const idx = (wy * w + wx) * 4;
      return (hData[idx] * 0.299 + hData[idx + 1] * 0.587 + hData[idx + 2] * 0.114) / 255.0;
    };

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const tl = getHeight(x - 1, y - 1);
        const t  = getHeight(x,     y - 1);
        const tr = getHeight(x + 1, y - 1);
        const l  = getHeight(x - 1, y);
        const r  = getHeight(x + 1, y);
        const bl = getHeight(x - 1, y + 1);
        const b  = getHeight(x,     y + 1);
        const br = getHeight(x + 1, y + 1);

        const dx = ((tr + 2 * r + br) - (tl + 2 * l + bl)) * strength;
        const dy = ((bl + 2 * b + br) - (tl + 2 * t + tr)) * strength;
        const dz = 1.0;

        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const nx = -dx / len;
        const ny = -dy / len;
        const nz = dz / len;

        const pIdx = (y * w + x) * 4;
        nData[pIdx]     = Math.floor((nx * 0.5 + 0.5) * 255);
        nData[pIdx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
        nData[pIdx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
        nData[pIdx + 3] = 255;
      }
    }
    normCtx.putImageData(normImg, 0, 0);
    const nTex = new THREE.CanvasTexture(normCanvas);
    nTex.wrapS = THREE.RepeatWrapping;
    nTex.wrapT = THREE.RepeatWrapping;
    return nTex;
  }

  // Normal Map cho gạch đỏ sân trường: khe vữa lún sâu, mép vát và vi nhám đất sét
  createRedCourtyardBrickNormalTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Nền rãnh vữa thấp
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, 512, 512);

    const rows = 8;
    const cols = 8;
    const tileSize = 512 / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bx = c * tileSize + 2;
        const by = r * tileSize + 2;
        const bw = tileSize - 4;
        const bh = tileSize - 4;

        // Bề mặt viên gạch nổi cao
        ctx.fillStyle = '#e6e6e6';
        ctx.fillRect(bx, by, bw, bh);

        // Vát cạnh nghiêng (Bevel gradient)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(bx + 2, by + 2, bw - 4, bh - 4);

        // Hạt vi nhám đất nung
        for (let p = 0; p < 18; p++) {
          const px = bx + 4 + Math.random() * (bw - 8);
          const py = by + 4 + Math.random() * (bh - 8);
          ctx.fillStyle = Math.random() > 0.5 ? '#cccccc' : '#f5f5f5';
          ctx.fillRect(px, py, 2, 2);
        }
      }
    }
    return this.createNormalMapFromHeightCanvas(canvas, 2.2);
  }

  // Normal Map cho lối đi Terrazzo: rãnh nối đá bo tròn, bề mặt đá hạt nổi khối
  createWalkwayTerrazzoNormalTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Nền vữa lún
    ctx.fillStyle = '#1c1c1c';
    ctx.fillRect(0, 0, 512, 512);

    const rows = 8;
    const cols = 4;
    const blockW = 512 / cols;
    const blockH = 512 / rows;

    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (blockW / 2);
      for (let c = -1; c < cols + 1; c++) {
        const sx = c * blockW + offset + 3;
        const sy = r * blockH + 3;
        const sw = blockW - 6;
        const sh = blockH - 6;

        ctx.fillStyle = '#d8d8d8';
        ctx.beginPath();
        ctx.roundRect(sx, sy, sw, sh, 6);
        ctx.fill();

        // Vi hạt đá cẩm thạch terrazzo
        for (let g = 0; g < 22; g++) {
          const gx = sx + 4 + Math.random() * (sw - 8);
          const gy = sy + 4 + Math.random() * (sh - 8);
          ctx.fillStyle = Math.random() > 0.5 ? '#b8b8b8' : '#efefef';
          ctx.fillRect(gx, gy, 2, 2);
        }
      }
    }
    return this.createNormalMapFromHeightCanvas(canvas, 1.8);
  }

  // Normal Map cho sàn gạch bông hoa cương lớp học 5C4: ron gạch tinh xảo & gờ hoa sen
  createClassroomMarbleStoneFloorNormalTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Rãnh chỉ gạch chìm
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, 512, 512);

    const rows = 4;
    const cols = 4;
    const tileSize = 512 / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * tileSize;
        const y = r * tileSize;
        const pad = 3;
        const w = tileSize - pad * 2;
        const h = tileSize - pad * 2;

        ctx.fillStyle = '#eeeeee';
        ctx.fillRect(x + pad, y + pad, w, h);

        // Khung viền chỉ chìm/nổi
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + pad + 6, y + pad + 6, w - 12, h - 12);

        // Hoa văn tâm nổi nhẹ
        const centerX = x + pad + w / 2;
        const centerY = y + pad + h / 2;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    return this.createNormalMapFromHeightCanvas(canvas, 1.3);
  }

  // Normal Map gợn sóng nước PBR động cho Đài Phun Nước & Hồ Câu Cá
  createWaterNormalTexture(size = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const u = (x / size) * Math.PI * 8;
        const v = (y / size) * Math.PI * 8;
        const wave = Math.sin(u * 1.5 + v * 0.8) * 0.4 +
                     Math.cos(u * 0.9 - v * 1.6) * 0.35 +
                     Math.sin((u + v) * 2.1) * 0.25;
        const hVal = Math.floor((wave * 0.5 + 0.5) * 255);
        const idx = (y * size + x) * 4;
        data[idx] = hVal;
        data[idx + 1] = hVal;
        data[idx + 2] = hVal;
        data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return this.createNormalMapFromHeightCanvas(canvas, 2.5);
  }

  createRedCourtyardBrickTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Nền mạch vữa gạch xám ấm dịu mắt
    ctx.fillStyle = '#57534e';
    ctx.fillRect(0, 0, 512, 512);

    const rows = 8;
    const cols = 8;
    const tileSize = 512 / rows;
    // Bảng màu gạch nung đất sét Đông Dương ấm áp, dịu mắt, hoàn toàn không bị chói lóa hay quá tương phản
    const brickPalette = ['#b45309', '#a16207', '#9a3412', '#a85d38', '#92400e'];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bx = c * tileSize + 2;
        const by = r * tileSize + 2;
        const bw = tileSize - 4;
        const bh = tileSize - 4;

        ctx.fillStyle = brickPalette[(r * 5 + c * 3) % brickPalette.length];
        ctx.fillRect(bx, by, bw, bh);

        // Viền bóng vát nhẹ nhàng tự nhiên, giảm độ tương phản gắt
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fillRect(bx, by, bw, 3);
        ctx.fillRect(bx, by, 3, bh);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
        ctx.fillRect(bx, by + bh - 3, bw, 3);
        ctx.fillRect(bx + bw - 3, by, 3, bh);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  createWalkwayTerrazzoTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Nền vữa đá hoa cương Indochine ấm áp
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, 512, 512);

    // Phiến đá lát sole phong cách lối đi công viên cao cấp
    const rows = 8;
    const cols = 4;
    const blockW = 512 / cols;
    const blockH = 512 / rows;
    const stoneHues = ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#f3f4f6'];

    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (blockW / 2);
      for (let c = -1; c < cols + 1; c++) {
        const sx = c * blockW + offset + 3;
        const sy = r * blockH + 3;
        const sw = blockW - 6;
        const sh = blockH - 6;

        ctx.fillStyle = stoneHues[(r * 3 + Math.abs(c * 2)) % stoneHues.length];
        ctx.beginPath();
        ctx.roundRect(sx, sy, sw, sh, 6);
        ctx.fill();

        // Viền vát cạnh nổi 3D (Bevel highlight & shadow)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx + 4, sy + sh);
        ctx.lineTo(sx + 4, sy + 4);
        ctx.lineTo(sx + sw, sy + 4);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.beginPath();
        ctx.moveTo(sx + sw - 2, sy + 4);
        ctx.lineTo(sx + sw - 2, sy + sh - 2);
        ctx.lineTo(sx + 4, sy + sh - 2);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 8);
    return tex;
  }

  // ------------------------------------------------------------
  // SÀN GẠCH ỐP ĐÁ HOA CƯƠNG / GẠCH HOÀNG GIA MARBLE CHO PHÒNG HỌC 5C4
  // Khắc phục hoàn toàn lỗi sàn trắng tinh gây chói lóa mắt
  // Họa tiết hoa văn Indochine ấm áp, sang trọng, vân đá tự nhiên
  // ------------------------------------------------------------
  createClassroomMarbleStoneFloorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Đường ron vữa gạch sẫm màu tự nhiên
    ctx.fillStyle = '#451a03'; // Nâu đất đậm
    ctx.fillRect(0, 0, 512, 512);

    const rows = 4;
    const cols = 4;
    const tileSize = 512 / rows; // 128px mỗi viên gạch đá hoa cương

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * tileSize;
        const y = r * tileSize;
        const pad = 3;
        const w = tileSize - pad * 2;
        const h = tileSize - pad * 2;

        // Màu nền gạch đá cẩm thạch Crema Marfil ấm áp, sang trọng, dịu mắt
        const isAlt = (r + c) % 2 === 1;
        const baseGrad = ctx.createLinearGradient(x + pad, y + pad, x + pad + w, y + pad + h);
        if (isAlt) {
          baseGrad.addColorStop(0, '#fef3c7'); // Vàng kem ấm
          baseGrad.addColorStop(0.5, '#fde68a'); // Vàng cát mịn
          baseGrad.addColorStop(1, '#fef08a');
        } else {
          baseGrad.addColorStop(0, '#fef9c3'); // Kem sáng dịu
          baseGrad.addColorStop(0.5, '#fef08a');
          baseGrad.addColorStop(1, '#fde68a');
        }
        ctx.fillStyle = baseGrad;
        ctx.fillRect(x + pad, y + pad, w, h);

        // Đường vân đá cẩm thạch tự nhiên (Marble Veining)
        ctx.save();
        ctx.strokeStyle = 'rgba(180, 83, 9, 0.16)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        const vx1 = x + pad + (r * 17) % 30;
        const vy1 = y + pad;
        const vx2 = x + pad + w - (c * 19) % 30;
        const vy2 = y + pad + h;
        ctx.moveTo(vx1, vy1);
        ctx.bezierCurveTo(vx1 + 35, vy1 + 25, vx2 - 25, vy2 - 40, vx2, vy2);
        ctx.stroke();

        // Nhánh vân đá nhỏ
        ctx.strokeStyle = 'rgba(146, 64, 14, 0.12)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(vx1 + 20, vy1 + 18);
        ctx.lineTo(vx1 + 45, vy1 + 55);
        ctx.stroke();
        ctx.restore();

        // Khung viền chỉ gạch hoa cương (Inner Stone Inlay Border)
        ctx.strokeStyle = 'rgba(180, 83, 9, 0.35)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + pad + 6, y + pad + 6, w - 12, h - 12);

        // Góc hoa văn góc gạch (Corner Accent Dots)
        const corners = [
          [x + pad + 10, y + pad + 10],
          [x + pad + w - 10, y + pad + 10],
          [x + pad + 10, y + pad + h - 10],
          [x + pad + w - 10, y + pad + h - 10]
        ];
        ctx.fillStyle = '#b45309';
        corners.forEach(([cx, cy]) => {
          ctx.beginPath();
          ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Họa tiết hoa văn hoa sen / gạch bông cổ điển ở tâm mỗi viên gạch
        const centerX = x + pad + w / 2;
        const centerY = y + pad + h / 2;

        ctx.save();
        ctx.translate(centerX, centerY);

        // Vòng tròn trung tâm
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.stroke();

        // 4 cánh hoa sen hoa văn trường học
        ctx.fillStyle = isAlt ? 'rgba(217, 119, 6, 0.32)' : 'rgba(180, 83, 9, 0.28)';
        for (let a = 0; a < 4; a++) {
          ctx.beginPath();
          ctx.ellipse(0, 10, 5, 8, a * Math.PI / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.rotate(Math.PI / 2);
        }

        // Nhụy hoa trung tâm
        ctx.fillStyle = '#92400e';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Hiệu ứng vát bóng 3D viên gạch (Bevel Highlight & Shadow)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fillRect(x + pad, y + pad, w, 2);
        ctx.fillRect(x + pad, y + pad, 2, h);

        ctx.fillStyle = 'rgba(69, 26, 3, 0.3)';
        ctx.fillRect(x + pad, y + pad + h - 2, w, 2);
        ctx.fillRect(x + pad + w - 2, y + pad, 2, h);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(12, 11);
    return tex;
  }

  // ------------------------------------------------------------
  // HOA VĂN GIẤY DÁN TƯỜNG PHÒNG HỌC 5C4 (CLASSROOM WALLPAPER)
  // Xóa bỏ hoàn toàn tường trắng toát - Thay bằng hoa văn gấm hoàng gia ấm áp
  // ------------------------------------------------------------
  createClassroomWallpaperTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Nền giấy dán tường màu vàng kem ấm áp, dịu mắt
    ctx.fillStyle = '#fefce8';
    ctx.fillRect(0, 0, 512, 512);

    // Kẻ sọc nhung thanh lịch (Subtle Vertical Velvet Pinstripes)
    ctx.fillStyle = 'rgba(254, 240, 138, 0.45)';
    for (let x = 0; x < 512; x += 32) {
      ctx.fillRect(x, 0, 16, 512);
    }

    // Hoa văn gấm damask / dây lá cách điệu mềm mại học đường
    ctx.save();
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const cx = c * 128 + 64;
        const cy = r * 128 + 64;

        ctx.save();
        ctx.translate(cx, cy);

        // Cuống lá và hoa văn acanthus
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.25)';
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';

        // Cành uốn trái & phải
        ctx.beginPath();
        ctx.moveTo(0, 24);
        ctx.quadraticCurveTo(-20, 0, 0, -24);
        ctx.quadraticCurveTo(20, 0, 0, 24);
        ctx.stroke();

        // Hoa sen nở trên đỉnh
        ctx.fillStyle = 'rgba(202, 138, 4, 0.32)';
        ctx.beginPath();
        ctx.ellipse(0, -24, 7, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(-10, -20, 5, 9, -0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(10, -20, 5, 9, 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Lá đối xứng bên hông
        ctx.fillStyle = 'rgba(180, 83, 9, 0.22)';
        ctx.beginPath();
        ctx.ellipse(-16, 2, 8, 4, -0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(16, 2, 8, 4, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Hạt ngọc trung tâm
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 2);
    return tex;
  }

  // ------------------------------------------------------------
  // TEXTURE GẠCH NUNG ĐỎ ẤM ÁP MẶT NGOÀI TRƯỜNG HỌC (VINTAGE BRICK FACADE)
  // Xóa bỏ hoàn toàn màu tường trắng toát ngoài sân trường
  // ------------------------------------------------------------
  createExteriorBrickTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Nền gạch nung đỏ gốm Đông Dương ấm áp (#9a3412)
    ctx.fillStyle = '#9a3412';
    ctx.fillRect(0, 0, 512, 512);

    // Kẻ các hàng gạch nung đan so le
    const rowH = 32;
    const colW = 64;
    for (let y = 0; y < 512; y += rowH) {
      const isShifted = (Math.floor(y / rowH) % 2 === 1);
      const startX = isShifted ? -colW / 2 : 0;

      // Đường vữa xi măng nằm ngang
      ctx.fillStyle = '#451a03';
      ctx.fillRect(0, y, 512, 4);

      for (let x = startX; x < 512 + colW; x += colW) {
        // Từng viên gạch có độ sắc thái ngẫu nhiên (nâu đỏ, cam gốm, vàng đất)
        const shade = Math.sin(x * 12.3 + y * 45.6) * 0.5 + 0.5;
        ctx.fillStyle = shade > 0.6 ? '#c2410c' : (shade > 0.3 ? '#9a3412' : '#7c2d12');
        ctx.fillRect(x + 2, y + 4, colW - 4, rowH - 4);

        // Vết nung gốm tự nhiên
        ctx.fillStyle = 'rgba(254, 215, 170, 0.12)';
        ctx.fillRect(x + 4, y + 6, colW - 8, 4);

        // Đường vữa dọc
        ctx.fillStyle = '#451a03';
        ctx.fillRect(x, y + 4, 3, rowH - 4);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 3);
    return tex;
  }

  // ------------------------------------------------------------
  // TRANH TƯỜNG NGOÀI HỆ GEN Z (BÊN TRÁI CỔNG): CAPYBARA CHILL & DUOLINGO SLAYYY
  // Phong cách Street-Art Graffiti rực rỡ, vui nhộn, đậm chất học đường 2026
  // ------------------------------------------------------------
  createGenZStreetArtTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // Nền chuyển màu Royal Indigo & Cyber Night (#0f172a -> #1e1b4b -> #312e81)
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 768);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(0.5, '#1e1b4b');
    bgGrad.addColorStop(1, '#312e81');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 768);

    // Họa tiết Memphis năng động (chữ thập cyan, tam giác vàng, sóng lượn hồng)
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)';
    ctx.lineWidth = 4;
    for (let i = 0; i < 18; i++) {
      const px = (i * 97) % 1000 + 20;
      const py = (i * 123) % 720 + 20;
      ctx.beginPath();
      ctx.moveTo(px - 10, py); ctx.lineTo(px + 10, py);
      ctx.moveTo(px, py - 10); ctx.lineTo(px, py + 10);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(244, 114, 182, 0.35)';
    for (let i = 0; i < 12; i++) {
      const px = (i * 143) % 980 + 30;
      const py = (i * 89) % 700 + 40;
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 1. CHÀNG CAPYBARA CHILL VÔ TRI (CAPYBARA MASCOT ĐEO KÍNH RÂM & UỐNG TRÀ SỮA)
    ctx.save();
    const capX = 260;
    const capY = 460;

    // Thân capybara mập ú tròn xoe
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.ellipse(capX, capY, 170, 130, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Bụng mềm màu kem
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.ellipse(capX - 20, capY + 30, 110, 80, 0, 0, Math.PI * 2);
    ctx.fill();

    // Đầu Capybara hình hộp bầu
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.roundRect(capX - 170, capY - 140, 170, 150, 45);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Tai nhỏ xinh
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(capX - 10, capY - 130, 22, 0, Math.PI * 2);
    ctx.fill();

    // Quả cam Yuzu / Quýt vàng trên đầu có cuống lá
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.arc(capX - 90, capY - 170, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.ellipse(capX - 90, capY - 205, 14, 8, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Kính râm đen siêu ngầu với ánh phản chiếu neon
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(capX - 165, capY - 95, 75, 42, 10);
    ctx.roundRect(capX - 80, capY - 95, 75, 42, 10);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 5;
    ctx.stroke();
    // Vạch phản quang tím kính râm
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(capX - 150, capY - 88); ctx.lineTo(capX - 105, capY - 60);
    ctx.moveTo(capX - 65, capY - 88); ctx.lineTo(capX - 20, capY - 60);
    ctx.stroke();

    // Mũi và miệng chữ Y thong thả
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(capX - 170, capY - 30); ctx.lineTo(capX - 150, capY - 30);
    ctx.lineTo(capX - 150, capY - 15);
    ctx.stroke();

    // Ly Trà Sữa Trân Châu Đường Đen Capybara ôm trên tay
    const bobaX = capX + 90;
    const bobaY = capY - 20;
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(bobaX - 35, bobaY - 70);
    ctx.lineTo(bobaX + 35, bobaY - 70);
    ctx.lineTo(bobaX + 25, bobaY + 70);
    ctx.lineTo(bobaX - 25, bobaY + 70);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#9a3412';
    ctx.lineWidth = 6;
    ctx.stroke();
    // Ống hút to
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(bobaX, bobaY - 70); ctx.lineTo(bobaX + 15, bobaY - 120);
    ctx.stroke();
    // Trân châu đen
    ctx.fillStyle = '#451a03';
    for (let tr = 0; tr < 12; tr++) {
      const bx = bobaX - 16 + (tr % 4) * 11;
      const by = bobaY + 35 + Math.floor(tr / 4) * 11;
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    // Bong bóng thoại của Capybara
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(capX + 40, capY - 250, 310, 85, 20);
    ctx.fill();
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 24px "Nunito", sans-serif';
    ctx.fillText("Chill đi bạn ơi ~ 🧋", capX + 65, capY - 215);
    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 20px "Nunito", sans-serif';
    ctx.fillText("Tiếng Anh 5C4 dễ ẹc mà! ✨", capX + 65, capY - 185);
    ctx.restore();

    // 2. CHÚ CÚ XANH DUOLINGO HỌC CHĂM CHỈ 🦉
    ctx.save();
    const duoX = 840;
    const duoY = 490;
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(duoX, duoY, 95, 115, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#15803d';
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(duoX, duoY + 35, 55, 65, 0, 0, Math.PI * 2);
    ctx.fill();
    [-35, 35].forEach(ox => {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(duoX + ox, duoY - 35, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(duoX + ox, duoY - 35, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(duoX + ox - 5, duoY - 40, 6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.moveTo(duoX - 16, duoY - 8); ctx.lineTo(duoX + 16, duoY - 8); ctx.lineTo(duoX, duoY + 16);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(duoX - 100, duoY + 125, 200, 48, 14);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 20px "Nunito", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("🔥 STREAK 365 NGÀY!", duoX, duoY + 157);
    ctx.restore();

    // 3. DÒNG CHỮ GRAFFITI KHỔNG LỒ 3D BONG BÓNG: "GEN Z 5C4 SLAYYY ✨"
    ctx.save();
    ctx.textAlign = 'left';
    const grafText = "GEN Z 5C4 SLAYYY ✨";
    const gx = 70;
    const gy = 125;

    ctx.font = '900 78px "Impact", "Arial Black", sans-serif';
    ctx.fillStyle = '#090514';
    for (let d = 14; d >= 1; d--) {
      ctx.fillText(grafText, gx + d, gy + d);
    }
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 16;
    ctx.strokeText(grafText, gx, gy);

    const grafGrad = ctx.createLinearGradient(gx, gy - 60, gx + 850, gy);
    grafGrad.addColorStop(0, '#06b6d4');
    grafGrad.addColorStop(0.35, '#f43f5e');
    grafGrad.addColorStop(0.7, '#eab308');
    grafGrad.addColorStop(1, '#10b981');
    ctx.fillStyle = grafGrad;
    ctx.fillText(grafText, gx, gy);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 4;
    ctx.strokeText(grafText, gx - 2, gy - 2);
    ctx.restore();

    // 4. BỘ HUY HIỆU VÀ STICKER SLANG GEN Z
    const drawBadge = (bx, by, text, bg, border, rot = 0) => {
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(rot);
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.roundRect(-85, -24, 170, 48, 14);
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 21px "Nunito", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 0, 0);
      ctx.restore();
    };

    drawBadge(160, 205, "NO CAP 🧢", '#0284c7', '#38bdf8', -0.08);
    drawBadge(350, 205, "100% RIZZ 🔥", '#e11d48', '#fb7185', 0.06);
    drawBadge(550, 205, "FLEX 10 ĐIỂM 💯", '#15803d', '#4ade80', -0.05);
    drawBadge(760, 205, "CHILL GUY 🐾", '#b45309', '#fde047', 0.07);

    // 5. HASHTAG VÀ DÒNG CHỮ PHUN SƠN PHÍA DƯỚI
    ctx.fillStyle = '#a5b4fc';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText("#GenZ5C4  #SlayEnglish  #RobloxCampus  #Top1LopChuyen  #ChillingCapybara", 512, 735);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // ------------------------------------------------------------
  // TRANH TƯỜNG NGOÀI HỆ GEN Z (BÊN PHẢI CỔNG): POP CAT & GAMING POP-ART
  // Sunburst nổ tung năng lượng, Pop Cat hài hước, Pixel Game Boy, Slay mọi thử thách
  // ------------------------------------------------------------
  createGenZPopArtTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // Nền Pop-Art Sunburst tỏa tròn rực rỡ từ tâm (#581c87 & #b45309)
    const cx = 512;
    const cy = 384;
    ctx.fillStyle = '#581c87';
    ctx.fillRect(0, 0, 1024, 768);

    ctx.fillStyle = '#d97706';
    const numRays = 24;
    for (let r = 0; r < numRays; r++) {
      if (r % 2 === 0) {
        const a1 = (r * Math.PI * 2) / numRays;
        const a2 = ((r + 1) * Math.PI * 2) / numRays;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a1) * 900, cy + Math.sin(a1) * 900);
        ctx.lineTo(cx + Math.cos(a2) * 900, cy + Math.sin(a2) * 900);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Chấm bi Halftone Comic Pop-Art
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let px = 20; px < 1024; px += 36) {
      for (let py = 20; py < 768; py += 36) {
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 1. GIANT POP CAT MEME HÁ MIỆNG KHỔNG LỒ 🐱
    ctx.save();
    const catX = 260;
    const catY = 480;

    // Mặt mèo Pop Cat tròn trịa
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(catX, catY, 150, 140, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 9;
    ctx.stroke();

    // Hai tai mèo vểnh nhọn
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.moveTo(catX - 120, catY - 90); ctx.lineTo(catX - 80, catY - 190); ctx.lineTo(catX - 30, catY - 120);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(catX + 30, catY - 120); ctx.lineTo(catX + 80, catY - 190); ctx.lineTo(catX + 120, catY - 90);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Vành tai trong màu hồng phấn
    ctx.fillStyle = '#f472b6';
    ctx.beginPath();
    ctx.moveTo(catX - 105, catY - 95); ctx.lineTo(catX - 80, catY - 165); ctx.lineTo(catX - 45, catY - 115);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(catX + 45, catY - 115); ctx.lineTo(catX + 80, catY - 165); ctx.lineTo(catX + 105, catY - 95);
    ctx.closePath();
    ctx.fill();

    // Đôi mắt tròn xoe mở to ngơ ngác
    [-55, 55].forEach(ox => {
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(catX + ox, catY - 45, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(catX + ox - 5, catY - 50, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    // Miệng POP CAT há to
    ctx.fillStyle = '#831843';
    ctx.beginPath();
    ctx.ellipse(catX, catY + 40, 68, 72, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 8;
    ctx.stroke();
    // Lưỡi hồng
    ctx.fillStyle = '#fb7185';
    ctx.beginPath();
    ctx.arc(catX, catY + 75, 42, Math.PI, 0);
    ctx.fill();

    // Hiệu ứng chữ POP POP POP
    ctx.font = '900 48px "Impact", sans-serif';
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8;
    ctx.strokeText("POP!", catX - 220, catY - 100);
    ctx.fillText("POP!", catX - 220, catY - 100);
    ctx.strokeText("POP!", catX + 130, catY - 110);
    ctx.fillText("POP!", catX + 130, catY - 110);

    // Bong bóng thoại của Pop Cat: "SKIBIDI NO! ENGLISH YES!"
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(catX + 110, catY - 260, 390, 95, 22);
    ctx.fill();
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.fillStyle = '#e11d48';
    ctx.font = '900 30px "Nunito", sans-serif';
    ctx.fillText("SKIBIDI NO! 🚫", catX + 135, catY - 215);
    ctx.fillStyle = '#059669';
    ctx.font = '900 32px "Nunito", sans-serif';
    ctx.fillText("ENGLISH YES! 🏆✨", catX + 135, catY - 175);
    ctx.restore();

    // 2. STICKER GAMING & ICON GEN Z (TAY CẦM GAME, TIM PIXEL, SNEAKER)
    ctx.save();
    const gPadX = 750;
    const gPadY = 460;
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(gPadX, gPadY, 190, 115, 28);
    ctx.fill();
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 6;
    ctx.stroke();
    // D-Pad điều hướng
    ctx.fillStyle = '#475569';
    ctx.fillRect(gPadX + 30, gPadY + 45, 45, 16);
    ctx.fillRect(gPadX + 44, gPadY + 31, 16, 45);
    // Nút ABXY 4 màu
    const abxy = [['#ef4444', 130, 42], ['#3b82f6', 150, 60], ['#eab308', 110, 60], ['#22c55e', 130, 78]];
    abxy.forEach(([col, ox, oy]) => {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(gPadX + ox, gPadY + oy, 9, 0, Math.PI * 2);
      ctx.fill();
    });

    // Sticker: GIGACHAD STUDENT
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(660, 290, 310, 60, 16);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = '#fde047';
    ctx.font = '900 24px "Nunito", sans-serif';
    ctx.fillText("💪 GIGACHAD 10 ĐIỂM 😎", 685, 330);

    // Tim Pixel đỏ
    ctx.fillStyle = '#f43f5e';
    ctx.font = '54px sans-serif';
    ctx.fillText("💖", 920, 230);
    ctx.fillText("🔥", 600, 240);
    ctx.restore();

    // 3. TIÊU ĐỀ POP-ART KHỔNG LỒ: "HỌC TIẾNG ANH - BƯỚC RA THẾ GIỚI! 🚀"
    ctx.save();
    ctx.textAlign = 'left';
    const bannerText = "HỌC TIẾNG ANH • BƯỚC RA THẾ GIỚI 🚀";
    const bx = 65;
    const by = 120;

    ctx.font = '900 60px "Impact", sans-serif';
    ctx.fillStyle = '#1e1b4b';
    for (let d = 12; d >= 1; d--) {
      ctx.fillText(bannerText, bx + d, by + d);
    }
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 14;
    ctx.strokeText(bannerText, bx, by);
    ctx.fillStyle = '#fef08a';
    ctx.fillText(bannerText, bx, by);
    ctx.restore();

    // 4. KHUNG POLAROID: KỶ NIỆM 5C4 VÔ ĐỊCH
    ctx.save();
    ctx.translate(680, 660);
    ctx.rotate(0.04);
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(-140, -50, 280, 95, 12);
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px "Nunito", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("📸 5C4 Besties Forever ✨", 0, -10);
    ctx.fillStyle = '#64748b';
    ctx.font = '16px "Nunito", sans-serif';
    ctx.fillText("Niên khóa 2025 - 2026", 0, 20);
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // ------------------------------------------------------------
  // BIỂN ĐÈN NEON CYBER MARQUEE LIGHTBOX TRÊN CỔNG VÒM CHÍNH (Z = 18.0)
  // Đèn LED neon phát sáng rực rỡ chào đón các em học sinh vào lớp 5C4
  // ------------------------------------------------------------
  createGenZNeonMarqueeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Nền hộp đèn kim loại Cyber đen bóng (#090d16)
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, 1024, 256);

    // Khung đèn viền đôi LED phát quang
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 1004, 236);

    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 984, 216);

    // 4 Đèn LED chốt góc vàng kim
    ctx.fillStyle = '#fef08a';
    [[30, 30], [994, 30], [30, 226], [994, 226]].forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.fill();
    });

    // Hàng 1: TRƯỜNG TIỂU HỌC 5C4 • LỚP CHUYÊN ANH
    ctx.textAlign = 'center';
    ctx.font = '900 32px "Nunito", sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 14;
    ctx.fillText("⭐⭐⭐ TRƯỜNG TIỂU HỌC 5C4 • LỚP CHUYÊN ANH ⭐⭐⭐", 512, 68);

    // Hàng 2: GEN Z CREATIVE HUB & ENGLISH ARENA
    ctx.font = '900 52px "Impact", "Arial Black", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 22;
    ctx.fillText("🔥 GEN Z CREATIVE HUB • ENGLISH ARENA 🔥", 512, 142);

    // Hàng 3: ROBLOX CAMPUS • THẦY TUẤN & BÉ HÀ MY
    ctx.font = 'bold 28px "Nunito", sans-serif';
    ctx.fillStyle = '#f43f5e';
    ctx.shadowColor = '#fb7185';
    ctx.shadowBlur = 12;
    ctx.fillText("🎮 ROBLOX 3D CAMPUS • THẦY TUẤN & BÉ HÀ MY SLAYYY 🎮", 512, 205);

    ctx.shadowBlur = 0;
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // ------------------------------------------------------------
  // TRANH TƯỜNG NGOẠI THẤT LỚP TOÁN GEN Z (BÊN TRÁI): VŨ TRỤ HÌNH HỌC & MÈO CYBER
  // Kích thước 1024x768, phong cách Pop-Art & Cyber Math rực rỡ
  // ------------------------------------------------------------
  createGenZMathMuralLeftTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // Nền chuyển màu Cyber Emerald & Deep Indigo (#022c22 -> #064e3b -> #0f766e -> #1e1b4b)
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 768);
    bgGrad.addColorStop(0, '#022c22');
    bgGrad.addColorStop(0.35, '#064e3b');
    bgGrad.addColorStop(0.7, '#0f766e');
    bgGrad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 768);

    // Lưới tọa độ Toán học Cyber Grid (Cyan & Neon Mint)
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.22)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 1024; x += 48) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 768); ctx.stroke();
    }
    for (let y = 0; y < 768; y += 48) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
    }

    // Đồ thị hàm sóng sin uốn lượn neon vàng chanh
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.65)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let x = 0; x < 1024; x += 8) {
      const y = 380 + Math.sin(x * 0.015) * 65 + Math.cos(x * 0.008) * 35;
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Các ký hiệu Toán học lơ lửng neon phát sáng: π, ∑, √x, ∞, Δ, %
    const mathSymbols = [
      { s: 'π = 3.14', x: 120, y: 190, col: '#38bdf8', sz: 32 },
      { s: '∑', x: 420, y: 170, col: '#f472b6', sz: 48 },
      { s: '√x²', x: 720, y: 180, col: '#34d399', sz: 36 },
      { s: '∞', x: 890, y: 230, col: '#facc15', sz: 54 },
      { s: 'S = r² × 3.14', x: 140, y: 690, col: '#a78bfa', sz: 28 },
      { s: 'v = s : t', x: 830, y: 680, col: '#fb7185', sz: 32 }
    ];
    mathSymbols.forEach(ms => {
      ctx.font = `bold ${ms.sz}px "Nunito", sans-serif`;
      ctx.fillStyle = ms.col;
      ctx.fillText(ms.s, ms.x, ms.y);
    });

    // 1. MÈO CYBER MATH CHIBI (NEKO MASCOT ĐEO KÍNH VUÔNG & ĐỘI MŨ CỬ NHÂN CẦM COMPA)
    ctx.save();
    const catX = 280;
    const catY = 470;

    // Khối Rubik 3D phát sáng dưới chân mèo
    const rubikX = catX - 30;
    const rubikY = catY + 90;
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(rubikX - 70, rubikY - 50, 140, 100, 16);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 6;
    ctx.stroke();
    // Các ô màu rubik
    const rColors = ['#ef4444', '#3b82f6', '#22c55e', '#facc15', '#f97316', '#a855f7'];
    for (let rx = 0; rx < 3; rx++) {
      for (let ry = 0; ry < 2; ry++) {
        ctx.fillStyle = rColors[(rx + ry * 3) % rColors.length];
        ctx.beginPath();
        ctx.roundRect(rubikX - 60 + rx * 42, rubikY - 40 + ry * 42, 36, 36, 8);
        ctx.fill();
      }
    }

    // Thân mèo tròn mập ú màu trắng kem
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(catX, catY, 130, 120, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Bụng mềm màu vàng kem
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(catX, catY + 25, 80, 70, 0, 0, Math.PI * 2);
    ctx.fill();

    // Đầu mèo Chibi
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(catX, catY - 110, 125, 105, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Tai mèo nhọn màu hồng bên trong
    [-85, 85].forEach(tx => {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(catX + tx * 0.4, catY - 200);
      ctx.lineTo(catX + tx, catY - 260);
      ctx.lineTo(catX + tx * 1.1, catY - 160);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#f472b6';
      ctx.beginPath();
      ctx.moveTo(catX + tx * 0.5, catY - 195);
      ctx.lineTo(catX + tx * 0.9, catY - 240);
      ctx.lineTo(catX + tx * 0.95, catY - 170);
      ctx.closePath();
      ctx.fill();
    });

    // Mũ cử nhân mini màu tím đen trên đầu
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.moveTo(catX, catY - 275);
    ctx.lineTo(catX + 75, catY - 245);
    ctx.lineTo(catX, catY - 215);
    ctx.lineTo(catX - 75, catY - 245);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 5;
    ctx.stroke();
    // Tua rua vàng
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(catX, catY - 245, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(catX, catY - 245); ctx.lineTo(catX + 60, catY - 225);
    ctx.stroke();

    // Kính cận gọng tròn to phong cách học bá
    [-45, 45].forEach(kx => {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.beginPath();
      ctx.arc(catX + kx, catY - 110, 34, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 6;
      ctx.stroke();
      // Mắt cười híp tít bên trong
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(catX + kx, catY - 105, 18, Math.PI + 0.3, Math.PI * 2 - 0.3);
      ctx.stroke();
    });
    // Cầu nối kính
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(catX - 12, catY - 110); ctx.lineTo(catX + 12, catY - 110);
    ctx.stroke();

    // Mũi tam giác hồng và miệng chữ W siêu cute
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.moveTo(catX - 8, catY - 78); ctx.lineTo(catX + 8, catY - 78); ctx.lineTo(catX, catY - 70);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(catX - 14, catY - 62, 14, 0, Math.PI);
    ctx.arc(catX + 14, catY - 62, 14, 0, Math.PI);
    ctx.stroke();

    // Má hồng đào
    ctx.fillStyle = 'rgba(251, 113, 133, 0.55)';
    ctx.beginPath();
    ctx.arc(catX - 75, catY - 80, 18, 0, Math.PI * 2);
    ctx.arc(catX + 75, catY - 80, 18, 0, Math.PI * 2);
    ctx.fill();

    // Compa vàng kim trên tay mèo
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(catX + 115, catY + 10); ctx.lineTo(catX + 175, catY - 70);
    ctx.lineTo(catX + 195, catY + 30);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(catX + 175, catY - 70, 14, 0, Math.PI * 2);
    ctx.fill();

    // Bong bóng thoại của Neko Math
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(catX + 75, catY - 260, 360, 95, 22);
    ctx.fill();
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.fillStyle = '#065f46';
    ctx.font = '900 25px "Nunito", sans-serif';
    ctx.fillText("Học Toán Không Quạo! 😎✨", catX + 100, catY - 215);
    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 22px "Nunito", sans-serif';
    ctx.fillText("Não Tự Nhảy Số • Điểm 10 Về Tay! 💯", catX + 100, catY - 180);
    ctx.restore();

    // 2. TIÊU ĐỀ POP-ART GRAFFITI KHỔNG LỒ 3D: "VŨ TRỤ HÌNH HỌC 5C4 🚀"
    ctx.save();
    ctx.textAlign = 'left';
    const titleText = "VŨ TRỤ HÌNH HỌC 5C4 🚀";
    const tx = 60;
    const ty = 120;
    ctx.font = '900 72px "Impact", "Arial Black", sans-serif';
    ctx.fillStyle = '#022c22';
    for (let d = 14; d >= 1; d--) {
      ctx.fillText(titleText, tx + d, ty + d);
    }
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 16;
    ctx.strokeText(titleText, tx, ty);

    const titleGrad = ctx.createLinearGradient(tx, ty - 50, tx + 800, ty);
    titleGrad.addColorStop(0, '#fde047');
    titleGrad.addColorStop(0.35, '#34d399');
    titleGrad.addColorStop(0.7, '#38bdf8');
    titleGrad.addColorStop(1, '#ec4899');
    ctx.fillStyle = titleGrad;
    ctx.fillText(titleText, tx, ty);
    ctx.restore();

    // 3. CÁC STICKER SLANG GEN Z NỔI BẬT
    const drawBadge = (bx, by, text, bg, border, rot = 0) => {
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(rot);
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.roundRect(-95, -24, 190, 48, 14);
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 20px "Nunito", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 0, 0);
      ctx.restore();
    };

    drawBadge(165, 235, "CÂN MỌI BÀI TOÁN 📐", '#0f766e', '#34d399', -0.06);
    drawBadge(385, 235, "100% RIZZ TOÁN 🔥", '#be123c', '#fb7185', 0.05);
    drawBadge(605, 235, "TỈ LỆ 10 ĐIỂM 💯", '#15803d', '#86efac', -0.04);
    drawBadge(825, 235, "EZ GAME MEOW 🐱", '#7c2d12', '#fde047', 0.06);

    // 4. HASHTAGS GEN Z DƯỚI CHÂN BỨC TRANH
    ctx.fillStyle = '#6ee7b7';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText("#LopToan5C4  #MathGenZ  #CoMaiSieuCute  #CanCaVuTruHinhHoc  #Top1LopChuyen", 512, 735);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // ------------------------------------------------------------
  // TRANH TƯỜNG NGOẠI THẤT LỚP TOÁN GEN Z (BÊN PHẢI): GEN Z CÂN MỌI PHƯƠNG TRÌNH
  // Kích thước 1024x768, phong cách Pop-Art Sunburst Sunset & Capybara Math Duo
  // ------------------------------------------------------------
  createGenZMathMuralRightTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');

    // Nền Pop-Art Sunburst Neon (#4c1d95 -> #831843 -> #b45309)
    const cx = 512;
    const cy = 384;
    ctx.fillStyle = '#3b0764';
    ctx.fillRect(0, 0, 1024, 768);

    ctx.fillStyle = '#831843';
    const numRays = 24;
    for (let r = 0; r < numRays; r++) {
      if (r % 2 === 0) {
        const a1 = (r * Math.PI * 2) / numRays;
        const a2 = ((r + 1) * Math.PI * 2) / numRays;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a1) * 900, cy + Math.sin(a1) * 900);
        ctx.lineTo(cx + Math.cos(a2) * 900, cy + Math.sin(a2) * 900);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Chấm bi Halftone Pop-Art
    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
    for (let px = 20; px < 1024; px += 36) {
      for (let py = 20; py < 768; py += 36) {
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 1. CAPYBARA HỌC BÁ & GẤU TRÚC MATH DUO
    ctx.save();
    const capX = 280;
    const capY = 480;

    // Thân Capybara tròn xoe màu nâu ấm
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.ellipse(capX, capY, 150, 120, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Bụng mềm
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.ellipse(capX - 20, capY + 25, 95, 70, 0, 0, Math.PI * 2);
    ctx.fill();

    // Đầu Capybara
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.roundRect(capX - 150, capY - 130, 150, 130, 40);
    ctx.fill();
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Kính râm đen ngầu
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(capX - 145, capY - 90, 65, 38, 10);
    ctx.roundRect(capX - 70, capY - 90, 65, 38, 10);
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Quả cam Yuzu trên đầu
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.arc(capX - 75, capY - 155, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.ellipse(capX - 75, capY - 185, 12, 7, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Máy tính Casio hồng neon trên tay Capybara
    const calcX = capX + 90;
    const calcY = capY - 15;
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.roundRect(calcX - 45, calcY - 60, 90, 120, 14);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.stroke();
    // Màn hình LCD máy tính: "10.0"
    ctx.fillStyle = '#bbf7d0';
    ctx.beginPath();
    ctx.roundRect(calcX - 35, calcY - 50, 70, 30, 6);
    ctx.fill();
    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 20px "Courier New", monospace';
    ctx.textAlign = 'right';
    ctx.fillText("10.0", calcX + 30, calcY - 28);

    // Bong bóng thoại Capybara
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(capX + 45, capY - 250, 360, 95, 22);
    ctx.fill();
    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.fillStyle = '#9f1239';
    ctx.font = '900 26px "Nunito", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText("Tỉ Lệ Đậu Thủ Khoa: 100%! 📊", capX + 68, capY - 208);
    ctx.fillStyle = '#7c2d12';
    ctx.font = 'bold 22px "Nunito", sans-serif';
    ctx.fillText("5C4 Mãi Đỉnh • Không Cần Bàn Cãi! 🏆", capX + 68, capY - 172);
    ctx.restore();

    // 2. CHÚ GẤU TRÚC PANDA BÁC HỌC CẦM THƯỚC Ê-KE
    ctx.save();
    const panX = 820;
    const panY = 480;

    // Thân Panda
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(panX, panY, 110, 120, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Hai tay đen ôm thước
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(panX - 90, panY + 10, 35, 60, 0.4, 0, Math.PI * 2);
    ctx.ellipse(panX + 90, panY + 10, 35, 60, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Đầu Panda
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.ellipse(panX, panY - 110, 105, 95, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Hai tai tròn đen
    [-75, 75].forEach(ox => {
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(panX + ox, panY - 190, 32, 0, Math.PI * 2);
      ctx.fill();
    });

    // Mắt Panda có quầng thâm đen đặc trưng
    [-40, 40].forEach(ox => {
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(panX + ox, panY - 110, 26, 34, ox > 0 ? -0.3 : 0.3, 0, Math.PI * 2);
      ctx.fill();
      // Mắt trắng long lanh
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(panX + ox, panY - 115, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(panX + ox, panY - 115, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Thước Ê-ke gỗ khổng lồ
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.moveTo(panX - 110, panY + 90);
    ctx.lineTo(panX - 30, panY - 40);
    ctx.lineTo(panX - 30, panY + 90);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.restore();

    // 3. TIÊU ĐỀ POP-ART KHỔNG LỒ 3D: "GEN Z CÂN MỌI PHƯƠNG TRÌNH ⚡"
    ctx.save();
    ctx.textAlign = 'left';
    const bannerTitle = "GEN Z CÂN MỌI PHƯƠNG TRÌNH ⚡";
    const bx = 65;
    const by = 120;
    ctx.font = '900 66px "Impact", "Arial Black", sans-serif';
    ctx.fillStyle = '#1e1b4b';
    for (let d = 14; d >= 1; d--) {
      ctx.fillText(bannerTitle, bx + d, by + d);
    }
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 16;
    ctx.strokeText(bannerTitle, bx, by);

    const bannerGrad = ctx.createLinearGradient(bx, by - 50, bx + 850, by);
    bannerGrad.addColorStop(0, '#f43f5e');
    bannerGrad.addColorStop(0.35, '#fb923c');
    bannerGrad.addColorStop(0.7, '#fde047');
    bannerGrad.addColorStop(1, '#a855f7');
    ctx.fillStyle = bannerGrad;
    ctx.fillText(bannerTitle, bx, by);
    ctx.restore();

    // 4. BỘ HUY HIỆU VÀ STICKER SLANG GEN Z
    const drawBadge2 = (bx, by, text, bg, border, rot = 0) => {
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(rot);
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.roundRect(-95, -24, 190, 48, 14);
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 20px "Nunito", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 0, 0);
      ctx.restore();
    };

    drawBadge2(165, 235, "GIGACHAD TÍNH NHẨM 🧠", '#7c3aed', '#c084fc', -0.05);
    drawBadge2(385, 235, "NO CAP TOÁN 5 🧢", '#0284c7', '#38bdf8', 0.06);
    drawBadge2(605, 235, "SLAYYY ĐẲNG THỨC 💅", '#db2777', '#f472b6', -0.05);
    drawBadge2(825, 235, "HÀ MY TOP 1 🥇", '#d97706', '#fde047', 0.07);

    // 5. HASHTAGS GEN Z DƯỚI CHÂN BỨC TRANH
    ctx.fillStyle = '#fbcfe8';
    ctx.font = 'bold 22px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText("#GenZMathematician  #5C4MathSquad  #TuDuySieuCap  #RobloxMathCampus  #Slay10Diem", 512, 735);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // ------------------------------------------------------------
  // BIỂN ĐÈN NEON CYBER MARQUEE LIGHTBOX TRÊN CỔNG VÒM PHÒNG TOÁN (Z = 18.0)
  // Đèn LED neon phát sáng rực rỡ chào đón các em học sinh vào lớp Toán 5C4
  // ------------------------------------------------------------
  createGenZMathNeonMarqueeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Nền hộp đèn kim loại Cyber xanh rêu đen bóng (#022c22)
    ctx.fillStyle = '#022c22';
    ctx.fillRect(0, 0, 1024, 256);

    // Khung đèn viền đôi LED phát quang (Neon Emerald & Neon Gold)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 1004, 236);

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 984, 216);

    // 4 Đèn LED chốt góc vàng kim
    ctx.fillStyle = '#fef08a';
    [[30, 30], [994, 30], [30, 226], [994, 226]].forEach(([px, py]) => {
      ctx.beginPath();
      ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.fill();
    });

    // Hàng 1: TRƯỜNG TIỂU HỌC 5C4 • PHÒNG HỌC TOÁN ĐẲNG CẤP
    ctx.textAlign = 'center';
    ctx.font = '900 32px "Nunito", sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.shadowColor = '#eab308';
    ctx.shadowBlur = 14;
    ctx.fillText("⭐⭐⭐ TRƯỜNG TIỂU HỌC 5C4 • PHÒNG HỌC TOÁN ĐẲNG CẤP ⭐⭐⭐", 512, 68);

    // Hàng 2: GEN Z MATH ACADEMY • CÔ NGUYỄN THỊ MAI
    ctx.font = '900 52px "Impact", "Arial Black", sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 22;
    ctx.fillText("⚡ GEN Z MATH ACADEMY • CÔ NGUYỄN THỊ MAI ⚡", 512, 142);

    // Hàng 3: VŨ TRỤ HÌNH HỌC 3D • TƯ DUY TOÁN HỌC ĐỈNH CAO
    ctx.font = 'bold 28px "Nunito", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;
    ctx.fillText("📐 VŨ TRỤ HÌNH HỌC 3D • BÉ HÀ MY & 5C4 NÃO TỰ NHẢY SỐ 🚀", 512, 205);

    ctx.shadowBlur = 0;
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  // ------------------------------------------------------------
  // HỆ THỐNG GƯƠNG MẶT CHIBI ANIME & VẼ TEXTURE SẮC NÉT (CANVAS 512x512)
  // ------------------------------------------------------------
  // KHUÔN MẶT BÉ HÀ MY 3D CHIBI ĐỘ PHÂN GIẢI CAO (1024x1024 HD)
  // Tái hiện chính xác 100% thần thái từ ảnh 3D mẫu media_1791045835486.jpg:
  // - Đôi mắt to tròn long lanh hổ phách, viền mí kép cong vút, 3 tầng catchlights lấp lánh
  // - Má hồng ửng đào e ấp với 2 đốm sáng trắng lấp lánh trên mỗi gò má
  // - Mũi nhỏ xíu chúm chím có vệt sáng bóng 3D
  // - Nụ cười ngọt ngào duyên dáng có lúm đồng tiền
  // - Tóc mái xéo hạt dẻ uốn lượn mềm mại ôm trán
  // - Quai nón hồng sen ôm cằm nối liền nón quai thao
  // ------------------------------------------------------------
  createHaMyHDFaceCanvas(isBlink = false) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1024, 1024);

    // 1. Lớp bóng mịn da em bé Chibi (Rosy warm baby skin tone)
    const skinGrad = ctx.createRadialGradient(512, 530, 80, 512, 530, 480);
    skinGrad.addColorStop(0, 'rgba(255, 237, 213, 0.45)');
    skinGrad.addColorStop(0.7, 'rgba(254, 215, 170, 0.30)');
    skinGrad.addColorStop(1, 'rgba(253, 186, 116, 0.0)');
    ctx.fillStyle = skinGrad;
    ctx.beginPath();
    ctx.arc(512, 530, 480, 0, Math.PI * 2);
    ctx.fill();

    // 2. Tóc mái xéo hạt dẻ bồng bềnh uốn cong mềm mại (Side-swept Bangs)
    ctx.save();
    ctx.fillStyle = '#291507';
    ctx.beginPath();
    ctx.moveTo(80, 0);
    ctx.lineTo(944, 0);
    ctx.lineTo(950, 170);
    ctx.bezierCurveTo(900, 245, 810, 265, 750, 260);
    ctx.bezierCurveTo(700, 255, 660, 228, 620, 248);
    ctx.bezierCurveTo(570, 272, 520, 278, 460, 262);
    ctx.bezierCurveTo(400, 248, 360, 225, 300, 252);
    ctx.bezierCurveTo(240, 280, 180, 265, 120, 220);
    ctx.bezierCurveTo(90, 190, 80, 110, 80, 0);
    ctx.closePath();
    ctx.fill();

    // Vệt bóng tóc óng ả 3D (Hair Sheen / Highlights)
    const hairGrad = ctx.createLinearGradient(200, 50, 800, 210);
    hairGrad.addColorStop(0, 'rgba(120, 53, 15, 0.0)');
    hairGrad.addColorStop(0.35, 'rgba(180, 83, 9, 0.65)');
    hairGrad.addColorStop(0.65, 'rgba(217, 119, 6, 0.65)');
    hairGrad.addColorStop(1, 'rgba(120, 53, 15, 0.0)');
    ctx.strokeStyle = hairGrad;
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(180, 125);
    ctx.bezierCurveTo(340, 180, 600, 180, 840, 115);
    ctx.stroke();

    // Lọn tóc mượt mà
    ctx.strokeStyle = 'rgba(62, 31, 14, 0.55)';
    ctx.lineWidth = 4;
    [220, 380, 530, 680, 800].forEach(sx => {
      ctx.beginPath();
      ctx.moveTo(sx, 35);
      ctx.quadraticCurveTo(sx + 30, 140, sx + (sx > 500 ? 40 : 20), 230);
      ctx.stroke();
    });
    ctx.restore();

    // 3. Lông mày thanh tú lá liễu (Eyebrows)
    const drawEyebrowHD = (bx, by, isLeft, tilt = 0) => {
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(tilt);
      ctx.strokeStyle = '#3e1f0e';
      ctx.lineWidth = 11;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, 48, 72, Math.PI * 1.23, Math.PI * 1.77);
      ctx.stroke();
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(isLeft ? -56 : 56, 12);
      ctx.lineTo(isLeft ? -68 : 68, 20);
      ctx.stroke();
      ctx.restore();
    };
    drawEyebrowHD(330, 310, true, 0.04);
    drawEyebrowHD(694, 310, false, -0.04);

    // 4. Đôi mắt Anime to tròn long lanh (Eyes)
    const drawAnimeEyeHD = (ex, ey, isLeft) => {
      const ew = 94;
      const eh = 132;
      const irisW = 76;
      const irisH = 118;
      const offsetX = isLeft ? 6 : -6;

      ctx.save();
      ctx.translate(ex, ey);

      // Tròng trắng
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(0, 0, ew, eh, 0, 0, Math.PI * 2);
      ctx.fill();

      // Đổ bóng mi mắt trên
      const scleraShadow = ctx.createLinearGradient(0, -eh, 0, 0);
      scleraShadow.addColorStop(0, 'rgba(203, 213, 225, 0.65)');
      scleraShadow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = scleraShadow;
      ctx.beginPath();
      ctx.ellipse(0, 0, ew, eh, 0, 0, Math.PI * 2);
      ctx.fill();

      // Mống mắt 3 tầng màu ấm áp
      const irisGrad = ctx.createLinearGradient(0, -eh * 0.8, 0, eh * 0.85);
      irisGrad.addColorStop(0, '#1c1917');
      irisGrad.addColorStop(0.42, '#451a03');
      irisGrad.addColorStop(0.75, '#b45309');
      irisGrad.addColorStop(1, '#f59e0b');
      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.ellipse(offsetX, 4, irisW, irisH, 0, 0, Math.PI * 2);
      ctx.fill();

      // Đồng tử đen sâu
      ctx.fillStyle = '#090503';
      ctx.beginPath();
      ctx.ellipse(offsetX, -6, irisW * 0.52, irisH * 0.54, 0, 0, Math.PI * 2);
      ctx.fill();

      // Vành sáng hổ phách đáy mắt
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(offsetX, 26, irisW * 0.65, 0.22 * Math.PI, 0.78 * Math.PI);
      ctx.stroke();

      // Sparkle Highlights 3 tầng
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(isLeft ? 24 : -14, -42, 22, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(isLeft ? -22 : -30, 32, 13, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(isLeft ? 38 : 14, -8, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(isLeft ? -6 : -18, 52, 4, 0, Math.PI * 2);
      ctx.fill();

      // Đường viền mí mắt dày Anime
      ctx.strokeStyle = '#18100c';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, -10, ew, Math.PI * 1.14, Math.PI * 1.86);
      ctx.stroke();

      // Lông mi kép cong vút
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(isLeft ? -ew * 0.88 : ew * 0.88, -52);
      ctx.lineTo(isLeft ? -ew * 1.25 : ew * 1.25, -78);
      ctx.stroke();

      ctx.lineWidth = 5.5;
      ctx.beginPath();
      ctx.moveTo(isLeft ? -ew * 0.95 : ew * 0.95, -34);
      ctx.lineTo(isLeft ? -ew * 1.22 : ew * 1.22, -48);
      ctx.stroke();

      // Mi dưới thanh tú
      ctx.strokeStyle = 'rgba(69, 26, 3, 0.45)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 16, ew * 0.88, Math.PI * 0.22, Math.PI * 0.78);
      ctx.stroke();

      ctx.restore();
    };

    const drawHappyEyeHD = (ex, ey, isLeft) => {
      const ew = 92;
      ctx.save();
      ctx.translate(ex, ey);
      ctx.strokeStyle = '#18100c';
      ctx.lineWidth = 16;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, 24, ew, Math.PI * 1.24, Math.PI * 1.76);
      ctx.stroke();

      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(isLeft ? -ew * 0.82 : ew * 0.82, -22);
      ctx.lineTo(isLeft ? -ew * 1.18 : ew * 1.18, -48);
      ctx.stroke();
      ctx.restore();
    };

    if (isBlink) {
      drawHappyEyeHD(330, 480, true);
      drawHappyEyeHD(694, 480, false);
    } else {
      drawAnimeEyeHD(330, 480, true);
      drawAnimeEyeHD(694, 480, false);
    }

    // 5. Má hồng & 2 đốm sáng trắng lấp lánh mỗi bên (Blush with signature sparkle dots)
    const drawBlushHD = (bx, by, isLeft) => {
      const r = 96;
      const grad = ctx.createRadialGradient(bx, by, 8, bx, by, r);
      grad.addColorStop(0, 'rgba(251, 113, 133, 0.72)');
      grad.addColorStop(0.55, 'rgba(244, 63, 94, 0.38)');
      grad.addColorStop(1, 'rgba(244, 63, 94, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bx, by, r, 0, Math.PI * 2);
      ctx.fill();

      // 2 đốm sáng trắng tinh xảo
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(isLeft ? bx - 14 : bx + 14, by - 12, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(isLeft ? bx + 14 : bx - 14, by + 4, 4.2, 0, Math.PI * 2);
      ctx.fill();
    };
    drawBlushHD(270, 620, true);
    drawBlushHD(754, 620, false);

    // 6. Mũi nhỏ xíu chúm chím (Button Nose with specular highlight)
    ctx.save();
    ctx.fillStyle = 'rgba(251, 113, 133, 0.85)';
    ctx.beginPath();
    ctx.arc(512, 608, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(510, 606, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 7. Miệng cười ngọt ngào duyên dáng (Smile with gloss & dimples)
    ctx.save();
    if (isBlink) {
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(512, 660, 44, 0, Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#be123c';
      ctx.lineWidth = 9;
      ctx.stroke();
      ctx.fillStyle = '#fbcfe8';
      ctx.beginPath();
      ctx.arc(512, 680, 26, Math.PI, 0);
      ctx.fill();
    } else {
      ctx.strokeStyle = '#be123c';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(512, 660, 46, 0.22 * Math.PI, 0.78 * Math.PI);
      ctx.stroke();

      ctx.fillStyle = 'rgba(251, 207, 232, 0.75)';
      ctx.beginPath();
      ctx.ellipse(512, 680, 22, 9, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#be123c';
      ctx.beginPath();
      ctx.arc(476, 672, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(548, 672, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 8. Quai nón hồng sen ôm cằm (Chin Strap)
    ctx.save();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(512, 510, 390, 0.32 * Math.PI, 0.68 * Math.PI);
    ctx.stroke();
    ctx.restore();

    return canvas;
  }

  // ------------------------------------------------------------
  // TẠO TEXTURE KHUÔN MẶT CÁC NHÂN VẬT CHIBI TRƯỜNG NGÔ QUYỀN
  // Biểu cảm sống động: Đôi mắt long lanh, mí cong, tròng gradient, má hồng, chớp mắt
  // ------------------------------------------------------------
  createChibiFaceCanvas(faceType = 'ha_my', config = {}) {
    if (faceType === 'ha_my' || faceType === 'ha_my_blink') {
      return this.createHaMyHDFaceCanvas(faceType === 'ha_my_blink');
    }

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 512, 512);

    // 1. Helper: Má hồng e ấp dạng radial gradient
    const drawBlush = (bx, by, r = 45, color = 'rgba(244, 114, 182, 0.65)') => {
      const grad = ctx.createRadialGradient(bx, by, 4, bx, by, r);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'rgba(244, 114, 182, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bx, by, r, 0, Math.PI * 2);
      ctx.fill();
    };

    // 2. Helper: Mắt Anime to tròn long lanh với gradient & sparkle highlights
    const drawAnimeEye = (ex, ey, isLeft, opt = {}) => {
      const ew = opt.ew || 46;
      const eh = opt.eh || 62;
      const irisW = opt.irisW || 36;
      const irisH = opt.irisH || 56;
      const colors = opt.colors || ['#1c1917', '#78350f', '#d97706'];
      const lashColor = opt.lashColor || '#1e1b4b';

      ctx.save();
      ctx.translate(ex, ey);

      // Tròng trắng
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(0, 0, ew, eh, 0, 0, Math.PI * 2);
      ctx.fill();

      // Viền mờ dịu
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Mống mắt 3 tầng màu rực rỡ
      const grad = ctx.createLinearGradient(0, -eh * 0.85, 0, eh * 0.85);
      grad.addColorStop(0, colors[0]);
      grad.addColorStop(0.5, colors[1]);
      grad.addColorStop(1, colors[2]);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(isLeft ? 4 : -4, 0, irisW, irisH, 0, 0, Math.PI * 2);
      ctx.fill();

      // Đồng tử đen sâu
      ctx.fillStyle = '#090d16';
      ctx.beginPath();
      ctx.ellipse(isLeft ? 4 : -4, -4, irisW * 0.52, irisH * 0.52, 0, 0, Math.PI * 2);
      ctx.fill();

      // Vòng sáng đáy mắt
      ctx.strokeStyle = colors[2];
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(isLeft ? 4 : -4, 12, irisW * 0.62, 0.25 * Math.PI, 0.75 * Math.PI);
      ctx.stroke();

      // Sparkle highlights
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(isLeft ? 12 : -6, -20, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(isLeft ? -10 : -14, 14, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(isLeft ? 18 : 6, -4, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Đường viền mí mắt dày phong cách Anime
      ctx.strokeStyle = lashColor;
      ctx.lineWidth = 8.5;
      ctx.beginPath();
      ctx.arc(0, -6, ew, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      // Lông mi cong vút
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(isLeft ? -ew * 0.85 : ew * 0.85, -28);
      ctx.lineTo(isLeft ? -ew * 1.18 : ew * 1.18, -42);
      ctx.stroke();

      ctx.restore();
    };

    // 3. Helper: Mắt cười híp / chớp mắt ^‿^
    const drawHappyEye = (ex, ey, isLeft, opt = {}) => {
      const ew = opt.ew || 45;
      ctx.save();
      ctx.translate(ex, ey);
      ctx.strokeStyle = opt.color || '#1e1b4b';
      ctx.lineWidth = 9;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, 12, ew, Math.PI * 1.25, Math.PI * 1.75);
      ctx.stroke();

      // Lông mi cong
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(isLeft ? -ew * 0.8 : ew * 0.8, -12);
      ctx.lineTo(isLeft ? -ew * 1.12 : ew * 1.12, -26);
      ctx.stroke();
      ctx.restore();
    };

    // 4. Helper: Lông mày thanh tú
    const drawEyebrow = (bx, by, isLeft, color = '#3e1f0e', tilt = 0) => {
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(tilt);
      ctx.strokeStyle = color;
      ctx.lineWidth = 5.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, 22, 36, Math.PI * 1.25, Math.PI * 1.75);
      ctx.stroke();
      ctx.restore();
    };

    // 5. Helper: Mũi nhỏ xíu chúm chím
    const drawNose = (nx = 256, ny = 305, color = '#fca5a5', r = 4) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(nx, ny, r, 0, Math.PI * 2);
      ctx.fill();
    };

    // 6. Helper: Miệng cười ngọt ngào duyên dáng
    const drawSmile = (mx = 256, my = 328, r = 22, color = '#be123c', lineWidth = 5.5) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(mx, my, r, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.stroke();
    };

    // 7. Helper: Miệng cười mở rộng tươi vui
    const drawOpenSmile = (mx = 256, my = 326, r = 22) => {
      ctx.save();
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(mx, my, r, 0, Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#be123c';
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fillStyle = '#fbcfe8';
      ctx.beginPath();
      ctx.arc(mx, my + 10, r * 0.6, Math.PI, 0);
      ctx.fill();
      ctx.restore();
    };

    switch (faceType) {
      case 'ha_my':
        drawBlush(150, 310, 48);
        drawBlush(362, 310, 48);
        drawEyebrow(170, 175, true, '#3e1f0e', 0.05);
        drawEyebrow(342, 175, false, '#3e1f0e', -0.05);
        drawAnimeEye(170, 240, true, { colors: ['#1c1917', '#78350f', '#d97706'] });
        drawAnimeEye(342, 240, false, { colors: ['#1c1917', '#78350f', '#d97706'] });
        drawNose(256, 305);
        drawSmile(256, 326, 24);
        break;

      case 'ha_my_blink':
        drawBlush(150, 310, 52);
        drawBlush(362, 310, 52);
        drawEyebrow(170, 168, true, '#3e1f0e', 0.08);
        drawEyebrow(342, 168, false, '#3e1f0e', -0.08);
        drawHappyEye(170, 240, true);
        drawHappyEye(342, 240, false);
        drawNose(256, 305);
        drawOpenSmile(256, 326, 24);
        break;

      case 'xuan_my':
        drawBlush(152, 312, 46, 'rgba(251, 146, 60, 0.65)');
        drawBlush(360, 312, 46, 'rgba(251, 146, 60, 0.65)');
        drawEyebrow(170, 175, true, '#7c2d12', 0.06);
        drawEyebrow(342, 175, false, '#7c2d12', -0.06);
        drawAnimeEye(170, 240, true, { colors: ['#7c2d12', '#b45309', '#f59e0b'] });
        drawAnimeEye(342, 240, false, { colors: ['#7c2d12', '#b45309', '#f59e0b'] });
        drawNose(256, 304, '#f87171');
        drawOpenSmile(256, 328, 22);
        break;

      case 'teacher_tuan':
        drawBlush(155, 315, 36, 'rgba(254, 205, 211, 0.4)');
        drawBlush(357, 315, 36, 'rgba(254, 205, 211, 0.4)');
        drawEyebrow(172, 178, true, '#1e293b', 0.04);
        drawEyebrow(340, 178, false, '#1e293b', -0.04);
        drawAnimeEye(172, 242, true, { ew: 40, eh: 52, irisW: 30, irisH: 46, colors: ['#0f172a', '#1e293b', '#475569'], lashColor: '#0f172a' });
        drawAnimeEye(340, 242, false, { ew: 40, eh: 52, irisW: 30, irisH: 46, colors: ['#0f172a', '#1e293b', '#475569'], lashColor: '#0f172a' });
        drawNose(256, 308, '#fca5a5', 3.5);
        drawSmile(256, 332, 26, '#0f172a', 5);
        break;

      case 'classmate_nam':
        drawBlush(150, 312, 42, 'rgba(251, 146, 60, 0.55)');
        drawBlush(362, 312, 42, 'rgba(251, 146, 60, 0.55)');
        drawEyebrow(170, 170, true, '#1e293b', 0.12);
        drawEyebrow(342, 170, false, '#1e293b', -0.12);
        drawAnimeEye(170, 240, true, { colors: ['#0f172a', '#1d4ed8', '#60a5fa'] });
        drawAnimeEye(342, 240, false, { colors: ['#0f172a', '#1d4ed8', '#60a5fa'] });
        drawNose(256, 305);
        drawOpenSmile(256, 326, 23);
        break;

      case 'classmate_duc':
        drawBlush(150, 312, 40);
        drawBlush(362, 312, 40);
        drawEyebrow(170, 172, true, '#0f172a', 0.08);
        drawEyebrow(342, 172, false, '#0f172a', -0.08);
        drawAnimeEye(170, 240, true, { colors: ['#1c1917', '#92400e', '#fbbf24'] });
        drawAnimeEye(342, 240, false, { colors: ['#1c1917', '#92400e', '#fbbf24'] });
        drawNose(256, 305);
        drawSmile(256, 326, 22, '#b45309');
        break;

      case 'classmate_bao_ngoc':
        drawBlush(150, 310, 50, 'rgba(244, 114, 182, 0.7)');
        drawBlush(362, 310, 50, 'rgba(244, 114, 182, 0.7)');
        drawEyebrow(170, 174, true, '#581c87', 0.04);
        drawEyebrow(342, 174, false, '#581c87', -0.04);
        drawAnimeEye(170, 240, true, { colors: ['#4a044e', '#9333ea', '#f472b6'], lashColor: '#3b0764' });
        drawAnimeEye(342, 240, false, { colors: ['#4a044e', '#9333ea', '#f472b6'], lashColor: '#3b0764' });
        drawNose(256, 305);
        drawSmile(256, 325, 20, '#be123c');
        break;

      case 'classmate_linh':
        drawBlush(152, 310, 46);
        drawBlush(360, 310, 46);
        drawEyebrow(170, 176, true, '#451a03');
        drawEyebrow(342, 176, false, '#451a03');
        drawAnimeEye(170, 240, true, { colors: ['#291507', '#78350f', '#f59e0b'] });
        drawAnimeEye(342, 240, false, { colors: ['#291507', '#78350f', '#f59e0b'] });
        drawNose(256, 305);
        drawSmile(256, 326, 21);
        break;

      case 'classmate_mai':
        drawBlush(150, 312, 48, 'rgba(52, 211, 153, 0.55)');
        drawBlush(362, 312, 48, 'rgba(52, 211, 153, 0.55)');
        drawEyebrow(170, 170, true, '#064e3b', 0.1);
        drawEyebrow(342, 168, false, '#064e3b', -0.08);
        drawAnimeEye(170, 240, true, { colors: ['#022c22', '#059669', '#34d399'] });
        drawHappyEye(342, 240, false, { color: '#064e3b' });
        drawNose(256, 305);
        drawOpenSmile(256, 327, 23);
        break;

      case 'classmate_khanh_chi':
        drawBlush(152, 312, 42);
        drawBlush(360, 312, 42);
        drawEyebrow(170, 174, true, '#0f172a');
        drawEyebrow(342, 174, false, '#0f172a');
        drawAnimeEye(170, 240, true, { colors: ['#0f172a', '#0369a1', '#38bdf8'] });
        drawAnimeEye(342, 240, false, { colors: ['#0f172a', '#0369a1', '#38bdf8'] });
        drawNose(256, 305);
        drawSmile(256, 326, 22);
        break;

      case 'classmate_thao_vy':
        drawBlush(148, 310, 52, 'rgba(236, 72, 153, 0.7)');
        drawBlush(364, 310, 52, 'rgba(236, 72, 153, 0.7)');
        drawEyebrow(170, 170, true, '#2e1065', 0.05);
        drawEyebrow(342, 170, false, '#2e1065', -0.05);
        drawAnimeEye(170, 238, true, { ew: 50, eh: 66, irisW: 40, irisH: 58, colors: ['#2e1065', '#7e22ce', '#c084fc'] });
        drawAnimeEye(342, 238, false, { ew: 50, eh: 66, irisW: 40, irisH: 58, colors: ['#2e1065', '#7e22ce', '#c084fc'] });
        drawNose(256, 305);
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(256, 332, 14, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'coach_viet':
        drawBlush(155, 315, 38, 'rgba(239, 68, 68, 0.35)');
        drawBlush(357, 315, 38, 'rgba(239, 68, 68, 0.35)');
        drawEyebrow(170, 172, true, '#0f172a', 0.16);
        drawEyebrow(342, 172, false, '#0f172a', -0.16);
        drawAnimeEye(170, 240, true, { ew: 42, eh: 52, irisW: 32, irisH: 46, colors: ['#0f172a', '#1e293b', '#94a3b8'] });
        drawAnimeEye(342, 240, false, { ew: 42, eh: 52, irisW: 32, irisH: 46, colors: ['#0f172a', '#1e293b', '#94a3b8'] });
        drawNose(256, 306, '#f87171', 4);
        drawOpenSmile(256, 330, 24);
        break;

      case 'goalie_robot':
        ctx.fillStyle = 'rgba(5, 21, 37, 0.95)';
        ctx.roundRect(80, 130, 352, 252, 40);
        ctx.fill();
        ctx.strokeStyle = '#00f6ff';
        ctx.lineWidth = 6;
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = '#00f6ff';
        ctx.roundRect(140, 200, 68, 68, 14);
        ctx.fill();
        ctx.roundRect(304, 200, 68, 68, 14);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(174, 234, 12, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(338, 234, 12, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 9;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(256, 290, 42, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

        ctx.fillStyle = '#facc15';
        ctx.beginPath(); ctx.arc(115, 330, 8, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(397, 330, 8, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        break;

      case 'librarian_hue':
        drawBlush(152, 312, 46, 'rgba(236, 72, 153, 0.55)');
        drawBlush(360, 312, 46, 'rgba(236, 72, 153, 0.55)');
        drawEyebrow(170, 174, true, '#1e1b4b', 0.04);
        drawEyebrow(342, 174, false, '#1e1b4b', -0.04);
        drawAnimeEye(170, 240, true, { colors: ['#1e1b4b', '#4338ca', '#a5b4fc'] });
        drawAnimeEye(342, 240, false, { colors: ['#1e1b4b', '#4338ca', '#a5b4fc'] });
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(170, 240, 48, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(342, 240, 48, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(218, 240); ctx.lineTo(294, 240); ctx.stroke();
        drawNose(256, 305);
        drawSmile(256, 328, 22, '#4338ca');
        break;

      case 'boss_dr_mistake':
        drawBlush(150, 315, 48, 'rgba(168, 85, 247, 0.5)');
        drawBlush(362, 315, 48, 'rgba(168, 85, 247, 0.5)');
        drawEyebrow(170, 168, true, '#3b0764', 0.16);
        drawEyebrow(342, 168, false, '#3b0764', -0.16);
        drawAnimeEye(170, 238, true, { colors: ['#3b0764', '#9333ea', '#f472b6'] });
        drawAnimeEye(342, 238, false, { colors: ['#3b0764', '#9333ea', '#f472b6'] });
        ctx.strokeStyle = '#581c87';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(256, 318);
        ctx.quadraticCurveTo(210, 312, 185, 328);
        ctx.moveTo(256, 318);
        ctx.quadraticCurveTo(302, 312, 327, 328);
        ctx.stroke();
        drawSmile(256, 335, 26, '#be123c', 6);
        break;

      case 'gardener_tu':
        drawBlush(155, 315, 38, 'rgba(234, 88, 12, 0.35)');
        drawBlush(357, 315, 38, 'rgba(234, 88, 12, 0.35)');
        drawEyebrow(170, 175, true, '#451a03', 0.05);
        drawEyebrow(342, 175, false, '#451a03', -0.05);
        drawHappyEye(170, 240, true, { color: '#1c1917', ew: 44 });
        drawHappyEye(342, 240, false, { color: '#1c1917', ew: 44 });
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(125, 235); ctx.lineTo(105, 225); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(125, 245); ctx.lineTo(105, 255); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(387, 235); ctx.lineTo(407, 225); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(387, 245); ctx.lineTo(407, 255); ctx.stroke();
        drawNose(256, 304, '#b45309', 4.5);
        drawSmile(256, 328, 26, '#78350f', 5.5);
        break;

      case 'chef_bear':
        ctx.fillStyle = '#fef3c7';
        ctx.beginPath();
        ctx.ellipse(256, 298, 86, 68, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#1c1917';
        ctx.beginPath();
        ctx.moveTo(242, 276);
        ctx.lineTo(270, 276);
        ctx.quadraticCurveTo(256, 296, 256, 296);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#1c1917';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(244, 306, 12, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(268, 306, 12, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

        const drawBearEye = (bx, by) => {
          ctx.fillStyle = '#0f172a';
          ctx.beginPath(); ctx.arc(bx, by, 32, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath(); ctx.arc(bx + 9, by - 9, 10, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(bx - 8, by + 8, 5, 0, Math.PI * 2); ctx.fill();
        };
        drawBearEye(160, 225);
        drawBearEye(352, 225);
        drawBlush(140, 280, 36);
        drawBlush(372, 280, 36);
        break;

      case 'fisherman_hai':
        drawBlush(155, 315, 38, 'rgba(234, 88, 12, 0.4)');
        drawBlush(357, 315, 38, 'rgba(234, 88, 12, 0.4)');
        drawEyebrow(170, 175, true, '#1c1917', 0.08);
        drawEyebrow(342, 175, false, '#1c1917', -0.08);
        drawHappyEye(170, 240, true, { color: '#0f172a', ew: 42 });
        drawHappyEye(342, 240, false, { color: '#0f172a', ew: 42 });
        drawNose(256, 305, '#ea580c', 4.5);
        drawOpenSmile(256, 328, 25);
        break;

      case 'vendor_bay':
        drawBlush(148, 308, 48, 'rgba(244, 63, 94, 0.65)');
        drawBlush(364, 308, 48, 'rgba(244, 63, 94, 0.65)');
        drawEyebrow(170, 172, true, '#1c1917', 0.05);
        drawEyebrow(342, 172, false, '#1c1917', -0.05);
        drawHappyEye(170, 238, true, { color: '#1c1917', ew: 46 });
        drawHappyEye(342, 238, false, { color: '#1c1917', ew: 46 });
        drawNose(256, 302, '#f43f5e', 4);
        drawOpenSmile(256, 326, 26);
        break;

      case 'guard_ba':
        drawBlush(155, 315, 35, 'rgba(251, 146, 60, 0.4)');
        drawBlush(357, 315, 35, 'rgba(251, 146, 60, 0.4)');
        drawEyebrow(170, 175, true, '#0f172a', 0.05);
        drawEyebrow(342, 175, false, '#0f172a', -0.05);
        drawAnimeEye(170, 240, true, { ew: 38, eh: 48, irisW: 28, irisH: 42, colors: ['#0f172a', '#1e293b', '#64748b'] });
        drawAnimeEye(342, 240, false, { ew: 38, eh: 48, irisW: 28, irisH: 42, colors: ['#0f172a', '#1e293b', '#64748b'] });
        drawNose(256, 304, '#f87171', 4);
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.ellipse(230, 322, 24, 7, -0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(282, 322, 24, 7, 0.15, 0, Math.PI * 2);
        ctx.fill();
        drawSmile(256, 338, 22, '#0f172a', 4.5);
        break;

      default:
        drawBlush(150, 310, 48);
        drawBlush(362, 310, 48);
        drawEyebrow(170, 175, true);
        drawEyebrow(342, 175, false);
        drawAnimeEye(170, 240, true);
        drawAnimeEye(342, 240, false);
        drawNose(256, 305);
        drawSmile(256, 326, 24);
        break;
    }

    return canvas;
  }

  // ------------------------------------------------------------
  // HỆ THỐNG GẮN GƯƠNG MẶT 3D CONG THEO KHỐI CẦU ĐẦU (CURVED FACE DECAL)
  // Khắc phục hoàn toàn lỗi mặt phẳng trôi nổi, ôm khít 100% hình cầu đầu
  // ------------------------------------------------------------
  attachCurvedFace(headMesh, faceType = 'ha_my', config = {}) {
    if (!headMesh) return null;
    let radius = 0.44;
    if (headMesh.geometry) {
      if (headMesh.geometry.parameters && headMesh.geometry.parameters.radius) {
        radius = headMesh.geometry.parameters.radius;
      } else if (headMesh.geometry.parameters && headMesh.geometry.parameters.width) {
        radius = headMesh.geometry.parameters.width * 0.55;
      }
    }
    const canvas = this.createChibiFaceCanvas(faceType, config);
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // Vỏ cầu uốn cong ôm lấy phía trước trán và cằm nhân vật
    const faceGeo = new THREE.SphereGeometry(
      radius * 1.018,
      16,
      16,
      Math.PI * 0.22,
      Math.PI * 0.56,
      Math.PI * 0.24,
      Math.PI * 0.52
    );

    const faceMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    });

    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.set(0, 0, 0);
    faceMesh.rotation.set(0, 0, 0);
    headMesh.add(faceMesh);
    return { faceMesh, texture, canvas };
  }

  // ============================================================
  // BUILD FULL 3D CAMPUS WORLD (Trường Ngô Quyền / Roblox Campus)
  // ============================================================
  buildCampusWorld() {
    const origSceneAdd = this.scene.add.bind(this.scene);
    this.scene.add = (...args) => {
      if (this.schoolCampusGroup) {
        this.schoolCampusGroup.add(...args);
      } else {
        origSceneAdd(...args);
      }
    };

    try {
      // --------------------------------------------------------
      // SÀN TOÀN KHUÔN VIÊN TRƯỜNG HỌC (Kết thúc chuẩn xác tại mép cổng Z = 53.5)
      // Không tràn ra ngoài đường phố để tránh Z-fighting / nhấp nháy đồ họa
      // --------------------------------------------------------
      const groundGeo = new THREE.PlaneGeometry(260, 110.5);
      const groundMat = new THREE.MeshStandardMaterial({
        map: this.createGrassCanvasTexture(),
        roughness: 0.85
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0, 0, -1.75);
      ground.receiveShadow = true;
      this.groundMesh = ground;
      this.scene.add(ground);

    // --------------------------------------------------------
    // SÂN TRƯỜNG TRUNG TÂM LÁT GẠCH ĐỎ NGÔ QUYỀN (72m x 44m)
    // Đặt tại Z = 38.0 bao quát trung tâm trường
    // --------------------------------------------------------
    const plazaGeo = new THREE.PlaneGeometry(72, 44);
    const plazaTex = this.createRedCourtyardBrickTexture();
    plazaTex.repeat.set(22, 14);
    const plazaNorm = this.createRedCourtyardBrickNormalTexture();
    plazaNorm.repeat.set(22, 14);
    const plazaMat = new THREE.MeshStandardMaterial({
      map: plazaTex,
      normalMap: plazaNorm,
      normalScale: new THREE.Vector2(0.65, 0.65),
      roughness: 0.62,
      metalness: 0.04
    });
    const plaza = new THREE.Mesh(plazaGeo, plazaMat);
    plaza.rotation.x = -Math.PI / 2;
    plaza.position.set(0, 0.02, 38.0);
    plaza.receiveShadow = true;
    this.scene.add(plaza);

    // KHU VỰC 1: PHÒNG HỌC 5C4 (TIẾNG ANH)
    this.buildClassroomZone();

    // KHU VỰC 1B: PHÒNG HỌC TOÁN 5C4 & CÔ MAI (GIÁO TRÌNH LỚP 5)
    this.buildMathClassroomZone();

    // KHU VỰC 1C: TRỐNG TRƯỜNG TRUYỀN THỐNG & SÂN CHƠI DÂN GIAN Ô ĂN QUAN
    this.buildSchoolDrumAndFolkGamesZone();

    // NPC XUÂN MY (TRƯỞNG BAN ĐỘI SAO ĐỎ)
    this.buildNPCXuanMy();

    // KHU VỰC 2: NHÀ ĂN & CĂN TIN
    this.buildCafeteriaZone();

    // KHU VỰC 3: SÂN TRƯỜNG, ĐÀI PHUN NƯỚC & CỘT CỜ
    this.buildSchoolYardZone();

    // KHU VỰC 4: HỒ CÂU CÁ TRƯỜNG NGÔ QUYỀN
    this.buildFishingPondZone();

    // KHU VỰC 5: ĐẤU TRƯỜNG OBBY PARKOUR
    this.buildMinecraftParkourZone();

    // KHU VỰC 6: KHU THỂ THAO PHỨC HỢP (Sân Bóng Đá Mini + Sân Bóng Rổ + Điền Kinh)
    this.buildSportsComplexZone();

    // KHU VỰC 7: THƯ VIỆN TRƯỜNG TIỂU HỌC NGÔ QUYỀN (2 Tầng Kính & Cô Thủ Thư Huệ)
    this.buildLibraryZone();

    // KHU VỰC 8: ĐẠI SÂN KHẤU HỘI DIỄN & BOSS DR. MISTAKE
    this.buildAuditoriumStageZone();

    // KHU VỰC 9: VƯỜN HOA SINH THÁI & NHÀ KÍNH VÒM (Chú Tư Làm Vườn)
    this.buildBotanicalGardenZone();

    // KHU VỰC 10: HỆ THỐNG ĐƯỜNG ĐI LÁT ĐÁ & 16 CỘT ĐÈN CHIẾU SÁNG
    this.buildCampusPathwaysAndStreetlights();

    // KHU VỰC 11: BẦU TRỜI & MÂY TRẮNG BAY LƠ LỬNG
    this.buildSkyAtmosphereAndClouds();

    // KHU VỰC 12: ĐẠI CẢNH QUAN & 5 ĐIỂM TƯƠNG TÁC SÂN TRƯỜNG 5C4 (BEAUTIFICATION & VIGNETTES)
    this.buildCampusBeautificationAndVignettes();

    // HỆ THỐNG VẬT LÝ VA CHẠM KHUÔN VIÊN TRƯỜNG & TƯỜNG RÀO CHẮN 3D
    this.buildCampusCollisionBoundaries();
    } finally {
      this.scene.add = origSceneAdd;
    }
  }

  // ------------------------------------------------------------
  // HỆ THỐNG VA CHẠM KHUÔN VIÊN TRƯỜNG & TƯỜNG RÀO CHẮN 3D
  // Ngăn chặn hoàn toàn việc người chơi đi xuyên tường, xuyên chướng ngại vật cao hơn
  // ------------------------------------------------------------
  buildCampusCollisionBoundaries() {
    // 1. TƯỜNG PHÒNG HỌC 5C4 (Cao 8m: Ngăn đi xuyên tường hậu, 2 tường bên và 2 mảng tường tiền sảnh)
    // Cổng vòm giữa từ X = -4.5 đến X = +4.5 tại Z = 18.0 là lối đi thông thoáng ra sân
    this.solidPlatforms.push({
      id: 'class_back_wall',
      worldX: 0,
      worldY: 0,
      topY: 8.0,
      worldZ: -10.0,
      halfW: 15.3,
      halfD: 0.35,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'class_left_wall',
      worldX: -15.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 4.0,
      halfW: 0.35,
      halfD: 14.1,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'class_right_wall',
      worldX: 15.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 4.0,
      halfW: 0.35,
      halfD: 14.1,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'class_front_wall_left',
      worldX: -10.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 18.0,
      halfW: 5.2,
      halfD: 0.35,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'class_front_wall_right',
      worldX: 10.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 18.0,
      halfW: 5.2,
      halfD: 0.35,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'class_pillar_left',
      worldX: -5.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 18.28,
      halfW: 0.45,
      halfD: 0.45,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'class_pillar_right',
      worldX: 5.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 18.28,
      halfW: 0.45,
      halfD: 0.45,
      isWall: true
    });

    // 1B. TƯỜNG PHÒNG HỌC TOÁN 5C4 (RỘNG 30m x 28m TƯƠNG ĐƯƠNG LỚP TIẾNG ANH)
    // Tường sau (bắc): Z = -10.0, X từ 20 đến 50
    this.solidPlatforms.push({
      id: 'math_back_wall',
      worldX: 35.0,
      worldY: 0,
      topY: 8.0,
      worldZ: -10.0,
      halfW: 15.3,
      halfD: 0.35,
      isWall: true
    });
    // Tường đông (ngoại thất): X = 50.0, Z từ -10 đến 18
    this.solidPlatforms.push({
      id: 'math_east_wall',
      worldX: 50.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 4.0,
      halfW: 0.35,
      halfD: 14.1,
      isWall: true
    });
    // Tường tây (giáp hành lang nối lớp tiếng Anh): X = 20.0, chừa cổng vòm thông phòng tại Z in [0, 6]
    this.solidPlatforms.push({
      id: 'math_west_wall_north',
      worldX: 20.0,
      worldY: 0,
      topY: 8.0,
      worldZ: -5.0,
      halfW: 0.35,
      halfD: 5.1,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'math_west_wall_south',
      worldX: 20.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 12.0,
      halfW: 0.35,
      halfD: 6.1,
      isWall: true
    });
    // Tường trước (nam): Z = 18.0, chừa cửa đại sảnh tại X in [32, 38]
    this.solidPlatforms.push({
      id: 'math_front_wall_left',
      worldX: 26.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 18.0,
      halfW: 6.1,
      halfD: 0.35,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'math_front_wall_right',
      worldX: 44.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 18.0,
      halfW: 6.1,
      halfD: 0.35,
      isWall: true
    });
    // Bàn và bục giảng Cô Mai
    this.solidPlatforms.push({
      id: 'math_teacher_desk',
      worldX: 35.0,
      worldY: 0,
      topY: 1.1,
      worldZ: -6.5,
      halfW: 1.8,
      halfD: 0.8,
      isWall: true
    });
    // Kệ hình học không gian 3D
    this.solidPlatforms.push({
      id: 'math_geometry_shelf',
      worldX: 49.2,
      worldY: 0,
      topY: 2.4,
      worldZ: -2.0,
      halfW: 0.6,
      halfD: 2.5,
      isWall: true
    });
    // Giá trống trường truyền thống (đặt ngoài sân trường thoáng đãng)
    this.solidPlatforms.push({
      id: 'school_drum_stand',
      worldX: 17.5,
      worldY: 0,
      topY: 2.0,
      worldZ: 22.0,
      halfW: 0.85,
      halfD: 0.85,
      isWall: true
    });

    // 2. BỤC GIẢNG THẦY TUẤN TRONG LỚP (Bậc thấp Y = 0.35m, có thể bước lên và đứng giảng)
    this.solidPlatforms.push({
      id: 'teacher_podium',
      worldX: -4.5,
      worldY: 0,
      topY: 0.35,
      worldZ: -6.8,
      halfW: 2.2,
      halfD: 1.2
    });

    // 3. CỔNG TRƯỜNG TIỂU HỌC NGÔ QUYỀN (Z = 54.0)
    this.solidPlatforms.push({
      id: 'gate_pillar_left',
      worldX: -6.0,
      worldY: 0,
      topY: 6.0,
      worldZ: 54.0,
      halfW: 0.85,
      halfD: 0.85,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'gate_pillar_right',
      worldX: 6.0,
      worldY: 0,
      topY: 6.0,
      worldZ: 54.0,
      halfW: 0.85,
      halfD: 0.85,
      isWall: true
    });

    // 4. BỂ CHỨA NƯỚC ĐÀI PHUN NƯỚC TRUNG TÂM (Z = 30.5, Bán kính 3.2m, Thành bể cao 0.85m)
    this.solidPlatforms.push({
      id: 'fountain_basin',
      worldX: 0,
      worldY: 0,
      topY: 0.85,
      worldZ: 30.5,
      halfW: 3.3,
      halfD: 3.3,
      isWall: true
    });

    // 5. THÀNH HỒ CÂU CÁ TRƯỜNG NGÔ QUYỀN (X = 36.0, Z = 36.0)
    this.solidPlatforms.push({
      id: 'pond_rim_west',
      worldX: 29.5,
      worldY: 0,
      topY: 0.65,
      worldZ: 36.0,
      halfW: 0.8,
      halfD: 6.5,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'pond_rim_east',
      worldX: 42.5,
      worldY: 0,
      topY: 0.65,
      worldZ: 36.0,
      halfW: 0.8,
      halfD: 6.5,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'pond_rim_south',
      worldX: 36.0,
      worldY: 0,
      topY: 0.65,
      worldZ: 42.5,
      halfW: 6.5,
      halfD: 0.8,
      isWall: true
    });

    // 6. KHU VỰC NHÀ ĂN & CĂN TIN (X = -26, Z = 16)
    this.solidPlatforms.push({
      id: 'cafe_back_wall',
      worldX: -26.0,
      worldY: 0,
      topY: 5.0,
      worldZ: 16.0 - 6.0,
      halfW: 7.2,
      halfD: 0.4,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'cafe_side_wall_left',
      worldX: -26.0 - 7.0,
      worldY: 0,
      topY: 5.0,
      worldZ: 16.0 - 2.5,
      halfW: 0.4,
      halfD: 3.8,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'cafe_side_wall_right',
      worldX: -26.0 + 7.0,
      worldY: 0,
      topY: 5.0,
      worldZ: 16.0 - 2.5,
      halfW: 0.4,
      halfD: 3.8,
      isWall: true
    });

    // 7. TÒA NHÀ THƯ VIỆN NGÔ QUYỀN (X = 65, Z = 24)
    this.solidPlatforms.push({
      id: 'lib_back_wall',
      worldX: 65.0,
      worldY: 0,
      topY: 9.0,
      worldZ: 16.0,
      halfW: 12.2,
      halfD: 0.45,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'lib_left_wall',
      worldX: 53.0,
      worldY: 0,
      topY: 9.0,
      worldZ: 24.0,
      halfW: 0.45,
      halfD: 8.2,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'lib_right_wall',
      worldX: 77.0,
      worldY: 0,
      topY: 9.0,
      worldZ: 24.0,
      halfW: 0.45,
      halfD: 8.2,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'lib_front_glass',
      worldX: 68.0,
      worldY: 0,
      topY: 8.0,
      worldZ: 32.0,
      halfW: 8.2,
      halfD: 0.25,
      isWall: true
    });

    // 8. KHUNG THÀNH SÂN BÓNG ĐÁ (X = -83, Z = 38)
    this.solidPlatforms.push({
      id: 'soccer_goal_net',
      worldX: -83.9,
      worldY: 0,
      topY: 2.5,
      worldZ: 38.0,
      halfW: 1.0,
      halfD: 2.8,
      isWall: true
    });

    // 9. SÂN KHẤU HỘI DIỄN ĐẠI BẢNG LED PHÔNG HẬU (X = -41.8, Z = 38.0)
    this.solidPlatforms.push({
      id: 'stage_backdrop_wall',
      worldX: -41.8,
      worldY: 1.2,
      topY: 7.5,
      worldZ: 38.0,
      halfW: 0.4,
      halfD: 10.5,
      isWall: true
    });

    // 10. BẢNG VÀNG DANH DỰ 5C4 (X = -3.8, Z = 20.8)
    this.solidPlatforms.push({
      id: 'honor_roll_board_collider',
      worldX: -3.8,
      worldY: 0,
      topY: 2.6,
      worldZ: 20.8,
      halfW: 1.3,
      halfD: 0.45,
      isWall: true
    });

    // 11. MÁY BÁN NƯỚC TỰ ĐỘNG CUTE (X = -18.2, Z = 16.5)
    this.solidPlatforms.push({
      id: 'vending_machine_collider',
      worldX: -18.2,
      worldY: 0,
      topY: 2.6,
      worldZ: 16.5,
      halfW: 0.95,
      halfD: 0.8,
      isWall: true
    });

    // 12. HÀNG RÀO & NHÀ GỖ VƯỜN THỎ CƯNG CHIBI (Tâm X = 36.0, Z = 48.0)
    this.solidPlatforms.push({
      id: 'bunny_fence_north',
      worldX: 36.0,
      worldY: 0,
      topY: 1.1,
      worldZ: 51.5,
      halfW: 3.6,
      halfD: 0.25,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'bunny_fence_west',
      worldX: 32.5,
      worldY: 0,
      topY: 1.1,
      worldZ: 48.0,
      halfW: 0.25,
      halfD: 3.6,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'bunny_fence_east',
      worldX: 39.5,
      worldY: 0,
      topY: 1.1,
      worldZ: 48.0,
      halfW: 0.25,
      halfD: 3.6,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'bunny_fence_south_left',
      worldX: 33.5,
      worldY: 0,
      topY: 1.1,
      worldZ: 44.5,
      halfW: 1.1,
      halfD: 0.25,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'bunny_fence_south_right',
      worldX: 38.5,
      worldY: 0,
      topY: 1.1,
      worldZ: 44.5,
      halfW: 1.1,
      halfD: 0.25,
      isWall: true
    });
    this.solidPlatforms.push({
      id: 'bunny_wooden_hutch',
      worldX: 36.0,
      worldY: 0,
      topY: 1.8,
      worldZ: 50.0,
      halfW: 1.2,
      halfD: 0.9,
      isWall: true
    });
  }

  // ------------------------------------------------------------
  // ZONE 1: PHÒNG HỌC LỚP 5C4 (MỞ RỘNG & DÀI HƠN 30m x 28m)
  // ------------------------------------------------------------
  buildClassroomZone() {
    const classGroup = new THREE.Group();

    // Sàn gạch ốp đá cẩm thạch Crema Marfil hoàng gia ấm áp (Z: -10.0 đến +18.0)
    // Đã thay thế hoàn toàn sàn trắng toát bằng gạch bông / vân đá Indochine sang trọng, dịu mắt
    const floorTex = this.createClassroomMarbleStoneFloorTexture();
    const floorNorm = this.createClassroomMarbleStoneFloorNormalTexture();
    const floorGeo = new THREE.PlaneGeometry(30, 28);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      normalMap: floorNorm,
      normalScale: new THREE.Vector2(0.4, 0.4),
      roughness: 0.28,
      metalness: 0.08
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0.035, 4.0);
    floor.receiveShadow = true;
    classGroup.add(floor);

    // Gờ bậc cửa bằng đá hoa cương đen chống Z-fighting và phân định rõ trong/ngoài lớp
    const threshGeo = new THREE.BoxGeometry(10.2, 0.08, 0.45);
    const threshMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
    const thresh = new THREE.Mesh(threshGeo, threshMat);
    thresh.position.set(0, 0.04, 18.0);
    thresh.receiveShadow = true;
    classGroup.add(thresh);

    // 1. TƯỜNG HOA VĂN GẤM HOÀNG GIA (Back Wall) - Màu kem ấm áp dịu mắt, không chói lóa
    const wallTex = this.createClassroomWallpaperTexture();
    const wallMat = new THREE.MeshStandardMaterial({
      map: wallTex,
      roughness: 0.65
    });

    const backWallGeo = new THREE.BoxGeometry(30.5, 8.0, 0.5);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 4.0, -10.0);
    backWall.receiveShadow = true;
    classGroup.add(backWall);

    // MẢNG TƯỜNG ĐIỂM NHẤN GỖ SỒI TRẦM ẤM SAU BẢNG ĐEN (Acoustic Timber Feature Wall)
    const boardBackdropGeo = new THREE.BoxGeometry(13.6, 6.2, 0.08);
    const boardBackdropMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.5 });
    const boardBackdrop = new THREE.Mesh(boardBackdropGeo, boardBackdropMat);
    boardBackdrop.position.set(0, 4.2, -9.72);
    classGroup.add(boardBackdrop);

    // ỐP CHÂN TƯỜNG GỖ QUÝ & ĐÁ HOA CƯƠNG (Wainscoting 1.4m) quanh lớp học
    const wainscotMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.45 });
    const moldMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.35 });

    const backWainscot = new THREE.Mesh(new THREE.BoxGeometry(30.6, 1.4, 0.56), wainscotMat);
    backWainscot.position.set(0, 0.7, -9.98);
    classGroup.add(backWainscot);
    const backMold = new THREE.Mesh(new THREE.BoxGeometry(30.6, 0.08, 0.58), moldMat);
    backMold.position.set(0, 1.42, -9.98);
    classGroup.add(backMold);

    // BẢNG KHẨU HIỆU TRUYỀN THỐNG: "⭐ TIÊN HỌC LỄ - HẬU HỌC VĂN ⭐"
    const mottoCanvas = document.createElement('canvas');
    mottoCanvas.width = 1024;
    mottoCanvas.height = 128;
    const mctx = mottoCanvas.getContext('2d');
    mctx.fillStyle = '#b91c1c'; // Đỏ cờ
    mctx.roundRect(8, 8, 1008, 112, 16);
    mctx.fill();
    mctx.strokeStyle = '#facc15'; // Viền vàng kim
    mctx.lineWidth = 8;
    mctx.stroke();
    mctx.fillStyle = '#fef08a';
    mctx.font = 'bold 52px "Nunito", sans-serif';
    mctx.textAlign = 'center';
    mctx.fillText("⭐ TIÊN HỌC LỄ - HẬU HỌC VĂN ⭐", 512, 78);
    const mottoTex = new THREE.CanvasTexture(mottoCanvas);
    const mottoMesh = new THREE.Mesh(new THREE.PlaneGeometry(8.2, 1.05), new THREE.MeshBasicMaterial({ map: mottoTex }));
    mottoMesh.position.set(0, 6.15, -9.7);
    classGroup.add(mottoMesh);

    // ĐỒNG HỒ TRÒN TREO TƯỜNG 3D
    const clockGroup = new THREE.Group();
    clockGroup.position.set(-9.5, 5.8, -9.7);
    const clockFrame = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.08, 32), new THREE.MeshStandardMaterial({ color: 0x1e3a8a }));
    clockFrame.rotation.x = Math.PI / 2;
    clockGroup.add(clockFrame);
    const clockFace = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.09, 32), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    clockFace.rotation.x = Math.PI / 2;
    clockGroup.add(clockFace);
    classGroup.add(clockGroup);

    // Biển hiệu phòng học lớp 5C4
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sctx = signCanvas.getContext('2d');
    sctx.fillStyle = '#0284c7';
    sctx.fillRect(0, 0, 512, 128);
    sctx.strokeStyle = '#fef08a';
    sctx.lineWidth = 8;
    sctx.strokeRect(4, 4, 504, 120);
    sctx.fillStyle = '#ffffff';
    sctx.font = 'bold 48px "Nunito", sans-serif';
    sctx.textAlign = 'center';
    sctx.fillText("🏫 PHÒNG HỌC LỚP 5C4", 256, 80);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const signGeo = new THREE.PlaneGeometry(6.4, 1.5);
    const signMat = new THREE.MeshBasicMaterial({ map: signTex });
    const sign = new THREE.Mesh(signGeo, signMat);
    sign.position.set(0, 7.3, -9.7);
    classGroup.add(sign);

    // Bảng Đen Phấn Trắng 3D
    this.buildBlackboard(classGroup);

    // BẢNG VÀNG THI ĐUA LỚP 5C4 ĐẶT BÊN PHẢI BẢNG GIÁO VIÊN (ĐÚNG YÊU CẦU NGƯỜI DÙNG)
    // Tọa độ tường trước: X = 9.2 (bên phải bảng đen), Y = 4.2, Z = -9.68, mặt hướng thẳng ra lớp
    const boardGroup = new THREE.Group();
    boardGroup.position.set(9.2, 4.2, -9.68);
    boardGroup.rotation.y = 0;

    // Khung viền gỗ vàng kim sang trọng
    const bFrameGeo = new THREE.BoxGeometry(4.2, 3.1, 0.12);
    const bFrameMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 });
    const bFrame = new THREE.Mesh(bFrameGeo, bFrameMat);
    boardGroup.add(bFrame);

    const bGoldTrimGeo = new THREE.BoxGeometry(4.3, 3.2, 0.06);
    const bGoldTrimMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.7, roughness: 0.25 });
    const bGoldTrim = new THREE.Mesh(bGoldTrimGeo, bGoldTrimMat);
    boardGroup.add(bGoldTrim);

    const boardCanvas = document.createElement('canvas');
    boardCanvas.width = 1024;
    boardCanvas.height = 768;
    const bctx = boardCanvas.getContext('2d');

    // Nền xanh hoàng gia sâu thẳm
    const bGrad = bctx.createLinearGradient(0, 0, 0, 768);
    bGrad.addColorStop(0, '#0369a1');
    bGrad.addColorStop(1, '#075985');
    bctx.fillStyle = bGrad;
    bctx.roundRect(12, 12, 1000, 744, 28);
    bctx.fill();

    // Viền kép vàng kim hoàng gia
    bctx.strokeStyle = '#facc15';
    bctx.lineWidth = 10;
    bctx.stroke();

    bctx.strokeStyle = '#fef08a';
    bctx.lineWidth = 3;
    bctx.roundRect(26, 26, 972, 716, 20);
    bctx.stroke();

    // Tiêu đề
    bctx.fillStyle = '#fef08a';
    bctx.font = 'bold 56px "Nunito", sans-serif';
    bctx.textAlign = 'center';
    bctx.fillText("🏆 BẢNG VÀNG DANH DỰ 5C4 🏆", 512, 95);

    bctx.fillStyle = '#38bdf8';
    bctx.font = 'bold 28px "Nunito", sans-serif';
    bctx.fillText("✨ TRƯỜNG TIỂU HỌC NGÔ QUYỀN - NĂM HỌC 2025-2026 ✨", 512, 145);

    // Đường kẻ vàng
    bctx.strokeStyle = '#facc15';
    bctx.lineWidth = 4;
    bctx.beginPath();
    bctx.moveTo(120, 165);
    bctx.lineTo(904, 165);
    bctx.stroke();

    // Danh sách vinh danh
    const honorees = [
      { tag: "🌸 THỦ KHOA:", name: "Bé Hà My - 10 Điểm Tinh Anh 💯", color: '#fbcfe8' },
      { tag: "🎖️ GƯƠNG MẪU:", name: "Xuân My - Trưởng Ban Sao Đỏ ⭐", color: '#fef08a' },
      { tag: "⚡ CHIẾN THẦN:", name: "Bảo Ngọc & Khánh Chi - Học Bá Gen Z 📚", color: '#bae6fd' },
      { tag: "🌟 TIẾN BỘ:", name: "Bé Nam & Bé Linh - Cặp Đôi Chăm Ngoan 🚀", color: '#fed7aa' },
      { tag: "👑 PHONG TRÀO:", name: "Tập Thể 5C4: Thi Đua Học Tốt - Vui Khỏe! 🎯", color: '#a7f3d0' }
    ];

    honorees.forEach((h, idx) => {
      const hy = 230 + idx * 88;
      bctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
      bctx.roundRect(60, hy - 40, 904, 68, 16);
      bctx.fill();

      bctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
      bctx.lineWidth = 2;
      bctx.stroke();

      bctx.fillStyle = '#facc15';
      bctx.font = 'bold 30px "Nunito", sans-serif';
      bctx.textAlign = 'left';
      bctx.fillText(h.tag, 85, hy + 5);

      bctx.fillStyle = h.color;
      bctx.font = 'bold 34px "Nunito", sans-serif';
      bctx.fillText(h.name, 360, hy + 5);
    });

    bctx.fillStyle = '#fef08a';
    bctx.font = 'bold 30px "Nunito", sans-serif';
    bctx.textAlign = 'center';
    bctx.fillText("🌟 HỌC HẾT SỨC - CHƠI HẾT MÌNH - ĐOÀN KẾT VÔ ĐỊCH! 🌟", 512, 705);

    const boardTex = new THREE.CanvasTexture(boardCanvas);
    const boardFace = new THREE.Mesh(
      new THREE.PlaneGeometry(3.95, 2.85),
      new THREE.MeshBasicMaterial({ map: boardTex })
    );
    boardFace.position.set(0, 0, 0.07);
    boardGroup.add(boardFace);

    // Đèn chiếu rọi bảng vàng trên đỉnh
    const bLamp = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.16, 0.45, 12),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.2 })
    );
    bLamp.rotation.z = Math.PI / 2;
    bLamp.position.set(0, 1.62, 0.2);
    boardGroup.add(bLamp);

    classGroup.add(boardGroup);

    // Bục Giảng Thầy Tuấn
    const podiumGeo = new THREE.CylinderGeometry(1.8, 2.0, 0.25, 24);
    const podiumMat = new THREE.MeshStandardMaterial({ color: 0xfde68a });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.set(-5.5, 0.12, -7.5);
    podium.receiveShadow = true;
    classGroup.add(podium);

    // Bàn Giáo Viên Thầy Tuấn
    const deskGeo = new THREE.BoxGeometry(2.0, 1.1, 0.95);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0xb45309 });
    const teacherDesk = new THREE.Mesh(deskGeo, deskMat);
    teacherDesk.position.set(-6.2, 0.55, -7.5);
    teacherDesk.castShadow = true;
    classGroup.add(teacherDesk);

    // Bình hoa điểm 10 trên bàn thầy
    const vaseGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.35, 12);
    const vaseMat = new THREE.MeshStandardMaterial({ color: 0xec4899 });
    const vase = new THREE.Mesh(vaseGeo, vaseMat);
    vase.position.set(-5.9, 1.25, -7.5);
    classGroup.add(vase);

    // 2. TƯỜNG BÊN TRÁI & PHẢI (Side Walls 30m x 28m x 8m)
    const sideWallGeo = new THREE.BoxGeometry(0.5, 8.0, 28);
    const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
    leftWall.position.set(-15, 4.0, 4.0);
    leftWall.receiveShadow = true;
    classGroup.add(leftWall);

    const leftWainscot = new THREE.Mesh(new THREE.BoxGeometry(0.56, 1.4, 28.1), wainscotMat);
    leftWainscot.position.set(-14.98, 0.7, 4.0);
    classGroup.add(leftWainscot);
    const leftMold = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.08, 28.1), moldMat);
    leftMold.position.set(-14.98, 1.42, 4.0);
    classGroup.add(leftMold);

    const rightWall = new THREE.Mesh(sideWallGeo, wallMat);
    rightWall.position.set(15, 4.0, 4.0);
    rightWall.receiveShadow = true;
    classGroup.add(rightWall);

    const rightWainscot = new THREE.Mesh(new THREE.BoxGeometry(0.56, 1.4, 28.1), wainscotMat);
    rightWainscot.position.set(14.98, 0.7, 4.0);
    classGroup.add(rightWainscot);
    const rightMold = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.08, 28.1), moldMat);
    rightMold.position.set(14.98, 1.42, 4.0);
    classGroup.add(rightMold);

    // Cửa sổ kính thông thoáng đặt bên TƯỜNG PHẢI hướng ra sân trường đón nắng
    this.buildWindow(14.7, 4.2, -5.0, classGroup, -Math.PI / 2);
    this.buildWindow(14.7, 4.2, 2.0, classGroup, -Math.PI / 2);
    this.buildWindow(14.7, 4.2, 8.0, classGroup, -Math.PI / 2);
    this.buildWindow(14.7, 4.2, 14.0, classGroup, -Math.PI / 2);

    // 3. TƯỜNG TRƯỚC VỚI CỔNG VÒM RỘNG THÔNG RA SÂN TRƯỜNG (Grand Archway 10m Wide tại Z = 18.0)
    // Vật liệu gạch nung kiến trúc vintage ấm áp cho toàn bộ mặt ngoài trường học (Xóa sạch tường trắng toát)
    const extBrickMat = new THREE.MeshStandardMaterial({
      map: this.createExteriorBrickTexture(),
      roughness: 0.72
    });

    // Tường bên trái cổng (rộng 10m từ X = -15 đến X = -5)
    const frontWallLeft = new THREE.Mesh(new THREE.BoxGeometry(10.0, 8.0, 0.5), wallMat);
    frontWallLeft.position.set(-10.0, 4.0, 18.0);
    frontWallLeft.receiveShadow = true;
    classGroup.add(frontWallLeft);
    const frontWainscotL = new THREE.Mesh(new THREE.BoxGeometry(10.1, 1.4, 0.56), wainscotMat);
    frontWainscotL.position.set(-10.0, 0.7, 17.98);
    classGroup.add(frontWainscotL);

    // Mặt ốp gạch nung ngoại thất tường trái (Z = 18.26 quay ra sân trường)
    const extBrickLeft = new THREE.Mesh(new THREE.PlaneGeometry(10.0, 8.0), extBrickMat);
    extBrickLeft.position.set(-10.0, 4.0, 18.26);
    classGroup.add(extBrickLeft);

    // TRANH TƯỜNG STREET ART HỆ GEN Z (BÊN TRÁI): CAPYBARA CHILL & DUOLINGO SLAYYY
    const genZStreetTex = this.createGenZStreetArtTexture();
    const genZMuralLeft = new THREE.Mesh(
      new THREE.PlaneGeometry(9.4, 7.2),
      new THREE.MeshStandardMaterial({ map: genZStreetTex, roughness: 0.35 })
    );
    genZMuralLeft.position.set(-10.0, 4.1, 18.28);
    classGroup.add(genZMuralLeft);

    // Tường bên phải cổng (rộng 10m từ X = +5 đến X = +15)
    const frontWallRight = new THREE.Mesh(new THREE.BoxGeometry(10.0, 8.0, 0.5), wallMat);
    frontWallRight.position.set(10.0, 4.0, 18.0);
    frontWallRight.receiveShadow = true;
    classGroup.add(frontWallRight);
    const frontWainscotR = new THREE.Mesh(new THREE.BoxGeometry(10.1, 1.4, 0.56), wainscotMat);
    frontWainscotR.position.set(10.0, 0.7, 17.98);
    classGroup.add(frontWainscotR);

    // Mặt ốp gạch nung ngoại thất tường phải (Z = 18.26 quay ra sân trường)
    const extBrickRight = new THREE.Mesh(new THREE.PlaneGeometry(10.0, 8.0), extBrickMat);
    extBrickRight.position.set(10.0, 4.0, 18.26);
    classGroup.add(extBrickRight);

    // TRANH TƯỜNG POP ART HỆ GEN Z (BÊN PHẢI): POP CAT MEME & GAMING VIBES
    const genZPopTex = this.createGenZPopArtTexture();
    const genZMuralRight = new THREE.Mesh(
      new THREE.PlaneGeometry(9.4, 7.2),
      new THREE.MeshStandardMaterial({ map: genZPopTex, roughness: 0.35 })
    );
    genZMuralRight.position.set(10.0, 4.1, 18.28);
    classGroup.add(genZMuralRight);

    // Xà ngang trên vòm cửa rộng 10m
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(10.0, 2.4, 0.55), wallMat);
    lintel.position.set(0, 6.8, 18.0);
    classGroup.add(lintel);

    // Mặt ốp gạch nung ngoại thất xà ngang
    const extBrickLintel = new THREE.Mesh(new THREE.PlaneGeometry(10.0, 2.4), extBrickMat);
    extBrickLintel.position.set(0, 6.8, 18.28);
    classGroup.add(extBrickLintel);

    // HỘP ĐÈN NEON CYBER MARQUEE LIGHTBOX TRÊN CỔNG VÒM
    const marqueeTex = this.createGenZNeonMarqueeTexture();
    const marqueeSign = new THREE.Mesh(
      new THREE.PlaneGeometry(9.8, 2.3),
      new THREE.MeshBasicMaterial({ map: marqueeTex })
    );
    marqueeSign.position.set(0, 6.8, 18.32);
    classGroup.add(marqueeSign);

    // Đèn hắt sáng cổng vòm ấm cúng, dịu nhẹ tự nhiên
    const archGlow = new THREE.PointLight(0xffedd5, 0.35, 10);
    archGlow.position.set(0, 6.8, 18.8);
    classGroup.add(archGlow);

    // Hai cột trụ cổng vòm viền gạch nung & đế đá hoa cương (X = -5.0 và X = +5.0)
    [-5.0, 5.0].forEach(colX => {
      const colMesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 7.8, 0.55), extBrickMat);
      colMesh.position.set(colX, 3.9, 18.28);
      classGroup.add(colMesh);

      const capMesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.25, 0.7), moldMat);
      capMesh.position.set(colX, 7.8, 18.28);
      classGroup.add(capMesh);

      const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.7), moldMat);
      baseMesh.position.set(colX, 0.25, 18.28);
      classGroup.add(baseMesh);
    });

    // Biển dẫn hướng trên cổng: "🌿 LỐI RA SÂN TRƯỜNG & CĂN TIN"
    const doorSignCanvas = document.createElement('canvas');
    doorSignCanvas.width = 512;
    doorSignCanvas.height = 128;
    const dctx = doorSignCanvas.getContext('2d');
    dctx.fillStyle = '#059669';
    dctx.fillRect(0, 0, 512, 128);
    dctx.fillStyle = '#ffffff';
    dctx.font = 'bold 40px "Nunito", sans-serif';
    dctx.textAlign = 'center';
    dctx.fillText("🌿 LỐI RA SÂN TRƯỜNG & CĂN TIN", 256, 75);

    const doorSignTex = new THREE.CanvasTexture(doorSignCanvas);
    const doorSign = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 1.3), new THREE.MeshBasicMaterial({ map: doorSignTex }));
    doorSign.position.set(0, 6.2, 17.7);
    classGroup.add(doorSign);

    // 4. BÀN GHẾ HỌC SINH & CÁC BẠN CHIBI NPC TRONG LỚP (Student Desks & Classmates)
    this.buildStudentDesksAndClassmates(classGroup);

    
    // --------------------------------------------------------
    // TRANH VẼ BẬY HỌC SINH 5C4 TRÊN TƯỜNG LỚP HỌC (STUDENT DOODLES)
    // --------------------------------------------------------
    const doodleCanvas = document.createElement('canvas');
    doodleCanvas.width = 1024;
    doodleCanvas.height = 512;
    const doodleCtx = doodleCanvas.getContext('2d');

    // Nền tường kem vàng ấm học đường
    doodleCtx.fillStyle = '#fef9c3';
    doodleCtx.fillRect(0, 0, 1024, 512);

    // Đường gờ gỗ ốp chân tường
    doodleCtx.fillStyle = '#92400e';
    doodleCtx.fillRect(0, 430, 1024, 82);

    // Mặt trời cười toe toét đeo kính râm
    doodleCtx.fillStyle = '#facc15';
    doodleCtx.beginPath();
    doodleCtx.arc(140, 140, 60, 0, Math.PI * 2);
    doodleCtx.fill();
    doodleCtx.strokeStyle = '#f59e0b';
    doodleCtx.lineWidth = 6;
    for (let sa = 0; sa < Math.PI * 2; sa += Math.PI / 6) {
      doodleCtx.beginPath();
      doodleCtx.moveTo(140 + Math.cos(sa) * 65, 140 + Math.sin(sa) * 65);
      doodleCtx.lineTo(140 + Math.cos(sa) * 95, 140 + Math.sin(sa) * 95);
      doodleCtx.stroke();
    }
    // Kính râm đen siêu ngầu
    doodleCtx.fillStyle = '#0f172a';
    doodleCtx.fillRect(100, 120, 35, 25);
    doodleCtx.fillRect(145, 120, 35, 25);
    doodleCtx.lineWidth = 4;
    doodleCtx.strokeRect(100, 120, 80, 4);

    // Chữ vẽ bậy bằng bút sáp màu của học sinh
    doodleCtx.fillStyle = '#ef4444';
    doodleCtx.font = 'bold 36px "Nunito", sans-serif';
    doodleCtx.fillText("⭐ 5C4 VÔ ĐỊCH! 🏆", 280, 110);

    doodleCtx.fillStyle = '#0284c7';
    doodleCtx.font = 'bold 32px "Nunito", sans-serif';
    doodleCtx.fillText("I ❤️ English! - Bé Hà My 🌸", 280, 165);

    doodleCtx.fillStyle = '#7c3aed';
    doodleCtx.font = 'italic bold 28px "Nunito", sans-serif';
    doodleCtx.fillText("Nam ❤️ Linh (bị phạt trực nhật haha) 😆", 280, 220);

    doodleCtx.fillStyle = '#059669';
    doodleCtx.font = 'bold 28px "Nunito", sans-serif';
    doodleCtx.fillText("1 + 1 = 10 ĐIỂM THẦY TUẤN! 💯", 280, 275);

    // Hình người que nắm tay nhảy múa
    doodleCtx.strokeStyle = '#ea580c';
    doodleCtx.lineWidth = 5;
    // Người 1
    doodleCtx.beginPath();
    doodleCtx.arc(750, 130, 24, 0, Math.PI * 2);
    doodleCtx.stroke();
    doodleCtx.beginPath();
    doodleCtx.moveTo(750, 154); doodleCtx.lineTo(750, 230); // Thân
    doodleCtx.lineTo(720, 300); // Chân trái
    doodleCtx.moveTo(750, 230); doodleCtx.lineTo(780, 300); // Chân phải
    doodleCtx.moveTo(750, 180); doodleCtx.lineTo(710, 160); // Tay trái
    doodleCtx.moveTo(750, 180); doodleCtx.lineTo(790, 160); // Tay phải
    doodleCtx.stroke();

    // Con mèo méo mặt
    doodleCtx.fillStyle = '#475569';
    doodleCtx.font = 'bold 32px "Nunito", monospace';
    doodleCtx.fillText("(=^･ω･^=) meow", 720, 360);

    const doodleTex = new THREE.CanvasTexture(doodleCanvas);
    const doodleMat = new THREE.MeshStandardMaterial({ map: doodleTex, roughness: 0.5 });
    const doodleWallL = new THREE.Mesh(new THREE.PlaneGeometry(26, 7.0), doodleMat);
    doodleWallL.position.set(-14.72, 4.0, 4.0);
    doodleWallL.rotation.y = Math.PI / 2;
    classGroup.add(doodleWallL);

    // 5. TRẦN NHÀ ĐÔNG DƯƠNG, XÀ GỒ GỖ, QUẠT TRẦN 3D & ĐÈN TUÝP CHIẾU SÁNG
    this.buildClassroomCeilingAndFixtures(classGroup);

    // 6. MÁI NGÓI INDOCHINE SẢNH ĐÓN, CON SƠN ĐỠ MÁI & CỤC NÓNG ĐIỀU HÒA NGOẠI THẤT
    this.buildClassroomExteriorRoofAndAC(classGroup);

    this.scene.add(classGroup);
  }

  // ------------------------------------------------------------
  // HỆ THỐNG TRẦN GỖ ĐÔNG DƯƠNG, QUẠT TRẦN 3D & ĐÈN TUÝP CHIẾU SÁNG LỚP 5C4
  // ------------------------------------------------------------
  buildClassroomCeilingAndFixtures(classGroup) {
    // 1. Tấm trần nhà thạch cao kem ngà ấm áp (Y = 8.0m)
    const ceilGeo = new THREE.PlaneGeometry(30.2, 28.2);
    const ceilMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 });
    const ceiling = new THREE.Mesh(ceilGeo, ceilMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 8.0, 4.0);
    classGroup.add(ceiling);

    // 2. Bốn dầm xà gồ gỗ sồi Đông Dương chịu lực chạy ngang trần
    const beamMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.55 });
    [-4.0, 2.0, 8.0, 14.0].forEach(bz => {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(30.1, 0.36, 0.38), beamMat);
      beam.position.set(0, 7.82, bz);
      beam.receiveShadow = true;
      classGroup.add(beam);
    });

    // 3. Bốn quạt trần điện cơ 3 cánh truyền thống trường học Việt Nam (Quay tự nhiên trong gió)
    const fanMat = new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.35, metalness: 0.2 });
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x115e59, roughness: 0.4 });
    const downrodMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 });

    const fanCoords = [
      { x: -5.5, z: 2.0 }, { x: 5.5, z: 2.0 },
      { x: -5.5, z: 10.0 }, { x: 5.5, z: 10.0 }
    ];

    fanCoords.forEach(fc => {
      const fanGroup = new THREE.Group();
      fanGroup.position.set(fc.x, 7.82, fc.z);

      // Ty treo quạt từ dầm gỗ xuống
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.65, 8), downrodMat);
      rod.position.y = -0.325;
      fanGroup.add(rod);

      // Bầu quạt điện cơ
      const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 0.18, 16), fanMat);
      motor.position.y = -0.65;
      fanGroup.add(motor);

      // Khung xoay 3 cánh quạt
      const rotor = new THREE.Group();
      rotor.position.y = -0.72;
      for (let b = 0; b < 3; b++) {
        const ang = (b / 3) * Math.PI * 2;
        const bladeArm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.08), downrodMat);
        bladeArm.position.set(Math.cos(ang) * 0.25, 0, Math.sin(ang) * 0.25);
        bladeArm.rotation.y = -ang;
        rotor.add(bladeArm);

        const blade = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.018, 0.22), bladeMat);
        blade.position.set(Math.cos(ang) * 0.75, 0, Math.sin(ang) * 0.75);
        blade.rotation.y = -ang;
        blade.rotation.x = 0.12;
        rotor.add(blade);
      }
      fanGroup.add(rotor);
      classGroup.add(fanGroup);
      this.ceilingFans.push(rotor);
    });

    // 4. Bốn bộ đèn tuýp đôi phản quang treo trần phòng học
    const lightCoords = [
      { x: -5.5, z: -4.0 }, { x: 5.5, z: -4.0 },
      { x: -5.5, z: 14.0 }, { x: 5.5, z: 14.0 }
    ];

    lightCoords.forEach(lc => {
      const fixtureGroup = new THREE.Group();
      fixtureGroup.position.set(lc.x, 7.55, lc.z);

      const fixture = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.08, 0.35),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
      );
      fixtureGroup.add(fixture);

      [-0.09, 0.09].forEach(tZ => {
        const tube = new THREE.Mesh(
          new THREE.CylinderGeometry(0.028, 0.028, 2.2, 12),
          new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xfef9c3,
            emissiveIntensity: 0.85
          })
        );
        tube.rotation.z = Math.PI / 2;
        tube.position.set(0, -0.045, tZ);
        fixtureGroup.add(tube);
      });

      const downLight = new THREE.PointLight(0xfef3c7, 0.25, 9);
      downLight.position.set(0, -0.4, 0);
      fixtureGroup.add(downLight);

      classGroup.add(fixtureGroup);
    });
  }

  // ------------------------------------------------------------
  // MÁI NGÓI ĐÔNG DƯƠNG SẢNH ĐÓN, CON SƠN ĐỠ MÁI & CỤC NÓNG ĐIỀU HÒA NGOẠI THẤT
  // ------------------------------------------------------------
  buildClassroomExteriorRoofAndAC(classGroup) {
    // 1. Mái ngói Indochine che sảnh đón vòm cửa chính (Z = 18.0 đến 20.2, Y = 8.1m)
    const roofGroup = new THREE.Group();
    roofGroup.position.set(0, 8.0, 18.2);

    const roofAwningMat = new THREE.MeshStandardMaterial({ color: 0xc2410c, roughness: 0.65 });
    const awning = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.16, 2.4), roofAwningMat);
    awning.rotation.x = 0.32;
    awning.position.set(0, -0.3, 1.15);
    awning.castShadow = true;
    awning.receiveShadow = true;
    roofGroup.add(awning);

    const ridgeCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 11.4, 12),
      new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.5 })
    );
    ridgeCap.rotation.z = Math.PI / 2;
    ridgeCap.position.set(0, 0.05, 0.05);
    roofGroup.add(ridgeCap);

    // 2 Con sơn gỗ chạm khắc cổ điển (Decorative Timber Corbels) đỡ mái sảnh
    const corbelMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.5 });
    [-5.0, 5.0].forEach(cx => {
      const corbel = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 1.2), corbelMat);
      corbel.position.set(cx, -0.9, 0.6);
      roofGroup.add(corbel);
    });

    classGroup.add(roofGroup);

    // 2. Cục nóng điều hòa không khí trường học (Outdoor AC Compressor Unit) tại X = -12.5, Y = 5.8, Z = 18.45
    const acGroup = new THREE.Group();
    acGroup.position.set(-12.5, 5.8, 18.45);

    const acBodyMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 });
    const acBody = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.85, 0.45), acBodyMat);
    acBody.castShadow = true;
    acGroup.add(acBody);

    const acGrill = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.04, 20),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 })
    );
    acGrill.rotation.x = Math.PI / 2;
    acGrill.position.set(-0.22, 0, 0.23);
    acGroup.add(acGrill);

    const fanBladeGroup = new THREE.Group();
    fanBladeGroup.position.set(-0.22, 0, 0.24);
    for (let f = 0; f < 4; f++) {
      const fb = new THREE.Mesh(
        new THREE.BoxGeometry(0.26, 0.06, 0.015),
        new THREE.MeshStandardMaterial({ color: 0x0f172a })
      );
      fb.rotation.z = (f / 4) * Math.PI * 2;
      fanBladeGroup.add(fb);
    }
    acGroup.add(fanBladeGroup);
    this.acFanMesh = fanBladeGroup;

    const pipe = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 4.2, 8),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 })
    );
    pipe.position.set(0.48, -2.1, 0.08);
    acGroup.add(pipe);

    const bracketMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
    [-0.45, 0.45].forEach(bx => {
      const brL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.52), bracketMat);
      brL.position.set(bx, -0.45, 0.05);
      acGroup.add(brL);

      const brV = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), bracketMat);
      brV.position.set(bx, -0.65, -0.18);
      acGroup.add(brV);
    });

    classGroup.add(acGroup);
  }

  // ------------------------------------------------------------
  // DỰNG BÀN HỌC & CÁC BẠN NPC CHIBI GEN Z TRONG LỚP (Bảo Ngọc, Khánh Chi, Thảo Vy, Nam, Linh, Đức, Mai)
  // Tương tác trò chuyện Gen Z hài hước khi lại gần
  // ------------------------------------------------------------
  buildStudentDesksAndClassmates(classGroup) {
    const studentDesksData = [
      {
        id: 'student_nam',
        name: 'Bé Nam',
        icon: '👦',
        shirtColor: 0x3b82f6,
        hairColor: 0x1e293b,
        x: -11.0,
        z: 0.0,
        bookColor: 0x10b981,
        status: 'Cày sao tím',
        quotes: [
          "Thôi đi mày, để yên tao cày 10 câu ngữ pháp kiếm sao tím nào! ⚡",
          "Tao vừa câu được con cá heo ở hồ nước trường Ngô Quyền, xịn chưa haha! 🐬",
          "Bí kíp của Thầy Tuấn dễ hiểu thật sự, hôm nay tao quyết tâm đạt 10 điểm! 💯"
        ]
      },
      {
        id: 'student_duc',
        name: 'Minh Đức',
        icon: '🧑',
        shirtColor: 0xeab308,
        hairColor: 0x0f172a,
        x: -11.0,
        z: 6.0,
        bookColor: 0x8b5cf6,
        status: 'Chăm chú nghe giảng',
        quotes: [
          "Bài này dễ ợt à, nhìn công thức trên bảng đen của Thầy Tuấn là ra ngay! 💯",
          "Chiến thần tiếng Anh 5C4 hôm nay gọi tên bạn tôi nhé Hà My! 🏆",
          "Ê lát ra quầy Bác Bếp Bear làm ly trà sữa trân châu không? 🧋"
        ]
      },
      {
        id: 'student_bao_ngoc',
        name: 'Bảo Ngọc',
        icon: '👧',
        shirtColor: 0xa855f7,
        hairColor: 0x78350f,
        hasBow: true,
        bowColor: 0xec4899,
        x: -11.0,
        z: 12.0,
        bookColor: 0xf43f5e,
        status: 'Gen Z học bá',
        quotes: [
          "Thôi đi bà ơi, để yên cho tôi học kẻo Thầy Tuấn gọi lên bảng bây giờ! 🤣",
          "Bài To Be này tui làm trong 3 nốt nhạc! Đỉnh chóp luôn nha Hà My! ✨",
          "Ủa alo, lát ra chơi bao tui ly trà đào bánh tráng trộn Cô Bảy cổng trường nha má! 🧋"
        ]
      },
      {
        id: 'student_linh',
        name: 'Bé Linh',
        icon: '👧',
        shirtColor: 0xec4899,
        hairColor: 0x78350f,
        x: 11.0,
        z: 0.0,
        bookColor: 0xf59e0b,
        status: 'Đang ghi chép',
        quotes: [
          "Hà My ơi ráng làm chuỗi Streak 5 câu đúng để được Thầy Tuấn khen nha! 🌟",
          "Tập trung làm bài đi cô nương, tí nữa Bác Bếp Bear hết pizza đó! 🍕",
          "Chủ ngữ số ít đi với 'is' hoặc 'doesn't', nhớ mẹo Thầy Tuấn dặn nha! 📘"
        ]
      },
      {
        id: 'student_mai',
        name: 'Mai Phương',
        icon: '🐱',
        shirtColor: 0x10b981,
        hairColor: 0x451a03,
        x: 11.0,
        z: 6.0,
        bookColor: 0xef4444,
        status: 'Thần đồng Obby',
        quotes: [
          "Tui vừa leo lên đỉnh tháp Obby Parkour nhận được vương miện lấp lánh nè! 👑",
          "Tiếng Anh lớp 5 Global Success vui ghê á, học mà như đang chơi RPG! 🎮",
          "Hà My chọn bục nào đó? Tui cũng chọn bục đó luôn cho chắc ăn haha! 😆"
        ]
      },
      {
        id: 'student_khanh_chi',
        name: 'Khánh Chi',
        icon: '👓',
        shirtColor: 0xf97316,
        hairColor: 0x1e293b,
        hasGlasses: true,
        x: 11.0,
        z: 12.0,
        bookColor: 0x06b6d4,
        status: 'Học sinh gương mẫu',
        quotes: [
          "Gì dợ má? Đang tập trung cao độ nè, điểm 10 tiếng Anh của tui đó! 😎",
          "Bí kíp của Thầy Tuấn dạy: He / She / It đi với 'is', nhớ chưa bạn iu? 📘",
          "Gen Z trường Ngô Quyền là không sợ bài tập khó, quẩy lên bạn ơi! 🚀"
        ]
      },
      {
        id: 'student_thao_vy',
        name: 'Thảo Vy',
        icon: '🦋',
        shirtColor: 0x06b6d4,
        hairColor: 0x451a03,
        hasFlower: true,
        x: -5.8,
        z: 15.0,
        bookColor: 0xa855f7,
        status: 'Bé hạt tiêu',
        quotes: [
          "Trời ơi cứu tui cứu tui, câu này chọn 'am' hay 'are' dợ Hà My? 😱",
          "Học xong ván này ra leo tháp Obby Parkour không? Tui vừa sắm nón mới xịn xò nè! 👑",
          "Ê tí ra chào Bác Ba Bảo Vệ rồi mua xoài lắc ở gánh Cô Bảy nha! 🥭"
        ]
      }
    ];

    studentDesksData.forEach((st, idx) => {
      const deskGroup = new THREE.Group();
      deskGroup.position.set(st.x, 0, st.z);

      // Mặt bàn gỗ học sinh (1.8m x 0.9m)
      const topGeo = new THREE.BoxGeometry(1.8, 0.08, 0.9);
      const woodMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.6 });
      const top = new THREE.Mesh(topGeo, woodMat);
      top.position.y = 0.85;
      top.castShadow = true;
      deskGroup.add(top);

      // Chân bàn kim loại
      const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.85, 12);
      const legMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
      [
        [-0.8, -0.35], [0.8, -0.35],
        [-0.8, 0.35], [0.8, 0.35]
      ].forEach(([lx, lz]) => {
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(lx, 0.425, lz);
        leg.castShadow = true;
        deskGroup.add(leg);
      });

      // Ghế ngồi học sinh
      const seatGeo = new THREE.BoxGeometry(0.8, 0.06, 0.7);
      const seatMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
      const seat = new THREE.Mesh(seatGeo, seatMat);
      seat.position.set(0, 0.45, 0.75);
      seat.castShadow = true;
      deskGroup.add(seat);

      // Sách giáo khoa tiếng Anh mở trên bàn
      const bookGeo = new THREE.BoxGeometry(0.45, 0.04, 0.32);
      const bookMat = new THREE.MeshStandardMaterial({ color: st.bookColor });
      const book = new THREE.Mesh(bookGeo, bookMat);
      book.position.set(-0.3, 0.91, -0.1);
      deskGroup.add(book);

      // Ống cắm bút chì
      const penHolderGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.18, 12);
      const penMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
      const penHolder = new THREE.Mesh(penHolderGeo, penMat);
      penHolder.position.set(0.5, 0.98, -0.2);
      deskGroup.add(penHolder);

      // Cặp sách học sinh 3D treo bên hông bàn (Cute School Backpack on Side Hook)
      const bagColors = [0xec4899, 0x3b82f6, 0x10b981, 0x8b5cf6, 0xf59e0b, 0x06b6d4, 0xf43f5e];
      const bagMat = new THREE.MeshStandardMaterial({ color: bagColors[idx % bagColors.length], roughness: 0.55 });
      const bag = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.42, 0.32), bagMat);
      bag.position.set(-0.92, 0.48, 0.0);
      bag.castShadow = true;
      deskGroup.add(bag);

      const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.22, 0.24), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }));
      pocket.position.set(-1.06, 0.42, 0.0);
      deskGroup.add(pocket);

      // Đăng ký bàn vào solidPlatforms để người chơi có thể nhảy đứng lên bàn
      this.solidPlatforms.push({
        worldX: st.x,
        worldY: 0.0,
        topY: 0.9,
        worldZ: st.z,
        halfW: 1.0,
        halfD: 0.55
      });

      // MÔ HÌNH CHIBI BẠN HỌC NPC NGỒI HỌC (QUAY MẶT VỀ PHÍA THẦY TUẤN VÀ BẢNG ĐEN)
      const classmate = new THREE.Group();
      classmate.position.set(0, 0.48, 0.75);
      classmate.rotation.y = Math.PI; // QUAY 180 ĐỘ: MẶT HƯỚNG VỀ PHÍA THẦY TUẤN VÀ BẢNG ĐEN!

      // Thân áo
      const bodyGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.55, 16);
      const bodyMat = new THREE.MeshStandardMaterial({ color: st.shirtColor });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.28;
      body.castShadow = true;
      classmate.add(body);

      // Cánh tay Chibi đặt lên mặt bàn nghe giảng và ghi chép bài học
      const armGeo = new THREE.CylinderGeometry(0.05, 0.045, 0.36, 10);
      const armMat = new THREE.MeshStandardMaterial({ color: st.shirtColor });
      const armL = new THREE.Mesh(armGeo, armMat);
      armL.position.set(-0.20, 0.32, 0.24);
      armL.rotation.set(-1.18, 0, 0.22);
      classmate.add(armL);

      const armR = new THREE.Mesh(armGeo, armMat);
      armR.position.set(0.20, 0.32, 0.24);
      armR.rotation.set(-1.18, 0, -0.22);
      classmate.add(armR);

      // Bàn tay nhỏ bé
      const handMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.4 });
      const handL = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), handMat);
      handL.position.set(-0.20, 0.36, 0.40);
      classmate.add(handL);
      const handR = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), handMat);
      handR.position.set(0.20, 0.36, 0.40);
      classmate.add(handR);

      // Đầu Chibi to tròn
      const headGeo = new THREE.SphereGeometry(0.28, 20, 20);
      const headMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.4 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 0.72;
      head.castShadow = true;
      classmate.add(head);

      // Gắn gương mặt Anime cá tính riêng cho từng bạn học sinh lớp 5C4
      const classmateFaceMap = {
        student_nam: 'classmate_nam',
        student_duc: 'classmate_duc',
        student_bao_ngoc: 'classmate_bao_ngoc',
        student_linh: 'classmate_linh',
        student_mai: 'classmate_mai',
        student_khanh_chi: 'classmate_khanh_chi',
        student_thao_vy: 'classmate_thao_vy'
      };
      this.attachCurvedFace(head, classmateFaceMap[st.id] || 'classmate_linh');

      // Mái tóc
      const hairGeo = new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.8);
      const hairMat = new THREE.MeshStandardMaterial({ color: st.hairColor, roughness: 0.5 });
      const hair = new THREE.Mesh(hairGeo, hairMat);
      hair.position.y = 0.76;
      classmate.add(hair);

      // Phụ kiện riêng cho từng bạn Chibi
      if (st.hasBow) {
        const bow = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 8, 16), new THREE.MeshStandardMaterial({ color: st.bowColor }));
        bow.position.set(0.22, 0.96, 0.1);
        classmate.add(bow);
      }
      if (st.hasGlasses) {
        const glL = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 8, 12), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
        glL.position.set(-0.1, 0.74, 0.27);
        classmate.add(glL);
        const glR = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 8, 12), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
        glR.position.set(0.1, 0.74, 0.27);
        classmate.add(glR);
      }
      if (st.hasFlower) {
        const flower = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
        flower.position.set(-0.24, 0.94, 0.1);
        classmate.add(flower);
      }

      // Bảng tên bạn học nổi hai mặt
      const nameTagCanvas = document.createElement('canvas');
      nameTagCanvas.width = 256;
      nameTagCanvas.height = 64;
      const nctx = nameTagCanvas.getContext('2d');
      nctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      nctx.roundRect(4, 4, 248, 56, 12);
      nctx.fill();
      nctx.strokeStyle = '#38bdf8';
      nctx.lineWidth = 3;
      nctx.stroke();
      nctx.fillStyle = '#ffffff';
      nctx.font = 'bold 26px "Nunito", sans-serif';
      nctx.textAlign = 'center';
      nctx.fillText(st.name, 128, 40);

      const nameTex = new THREE.CanvasTexture(nameTagCanvas);
      const nameTag = new THREE.Mesh(
        new THREE.PlaneGeometry(0.95, 0.24),
        new THREE.MeshBasicMaterial({ map: nameTex, transparent: true, side: THREE.DoubleSide })
      );
      nameTag.position.set(0, 1.25, 0);
      classmate.add(nameTag);

      deskGroup.add(classmate);
      classGroup.add(deskGroup);

      // Đăng ký bạn học vào danh sách NPC tương tác trò chuyện Gen Z
      this.npcs.push({
        id: st.id,
        name: st.name,
        title: st.status || 'Học Sinh Lớp 5C4',
        group: classmate,
        worldPos: new THREE.Vector3(st.x, 0, st.z),
        radius: 2.4,
        quotes: st.quotes,
        icon: st.icon || '👧',
        prompt: `Bấm [E] hoặc [F] để trò chuyện với ${st.name}`
      });

      // Lưu tham chiếu để tạo hoạt ảnh gật gù/ghi chép
      this.classmates.push({
        group: classmate,
        head: head,
        baseY: 0.72,
        phase: idx * 1.2
      });
    });
  }

  // ------------------------------------------------------------
  // ZONE 1B: PHÒNG HỌC TOÁN LỚP 5C4 & NPC CÔ MAI (GIÁO TRÌNH LỚP 5)
  // RỘNG 30m x 28m (BẰNG PHÒNG TIẾNG ANH), HỌC SINH CHIBI NGỒI HỌC & SLOGAN CHILL CHILL
  // Vị trí: X = 35.0, Z = 4.0 (Từ X = 20 đến 50, Z từ -10 đến 18, Cao 8m)
  // Hành lang thông phòng nối liền 2 lớp học Toán và Tiếng Anh tại Z in [0, 6]
  // ------------------------------------------------------------
  buildMathClassroomZone() {
    const mathGroup = new THREE.Group();

    // 1. SÀN ĐÁ CẨM THẠCH INDOCHINE HOÀNG GIA (30m x 28m tại X = 35.0, Z = 4.0)
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 512;
    floorCanvas.height = 512;
    const fctx = floorCanvas.getContext('2d');
    fctx.fillStyle = '#fef3c7'; // Nền kem Crema Marfil ấm áp
    fctx.fillRect(0, 0, 512, 512);

    // Kẻ ô gạch bông Indochine viền xanh ngọc bích toán học
    fctx.strokeStyle = '#0f766e';
    fctx.lineWidth = 4;
    for (let x = 0; x <= 512; x += 128) {
      fctx.beginPath(); fctx.moveTo(x, 0); fctx.lineTo(x, 512); fctx.stroke();
    }
    for (let y = 0; y <= 512; y += 128) {
      fctx.beginPath(); fctx.moveTo(0, y); fctx.lineTo(512, y); fctx.stroke();
    }
    // Họa tiết hình thoi & khối lập phương hình học trang trí sàn
    fctx.fillStyle = 'rgba(15, 118, 110, 0.15)';
    for (let gx = 0; gx < 512; gx += 128) {
      for (let gy = 0; gy < 512; gy += 128) {
        fctx.beginPath();
        fctx.moveTo(gx + 64, gy + 16);
        fctx.lineTo(gx + 112, gy + 64);
        fctx.lineTo(gx + 64, gy + 112);
        fctx.lineTo(gx + 16, gy + 64);
        fctx.closePath();
        fctx.fill();
        fctx.stroke();
      }
    }

    const floorTex = new THREE.CanvasTexture(floorCanvas);
    floorTex.wrapS = THREE.RepeatWrapping;
    floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(6, 6);

    const floorGeo = new THREE.PlaneGeometry(30, 28);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.32,
      metalness: 0.06
    });
    const mathFloor = new THREE.Mesh(floorGeo, floorMat);
    mathFloor.rotation.x = -Math.PI / 2;
    mathFloor.position.set(35.0, 0.035, 4.0);
    mathFloor.receiveShadow = true;
    mathGroup.add(mathFloor);

    // Bậc cửa đá hoa cương đen phân định sảnh trước
    const thresh = new THREE.Mesh(
      new THREE.BoxGeometry(8.2, 0.08, 0.45),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 })
    );
    thresh.position.set(35.0, 0.04, 18.0);
    thresh.receiveShadow = true;
    mathGroup.add(thresh);

    // Hành lang có mái che nối liền giữa 2 phòng học (X từ 15 đến 20, Z = 3.0)
    const connFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 8.0),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
    );
    connFloor.rotation.x = -Math.PI / 2;
    connFloor.position.set(17.5, 0.036, 3.0);
    connFloor.receiveShadow = true;
    mathGroup.add(connFloor);

    const canopy = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.3, 8.2),
      new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 })
    );
    canopy.position.set(17.5, 6.2, 3.0);
    canopy.castShadow = true;
    mathGroup.add(canopy);

    // 2. HỆ THỐNG TƯỜNG PHÒNG HỌC TOÁN 5C4 (Cao 8m, Rộng 30m x 28m)
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xfbf7ee, roughness: 0.68 });
    const wainscotMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.45 });
    const moldMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 });

    // Tường sau (Back Wall - Z = -10.0): 30.5m x 8m
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(30.5, 8.0, 0.5), wallMat);
    backWall.position.set(35.0, 4.0, -10.0);
    backWall.receiveShadow = true;
    mathGroup.add(backWall);

    const backWainscot = new THREE.Mesh(new THREE.BoxGeometry(30.5, 1.4, 0.54), wainscotMat);
    backWainscot.position.set(35.0, 0.7, -9.98);
    mathGroup.add(backWainscot);

    // Mảng tường gỗ điểm nhấn sau bảng đen (Acoustic Timber Feature Wall 14m x 6m)
    const boardBackdrop = new THREE.Mesh(
      new THREE.BoxGeometry(14.0, 6.0, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.5 })
    );
    boardBackdrop.position.set(35.0, 4.0, -9.72);
    mathGroup.add(boardBackdrop);

    // Tường đông (East Wall - X = 50.0): 28.5m x 8m (Có cửa sổ lớn lấy sáng)
    const eastWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8.0, 28.5), wallMat);
    eastWall.position.set(50.0, 4.0, 4.0);
    eastWall.receiveShadow = true;
    mathGroup.add(eastWall);

    const eastWainscot = new THREE.Mesh(new THREE.BoxGeometry(0.54, 1.4, 28.5), wainscotMat);
    eastWainscot.position.set(49.98, 0.7, 4.0);
    mathGroup.add(eastWainscot);

    // Cửa sổ kính lớn tường Đông (French Transom Windows)
    [-3.0, 4.0, 11.0].forEach(wz => {
      const winFrame = new THREE.Mesh(new THREE.BoxGeometry(0.58, 3.8, 4.2), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 }));
      winFrame.position.set(50.0, 4.4, wz);
      mathGroup.add(winFrame);
      const glass = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.5, 3.9), new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.35, roughness: 0.1 }));
      glass.position.set(50.0, 4.4, wz);
      mathGroup.add(glass);
    });

    // Tường tây (West Wall - X = 20.0): Có cửa vòm thông sang lớp Tiếng Anh (Z in [0, 6])
    const westWallNorth = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8.0, 10.0), wallMat);
    westWallNorth.position.set(20.0, 4.0, -5.0);
    westWallNorth.receiveShadow = true;
    mathGroup.add(westWallNorth);

    const westWallSouth = new THREE.Mesh(new THREE.BoxGeometry(0.5, 8.0, 12.0), wallMat);
    westWallSouth.position.set(20.0, 4.0, 12.0);
    westWallSouth.receiveShadow = true;
    mathGroup.add(westWallSouth);

    const westArchHeader = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.5, 6.2), wallMat);
    westArchHeader.position.set(20.0, 6.75, 3.0);
    mathGroup.add(westArchHeader);

    // Tường trước (South Wall - Z = 18.0): Cửa đại sảnh rộng 6m (X in [32, 38])
    const southWallWest = new THREE.Mesh(new THREE.BoxGeometry(12.0, 8.0, 0.5), wallMat);
    southWallWest.position.set(26.0, 4.0, 18.0);
    southWallWest.receiveShadow = true;
    mathGroup.add(southWallWest);

    const southWallEast = new THREE.Mesh(new THREE.BoxGeometry(12.0, 8.0, 0.5), wallMat);
    southWallEast.position.set(44.0, 4.0, 18.0);
    southWallEast.receiveShadow = true;
    mathGroup.add(southWallEast);

    const southArchHeader = new THREE.Mesh(new THREE.BoxGeometry(6.4, 2.8, 0.5), wallMat);
    southArchHeader.position.set(35.0, 6.6, 18.0);
    mathGroup.add(southArchHeader);

    // MẶT ỐP NGOẠI THẤT INDOCHINE & GẠCH THẺ EMERALD XANH NGỌC
    [-1.0, 1.0].forEach(side => {
      const wallX = side < 0 ? 26.0 : 44.0;
      // Ốp chân tường gỗ 1.4m
      const wainscotExt = new THREE.Mesh(new THREE.BoxGeometry(12.0, 1.4, 0.08), wainscotMat);
      wainscotExt.position.set(wallX, 0.7, 18.26);
      mathGroup.add(wainscotExt);
    });

    // TRANH TƯỜNG GEN Z KHỔNG LỒ BÊN TRÁI: VŨ TRỤ HÌNH HỌC 5C4 & MÈO CYBER NEKO
    const mathLeftTex = this.createGenZMathMuralLeftTexture();
    const mathMuralLeft = new THREE.Mesh(
      new THREE.PlaneGeometry(11.2, 7.2),
      new THREE.MeshStandardMaterial({ map: mathLeftTex, roughness: 0.35 })
    );
    mathMuralLeft.position.set(26.0, 4.1, 18.28);
    mathGroup.add(mathMuralLeft);

    // Khung viền LED Neon vàng chanh phát quang bao quanh tranh trái
    const neonFrameL = new THREE.Mesh(
      new THREE.BoxGeometry(11.4, 7.4, 0.04),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xfacc15, emissiveIntensity: 0.45, roughness: 0.2 })
    );
    neonFrameL.position.set(26.0, 4.1, 18.27);
    mathGroup.add(neonFrameL);

    // TRANH TƯỜNG GEN Z KHỔNG LỒ BÊN PHẢI: GEN Z CÂN MỌI PHƯƠNG TRÌNH & CAPYBARA MATH DUO
    const mathRightTex = this.createGenZMathMuralRightTexture();
    const mathMuralRight = new THREE.Mesh(
      new THREE.PlaneGeometry(11.2, 7.2),
      new THREE.MeshStandardMaterial({ map: mathRightTex, roughness: 0.35 })
    );
    mathMuralRight.position.set(44.0, 4.1, 18.28);
    mathGroup.add(mathMuralRight);

    // Khung viền LED Neon Cyan phát quang bao quanh tranh phải
    const neonFrameR = new THREE.Mesh(
      new THREE.BoxGeometry(11.4, 7.4, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 0.45, roughness: 0.2 })
    );
    neonFrameR.position.set(44.0, 4.1, 18.27);
    mathGroup.add(neonFrameR);

    // HỘP ĐÈN NEON CYBER MARQUEE LIGHTBOX TRÊN CỔNG VÒM ĐẠI SẢNH LỚP TOÁN
    const mathMarqueeTex = this.createGenZMathNeonMarqueeTexture();
    const mathMarqueeSign = new THREE.Mesh(
      new THREE.PlaneGeometry(6.4, 2.2),
      new THREE.MeshBasicMaterial({ map: mathMarqueeTex })
    );
    mathMarqueeSign.position.set(35.0, 6.7, 18.32);
    mathGroup.add(mathMarqueeSign);

    // Đèn hắt sáng cổng vòm ấm cúng, dịu mắt
    const mathArchGlow = new THREE.PointLight(0xfef08a, 0.45, 10);
    mathArchGlow.position.set(35.0, 6.7, 18.8);
    mathGroup.add(mathArchGlow);

    // Cột trụ sảnh Indochine uy nghiêm hai bên cửa
    [-3.2, 3.2].forEach(px => {
      const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.38, 0.42, 8.0, 20),
        new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 })
      );
      pillar.position.set(35.0 + px, 4.0, 18.25);
      pillar.castShadow = true;
      mathGroup.add(pillar);

      // Chậu hoa hướng dương vàng rực rỡ ở chân cột sảnh
      const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.25, 0.55, 12),
        new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 })
      );
      pot.position.set(35.0 + px, 0.28, 18.7);
      mathGroup.add(pot);

      const potFlower = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 10, 10),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 })
      );
      potFlower.position.set(35.0 + px, 0.65, 18.7);
      mathGroup.add(potFlower);
    });

    // LANDSCAPING NGOẠI THẤT DƯỚI CHÂN TƯỜNG (DÃY BỒN HOA & GÓC CHECK-IN CHIBI)
    // 1. Dãy bồn hoa gỗ chân tường trái (X = 21 đến 31)
    const planterL = new THREE.Mesh(
      new THREE.BoxGeometry(10.2, 0.45, 0.75),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 })
    );
    planterL.position.set(26.0, 0.22, 18.6);
    mathGroup.add(planterL);
    const soilL = new THREE.Mesh(
      new THREE.BoxGeometry(9.8, 0.1, 0.65),
      new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 })
    );
    soilL.position.set(26.0, 0.46, 18.6);
    mathGroup.add(soilL);
    const flColorsL = [0xfacc15, 0xef4444, 0xec4899, 0x38bdf8, 0xa855f7];
    for (let fl = -4.5; fl <= 4.5; fl += 1.2) {
      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        new THREE.MeshStandardMaterial({ color: flColorsL[Math.abs(Math.round(fl * 2)) % flColorsL.length] })
      );
      flower.position.set(26.0 + fl, 0.68, 18.6);
      mathGroup.add(flower);
    }

    // Ghế băng gỗ công viên check-in sống ảo trước tranh tường trái
    const benchL = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.12, 0.8), new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35 }));
    benchL.position.set(26.0, 0.45, 19.3);
    mathGroup.add(benchL);
    [-1.1, 1.1].forEach(bx => {
      const bLeg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.45, 0.65), new THREE.MeshStandardMaterial({ color: 0x64748b }));
      bLeg.position.set(26.0 + bx, 0.22, 19.3);
      mathGroup.add(bLeg);
    });

    // 2. Dãy bồn hoa gỗ chân tường phải (X = 39 đến 49)
    const planterR = new THREE.Mesh(
      new THREE.BoxGeometry(10.2, 0.45, 0.75),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 })
    );
    planterR.position.set(44.0, 0.22, 18.6);
    mathGroup.add(planterR);
    const soilR = new THREE.Mesh(
      new THREE.BoxGeometry(9.8, 0.1, 0.65),
      new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.9 })
    );
    soilR.position.set(44.0, 0.46, 18.6);
    mathGroup.add(soilR);
    for (let fl = -4.5; fl <= 4.5; fl += 1.2) {
      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        new THREE.MeshStandardMaterial({ color: flColorsL[(Math.abs(Math.round(fl * 2)) + 2) % flColorsL.length] })
      );
      flower.position.set(44.0 + fl, 0.68, 18.6);
      mathGroup.add(flower);
    }

    // Mô hình Khối Rubik 3D khổng lồ phát sáng neon đặt trên bệ đá ở chân tường phải
    const rubikPedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 1.0, 0.5, 16),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
    );
    rubikPedestal.position.set(44.0, 0.25, 19.4);
    mathGroup.add(rubikPedestal);

    const rubik3D = new THREE.Group();
    rubik3D.position.set(44.0, 1.35, 19.4);
    rubik3D.rotation.y = 0.35;
    rubik3D.rotation.x = 0.25;
    const rubikCore = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 })
    );
    rubik3D.add(rubikCore);
    const rubikColors = [0xef4444, 0x3b82f6, 0x22c55e, 0xfacc15, 0xf97316, 0xa855f7];
    for (let rx = -1; rx <= 1; rx++) {
      for (let ry = -1; ry <= 1; ry++) {
        for (let rz = -1; rz <= 1; rz++) {
          if (Math.abs(rx) + Math.abs(ry) + Math.abs(rz) < 2) continue;
          const piece = new THREE.Mesh(
            new THREE.BoxGeometry(0.36, 0.36, 0.36),
            new THREE.MeshStandardMaterial({
              color: rubikColors[(Math.abs(rx * 3 + ry * 2 + rz)) % rubikColors.length],
              roughness: 0.25
            })
          );
          piece.position.set(rx * 0.39, ry * 0.39, rz * 0.39);
          rubik3D.add(piece);
        }
      }
    }
    mathGroup.add(rubik3D);

    // 3. TRẦN NHÀ ĐÔNG DƯƠNG, XÀ GỒ GỖ & 4 QUẠT TRẦN XOAY
    const ceilGeo = new THREE.PlaneGeometry(30.2, 28.2);
    const ceilMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.85 });
    const ceiling = new THREE.Mesh(ceilGeo, ceilMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(35.0, 8.0, 4.0);
    mathGroup.add(ceiling);

    // 4 Quạt trần quay êm ái
    [-6.0, 6.0].forEach(qx => {
      [-2.0, 10.0].forEach(qz => {
        const fanGroup = new THREE.Group();
        fanGroup.position.set(35.0 + qx, 7.2, qz);
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
        rod.position.y = 0.4;
        fanGroup.add(rod);
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.14, 16), new THREE.MeshStandardMaterial({ color: 0x0f766e }));
        fanGroup.add(hub);

        const bladeGroup = new THREE.Group();
        for (let b = 0; b < 3; b++) {
          const blade = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.02, 0.22), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
          blade.position.x = 0.8;
          const bPivot = new THREE.Group();
          bPivot.rotation.y = (b * Math.PI * 2) / 3;
          bPivot.add(blade);
          bladeGroup.add(bPivot);
        }
        fanGroup.add(bladeGroup);
        mathGroup.add(fanGroup);
        this.ceilingFans.push(bladeGroup);
      });
    });

    // 4. BẢNG TỪ XANH KHỔNG LỒ KẺ Ô LY TOÁN HỌC (12m x 4.2m)
    const mathBoardCanvas = document.createElement('canvas');
    mathBoardCanvas.width = 1280;
    mathBoardCanvas.height = 512;
    const mbctx = mathBoardCanvas.getContext('2d');
    mbctx.fillStyle = '#064e3b';
    mbctx.fillRect(0, 0, 1280, 512);

    // Kẻ lưới ô ly 4x4 nhạt
    mbctx.strokeStyle = 'rgba(16, 185, 129, 0.22)';
    mbctx.lineWidth = 1;
    for (let x = 0; x <= 1280; x += 32) {
      mbctx.beginPath(); mbctx.moveTo(x, 0); mbctx.lineTo(x, 512); mbctx.stroke();
    }
    for (let y = 0; y <= 512; y += 32) {
      mbctx.beginPath(); mbctx.moveTo(0, y); mbctx.lineTo(1280, y); mbctx.stroke();
    }

    mbctx.fillStyle = '#fde047';
    mbctx.font = 'bold 32px "Nunito", sans-serif';
    mbctx.textAlign = 'center';
    mbctx.fillText("📐 TOÁN LỚP 5 - BẢNG CÔNG THỨC TRỌNG TÂM CÔ MAI 📐", 640, 45);

    // Cột 1: Hình học & Thể tích
    mbctx.textAlign = 'left';
    mbctx.font = 'bold 23px "Nunito", sans-serif';
    mbctx.fillStyle = '#38bdf8';
    mbctx.fillText("🔷 HÌNH HỌC & THỂ TÍCH:", 40, 95);
    mbctx.fillStyle = '#ffffff';
    mbctx.font = '21px "Nunito", sans-serif';
    mbctx.fillText("• S(tam giác) = (a × h) : 2", 40, 135);
    mbctx.fillText("• S(hình thang) = (a + b) × h : 2", 40, 175);
    mbctx.fillText("• S(hình tròn) = r × r × 3.14", 40, 215);
    mbctx.fillText("• C(hình tròn) = d × 3.14 = r × 2 × 3.14", 40, 255);
    mbctx.fillText("• V(hộp chữ nhật) = a × b × c", 40, 295);
    mbctx.fillText("• V(hình lập phương) = a × a × a", 40, 335);
    mbctx.fillText("• 1 m³ = 1000 dm³ = 1000 lít", 40, 375);

    // Cột 2: Toán Chuyển Động Đều
    mbctx.fillStyle = '#fde047';
    mbctx.font = 'bold 23px "Nunito", sans-serif';
    mbctx.fillText("🚗 TOÁN CHUYỂN ĐỘNG:", 460, 95);
    mbctx.fillStyle = '#ffffff';
    mbctx.font = '21px "Nunito", sans-serif';
    mbctx.fillText("• s = v × t   (Quãng đường)", 460, 135);
    mbctx.fillText("• v = s : t   (Vận tốc)", 460, 175);
    mbctx.fillText("• t = s : v   (Thời gian)", 460, 215);
    mbctx.fillText("• Gặp nhau ngược chiều:", 460, 265);
    mbctx.fillStyle = '#a7f3d0';
    mbctx.fillText("  t(gặp) = s : (v1 + v2)", 460, 300);
    mbctx.fillStyle = '#ffffff';
    mbctx.fillText("• Đuổi kịp cùng chiều:", 460, 340);
    mbctx.fillStyle = '#a7f3d0';
    mbctx.fillText("  t(đuổi) = s : (v1 - v2)", 460, 375);

    // Cột 3: Tỉ Số Phần Trăm & Phân Số
    mbctx.fillStyle = '#f472b6';
    mbctx.font = 'bold 23px "Nunito", sans-serif';
    mbctx.fillText("📊 TỈ SỐ % & THẬP PHÂN:", 880, 95);
    mbctx.fillStyle = '#ffffff';
    mbctx.font = '21px "Nunito", sans-serif';
    mbctx.fillText("• Tỉ số % = (A : B) × 100%", 880, 135);
    mbctx.fillText("• Tìm a% của B = B × a : 100", 880, 175);
    mbctx.fillText("• Giá mới = Gốc × (100% - %giảm)", 880, 215);
    mbctx.fillText("• Phép nhân số thập phân:", 880, 260);
    mbctx.fillStyle = '#fde047';
    mbctx.fillText("  đếm tổng chữ số phần thập phân!", 880, 295);

    mbctx.fillStyle = '#fef08a';
    mbctx.font = 'italic bold 23px "Nunito", sans-serif';
    mbctx.textAlign = 'center';
    mbctx.fillText("✨ 'Toán học là vẻ đẹp của tư duy logic. Chúc các con 5C4 luôn tự tin!' - Cô Mai ✨", 640, 460);

    const mathBoardMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(12.0, 4.2),
      new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(mathBoardCanvas), roughness: 0.55 })
    );
    mathBoardMesh.position.set(35.0, 4.2, -9.65);
    mathGroup.add(mathBoardMesh);

    // Khung nhôm và khay đựng phấn
    const boardFrame = new THREE.Mesh(
      new THREE.BoxGeometry(12.2, 4.4, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 })
    );
    boardFrame.position.set(35.0, 4.2, -9.69);
    mathGroup.add(boardFrame);

    const chalkTray = new THREE.Mesh(
      new THREE.BoxGeometry(12.3, 0.1, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6 })
    );
    chalkTray.position.set(35.0, 1.95, -9.52);
    mathGroup.add(chalkTray);

    // 5. BỘ DỤNG CỤ HÌNH HỌC KHỔNG LỒ CỦA GIÁO VIÊN TOÁN
    const ruler = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 3.2, 0.04),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 })
    );
    ruler.position.set(27.5, 3.2, -9.62);
    ruler.rotation.z = 0.12;
    mathGroup.add(ruler);

    const ekeShape = new THREE.Shape();
    ekeShape.moveTo(0, 0); ekeShape.lineTo(1.6, 0); ekeShape.lineTo(0, 1.6); ekeShape.closePath();
    const ekeHole = new THREE.Path();
    ekeHole.moveTo(0.3, 0.3); ekeHole.lineTo(1.1, 0.3); ekeHole.lineTo(0.3, 1.1); ekeHole.closePath();
    ekeShape.holes.push(ekeHole);
    const ekeMesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(ekeShape, { depth: 0.04, bevelEnabled: false }),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 })
    );
    ekeMesh.position.set(28.2, 2.3, -9.62);
    ekeMesh.rotation.z = -0.15;
    mathGroup.add(ekeMesh);

    // 6. KỆ TRƯNG BÀY KHỐI HÌNH HỌC KHÔNG GIAN 3D (Tường Đông: X = 49.2, Z = -2.0)
    const shelfGroup = new THREE.Group();
    shelfGroup.position.set(49.2, 0, -2.0);

    const shelfBack = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.6, 5.0), new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.5 }));
    shelfBack.position.set(0.25, 1.3, 0);
    shelfGroup.add(shelfBack);

    [0.1, 0.95, 1.8, 2.55].forEach(sy => {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.06, 5.0), new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.4 }));
      plank.position.set(0, sy, 0);
      shelfGroup.add(plank);
    });

    // 6 Khối hình học không gian 3D
    const cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.4, roughness: 0.25 }));
    cubeMesh.position.set(0, 2.15, -1.4); cubeMesh.rotation.y = 0.45; shelfGroup.add(cubeMesh);

    const prismMesh = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.7, 0.9), new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.3, roughness: 0.3 }));
    prismMesh.position.set(0, 2.2, 1.2); prismMesh.rotation.y = -0.3; shelfGroup.add(prismMesh);

    const cylMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.7, 24), new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.3, roughness: 0.3 }));
    cylMesh.position.set(0, 1.35, -1.4); shelfGroup.add(cylMesh);

    const coneMesh = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.72, 24), new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.2, roughness: 0.4 }));
    coneMesh.position.set(0, 1.35, 1.2); shelfGroup.add(coneMesh);

    const sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2, metalness: 0.2 }));
    sphereMesh.position.set(0, 0.46, -1.4); shelfGroup.add(sphereMesh);

    const pyramidMesh = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.68, 4), new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.5, roughness: 0.3 }));
    pyramidMesh.position.set(0, 0.46, 1.2); pyramidMesh.rotation.y = Math.PI / 4; shelfGroup.add(pyramidMesh);

    mathGroup.add(shelfGroup);

    // 7. BỤC GIẢNG & BÀN GIÁO VIÊN CÔ MAI
    const podium = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 2.8, 0.25, 24),
      new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.5 })
    );
    podium.position.set(35.0, 0.12, -6.5);
    podium.receiveShadow = true;
    mathGroup.add(podium);

    const teacherDesk = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.1, 0.95),
      new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.4 })
    );
    teacherDesk.position.set(35.0, 0.65, -6.5);
    teacherDesk.castShadow = true;
    mathGroup.add(teacherDesk);

    const mathBook = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.05, 0.52), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 }));
    mathBook.position.set(34.4, 1.22, -6.5); mathBook.rotation.y = 0.15; mathGroup.add(mathBook);

    const flowerVase = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 0.32, 12), new THREE.MeshStandardMaterial({ color: 0xec4899 }));
    flowerVase.position.set(35.8, 1.34, -6.5); mathGroup.add(flowerVase);

    // 8. DỰNG NPC CÔ MAI (GIÁO VIÊN TOÁN LỚP 5)
    const coMaiGroup = new THREE.Group();
    coMaiGroup.position.set(35.0, 0, -5.2);
    coMaiGroup.rotation.y = Math.PI;

    const aoDaiBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.26, 0.46, 0.92, 18),
      new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.4 })
    );
    aoDaiBody.position.y = 0.54;
    aoDaiBody.castShadow = true;
    coMaiGroup.add(aoDaiBody);

    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.035, 8, 16), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.6 }));
    collar.position.set(0, 0.98, 0); collar.rotation.x = Math.PI / 2; coMaiGroup.add(collar);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 24), new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.3 }));
    head.position.y = 1.28; head.castShadow = true; coMaiGroup.add(head);
    this.attachCurvedFace(head, 'co_lan');

    // Kính mắt tri thức
    const glassesMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8 });
    const glL = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 8, 16), glassesMat);
    glL.position.set(-0.11, 1.29, 0.36); coMaiGroup.add(glL);
    const glR = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 8, 16), glassesMat);
    glR.position.set(0.11, 1.29, 0.36); coMaiGroup.add(glR);

    // Tóc búi trâm ngọc
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 20, 0, Math.PI * 2, 0, Math.PI / 1.7), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 }));
    hair.position.y = 1.34; coMaiGroup.add(hair);

    const hairBun = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 }));
    hairBun.position.set(0, 1.6, -0.22); coMaiGroup.add(hairBun);

    // Thước chỉ bảng
    const pointerStick = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 1.0, 8), new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 }));
    pointerStick.position.set(0.45, 0.92, 0.45); pointerStick.rotation.x = -Math.PI / 3; coMaiGroup.add(pointerStick);

    // Bảng tên Cô Mai
    const tagCanvas = document.createElement('canvas');
    tagCanvas.width = 512; tagCanvas.height = 96;
    const tctx = tagCanvas.getContext('2d');
    tctx.fillStyle = 'rgba(15, 118, 110, 0.92)'; tctx.roundRect(6, 6, 500, 84, 16); tctx.fill();
    tctx.strokeStyle = '#facc15'; tctx.lineWidth = 4; tctx.stroke();
    tctx.fillStyle = '#ffffff'; tctx.font = 'bold 32px "Nunito", sans-serif'; tctx.textAlign = 'center';
    tctx.fillText("📐 Cô Mai - Giáo Viên Toán 5C4", 256, 56);
    const tagMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.34), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(tagCanvas), transparent: true, side: THREE.DoubleSide }));
    tagMesh.position.set(0, 2.05, 0); coMaiGroup.add(tagMesh);

    mathGroup.add(coMaiGroup);

    this.npcs.push({
      id: 'teacher_co_mai',
      name: 'Cô Mai',
      title: 'Giáo Viên Toán Lớp 5',
      group: coMaiGroup,
      worldPos: new THREE.Vector3(35.0, 0, -5.2),
      radius: 3.2,
      icon: '📐',
      prompt: 'Bấm [E] hoặc [F] để Học & Luyện Thi Toán Lớp 5 cùng Cô Mai 📐',
      quotes: [
        "Chào mừng bé Hà My đến với Phòng Học Toán 5C4 rộng rãi, khang trang! Cùng cô giải các bài toán chuyển động đều và phân số nhé! 📐",
        "Học toán rất thú vị khi con nắm vững bản chất công thức và liên hệ vào thực tế đời sống! ✨",
        "Cô Mai có 6 chuyên đề ôn thi chuẩn SGK Kết Nối Tri Thức với lời giải chi tiết dành riêng cho Hà My! 💯"
      ]
    });

    // 9. CÁC SLOGAN CHILL CHILL, TINH NGHỊCH DÁN TRÊN CÁC BỨC TƯỜNG (GEN Z CHALK & POSTER)
    const slogansData = [
      { text1: "HỌC TOÁN KHÔNG QUẠO", text2: "ĐIỂM 10 TỰ VÀO! 😎💯", color: '#0284c7', x: 23.5, y: 4.8, z: -9.65, rotY: 0, w: 4.2, h: 1.8 },
      { text1: "CÂN CẢ VŨ TRỤ HÌNH HỌC", text2: "5C4 MÃI ĐỈNH! 🚀📐", color: '#7c3aed', x: 46.5, y: 4.8, z: -9.65, rotY: 0, w: 4.2, h: 1.8 },
      { text1: "ĐỜI LÀ PHÉP TÍNH:", text2: "VUI THÌ CỘNG, BUỒN THÌ CHIA! ➕➖", color: '#d97706', x: 49.7, y: 4.6, z: 4.0, rotY: -Math.PI / 2, w: 4.5, h: 1.8 },
      { text1: "TỈ LỆ THÍCH HÀ MY:", text2: "100% (KHÔNG CẦN CHỨNG MINH) 💖", color: '#db2777', x: 49.7, y: 4.6, z: 12.0, rotY: -Math.PI / 2, w: 4.5, h: 1.8 },
      { text1: "v = s : t (VẬN TỐC TỚI BÀI THI)", text2: "ĐIỂM 10 CÔ MAI CỰC NHANH! ⚡🚗", color: '#059669', x: 20.3, y: 4.6, z: -5.0, rotY: Math.PI / 2, w: 4.5, h: 1.8 },
      { text1: "TOÁN KHÓ CÓ CÔ MAI LO", text2: "CỨ CHILL ĐI NGẠI CHI! ☕✨", color: '#0891b2', x: 20.3, y: 4.6, z: 12.0, rotY: Math.PI / 2, w: 4.5, h: 1.8 }
    ];

    slogansData.forEach(slg => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 512; pCanvas.height = 256;
      const pctx = pCanvas.getContext('2d');
      pctx.fillStyle = slg.color;
      pctx.roundRect(8, 8, 496, 240, 24);
      pctx.fill();
      pctx.strokeStyle = '#ffffff';
      pctx.lineWidth = 6;
      pctx.stroke();

      pctx.fillStyle = '#ffffff';
      pctx.font = 'bold 32px "Nunito", sans-serif';
      pctx.textAlign = 'center';
      pctx.fillText(slg.text1, 256, 95);
      pctx.fillStyle = '#fef08a';
      pctx.font = 'bold 28px "Nunito", sans-serif';
      pctx.fillText(slg.text2, 256, 165);

      const pMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(slg.w, slg.h),
        new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(pCanvas), roughness: 0.5 })
      );
      pMesh.position.set(slg.x, slg.y, slg.z);
      pMesh.rotation.y = slg.rotY;
      mathGroup.add(pMesh);
    });

    // 10. BÀN HỌC & 4 BẠN HỌC SINH CHIBI NGỒI TRONG LỚP TOÁN ("có cả học sinh ngồi trong")
    const mathStudentsData = [
      {
        id: 'student_gia_huy',
        name: 'Bé Gia Huy',
        icon: '👦',
        shirtColor: 0xf59e0b,
        hairColor: 0x1e293b,
        x: 27.5,
        z: -1.0,
        status: 'Chuyên Gia Giải Toán Nhanh',
        quotes: [
          "Bài toán chuyển động ngược chiều này dễ ợt, áp dụng t = s : (v1 + v2) là xong ngay! 🚗",
          "Cô Mai dạy mẹo tính nhẩm tỉ số % siêu đỉnh luôn á My ơi, đi siêu thị tính giá giảm cực chuẩn! 💯",
          "Hôm nay quyết tâm giải hết 10 câu khó kiếm sao tím khoe cả lớp! ⚡"
        ]
      },
      {
        id: 'student_minh_thu',
        name: 'Bé Minh Thư',
        icon: '👧',
        shirtColor: 0xec4899,
        hairColor: 0x451a03,
        x: 42.5,
        z: -1.0,
        hasBow: true,
        bowColor: 0xf472b6,
        status: 'Lớp Phó Học Tập 5C4',
        quotes: [
          "Hà My ơi, cậu làm bài tính diện tích hình thang trang 94 chưa? Nhớ cộng hai đáy rồi nhân chiều cao chia đôi nha! 📐",
          "Chữ Cô Mai trên bảng đẹp và thẳng tắp luôn, tớ chép nắn nót vào vở nè! ✨",
          "Lớp 5C4 chúng mình thi đua học tốt cả Tiếng Anh lẫn Toán học luôn nha! 🌸"
        ]
      },
      {
        id: 'student_hoang_bach',
        name: 'Bé Hoàng Bách',
        icon: '👦',
        shirtColor: 0x3b82f6,
        hairColor: 0x0f172a,
        x: 27.5,
        z: 7.0,
        hasGlasses: true,
        status: 'Thần Đồng Tính Nhẩm',
        quotes: [
          "1 + 1 = 2, còn 10 điểm Toán = Bé Hà My thông minh nhất lớp! 🏆",
          "Nhân nhẩm số thập phân với 10, 100 chỉ cần lùi dấu phẩy sang phải thôi, dễ như ăn kẹo! 🍬",
          "Tí nữa ra chơi ai ra đánh trống trường và chơi Ô Ăn Quan với tớ không? 🥁"
        ]
      },
      {
        id: 'student_truc_anh',
        name: 'Bé Trúc Anh',
        icon: '👧',
        shirtColor: 0x10b981,
        hairColor: 0x78350f,
        x: 42.5,
        z: 7.0,
        hasFlower: true,
        status: 'Họa Sĩ Hình Học 3D',
        quotes: [
          "Hình học không gian nhìn 3D mê thật sự luôn! Khối lập phương có 6 mặt vuông bằng nhau nè! 📦",
          "Tớ vẽ tặng cô Mai và Hà My bức tranh toán học muôn màu nè, nhìn cute xỉu luôn! 🎨",
          "Học toán vừa rèn tư duy logic lại vừa kích thích trí tưởng tượng bay xa! 💖"
        ]
      }
    ];

    mathStudentsData.forEach((st, idx) => {
      const deskGroup = new THREE.Group();
      deskGroup.position.set(st.x, 0, st.z);

      // Bàn học sinh gỗ ấm
      const sDesk = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.88, 0.8),
        new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 })
      );
      sDesk.position.set(0, 0.44, 0);
      sDesk.castShadow = true;
      deskGroup.add(sDesk);

      // Ghế băng gỗ
      const sBench = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.5, 0.38),
        new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.5 })
      );
      sBench.position.set(0, 0.25, 0.7);
      sBench.castShadow = true;
      deskGroup.add(sBench);

      // Vở bài tập toán mở sẵn
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.03, 0.48),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
      );
      book.position.set(-0.35, 0.9, 0);
      deskGroup.add(book);

      // Bạn học Chibi ngồi học
      const classmate = new THREE.Group();
      classmate.position.set(0, 0.48, 0.65);

      const cBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.28, 0.52, 16),
        new THREE.MeshStandardMaterial({ color: st.shirtColor, roughness: 0.4 })
      );
      cBody.position.y = 0.26;
      classmate.add(cBody);

      const cHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 18, 18),
        new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.3 })
      );
      cHead.position.y = 0.72;
      classmate.add(cHead);

      const cHair = new THREE.Mesh(
        new THREE.SphereGeometry(0.31, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.7),
        new THREE.MeshStandardMaterial({ color: st.hairColor, roughness: 0.5 })
      );
      cHair.position.y = 0.76;
      classmate.add(cHair);

      if (st.hasBow) {
        const bow = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.025, 8, 16), new THREE.MeshStandardMaterial({ color: st.bowColor }));
        bow.position.set(0.18, 0.94, 0.08); classmate.add(bow);
      }
      if (st.hasGlasses) {
        const gl = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.015, 8, 12), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
        gl.position.set(0, 0.74, 0.24); classmate.add(gl);
      }
      if (st.hasFlower) {
        const fl = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
        fl.position.set(-0.2, 0.92, 0.08); classmate.add(fl);
      }

      // Bảng tên học sinh nổi hai mặt
      const nameTagCanvas = document.createElement('canvas');
      nameTagCanvas.width = 256; nameTagCanvas.height = 64;
      const nctx = nameTagCanvas.getContext('2d');
      nctx.fillStyle = 'rgba(15, 23, 42, 0.85)'; nctx.roundRect(4, 4, 248, 56, 12); nctx.fill();
      nctx.strokeStyle = '#38bdf8'; nctx.lineWidth = 3; nctx.stroke();
      nctx.fillStyle = '#ffffff'; nctx.font = 'bold 26px "Nunito", sans-serif'; nctx.textAlign = 'center';
      nctx.fillText(st.name, 128, 40);

      const nameTag = new THREE.Mesh(
        new THREE.PlaneGeometry(0.95, 0.24),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(nameTagCanvas), transparent: true, side: THREE.DoubleSide })
      );
      nameTag.position.set(0, 1.25, 0);
      classmate.add(nameTag);

      deskGroup.add(classmate);
      mathGroup.add(deskGroup);

      this.npcs.push({
        id: st.id,
        name: st.name,
        title: st.status,
        group: classmate,
        worldPos: new THREE.Vector3(st.x, 0, st.z),
        radius: 2.5,
        quotes: st.quotes,
        icon: st.icon,
        prompt: `Bấm [E] hoặc [F] để trò chuyện với ${st.name}`
      });

      this.classmates.push({
        group: classmate,
        head: cHead,
        baseY: 0.72,
        phase: (idx + 10) * 1.3
      });
    });

    this.scene.add(mathGroup);
  }

  // ------------------------------------------------------------
  // ZONE 1C: TRỐNG TRƯỜNG TRUYỀN THỐNG & SÂN CHƠI DÂN GIAN Ô ĂN QUAN
  // Vị trí Trống Trường: X = 17.5, Z = 22.0 (Ngoài sân trường thoáng đãng trước hành lang nối)
  // Vị trí Ô Ăn Quan: X = 24.0, Z = 22.0 (Sân gạch râm mát rộng rãi)
  // ------------------------------------------------------------
  buildSchoolDrumAndFolkGamesZone() {
    const drumFolkGroup = new THREE.Group();

    // 1. CHIẾC TRỐNG TRƯỜNG DA TRÂU TRUYỀN THỐNG (School Drum on X-Stand)
    const drumGroup = new THREE.Group();
    drumGroup.position.set(17.5, 0, 22.0);

    const drumBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.72, 1.45, 28),
      new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.35, metalness: 0.1 })
    );
    drumBody.rotation.z = Math.PI / 2;
    drumBody.position.y = 1.35;
    drumBody.castShadow = true;
    drumGroup.add(drumBody);

    [-0.45, 0, 0.45].forEach(dx => {
      const hoop = new THREE.Mesh(
        new THREE.TorusGeometry(0.73, 0.04, 8, 28),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.5, roughness: 0.4 })
      );
      hoop.rotation.y = Math.PI / 2;
      hoop.position.set(dx, 1.35, 0);
      drumGroup.add(hoop);
    });

    [-0.73, 0.73].forEach(dx => {
      const headDisc = new THREE.Mesh(
        new THREE.CircleGeometry(0.71, 28),
        new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.8 })
      );
      headDisc.rotation.y = dx < 0 ? -Math.PI / 2 : Math.PI / 2;
      headDisc.position.set(dx, 1.35, 0);
      drumGroup.add(headDisc);

      const rivetRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.68, 0.025, 8, 28),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8 })
      );
      rivetRing.rotation.y = Math.PI / 2;
      rivetRing.position.set(dx, 1.35, 0);
      drumGroup.add(rivetRing);
    });

    const standMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.6 });
    [-0.5, 0.5].forEach(sx => {
      const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.7, 0.12), standMat);
      leg1.position.set(sx, 0.8, 0); leg1.rotation.x = 0.42; drumGroup.add(leg1);
      const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.7, 0.12), standMat);
      leg2.position.set(sx, 0.8, 0); leg2.rotation.x = -0.42; drumGroup.add(leg2);
    });

    const stretcher = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.08), standMat);
    stretcher.position.set(0, 0.4, 0); drumGroup.add(stretcher);

    const mallet = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.65, 12), new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 }));
    mallet.rotation.z = Math.PI / 2; mallet.position.set(0, 1.15, 0.65); drumGroup.add(mallet);

    const malletCloth = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
    malletCloth.position.set(-0.32, 1.15, 0.65); drumGroup.add(malletCloth);

    const drumLabelCanvas = document.createElement('canvas');
    drumLabelCanvas.width = 384; drumLabelCanvas.height = 80;
    const dlctx = drumLabelCanvas.getContext('2d');
    dlctx.fillStyle = 'rgba(153, 27, 27, 0.9)'; dlctx.roundRect(4, 4, 376, 72, 12); dlctx.fill();
    dlctx.strokeStyle = '#facc15'; dlctx.lineWidth = 4; dlctx.stroke();
    dlctx.fillStyle = '#ffffff'; dlctx.font = 'bold 26px "Nunito", sans-serif'; dlctx.textAlign = 'center';
    dlctx.fillText("TRỐNG TRƯỜNG NGÔ QUYỀN 🥁", 192, 48);

    const drumLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 0.3),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(drumLabelCanvas), transparent: true, side: THREE.DoubleSide })
    );
    drumLabel.position.set(0, 2.3, 0);
    drumGroup.add(drumLabel);

    drumFolkGroup.add(drumGroup);

    // 2. SÂN TRÒ CHƠI DÂN GIAN Ô ĂN QUAN (X = 24.0, Z = 22.0)
    const folkGroup = new THREE.Group();
    folkGroup.position.set(24.0, 0.04, 22.0);

    const boardCanvas = document.createElement('canvas');
    boardCanvas.width = 512; boardCanvas.height = 256;
    const bctx = boardCanvas.getContext('2d');
    bctx.fillStyle = '#e2e8f0'; bctx.fillRect(0, 0, 512, 256);
    bctx.strokeStyle = '#ffffff'; bctx.lineWidth = 6;
    bctx.strokeRect(96, 48, 320, 160);
    bctx.beginPath();
    bctx.moveTo(96, 128); bctx.lineTo(416, 128);
    for (let col = 1; col < 5; col++) {
      const cx = 96 + col * 64; bctx.moveTo(cx, 48); bctx.lineTo(cx, 208);
    }
    bctx.stroke();

    bctx.beginPath(); bctx.arc(96, 128, 80, Math.PI / 2, (3 * Math.PI) / 2); bctx.stroke();
    bctx.beginPath(); bctx.arc(416, 128, 80, -Math.PI / 2, Math.PI / 2); bctx.stroke();

    bctx.fillStyle = '#1e293b'; bctx.font = 'bold 20px "Nunito", sans-serif'; bctx.textAlign = 'center';
    bctx.fillText("Ô ĂN QUAN DÂN GIAN", 256, 32);

    const boardMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 1.8),
      new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(boardCanvas), roughness: 0.7 })
    );
    boardMesh.rotation.x = -Math.PI / 2;
    boardMesh.position.y = 0.01;
    folkGroup.add(boardMesh);

    const quanMatL = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.3 });
    const quanMatR = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.3, metalness: 0.3 });
    const quanL = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14), quanMatL);
    quanL.position.set(-1.4, 0.1, 0); folkGroup.add(quanL);
    const quanR = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14), quanMatR);
    quanR.position.set(1.4, 0.1, 0); folkGroup.add(quanR);

    const pebbleColors = [0xf59e0b, 0x10b981, 0x8b5cf6, 0xec4899, 0x64748b];
    for (let row = -0.28; row <= 0.28; row += 0.56) {
      for (let col = -0.9; col <= 0.9; col += 0.45) {
        for (let p = 0; p < 4; p++) {
          const pMat = new THREE.MeshStandardMaterial({ color: pebbleColors[(p + col) % pebbleColors.length] });
          const pebble = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), pMat);
          pebble.position.set(col + (Math.random() - 0.5) * 0.15, 0.04, row + (Math.random() - 0.5) * 0.15);
          folkGroup.add(pebble);
        }
      }
    }

    const folkSignCanvas = document.createElement('canvas');
    folkSignCanvas.width = 384; folkSignCanvas.height = 80;
    const fsctx = folkSignCanvas.getContext('2d');
    fsctx.fillStyle = 'rgba(180, 83, 9, 0.9)'; fsctx.roundRect(4, 4, 376, 72, 12); fsctx.fill();
    fsctx.strokeStyle = '#fef08a'; fsctx.lineWidth = 4; fsctx.stroke();
    fsctx.fillStyle = '#ffffff'; fsctx.font = 'bold 24px "Nunito", sans-serif'; fsctx.textAlign = 'center';
    fsctx.fillText("Ô ĂN QUAN TRÍ TUỆ 🌾", 192, 48);

    const folkSign = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 0.3),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(folkSignCanvas), transparent: true, side: THREE.DoubleSide })
    );
    folkSign.position.set(0, 1.2, -1.1);
    folkGroup.add(folkSign);

    drumFolkGroup.add(folkGroup);

    this.scene.add(drumFolkGroup);
  }

  // ------------------------------------------------------------
  // NPC XUÂN MY (TRƯỞNG BAN ĐỘI SAO ĐỎ - GIAO NHIỆM VỤ CHÍNH)
  // ------------------------------------------------------------
  buildNPCXuanMy() {
    const xuanMyGroup = new THREE.Group();
    // Đặt Xuân My ngay tại sảnh sân trường trước cổng lớp học 5C4 (ngoài cửa lớp Z = 18.0)
    xuanMyGroup.position.set(6.5, 0, 20.5);
    xuanMyGroup.rotation.y = -Math.PI / 4; // Quay mặt thân thiện đón chào học sinh

    // Chậu cây cảnh trang trí bên cạnh điểm giao nhiệm vụ
    const potGeo = new THREE.CylinderGeometry(0.38, 0.28, 0.6, 16);
    const potMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(0.95, 0.3, 0);
    pot.receiveShadow = true;
    xuanMyGroup.add(pot);

    const bushGeo = new THREE.SphereGeometry(0.48, 12, 12);
    const bushMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.8 });
    const bush = new THREE.Mesh(bushGeo, bushMat);
    bush.position.set(0.95, 0.8, 0);
    xuanMyGroup.add(bush);

    // 1. Thân áo đầm Chibi màu cam đào / vàng tươi
    const dressGeo = new THREE.CylinderGeometry(0.26, 0.45, 0.75, 18);
    const dressMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 });
    const dress = new THREE.Mesh(dressGeo, dressMat);
    dress.position.y = 0.42;
    dress.castShadow = true;
    xuanMyGroup.add(dress);

    // 2. Đầu Chibi xinh xắn
    const headGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.3 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.05;
    head.castShadow = true;
    xuanMyGroup.add(head);

    // Gương mặt Anime Chibi long lanh của Trưởng Ban Đội Sao Đỏ Xuân My
    this.attachCurvedFace(head, 'xuan_my');

    // 3. Mái tóc Chibi uốn lọn dễ thương
    const hairGeo = new THREE.SphereGeometry(0.42, 20, 20, 0, Math.PI * 2, 0, Math.PI / 1.7);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.6 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.y = 1.1;
    xuanMyGroup.add(hair);

    // Băng đô hoa nơ xinh xắn
    const bowGeo = new THREE.TorusGeometry(0.41, 0.05, 8, 24);
    const bowMat = new THREE.MeshStandardMaterial({ color: 0xfde047 });
    const bow = new THREE.Mesh(bowGeo, bowMat);
    bow.rotation.x = Math.PI / 2.3;
    bow.position.y = 1.12;
    xuanMyGroup.add(bow);

    // 4. Bảng nhiệm vụ cầm trên tay (Quest Clipboard)
    const boardGeo = new THREE.BoxGeometry(0.4, 0.55, 0.04);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0xb45309 });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.set(-0.35, 0.65, 0.25);
    board.rotation.y = 0.4;
    board.castShadow = true;
    xuanMyGroup.add(board);

    // Cánh tay chào thân thiện
    const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.45, 12), dressMat);
    armR.position.set(0.38, 0.75, 0.1);
    armR.rotation.z = -Math.PI / 3.5;
    xuanMyGroup.add(armR);

    // 5. Bảng Tên 3D Nổi: "📜 Xuân My (Giao Nhiệm Vụ)"
    const nameCanvas = document.createElement('canvas');
    nameCanvas.width = 512;
    nameCanvas.height = 128;
    const nctx = nameCanvas.getContext('2d');
    nctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    nctx.roundRect(8, 8, 496, 112, 24);
    nctx.fill();
    nctx.strokeStyle = '#facc15';
    nctx.lineWidth = 6;
    nctx.stroke();
    nctx.fillStyle = '#fef08a';
    nctx.font = 'bold 44px "Nunito", sans-serif';
    nctx.textAlign = 'center';
    nctx.fillText("📜 Xuân My (Giao Nhiệm Vụ)", 256, 75);

    const nameTex = new THREE.CanvasTexture(nameCanvas);
    const namePlate = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.45), new THREE.MeshBasicMaterial({ map: nameTex, transparent: true }));
    namePlate.position.set(0, 1.75, 0);
    xuanMyGroup.add(namePlate);

    // 6. DẤU CHẤM THAN [!] VÀNG KIM XOAY LƠ LỬNG TRÊN ĐẦU
    const exMark = this.createFloatingExclamationMark();
    exMark.position.set(0, 2.3, 0);
    xuanMyGroup.add(exMark);
    this.exclamationMarks.push(exMark);

    this.scene.add(xuanMyGroup);

    // Đăng ký NPC
    this.npcs.push({
      id: 'xuan_my',
      name: 'Xuân My',
      title: 'Trưởng Ban Sao Đỏ 5C4',
      group: xuanMyGroup,
      armR: armR,
      worldPos: new THREE.Vector3(6.5, 0, 20.5),
      radius: 3.2,
      prompt: 'Bấm [E] hoặc [F] để nhận Nhiệm Vụ từ Xuân My'
    });
  }

  // ------------------------------------------------------------
  // TẠO DẤU CHẤM THAN [!] VÀNG KIM 3D XOAY LƠ LỬNG
  // ------------------------------------------------------------
  createFloatingExclamationMark() {
    const markGroup = new THREE.Group();

    // Thân gậy dấu chấm than
    const barGeo = new THREE.CylinderGeometry(0.12, 0.06, 0.45, 16);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.65,
      metalness: 0.6,
      roughness: 0.2
    });
    const bar = new THREE.Mesh(barGeo, goldMat);
    bar.position.y = 0.35;
    markGroup.add(bar);

    // Dấu chấm tròn phía dưới
    const dotGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const dot = new THREE.Mesh(dotGeo, goldMat);
    dot.position.y = 0.05;
    markGroup.add(dot);

    return markGroup;
  }

  buildBlackboard(parentGroup) {
    this.blackboardCanvas = document.createElement('canvas');
    this.blackboardCanvas.width = 2048;
    this.blackboardCanvas.height = 1024;
    this.updateBlackboardText("🏫 LỚP 5C4 - TIẾNG ANH GLOBAL SUCCESS", "Dùng phím WASD hoặc Mũi Tên để đi lại tự do!");

    this.blackboardTexture = new THREE.CanvasTexture(this.blackboardCanvas);

    // Khung bảng đen mở rộng hoành tráng (11.2m x 4.8m)
    const frameGeo = new THREE.BoxGeometry(11.2, 4.8, 0.15);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.6 }); // Viền gỗ sồi
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(0, 4.2, -9.3);
    frame.castShadow = true;

    const faceGeo = new THREE.PlaneGeometry(10.8, 4.5);
    const faceMat = new THREE.MeshStandardMaterial({
      map: this.blackboardTexture,
      roughness: 0.6
    });
    const face = new THREE.Mesh(faceGeo, faceMat);
    face.position.set(0, 0, 0.09); // Đặt chính xác trên bề mặt trước của khung bảng
    frame.add(face);

    // Khay đựng phấn & giẻ lau
    const ledgeGeo = new THREE.BoxGeometry(11.0, 0.14, 0.38);
    const ledge = new THREE.Mesh(ledgeGeo, frameMat);
    ledge.position.set(0, -2.35, 0.18);
    frame.add(ledge);

    parentGroup.add(frame);
  }

  updateBlackboardText(param1, param2 = "", formula = "") {
    if (!this.blackboardCanvas) return;
    const ctx = this.blackboardCanvas.getContext('2d');
    const w = this.blackboardCanvas.width;
    const h = this.blackboardCanvas.height;

    // Phân giải tham số thông minh:
    let situationText = "";
    let questionPrompt = "";
    let formulaText = formula;

    if (param2 && param2.trim().length > 0) {
      situationText = param1;
      questionPrompt = param2;
    } else {
      questionPrompt = param1;
      situationText = "TRƯỜNG TIỂU HỌC NGÔ QUYỀN - LỚP 5C4";
    }

    // 1. Mặt bảng đen nhám xanh đậm chuẩn học đường
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, w, h);

    // Đường kẻ ô li mờ tinh tế
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    for (let y = 60; y < h; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 2. Banner tiêu đề đầu bảng
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 50px "Nunito", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("⭐ TIẾNG ANH 5 GLOBAL SUCCESS - THẦY TUẤN 5C4 ⭐", w / 2, 85);

    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 500, 105);
    ctx.lineTo(w / 2 + 500, 105);
    ctx.stroke();

    // 3. Situation Pill Box (Chủ đề / Vị trí bài học)
    if (situationText) {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
      ctx.roundRect(w / 2 - 450, 125, 900, 60, 16);
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#67e8f9';
      ctx.font = 'bold 36px "Nunito", sans-serif';
      ctx.fillText("📖 " + situationText, w / 2, 168);
    }

    // 4. ĐỀ BÀI CÂU HỎI TIẾNG ANH CHÍNH GIỮA BẢNG (CHỮ TO 84px, RÕ NÉT, NỔI BẬT)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 84px "Nunito", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 8;

    const words = (questionPrompt || "").split(' ');
    let lines = [];
    let currentLine = words[0] || "";

    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + " " + words[i];
      if (ctx.measureText(testLine).width < w - 200) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);

    const lineSpacing = 100;
    const startY = (lines.length === 1) ? 380 : (lines.length === 2 ? 330 : 280);
    lines.forEach((line, idx) => {
      ctx.fillText(line, w / 2, startY + idx * lineSpacing);
    });
    ctx.shadowBlur = 0;

    // 5. Khung Bí Kíp / Công Thức Ngữ Pháp của Thầy Tuấn
    if (formulaText) {
      ctx.fillStyle = 'rgba(254, 240, 138, 0.15)';
      ctx.roundRect(140, 670, w - 280, 140, 24);
      ctx.fill();
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 44px "Nunito", sans-serif';
      ctx.fillText("💡 BÍ KÍP CỦA THẦY TUẤN: " + formulaText, w / 2, 755);
    }

    // 6. Nhắc phím phía dưới chân bảng
    ctx.fillStyle = '#a7f3d0';
    ctx.font = 'bold 36px "Nunito", sans-serif';
    ctx.fillText("🎮 Di chuyển đến bục chữ cái A/B/C/D đúng và bấm [SPACE] để chọn!", w / 2, 920);

    if (this.blackboardTexture) {
      this.blackboardTexture.needsUpdate = true;
    }
  }

  buildWindow(x, y, z, parentGroup, rotY = 0) {
    const winGroup = new THREE.Group();
    winGroup.position.set(x, y, z);
    winGroup.rotation.y = rotY;

    const frameMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }); // Khung gỗ trắng thanh lịch
    const sillMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.5 });  // Bệ cửa sổ gỗ nâu ấm

    const width = 2.4;
    const height = 2.8;
    const frameThick = 0.08;
    const depth = 0.15;

    // 1. Khung viền 4 cạnh sổ mở rỗng ở giữa (không phải khối kín che tầm nhìn)
    const hBarGeo = new THREE.BoxGeometry(width, frameThick, depth);
    const topBar = new THREE.Mesh(hBarGeo, frameMat);
    topBar.position.y = height / 2;
    winGroup.add(topBar);

    const bottomBar = new THREE.Mesh(hBarGeo, frameMat);
    bottomBar.position.y = -height / 2;
    winGroup.add(bottomBar);

    const vBarGeo = new THREE.BoxGeometry(frameThick, height, depth);
    const leftBar = new THREE.Mesh(vBarGeo, frameMat);
    leftBar.position.x = -width / 2;
    winGroup.add(leftBar);

    const rightBar = new THREE.Mesh(vBarGeo, frameMat);
    rightBar.position.x = width / 2;
    winGroup.add(rightBar);

    // 2. Nan chữ thập chia 4 ô cửa sổ kính (+)
    const midH = new THREE.Mesh(new THREE.BoxGeometry(width, 0.04, depth * 0.8), frameMat);
    winGroup.add(midH);

    const midV = new THREE.Mesh(new THREE.BoxGeometry(0.04, height, depth * 0.8), frameMat);
    winGroup.add(midV);

    // 3. Mặt kính trong suốt đón ánh sáng tự nhiên với phản xạ PBR
    const glassGeo = new THREE.PlaneGeometry(width - 0.08, height - 0.08);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.32,
      roughness: 0.04,
      metalness: 0.18
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.z = 0.02;
    winGroup.add(glass);

    // 4. Bệ cửa sổ phía dưới (Window Sill)
    const sill = new THREE.Mesh(new THREE.BoxGeometry(width + 0.35, 0.08, depth + 0.18), sillMat);
    sill.position.set(0, -height / 2 - 0.04, 0.08);
    sill.receiveShadow = true;
    winGroup.add(sill);

    // 5. Cánh cửa chớp gỗ Indochine (French-Indochine Louvered Shutters) mở 2 bên đón nắng
    const shutterMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.5 });
    const shutterW = 0.56;
    const shutterH = height - 0.12;

    const shutterL = new THREE.Group();
    shutterL.position.set(-width / 2 - 0.02, 0, 0.08);
    shutterL.rotation.y = -0.42;
    const sFrameL = new THREE.Mesh(new THREE.BoxGeometry(shutterW, shutterH, 0.05), shutterMat);
    shutterL.add(sFrameL);
    for (let sl = -shutterH / 2 + 0.18; sl < shutterH / 2 - 0.12; sl += 0.24) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(shutterW - 0.08, 0.025, 0.06), shutterMat);
      slat.position.set(0, sl, 0);
      slat.rotation.x = 0.35;
      shutterL.add(slat);
    }
    winGroup.add(shutterL);

    const shutterR = new THREE.Group();
    shutterR.position.set(width / 2 + 0.02, 0, 0.08);
    shutterR.rotation.y = 0.42;
    const sFrameR = new THREE.Mesh(new THREE.BoxGeometry(shutterW, shutterH, 0.05), shutterMat);
    shutterR.add(sFrameR);
    for (let sl = -shutterH / 2 + 0.18; sl < shutterH / 2 - 0.12; sl += 0.24) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(shutterW - 0.08, 0.025, 0.06), shutterMat);
      slat.position.set(0, sl, 0);
      slat.rotation.x = -0.35;
      shutterR.add(slat);
    }
    winGroup.add(shutterR);

    parentGroup.add(winGroup);
  }

  // ------------------------------------------------------------
  // ZONE 2: NHÀ ĂN & CĂN TIN TRƯỜNG HỌC (Cafeteria Zone & Bác Bếp Bear)
  // Tọa độ đặt tại X = -26, Z = 16 (Bên trái sân trường)
  // ------------------------------------------------------------
  buildCafeteriaZone() {
    const cafeGroup = new THREE.Group();
    cafeGroup.position.set(-26, 0, 16);

    // Sàn gạch nhà ăn màu cam sữa 18m x 16m
    const cafeFloorGeo = new THREE.PlaneGeometry(18, 16);
    const cafeFloorMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.4 });
    const cafeFloor = new THREE.Mesh(cafeFloorGeo, cafeFloorMat);
    cafeFloor.rotation.x = -Math.PI / 2;
    cafeFloor.position.y = 0.02;
    cafeFloor.receiveShadow = true;
    cafeGroup.add(cafeFloor);

    // Mái che sọc cam trắng xinh xắn (Awning Canopy)
    const roofGeo = new THREE.BoxGeometry(14, 0.6, 6);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.5 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 4.8, -4.5);
    roof.rotation.x = 0.15;
    cafeGroup.add(roof);

    // Biển hiệu Căn Tin 5C4
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sctx = signCanvas.getContext('2d');
    sctx.fillStyle = '#ea580c';
    sctx.fillRect(0, 0, 512, 128);
    sctx.strokeStyle = '#fed7aa';
    sctx.lineWidth = 8;
    sctx.strokeRect(4, 4, 504, 120);
    sctx.fillStyle = '#ffffff';
    sctx.font = 'bold 44px "Nunito", sans-serif';
    sctx.textAlign = 'center';
    sctx.fillText("🍔 CĂN TIN TRƯỜNG HỌC 5C4", 256, 80);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 1.4), new THREE.MeshBasicMaterial({ map: signTex }));
    sign.position.set(0, 5.6, -4.2);
    cafeGroup.add(sign);

    // Quầy phục vụ đồ ăn dài (Counter)
    const counterGeo = new THREE.BoxGeometry(10, 1.2, 1.4);
    const counterMat = new THREE.MeshStandardMaterial({ color: 0xd97706 });
    const counter = new THREE.Mesh(counterGeo, counterMat);
    counter.position.set(0, 0.6, -3.5);
    counter.castShadow = true;
    counter.receiveShadow = true;
    cafeGroup.add(counter);

    this.solidPlatforms.push({
      worldX: -26,
      worldY: 0.6,
      topY: 1.2,
      worldZ: 16 - 3.5,
      halfW: 5.2,
      halfD: 0.8
    });

    // Món ăn 3D trên quầy phục vụ (Pizza, Dưa hấu, Hộp sữa, Kem)
    const pizza = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.08, 16), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
    pizza.position.set(-2.5, 1.25, -3.5);
    cafeGroup.add(pizza);

    const melon = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 12), new THREE.MeshStandardMaterial({ color: 0x16a34a }));
    melon.position.set(-0.8, 1.35, -3.5);
    cafeGroup.add(melon);

    const milk = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.48, 0.28), new THREE.MeshStandardMaterial({ color: 0x38bdf8 }));
    milk.position.set(0.8, 1.45, -3.5);
    cafeGroup.add(milk);

    const icecream = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.55, 12), new THREE.MeshStandardMaterial({ color: 0xec4899 }));
    icecream.position.set(2.5, 1.48, -3.5);
    cafeGroup.add(icecream);

    // Bàn ăn tròn ngoài trời với dù che nắng
    [-4, 4].forEach(tx => {
      const table = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.1, 24), new THREE.MeshStandardMaterial({ color: 0xca8a04 }));
      table.position.set(tx, 0.85, 2.5);
      cafeGroup.add(table);

      const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.85, 12), new THREE.MeshStandardMaterial({ color: 0x64748b }));
      tableLeg.position.set(tx, 0.425, 2.5);
      cafeGroup.add(tableLeg);

      // Cây dù che nắng (Umbrella)
      const umbPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.8, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      umbPole.position.set(tx, 1.4, 2.5);
      cafeGroup.add(umbPole);

      const umbTop = new THREE.Mesh(new THREE.ConeGeometry(2.0, 0.8, 16), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      umbTop.position.set(tx, 2.8, 2.5);
      cafeGroup.add(umbTop);
    });

    // NPC BÁC ĐẦU BẾP (CHEF BEAR) ĐỨNG SAU QUẦY
    this.buildChefBearNPC(cafeGroup);

    this.scene.add(cafeGroup);
  }

  // ------------------------------------------------------------
  // DỰNG NPC BÁC BẾP BEAR (CHEF BEAR)
  // ------------------------------------------------------------
  buildChefBearNPC(cafeGroup) {
    const chefGroup = new THREE.Group();
    chefGroup.position.set(0, 0.6, -4.8);

    // Thân Chibi Gấu mặc áo đầu bếp trắng
    const bodyGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.8, 18);
    const coatMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const body = new THREE.Mesh(bodyGeo, coatMat);
    body.position.y = 0.4;
    body.castShadow = true;
    chefGroup.add(body);

    // Đầu gấu Chibi nâu ấm
    const headGeo = new THREE.SphereGeometry(0.42, 20, 20);
    const bearMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, bearMat);
    head.position.y = 1.15;
    chefGroup.add(head);

    // Gương mặt Chibi Gấu đáng yêu: Mắt cúc áo đen bóng, má hồng, mõm kem, nụ cười hiền lành
    this.attachCurvedFace(head, 'chef_bear');

    // Tai gấu tròn
    [-0.32, 0.32].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), bearMat);
      ear.position.set(ex, 1.5, 0);
      chefGroup.add(ear);
    });

    // Mũ đầu bếp cao màu trắng (Toque Blanche)
    const hatBase = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.34, 0.22, 16), coatMat);
    hatBase.position.y = 1.6;
    chefGroup.add(hatBase);

    const hatTop = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), coatMat);
    hatTop.position.y = 1.85;
    chefGroup.add(hatTop);

    // Bảng tên 3D: "👨‍🍳 Bác Bếp Bear (Căn Tin)"
    const nameCanvas = document.createElement('canvas');
    nameCanvas.width = 512;
    nameCanvas.height = 128;
    const nctx = nameCanvas.getContext('2d');
    nctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    nctx.roundRect(8, 8, 496, 112, 24);
    nctx.fill();
    nctx.strokeStyle = '#f97316';
    nctx.lineWidth = 6;
    nctx.stroke();
    nctx.fillStyle = '#ffedd5';
    nctx.font = 'bold 42px "Nunito", sans-serif';
    nctx.textAlign = 'center';
    nctx.fillText("👨‍🍳 Bác Bếp Bear (Căn Tin)", 256, 75);

    const nameTex = new THREE.CanvasTexture(nameCanvas);
    const namePlate = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.45), new THREE.MeshBasicMaterial({ map: nameTex, transparent: true }));
    namePlate.position.set(0, 2.45, 0);
    chefGroup.add(namePlate);

    // Dấu chấm than [!] vàng kim trên đầu
    const exMark = this.createFloatingExclamationMark();
    exMark.position.set(0, 2.95, 0);
    chefGroup.add(exMark);
    this.exclamationMarks.push(exMark);

    cafeGroup.add(chefGroup);

    // Đăng ký NPC Bác Bếp Bear
    this.npcs.push({
      id: 'chef_bear',
      name: 'Bác Bếp Bear',
      title: 'Đầu Bếp Căn Tin 5C4',
      group: chefGroup,
      worldPos: new THREE.Vector3(-26, 0.6, 16 - 3.5),
      radius: 2.8,
      prompt: 'Bấm [E] hoặc [F] để Gọi Món & Học Từ Vựng'
    });
  }

  // ------------------------------------------------------------
  // ZONE 3: SÂN TRƯỜNG, ĐÀI PHUN NƯỚC & CỘT CỜ TỔ QUỐC VIỆT NAM
  // Tọa độ đặt tại trung tâm sân trường (Z = 18 đến 45)
  // ------------------------------------------------------------
  buildSchoolYardZone() {
    const yardGroup = new THREE.Group();
    yardGroup.position.set(0, 0, 0);

    // Lối đi gạch trung tâm từ cổng trước lớp học (Z = 19.0) đến gần cổng trường (Z = 53.0)
    const mainPathTex = this.createWalkwayTerrazzoTexture();
    mainPathTex.repeat.set(3, 14);
    const mainPathNorm = this.createWalkwayTerrazzoNormalTexture();
    mainPathNorm.repeat.set(3, 14);
    const mainPathMat = new THREE.MeshStandardMaterial({
      map: mainPathTex,
      normalMap: mainPathNorm,
      normalScale: new THREE.Vector2(0.6, 0.6),
      roughness: 0.58,
      metalness: 0.05
    });

    const mainPathGeo = new THREE.PlaneGeometry(7.0, 34);
    const mainPath = new THREE.Mesh(mainPathGeo, mainPathMat);
    mainPath.rotation.x = -Math.PI / 2;
    mainPath.position.set(0, 0.025, 36.0);
    mainPath.receiveShadow = true;
    yardGroup.add(mainPath);

    // Gờ đá viền bảo vệ 2 bên lối đi chính
    const curbMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.7 });
    [-3.5, 3.5].forEach(cx => {
      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.08, 34), curbMat);
      curb.position.set(cx, 0.04, 36.0);
      yardGroup.add(curb);
    });

    // Đường rẽ chữ thập sang Căn Tin (trái) và Hồ Câu Cá (phải) tại Z = 23.0
    const crossPathTex = this.createWalkwayTerrazzoTexture();
    crossPathTex.repeat.set(16, 2);
    const crossPathNorm = this.createWalkwayTerrazzoNormalTexture();
    crossPathNorm.repeat.set(16, 2);
    const crossPathMat = new THREE.MeshStandardMaterial({
      map: crossPathTex,
      normalMap: crossPathNorm,
      normalScale: new THREE.Vector2(0.6, 0.6),
      roughness: 0.58,
      metalness: 0.05
    });
    const crossPathGeo = new THREE.PlaneGeometry(50, 4.5);
    const crossPath = new THREE.Mesh(crossPathGeo, crossPathMat);
    crossPath.rotation.x = -Math.PI / 2;
    crossPath.position.set(0, 0.026, 23.0);
    crossPath.receiveShadow = true;
    yardGroup.add(crossPath);

    // 1. ĐÀI PHUN NƯỚC TRÒN TRUNG TÂM SÂN TRƯỜNG (Z = 30.5m)
    const fountainZ = 30.5;

    // Vỉa hè đá tròn bao quanh đài phun nước
    const fRingGeo = new THREE.CylinderGeometry(4.2, 4.3, 0.08, 32);
    const fRingMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
    const fRing = new THREE.Mesh(fRingGeo, fRingMat);
    fRing.position.set(0, 0.04, fountainZ);
    fRing.receiveShadow = true;
    yardGroup.add(fRing);

    // Bể chứa nước tầng 1 (bán kính 3.2m)
    const fBaseGeo = new THREE.CylinderGeometry(3.0, 3.2, 0.6, 32);
    const fBaseMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.4 });
    const fBase = new THREE.Mesh(fBaseGeo, fBaseMat);
    fBase.position.set(0, 0.35, fountainZ);
    fBase.receiveShadow = true;
    yardGroup.add(fBase);

    // Mặt nước hồ trong xanh lung linh PBR với sóng nước chuyển động và phản quang mặt trời
    this.waterNormalTex = this.createWaterNormalTexture(256);
    this.waterNormalTex.repeat.set(4, 4);
    const waterGeo = new THREE.CylinderGeometry(2.75, 2.75, 0.12, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.04,
      metalness: 0.18,
      normalMap: this.waterNormalTex,
      normalScale: new THREE.Vector2(0.48, 0.48),
      transparent: true,
      opacity: 0.85
    });
    this.fountainWater = new THREE.Mesh(waterGeo, waterMat);
    this.fountainWater.position.set(0, 0.65, fountainZ);
    yardGroup.add(this.fountainWater);

    // Hoa súng hồng & lá sen tròn nổi trên mặt đài phun nước
    const lotusPadMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5, side: THREE.DoubleSide });
    const lotusPetalMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 });
    const lotusCenterMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

    [
      { r: 1.8, a: 0.5 }, { r: 2.1, a: 2.4 }, { r: 1.9, a: 4.2 }
    ].forEach(lp => {
      const pad = new THREE.Mesh(new THREE.CircleGeometry(0.38, 14), lotusPadMat);
      pad.rotation.x = -Math.PI / 2;
      pad.position.set(Math.cos(lp.a) * lp.r, 0.68, fountainZ + Math.sin(lp.a) * lp.r);
      yardGroup.add(pad);

      const flower = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16, 0), lotusPetalMat);
      flower.position.set(pad.position.x, 0.76, pad.position.z);
      yardGroup.add(flower);

      const center = new THREE.Mesh(new THREE.SphereGeometry(0.06), lotusCenterMat);
      center.position.set(pad.position.x, 0.80, pad.position.z);
      yardGroup.add(center);
    });

    // Trụ phun nước trung tâm
    const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 1.3, 16), fBaseMat);
    spout.position.set(0, 1.1, fountainZ);
    yardGroup.add(spout);

    // Tầng đĩa phun nước thứ 2 (bán kính 1.25m)
    const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.35, 0.25, 24), fBaseMat);
    tier2.position.set(0, 1.5, fountainZ);
    yardGroup.add(tier2);

    // Vòi phun kim loại vàng đồng trên cùng
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.55, 16), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8 }));
    nozzle.position.set(0, 1.9, fountainZ);
    yardGroup.add(nozzle);

    // Cột nước phun trào trung tâm (Central Animated Water Jet)
    const jetGeo = new THREE.CylinderGeometry(0.15, 0.28, 1.8, 16);
    const jetMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.8 });
    this.fountainSpoutMesh = new THREE.Mesh(jetGeo, jetMat);
    this.fountainSpoutMesh.position.set(0, 2.8, fountainZ);
    yardGroup.add(this.fountainSpoutMesh);

    // Các giọt nước phun tỏa vòng cung rơi xuống hồ (Animated Spray Droplets)
    const dropGeo = new THREE.SphereGeometry(0.065, 8, 8);
    const dropMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.85 });
    this.fountainWaterJets = [];
    for (let k = 0; k < 48; k++) {
      const drop = new THREE.Mesh(dropGeo, dropMat);
      const ang = Math.random() * Math.PI * 2;
      const speedH = 0.025 + Math.random() * 0.038;
      const speedY = 0.09 + Math.random() * 0.07;
      drop.position.set(0, 2.1, fountainZ);
      yardGroup.add(drop);
      this.fountainWaterJets.push({
        mesh: drop,
        vx: Math.cos(ang) * speedH,
        vz: Math.sin(ang) * speedH,
        vy: speedY,
        initY: 2.1,
        initZ: fountainZ
      });
    }

    // Các vòng sóng nước loang trên mặt hồ
    this.fountainRipples = [];
    for (let r = 0; r < 3; r++) {
      const rGeo = new THREE.RingGeometry(0.2, 0.35, 24);
      const rMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.rotation.x = -Math.PI / 2;
      rMesh.position.set(0, 0.67, fountainZ);
      yardGroup.add(rMesh);
      this.fountainRipples.push({
        mesh: rMesh,
        scale: 0.4 + r * 0.8,
        speed: 0.025,
        maxScale: 2.6
      });
    }

    // 2. CỘT CỜ TRƯỜNG HỌC 5C4 - QUỐC KỲ VIỆT NAM (Đặt tại Z = 43.0)
    const base1 = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.5, 0.4, 32), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
    base1.position.set(0, 0.2, 43.0);
    base1.receiveShadow = true;
    yardGroup.add(base1);

    const base2 = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, 0.4, 32), new THREE.MeshStandardMaterial({ color: 0xcfd8dc }));
    base2.position.set(0, 0.6, 43.0);
    yardGroup.add(base2);

    this.solidPlatforms.push({
      worldX: 0,
      worldY: 0.6,
      topY: 0.8,
      worldZ: 43.0,
      halfW: 1.6,
      halfD: 1.6
    });

    const poleGeo = new THREE.CylinderGeometry(0.1, 0.16, 10.2, 16);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.2 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(0, 5.7, 43.0);
    pole.castShadow = true;
    yardGroup.add(pole);

    const topBall = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 }));
    topBall.position.set(0, 10.8, 43.0);
    yardGroup.add(topBall);

    // Lá Cờ Đỏ Sao Vàng Việt Nam Chuẩn Tỉ Lệ 2:3
    const flagCanvas = document.createElement('canvas');
    flagCanvas.width = 600;
    flagCanvas.height = 400;
    const fctx = flagCanvas.getContext('2d');
    fctx.fillStyle = '#da251d';
    fctx.fillRect(0, 0, 600, 400);

    const cx = 300;
    const cy = 200;
    const outerR = 90;
    const innerR = outerR * Math.sin(Math.PI / 10) / Math.sin(7 * Math.PI / 10);

    fctx.fillStyle = '#ffff00';
    fctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const outerAngle = (i * 4 * Math.PI / 5) - Math.PI / 2;
      const innerAngle = outerAngle + (2 * Math.PI / 10);
      const ox = cx + Math.cos(outerAngle) * outerR;
      const oy = cy + Math.sin(outerAngle) * outerR;
      if (i === 0) fctx.moveTo(ox, oy);
      else fctx.lineTo(ox, oy);
      const ix = cx + Math.cos(innerAngle) * innerR;
      const iy = cy + Math.sin(innerAngle) * innerR;
      fctx.lineTo(ix, iy);
    }
    fctx.closePath();
    fctx.fill();

    const flagTex = new THREE.CanvasTexture(flagCanvas);
    const flagMat = new THREE.MeshStandardMaterial({
      map: flagTex,
      roughness: 0.45,
      side: THREE.DoubleSide
    });
    const flagGeo = new THREE.PlaneGeometry(3.0, 2.0);
    this.vietnamFlag = new THREE.Mesh(flagGeo, flagMat);
    this.vietnamFlag.position.set(1.55, 9.4, 43.0);
    this.vietnamFlag.castShadow = true;
    yardGroup.add(this.vietnamFlag);

    [-2.8, 2.8].forEach(fx => {
      const planter = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.8), new THREE.MeshStandardMaterial({ color: 0xb45309 }));
      planter.position.set(fx, 0.2, 43.0);
      yardGroup.add(planter);

      const flowers = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.25, 0.7), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      flowers.position.set(fx, 0.45, 43.0);
      yardGroup.add(flowers);
    });

    // Cổng Trường Tiểu Học Ngô Quyền tại Z = 54.0
    const gateGroup = new THREE.Group();
    gateGroup.position.set(0, 0, 54.0);

    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.4 }); // Cột gạch đỏ
    [-6.0, 6.0].forEach(px => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(1.4, 5.5, 1.4), pillarMat);
      p.position.set(px, 2.75, 0);
      p.castShadow = true;
      gateGroup.add(p);

      const pCap = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.35, 1.6), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
      pCap.position.set(px, 5.65, 0);
      gateGroup.add(pCap);
    });

    // Xà ngang cổng & Bảng tên Trường Tiểu Học Ngô Quyền
    const archMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
    const archBeam = new THREE.Mesh(new THREE.BoxGeometry(13.4, 1.2, 1.2), archMat);
    archBeam.position.set(0, 5.4, 0);
    gateGroup.add(archBeam);

    const gateSignCanvas = document.createElement('canvas');
    gateSignCanvas.width = 1024;
    gateSignCanvas.height = 192;
    const gsctx = gateSignCanvas.getContext('2d');
    gsctx.fillStyle = '#1e3a8a';
    gsctx.fillRect(0, 0, 1024, 192);
    gsctx.strokeStyle = '#facc15';
    gsctx.lineWidth = 8;
    gsctx.strokeRect(6, 6, 1012, 180);
    gsctx.fillStyle = '#fef08a';
    gsctx.font = 'bold 50px "Nunito", Arial, sans-serif';
    gsctx.textAlign = 'center';
    gsctx.fillText("⭐ TRƯỜNG TIỂU HỌC NGÔ QUYỀN ⭐", 512, 75);
    gsctx.fillStyle = '#ffffff';
    gsctx.font = 'bold 34px "Nunito", Arial, sans-serif';
    gsctx.fillText("ĐC: 141 ĐƯỜNG TRẦN QUỐC TUẤN - PHƯỜNG NGÔ QUYỀN", 512, 142);

    const gateSign = new THREE.Mesh(new THREE.PlaneGeometry(10.8, 1.8), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gateSignCanvas) }));
    gateSign.position.set(0, 5.4, -0.62);
    gateSign.rotation.y = Math.PI; // Mặt hướng vào trong trường
    gateGroup.add(gateSign);

    const gateSignOut = new THREE.Mesh(new THREE.PlaneGeometry(10.8, 1.8), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gateSignCanvas) }));
    gateSignOut.position.set(0, 5.4, 0.62); // Mặt hướng ra ngoài đường Trần Quốc Tuấn
    gateGroup.add(gateSignOut);

    // Cánh cổng sắt trượt màu trắng (trượt mở sang bên trái, để trống lối đi rộng ở giữa và bên phải ra phố)
    const gateIronMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, metalness: 0.1 });
    const ironGateLeft = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.8, 0.08), gateIronMat);
    ironGateLeft.position.set(-3.5, 1.4, 0.2);
    ironGateLeft.castShadow = true;
    gateGroup.add(ironGateLeft);

    yardGroup.add(gateGroup);

    // Cây xanh sân trường ngoài lớp học
    this.buildPoincianaTree(-14, 0, 23.0, yardGroup);
    this.buildPoincianaTree(14, 0, 23.0, yardGroup);
    this.buildLagerstroemiaTree(-14, 0, 36.0, yardGroup);
    this.buildLagerstroemiaTree(14, 0, 36.0, yardGroup);

    // BỤI CỎ 3D & HOA DẠI RỰC RỠ TỰ NHIÊN
    this.build3DFoliageAndWildflowers(yardGroup);

    // 3. KHU ĐỂ XE & BÁC BA BẢO VỆ
    this.buildSecurityGuardAndBikeShed(yardGroup);

    // 4. KHU VUI CHƠI XÍCH ĐU, CẦU TRƯỢT, BẬP BÊNH
    this.buildPlaygroundZone(yardGroup);

    // 5. GÁNH ĂN VẶT CÔ BẢY CỔNG TRƯỜNG
    this.buildStreetFoodVendor(yardGroup);

    // KHỞI TẠO CÁNH HOA RƠI & ĐÀN BƯỚM SÂN TRƯỜNG
    this.initFallingPetalsAndButterflies(yardGroup);

    this.scene.add(yardGroup);
  }

  // ------------------------------------------------------------
  // KHU ĐỂ XE HỌC SINH & BÁC BA BẢO VỆ AN NINH TRƯỜNG HỌC
  // Tọa độ đặt tại X = 16.0, Z = 26.0 (Bên phải sân trường)
  // ------------------------------------------------------------
  buildSecurityGuardAndBikeShed(yardGroup) {
    const shedGroup = new THREE.Group();
    shedGroup.position.set(16.0, 0, 26.0);

    // 1. Mái vòm nhà để xe
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 });
    const roofGeo = new THREE.BoxGeometry(7.0, 0.2, 5.0);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 3.2, 0);
    roof.rotation.z = -0.06;
    shedGroup.add(roof);

    const poleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
    [[-3.2, -2.2], [3.2, -2.2], [-3.2, 2.2], [3.2, 2.2]].forEach(([px, pz]) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.2, 12), poleMat);
      col.position.set(px, 1.6, pz);
      shedGroup.add(col);
    });

    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sctx = signCanvas.getContext('2d');
    sctx.fillStyle = '#065f46';
    sctx.fillRect(0, 0, 512, 128);
    sctx.strokeStyle = '#34d399';
    sctx.lineWidth = 6;
    sctx.strokeRect(4, 4, 504, 120);
    sctx.fillStyle = '#ffffff';
    sctx.font = 'bold 36px "Nunito", sans-serif';
    sctx.textAlign = 'center';
    sctx.fillText("🅿️ NHÀ XE TRƯỜNG NGÔ QUYỀN", 256, 75);

    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.9), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(signCanvas) }));
    sign.position.set(0, 3.6, 2.5);
    shedGroup.add(sign);

    // Dãy xe đạp học sinh xếp gọn gàng
    const bikeColors = [0x3b82f6, 0xef4444, 0xf59e0b, 0x8b5cf6, 0x10b981];
    [-2.2, -1.1, 0, 1.1, 2.2].forEach((bx, bIdx) => {
      const bColor = bikeColors[bIdx % bikeColors.length];
      const bike = new THREE.Group();
      bike.position.set(bx, 0, -0.4);

      const wheelGeo = new THREE.TorusGeometry(0.35, 0.04, 8, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
      const wBack = new THREE.Mesh(wheelGeo, wheelMat);
      wBack.position.set(0, 0.35, -0.5);
      bike.add(wBack);
      const wFront = new THREE.Mesh(wheelGeo, wheelMat);
      wFront.position.set(0, 0.35, 0.5);
      bike.add(wFront);

      const frameMat = new THREE.MeshStandardMaterial({ color: bColor, roughness: 0.3 });
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 8), frameMat);
      bar.rotation.x = Math.PI / 4;
      bar.position.set(0, 0.55, 0);
      bike.add(bar);

      const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.08, 0.3), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
      saddle.position.set(0, 0.78, -0.25);
      bike.add(saddle);

      const basket = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.25, 0.25), new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true }));
      basket.position.set(0, 0.75, 0.45);
      bike.add(basket);

      shedGroup.add(bike);
    });

    // 2. NPC BÁC BA BẢO VỆ
    const guardGroup = new THREE.Group();
    guardGroup.position.set(-2.8, 0, 1.8);
    guardGroup.rotation.y = -Math.PI / 4;

    const shirtGeo = new THREE.CylinderGeometry(0.32, 0.45, 0.82, 16);
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 });
    const shirt = new THREE.Mesh(shirtGeo, shirtMat);
    shirt.position.y = 0.82;
    shirt.castShadow = true;
    guardGroup.add(shirt);

    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.1, 16), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
    belt.position.y = 0.55;
    guardGroup.add(belt);

    const badge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.04), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8 }));
    badge.position.set(-0.16, 0.95, 0.32);
    guardGroup.add(badge);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 18, 18), new THREE.MeshStandardMaterial({ color: 0xfbd0a8 }));
    head.position.y = 1.48;
    guardGroup.add(head);

    // Gương mặt Bác Ba Bảo Vệ hiền hậu, uy nghiêm với ria mép chỉn chu
    this.attachCurvedFace(head, 'guard_ba');

    const capGeo = new THREE.CylinderGeometry(0.42, 0.38, 0.2, 16);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.y = 1.74;
    guardGroup.add(cap);

    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.04, 0.25), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1 }));
    visor.position.set(0, 1.68, 0.32);
    visor.rotation.x = 0.15;
    guardGroup.add(visor);

    const whistle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 }));
    whistle.position.set(0.12, 0.88, 0.35);
    whistle.rotation.z = Math.PI / 4;
    guardGroup.add(whistle);

    const legMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    [-0.15, 0.15].forEach(lx => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.52, 0.25), legMat);
      leg.position.set(lx, 0.26, 0);
      guardGroup.add(leg);
    });

    const nameTagCanvas = document.createElement('canvas');
    nameTagCanvas.width = 256;
    nameTagCanvas.height = 64;
    const nctx = nameTagCanvas.getContext('2d');
    nctx.fillStyle = 'rgba(30, 58, 138, 0.9)';
    nctx.roundRect(4, 4, 248, 56, 12);
    nctx.fill();
    nctx.strokeStyle = '#60a5fa';
    nctx.lineWidth = 3;
    nctx.stroke();
    nctx.fillStyle = '#ffffff';
    nctx.font = 'bold 26px "Nunito", sans-serif';
    nctx.textAlign = 'center';
    nctx.fillText("👮‍♂️ Bác Ba Bảo Vệ", 128, 40);

    const nameTag = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.3), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(nameTagCanvas), transparent: true }));
    nameTag.position.set(0, 2.15, 0);
    guardGroup.add(nameTag);

    const mark = this.createFloatingExclamationMark();
    mark.position.set(0, 2.45, 0);
    guardGroup.add(mark);
    this.exclamationMarks.push(mark);

    shedGroup.add(guardGroup);
    yardGroup.add(shedGroup);

    this.npcs.push({
      id: 'bac_bao_ve',
      name: 'Bác Ba Bảo Vệ',
      title: 'An Ninh Trường Ngô Quyền',
      group: guardGroup,
      worldPos: new THREE.Vector3(16.0 - 2.8, 0, 26.0 + 1.8),
      radius: 3.2,
      icon: '👮‍♂️',
      prompt: 'Bấm [E] hoặc [F] để chào Bác Ba Bảo Vệ',
      quotes: [
        "Chào cháu Hà My 5C4! Cứ yên tâm học tập nhé, bác Ba trông xe và bảo vệ an toàn 100% cho toàn trường! 👮‍♂️",
        "Hôm nay cháu vào lớp đúng giờ lắm, rất đáng khen! Nhớ xếp xe đạp gọn gàng vào hàng nhé! 🚲",
        "Bác thấy Thầy Tuấn khen Hà My học tiếng Anh siêu lắm đó, ráng giật trọn 10 điểm nghen con! 💯",
        "Sân trường Ngô Quyền lúc nào cũng rợp bóng mát, học bài xong ra xích đu chơi với các bạn nhé! 🌸"
      ]
    });
  }

  // ------------------------------------------------------------
  // KHU VUI CHƠI TRẺ EM: XÍCH ĐU, CẦU TRƯỢT, BẬP BÊNH
  // Tọa độ đặt tại X = -18.0, Z = 28.0 (Bên trái sân trường)
  // ------------------------------------------------------------
  buildPlaygroundZone(yardGroup) {
    const playGroup = new THREE.Group();
    playGroup.position.set(-18.0, 0, 28.0);

    const matGeo = new THREE.PlaneGeometry(14, 12);
    const matMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.8 });
    const turf = new THREE.Mesh(matGeo, matMat);
    turf.rotation.x = -Math.PI / 2;
    turf.position.set(0, 0.024, 0);
    playGroup.add(turf);

    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sctx = signCanvas.getContext('2d');
    sctx.fillStyle = '#f97316';
    sctx.fillRect(0, 0, 512, 128);
    sctx.strokeStyle = '#fef08a';
    sctx.lineWidth = 6;
    sctx.strokeRect(4, 4, 504, 120);
    sctx.fillStyle = '#ffffff';
    sctx.font = 'bold 36px "Nunito", sans-serif';
    sctx.textAlign = 'center';
    sctx.fillText("🎠 KHU VUI CHƠI TRẺ EM 5C4", 256, 75);

    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.9), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(signCanvas) }));
    sign.position.set(0, 3.8, -4.5);
    playGroup.add(sign);

    // A. XÍCH ĐU ĐÔI
    const swingFrame = new THREE.Group();
    swingFrame.position.set(-3.2, 0, 0);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 });
    const topBeam = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.22, 0.22), woodMat);
    topBeam.position.set(0, 3.2, 0);
    swingFrame.add(topBeam);

    const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.4, 12);
    [[-1.9, -0.6, 0.18], [-1.9, 0.6, -0.18], [1.9, -0.6, 0.18], [1.9, 0.6, -0.18]].forEach(([lx, lz, rotX]) => {
      const leg = new THREE.Mesh(legGeo, woodMat);
      leg.position.set(lx, 1.6, lz);
      leg.rotation.x = rotX;
      swingFrame.add(leg);
    });

    [-0.9, 0.9].forEach(sx => {
      const swingSeatGroup = new THREE.Group();
      swingSeatGroup.position.set(sx, 3.1, 0);

      const ropeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
      [-0.3, 0.3].forEach(rx => {
        const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.3, 8), ropeMat);
        rope.position.set(rx, -1.15, 0);
        swingSeatGroup.add(rope);
      });

      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.06, 0.35), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      seat.position.set(0, -2.3, 0);
      swingSeatGroup.add(seat);

      swingFrame.add(swingSeatGroup);
    });
    playGroup.add(swingFrame);

    // B. CẦU TRƯỢT TRẺ EM
    const slideGroup = new THREE.Group();
    slideGroup.position.set(3.2, 0, 0);

    const plat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 1.6), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
    plat.position.set(0, 2.0, -1.2);
    slideGroup.add(plat);

    this.solidPlatforms.push({
      worldX: -18.0 + 3.2,
      worldY: 2.0,
      topY: 2.1,
      worldZ: 28.0 - 1.2,
      halfW: 0.9,
      halfD: 0.9
    });

    [[-0.7, -1.9], [0.7, -1.9], [-0.7, -0.5], [0.7, -0.5]].forEach(([cx, cz]) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.0, 12), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
      col.position.set(cx, 1.0, cz);
      slideGroup.add(col);
    });

    for (let s = 0; s < 5; s++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.06, 0.3), new THREE.MeshStandardMaterial({ color: 0x10b981 }));
      step.position.set(0, 0.38 * s + 0.2, -1.9 - s * 0.28);
      slideGroup.add(step);

      this.solidPlatforms.push({
        worldX: -18.0 + 3.2,
        worldY: 0.38 * s + 0.2,
        topY: 0.38 * s + 0.25,
        worldZ: 28.0 - 1.9 - s * 0.28,
        halfW: 0.6,
        halfD: 0.25
      });
    }

    const chute = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 3.2), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.2 }));
    chute.position.set(0, 1.05, 0.5);
    chute.rotation.x = 0.65;
    slideGroup.add(chute);

    [-0.55, 0.55].forEach(rx => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 3.2), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      rail.position.set(rx, 1.15, 0.5);
      rail.rotation.x = 0.65;
      slideGroup.add(rail);
    });
    playGroup.add(slideGroup);

    // C. BẬP BÊNH TRẺ EM
    const seesawGroup = new THREE.Group();
    seesawGroup.position.set(0, 0, 3.2);

    const pivot = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.7, 4), new THREE.MeshStandardMaterial({ color: 0x64748b }));
    pivot.position.y = 0.35;
    seesawGroup.add(pivot);

    const plank = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 3.6), new THREE.MeshStandardMaterial({ color: 0xec4899 }));
    plank.position.set(0, 0.72, 0);
    plank.rotation.x = 0.12;
    seesawGroup.add(plank);

    [-1.6, 1.6].forEach(pz => {
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.02, 8, 12), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
      handle.position.set(0, 0.72 + (pz > 0 ? -0.18 : 0.18) + 0.15, pz);
      seesawGroup.add(handle);
    });
    playGroup.add(seesawGroup);

    yardGroup.add(playGroup);
  }

  // ------------------------------------------------------------
  // GÁNH ĂN VẶT CÔ BẢY CỔNG TRƯỜNG: BÁNH TRÁNG TRỘN & TRÀ TẮC
  // Tọa độ đặt tại X = -9.0, Z = 50.5 (Cổng trường Ngô Quyền)
  // ------------------------------------------------------------
  buildStreetFoodVendor(yardGroup) {
    const vendorGroup = new THREE.Group();
    vendorGroup.position.set(-9.0, 0, 50.5);

    const cart = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.0, 1.5), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.6, roughness: 0.3 }));
    cart.position.set(0, 0.75, 0);
    cart.castShadow = true;
    vendorGroup.add(cart);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
    [[-1.0, -0.75], [1.0, -0.75], [-1.0, 0.75], [1.0, 0.75]].forEach(([wx, wz]) => {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.1, 16), wheelMat);
      w.rotation.z = Math.PI / 2;
      w.position.set(wx, 0.25, wz);
      vendorGroup.add(w);
    });

    const glassCase = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 1.3), new THREE.MeshStandardMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.45, roughness: 0.1 }));
    glassCase.position.set(0, 1.6, 0);
    vendorGroup.add(glassCase);

    const skewerMat = new THREE.MeshStandardMaterial({ color: 0xf97316 });
    [-0.6, -0.2, 0.2, 0.6].forEach(sx => {
      const skewer = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8), skewerMat);
      skewer.rotation.z = 0.2;
      skewer.position.set(sx, 1.5, 0.1);
      vendorGroup.add(skewer);
    });

    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.2, 16), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
    bowl.position.set(-0.7, 1.4, -0.25);
    vendorGroup.add(bowl);

    const teaDispenser = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.55, 16), new THREE.MeshStandardMaterial({ color: 0x84cc16, transparent: true, opacity: 0.8 }));
    teaDispenser.position.set(0.7, 1.55, -0.25);
    vendorGroup.add(teaDispenser);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.2, 12), new THREE.MeshStandardMaterial({ color: 0x64748b }));
    pole.position.set(0, 2.1, 0);
    vendorGroup.add(pole);

    const umbrella = new THREE.Mesh(new THREE.ConeGeometry(1.8, 0.7, 16), new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 }));
    umbrella.position.set(0, 3.5, 0);
    vendorGroup.add(umbrella);

    const balloonColors = [0xec4899, 0x3b82f6, 0xfacc15, 0x10b981, 0xa855f7];
    balloonColors.forEach((bColor, bIdx) => {
      const bAng = bIdx * (Math.PI * 2 / 5);
      const balloon = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), new THREE.MeshStandardMaterial({ color: bColor, roughness: 0.2 }));
      balloon.position.set(1.2 + Math.cos(bAng) * 0.35, 3.2 + (bIdx % 2) * 0.35, 0.6 + Math.sin(bAng) * 0.35);
      vendorGroup.add(balloon);
    });

    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sctx = signCanvas.getContext('2d');
    sctx.fillStyle = '#be123c';
    sctx.fillRect(0, 0, 512, 128);
    sctx.strokeStyle = '#fef08a';
    sctx.lineWidth = 6;
    sctx.strokeRect(4, 4, 504, 120);
    sctx.fillStyle = '#ffffff';
    sctx.font = 'bold 32px "Nunito", sans-serif';
    sctx.textAlign = 'center';
    sctx.fillText("🍢 CÔ BẢY ĂN VẶT CỔNG TRƯỜNG 🥤", 256, 50);
    sctx.fillStyle = '#fef08a';
    sctx.font = 'bold 24px "Nunito", sans-serif';
    sctx.fillText("Bánh Tráng Trộn • Trà Tắc • Cá Viên Chiên", 256, 95);

    const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(signCanvas) }));
    sign.position.set(0, 2.3, 0.76);
    vendorGroup.add(sign);

    const npcGroup = new THREE.Group();
    npcGroup.position.set(1.5, 0, 0);
    npcGroup.rotation.y = -Math.PI / 2;

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.45, 0.75, 16), new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.6 }));
    body.position.y = 0.75;
    npcGroup.add(body);

    const apron = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.46, 0.55, 16), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }));
    apron.position.set(0, 0.65, 0.05);
    npcGroup.add(apron);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 18, 18), new THREE.MeshStandardMaterial({ color: 0xfbd0a8 }));
    head.position.y = 1.35;
    npcGroup.add(head);

    // Gương mặt Cô Bảy Quà Vặt rạng rỡ, mắt cười híp, nụ cười đôn hậu
    this.attachCurvedFace(head, 'vendor_bay');

    const hat = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.28, 16), new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 }));
    hat.position.set(0, 1.58, 0);
    npcGroup.add(hat);

    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 8), new THREE.MeshStandardMaterial({ color: 0xf43f5e }));
    arm.position.set(-0.35, 0.95, 0.15);
    arm.rotation.z = -Math.PI / 4;
    npcGroup.add(arm);

    const nameTagCanvas = document.createElement('canvas');
    nameTagCanvas.width = 256;
    nameTagCanvas.height = 64;
    const nctx = nameTagCanvas.getContext('2d');
    nctx.fillStyle = 'rgba(190, 18, 60, 0.9)';
    nctx.roundRect(4, 4, 248, 56, 12);
    nctx.fill();
    nctx.strokeStyle = '#fda4af';
    nctx.lineWidth = 3;
    nctx.stroke();
    nctx.fillStyle = '#ffffff';
    nctx.font = 'bold 26px "Nunito", sans-serif';
    nctx.textAlign = 'center';
    nctx.fillText("🍢 Cô Bảy Quà Vặt", 128, 40);

    const nameTag = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.3), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(nameTagCanvas), transparent: true }));
    nameTag.position.set(0, 1.95, 0);
    npcGroup.add(nameTag);

    const mark = this.createFloatingExclamationMark();
    mark.position.set(0, 2.25, 0);
    npcGroup.add(mark);
    this.exclamationMarks.push(mark);

    vendorGroup.add(npcGroup);
    yardGroup.add(vendorGroup);

    this.npcs.push({
      id: 'co_bay_an_vat',
      name: 'Cô Bảy Quà Vặt',
      title: 'Gánh Ăn Vặt Cổng Trường',
      group: npcGroup,
      worldPos: new THREE.Vector3(-9.0 + 1.5, 0, 50.5),
      radius: 3.2,
      icon: '🍢',
      prompt: 'Bấm [E] hoặc [F] để mua quà vặt Cô Bảy',
      quotes: [
        "Hà My ơi tan học ghé cô Bảy làm ly trà tắc khổng lồ với bịch bánh tráng trộn full topping nghen con! 🧋",
        "Học tiếng Anh với Thầy Tuấn tốn nhiều năng lượng lắm, cô khuyến mãi thêm xiên cá viên chiên giòn rụm nè! 🍢",
        "Bé Hà My 5C4 là khách VIP của gánh ăn vặt cô Bảy đó nha, học giỏi cô tặng thêm bịch me ngào đường! 🍬",
        "Trà tắc mát lạnh xua tan nắng hè, bạn nào điểm 10 Thầy Tuấn cô bớt liền 50% luôn! 🥤"
      ]
    });
  }

  // ------------------------------------------------------------
  // ZONE 4: HỒ CÂU CÁ TRƯỜNG NGÔ QUYỀN & BÁC NGƯ PHỦ
  // Tọa độ đặt ngang hàng với Vườn Hoa Sinh Thái: X = 36.0, Z = 70.0
  // Cả hai cùng nằm trên hàng ngang Z = 70.0, mặt tiền quay về hướng Bắc nhìn ra đại lộ hoa
  // ------------------------------------------------------------
  buildFishingPondZone() {
    const pondGroup = new THREE.Group();
    pondGroup.position.set(36.0, 0, 36.0);

    // 1. Hồ nước xanh biếc hình tròn bán kính 6.8m
    const pondBaseGeo = new THREE.CylinderGeometry(6.8, 7.0, 0.5, 32);
    const pondStoneMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.75 });
    const pondBase = new THREE.Mesh(pondBaseGeo, pondStoneMat);
    pondBase.position.y = 0.25;
    pondBase.receiveShadow = true;
    pondGroup.add(pondBase);

    // Đáy hồ nước sâu màu xanh lục lam sẫm (Underwater Aquatic Bed)
    const pondBed = new THREE.Mesh(
      new THREE.CylinderGeometry(6.4, 6.4, 0.02, 32),
      new THREE.MeshStandardMaterial({ color: 0x083344, roughness: 0.9 })
    );
    pondBed.position.y = 0.06;
    pondGroup.add(pondBed);

    // Mặt nước hồ trong suốt lung linh PBR với sóng nước chuyển động và phản quang mặt trời
    this.pondWaterNormalTex = this.createWaterNormalTexture(256);
    this.pondWaterNormalTex.repeat.set(5, 5);
    const waterGeo = new THREE.CylinderGeometry(6.4, 6.4, 0.1, 32);
    const pondWaterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.82,
      roughness: 0.04,
      metalness: 0.16,
      normalMap: this.pondWaterNormalTex,
      normalScale: new THREE.Vector2(0.42, 0.42)
    });
    const pondWater = new THREE.Mesh(waterGeo, pondWaterMat);
    pondWater.position.y = 0.48;
    pondGroup.add(pondWater);

    // Viền bọt nước trắng nhẹ quanh bờ hồ (Shoreline Foam Edge)
    const foamRing = new THREE.Mesh(
      new THREE.RingGeometry(6.25, 6.4, 36),
      new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.45, side: THREE.DoubleSide })
    );
    foamRing.rotation.x = -Math.PI / 2;
    foamRing.position.y = 0.49;
    pondGroup.add(foamRing);

    // Hoa súng hồng & lá sen tròn nổi trên mặt hồ câu cá
    const lilyPadMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.6, side: THREE.DoubleSide });
    const lilyFlowerMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.4 });
    const lilyCenterMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });

    const lilySpawns = [
      { x: -3.2, z: 1.2 }, { x: -2.4, z: 2.8 }, { x: 3.0, z: -1.0 },
      { x: 2.2, z: 2.5 }, { x: -1.5, z: 3.8 }, { x: 3.5, z: 1.8 }
    ];

    lilySpawns.forEach((ls, idx) => {
      const pad = new THREE.Mesh(new THREE.CircleGeometry(0.48, 14), lilyPadMat);
      pad.rotation.x = -Math.PI / 2;
      pad.position.set(ls.x, 0.50, ls.z);
      pondGroup.add(pad);

      if (idx % 2 === 0) {
        const flower = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), lilyFlowerMat);
        flower.position.set(ls.x, 0.58, ls.z);
        pondGroup.add(flower);

        const center = new THREE.Mesh(new THREE.SphereGeometry(0.07), lilyCenterMat);
        center.position.set(ls.x, 0.62, ls.z);
        pondGroup.add(center);
      }
    });

    // 2. Cầu gỗ bắc ra bờ hồ ở bờ Bắc (Wooden Fishing Pier), nối thẳng vào đại lộ dạo bộ
    const pierGeo = new THREE.BoxGeometry(2.4, 0.15, 5.0);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 });
    const pier = new THREE.Mesh(pierGeo, woodMat);
    pier.position.set(0, 0.55, -4.5);
    pier.receiveShadow = true;
    pondGroup.add(pier);

    this.solidPlatforms.push({
      worldX: 36.0,
      worldY: 0.55,
      topY: 0.65,
      worldZ: 36.0 - 4.5,
      halfW: 1.3,
      halfD: 2.6
    });

    // 3. Biển hiệu Hồ Câu Cá Trường Ngô Quyền (Quay mặt về hướng Bắc nhìn ra đại lộ)
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sctx = signCanvas.getContext('2d');
    sctx.fillStyle = '#0284c7';
    sctx.fillRect(0, 0, 512, 128);
    sctx.strokeStyle = '#67e8f9';
    sctx.lineWidth = 8;
    sctx.strokeRect(4, 4, 504, 120);
    sctx.fillStyle = '#ffffff';
    sctx.font = 'bold 44px "Nunito", sans-serif';
    sctx.textAlign = 'center';
    sctx.fillText("🎣 HỒ CÂU CÁ TRƯỜNG NGÔ QUYỀN", 256, 80);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 1.3), new THREE.MeshBasicMaterial({ map: signTex }));
    sign.position.set(0, 3.8, -6.8);
    sign.rotation.y = 0; // Quay về hướng Bắc
    pondGroup.add(sign);

    // 4. Các chú cá bơi lội trong hồ
    for (let i = 0; i < 4; i++) {
      const fish = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.5, 8), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
      fish.rotation.x = Math.PI / 2;
      fish.position.set(Math.cos(i * 1.5) * 3.5, 0.4, Math.sin(i * 1.5) * 3.5);
      pondGroup.add(fish);
      this.fishMeshes.push({ mesh: fish, angle: i * 1.5, radius: 2.8 + i * 0.8, speed: 0.02 + i * 0.005 });
    }

    // 5. NPC BÁC NGƯ PHỦ (UNCLE FISHERMAN)
    this.buildFishermanNPC(pondGroup);

    this.scene.add(pondGroup);
  }

  // ------------------------------------------------------------
  // DỰNG NPC BÁC NGƯ PHỦ (UNCLE FISHERMAN)
  // ------------------------------------------------------------
  buildFishermanNPC(pondGroup) {
    const fisherGroup = new THREE.Group();
    fisherGroup.position.set(1.5, 0.65, -4.2);

    // Thân Chibi mặc áo gile câu cá màu xanh rêu
    const bodyGeo = new THREE.CylinderGeometry(0.28, 0.35, 0.7, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4d7c0f });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.35;
    body.castShadow = true;
    fisherGroup.add(body);

    // Đầu Chibi hiền từ
    const headGeo = new THREE.SphereGeometry(0.36, 18, 18);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffedd5 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 0.95;
    fisherGroup.add(head);

    // Gương mặt Bác Ngư Phủ sảng khoái, mắt cười rạng rỡ, đôn hậu
    this.attachCurvedFace(head, 'fisherman_hai');

    // Nón lá / Nón rơm câu cá rộng vành
    const hat = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.3, 18), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
    hat.position.y = 1.25;
    fisherGroup.add(hat);

    // Cần câu trúc cầm trên tay vươn ra hồ nước
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 3.2, 12), new THREE.MeshStandardMaterial({ color: 0x78350f }));
    rod.position.set(-0.6, 1.2, 1.2);
    rod.rotation.x = -Math.PI / 4;
    fisherGroup.add(rod);

    // Thùng cá bên cạnh
    const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.22, 0.45, 12), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
    bucket.position.set(0.6, 0.22, 0.2);
    fisherGroup.add(bucket);

    // Bảng tên 3D: "🎣 Bác Ngư Phủ (Hồ Câu)"
    const nameCanvas = document.createElement('canvas');
    nameCanvas.width = 512;
    nameCanvas.height = 128;
    const nctx = nameCanvas.getContext('2d');
    nctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    nctx.roundRect(8, 8, 496, 112, 24);
    nctx.fill();
    nctx.strokeStyle = '#38bdf8';
    nctx.lineWidth = 6;
    nctx.stroke();
    nctx.fillStyle = '#bae6fd';
    nctx.font = 'bold 44px "Nunito", sans-serif';
    nctx.textAlign = 'center';
    nctx.fillText("🎣 Bác Ngư Phủ (Hồ Câu)", 256, 75);

    const nameTex = new THREE.CanvasTexture(nameCanvas);
    const namePlate = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.45), new THREE.MeshBasicMaterial({ map: nameTex, transparent: true }));
    namePlate.position.set(0, 1.9, 0);
    fisherGroup.add(namePlate);

    // Dấu chấm than [!] vàng kim trên đầu
    const exMark = this.createFloatingExclamationMark();
    exMark.position.set(0, 2.45, 0);
    fisherGroup.add(exMark);
    this.exclamationMarks.push(exMark);

    pondGroup.add(fisherGroup);

    // Đăng ký NPC Bác Ngư Phủ
    this.npcs.push({
      id: 'fisherman',
      name: 'Bác Ngư Phủ',
      title: 'Chuyên Gia Câu Cá',
      group: fisherGroup,
      worldPos: new THREE.Vector3(36.0 + 1.5, 0.65, 36.0 - 4.2),
      radius: 2.8,
      prompt: 'Bấm [E] hoặc [F] để Thả Cần Câu Cá 🎣'
    });
  }

  // ------------------------------------------------------------
  // ZONE 5: ĐẠI THÁP OBBY PARKOUR LÊN THIÊN ĐÌNH TÂY DU KÝ (SKY CELESTIAL REALM 80M)
  // Leo 80m xuyên qua 5 tầng mây từ Sân Trường lên Đại Cung Điện Thiên Đình (X = 25, Z = 36)
  // CHỈ DÙNG NHẢY PARKOUR ĐỂ LEO LÊN - KHÔNG CÓ CỔNG DỊCH CHUYỂN TẮT!
  // Màu sắc pastel hài hòa, dịu mắt, không thừa contrast, chuẩn thẩm mỹ Chibi
  // ------------------------------------------------------------
  buildMinecraftParkourZone() {
    const parkourGroup = new THREE.Group();
    parkourGroup.position.set(25, 0, 36);

    // Cổng chào Đấu Trường Obby
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sctx = signCanvas.getContext('2d');
    sctx.fillStyle = '#6d28d9';
    sctx.fillRect(0, 0, 512, 128);
    sctx.strokeStyle = '#fef08a';
    sctx.lineWidth = 8;
    sctx.strokeRect(4, 4, 504, 120);
    sctx.fillStyle = '#ffffff';
    sctx.font = 'bold 32px "Nunito", sans-serif';
    sctx.textAlign = 'center';
    sctx.fillText("☁️ ĐẠI THÁP OBBY LÊN THIÊN ĐÌNH 80M", 256, 50);
    sctx.fillStyle = '#fef08a';
    sctx.font = 'bold 24px "Nunito", sans-serif';
    sctx.fillText("🧗 Nhảy Parkour Leo Lên • Bái Kiến Tôn Ngộ Không 🐒", 256, 94);

    const signTex = new THREE.CanvasTexture(signCanvas);
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 1.55), new THREE.MeshBasicMaterial({ map: signTex }));
    sign.position.set(0, 4.5, -8.5);
    parkourGroup.add(sign);

    // 1. Trụ Tháp Năng Lượng Trung Tâm (Central Spire Column) cao 80m vươn thẳng lên tầng mây
    const spireGeo = new THREE.CylinderGeometry(0.9, 1.5, 80, 16);
    const spireMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45 });
    const spire = new THREE.Mesh(spireGeo, spireMat);
    spire.position.set(0, 40, 0);
    spire.castShadow = true;
    parkourGroup.add(spire);

    // Các vòng hào quang năng lượng nhẹ quanh trụ trung tâm
    [6, 14, 22, 30, 38, 46, 54, 62, 70].forEach(ry => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.08, 8, 24),
        new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.65 })
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, ry, 0);
      parkourGroup.add(ring);
    });

    // Bảng màu Pastel dịu mát, độ bão hòa vừa phải không gây chói mắt
    const pastelColors = [
      0x38bdf8, 0x60a5fa, 0x818cf8, 0xa78bfa, 0xc084fc, 
      0xf472b6, 0xfb7185, 0xfb923c, 0xfbbf24, 0xa3e635, 
      0x4ade80, 0x2dd4bf, 0x38bdf8, 0x818cf8, 0xc084fc
    ];

    // ============================================================
    // GIAI ĐOẠN 1: THÁP BẬC THANG CẦU VỒNG XOẮN ỐC (Spiral Obby Phase 1, Y = 0.4m -> 20m)
    // 26 bậc thang xoắn quanh trụ với độ cao mỗi bậc 0.72m (Rất vừa vặn cú nhảy 2.8m)
    // ============================================================
    const spiralRadius = 4.2;
    for (let i = 0; i < 26; i++) {
      const angle = i * 0.44;
      const x = Math.sin(angle) * spiralRadius;
      const z = Math.cos(angle) * spiralRadius;
      const y = 0.35 + i * 0.72;
      const color = pastelColors[i % pastelColors.length];
      const isCheckpoint = (i === 8 || i === 16);

      const w = isCheckpoint ? 3.2 : 2.4;
      const d = isCheckpoint ? 3.2 : 2.4;
      const h = 0.4;

      const blockGeo = new THREE.BoxGeometry(w, h, d);
      const blockMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.4,
        emissive: color,
        emissiveIntensity: 0.15
      });
      const block = new THREE.Mesh(blockGeo, blockMat);
      block.position.set(x, y, z);
      block.castShadow = true;
      block.receiveShadow = true;
      parkourGroup.add(block);

      // Cột chống đỡ từng bậc
      const supportCol = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, Math.max(0.5, y), 8),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.5, roughness: 0.5 })
      );
      supportCol.position.set(x, y / 2, z);
      parkourGroup.add(supportCol);

      this.solidPlatforms.push({
        worldX: 25 + x,
        worldY: y,
        topY: y + h / 2,
        worldZ: 36 + z,
        halfW: w / 2 + 0.2,
        halfD: d / 2 + 0.2
      });

      // Ngôi sao vàng thưởng
      const starGeo = new THREE.OctahedronGeometry(0.32);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
      const starMesh = new THREE.Mesh(starGeo, starMat);
      starMesh.position.set(x, y + 0.85, z);
      parkourGroup.add(starMesh);
      this.parkourStars.push({
        mesh: starMesh,
        collected: false,
        worldPos: new THREE.Vector3(25 + x, y + 0.85, 36 + z)
      });
    }

    // CHECKPOINT 1: BỆ BẬT NHẢY LÒ XO SIÊU CẤP 1 (Super Bounce Pad 1) tại Y = 19.5m
    const cp1Angle = 26 * 0.44;
    const cp1X = Math.sin(cp1Angle) * (spiralRadius + 0.5);
    const cp1Z = Math.cos(cp1Angle) * (spiralRadius + 0.5);
    const cp1Y = 0.35 + 26 * 0.72;

    const cp1Group = new THREE.Group();
    cp1Group.position.set(cp1X, cp1Y, cp1Z);

    const cp1Base = new THREE.Mesh(
      new THREE.CylinderGeometry(2.0, 2.2, 0.5, 24),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.4 })
    );
    cp1Group.add(cp1Base);

    const springPadMesh1 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 0.15, 24),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.4, roughness: 0.3 })
    );
    springPadMesh1.position.y = 0.3;
    cp1Group.add(springPadMesh1);

    const cp1SignCanvas = document.createElement('canvas');
    cp1SignCanvas.width = 512;
    cp1SignCanvas.height = 128;
    const cp1ctx = cp1SignCanvas.getContext('2d');
    cp1ctx.fillStyle = '#b45309';
    cp1ctx.fillRect(0, 0, 512, 128);
    cp1ctx.fillStyle = '#ffffff';
    cp1ctx.font = 'bold 30px "Nunito", sans-serif';
    cp1ctx.textAlign = 'center';
    cp1ctx.fillText("🌀 BỆ BẬT NHẢY SIÊU CẤP 1", 256, 50);
    cp1ctx.fillStyle = '#fef08a';
    cp1ctx.font = 'bold 24px "Nunito", sans-serif';
    cp1ctx.fillText("Nhảy Lên -> Bật Lên Tầng Mây 32M! 🚀", 256, 95);
    const cp1Sign = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 0.75), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cp1SignCanvas) }));
    cp1Sign.position.set(0, 2.0, 0);
    cp1Group.add(cp1Sign);

    parkourGroup.add(cp1Group);
    this.solidPlatforms.push({
      worldX: 25 + cp1X,
      worldY: cp1Y,
      topY: cp1Y + 0.35,
      worldZ: 36 + cp1Z,
      halfW: 2.0,
      halfD: 2.0,
      isSpring: true,
      springPower: 0.70
    });

    // ============================================================
    // GIAI ĐOẠN 2: QUẦN ĐẢO THẠCH ANH PHA LÊ THẦN TIÊN (Stage 2: Crystal Stepping Stones, Y = 20m -> 40m)
    // 20 bậc pha lê phát sáng lơ lửng, mỗi bậc tăng 0.95m
    // ============================================================
    for (let j = 0; j < 20; j++) {
      const angle2 = 1.8 + j * 0.40;
      const r2 = 5.8 + 1.6 * Math.sin(j * 0.5);
      const x2 = Math.sin(angle2) * r2;
      const z2 = Math.cos(angle2) * r2;
      const y2 = 20.2 + j * 0.95;
      const w2 = 2.6;
      const d2 = 2.6;
      const h2 = 0.5;

      const crystalMat = new THREE.MeshStandardMaterial({
        color: j % 2 === 0 ? 0x06b6d4 : 0x8b5cf6,
        roughness: 0.35,
        metalness: 0.2,
        emissive: j % 2 === 0 ? 0x0891b2 : 0x7c3aed,
        emissiveIntensity: 0.2
      });
      const crystalBlock = new THREE.Mesh(new THREE.BoxGeometry(w2, h2, d2), crystalMat);
      crystalBlock.position.set(x2, y2, z2);
      parkourGroup.add(crystalBlock);

      const shard = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 5), crystalMat);
      shard.position.set(x2 + 0.8, y2 + 0.4, z2 + 0.8);
      parkourGroup.add(shard);

      this.solidPlatforms.push({
        worldX: 25 + x2,
        worldY: y2,
        topY: y2 + h2 / 2,
        worldZ: 36 + z2,
        halfW: w2 / 2 + 0.2,
        halfD: d2 / 2 + 0.2
      });

      const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.35), new THREE.MeshBasicMaterial({ color: 0xc084fc }));
      star.position.set(x2, y2 + 0.9, z2);
      parkourGroup.add(star);
      this.parkourStars.push({
        mesh: star,
        collected: false,
        worldPos: new THREE.Vector3(25 + x2, y2 + 0.9, 36 + z2)
      });
    }

    // CHECKPOINT 2: BỆ MÂY CÂN ĐẨU VÂN 2 (Y = 39.5m)
    const cp2X = -2.5;
    const cp2Z = 5.5;
    const cp2Y = 39.5;
    const cp2Group = new THREE.Group();
    cp2Group.position.set(cp2X, cp2Y, cp2Z);

    const cp2CloudBase = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.6, 4.2),
      new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 0.25, roughness: 0.4 })
    );
    cp2Group.add(cp2CloudBase);

    const springPad2 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 0.2, 24),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xfbbf24, emissiveIntensity: 0.4, roughness: 0.3 })
    );
    springPad2.position.y = 0.35;
    cp2Group.add(springPad2);

    const cp2SignCanvas = document.createElement('canvas');
    cp2SignCanvas.width = 512;
    cp2SignCanvas.height = 128;
    const cp2ctx = cp2SignCanvas.getContext('2d');
    cp2ctx.fillStyle = '#b45309';
    cp2ctx.fillRect(0, 0, 512, 128);
    cp2ctx.fillStyle = '#ffffff';
    cp2ctx.font = 'bold 30px "Nunito", sans-serif';
    cp2ctx.textAlign = 'center';
    cp2ctx.fillText("☁️ BỆ BẬT CÂN ĐẨU VÂN 2", 256, 50);
    cp2ctx.fillStyle = '#fef08a';
    cp2ctx.font = 'bold 24px "Nunito", sans-serif';
    cp2ctx.fillText("Nhảy Lên -> Phóng Lên Tầng Mây Thần 55M! 🚀", 256, 95);
    const cp2Sign = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.8), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cp2SignCanvas) }));
    cp2Sign.position.set(0, 2.0, 0);
    cp2Group.add(cp2Sign);

    parkourGroup.add(cp2Group);
    this.solidPlatforms.push({
      worldX: 25 + cp2X,
      worldY: cp2Y,
      topY: cp2Y + 0.45,
      worldZ: 36 + cp2Z,
      halfW: 2.2,
      halfD: 2.2,
      isSpring: true,
      springPower: 0.72
    });

    // ============================================================
    // GIAI ĐOẠN 3: ĐẠI LỘ MÂY THẦN NGŨ SẮC (Stage 3: Cloud Archipelago, Y = 40m -> 60m)
    // 18 đảo mây bồng bềnh trắng ngọc với phao mây bo tròn, mỗi bậc tăng 1.05m
    // ============================================================
    for (let k = 0; k < 18; k++) {
      const angle3 = 3.2 + k * 0.38;
      const r3 = 5.6 + 1.8 * Math.cos(k * 0.4);
      const x3 = Math.sin(angle3) * r3;
      const z3 = Math.cos(angle3) * r3;
      const y3 = 40.5 + k * 1.05;
      const w3 = 2.8;
      const d3 = 2.8;
      const h3 = 0.6;

      const cGroup = new THREE.Group();
      cGroup.position.set(x3, y3, z3);

      const cloudMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.4,
        emissive: 0xbae6fd,
        emissiveIntensity: 0.2
      });
      const cloudBlock = new THREE.Mesh(new THREE.BoxGeometry(w3, h3, d3), cloudMat);
      cGroup.add(cloudBlock);

      [[-w3 / 2.2, -d3 / 2.2], [w3 / 2.2, -d3 / 2.2], [-w3 / 2.2, d3 / 2.2], [w3 / 2.2, d3 / 2.2]].forEach(([px, pz]) => {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), cloudMat);
        puff.position.set(px, 0.1, pz);
        cGroup.add(puff);
      });

      parkourGroup.add(cGroup);

      this.solidPlatforms.push({
        worldX: 25 + x3,
        worldY: y3,
        topY: y3 + h3 / 2,
        worldZ: 36 + z3,
        halfW: w3 / 2 + 0.2,
        halfD: d3 / 2 + 0.2
      });

      const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.35), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
      star.position.set(x3, y3 + 0.95, z3);
      parkourGroup.add(star);
      this.parkourStars.push({
        mesh: star,
        collected: false,
        worldPos: new THREE.Vector3(25 + x3, y3 + 0.95, 36 + z3)
      });
    }

    // CHECKPOINT 3: BỆ BẬT PHƯỢNG HOÀNG LỬA 3 (Y = 59.5m)
    const cp3X = 4.5;
    const cp3Z = -2.0;
    const cp3Y = 59.5;
    const cp3Group = new THREE.Group();
    cp3Group.position.set(cp3X, cp3Y, cp3Z);

    const cp3Base = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 2.4, 0.6, 24),
      new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.4 })
    );
    cp3Group.add(cp3Base);

    const springPad3 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.6, 0.18, 24),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xf59e0b, emissiveIntensity: 0.45, roughness: 0.3 })
    );
    springPad3.position.y = 0.35;
    cp3Group.add(springPad3);

    const cp3SignCanvas = document.createElement('canvas');
    cp3SignCanvas.width = 512;
    cp3SignCanvas.height = 128;
    const cp3ctx = cp3SignCanvas.getContext('2d');
    cp3ctx.fillStyle = '#9f1239';
    cp3ctx.fillRect(0, 0, 512, 128);
    cp3ctx.fillStyle = '#ffffff';
    cp3ctx.font = 'bold 30px "Nunito", sans-serif';
    cp3ctx.textAlign = 'center';
    cp3ctx.fillText("🔥 BỆ BẬT PHƯỢNG HOÀNG 3", 256, 50);
    cp3ctx.fillStyle = '#fef08a';
    cp3ctx.font = 'bold 24px "Nunito", sans-serif';
    cp3ctx.fillText("Nhảy Lên -> Bay Lên Cầu Cầu Vồng 72M! 🌈", 256, 95);
    const cp3Sign = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.8), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cp3SignCanvas) }));
    cp3Sign.position.set(0, 2.0, 0);
    cp3Group.add(cp3Sign);

    parkourGroup.add(cp3Group);
    this.solidPlatforms.push({
      worldX: 25 + cp3X,
      worldY: cp3Y,
      topY: cp3Y + 0.45,
      worldZ: 36 + cp3Z,
      halfW: 2.2,
      halfD: 2.2,
      isSpring: true,
      springPower: 0.72
    });

    // ============================================================
    // GIAI ĐOẠN 4: CẦU VỒNG XUYÊN MÂY CỬU TRÙNG THIÊN (Stage 4: Bifrost Rainbow Sky Bridge, Y = 60m -> 73m)
    // 12 bậc thang tinh thể cầu vồng uốn lượn hướng thẳng tới cổng Nam Thiên Môn
    // ============================================================
    for (let m = 0; m < 12; m++) {
      const angle4 = 1.2 + m * 0.30;
      const r4 = 5.2 - m * 0.15;
      const x4 = Math.sin(angle4) * r4;
      const z4 = Math.cos(angle4) * r4 - (3.0 + m * 0.9);
      const y4 = 60.5 + m * 1.08;
      const w4 = 3.2;
      const d4 = 2.8;
      const h4 = 0.5;

      const rainbowMat = new THREE.MeshStandardMaterial({
        color: pastelColors[m % pastelColors.length],
        roughness: 0.3,
        metalness: 0.1,
        emissive: pastelColors[m % pastelColors.length],
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.90
      });
      const rainbowStep = new THREE.Mesh(new THREE.BoxGeometry(w4, h4, d4), rainbowMat);
      rainbowStep.position.set(x4, y4, z4);
      parkourGroup.add(rainbowStep);

      this.solidPlatforms.push({
        worldX: 25 + x4,
        worldY: y4,
        topY: y4 + h4 / 2,
        worldZ: 36 + z4,
        halfW: w4 / 2 + 0.2,
        halfD: d4 / 2 + 0.2
      });

      const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.35), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
      star.position.set(x4, y4 + 0.95, z4);
      parkourGroup.add(star);
      this.parkourStars.push({
        mesh: star,
        collected: false,
        worldPos: new THREE.Vector3(25 + x4, y4 + 0.95, 36 + z4)
      });
    }

    // ============================================================
    // GIAI ĐOẠN 5: BẬC THANG RỒNG VÀNG LÊN NAM THIÊN MÔN (Stage 5: Golden Dragon Ascent Stairs, Y = 73m -> 80.6m)
    // 7 đại bậc thang uy nghi dẫn thẳng qua Nam Thiên Môn bước vào Thiên Đình
    // ============================================================
    const dragonMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.15, roughness: 0.35 });
    const goldTrimMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.6, roughness: 0.3 });

    for (let n = 0; n < 7; n++) {
      const stepY = 73.5 + n * 1.0;
      const stepZ = -19.5 + n * 1.25;
      const stepW = 7.0;
      const stepD = 2.4;
      const stepH = 0.45;

      const stepMesh = new THREE.Mesh(new THREE.BoxGeometry(stepW, stepH, stepD), dragonMat);
      stepMesh.position.set(0, stepY, stepZ);
      parkourGroup.add(stepMesh);

      [-stepW / 2 + 0.2, stepW / 2 - 0.2].forEach(vx => {
        const banister = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8), goldTrimMat);
        banister.position.set(vx, stepY + 0.6, stepZ);
        parkourGroup.add(banister);

        const lantern = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 8, 8),
          new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 0.4 })
        );
        lantern.position.set(vx, stepY + 1.2, stepZ);
        parkourGroup.add(lantern);
      });

      this.solidPlatforms.push({
        worldX: 25,
        worldY: stepY,
        topY: stepY + stepH / 2,
        worldZ: 36 + stepZ,
        halfW: stepW / 2 + 0.2,
        halfD: stepD / 2 + 0.2
      });
    }

    // ============================================================
    // SUMMIT: ĐẠI CUNG ĐIỆN THIÊN ĐÌNH (CELESTIAL HEAVEN REALM, Y = 80M)
    // Tọa độ tuyệt đối X = 25, Y = 80.0, Z = 36. Mặt sàn đứng Y = 80.6m. Kích thước 38m x 30m
    // ============================================================
    const heavenGroup = new THREE.Group();
    heavenGroup.position.set(0, 80.0, 0);

    // Sàn Ngọc Trắng Tiên Giới & Viền Hoàng Kim
    const jadeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.05,
      emissive: 0xbae6fd,
      emissiveIntensity: 0.12
    });
    const heavenFloor = new THREE.Mesh(new THREE.BoxGeometry(38, 1.2, 30), jadeMat);
    heavenFloor.position.y = 0;
    heavenFloor.receiveShadow = true;
    heavenGroup.add(heavenFloor);

    // Viền ngọc vàng kim bao quanh sàn
    const rimFront = new THREE.Mesh(new THREE.BoxGeometry(38.4, 0.4, 0.6), goldTrimMat);
    rimFront.position.set(0, 0.7, 15);
    heavenGroup.add(rimFront);
    const rimBack = new THREE.Mesh(new THREE.BoxGeometry(38.4, 0.4, 0.6), goldTrimMat);
    rimBack.position.set(0, 0.7, -15);
    heavenGroup.add(rimBack);
    const rimLeft = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 30.4), goldTrimMat);
    rimLeft.position.set(-19, 0.7, 0);
    heavenGroup.add(rimLeft);
    const rimRight = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 30.4), goldTrimMat);
    rimRight.position.set(19, 0.7, 0);
    heavenGroup.add(rimRight);

    // Cụm 28 Đám Mây Trắng Bồng Bềnh bao quanh chân đảo Thiên Đình
    for (let c = 0; c < 28; c++) {
      const cAngle = c * (Math.PI * 2 / 28);
      const cx = Math.cos(cAngle) * 20;
      const cz = Math.sin(cAngle) * 16;
      const cloudPuff = new THREE.Mesh(
        new THREE.SphereGeometry(2.6 + Math.random() * 1.4, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, emissive: 0xbae6fd, emissiveIntensity: 0.15 })
      );
      cloudPuff.position.set(cx, -0.6, cz);
      heavenGroup.add(cloudPuff);
    }

    // Lan can an toàn bằng đá ngọc chạm rồng
    for (let lx = -17; lx <= 17; lx += 4) {
      [-14.5, 14.5].forEach(lz => {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 0.3), goldTrimMat);
        post.position.set(lx, 1.1, lz);
        heavenGroup.add(post);
      });
    }

    // Cổng Mây Dịch Chuyển Xuống Đất (Return Cloud Portal) tại Z = -13.5
    const returnPortal = new THREE.Mesh(
      new THREE.CylinderGeometry(1.6, 1.8, 0.25, 24),
      new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.45, roughness: 0.4 })
    );
    returnPortal.position.set(0, 0.7, -13.5);
    heavenGroup.add(returnPortal);

    const returnSignCanvas = document.createElement('canvas');
    returnSignCanvas.width = 512;
    returnSignCanvas.height = 128;
    const rctx = returnSignCanvas.getContext('2d');
    rctx.fillStyle = '#047857';
    rctx.fillRect(0, 0, 512, 128);
    rctx.fillStyle = '#ffffff';
    rctx.font = 'bold 30px "Nunito", sans-serif';
    rctx.textAlign = 'center';
    rctx.fillText("🌍 CỔNG VỀ SÂN TRƯỜNG", 256, 52);
    rctx.fillStyle = '#fef08a';
    rctx.font = 'bold 24px "Nunito", sans-serif';
    rctx.fillText("Bước Vào -> Trở Lại Trường Học 5C4", 256, 95);
    const returnSign = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 0.75), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(returnSignCanvas) }));
    returnSign.position.set(0, 2.5, -13.5);
    heavenGroup.add(returnSign);

    this.solidPlatforms.push({
      worldX: 25,
      worldY: 80.6,
      topY: 80.8,
      worldZ: 36 - 13.5,
      halfW: 1.8,
      halfD: 1.8,
      isTeleport: true,
      teleportTo: { x: 25, y: 0, z: 32, label: 'Sân Trường Ngô Quyền' }
    });

    // A. NAM THIÊN MÔN (SOUTHERN HEAVEN GATE ⛩️, Z = -10.5)
    const gateGroup = new THREE.Group();
    gateGroup.position.set(0, 0.6, -10.5);

    [-3.8, -1.3, 1.3, 3.8].forEach(gx => {
      const col = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.38, 5.8, 16),
        new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.6, roughness: 0.3 })
      );
      col.position.set(gx, 2.9, 0);
      col.castShadow = true;
      gateGroup.add(col);
    });

    const roofMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.45 });
    const roof1 = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.5, 2.4), roofMat);
    roof1.position.set(0, 5.9, 0);
    gateGroup.add(roof1);

    const roof2 = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.45, 1.8), roofMat);
    roof2.position.set(0, 6.7, 0);
    gateGroup.add(roof2);

    const gateSignCanvas = document.createElement('canvas');
    gateSignCanvas.width = 1024;
    gateSignCanvas.height = 256;
    const gsctx = gateSignCanvas.getContext('2d');
    gsctx.fillStyle = '#7f1d1d';
    gsctx.fillRect(0, 0, 1024, 256);
    gsctx.strokeStyle = '#facc15';
    gsctx.lineWidth = 14;
    gsctx.strokeRect(8, 8, 1008, 240);
    gsctx.fillStyle = '#fef08a';
    gsctx.font = 'bold 74px "Nunito", sans-serif';
    gsctx.textAlign = 'center';
    gsctx.fillText("⛩️ NAM THIÊN MÔN ⛩️", 512, 110);
    gsctx.fillStyle = '#ffffff';
    gsctx.font = 'bold 50px "Nunito", sans-serif';
    gsctx.fillText("ĐẠI CUNG ĐIỆN THIÊN ĐÌNH 80M", 512, 195);

    const gateSign = new THREE.Mesh(
      new THREE.PlaneGeometry(6.4, 1.6),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gateSignCanvas) })
    );
    gateSign.position.set(0, 4.6, 0.2);
    gateGroup.add(gateSign);

    [-4.0, 4.0].forEach(lx => {
      const lantern = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xd97706, emissiveIntensity: 0.5 })
      );
      lantern.position.set(lx, 4.8, 0.8);
      gateGroup.add(lantern);
    });

    heavenGroup.add(gateGroup);

    // B. LÒ BÁT QUÁI THÁI THƯỢNG LÃO QUÂN (EIGHT TRIGRAMS FURNACE 🔮, X = -11, Z = 0)
    const furnaceGroup = new THREE.Group();
    furnaceGroup.position.set(-11, 0.6, 0);

    const furnaceBody = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 1.4, 2.8, 8),
      new THREE.MeshStandardMaterial({ color: 0x78350f, metalness: 0.5, roughness: 0.4 })
    );
    furnaceBody.position.y = 1.4;
    furnaceGroup.add(furnaceBody);

    const furnaceLid = new THREE.Mesh(
      new THREE.ConeGeometry(2.0, 1.4, 8),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.7, roughness: 0.3 })
    );
    furnaceLid.position.y = 3.2;
    furnaceGroup.add(furnaceLid);

    const fireMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.75 })
    );
    fireMesh.position.y = 1.8;
    furnaceGroup.add(fireMesh);

    const furnaceSignCanvas = document.createElement('canvas');
    furnaceSignCanvas.width = 512;
    furnaceSignCanvas.height = 128;
    const fsctx = furnaceSignCanvas.getContext('2d');
    fsctx.fillStyle = '#4c1d95';
    fsctx.fillRect(0, 0, 512, 128);
    fsctx.fillStyle = '#ffffff';
    fsctx.font = 'bold 30px "Nunito", sans-serif';
    fsctx.textAlign = 'center';
    fsctx.fillText("🔮 LÒ BÁT QUÁI TIÊN ĐAN", 256, 52);
    fsctx.fillStyle = '#fef08a';
    fsctx.font = 'bold 24px "Nunito", sans-serif';
    fsctx.fillText("Thái Thượng Lão Quân Luyện Đan", 256, 95);
    const furnaceSign = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 0.75), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(furnaceSignCanvas) }));
    furnaceSign.position.set(0, 4.3, 0);
    furnaceGroup.add(furnaceSign);

    heavenGroup.add(furnaceGroup);

    // C. VƯỜN ĐÀO TIÊN TRƯỜNG SINH (CELESTIAL PEACH ORCHARD 🍑, X = 11, Z = 0)
    const orchardGroup = new THREE.Group();
    orchardGroup.position.set(11, 0.6, 0);

    [-2.2, 2.2].forEach(tx => {
      const treeTrunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.45, 3.2, 10),
        new THREE.MeshStandardMaterial({ color: 0x5c2e0b, roughness: 0.8 })
      );
      treeTrunk.position.set(tx, 1.6, 0);
      orchardGroup.add(treeTrunk);

      const treeLeaves = new THREE.Mesh(
        new THREE.SphereGeometry(1.6, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.5, emissive: 0xf472b6, emissiveIntensity: 0.2 })
      );
      treeLeaves.position.set(tx, 3.4, 0);
      orchardGroup.add(treeLeaves);

      [-0.6, 0.6].forEach(px => {
        const peach = new THREE.Mesh(
          new THREE.SphereGeometry(0.32, 12, 12),
          new THREE.MeshStandardMaterial({ color: 0xfb7185, emissive: 0xf43f5e, emissiveIntensity: 0.35 })
        );
        peach.position.set(tx + px, 3.1, 0.7);
        orchardGroup.add(peach);
      });
    });

    const peachSignCanvas = document.createElement('canvas');
    peachSignCanvas.width = 512;
    peachSignCanvas.height = 128;
    const psctx = peachSignCanvas.getContext('2d');
    psctx.fillStyle = '#9d174d';
    psctx.fillRect(0, 0, 512, 128);
    psctx.fillStyle = '#ffffff';
    psctx.font = 'bold 30px "Nunito", sans-serif';
    psctx.textAlign = 'center';
    psctx.fillText("🍑 VƯỜN ĐÀO TIÊN 3000 NĂM", 256, 52);
    psctx.fillStyle = '#fef08a';
    psctx.font = 'bold 24px "Nunito", sans-serif';
    psctx.fillText("Trư Bát Giới Thưởng Thức Đào", 256, 95);
    const peachSign = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.8), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(peachSignCanvas) }));
    peachSign.position.set(0, 4.4, 0);
    orchardGroup.add(peachSign);

    heavenGroup.add(orchardGroup);

    // D. ĐIỆN KIM LOAN & NGAI VÀNG MÂY BẠC (GOLDEN DRAGON THRONE 👑, Z = 8.5)
    const throneGroup = new THREE.Group();
    throneGroup.position.set(0, 0.6, 8.5);

    [
      { w: 8.0, d: 5.5, h: 0.35, y: 0.17 },
      { w: 6.4, d: 4.4, h: 0.35, y: 0.52 },
      { w: 4.8, d: 3.4, h: 0.35, y: 0.87 }
    ].forEach(st => {
      const stepMesh = new THREE.Mesh(new THREE.BoxGeometry(st.w, st.h, st.d), jadeMat);
      stepMesh.position.y = st.y;
      throneGroup.add(stepMesh);
    });

    const throneBase = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.8, 1.4), goldTrimMat);
    throneBase.position.set(0, 1.4, 0);
    throneGroup.add(throneBase);

    const throneBack = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.2, 0.3), goldTrimMat);
    throneBack.position.set(0, 2.4, -0.6);
    throneGroup.add(throneBack);

    const sunHalo = new THREE.Mesh(
      new THREE.RingGeometry(1.0, 1.8, 32),
      new THREE.MeshBasicMaterial({ color: 0xfef08a, side: THREE.DoubleSide })
    );
    sunHalo.position.set(0, 3.5, -0.7);
    throneGroup.add(sunHalo);

    [-2.2, 2.2].forEach(hx => {
      const crane = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, 2.2, 8),
        new THREE.MeshStandardMaterial({ color: 0xfef08a, metalness: 0.8 })
      );
      crane.position.set(hx, 2.0, 0);
      throneGroup.add(crane);
    });

    heavenGroup.add(throneGroup);

    // ĐĂNG KÝ BỀ MẶT VA CHẠM THIÊN ĐÌNH (Platform Standing Floor, topY = 80.6m)
    this.solidPlatforms.push({
      worldX: 25,
      worldY: 80.0,
      topY: 80.6,
      worldZ: 36,
      halfW: 19.5,
      halfD: 15.5
    });

    // ============================================================
    // 5. CÁC NHÂN VẬT 3D TÂY DU KÝ NƠI THIÊN ĐÌNH (4 CHIBI NPCS TẠI ĐỘ CAO Y = 80.6M)
    // ============================================================

    // 1. TÔN NGỘ KHÔNG (SUN WUKONG 🐒) -> World: (21, 80.6, 32)
    const wukongGroup = new THREE.Group();
    wukongGroup.position.set(-4, 0.6, -4);

    const cloudMount = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 14, 14),
      new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 0.3 })
    );
    cloudMount.scale.set(1.4, 0.45, 1.2);
    cloudMount.position.y = 0.35;
    wukongGroup.add(cloudMount);

    const wkBody = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.65, 0.35), goldTrimMat);
    wkBody.position.y = 1.0;
    wukongGroup.add(wkBody);

    const wkCape = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.75, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 })
    );
    wkCape.position.set(0, 0.95, -0.22);
    wukongGroup.add(wkCape);

    const wkHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.38, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.6 })
    );
    wkHead.position.set(0, 1.55, 0);
    wukongGroup.add(wkHead);

    const kimCo = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.04, 8, 16), goldTrimMat);
    kimCo.position.set(0, 1.68, 0);
    kimCo.rotation.x = Math.PI / 2;
    wukongGroup.add(kimCo);

    [-0.12, 0.12].forEach(fx => {
      const feather = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.04, 0.85, 6),
        new THREE.MeshStandardMaterial({ color: 0xb91c1c })
      );
      feather.position.set(fx, 2.05, -0.15);
      feather.rotation.z = fx > 0 ? 0.3 : -0.3;
      feather.rotation.x = -0.35;
      wukongGroup.add(feather);
    });

    const staffGroup = new THREE.Group();
    staffGroup.position.set(0.38, 1.1, 0.15);
    const staffShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.9, 12),
      new THREE.MeshStandardMaterial({ color: 0xb91c1c })
    );
    staffGroup.add(staffShaft);
    [-0.85, 0.85].forEach(gy => {
      const goldTip = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.3, 12), goldTrimMat);
      goldTip.position.y = gy;
      staffGroup.add(goldTip);
    });
    staffGroup.rotation.z = -0.25;
    wukongGroup.add(staffGroup);

    const wkMark = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
    wkMark.position.y = 2.65;
    wukongGroup.add(wkMark);
    this.exclamationMarks.push(wkMark);

    heavenGroup.add(wukongGroup);

    this.npcs.push({
      id: 'sun_wukong',
      name: 'Tôn Ngộ Không',
      title: 'Tề Thiên Đại Thánh (Mỹ Hầu Vương)',
      icon: '🐒',
      group: wukongGroup,
      worldPos: new THREE.Vector3(25 - 4, 80.6, 36 - 4),
      radius: 3.5,
      prompt: 'Bấm [E] hoặc [F] để Bái Kiến Tôn Ngộ Không & Thử Thách Tiếng Anh 🐒',
      quotes: [
        'Ta là Tề Thiên Đại Thánh Tôn Ngộ Không! Khá khen cho bé Hà My 5C4 đã trổ tài nhảy Obby leo lên tận Thiên Đình 80M!',
        'Gậy Như Ý của ta nặng một vạn ba ngàn năm trăm cân, nhưng ngữ pháp tiếng Anh thì nhẹ nhàng thú vị lắm!',
        'Cân Đẩu Vân của ta lướt vạn dặm mây xanh! Hãy trả lời câu đố tiếng Anh để nhận bảo bối nhé!'
      ]
    });

    // 2. TRƯ BÁT GIỚI (ZHU BAJIE 🐷) -> World: (29, 80.6, 32)
    const bajieGroup = new THREE.Group();
    bajieGroup.position.set(4, 0.6, -4);

    const bjBody = new THREE.Mesh(
      new THREE.SphereGeometry(0.48, 14, 14),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 })
    );
    bjBody.scale.set(1.1, 1.0, 1.2);
    bjBody.position.y = 0.85;
    bajieGroup.add(bjBody);

    const bjBelly = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0xfbcfe8, roughness: 0.5 })
    );
    bjBelly.position.set(0, 0.75, 0.28);
    bajieGroup.add(bjBelly);

    const bjHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.42, 0.42),
      new THREE.MeshStandardMaterial({ color: 0xfbcfe8, roughness: 0.5 })
    );
    bjHead.position.set(0, 1.45, 0);
    bajieGroup.add(bjHead);

    const bjSnout = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.1, 12),
      new THREE.MeshStandardMaterial({ color: 0xf472b6 })
    );
    bjSnout.rotation.x = Math.PI / 2;
    bjSnout.position.set(0, 1.4, 0.26);
    bajieGroup.add(bjSnout);

    [-0.28, 0.28].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.28, 0.06), new THREE.MeshStandardMaterial({ color: 0xf472b6 }));
      ear.position.set(ex, 1.58, 0);
      ear.rotation.z = ex > 0 ? -0.4 : 0.4;
      bajieGroup.add(ear);
    });

    const rakeGroup = new THREE.Group();
    rakeGroup.position.set(0.42, 1.0, 0.15);
    const rakeShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.8, 10),
      new THREE.MeshStandardMaterial({ color: 0x475569 })
    );
    rakeGroup.add(rakeShaft);
    const rakeHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.12, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 })
    );
    rakeHead.position.y = 0.85;
    rakeGroup.add(rakeHead);
    bajieGroup.add(rakeGroup);

    const peachBasket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.15, 0.25, 10),
      new THREE.MeshStandardMaterial({ color: 0xb45309 })
    );
    peachBasket.position.set(-0.35, 0.8, 0.2);
    bajieGroup.add(peachBasket);

    const bjMark = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
    bjMark.position.y = 2.45;
    bajieGroup.add(bjMark);
    this.exclamationMarks.push(bjMark);

    heavenGroup.add(bajieGroup);

    this.npcs.push({
      id: 'zhu_bajie',
      name: 'Trư Bát Giới',
      title: 'Thiên Bồng Nguyên Soái (Trư Ngộ Năng)',
      icon: '🐷',
      group: bajieGroup,
      worldPos: new THREE.Vector3(25 + 4, 80.6, 36 - 4),
      radius: 3.5,
      prompt: 'Bấm [E] hoặc [F] để Gặp Trư Bát Giới & Thưởng Thức Tiệc Đào Tiên 🐷',
      quotes: [
        'Hì hì, lão Trư chào bé Hà My 5C4! Đào Tiên trên Thiên Đình 80M ngọt lịm như từ vựng tiếng Anh vậy!',
        'Em có biết từ "Delicious" và "Fruit" tiếng Anh là gì không? Mau qua đây lão Trư chia Đào Tiên cho nè!',
        'Đại sư huynh bảo lão Trư lười học tiếng Anh, em giúp lão Trư ôn bài với nhé!'
      ]
    });

    // 3. SA TĂNG (SHA WUJING 🧔) -> World: (21, 80.6, 40)
    const shaGroup = new THREE.Group();
    shaGroup.position.set(-4, 0.6, 4);

    const saBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.7, 0.38),
      new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.6 })
    );
    saBody.position.y = 1.0;
    shaGroup.add(saBody);

    const necklace = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.08, 8, 16),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.5 })
    );
    necklace.position.set(0, 1.25, 0.12);
    necklace.rotation.x = Math.PI / 4;
    shaGroup.add(necklace);

    const saHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.4, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 })
    );
    saHead.position.set(0, 1.55, 0);
    shaGroup.add(saHead);

    const saBeard = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.25, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x18181b })
    );
    saBeard.position.set(0, 1.4, 0.22);
    shaGroup.add(saBeard);

    const saStaff = new THREE.Group();
    saStaff.position.set(0.38, 1.1, 0.15);
    const saShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.9, 10),
      new THREE.MeshStandardMaterial({ color: 0x334155 })
    );
    saStaff.add(saShaft);
    const spade = new THREE.Mesh(
      new THREE.TorusGeometry(0.18, 0.04, 8, 12, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9 })
    );
    spade.position.y = 0.95;
    spade.rotation.z = Math.PI;
    saStaff.add(spade);
    shaGroup.add(saStaff);

    const saMark = new THREE.Mesh(new THREE.OctahedronGeometry(0.28), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
    saMark.position.y = 2.55;
    shaGroup.add(saMark);
    this.exclamationMarks.push(saMark);

    heavenGroup.add(shaGroup);

    this.npcs.push({
      id: 'sha_wujing',
      name: 'Sa Tăng',
      title: 'Quyển Liêm Đại Tướng (Sa Ngộ Tĩnh)',
      icon: '🧔',
      group: shaGroup,
      worldPos: new THREE.Vector3(25 - 4, 80.6, 36 + 4),
      radius: 3.5,
      prompt: 'Bấm [E] hoặc [F] để Đàm Đạo Với Sa Tăng Về Lòng Kiên Trì 🧔',
      quotes: [
        'A Di Đà Phật! Bé Hà My leo được Tháp Obby 80M lên đây đã chứng minh lòng kiên trì phi thường!',
        'Hành trình vạn dặm bắt đầu từ một bước chân. Học chắc từng từ vựng nhé bé Hà My!',
        'Ta là Sa Ngộ Tĩnh, canh giữ Nam Thiên Môn. Chúc bé Hà My luôn kiên trì và đạt điểm 10 tiếng Anh!'
      ]
    });

    // 4. THÁI THƯỢNG LÃO QUÂN & NGỌC HOÀNG (JADE EMPEROR / LAOZI 🧙‍♂️👑) -> World: (25, 81.8, 44.5)
    const laoziGroup = new THREE.Group();
    laoziGroup.position.set(0, 1.8, 8.5);

    const lzBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.65, 1.1, 16),
      new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 0.25, roughness: 0.4 })
    );
    lzBody.position.y = 0.55;
    laoziGroup.add(lzBody);

    const lzHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 14, 14),
      new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.5 })
    );
    lzHead.position.set(0, 1.35, 0);
    laoziGroup.add(lzHead);

    const beard = new THREE.Mesh(
      new THREE.ConeGeometry(0.16, 0.65, 8),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 })
    );
    beard.position.set(0, 1.05, 0.22);
    beard.rotation.x = 0.2;
    laoziGroup.add(beard);

    const crownMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.18, 0.38),
      goldTrimMat
    );
    crownMesh.position.set(0, 1.62, 0);
    laoziGroup.add(crownMesh);

    const whisk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
    );
    whisk.position.set(0.35, 0.9, 0.25);
    whisk.rotation.z = -0.4;
    laoziGroup.add(whisk);

    const lzMark = new THREE.Mesh(new THREE.OctahedronGeometry(0.32), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
    lzMark.position.y = 2.45;
    laoziGroup.add(lzMark);
    this.exclamationMarks.push(lzMark);

    heavenGroup.add(laoziGroup);

    this.npcs.push({
      id: 'jade_emperor',
      name: 'Thái Thượng Lão Quân',
      title: 'Đạo Tổ Tiên Giới & Ngọc Hoàng Đại Đế',
      icon: '🧙‍♂️',
      group: laoziGroup,
      worldPos: new THREE.Vector3(25, 81.8, 36 + 8.5),
      radius: 4.2,
      prompt: 'Bấm [E] hoặc [F] để Khảo Hạch Đan Dược & Đắc Đạo Thủ Khoa 🧙‍♂️',
      quotes: [
        'Lành thay! Đã lâu lắm rồi Thiên Đình 80M mới đón tiếp một trạng nguyên nhí xuất sắc tự nhảy Obby lên đỉnh như bé Hà My 5C4!',
        'Lò Bát Quái của Lão Quân luyện ra Đan Dược Trí Tuệ, chỉ ban cho người chăm học tiếng Anh!',
        'Hãy vượt qua bài khảo hạch tối cao này, Lão Quân sẽ phong tặng em danh hiệu Thủ Khoa Thiên Giới!'
      ]
    });

    parkourGroup.add(heavenGroup);
    this.scene.add(parkourGroup);
  }

  // ------------------------------------------------------------
  // KHU VỰC 6: KHU THỂ THAO PHỨC HỢP (SPORTS COMPLEX)
  // Sân bóng đá mini cỏ nhân tạo (38m x 24m) + Sân bóng rổ (22m x 14m) + Đường chạy điền kinh
  // Tọa độ đặt tại cánh Tây: X = -65, Z = 38 đến 70
  // ------------------------------------------------------------
  buildSportsComplexZone() {
    const sportsGroup = new THREE.Group();

    // 1. SÂN BÓNG ĐÁ CỎ NHÂN TẠO MINI (38m x 24m)
    const pitchWidth = 38;
    const pitchDepth = 24;

    const pitchCanvas = document.createElement('canvas');
    pitchCanvas.width = 1024;
    pitchCanvas.height = 640;
    const pctx = pitchCanvas.getContext('2d');
    pctx.fillStyle = '#15803d';
    pctx.fillRect(0, 0, 1024, 640);

    const stripeWidth = 1024 / 10;
    for (let s = 0; s < 10; s += 2) {
      pctx.fillStyle = '#16a34a';
      pctx.fillRect(s * stripeWidth, 0, stripeWidth, 640);
    }

    pctx.strokeStyle = '#ffffff';
    pctx.lineWidth = 10;
    pctx.strokeRect(30, 30, 964, 580);
    pctx.beginPath();
    pctx.moveTo(512, 30); pctx.lineTo(512, 610);
    pctx.stroke();

    pctx.beginPath();
    pctx.arc(512, 320, 85, 0, Math.PI * 2);
    pctx.stroke();
    pctx.fillStyle = '#ffffff';
    pctx.beginPath();
    pctx.arc(512, 320, 10, 0, Math.PI * 2);
    pctx.fill();

    pctx.strokeRect(30, 170, 180, 300);
    pctx.strokeRect(30, 230, 70, 180);
    pctx.beginPath();
    pctx.arc(200, 320, 8, 0, Math.PI * 2);
    pctx.fill();

    pctx.strokeRect(814, 170, 180, 300);
    pctx.strokeRect(924, 230, 70, 180);
    pctx.beginPath();
    pctx.arc(824, 320, 8, 0, Math.PI * 2);
    pctx.fill();

    const pitchTex = new THREE.CanvasTexture(pitchCanvas);
    const pitchGeo = new THREE.PlaneGeometry(pitchWidth, pitchDepth);
    const pitchMat = new THREE.MeshStandardMaterial({ map: pitchTex, roughness: 0.65 });
    const pitch = new THREE.Mesh(pitchGeo, pitchMat);
    pitch.rotation.x = -Math.PI / 2;
    pitch.position.set(-65, 0.025, 38);
    pitch.receiveShadow = true;
    sportsGroup.add(pitch);

    // 2. KHUNG THÀNH TẠI X = -83, Z = 38 (Khung thành chính sút phạt)
    const goalMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const postRad = 0.12;
    const postH = 2.4;
    const goalW = 5.2;
    const goalD = 2.0;
    const gx = -83;
    const gz = 38;

    [-goalW / 2, goalW / 2].forEach(offZ => {
      const vPost = new THREE.Mesh(new THREE.CylinderGeometry(postRad, postRad, postH, 16), goalMat);
      vPost.position.set(gx, postH / 2, gz + offZ);
      vPost.castShadow = true;
      sportsGroup.add(vPost);

      // Thanh đỡ lưới xiên ra phía sau (Angled Back Stanchion)
      const stanchion = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.9, 12), goalMat);
      stanchion.position.set(gx - goalD * 0.48, postH * 0.5, gz + offZ);
      stanchion.rotation.z = -0.72;
      sportsGroup.add(stanchion);

      // Khung đáy tiếp đất (Bottom Ground Bar)
      const groundBar = new THREE.Mesh(new THREE.BoxGeometry(goalD, 0.08, 0.08), goalMat);
      groundBar.position.set(gx - goalD / 2, 0.04, gz + offZ);
      sportsGroup.add(groundBar);
    });

    const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(postRad, postRad, goalW, 16), goalMat);
    crossbar.rotation.x = Math.PI / 2;
    crossbar.position.set(gx, postH, gz);
    sportsGroup.add(crossbar);

    const backGroundBar = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, goalW), goalMat);
    backGroundBar.position.set(gx - goalD, 0.04, gz);
    sportsGroup.add(backGroundBar);

    // Lưới khung thành 3D chuyên nghiệp (3D Tapered Netting)
    const netMat = new THREE.MeshBasicMaterial({ color: 0xf1f5f9, wireframe: true, transparent: true, opacity: 0.65 });
    const backNet = new THREE.Mesh(new THREE.PlaneGeometry(goalW, postH), netMat);
    backNet.rotation.y = Math.PI / 2;
    backNet.position.set(gx - goalD, postH / 2, gz);
    sportsGroup.add(backNet);

    const topNet = new THREE.Mesh(new THREE.PlaneGeometry(goalW, Math.hypot(goalD, 0.6)), netMat);
    topNet.rotation.y = Math.PI / 2;
    topNet.rotation.x = 0.35;
    topNet.position.set(gx - goalD / 2, postH - 0.25, gz);
    sportsGroup.add(topNet);

    [-goalW / 2, goalW / 2].forEach(sz => {
      const sideNet = new THREE.Mesh(new THREE.PlaneGeometry(goalD, postH), netMat);
      sideNet.position.set(gx - goalD / 2, postH / 2, gz + sz);
      sportsGroup.add(sideNet);
    });

    // 4 Cột cờ góc sân bóng đá (Corner Flags)
    const flagMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide });
    const flagPoleMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    [
      { x: -65 - 18.5, z: 38 - 11.5 },
      { x: -65 - 18.5, z: 38 + 11.5 },
      { x: -65 + 18.5, z: 38 - 11.5 },
      { x: -65 + 18.5, z: 38 + 11.5 }
    ].forEach(cPos => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8), flagPoleMat);
      pole.position.set(cPos.x, 0.75, cPos.z);
      sportsGroup.add(pole);

      const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.24), flagMat);
      flag.position.set(cPos.x + 0.18, 1.35, cPos.z);
      sportsGroup.add(flag);
    });

    // Khu kỹ thuật / Ghế dự bị có mái che vòm (Team Dugout)
    const dugoutGroup = new THREE.Group();
    dugoutGroup.position.set(-65, 0, 24.8);
    const canopyGeo = new THREE.CylinderGeometry(1.6, 1.6, 6.2, 16, 1, false, 0, Math.PI);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, roughness: 0.1 });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.rotation.z = Math.PI / 2;
    canopy.position.set(0, 1.6, 0);
    dugoutGroup.add(canopy);
    const dFrameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
    const dFrame = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.08, 1.8), dFrameMat);
    dFrame.position.set(0, 0.04, 0);
    dugoutGroup.add(dFrame);
    for (let s = -2.0; s <= 2.0; s += 1.0) {
      const seatM = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: Math.abs(s) > 1 ? 0xef4444 : 0x0284c7 }));
      seatM.position.set(s, 0.45, -0.1);
      dugoutGroup.add(seatM);
    }
    sportsGroup.add(dugoutGroup);

    // 3. QUẢ BÓNG ĐÁ TẠI CHẤM PHẠT ĐỀN 11M (X = -55, Z = 38)
    const ballGeo = new THREE.SphereGeometry(0.36, 18, 18);
    const ballCanvas = document.createElement('canvas');
    ballCanvas.width = 256; ballCanvas.height = 256;
    const bctx = ballCanvas.getContext('2d');
    bctx.fillStyle = '#ffffff'; bctx.fillRect(0, 0, 256, 256);
    bctx.fillStyle = '#0f172a';
    for (let bx = 32; bx < 256; bx += 64) {
      for (let by = 32; by < 256; by += 64) {
        bctx.beginPath();
        bctx.arc(bx, by, 18, 0, Math.PI * 2);
        bctx.fill();
      }
    }
    const ballMat = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(ballCanvas), roughness: 0.4 });
    const soccerBall = new THREE.Mesh(ballGeo, ballMat);
    soccerBall.position.set(-55, 0.36, 38);
    soccerBall.castShadow = true;
    sportsGroup.add(soccerBall);

    const ringGeo = new THREE.RingGeometry(0.7, 1.1, 24);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(-55, 0.035, 38);
    sportsGroup.add(ring);

    // 4. NPC THỦ MÔN ROBOT TẠI KHUNG THÀNH (X = -81.5, Z = 38)
    const goalieGroup = new THREE.Group();
    goalieGroup.position.set(-81.5, 0, 38);
    goalieGroup.rotation.y = Math.PI / 2;

    const gBody = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.45), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
    gBody.position.y = 1.05;
    gBody.castShadow = true;
    goalieGroup.add(gBody);

    const gHead = new THREE.Mesh(new THREE.SphereGeometry(0.36, 18, 18), new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, metalness: 0.5 }));
    gHead.position.y = 1.85;
    goalieGroup.add(gHead);

    // Màn hình LED Cyber phát sáng [ ■ ‿ ■ ]
    this.attachCurvedFace(gHead, 'goalie_robot');

    [-0.55, 0.55].forEach(gxOff => {
      const glove = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.32, 0.25), new THREE.MeshStandardMaterial({ color: 0xf97316 }));
      glove.position.set(gxOff, 1.05, 0.15);
      goalieGroup.add(glove);
    });

    [-0.2, 0.2].forEach(lx => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.6, 0.24), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
      leg.position.set(lx, 0.3, 0);
      goalieGroup.add(leg);
    });

    sportsGroup.add(goalieGroup);

    this.npcs.push({
      id: 'goalie_robot',
      name: 'Robot Thủ Môn',
      title: 'Găng Tay Vàng 5C4',
      group: goalieGroup,
      worldPos: new THREE.Vector3(-81.5, 0, 38),
      radius: 3.5,
      icon: '🤖',
      prompt: 'Bấm [E] hoặc [F] để Thách Đấu Sút Phạt 11M ⚽'
    });

    // 5. NPC HUẤN LUYỆN VIÊN THẦY VIỆT TẠI X = -50, Z = 34
    const coachGroup = new THREE.Group();
    coachGroup.position.set(-50, 0, 34);
    coachGroup.rotation.y = Math.PI / 4;

    const cBody = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.95, 0.4), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
    cBody.position.y = 1.05;
    coachGroup.add(cBody);

    const cHead = new THREE.Mesh(new THREE.SphereGeometry(0.35, 18, 18), new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.4 }));
    cHead.position.y = 1.8;
    coachGroup.add(cHead);

    // Gương mặt HLV Thầy Việt năng động, nhiệt huyết
    this.attachCurvedFace(cHead, 'coach_viet');

    const cCap = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x1e3a8a }));
    cCap.position.y = 1.85;
    coachGroup.add(cCap);
    const cVisor = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.04, 0.26), new THREE.MeshStandardMaterial({ color: 0x1e3a8a }));
    cVisor.position.set(0, 1.88, 0.36);
    coachGroup.add(cVisor);

    const cWhistle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.15), new THREE.MeshStandardMaterial({ color: 0xc084fc }));
    cWhistle.position.set(0, 1.25, 0.22);
    coachGroup.add(cWhistle);

    sportsGroup.add(coachGroup);

    this.npcs.push({
      id: 'coach_viet',
      name: 'Thầy Việt',
      title: 'HLV Thể Dục 5C4',
      group: coachGroup,
      worldPos: new THREE.Vector3(-50, 0, 34),
      radius: 3.5,
      icon: '🏃‍♂️',
      prompt: 'Bấm [E] hoặc [F] để Thách Đấu Sút Phạt 11M ⚽',
      quotes: [
        "Hà My chuẩn bị tinh thần sút phạt nhé! Tiếng Anh chuẩn thì bóng sẽ găm thẳng góc chết! ⚽",
        "Tập thể dục thể thao mỗi ngày giúp các con vừa khỏe vừa học giỏi tiếng Anh đấy! 🏆",
        "Robot Thủ Môn của thầy bắt bóng rất cừ đấy, em có tự tin ghi bàn không nào? 🥅"
      ]
    });

    // 6. KHÁN ĐÀI THỂ THAO MINI TẠI X = -65, Z = 23
    const bleacherGroup = new THREE.Group();
    bleacherGroup.position.set(-65, 0, 23);
    const seatColors = [0xef4444, 0x3b82f6, 0xfacc15];
    for (let tier = 0; tier < 3; tier++) {
      const tStep = new THREE.Mesh(
        new THREE.BoxGeometry(22, 0.35, 1.4),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
      );
      tStep.position.set(0, 0.18 + tier * 0.45, -tier * 1.2);
      bleacherGroup.add(tStep);

      for (let seatX = -9; seatX <= 9; seatX += 2.0) {
        const chair = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 0.12, 0.8),
          new THREE.MeshStandardMaterial({ color: seatColors[(tier + Math.abs(seatX)) % 3] })
        );
        chair.position.set(seatX, 0.42 + tier * 0.45, -tier * 1.2);
        bleacherGroup.add(chair);
      }

      this.solidPlatforms.push({
        worldX: -65,
        worldY: tier * 0.45,
        topY: 0.38 + tier * 0.45,
        halfW: 11,
        halfD: 0.7
      });
    }
    sportsGroup.add(bleacherGroup);

    // 7. CỘT ĐÈN CAO ÁP SÂN BÓNG ĐÁ (4 Floodlight Towers)
    const floodlightCoords = [
      { x: -44, z: 25 },
      { x: -86, z: 25 },
      { x: -44, z: 51 },
      { x: -86, z: 51 }
    ];
    floodlightCoords.forEach(pos => {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.3, 10, 12),
        new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 })
      );
      pole.position.set(pos.x, 5.0, pos.z);
      sportsGroup.add(pole);

      const rack = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.8, 0.4),
        new THREE.MeshStandardMaterial({ color: 0x1e293b })
      );
      rack.position.set(pos.x, 9.8, pos.z);
      sportsGroup.add(rack);

      const lamp = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.6, 0.1),
        new THREE.MeshBasicMaterial({ color: 0xfef08a })
      );
      lamp.position.set(pos.x, 9.8, pos.z + (pos.z > 38 ? -0.22 : 0.22));
      sportsGroup.add(lamp);
    });

    // 8. SÂN BÓNG RỔ LIỀN KỀ (22m x 14m) TẠI X = -65, Z = 66
    const bballGeo = new THREE.PlaneGeometry(22, 14);
    const bballCanvas = document.createElement('canvas');
    bballCanvas.width = 512; bballCanvas.height = 320;
    const bbctx = bballCanvas.getContext('2d');
    bbctx.fillStyle = '#0284c7';
    bbctx.fillRect(0, 0, 512, 320);
    bbctx.fillStyle = '#ea580c';
    bbctx.fillRect(20, 80, 100, 160);
    bbctx.fillRect(392, 80, 100, 160);
    bbctx.strokeStyle = '#ffffff';
    bbctx.lineWidth = 6;
    bbctx.strokeRect(15, 15, 482, 290);
    bbctx.beginPath();
    bbctx.moveTo(256, 15); bbctx.lineTo(256, 305);
    bbctx.stroke();
    bbctx.beginPath();
    bbctx.arc(256, 160, 50, 0, Math.PI * 2);
    bbctx.stroke();

    const bballMat = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(bballCanvas), roughness: 0.5 });
    const bballCourt = new THREE.Mesh(bballGeo, bballMat);
    bballCourt.rotation.x = -Math.PI / 2;
    bballCourt.position.set(-65, 0.026, 28);
    sportsGroup.add(bballCourt);

    [-11 + 1.2, 11 - 1.2].forEach(offX => {
      const hoopPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.15, 4.2, 12),
        new THREE.MeshStandardMaterial({ color: 0x334155 })
      );
      hoopPole.position.set(-65 + offX, 2.1, 28);
      sportsGroup.add(hoopPole);

      const backboard = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 1.2, 1.8),
        new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.75, roughness: 0.08, metalness: 0.12 })
      );
      backboard.position.set(-65 + offX + (offX > 0 ? -0.4 : 0.4), 3.4, 28);
      sportsGroup.add(backboard);

      // Ô ngắm vuông màu đỏ trên bảng rổ (Inner Target Box)
      const targetBox = new THREE.Mesh(
        new THREE.BoxGeometry(0.09, 0.45, 0.6),
        new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true })
      );
      targetBox.position.set(-65 + offX + (offX > 0 ? -0.4 : 0.4), 3.25, 28);
      sportsGroup.add(targetBox);

      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(0.32, 0.035, 12, 24),
        new THREE.MeshStandardMaterial({ color: 0xf97316 })
      );
      rim.rotation.x = Math.PI / 2;
      rim.position.set(-65 + offX + (offX > 0 ? -0.8 : 0.8), 3.0, 28);
      sportsGroup.add(rim);

      // Lưới rổ 3D hình nón cụt (3D Tapered Basketball Net)
      const bNet = new THREE.Mesh(
        new THREE.CylinderGeometry(0.31, 0.16, 0.52, 12, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
      );
      bNet.position.set(-65 + offX + (offX > 0 ? -0.8 : 0.8), 2.74, 28);
      sportsGroup.add(bNet);
    });

    const bballSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 })
    );
    bballSphere.position.set(-65, 0.32, 28);
    sportsGroup.add(bballSphere);

    // 9. ĐƯỜNG CHẠY ĐIỀN KINH ĐỎ BAO QUANH (Running Track)
    const trackGeo = new THREE.PlaneGeometry(44, 48);
    const trackMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.7 });
    const track = new THREE.Mesh(trackGeo, trackMat);
    track.rotation.x = -Math.PI / 2;
    track.position.set(-65, 0.02, 34);
    track.receiveShadow = true;
    sportsGroup.add(track);

    this.scene.add(sportsGroup);
  }

  // ------------------------------------------------------------
  // KHU VỰC 7: THƯ VIỆN TRƯỜNG TIỂU HỌC NGÔ QUYỀN (GRAND LIBRARY)
  // Tòa nhà 2 tầng hiện đại, kệ sách, bàn đọc sách, trạm lật thẻ trí nhớ & Cô Thủ Thư Huệ
  // Tọa độ đặt tại cánh Đông: X = 65, Z = 24
  // ------------------------------------------------------------
  buildLibraryZone() {
    const libGroup = new THREE.Group();
    libGroup.position.set(65, 0, 24);

    const wallMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.5 });
    const timberMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.6 });

    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 512; floorCanvas.height = 512;
    const fctx = floorCanvas.getContext('2d');
    fctx.fillStyle = '#d97706'; fctx.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y += 32) {
      fctx.fillStyle = y % 64 === 0 ? '#b45309' : '#f59e0b';
      fctx.fillRect(0, y, 512, 30);
    }
    const floorTex = new THREE.CanvasTexture(floorCanvas);
    floorTex.wrapS = THREE.RepeatWrapping; floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(6, 4);
    const floorMat = new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.4 });

    const libFloor = new THREE.Mesh(new THREE.PlaneGeometry(24, 16), floorMat);
    libFloor.rotation.x = -Math.PI / 2;
    libFloor.position.set(0, 0.035, 0);
    libFloor.receiveShadow = true;
    libGroup.add(libFloor);

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(24, 9, 0.6), wallMat);
    backWall.position.set(0, 4.5, -8);
    libGroup.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 9, 16), wallMat);
    leftWall.position.set(-12, 4.5, 0);
    libGroup.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.6, 9, 16), wallMat);
    rightWall.position.set(12, 4.5, 0);
    libGroup.add(rightWall);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(25, 0.8, 17), wallMat);
    roof.position.set(0, 9.4, 0);
    libGroup.add(roof);

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1
    });
    const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(16, 8, 0.2), glassMat);
    frontGlass.position.set(3, 4.2, 8);
    libGroup.add(frontGlass);

    for (let gx = -4; gx <= 10; gx += 3.5) {
      const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.18, 8, 0.25), timberMat);
      mullion.position.set(gx, 4.2, 8);
      libGroup.add(mullion);
    }

    const libSignCanvas = document.createElement('canvas');
    libSignCanvas.width = 1024; libSignCanvas.height = 256;
    const lsctx = libSignCanvas.getContext('2d');
    lsctx.fillStyle = '#0f172a'; lsctx.fillRect(0, 0, 1024, 256);
    lsctx.strokeStyle = '#f59e0b'; lsctx.lineWidth = 8; lsctx.strokeRect(6, 6, 1012, 244);
    lsctx.fillStyle = '#fef08a'; lsctx.font = 'bold 50px "Nunito", sans-serif'; lsctx.textAlign = 'center';
    lsctx.fillText("📖 THƯ VIỆN TIỂU HỌC NGÔ QUYỀN", 512, 100);
    lsctx.fillStyle = '#ffffff'; lsctx.font = 'bold 36px "Nunito", sans-serif';
    lsctx.fillText("KHÔNG GIAN SÁCH & TRÍ TUỆ 5C4", 512, 175);

    const libSign = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 2.8),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(libSignCanvas) })
    );
    libSign.position.set(0, 8.2, 8.2);
    libGroup.add(libSign);

    // Kệ sách gỗ đồ sộ
    const bookColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b, 0x8b5cf6, 0xec4899];
    for (let k = 0; k < 4; k++) {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(6, 5.5, 1.2), timberMat);
      shelf.position.set(-7 + (k % 2) * 14, 2.75, -5 + Math.floor(k / 2) * 6);
      shelf.castShadow = true;
      libGroup.add(shelf);

      for (let row = 0; row < 4; row++) {
        for (let bx = -2.5; bx <= 2.5; bx += 0.45) {
          const book = new THREE.Mesh(
            new THREE.BoxGeometry(0.35, 0.9, 0.9),
            new THREE.MeshStandardMaterial({ color: bookColors[(k * 7 + row * 5 + Math.round(bx * 10)) % bookColors.length] })
          );
          book.position.set(-7 + (k % 2) * 14 + bx, 0.8 + row * 1.3, -5 + Math.floor(k / 2) * 6);
          libGroup.add(book);
        }
      }
    }

    // Bàn đọc sách tròn
    const tableMat = new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.4 });
    const studyTable = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.15, 24), tableMat);
    studyTable.position.set(0, 1.1, 0);
    libGroup.add(studyTable);

    const tableLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.1, 16), timberMat);
    tableLeg.position.set(0, 0.55, 0);
    libGroup.add(tableLeg);

    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, 0.5, 16), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
    lamp.position.set(0, 1.45, 0);
    libGroup.add(lamp);

    // Bàn trạm lật thẻ trí nhớ
    const desk = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.1, 1.4), timberMat);
    desk.position.set(-10, 0.55, 0);
    libGroup.add(desk);

    const openBook = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.6), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    openBook.position.set(-10, 1.15, 0);
    libGroup.add(openBook);

    const cardIcon = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.85, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0xa855f7, emissiveIntensity: 0.6 })
    );
    cardIcon.position.set(-10, 1.8, 0);
    libGroup.add(cardIcon);

    // NPC CÔ THỦ THƯ HUỆ
    const librarianGroup = new THREE.Group();
    librarianGroup.position.set(-10, 0, -1.2);

    const lBody = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.0, 0.4), new THREE.MeshStandardMaterial({ color: 0x7c3aed }));
    lBody.position.y = 1.05;
    librarianGroup.add(lBody);

    const lDress = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.2, 16), new THREE.MeshStandardMaterial({ color: 0x8b5cf6 }));
    lDress.position.y = 0.6;
    librarianGroup.add(lDress);

    const lHead = new THREE.Mesh(new THREE.SphereGeometry(0.35, 20, 20), new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.35 }));
    lHead.position.y = 1.85;
    librarianGroup.add(lHead);

    // Gương mặt Cô Huệ thủ thư dịu dàng, kính cận tri thức
    this.attachCurvedFace(lHead, 'librarian_hue');

    // Mái tóc búi cao quý phái của Cô Thủ Thư
    const lHair = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.8), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 }));
    lHair.position.y = 1.9;
    librarianGroup.add(lHair);

    const lBun = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
    lBun.position.set(0, 2.05, -0.28);
    librarianGroup.add(lBun);

    libGroup.add(librarianGroup);

    this.npcs.push({
      id: 'librarian_hue',
      name: 'Cô Huệ',
      title: 'Thủ Thư Thư Viện Ngô Quyền',
      group: librarianGroup,
      worldPos: new THREE.Vector3(55, 0, 24),
      radius: 3.5,
      icon: '📖',
      prompt: 'Bấm [E] hoặc [F] để Chơi Lật Thẻ Trí Nhớ 📖',
      quotes: [
        "Chào Hà My! Thư viện có rất nhiều sách truyện tiếng Anh hay và trò chơi Lật Thẻ rèn trí nhớ đấy! 📚",
        "Đọc sách mỗi ngày là chìa khóa vàng để mở cánh cửa thế giới, bé hãy chăm chỉ nhé! ✨",
        "Em có muốn thử tài ghi nhớ các cặp động từ Quá khứ bất quy tắc không nào? 🃏"
      ]
    });

    this.solidPlatforms.push({
      worldX: 65,
      worldY: 0,
      topY: 0.04,
      halfW: 12,
      halfD: 8
    });

    this.scene.add(libGroup);
  }

  // ------------------------------------------------------------
  // KHU VỰC 8: ĐẠI SÂN KHẤU HỘI DIỄN & BOSS DR. MISTAKE
  // Sân khấu lớn ngoài trời (22m x 12m x 1.2m), màn hình LED, loa thùng & Boss Dr. Mistake
  // Tọa độ đặt tại trục Nam: X = 0, Z = 78
  // ------------------------------------------------------------
  buildAuditoriumStageZone() {
    const stageGroup = new THREE.Group();
    stageGroup.position.set(-36.0, 0, 38.0);
    stageGroup.rotation.y = -Math.PI / 2;

    const stageMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 });
    const stageBox = new THREE.Mesh(new THREE.BoxGeometry(22, 1.2, 12), stageMat);
    stageBox.position.set(0, 0.6, 0);
    stageBox.receiveShadow = true;
    stageGroup.add(stageBox);

    const redCarpet = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 12),
      new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.5 })
    );
    redCarpet.rotation.x = -Math.PI / 2;
    redCarpet.position.set(0, 1.21, 0);
    stageGroup.add(redCarpet);

    for (let step = 0; step < 3; step++) {
      const stepMesh = new THREE.Mesh(
        new THREE.BoxGeometry(8, 0.4, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x64748b })
      );
      stepMesh.position.set(0, 0.2 + step * 0.4, -6.0 - (2 - step) * 0.8);
      stageGroup.add(stepMesh);

      // Đăng ký bậc thang vào solidPlatforms với toạ độ worldX/Z chính xác để leo lên sân khấu
      this.solidPlatforms.push({
        worldX: -36.0 + 6.0 + (2 - step) * 0.8,
        worldY: step * 0.4,
        worldZ: 38.0,
        topY: 0.4 + step * 0.4,
        halfW: 0.5,
        halfD: 4.0
      });
    }

    const ledCanvas = document.createElement('canvas');
    ledCanvas.width = 1024; ledCanvas.height = 384;
    const lctx = ledCanvas.getContext('2d');
    const grad = lctx.createLinearGradient(0, 0, 1024, 384);
    grad.addColorStop(0, '#1e1b4b');
    grad.addColorStop(0.5, '#4338ca');
    grad.addColorStop(1, '#6b21a8');
    lctx.fillStyle = grad;
    lctx.fillRect(0, 0, 1024, 384);

    lctx.fillStyle = '#fef08a';
    lctx.font = '900 44px "Nunito", sans-serif';
    lctx.textAlign = 'center';
    lctx.fillText("🌟 HỘI DIỄN TIẾNG ANH TIỂU HỌC NGÔ QUYỀN 🌟", 512, 110);
    lctx.fillStyle = '#38bdf8';
    lctx.font = 'bold 36px "Nunito", sans-serif';
    lctx.fillText("ENGLISH FESTIVAL 5C4 - EM YÊU TIẾNG ANH", 512, 180);
    lctx.fillStyle = '#f43f5e';
    lctx.font = 'bold 30px "Nunito", sans-serif';
    lctx.fillText("⚔️ ĐẤU TRƯỜNG NGỮ PHÁP: KHIÊU CHIẾN DR. MISTAKE ⚔️", 512, 250);

    // Phông màn LED sân khấu quay mặt về hướng sân trường và cổng (Math.PI)
    const backdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 6.0),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(ledCanvas), side: THREE.DoubleSide })
    );
    backdrop.position.set(0, 4.2, 5.8);
    backdrop.rotation.y = Math.PI;
    stageGroup.add(backdrop);

    const trussMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.3 });
    const trussTop = new THREE.Mesh(new THREE.BoxGeometry(22.4, 0.4, 0.4), trussMat);
    trussTop.position.set(0, 7.4, 5.8);
    stageGroup.add(trussTop);

    [-9.5, 9.5].forEach(sx => {
      const spk = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.6, 1.4), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
      spk.position.set(sx, 3.0, 4.0);
      stageGroup.add(spk);

      [-0.9, 0.3].forEach(sy => {
        const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.1, 16), new THREE.MeshBasicMaterial({ color: 0x334155 }));
        cone.rotation.x = Math.PI / 2;
        cone.position.set(sx, 3.0 + sy, 3.25);
        stageGroup.add(cone);
      });
    });

    const podium = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.9), new THREE.MeshStandardMaterial({ color: 0x78350f }));
    podium.position.set(0, 1.8, -2.5);
    podium.rotation.y = Math.PI;
    stageGroup.add(podium);

    // BOSS DR. MISTAKE TRÊN SÂN KHẤU (Quay mặt ra phía trước đón tiếp người chơi)
    const bossGroup = new THREE.Group();
    bossGroup.position.set(0, 1.2, 0.5);
    bossGroup.rotation.y = Math.PI;

    const bCloak = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.3, 0.6), new THREE.MeshStandardMaterial({ color: 0x581c87 }));
    bCloak.position.y = 0.9;
    bossGroup.add(bCloak);

    const bChest = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.1, 0.4), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
    bChest.position.set(0, 0.9, 0.15);
    bossGroup.add(bChest);

    const bHead = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 20), new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.4 }));
    bHead.position.y = 1.95;
    bossGroup.add(bHead);

    // Gương mặt Giáo Sư Phù Thủy Dr. Mistake hóm hỉnh với ria mép cong và mắt sao tím lấp lánh
    this.attachCurvedFace(bHead, 'boss_dr_mistake');

    const bHatCone = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.1, 16), new THREE.MeshStandardMaterial({ color: 0x6b21a8 }));
    bHatCone.position.y = 2.85;
    bossGroup.add(bHatCone);
    const bHatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.08, 16), new THREE.MeshStandardMaterial({ color: 0x581c87 }));
    bHatBrim.position.y = 2.32;
    bossGroup.add(bHatBrim);

    const wand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 1.6, 12), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
    wand.position.set(0.65, 1.1, 0.2);
    bossGroup.add(wand);
    const wandOrb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xc084fc }));
    wandOrb.position.set(0.65, 1.95, 0.2);
    bossGroup.add(wandOrb);

    const auraRing = new THREE.Mesh(
      new THREE.RingGeometry(1.2, 1.8, 32),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide, transparent: true, opacity: 0.65 })
    );
    auraRing.rotation.x = -Math.PI / 2;
    auraRing.position.y = 0.02;
    bossGroup.add(auraRing);

    stageGroup.add(bossGroup);

    this.npcs.push({
      id: 'boss_dr_mistake',
      name: 'Dr. Mistake',
      title: 'Giáo Sư Lỗi Sai Ngữ Pháp',
      group: bossGroup,
      worldPos: new THREE.Vector3(-36.0, 1.2, 38.0),
      radius: 4.5,
      icon: '🧙‍♂️',
      prompt: 'Bấm [E] hoặc [F] để Đại Chiến Boss Ngữ Pháp Dr. Mistake! ⚔️',
      quotes: [
        "Ha ha ha! Ta là Dr. Mistake! Hãy xem các cô cậu 5C4 có tìm ra lỗi sai ngữ pháp của ta không! 🌀",
        "Thì Hiện Tại, Tiếp Diễn, Quá Khứ... ngươi có dám chắc mình không nhầm lẫn không hả Hà My? ⚡",
        "Nếu sửa đúng hết các câu sai của ta, ta sẽ trao tặng Rương Kho Báu Huyền Thoại! 🎁"
      ]
    });

    // Toàn bộ mặt sàn sân khấu lớn (22m x 12m) ở độ cao Y = 1.2m
    this.solidPlatforms.push({
      worldX: -36.0,
      worldY: 0.6,
      worldZ: 38.0,
      topY: 1.2,
      halfW: 6.0,
      halfD: 11.0
    });

    this.scene.add(stageGroup);
  }

  // ------------------------------------------------------------
  // KHU VỰC 9: VƯỜN HOA SINH THÁI & NHÀ KÍNH VÒM (BOTANICAL GARDEN)
  // Nhà kính vòm sinh học (18m x 14m), luống hoa rực rỡ, ghế đá & Chú Tư Làm Vườn
  // Tọa độ đặt tại cánh Đông Nam: X = 64.0, Z = 70.0 (Ngang hàng với Hồ Câu Cá tại X = 36.0, Z = 70.0)
  // Cả hai cùng nằm trên hàng ngang Z = 70.0, mặt tiền hướng Bắc nhìn ra đại lộ hoa chung
  // ------------------------------------------------------------
  buildBotanicalGardenZone() {
    const gardenGroup = new THREE.Group();
    gardenGroup.position.set(55.0, 0, 36.0);

    const ghWidth = 14;  // Bề ngang Đông - Tây
    const ghDepth = 16;  // Chiều sâu Bắc - Nam

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 });
    const ghFloor = new THREE.Mesh(new THREE.PlaneGeometry(ghWidth, ghDepth), stoneMat);
    ghFloor.rotation.x = -Math.PI / 2;
    ghFloor.position.set(0, 0.025, 0);
    ghFloor.receiveShadow = true;
    gardenGroup.add(ghFloor);

    const frameMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.3 });
    const glassDomeMat = new THREE.MeshStandardMaterial({
      color: 0x6ee7b7,
      transparent: true,
      opacity: 0.32,
      roughness: 0.1,
      side: THREE.DoubleSide
    });

    // Mái vòm kính hình bán trụ chạy dọc theo trục Bắc - Nam (Z), mở cửa đón gió ở 2 đầu Bắc và Nam
    const domeRadius = ghWidth / 2; // 7m
    const domeLength = ghDepth - 1; // 15m
    const domeGeo = new THREE.CylinderGeometry(domeRadius, domeRadius, domeLength, 24, 1, true, 0, Math.PI);
    const dome = new THREE.Mesh(domeGeo, glassDomeMat);
    dome.rotation.x = Math.PI / 2;
    dome.position.set(0, 0, 0);
    gardenGroup.add(dome);

    // Các khung sườn vòm Torus trắng tinh khôi chạy dọc theo chiều dài Z
    for (let ribZ = -domeLength / 2; ribZ <= domeLength / 2; ribZ += 3.75) {
      const arch = new THREE.Mesh(new THREE.TorusGeometry(domeRadius, 0.15, 12, 32, Math.PI), frameMat);
      arch.position.set(0, 0, ribZ);
      gardenGroup.add(arch);
    }

    // Biển hiệu "🌺 VƯỜN HOA SINH THÁI 5C4" trên vòm cổng hướng Bắc đón chào học sinh
    const gSignCanvas = document.createElement('canvas');
    gSignCanvas.width = 512; gSignCanvas.height = 128;
    const gsctx = gSignCanvas.getContext('2d');
    gsctx.fillStyle = '#065f46'; gsctx.fillRect(0, 0, 512, 128);
    gsctx.strokeStyle = '#34d399'; gsctx.lineWidth = 6; gsctx.strokeRect(4, 4, 504, 120);
    gsctx.fillStyle = '#fef08a'; gsctx.font = 'bold 36px "Nunito", sans-serif'; gsctx.textAlign = 'center';
    gsctx.fillText("🌺 VƯỜN HOA SINH THÁI 5C4", 256, 75);

    const gSign = new THREE.Mesh(
      new THREE.PlaneGeometry(6.5, 1.6),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(gSignCanvas) })
    );
    gSign.position.set(0, 3.8, -ghDepth / 2);
    gSign.rotation.y = 0; // Quay mặt về hướng Bắc nhìn ra đại lộ hoa
    gardenGroup.add(gSign);

    // Luống hoa rực rỡ bên trong nhà kính đối xứng 2 bên lối đi dạo trung tâm
    const flowerColors = [0xfacc15, 0xef4444, 0xec4899, 0xa855f7, 0x38bdf8];
    for (let b = 0; b < 4; b++) {
      const bbx = (b % 2 === 0 ? -3.8 : 3.8);
      const bbz = (b < 2 ? -3.8 : 3.8);
      const planter = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.45, 5.2), new THREE.MeshStandardMaterial({ color: 0x78350f }));
      planter.position.set(bbx, 0.22, bbz);
      gardenGroup.add(planter);

      const soil = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 4.8), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
      soil.position.set(bbx, 0.46, bbz);
      gardenGroup.add(soil);

      for (let fx = -1.2; fx <= 1.2; fx += 0.8) {
        for (let fz = -1.8; fz <= 1.8; fz += 0.9) {
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8), new THREE.MeshStandardMaterial({ color: 0x16a34a }));
          stem.position.set(bbx + fx, 0.68, bbz + fz);
          gardenGroup.add(stem);

          const blossom = new THREE.Mesh(
            new THREE.SphereGeometry(0.18, 12, 12),
            new THREE.MeshStandardMaterial({ color: flowerColors[(b * 5 + Math.round((fx + fz) * 10)) % flowerColors.length] })
          );
          blossom.position.set(bbx + fx, 0.95, bbz + fz);
          gardenGroup.add(blossom);
        }
      }
    }

    // Ghế đá nghỉ chân cuối nhà kính
    const bench = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.15, 1.0), new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 }));
    bench.position.set(0, 0.5, 6.5);
    gardenGroup.add(bench);
    [-1.4, 1.4].forEach(bx => {
      const bLeg = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.45, 0.8), new THREE.MeshStandardMaterial({ color: 0x94a3b8 }));
      bLeg.position.set(bx, 0.22, 6.5);
      gardenGroup.add(bLeg);
    });

    // NPC Chú Tư (Nghệ Nhân Vườn Hoa Sinh Thái) đứng cạnh cổng vòm phía Bắc đón chào
    const gardenerGroup = new THREE.Group();
    gardenerGroup.position.set(-4.5, 0, -8.2);
    gardenerGroup.rotation.y = Math.PI / 4; // Quay mặt về hướng Bắc - Tây Bắc đón khách từ đại lộ

    const gBody = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.95, 0.4), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
    gBody.position.y = 1.05;
    gardenerGroup.add(gBody);

    const gHead = new THREE.Mesh(new THREE.SphereGeometry(0.35, 18, 18), new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.4 }));
    gHead.position.y = 1.8;
    gardenerGroup.add(gHead);

    this.attachCurvedFace(gHead, 'gardener_tu');

    const nonLa = new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.32, 24), new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.7 }));
    nonLa.position.y = 2.08;
    gardenerGroup.add(nonLa);

    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.45, 12), new THREE.MeshStandardMaterial({ color: 0x15803d }));
    can.position.set(0.55, 0.8, 0.2);
    gardenerGroup.add(can);

    gardenGroup.add(gardenerGroup);

    this.npcs.push({
      id: 'gardener_tu',
      name: 'Chú Tư',
      title: 'Nghệ Nhân Vườn Hoa Sinh Thái',
      group: gardenerGroup,
      worldPos: new THREE.Vector3(55.0 - 4.5, 0, 36.0 - 8.2),
      radius: 3.5,
      icon: '🌺',
      prompt: 'Bấm [E] hoặc [F] để Khám Phá Vườn Hoa 🌺',
      quotes: [
        "Chào cháu Hà My! Cháu vừa ghé hồ câu cá của Bác Ngư Phủ bên cạnh sang à? Vườn hoa hôm nay nở đẹp lắm, hoa cúc là 'daisy', hoa hồng là 'rose' đấy nhé! 🌸",
        "Hít thở không khí trong lành của cây xanh giúp đầu óc minh mẫn và học tiếng Anh siêu nhanh! 🌿",
        "Cháu hãy dạo một vòng ngắm các loài hoa và học thêm nhiều từ vựng thiên nhiên nhé! 🌻"
      ]
    });

    this.solidPlatforms.push({
      worldX: 55.0,
      worldY: 0,
      worldZ: 36.0,
      topY: 0.03,
      halfW: 7.2,
      halfD: 8.2
    });

    this.scene.add(gardenGroup);
  }

  // ------------------------------------------------------------
  // KHU VỰC 10: HỆ THỐNG ĐƯỜNG ĐI LÁT ĐÁ & 16 CỘT ĐÈN CHIẾU SÁNG
  // Nối các phân khu: Sân Thể Thao, Thư Viện, Vườn Hoa, Sân Khấu
  // ------------------------------------------------------------
  buildCampusPathwaysAndStreetlights() {
    const pathGroup = new THREE.Group();
    const pathTex = this.createWalkwayTerrazzoTexture();
    const pathNorm = this.createWalkwayTerrazzoNormalTexture();
    const pMat = new THREE.MeshStandardMaterial({
      map: pathTex,
      normalMap: pathNorm,
      normalScale: new THREE.Vector2(0.6, 0.6),
      roughness: 0.58,
      metalness: 0.05
    });

    const curbMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.7 });

    const createPavedPath = (w, d, x, z) => {
      const pathMesh = new THREE.Mesh(new THREE.PlaneGeometry(w, d), pMat);
      pathMesh.rotation.x = -Math.PI / 2;
      pathMesh.position.set(x, 0.026, z);
      pathMesh.receiveShadow = true;
      pathGroup.add(pathMesh);

      // 2 Gờ đá hoa cương bảo vệ hai bên lối đi (Curb Stones)
      if (w > d) {
        [-d / 2, d / 2].forEach(cz => {
          const curb = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, 0.22), curbMat);
          curb.position.set(x, 0.04, z + cz);
          pathGroup.add(curb);
        });
      } else {
        [-w / 2, w / 2].forEach(cx => {
          const curb = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.08, d), curbMat);
          curb.position.set(x + cx, 0.04, z);
          pathGroup.add(curb);
        });
      }
    };

    createPavedPath(30, 4.5, -41, 38);   // Đường sang sân bóng đá
    createPavedPath(30, 4.5, 41, 24);    // Đường sang thư viện
    createPavedPath(58, 4.5, 50, 60.5);  // Đại lộ Promenade hoa kết nối Hồ Câu Cá & Vườn Hoa (X: 21 đến 79)
    createPavedPath(4.5, 14, 21, 53.5);  // Nhánh nối từ sân trường sang đại lộ hoa
    createPavedPath(6.5, 20, 0, 64);     // Đường sang đại sân khấu

    const streetlightCoords = [
      { x: -5.0, z: 24.0 }, { x: 5.0, z: 24.0 },
      { x: -5.0, z: 42.0 }, { x: 5.0, z: 42.0 },
      { x: -32.0, z: 35.0 }, { x: -48.0, z: 35.0 },
      { x: -32.0, z: 41.0 }, { x: -48.0, z: 41.0 },
      { x: 32.0, z: 21.0 }, { x: 48.0, z: 21.0 },
      { x: 34.0, z: 58.0 }, { x: 48.0, z: 58.0 }, { x: 64.0, z: 58.0 },
      { x: -4.5, z: 60.0 }, { x: 4.5, z: 60.0 },
      { x: -4.5, z: 70.0 }, { x: 4.5, z: 70.0 }
    ];

    const poleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.25 });
    const lampMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    streetlightCoords.forEach(pos => {
      // Cột đèn gang nghệ thuật
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 4.5, 12), poleMat);
      pole.position.set(pos.x, 2.25, pos.z);
      pole.castShadow = true;
      pathGroup.add(pole);

      // Cần đèn uốn lượn phong cách cổ điển
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.08), poleMat);
      arm.position.set(pos.x, 4.45, pos.z);
      pathGroup.add(arm);

      // Lồng đèn lăng trụ phát sáng vàng ấm
      const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 14), lampMat);
      lantern.position.set(pos.x, 4.3, pos.z);
      pathGroup.add(lantern);

      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.20, 12), poleMat);
      cap.position.set(pos.x, 4.58, pos.z);
      pathGroup.add(cap);

      // Nguồn sáng ấm áp chiếu rọi mặt đất (Cozy Lantern Light)
      const sLight = new THREE.PointLight(0xfef08a, 0.45, 6.5);
      sLight.position.set(pos.x, 3.8, pos.z);
      pathGroup.add(sLight);
    });

    this.scene.add(pathGroup);
  }

  // ------------------------------------------------------------
  // HỆ THỐNG CHIẾU SÁNG MÔI TRƯỜNG IBL (IMAGE-BASED LIGHTING)
  // Tạo phản chiếu vòm trời, ánh nắng và đất mẹ lên toàn bộ vật liệu PBR (Kính, Kim loại, Xe máy, Nước)
  // Xóa bỏ hoàn toàn cảm giác nhựa giả / xỉn màu, đưa đồ họa lên chuẩn Game 3D chân thực
  // ------------------------------------------------------------
  setupEnvironmentLighting() {
    try {
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      pmremGenerator.compileEquirectangularShader();

      const envCanvas = document.createElement('canvas');
      envCanvas.width = 512;
      envCanvas.height = 256;
      const ctx = envCanvas.getContext('2d');

      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0.0, '#0284c7');
      grad.addColorStop(0.46, '#0ea5e9');
      grad.addColorStop(0.50, '#38bdf8');
      grad.addColorStop(0.54, '#15803d');
      grad.addColorStop(1.0, '#166534');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      const sunGrad = ctx.createRadialGradient(256, 80, 5, 256, 80, 95);
      sunGrad.addColorStop(0, '#ffffff');
      sunGrad.addColorStop(0.28, '#fef9c3');
      sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(256, 80, 95, 0, Math.PI * 2);
      ctx.fill();

      const envTex = new THREE.CanvasTexture(envCanvas);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      const envMap = pmremGenerator.fromEquirectangular(envTex).texture;
      this.scene.environment = envMap;
      pmremGenerator.dispose();
      envTex.dispose();
    } catch (e) {
      console.warn('IBL environment map init skipped:', e);
    }
  }

  // ------------------------------------------------------------
  // VÒM TRỜI NGHỆ THUẬT 360 ĐỘ & MẶT TRỜI TỎA HÀO QUANG (SKY DOME & SUN)
  // ------------------------------------------------------------
  buildAtmosphericSkyDome() {
    // 1. Canvas gradient cho vòm trời nghệ thuật Ghibli / Genshin 360 độ
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0.0, '#0284c7');   // Xanh dương sâu thẳm đỉnh đầu (Deep Azure Sky)
    grad.addColorStop(0.30, '#0ea5e9');  // Xanh da trời trong veo (Bright Crisp Sky Blue)
    grad.addColorStop(0.60, '#38bdf8');  // Xanh lam thanh khiết (Cerulean Blue)
    grad.addColorStop(0.85, '#60a5fa');  // Xanh ngọc nắng vàng dịu
    grad.addColorStop(1.0, '#3b82f6');   // Chân trời xanh thẳm sắc nét (Clear Azure Horizon - Không bạc màu)
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 1024);

    const skyTex = new THREE.CanvasTexture(canvas);
    const skyGeo = new THREE.SphereGeometry(2200, 32, 24);
    const skyMat = new THREE.MeshBasicMaterial({
      map: skyTex,
      side: THREE.BackSide,
      depthWrite: false
    });
    const skyDome = new THREE.Mesh(skyGeo, skyMat);
    this.skyDome = skyDome;
    this.scene.add(skyDome);

    // 2. MẶT TRỜI 3D TỎA HÀO QUANG (3D LUMINOUS SUN & CORONA HALO)
    const sunGroup = new THREE.Group();
    sunGroup.position.set(55, 75, 55);

    // Quả cầu mặt trời phát sáng
    const sunCore = new THREE.Mesh(
      new THREE.SphereGeometry(6.5, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xfffbeb })
    );
    sunGroup.add(sunCore);

    // Vành hào quang tỏa sáng (Corona Halo)
    const coronaGeo = new THREE.PlaneGeometry(38, 38);
    const coronaCanvas = document.createElement('canvas');
    coronaCanvas.width = 256;
    coronaCanvas.height = 256;
    const cCtx = coronaCanvas.getContext('2d');
    const cGrad = cCtx.createRadialGradient(128, 128, 8, 128, 128, 128);
    cGrad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
    cGrad.addColorStop(0.25, 'rgba(254, 240, 138, 0.85)');
    cGrad.addColorStop(0.55, 'rgba(251, 146, 60, 0.35)');
    cGrad.addColorStop(1.0, 'rgba(251, 146, 60, 0.0)');
    cCtx.fillStyle = cGrad;
    cCtx.fillRect(0, 0, 256, 256);

    const coronaTex = new THREE.CanvasTexture(coronaCanvas);
    const coronaMat = new THREE.MeshBasicMaterial({
      map: coronaTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coronaMesh.lookAt(-55, -75, -55);
    sunGroup.add(coronaMesh);

    this.scene.add(sunGroup);
    this.sunGroup = sunGroup;

    // 3. DÃY NÚI TRẬP TRÙNG CHÂN TRỜI (Gỡ bỏ hình chóp nón tránh lóa trắng thành phố)
    this.buildDistantHillsHorizon();

    // 4. LUỒNG ÁNH SÁNG BAN MAI (GOD RAYS) & BỤI PHẤN NẮNG VÀNG LƠ LỬNG
    this.buildAtmosphericGodRaysAndSunPollen();
  }

  // ------------------------------------------------------------
  // LUỒNG ÁNH SÁNG BAN MAI (GOD RAYS) & BỤI PHẤN NẮNG VÀNG LƠ LỬNG
  // Tạo chiều sâu quang học điện ảnh (Atmospheric Crepuscular Beams & Sun Pollen)
  // ------------------------------------------------------------
  buildAtmosphericGodRaysAndSunPollen() {
    const godRayGroup = new THREE.Group();

    // 5 luồng ánh sáng rẻ quạt chiếu xiên từ mặt trời (55, 75, 55) xuống khuôn viên
    const sunPos = new THREE.Vector3(55, 75, 55);
    const targetCenters = [
      new THREE.Vector3(0, 0, 30.5),   // Chiếu vào Đài Phun Nước
      new THREE.Vector3(12, 0, 36.0),  // Chiếu vào Cây Phượng Vĩ
      new THREE.Vector3(-14, 0, 28.0), // Chiếu vào Cây Bằng Lăng
      new THREE.Vector3(-4, 0, 42.0),  // Chiếu vào Lối đi chính
      new THREE.Vector3(8, 0, 22.0)    // Chiếu vào Cửa lớp học
    ];

    // Luồng ánh sáng dịu mát, không dùng additive cones làm lóa mờ màn hình
    this.godRays = [];

    // Bụi phấn nắng vàng lơ lửng lung linh (Sun Pollen Dust Motes)
    const pollenGroup = new THREE.Group();
    const pollenGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const pollenMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    for (let p = 0; p < 42; p++) {
      const pm = new THREE.Mesh(pollenGeo, pollenMat);
      const px = (Math.random() - 0.5) * 36;
      const py = 0.5 + Math.random() * 4.5;
      const pz = 18 + Math.random() * 32;
      pm.position.set(px, py, pz);
      pollenGroup.add(pm);
      this.sunPollen.push({
        mesh: pm,
        vx: (Math.random() - 0.5) * 0.006,
        vy: 0.003 + Math.random() * 0.005,
        vz: (Math.random() - 0.5) * 0.006,
        minY: 0.5,
        maxY: 5.2,
        phase: Math.random() * Math.PI * 2
      });
    }

    this.scene.add(pollenGroup);
  }

  buildDistantHillsHorizon() {
    // Không tạo các khối chóp nón ở bán kính 185m để tránh làm lóa trắng và che khuất tầm nhìn đường phố Vĩnh Yên
  }

  // ------------------------------------------------------------
  // KHU VỰC 11: BẦU TRỜI & MÂY TRẮNG BAY LƠ LỬNG TRÊN KHÔNG
  // ------------------------------------------------------------
  buildSkyAtmosphereAndClouds() {
    this.floatingClouds = [];
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      transparent: true,
      opacity: 0.88
    });

    const cloudSpawns = [
      { x: -80, y: 35, z: -10, scale: 1.4 },
      { x: -30, y: 40, z: 15, scale: 1.2 },
      { x: 25, y: 36, z: -5, scale: 1.6 },
      { x: 75, y: 42, z: 20, scale: 1.3 },
      { x: -70, y: 38, z: 50, scale: 1.5 },
      { x: 0, y: 45, z: 45, scale: 1.8 },
      { x: 60, y: 37, z: 65, scale: 1.2 },
      { x: -40, y: 41, z: 80, scale: 1.4 },
      { x: 40, y: 39, z: 90, scale: 1.5 },
      { x: -10, y: 44, z: 110, scale: 1.7 }
    ];

    cloudSpawns.forEach(csp => {
      const cloudGroup = new THREE.Group();
      cloudGroup.position.set(csp.x, csp.y, csp.z);

      const puffs = [
        { x: 0, y: 0, z: 0, r: 3.2 },
        { x: 2.5, y: -0.4, z: 0.8, r: 2.6 },
        { x: -2.4, y: -0.3, z: -0.5, r: 2.5 },
        { x: 1.2, y: 0.8, z: -0.6, r: 2.2 },
        { x: -1.2, y: 0.6, z: 0.7, r: 2.1 }
      ];

      puffs.forEach(p => {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(p.r * csp.scale, 10, 10), cloudMat);
        puff.position.set(p.x * csp.scale, p.y * csp.scale, p.z * csp.scale);
        cloudGroup.add(puff);
      });

      this.scene.add(cloudGroup);
      this.floatingClouds.push({
        group: cloudGroup,
        speed: 0.02 + Math.random() * 0.015
      });
    });

    // Hạt bụi tiên / phấn hoa ma thuật lấp lánh bay lượn trong khuôn viên trường
    this.campusSparkles = [];
    const sparkleColors = [0xfef08a, 0xa7f3d0, 0xfbcfe8, 0xbae6fd, 0xfde047];
    for (let s = 0; s < 75; s++) {
      const sMat = new THREE.MeshBasicMaterial({
        color: sparkleColors[s % sparkleColors.length],
        transparent: true,
        opacity: 0.45 + Math.random() * 0.45
      });
      const spk = new THREE.Mesh(new THREE.OctahedronGeometry(0.12 + Math.random() * 0.12), sMat);
      spk.position.set(
        (Math.random() - 0.5) * 140,
        1.2 + Math.random() * 6.0,
        (Math.random() - 0.5) * 110 + 35
      );
      this.scene.add(spk);
      this.campusSparkles.push({
        mesh: spk,
        baseY: spk.position.y,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.012,
        rotSpeed: 0.02 + Math.random() * 0.03
      });
    }
  }

  // ------------------------------------------------------------
  // KHU VỰC 12: ĐẠI CẢNH QUAN & 5 ĐIỂM TƯƠNG TÁC SÂN TRƯỜNG 5C4 (BEAUTIFICATION & VIGNETTES)
  // ------------------------------------------------------------
  buildCampusBeautificationAndVignettes() {
    const vignetteGroup = new THREE.Group();

    // 1. CẦU VỒNG NGŨ SẮC 3D (GIANT SKY RAINBOW)
    // 5 vòng cung pastel trải dài trên nền trời sau khán đài trường học
    const rainbowGroup = new THREE.Group();
    rainbowGroup.position.set(0, -1.0, 68);
    const rainbowColors = [0xfb7185, 0xfba465, 0xfde047, 0x86efac, 0x93c5fd];
    const rainbowRadii = [48, 49.2, 50.4, 51.6, 52.8];

    rainbowRadii.forEach((rad, idx) => {
      const torusGeo = new THREE.TorusGeometry(rad, 0.48, 8, 40, Math.PI);
      const torusMat = new THREE.MeshStandardMaterial({
        color: rainbowColors[idx],
        roughness: 0.25,
        transparent: true,
        opacity: 0.82,
        side: THREE.DoubleSide
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      rainbowGroup.add(torusMesh);
    });
    vignetteGroup.add(rainbowGroup);

    // 2. KHINH KHÍ CẦU 5C4 (HOT AIR BALLOON)
    // Lơ lửng bồng bềnh ở góc trời Tây-Nam (-28, 30, 52)
    const balloonGroup = new THREE.Group();
    balloonGroup.position.set(-28, 30, 52);

    // Thân khinh khí cầu (khối vòm giọt nước phân tầng màu sắc Chibi)
    const domeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(3.5, 20, 16),
      new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.35 })
    );
    domeMesh.position.y = 2.0;
    balloonGroup.add(domeMesh);

    const midSegment = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 2.2, 2.6, 20),
      new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.35 })
    );
    midSegment.position.y = -0.4;
    balloonGroup.add(midSegment);

    const lowerSegment = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 1.1, 2.2, 20),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.35 })
    );
    lowerSegment.position.y = -2.6;
    balloonGroup.add(lowerSegment);

    // Vành đốt lửa (Burner)
    const burnerRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.7, 0.1, 8, 16),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xfbbf24, emissiveIntensity: 0.7 })
    );
    burnerRing.rotation.x = Math.PI / 2;
    burnerRing.position.y = -4.0;
    balloonGroup.add(burnerRing);

    const burnerLight = new THREE.PointLight(0xffa834, 1.2, 14);
    burnerLight.position.y = -3.8;
    balloonGroup.add(burnerLight);

    // 4 Dây treo giỏ
    const ropeMat = new THREE.MeshBasicMaterial({ color: 0x78350f });
    const ropeOffsets = [
      { x: -0.6, z: -0.6 },
      { x: 0.6, z: -0.6 },
      { x: -0.6, z: 0.6 },
      { x: 0.6, z: 0.6 }
    ];
    ropeOffsets.forEach(ro => {
      const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.0), ropeMat);
      rope.position.set(ro.x, -5.0, ro.z);
      balloonGroup.add(rope);
    });

    // Giỏ mây đan (Wicker Basket)
    const basket = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.1, 1.5),
      new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.85 })
    );
    basket.position.y = -6.2;
    balloonGroup.add(basket);

    // Băng rôn chào mừng lớp 5C4
    const bannerCanvas = document.createElement('canvas');
    bannerCanvas.width = 512;
    bannerCanvas.height = 128;
    const bCtx = bannerCanvas.getContext('2d');
    bCtx.fillStyle = '#db2777';
    bCtx.fillRect(0, 0, 512, 128);
    bCtx.fillStyle = '#ffffff';
    bCtx.font = 'bold 32px "Nunito", sans-serif';
    bCtx.textAlign = 'center';
    bCtx.fillText('🎈 LỚP 5C4 - EM YÊU TIẾNG ANH ⭐', 256, 55);
    bCtx.fillStyle = '#fef08a';
    bCtx.font = 'bold 22px "Nunito", sans-serif';
    bCtx.fillText('Trường Tiểu Học Ngô Quyền • Chăm Ngoan Học Giỏi', 256, 98);

    const bannerTex = new THREE.CanvasTexture(bannerCanvas);
    const bannerMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 1.1),
      new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide })
    );
    bannerMesh.position.set(0, -7.4, 0);
    balloonGroup.add(bannerMesh);

    vignetteGroup.add(balloonGroup);
    this.hotAirBalloon = balloonGroup;

    // 3. DÂY CỜ TAM GIÁC LỄ HỘI (FESTIVE BUNTING GARLANDS)
    const garlandColors = [0xef4444, 0xf59e0b, 0x10b981, 0x06b6d4, 0x8b5cf6, 0xec4899];
    const garlandPaths = [
      { start: new THREE.Vector3(-6.0, 4.2, 54.0), end: new THREE.Vector3(-4.5, 3.8, 36.0), sags: 0.8 },
      { start: new THREE.Vector3(6.0, 4.2, 54.0), end: new THREE.Vector3(4.5, 3.8, 36.0), sags: 0.8 },
      { start: new THREE.Vector3(-4.5, 4.0, 18.0), end: new THREE.Vector3(4.5, 4.0, 18.0), sags: 0.6 }
    ];

    garlandPaths.forEach((gp) => {
      const gGroup = new THREE.Group();
      const numFlags = 12;
      for (let f = 0; f <= numFlags; f++) {
        const t = f / numFlags;
        const curX = THREE.MathUtils.lerp(gp.start.x, gp.end.x, t);
        const curZ = THREE.MathUtils.lerp(gp.start.z, gp.end.z, t);
        const curY = THREE.MathUtils.lerp(gp.start.y, gp.end.y, t) - Math.sin(t * Math.PI) * gp.sags;

        const flagMat = new THREE.MeshStandardMaterial({
          color: garlandColors[f % garlandColors.length],
          roughness: 0.35,
          side: THREE.DoubleSide
        });
        const flagGeo = new THREE.ConeGeometry(0.18, 0.32, 3);
        const flagMesh = new THREE.Mesh(flagGeo, flagMat);
        flagMesh.rotation.x = Math.PI; // Ngược xuống thành cờ tam giác
        flagMesh.position.set(curX, curY - 0.16, curZ);
        gGroup.add(flagMesh);
      }
      vignetteGroup.add(gGroup);
      this.buntingGarlands.push(gGroup);
    });

    // 4. BẢNG VÀNG DANH DỰ 5C4 (HONOR ROLL SHOWCASE)
    // Tọa độ X = -3.8, Z = 20.8 (Ngay cạnh cửa ra sân lớp 5C4)
    const honorGroup = new THREE.Group();
    honorGroup.position.set(-3.8, 0, 20.8);

    // Thảm đỏ danh dự
    const redCarpet = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 1.8),
      new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.85 })
    );
    redCarpet.rotation.x = -Math.PI / 2;
    redCarpet.position.set(0, 0.02, 0);
    honorGroup.add(redCarpet);

    // Khung bảng danh dự bằng gỗ viền vàng
    const boardFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 1.8, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 })
    );
    boardFrame.position.set(0, 1.6, 0);
    honorGroup.add(boardFrame);

    // Cột đỡ 2 bên
    [-1.05, 1.05].forEach(postX => {
      const pMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 2.4),
        new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.6 })
      );
      pMesh.position.set(postX, 1.2, 0);
      honorGroup.add(pMesh);
    });

    // Canvas bảng vàng
    const honorCanvas = document.createElement('canvas');
    honorCanvas.width = 512;
    honorCanvas.height = 512;
    const hCtx = honorCanvas.getContext('2d');
    hCtx.fillStyle = '#450a0a';
    hCtx.fillRect(0, 0, 512, 512);

    // Viền vàng hoàng gia
    hCtx.strokeStyle = '#facc15';
    hCtx.lineWidth = 14;
    hCtx.strokeRect(10, 10, 492, 492);

    hCtx.fillStyle = '#fde047';
    hCtx.font = 'bold 34px "Nunito", sans-serif';
    hCtx.textAlign = 'center';
    hCtx.fillText('🏆 BẢNG VÀNG DANH DỰ 🏆', 256, 65);

    hCtx.fillStyle = '#ffffff';
    hCtx.font = 'bold 24px "Nunito", sans-serif';
    hCtx.fillText('LỚP 5C4 • TIỂU HỌC NGÔ QUYỀN', 256, 110);

    hCtx.fillStyle = '#fbcfe8';
    hCtx.font = 'bold 36px "Nunito", sans-serif';
    hCtx.fillText('⭐ BÉ HÀ MY ⭐', 256, 185);

    hCtx.fillStyle = '#a7f3d0';
    hCtx.font = 'bold 24px "Nunito", sans-serif';
    hCtx.fillText('TRẠNG NGUYÊN TIẾNG ANH 10/10', 256, 235);
    hCtx.fillText('CHĂM NGOAN • HỌC GIỎI • XUẤT SẮC', 256, 275);

    hCtx.fillStyle = '#fef08a';
    hCtx.font = 'bold 22px "Nunito", sans-serif';
    hCtx.fillText('Thầy Tuấn & Cô Lan: "Tự Hào Về Con!"', 256, 350);

    hCtx.fillStyle = '#38bdf8';
    hCtx.font = 'bold 24px "Nunito", sans-serif';
    hCtx.fillText('👉 Bấm [E] hoặc [F] để Chiêm Ngưỡng 🌟', 256, 440);

    const honorTex = new THREE.CanvasTexture(honorCanvas);
    const honorCanvasMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.1, 1.6),
      new THREE.MeshBasicMaterial({ map: honorTex })
    );
    honorCanvasMesh.position.set(0, 1.6, 0.08);
    honorGroup.add(honorCanvasMesh);

    // Bục đặt Cúp Vàng danh dự bên cạnh
    const trophyPedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.32, 0.8, 16),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.25 })
    );
    trophyPedestal.position.set(1.4, 0.4, 0.2);
    honorGroup.add(trophyPedestal);

    // Cúp Vàng lấp lánh
    const trophyCup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.12, 0.45, 16),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.85, roughness: 0.2 })
    );
    trophyCup.position.set(1.4, 0.95, 0.2);
    honorGroup.add(trophyCup);

    // Ngôi sao trên đỉnh cúp
    const starCup = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.14),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    starCup.position.set(1.4, 1.25, 0.2);
    honorGroup.add(starCup);

    // Đèn chiếu rọi vào Bảng Vàng
    const honorSpot = new THREE.PointLight(0xfef08a, 1.2, 5);
    honorSpot.position.set(0, 2.4, 1.0);
    honorGroup.add(honorSpot);

    vignetteGroup.add(honorGroup);

    // 5. VƯỜN THỎ CƯNG CHIBI (KAWAII BUNNY SANCTUARY)
    // Tọa độ X = 36.0, Z = 48.0
    const bunnyZoneGroup = new THREE.Group();
    bunnyZoneGroup.position.set(36.0, 0, 48.0);

    // Đĩa cỏ xanh mướt cho thỏ
    const bunnyGrass = new THREE.Mesh(
      new THREE.CylinderGeometry(4.6, 4.8, 0.12, 24),
      new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.8 })
    );
    bunnyGrass.position.y = 0.06;
    bunnyZoneGroup.add(bunnyGrass);

    // Hàng rào trắng bao quanh (Picket Fence)
    const fenceMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
    const fenceRadius = 4.2;
    for (let a = 0; a < 20; a++) {
      const angle = (a / 20) * Math.PI * 2;
      // Trừ góc mở cổng ở hướng Nam (angle ~ -Math.PI / 2)
      if (Math.abs(angle - (-Math.PI / 2)) < 0.35) continue;

      const fx = Math.cos(angle) * fenceRadius;
      const fz = Math.sin(angle) * fenceRadius;

      const fPost = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.85, 0.14), fenceMat);
      fPost.position.set(fx, 0.45, fz);
      bunnyZoneGroup.add(fPost);

      const fTop = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.18, 4), fenceMat);
      fTop.rotation.y = Math.PI / 4;
      fTop.position.set(fx, 0.95, fz);
      bunnyZoneGroup.add(fTop);
    }

    // 2 Chậu hoa ở cổng vào
    [-1.2, 1.2].forEach(gx => {
      const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.18, 0.38, 12),
        new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 })
      );
      pot.position.set(gx, 0.2, -fenceRadius);
      bunnyZoneGroup.add(pot);

      const potFlower = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.5 })
      );
      potFlower.position.set(gx, 0.42, -fenceRadius);
      bunnyZoneGroup.add(potFlower);
    });

    // Chuồng thỏ bằng gỗ mái ngói đỏ (Rabbit Hutch)
    const hutchGroup = new THREE.Group();
    hutchGroup.position.set(0, 0, 2.0);

    const hutchBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 1.2, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 })
    );
    hutchBody.position.y = 0.85;
    hutchGroup.add(hutchBody);

    const hutchRoof = new THREE.Mesh(
      new THREE.ConeGeometry(1.4, 0.8, 4),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.6 })
    );
    hutchRoof.rotation.y = Math.PI / 4;
    hutchRoof.position.y = 1.85;
    hutchGroup.add(hutchRoof);

    // Cửa chuồng có rơm vàng
    const hutchDoor = new THREE.Mesh(
      new THREE.PlaneGeometry(0.65, 0.75),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    hutchDoor.position.set(0, 0.65, -0.71);
    hutchGroup.add(hutchDoor);

    bunnyZoneGroup.add(hutchGroup);

    // 3 Củ cà rốt khổng lồ nhô lên từ cỏ
    const carrotOffsets = [
      { x: -1.6, z: -0.6, rot: 0.1 },
      { x: 1.4, z: -1.2, rot: -0.15 },
      { x: -0.2, z: -1.8, rot: 0.05 }
    ];
    carrotOffsets.forEach(co => {
      const cGroup = new THREE.Group();
      cGroup.position.set(co.x, 0, co.z);
      cGroup.rotation.z = co.rot;

      const carrotBody = new THREE.Mesh(
        new THREE.ConeGeometry(0.22, 0.85, 12),
        new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 })
      );
      carrotBody.rotation.x = Math.PI; // Ngọn cắm xuống
      carrotBody.position.y = 0.45;
      cGroup.add(carrotBody);

      // Lá cà rốt xanh
      const carrotLeaves = new THREE.Mesh(
        new THREE.ConeGeometry(0.2, 0.45, 6),
        new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.4 })
      );
      carrotLeaves.position.y = 0.95;
      cGroup.add(carrotLeaves);

      bunnyZoneGroup.add(cGroup);
    });

    // 3 Chú Thỏ Animated Chibi
    const createChibiBunny = (colorHex, earInnerHex) => {
      const bGroup = new THREE.Group();

      // Thân tròn múp míp
      const body = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 12, 10),
        new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 })
      );
      body.scale.set(1.0, 0.9, 1.15);
      body.position.y = 0.3;
      bGroup.add(body);

      // Đầu tròn xinh
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 12, 10),
        new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 })
      );
      head.position.set(0, 0.52, 0.22);
      bGroup.add(head);

      // 2 Tai thỏ dài dựng đứng
      [-0.1, 0.1].forEach(earX => {
        const ear = new THREE.Mesh(
          new THREE.CylinderGeometry(0.045, 0.065, 0.42, 8),
          new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 })
        );
        ear.position.set(earX, 0.82, 0.18);
        ear.rotation.x = -0.15;
        bGroup.add(ear);

        // Lòng tai hồng
        const innerEar = new THREE.Mesh(
          new THREE.PlaneGeometry(0.05, 0.3),
          new THREE.MeshBasicMaterial({ color: earInnerHex, side: THREE.DoubleSide })
        );
        innerEar.position.set(earX, 0.82, 0.22);
        bGroup.add(innerEar);
      });

      // Mắt đen long lanh
      [-0.09, 0.09].forEach(eyeX => {
        const eye = new THREE.Mesh(
          new THREE.SphereGeometry(0.04),
          new THREE.MeshBasicMaterial({ color: 0x0f172a })
        );
        eye.position.set(eyeX, 0.56, 0.43);
        bGroup.add(eye);
      });

      // Mũi hồng
      const nose = new THREE.Mesh(
        new THREE.SphereGeometry(0.03),
        new THREE.MeshBasicMaterial({ color: 0xf472b6 })
      );
      nose.position.set(0, 0.50, 0.45);
      bGroup.add(nose);

      // Đuôi bông tròn xoe
      const tail = new THREE.Mesh(
        new THREE.SphereGeometry(0.09),
        new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.6 })
      );
      tail.position.set(0, 0.28, -0.36);
      bGroup.add(tail);

      return { group: bGroup, head: head };
    };

    // Thỏ 1: Snowball (Thỏ Tuyết) - Nhảy vòng tròn
    const b1 = createChibiBunny(0xf8fafc, 0xfbcfe8);
    b1.group.position.set(-1.0, 0, -0.4);
    bunnyZoneGroup.add(b1.group);
    this.animatedBunnies.push({
      bunny: b1,
      type: 'hop',
      basePos: new THREE.Vector3(-1.0, 0, -0.4),
      speed: 0.035,
      angle: 0
    });

    // Thỏ 2: Caramel (Thỏ Nâu) - Gặm cà rốt
    const b2 = createChibiBunny(0xf59e0b, 0xfde047);
    b2.group.position.set(1.1, 0, -0.8);
    b2.group.rotation.y = -Math.PI / 3;
    bunnyZoneGroup.add(b2.group);
    this.animatedBunnies.push({
      bunny: b2,
      type: 'nibble',
      basePos: new THREE.Vector3(1.1, 0, -0.8),
      speed: 0.05
    });

    // Thỏ 3: Marshmallow (Thỏ Kem) - Lắc tai tò mò
    const b3 = createChibiBunny(0xfef3c7, 0xfb7185);
    b3.group.position.set(0.2, 0, 0.8);
    b3.group.rotation.y = Math.PI;
    bunnyZoneGroup.add(b3.group);
    this.animatedBunnies.push({
      bunny: b3,
      type: 'curious',
      basePos: new THREE.Vector3(0.2, 0, 0.8),
      speed: 0.03
    });

    vignetteGroup.add(bunnyZoneGroup);

    // 6. MÁY BÁN NƯỚC TỰ ĐỘNG CUTE (KAWAII VENDING MACHINE)
    // Tọa độ X = -18.2, Z = 16.5 (Trước Căn Tin Lớp 5C4)
    const vmGroup = new THREE.Group();
    vmGroup.position.set(-18.2, 0, 16.5);
    vmGroup.rotation.y = Math.PI / 4; // Hướng hơi nghiêng đón học sinh

    // Thân máy bo góc màu hồng Pastel dễ thương
    const vmBody = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 2.2, 0.95),
      new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.35 })
    );
    vmBody.position.y = 1.1;
    vmGroup.add(vmBody);

    // Mái che / Tấm biển Marquee trên đỉnh
    const vmCanvas = document.createElement('canvas');
    vmCanvas.width = 256;
    vmCanvas.height = 128;
    const vmCtx = vmCanvas.getContext('2d');
    vmCtx.fillStyle = '#db2777';
    vmCtx.fillRect(0, 0, 256, 128);
    vmCtx.fillStyle = '#ffffff';
    vmCtx.font = 'bold 24px "Nunito", sans-serif';
    vmCtx.textAlign = 'center';
    vmCtx.fillText('🧋 FRESH DRINKS', 128, 48);
    vmCtx.fillStyle = '#fef08a';
    vmCtx.font = 'bold 18px "Nunito", sans-serif';
    vmCtx.fillText('TRÀ SỮA 5C4 ⭐ SPEED BUFF', 128, 88);

    const vmSignTex = new THREE.CanvasTexture(vmCanvas);
    const vmSign = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 0.45),
      new THREE.MeshBasicMaterial({ map: vmSignTex })
    );
    vmSign.position.set(0, 1.85, 0.49);
    vmGroup.add(vmSign);

    // Ô kính trưng bày trong suốt có đèn sáng bên trong
    const vmGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(1.15, 0.95),
      new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.6, roughness: 0.1 })
    );
    vmGlass.position.set(0, 1.1, 0.49);
    vmGroup.add(vmGlass);

    const vmLight = new THREE.PointLight(0xffedd5, 1.0, 4);
    vmLight.position.set(0, 1.2, 0.3);
    vmGroup.add(vmLight);

    // Kệ đồ uống bên trong với các lon/ly 3D mini
    const drinkColors = [0x22c55e, 0xf43f5e, 0xd97706, 0x38bdf8];
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const can = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 0.22, 10),
          new THREE.MeshStandardMaterial({ color: drinkColors[(row * 3 + col) % drinkColors.length], roughness: 0.3 })
        );
        can.position.set(-0.35 + col * 0.35, 0.85 + row * 0.4, 0.32);
        vmGroup.add(can);
      }
    }

    // Khe nhét xu & hộc nhận đồ uống phía dưới
    const vmSlot = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.28, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 })
    );
    vmSlot.position.set(0, 0.32, 0.48);
    vmGroup.add(vmSlot);

    vignetteGroup.add(vmGroup);

    // 7. KHU CHECK-IN SỐNG ẢO 5C4 (SELFIE PHOTO BOOTH)
    // Tọa độ X = -8.5, Z = 30.5
    const photoGroup = new THREE.Group();
    photoGroup.position.set(-8.5, 0, 30.5);
    photoGroup.rotation.y = 0.08; // Nghiêng nhẹ tạo dáng nghệ thuật

    // Khung ảnh Polaroid khổng lồ màu trắng
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    // Cột trái & phải
    [-0.95, 0.95].forEach(fx => {
      const fSide = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.5, 0.12), frameMat);
      fSide.position.set(fx, 1.35, 0);
      photoGroup.add(fSide);
    });
    // Viền trên
    const fTop = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.35, 0.12), frameMat);
    fTop.position.set(0, 2.45, 0);
    photoGroup.add(fTop);

    // Phần đế trắng rộng viết chữ lưu bút
    const fBottom = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.8, 0.12), frameMat);
    fBottom.position.set(0, 0.5, 0);
    photoGroup.add(fBottom);

    // Chữ lưu bút kỷ niệm trên đế Polaroid
    const polaroidCanvas = document.createElement('canvas');
    polaroidCanvas.width = 512;
    polaroidCanvas.height = 192;
    const pCtx = polaroidCanvas.getContext('2d');
    pCtx.fillStyle = '#ffffff';
    pCtx.fillRect(0, 0, 512, 192);
    pCtx.fillStyle = '#db2777';
    pCtx.font = 'bold 30px "Nunito", sans-serif';
    pCtx.textAlign = 'center';
    pCtx.fillText('📸 KỶ NIỆM LỚP 5C4 - 2026 💖', 256, 68);
    pCtx.fillStyle = '#475569';
    pCtx.font = 'bold 22px "Nunito", sans-serif';
    pCtx.fillText('Bé Hà My • Trường Tiểu Học Ngô Quyền', 256, 120);
    pCtx.fillStyle = '#e11d48';
    pCtx.font = 'bold 18px "Nunito", sans-serif';
    pCtx.fillText('Bấm [E] hoặc [F] để Chụp Ảnh Check-in! 🌟', 256, 160);

    const polaroidTex = new THREE.CanvasTexture(polaroidCanvas);
    const polaroidSign = new THREE.Mesh(
      new THREE.PlaneGeometry(1.9, 0.7),
      new THREE.MeshBasicMaterial({ map: polaroidTex })
    );
    polaroidSign.position.set(0, 0.5, 0.08);
    photoGroup.add(polaroidSign);

    // Chùm bóng bay heli rực rỡ gắn góc trên khung ảnh
    const balloonColors = [0xf43f5e, 0xfacc15, 0x38bdf8, 0xa855f7, 0x4ade80];
    balloonColors.forEach((bc, bIdx) => {
      const bBall = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 12, 10),
        new THREE.MeshStandardMaterial({ color: bc, roughness: 0.25 })
      );
      bBall.scale.set(1.0, 1.25, 1.0);
      const bAngle = (bIdx / balloonColors.length) * Math.PI;
      bBall.position.set(1.05 + Math.cos(bAngle) * 0.45, 2.75 + Math.sin(bAngle) * 0.45, 0.15 + (bIdx % 2) * 0.1);
      photoGroup.add(bBall);

      // Dây bóng
      const bString = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, 0.75),
        new THREE.MeshBasicMaterial({ color: 0xe2e8f0 })
      );
      bString.position.set(bBall.position.x * 0.95, bBall.position.y - 0.45, bBall.position.z);
      photoGroup.add(bString);
    });

    // Bồn hoa hướng dương rực rỡ dưới chân khung ảnh
    const flowerBed = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 0.25, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 })
    );
    flowerBed.position.set(0, 0.12, 0.2);
    photoGroup.add(flowerBed);

    for (let fl = 0; fl < 5; fl++) {
      const sunFlower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.14, 0.04, 12),
        new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 })
      );
      sunFlower.rotation.x = Math.PI / 4;
      sunFlower.position.set(-0.8 + fl * 0.4, 0.32, 0.28);
      photoGroup.add(sunFlower);

      const flowerEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.06),
        new THREE.MeshBasicMaterial({ color: 0x451a03 })
      );
      flowerEye.position.set(-0.8 + fl * 0.4, 0.34, 0.31);
      photoGroup.add(flowerEye);
    }

    vignetteGroup.add(photoGroup);

    // 8. GÓC ĐỌC SÁCH CÂY PHƯỢNG (OUTDOOR READING NOOK)
    // Tọa độ X = 14.0, Z = 36.0 (Dưới tán cây phượng vĩ sân trường)
    const readingGroup = new THREE.Group();
    readingGroup.position.set(14.0, 0, 36.0);

    // Bục gỗ tròn bao quanh thân cây (Tree Deck Bench)
    const benchMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 1.9, 0.45, 16),
      new THREE.MeshStandardMaterial({ color: 0x9a3412, roughness: 0.7 })
    );
    benchMesh.position.y = 0.22;
    readingGroup.add(benchMesh);

    // 3 Gối lười đệm ngồi êm ái (Beanbag cushions)
    const cushionColors = [0x6ee7b7, 0x93c5fd, 0xfca5a5];
    cushionColors.forEach((cc, cIdx) => {
      const cushion = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 12, 8),
        new THREE.MeshStandardMaterial({ color: cc, roughness: 0.85 })
      );
      cushion.scale.set(1.1, 0.5, 1.1);
      const cAngle = (cIdx / 3) * Math.PI * 2;
      cushion.position.set(Math.cos(cAngle) * 1.35, 0.52, Math.sin(cAngle) * 1.35);
      readingGroup.add(cushion);
    });

    // Chồng truyện tranh Tiếng Anh mở trang rực rỡ
    const bookCover = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.06, 0.32),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 })
    );
    bookCover.position.set(0.6, 0.48, 0.9);
    bookCover.rotation.y = 0.35;
    readingGroup.add(bookCover);

    const openPages = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.04, 0.28),
      new THREE.MeshBasicMaterial({ color: 0xfef9c3 })
    );
    openPages.position.set(0.6, 0.52, 0.9);
    openPages.rotation.y = 0.35;
    readingGroup.add(openPages);

    // Đèn lồng trang trí ấm áp treo dưới tán cây
    const lantern = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 10, 8),
      new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfacc15, emissiveIntensity: 0.8 })
    );
    lantern.position.set(0, 2.6, 0.8);
    readingGroup.add(lantern);

    const lanternLight = new THREE.PointLight(0xfef08a, 0.95, 7);
    lanternLight.position.set(0, 2.5, 0.8);
    readingGroup.add(lanternLight);

    vignetteGroup.add(readingGroup);

    // 9. CÁ KOI VÀNG NHẢY KHỎI HỒ NƯỚC (JUMPING GOLDEN KOI)
    // Tọa độ X = 36.0, Z = 70.0 (Hồ Câu Cá Ngang Hàng Vườn Hoa Sinh Thái)
    const koiGroup = new THREE.Group();
    koiGroup.position.set(36.0, -0.4, 70.0); // Bắt đầu dưới mặt nước

    const koiBody = new THREE.Mesh(
      new THREE.ConeGeometry(0.24, 0.85, 10),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6, roughness: 0.25 })
    );
    koiBody.rotation.x = Math.PI / 2;
    koiGroup.add(koiBody);

    const koiTail = new THREE.Mesh(
      new THREE.PlaneGeometry(0.28, 0.32),
      new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide })
    );
    koiTail.position.set(0, 0, -0.5);
    koiGroup.add(koiTail);

    // Vòng sóng nước lăn tăn khi cá nhảy
    const koiRipple = new THREE.Mesh(
      new THREE.RingGeometry(0.2, 0.55, 16),
      new THREE.MeshBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.65, side: THREE.DoubleSide })
    );
    koiRipple.rotation.x = -Math.PI / 2;
    koiRipple.position.set(36.0, 0.05, 70.0);
    koiRipple.visible = false;
    vignetteGroup.add(koiRipple);

    vignetteGroup.add(koiGroup);
    this.jumpingKoi = {
      mesh: koiGroup,
      ripple: koiRipple,
      basePos: new THREE.Vector3(36.0, -0.4, 70.0),
      timer: 0,
      isJumping: false
    };

    // 10. ĐOM ĐÓM PHÁT SÁNG VƯỜN HOA SINH THÁI & HỒ CÂU (GLOWING FIREFLIES)
    this.fireflies = [];
    for (let ff = 0; ff < 20; ff++) {
      const ffMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 6),
        new THREE.MeshBasicMaterial({ color: 0xbbf7d0, transparent: true, opacity: 0.88 })
      );
      const ffBase = new THREE.Vector3(
        34.0 + Math.random() * 32.0,
        0.8 + Math.random() * 1.8,
        63.0 + Math.random() * 11.0
      );
      ffMesh.position.copy(ffBase);
      vignetteGroup.add(ffMesh);
      this.fireflies.push({
        mesh: ffMesh,
        basePos: ffBase,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.02
      });
    }

    // 11. BỤI CỎ HOA & KHÓM NẤM XINH XẮN DỌC LỐI ĐI
    const mushroomColors = [0xef4444, 0xf59e0b];
    const shroomLocations = [
      { x: -5.0, z: 24.0 }, { x: 5.0, z: 24.0 },
      { x: -12.0, z: 32.0 }, { x: 12.0, z: 32.0 },
      { x: -7.0, z: 42.0 }, { x: 7.0, z: 42.0 }
    ];
    shroomLocations.forEach((loc, sIdx) => {
      // Khóm nấm
      const shroomStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.07, 0.22, 8),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 })
      );
      shroomStem.position.set(loc.x, 0.11, loc.z);
      vignetteGroup.add(shroomStem);

      const shroomCap = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 10, 8),
        new THREE.MeshStandardMaterial({ color: mushroomColors[sIdx % mushroomColors.length], roughness: 0.4 })
      );
      shroomCap.scale.set(1.0, 0.65, 1.0);
      shroomCap.position.set(loc.x, 0.24, loc.z);
      vignetteGroup.add(shroomCap);
    });

    this.scene.add(vignetteGroup);
  }

  // ------------------------------------------------------------
  // HIỆU ỨNG HÀO QUANG & DỊCH CHUYỂN TỨC THỜI (TELEPORT SYSTEM)
  // ------------------------------------------------------------
  createTeleportSparkles(x, z) {
    const sparkleGroup = new THREE.Group();
    const starColors = [0xfacc15, 0x38bdf8, 0xa855f7, 0xec4899];

    for (let i = 0; i < 35; i++) {
      const geo = new THREE.OctahedronGeometry(0.18 + Math.random() * 0.12);
      const mat = new THREE.MeshBasicMaterial({
        color: starColors[i % starColors.length],
        transparent: true,
        opacity: 0.95
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / 35) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.2;
      mesh.position.set(x + Math.cos(angle) * radius, 0.2 + Math.random() * 0.6, z + Math.sin(angle) * radius);
      sparkleGroup.add(mesh);
    }
    this.scene.add(sparkleGroup);

    let frame = 0;
    const animateSparkles = () => {
      frame++;
      sparkleGroup.children.forEach(s => {
        s.position.y += 0.08;
        s.rotation.y += 0.15;
        s.scale.multiplyScalar(0.96);
      });
      if (frame < 30) {
        requestAnimationFrame(animateSparkles);
      } else {
        this.scene.remove(sparkleGroup);
      }
    };
    animateSparkles();
  }

  teleportTo(x, z, label = '') {
    if (!this.studentMesh) return;
    this.studentMesh.position.set(x, this.playerBaseY || 0, z);
    this.cameraYaw = 0;
    this.createTeleportSparkles(x, z);
    if (label && typeof window !== 'undefined' && window.ChipGameInstance) {
      window.ChipGameInstance.showNPCDialogue(
        { name: 'Dịch Chuyển 🚀', title: 'Hệ Thống RPG 5C4' },
        `✨ Bé Hà My đã dịch chuyển tức thời tới: ${label}!`
      );
    }
  }

  // ------------------------------------------------------------
  // HỆ THỐNG MŨI TÊN DẪN ĐƯỜNG 3D & CỘT SÁNG THIÊN ĐÌNH ("DẮT MŨI" LIÊN HOÀN)
  // ------------------------------------------------------------
  setupQuestNavigation() {
    // 1. Mũi Tên Chỉ Đường 3D (3D Floating Neon Navigation Arrow)
    this.navArrowGroup = new THREE.Group();

    // Thân trục mũi tên mạ vàng kim dịu mắt
    const shaftGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.9, 12);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xd97706,
      emissiveIntensity: 0.35,
      metalness: 0.3,
      roughness: 0.3
    });
    const shaft = new THREE.Mesh(shaftGeo, goldMat);
    shaft.rotation.x = Math.PI / 2;
    shaft.position.z = -0.45;
    this.navArrowGroup.add(shaft);

    // Mũi nhọn hướng tâm (Cyan Cone Tip mềm mại)
    const coneGeo = new THREE.ConeGeometry(0.24, 0.60, 16);
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      metalness: 0.2,
      roughness: 0.3
    });
    const cone = new THREE.Mesh(coneGeo, cyanMat);
    cone.rotation.x = Math.PI / 2;
    cone.position.z = -1.15;
    this.navArrowGroup.add(cone);

    // Đôi cánh định hướng khí động học ở đuôi mũi tên
    const wingGeo = new THREE.BoxGeometry(0.42, 0.04, 0.28);
    const wing = new THREE.Mesh(wingGeo, goldMat);
    wing.position.z = -0.15;
    this.navArrowGroup.add(wing);

    // Vòng hào quang năng lượng bao quanh mũi tên
    const ringGeo = new THREE.TorusGeometry(0.28, 0.035, 8, 20);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.7 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.z = -0.65;
    this.navArrowGroup.add(ring);

    this.navArrowGroup.visible = false;
    this.scene.add(this.navArrowGroup);

    // 2. Cột Sáng Thiên Đình Đâm Thẳng Xuống Vị Trí Mục Tiêu (Beacon Beam cao 130m, màu dịu mắt, không chói lóa)
    this.beaconBeamGroup = new THREE.Group();

    const beamGeo = new THREE.CylinderGeometry(0.7, 1.2, 130, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18, // Giảm độ trong suốt dịu mắt, loại bỏ AdditiveBlending để tránh bị cháy sáng trắng xóa
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const beamMesh = new THREE.Mesh(beamGeo, beamMat);
    beamMesh.position.y = 65;
    this.beaconBeamGroup.add(beamMesh);

    // Vòng hào quang tiếp đất xoay tròn dưới chân NPC
    const gRingGeo = new THREE.RingGeometry(0.8, 2.5, 32);
    const gRingMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide
    });
    const gRingMesh = new THREE.Mesh(gRingGeo, gRingMat);
    gRingMesh.rotation.x = -Math.PI / 2;
    gRingMesh.position.y = 0.08;
    this.beaconBeamGroup.add(gRingMesh);
    this.beaconGroundRing = gRingMesh;

    this.beaconBeamGroup.visible = false;
    this.scene.add(this.beaconBeamGroup);
  }

  setQuestNavigationTarget(worldX, worldY, worldZ, targetName = '', targetIcon = '🎯') {
    this.questNavTarget = {
      x: worldX,
      y: worldY !== undefined ? worldY : 0,
      z: worldZ,
      name: targetName,
      icon: targetIcon
    };
    if (this.beaconBeamGroup) {
      this.beaconBeamGroup.position.set(worldX, worldY !== undefined ? worldY : 0, worldZ);
    }
    // Nếu nhân vật đã đứng gần mục tiêu (< 3.8m), tắt ngay lập tức không hiển thị
    if (this.studentMesh) {
      const dist = Math.hypot(worldX - this.studentMesh.position.x, worldZ - this.studentMesh.position.z);
      const isNear = (dist <= 3.8);
      if (this.navArrowGroup) this.navArrowGroup.visible = !isNear;
      if (this.beaconBeamGroup) this.beaconBeamGroup.visible = !isNear;
    } else {
      if (this.navArrowGroup) this.navArrowGroup.visible = true;
      if (this.beaconBeamGroup) this.beaconBeamGroup.visible = true;
    }
  }

  clearQuestNavigationTarget() {
    this.questNavTarget = null;
    if (this.navArrowGroup) this.navArrowGroup.visible = false;
    if (this.beaconBeamGroup) this.beaconBeamGroup.visible = false;
  }

  teleportToQuestTarget() {
    if (!this.questNavTarget) return;
    const target = this.questNavTarget;
    const targetY = target.y || 0;

    // Nếu mục tiêu ở trên Thiên Đình (Y >= 30m): BẮT BUỘC PHẢI NHẢY OBBY LEO LÊN CHỨ KHÔNG ĐƯỢC DỊCH CHUYỂN!
    if (targetY >= 30) {
      this.playerBaseY = 0;
      if (this.studentMesh) {
        this.studentMesh.position.set(25, 0, 27.5);
        this.studentMesh.rotation.y = 0;
      }
      this.cameraYaw = 0;
      this.createTeleportSparkles(25, 27.5);
      if (typeof window !== 'undefined' && window.ChipGameInstance) {
        window.ChipGameInstance.showNPCDialogue(
          { name: 'Thử Thách Thiên Đình 80M 🧗', title: 'Hệ Thống RPG 5C4' },
          `🧗 Để bái kiến ${target.name || 'Tôn Ngộ Không'} trên Thiên Cung 80M, bé Hà My hãy trổ tài nhảy Obby leo từng bậc thang lên mây xanh chứ không được dịch chuyển nhé! Hãy cố lên!`
        );
      }
      return;
    }

    this.playerBaseY = targetY;
    if (this.studentMesh) {
      this.studentMesh.position.set(target.x, targetY, target.z + 2.0);
    }
    this.cameraYaw = 0;
    this.createTeleportSparkles(target.x, target.z + 2.0);

    // Khi đã đến nơi -> TẮT CỘT SÁNG VÀ MŨI TÊN NGAY LẬP TỨC
    if (this.navArrowGroup) this.navArrowGroup.visible = false;
    if (this.beaconBeamGroup) this.beaconBeamGroup.visible = false;

    if (typeof window !== 'undefined' && window.ChipGameInstance) {
      window.ChipGameInstance.showNPCDialogue(
        { name: 'Dẫn Đường Siêu Tốc 🚀', title: 'Hệ Thống RPG 5C4' },
        `✨ Bé Hà My đã dịch chuyển tức thời đến điểm hẹn: ${target.icon || '🎯'} ${target.name}!`
      );
    }
  }

  createSpringJumpSparkles(x, y, z) {
    const group = new THREE.Group();
    for (let i = 0; i < 16; i++) {
      const sp = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.2),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x38bdf8 : 0xfacc15 })
      );
      sp.position.set(x + (Math.random() - 0.5) * 2.2, y + 0.3, z + (Math.random() - 0.5) * 2.2);
      group.add(sp);
    }
    this.scene.add(group);
    let f = 0;
    const anim = () => {
      f++;
      group.children.forEach(c => {
        c.position.y += 0.12;
        c.scale.multiplyScalar(0.92);
      });
      if (f < 22) requestAnimationFrame(anim);
      else this.scene.remove(group);
    };
    anim();
  }

  
  // ------------------------------------------------------------
  // CÂY PHƯỢNG VĨ SÂN TRƯỜNG NGÔ QUYỀN (ROYAL POINCIANA)
  // Thân gỗ cổ thụ, chùm hoa đỏ thắm rực rỡ mùa hè
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // CÂY PHƯỢNG VĨ CỔ THỤ SÂN TRƯỜNG (ROYAL POINCIANA)
  // Thân gỗ điêu khắc uốn lượn, tán mây đa tầng, hoa đỏ rực rỡ
  // ------------------------------------------------------------
  buildPoincianaTree(x, y, z, parentGroup) {
    const tree = new THREE.Group();
    tree.position.set(x, y, z);

    const barkMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
    const greenDarkMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });
    const greenLightMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.65 });
    const flowerRedMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 });
    const flowerCoralMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.5 });

    // 1. Thân cây cổ thụ thuôn nhọn tự nhiên
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.95, 4.4, 14), barkMat);
    trunk.position.y = 2.2;
    trunk.castShadow = true;
    tree.add(trunk);

    // 4 Rễ cây bạnh vươn dài bám chắc vào mặt đất (Sprawling Root Flairs)
    for (let r = 0; r < 4; r++) {
      const rAng = (r / 4) * Math.PI * 2 + 0.3;
      const root = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.42, 1.8, 8), barkMat);
      root.rotation.z = Math.PI / 4;
      root.rotation.y = rAng;
      root.position.set(Math.cos(rAng) * 0.75, 0.35, Math.sin(rAng) * 0.75);
      root.castShadow = true;
      tree.add(root);
    }

    // 2 Cành chính chĩa ra nâng đỡ vòm lá
    const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.42, 2.8, 8), barkMat);
    b1.position.set(-0.8, 4.2, 0);
    b1.rotation.z = 0.55;
    tree.add(b1);

    const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.38, 2.6, 8), barkMat);
    b2.position.set(0.7, 4.3, 0.4);
    b2.rotation.z = -0.50;
    tree.add(b2);

    // 2. Tán mây lá xanh điêu khắc đa tầng (Sculpted Multi-lobed Foliage Clusters)
    const canopyGroup = new THREE.Group();
    canopyGroup.position.y = 5.2;

    const foliageClusters = [
      { x: 0, y: 0.2, z: 0, r: 2.8, mat: greenLightMat },
      { x: -1.8, y: -0.3, z: 0.6, r: 2.1, mat: greenDarkMat },
      { x: 1.9, y: -0.2, z: -0.5, r: 2.2, mat: greenDarkMat },
      { x: 0.8, y: -0.4, z: 1.7, r: 2.0, mat: greenDarkMat },
      { x: -0.9, y: -0.3, z: -1.6, r: 1.9, mat: greenDarkMat },
      { x: 0, y: 1.2, z: 0, r: 2.0, mat: greenLightMat }
    ];

    foliageClusters.forEach(fc => {
      const fMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(fc.r, 1), fc.mat);
      fMesh.scale.set(1.15, 0.72, 1.15); // Dáng vòm mây bè rộng tự nhiên
      fMesh.position.set(fc.x, fc.y, fc.z);
      fMesh.castShadow = true;
      canopyGroup.add(fMesh);
    });

    // 3. Các chùm hoa phượng vĩ đỏ rực rỡ mùa hè (Vibrant Poinciana Flower Sprays)
    const flowerSpawns = [
      { x: -1.6, y: 0.6, z: 1.2, r: 1.1, mat: flowerRedMat },
      { x: 1.7, y: 0.7, z: -0.9, r: 1.15, mat: flowerCoralMat },
      { x: 0.6, y: 0.9, z: 1.6, r: 1.0, mat: flowerRedMat },
      { x: -1.2, y: 0.8, z: -1.4, r: 0.95, mat: flowerCoralMat },
      { x: 0.2, y: 1.6, z: 0.4, r: 1.2, mat: flowerRedMat },
      { x: -0.4, y: 1.5, z: -0.6, r: 1.05, mat: flowerRedMat },
      { x: 1.9, y: -0.1, z: 1.0, r: 0.9, mat: flowerCoralMat },
      { x: -2.1, y: -0.1, z: -0.4, r: 0.9, mat: flowerRedMat }
    ];

    flowerSpawns.forEach(fl => {
      const flMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(fl.r, 1), fl.mat);
      flMesh.scale.set(1.1, 0.75, 1.1);
      flMesh.position.set(fl.x, fl.y, fl.z);
      flMesh.castShadow = true;
      canopyGroup.add(flMesh);
    });

    tree.add(canopyGroup);

    // 4. Băng ghế đá mài tròn trịa dưới bóng cây
    const benchGeo = new THREE.BoxGeometry(2.0, 0.45, 0.65);
    const benchMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 });
    const bench = new THREE.Mesh(benchGeo, benchMat);
    bench.position.set(1.4, 0.22, 1.1);
    bench.rotation.y = -0.35;
    bench.castShadow = true;
    bench.receiveShadow = true;
    tree.add(bench);

    parentGroup.add(tree);
    this.stylizedTrees.push({ group: canopyGroup, phase: Math.random() * Math.PI * 2 });
  }

  // ------------------------------------------------------------
  // CÂY BẰNG LĂNG TÍM SÂN TRƯỜNG (LAGERSTROEMIA)
  // Thân gỗ uyển chuyển, tán hoa tím mộng mơ học trò
  // ------------------------------------------------------------
  buildLagerstroemiaTree(x, y, z, parentGroup) {
    const tree = new THREE.Group();
    tree.position.set(x, y, z);

    const barkMat = new THREE.MeshStandardMaterial({ color: 0x522e15, roughness: 0.9 });
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7 });
    const purpleMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.5 });
    const lilacMat = new THREE.MeshStandardMaterial({ color: 0xc084fc, roughness: 0.5 });

    // Thân cây thuôn tự nhiên
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.82, 4.0, 12), barkMat);
    trunk.position.y = 2.0;
    trunk.castShadow = true;
    tree.add(trunk);

    const canopyGroup = new THREE.Group();
    canopyGroup.position.y = 4.8;

    // Vòm lá xanh mướt
    const foliageClusters = [
      { x: 0, y: 0.2, z: 0, r: 2.5, mat: greenMat },
      { x: -1.4, y: -0.2, z: 0.5, r: 1.9, mat: greenMat },
      { x: 1.5, y: -0.2, z: -0.4, r: 1.9, mat: greenMat },
      { x: 0.4, y: 1.0, z: 0, r: 1.8, mat: greenMat }
    ];
    foliageClusters.forEach(fc => {
      const fMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(fc.r, 1), fc.mat);
      fMesh.scale.set(1.15, 0.75, 1.15);
      fMesh.position.set(fc.x, fc.y, fc.z);
      fMesh.castShadow = true;
      canopyGroup.add(fMesh);
    });

    // Chùm hoa bằng lăng tím ngát
    const purpleSpawns = [
      { x: -1.3, y: 0.5, z: 0.9, r: 1.0, mat: purpleMat },
      { x: 1.4, y: 0.5, z: -0.7, r: 1.05, mat: lilacMat },
      { x: 0.1, y: 1.3, z: 0.3, r: 1.1, mat: purpleMat },
      { x: -0.4, y: 1.2, z: -0.6, r: 0.95, mat: lilacMat },
      { x: 1.2, y: -0.1, z: 0.9, r: 0.85, mat: purpleMat }
    ];
    purpleSpawns.forEach(pl => {
      const plMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(pl.r, 1), pl.mat);
      plMesh.scale.set(1.1, 0.75, 1.1);
      plMesh.position.set(pl.x, pl.y, pl.z);
      plMesh.castShadow = true;
      canopyGroup.add(plMesh);
    });

    tree.add(canopyGroup);
    parentGroup.add(tree);
    this.stylizedTrees.push({ group: canopyGroup, phase: Math.random() * Math.PI * 2 });
  }

  // ------------------------------------------------------------
  // BỤI CỎ 3D & KHÓM HOA DẠI TỰ NHIÊN TRÊN MẶT ĐẤT (3D FOLIAGE & WILDFLOWERS)
  // ------------------------------------------------------------
  build3DFoliageAndWildflowers(parentGroup) {
    const foliageGroup = new THREE.Group();
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x4ade80,
      roughness: 0.65,
      side: THREE.DoubleSide
    });

    const flowerColors = [0xf43f5e, 0xfacc15, 0xa855f7, 0x38bdf8, 0xffffff];

    // 1. 36 Bụi cỏ 3D hình sao đung đưa trong gió
    const grassBladeGeo = new THREE.PlaneGeometry(0.35, 0.55);
    const grassSpawns = [
      { x: -16.0, z: 24.0 }, { x: -12.5, z: 22.0 }, { x: 16.0, z: 24.0 }, { x: 12.5, z: 22.0 },
      { x: -16.0, z: 37.0 }, { x: -12.5, z: 35.0 }, { x: 16.0, z: 37.0 }, { x: 12.5, z: 35.0 },
      { x: -2.5, z: 28.0 }, { x: 2.5, z: 28.0 }, { x: -2.5, z: 33.0 }, { x: 2.5, z: 33.0 },
      { x: 22.0, z: 12.0 }, { x: 28.0, z: 12.0 }, { x: 22.0, z: 20.0 }, { x: 28.0, z: 20.0 },
      { x: -22.0, z: 14.0 }, { x: -22.0, z: 20.0 }, { x: -6.0, z: 46.0 }, { x: 6.0, z: 46.0 },
      { x: -8.0, z: 26.0 }, { x: 8.0, z: 26.0 }, { x: -10.0, z: 40.0 }, { x: 10.0, z: 40.0 }
    ];

    grassSpawns.forEach(sp => {
      const tuft = new THREE.Group();
      tuft.position.set(sp.x, 0.26, sp.z);

      for (let b = 0; b < 3; b++) {
        const blade = new THREE.Mesh(grassBladeGeo, grassMat);
        blade.rotation.y = (b / 3) * Math.PI;
        tuft.add(blade);
      }
      foliageGroup.add(tuft);
      this.grassTufts.push({ group: tuft, phase: Math.random() * Math.PI * 2 });
    });

    // 2. 24 Khóm hoa dại rực rỡ khoe sắc
    for (let f = 0; f < 24; f++) {
      const fGroup = new THREE.Group();
      const fx = (Math.random() - 0.5) * 55;
      const fz = 18 + Math.random() * 34;
      // Tránh lòng đường trung tâm
      if (Math.abs(fx) < 4.0 && fz < 52) continue;

      fGroup.position.set(fx, 0.25, fz);

      const fMat = new THREE.MeshStandardMaterial({
        color: flowerColors[f % flowerColors.length],
        roughness: 0.4
      });
      const bloom = new THREE.Mesh(new THREE.DodecahedronGeometry(0.14, 0), fMat);
      fGroup.add(bloom);

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.3),
        new THREE.MeshBasicMaterial({ color: 0x16a34a })
      );
      stem.position.y = -0.12;
      fGroup.add(stem);

      foliageGroup.add(fGroup);
    }

    parentGroup.add(foliageGroup);
  }

  // ------------------------------------------------------------
  // HIỆU ỨNG CÁNH HOA RƠI & ĐÀN BƯỚM SÂN TRƯỜNG NGÔ QUYỀN
  // ------------------------------------------------------------
  initFallingPetalsAndButterflies(parentGroup) {
    const petalColors = [0xef4444, 0xf43f5e, 0xfacc15, 0xec4899, 0xa855f7];
    for (let i = 0; i < 30; i++) {
      const pGeo = new THREE.PlaneGeometry(0.16, 0.16);
      const pMat = new THREE.MeshBasicMaterial({
        color: petalColors[i % petalColors.length],
        side: THREE.DoubleSide
      });
      const petal = new THREE.Mesh(pGeo, pMat);
      petal.position.set(
        (Math.random() - 0.5) * 40,
        1.5 + Math.random() * 6.5,
        10 + Math.random() * 32
      );
      petal.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      parentGroup.add(petal);
      this.fallingPetals.push({
        mesh: petal,
        speedY: 0.015 + Math.random() * 0.02,
        swaySpeed: 0.02 + Math.random() * 0.03,
        rotSpeed: 0.03 + Math.random() * 0.04,
        phase: Math.random() * Math.PI * 2
      });
    }

    const butterflyColors = [0xfde047, 0x38bdf8, 0xf472b6, 0x4ade80];
    for (let b = 0; b < 4; b++) {
      const bfGroup = new THREE.Group();
      bfGroup.position.set((b - 1.5) * 6, 1.8 + Math.random() * 1.5, 20 + (b - 1.5) * 4);
      const wingGeo = new THREE.PlaneGeometry(0.18, 0.14);
      const wingMat = new THREE.MeshBasicMaterial({ color: butterflyColors[b], side: THREE.DoubleSide });
      const wL = new THREE.Mesh(wingGeo, wingMat);
      wL.position.x = -0.09;
      bfGroup.add(wL);
      const wR = new THREE.Mesh(wingGeo, wingMat);
      wR.position.x = 0.09;
      bfGroup.add(wR);
      parentGroup.add(bfGroup);
      this.butterflies.push({
        group: bfGroup,
        wingL: wL,
        wingR: wR,
        basePos: bfGroup.position.clone(),
        speed: 0.012 + b * 0.004,
        angle: b * 1.5
      });
    }
  }

  buildMinecraftTree(x, y, z, parentGroup) {
    const tree = new THREE.Group();
    tree.position.set(x, y, z);

    // Thân cây khối gỗ vuông Minecraft
    const trunkGeo = new THREE.BoxGeometry(0.8, 3.2, 0.8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 1.6;
    trunk.castShadow = true;
    tree.add(trunk);

    // Tán lá khối vuông Minecraft
    const leavesMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.7 });

    const leaves1Geo = new THREE.BoxGeometry(2.6, 1.2, 2.6);
    const l1 = new THREE.Mesh(leaves1Geo, leavesMat);
    l1.position.y = 3.2;
    l1.castShadow = true;
    tree.add(l1);

    const leaves2Geo = new THREE.BoxGeometry(1.8, 1.2, 1.8);
    const l2 = new THREE.Mesh(leaves2Geo, leavesMat);
    l2.position.y = 4.2;
    l2.castShadow = true;
    tree.add(l2);

    parentGroup.add(tree);
  }

  // ============================================================
  // ROBLOX ANSWER PADS (Interactive A, B, C, D Pads với Bảng 3D Nổi Trực Diện)
  // ============================================================
  renderOptionsPads(options, onSelectCallback) {
    this.pads.forEach(p => {
      this.scene.remove(p.mesh);
      if (p.spot) this.scene.remove(p.spot);
      if (p.cyl && p.cyl.geometry) p.cyl.geometry.dispose();
      if (p.cyl && p.cyl.material) p.cyl.material.dispose();
      if (p.ring && p.ring.geometry) p.ring.geometry.dispose();
      if (p.plaque && p.plaque.geometry) p.plaque.geometry.dispose();
      if (p.plaqueTex) p.plaqueTex.dispose();
      if (p.spaceBadgeTex) p.spaceBadgeTex.dispose();
    });
    this.pads = [];
    this.solidPlatforms = this.solidPlatforms.filter(p => !p.isQuizPad);
    this.onSelectCallback = onSelectCallback;
    this.selectionLocked = false;
    this.standingPadIndex = -1;
    this.resetKeys(); // Bộ đệm an toàn: Xóa sạch trạng thái kẹt phím khi bắt đầu câu hỏi mới!

    const padColors = [
      { bg: 0x0284c7, light: 0x38bdf8, hex: '#0284c7', lightHex: '#38bdf8' },
      { bg: 0xd97706, light: 0xfbbf24, hex: '#d97706', lightHex: '#fbbf24' },
      { bg: 0xbe185d, light: 0xf472b6, hex: '#be185d', lightHex: '#f472b6' },
      { bg: 0x059669, light: 0x34d399, hex: '#059669', lightHex: '#34d399' }
    ];

    const letters = ['A', 'B', 'C', 'D'];
    const total = options.length;

    const startX = total === 2 ? -4.0 : (total === 3 ? -6.0 : -6.6);
    const stepX = total === 2 ? 8.0 : (total === 3 ? 6.0 : 4.4);

    options.forEach((opt, idx) => {
      const colorSet = padColors[idx % padColors.length];
      const posX = startX + idx * stepX;
      const posZ = 1.8; // Đặt bục trong phòng học 5C4 trên sàn trung tâm thông thoáng rộng rãi

      this.solidPlatforms.push({
        worldX: posX,
        worldY: 0.0,
        topY: 0.35,
        worldZ: posZ,
        halfW: 1.35,
        halfD: 1.35,
        isQuizPad: true
      });

      const padGroup = new THREE.Group();

      // 1. Bục tròn nổi trên mặt đất
      const cylGeo = new THREE.CylinderGeometry(1.25, 1.4, 0.35, 32);
      const cylMat = new THREE.MeshStandardMaterial({
        color: colorSet.bg,
        emissive: colorSet.bg,
        emissiveIntensity: 0.35,
        roughness: 0.2
      });
      const padCyl = new THREE.Mesh(cylGeo, cylMat);
      padCyl.position.y = 0.175;
      padCyl.receiveShadow = true;
      padGroup.add(padCyl);

      // 2. Vòng phát sáng Neon trên mép bục
      const ringGeo = new THREE.TorusGeometry(1.28, 0.05, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: colorSet.light });
      const padRing = new THREE.Mesh(ringGeo, ringMat);
      padRing.rotation.x = Math.PI / 2;
      padRing.position.y = 0.36;
      padGroup.add(padRing);

      // 3. Chữ cái A / B / C / D trên mặt bục nổi
      const groundLabelCanvas = document.createElement('canvas');
      groundLabelCanvas.width = 256;
      groundLabelCanvas.height = 256;
      const glctx = groundLabelCanvas.getContext('2d');
      glctx.fillStyle = '#ffffff';
      glctx.font = '900 130px "Nunito", sans-serif';
      glctx.textAlign = 'center';
      glctx.textBaseline = 'middle';
      glctx.fillText(letters[idx], 128, 128);

      const groundLabelTex = new THREE.CanvasTexture(groundLabelCanvas);
      const groundLabelMesh = new THREE.Mesh(
        new THREE.CircleGeometry(0.95, 32),
        new THREE.MeshBasicMaterial({ map: groundLabelTex, transparent: true })
      );
      groundLabelMesh.rotation.x = -Math.PI / 2;
      groundLabelMesh.position.y = 0.37;
      padGroup.add(groundLabelMesh);

      // 4. BẢNG 3D NỔI (FLOATING BILLBOARD PLAQUE) TẦM MẮT - HIỆN NỘI DUNG ĐÁP ÁN RÕ RÀNG
      const textVal = typeof opt === 'string' ? opt : (opt && opt.text ? opt.text : '');
      const plqCanvas = document.createElement('canvas');
      plqCanvas.width = 512;
      plqCanvas.height = 180;
      const pctx = plqCanvas.getContext('2d');

      pctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      pctx.roundRect(8, 8, 496, 164, 24);
      pctx.fill();

      pctx.strokeStyle = colorSet.lightHex;
      pctx.lineWidth = 6;
      pctx.roundRect(8, 8, 496, 164, 24);
      pctx.stroke();

      // Huy hiệu tròn A/B/C/D
      pctx.fillStyle = colorSet.hex;
      pctx.beginPath();
      pctx.arc(75, 90, 48, 0, Math.PI * 2);
      pctx.fill();

      pctx.fillStyle = '#ffffff';
      pctx.font = '900 60px "Nunito", sans-serif';
      pctx.textAlign = 'center';
      pctx.textBaseline = 'middle';
      pctx.fillText(letters[idx], 75, 92);

      // Chữ nội dung đáp án
      pctx.fillStyle = '#ffffff';
      pctx.font = 'bold 44px "Nunito", sans-serif';
      pctx.textAlign = 'left';
      pctx.textBaseline = 'middle';

      const optWords = textVal.split(' ');
      if (optWords.length > 2 && textVal.length > 14) {
        const mid = Math.ceil(optWords.length / 2);
        const line1 = optWords.slice(0, mid).join(' ');
        const line2 = optWords.slice(mid).join(' ');
        pctx.fillText(line1, 140, 68);
        pctx.fillText(line2, 140, 118);
      } else {
        pctx.fillText(textVal, 140, 92);
      }

      const plaqueTex = new THREE.CanvasTexture(plqCanvas);
      const plaqueGeo = new THREE.PlaneGeometry(2.4, 0.85);
      const plaqueMat = new THREE.MeshBasicMaterial({
        map: plaqueTex,
        transparent: true,
        side: THREE.DoubleSide
      });
      const plaqueMesh = new THREE.Mesh(plaqueGeo, plaqueMat);
      plaqueMesh.position.set(0, 1.65, 0); // Treo lơ lửng tầm mắt người chơi
      padGroup.add(plaqueMesh);

      // 5. Biển thông báo [SPACE CHỌN] bay lơ lửng trên bục
      const spaceCanvas = document.createElement('canvas');
      spaceCanvas.width = 256;
      spaceCanvas.height = 96;
      const sctx = spaceCanvas.getContext('2d');
      sctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      sctx.roundRect(4, 4, 248, 88, 20);
      sctx.fill();
      sctx.strokeStyle = '#fef08a';
      sctx.lineWidth = 6;
      sctx.stroke();

      sctx.fillStyle = '#fef08a';
      sctx.font = '900 36px "Nunito", sans-serif';
      sctx.textAlign = 'center';
      sctx.textBaseline = 'middle';
      sctx.fillText('⎵ SPACE', 128, 48);

      const spaceTex = new THREE.CanvasTexture(spaceCanvas);
      const spaceGeo = new THREE.PlaneGeometry(1.2, 0.45);
      const spaceMat = new THREE.MeshBasicMaterial({
        map: spaceTex,
        transparent: true,
        side: THREE.DoubleSide
      });
      const spaceBadge = new THREE.Mesh(spaceGeo, spaceMat);
      spaceBadge.position.set(0, 2.3, 0);
      spaceBadge.visible = false;
      padGroup.add(spaceBadge);

      // 6. Spotlight rọi sáng bục
      const spot = new THREE.SpotLight(colorSet.light, 0, 12, Math.PI / 5, 0.3);
      spot.position.set(posX, 8, posZ);
      spot.target = padCyl;
      this.scene.add(spot);

      padGroup.position.set(posX, 0, posZ);
      this.scene.add(padGroup);

      this.pads.push({
        idx: idx,
        opt: opt,
        x: posX,
        z: posZ,
        mesh: padGroup,
        cyl: padCyl,
        ring: padRing,
        plaque: plaqueMesh,
        plaqueTex: plaqueTex,
        spaceBadge: spaceBadge,
        spaceBadgeTex: spaceTex,
        spot: spot,
        colorSet: colorSet,
        highlighted: false
      });
    });
  }

  // ============================================================
  // CHIBI BÉ HÀ MY 5C4 (Mô hình 3D Chibi với Nón Quai Thao)
  // ============================================================
  // ============================================================
  // CHIBI BÉ HÀ MY 5C4 (CHUẨN 100% THEO ẢNH GỐC media_1790964070461.jpg)
  // Nón quai thao nan tre đan, 2 nơ hồng to, tua rua dài, váy xòe 3 tầng ruffles,
  // tay áo trễ vai xòe cánh sen, đai tím hoàng gia, mắt nâu anime long lanh!
  // ============================================================
  buildStudentHaMy() {
    this.studentMesh = new THREE.Group();

    // ----------------------------------------------------------
    // 1. THÂN ÁO & VÁY XÒE XẾP TẦNG 3 LỚP (3-TIERED RUFFLE DRESS)
    // ----------------------------------------------------------
    // Thân áo cúp ngực / trễ vai màu hồng cánh sen rực rỡ (#ec4899)
    const bodiceGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.38, 24);
    const pinkMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      roughness: 0.35,
      metalness: 0.05
    });
    const bodice = new THREE.Mesh(bodiceGeo, pinkMat);
    bodice.position.y = 0.58;
    bodice.castShadow = true;
    this.studentMesh.add(bodice);
    this.studentDressMeshes.push(bodice);

    // Đai lưng lụa tím hoàng gia (#7e22ce)
    const sashGeo = new THREE.CylinderGeometry(0.29, 0.31, 0.12, 24);
    const purpleSashMat = new THREE.MeshStandardMaterial({ color: 0x7e22ce, roughness: 0.4 });
    const sash = new THREE.Mesh(sashGeo, purpleSashMat);
    sash.position.y = 0.44;
    this.studentMesh.add(sash);
    this.studentDressMeshes.push(sash);

    // TẦNG 1 (VÁY TRÊN): Màu tím hoa cà nhạt rủ bồng xòe (#c084fc)
    const tier1Geo = new THREE.CylinderGeometry(0.30, 0.58, 0.24, 24, 1, true);
    const lilacMat1 = new THREE.MeshStandardMaterial({ color: 0xc084fc, roughness: 0.4, side: THREE.DoubleSide });
    const tier1 = new THREE.Mesh(tier1Geo, lilacMat1);
    tier1.position.y = 0.32;
    tier1.castShadow = true;
    this.studentMesh.add(tier1);
    this.studentDressMeshes.push(tier1);

    // TẦNG 2 (VÁY GIỮA): Màu hồng cánh sen xếp nếp xòe rộng (#ec4899)
    const tier2Geo = new THREE.CylinderGeometry(0.46, 0.78, 0.26, 24, 1, true);
    const pinkMat2 = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.4, side: THREE.DoubleSide });
    const tier2 = new THREE.Mesh(tier2Geo, pinkMat2);
    tier2.position.y = 0.20;
    tier2.castShadow = true;
    this.studentMesh.add(tier2);
    this.studentDressMeshes.push(tier2);

    // TẦNG 3 (VÁY DƯỚI CÙNG): Màu tím pastel xòe lượn sóng mềm mại (#d8b4fe)
    const tier3Geo = new THREE.CylinderGeometry(0.62, 0.98, 0.28, 24, 1, true);
    const lilacMat3 = new THREE.MeshStandardMaterial({ color: 0xd8b4fe, roughness: 0.4, side: THREE.DoubleSide });
    const tier3 = new THREE.Mesh(tier3Geo, lilacMat3);
    tier3.position.y = 0.08;
    tier3.castShadow = true;
    this.studentMesh.add(tier3);
    this.studentDressMeshes.push(tier3);

    // Viền ren trắng tinh tế dưới gấu váy
    const laceGeo = new THREE.TorusGeometry(0.99, 0.04, 8, 32);
    const laceMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const lace = new THREE.Mesh(laceGeo, laceMat);
    lace.rotation.x = Math.PI / 2;
    lace.position.y = -0.06;
    this.studentMesh.add(lace);
    this.studentDressMeshes.push(lace);

    // ----------------------------------------------------------
    // 2. CHÂN & ĐÔI GIÀY HỒNG DỄ THƯƠNG
    // ----------------------------------------------------------
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.35 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.3 });

    const legGeo = new THREE.CylinderGeometry(0.07, 0.065, 0.32, 12);

    this.studentLegL = new THREE.Group();
    const legLMesh = new THREE.Mesh(legGeo, skinMat);
    legLMesh.position.y = -0.16;
    legLMesh.castShadow = true;
    const shoeL = new THREE.Mesh(new THREE.SphereGeometry(0.10, 10, 10), shoeMat);
    shoeL.position.set(0, -0.30, 0.03);
    this.studentLegL.add(legLMesh);
    this.studentLegL.add(shoeL);
    this.studentLegL.position.set(-0.14, 0.16, 0);
    this.studentMesh.add(this.studentLegL);

    this.studentLegR = new THREE.Group();
    const legRMesh = new THREE.Mesh(legGeo, skinMat);
    legRMesh.position.y = -0.16;
    legRMesh.castShadow = true;
    const shoeR = new THREE.Mesh(new THREE.SphereGeometry(0.10, 10, 10), shoeMat);
    shoeR.position.set(0, -0.30, 0.03);
    this.studentLegR.add(legRMesh);
    this.studentLegR.add(shoeR);
    this.studentLegR.position.set(0.14, 0.16, 0);
    this.studentMesh.add(this.studentLegR);

    // ----------------------------------------------------------
    // 3. TAY ÁO TRỄ VAI XÒE CÁNH SEN & CÁNH TAY TẠO DÁNG DUYÊN DÁNG
    // ----------------------------------------------------------
    // Cánh sen xòe trễ vai hai bên (Off-shoulder layered ruffles)
    [-0.32, 0.32].forEach((sx, idx) => {
      const puffGroup = new THREE.Group();
      puffGroup.position.set(sx, 0.72, 0);

      const ruff1 = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.18, 12), lilacMat1);
      ruff1.rotation.z = sx > 0 ? -0.4 : 0.4;
      puffGroup.add(ruff1);

      const ruff2 = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.22, 12), pinkMat);
      ruff2.position.y = -0.06;
      ruff2.rotation.z = sx > 0 ? -0.3 : 0.3;
      puffGroup.add(ruff2);

      this.studentMesh.add(puffGroup);
    });

    const armGeo = new THREE.CylinderGeometry(0.055, 0.05, 0.38, 12);

    // ----------------------------------------------------------
    // 3. TAY ÁO TRỄ VAI & TƯ THẾ TẠO DÁNG DUYÊN DÁNG CHUẨN ẢNH MẪU
    // ----------------------------------------------------------
    // Tay phải đặt nhẹ trước ngực duyên dáng (như ảnh chibi mẫu)
    this.studentArmR = new THREE.Group();
    const armRMesh = new THREE.Mesh(armGeo, skinMat);
    armRMesh.position.y = -0.16;
    this.studentArmR.add(armRMesh);
    this.studentArmR.position.set(0.24, 0.72, 0.16);
    this.studentArmR.rotation.z = -0.60;
    this.studentArmR.rotation.x = -0.28;
    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), skinMat);
    handR.position.set(0, -0.34, 0);
    this.studentArmR.add(handR);
    this.studentMesh.add(this.studentArmR);

    // TAY TRÁI NÂNG CAO GIỮ DÂY NÓN QUAI THAO (Chuẩn 100% ảnh media_1791045835486.jpg)
    this.studentArmL = new THREE.Group();
    const armLMesh = new THREE.Mesh(armGeo, skinMat);
    armLMesh.position.y = -0.16;
    this.studentArmL.add(armLMesh);
    this.studentArmL.position.set(-0.30, 0.82, 0.12);
    this.studentArmL.rotation.z = 1.42;
    this.studentArmL.rotation.x = -0.35;
    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), skinMat);
    handL.position.set(0, -0.34, 0);
    this.studentArmL.add(handL);
    this.studentMesh.add(this.studentArmL);

    // ----------------------------------------------------------
    // 4. ĐẦU CHIBI, MÁI TÓC HẠT DẺ & KHUÔN MẶT HD 1024x1024 LONG LANH
    // ----------------------------------------------------------
    const headGeo = new THREE.SphereGeometry(0.44, 28, 28);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 1.15;
    head.castShadow = true;
    this.studentMesh.add(head);

    // Mái tóc hạt dẻ Chibi bồng bềnh phía sau và hai bên (KHÔNG che mặt trước)
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x3e1f0e, roughness: 0.5 });
    // Vỏ tóc bao phủ nửa sau đầu và hai bên thái dương (phi từ 0.76π đến 2.24π, để lộ 100% mặt trước)
    const hairBack = new THREE.Mesh(
      new THREE.SphereGeometry(0.446, 24, 24, Math.PI * 0.76, Math.PI * 1.48, 0, Math.PI * 0.9),
      hairMat
    );
    hairBack.position.set(0, 1.15, 0);
    this.studentMesh.add(hairBack);

    // Búi tóc Chibi hai bên dễ thương với nơ hồng sen
    [-0.34, 0.34].forEach(bx => {
      const bun = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), hairMat);
      bun.position.set(bx, 1.25, -0.16);
      this.studentMesh.add(bun);

      const ribbon = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.025, 8, 16), new THREE.MeshStandardMaterial({ color: 0xf43f5e }));
      ribbon.position.set(bx, 1.25, -0.13);
      ribbon.rotation.x = Math.PI / 4;
      this.studentMesh.add(ribbon);
    });

    // KHUÔN MẶT ANIME 3D UỐN CONG ÔM KHÍT ĐẦU CHIBI & TỰ ĐỘNG CHỚP MẮT (Bé Hà My 1024x1024 HD)
    const faceOpenRes = this.attachCurvedFace(head, 'ha_my');
    const faceBlinkCanvas = this.createChibiFaceCanvas('ha_my_blink');
    const faceBlinkTex = new THREE.CanvasTexture(faceBlinkCanvas);
    faceBlinkTex.minFilter = THREE.LinearFilter;
    faceBlinkTex.magFilter = THREE.LinearFilter;

    this.haMyFaceMesh = faceOpenRes.faceMesh;
    this.haMyFaceTexOpen = faceOpenRes.texture;
    this.haMyFaceTexBlink = faceBlinkTex;
    this.haMyBlinkTimer = 0;

    // ----------------------------------------------------------
    // 5. NÓN QUAI THAO TRUYỀN THỐNG ĐAN NAN TRE & 2 NƠ HỒNG TUA RUA DÀI
    // ----------------------------------------------------------
    const hatGroup = new THREE.Group();
    hatGroup.position.set(0, 1.49, -0.09); // Tựa nhẹ ra sau đỉnh đầu, để lộ hoàn toàn trán và khuôn mặt

    // Texture đan nan tre vàng óng chuẩn nón lá Việt Nam
    const strawCanvas = document.createElement('canvas');
    strawCanvas.width = 512;
    strawCanvas.height = 512;
    const sctx = strawCanvas.getContext('2d');

    // Nền tre vàng rơm ấm áp
    sctx.fillStyle = '#fef3c7';
    sctx.fillRect(0, 0, 512, 512);

    // Các đường tròn đồng tâm nan nón
    sctx.strokeStyle = '#d97706';
    sctx.lineWidth = 3;
    for (let r = 20; r < 256; r += 22) {
      sctx.beginPath();
      sctx.arc(256, 256, r, 0, Math.PI * 2);
      sctx.stroke();
    }

    // Các nan hoa toả tròn từ chóp nón
    sctx.lineWidth = 2;
    sctx.strokeStyle = '#b45309';
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 16) {
      sctx.beginPath();
      sctx.moveTo(256, 256);
      sctx.lineTo(256 + Math.cos(a) * 256, 256 + Math.sin(a) * 256);
      sctx.stroke();
    }

    const strawTex = new THREE.CanvasTexture(strawCanvas);
    const hatMat = new THREE.MeshStandardMaterial({
      map: strawTex,
      roughness: 0.5,
      side: THREE.DoubleSide
    });

    // Nón quai thao nghiêng nhẹ ra sau (rotation.x = -0.22) để lộ toàn bộ khuôn mặt xinh đẹp
    const hatCone = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.36, 32, 1, true), hatMat);
    hatCone.rotation.x = -0.22;
    hatGroup.add(hatCone);

    // Vành nón tre uốn tròn
    const hatRim = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.025, 12, 32), new THREE.MeshStandardMaterial({ color: 0xca8a04 }));
    hatRim.rotation.x = Math.PI / 2 - 0.22;
    hatGroup.add(hatRim);

    // HAI CHIẾC NƠ HỒNG TO KHỔNG LỒ 2 BÊN NÓN (TWO BIG PINK RIBBON BOWS)
    const bowPinkMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.3 });
    const createBigBow = (bx, isLeft) => {
      const bow = new THREE.Group();
      bow.position.set(bx, -0.06, 0.05);

      // Cánh nơ trái & phải
      [-0.08, 0.08].forEach(ox => {
        const loop = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.035, 8, 16), bowPinkMat);
        loop.position.x = ox;
        loop.rotation.y = ox > 0 ? 0.3 : -0.3;
        bow.add(loop);
      });

      // Nút thắt nơ
      const knot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), bowPinkMat);
      bow.add(knot);

      return bow;
    };

    const bowL = createBigBow(-0.48, true);
    hatGroup.add(bowL);

    const bowR = createBigBow(0.48, false);
    hatGroup.add(bowR);

    // HAI DẢI TUA RUA LỤA HỒNG DÀI RU RỦ (SWINGING PINK SILK TASSELS)
    const tasselGeo = new THREE.CylinderGeometry(0.028, 0.05, 0.55, 12);
    const tasselMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.3 });

    this.studentTasselL = new THREE.Mesh(tasselGeo, tasselMat);
    this.studentTasselL.position.set(-0.48, -0.35, 0.05);
    hatGroup.add(this.studentTasselL);

    this.studentTasselR = new THREE.Mesh(tasselGeo, tasselMat);
    this.studentTasselR.position.set(0.48, -0.35, 0.05);
    hatGroup.add(this.studentTasselR);

    // Dây nón hồng luồn dưới cằm
    const strapCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.46, -0.04, 0.05),
      new THREE.Vector3(0, -0.38, 0.22),
      new THREE.Vector3(0.46, -0.04, 0.05)
    );
    const strapGeo = new THREE.TubeGeometry(strapCurve, 20, 0.018, 8, false);
    const strap = new THREE.Mesh(strapGeo, bowPinkMat);
    hatGroup.add(strap);

    this.studentHatMesh = hatGroup;
    this.studentMesh.add(hatGroup);

    // Đặt bé Hà My đứng ở vị trí khởi đầu đẹp mắt, quay mặt góc 3/4 rực rỡ
    this.studentMesh.position.set(0, 0, 3.2);
    this.studentMesh.rotation.y = 0.25;
    this.scene.add(this.studentMesh);
  }

  // ============================================================
  // GIÁO VIÊN CHỦ NHIỆM 5C4: THẦY TUẤN (PHONG ĐỘ, LỊCH LÃM, KÍNH CẬN)
  // ============================================================
  buildTeacherThayTuan() {
    this.teacherMesh = new THREE.Group();

    // 1. Quần tây than đen lịch lãm
    const legGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.7, 14);
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
    const legL = new THREE.Mesh(legGeo, pantsMat);
    legL.position.set(-0.16, 0.35, 0);
    legL.castShadow = true;
    this.teacherMesh.add(legL);

    const legR = new THREE.Mesh(legGeo, pantsMat);
    legR.position.set(0.16, 0.35, 0);
    legR.castShadow = true;
    this.teacherMesh.add(legR);

    // Giày da bóng
    const shoeGeo = new THREE.BoxGeometry(0.18, 0.12, 0.28);
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
    const shoeL = new THREE.Mesh(shoeGeo, shoeMat);
    shoeL.position.set(-0.16, 0.06, 0.05);
    this.teacherMesh.add(shoeL);
    const shoeR = new THREE.Mesh(shoeGeo, shoeMat);
    shoeR.position.set(0.16, 0.06, 0.05);
    this.teacherMesh.add(shoeR);

    // 2. Thân trên: Áo sơ mi trắng + Ghi-lê xanh Navy
    const torsoGeo = new THREE.CylinderGeometry(0.32, 0.3, 0.75, 18);
    const vestMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 }); // Xanh Navy
    const torso = new THREE.Mesh(torsoGeo, vestMat);
    torso.position.y = 1.05;
    torso.castShadow = true;
    this.teacherMesh.add(torso);

    // Áo sơ mi trắng cổ đứng ở giữa ngực
    const shirtGeo = new THREE.BoxGeometry(0.22, 0.7, 0.08);
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const shirt = new THREE.Mesh(shirtGeo, shirtMat);
    shirt.position.set(0, 1.05, 0.28);
    this.teacherMesh.add(shirt);

    // Cà vạt đỏ cam sang trọng
    const tieGeo = new THREE.BoxGeometry(0.08, 0.45, 0.04);
    const tieMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 });
    const tie = new THREE.Mesh(tieGeo, tieMat);
    tie.position.set(0, 1.08, 0.33);
    this.teacherMesh.add(tie);

    // Hai cánh tay
    const armGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.6, 12);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
    const handMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.4 });

    const armL = new THREE.Mesh(armGeo, armMat);
    armL.position.set(-0.42, 0.95, 0);
    armL.rotation.z = Math.PI / 16;
    this.teacherMesh.add(armL);
    const handL = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), handMat);
    handL.position.set(-0.45, 0.62, 0);
    this.teacherMesh.add(handL);

    const armR = new THREE.Mesh(armGeo, armMat);
    armR.position.set(0.42, 1.05, 0.15);
    armR.rotation.x = -Math.PI / 6;
    armR.rotation.z = -Math.PI / 12;
    this.teacherMesh.add(armR);
    const handR = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), handMat);
    handR.position.set(0.45, 0.8, 0.32);
    this.teacherMesh.add(handR);

    // Cây thước chỉ bảng (Pointer Rod) trên tay Thầy Tuấn
    const rodGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4, 12);
    const rodMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.3 });
    this.teacherRod = new THREE.Mesh(rodGeo, rodMat);
    this.teacherRod.position.set(0.55, 1.35, 0.45);
    this.teacherRod.rotation.z = -Math.PI / 5;
    this.teacherRod.rotation.x = Math.PI / 8;
    this.teacherMesh.add(this.teacherRod);

    // 3. Đầu Chibi Thầy Tuấn phong độ, phúc hậu
    const headGeo = new THREE.SphereGeometry(0.38, 20, 20);
    const head = new THREE.Mesh(headGeo, handMat);
    head.position.y = 1.62;
    head.castShadow = true;
    this.teacherMesh.add(head);

    // Gương mặt Thầy Tuấn ấm áp, tri thức sau tròng kính
    this.attachCurvedFace(head, 'teacher_tuan');

    // Mái tóc ngắn nam sinh / giáo viên rẽ ngôi lịch lãm
    const hairGeo = new THREE.SphereGeometry(0.41, 20, 20, 0, Math.PI * 2, 0, Math.PI / 1.85);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.y = 1.68;
    this.teacherMesh.add(hair);

    // Mái tóc rẽ ngôi 7/3 phía trước
    const bangsGeo = new THREE.BoxGeometry(0.35, 0.14, 0.15);
    const bangs = new THREE.Mesh(bangsGeo, hairMat);
    bangs.position.set(0.08, 1.9, 0.28);
    bangs.rotation.z = -0.15;
    this.teacherMesh.add(bangs);

    // Kính cận tri thức gọng xanh
    const glassesMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const lensL = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 8, 16), glassesMat);
    lensL.position.set(-0.14, 1.63, 0.36);
    this.teacherMesh.add(lensL);

    const lensR = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 8, 16), glassesMat);
    lensR.position.set(0.14, 1.63, 0.36);
    this.teacherMesh.add(lensR);

    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, 0.02), glassesMat);
    bridge.position.set(0, 1.63, 0.37);
    this.teacherMesh.add(bridge);

    // 4. Bảng tên 3D: "👨‍🏫 Thầy Tuấn (Lớp 5C4)"
    const nameCanvas = document.createElement('canvas');
    nameCanvas.width = 512;
    nameCanvas.height = 128;
    const nctx = nameCanvas.getContext('2d');
    nctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    nctx.roundRect(8, 8, 496, 112, 24);
    nctx.fill();
    nctx.strokeStyle = '#38bdf8';
    nctx.lineWidth = 6;
    nctx.stroke();
    nctx.fillStyle = '#bae6fd';
    nctx.font = 'bold 44px "Nunito", sans-serif';
    nctx.textAlign = 'center';
    nctx.fillText("👨‍🏫 Thầy Tuấn (Lớp 5C4)", 256, 75);

    const nameTex = new THREE.CanvasTexture(nameCanvas);
    const namePlate = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.48), new THREE.MeshBasicMaterial({ map: nameTex, transparent: true }));
    namePlate.position.set(0, 2.3, 0);
    this.teacherMesh.add(namePlate);

    // Dấu chấm than [!] vàng kim trên đầu Thầy Tuấn
    const exMark = this.createFloatingExclamationMark();
    exMark.position.set(0, 2.85, 0);
    this.teacherMesh.add(exMark);
    this.exclamationMarks.push(exMark);

    // Đặt Thầy Tuấn đứng trên bục giảng lớp 5C4 mở rộng
    this.teacherMesh.position.set(-4.5, 0.25, -6.8);
    if (this.schoolCampusGroup) {
      this.schoolCampusGroup.add(this.teacherMesh);
    } else {
      this.scene.add(this.teacherMesh);
    }

    // Đăng ký NPC Thầy Tuấn (đồng thời giữ alias co_lan để tương thích quest)
    this.npcs.push({
      id: 'co_lan',
      aliasId: 'thay_tuan',
      name: 'Thầy Tuấn',
      title: 'Giáo Viên Chủ Nhiệm 5C4',
      group: this.teacherMesh,
      worldPos: new THREE.Vector3(-4.5, 0.25, -6.8),
      radius: 3.2,
      prompt: 'Bấm [E] hoặc [F] để Nghe Thầy Tuấn Giảng Bài'
    });
  }

  // Alias tương thích ngược
  buildTeacherCoLan() {
    this.buildTeacherThayTuan();
  }

  // ============================================================
  // PET BÁM THEO BÉ HÀ MY (Corgi, Shiba, Mèo, Rồng Con)
  // ============================================================
  buildCompanionPet() {
    this.updatePet(this.currentPetType || 'pet_corgi');
  }

  updatePet(petId) {
    if (this.petMesh) {
      this.scene.remove(this.petMesh);
      this.petMesh = null;
    }
    this.currentPetType = petId;

    this.petMesh = new THREE.Group();

    if (petId === 'pet_shiba') {
      // Chó Shiba vàng
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 0.55), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
      body.position.y = 0.26;
      this.petMesh.add(body);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.3, 0.32), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
      head.position.set(0, 0.48, -0.28);
      this.petMesh.add(head);

      // Tai nhọn
      [-0.12, 0.12].forEach(ex => {
        const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.16, 4), new THREE.MeshStandardMaterial({ color: 0x92400e }));
        ear.position.set(ex, 0.7, -0.28);
        this.petMesh.add(ear);
      });

      this.petTail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.25, 8), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
      this.petTail.position.set(0, 0.4, 0.32);
      this.petTail.rotation.x = Math.PI / 4;
      this.petMesh.add(this.petTail);
    } else if (petId === 'pet_cat') {
      // Mèo Mướp Trắng Tai Hồng
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.5), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      body.position.y = 0.24;
      this.petMesh.add(body);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 14), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      head.position.set(0, 0.44, -0.25);
      this.petMesh.add(head);

      // Tai hồng
      [-0.12, 0.12].forEach(ex => {
        const ear = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.14, 4), new THREE.MeshStandardMaterial({ color: 0xf472b6 }));
        ear.position.set(ex, 0.62, -0.25);
        this.petMesh.add(ear);
      });

      this.petTail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      this.petTail.position.set(0, 0.38, 0.3);
      this.petTail.rotation.x = Math.PI / 3;
      this.petMesh.add(this.petTail);
    } else if (petId === 'pet_dragon') {
      // Bé Rồng Cầu Vồng Thần Thoại
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.32, 0.55), new THREE.MeshStandardMaterial({ color: 0x10b981 }));
      body.position.y = 0.45; // Bay lơ lửng
      this.petMesh.add(body);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.28, 0.35), new THREE.MeshStandardMaterial({ color: 0x10b981 }));
      head.position.set(0, 0.65, -0.32);
      this.petMesh.add(head);

      // Cặp cánh rồng nhỏ
      [-0.28, 0.28].forEach(wx => {
        const wing = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.25), new THREE.MeshBasicMaterial({ color: 0xa855f7, side: THREE.DoubleSide }));
        wing.position.set(wx, 0.65, 0);
        wing.rotation.y = wx > 0 ? 0.4 : -0.4;
        this.petMesh.add(wing);
      });

      this.petTail = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.4, 8), new THREE.MeshStandardMaterial({ color: 0x10b981 }));
      this.petTail.position.set(0, 0.45, 0.38);
      this.petTail.rotation.x = Math.PI / 2.5;
      this.petMesh.add(this.petTail);
    } else if (petId === 'pet_cloud') {
      // Bé Cân Đẩu Vân Chibi Bồng Bềnh Hoàng Kim
      const cloudGroup = new THREE.Group();
      cloudGroup.position.y = 0.45;

      const mainCloud = new THREE.Mesh(
        new THREE.SphereGeometry(0.35, 12, 12),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, emissive: 0xfef08a, emissiveIntensity: 0.35 })
      );
      mainCloud.scale.set(1.3, 0.7, 1.0);
      cloudGroup.add(mainCloud);

      // Cụm mây phồng xung quanh
      [[-0.22, 0.1, -0.15], [0.22, 0.1, -0.15], [-0.22, 0.1, 0.15], [0.22, 0.1, 0.15], [0, 0.2, 0]].forEach(([px, py, pz]) => {
        const pPuff = new THREE.Mesh(
          new THREE.SphereGeometry(0.22, 10, 10),
          new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfacc15, emissiveIntensity: 0.25 })
        );
        pPuff.position.set(px, py, pz);
        cloudGroup.add(pPuff);
      });

      // Mắt chibi đen tròn lấp lánh & má hồng
      [-0.12, 0.12].forEach(ex => {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), new THREE.MeshBasicMaterial({ color: 0x18181b }));
        eye.position.set(ex, 0.12, -0.32);
        cloudGroup.add(eye);
        const blush = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshBasicMaterial({ color: 0xf472b6 }));
        blush.position.set(ex * 1.5, 0.04, -0.3);
        cloudGroup.add(blush);
      });

      this.petMesh.add(cloudGroup);
      this.petTail = cloudGroup;
    } else if (petId === 'pet_phoenix') {
      // Phượng Hoàng Lửa Thần Thoại
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.5, 10), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xf97316, emissiveIntensity: 0.5 }));
      body.position.y = 0.45;
      body.rotation.x = Math.PI / 4;
      this.petMesh.add(body);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0xfacc15, emissiveIntensity: 0.4 }));
      head.position.set(0, 0.7, -0.22);
      this.petMesh.add(head);

      // Mỏ vàng
      const beak = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 4), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
      beak.rotation.x = -Math.PI / 2;
      beak.position.set(0, 0.68, -0.38);
      this.petMesh.add(beak);

      // Cánh phượng hoàng rực lửa
      [-0.26, 0.26].forEach(wx => {
        const wing = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.25), new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide }));
        wing.position.set(wx, 0.62, 0);
        wing.rotation.y = wx > 0 ? 0.4 : -0.4;
        this.petMesh.add(wing);
      });

      // Đuôi lửa dài
      this.petTail = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.12, 0.6, 6), new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xef4444, emissiveIntensity: 0.6 }));
      this.petTail.position.set(0, 0.35, 0.42);
      this.petTail.rotation.x = Math.PI / 3;
      this.petMesh.add(this.petTail);
    } else if (petId === 'pet_kitsune') {
      // Cửu Vĩ Hồ Ly (Cáo 9 Đuôi Chibi)
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.28, 0.5), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      body.position.y = 0.26;
      this.petMesh.add(body);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.28, 0.3), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      head.position.set(0, 0.46, -0.25);
      this.petMesh.add(head);

      // Tai cáo viền hồng
      [-0.12, 0.12].forEach(ex => {
        const ear = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.18, 4), new THREE.MeshStandardMaterial({ color: 0xf472b6 }));
        ear.position.set(ex, 0.68, -0.25);
        this.petMesh.add(ear);
      });

      // 9 chiếc đuôi xòe hình cánh quạt phát sáng cyan
      const tailsGroup = new THREE.Group();
      tailsGroup.position.set(0, 0.35, 0.28);
      for (let t = 0; t < 9; t++) {
        const tAng = (t - 4) * 0.18;
        const tail = new THREE.Mesh(
          new THREE.ConeGeometry(0.05, 0.45, 6),
          new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x38bdf8, emissiveIntensity: 0.4 })
        );
        tail.position.set(Math.sin(tAng) * 0.25, 0.15, Math.cos(tAng) * 0.1);
        tail.rotation.z = -tAng;
        tail.rotation.x = Math.PI / 3;
        tailsGroup.add(tail);
      }
      this.petMesh.add(tailsGroup);
      this.petTail = tailsGroup;
    } else if (petId === 'pet_robot') {
      // Robot Trợ Lý AI Chibi
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 14), new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.2 }));
      body.position.y = 0.45;
      this.petMesh.add(body);

      // Màn hình kính xanh
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.1), new THREE.MeshBasicMaterial({ color: 0x0284c7 }));
      visor.position.set(0, 0.48, -0.24);
      this.petMesh.add(visor);

      // Ăng-ten phát sóng
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.2, 6), new THREE.MeshStandardMaterial({ color: 0xfacc15 }));
      ant.position.set(0, 0.8, 0);
      this.petMesh.add(ant);

      const antLight = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      antLight.position.set(0, 0.92, 0);
      this.petMesh.add(antLight);

      this.petTail = antLight;
    } else if (petId === 'pet_unicorn') {
      // Kỳ Lân Cầu Vồng
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.32, 0.55), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      body.position.y = 0.3;
      this.petMesh.add(body);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.3, 0.32), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      head.position.set(0, 0.54, -0.28);
      this.petMesh.add(head);

      // Sừng xoắn vàng lấp lánh
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.32, 6), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.1 }));
      horn.position.set(0, 0.82, -0.32);
      horn.rotation.x = -0.2;
      this.petMesh.add(horn);

      // Đuôi cầu vồng
      this.petTail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.35, 8), new THREE.MeshStandardMaterial({ color: 0xf472b6 }));
      this.petTail.position.set(0, 0.42, 0.32);
      this.petTail.rotation.x = Math.PI / 4;
      this.petMesh.add(this.petTail);
    } else if (petId === 'pet_panda') {
      // Gấu Trúc Kungfu Tròn Xoe
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 14), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 }));
      body.position.y = 0.28;
      this.petMesh.add(body);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 }));
      head.position.set(0, 0.52, -0.22);
      this.petMesh.add(head);

      // Tai đen & mắt quầng đen
      [-0.15, 0.15].forEach(ex => {
        const ear = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0x18181b }));
        ear.position.set(ex, 0.74, -0.22);
        this.petMesh.add(ear);
        const eyePatch = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshStandardMaterial({ color: 0x18181b }));
        eyePatch.position.set(ex * 0.8, 0.55, -0.42);
        this.petMesh.add(eyePatch);
      });

      // Nhánh trúc xanh trong tay
      const bamboo = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.45, 6), new THREE.MeshStandardMaterial({ color: 0x22c55e }));
      bamboo.position.set(0.24, 0.35, -0.2);
      bamboo.rotation.z = -0.3;
      this.petMesh.add(bamboo);

      this.petTail = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshStandardMaterial({ color: 0x18181b }));
      this.petTail.position.set(0, 0.28, 0.32);
      this.petMesh.add(this.petTail);
    } else if (petId === 'pet_parrot') {
      // Vẹt Song Ngữ Thông Thái (Vẹt Đỏ Hoàng Gia)
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.45, 8), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      body.position.y = 0.38;
      body.rotation.x = Math.PI / 4;
      this.petMesh.add(body);

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      head.position.set(0, 0.62, -0.18);
      this.petMesh.add(head);

      // Mũ cử nhân tí hon
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.22), new THREE.MeshBasicMaterial({ color: 0x18181b }));
      cap.position.set(0, 0.78, -0.18);
      this.petMesh.add(cap);

      // Cánh vàng & xanh dương
      [-0.2, 0.2].forEach(wx => {
        const wing = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 0.3), new THREE.MeshStandardMaterial({ color: 0x3b82f6 }));
        wing.position.set(wx, 0.42, 0);
        this.petMesh.add(wing);
      });

      this.petTail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.04, 0.4), new THREE.MeshStandardMaterial({ color: 0xef4444 }));
      this.petTail.position.set(0, 0.3, 0.35);
      this.petTail.rotation.x = Math.PI / 4;
      this.petMesh.add(this.petTail);
    } else {
      // Mặc định: Chú Cún Corgi Vàng Chibi
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.32, 0.55), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
      body.position.y = 0.26;
      body.castShadow = true;
      this.petMesh.add(body);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.28, 0.3), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
      head.position.set(0, 0.45, -0.26);
      this.petMesh.add(head);

      [-0.14, 0.14].forEach(ex => {
        const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.16, 4), new THREE.MeshStandardMaterial({ color: 0xb45309 }));
        ear.position.set(ex, 0.66, -0.26);
        this.petMesh.add(ear);
      });

      this.petTail = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      this.petTail.position.set(0, 0.32, 0.3);
      this.petMesh.add(this.petTail);
    }

    this.petMesh.position.set(1.1, 0, 4.2);
    this.scene.add(this.petMesh);
  }

  // ============================================================
  // CẬP NHẬT TRANG PHỤC & PHỤ KIỆN BÉ HÀ MY 3D (AVATAR CUSTOMIZATION)
  // ============================================================
  updateOutfit(outfitId) {
    if (!this.studentMesh) return;

    if (outfitId === 'outfit_aodai') {
      // Đổi sang Áo Dài Trắng Nữ Sinh Tinh Khôi
      this.studentDressMeshes.forEach(mesh => {
        if (mesh.material) {
          mesh.material.color.setHex(0xffffff);
          mesh.material.roughness = 0.25;
        }
      });
      if (this.studentHatMesh) {
        // Đổi nón sang màu nón lá trắng ngà
        this.studentHatMesh.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.color.setHex(0xfef9c3);
          }
        });
      }
    } else if (outfitId === 'acc_crown') {
      // Gắn thêm Vương Miện Vàng Hoàng Gia
      if (!this.studentAccessories.crown) {
        const crownGroup = new THREE.Group();
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.2 });
        const band = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.32, 0.15, 16), goldMat);
        crownGroup.add(band);

        for (let j = 0; j < 5; j++) {
          const sp = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 8), goldMat);
          const ang = j * (Math.PI * 2 / 5);
          sp.position.set(Math.cos(ang) * 0.32, 0.18, Math.sin(ang) * 0.32);
          crownGroup.add(sp);
        }
        crownGroup.position.set(0, 1.62, 0);
        this.studentMesh.add(crownGroup);
        this.studentAccessories.crown = crownGroup;
      }
    } else if (outfitId === 'acc_wings') {
      // Gắn thêm Đôi Cánh Thiên Thần Phát Sáng
      if (!this.studentAccessories.wings) {
        const wingsGroup = new THREE.Group();
        const wingMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0x67e8f9,
          emissiveIntensity: 0.4,
          side: THREE.DoubleSide
        });
        [-0.38, 0.38].forEach(wx => {
          const wing = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.4), wingMat);
          wing.position.set(wx, 0.65, -0.28);
          wing.rotation.y = wx > 0 ? 0.35 : -0.35;
          wingsGroup.add(wing);
        });
        this.studentMesh.add(wingsGroup);
        this.studentAccessories.wings = wingsGroup;
      }
    } else if (outfitId === 'acc_glasses') {
      // Kính Cận Trí Tuệ Học Sinh Giỏi
      if (!this.studentAccessories.glasses) {
        const glassGroup = new THREE.Group();
        const rimMat = new THREE.MeshBasicMaterial({ color: 0xca8a04 });
        [-0.15, 0.15].forEach(gx => {
          const rim = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.015, 8, 16), rimMat);
          rim.position.set(gx, 1.15, 0.42);
          glassGroup.add(rim);
        });
        const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.02), rimMat);
        bridge.position.set(0, 1.15, 0.42);
        glassGroup.add(bridge);
        this.studentMesh.add(glassGroup);
        this.studentAccessories.glasses = glassGroup;
      }
    } else if (outfitId === 'acc_backpack') {
      // Balo Khủng Long Xanh Mini
      if (!this.studentAccessories.backpack) {
        const bpGroup = new THREE.Group();
        const bagMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
        const bag = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.42, 0.22), bagMat);
        bag.position.set(0, 0.62, -0.28);
        bpGroup.add(bag);

        // Vảy khủng long cam
        for (let s = 0; s < 3; s++) {
          const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 4), new THREE.MeshStandardMaterial({ color: 0xf97316 }));
          spike.position.set(0, 0.75 - s * 0.12, -0.4);
          spike.rotation.x = -Math.PI / 2;
          bpGroup.add(spike);
        }
        this.studentMesh.add(bpGroup);
        this.studentAccessories.backpack = bpGroup;
      }
    } else if (outfitId === 'outfit_wukong') {
      // Giáp Kim Cô Tề Thiên Đại Thánh (Vàng Hoàng Kim, Áo Choàng Đỏ)
      this.studentDressMeshes.forEach(mesh => {
        if (mesh.material) {
          mesh.material.color.setHex(0xfacc15);
          mesh.material.metalness = 0.6;
          mesh.material.roughness = 0.25;
        }
      });
      if (this.studentHatMesh) {
        this.studentHatMesh.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.color.setHex(0xb91c1c);
          }
        });
      }
    } else if (outfitId === 'outfit_fairy') {
      // Y Phục Tiên Nữ Mây Bồng Bềnh (Lụa Hồng Pastel & Xanh Ngọc)
      this.studentDressMeshes.forEach((mesh, idx) => {
        if (mesh.material) {
          mesh.material.color.setHex(idx === 0 ? 0xfbcfe8 : 0xa5f3fc);
          mesh.material.roughness = 0.2;
        }
      });
      if (this.studentHatMesh) {
        this.studentHatMesh.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.color.setHex(0xfdf2f8);
          }
        });
      }
    } else if (outfitId === 'outfit_cyber_suit') {
      // Bộ Giáp Neon Cyber Slay 2026 (Neon Xanh & Tím Tương Lai)
      this.studentDressMeshes.forEach((mesh, idx) => {
        if (mesh.material) {
          mesh.material.color.setHex(idx === 0 ? 0x0f172a : 0x06b6d4);
          mesh.material.metalness = 0.8;
          mesh.material.roughness = 0.2;
        }
      });
      if (this.studentHatMesh) {
        this.studentHatMesh.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.color.setHex(0xd946ef);
          }
        });
      }
    } else if (outfitId === 'outfit_princess') {
      // Đầm Dạ Hội Công Chúa Cổ Tích (Tím Hoàng Gia Lấp Lánh)
      this.studentDressMeshes.forEach(mesh => {
        if (mesh.material) {
          mesh.material.color.setHex(0xc084fc);
          mesh.material.roughness = 0.2;
        }
      });
      if (this.studentHatMesh) {
        this.studentHatMesh.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.color.setHex(0xf3e8ff);
          }
        });
      }
    } else if (outfitId === 'outfit_ninja') {
      // Trang Phục Ninja Bóng Đêm (Đen Huyền Bí, Băng Đỏ)
      this.studentDressMeshes.forEach(mesh => {
        if (mesh.material) {
          mesh.material.color.setHex(0x1e293b);
          mesh.material.roughness = 0.8;
        }
      });
      if (this.studentHatMesh) {
        this.studentHatMesh.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.color.setHex(0xef4444);
          }
        });
      }
    } else if (outfitId === 'outfit_wizard') {
      // Áo Choàng Pháp Sư Tinh Tú (Xanh Đêm Sao Vàng)
      this.studentDressMeshes.forEach((mesh, idx) => {
        if (mesh.material) {
          mesh.material.color.setHex(idx === 0 ? 0x1e1b4b : 0xfacc15);
          mesh.material.roughness = 0.3;
        }
      });
      if (this.studentHatMesh) {
        this.studentHatMesh.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.color.setHex(0x312e81);
          }
        });
      }
    } else {
      // Về trang phục mặc định
      this.studentDressMeshes.forEach((mesh, idx) => {
        if (mesh.material) {
          mesh.material.color.setHex(idx === 0 ? 0xf97316 : 0xffffff);
        }
      });
      if (this.studentHatMesh) {
        this.studentHatMesh.traverse(child => {
          if (child.isMesh && child.material) {
            child.material.color.setHex(0xfef08a);
          }
        });
      }
    }
  }

  // ============================================================
  // CAMERA CONTROLLER: MOUSE LOOK / ORBIT CONTROLS & ZOOM
  // ============================================================
  setupMouseOrbitControls() {
    if (!this.renderer || !this.renderer.domElement) return;
    const canvas = this.renderer.domElement;

    // Ngăn chặn menu chuột phải trên canvas để kéo rê chuột phải nhìn xung quanh mượt mà
    canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    window.addEventListener('contextmenu', (e) => {
      if (e.target && e.target.tagName === 'CANVAS') e.preventDefault();
    });

    const startDrag = (clientX, clientY) => {
      this.isMouseDown = true;
      this.lastMouseX = clientX;
      this.lastMouseY = clientY;
      this.dragDistance = 0;
    };

    const moveDrag = (clientX, clientY) => {
      if (!this.isMouseDown) return;

      const deltaX = clientX - this.lastMouseX;
      const deltaY = clientY - this.lastMouseY;
      this.dragDistance += Math.abs(deltaX) + Math.abs(deltaY);

      const rotateSpeed = 0.0055;
      this.cameraYaw -= deltaX * rotateSpeed;
      // Rê chuột lên / xuống để chỉnh độ cao góc nhìn (Pitch)
      this.cameraPitch += deltaY * rotateSpeed;
      this.cameraPitch = Math.max(this.minPitch, Math.min(this.maxPitch, this.cameraPitch));

      this.lastMouseX = clientX;
      this.lastMouseY = clientY;
    };

    const endDrag = () => {
      this.isMouseDown = false;
    };

    canvas.addEventListener('mousedown', (e) => {
      startDrag(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      moveDrag(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', endDrag);

    // Hỗ trợ cảm ứng vuốt xoay Camera 3D trên màn hình iPhone / iPad
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1) {
        moveDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', endDrag);

    // Zoom xa gần bằng con lăn chuột
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.005;
      this.cameraDistance += zoomFactor;
      this.cameraDistance = Math.max(this.minDistance, Math.min(this.maxDistance, this.cameraDistance));
    }, { passive: false });
  }

  setupMouseRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouseCoord = new THREE.Vector2();

    this.onCanvasClick = (e) => {
      if (this.dragDistance > 10) return;
      if (this.selectionLocked) return;

      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouseCoord, this.camera);

      // 1. Kiểm tra bấm trúng NPC
      for (let i = 0; i < this.npcs.length; i++) {
        const npc = this.npcs[i];
        const hits = this.raycaster.intersectObjects(npc.group.children, true);
        if (hits.length > 0) {
          this.triggerNPCAction(npc);
          return;
        }
      }

      // 2. Kiểm tra click vào bục đáp án
      for (let i = 0; i < this.pads.length; i++) {
        const pad = this.pads[i];
        const hits = this.raycaster.intersectObjects(pad.mesh.children, true);
        if (hits.length > 0) {
          this.studentMesh.position.x = pad.x;
          this.studentMesh.position.z = pad.z;
          this.standingPadIndex = i;

          if (this.onSelectCallback) {
            this.selectionLocked = true;
            this.isJumping = true;
            this.jumpVelocity = 0.28;
            pad.mesh.position.y = -0.15;
            setTimeout(() => { pad.mesh.position.y = 0; }, 180);
            this.onSelectCallback(i, pad.opt);
          }
          return;
        }
      }
    };

    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.addEventListener('click', this.onCanvasClick);
    }
  }

  setupKeyboardControls() {
    this.keyDownHandler = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (this.selectionLocked && !this.isCityDrivingMode) return;

      const code = e.code;
      const key = (e.key || '').toLowerCase();

      // Bắt cả mã phím vật lý e.code lẫn các biến thể tiếng Việt do Unikey Telex/VNI sinh ra
      if (code === 'KeyW' || key === 'w' || key === 'ư' || code === 'ArrowUp' || key === 'arrowup') {
        this.keys.forward = true;
      } else if (code === 'KeyS' || key === 's' || code === 'ArrowDown' || key === 'arrowdown') {
        this.keys.backward = true;
      } else if (code === 'KeyA' || key === 'a' || key === 'â' || key === 'ă' || key === 'á' || key === 'à' || code === 'ArrowLeft' || key === 'arrowleft') {
        this.keys.left = true;
      } else if (code === 'KeyD' || key === 'd' || key === 'đ' || code === 'ArrowRight' || key === 'arrowright') {
        this.keys.right = true;
      }

      // Phím E hoặc F: Tương tác NPC / Hồ Câu / Nhận Nhiệm Vụ
      if (code === 'KeyE' || key === 'e' || key === 'ê' || code === 'KeyF' || key === 'f') {
        this.triggerInteractionKey();
      }

      // Phím C: Xoay đổi góc nhìn Camera xem mặt Bé Hà My
      if (code === 'KeyC' || key === 'c') {
        this.toggleCameraHeroView();
      }

      // Phím T: Dịch chuyển tức thời đến mục tiêu nhiệm vụ ("Dắt Mũi" Navigation)
      if (code === 'KeyT' || key === 't') {
        this.teleportToQuestTarget();
      }

      if (code === 'Space' || key === ' ') {
        e.preventDefault();
        this.triggerSpaceAction();
      }
      if (code === 'ShiftLeft' || code === 'ShiftRight') {
        this.keys.shift = true;
      }
    };

    this.keyUpHandler = (e) => {
      const code = e.code;
      const key = (e.key || '').toLowerCase();

      if (code === 'ShiftLeft' || code === 'ShiftRight') {
        this.keys.shift = false;
      }

      // Nhả phím: Xử lý toàn diện mọi biến thể ký tự Unikey sinh ra (w->ư, a->â/ă/á/à, d->đ, s)
      if (code === 'KeyW' || key === 'w' || key === 'ư' || code === 'ArrowUp' || key === 'arrowup') {
        this.keys.forward = false;
      }
      if (code === 'KeyS' || key === 's' || code === 'ArrowDown' || key === 'arrowdown') {
        this.keys.backward = false;
      }
      if (code === 'KeyA' || key === 'a' || key === 'â' || key === 'ă' || key === 'á' || key === 'à' || code === 'ArrowLeft' || key === 'arrowleft') {
        this.keys.left = false;
      }
      if (code === 'KeyD' || key === 'd' || key === 'đ' || code === 'ArrowRight' || key === 'arrowright') {
        this.keys.right = false;
      }
    };

    this.windowBlurHandler = () => {
      this.resetKeys();
    };

    this.pointerDownHandler = () => {
      // Khi bấm chuột vào màn hình, reset các phím di chuyển nếu người chơi không chủ động nhấn
      this.lastKeyTime = Date.now();
    };

    window.addEventListener('keydown', this.keyDownHandler);
    window.addEventListener('keyup', this.keyUpHandler);
    window.addEventListener('blur', this.windowBlurHandler);
    window.addEventListener('pointerdown', this.pointerDownHandler);
    document.addEventListener('visibilitychange', this.windowBlurHandler);
  }

  // Chuyển đổi giữa góc nhìn sau lưng (đi lại) và góc nhìn chính diện (ngắm Bé Hà My)
  toggleCameraHeroView() {
    if (Math.abs(this.cameraYaw) < 0.8) {
      // Đang nhìn từ phía sau -> Quay 180 độ ra trước mặt ngắm nụ cười và khuôn mặt HD của bé
      this.cameraYaw = Math.PI;
      this.cameraDistance = 4.2;
      this.cameraPitch = 0.18;
    } else {
      // Đang nhìn trước mặt -> Trở về góc nhìn sau lưng theo sau để dễ đi lại
      this.cameraYaw = 0;
      this.cameraDistance = 6.2;
      this.cameraPitch = 0.22;
    }
  }

  triggerInteractionKey() {
    if (this.nearbyTarget) {
      if (this.nearbyTarget.type === 'npc' && this.onNPCInteractCallback) {
        this.onNPCInteractCallback(this.nearbyTarget.npc);
      } else if (this.nearbyTarget.type === 'fishing' && this.onFishingSpotCallback) {
        this.onFishingSpotCallback();
      } else if (this.nearbyTarget.type === 'flagpole' && this.onFlagpoleCallback) {
        this.onFlagpoleCallback();
      } else if (this.nearbyTarget.type === 'soccer_penalty' && this.onSoccerPenaltyCallback) {
        this.onSoccerPenaltyCallback();
      } else if (this.nearbyTarget.type === 'library' && this.onLibraryCallback) {
        this.onLibraryCallback();
      } else if (this.nearbyTarget.type === 'boss_battle' && this.onBossBattleCallback) {
        this.onBossBattleCallback();
      } else if (this.nearbyTarget.type === 'botanical_garden' && this.onBotanicalGardenCallback) {
        this.onBotanicalGardenCallback();
      } else if (this.nearbyTarget.type === 'basketball' && this.onBasketballCallback) {
        this.onBasketballCallback();
      } else if (this.nearbyTarget.type === 'honor_roll' && this.onHonorRollCallback) {
        this.onHonorRollCallback();
      } else if (this.nearbyTarget.type === 'bunny_sanctuary' && this.onBunnySanctuaryCallback) {
        this.onBunnySanctuaryCallback();
      } else if (this.nearbyTarget.type === 'vending_machine' && this.onVendingMachineCallback) {
        this.onVendingMachineCallback();
      } else if (this.nearbyTarget.type === 'photo_booth' && this.onPhotoBoothCallback) {
        this.onPhotoBoothCallback();
      } else if (this.nearbyTarget.type === 'reading_nook' && this.onReadingNookCallback) {
        this.onReadingNookCallback();
      } else if (this.nearbyTarget.type === 'school_drum' && this.onSchoolDrumCallback) {
        this.onSchoolDrumCallback();
      } else if (this.nearbyTarget.type === 'folk_game' && this.onFolkGameCallback) {
        this.onFolkGameCallback();
      } else if (this.nearbyTarget.type === 'school_gate_exit') {
        const now = Date.now();
        if (!this.gateTransitionCooldown || now - this.gateTransitionCooldown > 2500) {
          this.gateTransitionCooldown = now;
          if (window.CityCommuteInstance && typeof window.CityCommuteInstance.activateCityModeFromGate === 'function') {
            window.CityCommuteInstance.gateTransitionCooldown = now;
            window.CityCommuteInstance.activateCityModeFromGate(this.studentMesh ? this.studentMesh.position.x : 0, 55.4);
          } else if (typeof window.enterViceCityMode === 'function') {
            window.enterViceCityMode(0);
          }
        }
      }
    }
  }

  triggerSpaceAction() {
    // 0. Nếu đang ở ngoại cảnh City Commute ngoài cổng trường và đang đi bộ
    if (this.isCityDrivingMode && window.CityCommuteInstance) {
      if (!window.CityCommuteInstance.isMounted && typeof window.CityCommuteInstance.triggerWalkingJump === 'function') {
        window.CityCommuteInstance.triggerWalkingJump();
        return;
      }
    }

    // 1. Nếu đang đứng trên một bục đáp án trong lớp học -> Chốt chọn đáp án đó và nhún nhảy
    if (this.standingPadIndex >= 0 && !this.selectionLocked) {
      const pad = this.pads[this.standingPadIndex];
      if (pad && this.onSelectCallback) {
        this.isJumping = true;
        this.jumpVelocity = 0.28;
        pad.mesh.position.y = -0.15;
        setTimeout(() => { pad.mesh.position.y = 0; }, 180);

        this.onSelectCallback(this.standingPadIndex, pad.opt);
        return;
      }
    }

    // 2. MỌI TRƯỜNG HỢP CÒN LẠI: PHÍM SPACE DÀNH RIÊNG 100% CHO VIỆC NHẢY (JUMP / PARKOUR)!
    // Hỗ trợ Coyote Time (nhảy ngay sau khi vừa rời mép bục) và Jump Buffering (đệm phím nhảy trước khi chạm đất)
    if (!this.isJumping || (this.coyoteFrames && this.coyoteFrames > 0)) {
      this.isJumping = true;
      this.jumpVelocity = 0.32 * this.jumpMultiplier;
      this.coyoteFrames = 0;
      this.jumpBufferFrames = 0;
    } else {
      this.jumpBufferFrames = 10; // Đệm phím ~160ms
    }
  }

  triggerNPCAction(npc) {
    if (this.onNPCInteractCallback) {
      this.onNPCInteractCallback(npc);
    }
  }

  // ============================================================
  // ACTIONS KHI TRẢ LỜI ĐÚNG / SAI
  // ============================================================
  jumpToPad(padIndex) {
    if (!this.pads[padIndex]) return;
    this.resetKeys(); // Xóa sạch mọi phím bấm đang lưu trữ, ngăn avatar tự động di chuyển!
    this.selectionLocked = true;
    const target = this.pads[padIndex];
    this.studentMesh.position.x = target.x;
    this.studentMesh.position.z = target.z;
    this.isJumping = true;
    this.jumpVelocity = 0.35;

    target.mesh.position.y = -0.15;
    setTimeout(() => { target.mesh.position.y = 0; }, 180);
  }

  playVictoryCelebration() {
    this.isDancing = true;
    this.isConfused = false;
    this.selectionLocked = true;
    this.createFireworksParticles();

    if (this.teacherRod) {
      this.teacherRod.rotation.z = -Math.PI / 2;
      setTimeout(() => {
        if (this.teacherRod) this.teacherRod.rotation.z = -Math.PI / 4;
      }, 2500);
    }

    setTimeout(() => {
      this.isDancing = false;
      this.selectionLocked = false;
    }, 2800);
  }

  playConfusionAnimation() {
    this.isConfused = true;
    this.isDancing = false;
    this.selectionLocked = true;

    if (this.studentMesh) {
      const startRot = this.studentMesh.rotation.y;
      let count = 0;
      const shakeInterval = setInterval(() => {
        count++;
        this.studentMesh.rotation.y = startRot + (count % 2 === 0 ? 0.35 : -0.35);
        if (count >= 6) {
          clearInterval(shakeInterval);
          this.studentMesh.rotation.y = startRot;
          this.isConfused = false;
          this.selectionLocked = false;
        }
      }, 100);
    }
  }

  createFireworksParticles() {
    if (!this.studentMesh) return;
    const origin = this.studentMesh.position.clone();
    origin.y += 1.6;

    const colors = [0xfacc15, 0xec4899, 0x38bdf8, 0x4ade80, 0xa855f7, 0xf97316];
    const particleGeo = new THREE.SphereGeometry(0.12, 8, 8);

    for (let i = 0; i < 48; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: colors[i % colors.length] });
      const p = new THREE.Mesh(particleGeo, mat);
      p.position.copy(origin);

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.09 + Math.random() * 0.14;
      const up = 0.12 + Math.random() * 0.18;

      this.scene.add(p);
      this.particles.push({
        mesh: p,
        vx: Math.cos(angle) * speed,
        vy: up,
        vz: Math.sin(angle) * speed,
        life: 1.0
      });
    }
  }

  // ============================================================
  // MAIN GAME LOOP (Physics, Movement, Follow Camera, Emotes)
  // ============================================================
  animate() {
    this.animId = requestAnimationFrame(this.animate);

    // KHI ĐANG Ở CHẾ ĐỘ THẾ GIỚI MỞ THÀNH PHỐ (GTA VICE CITY & STREET VIEW)
    // Toàn quyền điều khiển Camera và Vật lý thuộc về CityCommuteManager
    if (this.isCityDrivingMode) {
      if (window.CityCommuteInstance && typeof window.CityCommuteInstance.update === 'function') {
        try {
          window.CityCommuteInstance.update();
        } catch (cityErr) {
          console.error("CityCommuteInstance update error:", cityErr);
        }
      }
      if (this.navArrowGroup) this.navArrowGroup.visible = false;
      if (this.beaconBeamGroup) this.beaconBeamGroup.visible = false;
      if (this.schoolCampusGroup && !this.schoolCampusGroup.visible) {
        this.schoolCampusGroup.visible = true;
      }
      if (this.groundMesh && !this.groundMesh.visible) {
        this.groundMesh.visible = true;
      }
      if (this.skyDome) {
        this.skyDome.visible = true;
        if (this.camera) this.skyDome.position.copy(this.camera.position);
      }
      if (this.sunGroup) {
        this.sunGroup.visible = true;
        if (this.camera) {
          this.sunGroup.position.set(this.camera.position.x + 120, this.camera.position.y + 160, this.camera.position.z + 120);
        }
      }
      if (this.scene && (!this.scene.background || this.scene.background.getHex() !== 0x38bdf8)) {
        this.scene.background = new THREE.Color(0x38bdf8);
      }
      const isMounted = !!(window.CityCommuteInstance && window.CityCommuteInstance.isMounted);
      if (this.studentMesh) {
        this.studentMesh.visible = !isMounted;
      }
      try {
        this.renderer.render(this.scene, this.camera);
      } catch (renderErr) {
        console.error("Three.js render error in City Driving Mode:", renderErr);
      }
      return;
    }

    // 1. TÍNH TOÁN VECTOR ĐIỀU KHIỂN TỪ PHÍM BẤM
    let forwardInput = 0;
    let strafeInput = 0;

    if (this.keys.forward) forwardInput += 1;
    if (this.keys.backward) forwardInput -= 1;
    if (this.keys.left) strafeInput -= 1;
    if (this.keys.right) strafeInput += 1;

    const isMoving = (forwardInput !== 0 || strafeInput !== 0) && !this.selectionLocked;

    let targetVx = 0;
    let targetVz = 0;

    if (isMoving) {
      const inputLen = Math.hypot(forwardInput, strafeInput);
      const normF = forwardInput / inputLen;
      const normS = strafeInput / inputLen;

      const forwardX = -Math.sin(this.cameraYaw);
      const forwardZ = -Math.cos(this.cameraYaw);
      const rightX = Math.cos(this.cameraYaw);
      const rightZ = -Math.sin(this.cameraYaw);

      const moveDirX = normF * forwardX + normS * rightX;
      const moveDirZ = normF * forwardZ + normS * rightZ;

      const isSprint = !!this.keys.shift;
      const baseSpeed = isSprint ? 0.35 : this.playerSpeed;
      const actualSpeed = baseSpeed * this.speedMultiplier;
      targetVx = moveDirX * actualSpeed;
      targetVz = moveDirZ * actualSpeed;
    }

    // 2. KHỬ GIẬT & ĐỒNG BỘ ĐỘNG LƯỢNG (SMOOTH INERTIA, MOMENTUM & AIR CONTROL)
    if (this.playerVx === undefined) this.playerVx = 0;
    if (this.playerVz === undefined) this.playerVz = 0;

    if (!this.isJumping) {
      // Trên mặt đất: Gia tốc nhanh êm, dừng lại có ma sát tự nhiên mượt mà
      const accel = isMoving ? 0.45 : 0.42;
      this.playerVx += (targetVx - this.playerVx) * accel;
      this.playerVz += (targetVz - this.playerVz) * accel;
    } else {
      // Trên không (khi đang nhảy Parkour): Bảo toàn trọn vẹn quán tính, đồng thời cho phép bẻ lái trên không mượt mà
      const airAccel = isMoving ? 0.28 : 0.06;
      this.playerVx += (targetVx - this.playerVx) * airAccel;
      this.playerVz += (targetVz - this.playerVz) * airAccel;
    }

    if (Math.abs(this.playerVx) < 0.0008) this.playerVx = 0;
    if (Math.abs(this.playerVz) < 0.0008) this.playerVz = 0;

    // 3. JUMP BUFFERING & COYOTE TIME (HỖ TRỢ NHẢY LIÊN HOÀN CẦU THANG SIÊU MƯỢT)
    if (this.jumpBufferFrames === undefined) this.jumpBufferFrames = 0;
    if (this.coyoteFrames === undefined) this.coyoteFrames = 0;

    if (!this.isJumping) {
      this.coyoteFrames = 8; // Reset thời gian ân hạn coyote khi đang ở mặt đất/bục
    } else {
      if (this.coyoteFrames > 0) this.coyoteFrames--;
    }

    if (this.jumpBufferFrames > 0) {
      if (!this.isJumping || this.coyoteFrames > 0) {
        this.isJumping = true;
        this.jumpVelocity = 0.32 * this.jumpMultiplier;
        this.jumpBufferFrames = 0;
        this.coyoteFrames = 0;
      } else {
        this.jumpBufferFrames--;
      }
    }

    // 4. DI CHUYỂN NGANG VỚI HỆ THỐNG TRƯỢT TƯỜNG & CHỐNG XUYÊN VẬT THỂ (WALL SLIDING & ANTI-CLIP)
    const playerRadius = 0.42;
    const feetY = this.playerBaseY;
    const headY = feetY + 1.4;

    // A. Xử lý di chuyển trục X trước
    if (this.playerVx !== 0) {
      let targetX = this.studentMesh.position.x + this.playerVx;
      targetX = Math.max(-1000.0, Math.min(150.0, targetX));
      const colX = this.resolveHorizontalCollision(targetX, this.studentMesh.position.z, feetY, headY, playerRadius);
      if (Math.abs(colX.x - targetX) > 0.001) {
        this.playerVx = 0; // Chặn va chạm trục X
      }
      this.studentMesh.position.x = colX.x;
    }

    // B. Xử lý di chuyển trục Z sau
    if (this.playerVz !== 0) {
      let targetZ = this.studentMesh.position.z + this.playerVz;
      targetZ = Math.max(-400.0, Math.min(150.0, targetZ));
      const colZ = this.resolveHorizontalCollision(this.studentMesh.position.x, targetZ, feetY, headY, playerRadius);
      if (Math.abs(colZ.z - targetZ) > 0.001) {
        this.playerVz = 0; // Chặn va chạm trục Z
      }
      this.studentMesh.position.z = colZ.z;
    }

    // Tự do bước từ sân trường ra ngoài phố Trần Quốc Tuấn qua cổng trường (Z >= 53.6, |X| <= 6.5)
    if (!this.isCityDrivingMode && this.studentMesh && this.studentMesh.position.z >= 53.6 && Math.abs(this.studentMesh.position.x) <= 6.5) {
      const now = Date.now();
      if (!this.gateTransitionCooldown || now - this.gateTransitionCooldown > 2500) {
        this.gateTransitionCooldown = now;
        if (window.CityCommuteInstance && typeof window.CityCommuteInstance.activateCityModeFromGate === 'function') {
          window.CityCommuteInstance.gateTransitionCooldown = now;
          window.CityCommuteInstance.activateCityModeFromGate(this.studentMesh.position.x, 56.5);
        } else if (typeof window.enterViceCityModeFromGate === 'function') {
          window.enterViceCityModeFromGate(this.studentMesh.position.x, 56.5);
        }
      }
    }

    // C. Xoay góc nhìn nhân vật mượt mà theo hướng di chuyển thực tế
    const currentSpeed = Math.hypot(this.playerVx, this.playerVz);
    if (currentSpeed > 0.01) {
      const targetAngle = Math.atan2(this.playerVx, this.playerVz);
      let diff = targetAngle - this.studentMesh.rotation.y;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.studentMesh.rotation.y += diff * 0.35;

      this.walkCycle += 0.22;

      // Âm thanh bước chân chân thực theo bề mặt tiếp xúc (Dynamic Physical Footsteps)
      const currentStepHit = Math.floor(this.walkCycle / Math.PI);
      if (currentStepHit !== this.lastFootstepCycle && !this.isJumping) {
        this.lastFootstepCycle = currentStepHit;
        let surface = 'grass';
        const curX = this.playerPos.x;
        const curZ = this.playerPos.z;
        const curY = this.playerBaseY;

        if (curY > 0.8) {
          surface = 'wood';
        } else if (curZ <= 18.2 && Math.abs(curX) <= 15.2) {
          surface = 'marble';
        } else if (Math.abs(curX) <= 3.8 && curZ >= 18.0 && curZ <= 54.0) {
          surface = 'stone';
        } else if (Math.abs(curZ - 23.0) <= 2.5 && Math.abs(curX) <= 26.0) {
          surface = 'stone';
        } else if (Math.abs(curX) <= 24.0 && curZ >= 18.0 && curZ <= 45.0) {
          surface = 'brick';
        } else {
          surface = 'grass';
        }

        if (typeof window !== 'undefined' && window.ChipGameInstance && window.ChipGameInstance.sound && window.ChipGameInstance.sound.playFootstep) {
          window.ChipGameInstance.sound.playFootstep(surface);
        }
      }

      if (this.studentLegL && this.studentLegR) {
        this.studentLegL.rotation.x = Math.sin(this.walkCycle) * 0.65;
        this.studentLegR.rotation.x = -Math.sin(this.walkCycle) * 0.65;
      }
      if (this.studentArmL && this.studentArmR) {
        this.studentArmL.rotation.x = -0.35 + Math.sin(this.walkCycle) * 0.12;
        this.studentArmR.rotation.x = -0.28 + Math.sin(this.walkCycle) * 0.35;
      }
      if (this.studentTasselL && this.studentTasselR) {
        this.studentTasselL.rotation.z = Math.sin(this.walkCycle) * 0.25;
        this.studentTasselR.rotation.z = -Math.sin(this.walkCycle) * 0.25;
      }
      this.isWalking = true;
    } else {
      if (this.studentLegL && this.studentLegR) {
        this.studentLegL.rotation.x = 0;
        this.studentLegR.rotation.x = 0;
      }
      if (this.studentArmL && this.studentArmR) {
        this.studentArmL.rotation.x = -0.35;
        this.studentArmR.rotation.x = -0.28;
      }
      if (this.studentTasselL && this.studentTasselR) {
        this.studentTasselL.rotation.z = 0;
        this.studentTasselR.rotation.z = 0;
      }
      this.isWalking = false;
    }

    // 5. VẬT LÝ ĐỨNG TRÊN BỤC, BẬC THANG & RƠI TỰ DO (PLATFORM STANDING & GRAVITY)
    const px = this.studentMesh.position.x;
    const pz = this.studentMesh.position.z;
    let highestFloor = 0;
    let standPlat = null;

    for (let i = 0; i < this.solidPlatforms.length; i++) {
      const plat = this.solidPlatforms[i];
      if (plat.isWall) continue; // Tường thẳng đứng không phải là sàn đứng

      // Kiểm tra độ phủ bàn chân (foot radius)
      if (Math.abs(px - plat.worldX) <= (plat.halfW + 0.15) && Math.abs(pz - plat.worldZ) <= (plat.halfD + 0.15)) {
        if (this.playerBaseY >= plat.topY - 0.45) {
          if (plat.topY > highestFloor) {
            highestFloor = plat.topY;
            standPlat = plat;
          }
        }
      }
    }

    // Bệ Phóng Lò Xo Trampoline Bật Nhảy Siêu Cao (Spring Pad Bounce Physics)
    if (standPlat && standPlat.isSpring && !this.springCooldown) {
      this.isJumping = true;
      this.jumpVelocity = standPlat.springPower || 0.65;
      this.springCooldown = true;
      setTimeout(() => { this.springCooldown = false; }, 380);
      this.createSpringJumpSparkles(standPlat.worldX, standPlat.topY, standPlat.worldZ);
      if (typeof window !== 'undefined' && window.ChipGameInstance && window.ChipGameInstance.sound) {
        window.ChipGameInstance.sound.playCorrect();
      }
    }

    // Cổng Mây Dịch Chuyển Tức Thời (Cloud Portal Pad)
    if (standPlat && standPlat.isTeleport && standPlat.teleportTo && !this.teleportCooldown) {
      this.teleportCooldown = true;
      setTimeout(() => { this.teleportCooldown = false; }, 1200);
      const dest = standPlat.teleportTo;
      this.teleportTo(dest.x, dest.z, dest.label || '');
      this.playerBaseY = dest.y !== undefined ? dest.y : 0;
      if (this.studentMesh) this.studentMesh.position.y = this.playerBaseY;
    }

    if (this.isJumping) {
      this.playerBaseY += this.jumpVelocity;
      this.jumpVelocity -= 0.018;

      if (this.playerBaseY <= highestFloor) {
        this.playerBaseY = highestFloor;
        this.isJumping = false;
        this.jumpVelocity = 0;
      }
    } else {
      if (this.playerBaseY > highestFloor + 0.15) {
        // Vừa bước hụt khỏi mép bục -> Bắt đầu rơi tự do
        this.isJumping = true;
        this.jumpVelocity = 0;
      } else if (highestFloor > this.playerBaseY) {
        // Tự động bước lên các gờ/bậc thang thấp (chênh lệch <= 0.45m) êm ái
        this.playerBaseY += (highestFloor - this.playerBaseY) * 0.55;
        if (Math.abs(highestFloor - this.playerBaseY) < 0.02) {
          this.playerBaseY = highestFloor;
        }
      } else {
        this.playerBaseY = highestFloor;
      }
    }

    // Emotes / Breathing / Walking Bobbing
    const bobbing = this.isDancing
      ? Math.abs(Math.sin(Date.now() * 0.01)) * 0.45
      : (this.isConfused
        ? 0
        : (this.isWalking && !this.isJumping
          ? Math.abs(Math.sin(this.walkCycle * 2)) * 0.06
          : (this.isJumping ? 0 : Math.sin(Date.now() * 0.003) * 0.02)));

    this.studentMesh.position.y = this.playerBaseY + bobbing;

    // Đôi cánh vỗ nhẹ nếu có
    if (this.studentAccessories.wings) {
      const wingFlap = Math.sin(Date.now() * 0.008) * 0.35;
      this.studentAccessories.wings.children.forEach((w, idx) => {
        w.rotation.y = (idx === 0 ? -0.35 : 0.35) + (idx === 0 ? -wingFlap : wingFlap);
      });
    }

    // Hiệu ứng cờ đỏ sao vàng bay phấp phới trong gió
    if (this.vietnamFlag) {
      this.vietnamFlag.rotation.y = Math.sin(Date.now() * 0.0035) * 0.14;
    }

    // Hoạt ảnh đài phun nước: Cột nước nhấp nhô, tia nước phun tỏa cầu vồng, sóng gợn
    if (this.fountainWater) {
      this.fountainWater.rotation.y += 0.008;
    }
    if (this.fountainSpoutMesh) {
      this.fountainSpoutMesh.scale.y = 1.0 + Math.sin(Date.now() * 0.009) * 0.22;
      this.fountainSpoutMesh.scale.x = 1.0 + Math.cos(Date.now() * 0.007) * 0.12;
      this.fountainSpoutMesh.scale.z = this.fountainSpoutMesh.scale.x;
      this.fountainSpoutMesh.rotation.y += 0.015;
    }
    if (this.fountainWaterJets && this.fountainWaterJets.length > 0) {
      this.fountainWaterJets.forEach(drop => {
        drop.mesh.position.x += drop.vx;
        drop.mesh.position.z += drop.vz;
        drop.mesh.position.y += drop.vy;
        drop.vy -= 0.0045; // Trọng lực hút tia nước uốn cong hình vòm
        if (drop.mesh.position.y <= 0.65) {
          drop.mesh.position.set(0, drop.initY, drop.initZ);
          const newAng = Math.random() * Math.PI * 2;
          const newSpeedH = 0.025 + Math.random() * 0.038;
          drop.vx = Math.cos(newAng) * newSpeedH;
          drop.vz = Math.sin(newAng) * newSpeedH;
          drop.vy = 0.09 + Math.random() * 0.07;
        }
      });
    }
    if (this.fountainRipples && this.fountainRipples.length > 0) {
      this.fountainRipples.forEach(r => {
        r.scale += r.speed;
        if (r.scale > r.maxScale) r.scale = 0.3;
        r.mesh.scale.set(r.scale, r.scale, 1);
        r.mesh.material.opacity = Math.max(0, 0.55 * (1 - r.scale / r.maxScale));
      });
    }

    // Cá bơi lội trong hồ câu
    this.fishMeshes.forEach(f => {
      f.angle += f.speed;
      f.mesh.position.x = Math.cos(f.angle) * f.radius;
      f.mesh.position.z = Math.sin(f.angle) * f.radius;
      f.mesh.rotation.z = -f.angle;
    });

    // Mây trắng bay lơ lửng trên bầu trời trường học
    if (this.floatingClouds && this.floatingClouds.length > 0) {
      this.floatingClouds.forEach(c => {
        c.group.position.x += c.speed;
        if (c.group.position.x > 140) {
          c.group.position.x = -140;
        }
      });
    }

    // Hoạt ảnh chớp mắt tự nhiên ngọt ngào của Bé Hà My (Chớp mắt mỗi 3.5s trong 0.15s)
    if (this.haMyFaceMesh && this.haMyFaceTexOpen && this.haMyFaceTexBlink) {
      this.haMyBlinkTimer = (this.haMyBlinkTimer || 0) + 1;
      const cycle = this.haMyBlinkTimer % 210;
      if (cycle >= 198 && cycle < 210) {
        if (this.haMyFaceMesh.material.map !== this.haMyFaceTexBlink) {
          this.haMyFaceMesh.material.map = this.haMyFaceTexBlink;
          this.haMyFaceMesh.material.needsUpdate = true;
        }
      } else {
        if (this.haMyFaceMesh.material.map !== this.haMyFaceTexOpen) {
          this.haMyFaceMesh.material.map = this.haMyFaceTexOpen;
          this.haMyFaceMesh.material.needsUpdate = true;
        }
      }
    }

    // Hoạt ảnh hạt bụi tiên / phấn hoa ma thuật lơ lửng dập dờn trong sân trường
    if (this.campusSparkles && this.campusSparkles.length > 0) {
      const spkTime = Date.now() * 0.0016;
      this.campusSparkles.forEach(sp => {
        sp.mesh.position.y = sp.baseY + Math.sin(spkTime + sp.phase) * 0.42;
        sp.mesh.rotation.x += sp.rotSpeed;
        sp.mesh.rotation.y += sp.rotSpeed * 0.8;
      });
    }

    // Dấu chấm than [!] vàng kim xoay và nhấp nhô trên đầu NPC
    const markBob = Math.sin(Date.now() * 0.005) * 0.12;
    this.exclamationMarks.forEach(em => {
      em.rotation.y += 0.03;
      em.position.y = 2.3 + markBob;
    });

    // Hoạt ảnh gật gù/ghi chép của các bạn học sinh Chibi trong lớp
    this.classmates.forEach(cm => {
      const bob = Math.sin(Date.now() * 0.003 + cm.phase) * 0.06;
      cm.head.position.y = cm.baseY + bob;
      cm.head.rotation.x = Math.sin(Date.now() * 0.002 + cm.phase) * 0.1;
    });

    // Vương miện vàng trên đỉnh tháp Obby xoay tròn
    if (this.crownTrophy) {
      this.crownTrophy.group.rotation.y += 0.025;
      this.crownTrophy.group.position.y = (this.crownTrophy.baseY || 13.2) + Math.sin(Date.now() * 0.004) * 0.12;
    }

    // 3. Thú Cưng Chibi bám theo Bé Hà My
    if (this.petMesh) {
      const targetX = this.studentMesh.position.x + (this.studentMesh.position.x > 0 ? -1.1 : 1.1);
      const targetZ = this.studentMesh.position.z + 1.2;
      this.petMesh.position.x += (targetX - this.petMesh.position.x) * 0.08;
      this.petMesh.position.z += (targetZ - this.petMesh.position.z) * 0.08;
      const targetPetY = this.playerBaseY;
      this.petMesh.position.y += (targetPetY - this.petMesh.position.y) * 0.1;
      if (this.petTail) this.petTail.rotation.y = Math.sin(Date.now() * 0.012) * 0.7;
    }

    // 3.5. Hoạt ảnh Mũi Tên Dẫn Đường 3D & Cột Sáng Thiên Đình ("Dắt Mũi" Navigation)
    if (!this.isCityDrivingMode && this.questNavTarget && this.studentMesh) {
      const px = this.studentMesh.position.x;
      const py = this.studentMesh.position.y;
      const pz = this.studentMesh.position.z;
      const tx = this.questNavTarget.x;
      const ty = this.questNavTarget.y || 0;
      const tz = this.questNavTarget.z;

      const dist = Math.hypot(tx - px, tz - pz);
      const isCloseVertical = Math.abs(py - ty) <= 4.0;
      // ĐÃ ĐẾN NƠI: Nếu khoảng cách <= 3.8m -> TẮT CỘT SÁNG VÀ MŨI TÊN NGAY LẬP TỨC theo đúng yêu cầu!
      const hasArrived = (dist <= 3.8 && isCloseVertical);

      if (hasArrived) {
        if (this.navArrowGroup && this.navArrowGroup.visible) {
          this.navArrowGroup.visible = false;
        }
        if (this.beaconBeamGroup && this.beaconBeamGroup.visible) {
          this.beaconBeamGroup.visible = false;
        }
      } else {
        // Chưa đến -> Bật hiển thị mũi tên và cột sáng dẫn đường
        if (this.navArrowGroup && !this.navArrowGroup.visible) {
          this.navArrowGroup.visible = true;
        }
        if (this.beaconBeamGroup && !this.beaconBeamGroup.visible) {
          this.beaconBeamGroup.visible = true;
        }

        if (this.navArrowGroup && this.navArrowGroup.visible) {
          const angle = Math.atan2(tx - px, tz - pz);
          const arrowDist = 1.6;
          this.navArrowGroup.position.x = px + Math.sin(angle) * arrowDist;
          this.navArrowGroup.position.y = py + 1.85 + Math.sin(Date.now() * 0.007) * 0.12;
          this.navArrowGroup.position.z = pz + Math.cos(angle) * arrowDist;
          this.navArrowGroup.rotation.y = angle;
        }

        if (this.beaconGroundRing) {
          this.beaconGroundRing.rotation.z += 0.02;
        }
      }

      // Cập nhật khoảng cách tới mục tiêu
      if (this.onQuestNavUpdate) {
        this.onQuestNavUpdate(Math.round(dist), this.questNavTarget, hasArrived);
      }
    }

    // 4. KIỂM TRA TƯƠNG TÁC GẦN (PROXIMITY DETECTION): NPC, HỒ CÂU, CỘT CỜ, BỤC ĐÁP ÁN (3D: X, Y, Z)
    this.checkProximityTargets(px, this.studentMesh ? this.studentMesh.position.y : 0, pz);

    // 5. Cập nhật các ngôi sao Parkour & thu thập sao
    this.parkourStars.forEach(st => {
      if (!st.collected) {
        st.mesh.rotation.y += 0.035;
        const dToStar = Math.hypot(px - st.worldPos.x, pz - st.worldPos.z);
        if (dToStar < 1.4 && Math.abs(this.playerBaseY - (st.worldPos.y - 0.85)) < 0.8) {
          st.collected = true;
          this.scene.remove(st.mesh);
          if (this.onCollectStarCallback) this.onCollectStarCallback(st);
        }
      }
    });

    // 6. Smooth Spherical Third-Person Orbit Camera
    const charX = this.studentMesh.position.x;
    const charY = this.studentMesh.position.y;
    const charZ = this.studentMesh.position.z;

    const cosPitch = Math.cos(this.cameraPitch);
    const sinPitch = Math.sin(this.cameraPitch);
    const sinYaw = Math.sin(this.cameraYaw);
    const cosYaw = Math.cos(this.cameraYaw);

    const camX = charX + this.cameraDistance * cosPitch * sinYaw;
    const camY = charY + 1.6 + this.cameraDistance * sinPitch + (this.cameraDistance * 0.06);
    const camZ = charZ + this.cameraDistance * cosPitch * cosYaw;

    this.camera.position.x += (camX - this.camera.position.x) * 0.18;
    this.camera.position.y += (camY - this.camera.position.y) * 0.18;
    this.camera.position.z += (camZ - this.camera.position.z) * 0.18;

    const lookTargetY = charY + 1.25;
    this.cameraTarget.set(charX, lookTargetY, charZ);
    this.camera.lookAt(this.cameraTarget);

    // 7. Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.mesh.position.x += p.vx;
      p.mesh.position.y += p.vy;
      p.mesh.position.z += p.vz;
      p.vy -= 0.007;
      p.life -= 0.022;

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
      }
    }

    // 8. Render Scene
    
    // Hoạt ảnh cánh hoa phượng rơi bay lượn trong gió
    this.fallingPetals.forEach(pt => {
      pt.mesh.position.y -= pt.speedY;
      pt.mesh.position.x += Math.sin(Date.now() * 0.002 + pt.phase) * 0.015;
      pt.mesh.position.z += Math.cos(Date.now() * 0.002 + pt.phase) * 0.012;
      pt.mesh.rotation.z += pt.rotSpeed;
      pt.mesh.rotation.x += pt.rotSpeed * 0.5;

      // Chạm đất thì tái sinh lên cao
      if (pt.mesh.position.y <= 0.1) {
        pt.mesh.position.y = 7.0 + Math.random() * 2.0;
        pt.mesh.position.x = (Math.random() - 0.5) * 40;
      }
    });

    // Hoạt ảnh đàn bướm vỗ cánh bay lượn
    this.butterflies.forEach(bf => {
      bf.angle += bf.speed;
      bf.group.position.x = bf.basePos.x + Math.cos(bf.angle) * 3.5;
      bf.group.position.z = bf.basePos.z + Math.sin(bf.angle) * 3.5;
      bf.group.position.y = bf.basePos.y + Math.sin(bf.angle * 2) * 0.4;

      const flap = Math.sin(Date.now() * 0.02) * 0.7;
      bf.wingL.rotation.y = flap;
      bf.wingR.rotation.y = -flap;
    });

    // Hoạt ảnh Khinh Khí Cầu 5C4 bồng bềnh êm ái
    if (this.hotAirBalloon) {
      this.hotAirBalloon.position.y = 30 + Math.sin(Date.now() * 0.001) * 0.8;
      this.hotAirBalloon.rotation.y = Math.sin(Date.now() * 0.0006) * 0.15;
    }

    // Hoạt ảnh Dây cờ tam giác lễ hội đung đưa trong gió
    if (this.buntingGarlands && this.buntingGarlands.length > 0) {
      const windFlutter = Math.sin(Date.now() * 0.003) * 0.06;
      this.buntingGarlands.forEach(g => {
        g.rotation.z = windFlutter;
      });
    }

    // Hoạt ảnh Vườn Thỏ Cưng Chibi
    if (this.animatedBunnies && this.animatedBunnies.length > 0) {
      this.animatedBunnies.forEach(ab => {
        if (ab.type === 'hop') {
          ab.angle += ab.speed;
          const hopRadius = 0.9;
          ab.bunny.group.position.x = ab.basePos.x + Math.cos(ab.angle) * hopRadius;
          ab.bunny.group.position.z = ab.basePos.z + Math.sin(ab.angle) * hopRadius;
          const hopCycle = Math.abs(Math.sin(ab.angle * 4));
          ab.bunny.group.position.y = hopCycle * 0.28;
          ab.bunny.group.rotation.y = -ab.angle + Math.PI / 2;
        } else if (ab.type === 'nibble') {
          ab.bunny.head.position.y = 0.52 + Math.sin(Date.now() * 0.01) * 0.04;
        } else if (ab.type === 'curious') {
          ab.bunny.head.rotation.y = Math.sin(Date.now() * 0.002) * 0.35;
          ab.bunny.head.rotation.z = Math.sin(Date.now() * 0.003) * 0.15;
        }
      });
    }

    // Hoạt ảnh Cá Koi Vàng nhảy vọt khỏi mặt hồ câu cá
    if (this.jumpingKoi) {
      const jk = this.jumpingKoi;
      jk.timer += 0.016;
      if (!jk.isJumping) {
        if (jk.timer >= 5.2) {
          jk.isJumping = true;
          jk.timer = 0;
          if (jk.ripple) {
            jk.ripple.visible = true;
            jk.ripple.scale.set(1, 1, 1);
          }
        }
      } else {
        const progress = jk.timer / 1.4;
        if (progress <= 1.0) {
          const jumpHeight = Math.sin(progress * Math.PI) * 2.2;
          jk.mesh.position.y = jk.basePos.y + jumpHeight;
          jk.mesh.rotation.x = Math.PI / 2 - (progress - 0.5) * Math.PI;
          if (jk.ripple && jk.ripple.visible) {
            const sc = 1.0 + progress * 2.5;
            jk.ripple.scale.set(sc, sc, 1);
          }
        } else {
          jk.isJumping = false;
          jk.mesh.position.y = jk.basePos.y;
          jk.mesh.rotation.x = Math.PI / 2;
          if (jk.ripple) jk.ripple.visible = false;
          jk.timer = 0;
        }
      }
    }

    // Hoạt ảnh Đom Đóm Vườn Hoa nhấp nháy phát sáng bay lượn
    if (this.fireflies && this.fireflies.length > 0) {
      this.fireflies.forEach(ff => {
        const time = Date.now() * 0.002;
        ff.mesh.position.x = ff.basePos.x + Math.sin(time * 0.7 + ff.phase) * 0.45;
        ff.mesh.position.y = ff.basePos.y + Math.sin(time * 1.1 + ff.phase) * 0.35;
        ff.mesh.position.z = ff.basePos.z + Math.cos(time * 0.8 + ff.phase) * 0.45;
        ff.mesh.material.opacity = 0.5 + Math.sin(time * 2.5 + ff.phase) * 0.45;
      });
    }

    // Hoạt ảnh gợn sóng nước PBR động cuộn trôi lung linh (Dynamic Water Normal Scrolling)
    if (this.waterNormalTex) {
      this.waterNormalTex.offset.x += 0.0009;
      this.waterNormalTex.offset.y += 0.0006;
    }
    if (this.pondWaterNormalTex) {
      this.pondWaterNormalTex.offset.x += 0.0007;
      this.pondWaterNormalTex.offset.y -= 0.0008;
    }

    // Hoạt ảnh quạt trần 3D lớp học quay êm ả (Ceiling Fans Gentle Rotation)
    if (this.ceilingFans && this.ceilingFans.length > 0) {
      this.ceilingFans.forEach(fan => {
        fan.rotation.y += 0.045;
      });
    }

    // Hoạt ảnh cánh quạt tản nhiệt cục nóng điều hòa quay
    if (this.acFanMesh) {
      this.acFanMesh.rotation.z += 0.08;
    }

    // Hoạt ảnh luồng ánh sáng ban mai God Rays đung đưa nhẹ
    if (this.godRays && this.godRays.length > 0) {
      const gTime = Date.now() * 0.001;
      this.godRays.forEach(ray => {
        ray.mesh.material.opacity = ray.baseOpacity + Math.sin(gTime * 0.8 + ray.phase) * 0.02;
      });
    }

    // Hoạt ảnh bụi phấn nắng vàng lơ lửng bồng bềnh (Sun Pollen Particles)
    if (this.sunPollen && this.sunPollen.length > 0) {
      this.sunPollen.forEach(sp => {
        sp.mesh.position.y += sp.vy;
        sp.mesh.position.x += sp.vx + Math.sin(Date.now() * 0.0015 + sp.phase) * 0.003;
        sp.mesh.position.z += sp.vz;
        if (sp.mesh.position.y > sp.maxY) sp.mesh.position.y = sp.minY;
      });
    }

    // Hoạt ảnh tán lá cây cổ thụ đung đưa nhiều tần số điều hòa trong gió (Harmonic Wind Oscillation)
    if (this.stylizedTrees && this.stylizedTrees.length > 0) {
      const time = Date.now() * 0.0018;
      this.stylizedTrees.forEach(st => {
        st.group.rotation.z = Math.sin(time + st.phase) * 0.02 + Math.sin(time * 2.3 + st.phase * 1.5) * 0.008;
        st.group.rotation.x = Math.cos(time * 0.75 + st.phase) * 0.012;
      });
    }

    // Hoạt ảnh bụi cỏ 3D dập dờn theo làn gió thoảng (Grass Tufts Sway)
    if (this.grassTufts && this.grassTufts.length > 0) {
      const time = Date.now() * 0.003;
      this.grassTufts.forEach(gt => {
        gt.group.rotation.z = Math.sin(time + gt.phase) * 0.08;
      });
    }

    // Hoạt ảnh mặt trời tỏa hào quang nhấp nháy êm dịu (Sun Corona Breathing)
    if (this.sunGroup && this.sunGroup.children.length > 1) {
      const sunPulse = 1.0 + Math.sin(Date.now() * 0.001) * 0.04;
      this.sunGroup.children[1].scale.set(sunPulse, sunPulse, 1.0);
    }

    this.renderer.render(this.scene, this.camera);
  }

  // ------------------------------------------------------------
  // GIẢI QUYẾT VA CHẠM NGANG VỚI VẬT THỂ & TƯỜNG (AABB vs Cylinder)
  // Ngăn tuyệt đối đi xuyên tường hoặc chướng ngại vật cao hơn
  // Cho phép trượt mượt mà dọc theo bề mặt vật cản (Wall Sliding)
  // ------------------------------------------------------------
  resolveHorizontalCollision(newX, newZ, feetY, headY, radius) {
    let resX = newX;
    let resZ = newZ;

    for (let i = 0; i < this.solidPlatforms.length; i++) {
      const p = this.solidPlatforms[i];
      const bMinY = p.worldY !== undefined ? p.worldY : 0;
      const bTopY = p.topY !== undefined ? p.topY : 1.0;

      // Vật cản chắn ngang nếu:
      // 1. Là tường dựng đứng (isWall: true)
      // 2. HOẶC độ cao bề mặt cao hơn độ cao bước chân (feetY + 0.45m)
      const isBlockingHeight = p.isWall || (bTopY > feetY + 0.45);
      if (!isBlockingHeight) continue; // Bậc thấp: có thể tự bước lên, không chặn ngang!

      // Nếu bàn chân người chơi đã nhảy cao hơn mặt trên vật thể (với dung sai 0.08m)
      if (feetY >= bTopY - 0.08) continue;
      // Nếu đầu người chơi thấp hơn đáy vật thể (đi luồn dưới gầm)
      if (headY <= bMinY) continue;

      const minX = p.worldX - p.halfW;
      const maxX = p.worldX + p.halfW;
      const minZ = p.worldZ - p.halfD;
      const maxZ = p.worldZ + p.halfD;

      // Tìm điểm gần nhất trên hộp AABB đến tâm nhân vật (resX, resZ)
      const cx = Math.max(minX, Math.min(resX, maxX));
      const cz = Math.max(minZ, Math.min(resZ, maxZ));

      const dx = resX - cx;
      const dz = resZ - cz;
      const distSq = dx * dx + dz * dz;

      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq);
        if (dist > 0.0001) {
          // Nhân vật chạm mép ngoài: đẩy lùi ra ngoài theo hướng vector pháp tuyến
          const push = (radius - dist) + 0.002;
          resX += (dx / dist) * push;
          resZ += (dz / dist) * push;
        } else {
          // Tâm nhân vật bị lọt vào trong hộp: đẩy ra cạnh gần nhất
          const dLeft = Math.abs(resX - minX);
          const dRight = Math.abs(maxX - resX);
          const dBack = Math.abs(resZ - minZ);
          const dFront = Math.abs(maxZ - resZ);
          const minEdge = Math.min(dLeft, dRight, dBack, dFront);

          if (minEdge === dLeft) {
            resX = minX - radius - 0.005;
          } else if (minEdge === dRight) {
            resX = maxX + radius + 0.005;
          } else if (minEdge === dBack) {
            resZ = minZ - radius - 0.005;
          } else {
            resZ = maxZ + radius + 0.005;
          }
        }
      }
    }

    return { x: resX, z: resZ };
  }

  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // KIỂM TRA KHOẢNG CÁCH ĐẾN CÁC ĐIỂM TƯƠNG TÁC (3D: X, Y, Z)
  // ------------------------------------------------------------
  checkProximityTargets(px, py, pz) {
    let closestTarget = null;
    let minDistance = 999;

    // 1. Kiểm tra các NPC (Kiểm tra cả trục Y để người ở mặt đất không bị nhận nhầm NPC trên Thiên Đình 80m)
    for (let i = 0; i < this.npcs.length; i++) {
      const npc = this.npcs[i];
      const npcY = (npc.worldPos && npc.worldPos.y !== undefined) ? npc.worldPos.y : 0;
      // Chênh lệch độ cao > 3.2m -> bỏ qua hoàn toàn!
      if (Math.abs(py - npcY) > 3.2) continue;

      const dist = Math.hypot(px - npc.worldPos.x, pz - npc.worldPos.z);
      if (dist <= npc.radius && dist < minDistance) {
        minDistance = dist;
        closestTarget = {
          type: 'npc',
          npc: npc,
          name: npc.name,
          title: npc.title,
          prompt: npc.prompt,
          dist: dist
        };
      }
    }

    // Các điểm tương tác mặt đất: Chỉ kích hoạt khi nhân vật ở gần mặt đất (py <= 3.2m)
    if (py <= 3.2) {
      // 1.5. Kiểm tra CỔNG TRƯỜNG TIỂU HỌC NGÔ QUYỀN (141 TRẦN QUỐC TUẤN) -> BƯỚC RA PHỐ
      const distToGate = Math.hypot(px, pz - 53.5);
      if (distToGate <= 3.2 && Math.abs(px) <= 4.2 && pz >= 50.5 && distToGate < minDistance) {
        minDistance = distToGate;
        closestTarget = {
          type: 'school_gate_exit',
          name: 'Cổng Trường Ngô Quyền (141 Trần Quốc Tuấn)',
          prompt: 'Bấm [E] hoặc Bước Tiếp để Ra Phố Trần Quốc Tuấn 🏙️',
          dist: distToGate
        };
      }
      // 2. Kiểm tra Cầu gỗ Hồ Câu Cá ngang hàng Vườn Hoa (X = 36.0, Z = 65.5)
      const distToFishing = Math.hypot(px - 36.0, pz - 65.5);
      if (distToFishing <= 2.8 && distToFishing < minDistance) {
        minDistance = distToFishing;
        closestTarget = {
          type: 'fishing',
          name: 'Hồ Câu Cá',
          prompt: 'Bấm [E] hoặc [F] để Thả Cần Câu Cá 🎣',
          dist: distToFishing
        };
      }

      // 3. Kiểm tra Cột Cờ Tổ Quốc (X = 0, Z = 38)
      const distToFlag = Math.hypot(px - 0, pz - 38);
      if (distToFlag <= 3.8 && distToFlag < minDistance) {
        minDistance = distToFlag;
        closestTarget = {
          type: 'flagpole',
          name: 'Cột Cờ Tổ Quốc',
          prompt: 'Bấm [E] hoặc [F] để Chào Cờ Việt Nam 🇻🇳',
          dist: distToFlag
        };
      }

      // 4. Kiểm tra Chấm Phạt Đền Sân Bóng Đá (X = -55, Z = 38)
      const distToSoccer = Math.hypot(px - (-55), pz - 38);
      if (distToSoccer <= 3.8 && distToSoccer < minDistance) {
        minDistance = distToSoccer;
        closestTarget = {
          type: 'soccer_penalty',
          name: 'Sân Bóng Đá Mini 5C4',
          prompt: 'Bấm [E] hoặc [F] để Thách Đấu Sút Phạt Đền 11M ⚽',
          dist: distToSoccer
        };
      }

      // 5. Kiểm tra Trạm Lật Thẻ Thư Viện Ngô Quyền (X = 55, Z = 24)
      const distToLib = Math.hypot(px - 55, pz - 24);
      if (distToLib <= 3.8 && distToLib < minDistance) {
        minDistance = distToLib;
        closestTarget = {
          type: 'library',
          name: 'Thư Viện Ngô Quyền',
          prompt: 'Bấm [E] hoặc [F] để Chơi Lật Thẻ Trí Nhớ 📖',
          dist: distToLib
        };
      }

      // 6. Kiểm tra Đại Sân Khấu Boss Dr. Mistake (X = 0, Z = 78)
      const distToBoss = Math.hypot(px - 0, pz - 78);
      if (distToBoss <= 4.8 && distToBoss < minDistance) {
        minDistance = distToBoss;
        closestTarget = {
          type: 'boss_battle',
          name: 'Đại Sân Khấu Chào Cờ',
          prompt: 'Bấm [E] hoặc [F] để Đại Chiến Boss Ngữ Pháp Dr. Mistake! ⚔️',
          dist: distToBoss
        };
      }

      // 7. Kiểm tra Sân Bóng Rổ (X = -55, Z = 62)
      const distToBball = Math.hypot(px - (-55), pz - 62);
      if (distToBball <= 3.8 && distToBball < minDistance) {
        minDistance = distToBball;
        closestTarget = {
          type: 'basketball',
          name: 'Sân Bóng Rổ Thể Thao',
          prompt: 'Bấm [E] hoặc [F] để Thử Tài Ném Bóng Rổ 5C4 🏀',
          dist: distToBball
        };
      }

      // 8. Kiểm tra Vườn Hoa Sinh Thái (X = 59.5, Z = 61.8)
      const distToGarden = Math.hypot(px - 59.5, pz - 61.8);
      if (distToGarden <= 3.8 && distToGarden < minDistance) {
        minDistance = distToGarden;
        closestTarget = {
          type: 'botanical_garden',
          name: 'Vườn Hoa Sinh Thái 5C4',
          prompt: 'Bấm [E] hoặc [F] để Khám Phá Vườn Hoa Sinh Thái 🌺',
          dist: distToGarden
        };
      }

      // 9. Kiểm tra Bảng Vàng Danh Dự 5C4 (X = -3.8, Z = 20.8)
      const distToHonor = Math.hypot(px - (-3.8), pz - 20.8);
      if (distToHonor <= 2.6 && distToHonor < minDistance) {
        minDistance = distToHonor;
        closestTarget = {
          type: 'honor_roll',
          name: 'Bảng Vàng Danh Dự 5C4',
          prompt: 'Bấm [E] hoặc [F] để Chiêm Ngưỡng Bảng Vàng Danh Dự 🏆',
          dist: distToHonor
        };
      }

      // 10. Kiểm tra Vườn Thỏ Cưng Chibi 5C4 (X = 36.0, Z = 48.0)
      const distToBunny = Math.hypot(px - 36.0, pz - 48.0);
      if (distToBunny <= 3.8 && distToBunny < minDistance) {
        minDistance = distToBunny;
        closestTarget = {
          type: 'bunny_sanctuary',
          name: 'Vườn Thỏ Cưng Chibi',
          prompt: 'Bấm [E] hoặc [F] để Chăm Sóc Vườn Thỏ Cưng 5C4 🐰',
          dist: distToBunny
        };
      }

      // 11. Kiểm tra Máy Bán Nước Tự Động Cute (X = -18.2, Z = 16.5)
      const distToVM = Math.hypot(px - (-18.2), pz - 16.5);
      if (distToVM <= 2.5 && distToVM < minDistance) {
        minDistance = distToVM;
        closestTarget = {
          type: 'vending_machine',
          name: 'Máy Bán Nước Tự Động 5C4',
          prompt: 'Bấm [E] hoặc [F] để Mua Trà Sữa Tăng Tốc Độ Chạy 🧋',
          dist: distToVM
        };
      }

      // 12. Kiểm tra Khu Check-in Sống Ảo 5C4 (X = -8.5, Z = 30.5)
      const distToPhoto = Math.hypot(px - (-8.5), pz - 30.5);
      if (distToPhoto <= 2.6 && distToPhoto < minDistance) {
        minDistance = distToPhoto;
        closestTarget = {
          type: 'photo_booth',
          name: 'Khu Check-in Sống Ảo 5C4',
          prompt: 'Bấm [E] hoặc [F] để Chụp Ảnh Check-in Kỷ Niệm 📸',
          dist: distToPhoto
        };
      }

      // 13. Kiểm tra Góc Đọc Sách Cây Phượng (X = 14.0, Z = 36.0)
      const distToNook = Math.hypot(px - 14.0, pz - 36.0);
      if (distToNook <= 2.8 && distToNook < minDistance) {
        minDistance = distToNook;
        closestTarget = {
          type: 'reading_nook',
          name: 'Góc Đọc Sách Cây Phượng',
          prompt: 'Bấm [E] hoặc [F] để Đọc Truyện Tiếng Anh Dưới Cây Phượng 📖',
          dist: distToNook
        };
      }

      // 14. Kiểm tra Trống Trường Ngô Quyền (X = 17.5, Z = 22.0)
      const distToDrum = Math.hypot(px - 17.5, pz - 22.0);
      if (distToDrum <= 3.2 && distToDrum < minDistance) {
        minDistance = distToDrum;
        closestTarget = {
          type: 'school_drum',
          name: 'Trống Trường Ngô Quyền',
          prompt: 'Bấm [E] hoặc [F] để Đánh Trống Trường Báo Giờ Ra Chơi 🥁',
          dist: distToDrum
        };
      }

      // 15. Kiểm tra Sân Chơi Dân Gian Ô Ăn Quan (X = 24.0, Z = 22.0)
      const distToFolk = Math.hypot(px - 24.0, pz - 22.0);
      if (distToFolk <= 3.0 && distToFolk < minDistance) {
        minDistance = distToFolk;
        closestTarget = {
          type: 'folk_game',
          name: 'Sân Chơi Dân Gian Ô Ăn Quan',
          prompt: 'Bấm [E] hoặc [F] để Chơi Ô Ăn Quan Rèn Tính Toán 🌾',
          dist: distToFolk
        };
      }
    }

    // 9. Kiểm tra Bục Đáp Án Ngữ Pháp trong lớp học (Chỉ khi py <= 2.2m)
    let nearestPadIdx = -1;
    let padMinDist = 999;

    if (py <= 2.2) {
      for (let i = 0; i < this.pads.length; i++) {
        const pad = this.pads[i];
        const dist = Math.hypot(px - pad.x, pz - pad.z);

        if (dist <= 1.45 && dist < padMinDist) {
          padMinDist = dist;
          nearestPadIdx = i;
        }

        if (dist <= 1.8) {
          if (!pad.highlighted) {
            pad.highlighted = true;
            pad.spot.intensity = 2.4;
            pad.spaceBadge.visible = true;
            pad.cyl.material.emissiveIntensity = 0.8;
          }
        } else {
          if (pad.highlighted) {
            pad.highlighted = false;
            pad.spot.intensity = 0;
            pad.spaceBadge.visible = false;
            pad.cyl.material.emissiveIntensity = 0.35;
          }
        }
      }
    } else {
      for (let i = 0; i < this.pads.length; i++) {
        const pad = this.pads[i];
        if (pad.highlighted) {
          pad.highlighted = false;
          pad.spot.intensity = 0;
          pad.spaceBadge.visible = false;
          pad.cyl.material.emissiveIntensity = 0.35;
        }
      }
    }

    this.standingPadIndex = nearestPadIdx;

    // Cập nhật target gần nhất
    this.nearbyTarget = closestTarget;

    if (this.onProximityUpdateCallback) {
      this.onProximityUpdateCallback({
        nearbyTarget: this.nearbyTarget,
        standingPadIndex: this.standingPadIndex
      });
    }
  }

  // ============================================================
  // CLEANUP & DESTROY
  // ============================================================
  destroy() {
    this.cleanup();
  }

  playWrongReaction(correctIdx) {
    this.playConfusionAnimation();
  }

  cleanup() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keydown', this.keyDownHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
    if (this.windowBlurHandler) {
      window.removeEventListener('blur', this.windowBlurHandler);
      document.removeEventListener('visibilitychange', this.windowBlurHandler);
    }

    if (this.renderer && this.renderer.domElement && this.onCanvasClick) {
      this.renderer.domElement.removeEventListener('click', this.onCanvasClick);
    }
    if (this.renderer && this.renderer.domElement) {
      this.renderer.dispose();
      if (this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }
  }
}

// Export global
if (typeof window !== 'undefined') {
  window.RobloxClassroom3D = RobloxClassroom3D;
}
