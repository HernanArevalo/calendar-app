import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {
  const dispatch = useDispatch();
  
  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = ( calendarEvent ) => {

    dispatch( onSetActiveEvent( calendarEvent ) );
  }

  const startSavingEvent = async( calendarEvent ) => {
    //TODO: Update event

    try {
      if( calendarEvent.id ) {
        // Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch ( onUpdateEvent( { ...calendarEvent, user } ));
        return;
      }
      // Creating
      const { data } = await calendarApi.post('/events', calendarEvent );
  
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }) );
      
    } catch (error) {
      console.log(error)
      Swal.fire('Error al guardar', error.response.data?.msg, 'error')
    }

    
  }

  const startDeletingEvent = async( calendarEvent ) => {
    // TODO: llegar al backend

    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      
      dispatch( onDeleteEvent() )
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data?.msg, 'error')

    }


  }

  const startLoadingEvents = async() => {
    try {
      
      const { data } = await calendarApi.get('/events');
      
      const events = convertEventsToDateEvents( data.events )
                     .filter(event => (event.user._id === user.uid) || event.user.id === user.uid);;
      
      dispatch( onLoadEvents(events) );

    } catch (error) {
      console.log('Error cargando eventos.');
      console.log(error);
    }

  }



  return {
    //* Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}
