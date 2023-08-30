import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../src/store"
import { renderHook } from "@testing-library/react"
import { Provider } from "react-redux"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { initialState } from "../fixtures/authStates"


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en useAuthStore', () => {

    test('Debe regresar los valores por defecto', () => {

        const mockStore = getMockStore({ ...initialState })

    
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
        } );

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'checking', 
            user: {}, 

            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        })

    })
})