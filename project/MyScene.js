import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js"
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);


    // Terrain - Flat zone: 55 <= x <= 155 && -64 <= z <= 36 Flat zone mid = (100, -28) Terrain Offset = 24.15 (y coordinate at ground level)
    this.terrainHeight = -100;
    this.terrainOffset = 24.15;
    this.terrain = new MyTerrain(this, 30);

    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"));

    var birdOffset = 3.0;
    this.bird = new MyBird(this,[100,this.terrainHeight + this.terrainOffset + birdOffset,-28],0.0,0.0);

    this.eggDropping = false;
    this.eggDropped = -1;
    this.eggTimecheck = 0;
    this.initialEggHeight = 0;
    this.eggs = [];

    for (let i = 0; i < 10; i++){
      this.egg = new MyBirdEgg(this,20,20,2.0,1.0,new CGFtexture(this, "images/egg.jpg"));
      this.eggs.push(this.egg);
    }

    this.nestHeightOffset = 0.22;
    this.nest = new MyNest(this, 100, this.terrainHeight + this.terrainOffset + this.nestHeightOffset, -28);

    this.treeHeightOffset = 5.0;

    this.treeRowPatch = new MyTreeRowPatch(this, 100, this.terrainHeight + this.terrainOffset + this.treeHeightOffset, -50);
    this.treeGroupPatch = new MyTreeGroupPatch(this, 100, this.terrainHeight + this.terrainOffset + this.treeHeightOffset, 0);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayNormals = false; //added
    this.closeUpCamera = false;
    this.scaleFactor = 1;
    this.speedFactor = 1;


    //Materials and textures initialization
    this.enableTextures(true); 

    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

		this.setUpdatePeriod(50);
  }   

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.5, //default was 1.0
      0.1,
      1000,
      vec3.fromValues(2, 4, 1), //(2, 1, 1)
      vec3.fromValues(0, 3, 0)  //(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      keysPressed=true;
      this.bird.accelarate(1);
      }
    if (this.gui.isKeyPressed("KeyS")) {
      text+=" S ";
      keysPressed=true;
      this.bird.accelarate(-1);
      }
    if (this.gui.isKeyPressed("KeyA")) {
      text+=" A ";
      keysPressed=true;
      this.bird.turn(1);
      }
    if (this.gui.isKeyPressed("KeyD")) {
      text+=" D ";
      keysPressed=true;
      this.bird.turn(-1);
      }
    if (this.gui.isKeyPressed("KeyR")){
      text+=" R ";
      keysPressed=true;
      this.bird.reset();
      }
    if (this.gui.isKeyPressed("KeyP")){
      text+=" P ";
      keysPressed=true;
      this.bird.pickEgg();
    }
    if (this.gui.isKeyPressed("KeyO")){
      text+=" O ";
      keysPressed=true;
      this.bird.drop_egg();
    }
    if (keysPressed)
      console.log(text);
  }
  update(t) {
    this.timeFactor = t / 100 % 100;
    this.checkKeys();

    if(this.closeUpCamera){
      var ang = this.bird.directionAngle;

      let pos_0 = this.bird.birdPos[0] + Math.sin(3*Math.PI/2+ang) * 8;
      let pos_1 =  this.bird.initialBirdHeight + 2;
      let pos_2 = this.bird.birdPos[2] + Math.cos(3*Math.PI/2+ang) * 8;

      let zoom = 1;

      let tar_0 = pos_0 + (this.bird.birdPos[0] - pos_0) * zoom;
      let tar_1 = pos_1 + (this.bird.initialBirdHeight - pos_1) * zoom;
      let tar_2 = pos_2 + (this.bird.birdPos[2] - pos_2) * zoom;
 
      this.camera.setPosition(vec3.fromValues(pos_0, pos_1, pos_2));
      this.camera.setTarget(vec3.fromValues(tar_0, tar_1, tar_2));
    }

    if (this.eggDropping){
      var eggTime = Math.abs(this.eggTimecheck - this.timeFactor); //get a value starting from 0 that accompanies the timeFactor
      if (this.eggTimecheck >= 80 && this.timeFactor < 50) eggTime = (100-this.eggTimecheck) + this.timeFactor; // checks if the timeFactor variable has reset (once it reaches 100 it goes back to 0)
      
      var angle = this.eggs[this.eggDropped].ang;
      this.eggs[this.eggDropped].x += (Math.cos(-angle)*this.eggs[this.eggDropped].speed*this.speedFactor)/100;
      this.eggs[this.eggDropped].y = this.initialEggHeight + (1/2) * (-9.8) * ((eggTime/10)**2) // Descending accordingly to the formula of a parable: y = y0 + 1/2 * g * t^2
      this.eggs[this.eggDropped].z += (Math.sin(-angle)*this.eggs[this.eggDropped].speed*this.speedFactor)/100;
      
      if (this.eggs[this.eggDropped].y < (this.terrainHeight+this.terrainOffset+1.3*this.eggs[this.eggDropped].eggHeightOffset)) {
          this.eggs[this.eggDropped].y = this.terrainHeight+this.terrainOffset+1.3*this.eggs[this.eggDropped].eggHeightOffset;
          this.eggDropping = false; // time equals 10 after 1 second has passed
          this.check_if_egg_in_nest();
      }  
    }
    else{
      this.initialEggHeight = this.bird.birdPos[1] - 0.9;
    }
  }
  
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  check_if_egg_in_nest(){
    if (this.eggDropped != -1){
        if ((Math.abs(this.eggs[this.eggDropped].x-this.nest.x) < 2) && (Math.abs(this.eggs[this.eggDropped].z-this.nest.z) < 2)){
            this.nest.eggsInside.push(this.eggDropped);
            this.nest.update_egg_in_nest();
            this.eggDropped = -1;
        }
        else{
            this.eggDropped = -1;
        }
    }

}


  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    

		this.pushMatrix();

    // CAMERA LIGHTS
    this.lights[0].setPosition(this.camera.position[0], this.camera.position[1], this.camera.position[2], 1);
    this.lights[0].update();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    // Draw the terrain
    this.pushMatrix();
    this.terrain.display();
    this.popMatrix();

    // Draw the panorama
    this.pushMatrix();
    this.panorama.display();
    this.popMatrix();

    // Draw the bird
    this.pushMatrix();
    this.bird.display();
    this.popMatrix();


    // Draw the nest
    this.pushMatrix();
    this.nest.display();
    this.popMatrix();

    // Draw the eggs
    for (let i = 0; i < this.eggs.length; i++){
      if (this.eggs[i].isPickedUp) continue;
      if (i == this.eggDropped){
        this.pushMatrix();
        this.translate(this.eggs[this.eggDropped].x, this.eggs[this.eggDropped].y, this.eggs[this.eggDropped].z);
        this.eggs[this.eggDropped].display();
        this.popMatrix();
        continue;
      }
      this.pushMatrix();
      this.translate(this.eggs[i].x, this.eggs[i].y, this.eggs[i].z); //depth = -100
      this.rotate(this.eggs[i].ang, this.eggs[i].r1, this.eggs[i].r2, this.eggs[i].r3);
      this.eggs[i].display();
      this.popMatrix();
    }

    // Terrain - Flat zone: 55 <= x <= 155 && -64 <= z <= 36 Flat zone mid = (100, -28) Terrain Offset = 24.15 (y coordinate at ground level)


    //Draw the tree row patch
    this.pushMatrix();
    this.treeRowPatch.display();
    this.popMatrix();

    //Draw the tree group patch
    this.pushMatrix();
    this.treeGroupPatch.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
