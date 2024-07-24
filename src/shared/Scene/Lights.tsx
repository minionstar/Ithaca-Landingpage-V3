export const Lights = () => {
    return (
        <>
            <directionalLight color={0xFFFFFF} intensity={.2} position={[-5, 0, 10]} />
            <directionalLight color={0xFFFFFF} intensity={.2} position={[5, 0, 10]} />
            {/* <directionalLight color={0xFFFFFF} intensity={.5} position={[5, 0, 10]} /> */}
            {/* <directionalLight color={0xFFFFFF} intensity={.5} position={[-5, 0, 10]} /> */}
            {/* <directionalLight color={0xFFFFFF} intensity={1.75} position={[-2, 0, 0]} /> */}
            {/* <directionalLight color={0xFFFFFF} intensity={1.75} position={[2, 0, 0]} /> */}
            {/* <directionalLight color={0xFFFFFF} intensity={1.75} position={[0, 2, 0]} /> */}
        </>
    )
}