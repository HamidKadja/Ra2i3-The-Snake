import '../styles/PhoneButtons.css'

function PhoneButtons({changeSnakeDirection}){

    return(
        <div className='PhoneButtons'>
            <div></div>
            <div 
                className='PhoneButtons_arrowButton'
                onClick ={()=> {changeSnakeDirection(38)}}
            > 
                <span className='PhoneButtons_arrowButton_arrow'>&#8593;</span> 
            </div>
            <div></div>
            <div 
                className='PhoneButtons_arrowButton'
                onClick ={()=> {changeSnakeDirection(37)}}
            > 
                <span className='PhoneButtons_arrowButton_arrow'>&#8592;</span> 
            </div>
            <div></div>
            <div 
                className='PhoneButtons_arrowButton'
                onClick ={()=> {changeSnakeDirection(39)}}
            > 
                <span className='PhoneButtons_arrowButton_arrow'>&#8594;</span>
            </div>
            <div></div>
            <div 
                className='PhoneButtons_arrowButton'
                onClick ={()=> {changeSnakeDirection(40)}}
            > 
                <span className='PhoneButtons_arrowButton_arrow'>&#8595;</span> 
            </div>
            <div></div>
        </div>
    )
}

export default PhoneButtons;
