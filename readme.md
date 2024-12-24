![parameters example](https://raw.githubusercontent.com/GitStudentSem/canvas-parameters/master/images/parameters-preview.gif)

## Usage/Examples
paste this code
double click to show parameters


## Installation
Install сanvas-parameters with npm

```bash
  npm i canvas-parameters
```


### Example usage
Import styles in your css file
```css
@import "canvas-parameters/dist/index.css";
```

Import Class in your js file
```javascript
import CanvasParameters from "canvas-parameters";

const defaultParameters = {
	xPos: 200,
	yPos: 250,
	width: 25,
	height: 50,
	color: "#00ff00",
};

const createCanvas = () => {
	const canvas = document.createElement("canvas");
	canvas.width = 500;
	canvas.height = 500;
	document.body.appendChild(canvas);
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("ctx is not defined");
	return ctx;
};

const ctx = createCanvas();

const drawRectange = () => {
	ctx.clearRect(0, 0, 500, 500);
	ctx.fillStyle = defaultParameters.color;
	ctx.fillRect(
		defaultParameters.xPos,
		defaultParameters.yPos,
		defaultParameters.width,
		defaultParameters.height,
	);
};
drawRectange();

new CanvasParameters(
	[
		{
			type: "number",
			placeholder: "Rectangle x position",
			name: "xPos",
			value: defaultParameters.xPos.toString(),
			onChange: (value) => {
				defaultParameters.xPos = value;
			},
		},
		{
			type: "number",
			placeholder: "Rectangle y position",
			name: "yPos",
			value: defaultParameters.yPos.toString(),
			onChange: (value) => {
				defaultParameters.yPos = value;
			},
		},

		{
			type: "range",
			min: "1",
			max: "100",
			placeholder: "Rectangle width",
			name: "width",
			value: defaultParameters.width.toString(),
			onChange: (value) => {
				defaultParameters.width = value;
			},
		},
		{
			type: "range",
			min: "1",
			max: "100",
			placeholder: "Rectangle height",
			name: "height",
			value: defaultParameters.height.toString(),
			onChange: (value) => {
				defaultParameters.height = value;
			},
		},
		{
			type: "color",
			placeholder: "Rectagle color",
			name: "color",
			value: defaultParameters.color,
			onChange: (value) => {
				defaultParameters.color = value;
			},
		},
	],
	{
		onUpdateCanvas: drawRectange,
	},
);
```