"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  // function for MetaMask connection
  const connectAccount = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // account request
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setAccount(account);

        // balance fetch and display
        const balanceHold = await window.ethereum.request({
          method: "eth_getBalance",
          params: [account, "latest"],
        });

        // converting balance into float with a set precision to 4
        const balanceEth = parseFloat(parseInt(balanceHold, 16) / 1e18).toFixed(
          4
        );
        setBalance(balanceEth);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Please install MetaMask"); // will show up if the MetaMask extension is not installed
    }
  };

  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.meta_button}
          type="button"
          onClick={connectAccount}
        >
          Connect With MetaMask
          <Image
            className={styles.meta_img}
            src="/metamask-icon.png"
            alt="MetaMask icon"
            width={24}
            height={24}
          />
        </button>
        <div className={styles.balance}>
          <p>
            <strong>Your Total Balance: </strong> {balance}
          </p>
          <p>
            <strong>Account Address: </strong> {account}
          </p>
        </div>
      </div>
    </>
  );
}
