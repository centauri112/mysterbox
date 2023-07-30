## MultiProvider

The `MultiProvider` is a management system for
[ethers.js](https://docs.ethers.io/v5/) providers and signers that helps
developers connect to multiple networks simultaneously. It is part
of the [ZeroBridge](https://github.com/zerobridge-xyz/zerobridge-monorepo) project, but may
be useful to other multi-chain systems.

-------------------------

### Documentation

 - [Multi-Provider](https://docs.zerobridge.xyz/multi-provider/classes/multiprovider)

-------------------------

### Intended Usage

```ts
import { MultiProvider, Domain } from '@zerobridge-xyz/multi-provider';
const myApp = new MultiProvider<Domain>();

myApp.registerDomain({ name: 'polygon', id: 50 });
myApp.registerDomain({ name: 'ethereum', id: 1 });
myApp.registerRpcProvider('ethereum', 'https://...');
myApp.registerRpcProvider('polygon', 'https://...');
myApp.registerSigner('ethereum', someSigner);
myApp.registerSigner('polygon', someSigner);
```

-------------------------

## Building

```
yarn build
```
