import {CGFobject, CGFshader, CGFappearance, CGFtexture, CGFscene, CGFcamera, CGFaxis} from '../lib/CGF.js';
import { MyQuad } from './basic_shapes/MyQuad.js';

/**
* MyBillboard
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyBillboard extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.quad = new MyQuad(this.scene);
		this.texture = new CGFtexture(this.scene, "images/billboardtree3.png");

		this.material = new CGFappearance(this.scene);
		this.material.setTexture(this.texture);
		this.material.setTextureWrap('REPEAT', 'REPEAT');
	}

	display(x, y, z) { // Position of the tree, not used to translate it to the correct position but instead used to get the vectors right to calculate orientation
		const billboardVec = vec3.fromValues(0, 0, 1); // Vector pointing outwards from the billboard
	  
		const cameraPos = this.scene.camera.position; // Camera position
	  
		const cameraVec = vec3.fromValues(cameraPos[0] - x, 0, cameraPos[2] - z); // Vector from the tree position to the camera
	  
		vec3.normalize(cameraVec, cameraVec); // Normalize vectors
	  
		const crossProduct = vec3.create();
		vec3.cross(crossProduct, billboardVec, cameraVec); // Cross product
	  
		const dotProduct = vec3.dot(billboardVec, cameraVec); // Dot product
	  
		this.scene.pushMatrix();
		this.material.apply();
		this.scene.rotate(Math.acos(dotProduct), crossProduct[0], crossProduct[1], crossProduct[2]);
		this.quad.display();
		this.scene.popMatrix();
	  }
	  
}


