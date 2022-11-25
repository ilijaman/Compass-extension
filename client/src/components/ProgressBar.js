import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from  'react-bootstrap/Button';


function WithLabelExample({ todos }) {

  let now = todos.length

  function ButtonIncrement() {
    if (todos) {
      now += 1
    }
  }
  return (
    <div>
      <ProgressBar now={now} label={`${now}%`} />;
      {todos && <Button onClick={ButtonIncrement} />}
    </div>
  )
}

export default WithLabelExample;