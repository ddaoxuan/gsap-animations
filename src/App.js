import React, {useRef, useEffect, useState} from 'react';
import './App.scss';
import Background from '../src/images/background.jpeg'
import {TweenMax, Power3, Power2, TimelineLite} from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';


function App() {
  let articleRef = useRef(null);
  let buttonRef = useRef(null);
  let imageReveal = CSSRulePlugin.getRule('.black-square:after')
  let image = useRef(null);
  let main = useRef(null);
  const [state, setState] = useState(false);

  const tl = new TimelineLite();

    useEffect(() => {

      tl.to(imageReveal, 1.4, {width: "0%", ease:Power2.easeInOut})
      .from (image, 1.4, {scale: 0.5, ease: Power2.easeOut, delay: -1})
      .from(articleRef, 1, {opacity: 0, x:200, ease: Power3.easeOut, delay: -.4})
      .from(buttonRef, 1, {opacity: 0, x: -400, ease: Power3.easeOut, delay: -.4})
    },[])

    const handleExpand = () => {
      TweenMax.to(
        buttonRef,
        1,
        {
          width: 350,
          height: 50,
          ease: Power3.easeInOut
        }
      )
      setState(true)
    }
    const handleShrink = () => {
      TweenMax.to(
        buttonRef,
        1,
        {
          width: 288,
          height: 21,
          ease: Power3.easeInOut
        }
      )
      setState(false)
    }

  return (
    <div 
    className="App">
      <div 
      ref = {el => main = el}
      className="main">
        <div className="first-container">
          <div
           ref = {el => articleRef = el}
           className="article-container">
            <h2>Here's some dummy animated text</h2>
            <article onClick={state !== true ? handleExpand : handleShrink}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</article> <br/>
            <button ref ={ el => buttonRef = el}>And a button under the article</button>
          </div>
        </div>
          <div className="image-container">
            <div className="black-square">
            <img
            ref = {el => image = el} 
            className = "background"
            src={Background} />
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
