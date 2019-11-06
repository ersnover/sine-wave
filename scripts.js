const trigContainer = document.getElementById('trigContainer');
const circleRadius = document.getElementById('radius')
const oppositeLegTop = document.getElementById('oppositeLegTop')
const oppositeLegBottom = document.getElementById('oppositeLegBottom')

// calculate spacing of grains
const windowWidth = window.innerWidth;
const containerHeight = windowWidth / 3
const grains = windowWidth / 10
// delta x for each point ( 5π/2 is total x distance on graph)
const xInterval =  (Math.PI * 5/2) / grains;

// create points with height set to zero
(renderGrains = (grains) => {
    [...Array(grains)].forEach(i => {
        let point = `<div data-x="0" class="point"></div>`
        
        trigContainer.insertAdjacentHTML('afterbegin', point)
    })
})(grains);


const points = document.querySelectorAll('.point');

// set point height to sin(x) (x = distance from y axis)
(initGrainHeight = () => {

    points.forEach((point, i) => {

        // convert distance to radians
        let xPosition = i * xInterval - (Math.PI / 2)
        
        // save this number for later (will become offset angle for timing function)
        point.dataset.x = xPosition

        // y = A * sin(x + α) with x = 0, α = point's distance from y-axis
        let height = -0.5 * containerHeight * Math.sin(xPosition)

        point.style.transform = `translate(0px, ${height}px)`
    })
})();


// use t = x in the sine function
let t = 0;

setInterval(() => {
    points.forEach(point => {

        // y = A * sin(x + α), increment x for each point
        let height = -0.5 * containerHeight * Math.sin(t/200 + parseFloat(point.dataset.x))

        // apply new height
        point.style.transform = `translate(0px, ${height}px)` 
    })

    //convert t/200 radians to degrees for circle angle
    let tDeg = (t/200) * (180 / Math.PI)

    circleRadius.style.transform = `rotate(-${tDeg}deg)`

    // grow opposite leg of triangle in time with sine wave
    oppositeLegHeight = 50 * Math.sin(t/200)
    // move leg horizontally in time with the cosine of t
    oppositeLegX = (containerHeight / 2) * Math.cos(t/200)

    // this is actually two spans pretending to be one span
    // negative percentages are read equal to 0, so that worked out pretty nicely
    oppositeLegTop.style.height = `${oppositeLegHeight}%`
    oppositeLegBottom.style.height = `${oppositeLegHeight * - 1}%`


    oppositeLegTop.style.transform = `translateX(${oppositeLegX}px)`
    oppositeLegBottom.style.transform = `translateX(${oppositeLegX}px)`

    t++

}, 10);

 // speed control
 // circle graph


