
## Installation

Install сanvas-parameters with npm



```bash
  npm i canvas-parameters
```
    
## Usage/Examples
paste this code
double click to show parameters

### Typescript example usage
```typescript
import CanvasParameters from "canvas-parameters";

interface IDrawRectangleParameters {
	xPos: number;
	yPos: number;
	width: number;
	height: number;
	color: string;
}

class DrawRectangle {
	xPos: number;
	yPos: number;
	width: number;
	height: number;
	color: string;
	ctx: CanvasRenderingContext2D;
	constructor({ xPos, yPos, width, height, color }: IDrawRectangleParameters) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.width = width;
		this.height = height;
		this.color = color;

		this.ctx = this.createCanvas();
		this.drawRectange();
	}

	createCanvas() {
		const canvas = document.createElement("canvas");
		canvas.width = 400;
		canvas.height = 400;
		document.body.appendChild(canvas);
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("ctx is not defined");
		return ctx;
	}

	drawRectange() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
	}
	// other code of your class
}

const defaultParameters = {
	xPos: 200,
	yPos: 250,
	width: 25,
	height: 50,
	color: "#ff0000",
};
new DrawRectangle(defaultParameters);

new CanvasParameters(
	[
		{
			type: "number",
			placeholder: "Rectangle x position",
			name: "xPos",
			value: defaultParameters.xPos.toString(),
		},
		{
			type: "number",
			placeholder: "Rectangle y position",
			name: "yPos",
			value: defaultParameters.yPos.toString(),
		},
		{
			type: "number",
			placeholder: "Rectangle width",
			name: "width",
			value: defaultParameters.width.toString(),
		},
		{
			type: "number",
			placeholder: "Rectangle height",
			name: "height",
			value: defaultParameters.height.toString(),
		},
		{
			type: "color",
			placeholder: "Rectagle color",
			name: "color",
			value: defaultParameters.color,
		},
	],
	DrawRectangle,
);


```


### Javascript example usage
```javascript
import CanvasParameters from "canvas-parameters";

class DrawRectangle {
	constructor({ xPos, yPos, width, height, color }) {
		this.xPos = xPos;
		this.yPos = yPos;
		this.width = width;
		this.height = height;
		this.color = color;

		this.ctx = this.createCanvas();
		this.drawRectange();
	}

	createCanvas() {
		const canvas = document.createElement("canvas");
		canvas.width = 400;
		canvas.height = 400;
		document.body.appendChild(canvas);
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("ctx is not defined");
		return ctx;
	}

	drawRectange() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
	}
	// other code of your class
}

const defaultParameters = {
	xPos: 200,
	yPos: 250,
	width: 25,
	height: 50,
	color: "#ff0000",
};
new DrawRectangle(defaultParameters);

new CanvasParameters(
	[
		{
			type: "number",
			placeholder: "Rectangle x position",
			name: "xPos",
			value: defaultParameters.xPos.toString(),
		},
		{
			type: "number",
			placeholder: "Rectangle y position",
			name: "yPos",
			value: defaultParameters.yPos.toString(),
		},
		{
			type: "number",
			placeholder: "Rectangle width",
			name: "width",
			value: defaultParameters.width.toString(),
		},
		{
			type: "number",
			placeholder: "Rectangle height",
			name: "height",
			value: defaultParameters.height.toString(),
		},
		{
			type: "color",
			placeholder: "Rectagle color",
			name: "color",
			value: defaultParameters.color,
		},
	],
	DrawRectangle,
);

```