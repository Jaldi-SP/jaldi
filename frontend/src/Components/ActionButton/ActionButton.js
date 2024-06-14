import './ActionButton.scss';

const ActionButton = ({ label, onClick, id, style, type }) => {
    return (
        <button className={`action-button ${id}`} onClick={onClick} style={style} type={type}>
            {label}
        </button>
    );
}

export default ActionButton;
