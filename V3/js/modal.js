var singleton = function(fn) {
  var result;
  return function() {
    return result || ( result = fn.apply(this, arguments));
  }
}

var createMask = singleton(function() {
  return $('<div />', {class: 'mask'}).appendTo('body');
});

var createModal = singleton(function() {
  var $el = $('<div />', {class: 'modal'});
  $el.header = "title";
  $el.context = "context";
  $el.footer = "footer";
  $el.show = function() {
    this.empty();
    if (this.header !== "") {
      $("<div />", {class: 'modal-header'}).html(this.header).appendTo(this);
    }
    if (this.context !== "") {
      $("<div />", {class: 'modal-context'}).html(this.context).appendTo(this);  
    }
    if (this.footer !== "") {
      $("<div />", {class: 'modal-footer'}).html(this.footer).appendTo(this);
    }
    var mask = createMask();
    mask.on('tap',function() {
      createModal().trigger('tap');
    });
    mask.show();
    Zepto.fn.show.call(this,'');
  }
  $el.on('tap', function() {
    createMask().off().hide();
    $(this).hide();
  });
  return $el.hide().appendTo('body');
});