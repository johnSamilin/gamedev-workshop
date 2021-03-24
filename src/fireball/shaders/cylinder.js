export const cylinderVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = vec3(position.x/1.,position.y,position.z/1.);
    if(pos.y >= 1.87){
        pos = vec3(position.x*(sin((position.y - 0.6)*1.27)-0.16),position.y,position.z*(sin((position.y - 0.6)*1.27)-0.16));
    } else{
        pos = vec3(position.x*(sin((position.y/2. -  .01)*.11)+0.75),position.y,position.z*(sin((position.y/2. -  .01)*.11)+0.75));
    }
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
`;

export const cylinderFragShader = `
varying vec2 vUv;
uniform sampler2D perlinnoise;
uniform vec3 color4;
uniform float time;
varying vec3 vNormal;

vec3 rgbcol(vec3 col) {
    return vec3(col.r/255.0,col.g/255.0,col.b/255.0);
}

void main() {
    vec3 noisetex = texture2D(perlinnoise,mod(1.*vec2(vUv.y-time*2.,vUv.x + time*1.),1.)).rgb;    
    gl_FragColor = vec4(noisetex.r);

    if(gl_FragColor.r >= 0.5){
        gl_FragColor = vec4(rgbcol(color4),gl_FragColor.r);
    }else{
        gl_FragColor = vec4(0.);
    }
    gl_FragColor *= vec4(sin(vUv.y) - 0.1);
    gl_FragColor *= vec4(smoothstep(0.3,0.628,vUv.y));

}

`;
