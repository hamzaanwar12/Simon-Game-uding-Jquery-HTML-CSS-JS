let level = 1;
let count = 0;
let sequence = ["red", "green", "blue", "yellow"];
let target = []
let number;


$(document).ready(function () {

    //Detect / elect which voice has to be played
    voiceSlection = (color) => {
        let sound;
        switch (color) {
            case "red":
                sound = new Audio("../Simon Game Challenge Starting Files/sounds/red.mp3");
                break;

            case "green":
                sound = new Audio("../Simon Game Challenge Starting Files/sounds/green.mp3");
                break;

            case "blue":
                sound = new Audio("../Simon Game Challenge Starting Files/sounds/blue.mp3");
                break;

            case "yellow":
                sound = new Audio("../Simon Game Challenge Starting Files/sounds/yellow.mp3");
                break;

            case "error":
                sound = new Audio("../Simon Game Challenge Starting Files/sounds/wrong.mp3");
                document.body.style.backgroundColor = "#b70909bd";
                $("#message h1").text("Enter any Key to Restart the game ");
                setTimeout(() => {
                    document.body.style.backgroundColor = "grey";
                }, 500)
                restart();
                break;
        }
        sound.play();
    }

    let play = false
    restart = () => {

        level = 1;
        target = [];
        count = 0;
        after();
        play = false
    }

    restartGame = () => {
        level = 1;
        target.length = 0;
        target = [""]
        count = 0;
    }

    //Detect which element has been clicked
    getElement = (element) => {
        let color = "";
        let id = element.id;
        switch (id) {

            case "red":
                color = "red"
                break;

            case "green":
                color = "green"
                break;

            case "blue":
                color = "blue"
                break;

            case "yellow":
                color = "yellow"
                break;

            default:
                color = "error";
                break;
        }

        return color;

    }

    let xknown = 0;
    //Approximately the main Fnction in which the everything is being done yet
    after = () => {
        if (!play) {
            $(document).keypress(function () {
                $("#message h1").text("Level : " + (level));
                //Show  the Target to the User
                setTimeout(generateRandom, 1000);
                //Take the input after the target from the user
                // $(document).keypress (()=> {return this.false}) 
            })


        }
    }

    $(".color").on("click", function () {
        let input = this;
        checkId(input);
    });




    checkId = (inputElement) => {
        let id = inputElement.id;
        console.log(id)
        if (count < level) {
            if (id == target[count]) {
                count++;
                console.log(target)
                console.log(count)
                $(inputElement).animate({ opacity: 0.4 }, "fast").animate({ opacity: 1 }, "fast");
                voiceSlection(getElement(inputElement));

                if (count == level) {
                    count = 0;
                    level++;
                    play = false;
                    setTimeout(() => { $("#message h1").text("Level : " + (level)) }, 1000)
                    setTimeout(generateRandom, 1500);
                }

            }

            else if (id != target[count]) {
                play = true
                voiceSlection(id)
                voiceSlection("error");
            }

        }

    }

    generateRandom = () => {
        number = sequence[Math.floor(Math.random() * sequence.length)];
        target[level - 1] = number;
        console.log("number : " + number)
        console.log("target : ")
        console.log(target)
        console.log("count : " + count)

        let demo = document.getElementById(number);
        $(demo).animate({ opacity: 0.4 }, "fast").animate({ opacity: 1 }, "fast");
        voiceSlection(getElement(demo));
    }

    after(false);
})
