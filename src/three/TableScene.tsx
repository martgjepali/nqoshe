import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Steam } from './Steam';

/* -------------------------------------------------------------------------
   A corner table, stylised. Lathed ceramic, a closed book, one plant.
   Nothing is photoreal on purpose: the warmth has to come from the light,
   which is the only thing the scroll actually changes.
------------------------------------------------------------------------- */

const CUP_PROFILE: THREE.Vector2[] = [
  [0.001, 0.0],
  [0.148, 0.0],
  [0.166, 0.018],
  [0.196, 0.098],
  [0.231, 0.198],
  [0.253, 0.298],
  [0.243, 0.306],
  [0.223, 0.29],
  [0.2, 0.198],
  [0.171, 0.098],
  [0.152, 0.03],
  [0.001, 0.028],
].map(([x, y]) => new THREE.Vector2(x, y));

const SAUCER_PROFILE: THREE.Vector2[] = [
  [0.001, 0.0],
  [0.2, 0.0],
  [0.31, 0.006],
  [0.355, 0.03],
  [0.352, 0.042],
  [0.3, 0.024],
  [0.18, 0.018],
  [0.001, 0.016],
].map(([x, y]) => new THREE.Vector2(x, y));

function Ceramic({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

function CupAndSaucer() {
  const glaze = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F3E8D6',
        roughness: 0.34,
        metalness: 0.02,
        side: THREE.DoubleSide,
      }),
    [],
  );
  const coffee = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2A150C',
        roughness: 0.16,
        metalness: 0.05,
      }),
    [],
  );

  return (
    <Ceramic>
      <group position={[0, 0, 0]}>
        <mesh material={glaze} castShadow receiveShadow>
          <latheGeometry args={[SAUCER_PROFILE, 64]} />
        </mesh>
        <group position={[0, 0.026, 0]}>
          <mesh material={glaze} castShadow receiveShadow>
            <latheGeometry args={[CUP_PROFILE, 64]} />
          </mesh>
          {/* handle */}
          <mesh
            material={glaze}
            position={[0.255, 0.16, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          >
            <torusGeometry args={[0.082, 0.019, 14, 40, Math.PI * 1.25]} />
          </mesh>
          {/* the reading itself */}
          <mesh material={coffee} position={[0, 0.262, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.204, 48]} />
          </mesh>
        </group>
      </group>
    </Ceramic>
  );
}

function Book() {
  return (
    <group position={[-0.52, 0.022, -0.02]} rotation={[0, 0.52, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.045, 0.33]} />
        <meshStandardMaterial color="#4E5B3A" roughness={0.82} />
      </mesh>
      <mesh position={[0.008, 0.0, 0]} castShadow>
        <boxGeometry args={[0.435, 0.034, 0.308]} />
        <meshStandardMaterial color="#E6D9BE" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.0235, 0]}>
        <boxGeometry args={[0.462, 0.004, 0.332]} />
        <meshStandardMaterial color="#3E4A2E" roughness={0.75} />
      </mesh>
    </group>
  );
}

