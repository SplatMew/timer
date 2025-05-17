import React, { use, useEffect } from 'react'
import { useState } from 'react'
import InputField from './inputField'
import alarm1 from '../assets/sounds/alarm1.mp3'
import alarm2 from '../assets/sounds/alarm2.mp3'

export default function Timer({ isOverlay }) {
  const [isEditing, setIsEditing] = useState(true)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [hours, setHours] = useState(0)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [isPomodoro, setIsPomodoro] = useState(false)
  const [isSelecting, setIsSelecting] = useState(true)
  const [pomoBreak, setPomoBreak] = useState(0)

  //saved numbers
  const [savedMinutes, setSavedMinutes] = useState(0)
  const [savedSeconds, setSavedSeconds] = useState(0)
  const [savedHours, setsavedHours] = useState(0)

  //audio
  const audio = new Audio(alarm1)

  const handleStop = () => {
    setIsCountingDown(false)
    setMinutes(savedMinutes)
    setHours(savedHours)
    setSeconds(savedSeconds)
  }

  const handlePomodoro = () => {
    setIsPomodoro(true)
    setIsSelecting(false)
    setMinutes(25)
    setSavedMinutes(25)
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
              {/*Pomodoro Logic*/}
              <div>
                <div className="flex justify-center">
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
            </>
          ) : (
            <>
              {isEditing ? (
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
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-slate-200 mt-1 ml-1 px-16 rounded-xl bg-blue-400"
                    >
                      ✔
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-center">
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
        <div className="flex content-center justify-center">
          <button className="text-slate-200 p-2" onClick={handlePomodoro}>
            pomodoro
          </button>

          <button className="text-slate-200" onClick={() => setIsSelecting(false)}>
            normal
          </button>
          {/*buttons*/}
        </div>
      )}
    </div>
  )
}
