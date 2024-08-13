import dayjs from 'dayjs';

function useSubmission(dates) {

    const submissionsCountByDate = {};

    // Process the data to count the number of submissions for each day
    dates.forEach(date => {
        const dateKey = dayjs(date).format('YYYY-MM-DD');
        if (submissionsCountByDate[dateKey]) {
            submissionsCountByDate[dateKey]++;
        } else {
            submissionsCountByDate[dateKey] = 1;
        }
    });


    // Create an array with all the days of the year
    const startOfYear = dayjs().startOf('year');
    const endOfYear = dayjs().endOf('year');
    const daysOfYear = [];
    let currentDay = startOfYear;
    while (currentDay.isBefore(endOfYear)) {
        daysOfYear.push(currentDay.format('YYYY-MM-DD'));
        currentDay = currentDay.add(1, 'day');
    }

    // Create the labels and data for the chart
    const labels = daysOfYear;
    const data = labels.map(label => submissionsCountByDate[label] || 0);

    return { labels, data }
}

export {
    useSubmission,
}