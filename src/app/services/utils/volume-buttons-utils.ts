import { Injectable, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';

// NATIVE
import { VolumeButtonsPlugin, VolumeButtonsOptions, VolumeButtonsCallback, VolumeButtonsResult } from '@capacitor-community/volume-buttons';

// PROVIDERS
import { CapacitorPlugins } from '@services/capacitor-plugins/capacitor-plugins';
import { DeviceUtils } from '@services/utils/device-utils'

@Injectable({
    providedIn: 'root',
})
export class VolumeButtonsUtils implements OnDestroy {

    public readonly volumeUpButtonEvents = new Subject<void>();
    public volumeButtonsPlugin: VolumeButtonsPlugin;

    constructor(
        private capacitorPlugins: CapacitorPlugins,
        private deviceUtils: DeviceUtils,
        private platform: Platform
    ) {
        this.volumeButtonsPlugin = this.capacitorPlugins.getVolumeButtonsPlugin();
    }

    /**
     * Method to check if the hardware volume buttons are watched and clear the watch if they are
     *
     * @returns {Promise<void>}
     */
    public async checkAndClearVolumeUpButtonsWatched(): Promise<void> {
        const isVolumeUpButtonsWatched = await this.isVolumeUpButtonsWatched();
        if (isVolumeUpButtonsWatched === true) {
            await this.clearWatch();
        }
    }

    public async isVolumeUpButtonsWatched(): Promise<boolean | undefined> {

        const isRunningOnRealDeviceOrSimulator = await this.deviceUtils.isRunningOnRealDeviceOrSimulator();
        if (isRunningOnRealDeviceOrSimulator !== true) {
            return;
        }

        try {
            const { value: isVolumeUpButtonsWatched } = await this.volumeButtonsPlugin.isWatching();
            return isVolumeUpButtonsWatched;
        } catch (error) {
            console.error('[VolumeButtonsUtils] isVolumeUpButtonsWatched - failed to check if the hardware volume buttons are watched', error);
        }
        return false;

    }

    public async watchVolumeUpButton(): Promise<void> {

        const isRunningOnRealDeviceOrSimulator = await this.deviceUtils.isRunningOnRealDeviceOrSimulator();
        if (isRunningOnRealDeviceOrSimulator !== true) {
            return;
        }

        const options: VolumeButtonsOptions = {};
        const callback: VolumeButtonsCallback = (result: VolumeButtonsResult, err?: any) => {
            if (err) {
                console.error('[VolumeButtonsUtils] watchVolume - error returned in the callback', err);
                return;
            }
            if (result?.direction === 'up') {
                this.volumeUpButtonEvents.next();
            }
        };
        if (this.platform.is('ios')) {
            options.disableSystemVolumeHandler = true;
        } else if (this.platform.is('android')) {
            options.suppressVolumeIndicator = true;
        }
        try {
            await this.volumeButtonsPlugin.watchVolume(options, callback);
        } catch (error) {
            console.error('[VolumeButtonsUtils] watchVolume - failed to start watching the hardware volume buttons', error);
        }
    }

    public async clearWatch(): Promise<void> {

        const isRunningOnRealDeviceOrSimulator = await this.deviceUtils.isRunningOnRealDeviceOrSimulator();
        if (isRunningOnRealDeviceOrSimulator !== true) {
            return;
        }

        try {
            await this.volumeButtonsPlugin.clearWatch();
        } catch (error) {
            console.error('[VolumeButtonsUtils] clearWatch - failed to clear watch for the hardware volume buttons', error);
        }
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    public async ngOnDestroy(): Promise<void> {
        await this.checkAndClearVolumeUpButtonsWatched();
    }

}
