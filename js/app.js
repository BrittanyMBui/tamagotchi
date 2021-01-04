/* TAMAGOTCHI PET
- Create a class 'Tamagotchi'
- Add character to the page
- Create a text display of
    - Hunger (1-10)
    - Sleepiness (1-10)
    - Boredom (1-10)
    - Age
- Create a naming button that disappears after name is entered - name should be displayed under "name" header in stats bar
- Create a button for feeding
- Create a button for turning off the lights
    - Create a light/dark toggle class? Time limit?
- Create a button for playing with pet
- Add an input form to add a name and display name
*/

// STATS
let timer = 0;
let hunger = 0;
let sleepiness = 0;
let boredom = 0;
let age = 0;

// SOUND EFFECTS
const eatSound = new Audio('assets/eat.mp3');
const giggle = new Audio('assets/giggle.mp3');
const snore = new Audio('assets/snore.mp3');

// TAMAGOTCHI VARIABLE
const tama = $('.tamagotchi-char');

// RENDER STATS
function renderStats() {
    $('.age-stats-display').text(`AGE: ${age}`);
    $('.hunger-stats-display').text(`HUNGER: ${hunger}`);
    $('.sleepiness-stats-display').text(`SLEEPINESS: ${sleepiness}`);
    $('.boredom-stats-display').text(`BOREDOM: ${boredom}`);
};

// INCREMENT STATS
function incrementStats() {
    if (timer % 5 === 0) {
        hunger++;
        sleepiness++;
        boredom++;
        age++;
        renderStats();
    }
};

// ALERT CRITICAL STATS
function alertCritStats() {
    if (hunger >= 5) {
        $('.hunger-stats-display').css('color', 'red');
        $(tama).attr('src', 'assets/hungry-panda.gif');
    } else if (sleepiness >= 6){
        $('.sleepiness-stats-display').css('color', 'red');
        $(tama).attr('src', 'assets/tired-panda.gif');
    } else if (boredom >= 7) {
        $('.boredom-stats-display').css('color', 'red');
        $(tama).attr('src', 'assets/bored-panda.gif');
    } else {
        $(tama).attr('src', 'assets/main-panda.gif');
        $('.hunger-stats-display').css('color', '#fdadbf');
        $('.sleepiness-stats-display').css('color', '#e3ce5b');
        $('.boredom-stats-display').css('color', '#a08dd6');
    }
};

// TIMER
function startTimer() {
    const counter = setInterval(function() {
        timer++;
        $('#timer').text(`TIME: ${timer}`);

        incrementStats();

        // ALERT CRITICAL STATS
        alertCritStats();


        // SUDDEN DEATH
        if (hunger === 10 || boredom === 10 || sleepiness === 10) {
            clearInterval(counter);
            $(tama).attr('src', 'assets/you-died.gif');
            window.alert(`Your pet is DEAD.`);
        }

        // YOU'RE OLD
        if (age >= 20) {
            clearInterval(counter);
            $(tama).attr('src', 'assets/old-panda.gif');
            window.alert('Your pet is now elderly and will be taken to a home. Goodbye.')
        }
        

    }, 1000);
}; 

// BUTTONS
const feedBtn = $('.feed');
const playBtn = $('.play');
const lightsOut = $('.lights-out');

feedBtn.on('click', function() {
    eatSound.play();
    $(tama).attr('src', 'assets/eating-panda2.gif');
    if (hunger > 0) {
        hunger--;
        renderStats();
    }
    if (hunger === 0) {
        $(tama).attr('src', 'assets/main-panda.gif')
    }
});

playBtn.on('click', function() {
    giggle.play();
    $(tama).attr('src', 'assets/playing-panda.gif');
    if (boredom > 0) {
        boredom--;
        renderStats();
    }
    if (boredom === 0) {
        $(tama).attr('src', 'assets/main-panda.gif')
    }
});

lightsOut.on('click', function() {
    snore.play();
    $('body').toggleClass('lights-out-toggle');
    $(tama).attr('src', 'assets/sleeping-panda.gif');
    if (sleepiness > 0) {
        sleepiness--;
        renderStats();
    }
    if (sleepiness === 0) {
        $(tama).attr('src', 'assets/main-panda.gif')
    }
});

// START
const startBtn = $('.start-btn');

$(startBtn).on('click', function() {
    let name = prompt('Name your pet first!');
    const nameDisp = $('.name-stats-display');
    $(nameDisp).text(`NAME: ${name}`);

    startTimer();
});

