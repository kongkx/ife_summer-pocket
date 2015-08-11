var singleton = function(fn) {
  var result;
  return function() {
    return result || ( result = fn.apply(this, arguments));
  }
}

var createMask = singleton( function() {
  return document.body.appendChild( document.createElement('div') );
});

var menubar = singleton(function() {
    var bar = $(arguments[0]);
    bar.compos = {};
    bar.compos.left = $('.left-compo',bar);
    bar.compos.right = $('.right-compo',bar);
    return bar;
  });

function MenuBar(el) {
  this.bar = menubar(el);
  this.status = {};
  this.bar.secondary = $('<div />',{class: 'secondary'}).appendTo(this.bar);
}

MenuBar.prototype.loadStatus = function(str) {
  this.status.now = str;
  var opts = this.status[str];
  this.bar[0].className = opts.class;
  this.bar.compos.left.html(opts.compos.left.content);
  if (opts.compos.left.callback != undefined) {
    opts.compos.left.callback();
  }
  this.bar.compos.right.html(opts.compos.right.content);
  
  if (opts.compos.secondary != undefined) {
    this.bar.secondary
      .html(opts.compos.secondary.content)
      .addClass(opts.compos.secondary.class)
      .appendTo(this.bar).show();
  } else {
    this.bar.secondary.remove();
  }
}