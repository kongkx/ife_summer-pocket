// Filename: views.js
// Description: 提供视图组件
// ----------------------------------------我是分隔线-------------------------



/**
 * 视图控制器 构造函数
 * @param: {str} container
 */
function View(container, type) {
  this.$container = $(container);
  this.defaultContent = "";
  switch (type) {
    case 'multi-list':
      this.$parent = $('<div></div>').addClass('multi-list');
      break;
    case 'list':
      this.$parent = $('<div></div>').addClass('list');
      break;
    default:
      this.$parent = $('<div></div>');
  }
  var $parent = this.$parent;
  
  // 视图内容绑定
  $parent.on({
    'swipeLeft': function(e) {
      $item = $(this);
      $item.addClass('slide-out').siblings().removeClass('slide-out');
      $item.parent('.list').addClass('slide-out');
    }, 
    'swipeRight': function(e) {
      $item = $(this);
      if ($item.hasClass('slide-out')) {
        $item.removeClass('slide-out');
        $item.parent('.list').removeClass('slide-out');
      }
    },
    'click': function(e) {
      $item = $(this);
      if ($item.parent('.list').hasClass('slide-out')) {
        $item.removeClass('slide-out').siblings().removeClass('slide-out');
        $item.parent(".list").removeClass('slide-out');
      }
    },
  }, '.list-item');
}


/** 
 * 生成html列表代码
 * @param {array} data
 * @return {str} list
 */
View.prototype.generateListContent = function(data) {
  if (data == false) {
    return "";
  }
  htmlCode = [];
  for (var i in data) {
    itemdata = data[i];
    var item = '<div class="list-item">';
    item += '<div class="item">';
    item += '<span class="item-category category-'+ itemdata.categoryId  +'"><i class="category-icon iconfont icon-'+itemdata.icon+'"></i>' + itemdata.categoryTitle + '</span>';
    item += '<span class="item-money '+ itemdata.type +'">' + itemdata.money + '</span>';
    console.log(itemdata.date);
    item += '<span class="item-date">' + _customDateString(new Date(parseInt(itemdata.date))) + '</span>';
    item += '</div>';
    item += '<div class="item-controls">';
    item += '<a href="#/item:edit?id=' + itemdata.id + '" class="item-edit" data-id="'+ itemdata.id +'"><i class="iconfont icon-bianji"></i></a>';
    item += '<a href="#/item:delete?id='+ itemdata.id +'" class="item-delete" data-id="' + itemdata.id + '"><i class="iconfont icon-jian"></i></a>';
    item += '</div>';
    item += '</div>';
    htmlCode.push(item);
  }
  return htmlCode.join(" ");
}

/**
 * 更新视图内容
 * @param {str} data
 * @param (optional) {str} el | default:
 */
View.prototype.update = function(data, el) {
  if (el == undefined) {
    el = this.$parent;  
  }
  if (data == false) {
    $(el).html(this.defaultContent);
  } else {
    $(el).html(data);  
  }
}

/**
 * 设置视图缺省内容
 * @param {str} str
 */
View.prototype.setDefaultContent = function(str) {
  this.defaultContent =  str;
}


/**
 * 自定义时间字符处输出
 * @param {date} obj
 * @param {str} format
 * @return {str} dateStr
 */
function _customDateString(obj, format) {
  // to-be-done: some regexp need to match the format
  var tmpStr = obj.toLocaleString();
  return obj.toLocaleDateString();
}
