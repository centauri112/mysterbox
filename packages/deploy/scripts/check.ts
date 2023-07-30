import { DeployContext } from '../src/DeployContext';
import * as config from '@zerobridge-xyz/configuration';
import { getConfig } from './utils';

run();

async function run() {
  // instantiate deploy context
  const DEPLOY_CONFIG: config.NomadConfig = getConfig();
  const deployContext = new DeployContext(DEPLOY_CONFIG);

  // run checks on deployment
  await deployContext.checkDeployment();
}
