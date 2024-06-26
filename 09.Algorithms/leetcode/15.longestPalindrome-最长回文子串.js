/**
 * @description: 最长回文子串
 * @docs https://leetcode.cn/problems/longest-palindromic-substring/description/
 * @param {*} s
 * @returns {*}
 */
function longestPalindrome(s) {
  if (s.length === 0) return "";

  let start = 0, end = 0;

  for (let i = 0; i < s.length; i++) {
      const len1 = expandAroundCenter(s, i, i); // 奇数长度的回文子串
      const len2 = expandAroundCenter(s, i, i + 1); // 偶数长度的回文子串
      const len = Math.max(len1, len2);

      if (len > end - start) {
          start = i - Math.floor((len - 1) / 2);
          end = i + Math.floor(len / 2);
      }
  }

  return s.substring(start, end + 1);
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
  }
  return right - left - 1;
}

// 测试最长回文子串算法
const testString = "babad";
console.log("输入字符串:", testString);
const result = longestPalindrome(testString);
console.log("最长回文子串:", result);

// 时间复杂度为 O(n²)
// 空间复杂度为 O(1)