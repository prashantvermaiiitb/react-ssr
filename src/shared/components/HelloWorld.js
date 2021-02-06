import React from 'react';
/**
 * Simple function to return the Hello World HTML.
 * https://reactjs.org/docs/react-without-jsx.html
 * Used Babel repl for getting the JS function for the react.createElement.
 * Since we are not having babel-preset-react is not being included till now. 
 * https://babeljs.io/repl#?browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=EQVwzgpgBGAuBOBLAxrYBuAUJ5AbAhmGFAIIAOZA3plFMgPYB2c8Iq98AFAJTW22wAFojAA6RvgC20ALxQA5IIi5c9eVloBfGlHgRGAEwhdeOgJB7YIeIyicAPINiTcAPh39P_RxHwH3XoFe9rCIsLgQrkoq9FAA7hy4BgCEqfYA9KHhkR5Bgfa4iIwA1rrKMsD4FBEAtLD0bII1KEzAMIgAXhBgFQCMABwADAAeA4NtgnoAZhXphJCwYOmIkvgA5t1z1RB1DchNLYyiZIxrwK4ZhSUBeUEFRaV6uBWHbbAAnmQQL6sb6SdndpdHrAADMACZhhCJtNZvMIItlr9NlN8AA3Q41CFQ8HHU7nS4PG63YJXR7lYCvKAfL4_dYQf74oHdPoANlGrJhEBmwDmRARSxW9KWqIxDEYNV67KleLOF3SZOJJO80lg-CgEmkFQxEDiZA4aDoTFg-lgFTiiAMQhkRjFOwtVsEABooEUwoh8LgamBkJ7vr1RIMXathisQJJvb6IjIA0GoOBjJHPfgAEbR8by1X4JUk-4lKCTblw_mIuDvCJLMsRUTIIhtJ4VKvdJQIgkKom5PIZJR-HN3FP0AzvPu5gyINF0AhECritVFYznTvKzyOXpRZSqeKJAxQKbweiSKAAUWGZD0RCgACkAMppdKCNdL3PpMdokfBdIDofv7vONzcDQoG0bQgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&timeTravel=false&sourceType=script&lineWrap=true&presets=es2015%2Ces2016%2Ces2017%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Ces2015-loose&prettier=false&targets=&version=7.12.13&externalPlugins=
 */
const HelloWorld = ({ type, subtype }) => {
  switch (subtype) {
    case 'tmpl': return `<h1>this is simple hello world string returned from the page.</h1><h2>${type}:${subtype}</h2>`; //will be returned as string  &lt;h1&gt;hello&lt;/h1&gt;gt;
    case 'jsx': return (
      <html>
        <head>
          <title>hello world</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png"></link>
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png"></link>
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png"></link>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
          <link href="/assets/styles/style.css" rel="stylesheet"></link>
        </head>
        <body>
          <div class="container">
            <h1>hello world from Express JS using JSX!!</h1>
            <h2>{type}:{subtype}</h2>
          </div>
        </body>
      </html>
    );
    default: return React.createElement("div", {
      className: "container" //previously we are using 'class' attribute should be updated now. 
    }, React.createElement("h1", null, `hello world generated from Express JS using React.createElement(${type || 'no type'}:${subtype || 'no subtype'})!!`));
  }
}

/**
 * This will be needed because this CJS 
 * as we have not included any ES6 import support right now.
 * CJS module implementation for the module export
 * If this is being used and require() is used for getting this in the file
 * Error coming : HelloWorld is not a function()
 */
// module.exports = HelloWorld;

export default HelloWorld;