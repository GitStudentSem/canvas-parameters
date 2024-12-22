type InputsInfo = Array<
	Omit<Partial<HTMLInputElement>, "name" | "value"> & {
		/** The name of the class parameter to be updated */
		name: string;
		/** The value of the class parameter to be updated */
		value: string;
	}
>;
export class Parameters {
	parametersWrapper?: HTMLDivElement;
	values: { [key: string]: string };

	/** Your class for creating a scene */
	canvasClass: any;
	inputsInfo: InputsInfo;
	/**
	 *
	 * @param inputsInfo {InputsInfo}
	 * @param canvasClass Your class for creating a scene
	 */
	constructor(inputsInfo: InputsInfo, canvasClass: any) {
		this.inputsInfo = inputsInfo;
		this.values = {};
		this.createParameters();
		this.createInputs(this.getParametersWrapper());
		this.handleClick();

		this.setInitialValues();
		this.canvasClass = canvasClass;
	}

	private createParameters() {
		const parametersWrapper = document.createElement("div");

		document.body.appendChild(parametersWrapper);

		this.parametersWrapper = parametersWrapper;
		this.setStyleForParametersWrapperNode();
	}

	private createInputs(parametersWrapper: HTMLDivElement) {
		for (let i = 0; i < this.inputsInfo.length; i++) {
			const inputInfo = this.inputsInfo[i];
			const labelNode = document.createElement("label");
			labelNode.textContent = inputInfo.placeholder || "Значение не определено";
			const inputNode = document.createElement("input");
			const randomId = Math.random().toString();

			labelNode.htmlFor = randomId;
			inputNode.id = randomId;

			this.setStyleForInputNode(inputNode);

			for (let j = 0; j < Object.entries(inputInfo).length; j++) {
				const [key, value] = Object.entries(inputInfo)[j];
				if (value) {
					inputNode.setAttribute(key, value.toString());
				}
			}

			this.handleInputChange(inputNode);
			parametersWrapper.appendChild(labelNode);
			parametersWrapper.appendChild(inputNode);
		}
	}

	private getParametersWrapper() {
		if (!this.parametersWrapper) {
			throw new Error("Обертка для параметров не была создана");
		}
		return this.parametersWrapper;
	}

	private handleClick() {
		document.addEventListener("dblclick", () => {
			const parametersWrapper = this.getParametersWrapper();

			if (parametersWrapper.style.display === "none") {
				parametersWrapper.style.display = "grid";
			} else {
				parametersWrapper.style.display = "none";
			}
		});
	}

	private setStyleForInputNode(inputNode: HTMLInputElement) {
		inputNode.style.display = "block";
		inputNode.style.margin = "5px";
		inputNode.style.padding = "5px";
		inputNode.style.outline = "0";
		inputNode.style.border = "none";
	}

	private setStyleForParametersWrapperNode() {
		const parametersWrapper = this.getParametersWrapper();
		parametersWrapper.style.position = "absolute";
		parametersWrapper.style.top = "0px";
		parametersWrapper.style.left = "0px";
		parametersWrapper.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		parametersWrapper.style.fontFamily = "sans-serif";
		parametersWrapper.style.padding = "5px";
		parametersWrapper.style.display = "grid";
		parametersWrapper.style.gridTemplateColumns = "repeat(2, 1fr)";

		parametersWrapper.style.gap = "5px";
		parametersWrapper.style.alignItems = "center";
		parametersWrapper.style.color = "#ffffff";
	}

	private setInitialValues() {
		for (let i = 0; i < this.inputsInfo.length; i++) {
			const inputInfo = this.inputsInfo[i];
			this.values = { ...this.values, [inputInfo.name]: inputInfo.value };
		}
	}

	private handleInputChange(inputNode: HTMLInputElement) {
		inputNode.addEventListener("change", (e) => {
			const target = e.target as HTMLInputElement;
			if (!target) throw new Error("Параметр не был найден");

			this.values[target.name] = target.value;

			const canvas = document.getElementsByTagName("canvas")[0];
			document.body.removeChild(canvas);
			const newValues = { ...this.values, [target.name]: target.value };

			new this.canvasClass(newValues);
		});
	}
}
