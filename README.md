# What's Up

Project created to experiment with Bundlr in the browser with React.
You can read more about it in this blog post:

# React & Bundlr

Bundlr fully supports React, however it takes a bit of customizing and tweaking to get things running right. You're welcome to just clone this project and do whatever you want with it ... but in case you just want to grab some of the components and throw them in your React project you'll need to go through a few extra steps.

I pieced this all together using posts in the Bundlr Discord and this post.
https://www.alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5

## The Steps

Create a new directory, cd into it and then create a new react template

```
mkdir react-bundlr
cd react-bundlr
npx create-react-app .
```

Install the Bundlr library and ethers (for interacting with the blockchain)

```
npm install @bundlr-network/client ethers
```

On the Bundlr website (https://docs.bundlr.network/docs/client/web) they have a really simple piece of code that connects to their network. To start things out, replace your React App.js file with this code which connects to the Bundlr network.

```
// example imports
import { providers } from "ethers";
// import WebBundlr
import { WebBundlr } from "@bundlr-network/client";

function App() {
	const initialiseBundlr = async () => {
		await window.ethereum.enable();

		const provider = new providers.Web3Provider(window.ethereum);
		await provider._ready();

		const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", provider);
		await bundlr.ready();

		return bundlr; // done!
	};

	return <div className="App">Bundlr Test</div>;
}

export default App;
```

Viewing that pae, you'll get a bunch of errors saying something like `BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.`

To fix this you'll need to include NodeJS polyfills which are no longer included by default.

Install first react-app-rewired, a package that allows for editing of the webpack config file to fix polyfill issue. Then install the missing dependencies.

```
npm install react-app-rewired
npm install --save-dev crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
npm install browserify-zlib path-browserify path

```

At the root level of your project, create a new file called `config-overrides.js` and paste the following in

```
const webpack = require("webpack");
module.exports = function override(config) {
	const fallback = config.resolve.fallback || {};
	Object.assign(fallback, {
		crypto: require.resolve("crypto-browserify"),
		stream: require.resolve("stream-browserify"),
		assert: require.resolve("assert"),
		http: require.resolve("stream-http"),
		https: require.resolve("https-browserify"),
		os: require.resolve("os-browserify"),
		url: require.resolve("url"),
		zlib: require.resolve("browserify-zlib"),
	});
	config.resolve.fallback = fallback;
	config.plugins = (config.plugins || []).concat([
		new webpack.ProvidePlugin({
			process: "process/browser",
			Buffer: ["buffer", "Buffer"],
		}),
	]);
	return config;
};
```

Override package.json to include the new webpack configuration. Look for this code block

```

"scripts": {
	"start": "react-scripts start",
	"build": "react-scripts build",
	"test": "react-scripts test",
	"eject": "react-scripts eject"
 },
```

and replace it with this block

```

"scripts": {
	"start": "react-app-rewired start",
	"build": "react-app-rewired build",
	"test": "react-app-rewired test",
	"eject": "react-scripts eject"
 },
```

Quit out of the React server and restart it with ` npm run start` you should be good to go.
