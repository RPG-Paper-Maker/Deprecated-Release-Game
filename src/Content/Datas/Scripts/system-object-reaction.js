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
//  CLASS SystemObjectReaction
//
// -------------------------------------------------------

/** @class
*   A reaction to an event.
*   @property {boolean} blockingHero Indicates if this reaction is blocking
*   the hero.
*   @property {Object} labels Hash of all the labels.
*   @property {Tree} commands All the commands.
*/
function SystemObjectReaction(){
    this.labels = new Array; // TODO
}

SystemObjectReaction.prototype = {

    /** Read the JSON associated to the object reaction.
    *   @param {Object} json Json object describing the object.
    */
    readJSON: function(json){

        // Options
        this.blockingHero = json.bh;

        // Read commands
        var jsonCommands = json.c;
        var commands = new Tree("root");
        this.readChildrenJSON(jsonCommands, commands);
        this.commands = commands;
    },

    // -------------------------------------------------------

    /** Read the JSON children associated to the object reaction.
    *   @param {Object} jsonCommands Json object describing the object.
    *   @param {Tree} commands All the commands (final result).
    */
    readChildrenJSON: function(jsonCommands, commands){
        for (var j = 0, ll = jsonCommands.length; j < ll; j++){
            var node = commands.add(
                        this.getEventCommand(jsonCommands[j].command,
                                             jsonCommands[j].kind))
            if (jsonCommands[j].hasOwnProperty("children"))
                this.readChildrenJSON(jsonCommands[j].children, node);
        }
    },

    // -------------------------------------------------------

    /** Get a new Event Command object.
    *   @param {string[]} command Description of the command.
    *   @param {EventCommandKind} kind The kind of command.
    *   @returns {EventCommand}
    */
    getEventCommand: function(command, kind){
        switch(kind) {
            case EventCommandKind.ShowText:
                return new EventCommandShowText(command);
            case EventCommandKind.ChangeVariables:
                return new EventCommandChangeVariables(command);
            case EventCommandKind.EndGame:
                return new EventCommandEndGame(command);
            case EventCommandKind.While:
                return new EventCommandWhile(command);
            case EventCommandKind.WhileBreak:
                return new EventCommandWhileBreak(command);
            case EventCommandKind.InputNumber:
                return new EventCommandInputNumber(command);
            case EventCommandKind.If:
                return new EventCommandIf(command);
            case EventCommandKind.Else:
                return new EventCommandElse(command);
            case EventCommandKind.OpenMainMenu:
                return new EventCommandOpenMainMenu(command);
            case EventCommandKind.OpenSavesMenu:
                return new EventCommandOpenSavesMenu(command);
            case EventCommandKind.ModifyInventory:
                return new EventCommandModifyInventory(command);
            case EventCommandKind.ModifyTeam:
                return new EventCommandModifyTeam(command);
            case EventCommandKind.StartBattle:
                return new EventCommandStartBattle(command);
            case EventCommandKind.IfWin:
                return new EventCommandIfWin(command);
            case EventCommandKind.IfLose:
                return new EventCommandIfLose(command);
            case EventCommandKind.ChangeState:
                return new EventCommandChangeState(command);
            case EventCommandKind.SendEvent:
                return new EventCommandSendEvent(command);
            case EventCommandKind.TeleportObject:
                return new EventCommandTeleportObject(command);
            case EventCommandKind.MoveObject:
                return new EventCommandMoveObject(command);
            case EventCommandKind.Wait:
                return new EventCommandWait(command);
            default:
                return null;
        }
    },

    // -------------------------------------------------------

    /** Get the first node command of the reaction.
    *   @returns {Node}
    */
    getFirstCommand: function() {
        return this.commands.root.firstChild;
    }
}
