import { MyBillboard } from './MyBillboard.js';
import {CGFobject, CGFshader, CGFappearance, CGFtexture, CGFscene, CGFcamera, CGFaxis} from '../lib/CGF.js';


/**
* MyTreeGroupPatch
* @constructor
 * @param scene - Reference to MyScene object
*/

export class MyTreeGroupPatch {
  constructor(scene, x, y, z) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.z = z;
    this.trees = [];

    this.createTrees();
  }

  createTrees() {

    const treeTextures = [
      'images/billboardtree.png',
      'images/billboardtree2.png',
      'images/billboardtree3.png'
    ];

    const treePositions = [
      [-1.5, 0, -1.5], [0, 0, -1.5], [1.5, 0, -1.5],
      [-1.5, 0, 0], [0, 0, 0], [1.5, 0, 0],
      [-1.5, 0, 1.5], [0, 0, 1.5], [1.5, 0, 1.5]
    ];

    for (var i = 0; i < treePositions.length; i++) {
      var [x, y, z] = treePositions[i];

      var randomTexture = treeTextures[Math.floor(Math.random() * treeTextures.length)];
      var randomScale = Math.random() * (12 - 10) + 10; // Random scale between 12 and 10
      var offsetX = Math.random() * 0.2; // Random offset between 0 and 0.2
      var offsetZ = Math.random() * 0.2; // Random offset between 0 and 0.2

      var tree = new MyBillboard(this.scene);

      tree.texture = new CGFtexture(this.scene, randomTexture);
      tree.material.setTexture(tree.texture);
      
      this.trees.push({ x: x + offsetX, y: y, z: z + offsetZ, scale: randomScale, tree });
    }
  }

  display() { // Position of the tree, not used to translate it to the correct position but instead used to get the vectors right to calculate orientation
    this.trees.forEach(tree => {
      var { x, y, z, scale, tree: billboard } = tree;
      this.scene.pushMatrix();
		  this.scene.translate(x*scale+this.x, y*scale+this.y, z*scale+this.z);
      this.scene.scale(scale, scale, scale);
      billboard.display(x*scale+this.x, y*scale+this.y, z*scale+this.z);
      this.scene.popMatrix();
    });
  }
  
}