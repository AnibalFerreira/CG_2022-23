import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';

export class MyBirdEgg extends CGFobject {
    constructor(scene, slices, stacks, topScale, bottomScale, texture) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.minS = 0;
        this.maxS = 1;
        this.minT = 0;
        this.maxT = 1;
        this.q = (this.maxS - this.minS) / this.slices;
        this.w = (this.maxT - this.minT) / this.stacks;
        this.topScale = topScale || 1.0;
        this.bottomScale = bottomScale || 1.0;
        this.texture = texture;
        this.eggHeightOffset = 0.3
       
        this.x = this.scene.getRandomArbitrary(55, 155);
        this.y = this.scene.terrainHeight + this.scene.terrainOffset +this.eggHeightOffset;//this.scene.terrainHeight+this.scene.terrainOffset - 0.2; //if the terrrain is at y=-100 then this value should be -93
        this.z = this.scene.getRandomArbitrary(-64, 36);
        this.v0 = 0.0;
        this.x0 = 0.0;
        this.z0 = 0.0;
        this.speed = 0.0;
        this.isPickedUp = false;
        this.ang = (Math.PI/18) * this.scene.getRandomInt(6);
        let r = this.scene.getRandomInt(3);
        this.r1 = 0;
        this.r2 = 0;
        this.r3 = 0;
        if (r == 0) this.r1 = 1;
        else if (r == 1) this.r3 = 1;
        else this.r2 = 1;


        this.initBuffers();
    }

    initBuffers() {
        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setAmbient(0.5,0.5,0.5,0.5);
        this.material.setDiffuse(0.5,0.5,0.5,0.5);
        this.material.setSpecular(1.0,1.0,1.0,1.0);
    

       
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (var j = 0; j <= this.stacks; j++) {
            var aj = j * Math.PI / this.stacks;
            var sj = Math.sin(aj);
            var cj = Math.cos(aj);

            for (var i = 0; i <= this.slices; i++) {
                var ai = i * (2 * Math.PI / this.slices);
                var si = -Math.sin(ai);
                var ci = -Math.cos(ai);

                if(cj >= 0) {   
                    this.vertices.push(si * sj, cj*this.topScale, ci * sj);
                    this.normals.push(si * sj, cj*this.topScale, ci * sj);
                }
                else {
                    this.vertices.push(si * sj, cj*this.bottomScale, ci * sj);
                    this.normals.push(si * sj, cj*this.bottomScale, ci * sj);
                }

                var s = this.minS + i * this.q;
                var t = this.minT + j * this.w;
                this.texCoords.push(s, t);


            }
        }

        for (var j = 0; j < this.stacks; j++) {
            for (var i = 0; i < this.slices; i++) {
                var first = j * (this.slices + 1) + i;
                var second = first + this.slices + 1;

                this.indices.push(first, second + 1, second);
                this.indices.push(first, first + 1, second + 1);

                this.indices.push(first, second, second + 1);
                this.indices.push(first, second + 1, first + 1);

            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        if(this.scene.displayNormals) this.enableNormalViz();
        else this.disableNormalViz();
        this.material.apply();
        this.scene.scale(0.3,0.3,0.3);
        super.display();
    }

}


