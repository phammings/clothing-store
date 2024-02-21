import React, {useEffect} from "react";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div className="home">
            <div className="video">
                <div>
                    <video id="vid" autoPlay muted loop style={{ maxWidth: "100%", maxHeight: "100%", margin: "0 auto", display: "block" }}>
                        <source src="https://cdn.shopify.com/videos/c/vp/b0fcca84b1384940b7b77edcd7d93361/b0fcca84b1384940b7b77edcd7d93361.HD-1080p-7.2Mbps-19259948.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <script>
                        document.getElementById('vid').play();
                    </script>
                </div>
            </div>
            
        </div>
    );
};

export default Home;