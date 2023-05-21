import {CGFobject} from '../../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            -0.5, -0.5, -0.5, //0
            0.5, -0.5, -0.5,  //1
            0.5, 0.5, -0.5,   //2
            -0.5, 0.5, -0.5,  //3
            -0.5, -0.5, 0.5,  //4
            0.5, -0.5, 0.5,   //5
            0.5, 0.5, 0.5,    //6
            -0.5, 0.5, 0.5    //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,    3, 2, 0, //back side
            0, 4, 7,    7, 3, 0, //left side
            2, 3, 7,    7, 6, 2, //top side
            2, 6, 5,    5, 1, 2, //right side
            1, 5, 4,    4, 0, 1, //bottom side
            4, 5, 6,    6, 7, 4  //front side
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

