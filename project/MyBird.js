import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyCone } from './basic_shapes/MyCone.js';
import { MyCylinder } from './basic_shapes/MyCylinder.js';
import { MySphere } from './basic_shapes/MySphere.js';
/**
* MyBird
* @constructor
 * @param 
*/
export class MyBird extends CGFobject {
    constructor(scene, birdPos, directionAngle, speed) {
        super(scene);
        this.directionAngle = directionAngle;
        this.speed = speed;
        this.initialPos = vec3.fromValues(birdPos[0], birdPos[1], birdPos[2]);
        this.birdPos = birdPos;
        this.pickEggBool = false;
        this.eggCarried = -1;
        this.initialBirdHeight = birdPos[1];
        this.initBuffers();
    }
    initBuffers() {
        this.body = new MySphere(this.scene, 8, 8, false);
        this.head = new MySphere(this.scene, 8, 8, false);
        this.leftEye = new MySphere(this.scene, 6, 6, false);
        this.rightEye = new MySphere(this.scene, 6, 6, false);
        this.beak = new MyCone(this.scene, 4);
        this.tail = new MyCone(this.scene, 4);
        this.rightWing = new MyCylinder(this.scene, 5, 5);
        this.leftWing = new MyCylinder(this.scene, 5, 5);
        this.rightWingTip = new MyCone(this.scene, 5);
        this.leftWingTip = new MyCone(this.scene, 5);


        this.bodyMaterial = new CGFappearance(this.scene);
        this.feathersTex = new CGFtexture(this.scene, "images/feathers.jpg");
        this.bodyMaterial.setTexture(this.feathersTex);
        this.bodyMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.bodyMaterial.setDiffuse(1.0,1.0,1.0,1.0);
        this.bodyMaterial.setAmbient(0.5,0.5,0.5,0.5,1.0);


        this.beakMaterial = new CGFappearance(this.scene);
        this.beakTex = new CGFtexture(this.scene, "images/beak.jpg");
        this.beakMaterial.setTexture(this.beakTex);
        this.beakMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.beakMaterial.setDiffuse(1.0,1.0,1.0,1.0);
        this.bodyMaterial.setAmbient(0.5,0.5,0.5,0.5,1.0);


        this.eyesMaterial = new CGFappearance(this.scene);
        this.eyesTex = new CGFtexture(this.scene, "images/eyes.jpg");
        this.eyesMaterial.setTexture(this.eyesTex);
        this.eyesMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.eyesMaterial.setDiffuse(1.0,1.0,1.0,1.0);
        this.bodyMaterial.setAmbient(0.5,0.5,0.5,0.5,1.0);
    }
    // Update the position of the bird
    update(){
      //console.log(this.scene.timeFactor);
      
      // Update the X coordinate of the bird
      this.birdPos[0] += (Math.cos(-this.directionAngle)*this.speed*this.scene.speedFactor)/100;

      // Update the bird height
      // if pickEggBool is true then the bird will descend to the floor and go back up in a duration of 2 seconds
      if (this.pickEggBool) {
        var height = Math.abs(this.scene.terrainHeight+this.scene.terrainOffset + 1) + this.initialHeight; //get how far the bird needs to travel to reach the ground
        var time = Math.abs(this.timecheck - this.scene.timeFactor); //get a value starting from 0 that accompanies the timeFactor
        if (this.timecheck >= 80 && this.scene.timeFactor < 50) time = (100-this.timecheck) + this.scene.timeFactor; // checks if the timeFactor variable has reset (once it reaches 100 it goes back to 0)
      
        if (Math.sin(Math.PI*time/20) < 0) this.birdPos[1] = this.initialHeight + Math.sin(Math.PI*time/20)*height; // Ascending
        else this.birdPos[1] = this.initialHeight - Math.sin(Math.PI*time/20)*height; // Descending
        if (time > 20) this.pickEggBool = false; // time equals 20 after 2 seconds have passed
      }
    
      else {
        this.birdPos[1] += Math.sin((2*Math.PI/10)*(this.scene.timeFactor))*0.01;
        this.initialHeight = this.birdPos[1]  
      }

      // Update the X coordinate of the bird
      this.birdPos[2] += (Math.sin(-this.directionAngle)*this.speed*this.scene.speedFactor)/100;
      

      if (this.pickEggBool && time < 11 && time > 9) this.eggCarried = this.grab_egg(this.birdPos[0], this.birdPos[2]);
    }
    // Update the orientation of the bird therefore turning it
    turn(v){
        this.directionAngle += (v*(this.scene.speedFactor))*Math.PI/30; //+ this.speed
    }

