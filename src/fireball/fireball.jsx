// adaptation of https://codepen.io/pizza3/pen/Rwoqemx?editors=0010

import React, { memo } from 'react';
import { useFrame, useResource } from 'react-three-fiber';
import * as THREE from 'three';

import { Movable } from '../Movable';

import { ballUniforms, cylinderUniforms as steamUniforms, flameUniforms } from './const';
import { ballFragShader, ballVertexShader } from './shaders/ball';
import { cylinderFragShader as steamFragShader, cylinderVertexShader as steamVertexShader } from './shaders/cylinder';
import { flameFragShader, flameVertexShader } from './shaders/flame';

const { Clock, DoubleSide, Vector3 } = THREE;

const Ball = memo(({ velocity = 0.5 }) => {
	const clock = new Clock();
	const material = useResource();

  useFrame(() => {
    const delta = clock.getDelta();
		material.current.uniforms.time.value -= delta * velocity;
	});

	return (
		<mesh
			scale={[0.78, 0.78, 0.78]}
			position={[1, 0, 0]}
		>
			<sphereBufferGeometry
				attach="geometry"
				args={[1, 30, 30]}
			/>
			<shaderMaterial
				attach="material"
				ref={material}
				args={[
					{
						uniforms: ballUniforms,
						vertexShader: ballVertexShader,
						fragmentShader: ballFragShader,
						transparent: true,
					}
				]}
			/>
		</mesh>
	);
});

const Flame = memo(({ velocity = 0.5 }) => {
	const clock = new Clock();
	const material = useResource();

	useFrame(() => {
		const delta = clock.getDelta();
		material.current.uniforms.time.value -= delta * velocity;
	});

	return (
		<mesh
			rotation={[0, 0, -Math.PI / 2]}
			position={[1 + -4.78, 0, 0]}
			scale={[2, 2, 2]}
		>
			<cylinderBufferGeometry attach="geometry" args={[1, 0, 5.3, 50, 50, true]} />
			<shaderMaterial
				attach="material"
				ref={material}
				args={[
					{
						uniforms: flameUniforms,
						vertexShader: flameVertexShader,
						fragmentShader: flameFragShader,
						transparent: true,
						depthWrite: false,
						side: DoubleSide,
					}
				]}
			/>
		</mesh>
	);
});

const Steam = memo(({ velocity = 0.5 }) => {
	const clock = new Clock();
	const material = useResource();

	useFrame(() => {
		const delta = clock.getDelta();
		material.current.uniforms.time.value -= delta * velocity;
	});

	return (
		<mesh
			rotation={[0, 0, -Math.PI / 2]}
			position={[1 + -4.05, 0, 0]}
			scale={[1.5, 1.7, 1.5]}
		>
			<cylinderBufferGeometry attach="geometry" args={[1.11, 0, 5.3, 50, 50, true]} />
			<shaderMaterial
				attach="material"
				ref={material}
				args={[
				{
					uniforms: steamUniforms,
					vertexShader: steamVertexShader,
					fragmentShader: steamFragShader,
					transparent: true,
					depthWrite: false,
					side: DoubleSide,
				}
			]} />
		</mesh>
	);
});

export const Fireball = memo(({ scale = [0.2, 0.2, 0.2], position = [0, 0, 0] }) => {
	return <group scale={scale} position={position}>
		<group rotation={[0, -Math.PI/2, 0]}>
			<Ball />
			<Flame />
			<Steam />
		</group>
	</group>;
});
