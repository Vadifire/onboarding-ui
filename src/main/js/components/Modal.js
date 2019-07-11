import React from "react";

export default class Modal extends React.Component {

	constructor(props) {
		super(props);
		this.modalRef = React.createRef();
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside(event) {
		if (this.modalRef.current && !this.modalRef.current.contains(event.target)) {
			this.props.onClose();
		}
	}

	render() {
		if (this.props.show) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return (
			<React.Fragment>
				{this.props.show ? 
					(
						<div id="background-overlay">
							<div className="modal-container" ref={this.modalRef}>
								<span className="close-modal-span" onClick={this.props.onClose}>&times;</span>
								<div className="modal-content">
									{this.props.children}
								</div>
							</div>
						</div>
					) : (
						null
					)
				}
			</React.Fragment>
		);
	}

}
