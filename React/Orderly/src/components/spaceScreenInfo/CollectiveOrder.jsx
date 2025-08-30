import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
// import { toArabicNumeral } from "../../utils/toArabicNumber"; // Not used in this component

export default function CollectiveOrder() {
  const { arr, total } = useSelector((state) => state.single);
  const menuItems = arr;
  //

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-heading text-xl text-base-content">Collective Order</h2>

      {/* Items List */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-60">
        {menuItems && menuItems.length > 0 ? (
          menuItems.map((item, index) => (
            <div
              key={item.id || index}
              className="flex justify-between items-center py-2 border-b border-base-200 last:border-b-0
                         transition-all duration-300 ease-in-out transform opacity-100 translate-y-0
                         hover:bg-base-200/50"
              style={{ animation: 'fadeInSlideUp 0.5s ease-out' }}
            >
              {/* Placeholder for image thumbnail if available */}
              {/* <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-md object-cover mr-3" /> */}
              <div className="flex flex-col">
                <span className="font-body text-base-content font-medium">{item.name}</span>
                <span className="font-body text-sm text-neutral">{item.quantity} x {formatCurrency(item.price)}</span>
              </div>
              <span className="font-body text-base-content font-semibold">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-neutral">No items in the collective order yet.</p>
        )}
      </div>

      <div className="h-[1px] w-full bg-base-200 my-4" />

      {/* Totals Section */}
      <div className="flex flex-col gap-2">
        {/* Subtotal per person - Placeholder, needs actual data */}
        <div className="flex justify-between font-body text-base text-neutral">
          <span>Your Subtotal</span>
          {/* Assuming 'total' from single slice is current user's total, otherwise needs specific participant data */}
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between font-heading text-xl font-semibold text-primary">
          <span>Grand Total</span>
          <span>{formatCurrency(total)}</span> {/* This should be the actual collective grand total */}
        </div>
      </div>
    </div>
  );
}
