// parse string format: "attachment; filename=contest-TEST3.zip" to map with value:
// {'attachment', 'attachment'}; {'filename', 'contest-TEST3.zip'}
export class ParseHeaderValues {
    public static parse(strToParse: string): Map<string, string> {
        const map: Map<string, string> = new Map<string, string>();

        if (strToParse) {
            const strings = strToParse.split(';');

            for (const str of strings) {
                if (str.indexOf('=') > -1) {
                    const nameAndValue = str.split('=');

                    if (nameAndValue.length === 2) {
                        map.set(nameAndValue[0].trim(), nameAndValue[1].trim());
                    } else {
                        map.set(nameAndValue[0].trim(), nameAndValue.map(value => value.trim()).join(';'));
                    }
                } else {
                    map.set(str, str);
                }
            }
        }

        return map;
    }

}
