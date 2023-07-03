import { useState } from 'react';
import { addHours } from 'date-fns';

import Modal from 'react-modal';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
    end: addHours( new Date(), 2),

  })

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = ( event, changing ) => {

  }

	const [isModalOpen, setIsModalOpen] = useState( true )

	const onCloseModal = () => {
		console.log('cerrando modal');
		setIsModalOpen(false)
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
      <form className="container">

        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <br/>
          <DatePicker 
            selected={ formValues.start }
            onChange={ (event) => onch }
            className='form-control'
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <input className="form-control" placeholder="Fecha fin" />
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
