import { useCalendarStore } from "../../hooks"


export const FabDelete = () => {

  const { startDeletingEvent, hasEventSelected = false } = useCalendarStore();

  const handleDelete = () => {
    startDeletingEvent();
  };


  return (
    <button aria-label="btn-delete"
            className="btn btn-danger fab-danger"
            disabled={ !hasEventSelected }
            onClick={ handleDelete }
    >
        <i className="fas fa-trash-alt"></i>

    </button>
  )
}
