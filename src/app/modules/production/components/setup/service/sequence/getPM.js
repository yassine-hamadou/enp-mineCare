export const getPMObjects = (hours, servicesForThisModel) => {
    if (!servicesForThisModel || servicesForThisModel.length === 0) {
        return null
    }
    if (!servicesForThisModel[0].hours) {
        return null
    }


    const pms = servicesForThisModel
    //sort the pms in ascending order
    pms.sort((a, b) => a.hours - b.hours)

    const lowestPM = pms[0]

    //return the current and predicted PM as being the same if the current hours reading is less than the lowest PM hours
    if (hours < lowestPM.hours) {
        return {
            ...lowestPM,
            predictedPm: lowestPM
        }
    }


    // function getPM(hours) {
    //     /*
    //         If the current hours reading is not in PMs that we setup for that vehicle's model
    //         then we determine the PM using the service cycle that was setup for the vehicle's model.
    //     */
    //     let pm;
    //
    //     let max = -Infinity;
    //     let min = Infinity;
    //
    //     while (!pms.some(pm => pm?.hours === hours)) {
    //         //find the pm with the highest hours that is less than
    //         // the current hours reading of the vehicle
    //         for (let i = 0; i < pms.length; i++) {
    //             if (pms[i].hours < hours) {
    //                 if (pms[i].hours > max) {
    //                     max = pms[i].hours
    //                     pm = pms[i]
    //                 }
    //                 if (pms[i].hours < min) {
    //                     min = pms[i].hours
    //                 }
    //             }
    //         }
    //
    //         /*
    //          if we subtract the pm hours from the current hours reading of the vehicle
    //          and the result is less than the lowest pm hours then we return the pm
    //         */
    //         // if (!pm) {
    //         //     // If no suitable PM was found, return null
    //         //     return null;
    //         // }
    //
    //         if (hours - pm.hours < min) {
    //             return pm
    //         }
    //
    //
    //         // if (hours - pm.hours > min) {
    //         //     return getPM(hours - pm.hours);
    //         // }
    //
    //         return getPM(hours - pm.hours)
    //     }
    //     //return the pm which is below the current hours reading of the vehicle
    //     return pms.find(pm => pm.hours === hours)
    // }


    //new function
    function getPM(hours) {
        /*
            If the current hours reading is not in PMs that we setup for that vehicle's model
            then we determine the PM using the service cycle that was setup for the vehicle's model.
        */
        let pm;

        let max = -Infinity;
        let min = Infinity;

        while (!pms.some(pm => pm?.hours === hours)) {
            //find the pm with the highest hours that is less than
            // the current hours reading of the vehicle
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

            /*
             if we subtract the pm hours from the current hours reading of the vehicle
             and the result is less than the lowest pm hours then we return the pm
            */
            // if (!pm) {
            //     // If no suitable PM was found, return null
            //     return null;
            // }

            if (hours - pm.hours < min) {
                return pm
            }


            // if (hours - pm.hours > min) {
            //     return getPM(hours - pm.hours);
            // }

            return getPM(hours - pm.hours)
        }
        //return the pm which is below the current hours reading of the vehicle
        return pms.find(pm => pm.hours === hours)
    }

    const currentPm = getPM(hours)

    //The predicted PM is found by calculating the current PM plus the lowest PM hours
    // const predictedPm = getPM(pms[0].hours + currentPm.hours)  //getPM(500 + 433) = getPM(933)
    const predictedPm = getPM(lowestPM.hours + hours)  //getPM(500 + 433) = getPM(933)
    return {
        ...currentPm,
        predictedPm
    }
}


// const get = getPMObjects(21912,
//     [
//         {name: 'PM-B', hours: 1000},
//         {name: 'PM-C', hours: 2000},
//         {name: 'PM-D', hours: 4000},
//         {name: 'PM-A', hours: 500}
//     ])
//
// console.log('get', get) // {name: "PM-A", hours: 500}
