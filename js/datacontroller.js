/**
 * 数据集合构造函数
 * @param {obj} obj
 * @property {obj} data
 * @property {int} accumulator
 * @method 
 */
function DataCollection(obj) {
  this.data = obj.data;
  this.accumulator = obj.accumulator;
}

/**
 * 添加项目
 * @param {obj} obj
 * @return {int} id
 */
DataCollection.prototype.addItem = function(obj) {
  var tmp = $.extend({id: ++this.accumulator, update: Date.now(), date: Date.now()}, obj);
  this.data.push(tmp);
  return tmp.id;
}

/**
 * 修改项目
 * @param {int} id
 * @param {obj} obj
 * @return {int} id
 */
DataCollection.prototype.updateItem = function(id, obj) {
  // may rewrite to be more convincing
  var origin = this.deleteItem(id)[0];
  var tmp = $.extend({update: Date.now()}, obj);
  var after = $.extend(origin, tmp);
  // index of an array and replace maybe;
  this.data.push(after);
  return after.id;
}

/**
 * 删除项目
 * @param {int} id
 * @return {array} itemArr
 */
DataCollection.prototype.deleteItem = function(id) {
  var data = this.data;
  for (var i in data) {
    if (data[i].id == id) {
      var deletedItem = data.splice(i, 1);
      return deletedItem;
    }
  }
}

/**
 * 通过id获取项目
 * @param {int} id
 * @return {array} itemArr
 */
DataCollection.prototype.getItemById = function(id) {
  var data = this.data;
  var result = [];
  for (var i in data) {
    if (data[i].id == id) {
      result.push($.extend(true,{},data[i]));
    }
  }
  return result;
}

/** 
 * 根据属性获取项目
 * @param {str} prop
 * @param {str} value
 * @return {array} itemArr
 */
DataCollection.prototype.getItemsByProperty = function(prop, value) {
  var results = [];
  var data = this.data;
  for (var i in data) {
    if (data[i][prop] == value) {
      results.push($.extend({},data[i]));
    }
  }
  return results;
}

/**
 * 获取数据集中所有项目
 * @return {array} itemArr
 */
DataCollection.prototype.getAll = function() {
  return $.extend(true, [], this.data);
}

/**
 * 通过项目id获取对应项目的值
 * @param {int} id
 * @param {str} key
 * @return {str} value
 */
DataCollection.prototype.getValueById = function(id, key) {
  return this.getItemById(id)[0][key];
}


function ItemCollection() {
  
}

function CategoryCollection() {
  
}

/**
 * 数据控制器构造函数
 * @property {obj} data | 数据集
 * @property {obj} dataJoin | 数据连接设置
 * @property {str} storage | 本地存储键值
 */
function DataController() {
  this.data = {};
  this.dataJoin = {};
  this.storage = "data";
}

/**
 * 为控制器添加数据集
 * @param {str} name
 * @param {obect} obj | instanceof DataCollection
 */
DataController.prototype.dataCollection = function(name, obj) {
  if (obj instanceof DataCollection) {
    this.data[name] = obj;
    this.dataJoin[name] = {};
  }
}

/**
 * 添加项目
 * @param {str} name | 数据集名称
 * @param {str} obj | 项目数据对象
 */
DataController.prototype.addItem = function(name, obj) {
  return this.data[name].addItem(obj);
}

/**
 * 修改项目
 * @param {str} name | 数据集名称
 * @param {int} id | 项目所在数据集id
 * @param {obj} obj | 项目数据对象
 */
DataController.prototype.updateItem = function(name, id, obj) {
  return this.data[name].updateItem(id, obj);
}

/**
 * 删除项目
 * @param {str} name | 数据集名称
 * @param {int} id | 项目所在数据集id
 * @return {array} itemArr | 删除项目数组
 */
DataController.prototype.deleteItem = function(name, id) {
  return this.data[name].deleteItem(id);
}

/**
 * 通过id获取项目
 * @param {str} name | 数据集名称
 * @param {int} id | 项目id
 */
DataController.prototype.getItemById = function(name, id) {
  return this['data'][name].getItemById(id); 
}

/**
 * 根据属性获取项目
 * @param {str} name | 数据集名称
 * @param {str} prop | 属性名称
 * @param {str} value | 属性值
 * @return {array} itemArr | 项目数组
 */
DataController.prototype.getItemsByProperty = function(name, prop, value) {
  return this.data.name.getItemsByProperty(prop, value);
}

/**
 * 数据存档
 */
DataController.prototype.record = function() {
    localStorage.setItem(this.storage, JSON.stringify(this.data));
}

/**
 * 数据集数据连接设置，只允许连接副数据集id
 * @param {str} left | 主数据名称及连接键值 ，name:key
 * @param {str} right | 副连接数据集名称 name
 */
