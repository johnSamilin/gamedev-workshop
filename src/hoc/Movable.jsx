import React, { useMemo, useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { getRotation } from './helpers/getRotation';

const { Vector3 } = THREE;

/** перемещает объект в направлении heading со скоростью velocity */
export function Movable({ heading = new Vector3(0, 0, 0), velocity = 0, position, onMove = () => {}, children }) {
	const [ref, setRef] = useState();
	const quaternion = useMemo(() => getRotation(heading), [heading]);

	useFrame(() => {
		if (velocity > 0) {
			ref.position.addScaledVector(heading.normalize(), velocity);
			onMove(ref.position);
		}
	});

	return (
		<group ref={setRef} quaternion={quaternion} position={position}>
			{children}
		</group>
	);
}
