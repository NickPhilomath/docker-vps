const Ch = ({ name, label, checked, onChange, error }) => {
  return (
    <div className="input checkbox">
      <div className="row">
        <label htmlFor={name}>{label}</label>
        <input id={name} name={name} onChange={onChange} type="checkbox" checked={checked} />
      </div>
      {error && <div className="err-input">{error}</div>}
    </div>
  );
};

const Checkbox = ({ label, values = [], onChange }) => {
  const object = values[0] ? values[0] : {};
  const attribute = values[1];
  const errorObject = values[2];
  return (
    <div class="form-check text-start my-3">
      <input name={attribute} class="form-check-input" type="checkbox" checked={object[attribute]} onChange={onChange} />
      <label class="form-check-label">{label}</label>
    </div>
  );
};

export default Checkbox;
