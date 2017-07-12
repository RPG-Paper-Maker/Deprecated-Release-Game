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
//  CLASS SystemClass
//
// -------------------------------------------------------

/** @class
*   A class of the game.
*   @property {string} name The name of the class.
*   @property {SystemClassSkill[]} skills The skills to learn of the class.
*/
function SystemClass(){

}

SystemClass.prototype = {

    /** Read the JSON associated to the class.
    *   @param {Object} json Json object describing the object.
    */
    readJSON: function(json){
        this.name = json.name;
        this.experienceBase = json.eB;
        this.experienceInflation = json.eI;
        this.initialLevel = json.iniL;
        this.finalLevel = json.mxL;

        // Statistic progression
        var jsonStatisticsProgression = json.stats;
        var i, l = jsonStatisticsProgression.length;
        this.statisticsProgression = new Array(l);
        for (i = 0; i < l; i++){
            var statisticProgression = new SystemStatisticProgression();
            statisticProgression.readJSON(jsonStatisticsProgression[i]);
            this.statisticsProgression[i] = statisticProgression;
        }

        // Skills
        var jsonClassSkills = json.skills;
        l = jsonClassSkills.length;
        this.skills = new Array(l);
        for (i = 0; i < l; i++){
            var classSkill = new SystemClassSkill();
            classSkill.readJSON(jsonClassSkills[i]);
            this.skills[i] = classSkill;
        }
    }
}
