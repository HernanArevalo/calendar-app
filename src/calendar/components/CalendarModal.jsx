import { useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal';
import DatePicker, { registerLocale }  from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
registerLocale('es',es);



const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

  const [formValues, setFormValues] = useState({
    title: 'Fernando',
    notes: 'Herrera',
    start: new Date(),
    end: addHours( new Date(), 1),

  })

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = ( event, changing ) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

	const [isModalOpen, setIsModalOpen] = useState( true )

	const onCloseModal = () => {
		console.log('cerrando modal');
		setIsModalOpen(false)
	}

  const onSubmit = (event) => {
    event.preventDefault();

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if ( isNaN(difference) || difference < 0 ) {
      console.log('Error en fechas')
      return; 
    }

    if (formValues.title.length <= 0 ) return;

    console.log(formValues);

    // TODO:
    //cerrar modal
    // remover errores de pantalla 

  }

	
  return (
    <Modal
			isOpen={ isModalOpen }
			onRequestClose={ onCloseModal }
			style={ customStyles }
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={ 200 }
			
	  >
      <h1> Nuevo evento </h1>
      <hr />
        <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input 
            type="text" 
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ formValues.title }
            onChange={ onInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ formValues.notes }
            onChange={ onInputChange }

          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <br/>
          <DatePicker 
            selected={ formValues.start }
            onChange={ (event) => onDateChange(event, 'start') }
            className='form-control'
            dateFormat="Pp"
            locale="es"
            timeCaption='Hora'
            showTimeSelect
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <br/>
          <DatePicker
            minDate={ formValues.start }
            selected={ formValues.end }
            onChange={ (event) => onDateChange(event, 'end') }
            className='form-control'
            dateFormat="Pp"
            locale="es"
            timeCaption='Hora'
            showTimeSelect

          />
        </div>

        <hr />

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
