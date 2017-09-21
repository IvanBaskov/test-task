import { ISettings } from '../../interfaces';

/**
 * Virtual class
 */

abstract class CoreSettings implements ISettings {

  protected settingsData: ISettings = null;

  constructor() {
  }

  public get(mode) {
    mode = mode || 'development';
    return this.settingsData[mode] || this.settingsData;
  }
}

export default CoreSettings;
