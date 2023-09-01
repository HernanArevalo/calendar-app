import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../src/store"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { initialState, notAuthenticatedState } from "../fixtures/authStates"
import { testUserCredentials } from "../fixtures/testUser"


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
        });

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'checking', 
            user: {}, 

            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        })

    });

    
    test('startLogin debe realizar el login correctamente', async() => { 
        localStorage.clear();

        const mockStore = getMockStore({ ...notAuthenticatedState })
    
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
        });

        await act( async() => {
            await result.current.startLogin( testUserCredentials )
        });

        const { errorMessage, status, user } = result.current

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { 
                    name: expect.any(String),
                    uid: expect.any(String)
                  }
        });

        expect( localStorage.getItem('token')).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date')).toEqual( expect.any(String) );
    });


    test('startLogin debe fallar la autenticacion', async() => {
        localStorage.clear();

        const mockStore = getMockStore({ ...notAuthenticatedState })
    
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
        });

        await act( async() => {
            await result.current.startLogin( {email: 'failedemail@gmail.com', password: 'FailedPassword'} )
        });

        const { errorMessage, status, user } = result.current
        
        expect( { errorMessage, status, user } ).toEqual({
                                                    errorMessage: expect.any(String),
                                                    status: 'not-authenticated',
                                                    user: {}
                                                }
        );

        waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        )

        expect( localStorage.getItem('token')).toBe( null );
        expect( localStorage.getItem('token-init-date')).toBe( null );

    })

});