// ==============================================================
// PRODUCTION-READY THREE.JS ENGINE CORE (MODULE 1)
// - RobloxEngine: Scene, Camera, WebGLRenderer, Clock, ResizeObserver, Game Loop, Deep Cleanup
// - CharacterController: Kinematics, WASD, Raycast Snapping, Rigging, Sinusoidal Oscillations
// - ThirdPersonCamera: Smooth Lerp, Exponential Damping, Look-At Interpolation
// ==============================================================

// --------------------------------------------------------------
// 1. CHARACTER STATE ENUM
// --------------------------------------------------------------
const CharacterState = Object.freeze({
  IDLE: 'IDLE',
  WALKING: 'WALKING',
  JUMPING: 'JUMPING',
  CELEBRATING: 'CELEBRATING'
});

// --------------------------------------------------------------
// 2. THIRD PERSON CAMERA CONTROLLER (Smooth Lerp & Exponential Damping)
// --------------------------------------------------------------
class ThirdPersonCamera {
  constructor(camera, targetObject, domElement, options = {}) {
    this.camera = camera;
    this.target = targetObject;
    this.domElement = domElement;

    // Camera offset relative to character (Roblox / Play Together Isometric perspective)
    this.offset = options.offset || new THREE.Vector3(0, 6.5, 9.6);
    this.lookOffset = options.lookOffset || new THREE.Vector3(0, 1.8, -1.2);
    this.damping = options.damping || 6.8; // Smoothing factor

    this.currentPosition = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();

    if (this.target) {
      this.currentPosition.copy(this.target.position).add(this.offset);
      this.currentLookAt.copy(this.target.position).add(this.lookOffset);
      this.camera.position.copy(this.currentPosition);
      this.camera.lookAt(this.currentLookAt);
    }
  }

  update(delta) {
    if (!this.target || !this.camera) return;

    // Frame-rate independent exponential smoothing factor: 1 - e^(-lambda * dt)
    const t = 1.0 - Math.exp(-this.damping * delta);

    // Calculate ideal camera position and look-at target
    const targetPos = this.target.position;
    const idealPosition = new THREE.Vector3(
      targetPos.x + this.offset.x,
      targetPos.y + this.offset.y,
      targetPos.z + this.offset.z
    );

    const idealLookAt = new THREE.Vector3(
      targetPos.x + this.lookOffset.x,
      targetPos.y + this.lookOffset.y,
      targetPos.z + this.lookOffset.z
    );

    // Smooth linear interpolation (Lerp)
    this.currentPosition.lerp(idealPosition, t);
    this.currentLookAt.lerp(idealLookAt, t);

    this.camera.position.copy(this.currentPosition);
    this.camera.lookAt(this.currentLookAt);
  }

  setTarget(newTarget) {
    this.target = newTarget;
  }

  destroy() {
    this.camera = null;
    this.target = null;
    this.domElement = null;
  }
}

// --------------------------------------------------------------
// 3. CHARACTER CONTROLLER (Procedural Chibi Rigging & Kinematics)
// --------------------------------------------------------------
class CharacterController {
  constructor(engine, options = {}) {
    this.engine = engine;
    this.scene = engine.scene;

    // Movement & Kinematics Properties
    this.moveSpeed = options.moveSpeed || 7.2;
    this.acceleration = options.acceleration || 45.0;
    this.friction = options.friction || 0.86;
    this.gravity = options.gravity || -24.0;
    this.jumpForce = options.jumpForce || 9.2;

    this.velocity = new THREE.Vector3(0, 0, 0);
    this.moveInput = new THREE.Vector2(0, 0);
    this.isGrounded = true;
    this.state = CharacterState.IDLE;
    this.targetRotation = 0;
    this.walkCycle = 0;
    this.celebrateTime = 0;

    // Input States
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false
    };

    // Ground Detection Raycaster
    this.raycaster = new THREE.Raycaster();
    this.downVector = new THREE.Vector3(0, -1, 0);
    this.collidableObjects = [];

    // Interaction Callbacks
    this.onPadStep = null;
    this.onSpaceAction = null;
    this.currentStandingPad = null;
    this.isInputLocked = false;

