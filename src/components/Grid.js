import '../styles/Grid.css'
import Cell from './Cell'
import useWindowDimensions from './useWindowDimensions'


function Grid({snakeBody, target, gridDimenssion}) {

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  let gridWidth ;
  const gridCells = [];
    if(windowWidth > 768) gridWidth = '100vh'
    else  if(windowWidth > windowHeight*0.8) gridWidth = windowHeight*0.8
          else gridWidth = windowWidth;
  const style={ 
    gridTemplate: 'repeat('+gridDimenssion+', 1fr) / repeat('+gridDimenssion+', 1fr)',
    width: gridWidth
  }

  //This loop creatall the grid cells and push them to the Array
    for(let i = 1; i <= gridDimenssion; i++)
      for(let j = 1; j <= gridDimenssion ; j++)
        gridCells.push(
          <Cell
            key = {'snakeGridCell'+i+'x'+j}
            i={i}
            j={j}
            snakeBody= {snakeBody}
            target = {target}
          />
        );

  return (
    <div 
      className='snakeGrid' 
      style={style}
    >
      {gridCells}
    </div>
  );
}

export default Grid
