import calendarApi from "../../src/api/calendarApi"

describe('Pruebas en calendarApi', () => {

    test('Debe tener la config por defecto', () => {

        // console.log(calendarApi)
        // console.log( process.env.VITE_API_URL )

        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );

    });
});