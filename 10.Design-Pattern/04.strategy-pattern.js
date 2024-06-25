// 策略模式

// 来看一个具体的例子，某个电商网站，通过打折促销来销售库存物品，有的商品满 100 减 30，有的商品满 200 减 80，有的商品直接 8 折出售，这样的逻辑该去实现呢。



// 1.基础实现
function priceCalculate(discountType, price) {
  if (discountType === 'minus100_30') {   		// 满100减30
      return price - Math.floor(price / 100) * 30
  }
  else if (discountType === 'minus200_80') {  // 满200减80
      return price - Math.floor(price / 200) * 80
  }
  else if (discountType === 'percent80') {    // 8折
      return price * 0.8
  }
}
priceCalculate('minus100_30', 270)    // 输出: 210
priceCalculate('percent80', 250)      // 输出: 200

// 2.策略模式的实现
const DiscountMap = {
  minus100_30: function(price) {
      return price - Math.floor(price / 100) * 30
  },
  minus200_80: function(price) {
      return price - Math.floor(price / 200) * 80
  },
  percent80: function(price) {
      return price * 0.8
  }
}

DiscountMap.minus150_40 = function(price) {
  return price - Math.floor(price / 150) * 40
}

// 3.使用闭包模式进行封装
const PriceCalculate = (function() {
  /* 售价计算方式 */
  const DiscountMap = {
      minus100_30: function(price) {      // 满100减30
          return price - Math.floor(price / 100) * 30
      },
      minus200_80: function(price) {      // 满200减80
          return price - Math.floor(price / 200) * 80
      },
      percent80: function(price) {        // 8折
          return price * 0.8
      }
  }
  
  return {
      priceClac: function(discountType, price) {
          return DiscountMap[discountType] && DiscountMap[discountType](price)
      },
      addStrategy: function(discountType, fn) {		// 注册新计算方式
          if (DiscountMap[discountType]) return
          DiscountMap[discountType] = fn
      }
  }
})()

PriceCalculate.priceClac('minus100_30', 270)	// 输出: 210
PriceCalculate.addStrategy('minus150_40', function(price) {
  return price - Math.floor(price / 150) * 40
})
PriceCalculate.priceClac('minus150_40', 270)	// 输出: 230


// 4.通用的策略模式

const StrategyMap = {}
function context(type, ...rest) {
    return StrategyMap[type] && StrategyMap[type](...rest)
}
StrategyMap.minus100_30 = function(price) { 
  	return price - Math.floor(price / 100) * 30
}
context('minus100_30', 270)			// 输出: 210
