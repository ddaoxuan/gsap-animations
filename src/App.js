import React, {useRef, useEffect, useState} from 'react';
import './App.scss';
import Background from '../src/images/background.jpeg'
import {TweenMax, Power3, Power2, TimelineLite} from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import Effect from '../src/images/background-effect.jpeg';

function App() {
  let articleRef = useRef(null);
  let buttonRef = useRef(null);
  let imageReveal = CSSRulePlugin.getRule('.black-square:after')
  let image = useRef(null);
  let effect = useRef(null);
  let main = useRef(null);
  const [state, setState] = useState(false);

  const tl = new TimelineLite();
  const tl2 = new TimelineLite();
    useEffect(() => {
      tl.to(main, 1, {css: {visibility: "visible"}})
      .to(imageReveal, 1.4, {width: "0%", ease:Power2.easeInOut})
      .from (image, 1.4, {scale: 2, ease: Power2.easeOut})
      .from(articleRef, 1, {opacity: 0, x:200, ease: Power3.easeOut, delay: -.4})
      .from(buttonRef, 1, {opacity: 0, x: -400, ease: Power3.easeOut, delay: -.4})
      tl2.to(effect, 1.1, {opacity: 1, ease: Power2.easeOut, delay: 3.1})
    },[])

    const handleExpand = () => {
      TweenMax.to(
        effect,
        .8,
        {
          opacity: 0,
          ease: Power2.easeInOut
        }
      )
      setState(true)
    }
    const handleShrink = () => {
      TweenMax.to(
        effect,
        1,
        {
          opacity: 1,
          ease: Power2.easeInOut
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
             <img
            ref = {el => effect = el} 
            className = "background-effect"
            src={Effect} />
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
