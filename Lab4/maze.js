/*Author: Dane Miller
ID: 620070179
Date: 03/10/2014*/

"use strict";
var canwin = true;
var win = false;

window.onload = function(){
    $("boundary1").onmouseover = setSingleLose;
    var boundaries = $$('div.boundary');
    for(var counter = 0; counter< boundaries.length; counter++){
        boundaries[counter].onmouseover = setLose;
    }
    $('end').onmouseover = endgame;
    $('start').onclick = resetgame;
    $$('div#maze')[0].onmouseleave = outercheat;
};

var setSingleLose = function(){
    $('boundary1').addClassName("youlose");
};

var setLose = function(){
    var boundaries = $$('div.boundary');
    var counter;
    canwin = false;
    for(counter = 0; counter< boundaries.length; counter++){
        boundaries[counter].addClassName("youlose");
    }
};

var endgame = function(){
    if (!win){
        if (canwin){
            //alert("You won! Good Job");
            $$("h2#status")[0].innerText ="You Win";
            win = true;
        } else {
            //alert("You Lost :'( Try again.");
            win = false;
            $$("h2#status")[0].innerText ="You Lose";
    
        }
    }
};

var resetgame = function(){
    canwin = true;
    win=false;
    var boundaries = $$('div.boundary');
    for(var counter = 0; counter< boundaries.length; counter++){
        boundaries[counter].removeClassName("youlose");
    }
    $$("h2#status")[0].innerText ="Get from S to E without touching the maze.";

};

var outercheat = function(){
    if(!win && canwin){
        $$("h2#status")[0].innerText ="Please stay within the maze.\nClick S to reset";
        canwin = false;
    }
}
