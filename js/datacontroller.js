//Filename: datacontroller.js
//Description: 处理数据的增删改查
//----------------------------------------我是分隔线-------------------------

/*
 * cid: 分类ID
 * categoryName: 分类机读名
 * categoryTitle: 分类名
 * type: 分类类型 incom | payment
 */
var categories = [
  {cid: '1', categoryName: 'income', categoryTitle: '收入', type: 'income'},  // custom hexcode and icon maybe.
  {cid: '2', categoryName: 'clothes', categoryTitle: '衣服', type: 'payment'},
  {cid: '3', categoryName: 'eating', categoryTitle: '饮食', type: 'payment'},
  {cid: '4', categoryName: 'house', categoryTitle: '住宿', type: 'payment'},
  {cid: '5', categoryName: 'transport', categoryTitle: '交通', type: 'payment'},
  {cid: '6', categoryName: 'shopping', categoryTitle: '购物', type: 'payment'},
  {cid: '7', categoryName: 'others', categoryTitle: '其他', type: 'payment'},
];

/*
 * DataController构造函数
 * @param {obj} data
 * @param {str} storage  | default: data;
 */
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

/**
 * DataController 缺省参数
 */
DataController.DEFAULT = {
  items: [],
  categories: categories,
  itemCount: 0,
  categoryCount: categories.length,
}

/**
 * 根据id获取账单项目
 * @param {int} id
 * @return {obj} item
 */
DataController.prototype.getItemById = function(id) {
  var items = this.data.items;
  for (var i in items) {
    if (items[i].id == id) {
      var item = $.extend(true, {}, items[i]);
      return item; 
    }
  }
}

/**
 * 根据属性获取账单项目
 * @param {str} prop
 * @param {str} value
 * return {array} item_collection
 */
DataController.prototype.getItemsByProperty = function(prop, value) {
  var results = [];
  var items = this.data.items;
  for (var i in items) {
    if (items[i][prop] == value) {
      var tmp = $.extend(true, {}, items[i]);
      results.push(tmp);
    }
  }
  return results;
}

/** 
 * 根据分类获取项目对象
 * @param {int} id
 * @return {array} item_collection
 */
DataController.prototype.getItemsByCategory = function(id) {
  return this.getItemsByProperty('cid', id);
}

/**
 * 根据cid获取分类
 * @param {int} cid
 * @return {obj} category
 */
DataController.prototype.getCategoryById = function(cid) {
  var categories = this.data.categories;
  for (var i in categories) {
    if (categories[i].cid == cid) {
      return $.extend(true, {}, categories[i]); 
    }
  }
}

/** 
 * 获取分类名称
 * @param {int} cid
 * @return {str} categoryTitle
 */
DataController.prototype.getCategoryTitle = function(cid) {
  var category = this.getCategoryById(cid);
  if (category) {
    return category.categoryTitle;
  }
}

/**
 * 获取分类机读名
 * @param {int} cid
 * @return {str} categoryName
 */
DataController.prototype.getCategoryName = function(id) {
  var category = this.getCategoryById(id);
  if (category) {
    return category.categoryName;
  }
}

/**
 * 获取分类类型
 * @param {int} cid
 * @return {str} categoryType
 */
DataController.prototype.getCategoryType = function(cid) {
  var category = this.getCategoryById(cid);
  if (category) {
    return category.type;
  }
}
/**
 * 根据分类类型生产前缀
 * @param {int} cid
 * @return {str} prefix
 */
DataController.prototype.getMoneyPrefix = function(cid) {
  var category = this.getCategoryById(cid)
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

/**
 * 添加账目
 * @param {obj} item;
 * @return {int} new Id;
 */
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

/**
 * 更新账目
 * @param {int} id;
 * @param {obj} item;
 * @return {int} updated id;
 */
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

/**
 * 删除账目
 * @param {int} id;
 */
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
/**
 * 数据存档
 */
DataController.prototype.record = function() {
  localStorage.setItem(this.storage, JSON.stringify(this.data));
}

/**
 * 生成输出数据
 * @param {array} data 
 * @return {array} output
 * output item: {id:id, 
 *               date: dateStr, 
 *               description: description,
 *               money: prefixed_money,
 *               categoryId: cid, 
 *               categoryTitle: cTitle, 
 *               categoryName: cName, }
 */
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

/**
 * 时间自定义样式输出
 * @param {date} obj;
 * @return {str} dateString
 */
function _customDateString(obj, format) {
  // to-be-done: some regexp need to match the format
  var tmpStr = obj.toLocaleString();
  return obj.toLocaleDateString();
}