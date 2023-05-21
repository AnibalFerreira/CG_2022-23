import {CGFobject} from '../../lib/CGF.js';
/**
* MySphere
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 * @param inverted - indicates whether or not the visible face is the inside or the outside (true when inside visible)
 * @param minS - Optional parameter indicating a bottom limit for the S coordinate 
 * @param maxS - Optional parameter indicating a top limit for the S coordinate
 * @param minT - Optional parameter indicating a bottom limit for the T coordinate
 * @param maxT - Optional parameter indicating a top limit for the T coordinate
*/
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, inverted, minS, maxS, minT, maxT) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks*2;
        this.inverted = inverted;
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

        //Vertices
        for(var j = 0; j <= this.stacks; j++){
            
            var aj = j * Math.PI / this.stacks;
            var sj = Math.sin(aj);
            var cj = Math.cos(aj);

            for (var i = 0; i <= this.slices; i++) {

                var ai;
                if (this.inverted) ai = i * -(2*Math.PI/this.slices);
                else ai = i * (2*Math.PI/this.slices);
                var si = -Math.sin(ai);
                var ci = -Math.cos(ai);

                this.vertices.push(si * sj, cj, ci * sj);   

                //Texture coordinates 
				this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
                
                // Indices
                var i1 = j * (this.slices+1) + i;
                var i2 = i1 + (this.slices+1);

                this.indices.push(i1, i2, i1 + 1);
                this.indices.push(i1 + 1, i2, i2 + 1);

                //Normals
                var normal;
                if (this.inverted) normal = [-si*sj,-cj,-ci*sj]; //changing the signal changes the vector from pointing away from the sphere to torwards the center of the sphere
                else normal = [si*sj,cj,ci*sj];

                // Normalization
                var nsize=Math.sqrt(
                    normal[0]*normal[0]+
                    normal[1]*normal[1]+
                    normal[2]*normal[2]
                    );
                normal[0]/=nsize;
                normal[1]/=nsize;
                normal[2]/=nsize;

                this.normals.push(...normal);
            }
        }

    


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}


