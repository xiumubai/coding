// const array1 = [1, 2, 3, 4, 5];
// const array2 = [3, 4, 5, 6, 7];


const array1 = [1, 2, 3, 3, 4, 5];
const array2 = [3, 3, 4, 5, 6, 7, 8];
[3, 3, 4, 5]

// [3, 4, 5]

function sameArray(nums1, nums2) {
  let nums = []

  for (let i = 0; i < nums1.length; i++) {
    if (nums2.includes(nums1[i])) {
      // if(!nums.includes(nums1[i])) {
      //   nums.push(nums1[i])
      // }
      nums.push(nums1[i])
    }
  }
  return nums
}

const result = sameArray(array1, array2)
console.log(result);
