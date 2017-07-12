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

import QtQuick 2.4
import QtCanvas3D 1.1
import QtQuick.Window 2.2
import QtQuick.Dialogs 1.1

import "qmlUtilities.js" as Game

// -------------------------------------------------------
//
//  main.qml
//
//  Main QML file for interface support. Handling display,
//  events..
//
// -------------------------------------------------------

// -------------------------------------------------------
// Main Window
// -------------------------------------------------------
Window {
    id: window
    title: qsTr("Game")
    //visibility: "FullScreen"

    width: 640
    height: 480
    maximumHeight: height
    maximumWidth: width
    minimumHeight: height
    minimumWidth: width

    visible: true
    Component.onCompleted: {
        setX(Screen.width / 2 - width / 2);
        setY(Screen.height / 2 - height / 2);
        Game.$canvasHUD = canvas;
    }

    function showError(e){
        dialogError.text = e.fileName + " - line: " + e.lineNumber + " -> " +
                e.message;
        dialogError.open();
    }

    MessageDialog {
        id: dialogError
        title: "Error"
        icon: StandardIcon.Critical
        visible: false

        onButtonClicked: {
            Game.quit();
        }
    }

    Timer {
        interval: 1000; running: true; repeat: true
        onTriggered: {
            Game.Wanok.updateTimer();
        }
    }

    property double startTime: new Date().getTime()

    // -------------------------------------------------------
    // Keys handling
    // -------------------------------------------------------

    Item {
        id: keyboard
        focus: true

        onActiveFocusChanged: {
            Game.$keysPressed = [];
        }

        Keys.onPressed: {
            try{
                var key = event.key;

                if (key === Qt.Key_F12){
                    Game.quit();
                }

                if (!event.isAutoRepeat){
                    Game.$keysPressed.unshift(key);
                    if (!Game.Wanok.isLoading())
                        Game.onKeyPressed(key);
                }

                // Wait 50 ms for a slower update
                var t = new Date().getTime();
                if (t - startTime >= 50){
                    startTime = t;
                    if (!Game.Wanok.isLoading())
                        Game.onKeyPressedAndRepeat(key);
                }
            }
            catch (e){
                showError(e);
            }
        }

        Keys.onReleased: {
            try{
                if (event.isAutoRepeat) return;
                var key = event.key;
                Game.$keysPressed.splice(Game.$keysPressed.indexOf(key), 1);

                if (!Game.Wanok.isLoading())
                    Game.onKeyReleased(key);
            }
            catch (e){
                showError(e);
            }
        }
    }

    // -------------------------------------------------------
    // 3D drawing
    // -------------------------------------------------------

    Canvas3D {
        id: canvas3d
        anchors.fill: parent

        onInitializeGL: {
            try{
                Game.$DIALOG_ERROR = dialogError;
                Game.$canvasWidth = canvas3d.width;
                Game.$canvasHeight = canvas3d.height;
                Game.$windowX = Game.$canvasWidth / Game.$SCREEN_X;
                Game.$windowY = Game.$canvasHeight / Game.$SCREEN_Y;
                Game.initialize();
                Game.initializeGL(canvas3d);
            }
            catch (e){
                showError(e);
            }
        }

        onPaintGL: {
            try{
                if (!Game.Wanok.isLoading()){
                    Game.update();
                    if (!Game.Wanok.isLoading()){
                        if (!Game.$gameStack.isEmpty()){
                            var callback =
                                    Game.$gameStack.top().callBackAfterLoading;
                            if (callback === null){
                                Game.draw3D(canvas3d);
                                Game.drawHUD(canvas);
                                canvas.requestPaint();
                            }
                            else
                                callback.call(Game.$gameStack.top());
                        }
                    }
                }
            }
            catch (e){
                showError(e);
            }
        }

        onResizeGL: {
            try{
                Game.$canvasWidth = canvas3d.width;
                Game.$canvasHeight = canvas3d.height;
                Game.resizeGL(canvas3d);
            }
            catch (e){
                showError(e);
            }
        }
    }

    // -------------------------------------------------------
    // HUD drawing
    // -------------------------------------------------------

    Canvas {
      id: canvas
      anchors.fill: parent
    }
}
