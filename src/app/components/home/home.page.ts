import { Component } from '@angular/core';

// MODELS
import { FILE_OPENER_PLUGIN_ERRORS } from '@models/base';
import { FileOpenerOptions } from '@capacitor-community/file-opener';

// PROVIDERS
import { CapacitorPlugins } from '@services/capacitor-plugins/capacitor-plugins';
import { CommonUtils } from '@services/utils/common-utils';
import { Dialogs } from '@services/dialogs/dialogs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private capacitorPlugins: CapacitorPlugins,
    private commonUtils: CommonUtils,
    private dialogs: Dialogs
  ) { }

  public async openFile(
    platform: 'android' | 'ios'
  ): Promise<void> {
    let fullFilePath: string;
    let invalidFilePath: string;
    if (platform === 'android') {
      // fullFilePath = 'file:///data/user/0/com.mobile.boss811/files/Download/tickets/user_id_2/11521560/attachments/7550614/12092895_hkrl1LCR1.jpg
      fullFilePath = 'file:///data/user/0/ryltsov.alex.plugins.demo/files/sample 13-300x300.jpg';
      // const externalFullPath = '/sdcard/Download/file_example_JPG_2500kB.jpg';
      invalidFilePath = 'file:///data/user/0/ryltsov.alex.plugins.demo/files/';
    } else if (platform === 'ios') {
      const bundleID = (await this.capacitorPlugins.getAppPlugin().getInfo()).id;
      fullFilePath = `file:///var/mobile/Containers/Data/Application/${bundleID}/Documents/tickets/user_id_2/11521560/attachments/7550614/12092895_hkrl1LCR1.jpg`;
      invalidFilePath = `file:///var/mobile/Containers/Data/Application/${bundleID}/Documents/tickets/user_id_2/11521560/attachments/7550614/XXX.jpg`;
    } else {
      throw new Error(`openFile - platform: ${platform} is not supported`);
    }

    try {
      const fileOpener = this.capacitorPlugins.getFileOpenerPlugin();
      const mimeType = 'image/jpeg';
      const options: FileOpenerOptions = { filePath: fullFilePath, contentType: mimeType };
      // const options: FileOpenerOptions = { filePath: invalidFilePath, openWithDefault: true };
      await fileOpener.open(options);
    } catch (error) {
      //@ts-ignore
      if (error?.code === FILE_OPENER_PLUGIN_ERRORS.FILE_NOT_SUPPORTED) {
        await this.dialogs.showErrorDialog(`File ${invalidFilePath} is not supported and can\'t be opened. Please make sure that the required application installed to handle this file format.`);
        //@ts-ignore
      } else if (error?.code === FILE_OPENER_PLUGIN_ERRORS.FILE_NOT_FOUND) {
        await this.dialogs.showErrorDialog(`File ${invalidFilePath} is not found.`);
      } else {
        console.error('[HomePage] openFile - file open failed, error details: ' + this.commonUtils.safeStringify(error));
        await this.dialogs.showErrorDialog('Can\'t open the file: ' + this.commonUtils.safeStringify(error));
      }
    }

  }
}
