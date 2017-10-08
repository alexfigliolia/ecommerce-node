import React, {Component} from 'react';

export default class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "banner",
      text: ['Farm', 'to', 'table', 'food', 'products'],
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({ classes: "banner banner-show" });
    }, 500);
  }

  render = () => {
    let inc = 0
		return(
			<div className={this.state.classes} id='banner'>
        <div className='center'>
          <div className="heading-text">
            {
              this.state.text.map((word, i) => {
                return (
                  <h1 key={i}>
                    {
                      word.split('').map((letter, j) => {
                        inc += 1;
                        return <div 
                                 className='letter' 
                                 key={j}
                                 style={{
                                  transitionDelay: inc/50 + 's'
                                 }}>{letter}</div>
                      })
                    }
                    &nbsp;
                  </h1>
                );
              })
            }
          </div>
          <div>
            <button 
              className='explore router' 
              data-page='Shop' 
              onClick={this.props.nav}></button>
            <button 
              id='toAbout' 
              onClick={this.props.scrollTo}></button>
          </div>
        </div>
        <button 
          className="scroll" 
          onClick={this.props.scrollTo}></button>
      </div>
		);
	}
}