import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '../components/ui/button';
import { Heart, SkipForward } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface IntroAnimationProps {
  onComplete: () => void;
}

type AnimationState = 'loading' | 'playing' | 'completed' | 'error';
type AssetType = 'glb' | 'mp4' | 'poster' | 'none';

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mixer?: THREE.AnimationMixer;
    animationId?: number;
  } | null>(null);
  
  const [animationState, setAnimationState] = useState<AnimationState>('loading');
  const [assetType, setAssetType] = useState<AssetType>('none');
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Asset detection and loading
  const detectAndLoadAssets = useCallback(async () => {
    try {
      // Try GLB first
      const glbResponse = await fetch('/assets/intro/hemora_intro.glb', { method: 'HEAD' });
      if (glbResponse.ok) {
        setAssetType('glb');
        await loadGLBAnimation();
        return;
      }
    } catch (error) {
      console.log('GLB not found, trying MP4...');
    }

    try {
      // Try MP4 fallback
      const mp4Response = await fetch('/assets/intro/hemora_intro.mp4', { method: 'HEAD' });
      if (mp4Response.ok) {
        setAssetType('mp4');
        await loadMP4Animation();
        return;
      }
    } catch (error) {
      console.log('MP4 not found, trying poster...');
    }

    try {
      // Try poster fallback
      const posterResponse = await fetch('/assets/intro/hemora_poster.jpg', { method: 'HEAD' });
      if (posterResponse.ok) {
        setAssetType('poster');
        setAnimationState('completed');
        return;
      }
    } catch (error) {
      console.log('No assets found, using fallback');
    }

    // No assets found - show fallback
    setAssetType('none');
    setAnimationState('completed');
  }, []);

  // GLB Animation with three.js
  const loadGLBAnimation = useCallback(async () => {
    if (!canvasRef.current || prefersReducedMotion) {
      setAnimationState('completed');
      return;
    }

    try {
      // Initialize three.js scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        antialias: true, 
        alpha: true 
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // Cinematic lighting setup
      const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
      scene.add(ambientLight);

      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
      scene.add(hemisphereLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
      keyLight.position.set(5, 10, 5);
      keyLight.castShadow = true;
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xff6b6b, 0.5);
      rimLight.position.set(-5, 5, -5);
      scene.add(rimLight);

      // Position camera for cinematic view
      camera.position.set(0, 2, 5);
      camera.lookAt(0, 0, 0);

      // Store scene reference
      sceneRef.current = { scene, camera, renderer };

      // Load GLB model
      const loader = new GLTFLoader();
      
      loader.load(
        '/assets/intro/hemora_intro.glb',
        (gltf) => {
          scene.add(gltf.scene);
          
          // Setup animation mixer if animations exist
          let mixer: THREE.AnimationMixer | undefined;
          if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(gltf.scene);
            sceneRef.current!.mixer = mixer;
            
            // Play all animations
            gltf.animations.forEach((clip) => {
              const action = mixer!.createAction(clip);
              action.setLoop(THREE.LoopOnce, 1);
              action.clampWhenFinished = true;
              action.play();
            });

            // Listen for animation completion
            mixer.addEventListener('finished', () => {
              setTimeout(() => {
                setAnimationState('completed');
              }, 800); // Wait a bit before transitioning
            });
          } else {
            // No animations in GLB - create scripted animation
            createScriptedAnimation(gltf.scene);
          }

          setAnimationState('playing');
          startRenderLoop();
        },
        (progress) => {
          setProgress((progress.loaded / progress.total) * 100);
        },
        (error) => {
          console.error('Error loading GLB:', error);
          setAnimationState('error');
          // Try MP4 fallback
          loadMP4Animation();
        }
      );
    } catch (error) {
      console.error('Three.js setup error:', error);
      setAnimationState('error');
      loadMP4Animation();
    }
  }, [prefersReducedMotion]);

  // Create scripted droplet animation if GLB has no animations
  const createScriptedAnimation = useCallback((model: THREE.Object3D) => {
    if (!sceneRef.current) return;

    const { scene, camera } = sceneRef.current;
    
    // Create droplet geometry for animation
    const dropletGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const dropletMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xD32F2F,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.8,
      thickness: 0.5,
    });

    // Animate camera and create droplet effect
    const startTime = Date.now();
    const animationDuration = 3500; // 3.5 seconds

    const animateScene = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Camera movement
      const cameraRadius = 5 - progress * 2;
      camera.position.x = Math.sin(progress * Math.PI * 0.5) * cameraRadius;
      camera.position.y = 2 + Math.sin(progress * Math.PI) * 0.5;
      camera.position.z = Math.cos(progress * Math.PI * 0.5) * cameraRadius;
      camera.lookAt(0, 0, 0);

      // Create droplet effect at intervals
      if (progress < 0.8 && Math.random() < 0.1) {
        const droplet = new THREE.Mesh(dropletGeometry, dropletMaterial);
        droplet.position.set(
          (Math.random() - 0.5) * 2,
          3 + Math.random(),
          (Math.random() - 0.5) * 2
        );
        scene.add(droplet);

        // Animate droplet falling
        const fallAnimation = () => {
          droplet.position.y -= 0.05;
          droplet.rotation.x += 0.02;
          droplet.rotation.z += 0.01;
          
          if (droplet.position.y > -2) {
            requestAnimationFrame(fallAnimation);
          } else {
            scene.remove(droplet);
          }
        };
        fallAnimation();
      }

      if (progress >= 1) {
        setTimeout(() => {
          setAnimationState('completed');
        }, 600);
      }
    };

    // Start scripted animation
    const animate = () => {
      animateScene();
      if (sceneRef.current && animationState === 'playing') {
        sceneRef.current.animationId = requestAnimationFrame(animate);
      }
    };
    animate();
  }, [animationState]);

  // MP4 Animation fallback
  const loadMP4Animation = useCallback(async () => {
    if (!videoRef.current) {
      setAnimationState('error');
      return;
    }

    try {
      const video = videoRef.current;
      video.src = '/assets/intro/hemora_intro.mp4';
      
      video.onloadeddata = () => {
        setAnimationState('playing');
        if (!prefersReducedMotion) {
          video.play().catch(console.error);
        }
      };

      video.onended = () => {
        setTimeout(() => {
          setAnimationState('completed');
        }, 600);
      };

      video.onerror = () => {
        setAnimationState('error');
        setAssetType('poster');
      };

    } catch (error) {
      console.error('Error loading MP4:', error);
      setAnimationState('error');
      setAssetType('poster');
    }
  }, [prefersReducedMotion]);

  // Three.js render loop
  const startRenderLoop = useCallback(() => {
    if (!sceneRef.current) return;

    const { scene, camera, renderer, mixer } = sceneRef.current;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      
      if (mixer) {
        mixer.update(delta);
      }

      renderer.render(scene, camera);
      
      if (animationState === 'playing') {
        sceneRef.current!.animationId = requestAnimationFrame(animate);
      }
    };

    animate();
  }, [animationState]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (sceneRef.current) {
        const { camera, renderer } = sceneRef.current;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show skip button after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-complete if reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = setTimeout(() => setAnimationState('completed'), 2000);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion]);

  // Handle animation completion
  useEffect(() => {
    if (animationState === 'completed') {
      const timer = setTimeout(() => {
        // Cleanup three.js resources
        if (sceneRef.current) {
          const { renderer, animationId } = sceneRef.current;
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
          renderer.dispose();
        }
        
        // Trigger cinematic transition to landing page
        onComplete();
      }, 900);
      
      return () => clearTimeout(timer);
    }
  }, [animationState, onComplete]);

  // Initialize animation on mount
  useEffect(() => {
    detectAndLoadAssets();
    
    return () => {
      // Cleanup on unmount
      if (sceneRef.current?.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      if (sceneRef.current?.renderer) {
        sceneRef.current.renderer.dispose();
      }
    };
  }, [detectAndLoadAssets]);

  // Skip handler
  const handleSkip = useCallback(() => {
    setAnimationState('completed');
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSkip]);

  return (
    <div className="intro-container">
      {/* Background Gradient */}
      <div className="intro-background" />
      
      {/* Loading State */}
      {animationState === 'loading' && (
        <div className="intro-loading">
          <div className="intro-logo">
            <Heart className="h-16 w-16 text-white intro-logo-pulse" />
            <span className="text-2xl font-bold text-white mt-4">Hemora</span>
          </div>
          <div className="intro-progress">
            <div className="intro-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-white/80 mt-4">Loading cinematic intro...</p>
        </div>
      )}

      {/* Three.js Canvas for GLB */}
      {assetType === 'glb' && (
        <canvas
          ref={canvasRef}
          className={`intro-canvas ${animationState === 'playing' ? 'intro-canvas-visible' : ''}`}
        />
      )}

      {/* Video for MP4 */}
      {assetType === 'mp4' && (
        <video
          ref={videoRef}
          className={`intro-video ${animationState === 'playing' ? 'intro-video-visible' : ''}`}
          muted
          playsInline
          preload="auto"
        />
      )}

      {/* Poster/Fallback */}
      {(assetType === 'poster' || assetType === 'none' || animationState === 'error') && (
        <div className="intro-fallback">
          <div className="intro-fallback-content">
            <Heart className="h-24 w-24 text-white mb-6 intro-fallback-pulse" />
            <h1 className="text-4xl font-bold text-white mb-4">Hemora</h1>
            <p className="text-xl text-white/90 mb-8">Donate Blood, Save Lives</p>
            {prefersReducedMotion && (
              <p className="text-sm text-white/70 mb-6">
                Animation disabled due to motion preferences
              </p>
            )}
            <Button 
              onClick={handleSkip}
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              Enter Application
            </Button>
          </div>
        </div>
      )}

      {/* Skip Button */}
      {showSkip && animationState !== 'completed' && (
        <Button
          onClick={handleSkip}
          variant="outline"
          size="sm"
          className="intro-skip-button"
          aria-label="Skip intro animation"
        >
          <SkipForward className="h-4 w-4 mr-2" />
          Skip Intro
        </Button>
      )}

      {/* Completion Overlay with Cinematic Transition */}
      {animationState === 'completed' && (
        <div className="intro-completion-overlay">
          <div className="intro-zoom-effect" />
        </div>
      )}

      <style jsx>{`
        .intro-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .intro-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #D32F2F 0%, #8B0000 50%, #4A0000 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease-in-out infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .intro-loading {
          position: relative;
          z-index: 10;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .intro-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }

        .intro-logo-pulse {
          animation: logoPulse 2s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
        }

        @keyframes logoPulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        .intro-progress {
          width: 200px;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
          margin: 1rem 0;
        }

        .intro-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #ffffff, #ffcccb);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .intro-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .intro-canvas-visible {
          opacity: 1;
        }

        .intro-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .intro-video-visible {
          opacity: 1;
        }

        .intro-fallback {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .intro-fallback-content {
          text-align: center;
          max-width: 500px;
          padding: 2rem;
        }

        .intro-fallback-pulse {
          animation: fallbackPulse 3s ease-in-out infinite;
          filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.4));
        }

        @keyframes fallbackPulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
          33% { transform: scale(1.1) rotate(2deg); opacity: 1; }
          66% { transform: scale(1.05) rotate(-1deg); opacity: 0.95; }
        }

        .intro-skip-button {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 20;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #D32F2F;
          transition: all 0.3s ease;
          animation: skipButtonSlide 0.5s ease-out;
        }

        .intro-skip-button:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        @keyframes skipButtonSlide {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .intro-completion-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 30;
          pointer-events: none;
        }

        .intro-zoom-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: cinematicZoom 0.8s ease-in forwards;
        }

        @keyframes cinematicZoom {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(50);
            opacity: 0;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .intro-skip-button {
            bottom: 1rem;
            right: 1rem;
            padding: 0.5rem 1rem;
          }
          
          .intro-fallback-content {
            padding: 1rem;
          }
          
          .intro-fallback-content h1 {
            font-size: 2.5rem;
          }
          
          .intro-fallback-content p {
            font-size: 1.1rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .intro-logo-pulse,
          .intro-fallback-pulse {
            animation: none;
          }
          
          .intro-background {
            animation: none;
            background: #D32F2F;
          }
          
          .intro-canvas,
          .intro-video {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}