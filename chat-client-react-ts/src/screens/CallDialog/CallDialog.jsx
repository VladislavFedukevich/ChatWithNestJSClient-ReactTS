import React, { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';

import { Wrapper, VideoContainer, Video, InputContainer, Input, Button } from './styled';

const CallDialog = () => {
    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);

    useEffect(() => {
        const peer = new Peer();

        peer.on('open', (id) => {
            setPeerId(id)
        });

        peer.on('call', (call) => {
            let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                call.answer(mediaStream)
                call.on('stream', function(remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play();
                });
            });
        })

        peerInstance.current = peer;
    }, [])

    const call = (remotePeerId) => {
        let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.play();

            const call = peerInstance.current.call(remotePeerId, mediaStream)

            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream
                remoteVideoRef.current.play();
            });
        });
    }

    return (
        <Wrapper>
            <h1>Current user id is {peerId}</h1>
            <InputContainer>
                <Input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} placeholder="Enter remote peer id" />
                <Button onClick={() => call(remotePeerIdValue)}>Call</Button>
            </InputContainer>
            <VideoContainer>
                <Video ref={currentUserVideoRef} />
                <Video ref={remoteVideoRef} />
            </VideoContainer>
        </Wrapper>
    );
};

export default CallDialog;
