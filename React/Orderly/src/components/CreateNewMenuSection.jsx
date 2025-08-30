import React from 'react';
import FormInput from './FormInput';
import Button from './Button';
// Assuming you have a DeleteIcon or similar for removing items
// import { DeleteIcon } from '../assets/icons/icons';

const CreateNewMenuSection = ({
  menuItems,
  handleAddMenuItem,
  handleRemoveMenuItem,
  handleMenuItemChange,
  saveAsFavourite,
  setSaveAsFavourite,
  favouriteMenuName,
  setFavouriteMenuName,
}) => {
  return (
    <>
      {menuItems.map((item) => (
        <div key={item.id} className="flex flex-col md:flex-row items-end gap-4 mb-6 p-4 bg-base-200 rounded-lg shadow-sm">
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Item Name"
              placeholder="e.g., Burger"
              value={item.name}
              onChange={(e) => handleMenuItemChange(item.id, 'name', e.target.value)}
              required
            />
            <FormInput
              label="Description"
              placeholder="e.g., Beef patty with cheese"
              value={item.description}
              onChange={(e) => handleMenuItemChange(item.id, 'description', e.target.value)}
            />
            <FormInput
              label="Price"
              type="number"
              placeholder="e.g., 12.50"
              value={item.price}
              onChange={(e) => handleMenuItemChange(item.id, 'price', e.target.value)}
              required
            />
          </div>
          <Button variant="error" onClick={() => handleRemoveMenuItem(item.id)} className="btn-square btn-sm">
            {/* <DeleteIcon className="w-5 h-5" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddMenuItem} className="btn-secondary w-fit mb-6">
        Add Menu Item
      </Button>

      <div className="form-control mt-4">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={saveAsFavourite}
            onChange={(e) => setSaveAsFavourite(e.target.checked)}
          />
          <span className="label-text font-body text-base-content">Save this menu as a favourite</span>
        </label>
      </div>

      {saveAsFavourite && (
        <FormInput
          label="Favourite Menu Name"
          placeholder="e.g., My Standard Lunch Menu"
          value={favouriteMenuName}
          onChange={(e) => setFavouriteMenuName(e.target.value)}
          required
        />
      )}
    </>
  );
};

export default CreateNewMenuSection;
