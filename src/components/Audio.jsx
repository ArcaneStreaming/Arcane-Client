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
        this.addListener('timeupdate', this.props.onTimeUpdate);
        this.addListener('progress', this.props.onProgress);
        this.addListener('error', this.props.onError);
        this.addListener('ended', this.props.onEnded);
        this.addListener('loadeddata', this.props.onLoadedData);
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
        return ReactDOM.findDOMNode(this.refs.audio);
    }

    set audio(a) {}

    handler(e, func) {
        if (isFunction(func)) {
            func(e);
        }
    }

    addListener = (event, func) => {
        let audio = ReactDOM.findDOMNode(this.refs.audio);
        audio.addEventListener(event, partialRight(this.handler, func));
        this.state.listeners.push({event: event, func: func});
    }

    removeAllListeners = () => {
        let audio = ReactDOM.findDOMNode(this.refs.audio);
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
          // src={this.props.src}
          ref="audio"
          // preload={this.props.preload}
          // volume={this.props.volume}
          // controls={false}
          // autoPlay={this.props.autoPlay}
          // loop={this.props.loop}
          //onCanPlay={this.props.onCanPlay}
        />
        )
    }

}