    // Build Procedural 3D Rigged Model
    this.buildProceduralRig();

    // Event Listeners
    this.setupInputs();
  }

  // ------------------------------------------------------------
  // PROCEDURAL RIGGING (Box & Cylinder Chibi Avatar with Pivots)
  // ------------------------------------------------------------
  buildProceduralRig() {
    this.mesh = new THREE.Group();
    this.mesh.name = "Player_HaMy";

    // 1. Torso Group
    this.torsoGroup = new THREE.Group();
    this.baseTorsoY = 1.05;
    this.torsoGroup.position.y = this.baseTorsoY;

    // Áo sơ mi trắng đồng phục
    const shirtGeo = new THREE.BoxGeometry(0.72, 0.78, 0.46);
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    const shirt = new THREE.Mesh(shirtGeo, shirtMat);
    shirt.castShadow = true;
    this.torsoGroup.add(shirt);

    // Nơ đồng phục học sinh đỏ
    const bowGeo = new THREE.BoxGeometry(0.26, 0.16, 0.12);
    const bowMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
    const bow = new THREE.Mesh(bowGeo, bowMat);
    bow.position.set(0, 0.32, 0.25);
    this.torsoGroup.add(bow);

    // Chân váy xếp ly xanh navy
    const skirtGeo = new THREE.CylinderGeometry(0.38, 0.58, 0.38, 24);
    const skirtMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.6 });
    const skirt = new THREE.Mesh(skirtGeo, skirtMat);
    skirt.position.y = -0.38;
    skirt.castShadow = true;
    this.torsoGroup.add(skirt);

    // Ba lô học sinh tím pastel
    const packGeo = new THREE.BoxGeometry(0.52, 0.62, 0.32);
    const packMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.4 });
    const pack = new THREE.Mesh(packGeo, packMat);
    pack.position.set(0, 0.05, -0.34);
    pack.castShadow = true;
    this.torsoGroup.add(pack);

    this.mesh.add(this.torsoGroup);

    // 2. Chibi Head Group
    this.headGroup = new THREE.Group();
    this.headGroup.position.y = 1.85;

    // Đầu tròn Chibi
    const headGeo = new THREE.SphereGeometry(0.48, 24, 24);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.3 });
    const head = new THREE.Mesh(headGeo, skinMat);
    head.castShadow = true;
    this.headGroup.add(head);

    // Mái tóc hạt dẻ
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 });
    const centerHair = new THREE.Mesh(new THREE.SphereGeometry(0.52, 24, 24), hairMat);
    centerHair.position.set(0, 0.1, -0.05);
    this.headGroup.add(centerHair);

    // Hai bím tóc Chibi (Twintails) có pivot xoay
    this.pigtailL = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), hairMat);
    this.pigtailL.position.set(-0.55, 0.05, -0.1);
    this.pigtailR = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), hairMat);
    this.pigtailR.position.set(0.55, 0.05, -0.1);
    this.headGroup.add(this.pigtailL);
    this.headGroup.add(this.pigtailR);

    // Nơ hồng trên tóc
    const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xf472b6 });
    const ribL = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), ribbonMat);
    ribL.position.set(-0.5, 0.22, -0.05);
    const ribR = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), ribbonMat);
    ribR.position.set(0.5, 0.22, -0.05);
    this.headGroup.add(ribL);
    this.headGroup.add(ribR);

    // Đôi mắt Anime to tròn long lanh Play Together với điểm sáng sparkle
    const eyeGeo = new THREE.SphereGeometry(0.075, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1e1b4b });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.16, 0.02, 0.44);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.16, 0.02, 0.44);

    // Điểm sáng lấp lánh (Sparkle Highlights) trong mắt
    const sparkGeo = new THREE.SphereGeometry(0.025, 8, 8);
    const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const spL1 = new THREE.Mesh(sparkGeo, sparkMat);
    spL1.position.set(0.02, 0.03, 0.06);
    eyeL.add(spL1);
    const spR1 = new THREE.Mesh(sparkGeo, sparkMat);
    spR1.position.set(-0.02, 0.03, 0.06);
    eyeR.add(spR1);

    const sparkGeoSmall = new THREE.SphereGeometry(0.014, 8, 8);
    const spL2 = new THREE.Mesh(sparkGeoSmall, sparkMat);
    spL2.position.set(-0.02, -0.02, 0.06);
    eyeL.add(spL2);
    const spR2 = new THREE.Mesh(sparkGeoSmall, sparkMat);
    spR2.position.set(0.02, -0.02, 0.06);
    eyeR.add(spR2);

    this.headGroup.add(eyeL);
    this.headGroup.add(eyeR);

    // Lông mày cong thanh tú
    const browGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.14, 8);
    const browMat = new THREE.MeshBasicMaterial({ color: 0x3e1f0e });
    const browL = new THREE.Mesh(browGeo, browMat);
    browL.position.set(-0.16, 0.16, 0.45);
    browL.rotation.z = Math.PI / 2.2;
    const browR = new THREE.Mesh(browGeo, browMat);
    browR.position.set(0.16, 0.16, 0.45);
    browR.rotation.z = -Math.PI / 2.2;
    this.headGroup.add(browL);
    this.headGroup.add(browR);

    // Mũi nhỏ xíu chúm chím
    const noseGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const noseMat = new THREE.MeshBasicMaterial({ color: 0xfca5a5 });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, -0.05, 0.48);
    this.headGroup.add(nose);

    // Nụ cười ngọt ngào duyên dáng (Torus curve)
    const mouthGeo = new THREE.TorusGeometry(0.055, 0.012, 8, 16, Math.PI);
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0xbe123c });
    const mouth = new THREE.Mesh(mouthGeo, mouthMat);
    mouth.position.set(0, -0.12, 0.46);
    mouth.rotation.x = 0.25;
    mouth.rotation.z = Math.PI;
    this.headGroup.add(mouth);

    // Má hồng cute
    const blushGeo = new THREE.CircleGeometry(0.08, 16);
    const blushMat = new THREE.MeshBasicMaterial({ color: 0xfb7185, transparent: true, opacity: 0.85 });
    const blushL = new THREE.Mesh(blushGeo, blushMat);
    blushL.position.set(-0.25, -0.10, 0.44);
    const blushR = new THREE.Mesh(blushGeo, blushMat);
    blushR.position.set(0.25, -0.10, 0.44);
    this.headGroup.add(blushL);
    this.headGroup.add(blushR);

    // Bảng Tên Hà My (5C4) Trên Đầu
    this.nameTag = this.createCanvasPlane("👧 Hà My (5C4)", 256, 64, '#fef08a', 'rgba(15,23,42,0.85)');
    this.nameTag.position.set(0, 0.85, 0);
    this.headGroup.add(this.nameTag);

    // Bảng thông báo nổi khi đứng trên bục
    this.promptTag = this.createCanvasPlane("BẤM SPACE ĐỂ CHỌN", 512, 128, '#ffffff', 'rgba(234,88,12,0.95)', true);
    this.promptTag.position.set(0, 1.45, 0);
    this.promptTag.visible = false;
    this.headGroup.add(this.promptTag);

    this.mesh.add(this.headGroup);

    // 3. Leg Pivots at Hips (Dao động bước chân hình sin)
    const legGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.52, 16);
    const sockMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0xec4899 });

    // Chân trái
    this.pivotLegL = new THREE.Group();
    this.pivotLegL.position.set(-0.2, 0.6, 0);
    const legL = new THREE.Mesh(legGeo, sockMat);
    legL.position.set(0, -0.26, 0);
    legL.castShadow = true;
    const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.15, 0.28), shoeMat);
    shoeL.position.set(0, -0.48, 0.05);
    shoeL.castShadow = true;
    this.pivotLegL.add(legL);
    this.pivotLegL.add(shoeL);
    this.mesh.add(this.pivotLegL);

    // Chân phải
    this.pivotLegR = new THREE.Group();
    this.pivotLegR.position.set(0.2, 0.6, 0);
    const legR = new THREE.Mesh(legGeo, sockMat);
    legR.position.set(0, -0.26, 0);
    legR.castShadow = true;
    const shoeR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.15, 0.28), shoeMat);
    shoeR.position.set(0, -0.48, 0.05);
    shoeR.castShadow = true;
    this.pivotLegR.add(legR);
    this.pivotLegR.add(shoeR);
    this.mesh.add(this.pivotLegR);

    // 4. Arm Pivots at Shoulders
    const armGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.5, 16);
    const skinArmMat = new THREE.MeshStandardMaterial({ color: 0xffedd5 });

    // Tay trái
    this.pivotArmL = new THREE.Group();
    this.pivotArmL.position.set(-0.45, 1.35, 0);
    const armL = new THREE.Mesh(armGeo, skinArmMat);
    armL.position.set(0, -0.25, 0);
    this.pivotArmL.add(armL);
    this.mesh.add(this.pivotArmL);

    // Tay phải
    this.pivotArmR = new THREE.Group();
    this.pivotArmR.position.set(0.45, 1.35, 0);
    const armR = new THREE.Mesh(armGeo, skinArmMat);
    armR.position.set(0, -0.25, 0);
    this.pivotArmR.add(armR);
    this.mesh.add(this.pivotArmR);

    this.scene.add(this.mesh);
  }

  createCanvasPlane(text, width, height, textColor, bgColor, border = false) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgColor;
    if (ctx.roundRect) ctx.roundRect(8, 8, width - 16, height - 16, 24);
    else ctx.rect(8, 8, width - 16, height - 16);
    ctx.fill();

    if (border) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6;
      if (ctx.roundRect) ctx.roundRect(8, 8, width - 16, height - 16, 24);
      else ctx.rect(8, 8, width - 16, height - 16);
      ctx.stroke();
    }

    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.floor(height * 0.42)}px "Nunito", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry((width / 160), (height / 160)),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true })
    );
    plane.userData = { canvas, texture };
    return plane;
  }

  updatePromptText(text) {
    if (!this.promptTag || !this.promptTag.userData.canvas) return;
    const canvas = this.promptTag.userData.canvas;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(234, 88, 12, 0.95)';
    if (ctx.roundRect) ctx.roundRect(8, 8, width - 16, height - 16, 24);
    else ctx.rect(8, 8, width - 16, height - 16);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    if (ctx.roundRect) ctx.roundRect(8, 8, width - 16, height - 16, 24);
    else ctx.rect(8, 8, width - 16, height - 16);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = `900 ${Math.floor(height * 0.38)}px "Nunito", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    this.promptTag.userData.texture.needsUpdate = true;
  }

  // ------------------------------------------------------------
  // INPUTS & KEYBOARD EVENT HANDLERS
  // ------------------------------------------------------------
  resetKeys() {
    this.keys = { forward: false, backward: false, left: false, right: false };
  }

  setupInputs() {
    this.lastKeyTime = Date.now();

    this.handleKeyDown = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (this.isInputLocked) return;

      this.lastKeyTime = Date.now();

      if (e.isComposing || e.keyCode === 229 || e.key === 'Process') {
        this.resetKeys();
        return;
      }

      const code = e.code;
      const key = (e.key || '').toLowerCase();
      if (code === 'KeyW' || key === 'w' || key === 'ư' || code === 'ArrowUp' || key === 'arrowup') this.keys.forward = true;
      else if (code === 'KeyS' || key === 's' || code === 'ArrowDown' || key === 'arrowdown') this.keys.backward = true;
      else if (code === 'KeyA' || key === 'a' || key === 'â' || key === 'ă' || code === 'ArrowLeft' || key === 'arrowleft') this.keys.left = true;
      else if (code === 'KeyD' || key === 'd' || key === 'đ' || code === 'ArrowRight' || key === 'arrowright') this.keys.right = true;

      if (code === 'Space' || key === ' ') {
        e.preventDefault();
        this.triggerAction();
      }
    };

    this.handleKeyUp = (e) => {
      const code = e.code;
      const key = (e.key || '').toLowerCase();
      if (code === 'KeyW' || key === 'w' || key === 'ư' || code === 'ArrowUp' || key === 'arrowup') this.keys.forward = false;
      if (code === 'KeyS' || key === 's' || code === 'ArrowDown' || key === 'arrowdown') this.keys.backward = false;
      if (code === 'KeyA' || key === 'a' || key === 'â' || key === 'ă' || key === 'á' || key === 'à' || code === 'ArrowLeft' || key === 'arrowleft') this.keys.left = false;
      if (code === 'KeyD' || key === 'd' || key === 'đ' || code === 'ArrowRight' || key === 'arrowright') this.keys.right = false;

      if (e.keyCode === 229 || code === 'Unidentified' || key === 'process' || key === 'backspace') {
        this.resetKeys();
      }
    };

    this.handleBlur = () => this.resetKeys();

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('blur', this.handleBlur);
    document.addEventListener('visibilitychange', this.handleBlur);
  }

  triggerAction() {
    if (this.isInputLocked) return;

    // Nếu đứng trên bục đáp án
    if (this.currentStandingPad && this.onSpaceAction) {
      this.onSpaceAction(this.currentStandingPad);
      return;
    }

    // Nhảy thông thường
    if (this.isGrounded) {
      this.velocity.y = this.jumpForce;
      this.isGrounded = false;
      this.state = CharacterState.JUMPING;
    }
  }

  setCollidables(meshArray) {
    this.collidableObjects = meshArray;
  }

  lockInput(durationMs = 1500) {
    this.isInputLocked = true;
    setTimeout(() => {
      this.isInputLocked = false;
    }, durationMs);
  }

  // ------------------------------------------------------------
  // KINEMATICS, RAYCASTING & SINUSOIDAL ANIMATIONS UPDATE
  // ------------------------------------------------------------
  update(delta) {
    if (!this.mesh) return;

    // 1. Process Input Vector
    let inputX = 0;
    let inputZ = 0;

    if (!this.isInputLocked && this.state !== CharacterState.CELEBRATING) {
      if (this.keys.forward) inputZ -= 1;
      if (this.keys.backward) inputZ += 1;
      if (this.keys.left) inputX -= 1;
      if (this.keys.right) inputX += 1;
    }

    const hasInput = (inputX !== 0 || inputZ !== 0);

    // 2. Kinematics (Acceleration & Damping/Friction)
    if (hasInput) {
      const norm = Math.hypot(inputX, inputZ);
      const targetVx = (inputX / norm) * this.moveSpeed;
      const targetVz = (inputZ / norm) * this.moveSpeed;

      this.velocity.x += (targetVx - this.velocity.x) * Math.min(1.0, this.acceleration * delta);
      this.velocity.z += (targetVz - this.velocity.z) * Math.min(1.0, this.acceleration * delta);

      // Smooth Angular Rotation towards movement direction
      this.targetRotation = Math.atan2(this.velocity.x, this.velocity.z);
      this.mesh.rotation.y = this.lerpAngle(this.mesh.rotation.y, this.targetRotation, 14.0 * delta);

      if (this.isGrounded) {
        this.state = CharacterState.WALKING;
      }
    } else {
      // Damping / Friction
      this.velocity.x *= Math.pow(this.friction, delta * 60);
      this.velocity.z *= Math.pow(this.friction, delta * 60);

      if (this.isGrounded && this.state !== CharacterState.CELEBRATING) {
        this.state = (Math.hypot(this.velocity.x, this.velocity.z) > 0.3) ? CharacterState.WALKING : CharacterState.IDLE;
      }
    }

    // 3. Gravity
    if (!this.isGrounded) {
      this.velocity.y += this.gravity * delta;
    }

    // 4. Update Position with Boundaries
    this.mesh.position.x += this.velocity.x * delta;
    this.mesh.position.z += this.velocity.z * delta;
    this.mesh.position.y += this.velocity.y * delta;

    // Campus boundary constraints (-105 to 105 on X, -20 to 95 on Z for expanded 3D school campus)
    this.mesh.position.x = Math.max(-105, Math.min(105, this.mesh.position.x));
    this.mesh.position.z = Math.max(-20, Math.min(95, this.mesh.position.z));

    // 5. Downward Raycasting for Ground Snapping & Pad Detection
    this.performGroundRaycast();

    // 6. Sinusoidal Procedural Rigging Animations
    this.animateRig(delta, hasInput);
  }

  performGroundRaycast() {
    // Cast ray from character waist downwards
    const rayOrigin = this.mesh.position.clone();
    rayOrigin.y += 0.8;
    this.raycaster.set(rayOrigin, this.downVector);

    let hitPointY = 0;
    let hitSomething = false;

    if (this.collidableObjects && this.collidableObjects.length > 0) {
      const intersects = this.raycaster.intersectObjects(this.collidableObjects, true);
      if (intersects.length > 0 && intersects[0].distance < 1.4) {
        hitPointY = intersects[0].point.y;
        hitSomething = true;
      }
    }

    // Ground snap
    if (this.mesh.position.y <= hitPointY) {
      this.mesh.position.y = hitPointY;
      this.velocity.y = 0;
      this.isGrounded = true;
      if (this.state === CharacterState.JUMPING) {
        this.state = CharacterState.IDLE;
      }
    } else {
      this.isGrounded = false;
    }
  }

  animateRig(delta, hasInput) {
    const time = Date.now() * 0.001;

    if (this.state === CharacterState.WALKING) {
      const speedNorm = Math.hypot(this.velocity.x, this.velocity.z);
      this.walkCycle += delta * speedNorm * 2.8;

      // Hips/Legs Swing
      this.pivotLegL.rotation.x = Math.sin(this.walkCycle) * 0.75;
      this.pivotLegR.rotation.x = -Math.sin(this.walkCycle) * 0.75;

      // Arms Counter-Swing
      this.pivotArmL.rotation.x = -Math.sin(this.walkCycle) * 0.6;
      this.pivotArmR.rotation.x = Math.sin(this.walkCycle) * 0.6;

      // Torso & Head Bobbing
      this.torsoGroup.position.y = this.baseTorsoY + Math.abs(Math.sin(this.walkCycle * 2)) * 0.09;
      this.pigtailL.rotation.z = Math.sin(this.walkCycle * 2) * 0.15;
      this.pigtailR.rotation.z = -Math.sin(this.walkCycle * 2) * 0.15;
    } else if (this.state === CharacterState.IDLE) {
      // Smooth return to resting pose
      this.pivotLegL.rotation.x = THREE.MathUtils.lerp(this.pivotLegL.rotation.x, 0, 10 * delta);
      this.pivotLegR.rotation.x = THREE.MathUtils.lerp(this.pivotLegR.rotation.x, 0, 10 * delta);
      this.pivotArmL.rotation.x = THREE.MathUtils.lerp(this.pivotArmL.rotation.x, 0, 10 * delta);
      this.pivotArmR.rotation.x = THREE.MathUtils.lerp(this.pivotArmR.rotation.x, 0, 10 * delta);

      // Soft breathing cycle
      this.torsoGroup.position.y = this.baseTorsoY + Math.sin(time * 2.6) * 0.03;
      this.headGroup.rotation.z = Math.sin(time * 1.5) * 0.035;
    } else if (this.state === CharacterState.CELEBRATING) {
      // 360 Spin Victory Dance
      this.mesh.rotation.y += delta * 10.0;
      this.torsoGroup.position.y = this.baseTorsoY + Math.abs(Math.sin(time * 8.0)) * 0.45;

      // Arms raised high
      this.pivotArmL.rotation.z = THREE.MathUtils.lerp(this.pivotArmL.rotation.z, 2.4, 12 * delta);
      this.pivotArmR.rotation.z = THREE.MathUtils.lerp(this.pivotArmR.rotation.z, -2.4, 12 * delta);
      this.pivotLegL.rotation.x = Math.sin(time * 8.0) * 0.4;
      this.pivotLegR.rotation.x = -Math.sin(time * 8.0) * 0.4;
    }
  }

  lerpAngle(a, b, t) {
    const diff = THREE.MathUtils.euclideanModulo(b - a + Math.PI, Math.PI * 2) - Math.PI;
    return a + diff * Math.min(1.0, t);
  }

  celebrate(durationMs = 2800) {
    this.state = CharacterState.CELEBRATING;
    this.lockInput(durationMs);
    setTimeout(() => {
      if (this.state === CharacterState.CELEBRATING) {
        this.state = CharacterState.IDLE;
        if (this.pivotArmL && this.pivotArmR) {
          this.pivotArmL.rotation.z = 0;
          this.pivotArmR.rotation.z = 0;
        }
      }
    }, durationMs);
  }

  destroy() {
    if (this.handleKeyDown) window.removeEventListener('keydown', this.handleKeyDown);
    if (this.handleKeyUp) window.removeEventListener('keyup', this.handleKeyUp);
    if (this.mesh && this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
  }
}

// --------------------------------------------------------------
// 4. ROBLOX ENGINE (Master Scene, Renderer, ResizeObserver, Game Loop)
// --------------------------------------------------------------
class RobloxEngine {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign({
      shadows: true,
      antialias: true,
      fov: 45,
      near: 0.1,
      far: 1000,
      clearColor: 0x93c5fd,
      exposure: 1.05
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();
    this.animId = null;
    this.resizeObserver = null;

    // Subsystem components
    this.character = null;
    this.thirdPersonCamera = null;
    this.updateHooks = [];

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 420;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.options.clearColor);
    this.scene.fog = new THREE.FogExp2(this.options.clearColor, 0.016);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(this.options.fov, width / height, this.options.near, this.options.far);
    this.camera.position.set(0, 6.8, 10.5);

    // 3. Renderer with ACESFilmicToneMapping & PCFSoftShadowMap
    this.renderer = new THREE.WebGLRenderer({
      antialias: this.options.antialias,
      powerPreference: "high-performance",
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = this.options.exposure;

    if (this.options.shadows) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // 4. Setup Lights
    this.setupLights();

    // 5. Setup ResizeObserver
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width || this.container.clientWidth;
          const h = entry.contentRect.height || this.container.clientHeight;
          if (w > 0 && h > 0) {
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
          }
        }
      });
      this.resizeObserver.observe(this.container);
    }

    // 6. Game Loop Binding
    this.loop = this.loop.bind(this);
    this.animId = requestAnimationFrame(this.loop);
  }

  setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff7ed, 0.95);
    sun.position.set(22, 38, 28);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 1024;
    sun.shadow.mapSize.height = 1024;
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 120;
    sun.shadow.camera.left = -30;
    sun.shadow.camera.right = 30;
    sun.shadow.camera.top = 30;
    sun.shadow.camera.bottom = -30;
    this.scene.add(sun);

    const skyFill = new THREE.DirectionalLight(0xbae6fd, 0.35);
    skyFill.position.set(-18, 16, -18);
    this.scene.add(skyFill);
  }

  addUpdateHook(callback) {
    this.updateHooks.push(callback);
  }

  loop() {
    this.animId = requestAnimationFrame(this.loop);
    const delta = Math.min(this.clock.getDelta(), 0.08);

    if (this.character) this.character.update(delta);
    if (this.thirdPersonCamera) this.thirdPersonCamera.update(delta);

    for (let i = 0; i < this.updateHooks.length; i++) {
      this.updateHooks[i](delta);
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.character) {
      this.character.destroy();
      this.character = null;
    }
    if (this.thirdPersonCamera) {
      this.thirdPersonCamera.destroy();
      this.thirdPersonCamera = null;
    }
    this.updateHooks = [];

    // Deep scene graph traversal for memory cleanup
    const disposeMaterial = (mat) => {
      if (!mat) return;
      Object.keys(mat).forEach(prop => {
        if (mat[prop] && typeof mat[prop].dispose === 'function') {
          mat[prop].dispose();
        }
      });
      mat.dispose();
    };

    if (this.scene) {
      this.scene.traverse((obj) => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => disposeMaterial(m));
          } else if (obj.material) {
            disposeMaterial(obj.material);
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
      if (typeof this.renderer.forceContextLoss === 'function') {
        this.renderer.forceContextLoss();
      }
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
    }
  }
}

// Global Exports
window.CharacterState = CharacterState;
window.ThirdPersonCamera = ThirdPersonCamera;
window.CharacterController = CharacterController;
window.RobloxEngine = RobloxEngine;
