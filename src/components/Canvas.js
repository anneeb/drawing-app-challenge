import React, { PropTypes, Component } from "react";
import { BRUSH, ERASER, STAMP } from "../constants/Tools";

let ctx;

export default class Canvas extends Component {
	constructor(props) {
		super(props);
		this.isDrawing = false;
		this.start = this.start.bind(this);
		this.end = this.end.bind(this);
		this.draw = this.draw.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tools.should_reset) {
			const width = document.getElementById("canvas").width
			const height = document.getElementById("canvas").height
			ctx.clearRect(0, 0, width, height)
			ctx.fillStyle = "#FFFFFF"
			ctx.fillRect(0, 0, width, height)
			this.props.actions.didReset()
		}
		if (nextProps.tools.should_save) {
			const canvas = document.getElementById("canvas")
			canvas.toBlob( function(blob) {
			  const url = URL.createObjectURL(blob)
				window.open(url)
			})
			this.props.actions.didSave()
		}
	}

	componentDidMount() {
		this.refs.canvas.height = window.innerHeight;
		this.refs.canvas.width = window.innerWidth;
		ctx = this.refs.canvas.getContext("2d");
		ctx.fillStyle = "#FFFFFF"
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
	}

	getStroke() {
		return this.props.tools.brush_size;
	}

	getColor() {
		if (this.props.tools.tool === BRUSH) {
			return this.props.tools.brush_color
		}
		else {
			return "#FFFFFF"
		}
	}

	getX(event) {
		if (event.pageX === undefined) {
			return event.targetTouches[0].pageX - this.refs.canvas.offsetLeft;
		}
		else {
			return event.pageX - this.refs.canvas.offsetLeft;
		}
	}

	getY(event) {
		if (event.pageY === undefined) {
			return event.targetTouches[0].pageY - this.refs.canvas.offsetTop;
		}
		else {
			return event.pageY - this.refs.canvas.offsetTop;
		}
	}

	start(event) {
		if (this.props.tools.tool === BRUSH || this.props.tools.tool === ERASER) {
			this.isDrawing = true;
			ctx.beginPath();
			ctx.moveTo(this.getX(event), this.getY(event));
		}
		if (this.props.tools.tool === STAMP) {
			const img = new Image();
			const x = this.getX(event);
			const y = this.getY(event);
			const width = document.getElementById("uploaded-image").width
			const height = document.getElementById("uploaded-image").height
	    img.onload = function() {
	      ctx.drawImage(img, (x - width / 2), (y - height / 2), width, height);
	    };
	    img.src = this.props.tools.image_stamp
		}
		event.preventDefault();
	}

	draw(event) {
		if (this.isDrawing) {
			ctx.lineTo(this.getX(event), this.getY(event));
			ctx.lineWidth = this.getStroke();
			ctx.strokeStyle = this.getColor();
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.stroke();
		}
		event.preventDefault();
	}

	end(event) {
		if (this.isDrawing) {
			ctx.stroke();
			ctx.closePath();
			this.isDrawing = false;
		}
		event.preventDefault();
	}

	render() {
		return (
			<canvas
				id="canvas"
				className="canvas"
				ref="canvas"
				onMouseDown={ this.start }
				onMouseUp={ this.end }
				onMouseMove={ this.draw }
			></canvas>
		)
	}
}

Canvas.propTypes = {
	tools: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
}
