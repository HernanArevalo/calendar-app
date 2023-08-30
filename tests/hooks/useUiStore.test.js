import { act, renderHook } from "@testing-library/react"
import { useUiStore } from "../../src/hooks/useUiStore"
import { Provider } from "react-redux";
import { store, uiSlice } from "../../src/store";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}


describe('Pruebas en useUiStore', () => { 

    test('Debe regresar los valores por defecto', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false })

    
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
        } );

        expect( result.current ).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),       
            toggleDateModal: expect.any(Function),
        })


    });

    test('should openDateModal debe colocar true en isDateModalOpen', () => { 
        
        const mockStore = getMockStore({ isDateModalOpen: false })

    
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
        } );

        const { isDateModalOpen, openDateModal } = result.current;

        act( () => {
            openDateModal();
        })

        expect( result.current.isDateModalOpen ).toBeTruthy();
    })

})