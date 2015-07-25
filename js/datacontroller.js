/**
 * DataCollection 
 * addItem;
 * updateItem;
 * deleteItem;
 * createItem;
 * getItemById;
 * getItemsByProprety;
 * getAll
 * getValueById;  // for specific key value
 * 
 */

function DataCollection(obj) {
  this.data = obj.data;
  this.accumulator = obj.accumulator;
  this.pointer = 0;
}

DataCollection.prototype.addItem = function(obj) {
  var tmp = $.extend({id: ++this.accumulator, update: Date.now(), date: Date.now()}, obj);
  this.data.push(tmp);
  return tmp.id;
}

DataCollection.prototype.updateItem = function(id, obj) {
  var origin = this.getItemById(id)[0];
  var tmp = $.extend({update: Date.now()}, obj);
  var after = $.extend(origin, tmp);
  // index of an array and replace maybe;
  this.deleteItem(id);
  this.data.push(after);
}

DataCollection.prototype.deleteItem = function(id) {
  var data = this.data;
  for (var i in data) {
    if (data[i].id == id) {
      data.splice(i, 1);
      break;
    }
  }
}

DataCollection.prototype.getItemById = function(id) {
  var data = this.data;
  var result = [];
  for (var i in data) {
    console.log(data[i]);
    if (data[i].id == id) {
      console.log(data[i]);
      result.push($.extend(true,{},data[i]));
    }
  }
  return result;
}

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

DataCollection.prototype.getAll = function() {
  return $.extend(true, [], this.data);
}

DataCollection.prototype.getValueById = function(id, key) {
  return this.getItemById(id)[0][key];
}


function ItemCollection() {
  
}

function categoryCollection() {
  
}

/**
 * Manipulate multiple data collection together and provide customized output;
 * 
 */
function DataController() {
  this.data = {};
  this.dataJoin = {};
  
}

DataController.prototype.dataCollection = function(name, obj) {
  if (obj instanceof DataCollection) {
    this.data[name] = obj;
    this.dataJoin[name] = {};
  }
}

DataController.prototype.addItem = function(name, obj) {
  return this.data[name].addItem(obj);
}

DataController.prototype.updateItem = function(name, id, obj) {
  return this.data[name].updateItem(obj);
}

DataController.prototype.deleteItem = function(name, id) {
  return this.data[name].deleteItem(id);
}

DataController.prototype.getItemById = function(name, id) {
  return this.data[name].getItemById(id); 
}

DataController.prototype.getItemsByProperty = function(name, prop, value) {
  return this.data.name.getItemsByProperty(prop, value);
}

DataController.prototype.record = function() {
    localStorage.setItem('pocketData', JSON.stringify(this.data));
}

DataController.prototype.addJoin = function(left, right) {
  // left = item.categoryId, right = category.id;
  var leftPara = left.split(".");
  this.dataJoin[leftPara[0]][leftPara[1]] = [].push(right);
}

DataController.prototype.generateOutput = function(name, obj) {
  var output = {};
  var joinSettings = this.dataJoin[name];
  for (var key in joinSettings) {
    //
    var para = joinSettings[key].split('.');
    var joinObj = this.generateOutput(this.getItemsByProperty(para[0],para[1],obj[key]));
    delete joinObj[para[1]];
  }
}

DataController.prototype.outputAll = function(str) {

}

DataController.prototype.outputItem = function(id) {
  
}

DataController.prototype.outputGroup = function(str) {
  
}

function _customDateString(obj, format) {
  // to-be-done: some regexp need to match the format
  var tmpStr = obj.toLocaleString();
  return obj.toLocaleDateString();
}