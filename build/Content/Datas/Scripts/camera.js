/*
    RPG Paper Maker Copyright (C) 2017 Marie Laporte

    This file is part of RPG Paper Maker.

    RPG Paper Maker is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    RPG Paper Maker is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
*/

// -------------------------------------------------------
//
//  CLASS Camera
//
// -------------------------------------------------------

/** @class
*   The camera of the current map.
*   @property {THREE.PerspectiveCamera} threeCamera The three.js camera.
*   @property {number} distance The x/z axis distance between the camera and
*   the target.
*   @property {number} height The y distance between the camera and the target.
*   @property {number} horizontalAngle The horizontal angle of the camera.
*   @property {THREE.Vector3} target The position of the target.
*   @param {number} d The camera distance.
*   @param {number} h The camera height.
*/
function Camera(d, h){
    this.threeCamera = new THREE.PerspectiveCamera(45,
                                                   $canvasWidth / $canvasHeight,
                                                   1, 100000);

    this.distance = d;
    this.height = h;
    this.horizontalAngle = -90.0;
    this.target = new THREE.Vector3();
}

Camera.prototype = {

    /** Update the camera position and target.
    */
    update: function(){

        // Horizontal angle should stay in [-450;270] interval
        if (this.horizontalAngle >= 270.0 || this.horizontalAngle <= -450.0)
            this.horizontalAngle = -90.0;

        // Update target
        var position = $game.hero.position;
        this.target.x = position.x;
        this.target.y = position.y;
        this.target.z = position.z;

        // Update position
        this.threeCamera.position.x = this.target.x -
             (this.distance * Math.cos(this.horizontalAngle * Math.PI / 180.0));
        this.threeCamera.position.y = this.target.y + this.height;
        this.threeCamera.position.z = this.target.z -
             (this.distance * Math.sin(this.horizontalAngle * Math.PI / 180.0));

        // Update view
        this.threeCamera.lookAt(this.target);
    }
}
