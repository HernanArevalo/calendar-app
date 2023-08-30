import { render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { store } from "../../../src/store";
import { Provider } from "react-redux";

describe('Pruebas de <FabDelete />', () => { 
   
    test('should debe mostrar el componente correctamente', () => { 
    
        render( 
        <Provider store={store}>
            <FabDelete /> 
        </Provider>

        );
        screen.debug();
    })
 })