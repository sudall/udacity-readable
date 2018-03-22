import CategoryData from "src/data/models/CategoryData";
import PayloadAction from "src/redux-actions/framework/PayloadAction";
import {Observable} from "rxjs/Rx";
import CategoryConnector from "src/data/connectors/CategoryConnector";
import {ApplicationState, CategoryPathToCategoryDataMap} from "src/components/readable/ReadableApplication";
import ReduxStateUtils from "src/utilities/ReduxStateUtils";
import ActionMeta, {FilteredEpic} from "src/redux-actions/framework/ActionMeta";
import ActionSet from "src/redux-actions/framework/ActionSet";
import EpicUtils from "src/utilities/EpicUtils";

type Dependencies = {categoryConnector: CategoryConnector};

class GetAll extends ActionMeta<void, CategoriesState> {
    epic: FilteredEpic<PayloadAction<void>, ApplicationState, Dependencies> =
        (action$, store, {categoryConnector}, allAction$): Observable<PayloadAction<any>> => {
        return EpicUtils.restEpicLatestCallOnly(action$,
            categoryConnector.getAll,
            CategoryActions.instance.getAllCompleted);
    }
}

class GetAllCompleted extends ActionMeta<CategoryData[], CategoriesState> {
    reducer(state: CategoriesState, action: PayloadAction<CategoryData[]>): CategoriesState {
        const categoriesArray = action.payload;
        return ReduxStateUtils.createNewStateMap(categoriesArray, "path");
    }
}

type CategoriesState = CategoryPathToCategoryDataMap;

class CategoryActions extends ActionSet<"categories", CategoriesState> {
    public static readonly instance = new CategoryActions("categories");

    getAll = new GetAll(this);
    getAllCompleted = new GetAllCompleted(this);
}

export default CategoryActions;