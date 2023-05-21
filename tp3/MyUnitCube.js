import {CGFobject} from '../lib/CGF.js';
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
            -0.5, -0.5, -0.5, //0a //0
            -0.5, -0.5, -0.5, //0b //1
            -0.5, -0.5, -0.5, //0c //2

            0.5, -0.5, -0.5,  //1a //3
            0.5, -0.5, -0.5,  //1b //4
            0.5, -0.5, -0.5,  //1c //5

            0.5, 0.5, -0.5,   //2a //6
            0.5, 0.5, -0.5,   //2b //7
            0.5, 0.5, -0.5,   //2c //8

            -0.5, 0.5, -0.5,  //3a //9
            -0.5, 0.5, -0.5,  //3b //10
            -0.5, 0.5, -0.5,  //3c //11

            -0.5, -0.5, 0.5,  //4a //12
            -0.5, -0.5, 0.5,  //4b //13
            -0.5, -0.5, 0.5,  //4c //14

            0.5, -0.5, 0.5,   //5a //15
            0.5, -0.5, 0.5,   //5b //16
            0.5, -0.5, 0.5,   //5c //17
 
            0.5, 0.5, 0.5,    //6a //18
            0.5, 0.5, 0.5,    //6b //19
            0.5, 0.5, 0.5,    //6c //20

            -0.5, 0.5, 0.5,    //7a //21
            -0.5, 0.5, 0.5,    //7b //22
            -0.5, 0.5, 0.5    //7c //23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			6, 3, 0,    9, 6, 0, //back side
			1, 12, 21,    21, 9, 1, //left side
			7, 10, 22,    22, 19, 7, //top side
			6, 18, 15,    15, 3, 6, //right side
			3, 16, 14,    14, 2, 3, //bottom side
			13, 16, 19,    19, 22, 13  //front side
		];

		this.normals = [
			//0
			0, 0, -1,
			-1, 0, 0,
			0, -1, 0,
			//1
			1, 0, 0,
			0, -1, 0,
			0, 0, -1,
			//2
			1, 0, 0,
			0, 1, 0,
			0, 0, -1,
			//3
			-1, 0, 0,
			0, 1, 0,
			0, 0, -1,
			//4
			-1, 0, 0,
			0, -1, 0,
			0, 0, 1,
			//5
			1, 0, 0,
			0, -1, 0,
			0, 0, 1,
			//6
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
			//7
			-1, 0, 0,
			0, 1, 0,
			0, 0, 1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

