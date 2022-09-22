# What's Up

Project created to experiment with Bundlr in the browser with React.
You can read more about it in this blog post:

# React & Bundlr

Bundlr fully supports React, however it takes a bit of customizing and tweaking to get things running right. You're welcome to just clone this project and do whatever you want with it ... but in case you just want to grab some of the components and throw them in your React project, here'a an overview of how to setup a brand new React project and Bundlr running.

I pieced this all together using posts in the Bundlr Discord and this lovely post.
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
