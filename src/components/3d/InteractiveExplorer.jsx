import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SceneLighting from './SceneLighting.jsx'
import WebGLGuard from './WebGLGuard.jsx'

export const ZONES = [
  {
    id: 'incisors',
    label: 'Incisors',
    color: '#22D3EE',
    positions: [-2.4, -1.4, 1.4, 2.4],
    procedure: 'Front-tooth veneers, bonding, and whitening are planned here for the most visible part of your smile.',
  },
  {
    id: 'canines',
    label: 'Canines',
    color: '#34D399',
    positions: [-3.2, 3.2],
    procedure: 'These anchor points are a common focus in Invisalign plans, guiding the bite\u2019s overall alignment.',
  },
  {
    id: 'molars',
    label: 'Molars',
    color: '#F0FDFA',
    positions: [-4.6, -3.9, 3.9, 4.6],
    procedure: 'Root canals, crowns, and implants are most often placed here to restore chewing strength.',
  },
]

function ToothMarker({ x, color, active, onSelect }) {
  return (
    <group position={[x * 0.42, 0, 0]}>
      <mesh
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = 'auto' }}
      >
        <capsuleGeometry args={[0.24, 0.5, 8, 16]} />
        <meshStandardMaterial
          color={active ? color : '#cbd5e1'}
          emissive={active ? color : '#000000'}
          emissiveIntensity={active ? 0.5 : 0}
          roughness={0.35}
        />
      </mesh>
    </group>
  )
}

function ExplorerScene({ activeZoneId, onSelect }) {
  return (
    <>
      <SceneLighting />
      {ZONES.map((zone) =>
        zone.positions.map((x) => (
          <ToothMarker
            key={`${zone.id}-${x}`}
            x={x}
            color={zone.color}
            active={activeZoneId === zone.id}
            onSelect={() => onSelect(zone.id)}
          />
        ))
      )}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.9}
        autoRotate={false}
      />
    </>
  )
}

/**
 * frameloop="demand" keeps this canvas idle until the user orbits or
 * clicks a tooth zone, per the TRD's "static views" render budget.
 */
export default function InteractiveExplorer({ className = '' }) {
  const [activeZoneId, setActiveZoneId] = useState('incisors')
  const dpr = useMemo(() => [1, Math.min(window.devicePixelRatio || 1, 2)], [])
  const activeZone = ZONES.find((z) => z.id === activeZoneId)

  return (
    <div className={className}>
      <WebGLGuard
        fallback={
          <div className="flex h-full flex-col items-center justify-center gap-4 rounded-3xl bg-white/[0.03] p-8 text-center">
            <p className="text-porcelain-100/70">3D preview isn't available on this device.</p>
          </div>
        }
      >
        <div className="relative h-full">
          <Canvas
            frameloop="demand"
            dpr={dpr}
            camera={{ position: [0, 0.6, 4.4], fov: 45 }}
            aria-label="Interactive dental anatomy explorer — click a tooth zone"
          >
            <Suspense fallback={null}>
              <ExplorerScene activeZoneId={activeZoneId} onSelect={setActiveZoneId} />
            </Suspense>
          </Canvas>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-4">
            {ZONES.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => setActiveZoneId(zone.id)}
                className={`pointer-events-auto rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeZoneId === zone.id
                    ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
                    : 'border-white/15 text-porcelain-100/70 hover:border-white/30'
                }`}
              >
                {zone.label}
              </button>
            ))}
          </div>
        </div>
      </WebGLGuard>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5" aria-live="polite">
        <p className="text-sm font-semibold text-cyan-300">{activeZone.label}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-porcelain-100/70">{activeZone.procedure}</p>
      </div>
    </div>
  )
}
