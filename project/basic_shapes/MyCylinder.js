import {CGFobject} from '../../lib/CGF.js';
/**
* MyCylinder
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, minS, minT, maxS, maxT) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.slices;
		this.w = (this.maxT - this.minT) / this.stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
		this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var stack = 1/this.stacks;

        this.vertices.push(0,0,0);
        this.vertices.push(0,0,1);
        this.normals.push(0,0,-1);
        this.normals.push(0,0,1);

        var sa=Math.sin(ang);
        var saa=Math.sin(ang+alphaAng);
        var ca=Math.cos(ang);
        var caa=Math.cos(ang+alphaAng);

        // push normal once for each vertex of this triangle
        var v = Math.sqrt(((ca+caa)/2)^2 + ((-sa-saa)/2)^2 + 0^2);

        for (var j = 0; j < this.stacks; j++){
            ang = 0;
            for(var i = 0; i < this.slices; i++){
                // All vertices have to be declared for a given face
                // even if they are shared with others, as the normals 
                // in each face will be different

                sa=Math.sin(ang);
                saa=Math.sin(ang+alphaAng);
                ca=Math.cos(ang);
                caa=Math.cos(ang+alphaAng);

                this.vertices.push(ca, -sa, 0);
                this.vertices.push(caa, -saa, 0);
                this.vertices.push(ca, -sa, 1-(j*stack));
                this.vertices.push(caa, -saa, 1-(j*stack));

                this.texCoords.push(0, 0);
                this.texCoords.push(1, 0);
                this.texCoords.push(1, 1);
                this.texCoords.push(0, 1);



                this.normals.push(
                  ((ca+caa)/2)/v, ((-sa-saa)/2)/v, 0/v,            //v_normalized = (v1/||v||, v2/||v||, v3/||v||)       
                  ((ca+caa)/2)/v, ((-sa-saa)/2)/v, 0/v,            //||v|| = sqrt(v1^2 + v2^2 + v3^2)
                  ((ca+caa)/2)/v, ((-sa-saa)/2)/v, 0/v,
                  ((ca+caa)/2)/v, ((-sa-saa)/2)/v, 0/v
                );


                this.indices.push((4*i)+2, (4*i+2)+2 , (4*i+3)+2);
                this.indices.push((4*i+3)+2, (4*i+1)+2 , (4*i)+2);
                this.indices.push((4*i)+2, (4*i+1)+2, 0);
                this.indices.push(1, (4*i+3)+2, (4*i+2)+2);

                this.indices

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

