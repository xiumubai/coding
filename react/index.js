const [count, setCount] = useState(0)
const onClick = () => {
  setCount(count + 1)
  console.log(count);
  setTimeout(() => {
    console.log(count);
  }, 1000)
}