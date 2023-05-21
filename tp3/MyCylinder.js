import {CGFobject} from '../lib/CGF.js';
/**
* MyPyramid
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCylinder extends CGFobject {
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
        var stack = 1/this.stacks;
        
        var sa=Math.sin(ang);
        var saa=Math.sin(ang+alphaAng);
        var ca=Math.cos(ang);
        var caa=Math.cos(ang+alphaAng);

        for (var j = 0; j < this.stacks; j++){
            for(var i = 0; i < this.slices; i++){
                // All vertices have to be declared for a given face
                // even if they are shared with others, as the normals 
                // in each face will be different

                sa=Math.sin(ang);
                saa=Math.sin(ang+alphaAng);
                ca=Math.cos(ang);
                caa=Math.cos(ang+alphaAng);

                this.vertices.push(ca, -sa, 0);  //0
                this.vertices.push(ca, -sa, 1-(j*stack)); //1

                    var normal = [
                        ca, -sa, 0,
                    ]

                    var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                    normal[0]/=nsize;
                    normal[1]/=nsize;
                    normal[2]/=nsize; 

                    this.normals.push(...normal);
                    this.normals.push(...normal);

               this.indices.push(2*i, 2*i+1, 2*i+2);  //0, 1, 2
               this.indices.push(2*i+1, 2*i+3,2*i+2); //1, 3, 2

                ang+=alphaAng;
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
        this.slices = 4 + Math.round(16 * complexity); //complexity varies 0-1, so slices varies 4-16

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


