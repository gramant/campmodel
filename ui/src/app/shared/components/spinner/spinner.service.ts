import {Injectable} from '@angular/core';
import {SpinnerComponent} from './spinner.component';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    private spinnerCache = new Set<SpinnerComponent>();

    register(spinner: SpinnerComponent): void {
        this.spinnerCache.add(spinner);
    }

    unregister(spinnerToRemove: SpinnerComponent): void {
        this.spinnerCache.forEach(spinner => {
            if (spinner === spinnerToRemove) {
                this.spinnerCache.delete(spinner);
            }
        });
    }

    show(spinnerName: string): void {
        this.spinnerCache.forEach(spinner => {
            if (spinner.name === spinnerName) {
                spinner.show = true;
            }
        });
    }

    hide(spinnerName: string): void {
        this.spinnerCache.forEach(spinner => {
            if (spinner.name === spinnerName) {
                spinner.show = false;
            }
        });
    }

    showAll(): void {
        this.spinnerCache.forEach(spinner => spinner.show = true);
    }

    hideAll(): void {
        this.spinnerCache.forEach(spinner => spinner.show = false);
    }

    isShowing(spinnerName: string): boolean | undefined {
        this.spinnerCache.forEach(spinner => {
            if (spinner.name === spinnerName) {
                return spinner.show;
            }
        });
        return undefined;
    }

}
