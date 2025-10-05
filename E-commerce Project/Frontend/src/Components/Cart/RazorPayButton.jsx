import React from "react";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const RazorPayButton = ({
  amount,
  orderId,
  razorpayKey, // use the key passed from parent
  onSuccess,
  onError,
}) => {
  const handleRazorpay = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK not available");
      return;
    }

    const options = {
      key: razorpayKey, // Use key passed from props here
      amount: amount, // amount in paisa, no need to multiply here
      currency: "INR",
      name: "Clothing Company Pvt. Ltd.",
      description: "Test Payment",
      order_id: orderId,
      handler: function (response) {
        onSuccess(response);
      },
      prefill: {
        name: "John Doe", // ideally replace with logged-in user info
        email: "john@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "123 Test Street, India",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("Payment Failed:", response.error);
      onError(response);
    });

    rzp.open();
  };

  return (
    <button
      onClick={handleRazorpay}
      className="w-full bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
    >
      Pay ₹{(amount / 100).toFixed(2)}
    </button>
  );
};

export default RazorPayButton;
