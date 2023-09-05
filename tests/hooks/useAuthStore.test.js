import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../src/store"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { initialState, notAuthenticatedState } from "../fixtures/authStates"
import { testUserCredentials } from "../fixtures/testUser"
import { calendarApi } from "../../src/api"


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

    beforeEach(() => localStorage.clear() );


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


    test('startRegister debe crear un usuario', async() => {

        const newUser= {email: 'algo@gmail.com', password: '123456', name: 'Test User Register'};

        const mockStore = getMockStore({ ...notAuthenticatedState });
    
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
        });

        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: "123456789",
                name: "Register User",
                token: "SOME-TOKEN"
            }
        });

        await act( async() => {
            await result.current.startRegister( newUser );
        });

        const { errorMessage, status, user } = result.current;

        spy.mockRestore();
    })

    test('startRegister debe fallar el registro', async() => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
    
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
        });

        await act( async() => {
            await result.current.startRegister( testUserCredentials );
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: {}
          })

    })

    test('checkAuthToken debe fallar si no hay token', async() => {

        const mockStore = getMockStore({ ...initialState });
    
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
        });


        await act( async() => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        })

    })

    test('checkAuthToken debe autenticar el usuario si hay token', async() => {

        const { data } = await calendarApi.post('/auth', testUserCredentials );

        localStorage.setItem('token', data.token );

        const mockStore = getMockStore({ ...initialState });
    
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({children}) => <Provider store={ mockStore }>{children}</Provider>
        });


        await act( async() => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '64f3b14f4c65837c0e6aa02f' }
        })

    })

});