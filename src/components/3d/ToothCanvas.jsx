import * as THREE from 'three'
import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, Float, ContactShadows, OrbitControls } from '@react-three/drei'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import SceneLighting from './SceneLighting.jsx'
import WebGLGuard from './WebGLGuard.jsx'

function smoothstep(edge0, edge1, x) {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function piecewise(progress, points) {
  for (let i = 0; i < points.length - 1; i++) {
    const [p0, v0] = points[i]
    const [p1, v1] = points[i + 1]
    if (progress <= p1 || i === points.length - 2) {
      return THREE.MathUtils.lerp(v0, v1, smoothstep(p0, p1, progress))
    }
  }
  return points[points.length - 1][1]
}

function offsetCircleRadius(theta, cx, r) {
  const s = Math.sin(theta)
  const disc = r * r - cx * cx * s * s
  if (disc < 0) return 0
  return cx * Math.cos(theta) + Math.sqrt(disc)
}

function SculptedTooth({ isMobile }) {
  const meshRef = useRef()

  const toothGeometry = useMemo(() => {
    // --- 1. CROWN GEOMETRY ---
    const crownGeo = new THREE.BoxGeometry(1.3, 1.1, 1.1, 48, 48, 48)
    crownGeo.translate(0, 0.35, 0)
    const crownPos = crownGeo.attributes.position

    for (let i = 0; i < crownPos.count; i++) {
      let x = crownPos.getX(i)
      let y = crownPos.getY(i)
      let z = crownPos.getZ(i)

      const angle = Math.atan2(z, x)
      const rawRadius = Math.sqrt(x * x + z * z)
      const radiusX = 0.65
      const radiusZ = 0.58
      const ovalRadius = (radiusX * radiusZ) /
        Math.sqrt(Math.pow(radiusZ * Math.cos(angle), 2) + Math.pow(radiusX * Math.sin(angle), 2))
      const curvedRadius = THREE.MathUtils.lerp(rawRadius, ovalRadius, 0.82)

      // Crown wall contour equations
      const verticalBulge = 1 + Math.sin((y - 0.1) * 0.8 * Math.PI) * 0.18
      const lobeGrooves = 1 + Math.sin(angle * 4) * 0.04

      x = Math.cos(angle) * curvedRadius * verticalBulge * lobeGrooves
      z = Math.sin(angle) * curvedRadius * verticalBulge * lobeGrooves

      if (y > 0.65) {
        const cusp1 = Math.exp(-6.5 * (Math.pow(x - 0.42, 2) + Math.pow(z - 0.35, 2)))
        const cusp2 = Math.exp(-6.5 * (Math.pow(x + 0.42, 2) + Math.pow(z - 0.35, 2)))
        const cusp3 = Math.exp(-6.5 * (Math.pow(x - 0.42, 2) + Math.pow(z + 0.35, 2)))
        const cusp4 = Math.exp(-6.5 * (Math.pow(x + 0.42, 2) + Math.pow(z + 0.35, 2)))
        y += (cusp1 + cusp2 + cusp3 + cusp4) * 0.36
        const distFromCenter = Math.sqrt(x * x + z * z)
        if (distFromCenter < 0.38) y -= (0.38 - distFromCenter) * 0.15
      }

      crownPos.setXYZ(i, x, y, z)
    }

    // --- 2. ROOT GEOMETRY CONTINUOUSLY EXTENDED FROM CROWN ---
    const rootHeight = 1.35
    const rootGeo = new THREE.CylinderGeometry(0.58, 0.03, rootHeight, 64, 140, false)
    rootGeo.translate(0, -0.2 - rootHeight / 2, 0)
    const rootPos = rootGeo.attributes.position

    const RADIUS_CURVE = [
      [0, 0.58],
      [0.2, 0.45],
      [0.5, 0.28],
      [0.8, 0.15],
      [1, 0.05],
    ]

    const SPLIT_CURVE = [
      [0, 0],
      [0.2, 0.0],
      [0.5, 0.45],
      [0.85, 0.55],
      [1, 0.4],
    ]

    for (let i = 0; i < rootPos.count; i++) {
      let x = rootPos.getX(i)
      let y = rootPos.getY(i)
      let z = rootPos.getZ(i)

      const progress = THREE.MathUtils.clamp((-0.2 - y) / rootHeight, 0, 1)
      const angle = Math.atan2(z, x)

      // Calculate root split profile
      const lobeR = piecewise(progress, RADIUS_CURVE)
      const splitFrac = piecewise(progress, SPLIT_CURVE)
      const cx = splitFrac * lobeR

      const splitRadius = Math.max(
        offsetCircleRadius(angle, cx, lobeR),
        offsetCircleRadius(angle, -cx, lobeR)
      )

      // Exact crown wall math applied continuously to top of root (progress = 0 to 0.35)
      const radiusX = 0.65
      const radiusZ = 0.58
      const ovalRadius = (radiusX * radiusZ) /
        Math.sqrt(Math.pow(radiusZ * Math.cos(angle), 2) + Math.pow(radiusX * Math.sin(angle), 2))
      const verticalBulge = 1 + Math.sin((y - 0.1) * 0.8 * Math.PI) * 0.18
      const lobeGrooves = 1 + Math.sin(angle * 4) * 0.04
      const crownWallRadius = ovalRadius * verticalBulge * lobeGrooves

      // Smooth blend over the upper 35% of root height to prevent horizontal pinch lines
      const blendFactor = smoothstep(0, 0.35, progress)
      const currentRadius = THREE.MathUtils.lerp(crownWallRadius, splitRadius, blendFactor)

      // Gradual side tapering down to tip
      const sagittalFlattening = THREE.MathUtils.lerp(1.0, 1 - progress * 0.45, blendFactor)
      const tipTaper = 1 - smoothstep(0.85, 1, progress) * 0.65

      x = Math.cos(angle) * currentRadius * tipTaper
      z = Math.sin(angle) * currentRadius * tipTaper * sagittalFlattening

      rootPos.setXYZ(i, x, y, z)
    }

    const mergedGeo = BufferGeometryUtils.mergeGeometries([crownGeo, rootGeo])
    mergedGeo.computeVertexNormals()

    return mergedGeo
  }, [])

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={meshRef} scale={isMobile ? 1.0 : 1.3} position={[0, 0.1, 0]}>
      <mesh geometry={toothGeometry}>
        <meshPhysicalMaterial
          color="#fcfdfd"
          roughness={0.12}
          metalness={0.02}
          transmission={0.15}
          thickness={0.6}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.62}
        />
      </mesh>
    </group>
  )
}

