import './Label.scss';

const Label = ({ text, required }) => {
    return (
        <label className="label">
            {text}{required && <span className="required">*</span>}
        </label>
    );
}

export default Label;
