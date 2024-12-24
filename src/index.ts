export type InputsInfo = Array<
	Omit<Partial<HTMLInputElement>, "value" | "name"> & {
		/** uniq name for the control */
		name: string;
		/** The value for the input */
		value: string | number;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		onChange: (value: any) => void;
	}
>;

export interface Position {
	top?: CSSStyleDeclaration["top"];
	left?: CSSStyleDeclaration["left"];
}

export interface Options {
	/**
	 * Is show parameters by default
	 * @default true
	 */
	defaultVisible?: boolean;

	/**
	 * HTML event for show parameters
	 * @default "dblclick"
	 */
	onShowEvent?: string;

	/** For clear canvas or new init function */
	onUpdateCanvas?: () => void;

	/** Positon of the parameters on page */
	position?: Position;

	helpText?: string[];
}

export default class CanvasParameters {
	parametersWrapper?: HTMLDivElement;
	inputsWrapper?: HTMLDivElement;
	inputsInfo: InputsInfo;
	onShowEvent: string;
	isVisible: boolean;
	position?: Position;
	helpText?: string[];
	onUpdateCanvas?: () => void;

	constructor(inputsInfo: InputsInfo, options?: Options) {
		this.inputsInfo = inputsInfo;
		this.isVisible = options?.defaultVisible || true;
		this.onShowEvent = options?.onShowEvent || "dblclick";
		this.position = options?.position;
		this.helpText = options?.helpText || [];

		this.onUpdateCanvas = options?.onUpdateCanvas;
		this.createParameters();
		this.createInputs();
		this.createHelpText();
		this.handleEvent();
	}

	private createParameters() {
		const parametersWrapper = document.createElement("div");
		const inputsWrapper = document.createElement("div");

		parametersWrapper.classList.add("parameters-wrapper");
		inputsWrapper.classList.add("inputs-wrapper");

		document.body.appendChild(parametersWrapper);
		document.body.appendChild(inputsWrapper);

		this.parametersWrapper = parametersWrapper;
		this.inputsWrapper = inputsWrapper;
		this.setStyleForParametersWrapperNode();
	}

	private createInputs() {
		const inputsWrapper = this.getInputsWrapper();

		for (let i = 0; i < this.inputsInfo.length; i++) {
			const inputInfo = this.inputsInfo[i];
			const labelNode = document.createElement("label");
			labelNode.textContent =
				inputInfo.placeholder || "Placeholder is not defined";
			const inputNode = document.createElement("input");

			labelNode.htmlFor = inputInfo.name;
			inputNode.id = inputInfo.name;
			inputNode.classList.add("parameters-input");

			for (let j = 0; j < Object.entries(inputInfo).length; j++) {
				const [key, value] = Object.entries(inputInfo)[j];
				if (value) {
					inputNode.setAttribute(key, value.toString());
				}
			}

			this.handleInputChange(inputNode);
			inputsWrapper.appendChild(labelNode);
			inputsWrapper.appendChild(inputNode);
		}
	}

	private getParametersWrapper() {
		if (!this.parametersWrapper) {
			throw new Error("The wrapper for the parameters was not created.");
		}
		return this.parametersWrapper;
	}

	private getInputsWrapper() {
		if (!this.inputsWrapper) {
			throw new Error("The wrapper for the inputs was not created.");
		}
		return this.inputsWrapper;
	}

	private setDisplayParameters() {
		const display = this.isVisible ? "grid" : "none";

		document.documentElement.style.setProperty("--parameters-display", display);
	}

	private handleEvent() {
		document.addEventListener(this.onShowEvent, () => {
			this.setDisplayParameters();
			this.isVisible = !this.isVisible;
		});
	}

	private setStyleForParametersWrapperNode() {
		this.setDisplayParameters();

		document.documentElement.style.setProperty(
			"--parameters-position-top",
			this.position?.top || "0px",
		);
		document.documentElement.style.setProperty(
			"--parameters-position-left",
			this.position?.left || "0px",
		);
	}

	private handleInputChange(inputNode: HTMLInputElement) {
		inputNode.addEventListener("change", (e) => {
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

	private createHelpText() {
		const texts = this.helpText;
		if (!texts) return;

		const parametersWrapper = this.getParametersWrapper();
		for (let i = 0; i < texts.length; i++) {
			const text = texts[i];
			const textNode = document.createElement("p");
			textNode.textContent = text;
			parametersWrapper.appendChild(textNode);
		}
	}
}
