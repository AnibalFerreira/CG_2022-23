import {CGFobject, CGFappearance, CGFcamera, CGFscene, CGFtexture} from '../lib/CGF.js';
import { MySphere } from './basic_shapes/MySphere.js';
/**
* MyPanorama
* @constructor
 * @param 
*/
export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        this.initBuffers();
    }
    initBuffers() {
        this.sphere = new MySphere(this.scene, 20, 20, true);
        
        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setEmission(1.0,1.0,1.0,1.0);
    }

    display(){
        this.scene.pushMatrix();
        this.material.apply();
        var cameraPos = this.scene.camera.position;
        this.scene.translate(cameraPos[0], cameraPos[1], cameraPos[2])
        this.scene.scale(200,200,200);
        if(this.scene.displayNormals) this.sphere.enableNormalViz();
        else this.sphere.disableNormalViz();
        this.sphere.display();
        this.scene.popMatrix();
    }

}


