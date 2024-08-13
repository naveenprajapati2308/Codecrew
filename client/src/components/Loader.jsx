import FadeLoader from "react-spinners/FadeLoader";

export default function Loader({color="green"}) {

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };    
  

    return (
        <>
            <div className="middle">
                <FadeLoader
                    color={color}
                    loading={true}
                    cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </>
    )
}