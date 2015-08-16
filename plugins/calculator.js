(function ($) {
  $.fn.calculator = function (opts) {
    function Controller() {
      var $el = $(this);
      $el.html(numdisplay + keyboard);
      $el.keyboard = $('.calc-keyboard', $el);
      $el.record = $('.calc-record', $el);
      $el.calculator = new Calculator();
      if (opts.display != undefined) {
        $el.display = $(opts.display);
      } else {
        $el.display = $('<input />').insertBefore(this.record);
      }

      if (opts.theme != undefined) {
        $el.addClass(opts.theme); //添加键盘样式
      }

      var current = "";
      $($el.keyboard).on('tap','td', function () { 
        var code = $(this).text().trim(); //键盘按键获取
        if (isNaN(code)) {
          switch (code) {
          case '.':
            if (current.indexOf('.') > 0) {
              return false;
            } else if (current == ""){
              current += "0.";
            } else {
              current += ".";  
            }
            break;
          case 'C':
            //重置按钮
            if (current != "") {
              current = "";
              $el.display[0].value = current;
            } else {
              $el.display[0].value = current;
              $el.calculator.init();
            }
            break;
          case '<':
            //退格
            if (current == "") {
              return false;  
            } else {
              current = current.substr(0, current.length-1);
              $el.display[0].value = current;
            }
            break;
          case '+':
          case '-':
          case '*':
          case "/":
          case '=':
            if (current != "") {
              $el.calculator.insert(current, code);
              current = "";
              $el.display[0].value = $el.calculator.calc();
            } else if (current =="") {
              $el.calculator.updateOperator(code);  
            }
            break;
          default:;
          }
        } else {
          if ($el.calculator.status == "new") {
            $el.calculator.init();
          }
          current += code;  
          $el.display[0].value = current;
        }
        
        $el.record.text(($el.calculator.record) + current);
        
      });
      
      $(document).on('tap',function(e) {
        if(!$(e.target).parents('.calculator_wrap').length ) {
          if (!$el.hasClass('collpased')){
            if (current != "") {
              $el.calculator.insert(current, "=");
              current = "";
              $el.display[0].value = $el.calculator.calc();
            }
            $el.addClass('collapsed');  
          }
        }
        
      });
    }
    
    function Calculator() {
      this.init();
    }
    
    Calculator.prototype.calc = function() {
      var equation = this.record;
      switch(this.preOperator) {
        case "-":
          this.result -= Number(this.operand);
          break;
        case "+":
          this.result += Number(this.operand);
          break;
        default:
          this.result = Number(this.operand);
      }
      return this.result;
    }
    
    Calculator.prototype.insert = function(number, code) {
      if (code == "=") {
        this.status = "new";
      } else {
        this.status = "input";
      }
      this.preOperator = this.operator;
      this.operator = code;
      this.operand = number;
      this.record += number + code;
    }
    
    Calculator.prototype.updateOperator = function(code) {
      this.operator= code;
      this.record = this.record.substr(0, this.record.length-1) + code;
    }
    
    Calculator.prototype.init = function() {
      this.record = "";
      this.result = 0;
      this.operator = "";
      this.preOperator = "";
      this.operand = "";
    }

    var keyboard =
      '<table class="calc-keyboard">' +
      '<tr>' +
      '<td>7</td>' +
      '<td>8</td>' +
      '<td>9</td>' +
      '<td class="backspace operation"><</td>' +
      '<tr/></tr>' +
      '<td>4</td>' +
      '<td>5</td>' +
      '<td>6</td>' +
      '<td class="plus operation">+</span>' +
      '<tr/></tr>' +
      '<td>1</td>' +
      '<td>2</td>' +
      '<td>3</td>' +
      '<td class="minus operation">-</td>' +
      '<tr/></tr>' +
      '<td class="clear operation">C</td>' +
      '<td>0</td>' +
      '<td class="point operation">.</td>' +
      '<td class="equal operation">=</td>' +
      '</table>';
    var numdisplay =
      '<div class="calc-record">' +
      '</div>';
    
    //加减乘除的方法
    var count = {
      '+': function (a, b) {
        return accAdd(a, b);
      },
      '-': function (a, b) {
        return accSub(a, b);
      },
      '*': function (a, b) {
        return accMul(a, b);
      },
      '/': function (a, b) {
        return accDiv(a, b);
      }
    }

    this.each(function () {
      Controller.call(this, opts);
    });
    
    return this;
  };
})(Zepto);