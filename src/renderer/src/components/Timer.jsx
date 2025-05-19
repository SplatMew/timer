import React, { use, useEffect } from 'react'
import { useState } from 'react'
import InputField from './inputField'
//import alarm1 from '../assets/sounds/alarm1.mp3'
//import alarm2 from '../assets/sounds/alarm2.mp3'
import alarm3 from '../assets/sounds/audio3.mp3'

export default function Timer({ isOverlay }) {

  //Count parameters
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [hours, setHours] = useState(0)

  //control parameters
  const [isEditing, setIsEditing] = useState(true)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [isPomodoro, setIsPomodoro] = useState(false)
  const [isSelecting, setIsSelecting] = useState(true)

  //break parameters
  const [pomoBreak, setPomoBreak] = useState(false) 
  const [breakCounter, setBreakCounter] = useState(0)

  //saved numbers
  const [savedMinutes, setSavedMinutes] = useState(0)
  const [savedSeconds, setSavedSeconds] = useState(0)
  const [savedHours, setsavedHours] = useState(0)

  //audio
  const audio = new Audio(alarm3)

  const handleStop = () => {
    setIsCountingDown(false)
    setMinutes(savedMinutes)
    setHours(savedHours)
    setSeconds(savedSeconds)
  }

  const handleGoBack = () => {
    setIsSelecting(true);
    setIsPomodoro(false);
    setMinutes(0);
    //setSeconds(0);
    setSavedMinutes(0);
    //setSavedSeconds(0);
    setPomoBreak(false);
    setBreakCounter(0);
  }

  const handlePomodoro = () => {
    setIsPomodoro(true);
    setIsSelecting(false);
    setMinutes(1);
    setSeconds(0);
    setSavedMinutes(25);
    setSavedSeconds(0);
  }

function handleBreak(){
    if(isPomodoro === true){

              setPomoBreak(!pomoBreak)
              
              if( breakCounter < 3){
                setMinutes(5);
                setSavedMinutes(5);
                setBreakCounter(prev=> prev+1);

              }else{
                setMinutes(15);
                setSavedMinutes(15);
                setBreakCounter(0);
              }

              if(pomoBreak === true){
                setMinutes(25)
                setSavedMinutes(25)
              }
            }
    
  }

  useEffect(() => {
    let intervalId
    if (isCountingDown) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else {
          if (minutes === 0 && hours === 0) {
            //audio
            audio.play()
            clearInterval(intervalId)
            setIsCountingDown(false)

            handleBreak();
          } else {
            if (minutes === 0) {
              setHours((hours) => hours - 1)
              setMinutes(59)
            } else {
              setMinutes((minutes) => minutes - 1)
            }
            setSeconds(59)
          }
        }
      }, 1000)
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [isCountingDown, hours, minutes, seconds])

  return (
    <div>
      {!isSelecting ? (
        <>
          {isPomodoro ? (
            <>
              {/*Pomodoro Mode*/}
              <div>
                
                <div className="flex flex-col items-center justify-center">
                  {pomoBreak ? (<h1 className='text-slate-200 text-lg'>Take a Break!</h1>):(<h1 className='text-slate-200 text-lg'>Time to Focus!</h1>)}

                  <h1 className=" text-6xl text-slate-200">
                    {' '}
                    {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                  </h1>
                  
                </div>
                <div id="timer-button" className="flex justify-center text-slate-300 text-4xl ">
                  {isCountingDown ? (
                    <>
                      <button
                        className={!isOverlay ? 'm-2 hover:text-slate-50' : 'hidden'}
                        onClick={() => setIsCountingDown(false)}
                      >
                        &#10074;&#10074;
                      </button>
                      <button
                        className={!isOverlay ? 'm-2 hover:text-slate-50' : 'hidden'}
                        onClick={handleStop}
                      >
                        &#9724;
                      </button>
                    </>
                  ) : (
                    <>
                      {/*Normal Timer Logic*/}
                      <button
                        className={!isOverlay ? 'm-2 hover:text-slate-50' : 'hidden'}
                        onClick={handleGoBack}
                      >
                        &#9166;
                      </button>

                      <button
                        className={!isOverlay ? 'm-2 hover:text-slate-50' : 'hidden'}
                        onClick={() => setIsCountingDown(true)}
                      >
                        &#9658;
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
            {/* Conditional Rendering to check if you were to edit the timer. */}
              {isEditing ? (
                /*Edit Logic */
                <div className="flex justify-center">
                  <div>
                    <InputField
                      label={'Hours'}
                      value={hours}
                      onChange={(e) => {
                        setHours(parseInt(e.target.value))
                        setsavedHours(e.target.value)
                      }}
                    ></InputField>
                    <InputField
                      label={'Minutes'}
                      value={minutes}
                      onChange={(e) => {
                        setMinutes(parseInt(e.target.value))
                        setSavedMinutes(e.target.value)
                      }}
                    ></InputField>
                    <InputField
                      label={'Seconds'}
                      value={seconds}
                      onChange={(e) => {
                        setSeconds(parseInt(e.target.value))
                        setSavedSeconds(e.target.value)
                      }}
                    ></InputField>
                    
                    <button onClick={handleGoBack}
                            className='text-slate-200 mt-1 ml-1 px-8 rounded-xl bg-purple-900 hover:bg-purple-700'>
                              &#9166;
                    </button>

                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-slate-200 mt-1 ml-1 px-8 rounded-xl bg-purple-900 hover:bg-purple-700"
                    >
                      ✔
                    </button>
                  </div>
                </div>
              ) : (
                /*  */
                <div>
                  <div className="flex justify-center">
                    <h1 className=" text-6xl text-slate-200">
                      {' '}
                      {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`/* Adds a 0 to the string for aestetics. */}
                    </h1>
                  </div>
                  <div id="timer-button" className="flex justify-center text-slate-300 text-4xl ">
                    {isCountingDown ? (
                      /* Checks wether the timer is scounting down or not */
                      <>
                        <button
                          className={!isOverlay ? 'm-2 hover:text-slate-50' : 'hidden'}
                          onClick={() => setIsCountingDown(false)}
                        >
                          &#10074;&#10074;
                        </button>
                        <button
                          className={!isOverlay ? 'm-2 hover:text-slate-50' : 'hidden'}
                          onClick={handleStop}
                        >
                          &#9724;
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={!isOverlay ? 'm-2 hover:text-slate-50' : 'hidden'}
                          onClick={() => setIsEditing(true)}
                        >
                          &#9998;
                        </button>

                        <button
                          className={!isOverlay ? 'm-2 hover:text-slate-50' : 'hidden'}
                          onClick={() => setIsCountingDown(true)}
                        >
                          &#9658;
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        /* First Screen Buttons */
        <div className="flex content-center justify-center">
          <button className="text-slate-200 rounded-xl p-2 m-2 bg-purple-900 hover:bg-purple-700 hover:text-lg" onClick={handlePomodoro}>
            Pomodoro Mode
          </button>

          <button className="text-slate-200 rounded-xl p-2 m-2 bg-purple-900 hover:bg-purple-700 hover:text-lg" onClick={() => setIsSelecting(false)}>
            Normal Mode
          </button>
          
        </div>
      )}
    </div>
  )
}
