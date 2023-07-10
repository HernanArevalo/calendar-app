import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale }  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';

import { useCalendarStore, useUiStore } from '../../hooks';


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

  const { activeEvent, startSavingEvent } = useCalendarStore();

  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: 'Fernando',
    notes: 'Herrera',
    start: new Date(),
    end: addHours( new Date(), 1),
  })

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return( formValues.title.length > 0) ? 'is-valid' : 'is-invalid'

  }, [ formValues.title, formSubmitted ]);

  useEffect(() => {
    if (formValues != null){
      setFormValues( {...activeEvent} );
    }
    
  }, [ activeEvent ])
  


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

	const onCloseModal = () => {
    closeDateModal();

  }

  const onSubmit = async(event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if ( isNaN(difference) || difference < 0 ) {
      Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error')
      console.log('Error en fechas')
      return; 
    }

    if (formValues.title.length <= 0 ) return;

    // TODO:
    await startSavingEvent( formValues );

    closeDateModal();
    setFormSubmitted(false);

  }

	
  return (
    <Modal
			isOpen={ isDateModalOpen }
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
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ formValues.title || ''}
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
            value={ formValues.notes || ''}
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
            selected={ formValues.end }
            minDate={ formValues.start }
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
