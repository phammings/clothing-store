import React from "react";
import { Link } from "react-router-dom";
import { MENU } from "../../../../constants/routeConstants";

import "./Video.css";

const Video = () => {
    return (
        <Link to={{ pathname: MENU, state: { id: "all" } }}>
            <div>
                <video id="vid" autoPlay muted loop style={{ maxWidth: "100%", maxHeight: "100%", margin: "0 auto", display: "block" }}>
                    <source src="./Video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <script>
                    document.getElementById('vid').play();
                </script>
            </div>
        </Link>
    );
};

export default Video;