    //Increases the speed of the bird
    accelarate(v){
        this.speed += v;
        if(this.speed < 0.0) this.speed = 0.0;
    }
    // Resets the bird to its initial position
    reset(){
        this.birdPos[0] = this.initialPos[0];
        this.birdPos[1] = this.initialPos[1];
        this.birdPos[2] = this.initialPos[2];
        this.speed = 0.0;
        this.directionAngle = 0.0;
    }
    // Flies the bird to the ground and back to pick up an egg
    pickEgg(){
        this.timecheck = this.scene.timeFactor;
        this.pickEggBool = true;
    }
    // Function called when bird touches the ground and verifies if there is an egg to be picked up in that location
    grab_egg(x, z){
        if (this.eggCarried != -1) return this.eggCarried;
        for (let i = 0; i < this.scene.eggs.length; i++){
            if ((Math.abs(this.scene.eggs[i].x - x) < 2) && (Math.abs(this.scene.eggs[i].z - z) < 2)) {
                this.scene.eggs[i].isPickedUp = true;
                return i;
            }
        }
        return -1;
    }
    drop_egg(){
        if (this.eggCarried != -1){
            this.scene.eggTimecheck = this.scene.timeFactor;
            this.scene.eggs[this.eggCarried].x = this.birdPos[0];
            this.scene.eggs[this.eggCarried].y = this.birdPos[1]-0.9;
            this.scene.eggs[this.eggCarried].z = this.birdPos[2];
            this.scene.eggs[this.eggCarried].ang = this.directionAngle;
            this.scene.eggs[this.eggCarried].speed = this.speed;
            this.scene.eggs[this.eggCarried].x0 = this.birdPos[0];
            this.scene.eggs[this.eggCarried].z0 = this.birdPos[2];
            this.scene.eggs[this.eggCarried].r1 = 0;
            this.scene.eggs[this.eggCarried].r2 = 0;
            this.scene.eggs[this.eggCarried].r3 = 0;
            this.scene.eggs[this.eggCarried].isPickedUp = false;
            this.scene.eggDropping = true;
            this.scene.eggDropped = this.eggCarried;
            this.eggCarried = -1;
        }
    }
    


