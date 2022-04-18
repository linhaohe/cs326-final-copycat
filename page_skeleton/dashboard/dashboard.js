
// Initializing all activity graphs as empty
const activityGraphIDs = ['allActivitiesLineGraph', 'activitiesGraphAdd', 'activitiesGraphDelete', 
                  'activitiesGraphEdit', 'activitiesGraphExport', 'activitiesGraphSelect'];
const graphColors = ['grey','orangered', 'blue', 'green', 'orange', 'lightblue'];
let graphCharts = activityGraphIDs.map((graphID, index) => {
    const ctx = document.getElementById(graphID).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [1,2,3],
            datasets: [{
                data: [1,2,3],
                borderColor: [
                    graphColors[index]
                ],
                borderWidth: 2,
                fill: true,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                display: false
                }
            }
        }
    });
});

const ctx = document.getElementById('pieGraph').getContext('2d');
const pieGraph = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Add','Delete','Edit','Export','Select'],
        datasets: [{
            data: [1,2,3,4,5],
            borderColor: graphColors.slice(1,6),
            borderWidth: 2,
            backgroundColor: graphColors.slice(1,6),
        }]
    }
});

// allActivitiesLineGraph.data.labels = ["a", "b", "c"];
// allActivitiesLineGraph.data.datasets[0].data = [12, 19, 3, 5, 10, 10, 100];
// allActivitiesLineGraph.update();
// console.log(allActivitiesLineGraph);

const activityTypes = ['all', 'add', 'delete', 'edit', 'export', 'select'];
const timeFrames = ['year', 'month', 'week', 'day', 'hour'];
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const oneYearAgo = () => new Date(new Date().setFullYear(new Date().getFullYear() - 1));
const oneMonthAgo = () => new Date(new Date().setMonth(new Date().getMonth() - 1));
const oneWeekAgo = () => new Date(new Date().setDate(new Date().getDate() - 7));
const oneDayAgo = () => new Date(new Date().setDate(new Date().getDate() - 1));
const oneHourAgo = () => new Date(new Date().setHours(new Date().getHours() - 1));
const pastTimes = [oneYearAgo, oneMonthAgo, oneWeekAgo, oneDayAgo, oneHourAgo];

async function updateLineGraph(activityIndex, activityType, timeIndex) {
    let timeFrom = JSON.stringify(pastTimes[timeIndex]());
    let timeTo = JSON.stringify(new Date());
    const response = await fetch(`/activities?activityType=${activityType}&timeFrom=${timeFrom}&timeTo=${timeTo}`);
    const data = await response.json();
    if (activityType === 'all') {
        updatePieGraph(data);
    }
    let parseFunction = (strDate) => {};
    let incrementTime = (strTime) => {};
    switch (timeFrames[timeIndex]) {
        case 'year':
            parseFunction = (strDate) => {
                let date = new Date(strDate);
                return date.getFullYear() + '-' + (date.getMonth() + 1);
            };
            incrementTime = (strTime) => {
                return new Date(strTime).setMonth(new Date(strTime).getMonth() + 1);
            };
            break;
        case 'month': case 'week':
            parseFunction = (strDate) => {
                let date = new Date(strDate);
                return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            };
            incrementTime = (strTime) => {
                return new Date(strTime).setDate(new Date(strTime).getDate() + 1);
            };
            break;
        case 'day':
            parseFunction = (strDate) => {
                let date = new Date(strDate);
                return (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours();
            };
            incrementTime = (strTime) => {
                return new Date(strTime).setHours(new Date(strTime).getHours() + 1);
            };
            break;
        default:
            parseFunction = (strDate) => {
                return new Date(strDate);
            };
            incrementTime = (strTime) => {
                return new Date(strTime).setMinutes(new Date(strTime).getMinutes() + 1);
            };
    }
    // console.log(data['add'][0].split(":"));
    let results = {};
    let min = '9999';
    Object.keys(data).forEach((key) => {
        data[key].forEach((strDate) => {
            let parsedDateStr = parseFunction(strDate);
            if (!(parsedDateStr in results)) {
                results[parsedDateStr] = 0;
                if (parsedDateStr < min) {
                    min = parsedDateStr;
                }
            }
            results[parsedDateStr]++;
        });
    });

    let datasetXAxis = [];
    let beginTime = new Date(min);
    let now = new Date();
    while (beginTime <= now) {
        datasetXAxis.push(parseFunction(beginTime));
        beginTime = incrementTime(beginTime);
    }

    let datasetYAxis = datasetXAxis.map( time => {
        return time in results ? results[time] : 0;
    });

    graphCharts[activityIndex].data.labels = datasetXAxis;
    graphCharts[activityIndex].data.datasets[0].data = datasetYAxis;
    graphCharts[activityIndex].update();
}

function updatePieGraph(data) {
    pieGraph.data.datasets[0].data = Object.keys(data).map( key => data[key].length);
    pieGraph.update();
}

// Add Event Listner to all buttons
activityTypes.forEach( (activityType, activityIndex) => {
    timeFrames.forEach( (timeFrame, timeIndex) => {
        const button = document.getElementById(`${activityType}-${timeFrame}`);
        button.addEventListener("click", async () => {
            await updateLineGraph(activityIndex, activityType, timeIndex);
        });
    });
});


async function initDashboard() {
    activityTypes.forEach( async (activityType, index) => {
        await updateLineGraph(index, activityType, 0);
    });
}

initDashboard();
