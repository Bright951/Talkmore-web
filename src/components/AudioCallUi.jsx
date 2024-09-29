import React from 'react'
import { useCallStateHooks } from '@stream-io/video-react-sdk';

const AudioCallUi = () => {
    const { useCallCustomData, useParticipants } = useCallStateHooks();
    const participants = useParticipants();
    const custom = useCallCustomData();
    console.log(participants)
    
  return (
    <div className="flex">
        <div className='description-panel'>
      <h2 className='text-white title'>{custom?.title ?? '<Title>'}</h2>
      <h3 className='text-white description'>{custom?.description ?? '<Description>'}</h3>
      <p className='text-white participant-count'>{participants.length} participants</p>
    </div>

        <div className='participants-panel'>
        <h4>Participants</h4>
        {participants.map((participant) => {
        return (
            <div className='participant' key={participant.sessionId}>
            {/* <Avatar imageSrc={participant.image} /> */}
            <div className='text-white name'>{participant.name}</div>
            </div>
        );
        })}
        </div>
    </div>
    
  )
}

export default AudioCallUi