    display(){

        var sca = [
            this.scene.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            this.scene.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            this.scene.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
          ];

        var scaDefault = [
            1/this.scene.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            1/this.scene.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            1/this.scene.scaleFactor,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
          ];

        this.scene.translate(this.birdPos[0], this.birdPos[1], this.birdPos[2]);
        this.scene.rotate(this.directionAngle, 0, 1, 0);
        this.update();
        this.scene.multMatrix(sca);

        //Body of bird
        this.scene.pushMatrix();
        this.bodyMaterial.apply();
        this.scene.rotate(Math.PI/7,0,0,1);
        this.scene.scale(0.5,0.3,0.3);
        this.scene.translate(0,0,0);
        if(this.scene.displayNormals) this.body.enableNormalViz();
        else this.body.disableNormalViz();
        this.body.display();
        this.scene.popMatrix();


        //Head of bird
        this.scene.pushMatrix();
        this.bodyMaterial.apply();
        this.scene.scale(0.25,0.25,0.25);
        this.scene.translate(2,1.5,0);
        if(this.scene.displayNormals) this.head.enableNormalViz();
        else this.head.disableNormalViz();
        this.head.display();
        this.scene.popMatrix();

        //Eyes of the bird
        //Left Eye
        this.scene.pushMatrix();
        this.eyesMaterial.apply();
        this.scene.scale(0.05,0.05,0.05);
        this.scene.translate(10,8.5,-4.3); 
        this.scene.rotate(Math.PI,0,1,0); 
        this.leftEye.display();
        this.scene.popMatrix();

        //Right Eye
        this.scene.pushMatrix();
        this.eyesMaterial.apply();
        this.scene.scale(0.05,0.05,0.05);
        this.scene.translate(10,8.5,4.3);
        this.scene.rotate(2*Math.PI,0,1,0);
        this.rightEye.display();
        this.scene.popMatrix();

        //Beak
        this.scene.pushMatrix();
        this.beakMaterial.apply();
        this.scene.rotate(-Math.PI/2, 0, 0, 1)
        this.scene.scale(0.1, 0.2, 0.1);
        this.scene.translate(-3.7, 3.4, 0);
        this.beak.display();
        this.scene.popMatrix();

        //Tail
        this.scene.pushMatrix();
        this.bodyMaterial.apply();
        this.scene.rotate(-2*Math.PI/5, 0, 0, 1)
        this.scene.scale(0.2, 0.7, 0.4);
        this.scene.translate(0, -1.3, 0);
        if(this.scene.displayNormals) this.tail.enableNormalViz();
        else this.tail.disableNormalViz();
        this.tail.display();
        this.scene.popMatrix();

        //Right Wing Animation
        this.scene.pushMatrix();
        this.scene.rotate(Math.sin(((2*(1*this.scene.speedFactor)+1*this.speed*0.1)*Math.PI/10)*(this.scene.timeFactor))*0.25, 1, 0, 0);
        //Right Wing
        this.scene.pushMatrix();
        this.bodyMaterial.apply();
        this.scene.rotate(Math.PI/13, 0,0,1);
        this.scene.rotate(-Math.PI/13, 1,0,0);
        this.scene.scale(0.3, 0.1, 0.6);
        this.scene.translate(0,0,0.35);
        if(this.scene.displayNormals) this.rightWing.enableNormalViz();
        else this.rightWing.disableNormalViz();
        this.rightWing.display();
        this.scene.popMatrix();
        //Right Wing Tip
        this.scene.pushMatrix();
        this.bodyMaterial.apply();
        this.scene.rotate(Math.PI/13, 1,0,0);
        this.scene.rotate(Math.PI/13, 0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.3,0.7,0.1);
        this.scene.translate(0.13,1,-3.6);
        if(this.scene.displayNormals) this.rightWingTip.enableNormalViz();
        else this.rightWingTip.disableNormalViz();
        this.rightWingTip.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        //Left Wing Animation
        this.scene.pushMatrix();
        this.scene.rotate(Math.sin(-((2*(1*this.scene.speedFactor)+1*this.speed*0.1)*Math.PI/10)*(this.scene.timeFactor))*0.25, 1, 0, 0);
        //Left Wing
        this.scene.pushMatrix();
        this.bodyMaterial.apply();
        this.scene.rotate(Math.PI/13, 0,0,1);
        this.scene.rotate(Math.PI/13, 1,0,0);
        this.scene.scale(0.3, 0.1, 0.6);
        this.scene.translate(0,0,-1.35);
        if(this.scene.displayNormals) this.leftWing.enableNormalViz();
        else this.leftWing.disableNormalViz();
        this.leftWing.display();
        this.scene.popMatrix();
        //Left Wing Tip
        this.scene.pushMatrix();
        this.bodyMaterial.apply();
        this.scene.rotate(-Math.PI/13, 1,0,0);
        this.scene.rotate(Math.PI/13, 0,0,1);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.3,0.7,0.1);
        this.scene.translate(0.13,1,3.6);
        if(this.scene.displayNormals) this.leftWingTip.enableNormalViz();
        else this.leftWingTip.disableNormalViz();
        this.leftWingTip.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.multMatrix(scaDefault);

        // Egg carried (if there is one)
        if (this.eggCarried != -1){
            this.scene.pushMatrix();
            var eggOffset = -0.9 * (this.scene.scaleFactor**(1/2));
            this.scene.translate(-0.1, eggOffset, 0);
            this.scene.eggs[this.eggCarried].display();
            this.scene.popMatrix();
        }

        
    }
}
