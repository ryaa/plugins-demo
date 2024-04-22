import { Injectable } from '@angular/core';

// NATIVE
import { App, AppPlugin } from '@capacitor/app';
// import { Device, DevicePlugin } from '@capacitor/device';
// import { Camera, CameraPlugin } from '@capacitor/camera';
// import { CameraPreview, CameraPreviewPlugin } from '@capacitor-community/camera-preview';
import { FileOpener, FileOpenerPlugin } from '@capacitor-community/file-opener';
// import { Keyboard, KeyboardPlugin } from '@capacitor/keyboard';
// import { NativeMarket, NativeMarketPlugin } from '@capacitor-community/native-market';
// import { Network, NetworkPlugin } from '@capacitor/network';
// import { PushNotifications, PushNotificationsPlugin } from '@capacitor/push-notifications';
// import { ScreenOrientation, ScreenOrientationPlugin } from '@capacitor/screen-orientation';
// import { StatusBar, StatusBarPlugin } from '@capacitor/status-bar';
// import { SplashScreen, SplashScreenPlugin } from '@capacitor/splash-screen';
// import { TextZoom, TextZoomPlugin } from '@capacitor/text-zoom';
// import { VolumeButtons, VolumeButtonsPlugin } from '@capacitor-community/volume-buttons';

@Injectable({
    providedIn: 'root'
})
export class CapacitorPlugins {

    constructor() { }

    public getAppPlugin(): AppPlugin {
        return App;
    }

    // public getCameraPlugin(): CameraPlugin {
    //     return Camera;
    // }

    // public getCameraPreviewPlugin(): CameraPreviewPlugin {
    //     return CameraPreview;
    // }

    // public getDevicePlugin(): DevicePlugin {
    //     return Device;
    // }

    public getFileOpenerPlugin(): FileOpenerPlugin {
        return FileOpener;
    }

    // public getKeyboardPlugin(): KeyboardPlugin {
    //     return Keyboard;
    // }

    // public getNativeMarketPlugin(): NativeMarketPlugin {
    //     return NativeMarket;
    // }

    // public getNetworkPlugin(): NetworkPlugin {
    //     return Network;
    // }

    // public getPushNotificationsPlugin(): PushNotificationsPlugin {
    //     return PushNotifications;
    // }

    // public getScreenOrientationPlugin(): ScreenOrientationPlugin {
    //     return ScreenOrientation;
    // }

    // public getSplashScreenPlugin(): SplashScreenPlugin {
    //     return SplashScreen;
    // }

    // public getStatusBarPlugin(): StatusBarPlugin {
    //     return StatusBar;
    // }

    // public getTextZoomPlugin(): TextZoomPlugin {
    //     return TextZoom;
    // }

    // public getVolumeButtonsPlugin(): VolumeButtonsPlugin {
    //     return VolumeButtons;
    // }

}

