import type { InputsInfo, Options, Position } from "../types";

export default class CanvasParameters {
	parametersWrapper?: HTMLDivElement;
	inputsInfo: InputsInfo;
	onShowEvent: string;
	isVisible: boolean;
	position?: Position;
	onUpdateCanvas?: () => void;

	constructor(inputsInfo: InputsInfo, options?: Options) {
		this.inputsInfo = inputsInfo;
		this.isVisible = options?.defaultVisible || true;
		this.onShowEvent = options?.onShowEvent || "dblclick";
		this.position = options?.position;

		this.onUpdateCanvas = options?.onUpdateCanvas;
		this.createParameters();
		this.createInputs(this.getParametersWrapper());
		this.handleClick();
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
			labelNode.textContent =
				inputInfo.placeholder || "Placeholder is not defined";
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
			throw new Error("The wrapper for the parameters was not created.");
		}
		return this.parametersWrapper;
	}

	private handleClick() {
		document.addEventListener(this.onShowEvent, () => {
			const parametersWrapper = this.getParametersWrapper();
			if (this.isVisible) {
				parametersWrapper.style.display = "none";
			} else {
				parametersWrapper.style.display = "grid";
			}
			this.isVisible = !this.isVisible;
		});
	}

	private setStyleForInputNode(inputNode: HTMLInputElement) {
		inputNode.style.display = "block";
		inputNode.style.margin = "5px";
		inputNode.style.outline = "0";
		inputNode.style.border = "none";
	}

	private setStyleForParametersWrapperNode() {
		const parametersWrapper = this.getParametersWrapper();
		parametersWrapper.style.position = "absolute";
		parametersWrapper.style.top = this.position?.top || "0px";
		parametersWrapper.style.left = this.position?.left || "0px";
		parametersWrapper.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		parametersWrapper.style.fontFamily = "sans-serif";
		parametersWrapper.style.padding = "5px";
		parametersWrapper.style.display = this.isVisible ? "grid" : "none";
		parametersWrapper.style.gridTemplateColumns = "repeat(2, 1fr)";
		parametersWrapper.style.userSelect = "none";
		parametersWrapper.style.gap = "5px";
		parametersWrapper.style.alignItems = "center";
		parametersWrapper.style.color = "#ffffff";
	}

	private handleInputChange(inputNode: HTMLInputElement) {
		inputNode.addEventListener("input", (e) => {
			const target = e.target as HTMLInputElement;
			if (!target) throw new Error("Target was not founed");

			const control = this.inputsInfo.find((inputInfo) => {
				return inputInfo.name === target.name;
			});
			if (!control) throw new Error("Control  was not founed");

			control.onChange(target.value);
			this.onUpdateCanvas?.();
		});
	}
}
new CanvasParameters([
	{
		type: "number",
		placeholder: "Balls count",
		name: "circlesNum",
		value: (2).toString(),
		onChange: () => {},
	},
]);
