import axios from 'axios'
async function handleSubmit(body) {
  // event.preventDefault();
  const res = await axios.post('http://localhost:3000/post', body)
  console.log(res.status, res.data)
}
export default handleSubmit