function AlignerRing() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 2.4
      ref.current.rotation.z = clock.getElapsedTime() * 0.25
    }
  })
  return (
    <Torus ref={ref} args={[2.3, 0.035, 16, 100]}>
      <meshStandardMaterial color="#22D3EE" emissive="#0891B2" emissiveIntensity={0.6} roughness={0.2} />
    </Torus>
  )
}

function Scene({ isMobile }) {
  const controlsRef = useRef()
  const [autoRotate, setAutoRotate] = useState(true)

  return (
    <>
      <SceneLighting />
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <SculptedTooth isMobile={isMobile} />
      </Float>
      <AlignerRing />
      <ContactShadows position={[0, -2.1, 0]} opacity={0.55} scale={10} blur={2.2} far={4} color="#0E7490" />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        autoRotate={autoRotate}
        autoRotateSpeed={1.1}
        onStart={() => setAutoRotate(false)}
        onEnd={() => setAutoRotate(true)}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.7}
      />
    </>
  )
}

export default function ToothCanvas({ className = '' }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  return (
    <div className={className}>
      <WebGLGuard fallback={<div className="flex h-full w-full items-center justify-center text-cyan-400">Loading Canvas...</div>}>
        <Canvas
          camera={{ position: [0, 0.3, 5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          aria-label="Interactive 3D dental model — drag to rotate"
        >
          <Suspense fallback={null}>
            <Scene isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </WebGLGuard>
    </div>
  )
}