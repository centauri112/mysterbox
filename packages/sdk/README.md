## ZeroBridge SDK

This package includes the `NomadContext`, a management system for ZeroBridge core
contracts, which inherits from the [`MultiProvider`](https://www.npmjs.com/package/@zerobridge-xyz/multi-provider). `NomadContext` allows
developers to easily interact with the ZeroBridge system on any number of networks.

-------------------------

### Documentation
 - [Multi Provider](https://docs.zerobridge.xyz/multi-provider/)
 - [ZeroBridge SDK](https://docs.zerobridge.xyz/sdk/)
 - Example: [SDK Quick Start](https://github.com/zerobridge-xyz/examples/tree/main/packages/sdk-quickstart)

-------------------------

### Setup (front-end only)

Configure webpack with `wasm`, `syncWebAssembly` and `topLevelAwait`:

```js
module: {
  rules: [
    {
      test: /\.wasm$/,
      type: 'webassembly/sync',
    },
  ],
},
experiments: {
  syncWebAssembly: true,
  topLevelAwait: true,
},
```

-------------------------

### Intended Usage

Instantiate a [NomadContext](https://docs.zerobridge.xyz/sdk/classes/nomadcontext):

```ts
// sdk includes a wasm module, so must await the import
const { NomadContext } = await import('@zerobridge-xyz/sdk')

type Env = 'production' | 'development'
const environment: Env = 'development'
// instantiate a preconfigured NomadContext
const nomadContext = await NomadContext.fetch(environment)
```

Commonly used methods:

```ts
// register custom rpc provider
nomadContext.registerRpcProvider('ethereum', 'https://...')
// register signer
nomadContext.registerSigner('ethereum', someSigner)

// convert domain name to domain ID
nomadContext.resolveDomain('ethereum') // zerobridge domain ID: 6648936
// convert domain ID to domain name
nomadContext.resolveDomainName(6648936) // zerobridge domain name: ethereum

// get the core zerobridge contracts for a given domain
nomadContext.getCore('ethereum')
// get the replica contract for ethereum on moonbeam
nomadContext.mustGetReplicaFor('moonbeam', 'ethereum')

// check liveness
nomadContext.checkHomes(['ethereum', 'moonbeam'])
nomadContext.blacklist() // returns set of down networks, if any
```

Fetch a [NomadMessage](https://docs.zerobridge.xyz/sdk/classes/nomadmessage)

```ts
import { NomadMessage } from '@zerobridge-xyz/sdk'
const message = await NomadMessage.baseSingleFromTransactionHash(nomadContext, 'ethereum', '0x1234...')
// get the status of a message (NOT RECOMMENDED FOR USAGE IN PRODUCTION)
// 1 = dispatched
// 2 = included
// 3 = relayed
// 4 = processed
const status = await message.status()
// get a timestamp (in seconds) when a message will be ready to process
// on the destination
const confirmAt = await message.confirmAt()
// manually claim on destination after latency period
// Ethereum destination only
const receipt = await message.process()
const processTx = await message.getProcess()
```

-------------------------

### Building

```
yarn build
```
