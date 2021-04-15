import * as THREE from 'three';

const { Vector3, Quaternion, Matrix4 } = THREE;
const baseVec = new Vector3(0, 0, 0);
const defaultUp = new Vector3(0, 1, 0);

/** получить угол поворота на основании вектора направления */
export function getRotation(targetVector, base = baseVec, up = defaultUp) {
  const vec = new Vector3(targetVector.x, targetVector.y, targetVector.z);
  const rotationMatrix = new Matrix4();
  const targetQuaternion = new Quaternion();
  
  rotationMatrix.lookAt(vec, base, up);
  targetQuaternion.setFromRotationMatrix(rotationMatrix);

  return targetQuaternion;
}
