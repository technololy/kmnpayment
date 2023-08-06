import { useEffect, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";


const App = () => {
  // const [amount, setAmount] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [name, setName] = useState(null);
  // const [phone, setPhone] = useState(null);
  // const [trnxRef, setTrnxRef] = useState(null);

  // useEffect(() => {
  //   // Fetch query parameters from the URL
  //   const params = new URLSearchParams(window.location.search);
  //   const queryParams = {
  //     amount: params.get("amount"),
  //     email: params.get("email"),
  //     name: params.get("name"),
  //     phone: params.get("phone"),
  //     trnxRef: params.get("tx_ref"),
  //   };

  //   // Check if any of the required parameters is missing
  //   // if (Object.values(queryParams).some((param) => param === null)) {
  //   //   console.error("Missing required parameters.");
  //   //   return;
  //   // }

  //   setAmount(queryParams.amount);
  //   setEmail(queryParams.email);
  //   setName(queryParams.name);
  //   setPhone(queryParams.phone);
  //   setTrnxRef(queryParams.trnxRef);
  // }, []);

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: "trnxRef",
    amount: "10",
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "adamjamiu98@gmail.com ",
      phonenumber: "09012345678",
      name: "Adam Jamiu",
    },
    callback: function (data) {
      // Handle payment callback
      const Http = new XMLHttpRequest();
      const url = `https://knowmynetworkbackend.azurewebsites.net/api/Transactions/SavePaymentFromVendor/${encodeURIComponent(data.transaction_id)}/${encodeURIComponent(email)}/${encodeURIComponent(amount)}/${encodeURIComponent(data.tx_ref)}/${encodeURIComponent(data.flw_ref)}/${encodeURIComponent(data.status)}`;
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          console.log(Http.responseText);
        }
      };
      console.log(data);
      window.history.pushState("", "", data.status + "?transaction_id=" + data.transaction_id);
    },
    customizations: {
      title: "KMN Test",
      description: "Test Payment for rides",
      logo: "https://assets.piedpiper.com/logo.png",
    },
  };

  const initializePayment = useFlutterwave(config);


  return (
    <form>
      <script src="https://checkout.flutterwave.com/v3.js"></script>
      <button type="button" onClick={() => {
        initializePayment({
          callback: (response) => {
            console.log(response);
            closePaymentModal() // this will close the modal programmatically
          },
          onClose: () => { },
        });
      }}>
        Begin Test Top Up
      </button>
    </form>
  );
};

export default App;