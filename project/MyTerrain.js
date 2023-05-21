import {CGFobject, CGFshader, CGFappearance, CGFcamera, CGFscene, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
* MyTerrain
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyTerrain extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.plane = new MyPlane(this.scene, 30);
		this.texture = new CGFtexture(this.scene, "images/terrain.jpg");
		this.texturemap = new CGFtexture(this.scene, "images/heightmap_edit.jpg");
		this.altimetry = new CGFtexture(this.scene, "images/altimetry.png");

		this.material = new CGFappearance(this.scene);
		this.material.setTexture(this.texture);
		this.material.setTextureWrap('REPEAT', 'REPEAT');

		//Shader initialization
		this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
		this.shader.setUniformsValues({ uSampler2: 1 });
		this.shader.setUniformsValues({ uSampler1: 2 });
	}

	display() {
		this.scene.setActiveShader(this.shader);

		this.scene.pushMatrix();
		this.material.apply();

		this.scene.translate(0,this.scene.terrainHeight,0);
		this.scene.scale(400,400,400);
		this.scene.rotate(-Math.PI/2.0,1,0,0);

		this.texturemap.bind(1);
		this.altimetry.bind(2);

		this.plane.display();
		this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader);
	}
}


