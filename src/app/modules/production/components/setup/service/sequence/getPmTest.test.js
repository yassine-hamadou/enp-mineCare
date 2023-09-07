import {getPMObjects} from './getPM';

describe('getPMObjects', () => {
    it('should return the correct PM object', () => {
        const inputHours = 433;
        const inputServices = [
            {name: 'PM-B', hours: 1000},
            {name: 'PM-C', hours: 2000},
            {name: 'PM-D', hours: 4000},
            {name: 'PM-A', hours: 500}
        ];
        const expectedOutput = {
            name: "PM-A",
            hours: 500,
            predictedPm: {
                name: "PM-A",
                hours: 500
            }
        };
        const result = getPMObjects(inputHours, inputServices);

        expect(result).toEqual(expectedOutput);
    });

    it('should return the corect pm', () => {
        const inputHours = 7433;
        const inputServices = [
            {name: 'PM-B', hours: 1000},
            {name: 'PM-C', hours: 2000},
            {name: 'PM-D', hours: 4000},
            {name: 'PM-A', hours: 500}
        ];
        const expectedOutput = {
            name: "PM-B",
            hours: 1000,
            predictedPm: {
                name: "PM-A",
                hours: 500
            }
        };
        const result = getPMObjects(inputHours, inputServices);

        expect(result).toEqual(expectedOutput);
    });


    it('should return lowest PM for current reading 0', () => {
        const inputHours = 0;
        const inputServices = [
            {name: 'PM-B', hours: 1000},
            {name: 'PM-C', hours: 2000},
            {name: 'PM-D', hours: 4000},
            {name: 'PM-A', hours: 500}
        ];
        const expectedOutput = {
            name: "PM-A",
            hours: 500,
            predictedPm: {
                name: "PM-A",
                hours: 500
            }
        };
        const result = getPMObjects(inputHours, inputServices);

        expect(result).toEqual(expectedOutput);
    });

    it('should return lowest PM for current reading less than 0', () => {
        const inputHours = -56;
        const inputServices = [
            {name: 'PM-B', hours: 1000},
            {name: 'PM-C', hours: 2000},
            {name: 'PM-D', hours: 4000},
            {name: 'PM-A', hours: 500}
        ];
        const expectedOutput = {
            name: "PM-A",
            hours: 500,
            predictedPm: {
                name: "PM-A",
                hours: 500
            }
        };
        const result = getPMObjects(inputHours, inputServices);

        expect(result).toEqual(expectedOutput);
    });

    it('with2001', () => {
        const inputHours = 2001;
        const inputServices = [
            {name: 'PM-B', hours: 1000},
            {name: 'PM-C', hours: 2000},
            {name: 'PM-D', hours: 4000},
            {name: 'PM-A', hours: 500}
        ];
        const expectedOutput = {
            name: "PM-C",
            hours: 2000,
            predictedPm: {
                name: "PM-A",
                hours: 500
            }
        };

        const result = getPMObjects(inputHours, inputServices);

        expect(result).toEqual(expectedOutput);
    });

    it('with2501', () => {
        const inputHours = 2501;
        const inputServices = [
            {name: 'PM-B', hours: 1000},
            {name: 'PM-C', hours: 2000},
            {name: 'PM-D', hours: 4000},
            {name: 'PM-A', hours: 500}
        ];
        const expectedOutput = {
            name: "PM-A",
            hours: 500,
            predictedPm: {
                name: "PM-B",
                hours: 1000
            }
        };


        const result = getPMObjects(inputHours, inputServices);

        expect(result).toEqual(expectedOutput);
    });

    it('invalidInput', () => {
        const inputHours = isNaN;
        const inputServices = undefined

        const expectedOutput = null


        const result = getPMObjects(inputHours, inputServices);

        expect(result).toEqual(expectedOutput);
    });

    it('highvalue', () => {
        const inputHours = 21912;
        const inputServices = [
            {name: "250HRS", hours: 250},
            {name: "500HRS", hours: 500},
            {name: "1000HRS", hours: 1000},
            {name: "2000HRS", hours: 2000}
        ]

        const expectedOutput = {
            name: "250HRS",
            hours: 250,
            predictedPm: {
                name: "2000HRS",
                hours: 2000
            }
        }


        const result = getPMObjects(inputHours, inputServices);

        expect(result).toEqual(expectedOutput);
    });


});
