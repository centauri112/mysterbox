## ZeroBridge Bridge SDK

This package includes the `BridgeContext`, a management system for ZeroBridge core
contracts, which inherits from the [`NomadContext`](https://www.npmjs.com/package/@zerobridge-xyz/sdk) and [`MultiProvider`](https://www.npmjs.com/package/@zerobridge-xyz/multi-provider). `BridgeContext` allows
developers to easily interact with the ZeroBridge Token Bridge on any number of
networks.

-------------------------

### Documentation
 - [Multi Provider](https://docs.zerobridge.xyz/multi-provider/)
 - [ZeroBridge SDK](https://docs.zerobridge.xyz/sdk/)
 - [ZeroBridge Bridge SDK](https://docs.zerobridge.xyz/sdk-bridge/)
 - Example: [Bridge UI](https://github.com/zerobridge-xyz/examples/tree/main/packages/sdk-bridge-integration)

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

Instantiate a [BridgeContext](https://docs.zerobridge.xyz/sdk-bridge/classes/bridgecontext):

```ts
// sdk includes a wasm module, so must await the import
const { BridgeContext } = await import('@zerobridge-xyz/sdk-bridge')

type Env = 'production' | 'development'
const environment: Env = 'development'
// instantiate a preconfigured BridgeContext
const bridgeContext = await BridgeContext.fetch(environment)
```

Commonly used methods:

```ts
// register custom rpc provider
bridgeContext.registerRpcProvider('ethereum', 'https://...')
// register signer
bridgeContext.registerSigner('ethereum', someSigner)

// convert domain name to domain ID
bridgeContext.resolveDomain('ethereum') // zerobridge domain ID: 6648936
// convert domain ID to domain name
bridgeContext.resolveDomainName(6648936) // zerobridge domain name: ethereum

// get the zerobridge core/bridge contracts for a given domain
bridgeContext.getCore('ethereum')
bridgeContext.getBridge('moonbeam')

// get the contract for ethereum replica on moonbeam
bridgeContext.mustGetReplicaFor('moonbeam', 'ethereum')

// check liveness
bridgeContext.checkHomes(['ethereum', 'moonbeam'])
bridgeContext.blacklist() // returns set of down networks, if any
```

Send funds:

```ts
import { utils } from 'ethers'
import { TokenIdentifier } from '@zerobridge-xyz/sdk-bridge'
// format data for send
const originDomain = 6648936 // ethereum
const destDomain = 1650811245 // moonbeam
const amount = utils.parseUnits(sendAmount.toString(), token.decimals)
const asset: TokenIdentifier = { // USDC
  domain: 'ethereum',
  id: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // address on native chain
}
const recipient = '0x...' // destination wallet address

// send ERC-20
const usdcTransferMessage = await bridgeContext.send(
  originDomain,
  destDomain,
  asset,
  amount,
  recipient
)

// send ETH/native asset
const ethTransferMessage = await bridgeContext.sendNative(
  originDomain,
  destDomain,
  amnt,
  recipient
)
```

Fetch a [Bridge Message](https://docs.zerobridge.xyz/sdk-bridge/classes/bridgemessage)

```ts
const { BridgeMessage } = await import('@zerobridge-xyz/sdk-bridge')

const message = await BridgeMessage.singleFromTransactionHash(
  bridgeContext,
  'ethereum',
  '0x1234'
)

// 0 = dispatched
// 1 = included
// 2 = relayed
// 3 = received
// 4 = processed
const status = await message.status()
// get a timestamp (in seconds) when a message will be ready to process
// on the destination
const confirmAt = await message.confirmAt()
// manually claim on destination after latency period
// Ethereum destination only
const receipt = await message.process()
```

-------------------------

## Building

```
yarn build
```
