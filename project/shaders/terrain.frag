#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler1;


varying vec4 coords;


void main() {
	
	float altimetry = 1.0 - texture2D(uSampler2, vTextureCoord).b;

	vec4 color = texture2D(uSampler, vTextureCoord);

	vec4 filter = texture2D(uSampler1, vec2(altimetry+0.05));

	gl_FragColor = 0.7*color + 0.3*filter;
}