DataController.prototype.addJoin = function(left, right) {
  // left = item.categoryId, right = category;
  var leftPara = left.split(".");
  this.dataJoin[leftPara[0]][leftPara[1]] = right;
}

/**
 * 包含数据连接的数据输出
 * @param {str} name | 数据集名称
 * @param {int} id | 项目id
 * @return {array} outputItemArr | 输出项目数组
 */
DataController.prototype.output = function(name, id) {
  var output = this.getItemById(name, id)[0];
  var joinSettings = this.dataJoin[name];
  for (var key in joinSettings) {
    var para = joinSettings[key];
    var joinObj = this.output(para, output[key])[0];
    delete joinObj[para[1]];
  }
  output = $.extend(output, joinObj);
  return [output];
}

/** 
 * 包含数据连接的数据输出，输出整个数据集
 * @param {str} name | 数据集名称
 * @return {array} outputItemArr | 输出项目数组
 */
DataController.prototype.outputAll = function(name) {
  var output = [];
  var datas = this.data[name].getAll();
  for (var i in datas) {
    var tmp = this.output(name, datas[i].id);
    output = output.concat(tmp);
  }
  return output;
}


/**
 * 包含数据连接的数据输出，输出项目组
 * @param {obj} opts | 参数对象
 * opts: { name: "name", filter: {keyName:valueStr}, order:{key:keyVale, type: 'desc/asc'}}
 : example: {name:'item', filter: {categoryId: 1}, order:{key:date, type: 'desc'}}
 * @output {array} outputItemArr | 输出项目数组
 * note: 考虑修改
 * ----filter的值分为两种情况判断，分别调用_getByProperty, _getByRange两个方法，格式: a,b,c | a:c;
 */
DataController.prototype.query = function(opts) {
  var datas = this.outputAll(opts.name);
  if (opts.filter != undefined) {
    var filters = opts.filter;
    for (var key in filters) {
      if(/^[\w-]:[\w-]$/.test(filters[key])) {
        var beValues = filters[key].split(":");
        datas = _getByRange(datas, key, beValues[0], beValues[1]);
      } else {
        var values = filters[key].split(",");
        var tmp = [];
        for (var i in values) {
          tmp = tmp.concat(_getByProperty(datas, key, values[i]));
        }
        datas = tmp;
      }
    }
  }
  if (opts.order != undefined) {
    datas.sort(function(a, b) {
    switch( opts.order.type) {
      case "asc":
        var ti = "1";
        break;
      case "desc":
      default: 
        var ti = "-1";
    }
    if (a[opts.order.key] < b[opts.order.key]) {
      return -1*ti;
    }
    if (a[opts.order.key] < b[opts.order.key]) {
      return 1*ti;
    }
    // a 和 b 相等
    return 0;
    });
  }
  return datas;
}

/**
 * 通过属性值过滤数组对象
 * @param {array} datas
 * @param {str} property | 过滤的对象属性名称
 * @param {str} value | 匹配的属性名称
 * @return {array} result 
 */
function _getByProperty(datas, property, value) {
  var result = [];
  for (var i in datas) {
    if (datas[i][property] == value) {
      result.push(datas[i]);
    }
  }
  return result;
}

/**
 * 通过区域过滤对象数组
 * @param {array} datas
 * @param {str} property | 过滤的对象属性名称
 * @param {str} bValue | 过滤值下限（包含该值）
 * @param {str} eValue | 过滤值上限（不包含该值）
 * @return {array} result
 */
function _getByRange(datas, property, bValue, eValue) {
  var result = [];
  for (var i in datas) {
    if (datas[i][property] >= bValue && datas[i][property] <= eValue) {
      result.push(datas[i]);  
    }
  }
  return result;
}

/**
 * 通过日期获取对象数组
 * @param {array} datas | 原对象数组
 * @param {str} value | 日期字符串
 * @return {array} result 
 */
function _getByDate(datas, value) {
  var result = [];
  var bDate = new Date(value).getTime();
  var eDate = bDate + 24*60*60*1000;
  return _getByRange(datas, "date", bDate, eDate);
}

/** 
 * 通过月份获取对象数组
 * @param {array} datas | 原对象数组
 * @param {str} value | 月份，格式： "yyyy-MM"
 * @return {array} result | 对象数组
 */
function _getByMonth(datas, value) {
  var result = [];
  var atoms = value.split("-");
  if (atoms[1] == 12) {
    atoms[0]++;
    atoms[1] = "01";
  } else {
    atoms[1]++;  
  }
  var bDate = new Date(value).getTime();
  var eDate = new Date(atoms.join("-")).getTime();
  
  return _getByRange(datas, "date", bDate, eDate);
}


