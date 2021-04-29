import { useEffect, useState } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Object3D } from 'three';

/** загрузить модель */
export function useGetModel(path, id) {
  const [instance, setInstance] = useState(new Object3D());
  const loader = new FBXLoader();
  useEffect(() => {
    loader.loadAsync(`models/${path}.fbx`).then((group) => {
      setInstance(group);
    });
  }, [id, path]);
  useEffect(() => {
    instance.traverse(o => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
  }, [instance]);

  return instance;
}
