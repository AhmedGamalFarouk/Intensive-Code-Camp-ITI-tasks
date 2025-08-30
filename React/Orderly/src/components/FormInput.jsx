import React from 'react';

const FormInput = ({ label, type = 'text', placeholder, value, onChange, required = false, className = '', isTextArea = false, icon }) => {
  const baseClasses = `w-full px-4 py-3 rounded-lg bg-base-200 text-base-content placeholder-neutral focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 ${className}`;

  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text font-body text-neutral">{label} {required && <span className="text-error">*</span>}</span>
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <span className="absolute left-4 text-neutral">{icon}</span>}
        {isTextArea ? (
          <textarea
            placeholder={placeholder}
            className={`${baseClasses} ${icon ? 'pl-12' : ''}`}
            value={value}
            onChange={onChange}
            required={required}
          ></textarea>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            className={`${baseClasses} ${icon ? 'pl-12' : ''}`}
            value={value}
            onChange={onChange}
            required={required}
            min={0}
          />
        )}
      </div>
    </div>
  );
};

export default FormInput;
