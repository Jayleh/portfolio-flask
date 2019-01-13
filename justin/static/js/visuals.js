// Bar chart
let ctxBar = document.getElementById("bar-chart");

let barData = {
    labels: ["A", "B", "C", "D"],
    datasets: [{
        data: [4, 1, 9.5, 4],
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        borderColor: [
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)'
        ],
        borderWidth: 1
    }, {
        data: [5, 7.5, 1.5, 2.5],
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
        ],
        borderColor: [
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)'
        ],
        borderWidth: 1
    }, {
        data: [5, 7.5, 1.5, 2.5],
        type: 'line',
        backgroundColor: [
            'rgba(207, 216, 220, 0.2)'
        ],
        borderColor: [
            'rgba(207, 216, 220, 1)'
        ]
    }]
}

let barOptions = {
    legend: {
        display: false
    },
    tooltips: {
        enabled: false
    },
    scales: {
        yAxes: [{
            ticks: {
                display: false,
                beginAtZero: true
            }
        }]
    }
}

let barChart = new Chart(ctxBar, {
    type: 'bar',
    data: barData,
    options: barOptions
});


// Bubble chart
let DATA_COUNT = 16;
let MIN_XY = 0;
let MAX_XY = 100;

function colorize(opaque, context) {
    let value = context.dataset.data[context.dataIndex];
    let x = value.x / 100;
    let y = value.y / 100;

    let r = x < 0 && y < 0 ? 250 : x < 0 ? 150 : y < 0 ? 50 : 0;
    let g = x < 0 && y < 0 ? 0 : x < 0 ? 50 : y < 0 ? 150 : 250;
    let b = x < 0 && y < 0 ? 0 : x > 0 && y > 0 ? 250 : 150;
    let a = opaque;

    return `rgba(${r}, ${g}, ${b}, ${a}`;
}

function generateData() {
    let data = [];
    let i;

    for (i = 0; i < DATA_COUNT; ++i) {
        data.push({
            x: getRandomIntInclusive(MIN_XY, MAX_XY),
            y: getRandomIntInclusive(MIN_XY, MAX_XY),
            r: getRandomIntInclusive(5, 20)
        });
    }

    return data;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

let bubbleData = {
    datasets: [{
        data: generateData()
    }, {
        data: generateData(),
        backgroundColor: 'rgba(255, 99, 132, 1)'
    }, {
        data: generateData(),
        backgroundColor: 'rgba(54, 162, 235, 1)'
    }, {
        data: generateData(),
        backgroundColor: 'rgba(75, 192, 192, 1)'
    }]
};

// console.log(bubbleData);

let bubbleOptions = {
    // aspectRatio: 1,
    legend: false,
    tooltips: false,
    layout: {
        padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
        }
    },
    scales: {
        yAxes: [{
            display: false
        }],
        xAxes: [{
            display: false
        }]
    }
};

let bubbleChart = new Chart('bubble-chart', {
    type: 'bubble',
    data: bubbleData,
    options: bubbleOptions
});

// eslint-disable-next-line no-unused-lets
function randomize() {
    bubbleChart.data.datasets.forEach(function (dataset) {
        dataset.data = generateData();
    });
    bubbleChart.update();
}

// Update bubble every 10 seconds
window.setInterval(function () {
    randomize();
}, 10e3);
