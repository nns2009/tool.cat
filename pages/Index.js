import { useState } from 'react';
import Head from 'next/head';

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
      <footer>
        <div>
          Created By Igor Konyakhin
          (<a href="https://facebook.com/nns2009" target="_blank">facebook.com/nns2009</a>)
        </div>
        <div>
          Love the tool - buy me a coffee
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

export default function WholeApp() {
  return <>
    <Head>
      <title>Transform strings fast</title>
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