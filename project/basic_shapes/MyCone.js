import {CGFobject} from '../../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, minS, minT, maxS, maxT) {
        super(scene);
        this.slices = slices;
        this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.slices;
		this.w = (this.maxT - this.minT) / this.slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
		this.texCoords = [];

        var alphaAng = 2*Math.PI/this.slices;


        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);
        this.vertices.push(0,0,0);
        this.normals.push(0,0,0);
        this.texCoords.push(0,0);



        var ang = 0;

        for(var i = 0; i < this.slices; i++){
            var cosA = Math.cos(ang);
            var sinA = Math.sin(ang);

            this.vertices.push(cosA, 0, -sinA);
            
            this.texCoords.push(1, i*(1/this.slices));


            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            ang+=alphaAng;
        }
        this.texCoords.push(0, 1);

        for(var i = 0; i < this.slices; i++){
            if (i+3 == this.slices+2) {
                this.indices.push(0, i+2, 2);
                this.indices.push(1, 2, i+2);
            }
            else{
                this.indices.push(0, i+2, i+3);
                this.indices.push(1, i+3, i+2);
            } 
        }
    
        

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}


