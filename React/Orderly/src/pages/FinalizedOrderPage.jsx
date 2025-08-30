import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Container from "../components/Container";
import Button from "../components/Button";
import Table from "../components/Table";
import Avatar from "../components/Avatar";
import { ArrowLeftIcon, CopyIcon } from "../assets/icons/icons"; // Import specific icons
import { handleToast } from "../components/alerts";
import CelebrationAnimation from "../components/CelebrationAnimation"; // Import the new component

// Components

const FinalizedOrderPage = () => {
  const finalizedOrder = useSelector((state) => state.order.finalizedOrder);
  const participants = useSelector((state) => state.participants);
  const navigate = useNavigate();

  useEffect(() => {
    if (!finalizedOrder) {
      // Redirect if no finalized order data is present
      navigate("/home"); // Or wherever appropriate
    }
  }, [finalizedOrder, navigate]);

  if (!finalizedOrder) {
    return null; // Or a loading spinner
  }

  const collectiveTableHeaders = [
    { key: "qty", label: "Qty" },
    { key: "itemName", label: "Item Name" },
    { key: "pricePerItem", label: "Price/Item" },
    { key: "subtotal", label: "Subtotal" },
  ];

  const collectiveTableData = finalizedOrder.collectiveOrder
    .filter((item) => item != null) // Filter out null/undefined items
    .map((item) => ({
      qty: item.qty,
      itemName: item.itemName,
      pricePerItem: `$${item.pricePerItem.toFixed(2)}`,
      subtotal: `$${item.subtotal.toFixed(2)}`,
    }));

  const handleBackToSpaces = () => {
    navigate("/home"); // Adjust as per your routing
  };

  const handleCopyOrder = () => {
    const orderSummary = `Order Finalized!
Here is the summary for your '${finalizedOrder.orderName}' from '${
      finalizedOrder.restaurant
    }'.

Collective Order:
${finalizedOrder.collectiveOrder
  .filter((item) => item != null) // Filter out null/undefined items
  .map(
    (item) =>
      `${item.qty} x ${item.itemName} ($${item.pricePerItem.toFixed(
        2
      )}) = $${item.subtotal.toFixed(2)}`
  )
  .join("\n")}
Grand Total: $${finalizedOrder.grandTotal.toFixed(2)}

Participant Orders:
${finalizedOrder.participantOrders
  .map(
    (participant) => `  ${participant.name}:
    ${participant.items
      .filter((item) => item != null) // Filter out null/undefined items
      .map((item) => `${item.qty} x ${item.itemName}`)
      .join("\n    ")}
    Total: $${participant.total.toFixed(2)}`
  )
  .join("\n\n")}
    `;
    navigator.clipboard
      .writeText(orderSummary)
      .then(() => handleToast("Order summary copied to clipboard!"))
      .catch((err) => {
        console.error("Failed to copy: ", err);
        handleToast("Failed to copy order summary.", "error");
      });
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 text-base-content">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <CelebrationAnimation participants={finalizedOrder.participantOrders} />
          <h1 className="font-heading text-5xl text-primary mb-4">
            Order Finalized!
          </h1>
          <p className="font-body text-xl text-neutral">
            Here is the summary for your{" "}
            <span className="font-semibold text-primary">
              '{finalizedOrder.orderName}'
            </span>{" "}
            from{" "}
            <span className="font-semibold text-primary">
              '{finalizedOrder.restaurant}'
            </span>
            .
          </p>
        </div>

        <Container className="w-full p-8 bg-white rounded-xl shadow-lg border border-base-200">
          <h2 className="font-heading text-3xl text-base-content mb-6">
            Collective Order Summary
          </h2>
          <Table headers={collectiveTableHeaders} data={collectiveTableData} />
          <div className="text-right mt-6 font-heading text-2xl font-semibold text-primary">
            Grand Total:{" "}
            <span className="text-primary">
              {finalizedOrder.grandTotal.toFixed(2)}
            </span>
          </div>
        </Container>

        <Container className="w-full p-8 bg-white rounded-xl shadow-lg border border-base-200">
          <h2 className="font-heading text-3xl text-base-content mb-6">
            Participant Breakdowns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {finalizedOrder.participantOrders.map((participant, index) => (
              <div
                key={index}
                className="flex flex-col items-start p-6 bg-base-100 rounded-lg shadow-md border border-base-200 transition-transform transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <Avatar
                    title={participant.initials}
                    className="mr-4 flex-shrink-0 text-2xl w-12 h-12"
                  />
                  <h3 className="font-heading text-2xl text-base-content">
                    {participant.name}
                  </h3>
                </div>
                <ul className="list-none pl-0 mt-1 w-full">
                  {participant.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex justify-between items-center py-1 font-body text-base text-neutral border-b border-base-200 last:border-b-0"
                    >
                      <span>
                        {item.qty} x {item.itemName}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-xl font-semibold text-primary mt-4 self-end">
                  Total:{" "}
                  <span className="text-primary">
                    ${participant.total.toFixed(2)}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Container>

        <div className="flex flex-col sm:flex-row justify-center mt-10 space-y-4 sm:space-y-0 sm:space-x-6">
          <Button
            onClick={handleBackToSpaces}
            variant="secondary"
            className="flex items-center justify-center"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" /> <span>Back to Spaces</span>
          </Button>
          <Button
            onClick={handleCopyOrder}
            variant="primary"
            className="flex items-center justify-center"
          >
            <CopyIcon className="w-5 h-5 mr-2" /> <span>Copy Order to Clipboard</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalizedOrderPage;
