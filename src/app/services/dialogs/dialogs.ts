import { Injectable } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class Dialogs {

    constructor(
        private alertController: AlertController,
        private popoverController: PopoverController
    ) {
    }

    public showErrorDialog(message: string, header?: string, subHeader?: string): Promise<void> {
        return new Promise(async (resolve: () => void) => {

            const options = {
                header: header || 'ERROR',
                subHeader,
                cssClass: 'error-dialog',
                message,
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel',
                        handler: () => {
                            resolve();
                        }
                    }
                ]
            };
            const alert = await this.alertController.create(options);
            alert.present();

        });
    }

    public showInfoDialog(message: string, header?: string, subHeader?: string): Promise<void> {
        return new Promise(async (resolve: () => void) => {
            const options = {
                header: header || 'INFO',
                subHeader,
                cssClass: 'info-dialog',
                message,
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel',
                        handler: () => {
                            resolve();
                        }
                    }
                ]
            };
            const alert = await this.alertController.create(options);
            alert.present();
        });
    }

    public showSuccessDialog(message: string, header?: string, subHeader?: string): Promise<void> {
        return new Promise(async (resolve: () => void) => {
            const options = {
                header: header || 'SUCCESS',
                subHeader,
                cssClass: 'success-dialog',
                message,
                buttons: [
                    {
                        text: 'OK',
                        role: 'cancel',
                        handler: () => {
                            resolve();
                        }
                    }
                ]
            };
            const alert = await this.alertController.create(options);
            alert.present();
        });
    }

    public showWarningDialog(message: string, header?: string, subHeader?: string, buttonText?: string): Promise<void> {
        return new Promise(async (resolve: () => void) => {
            const options = {
                header: header || 'WARNING',
                subHeader,
                cssClass: 'warning-dialog',
                message,
                buttons: [
                    {
                        text: buttonText || 'OK',
                        role: 'cancel',
                        handler: () => {
                            resolve();
                        }
                    }
                ]
            };
            const alert = await this.alertController.create(options);
            alert.present();
        });
    }

    /**
     * Method to show confirmation dialog. Returns Promise<boolean> and resolves with true if confirmed, otherwise false
     */
    public showConfirmDialog(message: string, header?: string, subHeader?: string, cssClass?: string, cancelButtonText?: string, okButtonText?: string): Promise<boolean> {
        return new Promise(async (resolve: (value: boolean) => void) => {
            const options = {
                header: header || 'CONFIRM',
                subHeader,
                message,
                cssClass: cssClass || 'confirm-dialog',
                buttons: [
                    {
                        text: cancelButtonText || 'CANCEL',
                        role: 'cancel',
                        cssClass: 'cancel-button',
                        handler: () => {
                            resolve(false);
                        }
                    },
                    {
                        text: okButtonText || 'OK',
                        cssClass: 'ok-button',
                        handler: () => {
                            resolve(true);
                        }
                    }
                ]
            };
            const alert = await this.alertController.create(options);
            alert.present();
        });
    }

}
