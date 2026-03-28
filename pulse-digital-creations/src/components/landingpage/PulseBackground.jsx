import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Points, PointMaterial, Text, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Original vibrant colors the user liked
const SECTION_COLORS = [
    new THREE.Color('#e85d04'), // Hero - Orange/Red
    new THREE.Color('#e91e8c'), // Branding - Pink
    new THREE.Color('#1a3fff'), // Motion - Blue
    new THREE.Color('#ffd100'), // Marketing - Gold
]

export default function Scene({ scrollProgress }) {
    const sphereRef = useRef()
    const materialRef = useRef()
    const textRef = useRef()
    const pointsRef = useRef()
    const currentColor = useRef(new THREE.Color(SECTION_COLORS[0]))

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < 2000; i++) {
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

        // Sync with section colors
        const colorIdx = Math.min(
            Math.floor(scrollProgress * SECTION_COLORS.length),
            SECTION_COLORS.length - 1
        )
        const nextIdx = Math.min(colorIdx + 1, SECTION_COLORS.length - 1)
        const frac = (scrollProgress * SECTION_COLORS.length) % 1
        const target = new THREE.Color().lerpColors(SECTION_COLORS[colorIdx], SECTION_COLORS[nextIdx], frac)
        currentColor.current.lerp(target, 0.05) 

        if (materialRef.current) {
            materialRef.current.emissive.copy(currentColor.current)
        }

        if (sphereRef.current) {
            sphereRef.current.rotation.x = t * 0.2 + scrollProgress * 5
            sphereRef.current.rotation.y = t * 0.3 + scrollProgress * 10
        }

        if (pointsRef.current) {
            pointsRef.current.rotation.y = t * 0.05
        }
    })

    return (
        <>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 5]} intensity={1.5} color="#fff" />

            <Points ref={pointsRef} positions={particles} stride={3}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.03}
                    sizeAttenuation
                    depthWrite={false}
                    opacity={0.15}
                />
            </Points>

            <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
                <Sphere ref={sphereRef} args={[1.6, 64, 64]}>
                    <MeshDistortMaterial
                        ref={materialRef}
                        color="#05071a"
                        emissive="#e85d04"
                        emissiveIntensity={1.5}
                        speed={5}
                        distort={0.45}
                        roughness={0}
                        metalness={1}
                        transparent
                        opacity={0.9}
                    />
                </Sphere>
                <Text
                    ref={textRef}
                    fontSize={0.18}
                    position={[0, 0, 1.65]}
                    maxWidth={2}
                    textAlign="center"
                    color="#ffd100" // Premium Gold
                    outlineWidth={0.005}
                    outlineColor="#000000"
                    letterSpacing={0.15}
                    lineHeight={1.2}
                    anchorX="center"
                    anchorY="middle"
                >
                    PULSE{"\n"}DIGITAL
                </Text>
            </Float>
        </>
    )
}
