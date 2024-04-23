import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import * as moment from 'moment';

// MODELS
import { FILE_OPENER_PLUGIN_ERRORS } from '@models/base';
import { FileOpenerOptions } from '@capacitor-community/file-opener';

// PROVIDERS
import { CapacitorPlugins } from '@services/capacitor-plugins/capacitor-plugins';
import { CommonUtils } from '@services/utils/common-utils';
import { Dialogs } from '@services/dialogs/dialogs';
import { VolumeButtonsUtils } from '@services/utils/volume-buttons-utils';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private volumeUpButtonsEventsSub: Subscription | null = null;

  constructor(
    private capacitorPlugins: CapacitorPlugins,
    private commonUtils: CommonUtils,
    private dialogs: Dialogs,
    private volumeButtonsUtils: VolumeButtonsUtils
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

  public async watchVolumeButtonsPressed(): Promise<void> {
    this.volumeUpButtonsEventsSub = this.volumeButtonsUtils.volumeUpButtonEvents
      .pipe(
        throttleTime(500)
      )
      .subscribe(() => {
        const currentTimeFormatted = moment().format('DD MMM YYYY, HH:mm:ss.SSS')
        this.dialogs.showSuccessDialog(`TAKE PHOTO: ${currentTimeFormatted}`);
      });

    try {
      await this.volumeButtonsUtils.watchVolumeUpButton();
    } catch (error) {
      console.error('[SamplePage] watchVolumeButtonsPressed - failed to set up volume buttons watch', error);
      this.dialogs.showErrorDialog('failed to set up volume buttons watch: ' + this.commonUtils.safeStringify(error));
    }
  }
  public async unwatchVolumeButtonsPressed(): Promise<void> {

    try {
      await this.volumeButtonsUtils.clearWatch();
    } catch (error) {
      console.error('[SamplePage] unwatchVolumeButtonsPressed - failed to clear watch for the volume buttons', error);
      this.dialogs.showErrorDialog('failed to clear watch for the volume buttons: ' + this.commonUtils.safeStringify(error));
    }

    if (this.volumeUpButtonsEventsSub?.closed === false) {
      this.volumeUpButtonsEventsSub.unsubscribe();
      this.volumeUpButtonsEventsSub = null;
    }

  }
  public async isVolumeButtonsWatched(): Promise<void> {

    try {
      const isVolumeUpButtonsWatched = await this.volumeButtonsUtils.isVolumeUpButtonsWatched();
      this.dialogs.showInfoDialog(`isVolumeUpButtonsWatched: ${isVolumeUpButtonsWatched}`);
    } catch (error) {
      console.error('[SamplePage] isVolumeButtonsWatched - failed to check if the hardware volume buttons are watched', error);
      this.dialogs.showErrorDialog('failed to check if the hardware volume buttons are watched: ' + this.commonUtils.safeStringify(error));
    }

  }

}
