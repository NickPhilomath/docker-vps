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
      <label class="form-label">
        {label}
        {required && (
          <span className="mx-1 text-danger" title="required">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-asterisk" viewBox="0 0 16 16">
              <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
            </svg>
          </span>
        )}
      </label>
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
