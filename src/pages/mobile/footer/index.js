import React from 'react'
import './style.scss'

export default class Index extends React.Component {
  componentDidMount() {
  }
  render() {
    const href = 'https://codepen.io/trending?cursor=ZD0wJm89MCZwPTM1'
    return (
      <>
        <div className='mobile-footer-container'>
          <input type="radio" name="toggle" id="toggleOpen" value="toggleOpen" />
          <input type="radio" name="toggle" id="toggleClose" value="toggleClose" />
          <figure id="welcomeMessage">
            <figcaption>

              <a href={href}>demo</a>
              <h1>
                <label htmlFor="toggleOpen" title="Click to Open"></label>
                <label htmlFor="toggleClose" title="Click to Close">✖</label>
                <b>
                  w
                  <a  title="Go To Home">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <defs>
                        <lineargradient id="svgGradient" x1="0" y1="0" x2="20" y2="0" gradientUnits="userSpaceOnUse">
                          <stop offset="0" stopColor="#00ffc3" />
                          <stop offset="0.09090909090909091" stopColor="#00fad9" />
                          <stop offset="0.18181818181818182" stopColor="#00f4f0" />
                          <stop offset="0.2727272727272727" stopColor="#00eeff" />
                          <stop offset="0.36363636363636365" stopColor="#00e6ff" />
                          <stop offset="0.4545454545454546" stopColor="#00dcff" />
                          <stop offset="0.5454545454545454" stopColor="#00d2ff" />
                          <stop offset="0.6363636363636364" stopColor="#00c5ff" />
                          <stop offset="0.7272727272727273" stopColor="#00b8ff" />
                          <stop offset="0.8181818181818182" stopColor="#6da8ff" />
                          <stop offset="0.9090909090909092" stopColor="#9f97ff" />
                          <stop offset="1" stopColor="#c285ff" />
                        </lineargradient>
                      </defs>
                      <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                      <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                    </svg>
                  </a>
                </b>
                <b>
                  e
                  <a  title="Additional Information">
                    e
                  </a>
                </b>
                <b>
                  l
                  <a  title="Go To Shop">
                    l
                  </a>
                </b>
                <b>c
                  <a  title="Send an Email">
                    c
                  </a>
                </b>
                <b>
                  o
                  <a  title="Facebook">
                    o
                  </a>
                </b>
                <b>
                  m
                  <a  title="Instagram">
                    m
                  </a>
                </b>
                <b>
                  e
                  <a  title="LinkedIn">
                    e
                  </a>
                </b>
              </h1>
            </figcaption>
          </figure>
        </div>
      </>
    )
  }
}
