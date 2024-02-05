import { mark } from "regenerator-runtime";
import View from "./View";
import previewView from "./previewView";

class ResultsView extends View {
	_parentEl = "";

	_generateMarkup() {
		const results = this._data;
		const markup = results.reduce((accumulator, result) => accumulator + previewView.render(result, false), "");
		return markup;
	}
}

export default new ResultsView();
