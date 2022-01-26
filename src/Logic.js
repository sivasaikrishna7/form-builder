let dummy1 = {
  template_name: 'name',
  field: [
    {
      id: '4',
      type: 'text',
      label: 'enter age',
      placeholder: 'enter age',
    },
  ],
}

async function handleSubmit(formData) {
  console.log(formData)
  console.log('works?')
  let url = `http://localhost:8000/post`
  let res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
      // 'Allow-Control-Allow-Origin': '*',
      // 'Credentials': 'same-origin',
    },
  })
    .then((response) => {
      console.log('sending from front', response.json())
    })
    .catch((error) => {
      console.log(error)
    })
}
export default handleSubmit
