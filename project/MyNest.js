import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MyNestObj } from './basic_shapes/MyNestObj.js';

export class MyNest extends CGFobject {
    constructor(scene, x, y, z) {
        super(scene);
        
        this.x = x;
        this.y = y;
        this.z = z;
        this.nestObj = new MyNestObj(this.scene, 10, 10);

        this.initBuffers();
    }

    initBuffers() {
        this.material = new CGFappearance(this.scene);
        this.texture = new CGFtexture(this.scene, 'images/nest.jpg');
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setAmbient(0.5,0.5,0.5,0.5);
        this.material.setDiffuse(1.0,1.0,1.0,1.0);
        this.material.setSpecular(0.1,0.1,0.1,0.1);
        this.eggsInside = [];
    }
    update_egg_in_nest(){
        var height = this.y + 0.4;
        var count = 0;
        for (let j = 0; j < this.eggsInside.length; j++){
            let i = this.eggsInside[j];
            if (count == 9) {
                count = 0;
                height += 0.9;
            }
            this.scene.eggs[i].y = height
            
            switch(count){
                case 0:
                    this.scene.eggs[i].x = this.x + 0;
                    this.scene.eggs[i].z = this.z + 0;
                    break;
                case 1:
                    this.scene.eggs[i].x = this.x + 0.6;
                    this.scene.eggs[i].z = this.z + 0;
                    break;
                case 2:
                    this.scene.eggs[i].x = this.x + 0;
                    this.scene.eggs[i].z = this.z + 0.6;
                    break; 
                case 3:
                    this.scene.eggs[i].x = this.x - 0.6;
                    this.scene.eggs[i].z = this.z + 0;
                    break;               
                case 4:
                    this.scene.eggs[i].x = this.x + 0;
                    this.scene.eggs[i].z = this.z - 0.6;
                    break;                
                case 5:
                    this.scene.eggs[i].x = this.x + 0.6;
                    this.scene.eggs[i].z = this.z + 0.6;
                    break;
                case 6:
                    this.scene.eggs[i].x = this.x - 0.6;
                    this.scene.eggs[i].z = this.z + 0.6;
                    break;
                case 7:
                    this.scene.eggs[i].x = this.x + 0.6;
                    this.scene.eggs[i].z = this.z - 0.6;
                    break;
                case 8:
                    this.scene.eggs[i].x = this.x - 0.6;
                    this.scene.eggs[i].z = this.z - 0.6;
                    break;
            }
            count++;
        }
    }

    display() {
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(1.25, 0.25, 1.25);
        if(this.scene.displayNormals) this.nestObj.enableNormalViz();
        else this.nestObj.disableNormalViz();
        this.nestObj.display();
        this.scene.popMatrix();

    }

}




