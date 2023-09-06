import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))


describe('Pruebas en AppRouter', () => {

    const mockcheckAuthToken = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('Debe mostrar la pantalla de carga y llamar checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockcheckAuthToken
        });

        render( <AppRouter /> );

        expect( screen.getByText('Cargando')).toBeTruthy();
        expect( mockcheckAuthToken ).toHaveBeenCalled();


    });

    test('Debe mostrar el login si no está autenticado', () => {

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockcheckAuthToken
        });

        const container = render( 
        <MemoryRouter initialEntries={['/asd/']}>
            <AppRouter /> 
        </MemoryRouter>
        );

        expect( screen.getByText('Ingreso') ).toBeTruthy();
        expect( container ).toMatchSnapshot();

    });

    test('Debe mostrar el calendario si estamos autenticados', () => {

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockcheckAuthToken
        });

        render( 
        <MemoryRouter initialEntries={['/asd/']}>
            <AppRouter /> 
        </MemoryRouter>
        );

        expect( screen.getByText('CalendarPage') ).toBeTruthy();

        screen.debug();

    })


})