// ELES COSMÉTICOS — comportamiento base compartido

(function(){
  var nav = document.querySelector('.nav');
  var hero = document.querySelector('.hero');

  function onScroll(){
    if(!nav) return;
    var solid = window.scrollY > 40;
    nav.classList.toggle('is-solid', solid);
    if(hero){
      nav.classList.toggle('nav-on-dark', !solid);
    }
  }
  if(hero){ nav && nav.classList.add('nav-on-dark'); }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  var burger = document.querySelector('.hamburger');
  var menu = document.querySelector('.mobile-menu');
  if(burger && menu){
    burger.addEventListener('click', function(){
      var open = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('is-open');
        burger.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }
})();
