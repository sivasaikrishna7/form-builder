import Options from './Pages/Options'

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

async function handleSubmit(state) {
  console.log(state)
  console.log('works?')
  let url = `http://localhost:8000/post`
  let res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(state),
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'Center',

        color: 'black',
      }}
    >
      <h1>In the renderer</h1>
      <h1>{state.template_name}</h1>
      {state.field.map((obj) => {
        return <Options id={obj.id} type={obj.type} label={obj.label} />
      })}
    </div>
  )
}
export default handleSubmit
