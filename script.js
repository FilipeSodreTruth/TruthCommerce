


    /* ── DIAGNOSTIC CHECKLIST INTERACTION ── */
    (function () {
      var diagItems = document.querySelectorAll('.diag-item');
      var diagCount = document.getElementById('diagCount');

      /* Stagger reveal on scroll */
      function revealDiagItems() {
        var winH = window.innerHeight;
        diagItems.forEach(function (item, i) {
          var top = item.getBoundingClientRect().top;
          if (top < winH - 60 && !item.classList.contains('revealed')) {
            setTimeout(function () { item.classList.add('revealed'); }, i * 100);
          }
        });
      }
      window.addEventListener('scroll', revealDiagItems);
      revealDiagItems();

      /* Click to toggle check */
      function updateCounter() {
        var checked = document.querySelectorAll('.diag-item.checked').length;
        if (diagCount) diagCount.textContent = checked;
      }
      diagItems.forEach(function (item) {
        item.addEventListener('click', function () {
          item.classList.toggle('checked');
          updateCounter();
        });
      });
    })();

    /* SCROLL REVEAL */

    function reveal() {

      var reveals = document.querySelectorAll(".reveal");

      for (var i = 0; i < reveals.length; i++) {

        var windowHeight = window.innerHeight;

        var elementTop = reveals[i].getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) { reveals[i].classList.add("active"); }

      }

    }

    window.addEventListener("scroll", reveal); reveal();



    /* SERVIÇOS: hover troca imagem + ativa item */

    const serviceItems = document.querySelectorAll('.service-item');

    const serviceImg = document.getElementById('service-img');

    serviceItems.forEach(item => {

      item.addEventListener('mouseenter', () => {

        serviceItems.forEach(el => el.classList.remove('active'));

        item.classList.add('active');

        if (serviceImg) {

          const newSrc = item.getAttribute('data-img');

          if (newSrc) {

            serviceImg.style.opacity = '0';

            setTimeout(() => { serviceImg.src = newSrc; serviceImg.style.opacity = '1'; }, 200);

          }

        }

      });

      item.addEventListener('mouseleave', () => {

        item.classList.remove('active');

        serviceItems[0].classList.add('active');

      });

    });



    /* LÓGICA DO FAQ (ACCORDION) COM GSAP */

    document.addEventListener('DOMContentLoaded', () => {

      const faqItems = document.querySelectorAll('.faq-item');

      faqItems.forEach(item => {

        const button = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const answerInner = item.querySelector('.faq-answer-inner');

        button.addEventListener('click', () => {

          const isOpen = item.classList.contains('faq-open');

          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('faq-open')) {
              otherItem.classList.remove('faq-open');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              const otherInner = otherItem.querySelector('.faq-answer-inner');
              gsap.to(otherAnswer, { height: 0, duration: 0.4, ease: "power2.inOut" });
              gsap.to(otherInner, { autoAlpha: 0, y: -10, duration: 0.2 });
            }
          });

          if (!isOpen) {
            item.classList.add('faq-open');
            gsap.fromTo(answer, { height: 0 }, { height: "auto", duration: 0.5, ease: "power2.out" });
            gsap.fromTo(answerInner, { autoAlpha: 0, y: -15 }, { autoAlpha: 1, y: 0, duration: 0.4, delay: 0.1, ease: "power2.out" });
          } else {
            item.classList.remove('faq-open');
            gsap.to(answer, { height: 0, duration: 0.4, ease: "power2.inOut" });
            gsap.to(answerInner, { autoAlpha: 0, y: -10, duration: 0.2 });
          }

        });

      });

      /* MAGNÉTIC BUTTONS LOGIC */
      const magneticBtns = document.querySelectorAll('.btn.primary');

      magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const hc = rect.left + rect.width / 2;
          const vc = rect.top + rect.height / 2;

          // Max pull distance
          const pullX = (e.clientX - hc) * 0.3;
          const pullY = (e.clientY - vc) * 0.3;

          gsap.to(btn, {
            x: pullX,
            y: pullY,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });



      /* LÓGICA DO VÍDEO DOS CASES 3D (Toca apenas no Hover) */

      const carouselItems = document.querySelectorAll('.carousel-item');

      carouselItems.forEach(item => {

        const video = item.querySelector('.case-video-3d');

        if (video) {

          item.addEventListener('mouseenter', () => { video.play().catch(e => console.log("Auto-play bloqueado.")); });

          item.addEventListener('mouseleave', () => { video.pause(); });

        }

      });

    });


    /* ── VIDEO SLIDER: removed — replaced by Lusion dep panel ── */


    /* MOBILE MENU LOGIC */
    (function () {
      const toggle = document.getElementById('menuToggle');
      const overlay = document.getElementById('mobileOverlay');
      const close = document.getElementById('menuClose');
      const mobileLinks = overlay ? overlay.querySelectorAll('.mobile-link, .mobile-cta') : [];

      function openMenu() {
        if (overlay) overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }

      function closeMenu() {
        if (overlay) overlay.classList.remove('is-open');
        document.body.style.overflow = '';
      }

      if (toggle) toggle.addEventListener('click', openMenu);
      if (close) close.addEventListener('click', closeMenu);

      mobileLinks.forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    })();









    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Typewriter Text Reveal Logic
    function typeText(element, speed = 40) {
      if (element.dataset.typed) return;
      element.dataset.typed = "true";

      const originalText = element.innerText;
      element.innerText = ""; // Clear text for typing effect

      let iteration = 0;
      let interval = setInterval(() => {
        // Show substring of text plus a cursor block during typing
        element.innerText = originalText.substring(0, iteration) + "|";
        iteration++;

        if (iteration > originalText.length) {
          clearInterval(interval);
          // Restore original HTML perfectly (in case of internal spans like .accent)
          element.innerHTML = element.dataset.originalHtml;
        }
      }, speed);
    }

    // Apply to Titles
    document.addEventListener("DOMContentLoaded", () => {
      const heroTitle = document.querySelector('.hero-title');
      const transicaoTitle = document.querySelector('#transicao .title-medium');

      if (heroTitle) {
        heroTitle.dataset.originalHtml = heroTitle.innerHTML;
        // Trigger typewriter immediately for hero
        setTimeout(() => typeText(heroTitle, 40), 300);
      }

      if (transicaoTitle) {
        transicaoTitle.dataset.originalHtml = transicaoTitle.innerHTML;
        // Trigger via GSAP when scrolled into view
        ScrollTrigger.create({
          trigger: transicaoTitle,
          start: 'top 85%',
          onEnter: () => typeText(transicaoTitle, 40)
        });
      }

      // Floating Bento Parallax Logic
      const methodCards = document.querySelectorAll('.galilee-card');
      methodCards.forEach(card => {
        const visual = card.querySelector('.galilee-visual');
        const title = card.querySelector('.galilee-text h3');

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          // Move elements independently based on mouse position within card
          if (visual) visual.style.transform = `translate3d(${x * 0.1}px, ${y * 0.1}px, 20px)`;
          if (title) title.style.transform = `translate3d(${x * 0.05}px, ${y * 0.05}px, 10px)`;
        });

        card.addEventListener('mouseleave', () => {
          // Reset internal elements when mouse leaves
          if (visual) visual.style.transform = `translate3d(0, 0, 0)`;
          if (title) title.style.transform = `translate3d(0, 0, 0)`;
        });
      });
    });



    /*
    
     * =====================================================
    
     *  GLB → PARTICLE CLOUD  |  30,000 Points
    
     *  Scroll-Morphing: Rocket → Earth → Astronaut
    
     * =====================================================
    
     *  ⚠️  Run via Live Server to avoid CORS errors.
    
     * =====================================================
    
     */

    document.addEventListener('DOMContentLoaded', function () {

      var wrapper = document.getElementById('canvas-3d-wrapper');

      if (!wrapper || typeof THREE === 'undefined') return;



      /* ── SCENE ── */

      var W = wrapper.offsetWidth || 400;

      var H = wrapper.offsetHeight || 400;

      var scene = new THREE.Scene();

      var camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);

      camera.position.set(0, 0, 15);



      var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio));

      renderer.setSize(W, H);

      wrapper.appendChild(renderer.domElement);



      /* ── GLOW SPRITE (Alta Resolução) ── */

      var cs = 1024;

      var cv = document.createElement('canvas');

      cv.width = cv.height = cs;

      var ctx = cv.getContext('2d');

      var grd = ctx.createRadialGradient(cs / 2, cs / 2, 0, cs / 2, cs / 2, cs / 2);

      grd.addColorStop(0.0, 'rgba(255,255,255,1)');

      grd.addColorStop(0.15, 'rgba(255,255,255,0.9)');

      grd.addColorStop(0.4, 'rgba(255,255,255,0.3)');

      grd.addColorStop(1.0, 'rgba(0,0,0,0)');

      ctx.fillStyle = grd;

      ctx.fillRect(0, 0, cs, cs);

      var glowTex = new THREE.CanvasTexture(cv);

      glowTex.minFilter = THREE.LinearMipMapLinearFilter;



      /* ── CONSTANTS ── */

      var N = 30000;

      var cGreen = new THREE.Color('#07dd2b');
      var cWhite = new THREE.Color('#ffffff');
      var cTemp = new THREE.Color();



      var particleGroup = new THREE.Group();

      scene.add(particleGroup);

      particleGroup.rotation.z = -0.3;

      particleGroup.rotation.x = 0.15;


      /* Initial position/scale set by GSAP matchMedia below */



      /* ── EXTRACT SHAPE DATA FROM GLTF (returns {positions, colors}) ── */

      function extractShapeData(gltf, colorScheme) {

        var triangles = [];

        var totalArea = 0;

        var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9, minZ = 1e9, maxZ = -1e9;



        gltf.scene.updateMatrixWorld(true);



        gltf.scene.traverse(function (child) {

          if (!child.isMesh || !child.geometry) return;

          var geo = child.geometry.clone();

          geo.applyMatrix4(child.matrixWorld);

          if (geo.index) geo = geo.toNonIndexed();

          var pos = geo.attributes.position;

          if (!pos || pos.count < 3) return;



          geo.computeBoundingBox();

          var bb = geo.boundingBox;

          var extX = bb.max.x - bb.min.x;

          var extY = bb.max.y - bb.min.y;

          var extZ = bb.max.z - bb.min.z;

          var maxHoriz = Math.max(extX, extZ);



          var meshName = child.name || '';

          if (maxHoriz > 20 || extY > 20) return;

          if (meshName.includes('Text') || meshName.includes('Backdrop') || meshName.includes('Side')) return;



          for (var i = 0; i < pos.count; i += 3) {

            var ax = pos.getX(i), ay = pos.getY(i), az = pos.getZ(i);

            var bx = pos.getX(i + 1), by = pos.getY(i + 1), bz = pos.getZ(i + 1);

            var cx = pos.getX(i + 2), cy = pos.getY(i + 2), cz = pos.getZ(i + 2);



            var abx = bx - ax, aby = by - ay, abz = bz - az;

            var acx = cx - ax, acy = cy - ay, acz = cz - az;

            var crossX = aby * acz - abz * acy;

            var crossY = abz * acx - abx * acz;

            var crossZ = abx * acy - aby * acx;

            var area = Math.sqrt(crossX * crossX + crossY * crossY + crossZ * crossZ) * 0.5;



            if (area > 0.00001) {

              triangles.push([ax, ay, az, bx, by, bz, cx, cy, cz, area]);

              totalArea += area;

              if (ax < minX) minX = ax; if (bx < minX) minX = bx; if (cx < minX) minX = cx;

              if (ax > maxX) maxX = ax; if (bx > maxX) maxX = bx; if (cx > maxX) maxX = cx;

              if (ay < minY) minY = ay; if (by < minY) minY = by; if (cy < minY) minY = cy;

              if (ay > maxY) maxY = ay; if (by > maxY) maxY = by; if (cy > maxY) maxY = cy;

              if (az < minZ) minZ = az; if (bz < minZ) minZ = bz; if (cz < minZ) minZ = cz;

              if (az > maxZ) maxZ = az; if (bz > maxZ) maxZ = bz; if (cz > maxZ) maxZ = cz;

            }

          }

        });



        if (triangles.length === 0) { console.error('No triangles in model.'); return null; }

        console.log('[' + colorScheme + '] Triangles:', triangles.length, '| Area:', totalArea.toFixed(2));



        var sizeX = maxX - minX || 1;

        var sizeY = maxY - minY || 1;

        var cenX = (maxX + minX) / 2, cenY = (maxY + minY) / 2, cenZ = (maxZ + minZ) / 2;

        var scale = 5.5 / sizeY;



        var positions = new Float32Array(N * 3);

        var colors = new Float32Array(N * 3);



        var cdf = new Float32Array(triangles.length);

        var runSum = 0;

        for (var k = 0; k < triangles.length; k++) {

          runSum += triangles[k][9];

          cdf[k] = runSum;

        }



        for (var i = 0; i < N; i++) {

          var rnd = Math.random() * totalArea;

          var lo = 0, hi = triangles.length - 1;

          while (lo < hi) {

            var mid = (lo + hi) >> 1;

            if (cdf[mid] < rnd) lo = mid + 1; else hi = mid;

          }

          var t = triangles[lo];



          var r1 = Math.random(), r2 = Math.random();

          if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }



          var px = (t[0] + r1 * (t[3] - t[0]) + r2 * (t[6] - t[0]) - cenX) * scale;

          var py = (t[1] + r1 * (t[4] - t[1]) + r2 * (t[7] - t[1]) - cenY) * scale;

          var pz = (t[2] + r1 * (t[5] - t[2]) + r2 * (t[8] - t[2]) - cenZ) * scale;



          positions[i * 3] = px;

          positions[i * 3 + 1] = py;

          positions[i * 3 + 2] = pz;



          /* ── COLOR BY SCHEME ── */

          var halfW = (sizeX * scale) * 0.5;

          var normalizedY = (py - (-2.75 * scale)) / (5.5 * scale);

          if (normalizedY < 0) normalizedY = 0;

          if (normalizedY > 1) normalizedY = 1;



          if (colorScheme === 'rocket') {
            var flameCutoff = 0.22;
            if (normalizedY < flameCutoff) {
              var flameIntensity = 1.0 - (normalizedY / flameCutoff);
              cTemp.copy(cGreen);
              var sp = 0.8 + flameIntensity * 0.2 + Math.random() * 0.1;
              colors[i * 3] = cTemp.r * sp; colors[i * 3 + 1] = cTemp.g * sp; colors[i * 3 + 2] = cTemp.b * sp;
            } else {
              var sp = 0.95 + Math.random() * 0.3;
              colors[i * 3] = sp; colors[i * 3 + 1] = sp; colors[i * 3 + 2] = sp;
            }
          } else if (colorScheme === 'astronaut') {
            /* Bright White Astronaut + Green Accents */
            var noise = Math.sin(i * 12.9898 + 78.233) * 0.5 + 0.5;
            var visorZone = normalizedY > 0.65 && normalizedY < 0.85;

            if (visorZone && Math.random() > 0.3) {
              /* Bright green visor */
              cTemp.copy(cGreen);
              var sp = 0.6 + Math.random() * 0.4;
              colors[i * 3] = cTemp.r * sp; colors[i * 3 + 1] = cTemp.g * sp; colors[i * 3 + 2] = cTemp.b * sp;
            } else if (noise > 0.88) {
              /* Neon green edge glow */
              cTemp.copy(cGreen);
              colors[i * 3] = cTemp.r * 0.8; colors[i * 3 + 1] = cTemp.g * 0.8; colors[i * 3 + 2] = cTemp.b * 0.8;
            } else {
              /* Pure White/Bright Silver body */
              var sp = 0.85 + Math.random() * 0.15;
              colors[i * 3] = sp; colors[i * 3 + 1] = sp; colors[i * 3 + 2] = sp;
            }
          }

        }



        return { positions: positions, colors: colors };

      }



      /* ── LOAD 2 MODELS VIA Promise.all (Rocket + Astronaut) ── */

      var loader = new THREE.GLTFLoader();

      function loadGLTF(url) {

        return new Promise(function (resolve, reject) {

          loader.load(url, resolve,

            function (xhr) { if (xhr.total) console.log(url + ': ' + Math.round(xhr.loaded / xhr.total * 100) + '%'); },

            reject

          );

        });

      }



      /* ── STATE ── */

      var shape1Pos, shape1Col, shape2Pos, shape2Col;

      var basePositions = null;

      var velocities = null;

      var cloudReady = false;

      var scatterNoise = null;



      /* ── MORPH STATE ── */

      var morphState = { progress: 0 };

      var scatterStrength = 8.0;



      Promise.all([

        loadGLTF('foguete.glb'),

        loadGLTF('astronaut.glb')

      ]).then(function (results) {

        var rocketData = extractShapeData(results[0], 'rocket');

        var astronautData = extractShapeData(results[1], 'astronaut');



        if (!rocketData || !astronautData) {

          console.error('Failed to extract shape data from models.');

          return;

        }



        shape1Pos = rocketData.positions; shape1Col = rocketData.colors;

        shape2Pos = astronautData.positions; shape2Col = astronautData.colors;



        /* Create Points mesh with rocket data initially */

        var initPositions = new Float32Array(shape1Pos);

        var initColors = new Float32Array(shape1Col);

        var cloudGeo = new THREE.BufferGeometry();

        cloudGeo.setAttribute('position', new THREE.BufferAttribute(initPositions, 3));

        cloudGeo.setAttribute('color', new THREE.BufferAttribute(initColors, 3));



        var cloudMat = new THREE.PointsMaterial({

          size: 0.09,

          map: glowTex,

          vertexColors: true,

          transparent: true,

          opacity: 1,

          blending: THREE.AdditiveBlending,

          depthWrite: false,

          sizeAttenuation: true

        });



        particleGroup.add(new THREE.Points(cloudGeo, cloudMat));



        /* Base positions + drift velocities */

        basePositions = new Float32Array(shape1Pos);

        velocities = new Float32Array(N * 3);

        for (var v = 0; v < N * 3; v++) {

          velocities[v] = (Math.random() - 0.5) * 0.005;

        }



        /* Precompute deterministic scatter noise per particle */

        scatterNoise = new Float32Array(N * 3);

        for (var s = 0; s < N; s++) {

          scatterNoise[s * 3] = Math.sin(s * 1234.5678) * 2.0 - 1.0;

          scatterNoise[s * 3 + 1] = Math.cos(s * 2345.6789) * 2.0 - 1.0;

          scatterNoise[s * 3 + 2] = Math.sin(s * 3456.7890 + 1.23) * 2.0 - 1.0;

        }



        cloudReady = true;

        console.log('Rocket + Astronaut particle shapes loaded: ' + N + ' points each.');



        /* ── GSAP SCROLLTRIGGER: RESPONSIVE TRAJECTORY ── */
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);

          var mm = gsap.matchMedia();

          mm.add({
            isDesktop: "(min-width: 769px)",
            isMobile: "(max-width: 768px)"
          }, function (context) {
            var isDesktop = context.conditions.isDesktop;
            var isMobile = context.conditions.isMobile;

            // 1. SET INITIAL POSITIONS BASED ON DEVICE
            if (isMobile) {
              particleGroup.position.set(1.5, -2.8, 0); // Start low and to the right
              particleGroup.scale.set(1.0, 1.0, 1.0);
              particleGroup.rotation.z = 0.6; // Tilt: base right, tip left
            } else {
              particleGroup.position.set(4.0, -0.5, 0); // Right side for Desktop Hero
              particleGroup.scale.set(1.5, 1.5, 1.5);
            }

            var mainTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: '.hero-wrapper',
                start: 'top top',
                endTrigger: '#alerta',
                end: 'center center',
                scrub: 1.0
              }
            });

            // Morph Shape (Same for both)
            mainTimeline.to(morphState, { progress: 1, duration: 1, ease: 'power2.inOut' }, 0);

            // Hero AutoAlpha Fade
            gsap.fromTo('.hero-content',
              { autoAlpha: 1, scale: 1 },
              {
                scrollTrigger: {
                  trigger: '.hero-wrapper',
                  start: 'top top',
                  end: 'bottom top',
                  scrub: 1.0
                },
                autoAlpha: 0,
                scale: 0.9,
                ease: 'power1.out'
              }
            );

            // Sticky Servicos ScrollSwap
            const stItems = document.querySelectorAll('.service-item');
            const stImg = document.getElementById('service-img');
            stItems.forEach(item => {
              ScrollTrigger.create({
                trigger: item,
                start: "top center",
                end: "bottom center",
                onEnter: () => {
                  stItems.forEach(el => el.classList.remove('active'));
                  item.classList.add('active');
                  if (stImg) {
                    const newSrc = item.getAttribute('data-img');
                    if (newSrc && !stImg.src.includes(newSrc)) {
                      stImg.style.opacity = '0';
                      setTimeout(() => { stImg.src = newSrc; stImg.style.opacity = '1'; }, 250);
                    }
                  }
                },
                onEnterBack: () => {
                  stItems.forEach(el => el.classList.remove('active'));
                  item.classList.add('active');
                  if (stImg) {
                    const newSrc = item.getAttribute('data-img');
                    if (newSrc && !stImg.src.includes(newSrc)) {
                      stImg.style.opacity = '0';
                      setTimeout(() => { stImg.src = newSrc; stImg.style.opacity = '1'; }, 250);
                    }
                  }
                }
              });
            });

            // 2. MOVE TRAJECTORY BASED ON DEVICE
            if (isMobile) {
              // On mobile, move to bottom-center (below the Alerta text)
              mainTimeline.to(particleGroup.position, { x: 0, y: -2.0, duration: 1, ease: 'power2.inOut' }, 0);
            } else {
              // On desktop, move from right to left
              mainTimeline.to(particleGroup.position, { x: -4.0, y: -1, duration: 1, ease: 'power2.inOut' }, 0);
            }

            // Rotation based on device
            if (isMobile) {
              // Straighten astronaut on mobile (remove diagonal tilt)
              mainTimeline.to(particleGroup.rotation, { x: 0, z: 0, duration: 1, ease: 'power2.inOut' }, 0);
            } else {
              // Straighten rotation on desktop
              mainTimeline.to(particleGroup.rotation, { x: 0, z: 0, duration: 1, ease: 'power2.inOut' }, 0);
            }

            // Footer Parallax Title
            gsap.fromTo('.bgword',
              { y: -150 },
              {
                y: 50,
                ease: "none",
                scrollTrigger: {
                  trigger: ".footer",
                  start: "top bottom",
                  end: "bottom bottom",
                  scrub: true
                }
              }
            );

            // Protocolo Bento Glow
            gsap.utils.toArray('.bento-item').forEach(function (item) {
              ScrollTrigger.create({
                trigger: item,
                start: "top 80%",
                onEnter: () => item.classList.add('is-active'),
                onLeaveBack: () => item.classList.remove('is-active')
              });
            });

            // CEO Image Parallax
            gsap.fromTo('.ceo-cutout',
              { y: 80 },
              {
                y: -60,
                ease: "none",
                scrollTrigger: {
                  trigger: "#ceo",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
                }
              }
            );

            // MOBILE ONLY: STACKING CARDS SCROLLTRIGGER
            if (isMobile) {
              const mobileCards = gsap.utils.toArray('.mobile-stacking-card');
              const container = document.querySelector('.stacking-cards-container');
              
              mobileCards.forEach((card, index) => {
                if (index === mobileCards.length - 1) return;

                const overlay = card.querySelector('.stack-overlay');
                
                // Animação de escala do card
                gsap.to(card, {
                  scale: 0.92,
                  ease: "none",
                  scrollTrigger: {
                    trigger: container,
                    start: `top top-=${index * 50}vh`,
                    end: `top top-=${(index + 1) * 50}vh`,
                    scrub: true
                  }
                });

                // Escurecimento do overlay
                gsap.to(overlay, {
                  backgroundColor: "rgba(0,0,0,0.8)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: container,
                    start: `top top-=${index * 50}vh`,
                    end: `top top-=${(index + 1) * 50}vh`,
                    scrub: true
                  }
                });
              });
            }

            return function () {
              // Cleanup when resizing across breakpoints
            };
          });
        }

      }).catch(function (err) {

        console.error('Failed to load GLB models:', err);

      });



      /* ── WINDOW-LEVEL MOUSE TRACKING (works across entire screen) ── */

      var raycaster = new THREE.Raycaster();

      var mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

      var mouseNDC = new THREE.Vector2(-999, -999);

      var localMouse = new THREE.Vector3();

      var isHovering = false;

      var inverseMatrix = new THREE.Matrix4();

      var planeHit = new THREE.Vector3();



      window.addEventListener('mousemove', function (e) {

        var rect = wrapper.getBoundingClientRect();

        mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;

        mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        isHovering = true;

      });



      window.addEventListener('mouseleave', function () {

        isHovering = false;

      });



      /* ── PHYSICS TUNING ── */

      var hoverRadius = 1.0;

      var pushStrength = 0.08;

      var springK = 0.04;



      /* ── ANIMATE: Morphing + Scatter + Organic Drift + Elastic Repulsion ── */

      function animate() {

        requestAnimationFrame(animate);

        /* No rotation — astronaut stands still */



        if (cloudReady && particleGroup.children.length > 0) {

          var points = particleGroup.children[0];

          var posAttr = points.geometry.attributes.position;

          var colAttr = points.geometry.attributes.color;

          var arr = posAttr.array;

          var colArr = colAttr.array;



          /* ── MORPH: Rocket (0) → Astronaut (1) ── */

          var p = morphState.progress;

          var localProgress = Math.max(0, Math.min(p, 1));

          var fromPos = shape1Pos, toPos = shape2Pos;

          var fromCol = shape1Col, toCol = shape2Col;



          /* Dynamic blending: Additive (glow on dark) → Normal (dark on light) */

          var mat = points.material;

          if (localProgress > 0.5) {

            if (mat.blending !== THREE.NormalBlending) {

              mat.blending = THREE.NormalBlending;

              mat.opacity = 0.9;

              mat.needsUpdate = true;

            }

          } else {

            if (mat.blending !== THREE.AdditiveBlending) {

              mat.blending = THREE.AdditiveBlending;

              mat.opacity = 1;

              mat.needsUpdate = true;

            }

          }



          /* Scatter multiplier: peaks at midway, zero at endpoints */

          var scatter = Math.sin(localProgress * Math.PI) * scatterStrength;



          /* Convert mouse to particleGroup local space */

          if (isHovering) {

            raycaster.setFromCamera(mouseNDC, camera);

            if (raycaster.ray.intersectPlane(mousePlane, planeHit)) {

              particleGroup.updateMatrixWorld();

              inverseMatrix.copy(particleGroup.matrixWorld).invert();

              localMouse.copy(planeHit).applyMatrix4(inverseMatrix);

            }

          }



          for (var i = 0; i < N; i++) {

            var ix = i * 3, iy = ix + 1, iz = ix + 2;



            /* Lerp target position between shapes */

            var bx = fromPos[ix] + (toPos[ix] - fromPos[ix]) * localProgress;

            var by = fromPos[iy] + (toPos[iy] - fromPos[iy]) * localProgress;

            var bz = fromPos[iz] + (toPos[iz] - fromPos[iz]) * localProgress;



            /* Add deterministic scatter noise (stardust explosion) */

            bx += scatterNoise[ix] * scatter;

            by += scatterNoise[iy] * scatter;

            bz += scatterNoise[iz] * scatter;



            /* Lerp colors */

            colArr[ix] = fromCol[ix] + (toCol[ix] - fromCol[ix]) * localProgress;

            colArr[iy] = fromCol[iy] + (toCol[iy] - fromCol[iy]) * localProgress;

            colArr[iz] = fromCol[iz] + (toCol[iz] - fromCol[iz]) * localProgress;



            var cx = arr[ix], cy = arr[iy], cz = arr[iz];

            var vx = velocities[ix], vy = velocities[iy], vz = velocities[iz];



            /* 1. ORGANIC DRIFT: add per-particle velocity */

            cx += vx;

            cy += vy;

            cz += vz;



            /* 2. REPULSION: 2D distance (dx, dy) ignoring Z for Vue-like feel */

            if (isHovering) {

              var dx = cx - localMouse.x;

              var dy = cy - localMouse.y;

              var dist = Math.sqrt(dx * dx + dy * dy);



              if (dist < hoverRadius && dist > 0.001) {

                var force = (1.0 - dist / hoverRadius);

                var invDist = 1.0 / dist;

                cx += dx * invDist * force * pushStrength;

                cy += dy * invDist * force * pushStrength;

              }

            }



            /* 3. ELASTIC SPRING: pull back to morphed base position */

            cx += (bx - cx) * springK;

            cy += (by - cy) * springK;

            cz += (bz - cz) * springK;



            arr[ix] = cx;

            arr[iy] = cy;

            arr[iz] = cz;

          }



          posAttr.needsUpdate = true;

          colAttr.needsUpdate = true;

        }



        renderer.render(scene, camera);

      }

      animate();



      /* ── RESIZE ── */

      window.addEventListener('resize', function () {

        var w = wrapper.offsetWidth, h = wrapper.offsetHeight;

        if (!w || !h) return;

        camera.aspect = w / h;

        camera.updateProjectionMatrix();

        renderer.setSize(w, h);

      });

    });





  (function () {
    // 3 portrait cards — phone video format
    var ALL_CARDS = [
      { name: 'Ricardo Alves',    label: 'Founder & CEO',               url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600' },
      { name: 'Ana Beatriz Lima', label: 'Diretora de E-commerce',       url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' },
      { name: 'Carlos Mendes',    label: 'Head de Opera\u00e7\u00f5es',  url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600' },
    ];
    var cardOffset = 0;

    var depCanvas = document.getElementById('dep-canvas');
    if (!depCanvas || typeof THREE === 'undefined') return;

    var depRenderer = new THREE.WebGLRenderer({ canvas: depCanvas, antialias: true, alpha: true });
    depRenderer.setPixelRatio(window.devicePixelRatio);
    depRenderer.setSize(window.innerWidth, window.innerHeight);
    depRenderer.setClearColor(0x000000, 0);
    var depScene = new THREE.Scene();

    function makeDepCam() {
      var W = window.innerWidth, H = window.innerHeight;
      var cam = new THREE.OrthographicCamera(-W/2, W/2, H/2, -H/2, -100, 100);
      cam.position.z = 5; return cam;
    }
    var depCamera = makeDepCam();

    function s2w(sx, sy) { return { x: sx - window.innerWidth/2, y: window.innerHeight/2 - sy }; }
    function elWR(id) {
      var el = document.getElementById(id);
      if (!el) return { x:-200, y:-200, width:400, height:225 };
      var r = el.getBoundingClientRect(), tl = s2w(r.left, r.top);
      return { x:tl.x, y:tl.y, width:r.width, height:r.height };
    }
    function r2v4(r) { return new THREE.Vector4(r.x, r.y, r.height, r.width); }

    var vShader = [
      '#define PI 3.14159265358979',
      'uniform float animateProgress; uniform vec4 startRect; uniform vec4 endRect; varying vec2 vUv;',
      'vec2 rotL(vec2 v,float a){float s=sin(a),c=cos(a);return vec2(v.x*c-v.y*s,v.x*s+v.y*c);}',
      'vec2 rPos(vec4 r,vec2 u){return vec2(mix(r.x,r.x+r.w,u.x),mix(r.y-r.z,r.y,u.y));}',
      'void main(){',
      '  float tw=1.0-(pow(uv.x*uv.x,0.75)+pow(uv.y,1.5))/2.0;',
      '  float lp=smoothstep(tw*0.3,0.7+tw*0.3,animateProgress);',
      '  vec2 p=mix(rPos(startRect,uv),rPos(endRect,uv),lp);',
      '  float w=mix(startRect.w,endRect.w,lp);',
      '  p.x+=mix(w,0.0,cos(lp*PI*2.0)*0.5+0.5)*0.1;',
      '  float rot=(smoothstep(0.0,1.0,lp)-lp)*-0.5;',
      '  p=rotL(p,rot);',
      '  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,0.0,1.0); vUv=uv;}',
    ].join('\n');

    var fShader = [
      '#define RA 1.77777777778',
      'uniform float animateProgress; uniform float borderRadius;',
      'uniform vec4 startRect; uniform vec4 endRect; uniform vec3 tintColour;',
      'uniform sampler2D map; varying vec2 vUv;',
      'float rcm(vec2 uv,float r,float asp){vec2 q=abs(vec2(uv.x*asp,uv.y)-vec2(asp*.5,.5))-vec2(asp*.5-r,.5-r);return 1.0-smoothstep(-.001,.001,length(max(q,0.0))-r);}',
      'float ga(){float w=mix(startRect.w,endRect.w,animateProgress);float h=mix(startRect.z,endRect.z,animateProgress);return w/max(h,0.0001);}',
      'void main(){',
      '  vec2 uv=vUv; float asp=ga(); float as=(asp/RA-1.0)/max(asp,0.0001);',
      '  uv.y=clamp(mix(as,1.0-as,vUv.y),0.0,1.0);',
      '  vec4 c=texture2D(map,uv);',
      '  float tc=1.0-smoothstep(1.0,0.0,animateProgress);',
      '  c.a=rcm(vUv,borderRadius,asp);',
      '  c.rgb=mix(c.rgb*tintColour,c.rgb,tc);',
      '  gl_FragColor=c;}',
    ].join('\n');

    // ── Texture ──────────────────────────────────────────────────────────
    var texC = document.createElement('canvas');
    texC.width = 1920; texC.height = 1080;

    function rRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();}

    // Pre-load all 3 card images
    var cardImages = [null, null, null];
    var depTex;
    ALL_CARDS.forEach(function(card, i) {
      var img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function() { cardImages[i] = img; redrawTex(); };
      img.onerror = function() { cardImages[i] = 'error'; };
      img.src = card.url;
    });

    // ── Portrait card dimensions (9:16 phone format) ──────────────────
    // 3 cards side-by-side in the 1920×1080 texture
    var TEX_W = 1920, TEX_H = 1080;
    var CARD_W = 420;                    // width per card in texture px
    var CARD_H = Math.round(CARD_W * (16/9)); // ≈ 747px  (phone portrait)
    var CARD_GAP = 60;
    var TOTAL_W = 3 * CARD_W + 2 * CARD_GAP;  // 1380px
    var CARD_X0 = Math.round((TEX_W - TOTAL_W) / 2); // 270px left padding
    var CARD_Y  = Math.round((TEX_H - CARD_H) / 2);  // ~166px top padding

    function drawPortraitCard(ctx, cx, cy, cW, cH, card, imgObj) {
      ctx.save();
      // Shadow
      ctx.shadowColor = 'rgba(0,0,0,0.18)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;
      rRect(ctx, cx, cy, cW, cH, 28); ctx.clip();
      ctx.shadowColor = 'transparent';

      // Photo or fallback
      if (imgObj && imgObj !== 'error') {
        var iw=imgObj.naturalWidth, ih=imgObj.naturalHeight;
        var sc=Math.max(cW/iw, cH/ih);
        ctx.drawImage(imgObj, cx+(cW-iw*sc)/2, cy+(cH-ih*sc)/2, iw*sc, ih*sc);
      } else {
        // Neutral dark fallback
        ctx.fillStyle='#2a2c34'; ctx.fillRect(cx, cy, cW, cH);
      }

      // Gradient overlay — dark bottom for text
      var ov=ctx.createLinearGradient(cx,cy,cx,cy+cH);
      ov.addColorStop(0.4,'rgba(0,0,0,0)');
      ov.addColorStop(1,'rgba(0,0,0,0.82)');
      ctx.fillStyle=ov; ctx.fillRect(cx,cy,cW,cH);

      ctx.restore();

      // "▶ Assista o depoimento" button — top right of card
      var btnW=240, btnH=46, btnX=cx+cW-btnW-18, btnY=cy+18;
      ctx.save();
      ctx.shadowColor='rgba(0,0,0,0.15)'; ctx.shadowBlur=8; ctx.shadowOffsetY=2;
      ctx.fillStyle='rgba(255,255,255,0.95)';
      rRect(ctx,btnX,btnY,btnW,btnH,23); ctx.fill();
      ctx.restore();
      ctx.fillStyle='#111'; ctx.font='bold 13px Arial,sans-serif'; ctx.textAlign='center';
      ctx.fillText('\u25b6  Assista o depoimento', btnX+btnW/2, btnY+btnH/2+5);

      // Name + role at bottom of card
      ctx.fillStyle='#fff'; ctx.font='bold 24px Arial,sans-serif'; ctx.textAlign='left';
      ctx.fillText(card.name, cx+22, cy+cH-44);
      ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.font='14px Arial,sans-serif';
      ctx.fillText(card.label, cx+22, cy+cH-20);
    }

    function redrawTex(){
      var ctx = texC.getContext('2d');

      // ── Background: light gray — contrast against dark site ───────────
      ctx.fillStyle = '#F0F1FA';
      ctx.fillRect(0, 0, TEX_W, TEX_H);

      // Subtle noise dots on bg
      ctx.fillStyle = 'rgba(180,182,200,0.25)';
      for (var d=0;d<60;d++){
        ctx.beginPath();
        ctx.arc((d*137.5%1920),(d*97.3%1080),Math.random()*1.5,0,Math.PI*2);
        ctx.fill();
      }

      // Draw all 3 portrait cards
      for (var i=0; i<3; i++) {
        var cx = CARD_X0 + i*(CARD_W+CARD_GAP);
        drawPortraitCard(ctx, cx, CARD_Y, CARD_W, CARD_H, ALL_CARDS[i], cardImages[i]);
      }

      if(depTex) depTex.needsUpdate=true;
    }

    depTex = new THREE.CanvasTexture(texC);
    if(THREE.SRGBColorSpace) depTex.colorSpace = THREE.SRGBColorSpace;
    redrawTex();

    // ── Mesh ────────────────────────────────────────────────────────────
    var geo = new THREE.PlaneGeometry(1,1,64,64);
    var uni = {
      animateProgress:{ value:0 },
      borderRadius:   { value:0.04 },
      tintColour:     { value:new THREE.Color(0.2,0.2,0.4) },
      startRect:      { value:new THREE.Vector4() },
      endRect:        { value:new THREE.Vector4() },
      map:            { value:depTex }
    };
    var mat = new THREE.ShaderMaterial({uniforms:uni,vertexShader:vShader,fragmentShader:fShader,transparent:true,side:THREE.DoubleSide});
    var mesh = new THREE.Mesh(geo,mat); mesh.frustumCulled=false; depScene.add(mesh);

    // ── Rects ────────────────────────────────────────────────────────────
    function recalcRects(){
      var W=window.innerWidth, H=window.innerHeight;
      // startRect: small centered 16:9 box (48% width) — where the panel morphs from
      var sW=W*0.48, sH=sW/(16/9);
      uni.startRect.value = r2v4({x:-sW/2, y:sH/2, width:sW, height:sH});
      // endRect: full expanded panel (86% width, centered)
      var pW=W*0.86, pH=pW/(16/9);
      uni.endRect.value = r2v4({x:-pW/2, y:pH/2, width:pW, height:pH});
    }

    // ── Scroll positions ─────────────────────────────────────────────────
    var sAS=0,sAE=0,sFE=0;
    function calcScrollPos(){
      var zone=document.getElementById('dep-scroll-zone');
      if(!zone) return;
      var zoneTop=zone.getBoundingClientRect().top+window.scrollY;
      // animation plays from when sticky starts (zone top at viewport top)
      // to when the zone bottom reaches viewport bottom
      sAS=zoneTop;
      sAE=zoneTop+zone.offsetHeight-window.innerHeight;
      sFE=sAE;
    }

    // ── Snap scroll ──────────────────────────────────────────────────────
    var targetP=0,currentP=0,snapRAF=null,uScrolling=false,uTimer=null,sIdleTimer=null,lastSY=window.scrollY,sDir=1;
    function stopSnap(){if(snapRAF){cancelAnimationFrame(snapRAF);snapRAF=null;}}
    function snapTo(dest){
      stopSnap();
      var dur=1800,sy=window.scrollY,st=performance.now();
      function step(now){
        if(uScrolling){snapRAF=null;return;}
        var t=Math.min((now-st)/dur,1),e=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
        window.scrollTo(0,sy+(dest-sy)*e);
        if(t<1) snapRAF=requestAnimationFrame(step); else snapRAF=null;
      }
      snapRAF=requestAnimationFrame(step);
    }
    function onUserIntent(){
      if(snapRAF) stopSnap();
      uScrolling=true; clearTimeout(uTimer);
      uTimer=setTimeout(function(){uScrolling=false;checkSnap();},150);
    }
    function checkSnap(){
      if(snapRAF) return;
      if(window.scrollY>sAS&&window.scrollY<sAE){
        var rp=THREE.MathUtils.inverseLerp(sAS,sAE,window.scrollY);
        if(sDir===1){if(rp>0.05)snapTo(sAE);else snapTo(sAS);}
        else{if(rp<0.95)snapTo(sAS);else snapTo(sAE);}
      }
    }
    window.addEventListener('wheel',onUserIntent,{passive:true});
    window.addEventListener('touchmove',onUserIntent,{passive:true});
    window.addEventListener('touchstart',onUserIntent,{passive:true});

    function onDepScroll(){
      targetP=THREE.MathUtils.clamp(THREE.MathUtils.inverseLerp(sAS,sAE,window.scrollY),0,1);
      recalcRects();
      if(window.scrollY>lastSY) sDir=1; else if(window.scrollY<lastSY) sDir=-1;
      lastSY=window.scrollY;
      clearTimeout(sIdleTimer);
      sIdleTimer=setTimeout(function(){if(!uScrolling)checkSnap();},200);
    }
    window.addEventListener('scroll',onDepScroll,{passive:true});

    // ── Overlay positioning ──────────────────────────────────────────────
    var overlayEl = document.getElementById('dep-panel-overlay');
    var ovCards = [
      document.getElementById('dep-ov-card-0'),
      document.getElementById('dep-ov-card-1'),
      document.getElementById('dep-ov-card-2')
    ];
    function updateOverlay(){
      if(!overlayEl) return;
      var W=window.innerWidth, H=window.innerHeight;
      var pW=W*0.86, pH=pW/(16/9);
      var panelLeft=(W-pW)/2;
      var panelTop=(H-pH)/2;

      overlayEl.style.left=panelLeft+'px';
      overlayEl.style.top=panelTop+'px';
      overlayEl.style.width=pW+'px';
      overlayEl.style.height=pH+'px';
      overlayEl.classList.toggle('visible', currentP>0.92);

      // Position each card overlay proportionally from texture coords
      for(var i=0;i<3;i++){
        if(!ovCards[i]) continue;
        var tx = CARD_X0 + i*(CARD_W+CARD_GAP);
        var ty = CARD_Y;
        var css_x = tx / TEX_W * pW;
        var css_y = ty / TEX_H * pH;
        var css_w = CARD_W / TEX_W * pW;
        var css_h = CARD_H / TEX_H * pH;
        ovCards[i].style.left=css_x+'px';
        ovCards[i].style.top=css_y+'px';
        ovCards[i].style.width=css_w+'px';
        ovCards[i].style.height=css_h+'px';
      }
    }

    // ── Resize ───────────────────────────────────────────────────────────
    window.addEventListener('resize',function(){
      var W=window.innerWidth,H=window.innerHeight;
      depCamera.left=-W/2;depCamera.right=W/2;depCamera.top=H/2;depCamera.bottom=-H/2;
      depCamera.updateProjectionMatrix();
      depRenderer.setSize(W,H);
      recalcRects();calcScrollPos();onDepScroll();updateOverlay();
    });

    // ── Render loop ──────────────────────────────────────────────────────
    function loop(){
      requestAnimationFrame(loop);
      currentP+=(targetP-currentP)*.1;
      uni.animateProgress.value=currentP;
      updateOverlay();
      depRenderer.render(depScene,depCamera);
    }

    // ── Init ─────────────────────────────────────────────────────────────
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      recalcRects();calcScrollPos();targetP=0;currentP=0;onDepScroll();updateOverlay();loop();
    });});
  })();
