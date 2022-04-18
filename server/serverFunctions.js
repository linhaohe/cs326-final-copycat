import { faker } from '@faker-js/faker';

const fakeData = {'add': [], 'delete': [], 'edit': [], 'export': [], 'select': []};

export function initFakeData() {
    Object.keys(fakeData).forEach( activity => {
        // Gerenates each category with some where between 300 and 400 activities in the past year
        let random = 300 + Math.floor(Math.random() * 100);
        let oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        fakeData[activity] = faker.date.betweens(oneYearAgo, new Date(), random);
    });
}

export async function getFakeActivityHistory(response, activityType, timeFrom, timeTo) {
    if (Object.keys(fakeData).indexOf(activityType) === -1 && activityType !== 'all') {
        response.status(404).send({"Status": "activity of type " + activityType + " not found!" });
        return;
    }
    let fromDate = new Date(timeFrom);
    let toDate = new Date(timeTo);
    function reducer(accumulator, currentActivity) {
        if (currentActivity !== activityType && activityType !== 'all') {
            return accumulator;
        }
        accumulator[currentActivity] = fakeData[currentActivity].filter( activityDate => {
            return fromDate <= activityDate && activityDate <= toDate ;
        });
        return accumulator;
    }
    let results = Object.keys(fakeData).reduce(reducer, {});
    response.status(200).send(results);
}

