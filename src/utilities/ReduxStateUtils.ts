class ReduxStateUtils {
    static deleteItemInStateByIdKey<TDataItem extends {id: string}>(itemToDelete: TDataItem,
        oldState: {[id: string]: TDataItem}): {[id: string]: TDataItem} {

        // copy the old state
        const newState = {
            ...oldState
        };

        // delete the item
        delete newState[itemToDelete.id];

        return newState;
    }

    static updateItemInStateByIdKey<TDataItem extends {id: string}>(newDataItem: TDataItem,
        oldState: {[id: string]: TDataItem},
        keepCondition?: (oldStateItem: TDataItem) => boolean) {
        return this.updateItemsInStateByIdKey([newDataItem], oldState, keepCondition);
    };

    static updateItemsInStateByIdKey<TDataItem extends {id: string}>(newDataItems: TDataItem[],
        oldState: {[id: string]: TDataItem},
        keepCondition?: (oldStateItem: TDataItem) => boolean) {
        return this.createNewStateMap(newDataItems, "id", oldState, keepCondition);
    };

    static createNewStateMapByIdKey<TDataItem extends {id: string}>(newDataItems: TDataItem[]): {[dataItemKeyValue: string]: TDataItem} {
        return this.createNewStateMap(newDataItems, "id");
    }

    static createNewStateMap<TDataItem, TDataItemKey extends keyof TDataItem>(newDataItems: TDataItem[],
        // getDataItemKeyValue: (dataItem: TDataItem) => string,
        dataItemKey: TDataItemKey,
        oldState: {[dataItemKeyValue: string]: TDataItem} = {},
        keepCondition: (oldStateItem: TDataItem) => boolean = () => true): {[dataItemKeyValue: string]: TDataItem} {

        // copy the old state
        const result: {[dataItemKeyValue: string]: TDataItem} = {
        };

        const getDataItemKeyValue = (item: TDataItem) => {
            const dataItemKeyValue = item[dataItemKey];

            if (typeof dataItemKeyValue !== "string") {
                throw new Error("dataItemKeyValue must be a string");
            }

            return dataItemKeyValue;
        };

        const oldStateToKeep = Object.values(oldState).filter(keepCondition);
        oldStateToKeep.forEach((item) => {
            const dataItemKeyValue = getDataItemKeyValue(item);

            result[dataItemKeyValue] = item;
        });

        // add the new items to the result state
        newDataItems.forEach((item) => {
            const dataItemKeyValue = getDataItemKeyValue(item);

            result[dataItemKeyValue] = item;
        });

        return result;
    }
}

export default ReduxStateUtils;