function Plant() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2 + 0.55;
        const tier = i % 3;
        const lean = 0.62 + tier * 0.2;
        return {
          pos: [Math.cos(a) * 0.045, 0.14 + tier * 0.05, Math.sin(a) * 0.045] as const,
          rot: [Math.cos(a) * lean, -a, Math.sin(a) * lean] as const,
          len: 0.19 + ((i * 7) % 5) * 0.022,
        };
      }),
    [],
  );

  return (
    <group position={[0.5, 0, -0.34]}>
      {/* pot */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.085, 0.066, 0.13, 28]} />
        <meshStandardMaterial color="#A9694A" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.067, 0]} castShadow>
        <cylinderGeometry args={[0.092, 0.092, 0.018, 28]} />
        <meshStandardMaterial color="#8F573C" roughness={0.88} />
      </mesh>
      <mesh position={[0, 0.073, 0]}>
        <cylinderGeometry args={[0.079, 0.079, 0.012, 24]} />
        <meshStandardMaterial color="#241812" roughness={1} />
      </mesh>
      {/* leaves: narrow, upright, each on its own stem angle */}
      {leaves.map((l, i) => (
        <group key={i} position={l.pos} rotation={l.rot}>
          <mesh position={[0, l.len * 0.32, 0]} castShadow>
            <capsuleGeometry args={[0.0035, l.len * 0.6, 4, 6]} />
            <meshStandardMaterial color="#48562F" roughness={0.88} />
          </mesh>
          <mesh
            position={[0, l.len * 0.92, 0]}
            scale={[0.026, l.len * 0.78, 0.007]}
            castShadow
          >
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial color={i % 2 ? '#5C6B42' : '#6E7E4E'} roughness={0.76} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Table() {
  return (
    <group position={[0, -0.045, 0]}>
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[1.32, 1.32, 0.09, 96]} />
        <meshStandardMaterial color="#4E341F" roughness={0.86} metalness={0.02} />
      </mesh>
      {/* a turned lip, so the edge catches the light instead of ending flat */}
      <mesh position={[0, 0.006, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.315, 0.036, 10, 96]} />
        <meshStandardMaterial color="#6B452A" roughness={0.7} metalness={0.03} />
      </mesh>
      {/* pedestal, mostly implied: it reads as depth under the edge */}
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.2, 0.34, 0.8, 24]} />
        <meshStandardMaterial color="#2C1B10" roughness={0.95} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ light */

const SUN_KEYS = [
  // hour of the day, sun position, colour, intensity
  { h: 6.0, pos: [-3.6, 0.3, 2.0], color: '#D9742F', i: 1.2 },
  { h: 8.0, pos: [-3.4, 1.0, 1.9], color: '#FFC373', i: 4.4 },
  { h: 13.0, pos: [-0.8, 4.6, 1.1], color: '#FFEFD6', i: 3.9 },
  { h: 18.5, pos: [2.5, 0.95, 0.9], color: '#FF8033', i: 3.4 },
  { h: 20.0, pos: [3.0, 0.2, 0.4], color: '#8E3410', i: 0.6 },
  { h: 24.0, pos: [3.2, -0.3, 0.2], color: '#4A1A08', i: 0.05 },
];

function sample(hour: number) {
  let a = SUN_KEYS[0];
  let b = SUN_KEYS[SUN_KEYS.length - 1];
  for (let i = 0; i < SUN_KEYS.length - 1; i++) {
    if (hour >= SUN_KEYS[i].h && hour <= SUN_KEYS[i + 1].h) {
      a = SUN_KEYS[i];
      b = SUN_KEYS[i + 1];
      break;
    }
  }
  const t = b.h === a.h ? 0 : (hour - a.h) / (b.h - a.h);
  return { a, b, t };
}

function Light({ read }: { read: () => number }) {
  // `read` returns the smoothed hour, so dragging the dial moves the sun
  // rather than cutting to it.
  const sun = useRef<THREE.DirectionalLight>(null);
  const lamp = useRef<THREE.PointLight>(null);
  const ambient = useRef<THREE.HemisphereLight>(null);

  const ca = useMemo(() => new THREE.Color(), []);
  const cb = useMemo(() => new THREE.Color(), []);
  const skyDay = useMemo(() => new THREE.Color('#FFE6BE'), []);
  const skyNight = useMemo(() => new THREE.Color('#2A1C12'), []);
  const scratch = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const p = read();
    const { a, b, t } = sample(p);

    if (sun.current) {
      sun.current.position.set(
        THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
        THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
        THREE.MathUtils.lerp(a.pos[2], b.pos[2], t),
      );
      ca.set(a.color);
      cb.set(b.color);
      sun.current.color.copy(ca).lerp(cb, t);
      sun.current.intensity = THREE.MathUtils.lerp(a.i, b.i, t);
    }

    if (lamp.current) {
      // The table lamp only earns its place once the sun has gone.
      lamp.current.intensity = THREE.MathUtils.smoothstep(p, 17.4, 20.2) * 3.8;
    }

    if (ambient.current) {
      scratch.copy(skyDay).lerp(skyNight, THREE.MathUtils.smoothstep(p, 16.8, 20.4));
      ambient.current.color.copy(scratch);
      ambient.current.intensity = THREE.MathUtils.lerp(
        0.9,
        0.2,
        THREE.MathUtils.smoothstep(p, 16.6, 20.4),
      );
    }
  });

  return (
    <>
      <hemisphereLight ref={ambient} groundColor="#3A2415" intensity={1.15} />
      <directionalLight
        ref={sun}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={14}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0012}
      />
      <pointLight
        ref={lamp}
        position={[-0.86, 0.72, 0.42]}
        color="#FFB562"
        distance={4.2}
        decay={2}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-bias={-0.002}
      />
      {/* A cold rim off the window glass so the ceramic keeps an edge at night. */}
      <directionalLight position={[1.6, 1.1, -2.8]} intensity={0.85} color="#93A9BE" />
    </>
  );
}

/* ------------------------------------------------------------------ scene */

function Rig({ read }: { read: () => number }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    const k = 1 - Math.pow(0.0015, delta); // frame-rate independent damping
    group.current.rotation.y += (pointer.x * 0.17 - group.current.rotation.y) * k;
    group.current.rotation.x += (-pointer.y * 0.045 - group.current.rotation.x) * k;
  });

  return (
    <group ref={group}>
      <Table />
      <CupAndSaucer />
      <Book />
      <Plant />
      <Steam readWarmth={read} position={[0, 0.76, 0.02]} />
      <ContactShadows
        position={[0, 0.004, 0]}
        opacity={0.85}
        scale={3.2}
        blur={1.9}
        far={1.1}
        resolution={768}
        color="#120A05"
      />
    </group>
  );
}

export default function TableScene({ hour }: { hour: number }) {
  // The target the caller set, and the value the scene is actually showing.
  // Easing here rather than in React keeps a drag at 60fps with no re-renders.
  const target = useRef(hour);
  const shown = useRef(hour);
  target.current = hour;

  const read = useMemo(() => () => shown.current, []);

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0.08, 0.66, 3.5], fov: 31 }}
      onCreated={({ gl, camera }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.06;
        camera.lookAt(0, 0.08, 0);
        camera.updateProjectionMatrix();
      }}
      style={{ touchAction: 'pan-y' }}
    >
      <Ease target={target} shown={shown} />
      <group position={[0, 0.02, 0]}>
        <Light read={read} />
        <Rig read={read} />
      </group>
    </Canvas>
  );
}

/** One place that walks the shown hour toward the target, frame-rate safe. */
function Ease({
  target,
  shown,
}: {
  target: React.RefObject<number>;
  shown: React.RefObject<number>;
}) {
  useFrame((_, delta) => {
    const k = 1 - Math.pow(0.0001, delta);
    shown.current += (target.current - shown.current) * k;
  });
  return null;
}
