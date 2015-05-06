var Modalus = (function() {
  'use strict';
  
  var defaults = {
    'openModalBtn': 'rules-link a',
    'modalContainer': 'rules-modal',
    'modalCloseBtn': 'rules-modal-close'
  };

  var $openBtn = document.querySelector( '.' + defaults.openModalBtn ),
      $closeBtn = document.querySelector( '.' + defaults.modalCloseBtn ),
      $modalContainer = document.querySelector( '#' + defaults.modalContainer ),
      $body = document.body;

  $modalContainer.style.display = 'none';

  // Открыть Модалус
  function openModalus( event ) {
    event.preventDefault();
    
    if ( !hasclass($body, 'show-rules-modal') ) {
      $modalContainer.style.display = 'block';

      setTimeout(function() {
        $body.classList.add('show-rules-modal');
      }, 1);
    }
  };

  // Закрыть Модалус
  function closeModalus( event ) {
    event.preventDefault();

    $body.removeAttribute('class');

    setTimeout(function() {
      $modalContainer.style.display = 'none';
    }, 200);
  };

  // Открыввет окно по клику
  $openBtn.addEventListener('click', function( event ) {
    openModalus( event );
  }, false);

  // Закрывает окно по клику на крестик
  $closeBtn.addEventListener('click', function( event ) {
    closeModalus( event );
  }, false);

  // Открывает окно при нажатии shift + ?
  window.addEventListener('keyup', function( event ) { 
    if ( event.shiftKey && event.keyCode === 191 ) {
      openModalus( event );
    }
  }, false);

  // Закрыввает окно при нажатии на esc
  window.addEventListener('keyup', function( event ) { 
    if( event.keyCode === 27 ) {
      closeModalus( event )
    } 
  }, false);

  return {
    init: function() {
      if( arguments[0] && typeof arguments[0] === 'object' ) {
        defaults = extend( defaults, arguments[0] );
      }
    }
  };

})();
