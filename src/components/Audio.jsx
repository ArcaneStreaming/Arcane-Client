import React from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash/isFunction';
import partialRight from 'lodash/partialRight';
import forEach from 'lodash/forEach';

export default class Audio extends React.Component {

	static propTypes = {
		autoPlay: React.PropTypes.bool,
		// loop: React.PropTypes.bool,
		onError: React.PropTypes.func,
		// onEnded: React.PropTypes.func,
		onProgress: React.PropTypes.func,
		onTimeUpdate: React.PropTypes.func,
		// preload: React.PropTypes.bool,
		src: React.PropTypes.string // LINTER <- THIS IS NEVER USED
		// volume: React.PropTypes.number
	};

	static defaultProps = {
		autoPlay: false,
		preload: true,
		src: "",
		loop: false,
		volume: .8,
		onTimeUpdate: null,
		onError: null,
		onProgress: null,
		onEnded: null
	};

	constructor(props) {
		super(props)
		this.state = {
		   listeners: []
		};
	}
	componentDidMount() {
		console.info(this);
		const audio = this.audio;
		this.addListener('timeupdate', this.props.onTimeUpdate, audio);
		this.addListener('progress', this.props.onProgress, audio);
		this.addListener('error', this.props.onError, audio);
		this.addListener('ended', this.props.onEnded, audio);
		this.addListener('loadeddata', this.props.onLoadedData, audio);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.autoPlay === true && this.props.autoPlay === false) {
			this.audio.play();
		}
	}

	componentWillUnmount() {
		this.removeAllListeners();
	}

	get audio() {
		if (!this.refs)
			return {};
		return this;
	}

	set audio(a) {}

	handler(e, func) {
		if (isFunction(func)) {
			func(e);
		}
	}

	addListener = (event, func, audio) => {
		audio.addEventListener(event, partialRight(this.handler, func));
		this.state.listeners.push({event: event, func: func});
	}

	removeAllListeners = () => {
		let audio = this.audioEl;
		forEach(this.state.listeners, (obj) => {
			audio.removeEventListener(obj.event, obj.func);
		})
		this.setState({listeners:[]})
	}

	togglePlay = () => {
		if (this.audio.paused)
			this.audio.play();
		else
			this.audio.pause();
	}

	setPlaybackPercent(percent) {
		this.audio.currentTime = percent * this.audio.duration;
	}

	changeCurrentTimeBy = (amount) => {
		this.audio.currentTime += amount;
	}

	setVolume = (percent) => {
		this.audio.volume = percent;
	}

	render() {
		return(
			<audio
				{...this.props}
				crossOrigin="anonymous"
				refs={(audioEl) => { this.audioEl = audioEl; }}
				/>
		)
	}

}
