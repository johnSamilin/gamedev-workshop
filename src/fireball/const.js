// @ts-check
import * as THREE from 'three';

export const options = {
	exposure: 2.8,
	bloomStrength: 3.5,
	bloomRadius: 0.39,
	ball: [191, 118, 49],
	color1: [81, 14, 5],
	color2: [181, 156, 24],
	color3: [66, 66, 66],
	steam: [79, 79, 79],
	tail: [191, 118, 49]
};

export const ballUniforms = {
	time: {
		type: "f",
		value: 0.0
	},
	perlinnoise: {
		type: "t",
		value: new THREE.TextureLoader().load(
			"https://raw.githubusercontent.com/pizza3/asset/master/noise9.jpg"
		)
	},
	sparknoise: {
		type: "t",
		value: new THREE.TextureLoader().load(
			"https://raw.githubusercontent.com/pizza3/asset/master/sparklenoise.jpg"
		)
	},
	color5: {
		value: new THREE.Vector3(...options.tail)
	},
	color4: {
		value: new THREE.Vector3(...options.steam)
	},
	color3: {
		value: new THREE.Vector3(...options.color3)
	},
	color2: {
		value: new THREE.Vector3(...options.color2)
	},
	color1: {
		value: new THREE.Vector3(...options.color1)
	},
	color0: {
		value: new THREE.Vector3(...options.ball)
	},
	resolution: { value: new THREE.Vector2(500, 500) }
};

export const flameUniforms = {
  perlinnoise: {
    type: "t",
    value: new THREE.TextureLoader().load(
      "https://raw.githubusercontent.com/pizza3/asset/master/water-min.jpg"
    )
  },
  color4: {
    value: new THREE.Vector3(...options.tail)
  },
  time: {
    type: "f",
    value: 0.0
  },
  noise: {
    type: "t",
    value: new THREE.TextureLoader().load(
      "https://raw.githubusercontent.com/pizza3/asset/master/noise9.jpg"
    )
  }
}

export const cylinderUniforms = {
  perlinnoise: {
    type: "t",
    value: new THREE.TextureLoader().load(
      "https://raw.githubusercontent.com/pizza3/asset/master/water-min.jpg"
    )
  },
  color4: {
    value: new THREE.Vector3(...options.steam)
  },
  time: {
    type: "f",
    value: 0.0
  },
  noise: {
    type: "t",
    value: new THREE.TextureLoader().load(
      "https://raw.githubusercontent.com/pizza3/asset/master/noise9.jpg"
    )
  }
};
