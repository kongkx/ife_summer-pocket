/**
 * 自定义router
 * el 设置router绑定元素
 * @param {str} el 
 */
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
  $(document).on('click', 'a', function(e) {
    if (this.hash.substr(0,1) == "#") {
      e.preventDefault();
      var hash = this.hash;
      router.load(hash);
    }
  });
}

MyRouter.prototype.load = function(hash) {
  // hash pattern: #/actionType:code?searchCode
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
  
  if (para != "") {
    var paraStr = para.substr(1);
    var paraArr = paraStr.split("&");
    var paraObj = {}
    for (var i in paraArr) {
      var tmp = paraArr[i].split("=");
      paraObj[tmp[0]]=tmp[1];
    }
  }
  
  
  
  var opts = router.actions[actionType][baseCode];
  
  if (opts.templateURL !== undefined) {
    router.$el.load(opts.templateURL, function() {
      if (opts.controller != undefined && router.controllers[opts.controller] != undefined) {
        router.controllers[opts.controller].call(router, paraObj);  
      }
    });
  } else if (opts.controller != undefined && router.controllers[opts.controller] != undefined) {
    router.controllers[opts.controller].call(router, paraObj);  
  }
}



MyRouter.prototype.addAction = function(type, code, opts) {
  if (this.actions[type] == undefined) {
    this.actions[type] = {};  
  }
  this.actions[type][code] = opts;
  return this;
}

// may change to plugin form 
MyRouter.prototype.addPlugin = function(name, opts) {
  if (this.plugins[name] == undefined) {
    this.plugins[name] == opts;
  } else {
    console.log("Plugin "+name+ "is already defined, please use another name");  
  }
}

// opts: templateurl, opts: controller;
MyRouter.prototype.controller = function(str, code) {
  this.controllers[str] = code;
  return this;
}
