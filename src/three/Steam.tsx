import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Steam as a shader rather than a sprite sheet: value-noise fbm sheared
 * sideways as it rises, so the column leans and breaks up the way real steam
 * does instead of scrolling. uWarm carries the hour, so the wisps cool from
 * daylight cream to lamp amber across the scroll.
 */
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uWarm;
  uniform float uStrength;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Rise, and lean further the higher it gets.
    float rise = uTime * 0.16;
    float lean = (uv.y * uv.y) * sin(uTime * 0.3 + uv.y * 2.2) * 0.22;
    vec2 p = vec2(uv.x * 3.1 + lean * 3.0, uv.y * 2.4 - rise);

    float n = fbm(p * 1.6);
    n = pow(n, 2.7);

    // Column: dense near the cup, dispersing outward and upward.
    float spread = 0.09 + uv.y * 0.2;
    float column = smoothstep(spread, 0.0, abs(uv.x - 0.5 - lean * 0.5));
    float base = smoothstep(0.0, 0.14, uv.y);
    float top = 1.0 - smoothstep(0.3, 0.95, uv.y);

    float alpha = n * column * base * top * uStrength;
    alpha = clamp(alpha, 0.0, 1.0);

    vec3 cool = vec3(0.98, 0.94, 0.88);
    vec3 warm = vec3(1.0, 0.78, 0.46);
    vec3 col = mix(cool, warm, uWarm);

    gl_FragColor = vec4(col, alpha * 0.5);
    #include <colorspace_fragment>
  }
`;

interface SteamProps {
  /** 0 at first light, 1 late at night. */
  readWarmth: () => number;
  position?: [number, number, number];
}

export function Steam({ readWarmth, position = [0, 0, 0] }: SteamProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWarm: { value: 0 },
      uStrength: { value: 1.15 },
    }),
    [],
  );

  useFrame(({ clock, camera }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uWarm.value += (readWarmth() - uniforms.uWarm.value) * 0.05;
    // Billboard on Y only: the plume should never tip over with the camera.
    if (mesh.current) {
      mesh.current.rotation.y = Math.atan2(
        camera.position.x - mesh.current.position.x,
        camera.position.z - mesh.current.position.z,
      );
    }
  });

  return (
    <mesh ref={mesh} position={position} renderOrder={4}>
      <planeGeometry args={[0.55, 0.88, 1, 1]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}
