import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect } from "react";
// Assuming you have icons for edit/delete
// import { EditIcon, DeleteIcon } from "../../assets/icons";
export default function MySelection() {
  const { arr, total } = useSelector((state) => state.single);
  const myMenu = arr;

  useEffect(() => {}, [myMenu]);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-xl text-base-content">My Selections</h2>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-60">
        {myMenu.length === 0 ? (
          <p className="text-sm text-neutral">No items selected yet.</p>
        ) : (
          myMenu.map((m, index) => {
            if (m.quantity === 0) return null;
            return (
              <div key={index} className="flex justify-between items-center py-2 border-b border-base-200 last:border-b-0">
                <div className="flex flex-col">
                  <span className="font-body text-base-content font-medium">{m.name}</span>
                  <span className="font-body text-sm text-neutral">{m.quantity} x {formatCurrency(m.price)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-body text-base-content font-semibold">{formatCurrency(m.price * m.quantity)}</span>
                  {/* Placeholder for edit/remove buttons */}
                  <button className="btn btn-ghost btn-sm btn-circle text-neutral hover:text-primary">
                    {/* <EditIcon /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button className="btn btn-ghost btn-sm btn-circle text-neutral hover:text-error">
                    {/* <DeleteIcon /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="h-[1px] w-full bg-base-200 my-4" />

      <div className="flex justify-between font-body text-lg font-semibold text-base-content">
        <span>My Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
