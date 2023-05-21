attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform float normScale;

uniform float timeFactor;

varying vec4 coords;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	vTextureCoord = aTextureCoord;

	float value = texture2D(uSampler2, vTextureCoord+vec2(timeFactor*.05,timeFactor*.05)).b;
	offset=(0.0, 0.0, aVertexNormal*0.05*value);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset, 1.0);
	coords = gl_Position;
}
