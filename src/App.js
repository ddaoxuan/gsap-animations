import React, { useRef, useEffect } from "react";
import { useIntersection } from "react-use";
import "./App.scss";
import {Power3, Power2, TimelineLite } from "gsap";
import gsap from 'gsap';
import CSSRulePlugin from "gsap/CSSRulePlugin";
import Background from "../src/images/background.jpeg";
import Effect from "../src/images/background-effect.jpeg";
import Girl from '../src/images/second-section.png'

const App = () => {
  //registers plugin
  gsap.registerPlugin(CSSRulePlugin);

  //refs for first section to apply gsap
  let articleRef = useRef(null);
  let buttonRef = useRef(null);
  let image = useRef(null);
  let effect = useRef(null);
  let main = useRef(null);
  // CSSRULE Plugin allows to refer to :after on sth from css
  let imageReveal = CSSRulePlugin.getRule(".black-square:after");

  //creating ref to use intersection hook
  const sectionRef = useRef(null);

  //creating an intersection hook, to watch for specific point
  const intersection = useIntersection(sectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  });

  //checks if we reached threshold - it means when it has to trigger a function of our element, if its set to 1, it means that its going to trigger when our object is on 100% viewport.


  const fadeIn = element => {
    gsap.to(element, 1, {
      opacity: 1,
      x: 60,
      ease: "power4.out",
      stagger: {
        amount: .3,
      },
    });
  };
  const fadeOut = element => {
    gsap.to(element, 1, {
      opacity: 0,
      x: -260,
      ease: "power4.out",
    });
  };
  intersection && intersection.intersectionRatio < 0.6
    ? fadeOut(".second-section")
    : fadeIn('.second-section');

  const tl = new TimelineLite();
  const tl2 = new TimelineLite();
  useEffect(() => {
    tl.to(main, 1, { css: { visibility: "visible" } })
      .to(imageReveal, 1.4, { width: "0%", ease: Power2.easeInOut })
      .from(image, 1.4, { scale: 2, ease: Power2.easeOut })
      .from(articleRef, 1, {
        opacity: 0,
        x: 200,
        ease: Power3.easeOut,
        delay: -0.4,
      })
      .from(buttonRef, 1, {
        opacity: 0,
        x: -400,
        ease: Power3.easeOut,
        delay: -0.4,
      });
    tl2.to(effect, 1.1, { opacity: 1, ease: Power2.easeOut, delay: 3.1 });
  },[]);

  // jsx starts
  return (
    <div className="App">
      <div ref={(el) => (main = el)} className="main">
        <div className="first-container">
          <div ref={(el) => (articleRef = el)} className="article-container">
            <h2>Here's some dummy animated text</h2>
            <article>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </article>{" "}
            <br />
            <button ref={(el) => (buttonRef = el)}>
              And a button under the article
            </button>
          </div>
        </div>
        <div className="image-container">
          <div className="black-square">
            <img
              alt="background"
              ref={(el) => (image = el)}
              className="background"
              src={Background}
            />
            <img
              alt="background-effect"
              ref={(el) => (effect = el)}
              className="background-effect"
              src={Effect}
            />
          </div>
        </div>
      </div>
      <div ref={sectionRef} className="second-section">
        <img className="fadeIn radio-image" src={Girl} alt="some image" />
        <div className="article-container">
        <h3 className="fadeIn">Why do we use it?</h3>
        <article className="fadeIn">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).It is a
          long established fact that a reader will be distracted by the readable
          content of a page when looking at its layout. The point of using Lorem
          Ipsum is that it has a more-or-less normal distribution of letters, as
          opposed to using 'Content here, content here', making it look like
          readable English. Many desktop publishing packages and web page
          editors now use Lorem Ipsum as their default model text, and a search
          for 'lorem ipsum' will uncover many web sites still in their infancy.
          Various versions have evolved over the years, sometimes by accident,
          sometimes on purpose (injected humour and the like).
      
        </article>
        </div>
      </div>
    </div>
  );
};

export default App;
