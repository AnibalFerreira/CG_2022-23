import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.diamond = new MyDiamond(this.scene);
        this.triangleSmallPurple = new MyTriangleSmall(this.scene,true);
        this.triangleSmallRed = new MyTriangleSmall(this.scene,false);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleBigOrange = new MyTriangleBig(this.scene, false);
        this.trianglePink = new MyTriangle(this.scene);
        this.triangleBigBlue = new MyTriangleBig(this.scene, true);
	}

    display() {
        this.scene.tangramMaterial.apply();

        //Diamond Green
        var matrixRotate = [
        Math.cos(Math.PI/4), Math.sin(Math.PI/4), 0, 0,
        -Math.sin(Math.PI/4), Math.cos(Math.PI/4), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
        ];

        var matrixTranslation = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        Math.sqrt(2)/2, 3*Math.sqrt(2)/2, 0, 1
        ];

        this.scene.pushMatrix();
        this.scene.multMatrix(matrixTranslation);
        this.scene.multMatrix(matrixRotate);
        this.diamond.display();
        this.scene.popMatrix();
        
        //Triangle Big Blue
        this.scene.pushMatrix();
        this.scene.translate(-2,0,0);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.triangleBigBlue.display();
        this.scene.popMatrix();

        //Triangle Pink
        this.scene.pushMatrix();
        this.scene.translate(0,Math.sqrt(2),0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.trianglePink.display();
        this.scene.popMatrix();

        //Triangle Big Orange
        this.scene.pushMatrix()
        this.scene.translate(2+Math.sqrt(2),0,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.triangleBigOrange.display();
        this.scene.popMatrix();

        //Triangle Small Purple
        this.scene.pushMatrix();
        this.scene.translate(3*Math.sqrt(2)/2, 3*Math.sqrt(2)/2, 0);
        this.scene.rotate(3*Math.PI/4, 0, 0 , 1);
        this.triangleSmallPurple.display();
        this.scene.popMatrix();
    

        //Parallelogram Yellow
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.scene.scale(-1,1,1);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        //Triangle Small Red
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2)/2,Math.sqrt(2)/2,0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.triangleSmallRed.display();
        this.scene.popMatrix();
        
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangleSmallPurple.enableNormalViz();
        this.triangleSmallRed.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleBigOrange.enableNormalViz();
        this.trianglePink.enableNormalViz();
        this.triangleBigBlue.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangleSmallPurple.disableNormalViz();
        this.triangleSmallRed.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleBigOrange.disableNormalViz();
        this.trianglePink.disableNormalViz();
        this.triangleBigBlue.disableNormalViz();
    }    

}