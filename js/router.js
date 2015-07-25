function MyRouter(el) {
  if (el == undefined) {
    this.$el = $('body');  
  } else {
    this.$el = $(el);
  }
  this.actions = {};
  this.controllers = {};
  this.tracker = [];
  this.init();
};


MyRouter.prototype.init = function() {
  var router = this;
  $(document).on('click', function(e) {
    if (e.target.tagName == "A") {
      $anchor = $(e.target);  
    } else {
      $anchor = $(e.target).parents('a');
    }
    if ($anchor.length != 0 && $anchor[0].hash.substr(0,1) == "#") {
      e.preventDefault();
      var hash = $anchor[0].hash;
      router.load(hash);
    }
  });
}

MyRouter.prototype.load = function(hash) {
  // hash pattern: #/actionType:type?searchCode
  // #/action:edit?name=item&id=1
  // #/action:delete?name=item&id=2
  // #/view:list-view?filter=123
  var router = this;
  var paras = /^^#\/(\w*):(\S*)/.exec(hash);
  var actionType = paras[1];
  var actionCode = paras[2];
  var baseCode = actionCode;
  var para = "";
  
  var spliterIndex = actionCode.search("\\?");
  if (spliterIndex != -1) {
    para = actionCode.substr(spliterIndex);
    baseCode = actionCode.substr(0, spliterIndex);
  }
  
  var opts = router.actions[actionType][baseCode];
  
  if (opts.templateURL !== undefined) {
    router.$el.load(opts.templateURL, function() {
      if (opts.controller != undefined && router.controllers[opts.controller] != undefined) {
        router.controllers[opts.controller].apply(router, [baseCode, para]);  
      }
    });
  } else if (opts.controller != undefined && router.controllers[opts.controller] != undefined) {
    router.controllers[opts.controller].apply(router, [baseCode, para]);  
  }
}

MyRouter.prototype.addAction = function(type, code, opts) {
  if (this.actions[type] == undefined) {
    this.actions[type] = {};  
  }
  this.actions[type][code] = opts;
  return this;
}

// opts: templateurl, opts: controller;
MyRouter.prototype.controller = function(str, code) {
  this.controllers[str] = code;
  return this;
}
