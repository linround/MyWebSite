import React from "react";
import './style.scss'

export default class RadioComponent extends React.Component{
  constructor(props) {
    super(props);
    this.setState({
      tabId: props.tabId
    })
  }
  componentDidMount() {
  
  }
  render() {
    const tabId = this.state?.tabId || 'tabId'
    return (
      <>
        <div className="container-radio-component">
          <div className="tabs">
            <label className="tab" htmlFor={`${tabId}-radio-1`}>
              Upcoming
              <span className="notification">2</span>
            </label>
            <input className='radio-1' type="radio" id={`${tabId}-radio-1`} name="tabs" />
            
            
            <label className="tab" htmlFor={`${tabId}-radio-2`}>Development</label>
            <input className='radio-2' type="radio" id={`${tabId}-radio-2`} name="tabs"/>
            
            
            <label className="tab" htmlFor={`${tabId}-radio-3`}>Completed</label>
            <input className='radio-3' type="radio" id={`${tabId}-radio-3`} name="tabs"/>
            
            <span className="glider"></span>
          </div>
        </div>
      </>
    )
  }
}