import { useEffect, useRef, useState } from "react";
import { detect, init, stopCameraStream } from "../utils/utils";


export default function FaceExpression({onClick = ()=>{}}) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");
    const [isCameraOn, setIsCameraOn] = useState(true);

    const clickHandler = () => {
        const expression = detect({landmarkerRef,videoRef,setExpression})
        console.log(expression)
        onClick(expression)
    }

    const toggleCamera = async () => {
        if (isCameraOn) {
            stopCameraStream({ landmarkerRef, videoRef, streamRef });
            setExpression("Camera is off");
            setIsCameraOn(false);
        } else {
            await init({ landmarkerRef, videoRef, streamRef });
            setExpression("Detecting...");
            setIsCameraOn(true);
        }
    };

    useEffect(() => {
        init({landmarkerRef,videoRef,streamRef});
        
        return () => {
            stopCameraStream({ landmarkerRef, videoRef, streamRef });
        };
    }, []);

    return (
        <div style={{ textAlign: "center" }}>
            <div
                style={{
                    width: "500px",
                    height: "375px",
                    margin: "0 auto",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "scaleX(-1)",
                    }}
                    playsInline
                />
            </div>
            <h2>{expression}</h2>
            <button className="button" onClick={clickHandler} disabled={!isCameraOn}>Detect expression</button>
            <button className="button" onClick={toggleCamera} style={{ marginLeft: "10px" }}>
                Turn Camera {isCameraOn ? 'Off' : 'On'}
            </button>
        </div>
    );
}
