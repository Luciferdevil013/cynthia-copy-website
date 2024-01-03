function loco(){
    gsap.registerPlugin(ScrollTrigger);
    
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
     
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    ScrollTrigger.refresh();
};
loco();




const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function mouseMove(xscale,yscale){
    window.addEventListener('mousemove',(details) => {
        document.querySelector('#mini-cicle').style.transform = `translate(${details.clientX - 7}px,${details.clientY - 7}px) scale(${xscale},${yscale})`;
    });
}

function firstPageAnimated(){
    var tl = gsap.timeline();
    tl.from('#nav',{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    .to('.bdele',{
        y:'0',
        duration:2,
        delay:-1.5,
        ease:Expo.easeInOut,
        stagger:.2,
    })
    .from('#home-footer',{
        y:'-10',
        duration:1.5,
        opacity:0,
        delay:-1,
        ease:Expo.easeInOut
    })
};

firstPageAnimated();


gsap.from('.element',{
    y:300,
    opacity:0,
    duration:1,
    scrollTrigger:{
        trigger:'#second',
        scroller:'#main',
        start:'top bottom',
        end:'top top',
    }

})

var xscale = 1;
var yscale = 1;
var xprev = 0;
var yprev = 0;
var timeout;

window.addEventListener('mousemove',(details) => {
    clearTimeout(timeout);
    xscale = gsap.utils.clamp(.8,1.2,details.clientX - xprev);
    yscale = gsap.utils.clamp(.8,1.2,details.clientY - yprev);
    xprev = details.clientX;
    yprev = details.clientY;
    mouseMove(xscale,yscale);
    timeout = setTimeout(()=>{
        document.querySelector('#mini-cicle').style.transform = `translate(${details.clientX - 7}px,${details.clientY - 7}px) scale(1,1)`;
    },100)
})

document.querySelectorAll('.element').forEach((elem) =>{
    var ratato = 0;
    var diffrot = 0;
    elem.addEventListener('mouseleave',() => {
        gsap.to(elem.querySelector('img'),{
            opacity:0,
            ease:Power1
        })
    });

    elem.addEventListener('mousemove',(details) =>{
        var diff = (details.clientY - elem.getBoundingClientRect().top) - 125;
        diffrot = details.clientX - ratato;
        ratato = details.clientX
        gsap.to(elem.querySelector('img'),{
            opacity:1,
            ease:Power1,
            top:diff,
            left:details.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot)
        })
    })
})

