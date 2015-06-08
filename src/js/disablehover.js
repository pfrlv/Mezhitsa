// Disable :hover on touch devices
//
// Based on https://gist.github.com/4404503 
// via https://twitter.com/javan/status/284873379062890496
// + https://twitter.com/pennig/status/285790598642946048
// re http://retrogamecrunch.com/tmp/hover
if ( 'createTouch' in document ) {
  try {
    var ignore = /:hover/;
    for ( var i=0; i<document.styleSheets.length; i++ ) {
      var sheet = document.styleSheets[i];
      for ( var j=sheet.cssRules.length-1; j>=0; j-- ) {
        var rule = sheet.cssRules[j];
          if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
            sheet.deleteRule( j );
          }
      }
    }
  }
  catch( e ){}
};