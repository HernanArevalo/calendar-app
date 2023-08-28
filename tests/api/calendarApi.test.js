import calendarApi from "../../src/api/calendarApi"

describe('Pruebas en calendarApi', () => {

    test('Debe tener la config por defecto', () => {

        // console.log(calendarApi)
        // console.log( process.env.VITE_API_URL )

        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );

    });

    test('Debe tener el x-token en el header de todas las peticiones', async () => { 
        
        const token = 'ABC-123';
        localStorage.setItem('token', token);

        const res = await calendarApi.get('/auth');

        expect( res.config.headers['x-token']).toBe(token);


     })

});