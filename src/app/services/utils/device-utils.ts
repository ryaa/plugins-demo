import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// MODELS
import { PluginListenerHandle } from '@capacitor/core';
import { DeviceInfo, DevicePlugin } from '@capacitor/device';

// NATIVE
import { CapacitorPlugins } from '@services/capacitor-plugins/capacitor-plugins';

@Injectable({
    providedIn: 'root'
})
export class DeviceUtils {

    public devicePlugin: DevicePlugin;

    public appResumeListener?: PluginListenerHandle;

    // Observable sources
    private appResumeAnnouncedSource = new Subject<void>();

    // Observable streams
    public appResumeAnnounced$ = this.appResumeAnnouncedSource.asObservable();

    private _deviceInfo: DeviceInfo | null;
    private _isRunningOnRealDevice: boolean | null;
    private _isRunningOnRealDeviceOrSimulator: boolean | null;

    constructor(
        private capacitorPlugins: CapacitorPlugins
    ) {
        this.devicePlugin = this.capacitorPlugins.getDevicePlugin();

        this._deviceInfo = null;
        this._isRunningOnRealDevice = null;
        this._isRunningOnRealDeviceOrSimulator = null;
    }

    public async getDeviceInfo(): Promise<DeviceInfo> {
        if (this._deviceInfo == null) {
            const deviceInfo: DeviceInfo = await this.devicePlugin.getInfo();
            this._deviceInfo = deviceInfo;
        }
        return this._deviceInfo;
    }

    public async isRunningOnRealDevice(): Promise<boolean> {
        if (this._isRunningOnRealDevice == null) {
            const deviceInfo: DeviceInfo = await this.getDeviceInfo();
            this._isRunningOnRealDevice = ((deviceInfo.platform === 'ios' || deviceInfo.platform === 'android') && deviceInfo.isVirtual === false);
        }
        return this._isRunningOnRealDevice;
    }
    public async isRunningOnRealDeviceOrSimulator(): Promise<boolean> {
        if (this._isRunningOnRealDeviceOrSimulator == null) {
            const deviceInfo: DeviceInfo = await this.getDeviceInfo();
            this._isRunningOnRealDeviceOrSimulator = ((deviceInfo.platform === 'ios' || deviceInfo.platform === 'android'));
        }
        return this._isRunningOnRealDeviceOrSimulator;
    }

}
