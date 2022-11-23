import React from "react";
import "./Transactions.css";

export const Transactions = ({ transactions }) => {
  // ToDo: Improve tx parsing to display internal payments, incomplete payments, and further verify the transactions we are listing out
  const parseTx = (tx) => {
    // turn unix timestamp into a date
    // Todo: format date further to include hours, minutes, and seconds
    const date = new Date(tx.time * 1000);
    const formattedDate = date.toLocaleDateString("en-US");
    // ToDo: Handle pending payments since we are currently ignoring them and not displaying them on our past transactions list
    if (tx.pending) return null;

    if (tx.amount > 0) {
      return (
        <div key={tx.checking_id} className="tx-item">
          <p>Received from {tx.bolt11.substring(0, 25)}...</p>
          <p>+{tx.amount / 1000} sats</p>
          <p className="transaction-date">{formattedDate}</p>
        </div>
      );
    }

    if (tx.amount < 0) {
      return (
        <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
          <p>Sent with {tx.bolt11.substring(0, 25)}...</p>
          <p className="tx-amount">{tx.amount / 1000} sats</p>
          <p className="transaction-date">{formattedDate}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <h3>Transactions</h3>
      {transactions.map((transaction) => {
        return parseTx(transaction);
      })}
    </div>
  );
};

export default Transactions;
