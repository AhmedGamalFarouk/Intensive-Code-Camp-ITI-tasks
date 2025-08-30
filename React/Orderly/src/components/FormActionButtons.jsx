import React from "react";
import Button from "./Button";

const FormActionButtons = ({ onCancel }) => {
  return (
    <div className="flex justify-end gap-4 mt-8">
      <Button type="button" variant="ghost" onClick={onCancel} className="text-neutral hover:text-base-content">
        Cancel
      </Button>
      <Button type="submit" variant="primary">
        Create Space
      </Button>
    </div>
  );
};

export default FormActionButtons;
