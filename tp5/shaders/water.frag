#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

uniform float timeFactor;

varying vec4 coords;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vTextureCoord+vec2(timeFactor*.05,timeFactor*.05));
	color.rgb = color.rgb / 6.0*(7.0 - 1.7*filter.b);
	gl_FragColor = color;
}