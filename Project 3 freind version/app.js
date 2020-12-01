/*

A function  which helps the nav bar have the animation to fade in and out
@author Kinshuk

*/
const navSlide = () =>{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () =>{
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((links,index) =>{
            if(links.style.animation){
                links.style.animation = '';
            }
            else{
                links.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.75}s`;
            }	
        });

        burger.classList.toggle('toggle');
		
    });
  
window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || 
                         ( typeof window.performance != "undefined" && 
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
	
    window.location.reload();
	
  }
});
		
}

navSlide();


