import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('pruebas en calendarSlice', () => { 
    
        test('debe regresar el estado por defecto', () => { 

            const state = calendarSlice.getInitialState();

            expect( state ).toEqual( initialState )
        });

        test('onSetActiveEvent debe activar el evento', () => { 
        
        const state = calendarSlice.reducer( calendarWithActiveEventState, onSetActiveEvent( events[0] ) );

        expect( state.activeEvent ).toEqual( events[0] );

        })


        test('onAddNewEvent debe agregar el evento', () => { 
            
            const newEvent = {
                "id": "3",
                "start": new Date('2022-12-21 13:00:00'),
                "end": new Date( '2022-12-21 15:00:00' ),
                "title": "Vacaciones",
                "notes": "Dormir",
            };

            const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ));

            expect( state.events ).toContain( newEvent );
        
        });


        test('onUpdateEvent debe actualizar el evento', () => { 
            
            const updatedEvent = {
                "id": "2",
                "start": new Date('2022-11-09 13:00:00'),
                "end": new Date( '2022-11-09 15:00:00' ),
                "title": "Cumpleaños de Melisa actualizado",
                "notes": "Comprar torta y sanguchitos",
            };

            const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ));

            expect( state.events ).toContain( updatedEvent );

        });

        
        test('onDeleteEvent debe borrar el evento activo', () => { 
            const eventToDelete = {
                "id": "1",
                "start": new Date('2022-10-21 13:00:00'),
                "end": new Date( '2022-10-21 15:00:00' ),
                "title": "Cumpleaños del jefe",
                "notes": "Comprar torta",
            }

            const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent(eventToDelete ))

            expect( state.activeEvent ).toBe( null );
            expect( state.events ).not.toContain( eventToDelete );

        })
        test('onLoadEvents debe establecer los eventos', () => { 

            
            const state = calendarSlice.reducer( initialState, onLoadEvents( events ));
    
            expect( state.events ).toEqual( events )
            

        })
        test('onLogoutCalendar debe limpiar el estado', () => { 

            const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );

            expect( state.isLoadingEvents ).toBeTruthy();
            expect( state.events ).toEqual([]);
            expect( state.activeEvent ).toBe( null );

        })
 })