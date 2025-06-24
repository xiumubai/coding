/**
 * LeetCode 第 11 题: 盛最多水的容器
 *
 * 题目描述:
 * 给定一个长度为 n 的整数数组 height。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。
 * 注意：你不能倾斜容器。
 *
 * 算法解释:
 * 问题要求我们找到两条线，它们能容纳最多的水。水量由两条线中较短的那条（高度）和它们之间的距离（宽度）决定。
 * 面积 = min(height[i], height[j]) * (j - i)。
 *
 * 我们可以使用双指针方法来高效地解决这个问题。
 * 1. 初始化两个指针，`left` 指向数组的开头（索引 0），`right` 指向数组的末尾（索引 n-1）。
 * 2. 初始化一个变量 `maxWater` 为 0，用于存储目前找到的最大面积。
 * 3. 只要 `left` 小于 `right`，就循环：
 *    a. 计算当前的高度 `h`，值为 `height[left]` 和 `height[right]` 中的较小者。
 *    b. 计算当前的宽度 `w`，值为 `right - left`。
 *    c. 计算当前的水量：`currentWater = h * w`。
 *    d. 更新 `maxWater = Math.max(maxWater, currentWater)`。
 *    e. 现在，我们需要决定移动哪个指针。为了最大化面积，我们希望找到一条更高的线。
 *       如果我们移动指向较高线的指针，宽度会减小，高度可能会减小或保持不变（如果新线更短或相等）。这不能保证面积更大。
 *       然而，如果我们移动指向较短线的指针，那边有可能找到一条更高的线，这可能会增加容器的高度，
 *       从而即使宽度减小也可能增加面积。
 *       所以，如果 `height[left] < height[right]`，则 `left` 右移。
 *       否则（如果 `height[left] >= height[right]`），则 `right` 左移。
 * 4. 循环结束后，`maxWater` 将保存可能的最大面积。
 *
 * 时间复杂度: O(n)
 * - 双指针 `left` 和 `right` 最多遍历数组一次。每一步中，`left` 或 `right` 都会移动。
 *
 * 空间复杂度: O(1)
 * - 我们只使用了几个变量来存储指针和最大水量，所以使用的空间是常数级的。
 *
 * @param {number[]} height 高度数组
 * @return {number} 最大水量
 */
var maxArea = function(height) {
    let maxWater = 0; // 初始化最大水量为 0
    let left = 0; // 左指针，从数组头部开始
    let right = height.length - 1; // 右指针，从数组尾部开始

    while (left < right) { // 当左指针在右指针左侧时，继续循环
        // 计算容器的高度（由较短的线决定）
        const h = Math.min(height[left], height[right]);
        // 计算容器的宽度
        const w = right - left;
        // 计算当前水量
        const currentWater = h * w;
        // 更新目前为止发现的最大水量
        maxWater = Math.max(maxWater, currentWater);

        // 将指向较短线的指针向内移动。
        // 这是因为移动指向较长线的指针向内，总是会导致面积变小或相等
        // （宽度减小，高度受限于较短线或新的更短线）。
        // 移动指向较短线的指针，则有机会找到一条更高的线，从而可能增加面积。
        if (height[left] < height[right]) {
            left++; // 左边线较短，左指针右移
        } else {
            // 如果两条线高度相等，移动哪个指针都可以。
            // 这里我们选择右移 `right`，但 `left++` 也可以。
            right--; // 右边线较短或与左边线相等，右指针左移
        }
    }

    return maxWater; // 返回计算出的最大水量
};

// 测试用例
console.log("测试用例 1:");
const height1 = [1,8,6,2,5,4,8,3,7];
console.log("输入:", height1);
console.log("预期输出: 49");
console.log("实际输出:", maxArea(height1)); // 预期: 49
console.log("--------------------");

console.log("测试用例 2:");
const height2 = [1,1];
console.log("输入:", height2);
console.log("预期输出: 1");
console.log("实际输出:", maxArea(height2)); // 预期: 1
console.log("--------------------");

console.log("测试用例 3:");
const height3 = [4,3,2,1,4];
console.log("输入:", height3);
console.log("预期输出: 16");
console.log("实际输出:", maxArea(height3)); // 预期: 16
console.log("--------------------");

console.log("测试用例 4:");
const height4 = [1,2,1];
console.log("输入:", height4);
console.log("预期输出: 2");
console.log("实际输出:", maxArea(height4)); // 预期: 2
console.log("--------------------");

console.log("测试用例 5 (空数组 - 尽管题目约束通常指明 n >= 2):");
const height5 = [];
console.log("输入:", height5);
console.log("预期输出: 0");
console.log("实际输出:", maxArea(height5)); // 预期: 0
console.log("--------------------");

console.log("测试用例 6 (两个元素):");
const height6 = [2,5];
console.log("输入:", height6);
console.log("预期输出: 2");
console.log("实际输出:", maxArea(height6)); // 预期: 2
console.log("--------------------");

console.log("测试用例 7 (降序高度):");
const height7 = [7,6,5,4,3,2,1];
console.log("输入:", height7);
// 对于 [7,6,5,4,3,2,1]：
// L=0,R=6; h[0]=7,h[6]=1。面积=min(7,1)*(6-0)=1*6=6。maxWater=6。R--。
// L=0,R=5; h[0]=7,h[5]=2。面积=min(7,2)*(5-0)=2*5=10。maxWater=10。R--。
// L=0,R=4; h[0]=7,h[4]=3。面积=min(7,3)*(4-0)=3*4=12。maxWater=12。R--。
// L=0,R=3; h[0]=7,h[3]=4。面积=min(7,4)*(3-0)=4*3=12。maxWater=12。R--。
// L=0,R=2; h[0]=7,h[2]=5。面积=min(7,5)*(2-0)=5*2=10。maxWater=12。R--。
// L=0,R=1; h[0]=7,h[1]=6。面积=min(7,6)*(1-0)=6*1=6。maxWater=12。R--。
// 循环结束。
console.log("预期输出: 12");
console.log("实际输出:", maxArea(height7));
console.log("--------------------");

console.log("测试用例 8 (升序高度):");
const height8 = [1,2,3,4,5,6,7];
console.log("输入:", height8);
// 对于 [1,2,3,4,5,6,7]：
// L=0,R=6; h[0]=1,h[6]=7。面积=min(1,7)*(6-0)=1*6=6。maxWater=6。L++。
// L=1,R=6; h[1]=2,h[6]=7。面积=min(2,7)*(6-1)=2*5=10。maxWater=10。L++。
// L=2,R=6; h[2]=3,h[6]=7。面积=min(3,7)*(6-2)=3*4=12。maxWater=12。L++。
// L=3,R=6; h[3]=4,h[6]=7。面积=min(4,7)*(6-3)=4*3=12。maxWater=12。L++。
// L=4,R=6; h[4]=5,h[6]=7。面积=min(5,7)*(6-4)=5*2=10。maxWater=12。L++。
// L=5,R=6; h[5]=6,h[6]=7。面积=min(6,7)*(6-5)=6*1=6。maxWater=12。L++。
// 循环结束。
console.log("预期输出: 12");
console.log("实际输出:", maxArea(height8));
console.log("--------------------");
