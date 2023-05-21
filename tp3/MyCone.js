import {CGFobject} from '../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var alphaAng = 2*Math.PI/this.slices;


        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);
        this.vertices.push(0,0,0);
        this.normals.push(0,0,0);


        var ang = 0;

        for(var i = 0; i < this.slices; i++){
            var cosA = Math.cos(ang);
            var sinA = Math.sin(ang);

            this.vertices.push(cosA, 0, -sinA);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            ang+=alphaAng;
        }
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
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


/*
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(i, (i+1) % this.slices, this.slices);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
            ang+=alphaAng;
        }
        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    */
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     *//*
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

*/
