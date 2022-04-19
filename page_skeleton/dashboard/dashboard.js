
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
const twelveYearsAgo = () => new Date(new Date().setFullYear(new Date().getFullYear() - 12));
const twelveMonthsAgo = () => new Date(new Date().setMonth(new Date().getMonth() - 12));
const twelveWeeksAgo = () => new Date(new Date().setDate(new Date().getDate() - (7*12) - new Date().getDay()));
const twelveDaysAgo = () => new Date(new Date().setDate(new Date().getDate() - 12));
// const oneDayAgo = () => new Date(new Date().setDate(new Date().getDate() - 1));
const twelveHoursAgo = () => new Date(new Date().setHours(new Date().getHours() - 12));
const pastTimes = [twelveYearsAgo, twelveMonthsAgo, twelveWeeksAgo, twelveDaysAgo, twelveHoursAgo];

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
                return date.getFullYear();
            };
            incrementTime = (strTime) => {
                return new Date(strTime).setFullYear(new Date(strTime).getFullYear() + 1);
            };
            break;
        case 'month':
            parseFunction = (strDate) => {
                let date = new Date(strDate);
                return date.getFullYear() + '/' + (date.getMonth() + 1);
            };
            incrementTime = (strTime) => {
                return new Date(strTime).setMonth(new Date(strTime).getMonth() + 1);
            };
            break;
        case 'week':
            parseFunction = (strDate) => {
                let date = new Date(new Date(strDate).setDate(new Date(strDate).getDate() - new Date(strDate).getDay()));
                return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
            };
            incrementTime = (strTime) => {
                return new Date(strTime).setDate(new Date(strTime).getDate() + 7);
            };
            break;
        case 'day':
            parseFunction = (strDate) => {
                let date = new Date(strDate);
                return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
            };
            incrementTime = (strTime) => {
                return new Date(strTime).setDate(new Date(strTime).getDate() + 1);
            };
            break;
        case 'hour':
            parseFunction = (strDate) => {
                let date = new Date(strDate);
                return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + 'H';
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
    Object.keys(data).forEach((key) => {
        data[key].forEach((strDate) => {
            let parsedDateStr = parseFunction(strDate);
            if (!(parsedDateStr in results)) {
                results[parsedDateStr] = 0;
            }
            results[parsedDateStr]++;
        });
    });

    let datasetXAxis = [];
    let beginTime = pastTimes[timeIndex]();
    let now = new Date();
    while (beginTime <= now) {
        datasetXAxis.push(parseFunction(beginTime));
        beginTime = incrementTime(beginTime);
    }
    let datasetYAxis = datasetXAxis.map( time => {
        return time in results ? results[time] : 0;
    });
    
    if (timeIndex === 2) {
        datasetXAxis = datasetXAxis.map( elem => "Week of " + elem);
    }

    console.log(datasetXAxis);
    console.log(datasetYAxis);
    graphCharts[activityIndex].data.labels = datasetXAxis;
    graphCharts[activityIndex].data.datasets[0].data = datasetYAxis;
    graphCharts[activityIndex].update();
}

function updatePieGraph(data) {
    pieGraph.data.datasets[0].data = Object.keys(data).map( key => data[key].length);
    pieGraph.update();
}

function setPrimaryButton(activityType, timeFrameToSet) {
    timeFrames.forEach( timeFrame => {
        const button = document.getElementById(`${activityType}-${timeFrame}`);
        if(timeFrame === timeFrameToSet) {
            button.classList = "btn btn-primary";
        } else {
            button.classList = "btn btn-secondary";
        }
    });
}

// Add Event Listner to all buttons
activityTypes.forEach( (activityType, activityIndex) => {
    timeFrames.forEach( (timeFrame, timeIndex) => {
        const button = document.getElementById(`${activityType}-${timeFrame}`);
        button.addEventListener("click", async () => {
            await updateLineGraph(activityIndex, activityType, timeIndex);
            setPrimaryButton(activityType, timeFrame);
        });
    });
});


async function initDashboard() {
    activityTypes.forEach( async (activityType, index) => {
        await updateLineGraph(index, activityType, 0);
    });
}

initDashboard();
