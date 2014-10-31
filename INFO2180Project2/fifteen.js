/**
 * Created by Dane on 10/25/2014.
 */
var startup = true;
var positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var empty = 15;
var win = false;
var started = false;
var shuffles = 0;



function findPos(obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft
        curtop = obj.offsetTop
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft
            curtop += obj.offsetTop
        }
    }
    return [curleft,curtop];
}

function addClass(obj){
    for(var i = 0; i<obj.length;i++) {
        var empty2 = ((findPos(obj[i])[1] - 151) / 25) + ((findPos(obj[i])[0] - 475) / 100);
        if (empty2 == empty + 4 || empty2 == empty - 4 || empty2 == empty - 1 || empty2 == empty + 1) {
            obj[i].addClassName("movablepiece");
        }
        else {
            obj[i].removeClassName("movablepiece");
        }
    }

}

function iswin(obj){
    win = true;
    for(var i = 0; i<obj.length;i++){
        if ((((findPos(obj[i])[1] - 151) /25) + ((findPos(obj[i])[0] - 475) /100)) != i){
            win = false;
            break;
        }
    }
    if(win && started){
        alert("YOU WON\nPress Shuffle to start new game");

    }
    else if(win && !(started)){
        alert("YOU SLY CHEATER\nPress Shuffle to start new game");
    }

}

function move_to_space(obj){
    var empty2 = ((findPos(obj)[1] - 151) /25) + ((findPos(obj)[0] - 475) /100) ;
    if( empty2 == empty + 4 || empty2 == empty -4 || empty2==empty-1 || empty2 == empty+1) {
        obj.style.top = (parseInt(empty / 4) * 100) + 'px';
        obj.style.left = (( empty % 4) * 100) + 'px';
        empty = empty2;
    }
    else{
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

function position(pzzlpeices, pos){
    var maxnum = 15;
    empty = pos[15];
    if(startup) {
        maxnum = pzzlpeices.length;
    }
        for (var count = 0; count < maxnum; count++){
            if(startup) {
                pzzlpeices[count].className = "puzzlepiece";
                pzzlpeices[count].style.backgroundPosition = '-' + ((count % 4) * 100) + 'px -' + (parseInt(count / 4) * 100) + 'px ';
                pzzlpeices[count].id = "square_" + ((count % 4)) + "_" + (parseInt(count / 4));
            }
            var countr = pos[count];
            pzzlpeices[count].style.top = (parseInt( countr /4) * 100) +'px';
            pzzlpeices[count].style.left = (( countr% 4) * 100) +'px';

            pzzlpeices[count].onclick = function(){
                //alert(this.id);
                move_to_space(this);
                addClass(pzzlpeices);
                iswin(pzzlpeices);
            };


        }
    addClass(pzzlpeices);

};

window.onload = function(){
    var backgrounds = ['url("background_2.jpg")', 'url("background.jpg")','url("background_3.jpg")']
    var pzzlpeices = $$("div#puzzlearea div");
    position(pzzlpeices,positions);
    startup = false;
    alert("Welcome to my fifteen puzzle choose a board then press shuffle to start.");
    var background = prompt("What background would you like?\n0 - Taylor Swift\n1 - Watch Dogs\n2 - Iron Man");
    for (var count = 0; count < pzzlpeices.length; count++){
        pzzlpeices[count].style.backgroundImage = backgrounds[background];

    }

    $("shufflebutton").onclick = function(){
        if(shuffles == 0){
            started = true;
            shuffles +=1;
        }
        if(win){
            started = true;
            win = false;
        }

        var shuffled = shuffle(positions);
        position(pzzlpeices, shuffled);
    };
};




