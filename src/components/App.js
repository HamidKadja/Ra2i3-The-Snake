
//---This Componenet containes the state of the app which containes the location of the snake---//

import '../styles/App.css';
import Grid from './Grid';
import { useState, useRef} from 'react'
import Modal from 'react-modal'
import PhoneButtons from './PhoneButtons'
import useInterval from './useInterval'

//-----Componant Variables-----//
  let gridDimenssionToDisplay = {10:'Small', 15:'Medium', 20:'Large'}
  let snakeDirection = 'right'; //this variable indicate the direction the snake is taking
  let canChangeDirection = true; //this variable indicate if we can change the direction the snake is taking
  let score = 0;
//-----Componant Variables-----//

Modal.setAppElement('#root'); //don't know what this does but its needed for the modal

function App() {

  //-----Componant States//-----//
    const [delay] = useState(450);  // This set the dalay of useInterval function at line 51
    const [isRunning, setIsRunning] = useState(false); // this pauses the game
    const [gridDimenssion, setGridDimenssion] = useState(20) // this sets the dimenssions ofthe Grid
    const [snakeBody, updateSnakeBody] = useState([{i:Math.floor(gridDimenssion/2),j:1}]);//This is the state variable, it containes the current position the snake
    const [target, setTarget] = useState( { i : getRndInteger(1,gridDimenssion), j : getRndInteger(1,gridDimenssion) } ) //this is the random location of the target
    const [modalIsOpen, setModalIsOpen] = useState(true); //This shows the modal or not
    const [livle, setLivel] = useState(5); //this sets the livle (speed) of the game
    const gridRef = useRef();
    const modalRef = useRef();
  //-----Componant States-----//
  
  //-----Componant Functions-----//
  
    //Returns a random integer
      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }

      function settingNewSnakeHead(newSnakeHead, snakeDirection){
        switch(snakeDirection){//Setting the new position of the new first cell of the snake
          case 'right': 
            newSnakeHead.j++
          break;
          case 'left': 
            newSnakeHead.j--
          break;
          case 'up': 
            newSnakeHead.i--
          break;
          case 'down': 
            newSnakeHead.i++
          break;
          default:
        }
      }

      function ifSnakeAteTarget(newSnakeHead, newSnakeBody){
        if(newSnakeHead.i === target.i && newSnakeHead.j === target.j){ //Test if the snake ate the target 
          newSnakeBody.push(target); // add a new cell to the snakeBody ps: the same cell as the target
          setTarget({ i : getRndInteger(1,gridDimenssion+1), j : getRndInteger(1,gridDimenssion+1) }); // Change the target location
          score = score+livle; // Add a point to the score
        }
      }

    // This function test if the new snake head is allowed ( if party is over )
    // this dunctioin returns true if the party is over
      function testIfpartyIsOver(newSnakeHead){
        //Check if the snake hit the wall or hit it self
        if(newSnakeHead.j === gridDimenssion+1 || newSnakeHead.j === 0 || newSnakeHead.i === gridDimenssion+1 || newSnakeHead.i === 0 || 
          snakeBody.some(cell => cell.i === newSnakeHead.i && cell.j === newSnakeHead.j)){
          setIsRunning(false); //Pause the game
          setModalIsOpen(true);
          modalRef.current.focus(); // This put the focus on the modal so that it can read KeyDown event
          return true
        }else 
          return false
      }

    //This function moves the snake
    //Set useInterval is called every second
      useInterval(() => {
        let newSnakeBody = [...snakeBody];//copy the current position of the snake
        let newSnakeHead = {...newSnakeBody[newSnakeBody.length-1]}; // copy the current position of the first cell of the snake
        
        settingNewSnakeHead(newSnakeHead, snakeDirection);
          
        ifSnakeAteTarget(newSnakeHead, newSnakeBody);

        if(testIfpartyIsOver(newSnakeHead)){ //Test if the new snake head location is allowed ( if party is over )
          return newSnakeBody // If party is over we return the snake without the new location
        }
        else{
          newSnakeBody.push(newSnakeHead); // add the new first position of the snake
          newSnakeBody.shift(); // delete the last position of the snake
          canChangeDirection = true; // accepting direction change
          updateSnakeBody(newSnakeBody);
        }
        
      }, isRunning ? delay/livle : null);
      
      function changeSnakeDirection(newDirection){
        if(canChangeDirection === true){ 
          switch(newDirection){
            case 37: // If we pressed left
              console.log(snakeDirection)
              if(snakeDirection === 'up' || snakeDirection === 'down')
              snakeDirection = 'left';
              break;
            case 38: // If we pressed up
              if(snakeDirection === 'left' || snakeDirection === 'right')
              snakeDirection = 'up';
              break;
            case 39: // If we pressed right
              if(snakeDirection === 'up' || snakeDirection === 'down')
              snakeDirection = 'right';
              break;
            case 40: // If we pressed down
              if(snakeDirection === 'left' || snakeDirection === 'right')
              snakeDirection = 'down';
              break;
            default:
          }
          canChangeDirection = false; // refusing further direction change, until the direction is changed
        }
      }

    //this function Start The Game
      function startGame(){
        setIsRunning(true); 
        setModalIsOpen(false); 
        updateSnakeBody([{i:Math.floor(gridDimenssion/2),j:1}]);
        setTarget({ i : getRndInteger(1,gridDimenssion+1), j : getRndInteger(1,gridDimenssion+1) }); // Change the target location
        snakeDirection = 'right';
        score = 0;
        gridRef.current.focus();
      }
  //-----Componant Functions-----//

  return (
    <div className='mainDiv'> 
      <div
        onKeyDown = {(e) => changeSnakeDirection(e.keyCode)}
        tabIndex = "0"
        ref={gridRef}  
      >
        <Grid
          snakeBody = {snakeBody}
          target = {target}
          gridDimenssion={gridDimenssion}
          
        />
      </div>
      
      <PhoneButtons
        changeSnakeDirection={changeSnakeDirection} 
      />

      <Modal 
        isOpen = {modalIsOpen} 
        onRequestClose = {() => startGame()}  
        className = "modal"
        overlayClassName = "Overlay"
      >
        <div 
          ref={modalRef}
          onKeyDown = {(e) => {if(e.keyCode === 13 || e.keyCode === 32) startGame()}}
          tabIndex = "0"
          className = "modalMain"
        >
          <h1 className="modal_title"> Ra2i3 the Snake</h1>
          <div className="modal_flex">
            <div className="modal_flex_element">
              <h2 className="modal_flex_element_text"> Level : <span className="livel" >{livle}</span></h2>
                <div className="modal_flex_element_flex">
                  <button className="modal_flex_element_flex_button" onClick={() => { if(livle !== 1) setLivel(livle-1)}}> - </button>
                  <button className="modal_flex_element_flex_button" onClick={() => { if(livle !== 9) setLivel(livle+1)}}>+</button>
                </div>
            </div>
            <div className="modal_flex_element">
              <h2 className="modal_flex_element_text"> Size : <span className="size" >{gridDimenssionToDisplay[gridDimenssion]}</span></h2>
                <div className="modal_flex_element_flex">
                  <button className="modal_flex_element_flex_button" onClick={() => {if(gridDimenssion === 10) setGridDimenssion(20); else setGridDimenssion(gridDimenssion-5) }}> - </button>
                  <button className="modal_flex_element_flex_button" onClick={() => {if(gridDimenssion === 20) setGridDimenssion(10); else setGridDimenssion(gridDimenssion+5) }}>+</button>
                </div>
            </div>
          </div>
          <button 
            className="modal_go_button" 
            onClick={() => {startGame()}}>

            Go!!!

          </button>
          <p className="modal_score"> Your Score is {score} </p>
        </div>
      </Modal>
      
    </div>
  );
}

export default App;
