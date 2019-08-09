import { useState } from 'react';
import Head from 'next/head';
import Router from "next/router";

import withGA from "next-ga";

const md5 = require("crypto-js/md5");
const sha1 = require("crypto-js/sha1");
const sha256 = require("crypto-js/sha256");
const sha512 = require("crypto-js/sha512");
const sha3 = require("crypto-js/sha3");

import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';
import Hex from 'crypto-js/enc-hex';

const withCatch = f => (...params) => {
  try {
    return f(...params);
  } catch {
    return null;
  }
};

const CreateDriver = (encode, decode) => ({ encode, decode });
const identity = v => v;

const Drivers = {
  Plain: CreateDriver(identity, identity),
  Base64: CreateDriver(
    s => {
      try {
        const wordArray = Utf8.parse(s);
        return Base64.stringify(wordArray);
      } catch {
        return null;
      }
    },
    s => {
      try {
        var parsedWordArray = Base64.parse(s);
        return parsedWordArray.toString(Utf8);
      } catch {
        return null;
      }
    }
  ),
  Hex: CreateDriver(
    s => {
      try {
        const wordArray = Utf8.parse(s);
        return Hex.stringify(wordArray);
      } catch {
        return null;
      }
    },
    s => {
      try {
        var parsedWordArray = Hex.parse(s);
        return parsedWordArray.toString(Utf8);
      } catch {
        return null;
      }
    }
  ),
  UrlEncode: CreateDriver(
    withCatch(encodeURI),
    withCatch(decodeURI)
  ),
  Md5: CreateDriver(md5),
  Sha1: CreateDriver(sha1),
  Sha256: CreateDriver(sha256),
  //Sha512: CreateDriver(sha512),
  //Sha3: CreateDriver(sha3),
}

const Input = ({ onChange, ...rest }) =>
  <input onChange={e => onChange(e.target.value)} {...rest} />;

const Entry = ({ value, driver }) =>
  <Input value={1} enabled={driver.decode} />;

const BuyMeATea = () =>
  <>
    <style jsx>{`
    .bmc-button img {
      width: 27px !important;
      margin-bottom: 1px !important;
      box-shadow: none !important;
      border: none !important;
      vertical-align: middle !important;
    }

    .bmc-button {
      line-height: 36px !important;
      height: 37px !important;
      text-decoration: none !important;
      display: inline-flex !important;
      color: #000000 !important;
      background-color: #FFDD00 !important;
      border-radius: 3px !important;
      border: 1px solid transparent !important;
      padding: 1px 9px !important;
      font-size: 22px !important;
      letter-spacing: 0.6px !important;
      box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;
      -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
      margin: 0 auto !important;
      font-family: 'Cookie', cursive !important;
      -webkit-box-sizing: border-box !important;
      box-sizing: border-box !important;
      -o-transition: 0.3s all linear !important;
      -webkit-transition: 0.3s all linear !important;
      -moz-transition: 0.3s all linear !important;
      -ms-transition: 0.3s all linear !important;
      transition: 0.3s all linear !important;
    }

    .bmc-button:hover,
    .bmc-button:active,
    .bmc-button:focus {
      -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
      text-decoration: none !important;
      box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
      opacity: 0.85 !important;
      color: #000000 !important;
    }
    `}</style>
    
    <a className="bmc-button" target="_blank" href="https://www.buymeacoffee.com/nns2009">
      <img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg" alt="Buy me a Tea" />
      <span style={{ marginLeft: '5px' }}>Buy me a Tea</span>
    </a>
  </>;

function Index() {
  const [state, setState] = useState({ driverName: 'Plain', value: '' });

  const plain = Drivers[state.driverName].decode(state.value);

  return (
    <div className="this">
      <h1>Tool.Cat</h1>
      {Object.entries(Drivers).map(([name, dr]) =>
        <div key={name}>
          {name}
          <Input
            value={name === state.driverName
              ? state.value
              : (plain != null && dr.encode(plain)) || ''}
            onChange={v => setState({ driverName: name, value: v})}
            readOnly={!dr.decode}
            className="entry-input"
          />
        </div>
      )}
      <div style={{ whiteSpace: 'pre' }}>{`
Usefull consts:
var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lowercase = uppercase.toLowerCase();
var digits = '0123456789';
var charset = uppercase + lowercase + digits;
      `}</div>
      <footer>
        <div>
          Created By Igor Konyakhin
          (<a href="https://facebook.com/nns2009" target="_blank">facebook.com/nns2009</a>)
          <span style={{ display: 'inline-block', width: '2em' }} />
          <a href="https://github.com/nns2009/tool.cat" target="_blank">Open-Source on GitHub</a>
        </div>
        <div>
          Love the tool - 
        </div>
        <div>
          <BuyMeATea />
        </div>
      </footer>
      
      <style jsx>{`
        .this {
          margin: 0em 2em auto;
          //margin-left: 2em;
          //margin-right: 2em;
          //width: 400px;
        }

        footer {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

function WholeApp() {
  return <>
    <Head>
      <title>Transform strings fast</title>
      <link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" />
    </Head>
    <Index />
    <style global jsx>{`
        * {
          box-sizing: border-box;
          font-family: Consolas;
        }
        body {
          margin: 0;
        }

        .entry-input {
          padding: 0.6em;
          margin-bottom: 0.4em;
          border: solid 1px #bbbbbb;
          font-size: 1.4em;
          //height: 1.5em;
          width: 100%;
        }
        .entry-input:read-only {
          background-color: #eeeeee;
          
        }
      `}
    </style>
  </>;
}

export default withGA("UA-59239493-2", Router)(WholeApp);
