import CategoryData from "src/data/models/CategoryData";
import {Observable} from "rxjs/Observable";
import ReadableAjaxUtils from "src/utilities/ReadableAjaxUtils";

class CategoryConnector {
    // GET /categories
    // Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.
    getAll(): Observable<CategoryData[]> {
        return ReadableAjaxUtils.get(`/categories`)
            .map((response: {categories: CategoryData[]}) => {
                return response.categories;
            });
    }
}

export default new CategoryConnector();