function ViewController(el) {
  this.$container = $(el);
  this.defaultContent = "";
}

ViewController.prototype.generateListView = function(data) {
  if (data == false) {
    return "";
  }
  $list = $('<div class="list">'); 
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
    item += '<a href="#/edit.html?id=' + itemdata.id + '" class="item-edit" data-id="'+ itemdata.id +'"><i class="iconfont icon-bianji"></i></a>';
    item += '<a href="#/action:delete?id='+ itemdata.id +'" class="item-delete" data-id="' + itemdata.id + '"><i class="iconfont icon-jian"></i></a>';
    item += '</div>';
    item += '</div>';
    htmlCode.push(item);
  }
  $list.html(htmlCode.join(" "));
  return $list;
}

ViewController.prototype.updateView = function(data, el) {
  if (el == undefined) {
    el = this.$container;  
  }
  if (data == false) {
    $(el).html(this.defaultContent);
  } else {
    $(el).html(data);  
  }
}

ViewController.prototype.setDefaultContent = function(str) {
  this.defaultContent =  str;
}


//<div class="list-item">
//  <div class="item category-eating">
//    <span class="item-category"><i class="category-icon category-eating"></i>饮食</span>
//    <span class="item-money payment">-345</span>
//    <span class="item-date">15/07/21</span>
//  </div>
//  <div class="item-controls">
//    <a href=""><i class="iconfont icon-bianji"></i></a>
//    <a href=""><i class="iconfont icon-jian"></i></a>
//  </div>
//</div>