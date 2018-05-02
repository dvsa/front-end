import { DvsaBrakeTestConfigurationClass3Plus } from './dvsa-brake-test-configuration-class-3-plus';
import { DvsaBrakeTestConfigurationClass12 } from './dvsa-brake-test-configuration-class-1-2';

export const initDvsaBrakeTestConfiguration = () => {
  new DvsaBrakeTestConfigurationClass3Plus();
  new DvsaBrakeTestConfigurationClass12();
};
