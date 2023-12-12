import { useState } from "react";

const Form = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="my-4 d-flex justify-content-center align-items-center gap-3">
      <input
        onChange={(e) => setIsChecked(e.target.checked)}
        id="terms"
        className="form-check-input"
        type="checkbox"
      />

      <div className="terms">
        <p
          style={{ visibility: isHover ? "visible" : "hidden" }}
          className="bg-light rounded p-2 shadow"
        >
          We won't really deliver anything to you{" "}
        </p>
        <label htmlFor="terms" className="lead">
          I have read and accept the conditions.{" "}
        </label>
      </div>

      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        disabled={!isChecked}
        className="btn btn-warning"
      >
        Confirm Order{" "}
      </button>
    </div>
  );
};

export default Form;
