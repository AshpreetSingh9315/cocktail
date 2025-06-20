/* eslint-disable no-unused-vars */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars , words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => {
      char.classList.add("text-gradient");
    });
    gsap.from(heroSplit.chars, {
      y: 200,
      duration: 1.6,
      stagger: 0.05,
      ease: "expo.out",
    });
    gsap.from(paragraphSplit.lines, {
      y: 100,
      opacity: 0,
      duration: 1.4,
      stagger: 0.06,
      ease: "expo.out",
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".left-leaf", { y: -200 }, 0)
      .to(".right-leaf", { y: -200 }, 0);

    const startValue = isMobile ? " top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

   const tl  = gsap.timeline({
        scrollTrigger :{
            trigger : "video",
            start : startValue,
            end : endValue,
            scrub : true,
            pin: true,
        }
    })

    videoRef.current.onloadedmetadata = ()=>{
        tl.to(videoRef.current , {
            currentTime :  videoRef.current.duration
        })
    }
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>
        <img src="/images/hero-left-leaf.png" className="left-leaf" alt="" />
        <img src="/images/hero-right-leaf.png" className="right-leaf" alt="" />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer.
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every Cocktail on our menu is a blend of premium ingrdients ,
                creative flair, and timeless rescipes - designed to delight your
                senses
              </p>
              <a href="/cocktails"></a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video ref={videoRef} src="/videos/output.mp4" muted playsInline preload="auto" ></video>
      </div>
    </>
  );
};

export default Hero;
