import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, texTop, texFront, texRight, texBack, texLeft, texBottom) {
		super(scene);
        this.texBack = texBack;
        this.texBottom = texBottom;
        this.texFront = texFront;
        this.texLeft = texLeft;
        this.texRight = texRight;
        this.texTop = texTop;
		this.initBuffers();
	}
    
	
	initBuffers() {
        this.quad = new MyQuad(this.scene);
	}

    display() {
        this.scene.cubeMaterial.apply();

        //front side
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.cubeMaterial.setTexture(this.texFront);
        this.scene.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        //back side
        this.scene.pushMatrix();
        this.scene.scale(-1,1,1);
        this.scene.translate(0, 0, -0.5);
        this.scene.cubeMaterial.setTexture(this.texBack);
        this.scene.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        //right side
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.cubeMaterial.setTexture(this.texRight);
        this.scene.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        //left side
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(-1,1,1);
        this.scene.cubeMaterial.setTexture(this.texLeft);
        this.scene.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        //bottom side
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.cubeMaterial.setTexture(this.texBottom);
        this.scene.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
        //top side
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(-1,1,1);
        this.scene.cubeMaterial.setTexture(this.texTop);
        this.scene.cubeMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
    }
}