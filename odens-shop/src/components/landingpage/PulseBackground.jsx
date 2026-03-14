import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Section accent colors matching the ScrollShowcase
const SECTION_COLORS = [
    new THREE.Color('#e85d04'), // Hero / Reels — orange
    new THREE.Color('#e91e8c'), // Branding — pink
    new THREE.Color('#1a3fff'), // Motion — blue
    new THREE.Color('#ffd100'), // Marketing — gold
]

export default function Scene({ scrollProgress }) {
    const sphereRef = useRef()
    const pointsRef = useRef()
    const materialRef = useRef()
    const currentColor = useRef(new THREE.Color(SECTION_COLORS[0]))

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < 1800; i++) {
            temp.push(
                THREE.MathUtils.randFloatSpread(50),
                THREE.MathUtils.randFloatSpread(50),
                THREE.MathUtils.randFloatSpread(50),
            )
        }
        return new Float32Array(temp)
    }, [])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        // Lerp between section colors based on scroll
        const colorIdx = Math.min(
            Math.floor(scrollProgress * SECTION_COLORS.length),
            SECTION_COLORS.length - 1
        )
        const nextIdx = Math.min(colorIdx + 1, SECTION_COLORS.length - 1)
        const frac = (scrollProgress * SECTION_COLORS.length) % 1
        const target = new THREE.Color().lerpColors(SECTION_COLORS[colorIdx], SECTION_COLORS[nextIdx], frac)
        currentColor.current.lerp(target, 0.04) // smooth chase

        if (materialRef.current) {
            materialRef.current.emissive.copy(currentColor.current)
        }

        // Sphere movement — respond to scroll
        if (sphereRef.current) {
            sphereRef.current.rotation.x = t * 0.2 + scrollProgress * 4
            sphereRef.current.rotation.y = t * 0.3 + scrollProgress * 8
            sphereRef.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 1.2
            sphereRef.current.position.y = Math.cos(scrollProgress * Math.PI) * 0.4
        }

        // Slowly rotate particle cloud
        if (pointsRef.current) {
            pointsRef.current.rotation.y = t * 0.04
            pointsRef.current.rotation.x = t * 0.015
        }
    })

    return (
        <>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#fff" />
            <pointLight position={[-10, -5, -8]} intensity={0.5} color="#e85d04" />

            <Points ref={pointsRef} positions={particles} stride={3}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.03}
                    sizeAttenuation
                    depthWrite={false}
                    opacity={0.18}
                />
            </Points>

            <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
                <Sphere ref={sphereRef} args={[1.6, 64, 64]}>
                    <MeshDistortMaterial
                        ref={materialRef}
                        color="#05071a"
                        emissive="#e85d04"
                        emissiveIntensity={1.2}
                        speed={5}
                        distort={0.45}
                        roughness={0}
                        metalness={1}
                    />
                </Sphere>
            </Float>
        </>
    )
}
