import { useCalendarStore, useUiStore } from "../../hooks"


export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  }


  return (
    <button className="btn btn-danger fab-danger"
            disabled={ !hasEventSelected }
            onClick={ handleDelete }
    >
        <i className="fas fa-trash-alt"></i>

    </button>
  )
}