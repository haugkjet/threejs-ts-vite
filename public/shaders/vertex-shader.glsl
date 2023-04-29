varying vec2 vUvs;
varying vec3 vColor;

attribute vec3 khColors;

void main() {	
  vec4 localPosition = vec4(position, 1.0);

  gl_Position = projectionMatrix * modelViewMatrix * localPosition;
  vUvs = uv;
  vColor = khColors;
}