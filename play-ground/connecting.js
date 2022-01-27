const Options = (props) => {
  return (
    <>
      {/* <label>{props.label}</label> */}
      {props.type === 'text' ? (
        <TextField
          fullWidth
          id={props.id}
          label={props.label}
          variant="outlined"
        />
      ) : null}
      {props.type === 'text-area' ? (
        <TextField
          fullWidth
          multiline={true}
          rows={4}
          id={props.id}
          label={props.label}
          variant="outlined"
        />
      ) : null}
      {props.type === 'numbers' ? (
        <TextField
          fullWidth
          type={'number'}
          id={props.id}
          label={props.label}
          variant="outlined"
        />
      ) : null}
      {props.type === 'drop-down' ? (
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">{props.label}</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            label={props.label}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      ) : null}
      {props.type === 'radio-button' ? (
        <FormControl>
          <FormLabel id="group-label">{props.label}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      ) : null}
      {props.type === 'check-box' ? (
        <FormControl>
          <FormLabel id="checkbox-group-label">{props.label}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="checkbox-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Frontend"
              control={<Checkbox />}
              label="Frontend"
            />
            <FormControlLabel
              value="Backend"
              control={<Checkbox />}
              label="Backend"
            />
          </RadioGroup>
        </FormControl>
      ) : null}
      {props.type === 'toggle-button' ? (
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label={props.label}
          />
        </FormGroup>
      ) : null}
      {props.type === 'date-time' ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
          />
        </LocalizationProvider>
      ) : null}
      {props.type === 'rich-text' ? <h1>hello</h1> : null}
      {props.type === 'image' ? <h1>hello</h1> : null}

      <br />
      <br />
    </>
  )
}

export default Options
