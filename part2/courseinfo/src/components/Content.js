import Part from './Part'

const Content = ({ parts }) => {

  const initialValue = 0;
  const total = parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises
  }, initialValue)

  return (
  <div>
    {parts.map(part => 
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    )}
    <strong>total of {total} exercises</strong>
  </div>
  )
}

export default Content