function ViewController(el) {
  this.$container = $(el);
  this.defaultContent = "";
  this.parent = $('<div></div>').addClass('list').appendTo(this.$container);
  
  this.parent.on('swipeLeft', function(e) {
    if ($(e.target).hasClass('.list-item')) {
      $item = $(e.target);  
    } else {
      $item = $(e.target).parents('.list-item');
    }
    if ($item.length>0) {
      $item.addClass('slide-out').siblings().removeClass('slide-out');  
      $(this).addClass('slide-out');
    }
  });
  
  this.parent.on('swipeRight', function(e) {
    if ($(e.target).hasClass('.list-item')) {
      $item = $(e.target);  
    } else {
      $item = $(e.target).parents('.list-item');
    }
    if ($item.length>0) {
      $item.removeClass('slide-out');
    }
  });

  this.parent.on('tap', function(e) {
    if ($(e.target).hasClass('.list-item')) {
      $item = $(e.target);  
    } else {
      $item = $(e.target).parents('.list-item');
    }
    if ($item.length>0) {
      var list = $(this);
      if (list.hasClass('slide-out')) {
        list.removeClass('slide-out');
        list.find('.list-item').removeClass('slide-out');
      }
    }
  });
  
  this.parent.on('tap', function(e) {
    if (e.target.tagName == "A") {
      $anchor = $(e.target);  
    } else {
      $anchor = $(e.target).parent('a');
    }
    if ($anchor.length>0) {
      if ($anchor.hasClass("item-edit")) {
        var id = $anchor.data('id');
        window.location =  "edit.html?id="+id; 
      } else if ($anchor.hasClass('item-delete')) {
        var id = $anchor.data('id');
        pocketController.deleteItemById(id);
        vController.updateView(vController.generateListView(pocketController.generateOutput()));
      }
    };
  });
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


