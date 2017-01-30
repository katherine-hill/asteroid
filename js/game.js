(function gameSetup() {
    'use strict';

    var shipElem = document.getElementById('ship');
    //object for ship, has values set for velocity and angle
    const ship = {
        velocity: 0,
        angle: 0,
        top: 0,
        left: 0
    };

    //inerpolates top and left of the ship into px
    shipElem.style.top = `${ship.top}px`;
    shipElem.style.left = `${ship.left}px`;

    var allAsteroids = [];
    var newAsteroidData = [];

    shipElem.addEventListener('asteroidDetected', function(event) {
        allAsteroids.push(event.detail);
        // console.dir(allAsteroids);
    });

    function handleKeys(event) {
        if (event.keyCode === 40) {
            if (ship.velocity > 0) {
                ship.velocity--;
            }
        } else if (event.keyCode === 38) {
            ship.velocity++;
        } else if (event.keyCode === 39) {
            ship.angle += 10;
            shipElem.style.transform = `rotate(${ship.angle}deg)`;

        } else if (event.keyCode === 37) {
            ship.angle -= 10;
            shipElem.style.transform = `rotate(${ship.angle}deg)`;

        }
    }
    document.querySelector('body').addEventListener('keyup', handleKeys);
    // @return {
    //     void
    // }

    function gameLoop() {
        var move = getShipMovement(ship.velocity, ship.angle);

        // String(move);
        // move += 'px'
        shipElem.style.top = (parseInt(shipElem.style.top, 10) - move.top) + 'px';
        shipElem.style.left = (parseInt(shipElem.style.left, 10) + move.left) + 'px';

        const items = document.getElementsByTagName("aside"); //asteroidList

        for (let index = 0; index < allAsteroids.length; index++) {
            if (allAsteroids[index].style.animation - name === items[index].style.animation - name) {
                allAsteroids[index].clientRect = items[index].getBoundingClientRect();

            }
        }
        checkforCollisions(); //fxn call

    }

    function checkforCollisions() {

        let shipTop = shipElem.getBoundingClientRect().top;
        let shipLeft = shipElem.getBoundingClientRect().left;

        let shipRect = {
            x: shipLeft,
            y: shipTop,
            width: 40,
            height: 50
        };
        for (let index = 0; index < allAsteroids.length; index++) {
            let asterRect = {
                x: allAsteroids[index].clientRect.left,
                y: allAsteroids[index].clientRect.top,
                width: (allAsteroids[index].clientRect.right - allAsteroids[index].clientRect.left),
                height: (allAsteroids[index].clientRect.bottom - allAsteroids[index].clientRect.top)
            };
            if (shipRect.x < asterRect.x + asterRect.width &&
                shipRect.x + shipRect.width > asterRect.x &&
                shipRect.y < asterRect.y + asterRect.height &&
                shipRect.height + shipRect.y > asterRect.y) {
                crash(allAsteroids[index]);
            }

        }
    }
    document.querySelector('main').addEventListener('crash', function() {
        console.log('A crash occurred!');

    });

    /** ************************************************************************
     *             These functions and code are given to you.
     *
     *                   !!! DO NOT EDIT BELOW HERE !!!
     ** ************************************************************************/

    var loopHandle = setInterval(gameLoop, 20);

    /**
     * Executes the code required when a crash has occurred. You should call
     * this function when a collision has been detected with the asteroid that
     * was hit as the only argument.
     *
     * @param  {HTMLElement} asteroidHit The HTML element of the hit asteroid
     * @return {void}
     */
    function crash(asteroidHit) {
        document.querySelector('body').removeEventListener('keyup', handleKeys);
        asteroidHit.classList.add('hit');
        document.querySelector('#ship').classList.add('crash');

        var event = new CustomEvent('crash', {
            detail: asteroidHit
        });
        document.querySelector('main').dispatchEvent(event);
    }

    /**
     * Get the change in ship position (movement) given the current velocity
     * and angle the ship is pointing.
     *
     * @param  {Number} velocity The current speed of the ship (no units)
     * @param  {Number} angle    The angle the ship is pointing (no units)
     * @return {Object}          The amount to move the ship by with regard to left and top position (object with two properties)
     */
    function getShipMovement(velocity, angle) {
        return {
            left: (velocity * Math.sin(angle * Math.PI / 180)),
            top: (velocity * Math.cos(angle * Math.PI / 180))
        };
    }

})();
