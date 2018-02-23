abstract class Enum<TEnum extends Enum<TEnum>> {
    id: number;
    private static constructorToEnumStaticDetailsMap = new Map<Function, {idCounter: number, enumValues: Enum<any>[]}>();

    constructor() {
        let enumConstructor = this.constructor;
        let enumStaticDetails = Enum.getOrCreateEnumStaticDetails(enumConstructor);

        this.id = enumStaticDetails.idCounter++;
        enumStaticDetails.enumValues.push(this);
    }

    private static getOrCreateEnumStaticDetails(constructor: Function) {
        let enumStaticDetails = Enum.constructorToEnumStaticDetailsMap.get(constructor);

        if (enumStaticDetails == null) {
            enumStaticDetails = {
                idCounter: 0,
                enumValues: []
            };

            Enum.constructorToEnumStaticDetailsMap.set(constructor, enumStaticDetails);
        }

        return enumStaticDetails;
    }

    static getEnumValues() {
        return Enum.getOrCreateEnumStaticDetails(this).enumValues;
    }
}

export default Enum;