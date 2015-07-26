var categories = [
  {cid: '1', categoryName: 'income', categoryTitle: '收入', type: 'income'},  // custom hexcode and icon maybe.
  {cid: '2', categoryName: 'clothes', categoryTitle: '衣服', type: 'payment'},
  {cid: '3', categoryName: 'eating', categoryTitle: '饮食', type: 'payment'},
  {cid: '4', categoryName: 'house', categoryTitle: '住宿', type: 'payment'},
  {cid: '5', categoryName: 'transport', categoryTitle: '交通', type: 'payment'},
  {cid: '6', categoryName: 'shopping', categoryTitle: '购物', type: 'payment'},
  {cid: '7', categoryName: 'others', categoryTitle: '其他', type: 'payment'},
];

function DataController(data, storage) {
  if (data != null || data != undefined) {
    this.data = data;
  } else {
    this.data = DataController.DEFAULT;
  }
  
  if (storage != undefined) {
    this.storage = storage;
  } else {
    this.storage = "data";
  }
}

DataController.DEFAULT = {
  items: [],
  categories: categories,
  itemCount: 0,
  categoryCount: categories.length,
}

DataController.prototype.getItemById = function(id) {
  var items = this.data.items;
  for (var i in items) {
    if (items[i].id == id) {
      var tmp = $.extend(true, {}, items[i]);
      var category = this.getCategoryById(tmp.categoryId);
      tmp.categoryTitle = category.categoryTitle;
      return tmp; 
    }
  }
}

DataController.prototype.getItemsByProperty = function(prop, value) {
  var results = [];
  var items = this.data.items;
  for (var i in items) {
    if (items[i][prop] == value) {
      results.push(items[i]);
    }
  }
  return results;
}

DataController.prototype.getItemsByCategory = function(id) {
  return this.getItemsByProperty('cid', id);
}

DataController.prototype.getCategoryById = function(id) {
  var categories = this.data.categories;
  for (var i in categories) {
    if (categories[i].cid == id) {
      return categories[i]; 
    }
  }
}

DataController.prototype.getCategoryTitle = function(id) {
  var category = this.getCategoryById(id);
  if (category) {
    return category.categoryTitle;
  }
}

DataController.prototype.getCategoryName = function(id) {
  var category = this.getCategoryById(id);
  if (category) {
    return category.categoryName;
  }
}

DataController.prototype.getCategoryType = function(id) {
  var category = this.getCategoryById(id);
  if (category) {
    return category.type;
  }
}


DataController.prototype.getMoneyPrefix = function(id) {
  var category = this.getCategoryById(id)
  if (category) {
    switch (category.type) {
      case 'income':
        return "+";
      case 'payment':
        return "-";
      default:
        console.log("category type error");
        return " ";
    }
  }
}

DataController.prototype.addItem = function(obj) {
  var item = $.extend({id: this.data.itemCount+1, date: Date.now() }, obj);
  var before = this.data.items.length;
  var after = this.data.items.push(item);

  if (after>before) {
    this.data.itemCount = this.data.itemCount + 1;
    console.log(this.data.itemCount);
    this.record();
    return item.id;
  } else {
    return false;
  }
}

DataController.prototype.updateItem = function(id, obj) {
  this.deleteItemById(id);
  var item = $.extend({date: Date.now()}, obj);
  var count = this.data.items.length;
  if (this.data.items.push(item)>count) {
    this.record();
    return item.id;
  } else {
    return false;
  }
}

DataController.prototype.deleteItemById = function(id) {
  var items = this.data.items;
  for (var i in items) {
    if (items[i].id == id) {
      items.splice(i, 1);
      break;
    }
  }
  this.record();
}

DataController.prototype.record = function() {
  localStorage.setItem(this.storage, JSON.stringify(this.data));
}

DataController.prototype.generateOutput = function(data) {
  if (data == undefined) {
    data = this.data.items;  
  }
  var output = $.extend(true, [], data);
  
  for (var i in output) {
    var item = output[i];
    var category = this.getCategoryById(item.categoryId);
    item.categoryTitle = category.categoryTitle;
    item.categoryName = category.categoryName;
    if (item.description == "") {
      item.description = category.categoryTitle;  
    }
    item.type = category.type;
    item.money = this.getMoneyPrefix(item.categoryId) + item.money;
    item.date = _customDateString(new Date(item.date));
    delete item.categoryId;
  }
  
  return output;
}

function _customDateString(obj, format) {
  // to-be-done: some regexp need to match the format
  var tmpStr = obj.toLocaleString();
  return obj.toLocaleDateString();
}