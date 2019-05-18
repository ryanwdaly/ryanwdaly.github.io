$(document).ready(function() {
    var target_word = getRandomWord();
    var lives_left = 10;
    var guessed_letters = [];
    var guessed_keyCodes = [];
    var music = new sound('assets/stage_1.mp3');
    music.play();

    target_word = target_word.split('');

    renderDisplay();

    document.onkeyup = function(event) {
       
        var input = event.key.toLowerCase();
        var input_keyCode = event.keyCode;
        if (checkLetter(input_keyCode) == false) {
            alert('error: incorrect input')
        }
        else {
            
            if (isCorrect(input) == true) {
            
            }
            else {
                lives_left--;  
            }
            guessed_keyCodes.push(input_keyCode);
            guessed_letters.push(input);
            renderDisplay();

            if (hasWon() == true) {
                alert("you've won!");
            }
            if (hasLost() == true) {
                alert("you've lost!");
            }
            
            //Warn user before reloading
            window.onbeforeunload = function(event) {
                event.return;
            }
        }
    }

//---------HELPER_FUNCTIONS----------//

    function checkLetter(input){
   
        if(guessed_keyCodes.includes(input)) {
            return false;
        }
        if(!(input >= 65 && input <= 90)) {
            return false;
        }
        else {
            return true;
        }
    

    }
    //access word-text file and pick random line, return line as string
    function getRandomWord(){
        name_arr = ['astriods', 'centipede', 'galaxian', 'defender', 'battlezone', 
                    'frogger', 'gorf', 'tron', 'paperboy'];
        
        // return name_arr[randomInt()];
        word = name_arr[randomInt()];
        return word;
    }
    function renderDisplay() {
        //target-word
        // $("#target-word").text(target_word.join(''));
        //guesses-left
        // arr = [];

        $(".hearts").remove();
        for (i = 0; i < lives_left; i++) {

            $("#guesses-left").append('<img class="hearts" src="assets/images/heart.png" />');
        }
    
        $("#progress-display").text(renderWord());

        $(".guessed").remove();
        for (i=0; i < guessed_letters.length; i++){
            $("#guessed-letters").append('<div class="guessed">' + guessed_letters[i] + '</div>')
        }
    }

    function renderWord() {
        var display_arr = [];

        for(i = 0; i < target_word.length; i++) {
            if (guessed_letters.includes(target_word[i])) {
                display_arr.push(target_word[i]);
            }
            else {
                display_arr.push("_");
            }
        }
        return display_arr.join('');
    }

    //Returns true if user isn't being a dangus.
    function validInput() {

    }
    
//DONE
    //Checks whether input is correct
    function isCorrect(input) {
        var has_letter = false; 
        for(i = 0; i <= target_word.length; i++) {
            if(input == target_word[i]) {
                has_letter = true;
            }
        }
        return has_letter;
    }

    function randomInt() {
        min = Math.ceil(0);
        max = Math.floor(9);
        
        return Math.floor(Math.random() * (max + 1));
    }

    function hasWon() {
        var has_won = true;
        for(i = 0; i < target_word.length; i++) {
            if(!guessed_letters.includes(target_word[i])) {
                has_won = false;
            }
        }
        return has_won;
    }

    function hasLost() {
        var has_lost = false;
        if (lives_left <= 0) {
            has_lost = true;
        }
        
        return has_lost;
    }

    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        }
        this.stop = function () {
            this.sound.pause();
        }
    }
});