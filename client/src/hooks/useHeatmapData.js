import dayjs from 'dayjs';

//in case of this library, dates must be in YYYY/MM/DD format rather than YYYY-MM-DD
function useHeatmapData(submissions) {

    const dates = submissions.map(submission => submission.createdAt)

    const submissionsCountByDate = {};

    // Process the data to count the number of submissions for each day
    dates.forEach(date => {
        const dateKey = dayjs(date).format('YYYY/MM/DD');
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
        daysOfYear.push(currentDay.format('YYYY/MM/DD'));
        currentDay = currentDay.add(1, 'day');
    }

    // Create the labels and data for the chart
    const labels = daysOfYear;
    const data = labels.map(label => {
        const count = submissionsCountByDate[label] || -1
        const date = label

        return {count , date}
    });

    
    return data 
}

export {
    useHeatmapData,
}