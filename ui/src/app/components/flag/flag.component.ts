import {Component, Input} from '@angular/core';
import {Country} from '../../domain/Country';

@Component({
    selector: 'app-flag',
    templateUrl: './flag.component.html',
    styleUrls: ['./flag.component.scss']
})
export class FlagComponent {
    public static BR_FLAG = 'assets/img/flags/brazil.png';
    public static RU_FLAG = 'assets/img/flags/russia.png';
    public static IN_FLAG = 'assets/img/flags/russia.png';
    public static CN_FLAG = 'assets/img/flags/china.png';
    public static ZA_FLAG = 'assets/img/flags/south_africa.png';

    Country = Country;

    flagEnumMap: Map<Country, string>;
    flagMap: Map<string, string>;

    @Input()
    flag: string;

    @Input()
    country: Country;

    constructor() {
        this.fullFlagEnum();
    }

    private fullFlagEnum() {
        this.flagEnumMap = new Map<Country, string>();

        // this.flagEnumMap.set(Country.RUSSIA, FlagComponent.RU_FLAG);
        // this.flagEnumMap.set(Country.BRAZIL, FlagComponent.UK_FLAG);
        // this.flagEnumMap.set(Country.CHINA, FlagComponent.CN_FLAG);
        // this.flagEnumMap.set(Country.INDIA, FlagComponent.IN_FLAG);
        // this.flagEnumMap.set(Country.SOUTH_AFRICA, FlagComponent.ZA_FLAG);

        this.flagMap = new Map<string, string>();

        this.flagMap.set('russia', FlagComponent.RU_FLAG);
        this.flagMap.set('brazil', FlagComponent.BR_FLAG);
        this.flagMap.set('china', FlagComponent.CN_FLAG);
        this.flagMap.set('india', FlagComponent.IN_FLAG);
        this.flagMap.set('south_africa', FlagComponent.ZA_FLAG);
    }

}
