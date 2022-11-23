import { React, useEffect, useState, useCallback } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  pMinify,
  resumedAddress,
  _error,
  isConnected,
} from "../services/Utiles";
//import commaNumber from "comma-number";
import BNBHelper from "../services/BnbHelper";
import { useNavigate } from "react-router-dom";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        56: "https://bsc-dataseed.binance.org",
      },
      network: "binance",
    },
  },
};

const web3Options = {
  cacheProvider: true,
  providerOptions,
};

const NavBar = () => {
  const navigation = useNavigate();
  const [account, setAccount] = useState();
  const [bnbBalance, setBnbBalance] = useState();
  const [provider, setProvider] = useState();
  const [web3, setWeb3] = useState();
  const [bnbHelper, setBnbHelper] = useState();
  const [web3Modal] = useState(new Web3Modal(web3Options));

  const resetState = () => {
    console.log("resetState");
    setAccount(undefined);
    setBnbBalance(undefined);
  };

  const dropState = () => {
    console.log("dropState");
    localStorage.clear();
  };

  const getAccount = useCallback(async () => {
    const _account = (await web3.eth.getAccounts())[0];
    return _account ? _account.toLowerCase() : undefined;
  }, [web3?.eth]);

  const disconnect = useCallback(async () => {
    console.log("disconnect");
    try {
      dropState();
      resetState();
    } catch (errr) {
      if (provider.close) {
        await provider.close();
        await web3Modal.clearCachedProvider();
        setProvider(null);
      }
    }

    navigation("/login");
  }, [navigation, provider, web3Modal]);

  const connect = useCallback(async () => {
    console.log("Connect");
    let _provider;
    try {
      _provider = await web3Modal.connect();
      setProvider(_provider);
    } catch (er) {
      _error("Conéctate a Binance Smart Chain");
      disconnect();
      return;
    }

    const _web3 = new Web3(_provider);
    const _bnbHelper = new BNBHelper(_web3);
    setWeb3(_web3);
    setBnbHelper(_bnbHelper);
    setAccount(await getAccount());
  }, [disconnect, getAccount, web3Modal]);

  // const _fetchAccounts = useCallback(async () => {
  //   dropState();
  //   resetState();
  //   const account = await getAccount();
  //   if (account) {
  //     setAccount(account);
  //   }
  // }, [getAccount]);

  const fetchAccounts = useCallback(async (accounts) => {
    console.log("fetchAccounts");
    dropState();
    resetState();
    if (accounts.length > 0) {
      const _account = accounts[0].toLowerCase();
      setAccount(_account);
    }
  }, []);

  const initWeb3 = useCallback(() => {
    console.log("initweb3");
    if (isConnected()) {
      connect();
    } else navigation("/login");
  }, [connect, navigation]);

  const load = useCallback(async () => {
    setBnbBalance(await bnbHelper.balance(account));
  }, [bnbHelper, setBnbBalance, account]);

  // const commasFormat = (x) => {
  //   return commaNumber(x);
  // };

  const UserSpace = () => {
    if (account)
      return (
        <>
          <button
            className="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/favicon.png"
              className="user-img"
              alt="user avatar"
            ></img>
            <div className="user-info ps-3">
              <p className="user-name mb-0">{resumedAddress(account)}</p>
              <p className="designattion mb-0">
                <strong>{`${pMinify(bnbBalance, 4)}`} BNB</strong>
              </p>
            </div>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" onClick={() => disconnect()}>
                <i className="bx bx-log-out-circle"></i>
                <span>Desconectarse</span>
              </button>
            </li>
          </ul>
        </>
      );
    else {
      return <Nav.Link onClick={() => connect()}>Conectarse</Nav.Link>;
    }
  };

  useEffect(() => {
    console.log(0);
    return () => resetState();
  }, []);

  useEffect(() => {
    console.log(1);
    initWeb3();
  }, [initWeb3]);

  useEffect(() => {
    console.log(2);
    if (account) load();
  }, [account, load]);

  useEffect(() => {
    console.log(3);
    if (bnbBalance) {
      localStorage.setItem("eth_connected", "y");
      localStorage.setItem("account", account);
      navigation("/");
    }
  }, [bnbBalance, account, navigation]);

  useEffect(() => {
    console.log(4);
    if (provider) {
      console.log("provider");
      provider.on("accountsChanged", (accounts) => {
        console.log("accountsChanged");
        fetchAccounts(accounts);
      });

      provider.on("networkChanged", (networkId) => {
        console.log("networkChanged");
        if (networkId === "56") {
          disconnect();
          connect();
        } else {
          _error("Conéctate a Binance Smart Chain");
          disconnect();
        }
      });

      provider.on("disconnect", (error) => {
        console.log("onDisconnect");
        dropState();
        resetState();
      });
    }
  }, [provider, connect, disconnect, fetchAccounts]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <Nav className="me-auto">
            <Link to="/new" className="nav-link">
              New
            </Link>
            {UserSpace()}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
