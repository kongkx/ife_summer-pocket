function MenuBar(el) {
  this.bar = $(el);
  this.compos = {};
  this.compos.left = $('.left-compo',this.bar);
  this.compos.right = $('.right-compo',this.bar);
  this.compos.secondary = $('.secondary',this.bar);
  this.status = {};
}

MenuBar.prototype.loadStatus = function(str) {
  var opts = this.status[str];
  this.bar[0].className = opts.class;
  this.compos.left.html(opts.compos.left.content);
  if (opts.compos.left.callback != undefined) {
    opts.compos.left.callback();
  }
  this.compos.right.html(opts.compos.right.content);
  if (opts.compos.right.callback != undefined) {
    opts.compos.right.callback();  
  }
  if (opts.compos.secondary != undefined) {
    this.compos.secondary
      .html(opts.compos.secondary.content)
      .addClass(opts.compos.secondary.class).show();
  } else {
    this.compos.secondary.hide();
  }
  this.now = str;
}