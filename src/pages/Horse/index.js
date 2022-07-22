import React from 'react'
import './style.scss'


export default class Horse extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <>
        <div className='ly-horse-container'>
          <input type="checkbox" id="toggle" />
          <label htmlFor="toggle" >
            <div className="floor"></div>

            <div className=" ly-horse animate">
              <div className="front-leg right">
                <div className="shoulder">
                  <div className="upper">
                    <div className="knee">
                      <div className="lower">
                        <div className="ankle">
                          <div className="foot">
                            <div className="hoof"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="back-leg right">
                <div className="top">
                  <div className="thigh">
                    <div className="lower-leg">
                      <div className="foot">
                        <div className="hoof"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tail">
                <div className="nub">
                  <div className="section">
                    <div className="section">
                      <div className="section">
                        <div className="section">
                          <div className="section">
                            <div className="section last">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="body">
                <div className="section">
                  <div className="section">
                    <div className="section">
                      <div className="section">
                        <div className="section last">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="back-side"></div>
              </div>

              <div className="neck">
                <div className="under"></div>
                <div className="front"></div>
                <div className="base"></div>
                <div className="top"></div>
                <div className="shoulder"></div>
              </div>
              <div className="front-leg left">
                <div className="shoulder">
                  <div className="upper">
                    <div className="knee">
                      <div className="lower">
                        <div className="ankle">
                          <div className="foot">
                            <div className="hoof"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="back-leg left">
                <div className="top">
                  <div className="thigh">
                    <div className="lower-leg">
                      <div className="foot">
                        <div className="hoof"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="head">
                <div className="skull"></div>
                <div className="nose"></div>
                <div className="face"></div>
                <div className="lip"></div>
                <div className="jaw"></div>
                <div className="chin"></div>
                <div className="ear"></div>
                <div className="eye"></div>
              </div>
            </div>

            <div className="dust front">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
            <div className="dust back">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </label>
        </div>

      </>
    )
  }
}
