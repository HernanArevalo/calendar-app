import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../src/hooks";

jest.mock('../../../src/hooks/useCalendarStore')


describe('Pruebas de <FabDelete />', () => { 
   
    const mockstartDeletingEvent = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe mostrar el componente correctamente', () => { 
    
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });

        render( <FabDelete /> );

        const btn = screen.getByLabelText('btn-delete');

        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.classList).toContain('fab-danger');

    });


    test('Debe activar el botón con un evento activo', () => { 
    
        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        })

        render( <FabDelete /> );

        const btn = screen.getByLabelText('btn-delete');

        expect(btn.disabled).toBe(false);

    });

    test('Debe llamar startDeletingEvent si hay evento activo', () => { 
    
        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockstartDeletingEvent
        });

        render( <FabDelete /> );
        const btn = screen.getByLabelText('btn-delete');

        fireEvent.click( btn );

        expect( mockstartDeletingEvent ).toHaveBeenCalled()

    });

 });