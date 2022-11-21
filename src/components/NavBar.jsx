import {React, Component} from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { pMinify, resumedAddress, _error, isConnected } from "../services/Utiles";
import commaNumber from "comma-number";
import BNBHelper from "../services/BnbHelper";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: undefined,
      bnb_balance: undefined,
    };
  }

  resetState() {
    this.setState({
      account: undefined,
      bnb_balance: undefined,
    });
  }

  async connect() {
    try {
      this.provider = await this.web3Modal.connect();
    } catch (er) {
      _error("Conéctate a Binance Smart Chain");
      this.disconnect();
      return;
    }

    this._web3 = new Web3(this.provider);
    this._bnb = new BNBHelper(this._web3);
    this.setState(
      {
        account: await this.getAccount(),
      },
      () => {
        if (this.state.account) this.load();
      }
    );

    this.provider.on("accountsChanged", (accounts) => {
      this.fetchAccounts(accounts);
    });

    this.provider.on("networkChanged", (networkId) => {
      if (networkId === "56") {
        this.disconnect();
        this.connect();
      } else {
        _error("Conéctate a Binance Smart Chain");
        this.disconnect();
      }
    });

    this.provider.on("disconnect", (error) => {
      this.dropState();
      this.resetState();
    });
  }

  async _fetchAccounts() {
    this.dropState();
    this.resetState();
    const account = await this.getAccount();
    if (account) {
      this.setState(
        {
          account,
        },
        () => this.load()
      );
    }
  }

  async fetchAccounts(accounts) {
    this.dropState();
    this.resetState();
    if (accounts.length > 0) {
      const account = accounts[0].toLowerCase();
      this.setState(
        {
          account,
        },
        () => this.load()
      );
    }
  }

  async disconnect() {
    try {
      this.dropState();
      this.resetState();
    } catch (errr) {
      if (this.provider.close) {
        await this.provider.close();
        await this.web3Modal.clearCachedProvider();
        this.provider = null;
      }
    }

    this.props.history.push("/login");
  }

  dropState() {
    localStorage.clear();
  }

  async componentWillUnmount() {
    this.resetState();
  }

  async initWeb3() {
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
    this.web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });
    if (isConnected()) {
      this.connect();
    } else this.props.history.push("/login");
  }

  async componentDidMount() {
    this.initWeb3();
  }

  async load() {
    this.setState(
      {
        bnb_balance: await this._bnb.balance(this.state.account),
      },
      () => {
        localStorage.setItem("eth_connected", "y");
        localStorage.setItem("account", this.state.account);
        this.props.history.push("/");
      }
    );
  }

  commasFormat(x) {
    return commaNumber(x);
  }

  async getAccount() {
    const account = (await this._web3.eth.getAccounts())[0];
    return account ? account.toLowerCase() : undefined;
  }

  UserSpace() {
    if (this.state.account)
      return (
        <>
          <a
            className="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/favicon.png"
              className="user-img"
              alt="user avatar"
            ></img>
            <div className="user-info ps-3">
              <p className="user-name mb-0">
                {resumedAddress(this.state.account)}
              </p>
              <p className="designattion mb-0">
                <strong>{`${pMinify(this.state.bnb_balance, 4)}`} BNB</strong>
              </p>
            </div>
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" onClick={() => this.disconnect()}>
                <i className="bx bx-log-out-circle"></i>
                <span>Desconectarse</span>
              </a>
            </li>
          </ul>
        </>
      );
    else {
      return (
        <button
          onClick={() => this.connect()}
          type="button"
          className="btn btn-outline-dark  px-3 radius-30"
        >
          Conectarse
        </button>
      );
    }
  }
  render() {
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
        <div className="user-box dropdown">{this.UserSpace()}</div>
      </Nav>
    </Container>
  </Navbar>
      </>
 
    
     );
  }
}


export default NavBar;
