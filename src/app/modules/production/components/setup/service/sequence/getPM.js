export function getPMObjects(hours, servicesForThisModel) {
    const pms = servicesForThisModel

    function getPM(hours) {
        //while hours not in pms array  // 2520
        let pm;
        let max = -Infinity;
        let min = Infinity;
        while (!pms.some(pm => pm?.hours === hours)) {
            //find the pm with the highest hours that is less than the hours
            for (let i = 0; i < pms.length; i++) {
                if (pms[i].hours < hours) {
                    if (pms[i].hours > max) {
                        max = pms[i].hours
                        pm = pms[i]
                    }
                    if (pms[i].hours < min) {
                        min = pms[i].hours
                    }
                }
            }
            // if we subtract the pm hours from the hours and the result is less than the lowest pm hours then we return the pm
            if (hours - pm.hours < min) {
                return pm
            }
            return getPM(hours - pm.hours)
        }
        //return the pm which is below the hours
        // console.log("hours", hours)
        return pms.find(pm => pm.hours === hours)
    }

    return getPM(hours)
}

