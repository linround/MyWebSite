import React from "react";
import './timeMaskLayer.css'

export default class TimeMaskLayer extends React.Component{
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate')
    this.init()
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  
  componentDidMount() {
    console.log('componentDidMount')
    this.init()
  }
  init(){
  
    class BouncyBlockClock {
      constructor(qs) {
        this.el = document.querySelector(qs);
        this.time = { a: [], b: [] };
        this.rollClass = "clock__block--bounce";
        this.digitsTimeout = null;
        this.rollTimeout = null;
        this.mod = 0 * 60 * 1000;
      
        this.loop();
      }
      animateDigits() {
        const groups = this.el.querySelectorAll("[data-time-group]");
      
        Array.from(groups).forEach((group,i) => {
          const { a, b } = this.time;
        
          if (a[i] !== b[i]) group.classList.add(this.rollClass);
        });
      
        clearTimeout(this.rollTimeout);
        this.rollTimeout = setTimeout(this.removeAnimations.bind(this),900);
      }
      displayTime() {
        // screen reader time
        const timeDigits = [...this.time.b];
        const ap = timeDigits.pop();
      
        this.el.ariaLabel = `${timeDigits.join(":")} ${ap}`;
      
        // displayed time
        Object.keys(this.time).forEach(letter => {
          const letterEls = this.el.querySelectorAll(`[data-time="${letter}"]`);
        
          Array.from(letterEls).forEach((el,i) => {
            el.textContent = this.time[letter][i];
          });
        });
      }
      loop() {
        this.updateTime();
        this.displayTime();
        this.animateDigits();
        this.tick();
      }
      removeAnimations() {
        const groups = this.el.querySelectorAll("[data-time-group]");
      
        Array.from(groups).forEach(group => {
          group.classList.remove(this.rollClass);
        });
      }
      tick() {
        clearTimeout(this.digitsTimeout);
        this.digitsTimeout = setTimeout(this.loop.bind(this),1e3);
      }
      updateTime() {
        const rawDate = new Date();
        const date = new Date(Math.ceil(rawDate.getTime() / 1e3) * 1e3 + this.mod);
        let h = date.getHours();
        const m = date.getMinutes();
        const s = date.getSeconds();
        const ap = h < 12 ? "AM" : "PM";
      
        if (h === 0) h = 12;
        if (h > 12) h -= 12;
      
        this.time.a = [...this.time.b];
        this.time.b = [
          (h < 10 ? `0${h}` : `${h}`),
          (m < 10 ? `0${m}` : `${m}`),
          (s < 10 ? `0${s}` : `${s}`),
          ap
        ];
      
        if (!this.time.a.length) this.time.a = [...this.time.b];
      }
    }
  
    new BouncyBlockClock(".time_mask_layer_clock");
  }
  render() {
    return (
      <div className='time_mask_layer_clock_container'>
        <div className="time_mask_layer_clock" aria-label="00:00:00 AM">
          <div className="clock__block clock__block--delay2" aria-hidden="true" data-time-group>
            <div className="clock__digit-group">
              <div className="clock__digits" data-time="a">00</div>
              <div className="clock__digits" data-time="b">00</div>
            </div>
          </div>
          <div className="clock__colon"></div>
          <div className="clock__block clock__block--delay1" aria-hidden="true" data-time-group>
            <div className="clock__digit-group">
              <div className="clock__digits" data-time="a">00</div>
              <div className="clock__digits" data-time="b">00</div>
            </div>
          </div>
          <div className="clock__colon"></div>
          <div className="clock__block" aria-hidden="true" data-time-group>
            <div className="clock__digit-group">
              <div className="clock__digits" data-time="a">00</div>
              <div className="clock__digits" data-time="b">00</div>
            </div>
          </div>
          <div className="clock__block clock__block--delay2 clock__block--small" aria-hidden="true" data-time-group>
            <div className="clock__digit-group">
              <div className="clock__digits" data-time="a">PM</div>
              <div className="clock__digits" data-time="b">AM</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
