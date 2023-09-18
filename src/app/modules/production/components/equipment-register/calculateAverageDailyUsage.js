import dayjs from "dayjs";

export const calculateAverageDailyUsage = (equipmentData, equipmentLatestHourFromPM) => {
    if (!equipmentData || !equipmentLatestHourFromPM) {
        return -1
    }
    const lastestHourFromPM = equipmentLatestHourFromPM[0]?.currentReading
    const latestHourFromNormalReading = equipmentData?.hoursEntries[0]?.currentReading
    let hoursWorkedSinceLastPM

    if (latestHourFromNormalReading - lastestHourFromPM >= 0) {
        hoursWorkedSinceLastPM = latestHourFromNormalReading - lastestHourFromPM
        console.log("hoursWorkedSinceLastPM", hoursWorkedSinceLastPM)
        const hoursSinceLastPM = dayjs().diff(dayjs(equipmentLatestHourFromPM[0]?.date), 'hour')
        console.log("hoursSinceLastPM", hoursSinceLastPM)
        const averageDailyUsage = hoursWorkedSinceLastPM / hoursSinceLastPM
        console.log("averageDailyUsage", averageDailyUsage)
        return averageDailyUsage
    } else {
        return -1
    }
};
