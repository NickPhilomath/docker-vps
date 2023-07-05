const In = ({ name, label, value, onChange, type, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} onChange={onChange} type={type} value={value} className={error ? "red-border" : ""} />
      {error && <div>{error}</div>}
    </div>
  );
};

const Input = ({ label, values = [], required = false, placeholder, onChange, type, className, inputClass }) => {
  const object = values[0] ? values[0] : {};
  const attribute = values[1];
  const errorObject = values[2];

  return (
    <div className={className}>
      <label class="form-label">{label}</label>
      <input type={type} name={attribute} className={inputClass} placeholder={placeholder} value={object[attribute]} onChange={onChange} required={required} />
      {errorObject[attribute] && (
        <div class="invalid-feedback" style={{ display: "block" }}>
          {errorObject[attribute]}
        </div>
      )}
    </div>

    // <div class="">
    //   <label for="validationCustom05" class="form-label">
    //     Zip
    //   </label>
    //   <input type="text" class="form-control" id="validationCustom05" required />
    //   <div class="invalid-feedback">Please provide a valid zip.</div>
    // </div>
  );
};

export default Input;
