export default function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#e0fbff" />
      <pointLight position={[-5, -3, -4]} intensity={1.1} color="#06B6D4" />
      <pointLight position={[3, -4, 3]} intensity={0.5} color="#10B981" />
    </>
  )
}
