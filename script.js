import Ball from './Ball.js'
import Paddle from './Paddle.js';


    // creating objects

    const ball = new Ball($("#ball")[0]);
    const playerPaddle = new Paddle($("#player-paddle")[0]);
    const computerPaddle = new Paddle($("#computer-paddle")[0]);
    const computerScoreElem = $("#computer-score");
    const playerScoreElem = $("#player-score");
    //console.log(ball);

    //console.log(computerScoreElem);
    //console.log(playerScoreElem);

    let lastTime;
    function update(time) {
        if (lastTime != null) {
            const delta = time - lastTime;
            //update code
           ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
            //console.log(ball.y);
            computerPaddle.update(delta, ball.y);

            const hue = parseFloat(getComputedStyle($(":root")[0]).getPropertyValue("--hue")); // getting the custom hue property

            $(":root")[0].style.setProperty("--hue", hue+delta*0.01); // changing the hue with time

            if(isLose()) { // if ball does not touch any paddle
                handleLose();
                //console.log("lose");
            }
        }

        lastTime = time;
        window.requestAnimationFrame(update);
    }

    function isLose() {
        const rect = ball.rect();
        return rect.left<=0 || rect.right>=window.innerWidth; // if ball goes out of the window width
    }

    function handleLose() {
        const rect = ball.rect(); // getting ball's rectangle
        if(rect.right>=window.innerWidth) { 
            //console.log(playerScoreElem.text());
            playerScoreElem.text(parseInt(playerScoreElem.text())+1); // score of player increases by 1
        } else {
            //console.log(computerScoreElem.text());
            computerScoreElem.text(parseInt(computerScoreElem.text())+1); // score of computer increases with 1
        }
        ball.reset();
        computerPaddle.reset();
    }

    $(document).mousemove(function(event){
        //console.log(event.pageY);
        playerPaddle.position = (event.pageY/window.innerHeight)*100;
    });


    // document.addEventListener("mousemove", function(event){
    //     console.log(event.y);
    //     playerPaddle.position = (event.y/window.innerHeight)*100;
    // });
   

    window.requestAnimationFrame(update);


