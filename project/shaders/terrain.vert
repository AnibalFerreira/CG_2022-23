attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
uniform float normScale;

varying vec4 coords;
void main() {

	vTextureCoord = aTextureCoord;

	float heightmap = texture2D(uSampler2, vTextureCoord).b;

	vec3 terrain_offset = (0.0, 0.0, aVertexNormal*heightmap*0.20);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + terrain_offset, 1.0);
	coords = gl_Position;
}
