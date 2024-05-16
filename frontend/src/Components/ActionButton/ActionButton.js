import './ActionButton.scss';

const ActionButton = ({ label, onClick, id, style }) => {
    return (
        <button className={`action-button ${id}`} onClick={onClick} style={style}>
            {label}
        </button>
    );
}

export default ActionButton;
