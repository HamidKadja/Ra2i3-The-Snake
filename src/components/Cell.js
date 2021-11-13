import '../styles/Cell.css'

function Cell({i,j,snakeBody, target}){

    // This function Checks if the cell is part of the snakes body. it returns a red sell if true 
    if ( snakeBody.some( cell => cell.i === i && cell.j === j ) )
        return( <div className='cell snakeBody' ></div> )

    // This function Checks if the cell is a target. it returns a blue sell if true 
    else if(target.i === i && target.j === j)
        return(
            <div className='cell target' ></div>
        )
        // returns a ordinary sell if true 
        else
            return(
                <div className='cell' ></div>
            )
}

export default Cell
