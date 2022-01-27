import Options from './Options'
import './Template.css'

const Template = (props) => {
  const { state } = props
  //   console.log(state)
  return (
    <div className="template">
      <div className="formcontainer">
        <h1 className="templatename">
          {state.field.length > 0 ? state.template_name : 'Nothing Here!'}
        </h1>

        {state &&
          state.field.map((obj) => {
            return (
              <div>
                {' '}
                <Options id={obj.id} type={obj.type} label={obj.label} />{' '}
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default Template
