import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUse";

describe('Pruebas en authSlice', () => { 
    
    test('Debe regresar el estado inicial', () => { 
        
        expect( authSlice.getInitialState() ).toEqual( initialState );

    });

    test('Debe realizar el login', () => { 
        
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );

        expect( state ).toEqual({
                                    status: 'authenticated',
                                    user: testUserCredentials,
                                    errorMessage: undefined
                                });

     })

     test('Debe realizar el logout', () => { 
        
        const errorMessage = 'Invalid credentials'
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );

        expect( state ).toEqual({
                                    status: 'not-authenticated',
                                    user: {},
                                    errorMessage: errorMessage
                                });
      });

      test('Debe limpiar el errorMessage', () => { 
        
        const errorMessage = 'Invalid credentials'
        
        let state = authSlice.reducer( authenticatedState, onLogout( errorMessage ) );

        state = authSlice.reducer( authenticatedState, clearErrorMessage() );

        expect( state.errorMessage ).toBe( undefined );

      });
 })