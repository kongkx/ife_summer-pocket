function ViewController(el) {
  this.$container = $(el);
  this.defaultContent = "";
  this.parent = $('<div></div>').addClass('list').appendTo(this.$container);
  
  this.parent.on({
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
      if ($item.parent('.list').hasClass('slide-out')) {
        $item.removeClass('slide-out').siblings().removeClass('slide-out');
        $item.parent(".list").removeClass('slide-out');
      }
    },
  }, '.list-item');
  
}

ViewController.prototype.generateListView = function(data) {
  if (data == false) {
    return "";
  }
  
  htmlCode = [];
  
  for (var i in data) {
    itemdata = data[i];
    var item = '<div class="list-item">';
    item += '<div class="item '+ itemdata.categoryName +'">';
    item += '<span class="item-category"><i class="category-icon category-'+ itemdata.categoryName +'"></i>' + itemdata.categoryTitle + '</span>';
    item += '<span class="item-money '+ itemdata.type +'">' + itemdata.money + '</span>';
    item += '<span class="item-date">' + itemdata.date + '</span>';
    item += '</div>';
    item += '<div class="item-controls">';
    item += '<a href="#" class="item-edit" data-id="'+ itemdata.id +'"><i class="iconfont icon-bianji"></i></a>';
    item += '<a href="" class="item-delete" data-id="' + itemdata.id + '"><i class="iconfont icon-jian"></i></a>';
    item += '</div>';
    item += '</div>';
    htmlCode.push(item);
  }
  return htmlCode.join(" ");
}

ViewController.prototype.updateView = function(data) {
  if (data == false) {
    this.parent.html(this.defaultContent);
  } else {
    this.parent.html(data);  
  }
}

ViewController.prototype.setDefaultContent = function(str) {
  this.defaultContent =  str;
}


