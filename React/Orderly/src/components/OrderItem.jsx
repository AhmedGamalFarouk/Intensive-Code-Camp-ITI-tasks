import { formatCurrency } from "../utils/formatCurrency";
import Counter from "./Counter";

export default function OrderItem({ menu }) {
  console.log("menu from inside", menu);

  return (
    <>
      {menu.map((m, ind) => {
        return (
          <div className="bg-base-100 rounded-xl shadow-md overflow-hidden flex flex-col">
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-base-200 flex items-center justify-center text-neutral-content text-sm">
              {m.imageUrl ? (
                <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
              ) : (
                <span>No Image Available</span>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-heading text-xl text-base-content mb-2">{m.name}</h3>
              <p className="font-body text-sm text-neutral mb-4 flex-grow">{m.description}</p>

              <div className="flex justify-between items-center mt-auto">
                <span className="font-body text-lg font-semibold text-primary">{formatCurrency(m.price)}</span>
                <Counter ind={ind}>
                  <Counter.Decrement />
                  <Counter.Count />
                  <Counter.Increment />
                </Counter>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
