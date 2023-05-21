import {CGFobject} from '../../../lib/CGF.js';

export class MyNestObj extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks*2;
        this.minS = 0;
		this.maxS = 1;
		this.minT = 0;
		this.maxT = 1;
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

                var ai = i * (2*Math.PI/this.slices);
                var si = -Math.sin(ai);
                var ci = -Math.cos(ai);

                var d = ((si * sj)**2 + (ci * sj)**2)**(1/2);
                this.vertices.push(si * sj, cj+d**4, ci * sj);   
                //Texture coordinates 
				this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
                // Indices
                var i1 = j * (this.slices+1) + i;
                var i2 = i1 + (this.slices+1);
                this.indices.push(i1, i2, i1 + 1);
                this.indices.push(i1 + 1, i2, i2 + 1);
                //Normals
                var normal = [si*sj,cj,ci*sj];
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


