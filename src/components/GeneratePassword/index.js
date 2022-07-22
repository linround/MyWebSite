import React from 'react'
import { CopyOutlined } from '@ant-design/icons'
import './style.scss'


export class GeneratePassword extends React.Component {
  componentDidMount() {
    // This is a simple Password Generator App that will generate random password maybe you can you them to secure your account.
    // I tried my best to make the code as simple as possible please dont mind the variable names.
    // Also this idea came in my mind after checking Traversy Media's latest video.

    // Clear the concole on every refresh
    console.clear()
    // set the body to full height
    // document.body.style.height = `${innerHeight}px`

    // Range Slider Properties.
    // Fill : The trailing color that you see when you drag the slider.
    // background : Default Range Slider Background
    const sliderProps = {
      fill: '#0B1EDF',
      background: 'rgba(255, 255, 255, 0.214)',
    }

    // Selecting the Range Slider container which will effect the LENGTH property of the password.
    const slider = document.querySelector('.range__slider')

    // Text which will show the value of the range slider.
    const sliderValue = document.querySelector('.length__title')

    // Using Event Listener to apply the fill and also change the value of the text.
    slider.querySelector('input')
      .addEventListener('input', (event) => {
        sliderValue.setAttribute('data-length', event.target.value)
        applyFill(event.target)
      })
    // Selecting the range input and passing it in the applyFill func.
    applyFill(slider.querySelector('input'))
    // This function is responsible to create the trailing color and setting the fill.
    function applyFill(slider) {
      const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min)
      const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage +
      0.1}%)`
      slider.style.background = bg
      sliderValue.setAttribute('data-length', slider.value)
    }

    // Object of all the function names that we will use to create random letters of password
    const randomFunc = {
      lower: getRandomLower,
      upper: getRandomUpper,
      number: getRandomNumber,
      symbol: getRandomSymbol,
    }

    // Random more secure value
    function secureMathRandom() {
      return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1)
    }

    // Generator Functions
    // All the functions that are responsible to return a random value taht we will use to create password.
    function getRandomLower() {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    }
    function getRandomUpper() {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    }
    function getRandomNumber() {
      return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48)
    }
    function getRandomSymbol() {
      const symbols = '~!@#$%^&*()_+{}":?><;.,'
      return symbols[Math.floor(Math.random() * symbols.length)]
    }

    // Selecting all the DOM Elements that are necessary -->

    // The Viewbox where the result will be shown
    const resultEl = document.getElementById('result')
    // The input slider, will use to change the length of the password
    const lengthEl = document.getElementById('slider')

    // Checkboxes representing the options that is responsible to create differnt type of password based on user
    const uppercaseEl = document.getElementById('uppercase')
    const lowercaseEl = document.getElementById('lowercase')
    const numberEl = document.getElementById('number')
    const symbolEl = document.getElementById('symbol')

    // Button to generate the password
    const generateBtn = document.getElementById('generate')
    // Button to copy the text
    const copyBtn = document.getElementById('copy-btn')
    // Result viewbox container
    const resultContainer = document.querySelector('.result')
    // Text info showed after generate button is clicked
    const copyInfo = document.querySelector('.result__info.right')
    // Text appear after copy button is clicked
    const copiedInfo = document.querySelector('.result__info.left')

    // if this variable is trye only then the copyBtn will appear, i.e. when the user first click generate the copyBth will interact.
    let generatedPassword = false

    // Update Css Props of the COPY button
    // Getting the bounds of the result viewbox container
    let resultContainerBound = {
      left: resultContainer.getBoundingClientRect().left,
      top: resultContainer.getBoundingClientRect().top,
    }
    // This will update the position of the copy button based on mouse Position
    resultContainer.addEventListener('mousemove', (e) => {
      resultContainerBound = {
        left: resultContainer.getBoundingClientRect().left,
        top: resultContainer.getBoundingClientRect().top,
      }
      if (generatedPassword) {
        copyBtn.style.opacity = '1'
        copyBtn.style.pointerEvents = 'all'
        copyBtn.style.setProperty('--x', `${e.x - resultContainerBound.left}px`)
        copyBtn.style.setProperty('--y', `${e.y - resultContainerBound.top}px`)
      } else {
        copyBtn.style.opacity = '0'
        copyBtn.style.pointerEvents = 'none'
      }
    })
    window.addEventListener('resize', (e) => {
      resultContainerBound = {
        left: resultContainer.getBoundingClientRect().left,
        top: resultContainer.getBoundingClientRect().top,
      }
    })

    // Copy Password in clipboard
    copyBtn.addEventListener('click', () => {
      const textarea = document.createElement('textarea')
      const password = resultEl.innerText
      if (!password || password == 'CLICK GENERATE') {
        return
      }
      textarea.value = password
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()

      copyInfo.style.transform = 'translateY(200%)'
      copyInfo.style.opacity = '0'
      copiedInfo.style.transform = 'translateY(0%)'
      copiedInfo.style.opacity = '0.75'
    })

    // When Generate is clicked Password id generated.
    generateBtn.addEventListener('click', () => {
      const length = +lengthEl.value
      const hasLower = lowercaseEl.checked
      const hasUpper = uppercaseEl.checked
      const hasNumber = numberEl.checked
      const hasSymbol = symbolEl.checked
      generatedPassword = true
      resultEl.innerText = generatePassword(
        length, hasLower, hasUpper, hasNumber, hasSymbol
      )
      copyInfo.style.transform = 'translateY(0%)'
      copyInfo.style.opacity = '0.75'
      copiedInfo.style.transform = 'translateY(200%)'
      copiedInfo.style.opacity = '0'
    })

    // Function responsible to generate password and then returning it.
    function generatePassword(
      length, lower, upper, number, symbol
    ) {
      let generatedPassword = ''
      const typesCount = lower + upper + number + symbol
      const typesArr = [{ lower, }, { upper, }, { number, }, { symbol, }].filter((item) => Object.values(item)[0])
      if (typesCount === 0) {
        return ''
      }
      for (let i = 0; i < length; i++) {
        typesArr.forEach((type) => {
          const funcName = Object.keys(type)[0]
          generatedPassword += randomFunc[funcName]()
        })
      }
      return generatedPassword.slice(0, length)
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('')
    }

    // function that handles the checkboxes state, so at least one needs to be selected. The last checkbox will be disabled.
    function disableOnlyCheckbox() {
      const totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter((el) => el.checked)
      totalChecked.forEach((el) => {
        if (totalChecked.length == 1) {
          el.disabled = true
        } else {
          el.disabled = false
        }
      })
    }

    [uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach((el) => {
      el.addEventListener('click', () => {
        disableOnlyCheckbox()
      })
    })
  }
  render() {
    return (
      <>
        <div className="container">
          <h2 className="title">Password Generator</h2>
          <div className="result">
            <div className="result__title field-title">Generated Password</div>
            <div className="result__info right">click to copy</div>
            <div className="result__info left">copied</div>
            <div className="result__viewbox" id="result">CLICK GENERATE</div>
            <button id="copy-btn" style={{
              '--x': 0, '--y': 0,
            }}>
              <CopyOutlined />
            </button>
          </div>
          <div className="length range__slider" data-min="4" data-max="32">
            <div className="length__title field-title" data-length='0'>length:</div>
            <input id="slider" type="range" min="4" max="32" value="16"/>
          </div>

          <div className="settings">
            <span className="settings__title field-title">settings</span>
            <div className="setting">
              <input type="checkbox" id="uppercase" checked/>
              <label htmlFor="uppercase">Include Uppercase</label>
            </div>
            <div className="setting">
              <input type="checkbox" id="lowercase" checked/>
              <label htmlFor="lowercase">Include Lowercase</label>
            </div>
            <div className="setting">
              <input type="checkbox" id="number" checked/>
              <label htmlFor="number">Include Numbers</label>
            </div>
            <div className="setting">
              <input type="checkbox" id="symbol"/>
              <label htmlFor="symbol">Include Symbols</label>
            </div>
          </div>

          <button className="btn generate" id="generate">Generate Password</button>
        </div>


        <div className="support">
          <a href="https://twitter.com/DevLoop01" target="_blank" rel="noreferrer"><i className="fab fa-twitter-square"></i></a>
          <a href="https://codepen.io/dev_loop/" target="_blank" rel="noreferrer"><i className="fab fa-codepen"></i></a>
        </div>

        <a className="github-corner" href="https://github.com/devloop01/password-generator" title="Fork me on GitHub"
          target="_blank" rel="noreferrer">
          <svg width="80" height="80" viewBox="0 0 250 250">
            <title>Fork me on GitHub</title>
            <path d="M0 0h250v250"/>
            <path className="octo-arm"
              d="M127.4 110c-14.6-9.2-9.4-19.5-9.4-19.5 3-7 1.5-11 1.5-11-1-6.2 3-2 3-2 4 4.7 2 11 2 11-2.2 10.4 5 14.8 9 16.2"
              fill="currentColor" style={{
                transformOrigin: '130px 110px',
              }}/>
            <path className="octo-body"
              d="M113.2 114.3s3.6 1.6 4.7.6l15-13.7c3-2.4 6-3 8.2-2.7-8-11.2-14-25 3-41 4.7-4.4 10.6-6.4 16.2-6.4.6-1.6 3.6-7.3 11.8-10.7 0 0 4.5 2.7 6.8 16.5 4.3 2.7 8.3 6 12 9.8 3.3 3.5 6.7 8 8.6 12.3 14 3 16.8 8 16.8 8-3.4 8-9.4 11-11.4 11 0 5.8-2.3 11-7.5 15.5-16.4 16-30 9-40 .2 0 3-1 7-5.2 11l-13.3 11c-1 1 .5 5.3.8 5z"
              fill="currentColor"/>
          </svg>
        </a>
      </>
    )
  }
}
