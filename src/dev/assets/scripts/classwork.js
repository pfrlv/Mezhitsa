function hasclass ( el, classname ) {
  var result = el.classList ? el.classList.contains(classname) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  return result;
};
