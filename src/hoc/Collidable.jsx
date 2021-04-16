import React, { useEffect, useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';

import { colliderStore } from '../store/collider';

/** регистрирует столкновения с другими Collidable */
export function Collidable({
    type,
    id,
    onHit = () => {},
    children,
}) {
    const add = colliderStore(state => state.add);
    const remove = colliderStore(state => state.remove);
    const intersectables = colliderStore(state => Object.entries(state.objects));
    const bounds = useRef();
    const pos = new Vector3();

    useEffect(() => {
        /** регистрируемся */
        if (bounds) {
          add(id, type, bounds.current);
        }
    }, [bounds]);

    useFrame(() => {
        bounds.current.getWorldPosition(pos);
        const aPos = new Vector3();
        const collision = intersectables.find(([cid, obj]) => {
          if (id == cid) {
            return false;
          }
          obj.bounds.getWorldPosition(aPos);
          if (pos.x >= aPos.x - 1 && pos.x <= aPos.x + 1) {
            if (pos.z >= aPos.z - 1 && pos.z <= aPos.x + 1) {
              return true;
            }
          }

        });
        if (collision) {
          onHit(collision[0], collision[1].type);
        }
    });

    return (
        <group ref={bounds}>
            {children}
        </group>
    );
}
